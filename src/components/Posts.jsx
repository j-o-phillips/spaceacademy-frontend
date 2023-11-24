import { useEffect, useState } from "react";
import "../assets/css/Posts.css";
import { useProfileContext } from "../context/ProfileContext";

const Posts = ({ currentHangarId }) => {
  const [posts, setPosts] = useState([]);
  const [userPost, setUserPost] = useState("");
  const [userPostTitle, setUserPostTitle] = useState("");
  const [count, setCount] = useState(0);

  const { profileData, setProfileData } = useProfileContext();

  useEffect(() => {
    const getPosts = async () => {
      const auth_token = localStorage.getItem("auth_token");
      if (currentHangarId) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/game/posts/${currentHangarId}`,
          {
            headers: {
              Authorization: "Token " + auth_token,
            },
          }
        );
        if (!response.ok) {
          return new Error("An error in the response");
        }

        const result = await response.json();

        setPosts(result.data);
      }
    };

    getPosts();
  }, [currentHangarId, count]);

  const submitPost = async () => {
    const auth_token = localStorage.getItem("auth_token");
    const data = {
      title: userPostTitle,
      content: userPost,
    };
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/game/posts/${currentHangarId}/`,
      {
        method: "POST",
        headers: {
          Authorization: "Token " + auth_token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("An error in the response");
    }

    const result = await response.json();

    setCount((prev) => prev + 1);
  };

  const deletePost = async (postId) => {
    const auth_token = localStorage.getItem("auth_token");

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/game/posts/delete/${postId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Token " + auth_token,
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("An error in the response");
    }

    const result = await response.json();
  };

  return (
    <div className="d-flex h-100 flex-wrap post-sub-cont">
      <div className="d-flex flex-column align-items-center justify-content-center user-post mx-4">
        <input
          type="text"
          className="my-1"
          placeholder="Title"
          value={userPostTitle}
          onChange={(e) => setUserPostTitle(e.target.value)}
        />
        <textarea
          name="newPost"
          cols="50"
          rows="6"
          placeholder="Content"
          className="rounded text-area"
          value={userPost}
          onChange={(e) => setUserPost(e.target.value)}
        ></textarea>

        <button className="button bg-transparent my-2" onClick={submitPost}>
          <div className="button-txt">Post</div>
        </button>
      </div>
      <div className="posts d-flex flex-column align-items-center mt-2">
        {posts.map((post) => (
          <div className="post-card my-2" key={post.id}>
            {profileData.username === post.author ? (
              <button
                onClick={() => {
                  deletePost(post.id);
                  setCount((prev) => prev + 1);
                }}
              >
                <div>x</div>
              </button>
            ) : (
              false
            )}

            <h5 className="mx-2">{post.title}</h5>
            <h6>{post.author}</h6>
            <p className="mx-3">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
