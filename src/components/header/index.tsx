import React from "react";
import LogoIcon from "@/assets/icons/logo.svg";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <nav className="border-b border-gray-200 shadow-lg">
      <div className="mx-auto flex items-center justify-between px-10 py-2">
        <div onClick={() => router.push("/")} className="flex items-center cursor-pointer">
          <LogoIcon />
        </div>
        <p>Tran Duc Tam - Front-end Developer</p>
      </div>
    </nav>
  );
};

export default Header;
