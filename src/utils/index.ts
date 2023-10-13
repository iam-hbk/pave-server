import axios from "axios";
import fs from "fs";
import path from "path";
import { path as appRootPath } from "app-root-path";

export const dowloadDocument = async (url: string): Promise<void> => {
  try {
    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    // Ensure the directory exists
    const dir = path.join(appRootPath, "src", "course-material");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Create a write stream using the file name from the URL
    const fileName = "downloaded-file.pdf"; // Default file name if none is found
    const filePath = path.join(dir, decodeURIComponent(fileName));
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Failed to download file:", error);
    throw error;
  }
};

export const deleteFile = (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        console.error("Failed to delete file:", error);
        reject(error); // Handle error, e.g., log it, re-throw it, etc.
      } else {
        resolve();
      }
    });
  });
};
