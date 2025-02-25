import React, { useEffect, useState } from "react";
import { detelePost, getPost } from "../api/Postapi";
import Form from "./Form";

const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const getPostData = async () => {
    const response = await getPost();
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await detelePost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => {
          return curPost.id !== id; // Use !== instead of !=
        });
        console.log(newUpdatedPosts);
        setData(newUpdatedPosts);
      } else {
        console.log("Failed to delete the post: ", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePost = (curElem) => {
    setUpdateDataApi(curElem);
  };

  return (
    <>
      <div>
        <Form
          key={updateDataApi.id || "add"} // Reset form when updateDataApi changes
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </div>
      <div className="container mx-auto p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li
                key={id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-gray-600 mt-2">{body}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => {
                      handleUpdatePost(curElem);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    onClick={() => {
                      handleDeletePost(id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Posts;