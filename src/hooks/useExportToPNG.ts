import { useCallback } from "react";
import html2canvas from "html2canvas-pro";

const useExportToPNG = (canvasRef: React.RefObject<HTMLDivElement>) => {
  return useCallback(async () => {
    if (canvasRef.current) {
      const offScreenCanvas = canvasRef.current.cloneNode(
        true
      ) as HTMLDivElement;
      offScreenCanvas.style.width = "1080px";
      offScreenCanvas.style.height = "1350px";
      offScreenCanvas.style.position = "absolute";
      offScreenCanvas.style.top = "-9999px";
      document.body.appendChild(offScreenCanvas);

      try {
        const canvas = await html2canvas(offScreenCanvas, {
          width: 1080,
          height: 1350,
          useCORS: true,
        });

        document.body.removeChild(offScreenCanvas);

        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((blob) => resolve(blob), "image/png")
        );

        if (!blob) {
          console.error("Failed to create image blob.");
          return;
        }

        if ("showSaveFilePicker" in window) {
          try {
            const fileHandle = await (
              window as unknown as {
                showSaveFilePicker: (options: {
                  suggestedName: string;
                  types: {
                    description: string;
                    accept: { [mimeType: string]: string[] };
                  }[];
                }) => Promise<FileSystemFileHandle>;
              }
            ).showSaveFilePicker({
              suggestedName: "canvas.png",
              types: [
                {
                  description: "PNG Image",
                  accept: {
                    "image/png": [".png"],
                  },
                },
              ],
            });

            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
            return;
          } catch (pickerError) {
            console.warn("User canceled file save dialog.", pickerError);
            return;
          }
        }
        // Fallback: Automatic download (Firefox & unsupported browsers)
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "canvas.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error exporting canvas:", error);
      }
    }
  }, [canvasRef]);
};

export default useExportToPNG;
