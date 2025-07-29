import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configuration
//multer sanga connection built garnaa
cloudinary.config({
  cloud_name: "dkcybmxgk",
  api_key: "357769795786453",
  api_secret: "By1SW_zE6dYha8IDt8mIOKGCwfs", // Click 'View API Keys' above to copy your API secret
});

const storage = new CloudinaryStorage({
  //connection pass gareko
  cloudinary: cloudinary,
  params: {
    folder: "image",
    // format: async (req, file) => 'png', // supports promises as well
    // public_id: (req, file) => 'computed-filename-using-request',
  },
});

const uploads = multer({ storage: storage });

export { uploads, cloudinary };
