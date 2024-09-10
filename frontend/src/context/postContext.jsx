import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { user } = useContext( AuthContext );
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    if (!user) {
      setPosts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching posts for user:', user); // Debug line
      const res = await axios.get('/posts/get-posts', { withCredentials: true });
      setPosts(res.data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostContext.Provider value={{ posts, loading, error, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);