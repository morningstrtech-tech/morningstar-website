import { auth } from "../auth/auth.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * Script to initialize the first admin user using Better Auth.
 * Run with: npx tsx src/scripts/init-admin.ts
 */
async function initAdmin() {
  console.log("Initializing Admin User...");
  
  const email = "admin@mstech.agency";
  const password = "admin123456";
  const name = "MS.Tech Admin";

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (result) {
      console.log("✅ Admin user created successfully!");
      console.log(`📧 Email: ${email}`);
      console.log(`🔑 Password: ${password}`);
    }
  } catch (error: any) {
    if (error?.code === "user_already_exists") {
      console.log("⚠️ Admin user already exists.");
    } else {
      console.error("❌ Failed to create admin user:", error);
    }
  } finally {
    process.exit(0);
  }
}

initAdmin();
