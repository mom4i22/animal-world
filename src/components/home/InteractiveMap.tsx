import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import "../../assets/styles/InteractveMap.css";
import { ContinentsListProps, formatToSmallCaps } from "../../models";
import northAmericaAudio from "../../assets/audio/north_america.mp3";
import southAmericaAudio from "../../assets/audio/south_america.mp3";
import europeAudio from "../../assets/audio/europe.mp3";
import africaAudio from "../../assets/audio/africa.mp3";
import asiaAudio from "../../assets/audio/asia.mp3";
import australiaAudio from "../../assets/audio/australia.mp3";

const InteractiveMap: React.FC<ContinentsListProps> = ({ continents }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [continentName, setContinentName] = useState<string>("");
  const [continentFact, setContinentFact] = useState<string>("");
  const [continentAudio, setContinentAudio] = useState<string>("");
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const currentContinentRef = useRef<string | null>(null);
  const navigate = useNavigate(); // React Router hook to navigate

  const continentAudioFiles: { [key: string]: string } = {
    north_america: northAmericaAudio,
    south_america: southAmericaAudio,
    europe: europeAudio,
    africa: africaAudio,
    asia: asiaAudio,
    australia: australiaAudio,
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "m") {
        setIsMuted((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);

    const textureLoader = new THREE.TextureLoader();
    const continentTexture = textureLoader.load("/img/map.png");
    const textures: { [key: string]: THREE.Texture } = {
      "North America": textureLoader.load("/img/north_america.png"),
      "South America": textureLoader.load("/img/south_america.png"),
      Europe: textureLoader.load("/img/europe.png"),
      Africa: textureLoader.load("/img/africa.png"),
      Asia: textureLoader.load("/img/asia.png"),
      Australia: textureLoader.load("/img/australia.png"),
    };

    const geometry = new THREE.PlaneGeometry(4, 2);
    const material = new THREE.MeshBasicMaterial({
      map: continentTexture,
      transparent: true,
    });
    const map = new THREE.Mesh(geometry, material);
    scene.add(map);

    const continentRegions = [
      { name: "North America", xMin: -1.5, xMax: -0.2, yMin: -0.2, yMax: 0.8 },
      { name: "South America", xMin: -0.9, xMax: -0.4, yMin: -0.9, yMax: -0.2 },
      { name: "Europe", xMin: -0.45, xMax: 0.2, yMin: 0.05, yMax: 0.5 },
      { name: "Africa", xMin: -0.3, xMax: 0.35, yMin: -0.7, yMax: 0.1 },
      { name: "Asia", xMin: 0.2, xMax: 1.5, yMin: -0.4, yMax: 0.7 },
      { name: "Australia", xMin: 0.7, xMax: 1.7, yMin: -0.9, yMax: -0.4 },
    ];

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function detectContinent(intersectPoint: THREE.Vector3): string | null {
      const { x, y } = intersectPoint;
      for (const region of continentRegions) {
        if (
          x >= region.xMin &&
          x <= region.xMax &&
          y >= region.yMin &&
          y <= region.yMax
        ) {
          return region.name;
        }
      }
      return null;
    }

    function onMouseMove(event: MouseEvent) {
      if (!isMapVisible) return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(map);

      if (intersects.length > 0) {
        const intersectPoint = intersects[0].point;
        const detectedContinent = detectContinent(intersectPoint);

        if (
          detectedContinent &&
          detectedContinent !== currentContinentRef.current
        ) {
          currentContinentRef.current = detectedContinent;
          setContinentName(detectedContinent);
          map.material.map = textures[detectedContinent];
          map.material.needsUpdate = true;

          const newAudio =
            continentAudioFiles[formatToSmallCaps(detectedContinent)];
          setContinentAudio(newAudio);

          if (audioRef.current && userInteracted) {
            audioRef.current.src = newAudio;
            audioRef.current.play().catch((error) => {
              console.warn("Autoplay was prevented:", error);
            });
          }
        } else if (!detectedContinent) {
          resetMapTexture();
        }
      } else {
        resetMapTexture();
      }
    }

    function onMouseClick() {
      if (currentContinentRef.current) {
        navigate(
          `/continents/${formatToSmallCaps(currentContinentRef.current)}`
        );
      }
    }

    function resetMapTexture() {
      if (currentContinentRef.current !== null) {
        currentContinentRef.current = null;
        setContinentName("");
        map.material.map = continentTexture;
        map.material.needsUpdate = true;
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onMouseClick);
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsMapVisible(entry.isIntersecting);
          if (!entry.isIntersecting) {
            resetMapTexture();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onMouseClick);
      if (mountRef.current) {
        observer.unobserve(mountRef.current);
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isMapVisible, userInteracted, navigate]);

  useEffect(() => {
    setContinentFact(
      continents.find((c) => continentName === c.name)?.funFact ?? ""
    );
  }, [continentName]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div ref={mountRef} className="interactive-map" id="explore">
      <div className="continent_info">
        <div className="continent_name">{continentName}</div>
        <div className="continent_fact">{continentFact}</div>
        <div className="audio-container">
          <audio ref={audioRef} src={continentAudio} />
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
