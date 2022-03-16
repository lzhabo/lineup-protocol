import { motion } from "framer-motion";
import React from "react";

const animations = {
  initial: { opacity: 0, x: 0, y: 100 },
  animate: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const AnimatedPage: React.FC = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1 }}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
