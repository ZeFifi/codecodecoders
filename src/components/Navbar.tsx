import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="mb-4 flex h-20 w-full items-center border-b border-gray-200 bg-white px-4 font-inter">
      <div className="flex w-full justify-between text-black">
        <div className="items-center">
          <Link href="/">
            <Image src="/images/CCC.png" alt="Logo" width={70} height={70} />
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex gap-4">
            <li>
              <Link className="text-black" href="/">
                Accueil
              </Link>
            </li>
            <li>
              <Link className="text-black" href="/articles">
                Articles
              </Link>
            </li>
            <li>
              <Link className="text-black" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
