import React from "react";

// component & store
import { themeStore } from "../../store/manyStore";

// icons
import { FaGithub, FaFacebook, FaFacebookMessenger } from "react-icons/fa";

const Footer = () => {
  const isDark = themeStore((state) => state.isDark);

  return (
    <div
      className={`w-full flex text-white justify-between items-center px-5 py-3 ${
        isDark ? "bg-deep-brown" : "bg-soft-red"
      }`}
    >
      <h2 className="text-xs sm:text-xl tracking-wide">
        <span>&copy;</span> 2025 Rhogenn Saingga. All rights reserved.
      </h2>
      <div className="flex gap-4">
        <a href="https://m.me/Rhogenn" target="_blank">
          <FaFacebookMessenger
            size={20}
            className="cursor-pointer duration-200 ease-in-out hover:scale-90"
          />
        </a>

        <a
          href="https://github.com/ManaChanCoder?tab=repositories"
          target="_blank"
        >
          <FaGithub
            size={20}
            className="cursor-pointer duration-200 ease-in-out hover:scale-90"
          />
        </a>
        <a href="https://www.facebook.com/Rhogenn" target="_blank">
          <FaFacebook
            size={20}
            className="cursor-pointer duration-200 ease-in-out hover:scale-90"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
