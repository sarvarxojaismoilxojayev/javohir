import React from "react";
import Nav from "../components/Nav";
import Navbar from "../components/Navbar";

const Error404 = () => {
  let token = localStorage.getItem("token");

  return (
    <>
      {token ? <Navbar /> : <Nav />}
      <div className="w-2/3 mx-auto mt-10">
        <h1 className="text-6xl font-bold text-sky-600">
          <i className="fa-solid fa-warning"></i>Page Not Found
        </h1>
        <p className="pt-5 text-center font-bold">
          Sorry, this page does not exist
        </p>
      </div>
    </>
  );
};

export default Error404;
