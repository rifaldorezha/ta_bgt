const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

exports.uploadFile = (
  profileImg,
  pohonimg,
  file_rekom_rs,
  file_kk,
  file_ktp,
  file_angkut_jenazah
) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      switch (file.fieldname) {
        // case "imageFile":
        // case "detail_one":
        case "file_ktp":
        case "file_kk":
          cb(null, "public/file_rusunawas"); //Lokasi penyimpanan file
          break;
        case "file_angkut_jenazah":
          cb(null, "public/file_angkut_jenazahs"); //Lokasi penyimpanan file
          break;
        case "file_rekom_rs":
          cb(null, "public/file_makams"); //Lokasi penyimpanan file
          break;
        case "pohonImg":
          cb(null, "public/pangkas_pohons"); //Lokasi penyimpanan file
          break;
        case "profileImg":
          cb(null, "public/profileImages"); //Lokasi penyimpanan file
          break;
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  // Function untuk filter file berdasarkan type
  const fileFilter = function (req, file, cb) {
    if (
      //   file.fieldname === imageFile &&
      file.fieldname === file_angkut_jenazah &&
      file.fieldname === file_ktp &&
      file.fieldname === file_kk &&
      file.fieldname === file_rekom_rs &&
      file.fieldname === pohonimg &&
      file.fieldname === profileImg
    ) {
      if (
        !file.originalname.match(
          /\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF|doc|DOC)$/
        )
      ) {
        req.fileValidationError = {
          message: "Only image files are allowed!",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }
    cb(null, true);
  };

  const sizeInMb = 10;
  const maxSize = sizeInMb * 1000 * 1000; //10Mb

  // Eksekusi upload multer dan menentukan disk storage, validation dan maxSize file
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    // {
    //   name: imageFile,
    //   maxCount: 1,
    // },
    {
      name: file_angkut_jenazah,
      maxCount: 1,
    },
    {
      name: file_kk,
      maxCount: 1,
    },
    {
      name: file_ktp,
      maxCount: 1,
    },
    {
      name: file_rekom_rs,
      maxCount: 1,
    },
    {
      name: pohonimg,
      maxCount: 1,
    },
    {
      name: profileImg,
      maxCount: 1,
    },
  ]); //Menentukan jumlah file

  return (req, res, next) => {
    upload(req, res, function (err) {
      // Pesan error jika validasi gagal
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }
      // Jika file upload tidak ada
      if (!req.files && !err) {
        return res.status(400).send({
          message: "Please select files to upload",
        });
      }

      if (err) {
        // Jika size melebihi batas
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 10Mb",
          });
        }
        console.log("Saya Error Akhir", err);
        return res.status(400).send({
          message: "Failed Akhir",
          status: err,
        });
      }
      return next();
    });
  };
};
