import React from "react";
import { Icon } from "@iconify/react";
import { supabase } from "../../supaBaseClient";
import { Link } from "react-router-dom";


const PostList = ({ posts }) => {
    const [commentCounts, setCommentCounts] = React.useState({});
  
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
    }, []);
  
    const handleUpvoteButton = async (e) => {
      console.log(e.target.id);
      const commentCount = commentCounts[e.target.id] || 0;
      console.log("Comment count:", commentCount);
    };
  
    const handleReplyButton = (e) => {
      console.log(e.target.id);
      setPostId(e.target.id);
      setShowComments(!showComments);
      setShowPosts(!showPosts);
    };
  
    return (
      <div>
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col m-2">
            <div className="flex flex-col m-2">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm">
                {post.title}
              </h1>
              <p className="text-sm text-gray-400">{new Date(post.created_at).toLocaleString()}</p>
              <p className="text-sm text-gray-400">{new Date(post.updated_at).toLocaleString()}</p>
            </div>
            <div className="flex flex-col m-2">
              <p className="text-sm text-gray-400">{post.body}</p>
            </div>
            <div className="flex flex-row m-2 justify-between">
              <button
                className="flex flex-row rounded-sm items-center text-gray-300 px-4 hover:text-gray-400 nm-flat-secondary-sm hover:nm-inset-secondary-lg"
                id={post.id}
                onClick={handleUpvoteButton}
              >
                <Icon icon="mingcute:thumb-up-line" className="w-6 h-6 transform scale-x-[-1]" />
                <span className="align-middle p-2 text-xs">Rate Up</span>
              </button>
              <div className="flex flex-row rounded-sm items-center text-gray-300 px-4 hover:text-gray-400 nm-flat-secondary-sm hover:nm-inset-secondary-lg">
                Comments ({commentCounts[post.id] || 0})
              </div>
              <button
                className="flex flex-row rounded-sm items-center text-gray-300 px-4 hover:text-gray-400 nm-flat-secondary-sm hover:nm-inset-secondary-lg"
                onClick={handleReplyButton}
              >
                <Icon icon="carbon:reply" className="w-6 h-6 transform scale-x-[-1]" />
                <span className="align-middle p-2 text-xs">Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default PostList;
  