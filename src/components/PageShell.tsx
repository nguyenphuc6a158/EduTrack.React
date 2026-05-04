import { Grid } from 'antd';
import { useMemo, type CSSProperties, type ReactNode } from 'react';
import { getPageShellPadding } from 'src/lib/appconst';

type PageShellProps = {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
};

export function PageShell({ children, className = '', style }: PageShellProps) {
	const screens = Grid.useBreakpoint();
	const paddingStyle = useMemo(() => getPageShellPadding(screens), [screens]);
	return (
		<div className={className} style={{ ...paddingStyle, ...style }}>
			{children}
		</div>
	);
}
