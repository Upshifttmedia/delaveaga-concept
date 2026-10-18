// Course data, from the official DeLaveaga scorecard.
// Edit yardages, handicaps or the "how to play it" notes here.
// To add a real flyover clip: put the file in /public/videos and set video: "/videos/hole-10.mp4".

export type TeeKey = 'b' | 'w' | 'r';

export interface Hole {
  n: number;
  par: number;
  hcpMen: number;
  hcpWomen: number;
  yards: Record<TeeKey, number>;
  /** -1 dogleg left, 0 straight, 1 dogleg right (used for the drawn hole map) */
  dogleg: number;
  /** 'L' | 'R' | 'OB' | 'ravine' | 'L+ravine' (used for the drawn hole map) */
  hazard: string | null;
  howToPlay: string;
  episode: string;
  badge?: string;
  /** Hole image used for the flyover preview */
  image: string;
  /** Real flyover clip (vertical 9:16). Empty = image preview. */
  video: string;
}

export const TEES: Record<TeeKey, { name: string; color: string; men: string; women?: string }> = {
  b: { name: 'Blue', color: '#4C8BD0', men: '70.2 / 137' },
  w: { name: 'White', color: '#FFFFFF', men: '68.4 / 134', women: '73.4 / 136' },
  r: { name: 'Red', color: '#B23A2E', men: '66.1 / 119', women: '69.8 / 123' },
};

