// Simulate user authorization (login)
export const authorize = (email, password) => {
  return new Promise((resolve) => {
    resolve({ token: "fake-jwt-token" });
  });
};

// Simulate token validation + getting user info
export const checkToken = (token) => {
  return new Promise((resolve) => {
    resolve({
      data: {
        name: "Fake User",
        email: "fake@example.com",
        _id: "fake-user-id",
      },
    });
  });
};
