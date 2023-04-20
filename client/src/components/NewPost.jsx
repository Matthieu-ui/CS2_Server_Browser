import React from "react";
import { supabase } from "../../supaBaseClient"
import { useState } from "react";
import { Icon } from "@iconify/react";

const NewPost = () => {

    const [title, setTitle] = useState('')
    const [body, setbody] = useState('')
    const [tags, setTags] = useState('')



    const createNewPost = async () => {

        const title = document.getElementById("title").value
        const body = document.getElementById("body").value

    

        const { data, error } = await supabase
        .from('posts')
        .insert([
          { title, body }
        ])
      
       .select()

       if (error) {
        console.log(error)
        
      } else if (data.length > 0) {
        console.log("post created successfully", data)
      }

    }


    const createNewTags = async () => {

        const name = document.getElementById("tags").value.split('#').filter(tag => tag.length > 0);
        const { data, error } = await supabase
        .from('tags')
        .insert([
            { name }
        ])

        .select()

        if (error) {
            console.log(error)
        } else if (data.length > 0) {
            console.log("tags created successfully", data)
        }
    }




    const onSubmit = (e) => {
        e.preventDefault()
        alert("Are you sure you want to submit?")
        createNewPost()
        createNewTags()
    }

    return (
        <div>
            <form
                className="text-relative rounded-md  p-4 mx-auto  text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent nm-convex-secondary-lg"


                onSubmit={e => {
                    e.preventDefault()
                    createNewPost()
                    createNewTags()
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
                        onChange={e => setTitle(e.target.value)}
                    />

                </div>
                <div className="flex flex-col mb-6 ">
                    <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600" htmlFor="body"></label>
                    <textarea
                        className="border rounded-md  w-full lg:w-3/4 mx-auto  text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent nm-convex-secondary-lg"
                        type="text"
                        id="body"
                        placeholder="body"
                        value={body}
                        onChange={e => setbody(e.target.value)}
                    />


                </div>
           
  

                <div className="flex flex-col mb-6">
                    <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600" htmlFor="tags"></label>
                    <input
                        className="border rounded-md  w-full lg:w-3/4 mx-auto  text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent nm-convex-secondary-lg"
                        type="text"
                        id="tags"
                        placeholder="#tag1 #tag2 #tag3"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                    />
                </div>



                <button

                    className="mx-auto flex items-center mt-2 w-20 justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-br from-orange-400 to-red-600 drop-shadow-sm hover:from-orange-600 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent align-middle"
                    onClick={onSubmit}
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