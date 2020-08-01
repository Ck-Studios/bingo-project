export const SLIDE_UP = {
  initial: {opacity: 0, y: 100},
  enter: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96]}
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {duration: 0.3, ease: [0.48, 0.15, 0.25, 0.96]}
  }
};

export const SLIDE_DOWN = {
  initial: {opacity: 0, y: -50},
  enter: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96]}
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {duration: 0.3, ease: [0.48, 0.15, 0.25, 0.96]}
  }
};


export const FADE = {
  initial: {opacity: 0},
  enter: {
    opacity: 1,
    transition: {duration: 0.3, ease: [0.48, 0.15, 0.25, 0.96]}
  },
  exit: {
    opacity: 0,
    transition: {duration: 0.3, ease: [0.48, 0.15, 0.25, 0.96]}
  }
};

export const SLIDE_UP_2 = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export const DELAY_SLIDE_UP = {
  open: i => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.3,
      y: {stiffness: 1000, velocity: -100}
    }
  }),

  closed: i => ({
    y: 50,
    opacity: 0,
    transition: {
      delay: i * 0.3,
      y: {stiffness: 1000}
    }
  })
};


export const CHILDREN_DELAY = {
  open: {
    transition: {staggerChildren: 0.07, delayChildren: 0.3}
  },
  closed: {
    transition: {staggerChildren: 0.05, staggerDirection: -1}
  }
};
