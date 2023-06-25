/* eslint-disable react/prop-types */
import { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


// icons
import { SiCircle } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { BsPerson } from "react-icons/bs";
import { TfiQuoteRight } from "react-icons/tfi";
import { FcAbout } from "react-icons/fc";




export const Aside = (props) => {
  const [hotels, setHotels] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleLogOut() {      
    window.scrollTo(0, 0);
    
    var Nav = document.getElementById("Nav");
    Nav.style.display = "block";
    var Footer = document.getElementById("Footer");
    Footer.style.display = "block";

    localStorage.removeItem("token");
    props.forceUpdate()
  }

  

  

  return (

    <aside className="fixed top-0 z-50 w-60  h-screen pt-[62px] pb-1 transition-transform -translate-x-full  md:translate-x-0"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-[#191a3e] ">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <SiCircle />
              <span className="mr-3">overview</span>
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <ImBooks />
               Books
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <FaHistory />
              History
            </Link>
          </li>
          <li>
            <Link
              to="/writers"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <BsPerson />
              Writers
            </Link>
          </li>
          
          <li>
            <Link
              to="/quotes"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <TfiQuoteRight />
              Quotes
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <FcAbout  />
              About Us
            </Link>
          </li>
          <a href="/###" onClick={handleLogOut}>
            <span 
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
              >
              <FiLogOut />
              Logout
            </span>
          </a>
        </ul>
      </div>
    </aside>
  );
};
