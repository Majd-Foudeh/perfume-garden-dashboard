/* eslint-disable react/prop-types */


import { useEffect , useState  } from 'react';
import axios from 'axios';


// icons

import {FaDonate } from 'react-icons/fa';
import { ImBooks } from "react-icons/im";
import { BsPerson } from "react-icons/bs";
import { RiChatQuoteLine } from "react-icons/ri";
import { GiDelicatePerfume } from 'react-icons/gi';



export const Stats = (props) => {

  const [perfumes, setPerfumes] = useState([]);
  // get total of donors
  useEffect(() => {
    axios
      .get("http://localhost:4000/allPerfumes")
      .then((response) => {
        setPerfumes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [props.refresh]);

  // get total orgs
  const [users , setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [props.refresh]);

  // total donation
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8800/allquotes")
      .then((response) => {
        setQuotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [props.refresh]);

// total of request
const [orders, setOrders] = useState([]);

// useEffect(() => {
//   axios
//     .get("http://localhost:8800/dashboard/charitiesNotActive")
//     .then((response) => {
//       setOrders(response.data);
//       // forceUpdate();
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }, [props.refresh]);







  return (
    <div className="stats stats-vertical xl:stats-horizontal md:stats-horizontal bg-white shadow-lg ">
      <div className="stat">
        <div className="stat-title  text-black font-bold">Total Perfumes</div>
        <div className="stat-value text-[#ffc107]">{perfumes.length}</div>
        <div className="stat-figure text-[#ffc107]">
          <GiDelicatePerfume className="text-[40px]" />
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-[#ffc107]">
          <BsPerson className="text-[40px]" />
        </div>
        <div className="stat-title text-black font-bold">Total Users</div>
        <div className="stat-value text-[#ffc107]">{users.length}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-[#529b03] ">
          <FaDonate className="text-[40px] " />
        </div>
        <div className="stat-title text-[#529b03] font-bold"> Total Orders </div>
        <div className="stat-value text-[#529b03]">{orders.length}</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-[#529b03]">
          <RiChatQuoteLine className="text-[40px] text-[#529b03]" />
        </div>
        <div className="stat-title  text-[#529b03] font-bold">Total Quotes </div>
        <div className="stat-value text-[#529b03]">{quotes.length}</div>
      </div>
    </div>
  );
};
