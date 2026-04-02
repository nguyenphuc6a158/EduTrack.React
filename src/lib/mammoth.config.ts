export const mammothOptions = {
	styleMap: [
		"p[style-name='Heading 1'] => h1:fresh",
		"p[style-name='Heading 2'] => h2:fresh",
		"p[style-name='Heading 3'] => h3:fresh",

		// 👇 thêm căn lề nếu bạn đang dùng
		"p[alignment='center'] => p.align-center:fresh",
		"p[alignment='right'] => p.align-right:fresh",
		"p[alignment='justify'] => p.align-justify:fresh",

		"b => strong",
		"i => em",
		"u => u",
		"s => s",
	],

	includeDefaultStyleMap: true // 🔥 nên thêm luôn
};