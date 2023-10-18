import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import multer from 'multer';

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  delete_derived_resources: true
});

// File Filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars',
    public_id: (req, file) => file.originalname,
    url: async (req, file) => {
      return new Promise((resolve, reject) => {
        const uniqueFilename = new Date().toISOString();
        resolve(uniqueFilename);
      });
    },
  },
});

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
});

// Cloudinary Storage for posts
const postStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'samples',
    public_id: (req, file) => file.originalname,
    url: async (req, file) => {
      return new Promise((resolve, reject) => {
        const uniqueFilename = new Date().toISOString();
        resolve(uniqueFilename);
      });
    },
  },
});

export const postUpload = multer({ 
  storage: postStorage,
  fileFilter: fileFilter,
});