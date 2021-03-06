import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button, Tooltip, message as Message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import Success from "./Success";

import "./Fields.css";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { span: 0 },
};

export class Fields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      url: "",
      loading: false,
      showSuccessModal: false,
      classesWithoutLinks: [],
    };
  }

  onFinish = () => {
    // Set state for loading for button spinner
    this.setState({ loading: true });

    const { email, url } = this.state;
    const key = "/shared/schedule/";

    const keyIndex = url.indexOf(key);
    const idIndex = keyIndex + key.length;

    const schedulerId = url.substring(idIndex);

    // Retrieve schedule info from API
    axios
      .get(`/api/schedule?email=${email}&id=${schedulerId}`)
      .then((res) => {
        this.setState({ loading: false });
        console.log(res);
        if (res.data.success === true) {
          // Only load success modal prompt when there is at least one unlinked class
          if (res.data.unlinkedClasses.length > 0) {
            // Pop up with success modal
            console.log("Setting showSuccessModal to true...");
            this.setState({
              showSuccessModal: true,
              classesWithoutLinks: res.data.unlinkedClasses,
            });
          } else {
            Message.success(`Successfully registered with ${email}`);
          }
        } else {
          const errorMsg =
            res && res.data.message && res.data.message.length > 0
              ? res.data.message
              : "Unable to sign up at the moment. Please try again later";
          console.log(errorMsg);
          Message.error(errorMsg);
        }
      })
      .catch(() => {
        this.setState({ loading: false });
        Message.error(
          "Unable to sign up at the moment. Please try again later"
        );
      });
  };

  render() {
    return (
      <React.Fragment>
        <Form
          {...layout}
          style={{ marginTop: "24px" }}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            style={{ textAlign: "left" }}
            rules={[
              { required: true, message: "Email field cannot be empty" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              placeholder="jd849@cornell.edu"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            label="Schedule URL"
            name="url"
            style={{ textAlign: "left" }}
            rules={[
              { required: true, message: "URL field cannot be empty" },
              {
                pattern: /(https?:\/\/)?(www\.)?classes\.cornell\.edu\/shared\/schedule\/sp20\/.......+/gi,
                message: "Please enter a valid Spring 2020 shared schedule URL",
              },
            ]}
          >
            <Input
              placeholder="https://classes.cornell.edu/shared/schedule/SP20/92eac951cf5b329be2522a9829421833"
              onChange={(e) => this.setState({ url: e.target.value })}
              suffix={
                <Tooltip
                  title={
                    <p style={{ margin: "0" }}>
                      Visit{" "}
                      <a
                        href="https://classes.cornell.edu/scheduler/roster/SP20"
                        target="_blank"
                      >
                        Scheduler
                      </a>{" "}
                      and click 'Share'
                    </p>
                  }
                >
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
            >
              {this.state.loading ? "Loading" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
        <Success
          email={this.state.email}
          visible={this.state.showSuccessModal}
          classes={this.state.classesWithoutLinks}
          hideSuccess={() => this.setState({ showSuccessModal: false })}
        />
      </React.Fragment>
    );
  }
}

export default Fields;
