"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  
  const headerData = {
    title: "ATELIER ST-DISMAS GUYOT JAMES",
    nav: [
      { href: "/", label: "HOME" },
      { href: "/Equipes", label: "ÉQUIPES" },
      { href: "/Services", label: "SERVICES" },
      { href: "/Referance", label: "RÉFÉRENCES" },
      { href: "/Contact", label: "CONTACT" }
    ]
  };

  return (
    <header className="fixed z-50 w-full top-0 left-0" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 500 }}>
      {/* Top Bar */}
      <div className="w-full  color-backgroundHeader backdrop-blur-md flex justify-center items-center py-4">
        <h1 className="text-sm md:text-base uppercase tracking-widest text-black">
          {headerData.title}
        </h1>
      </div>

      {/* Separator */}
      <div className="w-full h-[3px]"></div>

      {/* Navigation Bar */}
      <div className="w-full relative">
        <div className="w-full px-4 md:px-0">
          <div className="flex justify-center items-center">

            {/* Desktop Nav */}
            <nav className="w-full">
              <ul className="flex w-full gap-[3px]">
                {headerData.nav.map((item, index) => {
                  // Determine active state
                  const isActive = pathname === item.href;
                  
                  return (
                    <li key={index} className={`flex-1 text-center color-backgroundHeader backdrop-blur-md transition-colors duration-200 ${isActive ? ' text-text-grey' : ' backdrop-blur-md'}`}>
                      <Link
                        href={item.href}
                        className={`text-sm uppercase tracking-wide block w-full py-3 ${isActive ? 'text-grey0' : 'text-black hover:text-gray-700'}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

          </div>
        </div>
      </div>
    </header>
  );
};
