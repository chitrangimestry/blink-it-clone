import { useState } from "react";
// import { FaRegEyeSlash } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios.js";
import SummaryAPI from "../common/summaryAPI.js";
import axiosToastError from "../utils/AxiosToastError.js";
import { Link, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  //   const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // to be edited hereafter : yt timestamp : 3:28:59 
  const validValues = data.every((ele) => ele);

  // JS function
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios({
        ...SummaryAPI.forgotPasswordOTPVerification,
        data,
      });
      if (res.data.error) {
        toast.error(res.data.message);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setData({
          email: "",
          password: "",
        });
        navigate("/verifyOTP");
      }
      console.log("res: ", res);
    } catch (error) {
      axiosToastError(error);
    }
  };

  return (
    <section className=" w-full  container mx-auto flex justify-center items-center  m-5 px-2">
      <div className="mt-6 my-4 w-full  max-w-lg bg-white mx-auto rounded  p-8">
        <p className="text-2xl font-semibold text-center ">Forgot Password</p>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-2 mt-8">
            <label className="relative text-slate-500 mt-3">
              <input
                type="email"
                id="email"
                autoComplete="off"
                autoFocus
                required
                name="email"
                value={data.email}
                onChange={handleChange}
                className="bg-slate-50 w-full outline-none focus:text-slate-800 border-slate-200 border-2 rounded-md p-2  duration-200 peer focus:border-slate-500 bg-inherit"
              />
              <span className="absolute left-0 top-2 px-1 text-md  uppercase tracking-wide focus:text-indigo-500 pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 bg-white ml-2 peer-valid:text-sm peer-valid:-translate-y-5">
                Email
              </span>
            </label>
          </div>
          <button
            disabled={!validateField}
            className={`${
              validateField
                ? "bg-green-500 border-green-700 hover:bg-green-600 border-green-600 cursor-allowed"
                : "bg-gray-500 cursor-not-allowed hover:bg-gray-600 border-gray-600"
            } w-full h-full  p-2 my-2 mt-7  bg-gray-500 border-gray-700 border-2 tracking-widest text-white font-semibold text-md rounded-md hover:bg-gray-600`}
          >
            Get OTP
          </button>
        </form>
        <span className="text-center font-semibold tracking-wide flex flex-row justify-evenly gap-2 mt-5">
          <Link
            to="/register"
            className="tracking-wider text-green-700 font-semibold hover:text-green-400 hover:underline decoration-solid decoration-2 underline-offset-3"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="tracking-wider text-green-700 font-semibold hover:text-green-400 hover:underline decoration-solid decoration-2 underline-offset-3"
          >
            Sign In
          </Link>
        </span>
      </div>
    </section>
  );
};

export default VerifyOTP;
