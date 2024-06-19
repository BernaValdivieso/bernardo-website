import React from "react";
import Image from "next/image";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

export const ProjectCard = ({
  imgUrl,
  title,
  link,
  description,
}: {
  imgUrl: string;
  title: string;
  link: string;
  description: string;
}) => {
  return (
    <div className="group">
      <div className="relative h-52 md:h-72">
        <Image
          className="rounded-t-xl object-cover"
          src={imgUrl}
          alt={title}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
        />
        <div className="overlay absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 items-center justify-center">
          <a
            target="_blank"
            href={link}
            rel="noopener noreferrer"
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white mr-4 group/link"
          >
            <EyeIcon className="h-10 w-10 text-[#ADB7BE] group-hover/link:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </a>
          <a
            target="_blank"
            href={link}
            rel="noopener noreferrer"
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] group-hover/link:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </a>
        </div>
      </div>
      <div className="bg-[#181818] rounded-b-xl py-6 px-4 text-white">
        <h5 className="font-lg font-semibold">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};
