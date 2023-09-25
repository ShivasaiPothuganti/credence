import Player from "react-lottie-player";
import AboutSectionAnimation from "../../../assets/lottie_animations/AboutSectionAnimation.json";
import './AboutSection.css'

function AboutSection() {
  const title = "Organized Transactions";
  const about =
    "Credence is a user-friendly financial tool designed to simplify your money management. With Credence, you can effortlessly input and organize your transactions, gaining clear visibility of your financial activities. Keep track of your expenses, monitor your spending patterns, and make informed decisions to achieve your financial goals. Take control of your finances with Credence today.";

  return (
    <>
      <section className="about h-screen w-screen bg-primaryWhite">
        <div className="about_container h-[full] w-[full] flex justify-between gap-10 items-center">
          <div className="about_container_left h-full w-[50%] flex-item justify-center items-center">
            <Player animationData={AboutSectionAnimation} loop play />
          </div>
        <div className="about_container_right h-screen w-[60%] flex justify-center items-center shadow-2xl text-[white] bg-[#121212] p-5 rounded-three">
          <div className="about_title relative ">
            <h1 className="text-white text-8xl font-REM mb-10 about_title text-[white]">
              {title}
            </h1>
            <p className="mb-10 text-secondaryWhite"> {about} </p>
            <button className="btn"> Our services </button>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}

export default AboutSection;
