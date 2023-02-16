import { TextareaAutosize} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditProfile = () => {
  const navigate = useNavigate();

  const [lopper, setlopper] = useState(false);
  const [variant, setvariant] = useState({
    status: "",
    company: "",
    location: "",
    skills: [],
    github: "",
    website: "",
  });

  useEffect(() => {
    async function dataBrith() {
      let { data } = await axios.get("/api/profile/me");
    }
    dataBrith();
  }, [variant]);

  function handleprofiles(e) {
    e.preventDefault();
    setlopper(!lopper);
  }

  function onChange(e) {
    setvariant((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleditProfile(e) {
    e.preventDefault();

    try {
      await axios.post("/api/profile", variant);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <Navbar />
      <form className=" form-control mx-auto mt-10">
        <h2 className="font-bold ">Edit Profile</h2>
        <p className="py-6  font-bold">Add Some Changes To Your
          Profile
        </p>
        <div className="flex gap-5">
          <span className="edit_span_select">
            <select
              className="form-select px-5 border border-gray-200"
              name="status"
              required
              value={variant.status}
              onChange={onChange}
            >
              <option value="*">* Select Professional Status</option>
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
            <p className="opacity-90">
              Give us an idea where you are at in your career
            </p>
          </span>
          <span>
            <input className="border p-2"
              
              type="text"
              placeholder="Company"
              
              name="company"
              value={variant.company}
              onChange={onChange}
            />
            <p className="opacity-90">
              Could be your own company or the one you work for
            </p>
          </span>
          <span>
            <input className="border p-2"
              
              type="text"
              placeholder="Website"
              
              name="website"
              value={variant.website}
              onChange={onChange}
            />
            <p className="opacity-70">Could be your own or a company website</p>
          </span>
          <span>
            <input className="border p-2"
              
              type="text"
              placeholder="Location"
              
              name="location"
              value={variant.location}
              onChange={onChange}
            />
            <p className="opacity-90">City & State (eg. Boston, MA)</p>
          </span>
          <span>
            <input className="border"
              
              type="text"
              placeholder="* Skills"
              
              name="skills"
              required
              value={variant.skills}
              onChange={onChange}
            />
          </span>
          <span>
            <input className="border"
              
              type="text"
              placeholder="GitHub Username"
              
              name="github"
              value={variant.github}
              onChange={onChange}
            />
            <p className="opacity-90">
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
            <p className="opacity-70">Tell us a little about yourself</p>
          </span>
          <span>
            <button
              onClick={handleprofiles}
              className="p-3 bg-gray-300 w-2/6 mr-5"
            >
              Social Links 
            </button>
          </span>
          {lopper && (
            <div className="flex gap-4">
              <span className="flex items-center">
               
                <input className="border p-4"
                  id="twitterLink"
                  
                  type="text"
                  placeholder="Twitter URL"
                  
                  name="twitter"
                  value={variant.twitter}
                  onChange={onChange}
                />
              </span>
              <span className="flex items-center">
                
                <input className="border p-4"
                  id="facebookLink"
                  
                  type="text"
                  placeholder="Facebook URL"
                  
                  name="facebook"
                  value={variant.facebook}
                  onChange={onChange}
                />
              </span>
              <span className="flex items-center gap-4">
                
                <input className="border p-2"
                  id="youtubeLink"
                  
                  type="text"
                  placeholder="YouTube URL"
                  
                  name="youtube"
                  value={variant.youtube}
                  onChange={onChange}
                />
              </span>
              <span className="flex items-center gap-6">
                
                <input className="border p-2"
                  id="linkedinLink"
                  
                  type="text"
                  placeholder="LinkedIn URL"
                  
                  name="linkedin"
                  value={variant.linkedin}
                  onChange={onChange}
                />
              </span>
              <span className="flex items-center gap-6">
                
                <input className="border p-4"
                  id="instagramLink"
                  
                  type="text"
                  placeholder="Instagram URL"
                  
                  name="instagram"
                  value={variant.instagram}
                  onChange={onChange}
                />
              </span>
            </div>
          )}
        </div>
        <button
          onClick={handleditProfile}
          type="submit"
          className="p-4 mt-4 mb-12 text-white"
        >
          Submit
        </button>
        <Link to="/dashboard" className="p-5 mt-4">
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default EditProfile;
