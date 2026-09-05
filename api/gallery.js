function sendJson(res, statusCode, data, extraHeaders = {}) {
  if (res) {
    if (typeof res.setHeader === "function") {
      res.setHeader("Content-Type", "application/json");
      for (const [key, value] of Object.entries(extraHeaders)) {
        res.setHeader(key, value);
      }
    }
    if (typeof res.status === "function" && typeof res.json === "function") {
      return res.status(statusCode).json(data);
    }
    res.statusCode = statusCode;
    res.end(JSON.stringify(data));
    return;
  }
  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders
    }
  });
}

export default async function handler(req, res) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/sy8fu0lam";
  const folderPath = process.env.IMAGEKIT_GALLERY_FOLDER || "/visual_gallery";

  // If private key is not configured, return empty array (triggers fallback in frontend)
  if (!privateKey) {
    return sendJson(res, 200, []);
  }

  try {
    const authHeader = "Basic " + Buffer.from(privateKey + ":").toString("base64");
    const response = await fetch(
      `https://api.imagekit.io/v1/files?path=${encodeURIComponent(folderPath)}&fileType=image&sort=DESC_CREATED&limit=100`,
      {
        headers: {
          Authorization: authHeader
        }
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("ImageKit API Error:", response.status, errText);
      return sendJson(res, 200, []);
    }

    const files = await response.json();
    const formattedItems = (Array.isArray(files) ? files : []).map((file, idx) => {
      const rawName = (file.name || "").replace(/\.[^/.]+$/, "");
      
      // Clean up title: replace WhatsApp generic names with engaging musical titles
      let formattedTitle = rawName
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim();

      if (/^Whatsapp Image/i.test(formattedTitle) || !formattedTitle) {
        const fallbacks = [
          "Annual Concert Showcase",
          "Student Classical Recital",
          "Acoustic & Vocal Masterclass",
          "Academy Grand Fiesta",
          "Studio Jam & Harmony"
        ];
        formattedTitle = fallbacks[idx % fallbacks.length];
      }

      const tag = (file.tags && file.tags.length > 0) ? file.tags[0] : "Performance";

      // Append ImageKit transformation query cleanly
      const separator = file.url.includes("?") ? "&" : "?";
      const optimizedSrc = `${file.url}${separator}tr=w-800,f-auto,q-85`;

      return {
        id: file.fileId || `ik_${idx}`,
        tag,
        title: formattedTitle,
        src: optimizedSrc,
        originalSrc: file.url,
        width: file.width,
        height: file.height
      };
    });

    return sendJson(res, 200, formattedItems, {
      "Cache-Control": "s-maxage=1800, stale-while-revalidate=86400"
    });
  } catch (error) {
    console.error("Failed to fetch gallery from ImageKit:", error);
    return sendJson(res, 200, []);
  }
}
