"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import { TabButton } from "./tap-button";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Typescript</li>
        <li>Javascript</li>
        <li>Python</li>
        <li>Node.js</li>
        <li>Next.js</li>
        <li>React.js</li>
        <li>AWS</li>
        <li>Retool</li>
        <li>MongoDB</li>
        <li>Scrum</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Pontificia Universidad Católica de Chile, Santiago</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>Bloomberg Market Concepts Certificate</li>
      </ul>
    ),
  },
];

export const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white">
      <div className="gap-8 items-center py-8 px-4 xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-16">
        <Image
          src="/images/ai-generated-astronaut.webp"
          alt="about me image"
          width={500}
          height={500}
          priority
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-white text-base md:text-lg">
            I&apos;m a dedicated software engineer with a fervent enthusiasm for
            technology and process automation. With a background in the dynamic
            environment of financial startups, I bring a wealth of experience
            collaborating with diverse teams. I am adept at initiating process
            enhancements and have successfully spearheaded large-scale projects,
            overseeing them from inception to completion while driving
            continuous improvement. Committed to ongoing professional growth, I
            aspire to broaden my horizons and embrace every challenge as an
            opportunity for learning and development.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              isTabActive={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              isTabActive={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              isTabActive={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};
