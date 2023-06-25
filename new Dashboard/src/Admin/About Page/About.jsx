import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { RefreshContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const About = () => {
  const [about, setAbout] = useState({_id:'', text: "" });
  
  const { refresh, setRefresh } = useContext(RefreshContext);
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  useEffect(() => {
    axios
      .get("http://localhost:8800/about")
      .then((response) => {
        setAbout(response.data[0]);
    })
      .catch((error) => {
        console.error("Error fetching data:", error);
    });
}, [refresh]);

const handleChange = (e) => {
    setAbout((prev) => ({ ...prev, text: e.target.value }));
    // setUpdateAbout(prev => ({...prev , _id:about._id , text:about.text}))
  };
  const handleSubmit = async (e) => {
        e.preventDefault();
    try {
      const data = await axios.patch(
        `http://localhost:8800/updateabout/${about._id}`,
        about
      );
      notifySuccess("About updated success");
      setRefresh(!refresh);

      console.log("added success", data.data);
    //   e.target.reset();
      setAbout(prev => ({...prev , text:""}))
    } catch (err) {
      console.log(err);
      notifyError(err.message);
    }
    console.log(about);

};
  return (
    <>
      <div>
        <main className="p-4 px-8  md:ml-64 h-auto pt-20 mt-8">
        <h1 className="text-[30px] font-bold py-3">About Us</h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-4 shadow-2xl p-6 rounded-xl bg-info">
            <div className="px-4 py-2 bg-white rounded-lg max-h-[300px] overflow-scroll overflow-x-hidden">
              {about.text}
            </div>
            <div className="px-4 py-2 bg-white rounded-lg max-h-[300px] overflow-scroll overflow-x-hidden">
              <form action="" onSubmit={handleSubmit}>
                <textarea
                  onChange={handleChange}
                  value={about.text}
                  placeholder="Type Your New About Her"
                  className="textarea textarea-bordered  w-full h-[230px]"
                ></textarea>
                <button className="btn btn-sm w-full btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
};
