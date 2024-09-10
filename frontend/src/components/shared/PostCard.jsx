import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TimeAgo } from '@/lib/utilities';
import { AuthContext } from '@/context/authContext';
import PostStats from './PostStats';

const PostCard = ({ post }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className="post-card">
            <div className='flex-between'>
                <div className='flex items-center gap-3'>
                    <Link to={`/profile/${post.author._id}`}>
                        <img 
                            src={post.author.imageUrl || "/assets/icon/profile-placeholder.svg"} 
                            alt="author" 
                            className='custom-icon'
                        />
                    </Link>
                    <div className='flex flex-col'>
                        <p>{post.author.name}</p>
                        <div className='flex-center gap-2 text-light-3'>
                            <p className='subtle-semibold lg:small-regular'>
                                <TimeAgo dateString={post.createdAt} />
                            </p>
                        </div>
                    </div>
                </div>
                {user._id === post.author._id && (
                    <Link to={`/update-post/${post._id}`} className='edit-link'>
                        <img src="/assets/icon/edit.svg" alt="edit" width={20} height={20}/>
                    </Link>
                )}
            </div>
            <Link to={`/posts/${post._id}`}>
                <div className='small-medium lg:base-medium py-5'>
                    <p>{post.caption}</p>
                </div>
                <img 
                    src={post.imgURL || '/assets/icon/profile-placeholder.svg'} 
                    className='post-card_img'
                    alt='post image'
                />
            </Link>
            <PostStats post={post} userId={user._id} />
        </div>
    );
}

export default PostCard;