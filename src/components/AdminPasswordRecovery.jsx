import React, { useState } from "react";
import axios from "axios";
import "./PasswordRecovery.css";

const AdminPasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5555/admin/recovery_password",
        { email }
      );
      setMessage(response.data.message);
      setEmail("");
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Something went wrong"
      );
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="password-recovery">
      <form className="password-recovery__form" onSubmit={handleSubmit}>
        <div>
          <label className="password-recovery__label">Email:</label>
          <input
            type="email"
            className="password-recovery__input"
            placeholder="Please Enter Your Email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="password-recovery__button">
          Send
        </button>
      </form>
      {message && <p className="password-recovery__message">{message}</p>}
      {error && <p className="password-recovery__error">{error}</p>}
      <button className="password-recovery__back-button" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default AdminPasswordRecovery;
