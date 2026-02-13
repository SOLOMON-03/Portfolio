import React from "react";

import Profile from "@/public/Profile.svg";
import Sun from "@/public/Sun.svg";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-background">
      <div className="max-w-310 mx-auto flex justify-end h-16 items-center">
        <div className="flex gap-6 items-center">
          <span>Projects</span>
          <span>Blog</span>
          <Sun />
          <Profile className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
};

export default Header;
