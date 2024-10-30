import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "../../assets/styles/InteractveMap.css";
import { continents } from "../../constants";

const InteractiveMap: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [continentName, setContinentName] = useState<string>("");
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);

  useEffect(() => {
    // Renderer setup with transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // Scene and Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);

    // Texture loader
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

    // Map setup
    const geometry = new THREE.PlaneGeometry(4, 2);
    const material = new THREE.MeshBasicMaterial({
      map: continentTexture,
      transparent: true,
    });
    const map = new THREE.Mesh(geometry, material);
    scene.add(map);

    // Continent regions for detection
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
    let currentContinent: string | null = null;

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

        if (detectedContinent && detectedContinent !== currentContinent) {
          currentContinent = detectedContinent;
          setContinentName(detectedContinent);
          map.material.map = textures[detectedContinent];
          map.material.needsUpdate = true;
          console.log(`Detected Continent: ${detectedContinent}`);
        } else if (!detectedContinent) {
          resetMapTexture();
        }
      } else {
        resetMapTexture();
      }
    }

    function resetMapTexture() {
      currentContinent = null;
      setContinentName("");
      map.material.map = continentTexture;
      map.material.needsUpdate = true;
    }

    window.addEventListener("mousemove", onMouseMove);
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
      if (mountRef.current) {
        observer.unobserve(mountRef.current);
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isMapVisible]);

  return (
    <div ref={mountRef} className="interactive-map" id="explore">
      <div className="continent_info">
        <div className="continent_name">{continentName}</div>
        <div className="continent_fact">
          {continents[continentName]?.funFact}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
