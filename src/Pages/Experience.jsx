import {
  TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const AddExperience = () => {
  const navigate = useNavigate();

  const [malumot, setmalumot] = useState({
    title: "",
    company: "",
    from: "",
  });

  async function onChange(e) {
    setmalumot((oldmalumot) => ({
      ...oldmalumot,
      [e.target.name]: e.target.value,
    }));
  }

  async function Submided(e) {
    e.preventDefault();
    try {
      await axios.put("api/profile/experience", malumot);
    toast("Successfully", { type: "success" });
      navigate("/dashboard");
    } catch (error) {
      toast("Qilgan ishingiz o'xshamadi !", { type: "error" })
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />
      <form className="mx-auto mt-10">
        <h2 className="text-6xl font-bold text-sky-600">Add Experience</h2>
        <p className="py-6 text-center font-bold">
          <i className="fa-solid fa-briefcase pr-5"></i> Add any
          developer/programming positions that you have had in the past
        </p>
       
        <div className="flex gap-5">
          <input className="border  p-5"
            
            type="text"
            placeholder="* Job Title"
            
            name="title"
            
            onChange={onChange}
          />
          <input className="border  p-5"
            
            type="text"
            placeholder="* Company"
            
            name="company"
            
            onChange={onChange}
          />
          <input className="border  p-5"
            
            type="text"
            placeholder="Location"
            
          />
          <span className="flex flex-col">
            <label htmlFor="fromDate" className="font-semibold">
              * From Date
            </label>
            <input className="border  p-5"
              type="date"
              id="fromDate"
              name="from"
              
              onChange={onChange}
            />
          </span>
          <span className="flex items-center">
            <input className="border  p-5" type="checkbox"  id="chack" />
            <label htmlFor="chack">Current</label>
          </span>
          <span className="flex flex-col">
            <label htmlFor="toDate" className="font-semibold">
              To Date
            </label>
            <input className="border  p-5" type="date" id="toDate" name="to" onChange={onChange} />
          </span>
          <TextareaAutosize
            minRows={4}
            className=" border border-gray-600 p-5 rounded-md"
            placeholder="Job Description"
          />
        </div>
        <button
          onClick={Submided}
          type="submit"
          className="mt-7 mr-7 mb-20 text-white bg-sky-600"
        >
          Submit
        </button>
        <Link to="/dashboard" className="mt-4 bg-gray-300">
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default AddExperience;
