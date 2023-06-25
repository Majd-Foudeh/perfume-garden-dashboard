import { useEffect, useState, useReducer } from "react";
import { CiCircleRemove, CiCircleCheck } from "react-icons/ci";

// import { BiEdit } from "react-icons/bi";
import Swal from "sweetalert2";
import axios from "axios";

export const TableOfHistory = () => {
  const [donations, setDonations] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
 
  //  get all donation request
  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/notActiveDonations")
      .then((response) => {
        setDonations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);


  // accept donation request
  const handleAccepted = (id) => {
    axios
      .put("http://localhost:8000/dashboard/acceptDonation/" + id)
      .then((response) => {
        console.log(response.data);
        forceUpdate();
      })
      .catch((error) => console.log(error.message));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "تمت الموافقة بنجاح",
      showConfirmButton: false,
      timer: 1800,
    });
    // forceUpdate();
  };
  // reject donation request
  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: ` هل أنت متأكد من عدم قبول هذا التبرع؟`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "تأكيد",
      cancelButtonText: "إلغاء",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` تم رفض هذا التبرع `, "", "success");

        axios
          .delete("http://localhost:8000/dashboard/rejectDonation/" + id)
          .then((response) => {
            console.log(response.data);
          }).then(()=>{
            
            forceUpdate();
          })
          .catch((error) => console.log(error.message));
      } else Swal.fire(" Cancelled", "", "error");
    });
  };
  
  const tableRows = donations.map((donation) => {
    return (
      <tr key={donation._id} className="border-b ">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
        >
          {donation.name}
        </th>
        <td className="px-4 py-3">{donation.email}</td>
        <td className="px-4 py-3">{donation.phone}</td>
        <td className="px-4 py-3">{donation.address}</td>
        <td className="px-4 py-3">{donation.order_status}</td>
        <td className="px-4 py-3">{donation.number_pieces}</td>
        <td className="px-4 py-3">{donation.type}</td>
        <td className="px-4 py-3">{donation.description}</td>

        <td className="px-4 py-3 flex items-center justify-end">
          <div
            id=""
            className="bg-white flex  rounded divide-y divide-gray-100 gap-2  "
          >
            <div
              className="tooltip tooltip-success text-white "
              data-tip="قبول"
            >
              <button
                onClick={() => handleAccepted(donation._id)}
                className="btn bg-white hover:bg-green-200 shadow-lg hover:shadow-xl border-none "
              >
                <CiCircleCheck className="text-green-500 text-[20px]" />
              </button>
            </div>
            <div className="tooltip tooltip-error text-white" data-tip="رفض">
              <button
                onClick={() => handleDelete(donation._id)}
                className="btn bg-white hover:bg-red-200 shadow-lg hover:shadow-xl border-none "
              >
                <CiCircleRemove className="text-red-500 text-[20px]" />
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
        <h1 className="text-[30px] font-bold py-3">طلبات التبرع</h1>
        {/* Start coding here */}
        <div className="bg-white  relative shadow-md sm:rounded-2xl overflow-scroll max-h-[300px]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right text-gray-500  table-zebra">
              <thead className="text-xs text-white uppercase bg-teal-600 ">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    اسم المتبرع
                  </th>
                  <th scope="col" className="px-4 py-3">
                    الإيميل
                  </th>
                  <th scope="col" className="px-4 py-3">
                    رقم الهاتف
                  </th>
                  <th scope="col" className="px-4 py-3">
                    العنوان
                  </th>
                  <th scope="col" className="px-4 py-3">
                    حالة التبرع
                  </th>
                  <th scope="col" className="px-4 py-3">
                    عدد القطع
                  </th>
                  <th scope="col" className="px-4 py-3">
                    النوع
                  </th>
                  <th scope="col" className="px-4 py-3">
                    وصف
                  </th>

                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.length === 0 ? (
                  <div className="p-3 text-lg">لا يوجد طلبات تبرع</div>
                ) : (
                  tableRows
                )}
             
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
