import React, { useEffect, useState } from "react";
import { supabase } from "../../supaBaseClient";

import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Comments from "../components/Comments";

const PostView = ({ post, postId }) => {
  const [comments, setComments] = useState([]);
  const [upvoteCounts, setUpvoteCounts] = React.useState({});
  

  const handleUpvoteButton = async postId => {
    const { data, error } = await supabase
      .from('posts')
      .select('upvotes')
      .match({ id: postId })
      .single();
  
    if (error) {
      console.log('Error fetching upvote count:', error.message);
      return;
    }
  
    const updatedCount = (data.upvotes || 0) + 1;
    const { data: updatedData, error: updateError } = await supabase
      .from('posts')
      .update({ upvotes: updatedCount })
      .match({ id: postId });
  
    if (updateError) {
      console.log('Error updating upvote count:', updateError.message);
      return;
    }
  
    console.log('Upvote count updated successfully!');
    setUpvoteCounts(prevCounts => ({
      ...prevCounts,
      [postId]: updatedCount,
    }));
  };
  



  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/posts/${postId}/comments`);
      const data = await response.json();
      setComments(data);
    };

    fetchComments();
  }, [postId]);




  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen mx-auto">
        <Icon
          icon="svg-spinners:gooey-balls-1"
          className="w-40 h-40 text-accent drop-shadow-md"
        />
        <p className="mt-4 text-orange-600 text-center">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col nm-concave-primary-sm p-5 m-5  lg:w-2/3 mx-auto">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm">
          {post.title}
        </h1>
        <p className="p-5 text-sm text-gray-400">{post.body.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)} </p>
      </div>

      <div className="flex flex-row m-2 p-2 space-x-2">

        <button
          className="flex flex-row rounded-sm items-center text-gray-300 px-4 hover:text-gray-400 nm-flat-secondary-sm hover:nm-inset-secondary-lg"
          onClick={() => handleUpvoteButton(post.id)}
        >
          <Icon
            icon="mingcute:thumb-up-line"
            className="w-6 h-6 transform scale-x-[-1]"
          />
          <span className="align-middle p-2">
            {upvoteCounts[post.id] || post.upvotes || 0}
          </span>
        </button>

        <Link
          to={`/posts/${post.id}/edit`}
          className="flex flex-row rounded-sm items-center text-gray-300 px-4 hover:text-gray-400 nm-flat-secondary-sm hover:nm-inset-secondary-lg"
        >
          <span className="align-middle p-2">
            <Icon icon="mdi:pencil" className="w-6 h-6" />
          </span>
          Edit
        </Link>

        <Link
          to="/blog"
          className="flex flex-row rounded-sm items-center text-gray-300 px-4 hover:text-gray-400 nm-flat-secondary-sm hover:nm-inset-secondary-lg"
        >
          <Icon icon="mdi:arrow-left" className="w-6 h-6" />
          Back to Posts
        </Link>







      </div>

      <div className="mt-5">
        <Comments comments={comments} postId={postId} />
      </div>


    </div>
  );
};

export default PostView;