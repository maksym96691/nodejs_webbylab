module.exports.authSuccess = (result) => {
  return {
    token: result.token,
    status: 1,
  };
};

module.exports.authFailed = () => {
  return {
    status: 0,
    error: {
      fields: {
        email: "AUTHENTICATION_FAILED",
        password: "AUTHENTICATION_FAILED",
      },
      code: "AUTHENTICATION_FAILED",
    },
  };
};
