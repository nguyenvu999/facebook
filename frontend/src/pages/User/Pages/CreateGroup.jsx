import React, { useState } from "react";
import axios from 'axios';

const CreateGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem('authToken');

            const response = await axios.post('/groups/create', {
                groupName,
                description: groupDescription,
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            setMessage(response.data.message);
            setGroupName('');
            setGroupDescription('');
        } catch (error) {
            console.error('Failed to create group', error);
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'Error creating group, please try again');
            } else {
                setMessage('Error creating group, please try again');
            }
        }
    };

    return (
        <div>
            <h2>Create a Group</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Group Name:</label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Group Description:</label>
                    <textarea
                        value={groupDescription}
                        onChange={(e) => setGroupDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Request to Create Group</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateGroup;
