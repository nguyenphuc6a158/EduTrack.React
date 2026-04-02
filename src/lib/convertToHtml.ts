import mammoth from "mammoth";
import DOMPurify from "dompurify";
import { AppConsts } from "./appconst";

const inlineImage = (mammoth as any).images.inline;

// Style mapping để giữ format Word
const mammothOptions = {
	styleMap: [
		"p[style-name='Heading 1'] => h1:fresh",
		"p[style-name='Heading 2'] => h2:fresh",
		"p[style-name='Heading 3'] => h3:fresh",
		"b => strong",
		"i => em",
		"u => u",
		"s => s",
	],
};

// CSS chỉ apply cho content từ Word (table, format trong document)
const documentStyles = `
  <style>
    .word-document h1, .word-document h2, .word-document h3, 
    .word-document h4, .word-document h5, .word-document h6 {
      margin: 0.5em 0;
      line-height: 1.5;
    }
    .word-document h1 { font-size: 2em; font-weight: bold; }
    .word-document h2 { font-size: 1.5em; font-weight: bold; }
    .word-document h3 { font-size: 1.25em; font-weight: bold; }
    
    .word-document p { margin: 0.5em 0; line-height: 1.6; }
    .word-document strong, .word-document b { font-weight: 600; }
    .word-document em, .word-document i { font-style: italic; }
    .word-document u { text-decoration: underline; }
    
    .word-document ul, .word-document ol { 
      margin: 0.5em 0; 
      padding-left: 2em; 
    }
    .word-document li { margin: 0.25em 0; line-height: 1.6; }
    
    /* Table từ Word document */
    .word-document table { 
      border-collapse: collapse; 
      width: 100%; 
      margin: 1em 0; 
    }
    .word-document table, .word-document th, .word-document td { 
      border: 1px solid #ddd; 
    }
    .word-document th { 
      background-color: #f5f5f5; 
      padding: 0.5em; 
      font-weight: 600; 
    }
    .word-document td { padding: 0.5em; }
    
    .word-document img { max-width: 100%; height: auto; margin: 0.5em 0; }
  </style>
`;

export const extractDocxWithImages = async (url: string): Promise<string> => {
	const response = await fetch(AppConsts.remoteServiceBaseUrl + url);
	const arrayBuffer = await response.arrayBuffer();

	const result = await mammoth.convertToHtml(
		{ arrayBuffer },
		{
			...mammothOptions,
			convertImage: inlineImage(async (image: any) => {
				const base64 = await image.read("base64");
				return {
					src: `data:${image.contentType};base64,${base64}`,
				};
			}),
		}
	);

	const cleanHtml = DOMPurify.sanitize(result.value);
	return documentStyles + `<div class="word-document">${cleanHtml}</div>`;
};

export const extractDocxFromFile = async (file: File): Promise<string> => {
	const arrayBuffer = await file.arrayBuffer();

	const result = await mammoth.convertToHtml(
		{ arrayBuffer },
		{
			...mammothOptions,
			convertImage: inlineImage(async (image: any) => {
				const base64 = await image.read("base64");
				return {
					src: `data:${image.contentType};base64,${base64}`,
				};
			}),
		}
	);

	const cleanHtml = DOMPurify.sanitize(result.value);
	return documentStyles + `<div class="word-document">${cleanHtml}</div>`;
};

export const extractRawTextFromFile = async (file: File): Promise<string> => {
	const arrayBuffer = await file.arrayBuffer();
	const result = await mammoth.extractRawText({ arrayBuffer });
	return result.value;
};

export const parseContentQuestion = (text: string) => {
	const cleanText = text.replace(/\r/g, "");

	const tileMatch = cleanText.match(/Đề bài:\s*([\s\S]*?)Đáp án:/i);
	const answerMatch = cleanText.match(/Đáp án:\s*([\s\S]*?)Giải thích:/i);
	const explanationMatch = cleanText.match(/Giải thích:\s*([\s\S]*)/i);

	const tille = tileMatch?.[1]?.trim() || "";
	const answerRaw = answerMatch?.[1]?.trim() || "";
	const explanation = explanationMatch?.[1]?.trim() || "";

	const answers = answerRaw
		.split("\n")
		.map(line => line.trim())
		.filter(line => /^\((Đúng|Sai)\)\s*[A-Z]\./i.test(line))
		.map(line => {
			const match = line.match(/^\((Đúng|Sai)\)\s*([A-Z])\.\s*(.*)$/i);

			if (!match) {
				return null;
			}

			return {
				content: match[3].trim(),
				isCorrect: match[1].toLowerCase() === "đúng"
			};
		})
		.filter(Boolean);

	return {
		tille,
		answers,
		explanation
	};
};