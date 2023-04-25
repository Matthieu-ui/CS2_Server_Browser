import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { supabase } from "../../supaBaseClient";


const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("id, content, created_at")
      .eq("post_id", postId)
      .order("created_at", true);
  
    if (error) {
      console.log("Error fetching comments:", error.message);
    } else {
      console.log("Comments fetched successfully!");
      setComments(data);
    }
  };
  
  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("comments")
      .insert([{ content: newComment, post_id: postId }]);
    if (error) {
      console.log("Error creating comment:", error.message);
    } else if (data) {
      console.log("Comment created successfully!");
      setComments([...comments, ...data]);
      setNewComment("");
    } else {
      console.log("Unexpected result from insert query:", data);
    }

    // refresh comments
    fetchComments();
    
  };
  
  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm">
        Comments
      </h2>

      <form onSubmit={handleCommentSubmit} className="mt-4">
        <div>
          <label htmlFor="comment" className="sr-only">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="3"
            className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md nm-inset-secondary-lg text-white"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
          ></textarea>
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Add comment
          </button>
        </div>
      </form>

      {comments.length === 0 ? (
        <p className="mt-4 text-gray-200 ">No comments yet.</p>
      ) : (
        <ul className="mt-4 space-y-4 divide-y divide-gray-200 nm-inset-secondary-lg p-10 rounded-md mb-20 h-96 overflow-y-scroll">
          {comments.map((comment) => (
            <li key={comment.id}>
              <div className="flex items-center nm-convex-secondary-sm p-5 ">
                <div className="flex-shrink-0">
                  <Icon
                    icon="mdi:comment-account-outline"
                    className="h-6 w-6 text-orange-400"
                  />
                </div>
                <div className="ml-3">
                  <div className="mt-1 text-sm text-gray-300">
                    <p>{comment.content}</p>
                    <p className="mt-1 text-gray-500 text-xs">
                    - Anonymous
                    </p>

                    <p className="mt-1 text-gray-500 text-xs">
                      {new Date(comment.created_at).toLocaleString()}
                    </p>

         

                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;

