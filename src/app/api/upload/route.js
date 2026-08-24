import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary SDK
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "careerbuild",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided for upload." },
        { status: 400 }
      );
    }

    // Convert file to array buffer & buffer for Cloudinary stream upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload directly to Cloudinary using upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "careerbuild_resumes",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) resolve({ error });
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    if (uploadResult.error) {
      console.warn("[Cloudinary API Notice] Direct SDK upload notice:", uploadResult.error.message || uploadResult.error);
      
      // Fallback unsigned upload directly to Cloudinary HTTP endpoint or base64 format
      const base64Data = buffer.toString("base64");
      const dataUri = `data:${file.type || "image/png"};base64,${base64Data}`;
      
      // Try Cloudinary HTTP upload
      try {
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "careerbuild";
        const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || "careerbuild_resumes";
        
        const bodyData = new FormData();
        bodyData.append("file", dataUri);
        bodyData.append("upload_preset", uploadPreset);

        const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: bodyData,
        });

        const cloudJson = await cloudRes.json();
        if (cloudJson.secure_url) {
          console.log("[Cloudinary HTTP] Uploaded avatar URL:", cloudJson.secure_url);
          return NextResponse.json({
            success: true,
            url: cloudJson.secure_url,
            provider: "Cloudinary",
          });
        }
      } catch (httpErr) {
        console.error("[Cloudinary HTTP Error]:", httpErr.message);
      }

      // If Cloudinary endpoint is unavailable, return data URI fallback so user avatar image never breaks!
      return NextResponse.json({
        success: true,
        url: dataUri,
        provider: "LocalBase64",
      });
    }

    console.log("[Cloudinary SDK Success] Uploaded image URL:", uploadResult.secure_url);
    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      provider: "Cloudinary",
    });
  } catch (error) {
    console.error("[Cloudinary Upload Route Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload image." },
      { status: 500 }
    );
  }
}
