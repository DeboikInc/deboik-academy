"use client";

import { useState, useEffect } from "react";
import { IoMenu, IoClose, IoBook, IoSchool } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import logo from '../../public/logo-academy.png'
import Whatsapp from '@/components/Whatsapp'


const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Course", link: "/course" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav>
      <section className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isFixed ? "bg-academy-dark/95 backdrop-blur-sm shadow-lg shadow-academy-primary/10" : "bg-transparent"
        }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Academy Logo"
              width={150}
              height={150}
            />
            <span className="text-2xl font-bold text-academy-yellow mt-2">Academy</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className={`text-sm font-medium transition-colors duration-200 ${pathname === item.link
                  ? "text-academy-yellow"
                  : "text-gray-300 hover:text-academy-primary"
                  }`}
              >
                {item.title}
              </Link>
            ))}
            <Link
              href="/enroll"
              className="btn-primary flex items-center space-x-2"
            >
              <IoBook />
              <span>Enroll Now</span>
            </Link>

          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <IoClose size={28} /> : <IoMenu size={28} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-academy-dark/98 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((item) => (
              <Link
              key={item.link}
              href={item.link}
              onClick={() => setOpen(false)}
              className={`block py-2 px-4 rounded-lg text-sm font-medium ${pathname === item.link
                ? "bg-academy-primary/20 text-academy-yellow"
                : "text-gray-300 hover:bg-academy-primary/10"
                }`}
                >
                {item.title}
              </Link>
            ))}
            <Link
              href="/enroll"
              onClick={() => setOpen(false)}
              className="block w-full text-center btn-primary"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      )}
      </section>
      <Whatsapp />
    </nav>
  );
};

export default Navbar;