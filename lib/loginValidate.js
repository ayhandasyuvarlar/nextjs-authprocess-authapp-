export default function login_validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Required Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required Password";
  } else if (values.password.length <= 7) {
    errors.password = "Min 8 character enter value password";
  } else if (values.password.length > 20) {
    errors.password = "Max 20 character enter password";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}
