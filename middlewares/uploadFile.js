const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

exports.uploadFile = (
  profileImg,
  pohonimg,
  file_rekom_rs,
  file_kk,
  file_ktp,
  file_angkut_jenazah,
  file_ktp_pemohon,
  file_data_perusahaan,
  file_sertifikat_tanah,
  file_data_ijin_pendukung,
  file_kop_surat_perusahaan
) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: "dinas_perumahan",
        public_id:
          Date.now() +
          "-" +
          file.originalname.replace(/\s/g, "") +
          "-" +
          file.fieldname,
      };
    },
  });

  // Function untuk filter file berdasarkan type
  const fileFilter = function (req, file, cb) {
    if (
      //   file.fieldname === imageFile &&
      file.fieldname === file_ktp_pemohon &&
      file.fieldname === file_data_perusahaan &&
      file.fieldname === file_sertifikat_tanah &&
      file.fieldname === file_data_ijin_pendukung &&
      file.fieldname === file_kop_surat_perusahaan &&
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
      name: file_ktp_pemohon,
      maxCount: 1,
    },
    {
      name: file_data_perusahaan,
      maxCount: 1,
    },
    {
      name: file_sertifikat_tanah,
      maxCount: 1,
    },
    {
      name: file_data_ijin_pendukung,
      maxCount: 1,
    },
    {
      name: file_kop_surat_perusahaan,
      maxCount: 1,
    },
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
