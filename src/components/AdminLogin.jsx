import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const [message, setMessage] = useState(""); // State to hold response messages
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Clear message on unmount
  useEffect(() => {
    return () => setMessage("");
  }, []);

  // Formik setup
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
    onSubmit: async (values) => {
      // Send login request
      const response = await fetch("http://127.0.0.1:5555/admin_auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies with request
        body: JSON.stringify(values),
      });

      const data = await response.json();
      setMessage(data.msg); // Show message from response

      if (response.ok) {
        formik.resetForm(); // Reset form fields
        navigate("/adminhomepage"); // Redirect on successful login
      }
    },
  });

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <button type="submit" disabled={!formik.isValid}>
          Log In
        </button>
      </form>
      {message && <p>{message}</p>}
      <p>
        <Link to="/admin_register">Don't have an account? Register here</Link>
      </p>
    </div>
  );
}

export default AdminLogin;
