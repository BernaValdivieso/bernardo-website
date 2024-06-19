import React from "react";

export const ProjectTag = ({
  name,
  onClick,
  isSelected,
}: {
  name: string;
  onClick: (name: string) => void;
  isSelected: boolean;
}) => {
  const buttonStyles = isSelected
    ? "text-white border-purple-500"
    : "text-[#ADB7BE] border-slate-600 hover:border-white";

  return (
    <button
      onClick={() => onClick(name)}
      className={`border-2 rounded-full px-6 py-3 text-xl cursor-pointer ${buttonStyles}`}
    >
      {name}
    </button>
  );
};
