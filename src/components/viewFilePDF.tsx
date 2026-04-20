import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const ViewFilePDF = (fileUrl: string | null ) => {
	if(!fileUrl){
		return
	}
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<Document file={fileUrl}>
				<Page pageNumber={1} width={600} />
			</Document>
		</div>
	);
};

export default ViewFilePDF;