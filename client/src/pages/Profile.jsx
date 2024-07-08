import { Form, useNavigation, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import { customFetch } from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file && file.size > 2097152) {
    toast.error("Image size too large");
    return null;
  }

  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return null;
};
const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user.data.user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">
          <div className="form-center">
            <div className="form-row">
              <label htmlFor="avatar" className="form-label">
                Select an image file (max 2mb)
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="form-input"
                accept="image/*"
              />
            </div>
            <FormRow
              type="text"
              name="name"
              defaultValue={name}
              labelText="name"
            />
            <FormRow
              type="text"
              name="lastName"
              defaultValue={lastName}
              labelText="last name"
            />
            <FormRow type="email" name="email" defaultValue={email} />
            <FormRow type="text" name="location" defaultValue={location} />
            <button
              type="submit"
              className="btn btn-block form-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "submitting..." : "submit"}
            </button>
          </div>
        </h4>
      </Form>
    </Wrapper>
  );
};

export default Profile;
