import React from "react";
import {
  Form,
  Link,
  redirect,
  useNavigate,
  // useActionData,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "../components";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // const errors = { message: "" };
  // if (data.password.length < 3) {
  //   errors.message = "password too short";
  //   return errors.message;
  // }
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login Successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};
const Login = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "t@t.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

  const isSubmitting = navigation.state === "submitting";

  // const errors = useActionData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>login</h4>
        {/* {errors.message && <p>{errors.message}</p>} */}
        <FormRow type="email" name="email" defaultValue="test@test.com" />
        <FormRow type="password" name="password" defaultValue="12345678" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Submit"}
        </button>
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
