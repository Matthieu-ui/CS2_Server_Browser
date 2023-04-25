import React from "react";
import { Icon } from "@iconify/react";
import { supabase } from "../../supaBaseClient";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  const [commentCounts, setCommentCounts] = React.useState({});
  const [upvoteCounts, setUpvoteCounts] = React.useState({});
  const [postId, setPostId] = React.useState(null);
  const [showPosts, setShowPosts] = React.useState(true);
  const [showComments, setShowComments] = React.useState(false);

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
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col m-2 nm-convex-secondary-sm mb-10 p-5">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm">
              {post.title}
            </h1>
            <p className="text-sm text-gray-400">
              {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col m-2 overflow-y-scroll rounded-sm nm-inset-secondary-sm p-5 h-auto max-h-96">
            <p className="text-sm text-gray-400">{post.body.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)} </p>
     
          </div>
          <div className="flex flex-row m-2">
            <button
              className="flex flex-row rounded-sm items-center text-gray-300 px-4 hover:text-gray-400 nm-flat-secondary-sm hover:nm-inset-secondary-lg"
              onClick={() => handleUpvoteButton(post.id)}
            >
              <Icon
                icon="mingcute:thumb-up-line"
                className="w-6 h-6 transform scale-x-[-1]"
              />
              <span className="align-middle p-2">
                {upvoteCounts[post.id] || 0}
            </span>
            </button>

            <Link
              to={`/posts/${post.id}`}
              className="flex flex-row rounded-sm items-center text-gray-300 px-4 hover:text-gray-400 nm-flat-secondary-sm hover:nm-inset-secondary-lg"
            >
              <Icon
                icon="ant-design:comment-outlined"
                className="w-6 h-6 transform scale-x-[-1] m-2"
              />
              {commentCounts[post.id] || 0}
            </Link>

            <Link
              to={`/posts/${post.id}`}
              className="flex flex-row rounded-sm items-center text-gray-300 px-4 hover:text-gray-400 nm-flat-secondary-sm hover:nm-inset-secondary-lg"
              onClick={() => handleViewButton(post.id)}
            >
              <Icon
                icon="carbon:reply"
                className="w-6 h-6 transform scale-x-[-1]"
              />
              <span className="align-middle p-2 text-xs">View</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
