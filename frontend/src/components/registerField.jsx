const registerField = [
  {
    id: "name",
    label: "Name",
    placeholder: "Enter your name",
    type: "text",
  },
  {
    id: "phone",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    type: "tel",
    inputMode: "numeric",
    pattern: "[0-9]*",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Create a password",
    type: "password",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter your password",
    type: "password",
  },
];

export default registerField;
