import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSignup.css";

function AdminSignup() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return () => setMessage("");
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      password2: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const response = await fetch(
        "http://127.0.0.1:5555/admin_auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      setMessage(data.msg);

      if (response.ok) {
        resetForm();
        navigate("/admin_login");
      }
    },
  });

  return (
    <div className="admin-signup-container">
      <h1 className="admin-signup-title">Admin Signup</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter Username"
          className="admin-signup-input"
          required
          autoComplete="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="admin-signup-error">{formik.errors.username}</div>
        ) : null}
        <br />

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter Email"
          className="admin-signup-input"
          required
          autoComplete="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="admin-signup-error">{formik.errors.email}</div>
        ) : null}
        <br />

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter Password"
          className="admin-signup-input"
          required
          autoComplete="new-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="admin-signup-error">{formik.errors.password}</div>
        ) : null}
        <br />

        <input
          id="password2"
          name="password2"
          type="password"
          placeholder="Confirm Password"
          className="admin-signup-input"
          required
          autoComplete="new-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password2}
        />
        {formik.touched.password2 && formik.errors.password2 ? (
          <div className="admin-signup-error">{formik.errors.password2}</div>
        ) : null}

        <br />
        <button
          type="submit"
          className="admin-signup-button"
          disabled={!formik.isValid}
        >
          Sign Up
        </button>
      </form>
      {message && <p className="admin-signup-message">{message}</p>}
      <div>
        <Link to="/admin_login">Already have an Account? Login here</Link>
      </div>
    </div>
  );
}

export default AdminSignup;
