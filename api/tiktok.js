const axios = require("axios");

/**
 * TikTok video fetch API
 * @param {string} url
 * @returns {Promise<object>}
 */
async function tikApi(url) {
  if (!url) return { error: "No URL provided" };

  try {
    const apiURL = `https://api-rakib-tik.onrender.com/api/tiktok?url=${encodeURIComponent(url)}&apikey=rakib69`;

    const response = await axios.get(apiURL, {
      timeout: 15000
    });

    const res = response.data;

    if (!res.status || !res.data?.no_watermark) {
      return { error: "Video not found from API" };
    }

    return {
      title: res.data.title,
      author: res.data.author,
      thumbnail: res.data.thumbnail,
      video: res.data.no_watermark,
      music: res.data.music
    };

  } catch (err) {
    console.error("TikTok API error:", err.message);
    return { error: "API request failed" };
  }
}

module.exports = { tikApi };
