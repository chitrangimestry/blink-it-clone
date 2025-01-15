import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios.js";
import SummaryAPI from "../common/summaryAPI.js";
import axiosToastError from "../utils/AxiosToastError.js";
import { Link, useNavigate } from "react-router-dom";
const RegisterUser = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const validateField = Object.values(data).every((ele) => ele);
  const navigate = useNavigate();

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

    if (data.password !== data.confirmPassword) {
      return toast.error("Password and Confirm Password must be same");
    }

    try {
      const res = await Axios({
        ...SummaryAPI.register,
        data,
      });
      if (res.data.error) {
        toast.error(res.data.message);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
      console.log("res: ", res);
    } catch (error) {
      // console.log("error: ", error.response.data.message);
      axiosToastError(error);
    }
  };

  return (
    <section className=" w-full  container mx-auto flex justify-center items-center  m-5 px-2">
      <div className="mt-6 my-4 w-full  max-w-lg bg-white mx-auto rounded  p-8">
        <p className="text-2xl font-semibold text-center ">
          Welcome to Blink It
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-2 mt-8">
            <label className="relative text-slate-500 ">
              <input
                type="text"
                id="name"
                autoComplete="off"
                autoFocus
                required
                name="name"
                value={data.name}
                onChange={handleChange}
                className="bg-slate-50 w-full outline-none focus:text-slate-800 border-slate-200 border-2 rounded-md p-2  duration-200 peer focus:border-slate-500 bg-inherit"
              />
              <span className="absolute left-0 top-2 px-1 text-md  uppercase tracking-wide focus:text-indigo-500 pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 bg-white ml-2 peer-valid:text-sm peer-valid:-translate-y-5">
                Name
              </span>
            </label>

            <label className="relative text-slate-500 mt-4">
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

            <label className="relative text-slate-500 mt-4">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="off"
                autoFocus
                required
                name="password"
                value={data.password}
                onChange={handleChange}
                className="bg-slate-50 w-full outline-none focus:text-slate-800 border-slate-200 border-2 rounded-md p-2  duration-200 peer focus:border-slate-500 bg-inherit"
              />
              <div
                onClick={() => setShowPassword((prevData) => !prevData)}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye size={20} className="absolute right-3 top-3 " />
                ) : (
                  <FaRegEyeSlash
                    size={20}
                    className="absolute right-3 top-3 "
                  />
                )}
              </div>

              <span className="absolute left-0 top-2 px-1 text-md  uppercase tracking-wide focus:text-indigo-500 pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 bg-white ml-2 peer-valid:text-sm peer-valid:-translate-y-5">
                Password
              </span>
            </label>

            <label className="relative text-slate-500 mt-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="off"
                autoFocus
                required
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                className="bg-slate-50 w-full outline-none focus:text-slate-800 border-slate-200 border-2 rounded-md p-2  duration-200 peer focus:border-slate-500 bg-inherit"
              />
              <div
                onClick={() => setShowConfirmPassword((prevData) => !prevData)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? (
                  <FaRegEye size={20} className="absolute right-3 top-3 " />
                ) : (
                  <FaRegEyeSlash
                    size={20}
                    className="absolute right-3 top-3 "
                  />
                )}
              </div>
              <span className="absolute left-0 top-2 px-1 text-md  uppercase tracking-wide focus:text-indigo-500 pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 bg-white ml-2 peer-valid:text-sm peer-valid:-translate-y-5">
                Confirm Password
              </span>
            </label>
          </div>
          <button
            disabled={!validateField}
            className={`${
              validateField
                ? "bg-green-500 border-green-700 hover:bg-green-600 border-green-600 cursor-allowed"
                : "bg-gray-500 cursor-not-allowed hover:bg-gray-600 border-gray-600"
            } w-full h-full  p-2 my-2 mt-6 bg-gray-500 border-gray-700 border-2 tracking-widest text-white font-semibold text-md rounded-md hover:bg-gray-600`}
          >
            Register
          </button>
        </form>
        <span className="text-center font-semibold tracking-wide ">
          <p className="mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="tracking-wider text-green-500 font-semibold hover:text-green-700 hover:underline decoration-solid decoration-2 underline-offset-3"
            >
              Log in
            </Link>
          </p>
        </span>
        <span className="flex text-center text-sm text-slate-400 mt-3">
          <p className="disabled cursor-default">
            By continuing, you agree to our{" "}
            <Link
              to={"/terms"}
              className="underline decoration-dotted underline-offset-3 cursor-pointer hover:text-gray-600 "
            >
              Terms of service
            </Link>{" "}
            &{" "}
            <Link
              to={"/privacyPolicy"}
              className="underline decoration-dotted underline-offset-3 cursor-pointer hover:text-gray-600 "
            >
              Privacy Policy
            </Link>
          </p>
        </span>
      </div>
    </section>
  );
};

export default RegisterUser;
