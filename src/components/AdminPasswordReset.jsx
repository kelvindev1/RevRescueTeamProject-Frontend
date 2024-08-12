import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ResetPassword.css";

const AdminPasswordReset = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5555/admin/reset_password",
        {
          recovery_token: token,
          new_password: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message);
      setNewPassword("");
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Something went wrong"
      );
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="reset-password">
      <form className="reset-password__form" onSubmit={handleSubmit}>
        <div className="password-input-container">
          <label className="reset-password__label">New Password:</label>
          <div className="input-with-icon">
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="reset-password__input"
              placeholder="Enter new password"
              autoComplete="off"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password-visibility"
              onClick={togglePasswordVisibility}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              {isPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye-off"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 3l18 18" />
                  <path d="M4.6 4.6c-1.2 1.4 -2.1 2.9 -2.6 4.4c1 2.1 3 4.4 5.4 5.4c1.5 -.5 3 -1.4 4.4 -2.6" />
                  <path d="M9 12c0 -1.5 .5 -2.8 1.3 -4c1.3 -1.7 2.7 -2.9 4.7 -4" />
                  <path d="M12 12l-1 1" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 4c5.2 0 9.8 3.2 12 8s-6.8 8 -12 8s-9.8 -3.2 -12 -8s6.8 -8 12 -8z" />
                  <path d="M12 9l0 6" />
                  <path d="M12 15h.01" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <button type="submit" className="reset-password__button">
          Send
        </button>
      </form>
      {message && <p className="reset-password__message">{message}</p>}
      {error && <p className="reset-password__error">{error}</p>}
    </div>
  );
};

export default AdminPasswordReset;
