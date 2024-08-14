import React, { useEffect } from "react";
import LandingCard from "./LandingCard";
import MyLoader from "../common/LadingCardLoading";
import { motion } from "framer-motion";
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function LandingCardContainer() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <section className="w-full mt-24 py-10 ">
      <div className="md:max-w-[1100px] w-11/12 m-auto">
        <h1 className="text-3xl font-bold font-helvetica mb-10 text-center md:text-left">
          COLECCIÓN 2024
        </h1>
        <motion.div
          className="flex flex-wrap gap-5 m-auto justify-center z-10"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {!isLoading
            ? [...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  className="item flex flex-row"
                  variants={item}
                >
                  <MyLoader />
                </motion.div>
              ))
            : [...Array(20)].map((_, index) => (
                <motion.div key={index} className="item" variants={item}>
                  <LandingCard />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
}

export default LandingCardContainer;
