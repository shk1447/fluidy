import { Form, Input, Button, Checkbox } from 'antd';
import {useHistory} from 'react-router-dom';
import {useCallback} from 'react'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const Login = () => {
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/App/Flow/FlowChart'), [history]);
    const onFinish = (values: any) => {
        console.log('Success:', values);
        handleOnClick();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
      
    return (
        <div style={{position: 'relative', top : '45%', left : '33%', height : '500px', width : '500px'}}>
            <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
    >
        <Form.Item
        label="ID"
        name="id"
        rules={[{ required: true, message: 'Please input your username!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
    </Form>
        </div>        
    );
}

export default Login;