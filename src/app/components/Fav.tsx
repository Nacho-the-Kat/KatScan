import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

interface FavProps {
  checked?: boolean;
}

const Fav: React.FC<FavProps> = ({ checked = false }) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <button
      onClick={() => setIsChecked(!isChecked)}
      className="transition-colors duration-300 text-gray-900 hover:text-teal-400"
    >
      <StarIcon className={`w-6 h-6 ${isChecked ? 'fill-teal-400 text-teal-400' : 'fill-gray-700'}`} />
    </button>
  );
};

export default Fav;
