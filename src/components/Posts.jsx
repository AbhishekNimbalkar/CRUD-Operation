import React, { useEffect, useState } from 'react'
import { detelePost, getPost } from '../api/Postapi'

const Posts = () => {

    const [data, setData] = useState([])

    const getPostData = async () => {
        const response = await getPost()
        console.log(response.data)
        setData(response.data)
    }

    useEffect(() => {
        getPostData()
    }, [])

    const handleDeletePost= async(id)=>{
       
        const res = await detelePost(id)
        console.log(res)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Hello Post page</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    data.map((curElem) => {
                        const { id, body, title } = curElem;
                        return (
                            <li key={id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                                <p className="text-gray-600 mt-2">{body}</p>
                                <div className="flex gap-4 mt-4">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                                        Edit
                                    </button>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                    onClick={()=>{
                                        handleDeletePost(id)
                                    }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Posts
