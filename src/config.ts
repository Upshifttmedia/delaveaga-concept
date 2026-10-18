// Site-wide settings. Change these instead of editing components.

export const SITE = {
  name: 'DeLaveaga Golf Course',
  tagline: "Santa Cruz's home course for over fifty years.",

  /**
   * Pitch mode shows notes meant for the DeLaveaga team (e.g. in the
   * How to Play section) and the "concept" label. Set to false for a
   * clean version the course could use as its real site.
   */
  pitchMode: true,

  /** Keep search engines away while this is a concept. */
  noindex: true,

  /** Who's pitching. Shown only in pitch mode. */
  crew: {
    name: 'Your crew name',
    contact: 'you@example.com',
  },

  bookingUrl: 'https://delaveaga.quick18.com/teetimes/searchmatrix',
  phone: { shop: '(831) 423-7214', grille: '(831) 423-1600' },
  address: ['401 Upper Park Road', 'Santa Cruz, CA 95065'],
  mapsUrl: 'https://goo.gl/maps/a6yeMToYZJqkwjJKA',
  ratesAsOf: 'October 2026',
};
