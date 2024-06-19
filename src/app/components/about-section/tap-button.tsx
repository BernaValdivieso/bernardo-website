import React from "react";

export const TabButton = ({
  isTabActive,
  selectTab,
  children,
}: {
  isTabActive: boolean;
  selectTab: () => void;
  children: React.ReactNode;
}) => {
  const buttonClasses = isTabActive
    ? "text-white border-purple-500 border-b"
    : "text-[#ADB7BE]";

  return (
    <button onClick={selectTab}>
      <p className={`mr-3 font-semibold hover:text-white ${buttonClasses}`}>
        {children}
      </p>
    </button>
  );
};
