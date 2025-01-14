import { toast } from "react-toastify";

import { Button, Form, FormProps, Input } from "antd";

import BoxHead from "../../../components/boxHead";

import userService from "../../../services/user";

import cookieHelper from "../../../helpers/cookie";

function Login() {
  type FieldType = {
    email?: string;
    password?: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const email = values.email;
      const password = values.password;

      if (!email || !password) {
        return;
      }

      const result = await userService.login(email, password);
      if (result.status !== 200) {
        toast.error("Đăng nhập thất bại!");
        return;
      }

      cookieHelper.set("accessToken", result.data.data.accessToken, 1000 * 60 * 60 * 24);
      toast.success("Đăng nhập thành công!");
    } catch {
      toast.error("Đăng nhập thất bại!");
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
    toast.error("Có lỗi xảy ra!");
  };

  return (
    <>
      <BoxHead title="Trang Đăng Nhập" />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
        <Form
          style={{ width: 600, border: "1px solid #dddddd", padding: "20px 30px", borderRadius: "20px" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Hãy nhập email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Login;