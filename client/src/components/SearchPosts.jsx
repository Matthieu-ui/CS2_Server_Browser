import React, {useEffect, useState} from "react";
import { supabase } from "../../supaBaseClient"
import axios from "axios";
import { Icon } from "@iconify/react";

const SearchPosts = () => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);



    useEffect(() => {
        const fetchPosts = async () => {
          setIsLoading(true);
          const { data, error } = await supabase
            .from("posts")
            .select("id, title, body, created_at")
            .order("created_at", { ascending: false })
            .ilike("title", `%${title}%`)
      
    
          if (error) {
            setError(error.message);
          } else {
            setSearchResults(data);
          }
          setIsLoading(false);
        };
        fetchPosts();
      }, [title]);
    
      const handleSearch = (e) => {
        e.preventDefault();
        fetchPosts();
      };

      return (
        <div>
          <form className="flex flex-row items-center" onSubmit={handleSearch}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Search posts by title"
              className="flex-grow p-2 mr-2 border-2 border-gray-300 rounded-md"
            />
         
            <button
              type="submit"
              className="p-2 rounded-md bg-accent text-white hover:bg-accent-dark"
            >
              <Icon icon="bx:bx-search" className="w-5 h-5" />
            </button>
          </form>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <ul>
              {searchResults.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )}
        </div>
      );
    };
    
    export default SearchPosts;





