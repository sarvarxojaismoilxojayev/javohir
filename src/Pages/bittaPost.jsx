import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const bittaPost = () => {
  const { postId } = useParams();

  const [post, setPost] = useState([]);
  const [comentariya, setComentariya] = useState({ text: "" });

  useEffect(() => {
    
    async function getPost() {
      let { data } = await axios.get(`api/posts/${postId}`);
      setPost(data);
    }
    getPost();
  }, [comentariya]);

  async function onClick(id) {
    try {
      await axios.put(`api/posts/layk/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
  async function handlenoLayk(id) {
    try {
      await axios.put(`api/posts/unlayk/${id}`);
    } catch (error) {
      if (error) return;
    }
  }

  async function handleDeleteMycomentariya(id) {
    try {
      await axios.delete(`api/posts/comentariya/${post?._id}/${id}`);
      setDel(!del);
      toast("comentariya deleted", { type: "info" });
    } catch (error) {
      if (error) return;
    }
  }

  function handleInputChange(e) {
    setComentariya((oldcomentariya) => ({
      ...oldcomentariya,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleCreatecomentariya(e) {
    e.preventDefault();

    try {
      let { data } = await axios.post(
        `api/posts/comentariya/${post?._id}`,
        comentariya
      );
    } catch (error) {
    }

    e.target.reset();
  }
  return (
    <>
      <Navbar />
      <div className="post_start">
        <Link to="/posts" className="button">
          Back to posts
        </Link>
        <div className="black-post">
          <span className="post-span">
            <Link to={`/profile/${post?.user}`}>
              <img
                src={post?.avatar}
                alt="profile image"
                className="profile_images"
              />
              <h2 className="post-h2">
                {post?.name}
              </h2>
            </Link>
          </span>
          <span>
            <p className="post_text">{post?.text}</p>
            <p className="column_revers">
              Posted on {moment(post?.date).utc().format("DD-MM-YYYY")}
            </p>
            <span className="clown">
              <button
                onClick={() => onClick(post?._id)}
                className="button"
              >
                <i className="fa-solid fa-thumbs-up pr-2"></i>

                {post.layks?.length ? post.layks?.length : ""}
              </button>
              <button
                onClick={() => handlenoLayk(post?._id)}
                className="button bg-gray-300"
              >
                <i className="fa-solid fa-thumbs-down"></i>
              </button>
            </span>
          </span>
        </div>
        <form onSubmit={handleCreatecomentariya} className="form-control">
          <span className="post-leave">
            Leave a comentariya
          </span>
          <TextareaAutosize
            className="post-textarea"
            placeholder="comentariya the Post..."
            name="text"
            onChange={handleInputChange}
          />
          <button type="submit" className="buttonSubmit">
            Submit
          </button>
        </form>
        {post?.comentariyas?.map?.((comentariya) => {
          return (
            <div
              key={comentariya?._id}
              className=" post_comentariya"
            >
              <span className="post_com_id">
                <Link to={`/profile/${comentariya?.user}`}>
                  <img
                    src={comentariya?.avatar}
                    alt="profile image"
                    className=" profile_img"
                  />
                </Link>
                <Link to={`/profile/${comentariya?.user}`}>
                  <h2 className="comentariya_user">
                    {comentariya?.name}
                  </h2>
                </Link>
              </span>
              <span>
                <p className="comentariya_end">{comentariya?.text}</p>
                <p className="comentariya_the_end">
                  Posted on{" "}
                  {comentariya?.date}
                </p>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default bittaPost;
