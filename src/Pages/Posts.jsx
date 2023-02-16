import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/");

    async function getPosts() {
      try {
        let { data } = await axios.get("api/posts");
        setPosts(data)
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, [posts]);

  function handleInputChange(e) {
    setComment((oldComment) => ({
      ...oldComment,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleCreateComment(e) {
    e.preventDefault();

    try {
      let { data } = await axios.post("/api/posts", comment);
    } catch (error) {
      console.log(error);
    }

    e.target.reset();
  }
  return (
    <div>
      <Navbar />
      <form onSubmit={handleCreateComment} className="mx-auto mt-10">
        <h2 className="text-center font-bold text-sky-600">Posts</h2>
        <p className="py-6 text-2xl font-semibold">
          Welcome to the
          community
        </p>
        <span className="w-full block p-3 text-2xl font-semibold bg-sky-600 text-white ">
          Say Something...
        </span>
        <TextareaAutosize
          minRows={5}
          className="w-full border my-4 border-gray-600 p-3 rounded-md"
          placeholder="Write a message..."
          name="text"
          onChange={handleInputChange}
        />
        <button type="submit" className="p-3 bg-sky-600 text-white">
          Submit
        </button>
      </form>
      <div className="posts w-2/3 mx-auto my-14 flex flex-col gap-7">
        {posts?.length === 0 ? (
          <div className="mt-20 mb-10">
            <h2 className="text-4xl text-center font-bold mb-10">
              Kutib turing...
            </h2>
          </div>
        ) : (
          posts?.map?.((postId) => {
            return (
              <div
                key={postId}
                className="flex items-center overflow-hidden gap-14 p-7 rounded-xl border bg-gray-100"
              >
                <span className="flex flex-col items-center w-1/5">
                  <Link to={`/profile/${postId?.user}`}>
                    <img
                      src={postId?.avatar}
                      alt="profile image"
                      className="rounded-full w-36"
                    />
                  </Link>
                  <Link to={`/profile/${postId?.user}`}>
                    <h2 className=" text-xl font-semibold text-sky-600 text-center mt-2">
                      {postId?.name}
                    </h2>
                  </Link>
                </span>
                <span>
                  <p className="text-xl mb-4 overflow-hidden w-3/3">
                    {postId?.text}
                  </p>
                  <p className="opacity-60 font-semibold pb-2">
                    Posted on {postId?.date}
                  </p>
                  <span className="flex items-center gap-3">
                    <button
                      onClick={() => handleLike(postId?._id)}
                      className="button bg-gray-300"
                    >
                      <i className="fa-solid fa-thumbs-up pr-2"></i>

                      {postId.likes?.length ? postId.likes?.length : ""}
                    </button>
                    <button
                      onClick={() => handleDislike(postId?._id)}
                      className="button bg-gray-300"
                    >
                      <i className="fa-solid fa-thumbs-down"></i>
                    </button>
                    <Link
                      to={`/posts/${postId?._id}`}
                      className="button flex items-center bg-sky-600 text-white"
                    >
                      Discussion{" "}
                      <span className="bg-white px-1 rounded ml-3 text-black">
                        {postId?.comments?.length}
                      </span>
                    </Link>
                    
                  </span>
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Posts;
