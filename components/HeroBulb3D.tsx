'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroBulb3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
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
      <div ref={containerRef} className="relative z-10 h-[380px] w-[380px] cursor-grab active:cursor-grabbing" />
    </div>
  );
}
