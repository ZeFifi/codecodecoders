"use client"

import { HamburgerMenuIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Home, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <nav className="mb-4 flex h-20 w-full items-center border-b border-gray-200 bg-[#fafafb] px-4 font-inter text-sm">
      <div className="relative w-full flex items-center">
          <HamburgerMenuIcon className="size-6 absolute left-0 md:hidden" onClick={() => setIsOpen(!isOpen)} />
        <div className="flex w-full justify-center md:justify-between text-black">
          <div className="items-center">
            <Link href="/" className="no-effect block">
              <Image src="/images/CCC.png" alt="Logo" width={70} height={70} />
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <ul className="flex gap-8">
              <li>
                <Link className="text-black no-effect" href="/">
                  <p className="font-semibold hover:bg-gray-200 p-2 rounded-md">Accueil</p>
                </Link>
              </li>
              <li>
                <Link className="text-black no-effect" href="/about">
                    <p className="font-semibold hover:bg-gray-200 p-2 rounded-md">À propos</p>
                </Link>
              </li>
              <li>
                <Link className="text-black no-effect" href="/contact">
                    <p className="font-semibold hover:bg-gray-200 p-2 rounded-md">Contact</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div className={`fixed top-20 left-0 w-full h-full bg-white z-10 
      transform transition-transform duration-300 ease-in-out md:hidden p-6
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <ul className="flex flex-col gap-4">
              <li>
                <Link className="text-black hover:text-[#3367c2] no-effect" href="/">
                <div className="flex items-center space-x-2">
                  <Home className="size-4" />
                  <p>Accueil</p>
                </div>
                </Link>
              </li>
              <li>
                <Link className="text-black hover:text-[#3367c2] no-effect" href="/about">
                  <div className="flex items-center space-x-2">
                    <QuestionMarkCircledIcon className="size-4" />
                    <p>À propos</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link className="text-black hover:text-[#3367c2] no-effect" href="/contact">
                  <div className="flex items-center space-x-2">
                    <Mail className="size-4" />
                    <p>Contact</p>
                  </div>
                </Link>
              </li>
            </ul>
    </div>
    </>
  );
};

