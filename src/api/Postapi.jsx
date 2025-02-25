import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});



export const getPost = ()=>{
    return api.get("/posts")
}

export const detelePost = (id)=>{
    return api.delete(`/posts/${id}`)
}