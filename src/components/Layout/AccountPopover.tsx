import { Avatar, Button, Divider, Popover, Typography, Space } from 'antd';
import { LogoutOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useCurrentLogin } from 'src/stores/sessionStore';
import { stores } from 'src/stores/store';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

const AccountPopover: React.FC = () => {
    const currentLogin = useCurrentLogin();
    const navigate = useNavigate();

    const handleLogout = () => {
        stores.authenticationStore.logout();
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    if (!currentLogin || !currentLogin.user) {
        return (
            <Avatar icon={<UserOutlined />} />
        );
    }

    const { user, tenant } = currentLogin;

    const content = (
        <div style={{ width: 240 }}>
            <div className="flex flex-col items-center p-4">
                <Avatar
                    size={64}
                    className="mb-3 bg-primary/10 text-primary border-2 border-primary/20"
                >
                    {user.name?.[0].toUpperCase() || <UserOutlined />}
                </Avatar>
                <Title level={5} className="!m-0 text-center">
                    {user.name} {user.surname}
                </Title>
                <Text type="secondary" className="text-xs">
                    {user.emailAddress}
                </Text>
                {tenant && (
                    <Text type="secondary" className="mt-1 text-[10px] uppercase tracking-wider font-bold text-primary/70">
                        {tenant.name}
                    </Text>
                )}
            </div>

            <Divider className="my-0" />

            <div className="p-2 space-y-1">
                <Button
                    type="text"
                    block
                    icon={<SettingOutlined />}
                    onClick={handleProfile}
                    className="flex items-center justify-start h-10 rounded-lg hover:bg-gray-50"
                >
                    Profile Settings
                </Button>
                <Button
                    type="text"
                    danger
                    block
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    className="flex items-center justify-start h-10 rounded-lg hover:bg-red-50"
                >
                    Sign Out
                </Button>
            </div>
        </div>
    );

    return (
        <Popover
            content={content}
            trigger="click"
            placement="bottomRight"
            overlayClassName="account-popover"
            overlayInnerStyle={{ padding: 0, borderRadius: 12, overflow: 'hidden' }}
        >
            <div className="cursor-pointer transition-transform hover:scale-105 active:scale-95">
                <Avatar
                    className="bg-primary/20 text-primary border border-primary/30"
                    style={{ cursor: 'pointer' }}
                >
                    {user.name?.[0].toUpperCase() || <UserOutlined />}
                </Avatar>
            </div>
        </Popover>
    );
};

export default AccountPopover;
