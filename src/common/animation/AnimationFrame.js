import { motion } from "framer-motion";
import { pointColor } from "common/theme/theme";

export default function AnimationFrame(props) {
    const { variants, noFlexShrink, background } = props;
    return (
        <motion.div
            className="animation-frame"
            style={{
                background: background || "transparent",
            }}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants || null}
        >
            {props.children}
        </motion.div>
    );
}
