export const SLIDE_UP = {
    initial: {opacity: 0, y: 100},
    enter: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
    },
    exit: {
        opacity: 0,
        y: 200,
        transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
    }
};
