import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/posts');
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const deletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/posts/${id}`);
            setPosts(posts.filter(post => post._id !== id));
            toast.success('Post deleted successfully!');
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('Failed to delete post.');
        }
    };

    const handleGroupRequests = () => {
        navigate('/group-requests');
    };

    return (
        <div>
            <h1>Welcome to the Admin Page</h1>
            <button onClick={() => navigate('/manage-account')}>Manage Accounts</button>
            <button onClick={handleGroupRequests} style={{ marginLeft: '10px' }}>Group Creation Requests</button> {/* New button */}
            {posts.map(post => (
                <div key={post._id} className="post">
                    <p>{post.content}</p>
                    <small>by {post.author.username} ({post.author.email})</small>
                    <button onClick={() => deletePost(post._id)}>Delete Post</button>
                </div>
            ))}
        </div>
    );
};

export default AdminPage;
