import type { UserDto } from "src/services/services_autogen";

/** Nhãn 7 ngày gần nhất (dd/MM, locale vi). */
export function getLast7DayLabels(): string[] {
	const labels: string[] = [];
	const now = new Date();
	for (let i = 6; i >= 0; i--) {
		const d = new Date(now);
		d.setDate(d.getDate() - i);
		d.setHours(0, 0, 0, 0);
		labels.push(
			d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
		);
	}
	return labels;
}

/** Số người dùng mới theo từng ngày (7 ngày gần nhất), theo `creationTime`. */
export function buildNewUsersPerDaySeries(users: UserDto[]): number[] {
	const counts: number[] = [];
	const now = new Date();
	for (let i = 6; i >= 0; i--) {
		const start = new Date(now);
		start.setDate(start.getDate() - i);
		start.setHours(0, 0, 0, 0);
		const end = new Date(start);
		end.setDate(end.getDate() + 1);
		const n = users.filter((u) => {
			if (!u.creationTime) return false;
			const t = new Date(u.creationTime).getTime();
			return t >= start.getTime() && t < end.getTime();
		}).length;
		counts.push(n);
	}
	return counts;
}

/** Đếm người dùng theo tên vai trò (mỗi user đếm mỗi vai trò trong `roleNames` một lần). */
export function buildUserCountByRole(users: UserDto[]): { labels: string[]; series: number[] } {
	const map = new Map<string, number>();
	for (const u of users) {
		const names = u.roleNames?.length ? u.roleNames : ["(Chưa gán vai trò)"];
		for (const r of names) {
			const key = r?.trim() || "(Chưa gán vai trò)";
			map.set(key, (map.get(key) ?? 0) + 1);
		}
	}
	const entries = [...map.entries()].sort((a, b) => b[1] - a[1]);
	if (entries.length === 0) {
		return { labels: [], series: [] };
	}
	return {
		labels: entries.map(([k]) => k),
		series: entries.map(([, v]) => v),
	};
}
