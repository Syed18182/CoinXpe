exports.key = (email, pwd) => {
  return (
    "1234" + email.slice(0, 8) + pwd.slice(0, 8) + email.slice(0, 8) + "4321"
  );
};
