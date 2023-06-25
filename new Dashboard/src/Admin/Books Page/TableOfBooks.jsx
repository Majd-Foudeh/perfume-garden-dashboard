/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import { useEffect, useState} from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidMessageSquareEdit } from "react-icons/bi";

import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TableOfBooks = ({ refresh, setRefresh }) => {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const [books, setBooks] = useState([]);
  const [bookUpdate, setBookUpdate] = useState({
    _id: "",
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
  

  // get all donors
  useEffect(() => {
    axios
      .get("http://localhost:8800/allproducts")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [refresh]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: `Are yoy sure to delete this book ?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` Book was Deleted Successfully`, "", "success");

        axios
          .patch("http://localhost:8800/deleteproduct/" + id)
          .then((response) => {
            console.log(response.data);
            setRefresh(!refresh);
          })

          .catch((error) => console.log(error.message));
      } else Swal.fire("Cancel", "", "error");
    });
  };
  const handleSubmitUpdate = async (event) => {
    try {
      event.preventDefault();

      const data = await axios.patch(
        `http://localhost:8800/updateproduct/${bookUpdate._id}`,
        bookUpdate
      );
      notifySuccess("book updated success");
      setRefresh(!refresh);

      console.log("added success", data.data);
    } catch (err) {
      console.log(err);
      notifyError(err.message);
    }
  };

  const tableRows = books.map((book) => {
    return (
      <tr key={book._id} className="border-b ">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
        >
          {book.name}
        </th>
        <td className="px-4 py-3">{book.category}</td>
        <td className="px-4 py-3">{book.author}</td>
        <td className="px-4 py-3">{book.pages}</td>
        <td className="px-4 py-3">{book.ratings}</td>
        <td className="px-4 py-3">{book.price}</td>
        <td className="px-4 py-3">{book.description}</td>
        <td className="px-4 py-3">{book.quantity}</td>

        <td className="px-4 py-3 flex items-center justify-start gap-2 flex-row-reverse">
          <div
            id=""
            className="bg-white  rounded divide-y divide-gray-100 shadow "
          >
            <div className="tooltip tooltip-info text-white" data-tip="Edit">
              <button
                // onClick={() => handleUpdate(book._id)
                // }
                onClick={() => {
                  window.my_modal_1.showModal();
                  setBookUpdate((prev) => ({
                    ...prev,
                    _id: book._id,
                    name: book.name,
                    description: book.description,
                    price: book.price,
                    category: book.category,
                    ratings: book.ratings,
                    quantity: book.quantity,
                    pages: book.pages,
                    author: book.author,
                    img: book.img,
                  }));
                }}
                className="btn bg-white hover:bg-info shadow-lg hover:shadow-xl border-none "
              >
                <BiSolidMessageSquareEdit className="text-neutral text-[18px]" />
              </button>
            </div>
          </div>
          <div
            id=""
            className="bg-white  rounded divide-y divide-gray-100 shadow "
          >
            <div className="tooltip tooltip-error text-white" data-tip="Delete">
              <button
                onClick={() => handleDelete(book._id)}
                className="btn bg-white hover:bg-red-200 shadow-lg hover:shadow-xl border-none "
              >
                <AiOutlineDelete className="text-red-500 text-[18px]" />
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <section className="w-full  mt-5 ">
      <div className="">
        {/* Start coding here */}
        <h1 className="text-[30px] font-bold py-3">Books</h1>
        <div className="bg-white  relative shadow-md sm:rounded-2xl overflow-scroll max-h-[300px]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 table-zebra ">
              <thead className="text-xs text-white uppercase bg-[#529b03] ">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Book Tilte
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Author
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Pages
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Rating
                  </th>
                  <th scope="col" className="px-4 py-3">
                    price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Quantity
                  </th>

                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.length === 0 ? (
                  <div className="p-3 text-lg">There are no Books</div>
                ) : (
                  tableRows
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <form
          onSubmit={handleSubmitUpdate}
          method="dialog"
          className="modal-box"
        >
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
                value={bookUpdate.name}
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
                value={bookUpdate.category}
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
                value={bookUpdate.author}
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
                value={bookUpdate.description}
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
                value={bookUpdate.price}
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
                value={bookUpdate.quantity}
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
                value={bookUpdate.ratings}
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
                value={bookUpdate.pages}
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
                value={bookUpdate.img}
                type="text"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
              />
            </div>
            {/*  */}

            {/*  */}
            <div className="form-control w-full max-w-xs col-start-3">
              <label className="label invisible">
                <span className="label-text">button</span>
              </label>
              <button type="submit" className="btn btn-sm btn-primary">
                update
              </button>
            </div>
          </div>
          {/* <div className="btn " onClick={ handleKeyPress }>x</div> */}
        </form>
      </dialog>
    </section>
  );
};
