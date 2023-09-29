import React from "react";
import "./DeveloperSection.css";
import Shivasai from "@/assets/images/Shivasai.jpg";
import Manikanta from "@/assets/images/Manikanta.jpg";
import githubIcon from "@/assets/Icons/githubIcon.svg";
import gmailIcon from "@/assets/Icons/gmailIcon.svg";
import linkedinIcon from "@/assets/Icons/linkedinIcon.svg";

function DeveloperSection() {
  return (
    <section id="developerinfo" className=" w-screen flex mt-10">
      <div className="developer-section-left h-auto bg-primaryBlack rounded-tr-3xl rounded-br-3xl w-[50%] ">
        <div className="developer-info m-auto p-10 relative z-[1] ">
          <div className="backgroundbox absolute h-10 w-10 z-[-1] bg-primaryPurple rotate-12 rounded-lg top-[10%] right-[20%] "></div>
          <div className="backgroundbox absolute h-36 w-36 z-[-1] rounded-full bg-primaryPurple bottom-[55%] left-[1rem] "></div>
          <img
            className=" developer-image h-[20rem] w-[20rem] object-cover overflow-clip "
            src={Shivasai}
            alt="Developer"
          />
          <h1 className="text-primaryWhite mt-10 mb-10 text-[3rem] ">
            Hi 👋🏻, I am{" "}
            <span className="font-bold text-primaryPurple">Shivasai</span>
          </h1>
          <p className="text-primaryWhite leading-10 text-lg ">
            Passionate Full Stack Developer with expertise in MERN and Java
            stacks, dedicated to crafting end-to-end software solutions.
            Committed to continuous learning, I thrive on embracing new
            technologies to stay at the forefront of innovation. My creative
            problem-solving skills drive me to tackle complex challenges,
            ensuring elegant, efficient, and user-centric app designs
          </p>
          <div className="developer-social-icons mt-7 flex gap-[3rem]">
            <img
              className="h-12 w-[3rem] bg-primaryWhite rounded-md p-1 hover:cursor-pointer "
              src={githubIcon}
              alt=""
            />
            <img
              className="h-12 w-[3rem] bg-primaryWhite rounded-md p-1 hover:cursor-pointer"
              src={gmailIcon}
              alt=""
            />
            <img
              className="h-12 w-[3rem] bg-primaryWhite rounded-md p-1 hover:cursor-pointer"
              src={linkedinIcon}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="developer-section-right flex justify-center items-center bg-primaryWhite h-full w-[50%]">
        <div className="developer-info m-auto p-10 flex flex-col items-end relative z-[1] ">
          <div className="backgroundbox absolute h-36 w-36 z-[-1] rounded-3xl -rotate-12 bg-primaryPurple bottom-[20%] left-[10%] "></div>
          <img
            className=" developer-image h-[20rem] w-[20rem] object-cover overflow-clip "
            src={Manikanta}
            alt="Developer"
          />
          <h1 className=" mt-10 mb-10 text-[3rem] ">
            Hi 👋🏻, I am{" "}
            <span className="font-bold text-primaryPurple">Manikanta</span>
          </h1>
          <p className=" leading-10 text-lg text-right ">
            As a passionate programmer, I like transforming ideas into code. I
            am captivated by the transformative power of innovation and its
            ability to reshape industries and society. I thrive in dynamic
            environments that foster continuous learning. I am always on the
            lookout for opportunities to expand my skills, stay current with
            industry trends, and collaborate with like-minded tech enthusiasts.
          </p>
          <div className="developer-social-icons mt-7 flex gap-[3rem]">
            <a href="https://github.com/ManikantaSai55555" target="_blank"><img
              className="h-12 w-[3rem] shadow-xl rounded-md p-1 hover:cursor-pointer "
              src={githubIcon}
              alt=""
            /></a>
            <a href="mailto:manikaspa.18@gmail.com" target="_blank"><img
              className="h-12 w-[3rem] shadow-xl rounded-md p-1 hover:cursor-pointer"
              src={gmailIcon}
              alt=""
            /></a>
            <a href="https://www.linkedin.com/in/kaspa-manikanta-sai-3713721b0/" target="_blank"><img
              className="h-12 w-[3rem] shadow-xl rounded-md p-1 hover:cursor-pointer"
              src={linkedinIcon}
              alt=""
            /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeveloperSection;
