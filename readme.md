# auth

admin

- put semua pengaduan
- deleteUser dan getAllUser

Guest

- create add semua pengaduan

# API'S

id dan password

Guest :
"id": "1111111111111111",
"password": "1111"

"id": "2222222222222222",
"password": "2222"

"id": "3333333333333333",
"password": "3333"

Admin :
"id": "DIGUNAKANUNTUKADMIN1",
"password": "1234"

"id": "HANYAUNTUKADMIN2",  
"password": "4321"

## Api user

- login

  `  post: https//localhost:3000/user/login`

- check Auth

  `  post: https//localhost:3000/user/check_auth`

- addUser/Sign up

  `  post: localhost:3000/user/register`

- getAllUser(role)

  `  GET: localhost:3000/user/?role=Guest`

- getUserByid

  `  GET: localhost:3000/user/users/:id`

- getAllpengaduanbyAuth

  `  GET: localhost:3000/user/pengaduan/auth`

- deleteUserByid

  `  delete: localhost:3000/user/users/:id`

- updateUserByid

  `  put: localhost:3000/user/users/:id`

## Api PELAYANAN PERMOHONAN TANAH PEMAKAMAN Mr/Mrs.X

- getAllmakamPacekeras(status)

  `  GET: localhost:3000/makam_pacekeras/?status=Proses`
  `  GET: localhost:3000/makam_pacekeras/?status=Diterima`
  `  GET: localhost:3000/makam_pacekeras/?status=Ditolak`

- getmakamPacekerasByid

  `  GET: localhost:3000/makam_pacekeras/:id`

- addmakamPacekeras

`  post: localhost:3000/makam_pacekeras/`

- deletemakamPacekerasByid

  `  delete: localhost:3000/makam_pacekeras/:id`

- updateUserByid

  `  put: localhost:3000/makam_pacekeras/:id`

## Api PELAYANAN PEMAPRASAN DAN PEMANGKASAN POHON

- getAllPangkas_pohon(status)

  `  GET: localhost:3000/pangkas_pohon/?status=Proses`
  `  GET: localhost:3000/pangkas_pohon/?status=Diterima`
  `  GET: localhost:3000/pangkas_pohon/?status=Ditolak`

- getPangkas_pohonByid

  `  GET: localhost:3000/pangkas_pohon/:id`

- addPangkas_pohon

  `  post: localhost:3000/pangkas_pohon/`

- deletePangkas_pohonByid

  `  delete: localhost:3000/pangkas_pohon/:id`

- updatePangkas_pohonByid

  `  put: localhost:3000/pangkas_pohon/:id`

- updateBuktiPangkas_pohonByid

  `  put: localhost:3000/pangkas_pohon/bukti/:id`

## Api PELAYANAN PENERANGAN ATAU PERBAIKAN JALAN UMUM

- getAllpju(status)

  `  GET: localhost:3000/pju/?status=Proses`
  `  GET: localhost:3000/pju/?status=Diterima`
  `  GET: localhost:3000/pju/?status=Ditolak`

- getpjuByid

  `  GET: localhost:3000/pju/:id`

- addpju

  `  post: localhost:3000/pju/`

- deletepjuByid

  `  delete: localhost:3000/pju/:id`

- updatepjuByid

  `  put: localhost:3000/pju/:id`

- updateBuktipjuByid

  `  put: localhost:3000/pju/bukti/:id`

## Api PELAYANAN CALON PENGHUNI RUSUNAWA

- getAllrusunawa(status)

  `  GET: localhost:3000/rusunawa/?status=Proses`
  `  GET: localhost:3000/rusunawa/?status=Ditolak`
  `  GET: localhost:3000/rusunawa/?status=Diterima`

- getrusunawaByid

  `  GET: localhost:3000/rusunawa/:id`

- addrusunawa

  `  post: localhost:3000/rusunawa/`

- deleterusunawaByid

  `  delete: localhost:3000/rusunawa/:id`

- updaterusunawaByid

  `  put: localhost:3000/rusunawa/:id`

## Api PELAYANAN PENGANGKUTAN DAN PEMAKAMAN JENAZAH WARGA

- getAllangkut_jenazah(status)

  `  GET: localhost:3000/angkut_jenazah/?status=Proses`
  `  GET: localhost:3000/angkut_jenazah/?status=Ditolak`
  `  GET: localhost:3000/angkut_jenazah/?status=Diterima`

- getangkut_jenazahByid

  `  GET: localhost:3000/angkut_jenazah/:id`

- addangkut_jenazah

  `  post: localhost:3000/angkut_jenazah/`

- deleteangkut_jenazahByid

  `  delete: localhost:3000/angkut_jenazah/:id`

- updateangkut_jenazahByid

  `  put: localhost:3000/angkut_jenazah/:id`

## Api PELAYANAN PEMROSESAN SERAH TERIMA SARANA DAN PRASARANA DAN UTILITAS PERUMAHAN

- getAllpsu(status)

  `  GET: localhost:3000/psu/?status=Proses`
  `  GET: localhost:3000/psu/?status=Ditolak`
  `  GET: localhost:3000/psu/?status=Diterima`

- getpsuByid

  `  GET: localhost:3000/psu/:id`

- addpsu

  `  post: localhost:3000/psu/`

- deletepsuByid

  `  delete: localhost:3000/psu/:id`

- updatepsuByid

  `  put: localhost:3000/psu/:id`

# LINK

link web "https://disperkim.madiunkota.go.id/"
form "https://docs.google.com/forms/d/e/1FAIpQLSciH6PZ7Eu25ZhYlhYoW9JKwQCWo5EphOFN2j9876hRn5r1hQ/viewform"
whimsical https://whimsical.com/WD12F6vhw78iSez6vq4oLW

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
