import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

function MechanicSignup() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

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
      expertise: "",
      bio: "",
      experience_years: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone_number: Yup.string().required("Phone number is required"),
      expertise: Yup.string().required("Expertise is required"),
      bio: Yup.string().required("Bio is required"),
      experience_years: Yup.number()
        .typeError("Experience years must be a number")
        .required("Experience years is required"),
      password: Yup.string().required("Password is required"),
      password2: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      if (profilePicture) {
        formData.append("profile_picture", profilePicture);
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:5555/mechanic_auth/register",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        setMessage(data.msg);

        if (response.ok) {
          resetForm();
          setProfilePicture(null);
          navigate("/");
        } else {
          console.error("Error:", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    },
  });

  return (
    <div>
      <h1>Mechanic Signup</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="mechanic-first_name"
          name="first_name"
          type="text"
          placeholder="Enter your first name"
          required
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <div>{formik.errors.first_name}</div>
        ) : null}
        <br />

        <input
          id="mechanic-last_name"
          name="last_name"
          type="text"
          placeholder="Enter your last name"
          required
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.last_name}
        />
        {formik.touched.last_name && formik.errors.last_name ? (
          <div>{formik.errors.last_name}</div>
        ) : null}
        <br />

        <input
          id="mechanic-username"
          name="username"
          type="text"
          placeholder="Enter a Username"
          required
          autoComplete="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
        <br />

        <input
          id="mechanic-signup-email"
          name="email"
          type="email"
          placeholder="Enter your Email"
          required
          autoComplete="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <br />

        <input
          id="mechanic-phone_number"
          name="phone_number"
          type="text"
          placeholder="Enter your Phone Number"
          required
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone_number}
        />
        {formik.touched.phone_number && formik.errors.phone_number ? (
          <div>{formik.errors.phone_number}</div>
        ) : null}
        <br />

        <label htmlFor="profile_picture">ProfiLe Picture:</label>
        <input
          id="profile_picture"
          name="profile_picture"
          required
          type="file"
          onChange={(event) => setProfilePicture(event.currentTarget.files[0])}
          onBlur={formik.handleBlur}
        />
        {formik.touched.profile_picture && formik.errors.profile_picture ? (
          <div>{formik.errors.profile_picture}</div>
        ) : null}
        <br />

        <input
          id="expertise"
          name="expertise"
          type="text"
          placeholder="Enter your field of Expertise"
          required
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.expertise}
        />
        {formik.touched.expertise && formik.errors.expertise ? (
          <div>{formik.errors.expertise}</div>
        ) : null}
        <br />

        <textarea
          id="bio"
          name="bio"
          placeholder="Write a bio about yourself"
          required
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bio}
        />
        {formik.touched.bio && formik.errors.bio ? (
          <div>{formik.errors.bio}</div>
        ) : null}
        <br />

        <input
          id="experience_years"
          name="experience_years"
          type="number"
          placeholder="Years of Experience"
          required
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.experience_years}
        />
        {formik.touched.experience_years && formik.errors.experience_years ? (
          <div>{formik.errors.experience_years}</div>
        ) : null}
        <br />

        <input
          id="mechanic-password"
          name="password"
          type="password"
          placeholder="Enter a strong Password"
          required
          autoComplete="new-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <br />

        <input
          id="mechanic-password2"
          name="password2"
          type="password"
          placeholder="Confirm the Password"
          required
          autoComplete="new-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password2}
        />
        {formik.touched.password2 && formik.errors.password2 ? (
          <div>{formik.errors.password2}</div>
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

export default MechanicSignup;
