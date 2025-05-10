import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
// import { Helmet } from "react-helmet";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useContext } from "react";
import { Store } from "../../Context";

const Login = () => {
  const navigate = useNavigate();
  const { isloggedin, setIsLoggedIn, setUser, setUpdatedCart } =
    useContext(Store);

  const [isBtn, setIsBtn] = useState(false);
  const [pswd, setPswd] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [isWait, setIsWait] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBtn(true);
    setLoading(true);

    setTimeout(() => {
      setIsWait(true);
    }, 10000);

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      const url = `${import.meta.env.VITE_BASE_URL}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      const {
        sucess,
        error,
        jwtToken,
        name,
        email,
        _id,
        dp,
        joinDate,
        address,
        phone,
        message,
        cart,
      } = result;
      if (!sucess) {
        handleError(message);
        setIsBtn(false);
        setLoading(false);
        setIsWait(false);
      }
      if (sucess) {
        setLoading(false);
        setIsWait(false);
        handleSuccess(message);

        localStorage.setItem("token", jwtToken);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("userId", _id);
        localStorage.setItem("date", joinDate);
        localStorage.setItem("address", address);
        localStorage.setItem("phone", phone);

        if (cart) {
          localStorage.setItem("cart", JSON.stringify(cart));
          setUpdatedCart(cart);
        }
        if (localStorage.getItem("token")) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }

        if (!dp === undefined || "undefined" || "") {
          localStorage.setItem("avatar", dp);
        }
        if (isloggedin) {
          setUser({
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            phone: localStorage.getItem("phone"),
            address: localStorage.getItem("address"),
            joinDate: localStorage.getItem("joinDate"),
            avatar: localStorage.getItem("avatar"),
            preview: "",
            userId: localStorage.getItem("userId"),
          });
        }

        setTimeout(() => {
          navigate("/");
          setIsBtn(true);
        }, 1000);
      } else if (error) {
        handleError(error?.details[0].message);
        setIsBtn(false);
      }
    } catch (error) {
      console.log(error);
      setIsBtn(false);
    }
  };

  return (
    <div className=" bg-black z-10 w-full h-svh flex justify-center items-center   bg-no-repeat bg-center bg-cover bg-[url('/mainpage_bg.jpg')] aspect-video">
      {/* <Helmet>
        <title>Login - Flexifyy</title>
        <meta name="description" content="user login page" />
      </Helmet> */}
      <div className=" w-full h-svh flex justify-center items-center fixed  z-10"></div>
      <header
        className={` text-white sm:px-10 sm:py-2 z-40 flex top-0 justify-between fixed w-full  items-center duration-75 ease-in`}
      ></header>
      <ToastContainer />
      <div className="flex justify-center items-center w-full h-full z-40  backdrop-blur-sm">
        <div className=" p-8 rounded-lg shadow-lg w-full  max-w-md relative mx-5 ">
          <Link to="/">
            <div className="logo   flex justify-center items-center">
              <img
                src="/logo1.png"
                alt=""
                className="w-[120px] sm:w-[180px] "
              />
              {/* <FallBack2 /> */}
            </div>
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 rounded bg-[#39393938] outline outline-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={pswd ? "password" : "text"}
                  id="password"
                  name="password"
                  className="w-full  p-3 rounded bg-[#39393938] outline outline-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Password"
                  required
                />
                <div onClick={() => setPswd(!pswd)} className="cursor-pointer">
                  {pswd ? (
                    <GoEyeClosed className="absolute top-1/4 right-3 text-white text-2xl" />
                  ) : (
                    <GoEye className="absolute top-1/4 right-3 text-white text-2xl" />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isBtn}
              className={`w-full  ${
                !isBtn
                  ? "hover:scale-105 bg-indigo-500"
                  : "bg-indigo-500 cursor-not-allowed"
              }  duration-100 ease-in text-white font-bold py-3 flex justify-center items-center rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              {Loading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin" />

                  {isWait && (
                    <p className="ml-2 text-gray-400">please wait...</p>
                  )}
                </>
              ) : (
                "Login"
              )}
            </button>
            <div>
              <p className="text-gray-400 mt-4 text-right">
                <Link
                  to="/request_reset"
                  className="text-indigo-500  hover:underline"
                >
                  forget password?
                </Link>
              </p>
            </div>
            <div>
              <p className="text-gray-400 mt-4">
                Don't have an account?{" "}
                <Link to="/signin" className="text-indigo-500 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
