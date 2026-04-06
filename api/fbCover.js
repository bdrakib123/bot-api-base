const axios = require("axios");
const fs = require("fs");

/**
 * Create Facebook cover via API
 * @param {object} data
 * @param {string} outputPath
 * @returns {Promise<string|null>}
 */
async function createFbCover(data, outputPath) {
  try {
    const {
      name,
      subname,
      email,
      phone,
      team,
      uid,
      template
    } = data;

    const apiURL = `https://rakib-gfx-api.onrender.com/api/fbcover?name=${encodeURIComponent(name)}&subname=${encodeURIComponent(subname)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&team=${encodeURIComponent(team)}&uid=${encodeURIComponent(uid)}&template=${template}&apikey=rakib69`;

    const response = await axios({
      method: "GET",
      url: apiURL,
      responseType: "stream",
      timeout: 20000
    });

    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    return outputPath;

  } catch (err) {
    console.error("FB Cover API error:", err.message);
    return null;
  }
}

module.exports = { createFbCover };
