"use client";
import React, { useState } from "react";
import { ProjectCard } from "./project-card";
import { ProjectTag } from "./project-tag";

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Linkedin Profile",
    description: "Link to my Linkedin Profile",
    image: "/images/projects/linkedin-logo.png",
    link: "https://www.linkedin.com/in/bernardo-valdivieso/",
    tag: ["All", "Web"],
  },
  {
    id: 2,
    title: "Github Profile",
    description: "Link to my Github Profile",
    image: "/images/projects/git-hub-logo.png",
    link: "https://github.com/BernaValdivieso",
    tag: ["All", "Web"],
  },
  {
    id: 3,
    title: "CV Website Repository",
    description: "Link to this website's repository",
    image: "/images/projects/cv-website.png",
    link: "https://github.com/BernaValdivieso/bernardo-website",
    tag: ["All", "Repository"],
  },
  {
    id: 4,
    title: "Products Backend Repository",
    description: "Link to the products backend repository",
    image: "/images/projects/products-logo.jpg",
    link: "https://github.com/BernaValdivieso/backend-test",
    tag: ["All", "Repository"],
  },
  {
    id: 5,
    title: "Fintoc Integration Repository",
    description: "Link to the Fintoc backend repository",
    image: "/images/projects/fintoc-logo.avif",
    link: "https://github.com/BernaValdivieso/fintoc-integration",
    tag: ["All", "Repository"],
  },
];

export const ProjectsSection = () => {
  const [tag, setTag] = useState("All");

  const filteredProjects = PROJECTS_DATA.filter((project) =>
    project.tag.includes(tag)
  );

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  return (
    <>
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects and web links
      </h2>
      <div className="flex flex-row justify-center items-center gap-2 text-white my-6">
        <ProjectTag
          name="All"
          onClick={handleTagChange}
          isSelected={tag === "All"}
        />
        <ProjectTag
          name="Web"
          onClick={handleTagChange}
          isSelected={tag === "Web"}
        />
        <ProjectTag
          name="Repository"
          onClick={handleTagChange}
          isSelected={tag == "Repository"}
        />
      </div>
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            imgUrl={project.image}
            link={project.link}
          />
        ))}
      </div>
    </>
  );
};
