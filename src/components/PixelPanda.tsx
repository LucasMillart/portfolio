/**
 * Avatar « panda sprinteur » en pixel art (40×40), dessiné en SVG pixel par pixel.
 * Trois calques : le décor (piste d'athlé), le panda, et les yeux fermés « ^ ^ »
 * qui s'affichent quand il cligne ou au survol (voir globals.css).
 * Pour retoucher le dessin : modifier les grilles ci-dessous (1 caractère = 1 pixel).
 */

// Décor : 1/2 ciel · 3/4 tribunes · 5/6 pelouse · 7 piste · 8 lignes de couloir
const BACKGROUND = [
  "1111111111111111111111111111111111111111",
  "1111111111111111111111111111111111111111",
  "1111111111111111111111111111111111111111",
  "1111111111111111111111111111111111111111",
  "1111111111111111111111111111111111111111",
  "1111111111111111111111111111111111111111",
  "2222222222222222222222222222222222222222",
  "2222222222222222222222222222222222222222",
  "2222222222222222222222222222222222222222",
  "2222222222222222222222222222222222222222",
  "2222222222222222222222222222222222222222",
  "2222222222222222222222222222222222222222",
  "3333333333333333333333333333333333333333",
  "4444444444444444444444444444444444444444",
  "3333333333333333333333333333333333333333",
  "3333333333333333333333333333333333333333",
  "4444444444444444444444444444444444444444",
  "3333333333333333333333333333333333333333",
  "5555555555555555555555555555555555555555",
  "5555555555555555555555555555555555555555",
  "6666666666666666666666666666666666666666",
  "6666666666666666666666666666666666666666",
  "5555555555555555555555555555555555555555",
  "5555555555555555555555555555555555555555",
  "7777777777777777777777777777777777777777",
  "7777777777777777777777777777777777777777",
  "7777777777888888888888888888887777777777",
  "7778888888777777777777777777778888888777",
  "8887777777777777777777777777777777777888",
  "7777777777777777777777777777777777777777",
  "7777777777777777777777777777777777777777",
  "7777777777888888888888888888887777777777",
  "7778888888777777777777777777778888888777",
  "8887777777777777777777777777777777777888",
  "7777777777777777777777777777777777777777",
  "7777777777777777777777777777777777777777",
  "7777777777888888888888888888887777777777",
  "7778888888777777777777777777778888888777",
  "8887777777777777777777777777777777777888",
  "7777777777777777777777777777777777777777",
];

// . vide · O contour · B/b fourrure noire · W/w fourrure blanche · E pupille · H/h reflets
// n nez · P joues · Y/L/y bandeau jaune · S/T/s débardeur bleu · R ruban · G/g/x/M médaille
const PANDA = [
  "........................................",
  "........................................",
  "........................................",
  ".........OO..........O.......OO.........",
  ".......OOBBOO.....OOOWO....OOBBOO.......",
  "......OBBBBBBO...OWWWO....OBBBBBBO......",
  "......OBBBBBBBO.OWWWWWO..OBBBBBBBO......",
  ".....OBBBbbbBBBOOWWWWWWOOBBBbbbBBBO.....",
  ".....OBBbbbbBBBWWWWWWWWWWBBBbbbbBBO.....",
  ".....OBBbbbbBWWWWWWWWWWWWWWBbbbbBBO.....",
  ".....OBBBbYYYYYYYYYYYYYYYYYYYYbBBBO.....",
  "......OBBYLLLLLLLLLLLLLLLLLLLLYBBO......",
  ".......OYYYYYYYYYYYYYYYYYYYYYYYYO.......",
  "......OyyyyyyyyyyyyyyyyyyyyyyyyyyO......",
  ".......OWWWWBBBWWWWWWWWWWBBBWWWWO.......",
  "......OWWWWBEEEBBWWWWWWBBEEEBWWWwO......",
  "......OWWWBEHHEEBWWWWWWBEHHEEBWWwO......",
  "......OWWBBEHHEEBWWWWWWBEHHEEBBWwO......",
  "......OWWBBEEEEEBWWWWWWBEEEEEBBWwO......",
  "......OWWBBEEEhEBWWWWWWBEEEhEBBWwO......",
  "......OWWWBBEEEBBWWWWWWBBEEEBBWwwO......",
  ".......OWWBBBBBBWWWWWWWWBBBBBBWwO.......",
  ".......OWWPWBBBWWWnOOOWWWBBBWPwwO.......",
  "........OPPPWWWWWWWOOWWWWWWWPPPO........",
  ".........OWWWWWWOWWOOWWOWWWWwwO.........",
  "..........OwWWWWWOOWWOOWWWWwwO..........",
  "...........OwwWWWWWWWWWWWwwwO...........",
  "............OOwwwwwwwwwwwwOO............",
  ".............OOOBBwwwwBBOOO.............",
  "............OBBRSSSSSSSSRBBO............",
  "..........OOBBWSRSSSSSSRSWBBOO..........",
  ".........OBBBWSSSRSSSSRSSsWBBBO.........",
  "........OBBBBWSSSSRSSRSSSsWBBBBO........",
  ".......OBBBBWTSSSSSOOOOSSssWBBBBO.......",
  ".......OBBBBWTSSSSOGMGgOSssWBBBBO.......",
  "......OBBBBWTTSSSSOGgggOSsssWBBBBO......",
  ".....OBBBBBWTTSSSSOGggxOSsssWBBBBBO.....",
  ".....OBBBBBWTTSSSSSOOOOSSsssWBBBBBO.....",
  ".....OBBBBWTTTSSSSSSSSSSSssssWBBBBO.....",
  "....OBBBBBWTTTSSSSSSSSSSSssssWBBBBBO....",
];

