import React from "react";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <h1 className="text-2xl md:text-3xl text-white dark:text-gray-100 font-bold">
      {text}
    </h1>
  );
};

export default Title;
