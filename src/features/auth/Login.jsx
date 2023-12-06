import  { useState } from "react";
import Boy from "../asset/image/Boy.jpg";
import Google from "../asset/svg/google.svg";
import { Link } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import Button from "../shared/Button";
import Input from "../shared/Input";
export default function Login() {
  const { googleSignIn, signIn } = UserAuth();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const handleGoogleSignIn = async () => {
    await googleSignIn();
  };

  // const [error, setError] = useState("");
  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    const { email, password } = inputData;
    await signIn(email, password);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-5xl mx-auto p-5 md:p-0">
        <div className="flex shadow-2xl rounded-xl">
          <div className="md:w-1/2 text-white p-5">
            <h1 className="text-3xl font-semibold text-black">Login</h1>
            {/* {error ? (
              <p className=" bg-red-700 p-2 my-2 rounded-xl">{error}</p>
            ) : null} */}
            <p className="uppercase mt-5 text-black">
              If you are already a member, easily log in
            </p>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <Input
                style="p-2 mt-8 rounded-xl border text-gray-600"
                type="text"
                id="email"
                onChange={onChange}
                placeholder="example@gmail.com"
                autoComplete="off"
              />
              <Input
                style="p-2 rounded-xl border text-gray-600"
                type="password"
                id="password"
                onChange={onChange}
                placeholder="Password"
                autoComplete="off"
              />
              <Button style="bg-black rounded-xl py-2" type="submit">
                Log in
              </Button>
              <a href="/resetPassword">
                <p className="text-black p-2 text-end">Forget your password?</p>
              </a>
            </form>
            <div className="mt-5 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-600" />
              <p className="text-center text-md">Or</p>
              <hr className="border-gray-600" />
            </div>
            <Button
              onClick={handleGoogleSignIn}
              style="p-2 w-full text-white bg-black rounded-xl inline-flex items-center mt-5 justify-center"
            >
              <img className="h-5 w-5 mr-3" src={Google} alt="" />
              Log in with Google
            </Button>

            <div className="mt-6 text-black flex justify-evenly items-center">
              <p>If you dont have an account...</p>
              <Link to="/register">
                <Button style="py-2 px-5 rounded-xl bg-black text-white">
                  Register
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-1/2 p-5 md:flex hidden justify-center items-center">
            <img src={Boy} alt="Reading a Book" />
          </div>
        </div>
      </div>
    </div>
  );
}