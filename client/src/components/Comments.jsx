
import React, { useState } from "react";
import { supabase } from "../../supaBaseClient";


const Comments = ({ comments, postId, onCommentUpdate }) => {
    const [newComment, setNewComment] = useState("");
  
    const handleAddComment = async () => {
      const { data, error } = await supabase.from("comments").insert({
        post_id: postId,
        body: newComment,
      });
      if (error) {
        console.log("Error adding comment:", error.message);
      } else {
        onCommentUpdate([...comments, data[0]]);
      }
    };
  
    const handleEditComment = async (commentId, newBody) => {
      const { data, error } = await supabase
        .from("comments")
        .update({ body: newBody })
        .match({ id: commentId });
      if (error) {
        console.log("Error editing comment:", error.message);
      } else {
        const updatedComments = comments.map((comment) =>
          comment.id === commentId ? data[0] : comment
        );
        onCommentUpdate(updatedComments);
      }
    };
  
    return (
      <div className="flex flex-col mt-5">
        <h2 className="text-xl font-semibold">Comments</h2>
        <div className="mt-3">
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="mt-3 text-sm font-medium text-white bg-accent rounded-md px-3 py-2"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
        <div className="mt-5">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b mb-3 pb-3">
              <div className="flex justify-between">
                <p className="text-lg font-medium">{comment.body}</p>
                <button
                  className="text-sm text-gray-500"
                  onClick={() => handleEditComment(comment.id, comment.body)}
                >
                  Edit
                </button>
              </div>
              <p className="text-sm text-gray-500">
                {format(new Date(comment.created_at), "MMM dd, yyyy hh:mm a")}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

    export default Comments;
  