"use client";

import { IoSchool, IoMail, IoLogoGithub, IoLogoTwitter, IoLogoLinkedin } from "react-icons/io5";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Course", link: "/course" },
    { title: "Enroll", link: "/enroll" },
  ];

  return (
    <footer className="bg-academy-dark border-t border-academy-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <IoSchool className="text-academy-yellow text-3xl" />
              <div>
                <span className="text-xl font-bold text-white">Deboik</span>
                <span className="text-xl font-bold text-academy-yellow"> Academy</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-md mb-4">
              Learn JavaScript once and build for every platform. Master web, mobile, and desktop development with our comprehensive Universal JS course.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-academy-primary transition-colors">
                <IoLogoTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-academy-primary transition-colors">
                <IoLogoLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-academy-primary transition-colors">
                <IoLogoGithub size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.link}>
                  <Link
                    href={link.link}
                    className="text-gray-400 hover:text-academy-yellow transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <IoMail />
                <span>academy@deboik.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-academy-primary/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Deboik Academy. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            A subsidiary of <span className="text-academy-yellow">Deboik</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;