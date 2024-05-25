import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow
          type="text"
          name="name"
          defaultValue="Emmanuel"
          labelText="name"
        />
        <FormRow
          type="text"
          name="lastName"
          defaultValue="Chikezie"
          labelText="last name"
        />
        <FormRow type="text" name="location" defaultValue="Jupiter" />
        <FormRow type="email" name="email" defaultValue="test@test.com" />
        <FormRow type="password" name="password" defaultValue="shusssh🤫" />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
      <Link to="/login">Login Page</Link>
    </Wrapper>
  );
};

export default Register;
