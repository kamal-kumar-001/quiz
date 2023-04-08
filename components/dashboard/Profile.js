import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { FcBusinessman, FcBusinesswoman, FcManager } from 'react-icons/fc';

const Profile = () => {
    const { data: session, status } = useSession();
    const user = session?.user
    // Placeholder state for user data
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    // const [subscription, setSubscription] = useState(user?.subscription || '');
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Send updated user data to backend for processing
        // You can use an API call here to update the user's data on the server
        // For example:
        // fetch('/api/updateProfile', {
        //   method: 'PUT',
        //   body: JSON.stringify({
        //     avatar,
        //     name,
        //     email,
        //     password,
        //     subscription,
        //   }),
        // })
        // .then(response => response.json())
        // .then(data => {
        //   // Handle response from backend
        // })
        // .catch(error => {
        //   // Handle error
        // });
    };
    const defaultAvatars = [
        { id: 1, icon: <FcBusinessman size={40} className=' rounded-full' /> },
        { id: 2, icon: <FcBusinesswoman size={40} className=' rounded-full' /> },
        { id: 3, icon: <FcManager size={40} className=' rounded-full' /> },
    ];

    // Function to handle avatar selection
    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
    };


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <form onSubmit={handleSubmit} className="">
                <div className="mb-4 absolute top-5 right-5">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Save
                    </button>
                </div>
                <div className="mb-4">
                    <label htmlFor="avatar" className="block mb-2 font-medium">
                        Avatar
                    </label>
                    <div className="flex gap-4">
                        {defaultAvatars.map((avatar) => (
                            <div
                                key={avatar.id}
                                className={`flex cursor-pointer items-center justify-center h-10 w-10 rounded-full ${selectedAvatar === avatar.id ? 'ring-4 ring-blue-500' : ''
                                    }`}
                                onClick={() => handleAvatarSelect(avatar.id)}
                            >
                                {avatar.icon}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="w-full py-2 px-4 border rounded mt-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full py-2 px-4 border rounded mt-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="oldPassword" className="block font-medium">
                        Old Password
                    </label>
                    <input
                        type="password"
                        id="oldPassword"
                        className="w-full py-2 px-4 border rounded mt-1"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-medium">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full py-2 px-4 border rounded mt-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* <div className="mb-4">
                    <label htmlFor="subscription" className="block font-medium">
                        Subscription
                    </label>
                    <select
                        id="subscription"
                        className="w-full py-2 px-4 border rounded mt-1"
                        value={subscription}
                        onChange={(e) => setSubscription(e.target.value)}
                    >
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                        <option value="pro">Pro</option>
                    </select>
                </div> */}
            </form>
        </div>
    )
}

export default Profile