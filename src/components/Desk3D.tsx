"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE_NS from "three";

/**
 * Bureau en 3D (Three.js) rendu en basse résolution puis agrandi sans lissage :
 * on garde le grain pixel art, mais les volumes, la lumière et les ombres sont réels.
 * On peut le faire tourner au glisser ; au repos il se balance doucement.
 *
 * Unités : 1 = 10 cm. Repère : x vers la droite, y vers le haut, z vers l'avant.
 * Mur du fond en z = -9, mur de gauche en x = -12.
 */

const PIX = 3; // taille d'un pixel à l'écran, en px CSS
const P0 = "#0f380f", P1 = "#306230", P2 = "#8bac0f", P3 = "#c4e33a";

// Code qui se tape à l'écran : segments [longueur, couleur], par ligne
const CODE: [number, string][][] = [
  [[6, P3], [2, ""], [10, P2]],
  [[3, ""], [8, "#8a8a8a"], [2, ""], [5, P2], [2, ""], [4, P3]],
  [[3, ""], [5, P2], [2, ""], [12, "#8a8a8a"]],
  [[6, ""], [7, P3], [2, ""], [6, P2]],
  [[6, ""], [4, "#8a8a8a"], [2, ""], [9, P2]],
  [[3, ""], [3, P2]],
  [[3, P3]],
];
const CODE_LEN = CODE.flat().reduce((s, [n]) => s + n, 0);

/** Petit générateur pseudo-aléatoire déterministe (même scène à chaque chargement). */
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

export function Desk3D({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
      if (disposed || !wrap.current) return;
      cleanup = buildDesk(THREE, OrbitControls, wrap.current, () => setTouched(true));
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={wrap}
      className={`relative aspect-[16/10] max-h-[480px] w-full cursor-grab active:cursor-grabbing ${className}`}
      role="img"
      aria-label="Bureau en 3D : un plateau en bois posé sur un meuble et un caisson à cinq tiroirs, un panda assis sur une chaise grise code sur son portable devant un écran, une tasse de café fume, des étoiles brillent par la fenêtre"
    >
      <span
        className={`pointer-events-none absolute bottom-0 right-1 font-mono text-xs text-muted transition-opacity duration-500 ${touched ? "opacity-0" : "opacity-70"}`}
      >
        ↻ glisse pour tourner
      </span>
    </div>
  );
}

type Three = typeof THREE_NS;
type Controls = typeof import("three/addons/controls/OrbitControls.js").OrbitControls;

