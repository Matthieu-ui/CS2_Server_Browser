import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { supabase } from "../../supaBaseClient";
import { Link, useParams } from "react-router-dom";
import PostView from "../routes/PostView";
import Comments from "../components/Comments";

const PostViewPage = () => {
  const [posts, setPost] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();
 
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log("Error fetching post:", error.message);
      } else {
        console.log("Post fetched successfully!");
        setPost(data);
      }

      setIsLoading(false);
    };

    setTimeout(() => {
      fetchPost();
    }, 1000);

  }, [id]);



  return (
    <div className="flex h-screen overflow-scroll bg-secondary">
      <div className="flex-1 flex flex-col">
        <div className="header flex nm-concave-primary-sm p-5 flex-col">
          <span className="flex items-center">
            <Icon
              icon="mdi:post-outline"
              className="stroke-1 stroke-red-400 text-accent m-2 w-10 h-10 align-middle"
            />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm">
              Post View
            </h1>
          </span>
          <div className="flex-1 flex text-sm">
            <p className="mt-1 text-orange-600 w-2/3 opacity-80">
                Viewing post details.
            </p>
          </div>
        </div>

        <main  className="text-relative rounded-md mb-20 w-full position relative lg:w-full p-5 mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-screen mx-auto">
              <Icon icon="svg-spinners:gooey-balls-1" className="w-40 h-40 text-accent drop-shadow-md" />
              <p className="mt-4 text-orange-600 text-center">Loading post...</p>
            </div>
          ) : (

            <PostView
            post={posts}
            postId={id} 
            />

            
            

          )}
        </main>
      </div>
    </div>
  );
};

export default PostViewPage;
