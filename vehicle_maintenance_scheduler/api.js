const axios = require("axios");

const BASE_URL = "http://20.207.122.201/evaluation-service";

//  Correct endpoint: depots (NOT deposits )
const getDepots = async (token) => {
  const res = await axios.get(`${BASE_URL}/depots`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

//  Vehicles endpoint
const getVehicles = async (token) => {
  const res = await axios.get(`${BASE_URL}/vehicles`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

module.exports = { getDepots, getVehicles };