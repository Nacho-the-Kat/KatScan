import React, { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface AvatarProps {
  imageUrl?: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <span>
      <div
        className="w-12 h-12 rounded-full overflow-hidden cursor-pointer border border-gray-300 dark:border-gray-700"
        onClick={handleOpenModal}
      >
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt="Avatar"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)} // Handle 404 error
          />
        ) : (
          <UserCircleIcon className="w-full h-full text-gray-400" />
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div className="p-2 bg-white rounded-lg shadow-lg">
            {imageUrl && !imageError ? (
              <img
                src={imageUrl}
                alt="Avatar Large"
                className="w-64 h-64 object-cover rounded-lg"
                onError={() => setImageError(true)} // Handle 404 error for modal image
              />
            ) : (
              <UserCircleIcon className="w-64 h-64 text-gray-400" />
            )}
          </div>
        </div>
      )}
    </span>
  );
};

export default Avatar;
