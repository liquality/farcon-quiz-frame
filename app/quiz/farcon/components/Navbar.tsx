/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [userSession, setUserSession] = useState(false);

  return (
    <nav className="flex bg-containerGray justify-between pt-4 pl-3">
      <div className="flex justify-between text-lg w-100 space-x-4 mb-3">
        <a href="/">
          <img
            src="https://docs.liquality.io/img/logo_dark.svg"
            width="100%"
            alt="Logo"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
