import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Home, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="mb-4 flex h-20 w-full items-center border-b border-gray-200 bg-white px-4 font-inter text-sm">
      <div className="flex w-full justify-between text-black">
        <div className="items-center">
          <Link href="/" className="no-effect">
            <Image src="/images/CCC.png" alt="Logo" width={70} height={70} />
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex gap-4">
            <li>
              <Link className="text-black hover:text-[#3367c2] no-effect" href="/">
              <div className="flex items-center space-x-1">
                <Home className="size-4" />
                <p>Accueil</p>
              </div>
              </Link>
            </li>
            <li>
              <Link className="text-black hover:text-[#3367c2] no-effect" href="/about">
                <div className="flex items-center space-x-1">
                  <QuestionMarkCircledIcon className="size-4" />
                  <p>À propos</p>
                </div>
              </Link>
            </li>
            <li>
              <Link className="text-black hover:text-[#3367c2] no-effect" href="/contact">
                <div className="flex items-center space-x-1">
                  <Mail className="size-4" />
                  <p>Contact</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
