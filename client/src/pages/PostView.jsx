import { useState, useEffect } from "react";
import { supabase } from "../../supaBaseClient";
import React from "react";

const PostView = ({ postId }) => {
    
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const { data: post, error } = await supabase
            .from("posts")
            .select("*")
            .eq("id", postId)
            .single();
          if (error) throw error;
          setPost(post);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }, [postId]);
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

  
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p>Post created at: {new Date(post.created_at).toLocaleString()}</p>
        <p>Post updated at: {new Date(post.updated_at).toLocaleString()}</p>
      </div>
    );
  };

  export default PostView;