const EYES_CLOSED = [
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "...........BBBBB........BBBBB...........",
  "...........BBhBB........BBhBB...........",
  "...........BhBhB........BhBhB...........",
  "...........hBBBh........hBBBh...........",
  "...........BBBBB........BBBBB...........",
  "...........BBBBB........BBBBB...........",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
];

const COLORS: Record<string, string> = {
  "1": "#9cc3e4",
  "2": "#7ea8d0",
  "3": "#3e5378",
  "4": "#566d94",
  "5": "#4f9a4a",
  "6": "#62ad57",
  "7": "#c8553d",
  "8": "#f3e3d3",
  O: "#231c2e",
  B: "#2e2838",
  b: "#4a4257",
  W: "#fbf9f1",
  w: "#ddd6cb",
  E: "#0d0a12",
  H: "#ffffff",
  h: "#bfb8d0",
  n: "#5b5268",
  P: "#f59aae",
  Y: "#ffd23f",
  y: "#e3a514",
  L: "#fff3b8",
  S: "#2f6fd6",
  s: "#1f4fa8",
  T: "#4f8ff0",
  R: "#a9d1ff",
  G: "#ffd23f",
  g: "#f0b429",
  x: "#c98a12",
  M: "#fff3b8",
};

const SIZE = PANDA[0].length;

type Run = { x: number; y: number; w: number; c: string };

/** Regroupe les pixels identiques consécutifs d'une ligne en un seul rect. */
function runs(grid: string[]): Run[] {
  const out: Run[] = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      let end = x;
      while (end < row.length && row[end] === c) end++;
      if (c !== ".") out.push({ x, y, w: end - x, c });
      x = end;
    }
  });
  return out;
}

const LAYERS = { bg: runs(BACKGROUND), panda: runs(PANDA), closed: runs(EYES_CLOSED) };

function Rects({ list }: { list: Run[] }) {
  return list.map((r, i) => (
    <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={COLORS[r.c]} />
  ));
}

export function PixelPanda({ className = "" }: { className?: string }) {
  return (
    <div
      className={`group overflow-hidden rounded-full ${className}`}
      role="img"
      aria-label="Avatar : un panda sprinteur en pixel art, bandeau jaune et médaille, sur une piste d'athlétisme"
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} shapeRendering="crispEdges" className="block size-full">
        <Rects list={LAYERS.bg} />
        <g className="panda-hop">
          <Rects list={LAYERS.panda} />
          <g className="panda-blink">
            <Rects list={LAYERS.closed} />
          </g>
        </g>
      </svg>
    </div>
  );
}
