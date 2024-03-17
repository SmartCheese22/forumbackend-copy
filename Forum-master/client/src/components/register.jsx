import React from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import * as userService from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/react-toastify.esm";

class Register extends Form {
  state = {
    data: {
      name: "",
      username: "",
      email: "",
      password: "",
      password2: "",
      userType: "collegeS",
      college: "",
      branch: "",
      year: "",
      AcademicOpinion: "", // New fields
      NonAcademicOpinion: "", // New fields
      PlacementOpinion: "", // New fields
      OverallOpinion: "", // New fields
    },
    errors: {},
  };

  // schema = {
  //   name: Joi.string().required().label("Full Name"),
  //   username: Joi.string().required().label("Username"),
  //   email: Joi.string().required().label("Email ID"),
  //   password: Joi.string().required().label("Password"),
  //   password2: Joi.string().required().label("Confirm Password"),
  //   userType: Joi.string().valid("collegeS", "collegeG").required(),
  //   college: Joi.when("userType", {
  //     is: "collegeG",
  //     then: Joi.string().required(),
  //     otherwise: Joi.string(),
  //   }),
  //   branch: Joi.when("userType", {
  //     is: "collegeG",
  //     then: Joi.string().required(),
  //     otherwise: Joi.string(),
  //   }),
  //   year: Joi.when("userType", {
  //     is: "collegeG",
  //     then: Joi.string().required(),
  //     otherwise: Joi.string(),
  //   }),
  //   AcademicOpinion: Joi.when("userType", {
  //     is: "collegeG",
  //     then: Joi.string().required(),
  //     otherwise: Joi.string(),
  //   }),
  //   NonAcademicOpinion: Joi.when("userType", {
  //     is: "collegeG",
  //     then: Joi.string().required(),
  //     otherwise: Joi.string(),
  //   }),
  //   PlacementOpinion: Joi.when("userType", {
  //     is: "collegeG",
  //     then: Joi.string().required(),
  //     otherwise: Joi.string(),
  //   }),
  //   OverallOpinion: Joi.when("userType", {
  //     is: "collegeG",
  //     then: Joi.string().required(),
  //     otherwise: Joi.string(),
  //   }),
  // };
  

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("User Already Registered");
      }
    }
  };

  render() {
    const { data, errors } = this.state; // Destructure data and errors from state
    if (localStorage.getItem("token")) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container-fluid col-lg-4 col-md-8">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              value={data.name}
              onChange={this.handleChange}
              label="Name"
              name="name"
              type="text"
              error={errors.name}
            />
            <Input
              name="username"
              value={data.username}
              label="Username"
              type="text"
              onChange={this.handleChange}
              error={errors.username}
            />
            <Input
              value={data.email}
              onChange={this.handleChange}
              label="Email ID"
              type="text"
              name="email"
              error={errors.email}
            />
            <Input
              value={data.password}
              onChange={this.handleChange}
              label="Password"
              type="password"
              name="password"
              error={errors.password}
            />
            <Input
              value={data.password2}
              onChange={this.handleChange}
              label="Confirm Password"
              name="password2"
              type="password"
              error={errors.password2}
            />
            <div className="mb-3">
              <label htmlFor="userType" className="form-label">
                User Type
              </label>
              <select
                className="form-select"
                id="userType"
                name="userType"
                value={data.userType}
                onChange={this.handleChange}
              >
                <option value="collegeS">CollegeS</option>
                <option value="collegeG">CollegeG</option>
              </select>
            </div>
            {data.userType === "collegeG" && (
              <React.Fragment>
                <Input
                  value={data.college}
                  onChange={this.handleChange}
                  label="College"
                  type="text"
                  name="college"
                />
                <Input
                  value={data.branch}
                  onChange={this.handleChange}
                  label="Branch"
                  type="text"
                  name="branch"
                />
                <Input
                  value={data.year}
                  onChange={this.handleChange}
                  label="Year"
                  type="text"
                  name="year"
                />
                <Input
                  value={data.AcademicOpinion}
                  onChange={this.handleChange}
                  label="Academic Opinion"
                  type="text"
                  name="AcademicOpinion"
                  error={errors.AcademicOpinion}
                />
                <Input
                  value={data.NonAcademicOpinion}
                  onChange={this.handleChange}
                  label="Non-Academic Opinion"
                  type="text"
                  name="NonAcademicOpinion"
                  error={errors.NonAcademicOpinion}
                />
                <Input
                  value={data.PlacementOpinion}
                  onChange={this.handleChange}
                  label="Placement Opinion"
                  type="text"
                  name="PlacementOpinion"
                  error={errors.PlacementOpinion}
                />
                <Input
                  value={data.OverallOpinion}
                  onChange={this.handleChange}
                  label="Overall Opinion"
                  type="text"
                  name="OverallOpinion"
                  error={errors.OverallOpinion}
                />
              </React.Fragment>
            )}
             <div className="d-grid gap-2">
              <button className="btn btn-primary" onClick={this.doSubmit}>
                Register
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
