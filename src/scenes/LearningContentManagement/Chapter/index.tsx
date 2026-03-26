import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Select, Space } from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import { useChapterActions, useChapters } from "src/stores/chapterStore";
import { useSubjects, useSubjectsActions } from "src/stores/subjectStore";

const ChapterManagement: React.FC = ()=>{
	const listSubject = useSubjects();
	const subjectActions = useSubjectsActions();
	const listChapter = useChapters();
	const chapterActions = useChapterActions();

	const [optionSubject, setOptionSubject] = useState<{label: string, value: number}[] | []>([])
	const [idSelectedSubject, setIdSelectedSubject] = useState<number | null>(null)
	const openAddModal = () => {

	}

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
				await chapterActions.getAll(undefined,10);
			}
		} catch(error){	
		}
	}

	useEffect(()=>{
		fetchSubject();
		let idSelectedSubject = localStorage.getItem("idSelectedSubject");
		if(idSelectedSubject != undefined){
			setIdSelectedSubject(Number(idSelectedSubject))
			fetchChapter(Number(idSelectedSubject));
		} else {
			fetchChapter(null);
		}
	},[])

	useEffect(()=>{
		const options = listSubject.map(item => ({
			value: item.id,
			label: item.subjectName || "",
		}));
		setOptionSubject(options)
	},[listSubject])

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
							placeholder="Chọn môn học"
							style={{ width: '80%' }}
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
		</div>
	)
}
export default ChapterManagement