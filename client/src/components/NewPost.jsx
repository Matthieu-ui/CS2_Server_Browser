import React, { useEffect } from "react";
import { supabase } from "../../supaBaseClient"
import { useState } from "react";
import { Icon } from "@iconify/react";

import { v4 as uuidv4 } from "uuid";



const NewPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [username, setUsername] = useState('');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleBodyChange = (e) => setBody(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('posts').insert([
            {
                title,
                body,
                username,
                editKey: uuidv4(),
            },
        ]);
        if (error) {
            console.log('Error creating post:', error.message);
        } else {
            console.log('Post created successfully!');
            fetchPosts();
        }

        //reset form
        setTitle('');
        setBody('');
        setUsername('');

        //refresh posts
        fetchPosts();
        
    };

    const fetchPosts = async () => {
        const { data: posts, error } = await supabase.from('posts').select('*');
        if (error) {
            console.log('Error fetching posts:', error.message);
        } else {
            setPosts(posts);
        }
    };

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <div>
            <form
                className="text-relative rounded-md  p-4 mx-auto  text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent nm-convex-secondary-lg"


                onSubmit={e => {
                    e.preventDefault()
                    handleSubmit(e)

                }}
            >
                <div className="flex flex-col mb-6 ">
                    <label className="text-accent mx-auto mb-1 text-xs sm:text-sm tracking-wide justify-start" htmlFor="title">Create new post</label>
                </div>
                <div className="flex flex-col mb-6">
                    <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600" htmlFor="title"></label>
                    <input
                        className="border rounded-md  w-full lg:w-3/4 mx-auto  text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent nm-convex-secondary-lg"
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}
                    />

                </div>
                <div className="flex flex-col mb-6 ">
                    <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600" htmlFor="body"></label>
                    <textarea
                        className="block w-full lg:w-3/4 mx-auto mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 nm-convex-secondary-lg"
                        type="text"
                        rows="4"
                        id="body"
                        placeholder="Enter your text here..."
                        value={body}
                        onChange={handleBodyChange}
                    />


                </div>

                <div className="flex flex-col mb-6 ">
                    <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600" htmlFor="username"></label>
                    <input
                        className="border rounded-md  w-full lg:w-3/4 mx-auto  text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent nm-convex-secondary-lg"
                        type="text"
                        id="username"
                        placeholder="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />

                </div>



                <button

                    className="mx-auto flex items-center mt-2 w-20 justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-br from-orange-400 to-red-600 drop-shadow-sm hover:from-orange-600 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent align-middle"
                    type="submit"
                >
                    Submit <Icon
                        className="ml-2"
                        icon="ant-design:check-circle-outlined" />
                </button>
            </form>

        </div>
    )
}

export default NewPost