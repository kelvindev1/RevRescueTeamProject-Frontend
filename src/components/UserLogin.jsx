import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./UserLogin.css";

function UserLogin() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [visitData, setVisitData] = useState(null);
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
        const response = await fetch("http://127.0.0.1:5555/user_auth/login", {
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
          setUser(data.user);
          formik.resetForm();

          const lastVisit = localStorage.getItem("lastVisit");
          const now = new Date().toISOString().split("T")[0];

          if (lastVisit !== now) {
            const visitsResponse = await fetch(
              "http://127.0.0.1:5555/user_auth/api/visits",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ userId: data.user.id }),
              }
            );

            if (visitsResponse.ok) {
              const visits = await visitsResponse.json();
              setVisitData(visits);
              localStorage.setItem("lastVisit", now);
            }
          }

          navigate("/home");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="user-login-container">
      <h1 className="user-login-title">User Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className="user-login-label">
          Email
        </label>
        <input
          id="user-login-email"
          name="email"
          type="email"
          className="user-login-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          autoComplete="email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="user-login-error-message">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password" className="user-login-label">
          Password
        </label>
        <input
          id="user-login-password"
          name="password"
          type="password"
          className="user-login-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          autoComplete="current-password"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="user-login-error-message">
            {formik.errors.password}
          </div>
        ) : null}

        <button
          type="submit"
          className="user-login-button"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Log In
        </button>
      </form>
      {message && <p className="user-login-error-message">{message}</p>}
      <p>
        <Link to="/user_register" className="link-to-register">
          Don't have an account? Register here
        </Link>
      </p>
      {visitData && (
        <div className="visit-data">
          <h2>Visit Data</h2>
          <p>Total Visits: {visitData.count}</p>
        </div>
      )}
    </div>
  );
}

export default UserLogin;
