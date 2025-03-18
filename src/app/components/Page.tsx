import React from "react";

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return <div className="bg-theme min-h-screen p-4">{children}</div>;
};

export default Page;
