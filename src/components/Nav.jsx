import * as React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="sticky">
      <nav className="container mx-auto py-6 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold hover:text-sky-400">
          {"</>"}DevConnector
        </Link>
        <div className="flex gap-10 text-xl font-bolder">
          <Link to="/profiles" className=" hover:text-sky-500">
            Developers
          </Link>
          <Link to="/register" className="hover:text-sky-500">
            Register
          </Link>
          <Link to="/login" className="hover:text-sky-500">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
