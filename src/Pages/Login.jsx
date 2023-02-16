import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Nav";

const Login = () => {
  const navigate = useNavigate();

  const [value, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  function onChange(e) {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  }

  async function loginRegister(e) {
    e.preventDefault();

    try {
      let { data } = await axios.post("/api/auth", value);
      let { token } = data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = `${token}`;
      toast("Successflly", { type: "success" });
      navigate("/dashboard");
    } catch (error) {
      toast(error.response.data.errors[0].msg, { type: "error" });
    }
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={loginRegister} className="mx-auto mt-10">
        <h2 className="text-center font-bold text-sky-600">Sign In</h2>
        <p className="py-6 text-center font-bold">
         Sign In To Your Account
        </p>
        <div className="flex gap-4">
          <input
            name="email"
            
            type="email"
            placeholder="Email Address"
            value={value.email}
            onChange={onChange}
          />
          <input
            
            name="password"
            type="password"
            placeholder="Password"
            value={value.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="p-3 mt-4 text-white bg-sky-600">
          Log In
        </button>
        <p className="text-lg mt-3">
          Don't have an account yet?
          <Link className="text-sky-600" to="/register">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
