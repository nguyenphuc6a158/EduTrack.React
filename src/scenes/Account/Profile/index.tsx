import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Avatar, Typography, Button, Form, Input, Descriptions, message, Space, Tag } from 'antd';
import { UserOutlined, EditOutlined, SaveOutlined, CloseOutlined, MailOutlined, IdcardOutlined, GlobalOutlined } from '@ant-design/icons';
import { useCurrentLogin, useSessionActions } from 'src/stores/sessionStore';
import { UserDto, UserService } from 'src/services/services_autogen';
import http from 'src/services/httpService';
import { PageShell } from 'src/components/PageShell';
import { colResponsive, ResponsiveLayout, ResponsiveSpacing } from 'src/lib/appconst';

const { Title, Text } = Typography;
const userService = new UserService("", http);

const Profile: React.FC = () => {
    const currentLogin = useCurrentLogin();
    const { getCurrentLoginInformations } = useSessionActions();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fullUser, setFullUser] = useState<UserDto | null>(null);
    const [form] = Form.useForm();

    const fetchFullUser = async () => {
        if (currentLogin?.user?.id) {
            try {
                const userDetail = await userService.get(currentLogin.user.id);
                setFullUser(userDetail);
            } catch (error) {
                console.error('Fetch user detail error:', error);
            }
        }
    };

    useEffect(() => {
        fetchFullUser();
    }, [currentLogin]);

    useEffect(() => {
        if (currentLogin?.user) {
            form.setFieldsValue({
                name: currentLogin.user.name,
                surname: currentLogin.user.surname,
                emailAddress: currentLogin.user.emailAddress,
                userName: currentLogin.user.userName,
            });
        }
    }, [currentLogin, form]);

    if (!currentLogin || !currentLogin.user) {
        return <PageShell className="text-center">Loading profile...</PageShell>;
    }

    const { user, tenant } = currentLogin;

    const handleSave = async (values: any) => {
        setLoading(true);
        try {
            if (!fullUser) {
                message.error('User data not fully loaded. Please try again.');
                return;
            }

            // Prepare UserDto for update using the full user object as base
            const updateBody = new UserDto({
                ...fullUser,
                name: values.name,
                surname: values.surname,
                emailAddress: values.emailAddress,
                userName: values.userName,
                fullName: `${values.name} ${values.surname}`,
            } as any);

            await userService.update(updateBody);
            message.success('Profile updated successfully!');
            setIsEditing(false);
            await fetchFullUser(); // Refresh local full user state
            await getCurrentLoginInformations(); // Refresh global session state
        } catch (error) {
            console.error('Update profile error:', error);
            message.error('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageShell>
            <Row gutter={[ResponsiveSpacing.rowGutter, ResponsiveSpacing.rowGutter]}>
                {/* Profile Card */}
                <Col xs={24} lg={8}>
                    <Card className="text-center shadow-sm h-full">
                        <Space direction="vertical" size="large" className="w-full">
                            <Avatar 
                                size={120} 
                                icon={<UserOutlined />} 
                                className="bg-primary/10 text-primary border-4 border-primary/20"
                            >
                                {user.name?.[0].toUpperCase()}
                            </Avatar>
                            <div>
                                <Title level={3} className="!mb-1">{user.name} {user.surname}</Title>
                                <Text type="secondary" className="block text-lg mb-2">{user.userName}</Text>
                                <Tag color="green" className="px-3 py-1 rounded-full text-sm">
                                    {tenant ? tenant.name : 'Host Admin'}
                                </Tag>
                            </div>
                            <Divider />
                            <div className="text-left px-4">
                                <Space direction="vertical" className="w-full">
                                    <div className="flex items-center gap-3 mb-2">
                                        <MailOutlined className="text-primary" />
                                        <Text>{user.emailAddress}</Text>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <IdcardOutlined className="text-primary" />
                                        <Text>User ID: {user.id}</Text>
                                    </div>
                                </Space>
                            </div>
                        </Space>
                    </Card>
                </Col>

                {/* Edit Section */}
                <Col xs={24} lg={16}>
                    <Card 
                        title="Account Information" 
                        className="shadow-sm h-full"
                        extra={
                            !isEditing ? (
                                <Button 
                                    type="primary" 
                                    icon={<EditOutlined />} 
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Profile
                                </Button>
                            ) : (
                                <Space>
                                    <Button 
                                        icon={<CloseOutlined />} 
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="primary" 
                                        icon={<SaveOutlined />} 
                                        loading={loading}
                                        onClick={() => form.submit()}
                                    >
                                        Save Changes
                                    </Button>
                                </Space>
                            )
                        }
                    >
                        {!isEditing ? (
                            <Descriptions bordered column={1} labelStyle={{ width: ResponsiveLayout.formControlWidth, fontWeight: 'bold' }}>
                                <Descriptions.Item label="First Name">{user.name}</Descriptions.Item>
                                <Descriptions.Item label="Last Name">{user.surname}</Descriptions.Item>
                                <Descriptions.Item label="Full Name">{user.name} {user.surname}</Descriptions.Item>
                                <Descriptions.Item label="Email Address">{user.emailAddress}</Descriptions.Item>
                                <Descriptions.Item label="User Name">{user.userName}</Descriptions.Item>
                                {tenant && <Descriptions.Item label="Organization">{tenant.name} ({tenant.tenancyName})</Descriptions.Item>}
                            </Descriptions>
                        ) : (
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSave}
                                requiredMark="optional"
                            >
                                <Row gutter={ResponsiveSpacing.rowGutter}>
                                    <Col {...colResponsive(24, 24, 12, 12, 12, 12)}>
                                        <Form.Item 
                                            name="name" 
                                            label="First Name" 
                                            rules={[{ required: true, message: 'Please enter your first name' }]}
                                        >
                                            <Input prefix={<IdcardOutlined className="text-gray-400" />} />
                                        </Form.Item>
                                    </Col>
                                    <Col {...colResponsive(24, 24, 12, 12, 12, 12)}>
                                        <Form.Item 
                                            name="surname" 
                                            label="Last Name" 
                                            rules={[{ required: true, message: 'Please enter your last name' }]}
                                        >
                                            <Input prefix={<IdcardOutlined className="text-gray-400" />} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item 
                                    name="emailAddress" 
                                    label="Email Address" 
                                    rules={[
                                        { required: true, message: 'Please enter your email' },
                                        { type: 'email', message: 'Please enter a valid email' }
                                    ]}
                                >
                                    <Input prefix={<MailOutlined className="text-gray-400" />} />
                                </Form.Item>
                                <Form.Item 
                                    name="userName" 
                                    label="User Name" 
                                    rules={[{ required: true, message: 'Please enter your username' }]}
                                >
                                    <Input prefix={<GlobalOutlined className="text-gray-400" />} />
                                </Form.Item>
                            </Form>
                        )}
                    </Card>
                </Col>
            </Row>
        </PageShell>
    );
};

const Divider = () => <div className="h-px bg-gray-200 my-6 w-full" />;

export default Profile;
