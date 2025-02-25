import React, { useEffect, useState } from "react";
import { postData, updateData } from "../api/Postapi";

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    if (!isEmpty) {
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
    }
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    try {
      if (!addData.title || !addData.body) {
        alert("Title and body cannot be empty!");
        return;
      }
      const res = await postData(addData);
      console.log(res);

      if (res.status === 201) {
        const newPost = { ...res.data, id: Date.now() }; // Ensure unique ID
        setData((prevData) => [...prevData, newPost]);
        setAddData({ title: "", body: "" }); // Reset form
        setUpdateDataApi({});
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const updatePostData = async () => {
    try {
      if (!addData.title || !addData.body) {
        alert("Title and body cannot be empty!");
        return;
      }
      const res = await updateData(updateDataApi.id, addData);
      console.log(res);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curElem) => {
            return curElem.id === updateDataApi.id ? res.data : curElem;
          });
        });
        setAddData({ title: "", body: "" }); // Reset form
        setUpdateDataApi({}); // Reset updateDataApi
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;

    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="grid grid-cols-3 gap-6">
        {/* Title Input */}
        <div className="col-span-3 sm:col-span-1">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            autoComplete="off"
            id="title"
            name="title"
            placeholder="Add title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={addData.title}
            onChange={handleInputChange}
          />
        </div>

        {/* Post Content Input */}
        <div className="col-span-3 sm:col-span-2">
          <label
            htmlFor="body"
            className="block text-gray-700 font-semibold mb-2"
          >
            Post Content
          </label>
          <input
            type="text"
            autoComplete="off"
            id="body"
            name="body"
            placeholder="Add post"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={addData.body}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-3 sm:col-span-1 flex justify-center sm:justify-start">
          <button
            type="submit"
            value={isEmpty ? "Add" : "Edit"}
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isEmpty ? "Add" : "Edit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;