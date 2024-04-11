interface IMimeTypeMapping {
  "image/jpeg": "jpg";
  "image/png": "png";

  [key: string]: string;
}

export function getFileExtensionFromMimeType(mimeType: string): string {
  const mimeTypeMapping: IMimeTypeMapping = {
    "image/jpeg": "jpg",
    "image/png": "png",
  };

  return mimeTypeMapping[mimeType] || "unknown";
}
