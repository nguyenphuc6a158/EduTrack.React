import mammoth from "mammoth";
import DOMPurify from "dompurify";
import { AppConsts } from "./appconst";
import "./word-document.css";
import { mammothOptions } from "./mammoth.config";
const inlineImage = (mammoth as any).images.inline;

// Style mapping để giữ format Word
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
	return `<div class="word-document">${cleanHtml}</div>`;
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
	return `<div class="word-document">${cleanHtml}</div>`;
};

export const extractRawTextFromFile = async (file: File): Promise<string> => {
	const arrayBuffer = await file.arrayBuffer();
	const result = await mammoth.extractRawText({ arrayBuffer });
	return result.value;
};
export const extractRawTextFromUrlFile = async (urlFoder: string) => {
	let url = import.meta.env.VITE_APP_BASE_API + urlFoder;
	const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

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