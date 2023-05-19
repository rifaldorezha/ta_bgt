const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cld = require("cloudinary");
// const { parse } = require("path");
const { v4: uuidv4 } = require("uuid");

cld.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cld.v2,
  params: async (req, file) => {
    return {
      folder: "dinas_perumahan",
      public_id: uuidv4(),
    };
  },
});

const fileFilter = function (req, file, cb) {
  {
    if (
      !file.originalname.match(
        /\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF|docx|DOCX)$/
      )
    ) {
      return cb(new Error("Only image files are allowed!"), false);
    }
  }
  cb(null, true);
};

// const delFile = cld.v2.uploader.destroy(image);
const upload = multer({ storage, fileFilter });

module.exports = { cld, upload };
