import { ComputedRef, ref, watch } from "vue";

import { IPlaylist } from "../ts/pinia/playlist.types";

export const useAverageColor = (currentPlaylist: any) => {
  const dominantColor = ref<string | null>(null);

  if (currentPlaylist)
    watch(currentPlaylist, () => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // This is necessary to avoid CORS issues
      img.src = currentPlaylist?.value?.thumbnail ?? "";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;

        let totalRed = 0;
        let totalGreen = 0;
        let totalBlue = 0;

        // Iterate through pixel data (RGBA format)
        for (let i = 0; i < imageData.length; i += 4) {
          totalRed += imageData[i];
          totalGreen += imageData[i + 1];
          totalBlue += imageData[i + 2];
        }

        // Calculate the average color values
        const pixelCount = imageData.length / 4;
        const averageRed = totalRed / pixelCount;
        const averageGreen = totalGreen / pixelCount;
        const averageBlue = totalBlue / pixelCount;

        // Construct the average color as a CSS rgb string
        const averageColor = `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`;

        dominantColor.value = averageColor;
      };
    });

  return { dominantColor };
};
