import React from "react";
import LogoIcon from "@/assets/icons/logo.svg";

const Header = () => {
  return (
    <nav className="border-b shadow-lg border-gray-200 bg-white">
      <div className="mx-auto flex items-center justify-between px-10 py-2">
        <div className="flex items-center">
          <LogoIcon />
        </div>
        <p>Tran Duc Tam</p>
      </div>
    </nav>
  );
};

export default Header;
