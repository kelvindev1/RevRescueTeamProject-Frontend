import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

function UserSignup() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return () => setMessage("");
  }, []);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      car_info: "",
      password: "",
      password2: "",
      profile_picture: null,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone_number: Yup.string().required("Phone number is required"),
      car_info: Yup.string().required("Car info is required"),
      password: Yup.string().required("Password is required"),
      password2: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
      profile_picture: Yup.mixed().required("Profile picture is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("phone_number", values.phone_number);
      formData.append("car_info", values.car_info);
      formData.append("password", values.password);
      formData.append("password2", values.password2);
      formData.append("profile_picture", values.profile_picture);

      const response = await fetch("http://127.0.0.1:5555/user_auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.msg);

      if (response.ok) {
        resetForm();
        navigate("/");
      }
    },
  });

  return (
    <div>
      <h1>User Signup</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <div>{formik.errors.first_name}</div>
        ) : null}

        <label htmlFor="last_name">Last Name</label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.last_name}
        />
        {formik.touched.last_name && formik.errors.last_name ? (
          <div>{formik.errors.last_name}</div>
        ) : null}

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}

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

        <label htmlFor="phone_number">Phone Number</label>
        <input
          id="phone_number"
          name="phone_number"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone_number}
        />
        {formik.touched.phone_number && formik.errors.phone_number ? (
          <div>{formik.errors.phone_number}</div>
        ) : null}

        <label htmlFor="car_info">Car Info</label>
        <input
          id="car_info"
          name="car_info"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.car_info}
        />
        {formik.touched.car_info && formik.errors.car_info ? (
          <div>{formik.errors.car_info}</div>
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

        <label htmlFor="password2">Confirm Password</label>
        <input
          id="password2"
          name="password2"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password2}
        />
        {formik.touched.password2 && formik.errors.password2 ? (
          <div>{formik.errors.password2}</div>
        ) : null}

        <label htmlFor="profile_picture">Profile Picture</label>
        <input
          id="profile_picture"
          name="profile_picture"
          type="file"
          onChange={(event) =>
            formik.setFieldValue(
              "profile_picture",
              event.currentTarget.files[0]
            )
          }
        />
        {formik.touched.profile_picture && formik.errors.profile_picture ? (
          <div>{formik.errors.profile_picture}</div>
        ) : null}

        <button type="submit" disabled={!formik.isValid}>
          Sign Up
        </button>
      </form>
      {message && <p>{message}</p>}
      <div>
        <Link to="/">Already have an Account? Login here</Link>
      </div>
    </div>
  );
}

export default UserSignup;
