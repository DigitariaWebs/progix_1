'use client';

import React from 'react';
import Image from 'next/image';
import { assets } from '@/config/assets';
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Image
                src={assets.logo}
                alt="PROGIX Logo"
                width={442}
                height={442}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold">PROGIX</span>
            </div>
            <p className="text-gray-400 mb-6">
              Votre partenaire de confiance pour tous vos projets digitaux.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Développement Web
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Applications Mobile
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Data & Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Consulting
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Entreprise</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="/team" className="hover:text-white transition-colors">
                  Notre équipe
                </a>
              </li>
              <li>
                <a href="/team" className="hover:text-white transition-colors">
                  Équipe
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Carrières
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center">
                <FaEnvelope size={16} className="mr-3" />
                <span>contact@progix.pro</span>
              </div>
              <div className="flex items-center">
                <FaPhone size={16} className="mr-3" />
                <span>+1 514 576 5993</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt size={16} className="mr-3" />
                <span>
                  3418 Rue Stanley
                  <br />
                  Montréal, QC H3A 1R8
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 PROGIX. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
