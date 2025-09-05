// Example unit test for validating email format
function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email);
}

test("Valid email should pass", () => {
  expect(isValidEmail("shanam@gmail.com")).toBe(true);
});

test("Invalid email should fail", () => {
  expect(isValidEmail("shanam@gmail.comm")).toBe(false);
});
