import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { HEADER_HEIGHT } from './config';
import Logo from './logo';

type Props = {
    collapsed: boolean;
    onToggle: () => void;
};
export default function NavLogo({ collapsed, onToggle }: Props) {

    return (
        <div
            style={{ height: `${HEADER_HEIGHT}px` }}
            className="relative flex items-center justify-center py-4"
        >
            <div className="flex items-center">
                <Logo />
                {!collapsed && (
                    <span className="ml-2 text-xl font-bold text-primary">EduTrack</span>
                )}
            </div>
            <div
                onClick={onToggle}
                onKeyDown={onToggle}
                className={`absolute bg-white right-0 top-7 z-10 p-[5px] flex h-6 w-6 translate-x-1/2 cursor-pointer select-none items-center justify-center text-center rounded-full border border-dashed border-gray-300 text-sm `}
            >
                {collapsed ? (
                    <RightOutlined className="text-xs text-text-disabled" />
                ) : (
                    <LeftOutlined className="text-xs text-text-disabled" />
                )}
            </div>
        </div>
    );
}
