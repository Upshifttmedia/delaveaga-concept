// Green fees as published on delaveagagolf.com (October 2026).
// day: wk = Mon–Fri, we = weekend & holiday
// round: 18, 9, tw = twilight, st = super twilight
// golfer: reg = public, card = discount card holder, jr = junior (18 & under)

export const RATES = {
  wk: {
    '18': { reg: '$57–71', card: '$48', jr: '$48' },
    '9': { reg: '$39–49', card: '$32', jr: '$32' },
    tw: { reg: '$40–50', card: '$37', jr: '$17' },
    st: { reg: '$33–41', card: '$30', jr: '$17' },
  },
  we: {
    '18': { reg: '$74–93', card: '$60', jr: '$60' },
    '9': { reg: '$48–60', card: '$39', jr: '$39' },
    tw: { reg: '$50–63', card: '$46', jr: '$17' },
    st: { reg: '$40–50', card: '$36', jr: '$17' },
  },
} as const;

export const CART_PER_RIDER = '$25';

/** Twilight start times in minutes after midnight. */
export const TWILIGHT = {
  summer: { twilight: 15 * 60, superTwilight: 17 * 60 }, // daylight saving time
  winter: { twilight: 13 * 60 + 30, superTwilight: 15 * 60 }, // standard time
};

export const DISCOUNT_CARDS = [
  { name: 'Santa Cruz County', price: '$125' },
  { name: 'Non-resident', price: '$165' },
  { name: 'Santa Cruz City senior (60+)', price: '$116' },
];
