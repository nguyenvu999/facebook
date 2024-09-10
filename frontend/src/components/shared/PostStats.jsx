import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/authContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const PostStats = ({ post }) => {
    const { user } = useContext(AuthContext);
    const [likes, setLikes] = useState(post.likes.map(user => user.id));
    const [hates, setHates] = useState(post.hates.map(user => user.id));
    const [isLiked, setIsLiked] = useState(false);
    const [isHated, setIsHated] = useState(false);
  
    const checkIsLiked = () => {
      return likes.includes(user.id);
    };
  
    const checkIsHated = () => {
      return hates.includes(user.id);
    };
  
    useEffect(() => {
      setIsLiked(checkIsLiked());
      setIsHated(checkIsHated());
    }, [likes, hates, user.id]);
  
    const handleReaction = async (reactionType) => {
        if (!post.id) return;

        try {
            let response;
            let updatedList;
            let setReactionState;
            let toastMessage;
            
            if (reactionType === 'like') {
                if (isLiked) {
                    response = await axios.post(`/posts/like/${post.id}`, {}, { withCredentials: true });
                    updatedList = likes.filter(id => id !== user.id);
                    setReactionState = setLikes;
                    toastMessage = 'Post unliked';
                } else {
                    response = await axios.post(`/posts/like/${post.id}`, {}, { withCredentials: true });
                    updatedList = [...likes, user.id];
                    setReactionState = setLikes;
                    toastMessage = 'Post liked';
                }
                setIsLiked(!isLiked);
            } else if (reactionType === 'hate') {
                if (isHated) {
                    response = await axios.post(`/posts/neutral/${post.id}`, {}, { withCredentials: true });
                    updatedList = hates.filter(id => id !== user.id);
                    setReactionState = setHates;
                    toastMessage = 'Post neutralized';
                } else {
                    response = await axios.post(`/posts/hate/${post.id}`, {}, { withCredentials: true });
                    updatedList = [...hates, user.id];
                    setReactionState = setHates;
                    toastMessage = 'Post hated';
                }
                setIsHated(!isHated);
            }

            setReactionState(updatedList);
            toast.success(toastMessage);
            console.log('API Response:', response.data);
        } catch (error) {
            console.error(`Error ${reactionType} post:`, error);
            toast.error(`Error ${reactionType} post`);
        }
    };
  
    return (
      <div className='flex justify-between items-center z-20'>
        <div className='flex gap-2 mr-5'>
          <img 
            src={isLiked ? "/assets/icon/liked.svg" : "/assets/icon/like.svg"} 
            alt="like" 
            width={20}
            height={20}
            onClick={() => handleReaction('like')}
            className='cursor-pointer'
          />
          <p className='small-medium lg:base-medium'>{likes.length}</p>
        </div>
        <div className='flex gap-2'>
          <img 
            src={isHated ? "/assets/icon/hated.svg" : "/assets/icon/hate.svg"} 
            alt="hate" 
            onClick={() => handleReaction('hate')}
            className='cursor-pointer custom-hate'
          />
          <p className='small-medium lg:base-medium'>{hates.length}</p>
        </div>
      </div>
    );
};

export default PostStats;