// import React from "react";
// import axios from "axios";

// function AdminLogout() {
//   const handleLogout = async () => {
//     try {
//       const response = await axios.get("admin_auth/logout", {
//         withCredentials: true,
//       });
//       if (response.status === 200) {
//         alert(response.data.msg);
//         window.location.href = "/";
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//       alert("Failed to log out. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Logout</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default AdminLogout;

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogout.css'; // Import the CSS file

function AdminLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/admin/logout');
      navigate('/home'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="admin-logout-container">
      <h2 className="admin-logout-title">Admin Logout</h2>
      <p className="admin-logout-text">Are you sure you want to log out?</p>
      <button className="admin-logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminLogout;
