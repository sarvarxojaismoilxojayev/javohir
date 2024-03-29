import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ProfileNavbar from "../components/Navbar";

const Profiles = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  useEffect(() => {
    async function getProfiles() {
      let { data } = await axios.get("api/profile");
      setUsers(data);
    }
    getProfiles();
  }, []);

  return (
    <>
      <ProfileNavbar />
      <div className="w-2/3 mx-auto my-10">
        <h2 className="text-6xl font-bold text-sky-600">Developers</h2>
        <p className="py-6 text-2xl font-semibold">
          <i className="fa-solid fa-earth-americas"></i> Browse and connect with
          developers
        </p>

        <div className="flex flex-col gap-4">
          {users.length === 0
            ? Array(3)
                .fill(0)
                .map(() => <div key={crypto.randomUUID()} />)
            : users.map((profilesId) => {
                return (
                  <div
                    key={profilesId._id}
                    className="profileCard card p-4 bg-gray-50 border flex items-center justify-between"
                  >
                    <span>
                      <img
                        src={profilesId.profilesId?.avatar}
                        className="rounded-full w-full"
                        alt="profile image"
                      />
                    </span>
                    <div className="profileData w-3/5 px-7">
                      <span>
                        <h3 className="text-2xl font-semibold">
                          {profilesId.profilesId?.name}
                        </h3>
                        <p className="text-xl py-4 bio">{profilesId?.bio}</p>
                        <p className="text-xl mb-5">{profilesId?.location}</p>
                        <Link
                          to={`/profile/${profilesId?.profilesId?._id}`}
                          className="button bg-sky-600 text-white"
                        >
                          View Profile
                        </Link>
                      </span>
                    </div>
                    <div className="skills flex-1">
                      <ul className="skillList decoration-none flex flex-col">
                        {profilesId.skills.map((bilim, index) => (
                          <li key={index} className="text-sky-600">
                            <i className="fa-solid fa-check"></i>
                            {bilim}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Profiles;
