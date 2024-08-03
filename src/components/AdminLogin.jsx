import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return () => setMessage("");
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch("http://127.0.0.1:5555/admin_auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        });

        const data = await response.json();
        setMessage(data.msg);

        if (response.ok) {
          formik.resetForm();
          navigate("/adminhomepage");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="admin-login-container">
      <h1 className="admin-login-title">Admin Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label className="admin-login-label" htmlFor="email">
          Email
        </label>
        <input
          className="admin-login-input"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="admin-login-error-message">{formik.errors.email}</div>
        ) : null}

        <label className="admin-login-label" htmlFor="password">
          Password
        </label>
        <input
          className="admin-login-input"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="admin-login-error-message">
            {formik.errors.password}
          </div>
        ) : null}

        <button
          className="admin-login-button"
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Log In
        </button>
      </form>
      {message && <p className="admin-login-error-message">{message}</p>}
    </div>
  );
}

export default AdminLogin;
