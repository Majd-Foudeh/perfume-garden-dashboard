/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

// import 'dotenv/config'
export const BookForm = ({ setRefresh, refresh }) => {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const [file, setFile] = useState(null);

  const [show, setShow] = useState(false);
  const [perfumeInfo, setPerfumeInfo] = useState({
    perfume_name: "",
    category: "",
    gender: "",
    price: "",
    description: "",
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

      const formData = new FormData();
      formData.append("image", file);
      formData.append("perfume_name", perfumeInfo.perfume_name);
      formData.append("category", perfumeInfo.category);
      formData.append("price", perfumeInfo.price);
      formData.append("description", perfumeInfo.description);
      formData.append("gender", perfumeInfo.gender);

      const data = await axios.post(
        "http://localhost:4000/addPerfume",
        formData
      );
      notifySuccess("perfume added success");
      setRefresh(!refresh);

      console.log("added success", data.data);
      // setPerfumeInfo({
      //   perfume_name: "",
      //   category: "",
      //   price: "",
      //   description: "",
      // });
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
        <h1 className="text-[30px] font-bold py-2">Add New Perfume</h1>
        {!show ? (
          <div className="tooltip tooltip-warning" data-tip=" add new book">
            <button
              onClick={handleShow}
              className="btn bg-[#ffc107] btn-sm btn-circle "
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
                <span className="label-text">Perfume Name</span>
              </label>
              <input
                type="text"
                name="perfume_name"
                placeholder="Type here"
                className="input input-sm  border-[#ffc107] w-full max-w-xs"
                onChange={(e) => {
                  setPerfumeInfo({
                    ...perfumeInfo,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
            {/*  */}
            {/* <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                name="category"
                placeholder="Type here"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                onChange={(e) => {
                  setPerfumeInfo({
                    ...perfumeInfo,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div> */}
            <div>
              <label
                for="small"
                class="block mb-2 text-sm text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="small"
                class=" block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="category"
                onChange={(e) => {
                  setPerfumeInfo({
                    ...perfumeInfo,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option selected>Choose a category</option>
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Strong">Strong</option>
              </select>
            </div>
            <div>
              <label
                for="small"
                class="block mb-2 text-sm text-gray-900 dark:text-white"
              >
                Audience category
              </label>
              <select
                id="small"
                class="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="gender"
                onChange={(e) => {
                  setPerfumeInfo({
                    ...perfumeInfo,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option selected>Choose the audience category</option>
                <option value="Men">For Men</option>
                <option value="Women">For Women</option>
              </select>
            </div>
            {/*  */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Price For ml</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="Type here"
                className="input input-sm  border-[#ffc107] w-full max-w-xs"
                onChange={(e) => {
                  setPerfumeInfo({
                    ...perfumeInfo,
                    [e.target.name]: e.target.value,
                  });
                }}
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
                className="input input-sm  border-[#ffc107] w-full max-w-xs"
                onChange={(e) => {
                  setPerfumeInfo({
                    ...perfumeInfo,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>

            {/*  */}

            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    class="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  name="img"
                  class="hidden"
                  // onChange={(e) => {
                  //   setPerfumeInfo({
                  //     ...perfumeInfo,
                  //     [e.target.name]: e.target.value,
                  //   });
                  // }}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    console.log(e.target.files[0]);
                  }}
                />
              </label>
            </div>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label invisible">
              <span className="label-text">button</span>
            </label>
            <button type="submit" className="btn btn-sm bg-[#ffc107]">
              Add
            </button>
          </div>
          {/*  */}
        </form>
      )}
    </>
  );
};
