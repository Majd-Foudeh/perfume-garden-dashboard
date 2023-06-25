/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";


// import 'dotenv/config'
export const BookForm = ({ setRefresh ,refresh}) => {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const [show, setShow] = useState(false);
  const [bookInfo, setInfo] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    ratings: "",
    quantity: "",
    pages: "",
    author: "",
    img: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    console.log("drobi");

    try {
      event.preventDefault();

      const data = await axios.post(
        "http://localhost:8800/addproduct",
        bookInfo
      );
      notifySuccess("book added success");
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
        <h1 className="text-[30px] font-bold py-2">Add New Book</h1>
        {!show ? (
          <div className="tooltip tooltip-primary" data-tip=" add new book">
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
                <span className="label-text">Book Title</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Type here"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={bookInfo.name}
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
                name="category"
                placeholder="Type here"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={bookInfo.category}
                onChange={handleChange}
              />
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">author</span>
              </label>
              <input
                type="text"
                name="author"
                placeholder="Type here"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={bookInfo.author}
                onChange={handleChange}
              />
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                name="description"
                placeholder="Type here"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={bookInfo.description}
                onChange={handleChange}
              />
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                min="0"
                name="price"
                placeholder="0"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={bookInfo.price}
                onChange={handleChange}
              />
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                min="0"
                name="quantity"
                placeholder="0"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={bookInfo.quantity}
                onChange={handleChange}
              />
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <input
                type="number"
                min="0"
                max="5"
                name="ratings"
                placeholder="0"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={bookInfo.ratings}
                onChange={handleChange}
              />
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Pages</span>
              </label>
              <input
                type="number"
                min="0"
                name="pages"
                placeholder="0"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={bookInfo.pages}
                onChange={handleChange}
              />
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Book img</span>
              </label>

              <input
                name="img"
                onChange={handleChange}
                type="text"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
              />
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label invisible">
                <span className="label-text">button</span>
              </label>
              <button type="submit" className="btn btn-sm btn-primary">
                Add
              </button>
            </div>
            {/*  */}
          </div>
        </form>
      )}
    </>
  );
};
