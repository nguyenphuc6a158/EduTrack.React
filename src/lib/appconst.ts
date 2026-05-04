/**
 * Breakpoint tối thiểu (px), khớp Ant Design Grid / useBreakpoint để dùng chung Table, Drawer, CSS-in-JS.
 * xs: dưới sm (mobile nhỏ); sm–xxl: min-width tương ứng.
 */
export const ResponsiveBreakpoints = {
	xsMax: 575,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1600,
} as const;

/** Chuỗi (min-width: …px) cho matchMedia hoặc styled-components */
export const ResponsiveMedia = {
	sm: `(min-width: ${ResponsiveBreakpoints.sm}px)`,
	md: `(min-width: ${ResponsiveBreakpoints.md}px)`,
	lg: `(min-width: ${ResponsiveBreakpoints.lg}px)`,
	xl: `(min-width: ${ResponsiveBreakpoints.xl}px)`,
	xxl: `(min-width: ${ResponsiveBreakpoints.xxl}px)`,
	/** Mobile-first: chỉ áp dụng khi màn hình nhỏ (dưới sm) */
	xsOnly: `(max-width: ${ResponsiveBreakpoints.xsMax}px)`,
} as const;

/** Gutter Row (Ant Design), padding trang — tăng dần từ mobile → desktop */
export const ResponsiveSpacing = {
	rowGutter: { xs: 8, sm: 12, md: 16, lg: 20, xl: 24 },
	/** Khoảng cách ngang lớn (ví dụ nhóm nút điều hướng câu hỏi) */
	wideRowGutter: { xs: 12, sm: 32, md: 64, lg: 120, xl: 160, xxl: 200 },
	pagePaddingX: { xs: 12, sm: 16, md: 20, lg: 24, xl: 32 },
	pagePaddingY: { xs: 12, sm: 16, md: 20, lg: 24 },
} as const;

/** Chiều rộng nội dung / drawer / modal theo tier màn hình */
export const ResponsiveLayout = {
	contentMaxWidth: { xs: '100%', sm: 540, md: 720, lg: 960, xl: 1140, xxl: 1320 },
	drawerWidth: { xs: '100%', sm: 400, md: 480, lg: 520 },
	modalWidth: { xs: 'calc(100vw - 32px)', sm: 520, md: 600, lg: 720, xl: 800, xxl: 920 },
	/** Modal form lớn (thay cho width 80–90%) */
	modalWidthFluid: 'min(94vw, 1100px)',
	modalWidthFluidMedium: 'min(88vw, 900px)',
	modalWidthFluidNarrow: 'min(85vw, 720px)',
	/** Select / filter: vừa màn hình nhỏ, tối đa ~200px trên desktop */
	formControlWidth: 'min(100%, 200px)',
	formControlWidthMd: 'min(100%, 240px)',
	/** Table scroll.x — bảng nhiều cột cuộn ngang trên mobile */
	tableScrollX: 'max-content' as const,
} as const;

/** Kết quả `Grid.useBreakpoint()` từ Ant Design */
export type ResponsiveScreens = Partial<{ xs: boolean; sm: boolean; md: boolean; lg: boolean; xl: boolean; xxl: boolean }>;

/** Padding trang theo breakpoint hiện tại (dùng với `PageShell` hoặc `Grid.useBreakpoint`) */
export function getPageShellPadding(screens: ResponsiveScreens) {
	const px =
		screens.xxl || screens.xl
			? ResponsiveSpacing.pagePaddingX.xl
			: screens.lg
				? ResponsiveSpacing.pagePaddingX.lg
				: screens.md
					? ResponsiveSpacing.pagePaddingX.md
					: screens.sm
						? ResponsiveSpacing.pagePaddingX.sm
						: ResponsiveSpacing.pagePaddingX.xs;
	const py =
		screens.xxl || screens.xl || screens.lg
			? ResponsiveSpacing.pagePaddingY.lg
			: screens.md
				? ResponsiveSpacing.pagePaddingY.md
				: screens.sm
					? ResponsiveSpacing.pagePaddingY.sm
					: ResponsiveSpacing.pagePaddingY.xs;
	return {
		paddingLeft: px,
		paddingRight: px,
		paddingTop: py,
		paddingBottom: py,
		boxSizing: 'border-box' as const,
	};
}

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

/** Giống colResponsive nhưng có offset (ô trống bên trái) */
export const colResponsiveOffset = (
	xs: { span: number; offset?: number },
	sm: { span: number; offset?: number },
	md: { span: number; offset?: number },
	lg: { span: number; offset?: number },
	xl: { span: number; offset?: number },
	xxl: { span: number; offset?: number },
) => ({
	xs,
	sm,
	md,
	lg,
	xl,
	xxl,
});
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
	/** Dùng `AppConsts.responsive` hoặc import trực tiếp các export `Responsive*`. */
	responsive: {
		breakpoints: ResponsiveBreakpoints,
		media: ResponsiveMedia,
		spacing: ResponsiveSpacing,
		layout: ResponsiveLayout,
	},
};