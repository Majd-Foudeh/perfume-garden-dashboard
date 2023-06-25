/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

// import 'dotenv/config'
export const QuoteForm = ({ setRefresh, refresh }) => {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const [show, setShow] = useState(false);
  const [quoteInfo, setInfo] = useState({
    name: "",
    quote: "",
    list: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const data = await axios.post(
        "http://localhost:8800/addquote",
        quoteInfo
      );
      notifySuccess("Quote added success");
      setRefresh(!refresh);

      console.log("added success", data.data);
    } catch (err) {
      console.log(err);
      notifyError(err.message);
    }
  };
  const handleShow = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <>
      <div className="flex items-center gap-5">
        <h1 className="text-[30px] font-bold py-2">Add New Quote</h1>
        {!show ? (
          <div className="tooltip tooltip-primary" data-tip=" add new Quote">
            <button
              onClick={handleShow}
              className="btn btn-primary btn-sm btn-circle "
            >
              <IoAddCircleOutline className="text-[20px] font-bold" />
            </button>
          </div>
        ) : (
          <div className="tooltip tooltip-error" data-tip="cancel">
            <button
              onClick={handleShow}
              className="btn btn-error btn-sm btn-circle "
            >
              <MdOutlineCancel className="text-[20px] text-red-600 font-bold" />
            </button>
          </div>
        )}
        <ToastContainer />
      </div>

      {show && (
        <form className="border p-[10px] rounded-lg" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Quote Writer</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Type here"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={quoteInfo.name}
                onChange={handleChange}
              />
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Quote </span>
              </label>
              <input
                type="text"
                name="quote"
                placeholder="Type here"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={quoteInfo.quote}
                onChange={handleChange}
              />
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                name="list"
                placeholder="Type here"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={quoteInfo.list}
                onChange={handleChange}
              />
            </div>
            {/*  */}

            {/* button */}
            <div className="form-control w-full max-w-xs">
              <label className="label invisible">
                <span className="label-text">button</span>
              </label>
              <button type="submit" className="btn btn-sm btn-primary">
                Add
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
