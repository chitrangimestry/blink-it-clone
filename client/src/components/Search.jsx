import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa6";
import { useMobile } from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const isSearchPage = location.pathname === "/search";
  const [isSearchPage, setSearchPage] = useState(false);
  const [ isMobile ] = useMobile();
 
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setSearchPage(isSearch);
  }, [location]);
  // console.log(isSearchPage);
  const redirectTosearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-full border border-zinc-400 overflow-hidden flex items-center text-neutral-500 bg-slate-100 group focus-within:border-gray-600 border-1">
      {/* <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
        <IoSearch size={24} />
      </button> */}

      {
        (isMobile && isSearchPage) ? (
          <Link to={"/"} className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-gray-600 bg-white rounded-full shadow-md">
              <FaArrowLeft size={20}/>
            </Link>
        ) : ( 
              <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
                <IoSearch size={24} />
              </button>
            )
      }

        <div>
            {/*  */}

            
        </div>
      <div>
        {!isSearchPage ? (
          // not in search page
          <div onClick={redirectTosearchPage} className="w-full h-full">
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Search 'Milk' ",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Search 'Flour'",
                1000,
                "Search 'Bread'",
                1000,
                "Search 'Pet Care'",
                1000,
                "Search 'Eggs'",
                1000,
                "Search 'Snacks & Munchies'",
                1000,
                "Search 'Chocolates, Candies & Gums'",
                1000,
                "Search 'Baby Care'",
                1000,
                "Search 'Cereal'",
                1000,
                "Search 'Grams'",
                1000,
                "Search 'Sugar'",
                1000,
                "Search 'Tea & Coffee'",
                1000,
                "Search 'Wellness & Hygiene'",
                1000,
                "Search 'Nuts'",
                1000,
                "Search 'Energy Drinks, Juices and Drinks'",
                1000,
                "Search 'Paneer'",
                1000,
                "Search 'International Foods'",
                1000,
                "Search 'Pulses'",
                1000,
                "Search 'Meat and Fish'",
                1000,
                "Search 'Instant & Frozen Food'",
                1000,
                "Search 'Dairy and Breakfast'",
                1000,
                "Search 'Ice-creams & Desserts'",
                1000,
                "Search 'Sauces and Spreads'",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          // in the search page

          <div className="w-full h-full bg-transparent outline-none text-sm">
            <input
              type="text"
              placeholder="Search for rice and more..."
              autoFocus={true}
              className="w-full h-full bg-transparent outline-none"
            ></input>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
