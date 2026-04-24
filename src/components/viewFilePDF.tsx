import { Document, Page, pdfjs } from "react-pdf";
import { useSettings } from "src/stores/settingStore";
import { ThemeMode } from "src/lib/enumconst";
import { ModeViewFilePDF } from "src/lib/enum";

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface ViewFilePDFProps {
	fileUrl: string | null;
	mode: ModeViewFilePDF
}

const ViewFilePDF: React.FC<ViewFilePDFProps> = ({ fileUrl, mode }) => {
	const { themeMode } = useSettings();
	const isDarkMode = themeMode === ThemeMode.Dark;

	if(!fileUrl){
		return null;
	}
	const settingWidthPage = () => {
		if(mode === ModeViewFilePDF.ASSIGNMENTQUESTIONVIEW){
			return window.innerWidth / 2
		}else if(mode === ModeViewFilePDF.DEMOQUESTIONVIEW){
			return 800
		}
	}
	return (
		<div
			style={{
				height: 600,
				overflow: "hidden",
				display: "flex",
				backgroundColor: isDarkMode ? "#1f1f1f" : "#fff",
				padding: "10px",
				borderRadius: "4px",
			}}
			>
			<div style={{ 
				transformOrigin: "top",
				filter: isDarkMode ? "invert(0.95) contrast(1.1)" : "none",
			}}>
				<Document file={fileUrl}>
				    <Page pageNumber={1} width={settingWidthPage()} />
				</Document>
			</div>
		</div>
	);
};
export default ViewFilePDF;
