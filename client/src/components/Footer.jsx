import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="border-t ">
      <div className="container mx-auto p-4 flex flex-col gap-3">
        <p className="text-center text-gray-400 disabled">
          &#169;All Rights Reserved &#64;2024
        </p>
        <div className="flex items-center justify-center space-x-4 text-2xl">
          <a href="" className="hover:text-primary-100">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-primary-100">
            <FaInstagram/>
          </a>
          <a href="" className="hover:text-primary-100">
            <FaLinkedinIn/>
          </a>
          <a href="" className="hover:text-primary-100">
            <FaGithubAlt/>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
