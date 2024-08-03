import React from "react";
import axios from "axios";

function AdminLogout() {
  const handleLogout = async () => {
    try {
      const response = await axios.get("admin_auth/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        alert(response.data.msg);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div>
      <h1>Admin Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminLogout;
