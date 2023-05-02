link web "https://disperkim.madiunkota.go.id/"
form "https://docs.google.com/forms/d/e/1FAIpQLSciH6PZ7Eu25ZhYlhYoW9JKwQCWo5EphOFN2j9876hRn5r1hQ/viewform"

### user

npx sequelize-cli model:generate --name user --attributes nik:integer,nama:string,gender:string,alamat:string,hp:integer,password:string,role:string, profileImg:string

### pangkas pohon

npx sequelize-cli model:generate --name pangkas_pohon --attributes userId:integer,deskripsi_pengaduan:string,pohonImg:string,status:string,keterangan:string

### pju

npx sequelize-cli model:generate --name pju --attributes userId:integer,deskripsi_pengaduan:string,status:string,keterangan:string

### makam-pacekeras

npx sequelize-cli model:generate --name makam_pacekeras --attributes userId:integer,file_rekom_rs:string,status:string,keterangan:string

### penghuni rusunawa

npx sequelize-cli model:generate --name penghuni_rusunawa --attributes userId:integer,status_kawin:string,jumlah_anggota_keluarga:string,file_ktp:string,file_kk:string,status:string,keterangan:string

### angkut dan makam jenazah_warga

npx sequelize-cli model:generate --name angkut_makam_jenazah --attributes userId:integer,permohonan_ijin:string,nama_jenazah:string,agama_jenazah,ttl_jenazah:date,tgl_wafat:date,tgl_pemakaman:date,alamat_jenazah:string,gender_jenazah:string,tempat_makam:string,file_rekom_rs:string,status:string,keterangan:string

### psu

npx sequelize-cli model:generate --name psu --attributes userId:integer,nama_perusahaan:string,nama_direktur:string,gender_direktur:string,jabatan:string,alamat_perusahaan:string,telp_perusahaan:string,lokasi:string,no_shgb:string,an_pemilik:string,data_tanah:string,ktp_pemohon:string,data_perusahaan:string,sertifikat_tanah:string,data_ijin_pendukung:string,kop_surat:string,status:string,keterangan:string

## uploadfile.js

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

exports.uploadFile = (
profileImg,
pohonimg,
file_rekom_rs,
file_kk,
file_ktp
) => {
const storage = multer.diskStorage({
destination: function (req, file, cb) {
switch (file.fieldname) {
// case "imageFile":
// case "detail_one":
case "file_ktp":
case "file_kk":
cb(null, "public/file_rusunawas"); //Lokasi penyimpanan file
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
// file.fieldname === imageFile &&
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
const maxSize = sizeInMb _ 1000 _ 1000; //10Mb

// Eksekusi upload multer dan menentukan disk storage, validation dan maxSize file
const upload = multer({
storage,
fileFilter,
limits: {
fileSize: maxSize,
},
}).fields([
// {
// name: imageFile,
// maxCount: 1,
// },
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
