const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

/**
 * Upscale image via API
 * @param {string} inputPath
 * @param {string} outputPath
 * @returns {Promise<string|null>}
 */
async function upscaleImage(inputPath, outputPath) {
  if (!inputPath || !outputPath) return null;

  try {
    const apiURL = "https://rakib-4k-api.onrender.com/api/upscale?apikey=rakib69";

    const form = new FormData();
    form.append("image", fs.createReadStream(inputPath));

    const response = await axios.post(apiURL, form, {
      headers: form.getHeaders(),
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
    console.error("Upscale API error:", err.message);
    return null;
  }
}

module.exports = { upscaleImage };
