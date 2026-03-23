const axios = require("axios");

const API_KEY = "rakib69";
const BASE_URL = "https://rakib-prayer-time.onrender.com/api/ramadan";

/**
 * Get prayer time by location
 * @param {string} location
 * @returns {Promise<object>}
 */
async function getPrayerTime(location = "dhaka") {
  try {
    const url = `${BASE_URL}?location=${location.toLowerCase()}&apikey=${API_KEY}`;

    const response = await axios.get(url, {
      timeout: 10000
    });

    return response.data;

  } catch (error) {
    console.error("Prayer API error:", error.message);
    return {
      status: false,
      error: "API Error"
    };
  }
}

module.exports = { getPrayerTime };
