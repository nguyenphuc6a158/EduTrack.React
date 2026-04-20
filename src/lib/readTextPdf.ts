import * as pdfjsLib from "pdfjs-dist";

// Setup worker - use base URL + static path
if (typeof window !== "undefined") {
    const workerPath = `${import.meta.env.BASE_URL || "/"}pdf.worker.min.js`;
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;
}

export const readPdfText = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const strings = content.items.map((item: any) => item.str);
        text += strings.join(" ") + "\n";
    }

    return text;
};
export const parseAnswers = (text: string) => {
  // 1. clean text trước (rất quan trọng với PDF)
  const clean = text
    .replace(/\s+/g, " ")
    .replace(/([A-Za-zÀ-ỹ])\s(?=[A-Za-zÀ-ỹ])/g, "$1")
    .trim();

  // 2. lấy phần sau "Đáp án:"
  const answerPart = clean.split(/Đáp\s*án:/i)[1];
  if (!answerPart) return [];

  // 3. regex lấy A B C D
  const regex = /([A-D])\.\s*(.*?)(?=\s*[A-D]\.|$)/g;

  const results: { key: string; content: string }[] = [];

  let match;
  while ((match = regex.exec(answerPart)) !== null) {
    results.push({
      key: match[1],
      content: match[2].trim(),
    });
  }

  return results;
};