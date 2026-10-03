/* ASCII dinosaurs used across the site.
   Line art lives in the page backdrop; the pixel sprite drives the hero
   card and the footer runner game. */

export type AsciiSpecimen = {
  id: string;
  label: string;
  art: string;
};

export const specimens: AsciiSpecimen[] = [
  {
    id: "trex",
    label: "001 — Tyrannosaurus rex",
    art: String.raw`
                         _.--------.
                        /  o        \
                       |   .---.____/
                       |  /\/\/\/
                       |  \/\/\/\__
                       |         __)
              ___.----'      .--'
        __.--'              /
  _.--''                 __/ \
<'__________     ___.--'  \  \\
            '---'   |   |  '-'
                    |   |
                   _|   |__
                  (____(___)`,
  },
  {
    id: "bronto",
    label: "002 — Brontosaurus",
    art: String.raw`
                                 __
                                / o\_
                               /  __/
                              /  /
                             /  /
                            /  /
            _.--------.____/  /
        _.-'                  |
     .-'                      |
  .-'   ____                 /
 '-----'    \   |  |   |   |'
             |  |  |   |   |
             |__|  |___|__|`,
  },
  {
    id: "ptero",
    label: "003 — Pteranodon",
    art: String.raw`
       _                      _
       \'-._              _.-'/
        \   '-._   __ _.-'   /
         '-._   '-(o >    _.'
             '-._  \ \_.-'
                 '-.\_/`,
  },
  {
    id: "stego",
    label: "004 — Stegosaurus",
    art: String.raw`
              /\    /\    /\
         /\  /  \  /  \  /  \  /\
     ___/  \/    \/    \/    \/  \___
  .-'                                 '-._   __
 <_.-.___                                 '-'o )
         |  |----.____________.---|  |-----'--'
         |__|                     |__|`,
  },
];

/* Pixel T-rex, 20×20. "#" is body, "o" is the eye socket. Legs are swapped
   per frame so the same head/body can stand or run. */
const DINO_BODY = [
  "...........########.",
  "..........##o#######",
  "..........##########",
  "..........##########",
  "..........#####.....",
  "..........########..",
  "#........#####......",
  "#.......######......",
  "##....##########....",
  "###..#########.#....",
  "############........",
  ".###########........",
  "..##########........",
  "...########.........",
  "....######..........",
];

const LEGS_STAND = [
  ".....###.##.........",
  ".....##...#.........",
  ".....#....#.........",
  ".....##...##........",
];

const LEGS_RUN_A = [
  ".....###.###........",
  ".....##.............",
  ".....#..............",
  ".....##.............",
];

const LEGS_RUN_B = [
  ".....##..##.........",
  "..........#.........",
  "..........#.........",
  "..........##........",
];

export const DINO_FRAMES = {
  stand: [...DINO_BODY, ...LEGS_STAND],
  runA: [...DINO_BODY, ...LEGS_RUN_A],
  runB: [...DINO_BODY, ...LEGS_RUN_B],
};

export const DINO_W = 20;
export const DINO_H = DINO_BODY.length + LEGS_STAND.length;

export const CACTI = [
  ["..#..", "#.#..", "#.#.#", "###.#", "..###", "..#..", "..#.."],
  ["..#...", "..#..#", "#.#..#", "#.####", "###...", "..#...", "..#..."],
];

/* Density ramp, light → heavy */
export const RAMP = " .:-=+*#%@";
