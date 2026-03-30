export const colResponsive = (xs: number, sm: number, md: number, lg: number, xl: number, xxl: number) => {
	return {
		xs: { span: xs },
		sm: { span: sm },
		md: { span: md },
		lg: { span: lg },
		xl: { span: xl },
		xxl: { span: xxl },
	};
};
export const formatPhoneNumber = (phoneNumber: string) => {
	if (!phoneNumber) return "";

  // bỏ khoảng trắng, dấu chấm, dấu gạch
  const cleaned = phoneNumber.replace(/\D/g, "");

  // format: 0987654321 -> 098 765 4321
  return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
}
export const AppConsts = {
	appBaseUrl: import.meta.env.REACT_APP_APP_BASE_URL,
	remoteServiceBaseUrl: import.meta.env.VITE_API_BASE_URL,
	COLOR_PRIMARY: '#00a76f',

	PAGESIZE: 20,
	PageSizeOptions: ['10', '20', '50', '100', '200', '500'],
	localization: {
		defaultLocalizationSourceName: 'MIGViet',
	},
	Permission: {
		Pages_Tenants: "Pages.Tenants",
		
		Pages_Users: "Pages.Users",
		Pages_Users_Activation: "Pages.Users.Activation",
		Pages_Users_Create: "Pages.Users.Create",
		Pages_Users_Update: "Pages.Users.Update",
		Pages_Users_Delete: "Pages.Users.Delete",

		Pages_Roles: "Pages.Roles",
		Pages_Roles_Create: "Pages.Roles.Create",
		Pages_Roles_Update: "Pages.Roles.Update",
		Pages_Roles_Delete: "Pages.Roles.Delete",

		Pages_Grades: "Pages.Grades",
		Pages_Grades_Create: "Pages.Grades.Create",
		Pages_Grades_Update: "Pages.Grades.Update",
		Pages_Grades_Delete: "Pages.Grades.Delete",

		Pages_StudentClasses: "Pages.StudentClasses",
		Pages_StudentClasses_Create: "Pages.StudentClasses.Create",
		Pages_StudentClasses_Update: "Pages.StudentClasses.Update",
		Pages_StudentClasses_Delete: "Pages.StudentClasses.Delete",

		Pages_StudentAssignments: "Pages.StudentAssignments",
		Pages_StudentAssignments_Create: "Pages.StudentAssignments.Create",
		Pages_StudentAssignments_Update: "Pages.StudentAssignments.Update",
		Pages_StudentAssignments_Delete: "Pages.StudentAssignments.Delete",

		Pages_Assignments: "Pages.Assignments",
		Pages_Assignments_Create: "Pages.Assignments.Create",
		Pages_Assignments_Update: "Pages.Assignments.Update",
		Pages_Assignments_Delete: "Pages.Assignments.Delete",

		Pages_ClassAssignments: "Pages.ClassAssignments",
		Pages_ClassAssignments_Create: "Pages.ClassAssignments.Create",
		Pages_ClassAssignments_Update: "Pages.ClassAssignments.Update",
		Pages_ClassAssignments_Delete: "Pages.ClassAssignments.Delete",

		Pages_Classes: "Pages.Classes",
		Pages_Classes_Create: "Pages.Classes.Create",
		Pages_Classes_Update: "Pages.Classes.Update",
		Pages_Classes_Delete: "Pages.Classes.Delete",

		Pages_StudentProgress: "Pages.StudentProgress",
		Pages_StudentProgress_Create: "Pages.StudentProgress.Create",
		Pages_StudentProgress_Update: "Pages.StudentProgress.Update",
		Pages_StudentProgress_Delete: "Pages.StudentProgress.Delete",

		Pages_Chapters: "Pages.Chapters",
		Pages_Chapters_Create: "Pages.Chapters.Create",
		Pages_Chapters_Update: "Pages.Chapters.Update",
		Pages_Chapters_Delete: "Pages.Chapters.Delete",

		Pages_AssignmentQuestions: "Pages.AssignmentQuestions",
		Pages_AssignmentQuestions_Create: "Pages.AssignmentQuestions.Create",
		Pages_AssignmentQuestions_Update: "Pages.AssignmentQuestions.Update",
		Pages_AssignmentQuestions_Delete: "Pages.AssignmentQuestions.Delete",

		Pages_StudentAnswers: "Pages.StudentAnswers",
		Pages_StudentAnswers_Create: "Pages.StudentAnswers.Create",
		Pages_StudentAnswers_Update: "Pages.StudentAnswers.Update",
		Pages_StudentAnswers_Delete: "Pages.StudentAnswers.Delete",

		Pages_Questions: "Pages.Questions",
		Pages_Questions_Create: "Pages.Questions.Create",
		Pages_Questions_Update: "Pages.Questions.Update",
		Pages_Questions_Delete: "Pages.Questions.Delete",

		Pages_QuestionOptions: "Pages.QuestionOptions",
		Pages_QuestionOptions_Create: "Pages.QuestionOptions.Create",
		Pages_QuestionOptions_Update: "Pages.QuestionOptions.Update",
		Pages_QuestionOptions_Delete: "Pages.QuestionOptions.Delete",

		Pages_Subjects: "Pages.Subjects",
		Pages_Subjects_Create: "Pages.Subjects.Create",
		Pages_Subjects_Update: "Pages.Subjects.Update",
		Pages_Subjects_Delete: "Pages.Subjects.Delete",
	},
	Granted_Permissions_Const: {
		Pages_Tenants: { name: "Pages.Tenants", display_name: "Pages.Tenants" },
		Pages_Users: { name: "Pages.Users", display_name: "Pages.Users" },
		Pages_Roles: { name: "Pages.Roles", display_name: "Pages.Roles" },
		
	},
	fontFamily: {
		primary: 'Open Sans Variable',
		secondary: 'Inter Variable',
	},
	fontSize: {
		xs: '12',
		sm: '14',
		default: '16',
		lg: '18',
		xl: '20',
	},
	fontWeight: {
		light: '300',
		normal: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
	},
	lineHeight: {
		none: '1',
		tight: '1.25',
		normal: '1.375',
		relaxed: '1.5',
	},
};