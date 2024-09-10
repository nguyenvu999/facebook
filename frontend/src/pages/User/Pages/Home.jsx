import React, { useEffect } from 'react';
import { usePosts } from '@/context/postContext';
import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';

const Home = () => {
  const { posts, loading, error, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts(); // Fetch posts when component mounts or user changes
  }, [fetchPosts]); // Dependency array should include fetchPosts

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">New Feed</h2>
          {posts.length === 0 ? (
            <div>No posts available</div>
          ) : (
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {posts.map(post => (
                <li key={post._id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;