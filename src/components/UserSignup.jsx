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
        <input
          id="first_name"
          name="first_name"
          type="text"
          placeholder="Enter Your First Name"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <div>{formik.errors.first_name}</div>
        ) : null}
        <br />

        <input
          id="last_name"
          name="last_name"
          type="text"
          placeholder="Enter Your Last Name"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.last_name}
        />
        {formik.touched.last_name && formik.errors.last_name ? (
          <div>{formik.errors.last_name}</div>
        ) : null}
        <br />

        <input
          id="username"
          name="username"
          placeholder="Enter a Username"
          required
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
        <br />

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <br />

        <input
          id="phone_number"
          name="phone_number"
          type="text"
          placeholder="Enter Your Phone Number"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone_number}
        />
        {formik.touched.phone_number && formik.errors.phone_number ? (
          <div>{formik.errors.phone_number}</div>
        ) : null}
        <br />

        <textarea
          id="car_info"
          name="car_info"
          placeholder="Enter all your car information"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.car_info}
        />
        {formik.touched.car_info && formik.errors.car_info ? (
          <div>{formik.errors.car_info}</div>
        ) : null}
        <br />

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter Password"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <br />

        <input
          id="password2"
          name="password2"
          type="password"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password2}
        />
        {formik.touched.password2 && formik.errors.password2 ? (
          <div>{formik.errors.password2}</div>
        ) : null}
        <br />

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
        <br />

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
