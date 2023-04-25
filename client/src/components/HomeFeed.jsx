import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { supabase } from "../../supaBaseClient";

import SearchPosts from "../components/SearchPosts";
import PostList from "../components/PostList";


const HomeFeed = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [showPosts, setShowPosts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);



  useEffect(() => {
    const postList = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, body, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Error fetching posts:", error.message);
      } else {
        setPosts(data);
      }
      setIsLoading(false);
    };
    setTimeout(() => {
      postList();
    }, 1000);
  }, []);




  return (


        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary">
          <div className="flex flex-col md:flex-row md:gap-3 m-5">
            <div className="flex flex-col w-full ">


              <div className="text-relative rounded-md mb-20 w-full position relative lg:w-full p-5 mx-auto">
                {isLoading ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <Icon
                        icon="svg-spinners:gooey-balls-1"
                        className="mx-auto w-40 h-40 text-accent drop-shadow-md"
                      />
                    </div>
                  </div>
                ) : (
                  <PostList posts={posts} />
                )}
              </div>

              </div>
              </div>
              </main>


             
                

              



  );
};

export default HomeFeed;
