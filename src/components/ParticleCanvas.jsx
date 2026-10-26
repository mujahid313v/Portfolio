import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 60;

    // near-empty black canvas, just a few drifting motes of light
    const COUNT = 110;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 220;
      positions[i + 1] = (Math.random() - 0.5) * 180;
      positions[i + 2] = (Math.random() - 0.5) * 140;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // soft circular sprite — raw gl.POINTS render as squares without this
    const sprite = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d");
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.4, "rgba(255,255,255,0.6)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      return tex;
    })();

    const material = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 2.2,
      map: sprite,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // a handful of faint white motes for depth
    const W_COUNT = 45;
    const wPositions = new Float32Array(W_COUNT * 3);
    for (let i = 0; i < W_COUNT * 3; i += 3) {
      wPositions[i] = (Math.random() - 0.5) * 260;
      wPositions[i + 1] = (Math.random() - 0.5) * 200;
      wPositions[i + 2] = (Math.random() - 0.5) * 160;
    }
    const wGeometry = new THREE.BufferGeometry();
    wGeometry.setAttribute("position", new THREE.BufferAttribute(wPositions, 3));
    const wMaterial = new THREE.PointsMaterial({
      color: 0xe9d5ff,
      size: 1.3,
      map: sprite,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const whitePoints = new THREE.Points(wGeometry, wMaterial);
    scene.add(whitePoints);

    const mouse = { x: 0, y: 0 };
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", resize);

    let t = 0;
    let raf;
    const tick = () => {
      t += 0.002;
      // no rotation — calm floating only, so the page never looks like it spins
      points.position.y = Math.sin(t) * 1.2;
      whitePoints.position.y = Math.cos(t) * 0.8;
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      wGeometry.dispose();
      wMaterial.dispose();
      sprite.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />;
}
