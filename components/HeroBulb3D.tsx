'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroBulb3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setSize(380, 380);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold the bulb assembly
    const bulbGroup = new THREE.Group();

    // 1. Bulb Glass Outer Mesh (Tear-drop Edison bulb shape)
    const glassGeometry = new THREE.SphereGeometry(1.6, 32, 32);
    glassGeometry.scale(1, 1.35, 1);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffe8ad,
      transparent: true,
      opacity: 0.25,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      reflectivity: 0.8,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });

    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    bulbGroup.add(glassMesh);

    // 2. Brass Base
    const baseGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.8, 24);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0xc4841a,
      metalness: 0.8,
      roughness: 0.3,
    });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.y = 2.2;
    bulbGroup.add(baseMesh);

    // 3. Glowing Spiral Tungsten Filament
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.3, 0.6, 0),
      new THREE.Vector3(-0.2, 0.1, 0.2),
      new THREE.Vector3(0, -0.3, 0),
      new THREE.Vector3(0.2, 0.1, -0.2),
      new THREE.Vector3(0.3, 0.6, 0),
    ]);
    const filamentGeometry = new THREE.TubeGeometry(curve, 64, 0.05, 12, false);
    const filamentMaterial = new THREE.MeshBasicMaterial({
      color: 0xfff5c0,
    });
    const filamentMesh = new THREE.Mesh(filamentGeometry, filamentMaterial);
    bulbGroup.add(filamentMesh);

    // 4. Point light inside filament
    const pointLight = new THREE.PointLight(0xf5a623, 3, 10);
    pointLight.position.set(0, 0, 0);
    bulbGroup.add(pointLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    scene.add(bulbGroup);

    // Mouse interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 0.8;
      mouseY = (y / rect.height) * 0.8;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Idle float & mouse tracking
      targetRotationY += (mouseX - targetRotationY) * 0.05;
      targetRotationX += (mouseY - targetRotationX) * 0.05;

      bulbGroup.rotation.y = targetRotationY + Math.sin(Date.now() * 0.001) * 0.1;
      bulbGroup.rotation.x = targetRotationX + Math.cos(Date.now() * 0.0015) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      glassGeometry.dispose();
      glassMaterial.dispose();
      baseGeometry.dispose();
      baseMaterial.dispose();
      filamentGeometry.dispose();
      filamentMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Background glow halo */}
      <div className="absolute h-72 w-72 rounded-full bg-amber/20 blur-3xl" />
      {failed ? (
        <div className="relative z-10 flex h-[380px] w-[380px] items-center justify-center">
          <svg
            viewBox="0 0 200 240"
            className="h-64 w-64 drop-shadow-[0_0_30px_rgba(245,166,35,0.4)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Brass Base */}
            <rect x="82" y="16" width="36" height="28" rx="3" fill="#c4841a" stroke="#f5a623" strokeWidth="1.5" />
            <line x1="82" y1="24" x2="118" y2="24" stroke="#e8dac7" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="82" y1="32" x2="118" y2="32" stroke="#e8dac7" strokeWidth="1" strokeOpacity="0.6" />
            {/* Outer Glass Contour */}
            <path
              d="M82 44 C50 70, 36 100, 36 130 C36 172, 65 204, 100 204 C135 204, 164 172, 164 130 C164 100, 150 70, 118 44 Z"
              fill="rgba(245,166,35,0.08)"
              stroke="#ffd580"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
            {/* Glowing Tungsten Filament */}
            <path
              d="M92 44 L92 100 Q96 115 100 100 Q104 85 100 115 Q96 140 100 130 L108 44"
              stroke="#fff5c0"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              style={{ filter: 'drop-shadow(0 0 8px #f5a623)' }}
            />
            <circle cx="100" cy="115" r="16" fill="#f5a623" fillOpacity="0.4" style={{ filter: 'blur(6px)' }} />
            <circle cx="100" cy="115" r="5" fill="#fff9db" />
          </svg>
        </div>
      ) : (
        <div ref={containerRef} className="relative z-10 h-[380px] w-[380px] cursor-grab active:cursor-grabbing" />
      )}
    </div>
  );
}
