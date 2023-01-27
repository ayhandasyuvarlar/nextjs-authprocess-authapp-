export default function register_validate(values) {
  const errors = {};
  //validate username
  if (!values.name) {
    errors.name = "Required Name";
  }
  // validate email
  if (!values.email) {
    errors.email = "Required Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  // validate password
  if (!values.password) {
    errors.password = "Required Password";
  } else if (values.password.length <= 7) {
    errors.password = "Min 8 character enter value password";
  } else if (values.password.length > 20) {
    errors.password = "Max 20 character enter password";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }
  // validate confirmPassword
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required Password";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password not match...!";
  } else if (values.confirmPassword.includes(" ")) {
    errors.confirmPassword = "Invalid Password";
  }

  return errors;
}
