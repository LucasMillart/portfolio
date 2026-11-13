"use client";

import { useEffect, useRef } from "react";

/**
 * Bureau isométrique en voxels, rendu en pixel art sur un petit canvas
 * agrandi sans lissage (facteur entier). Animé en paliers (~12 img/s) :
 * code qui se tape à l'écran, vapeur du café, étoiles, panda qui hoche la tête.
 *
 * Repère : x vers la droite-bas, y vers la gauche-bas, z vers le haut.
 * Un voxel = sprite 4×4 px (dessus 4×2, faces gauche/droite 2×2).
 */

type Mat = { t: string; l: string; r: string };
type Vox = { x: number; y: number; z: number; m: Mat; tex?: (j: number, i: number) => string };

const mat = (t: string, l: string, r: string): Mat => ({ t, l, r });

// Palette : gris neutres + les 4 verts de la charte (pix-0 → pix-3)
const P0 = "#0f380f", P1 = "#306230", P2 = "#8bac0f", P3 = "#c4e33a";
const M = {
  floorA: mat("#2b2b2b", "#202020", "#1a1a1a"),
  floorB: mat("#262626", "#202020", "#1a1a1a"),
  rug: mat(P0, "#0a280a", "#082008"),
  rugEdge: mat(P1, "#244a24", "#1c3a1c"),
  wall: mat("#474747", "#363636", "#2e2e2e"),
  frame: mat("#5a5a5a", "#4d4d4d", "#444444"),
  sky: mat("#10241a", "#10241a", "#10241a"),
  star: mat(P3, P3, P3),
  desk: mat("#707070", "#575757", "#474747"),
  leg: mat("#3a3a3a", "#2e2e2e", "#262626"),
  monitor: mat("#2e2e2e", "#1c1c1c", "#252525"),
  keys: mat("#bdbdbd", "#8f8f8f", "#7a7a7a"),
  mug: mat("#e8e8e8", "#d4d4d4", "#b8b8b8"),
  coffee: mat("#1a1a1a", "#d4d4d4", "#b8b8b8"),
  bookA: mat(P2, P1, P0),
  bookB: mat("#d6d6d6", "#a8a8a8", "#8f8f8f"),
  bookC: mat("#5c5c5c", "#474747", "#3a3a3a"),
  pot: mat("#5a5a5a", "#474747", "#3a3a3a"),
  soil: mat("#1a1a1a", "#474747", "#3a3a3a"),
  leafA: mat(P3, P2, P1),
  leafB: mat(P2, P1, P0),
  chair: mat("#3d3d3d", "#2f2f2f", "#282828"),
  white: mat("#f5f5f5", "#dedede", "#c4c4c4"),
  black: mat("#2a2a2a", "#1d1d1d", "#151515"),
};
const greens = [M.rug, mat(P1, P1, P1), mat(P2, P2, P2), mat(P3, P3, P3)];
const posterBg = mat("#1a1a1a", "#1a1a1a", "#1a1a1a");

// Bornes de la scène → taille du canvas
const OX = 32, OY = 31, W = 80, H = 74;

const rand = (x: number, y: number, z: number) =>
  (((x * 73856093) ^ (y * 19349663) ^ (z * 83492791)) >>> 0) % 100;

// Écran : 9 × 6 voxels sur la face avant → image de 18 × 12 px
const SX0 = 6, SX1 = 15, SZ0 = 8, SZ1 = 14;
const SW = (SX1 - SX0) * 2, SH = (SZ1 - SZ0) * 2;
// Lignes de code : a = vert vif, b = vert, c = gris, espace = vide
const CODE = ["aaa bbbbb", "  cccc bb aa", "  bbb ccccc", "  cc aaaa", "a"];
const CODE_LEN = CODE.reduce((s, l) => s + l.length, 0);
const CYCLE = CODE_LEN + 30; // pause avant d'effacer

