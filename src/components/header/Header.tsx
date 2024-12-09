"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-ulbBlue text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo ou Titre */}
        <div className="text-lg font-bold">
          <Link href="/" className="hover:text-blue-300">
            ULB Stages
          </Link>
        </div>

        {/* Liens de navigation */}
        <nav>
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <Link href="/hopitals" className="hover:text-blue-300">
                Hôpitaux
              </Link>
            </li>
            <li>
              <Link href="/classements" className="hover:text-blue-300">
                Classements
              </Link>
            </li>
            <li>
              <Link href="/places" className="hover:text-blue-300">
                Places
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-300">
                Services
              </Link>
            </li>
            <li>
              <Link href="/preferences" className="hover:text-blue-300">
                Préférences
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
