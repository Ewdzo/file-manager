import { PDFExtract, PDFExtractOptions } from "pdf.js-extract";

export default async function scrapePdf(path: string) {
  try {
    const pdfExtract = new PDFExtract();
    const options: PDFExtractOptions = {}; /* see below */
    const data = await pdfExtract
      .extract(path, options)
      .then((data) => data)
      .catch((err) => console.log(err));

    if (!data) return;

    return data;
  } catch {
    return;
  }
}
