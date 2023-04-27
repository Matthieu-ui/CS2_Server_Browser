import React, {useEffect, useState} from "react";
import { Icon } from "@iconify/react";
import { supabase } from "../../supaBaseClient";
import { Link } from "react-router-dom";
import moment from 'moment';

const PostList = ({ posts }) => {
  const [commentCounts, setCommentCounts] = React.useState({});
  const [upvoteCounts, setUpvoteCounts] = React.useState({});
  const [postId, setPostId] = React.useState(null);
  const [showPosts, setShowPosts] = React.useState(true);
  const [showComments, setShowComments] = React.useState(false);
  const [username, setUsername] = React.useState({});
  


  //search 

  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  // sort
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("desc");


  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      let { data, error } = await supabase
        .from("posts")
        .select("id, title, body, created_at, upvotes")
        .ilike("title", `%${title}%`)
 


        
      if (error) {
        setError(error.message);
      } else {
        setSearchResults(data);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [title, sort, order]);

const handleSearch = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, body, created_at")
    .ilike("title", `%${title}%`)

  if (error) {
    setError(error.message);
  } else {
    setSearchResults(data);
  }
  setIsLoading(false);
};
  const fetchUpvoteCounts = async () => {
    const counts = {};
    for (const post of posts) {
      const { data, error } = await supabase

        .from("posts")
        .select("upvotes")
        .match({ id: post.id });
      if (error) {
        console.log("Error fetching upvote count:", error.message);
        counts[post.id] = 0;
      } else {
        console.log("Upvote count fetched successfully!");
        counts[post.id] = data[0].upvotes;
      }
    }
    setUpvoteCounts(counts);
  };

  const fetchUsernames = async () => {
    const usernames = {};
    for (const post of posts) {
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .match({ id: post.user_id });
      if (error) {
        console.log("Error fetching username:", error.message);
        usernames[post.id] = "Unknown";
      } else {
        console.log("Username fetched successfully!");
        usernames[post.id] = data[0].username;
      }
    }
    setUsername(usernames);
  };




  const fetchCommentCounts = async () => {
    const counts = {};
    for (const post of posts) {
      const { data, error } = await supabase
        .from("comments")
        .select("id")
        .match({ post_id: post.id });
      if (error) {
        console.log("Error fetching comments:", error.message);
        counts[post.id] = 0;
      } else {
        console.log("Comments fetched successfully!");
        counts[post.id] = data.length;
      }
    }
    setCommentCounts(counts);
  };

  React.useEffect(() => {
    fetchCommentCounts();
    fetchUpvoteCounts();
    fetchUsernames();



  }, []);

  const handleUpvoteButton = async postId => {
    const updatedCounts = { ...upvoteCounts };
    updatedCounts[postId] = (upvoteCounts[postId] || 0) + 1;
    setUpvoteCounts(updatedCounts);

    const { error } = await supabase
      .from('posts')
      .update({ upvotes: updatedCounts[postId] })
      .match({ id: postId });

    if (error) {
      console.log('Error updating upvote count:', error.message);
      const previousCounts = { ...upvoteCounts };
      setUpvoteCounts(previousCounts);
    } else {
      console.log('Upvote count updated successfully!');
    }
  };

  const handleViewButton = (postId) => {
    // Set the postId state to the clicked post ID
    setPostId(postId);
    // Navigate to the post view page with the postId as a URL parameter
    setShowPosts(false);
    setShowComments(true);
  };

  return (
    <div>
    <div>
          <form className="flex flex-row items-center m-10 w-20" onSubmit={handleSearch}>
          <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search posts by title"
          className="flex-grow p-2 mr-2 border-2 border-gray-300 rounded-md"
        />



        <button
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        onClick={() => setSort("created_at")}
      >
        Date
        {sort === "created_at" && (
          <Icon
            icon={order === "asc" ? "ic:sharp-arrow-drop-up" : "ic:sharp-arrow-drop-down"}
            className="w-4 h-4 ml-1"
            onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
          />
        )}
      </button>
      <div
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
        onClick={() => setSort("upvotes")}
      >
        Upvotes
        {sort === "upvotes" && (
          <Icon
            icon={order === "asc" ? "ic:sharp-arrow-drop-up" : "ic:sharp-arrow-drop-down"}
            className="w-4 h-4 ml-1"
            onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
          />
        )}
      </div>
            <button
              type="submit"
              className="p-2 rounded-md bg-accent text-white hover:bg-accent-dark flex flex-row items-center justify-start hover:nm-inset-orange-500  duration-200 ease-in-out"
            >
              <Icon icon="bx:bx-search" className="w-5 h-5" />
            </button>
          </form>


          {isLoading ? (
            <Icon icon="akar-icons:loading" className="w-5 h-5" />
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div>

        {searchResults.map((post) => (
        <div key={post.id} className="flex flex-col m-2 nm-convex-primary-sm p-2 hover:nm-inset-primary-sm rounded-md duration-200 ease-in-out h-24">
        <div class="flex flex-row items-center justify-between h-500">
            <span className="flex flex-row items-center justify-start gap-3">
              <Link
                to={`/users/${post.username}`}
                className="flex flex-row items-center gap-2">
                <Icon icon="game-icons:character" className="text-accent w-5 h-5" />
              </Link>
              <p className="text-xs text-accent font-thin">{username[post.id]}</p>
            </span>

            <h1 className="text-md font-semibold text-accent">{post.title}</h1>
            <p className="text-gray-400 text-sm"> {moment(post.created_at).fromNow()}</p>

          </div>
          <div className="flex flex-row items-center mt-7">

            <span className="flex flex-row items-center justify-start nm-flat-primary-sm p-1 hover:nm-inset-primary-sm  duration-200 ease-in-out">
              <Link className=""
                onClick={() => handleUpvoteButton(post.id)}
              >

                <Icon
                  icon="mingcute:thumb-up-line"
                  className="text-gray-400 w-5 h-5"
                />
              </Link>

              <p className="text-xs text-gray-400 ml-2 mr-1">{upvoteCounts[post.id] || 0} </p>
            </span>

            <span className="flex flex-row items-center justify-start nm-flat-primary-sm p-1 hover:nm-inset-primary-sm duration-200 ease-in-out">
              <Link
                to={`/posts/${post.id}`}

              >
                <Icon
                  icon="ant-design:comment-outlined"
                  className="text-gray-400 w-5 h-5"
                />

              </Link>
              <p className="text-xs text-gray-400  ml-2 mr-1">{commentCounts[post.id] || 0} </p>

            </span>

            <span className="flex flex-row items-center justify-start nm-flat-primary-sm p-1 hover:nm-inset-primary-sm duration-400 ease-in-out">
              <Link
                to={`/posts/${post.id}`}
                className=""
                onClick={() => handleViewButton(post.id)}
              >
                <Icon
                  icon="carbon:reply"
                  className="text-gray-400 w-5 h-5"
                />

              </Link>
            </span>




          </div>
        </div>

        ))}

        </div>
        )}  
        </div>
        </div>  
  );

} 

export default PostList;