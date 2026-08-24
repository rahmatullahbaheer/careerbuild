import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

/**
 * Utility to directly generate and download a clean PDF from a DOM element
 * using native browser SVG rendering to support all modern CSS colors (lab, oklch, Tailwind v4).
 */
export async function exportResumeToPDF(elementId = "resume-canvas-printable", fileName = "Resume") {
  if (typeof window === "undefined") return;

  const element = document.getElementById(elementId);
  if (!element) {
    alert("Resume canvas element not found.");
    return;
  }

  try {
    // 1. Convert DOM node to PNG via native browser SVG rendering engine
    const dataUrl = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff",
    });

    // 2. Initialize jsPDF document in A4 format
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // A4 width: 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // A4 height: 297mm

    const imgProps = pdf.getImageProperties(dataUrl);
    const calculatedHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // 3. Add image to PDF document
    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, calculatedHeight);

    // 4. Trigger direct download without print popups
    const safeFileName = fileName.replace(/[^a-z0-9_-]/gi, "_") || "Resume";
    pdf.save(`${safeFileName}.pdf`);
  } catch (error) {
    console.error("Direct PDF Export Error:", error);
    alert("Direct PDF export failed: " + (error.message || "Unknown error"));
  }
}
