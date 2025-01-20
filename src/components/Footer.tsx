import Link from "next/link";

export const Footer = () => {
  return (
      <div className="flex flex-col h-20 w-full items-center justify-center border-t border-gray-200 bg-white">
        <h1 className="text-xs md:text-sm text-gray-600 font-inter">Copyright © {new Date().getFullYear()} - CodeCodeCoders. Tous droits réservés.</h1>
    
      <p className="text-xs md:text-sm text-gray-600 font-inter">Hébergé par <Link href="https://www.netlify.com/" target="_blank" className="text-xs md:text-sm text-gray-600 font-inter no-effect underline">Netlify</Link> - 512 2nd Street, Suite 200 San Francisco, CA 94107</p>
    
      </div>
  );
};
