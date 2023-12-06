import  { useState } from "react";
import Girl from "../asset/image/Girl.jpg";
import { Link } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import Button from "../shared/Button";
import Input from "../shared/Input";

export default function Register() {
  const { signUp } = UserAuth();
  const [inputData, setInputData] = useState({
    email: "",
    currentPassword: "",
    username: "",
    confirmPassword: "",
  });
  // const [error, setError] = useState("");
  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, email, currentPassword, confirmPassword } = inputData;
    signUp(username, email, currentPassword, confirmPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-5xl mx-auto p-5 md:p-0">
        <div className="flex rounded-xl shadow-2xl">
          <div className="w-1/2 md:flex hidden p-5 justify-center items-center">
            <img src={Girl} alt="Reading a Book" />
          </div>
          <div className="md:w-1/2 p-5">
            <h1 className="text-3xl font-semibold">Sign Up</h1>
            {/* {error ? (
              <p className=" text-white bg-red-700 p-2 my-2 rounded-xl ">
                {error}
              </p>
            ) : null} */}
            <p className="mt-5 uppercase">Please provide us</p>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <Input
                onChange={onChange}
                type="text"
                placeholder="Your Name"
                id="username"
                style="p-2 border rounded-xl mt-8 "
                autoComplete="off"
              />
              <Input
                onChange={onChange}
                type="text"
                placeholder="example@gmail.com"
                id="email"
                style="p-2 border rounded-xl"
                autoComplete="off"
              />
              <Input
                onChange={onChange}
                type="password"
                placeholder="Password"
                id="currentPassword"
                style="p-2 border rounded-xl"
                autoComplete="off"
              />
              <Input
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                style="p-2 border rounded-xl"
                autoComplete="off"
              />
              <Button
                type="submit"
                style="bg-black p-2 text-white rounded-xl"
              >
                Create an account
              </Button>
            </form>
            <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-600" />
              <p className="text-center text-">Or</p>
              <hr className="border-gray-600" />
            </div>
            <div className="mt-6 text-black flex justify-evenly items-center">
              <p>Already have an account? </p>
              <Link to="/signin">
                <Button style="py-2 px-5 rounded-xl bg-black text-white">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}