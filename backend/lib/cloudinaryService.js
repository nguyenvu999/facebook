const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (fileBuffer, originalFilename, folderName) => {
  try {
    // Generate unique filename
    const uniqueFilename = `${uuidv4()}_${originalFilename}`;
    
    // Folder in cloudinary
    const publicId = `${folderName}/${uniqueFilename}`;
    
    // Upload file to Cloudinary with specified folder and public_id
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          public_id: publicId,
          folder: folderName,
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(fileBuffer);
    });

    return result;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
};

module.exports = cloudinaryUpload;