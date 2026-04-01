import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { requireAuth } from "../middlewares/auth.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Root uploads folder
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter file types
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF."), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

// Upload POST endpoint
// Protected by requireAuth
router.post("/", requireAuth, upload.single("image"), (req: any, res: any) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  // Construct URLs
  const fileUrl = `/uploads/${req.file.filename}`;
  // You might want to return the absolute URL if needed by frontend
  // const fullUrl = `${req.protocol}://${req.get("host")}${fileUrl}`;

  res.status(200).json({
    message: "File uploaded successfully",
    url: fileUrl, // Relative URL for saving to DB
  });
});

export default router;
