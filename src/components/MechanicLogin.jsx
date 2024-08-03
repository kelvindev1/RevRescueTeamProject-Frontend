import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./MechanicLogin.css";

function MechanicLogin() {
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
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5555/mechanic_auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();
        setMessage(data.msg);

        if (response.ok) {
          formik.resetForm();
          navigate("/mechanichomepage");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="mechanic-login-container">
      <h1 className="mechanic-login-title">Mechanic Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className="mechanic-login-label">
          Email
        </label>
        <input
          id="mechanic-login-email"
          name="email"
          type="email"
          className="mechanic-login-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          autoComplete="email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="mechanic-login-error-message">
            {formik.errors.email}
          </div>
        ) : null}

        <label htmlFor="password" className="mechanic-login-label">
          Password
        </label>
        <input
          id="mechanic-login-password"
          name="password"
          type="password"
          className="mechanic-login-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          autoComplete="current-password"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="mechanic-login-error-message">
            {formik.errors.password}
          </div>
        ) : null}

        <button
          type="submit"
          className="mechanic-login-button"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Log In
        </button>
      </form>
      {message && <p className="mechanic-login-error-message">{message}</p>}
      <p>
        <Link to="/mechanic_register">
          Don't have an account? Register here
        </Link>
      </p>
    </div>
  );
}

export default MechanicLogin;
