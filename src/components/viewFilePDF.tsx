import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const ViewFilePDF = (fileUrl: string | null ) => {
	if(!fileUrl){
		return
	}
	return (
		<div
			style={{
				height: 600,
				overflow: "auto",
				display: "flex",
			}}
			>
			<div style={{ transformOrigin: "top" }}>
				<Document file={fileUrl}>
				    <Page pageNumber={1} width={window.innerWidth / 2} />
				</Document>
			</div>
		</div>
	);
};
export default ViewFilePDF;
