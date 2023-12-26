import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "./action.js";
import LoginWithGoogle from "./LoginWithGoogle.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputData;
    const signInStatus = await signIn(email, password);
    if (signInStatus) {
      navigate("/dashboard/management");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-xl w-[400px] h-[500px]">
        <h1 className="text-3xl font-semibold mb-5">Sign In</h1>
        <p className="text-sm text-gray-600 mb-8">Please provide your credentials</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Form Inputs */}
          <input
            onChange={onChange}
            type="text"
            placeholder="example@gmail.com"
            id="email"
            className="p-2 border rounded-xl focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
          <input
            onChange={onChange}
            type="password"
            placeholder="Password"
            id="password"
            className="p-2 border rounded-xl focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-300">
            Sign In
          </button>
          <Link to="/resetPassword" className="text-gray-500 text-sm self-end">
            Forget your password?
          </Link>
        </form>
        <div className="mt-5 grid grid-cols-3 items-center text-gray-400">
          <hr className="border-gray-600" />
          <p className="text-center">Or</p>
          <hr className="border-gray-600" />
        </div>
        <LoginWithGoogle />
      </div>
    </div>
  );
}