function buildDesk(THREE: Three, OrbitControls: Controls, host: HTMLElement, onTouch: () => void) {
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Rendu basse résolution ------------------------------------------------
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setPixelRatio(1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap; // ombres crénelées, raccord pixel art
  const canvas = renderer.domElement;
  canvas.className = "pixelated absolute inset-0 h-full w-full";
  host.prepend(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);

  // --- Matériaux --------------------------------------------------------------
  const mats = new Map<string, THREE_NS.Material>();
  const lambert = (color: string) => {
    if (!mats.has(color)) mats.set(color, new THREE.MeshLambertMaterial({ color }));
    return mats.get(color)!;
  };
  const pixelTexture = (w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const g = c.getContext("2d")!;
    draw(g);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    return { tex, g, redraw: () => { draw(g); tex.needsUpdate = true; } };
  };

  /** Pavé posé par le bas : (x, y du dessous, z) = centre de la base. */
  const box = (
    w: number, h: number, d: number, mat: THREE_NS.Material | string,
    x: number, y: number, z: number, parent: THREE_NS.Object3D = scene,
  ) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), typeof mat === "string" ? lambert(mat) : mat);
    m.position.set(x, y + h / 2, z);
    m.castShadow = m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  const cyl = (
    r: number, h: number, mat: string, x: number, y: number, z: number,
    parent: THREE_NS.Object3D = scene, seg = 10,
  ) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), lambert(mat));
    m.position.set(x, y + h / 2, z);
    m.castShadow = m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  /** Plan lumineux (non éclairé) : écrans, fenêtre, affiche. */
  const glowPlane = (w: number, h: number, tex: THREE_NS.Texture) =>
    new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex }));

  // --- Pièce ---------------------------------------------------------------------
  const floorTex = pixelTexture(48, 36, (g) => {
    for (let y = 0; y < 36; y++) {
      g.fillStyle = y % 6 === 5 ? "#262626" : y % 12 < 6 ? "#353535" : "#303030";
      g.fillRect(0, y, 48, 1);
    }
  });
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(24.5, 1, 18.5),
    [lambert("#1f1f1f"), lambert("#1f1f1f"), new THREE.MeshLambertMaterial({ map: floorTex.tex }), lambert("#1a1a1a"), lambert("#1f1f1f"), lambert("#1f1f1f")],
  );
  floor.position.set(-0.25, -0.5, -0.25);
  floor.receiveShadow = true;
  scene.add(floor);

  box(24.5, 15, 0.5, "#474747", -0.25, 0, -9.25); // mur du fond
  box(0.5, 15, 18, "#3f3f3f", -12.25, 0, 0); // mur de gauche

  // Tapis vert sous la chaise
  box(11, 0.06, 8, P1, 0, 0, 3.2);
  box(10, 0.08, 7, P0, 0, 0, 3.2);

  // Fenêtre de nuit (mur du fond, à droite)
  const stars = [[3, 4], [14, 3], [9, 11], [17, 13], [5, 15], [12, 7]];
  let starFrame = 0;
  const sky = pixelTexture(20, 20, (g) => {
    g.fillStyle = "#10241a";
    g.fillRect(0, 0, 20, 20);
    stars.forEach(([x, y], i) => {
      if (still || (Math.floor(starFrame / 9) + i) % 3 !== 0) {
        g.fillStyle = P3;
        g.fillRect(x, y, 1, 1);
      }
    });
  });
  const win = glowPlane(4.6, 4.6, sky.tex);
  win.position.set(8, 10.8, -8.99);
  scene.add(win);
  for (const [w, h, x, y] of [[5.2, 0.3, 8, 8.2], [5.2, 0.3, 8, 13.1], [0.3, 5.2, 5.45, 8.2], [0.3, 5.2, 10.55, 8.2], [0.2, 4.6, 8, 8.5], [4.6, 0.2, 8, 10.7]])
    box(w, h, 0.25, "#5a5a5a", x, y, -8.9);

  // Affiche « contributions » (mur de gauche)
  const rnd = seeded(7);
  const poster = pixelTexture(26, 14, (g) => {
    g.fillStyle = "#1a1a1a";
    g.fillRect(0, 0, 26, 14);
    for (let c = 0; c < 12; c++)
      for (let r = 0; r < 6; r++) {
        const v = rnd();
        g.fillStyle = v < 0.3 ? "#262626" : [P0, P1, P2, P3][Math.floor(v * 4)];
        g.fillRect(1 + c * 2, 1 + r * 2, 1, 1);
      }
  });
  const posterMesh = glowPlane(6.5, 3.5, poster.tex);
  posterMesh.position.set(-11.92, 10.5, -3);
  posterMesh.rotation.y = Math.PI / 2;
  scene.add(posterMesh);
  box(0.1, 3.9, 6.9, "#5a5a5a", -12, 8.55, -3);

  // --- Bureau : plateau en bois sur deux caissons ------------------------------------
  const DZ0 = -8.7, DZ1 = -1.7, TOP = 7.5;
  const wood = "#b5835a", unit = "#e3ddd2", front = "#ece7dd", handle = "#3a3a3a";
  box(16, 0.4, DZ1 - DZ0, wood, 0, TOP - 0.4, (DZ0 + DZ1) / 2);

  const UNIT_W = 3.6, UZ0 = -8.6, UZ1 = -2.05;
  const unitZ = (UZ0 + UZ1) / 2, unitD = UZ1 - UZ0;
  // À gauche : meuble à porte, poignée côté chaise
  box(UNIT_W, TOP - 0.4, unitD, unit, -6, 0, unitZ);
  box(UNIT_W - 0.1, TOP - 0.75, 0.08, front, -6, 0.3, UZ1 + 0.04);
  box(0.14, 1.4, 0.14, handle, -4.55, 4, UZ1 + 0.15);
  // À droite : 5 tiroirs, poignées alternées droite / gauche en partant du haut
  box(UNIT_W, TOP - 0.4, unitD, unit, 6, 0, unitZ);
  const dh = (TOP - 0.4 - 0.3) / 5;
  for (let i = 0; i < 5; i++) {
    const y = TOP - 0.4 - (i + 1) * dh;
    box(UNIT_W - 0.1, dh - 0.1, 0.08, front, 6, y + 0.05, UZ1 + 0.04);
    const right = i % 2 === 0;
    box(0.9, 0.14, 0.14, handle, right ? 7.1 : 4.9, y + dh - 0.45, UZ1 + 0.15);
  }

  // Grand tapis de bureau noir, au milieu
  box(9, 0.06, 4.2, "#262626", 0, TOP, -4);

  // Écran derrière le tapis
  box(2.2, 0.15, 1.4, "#2a2a2a", 0, TOP, -7.6);
  box(0.4, 2.4, 0.3, "#2a2a2a", 0, TOP, -7.95);
  box(6.4, 3.8, 0.3, "#2a2a2a", 0, 9.2, -7.75);
  let codeFrame = 0;
  const screen = pixelTexture(48, 27, (g) => {
    g.fillStyle = P0;
    g.fillRect(0, 0, 48, 27);
    const CYCLE = CODE_LEN + 30;
    let left = still ? CODE_LEN : Math.min(codeFrame % CYCLE, CODE_LEN);
    let cx = 3, cy = 3;
    for (let r = 0; r < CODE.length && left > 0; r++) {
      let x = 3;
      cy = 3 + r * 3;
      for (const [n, color] of CODE[r]) {
        const shown = Math.min(n, left);
        if (color) {
          g.fillStyle = color;
          g.fillRect(x, cy, shown, 2);
        }
        x += shown;
        left -= shown;
        if (left <= 0) break;
      }
      cx = x;
    }
    if (Math.floor(codeFrame / 4) % 2 === 0) {
      g.fillStyle = P3;
      g.fillRect(cx, cy, 1, 2);
    }
  });
  const screenMesh = glowPlane(6.0, 3.4, screen.tex);
  screenMesh.position.set(0, 11.1, -7.59);
  scene.add(screenMesh);

  // Portable Dell ouvert sur le tapis, devant l'écran
  box(3.2, 0.16, 2.2, "#b8b8b8", 0, TOP + 0.06, -3.7);
  box(2.8, 0.02, 1.0, "#2b2b2b", 0, TOP + 0.22, -4.1);
  box(1.0, 0.02, 0.6, "#a0a0a0", 0, TOP + 0.22, -3.0);
  const lid = new THREE.Group();
  lid.position.set(0, TOP + 0.22, -4.8);
  lid.rotation.x = -0.28;
  scene.add(lid);
  box(3.2, 2.1, 0.08, "#b8b8b8", 0, 0, 0, lid);
  const laptopScreen = pixelTexture(30, 19, (g) => {
    g.fillStyle = "#1d1d1d";
    g.fillRect(0, 0, 30, 19);
    g.fillStyle = P0;
    g.fillRect(1, 1, 28, 17);
    g.fillStyle = P1;
    g.fillRect(1, 1, 28, 2);
    g.fillStyle = P2;
    g.fillRect(3, 5, 10, 1);
    g.fillRect(3, 8, 14, 1);
    g.fillStyle = "#8a8a8a";
    g.fillRect(5, 11, 12, 1);
    g.fillRect(5, 14, 7, 1);
    g.fillStyle = P3;
    g.fillRect(19, 5, 8, 10);
  });
  const lidScreen = glowPlane(3.0, 1.9, laptopScreen.tex);
  lidScreen.position.set(0, 1.05, 0.045);
  lid.add(lidScreen);

  // Petites décos à droite : cadre, cactus, tasse de café
  const frame = new THREE.Group();
  frame.position.set(5.2, TOP, -8.3);
  frame.rotation.x = -0.15;
  scene.add(frame);
  box(1.5, 1.9, 0.12, "#2a2a2a", 0, 0, 0, frame);
  box(1.1, 1.2, 0.02, P1, 0, 0.35, 0.07, frame);
  box(1.1, 0.4, 0.03, P2, 0, 0.35, 0.07, frame);

  cyl(0.45, 0.6, "#5a5a5a", 6.9, TOP, -7.3);
  cyl(0.3, 1.4, P1, 6.9, TOP + 0.6, -7.3, scene, 6);
  box(0.5, 0.25, 0.25, P1, 7.3, TOP + 1.2, -7.3);
  cyl(0.18, 0.5, P2, 7.5, TOP + 1.2, -7.3, scene, 6);

  cyl(0.4, 0.9, "#e8e8e8", 6.4, TOP, -3.3, scene, 12);
  cyl(0.33, 0.02, "#2a1c12", 6.4, TOP + 0.9, -3.3, scene, 12);
  box(0.15, 0.5, 0.15, "#e8e8e8", 6.88, TOP + 0.2, -3.3);
  const steam = [0, 1, 2].map(() => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.16, 0.16),
      new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.4 }),
    );
    m.visible = !still;
    scene.add(m);
    return m;
  });

  // --- Chaise grise sans accoudoirs ----------------------------------------------
  const CZ = 1.2;
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.3;
    const leg = box(2.3, 0.3, 0.35, "#2e2e2e", 0, 0.35, 0);
    leg.position.set(Math.cos(a) * 1.15, 0.5, CZ + Math.sin(a) * 1.15);
    leg.rotation.y = -a;
    cyl(0.22, 0.3, "#151515", Math.cos(a) * 2.2, 0, CZ + Math.sin(a) * 2.2);
  }
  cyl(0.22, 3.6, "#2e2e2e", 0, 0.6, CZ);
  box(4.4, 0.6, 4.2, "#8c8c8c", 0, 4.2, CZ);
  box(0.5, 1.8, 0.3, "#2e2e2e", 0, 4.4, CZ + 2.2);
  const back = box(4.2, 4.4, 0.5, "#8c8c8c", 0, 5.8, CZ + 2.35);
  back.rotation.x = 0.08;

  // --- Panda, de dos, qui hoche la tête ---------------------------------------------
  const W = "#f2f2f2", B = "#1c1c1c", PZ = 0.9;
  box(3.4, 2.6, 2.6, W, 0, 4.8, PZ);
  box(3.5, 1.0, 2.7, B, 0, 7.3, PZ);
  for (const s of [-1, 1]) {
    box(0.9, 0.9, 3.0, B, s * 1.9, 7.3, PZ - 1.2); // bras vers le clavier
    box(1.1, 1.1, 2.4, B, s * 0.9, 4.8, PZ - 2.0); // cuisses
    box(1.0, 3.8, 1.0, B, s * 0.9, 1.0, PZ - 2.8); // jambes
  }
  const head = new THREE.Group();
  head.position.set(0, 8.3, PZ);
  scene.add(head);
  box(3.0, 2.6, 2.6, W, 0, 0, 0, head);
  for (const s of [-1, 1]) {
    box(0.9, 0.9, 0.5, B, s * 1.2, 2.4, 0.4, head); // oreilles
    box(0.8, 0.9, 0.1, B, s * 0.7, 1.1, -1.32, head); // tâches des yeux
  }
  box(0.5, 0.3, 0.1, B, 0, 0.55, -1.32, head);

  // --- Plante au sol, à gauche devant -------------------------------------------
  box(2.2, 2.4, 2.2, "#5a5a5a", -9.6, 0, 6.2);
  box(2.0, 0.1, 2.0, "#1a1a1a", -9.6, 2.4, 6.2);
  const rl = seeded(3);
  for (let i = 0; i < 26; i++) {
    const a = rl() * Math.PI * 2, e = rl() * 1.2 - 0.2, r = 1 + rl() * 1.2;
    const s = 0.8 + rl() * 0.6;
    const leaf = box(s, s, s, rl() < 0.4 ? P3 : rl() < 0.6 ? P2 : P1, 0, 0, 0);
    leaf.position.set(-9.6 + Math.cos(a) * Math.cos(e) * r, 4.6 + Math.sin(e) * r * 1.3, 6.2 + Math.sin(a) * Math.cos(e) * r);
    leaf.rotation.set(rl() * 3, rl() * 3, rl() * 3);
  }

  // --- Lumières --------------------------------------------------------------------
  scene.add(new THREE.HemisphereLight("#c8d4c8", "#2a2a2a", 2.2));
  const sun = new THREE.DirectionalLight("#fff1dc", 3);
  sun.position.set(12, 26, 16);
  sun.target.position.set(0, 0, -2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(512, 512);
  Object.assign(sun.shadow.camera, { left: -18, right: 18, top: 18, bottom: -18, near: 1, far: 70 });
  sun.shadow.bias = -0.002;
  scene.add(sun, sun.target);
  const glow = new THREE.PointLight(P2, 25, 14, 2); // lueur verte de l'écran
  glow.position.set(0, 10, -5.5);
  scene.add(glow);

  // --- Caméra et rotation -----------------------------------------------------------
  const target = new THREE.Vector3(0, 5.5, -1);
  const BASE_AZ = THREE.MathUtils.degToRad(38), SWAY = THREE.MathUtils.degToRad(22);
  const spherical = new THREE.Spherical(80, THREE.MathUtils.degToRad(58), BASE_AZ);
  camera.position.setFromSpherical(spherical).add(target);
  camera.lookAt(target);

  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(target);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.rotateSpeed = 0.6;
  // On reste du côté ouvert de la pièce (jamais derrière les murs)
  controls.minAzimuthAngle = THREE.MathUtils.degToRad(-15);
  controls.maxAzimuthAngle = THREE.MathUtils.degToRad(100);
  controls.minPolarAngle = THREE.MathUtils.degToRad(30);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(82);
  controls.update();

  let dragging = false, lastTouch = -Infinity;
  controls.addEventListener("start", () => { dragging = true; onTouch(); });
  controls.addEventListener("end", () => { dragging = false; lastTouch = performance.now(); });

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(Math.ceil(w / PIX), Math.ceil(h / PIX), false);
    const aspect = w / h;
    const halfH = Math.max(11, 16 / aspect);
    Object.assign(camera, { left: -halfH * aspect, right: halfH * aspect, top: halfH, bottom: -halfH });
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  // --- Animation ----------------------------------------------------------------------
  const offset = new THREE.Vector3();
  let raf = 0, lastStep = -1;
  const loop = (t: number) => {
    raf = requestAnimationFrame(loop);

    // Au repos, la caméra revient doucement vers un balancement autour de la vue de base
    if (!still && !dragging && t - lastTouch > 2500) {
      offset.copy(camera.position).sub(controls.target);
      spherical.setFromVector3(offset);
      const goal = BASE_AZ + SWAY * Math.sin(t / 4000);
      spherical.theta += (goal - spherical.theta) * 0.02;
      camera.position.setFromSpherical(spherical).add(controls.target);
    }
    controls.update();

    if (!still) {
      // Paliers à ~12 img/s pour les animations « pixel » (code, étoiles, tête)
      const step = Math.floor(t / 83);
      if (step !== lastStep) {
        lastStep = step;
        codeFrame = step;
        starFrame = step;
        screen.redraw();
        if (step % 9 === 0) sky.redraw();
        head.rotation.x = Math.floor(step / 8) % 2 ? 0.1 : 0;
        steam.forEach((m, k) => {
          const rise = ((step + k * 4) % 12) / 12;
          m.position.set(6.4 + (Math.floor((step + k * 3) / 3) % 2 ? 0.12 : -0.12), TOP + 1.1 + rise * 1.6, -3.3);
          (m.material as THREE_NS.MeshBasicMaterial).opacity = 0.45 * (1 - rise);
        });
      }
    }
    renderer.render(scene, camera);
  };

  const io = new IntersectionObserver(([entry]) => {
    cancelAnimationFrame(raf);
    if (entry.isIntersecting) raf = requestAnimationFrame(loop);
  });
  io.observe(host);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    controls.dispose();
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        const m = o.material as THREE_NS.Material | THREE_NS.Material[];
        (Array.isArray(m) ? m : [m]).forEach((x) => {
          (x as THREE_NS.MeshBasicMaterial).map?.dispose();
          x.dispose();
        });
      }
    });
    renderer.dispose();
    canvas.remove();
  };
}
