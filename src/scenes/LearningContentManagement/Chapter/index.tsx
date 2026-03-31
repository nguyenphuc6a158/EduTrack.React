import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { App, Button, Col, message, Select, Space } from "antd";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useChapterActions, useChapters, usetotalCountChapter } from "src/stores/chapterStore";
import { useSubjects, useSubjectsActions } from "src/stores/subjectStore";
import ChapterTable from "./components/ChapterTable";
import { CreateChapterDto, ChapterDto, UpdateChapterDto } from "src/services/services_autogen";
import ChapterModal from "./components/ChapterModal";

const ChapterManagement: React.FC = ()=>{
	const { message } = App.useApp();
	const listSubject = useSubjects();
	const subjectActions = useSubjectsActions();
	const listChapter = useChapters();
	const chapterActions = useChapterActions();
	const totalChapter = usetotalCountChapter();
	const [idSelectedSubject, setIdSelectedSubject] = useState<number | null>(()=>{
		const stored = localStorage.getItem("idSelectedSubject");
		return stored ? Number(stored) : null;
	})
	const [selectedChapter, setselectedChapter] = useState<ChapterDto | null>(null)
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

	const fetchSubject = async () => {
		try{
			await subjectActions.getAll();
		} catch(error){	
		}
	}

	const fetchChapter = async (selectedSubject: number | null) => {
		try{
			if(selectedSubject != null){
				await chapterActions.getChapterBySubject(selectedSubject);
			} else{
				await chapterActions.getAll();
			}
		} catch(error){	
		}
	}

	useEffect(()=>{
		fetchSubject();
	},[])

	const optionSubject = useMemo(() => {
		return listSubject.map(item => ({
			value: item.id,
			label: item.subjectName || "",
		}));
	}, [listSubject]);

	useEffect(()=>{
		fetchChapter(idSelectedSubject);
	},[idSelectedSubject])

	const onchangeSubject = (item: number | undefined) =>{
		if (item === undefined){
			localStorage.removeItem("idSelectedSubject");
			setIdSelectedSubject(null);
			return
		};
		localStorage.setItem("idSelectedSubject", item.toString());
		setIdSelectedSubject(item)
	}
	const onDelete = async (id: number) => {
		try{
			chapterActions.delete(id);
			message.success("Xóa chương thành công");
		} catch(error){
			message.error("Xóa chương thất bại");
		}
	}

	const openAddModal = () => {
		setselectedChapter(null);
		setIsOpenModal(true);
	}

	const openEditModal = (item: ChapterDto) => {
		setselectedChapter(item);
		setIsOpenModal(true);
	}
	
	const handleOk = async (item: any) => {
		try {if(selectedChapter){
			let input: UpdateChapterDto = new UpdateChapterDto ();
			input.id = selectedChapter.id
			input.subjectId = item.subjectId;
			input.chapterName = item.chapterName;
			await chapterActions.update(input);
			message.success("Chỉnh sửa chương thành công");
		} else {
			let input: CreateChapterDto = new CreateChapterDto ();
			input.subjectId = item.subjectId;
			input.chapterName = item.chapterName;
			await chapterActions.create(input);
			message.success("Thêm mới chương thành công");
		}} catch(error){
			console.log(error)
			message.error("Cập nhật thất bại vui lòng thử lại");
		}
		await fetchChapter(idSelectedSubject);
		setIsOpenModal(false)
	}
	return(
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<Col span={5}>
					<h2 className="text-2xl font-bold text-gray-800">Chương</h2>
					<p className="text-gray-500">Chương trình học</p>
				</Col>
				<Col >
					<Space.Compact>
						<Select
							allowClear
							value={idSelectedSubject}
							onChange={(item) => onchangeSubject(item)}
							options={optionSubject}
							placeholder="Tìm kiếm theo môn học..."
							style={{ width: "200px" }}
						/>
						<Button type="primary" icon={<SearchOutlined />} />
					</Space.Compact>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={openAddModal}
						size="large"
					>
						Thêm chương
					</Button>
				</Col>
			</div>
			<ChapterTable 
				listChapter={listChapter}
				onDelete={onDelete}
				onEdit={openEditModal}
				totalChapter={totalChapter}
			/>
			<ChapterModal 
				onCancel={()=>(setIsOpenModal(false))}
				onOk={handleOk}
				open={isOpenModal}
				selectedChapter={selectedChapter}
				listSubject={listSubject}
			/>
		</div>
	)
}
export default ChapterManagement