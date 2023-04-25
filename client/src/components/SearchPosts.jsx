import React from "react";
import { useState } from "react";
import { supabase } from "../../supaBaseClient"

const SearchPosts = () => {

    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')




    const searchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('title', title)
            .eq('tags', tags)
        console.log(data)
        setSearchParams(data)
    }



    return (
        <div className="flex flex-col items-center justify-center">
       
            <form className="text-relative rounded-md  p-4 mx-auto text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                onSubmit={e => {
                    e.preventDefault()
                    searchPosts()
                }
                }
            >
            <div className="flex flex-col mb-6 justify-center items-center">
            <h2
            className="text-lg text-accent font-bold text-center"
            > Search Posts</h2>
                <input
                className="m-2 text-white rounded-md nm-inset-secondary-sm hover:nm-inset-secondary-sm cursor-pointer focus:outline-none focus:ring focus:ring-accent
                w-2/3
                "
                    type="text"
                    placeholder="Search by title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
              
                <input
                className="m-2 text-white rounded-md nm-inset-secondary-sm hover:nm-inset-secondary-sm cursor-pointer  w-2/3 focus:outline-none focus:ring focus:ring-accent "
                    type="text"
                    placeholder="Search by tags"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                />

                <button
                className="flex items-center mt-2 w-20 justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-br from-orange-400 to-red-600 drop-shadow-sm hover:from-orange-600 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent align-middle"
                type="submit">Search</button>

            </div>
            </form>

        </div>

    )

}

export default SearchPosts

        






    