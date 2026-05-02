const axios = require("axios");

const Log = async (stack, level, pkg, message) => {
  try {
    await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIs...`
        }
      }
    );
  } catch (err) {
    console.error("Log error:", err.message);
  }
};

module.exports = Log;