import React from "react";
import blinkitlogo from "../assets/blinkitlogo.png";
import Search from "./Search.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { useMobile } from "../hooks/useMobile.jsx";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const isSearchPage = location.pathname === "/search";

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex items-center flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center justify-between  p-2">
          {/* Logo */}
          <div className="h-full">
            <Link
              to={"/"}
              href="/"
              className="h-full flex items-center justify-center "
            >
              <img
                src={blinkitlogo}
                alt="Logo"
                height={20}
                width={170}
                className="hidden lg:block"
              />
              <img
                src={blinkitlogo}
                alt="Logo"
                height={20}
                width={120}
                className="lg:hidden"
              />
            </Link>
          </div>

          {/* Search bar */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* login & mycart */}
          <div className="flex hidden lg:flex justify-center items-center gap-10 ">
            <div className="hidden lg:block">
              <button className="" onClick={redirectToLoginPage}>Login</button>
            </div>
            
            <div className=" hidden lg:flex font-bold">
              <button className=" flex justify-center items-center gap-3 w-full h-full bg-green-700 p-4 rounded-xl text-white  hover:bg-green-500">
                <BsCart3 className="animate-bounce" size={25} /> <p>My Cart</p>
                {/* <div className="hidden">
                 <p> 1 item </p> 
                 <p>Total Price</p> 
              </div> */}
              </button>
            </div>
          </div>
          <button className="text-neutral-600 lg:hidden">
              <FaUserCircle size={28} />
            </button>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
