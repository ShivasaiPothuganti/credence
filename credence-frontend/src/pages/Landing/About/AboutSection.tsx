import Player from "react-lottie-player";
import AboutSectionAnimation from "../../../assets/lottie_animations/AboutSectionAnimation.json";
import { motion } from "framer-motion";
import "./AboutSection.css";
import { Button } from "@/components/ui/button";

function AboutSection() {
  const title = "Organized Transactions";
  const about =
    "Credence is a user-friendly financial tool engineered to streamline your financial management experience. Using Credence, you can easily input and structure your financial transactions, granting you a transparent overview of your monetary interactions. Take charge of your expenditures, observe your spending trends, and equip yourself with the insights needed to make well-informed financial choices to reach your objectives. Additionally, this application offers the capability to divide expenses among a group of individuals and provides a platform for creating shared spaces to manage joint financial transactions.";

  return (
    <>
      <section id="about" className="about h-screen w-full bg-primaryWhite">
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
          <div className="about_container_right relative h-screen w-[50%] flex justify-center items-center text-[white] bg-primaryBlack p-5 rounded-three">
          <div className="backgroundbox absolute h-16 w-16 rounded-3xl rotate-12 bg-primaryPurple top-[10%] right-[75%] "></div>
          <div className="backgroundbox absolute h-[20rem] w-[20rem] bottom-[-5rem] right-[-5rem] rounded-[50%] bg-primaryPurple "></div>
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
                <h1 className="text-8xl font-primary mb-10 about_title text-primaryWhite">
                  {title}
                </h1>
                <p className="mb-10 font-secondary text-secondaryWhite"> {about} </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                >
                  <Button className="font-secondary" variant={'secondary'} > Our Services </Button>
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
