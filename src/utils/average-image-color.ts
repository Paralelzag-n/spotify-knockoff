import { IPlaylist } from "../ts/pinia/playlist.types.ts";

export function getAverageColorFromImage(
  currentPlaylist: IPlaylist,
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!currentPlaylist || !currentPlaylist.thumbnail) {
      resolve("#ffffff00");
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = currentPlaylist.thumbnail;
    img.onload = () => {
      const scaleFactor = 0.1;
      const scaledWidth = img.width * scaleFactor;
      const scaledHeight = img.height * scaleFactor;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve("#ffffff");
        return;
      }

      canvas.width = scaledWidth;
      canvas.height = scaledHeight;
      ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

      const imageData = ctx.getImageData(0, 0, scaledWidth, scaledHeight).data;

      let totalRed = 0;
      let totalGreen = 0;
      let totalBlue = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        totalRed += imageData[i];
        totalGreen += imageData[i + 1];
        totalBlue += imageData[i + 2];
      }

      const pixelCount = imageData.length / 4;
      const averageRed = Math.round(totalRed / pixelCount);
      const averageGreen = Math.round(totalGreen / pixelCount);
      const averageBlue = Math.round(totalBlue / pixelCount);

      const averageColorHex = `#${((1 << 24) + (averageRed << 16) + (averageGreen << 8) + averageBlue).toString(16).slice(1)}`;

      resolve(averageColorHex);
    };

    img.onerror = () => {
      reject(new Error("Image loading failed"));
    };
  });
}