function screenPixel(c: number, r: number, frame: number, still: boolean) {
  if (c === 0 || c === SW - 1 || r === 0 || r === SH - 1) return "#161616";
  const typed = still ? CODE_LEN : Math.min(frame % CYCLE, CODE_LEN);
  const line = (r - 2) / 2;
  let before = 0;
  for (let i = 0; i < CODE.length; i++) {
    const text = CODE[i];
    if (i === line) {
      const k = c - 2;
      const shown = Math.max(0, Math.min(text.length, typed - before));
      if (k >= 0 && k < shown) {
        const ch = text[k];
        return ch === "a" ? P3 : ch === "b" ? P2 : ch === "c" ? "#8a8a8a" : P0;
      }
      // curseur clignotant juste après le dernier caractère tapé
      const onLine = typed >= before && (typed < before + text.length || i === CODE.length - 1);
      if (onLine && k === shown && Math.floor(frame / 4) % 2 === 0) return P3;
      return P0;
    }
    before += text.length;
  }
  return P0;
}

function buildScene(frame: number, still: boolean) {
  const map = new Map<number, Vox>();
  const key = (x: number, y: number, z: number) => x + y * 64 + z * 4096;
  const put = (x: number, y: number, z: number, m: Mat, tex?: Vox["tex"]) =>
    map.set(key(x, y, z), { x, y, z, m, tex });
  const box = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, m: Mat) => {
    for (let x = x0; x < x1; x++) for (let y = y0; y < y1; y++) for (let z = z0; z < z1; z++) put(x, y, z, m);
  };

  // Sol + tapis
  for (let x = 0; x < 22; x++)
    for (let y = 0; y < 16; y++) {
      const inRug = x >= 6 && x < 17 && y >= 7 && y < 15;
      const edge = x === 6 || x === 16 || y === 7 || y === 14;
      put(x, y, 0, inRug ? (edge ? M.rugEdge : M.rug) // lames de parquet
        : y % 3 === 0 ? M.floorB : M.floorA);
    }

  // Murs
  box(0, 22, 0, 1, 1, 15, M.wall);
  box(0, 1, 0, 16, 1, 15, M.wall);

  // Fenêtre de nuit (mur du fond)
  for (let x = 15; x < 21; x++)
    for (let z = 7; z < 13; z++) {
      const border = x === 15 || x === 20 || z === 7 || z === 12 || x === 17 || z === 10;
      put(x, 0, z, border ? M.frame : M.sky);
    }
  const twinkle = still ? 0 : Math.floor(frame / 9);
  [[16, 11], [19, 8], [18, 11], [16, 8]].forEach(([x, z], i) => {
    if (still || (twinkle + i) % 3 !== 0) put(x, 0, z, M.star);
  });

  // Affiche « calendrier » (mur de gauche)
  for (let y = 4; y < 11; y++)
    for (let z = 7; z < 12; z++) {
      const border = y === 4 || y === 10 || z === 7 || z === 11;
      put(0, y, z, border ? M.frame : rand(y, z, 3) < 30 ? posterBg : greens[1 + (rand(y, z, 7) % 3)]);
    }

  // Bureau
  box(3, 17, 1, 6, 6, 7, M.desk);
  for (const [x, y] of [[3, 1], [16, 1], [3, 5], [16, 5]]) box(x, x + 1, y, y + 1, 1, 6, M.leg);

  // Écran (face avant texturée) + pied
  box(10, 12, 1, 2, 7, 8, M.monitor);
  for (let x = SX0; x < SX1; x++)
    for (let z = SZ0; z < SZ1; z++)
      put(x, 2, z, M.monitor, (j, i) =>
        screenPixel(2 * (x - SX0) + j, 2 * (SZ1 - 1 - z) + i, frame, still),
      );

  // Clavier, livres, tasse
  box(8, 13, 4, 5, 7, 8, M.keys);
  box(3, 6, 2, 4, 7, 8, M.bookC);
  box(3, 6, 2, 4, 8, 9, M.bookB);
  box(4, 6, 2, 4, 9, 10, M.bookA);
  put(14, 4, 7, M.mug);
  put(14, 4, 8, M.coffee);

  // Plante
  box(2, 5, 11, 14, 1, 4, M.pot);
  box(2, 5, 11, 14, 4, 5, M.soil);
  for (let x = 1; x < 7; x++)
    for (let y = 9; y < 16; y++)
      for (let z = 5; z < 11; z++) {
        const d = Math.hypot(x - 3.5, y - 12, (z - 7.5) * 0.8);
        if (d < 2.9 && rand(x, y, z) < 70) put(x, y, z, rand(x, y, z) < 35 ? M.leafA : M.leafB);
      }

  // Chaise
  box(11, 12, 10, 11, 1, 4, M.chair);
  box(9, 14, 10, 11, 1, 2, M.chair);
  box(11, 12, 8, 13, 1, 2, M.chair);
  box(9, 14, 8, 12, 4, 5, M.chair);

  // Panda, de dos, qui hoche la tête
  const bob = still ? 0 : Math.floor(frame / 8) % 2;
  box(10, 13, 9, 12, 5, 7, M.white);
  box(10, 13, 9, 12, 7, 8, M.black);
  box(9, 10, 6, 10, 7, 8, M.black);
  box(13, 14, 6, 10, 7, 8, M.black);
  box(10, 13, 9, 12, 8 + bob, 11 + bob, M.white);
  put(10, 11, 11 + bob, M.black);
  put(12, 9, 11 + bob, M.black);

  // Dossier (devant le panda)
  box(9, 14, 12, 13, 5, 8, M.chair);

  // On écarte les voxels entièrement cachés, puis tri du fond vers l'avant
  const has = (x: number, y: number, z: number) => map.has(key(x, y, z));
  return [...map.values()]
    .filter((v) => v.tex || !(has(v.x + 1, v.y, v.z) && has(v.x, v.y + 1, v.z) && has(v.x, v.y, v.z + 1)))
    .sort((a, b) => a.x + a.y + a.z - (b.x + b.y + b.z) || a.z - b.z);
}

