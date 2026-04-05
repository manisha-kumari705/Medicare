import React from "react";
import {
  HeartPulse,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {

  // 🔹 Links Data
  const quickLinks = ["Home", "About Us", "Services", "Contact"];
  const resources = ["FAQs", "Privacy Policy", "Terms of Service"];

  // 🔹 Social Icons
  const socialIcons = [
    { icon: Facebook },
    { icon: Twitter },
    { icon: Instagram },
    { icon: Linkedin },
  ];

  return (
    <footer className="bg-blue-950 text-white mt-10 lg:mt-20">

      {/* 🔷 Main Footer */}
      <div className="px-4 md:px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 🔹 Logo + Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <HeartPulse size={28} />
            <h2 className="text-xl font-semibold">Medical Profile Card</h2>
          </div>

          <p className="text-sm text-gray-300 mb-4">
            Connecting You to Better Health.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {socialIcons.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-blue-800 p-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                >
                  <Icon size={18} />
                </div>
              );
            })}
          </div>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {quickLinks.map((link, index) => (
              <li
                key={index}
                className="hover:text-white cursor-pointer transition"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* 🔹 Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {resources.map((item, index) => (
              <li
                key={index}
                className="hover:text-white cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 🔹 Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>

          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Darbhanga, Bihar, India</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>support@pashucare.com</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+91 9876543210</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔷 Bottom Line */}
      <div className="md:flex items-center justify-between border-t border-blue-800 text-center p-4 text-sm text-gray-400">
        <p className="max-sm:mb-3">© 2026 MediCard. All rights reserved.</p>
        <p>Devloped & Designed by <span className="text-red-500">Manisha Kumari</span></p>
      </div>
    </footer>
  );
};

export default Footer;