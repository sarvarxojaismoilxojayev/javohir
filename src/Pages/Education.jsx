import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const AddEducation = () => {
  const navigate = useNavigate();

  const [malumot, setmalumot] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
  });

  async function Education(e) {
    setmalumot((oldmalumot) => ({
      ...oldmalumot,
      [e.target.name]: e.target.value,
    }));
  }
  async function BtnButton(e) {
    e.preventDefault();
    try {
      let { data } = await axios.put("api/profile/education", malumot);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />
      <form className="w-2/3 mx-auto mt-10">
        <h2 className="text-6xl font-bold text-sky-600">Add Education</h2>
        <p className="py-6 text-2xl font-semibold">Add any school or
          bootcamp that you have attended
        </p>
        <div className="flex flex-col gap-4">
          <input
            className="border p-4"
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            onChange={Education}
          />
          <input
            className="border p-4"
            type="text"
            placeholder="* Degree or Certification"
            name="degree"
            onChange={Education}
          />
          <input
            className="border p-4"
            type="text"
            placeholder="* Field of Study"
            name="fieldofstudy"
            onChange={Education}
          />
          <span className="flex">
            <label htmlFor="fromDate" className="font-semibold">
              * From Date
            </label>
            <input
              className="border p-4"
              type="date"
              id="fromDate"
              name="from"
              onChange={Education}
            />
          </span>
          <span className="flex items-center">
            <input className="border p-4" type="checkbox" id="check" />
            <label htmlFor="check">Current</label>
          </span>
          <span className="flex">
            <label htmlFor="toDate" className="font-semibold">
              To Date
            </label>
            <input
              className="border p-4"
              type="date"
              id="toDate"
              name="to"
              onChange={Education}
            />
          </span>
          <TextareaAutosize
            minRows={4}
            className="w-full border border-gray-600 p-4 rounded-md"
            placeholder="Program Description"
          />
        </div>
        <button
          onClick={BtnButton}
          type="submit"
          className="mt-8 mb-20 text-white"
        >
          Submit
        </button>
        <Link to="/dashboard" className="mt-4">
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default AddEducation;
