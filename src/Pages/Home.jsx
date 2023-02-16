import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  return (
    <div className="landingPage min-h-screen">
        <Navbar />
        <div className="absolute inset-0 grid place-items-center">
          <Box className="text-white flex flex-col items-center justify-between">
            <h1 className="text-center font-bold ">Developer Connector</h1>
            <p className="text-center py-7">
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
            <div className="flex gap-4">
              <Link className="p-3 bg-sky-600" to="register">
                Sign Up
              </Link>
              <Link className="p-3 bg-gray-200 text-black" to="login">
                Log In
              </Link>
            </div>
          </Box>
        </div>
    </div>
  );
};

export default Home;
