/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import empty from "../../../public/empty.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TableOfOrdersHistory = ({ refresh, setRefresh }) => {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  const [orders, setOrders] = useState([]);
  const [PerfumesUpdate, setPerfumesUpdate] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    img: "",
  });

  // get all donors
  useEffect(() => {
    axios
      .get("http://localhost:4000/completedOrders")
      .then((response) => {
        setOrders(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [refresh]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerfumesUpdate((prev) => ({
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
        `http://localhost:4000/updateproduct/${PerfumesUpdate._id}`,
        PerfumesUpdate
      );
      notifySuccess("book updated success");
      setRefresh(!refresh);

      console.log("added success", data.data);
      console.log(data.data);
    } catch (err) {
      console.log(err);
      notifyError(err.message);
    }
  };

  const tableRows = orders.map((order) => {
    return (
      <tr key={order._id} className="border-b ">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
        >
           {order.userId.first_Name} {order.userId.last_Name}
        </th>
        <td className="px-4 py-3">{order.userId.user_phoneNumber}</td>
        <td className="px-4 py-3">{order.userId.user_email}</td>
        <td className="px-4 py-3">{order.shippingAddress}</td>

        <td className="px-4 py-3">{order.total} JD</td>
        <td className="px-4 py-3">{new Date(order.date).toLocaleString()}</td>

        {/* <td className="px-4 py-3 flex items-center justify-start gap-2 flex-row-reverse">
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
                  setPerfumesUpdate((prev) => ({
                    ...prev,
                    _id: perfume._id,
                    name: perfume.perfume_name,
                    description: perfume.description,
                    price: perfume.price,
                    category: perfume.perfume_category,
                    img: perfume.perfume_picture,
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
        </td> */}
      </tr>
    );
  });

  return (
    <section className="w-full  mt-5 ">
      <div className="">
        {/* Start coding here */}
        <h1 className="text-[30px] font-bold py-3">Orders History</h1>
        <div className="bg-white  relative shadow-md sm:rounded-2xl overflow-scroll max-h-[300px]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 table-zebra ">
              <thead className="text-xs text-black uppercase bg-[#ffc107] ">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Customer Name 
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Customer Phone Number
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Customer email
                  </th>
                  <th scope="col" className="px-4 py-3">
                  shipping address
                  </th>
                  <th scope="col" className="px-4 py-3">
                   Total paid
                  </th>
                  <th scope="col" className="px-4 py-3">
                  date of order
                  </th>

                  {/* <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {tableRows.length === 0 ? (
                  <div className="p-3 text-lg">There are no Perfumes</div>
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
          <div className="flex justify-end">
            <button
              dir="rtl"
              type="button"
              className="btn btn-sm "
              onClick={() => window.my_modal_1.close()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
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
                value={PerfumesUpdate.name}
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
                value={PerfumesUpdate.category}
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                name="description"
                placeholder="Type here"
                className="input input-sm  border-[#529b03] w-full max-w-xs"
                value={PerfumesUpdate.description}
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
                value={PerfumesUpdate.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Perfumes img</span>
              </label>

              <input
                name="img"
                onChange={handleChange}
                value={PerfumesUpdate.img}
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
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                onClick={() => window.my_modal_1.close()}
              >
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
