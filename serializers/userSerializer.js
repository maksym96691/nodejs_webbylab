module.exports.inputInvalid = (result) => {
  return {
    status: 0,
    error: {
      message: result,
    },
  };
};

module.exports.userExists = () => {
  return {
    status: 0,
    error: {
      felds: {
        email: "NOT_UNIQUE",
      },
      code: "USER_NOT_UNIQUE",
    },
  };
};

module.exports.userCreated = (result) => {
  return {
    token: result.token,
    status: 1,
  };
};
