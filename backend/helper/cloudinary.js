import * as cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const cloud = cloudinary.v2;

cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadmediatocloudinary = async (filepath) => {
  try {
    const res = await cloud.uploader.upload(filepath, {
      resource_type: "auto",
      secure:true,
    });
    return res;
  } catch (error) {
    console.log("❌ Error while uploading to Cloudinary:", error);
  }
};

export const deletemediafromcloudinary = async (publicid) => {
  try {
    await cloud.uploader.destroy(publicid);
  } catch (error) {
    console.log("❌ Error while deleting from Cloudinary:", error);
  }
};
