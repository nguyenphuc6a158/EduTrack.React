import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ViewFilePDF = (fileUrl: string | null ) => {
	if(!fileUrl){
		return
	}
	return (
		<div
			style={{
				height: 400,
				overflow: "hidden",    // 👈 cắt phần dư
				display: "flex",
				justifyContent: "center",
			}}
			>
			<div style={{ transformOrigin: "top" }}>
				<Document file={fileUrl}>
				<Page pageNumber={1} width={600} />
				</Document>
			</div>
		</div>
	);
};

export default ViewFilePDF;