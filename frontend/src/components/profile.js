import React from 'react';

// Profile component to display user information
const Profile = ({ user, handleLogout }) => {
  return (
    <div className="profile-container">
      {/* Display welcome message with the username */}
      <h2>Welcome, {user.username}!</h2>
      {/* Show the user's email */}
      <p>Email: {user.email}</p>
      {/* Button to log out the user */}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
