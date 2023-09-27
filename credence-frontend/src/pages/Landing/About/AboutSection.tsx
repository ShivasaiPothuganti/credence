import Player from "react-lottie-player";
import AboutSectionAnimation from "../../../assets/lottie_animations/AboutSectionAnimation.json";
import { motion } from "framer-motion";
import "./AboutSection.css";
import { Button } from "@/components/ui/button";

function AboutSection() {
  const title = "Organized Transactions";
  const about =
    "Credence is a user-friendly financial tool designed to simplify your money management. With Credence, you can effortlessly input and organize your transactions, gaining clear visibility of your financial activities. Keep track of your expenses, monitor your spending patterns, and make informed decisions to achieve your financial goals. Take control of your finances with Credence today.";

  return (
    <>
      <section className="about h-screen w-screen bg-primaryWhite">
        <div className="about_container h-full w-full flex justify-between gap-10 items-center">
          <div className="about_container_left h-full w-[50%] flex justify-center items-center">
            <motion.div
              className="box h-[full] w-[full]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <Player animationData={AboutSectionAnimation} loop play />
            </motion.div>
          </div>
          <div className="about_container_right h-screen w-[50%] flex justify-center items-center shadow-2xl text-[white] bg-[#121212] p-5 rounded-three">
            <motion.div
              className="box"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 40,
                  stiffness: 100,
                  restDelta: 0.001,
                },
              }}
            >
              <div className="about_title relative ">
                <h1 className="text-8xl font-REM mb-10 about_title text-[white]">
                  {title}
                </h1>
                <p className="mb-10 text-secondaryWhite"> {about} </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button> Our Services </Button>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutSection;
