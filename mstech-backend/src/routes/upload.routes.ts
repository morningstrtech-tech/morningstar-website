import { Router } from "express";
import multer from "multer";
import { requireAdmin } from "../middlewares/auth.middleware.js";
import { supabase } from "../lib/supabase.js";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Configure storage in memory for serverless
const storage = multer.memoryStorage();

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
router.post("/", requireAdmin, upload.single("image"), async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const file = req.file;
    const fileExt = file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("images") // Pastikan bucket di Supabase bernama 'images'
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error("Supabase Upload Error:", error);
      return res.status(500).json({ error: "Failed to upload to Supabase Storage." });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    res.status(200).json({
      message: "File uploaded successfully to Supabase",
      url: publicUrl, // URL publik untuk disimpan ke DB
    });
  } catch (err: any) {
    console.error("Upload route error:", err);
    res.status(500).json({ error: "Internal server error during upload." });
  }
});

export default router;
