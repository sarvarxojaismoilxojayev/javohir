import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const CreateProfile = () => {
  const navigate = useNavigate();

  const [malumot, setmalumot] = useState({
    status: "",
    skills: [],
    website: "",
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  function profill(e) {
    e.preventDefault();
  }

  function Profile(e) {
    setmalumot((oldmalumot) => ({
      ...oldmalumot,
      [e.target.name]: e.target.value,
    }));
  }

  async function onSubmitProfile(e) {
    e.preventDefault();

    try {
      let { data } = await axios.post("/api/profile", malumot);
      toast("Profile Created Successflly", { type: "success" });
      navigate("/dashboard");
    } catch (error) {
      // toast(error.response.data?.msg, { type: "error" });
    }
  }
  return (
    <div>
      <Navbar />
      <form onSubmit={onSubmitProfile} className="w-2/3 mx-auto mt-10">
        <h2 className="text-6xl font-bold text-sky-600">Create Your Profile</h2>
        
        <div className="flex flex-col gap-5">
          <span className="w-full">
            <select
              className="form-select px-4 py-3 rounded-md border border-gray-500 w-full"
              name="status"
              required
              value={malumot.status}
              onChange={Profile}
            >
              <option value="">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor or Teacher">
                Instructor or Teacher
              </option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <p className="opacity-70">
              Give us an idea where you are at in your career
            </p>
          </span>
          <span>
            <input
              className="w-full border p-3"
              type="text"
              placeholder="Company"
            />
            <p className="opacity-70">
              Could be your own company or the one you work for
            </p>
          </span>
          <span>
            <input
              className="w-full border p-3"
              type="text"
              placeholder="Website"
              name="website"
              value={malumot.website}
              onChange={Profile}
            />
          </span>
          <span>
            <input
              className="w-full border p-3"
              type="text"
              placeholder="Location"
            />
          </span>
          <span>
            <input
              className="w-full border p-3"
              type="text"
              name="skills"
              placeholder="* Skills"
              required
              value={malumot.skills}
              onChange={Profile}
            />
            <p className="opacity-70">
              Please use comma separated malumot (eg. HTML,CSS,JavaScript,PHP)
            </p>
          </span>
          <span>
            <input
              className="w-full border p-3"
              type="text"
              placeholder="GitHub Username"
            />
            <p className="opacity-70">
              If you want your latest repos and a Github link, include your
              username
            </p>
          </span>
          <span>
            <TextareaAutosize
              minRows={4}
              className="w-full border border-gray-600 p-3 rounded-md"
              placeholder="A short bio about yourself"
            />
          </span>
          <span>
            <button
              onClick={profill}
              className="button bg-gray-300 w-2/6 mr-5"
            >
              Social Links
            </button>
            (Optional)
          </span>
          {open && (
            <div className="flex flex-col gap-4">
              <span className="flex items-center gap-5">
                <input
                  className="w-full border p-3"
                  type="text"
                  placeholder="Twitter"
                  name="twitter"
                  value={malumot.twitter}
                  onChange={Profile}
                />
              </span>
              <span className="flex items-center gap-5">
                <input
                  className="w-full border p-3"
                  type="text"
                  placeholder="Facebook"
                  name="facebook"
                  value={malumot.facebook}
                  onChange={Profile}
                />
              </span>
              <span className="flex items-center gap-4">
                <input
                  className="w-full border p-3"
                  type="text"
                  placeholder="YouTube"
                  name="youtube"
                  value={malumot.youtube}
                  onChange={Profile}
                />
              </span>
              <span className="flex items-center gap-6">
                <input
                  className="w-full border p-3"
                  type="text"
                  placeholder="LinkedIn"
                  name="linkedin"
                  value={malumot.linkedin}
                  onChange={Profile}
                />
              </span>
              <span className="flex items-center gap-6">
                <input
                  className="w-full border p-3"
                  type="text"
                  placeholder="Instagram"
                  name="instagram"
                  value={malumot.instagram}
                  onChange={Profile}
                />
              </span>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="button mt-7 mr-7 mb-20 text-white bg-sky-600"
        >
          Submit
        </button>
        <Link to="/dashboard" className="button mt-4 bg-gray-300">
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default CreateProfile;