export const HOLES: Hole[] = [
  {
    "n": 1,
    "par": 5,
    "hcpMen": 4,
    "hcpWomen": 6,
    "yards": {
      "b": 504,
      "w": 482,
      "r": 463
    },
    "dogleg": 0,
    "hazard": "R",
    "howToPlay": "Out of bounds left, water right, and a narrow fairway between. Most regulars leave the driver in the bag and hit a hybrid.",
    "episode": "Leave the driver",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-01.jpg"
  },
  {
    "n": 2,
    "par": 4,
    "hcpMen": 10,
    "hcpWomen": 8,
    "yards": {
      "b": 337,
      "w": 316,
      "r": 301
    },
    "dogleg": 0,
    "hazard": "R",
    "howToPlay": "Deceptively simple from the tee. Water runs the length of the right side, a bunker guards the left, and mounding surrounds the green.",
    "episode": "The sleeper",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-13.jpg"
  },
  {
    "n": 3,
    "par": 3,
    "hcpMen": 14,
    "hcpWomen": 14,
    "yards": {
      "b": 164,
      "w": 145,
      "r": 102
    },
    "dogleg": 0,
    "hazard": "ravine",
    "howToPlay": "All carry over a ravine to one of the most demanding greens on the course. Water wraps the right side and back.",
    "episode": "All carry",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-14.jpg"
  },
  {
    "n": 4,
    "par": 4,
    "hcpMen": 12,
    "hcpWomen": 12,
    "yards": {
      "b": 332,
      "w": 309,
      "r": 293
    },
    "dogleg": 1,
    "hazard": null,
    "howToPlay": "A short dogleg right that invites the driver. A tee shot lost to the right can turn into a big number.",
    "episode": "Driver's temptation",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-07.jpg"
  },
  {
    "n": 5,
    "par": 3,
    "hcpMen": 16,
    "hcpWomen": 16,
    "yards": {
      "b": 171,
      "w": 156,
      "r": 135
    },
    "dogleg": 0,
    "hazard": "R",
    "howToPlay": "Downhill to a kidney-shaped green. Club down and stay left of the hazard beyond the right-side bunkers.",
    "episode": "Downhill to the kidney",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-06.jpg"
  },
  {
    "n": 6,
    "par": 4,
    "hcpMen": 6,
    "hcpWomen": 10,
    "yards": {
      "b": 387,
      "w": 365,
      "r": 323
    },
    "dogleg": 1,
    "hazard": null,
    "howToPlay": "Eucalyptus lines the entire right side. Resist cutting the corner and play to the fairway for an uphill approach.",
    "episode": "Eucalyptus alley",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-12.jpg"
  },
  {
    "n": 7,
    "par": 4,
    "hcpMen": 8,
    "hcpWomen": 2,
    "yards": {
      "b": 366,
      "w": 343,
      "r": 324
    },
    "dogleg": -1,
    "hazard": null,
    "howToPlay": "A gentle dogleg left. Aim toward the fairway bunkers for the best angle; from the rough, par becomes difficult.",
    "episode": "Find the angle",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-15.jpg"
  },
  {
    "n": 8,
    "par": 3,
    "hcpMen": 18,
    "hcpWomen": 18,
    "yards": {
      "b": 133,
      "w": 113,
      "r": 97
    },
    "dogleg": 0,
    "hazard": null,
    "howToPlay": "The shortest hole on the card, protected by deep front bunkers and a green that falls sharply left to right.",
    "episode": "Short, not simple",
    "video": "",
    "badge": "Look for the historic bear cage nearby",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-16.jpg"
  },
  {
    "n": 9,
    "par": 4,
    "hcpMen": 2,
    "hcpWomen": 4,
    "yards": {
      "b": 408,
      "w": 383,
      "r": 362
    },
    "dogleg": 0,
    "hazard": "OB",
    "howToPlay": "Aim just left of the clubhouse in the distance. Out of bounds runs the full length of the right side.",
    "episode": "Aim at the clubhouse",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-11.jpg"
  },
  {
    "n": 10,
    "par": 5,
    "hcpMen": 1,
    "hcpWomen": 1,
    "yards": {
      "b": 590,
      "w": 561,
      "r": 536
    },
    "dogleg": 0,
    "hazard": "L+ravine",
    "howToPlay": "The signature test. Water left, out of bounds right, and a ravine to carry on the approach. It can make or break a round.",
    "episode": "The monster",
    "video": "",
    "badge": "Ranked among Northern California's toughest holes",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-17.jpg"
  },
  {
    "n": 11,
    "par": 3,
    "hcpMen": 15,
    "hcpWomen": 17,
    "yards": {
      "b": 164,
      "w": 152,
      "r": 122
    },
    "dogleg": 0,
    "hazard": null,
    "howToPlay": "Plays slightly uphill to a deep green guarded by bunkers left and right. Take an extra club.",
    "episode": "Take one more club",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-18.jpg"
  },
  {
    "n": 12,
    "par": 4,
    "hcpMen": 9,
    "hcpWomen": 9,
    "yards": {
      "b": 356,
      "w": 342,
      "r": 324
    },
    "dogleg": 0,
    "hazard": "L",
    "howToPlay": "Water along the left, with a fairway sloping right. Expect a sidehill lie on an uphill approach.",
    "episode": "The sidehill approach",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-10.jpg"
  },
  {
    "n": 13,
    "par": 4,
    "hcpMen": 13,
    "hcpWomen": 11,
    "yards": {
      "b": 315,
      "w": 302,
      "r": 284
    },
    "dogleg": 0,
    "hazard": null,
    "howToPlay": "A long iron to the top of the ridge sets up an all-carry approach to one of the narrowest greens here. Avoid going long.",
    "episode": "Up to the ridge",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-09.jpg"
  },
  {
    "n": 14,
    "par": 4,
    "hcpMen": 17,
    "hcpWomen": 15,
    "yards": {
      "b": 341,
      "w": 309,
      "r": 240
    },
    "dogleg": 0,
    "hazard": "ravine",
    "howToPlay": "Carry the tree-lined ravine and long hitters can think about the green. Mind the pair of trees center-right.",
    "episode": "Carry the ravine",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-05.jpg"
  },
  {
    "n": 15,
    "par": 3,
    "hcpMen": 7,
    "hcpWomen": 13,
    "yards": {
      "b": 170,
      "w": 155,
      "r": 139
    },
    "dogleg": 0,
    "hazard": "L",
    "howToPlay": "The last of the par 3s. Water frames the left, and bunkers surround a green sloping left to right and back to front.",
    "episode": "Last of the par 3s",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-04.jpg"
  },
  {
    "n": 16,
    "par": 4,
    "hcpMen": 3,
    "hcpWomen": 7,
    "yards": {
      "b": 405,
      "w": 373,
      "r": 353
    },
    "dogleg": 0,
    "hazard": "L",
    "howToPlay": "A tee shot through a narrow chute of trees with a hazard left. Find the fairway and the hole opens up.",
    "episode": "Eye of the needle",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-03.jpg"
  },
  {
    "n": 17,
    "par": 5,
    "hcpMen": 11,
    "hcpWomen": 5,
    "yards": {
      "b": 513,
      "w": 469,
      "r": 446
    },
    "dogleg": -1,
    "hazard": "L",
    "howToPlay": "A dogleg left, reachable in two for longer hitters. Hazards line the left side and the approach plays uphill.",
    "episode": "Home in two",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-02.jpg"
  },
  {
    "n": 18,
    "par": 4,
    "hcpMen": 5,
    "hcpWomen": 3,
    "yards": {
      "b": 454,
      "w": 429,
      "r": 400
    },
    "dogleg": 0,
    "hazard": "L",
    "howToPlay": "Driver down the right-center, away from the water, then downhill into an undulating two-tier green.",
    "episode": "Two tiers to finish",
    "video": "",
    "image": "https://delaveagagolf.com/wp-content/uploads/2020/09/Dela-Map-08.jpg"
  }
];