function render(ctx: CanvasRenderingContext2D, frame: number, still: boolean) {
  ctx.clearRect(0, 0, W, H);
  for (const v of buildScene(frame, still)) {
    const sx = (v.x - v.y) * 2 + OX;
    const sy = v.x + v.y - 2 * v.z + OY;
    ctx.fillStyle = v.m.t;
    ctx.fillRect(sx + 1, sy, 2, 1);
    ctx.fillRect(sx, sy + 1, 4, 1);
    if (v.tex) {
      for (let i = 0; i < 2; i++)
        for (let j = 0; j < 2; j++) {
          ctx.fillStyle = v.tex(j, i);
          ctx.fillRect(sx + j, sy + 2 + i, 1, 1);
        }
    } else {
      ctx.fillStyle = v.m.l;
      ctx.fillRect(sx, sy + 2, 2, 2);
    }
    ctx.fillStyle = v.m.r;
    ctx.fillRect(sx + 2, sy + 2, 2, 2);
  }

  // Vapeur au-dessus de la tasse
  if (!still) {
    const bx = (14 - 4) * 2 + OX + 1;
    const by = 14 + 4 - 2 * 9 + OY;
    ctx.fillStyle = "rgb(255 255 255 / 0.35)";
    for (let k = 0; k < 3; k++) {
      const rise = (frame + k * 4) % 12;
      const wobble = Math.floor((frame + k * 3) / 3) % 2;
      ctx.fillRect(bx + wobble + (k % 2), by - 1 - rise, 1, 1);
    }
  }
}

export function IsoDesk({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Agrandissement par facteur entier pour garder des pixels nets
    const ro = new ResizeObserver(([entry]) => {
      const scale = Math.max(2, Math.min(5, Math.floor(entry.contentRect.width / W)));
      canvas.style.width = `${W * scale}px`;
      canvas.style.height = `${H * scale}px`;
    });
    ro.observe(wrap.current!);

    let raf = 0;
    let last = -1;
    const loop = (t: number) => {
      const frame = Math.floor(t / 83);
      if (frame !== last) {
        last = frame;
        render(ctx, frame, false);
      }
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(loop);
    });

    render(ctx, 0, still);
    if (!still) io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className={`flex w-full justify-center ${className}`}>
      <canvas
        ref={ref}
        width={W}
        height={H}
        role="img"
        aria-label="Bureau en pixel art : un panda code devant son écran, une tasse de café fume, des étoiles brillent par la fenêtre"
        className="pixelated"
      />
    </div>
  );
}
