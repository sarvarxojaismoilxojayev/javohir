import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileNavbar from "../components/Navbar";

const Dashboard = () => {
  const [malumot, setmalumot] = useState([]);
  const [deller, setdeller] = useState(true);
  const [disk, setdisk] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/");

    async function getMe() {
      try {
        let { data } = await axios.get("api/profile/me");

        setmalumot(data);
      } catch (error) {
        console.log(error);
        setmalumot(error);
      }
    }
    getMe();
  }, [deller, disk]);

  async function profileOch(id) {
    try {
      axios.delete(`api/profile/experience/${id}`);
      setdeller(!deller);
    } catch (error) {
      console.log(error);
    }
  }
  async function educationPage(id) {
    try {
      axios.delete(`api/profile/education/${id}`);
      setdisk(!disk);
      toast("Bu narsa ishga kirdi!", { type: "info" });
    } catch (error) {
      toast("Xato ketti!", { type: "error" });
      console.log(error);
    }
  }

  function backspace() {
    if (
      confirm(
        "Are You Sure To Delete Your Account? \nYour data cannot be restored!"
      )
    ) {
      localStorage.removeItem("token");
      axios.delete("api/profile");
    }
  }
  return (
    <>
      <ProfileNavbar />
      <div>
        <h2 className="dashboard_start">Dashboard</h2>
        {malumot?._id ? (
          <>
            <p className=" dash_id">
              <i className="fa-solid fa-User pr-3"></i>Welcome,
              {malumot?.Users?.name}
            </p>
            <div className="d-flex">
              <Link to="/edit-profile">
                Edit Profile
              </Link>
              <Link to="/add-experience">
                Add Experience
              </Link>
              <Link to="/add-education">
                Add Education
              </Link>
            </div>
            <h3 className="dash_exper">
              Experience Credentials
            </h3>
            <table className="table">
              <thead className="table_theard">
                <tr>
                  <th className="py-4 px-4 ">Company</th>
                  <th className="py-4 px-4 ">Title</th>
                  <th className="py-4 px-4 ">Years</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {malumot?.experience.length > 0
                  ? malumot?.experience?.map?.((lorem) => (
                      <tr key={lorem}>
                        <td className="key_dash">{lorem?.company}</td>
                        <td className="key_dash">{lorem?.title}</td>
                        <td className="key_dash">
                          {lorem?.from}-{lorem?.to}
                        </td>
                        <td>
                          <button
                            onClick={() => profileOch(lorem?._id)}
                            className="p-2 bg-red-600 text-white"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
            <h3 className="py-8 text-3xl font-semibold">
              Education Credentials
            </h3>
            <table className="table-auto bg-gray-100">
              <thead className="text-2xl border-b-2 border-white py-3">
                <tr>
                  <th className="py-4 px-4 ">School</th>
                  <th className="py-4 px-4 ">Degree</th>
                  <th className="py-4 px-4 ">Years</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {malumot?.education?.length > 0
                  ? malumot?.education?.map?.((edu) => {
                      return (
                        <tr key={edu}>
                          <td className="key_dash border-b-2 border-white">
                            {edu?.school}
                          </td>
                          <td className="key_dash">{edu?.degree}</td>
                          <td className="key_dash">
                            {edu?.from}-{edu?.to}
                          </td>
                          <td>
                            <button
                              onClick={() => educationPage(edu?._id)}
                              className="p-2 bg-red-600 text-white"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
            <button
              onClick={backspace}
              className="p-2 bg-red-600 text-white mt-8"
            >
              Delete My Account
            </button>
          </>
        ) : (
          <>
            <p className="text-xl pt-5 pb-7">
              No profile found. Do you want to create a profile?
            </p>
            <Link to="/create-profile" className="p-2 bg-sky-600 text-white">
              Create Profile
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
