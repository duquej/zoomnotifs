// Here's to 100 commits and a badass project
import React from "react";
import ReactGA from "react-ga";
import { Layout, Divider } from "antd";
import { BellTwoTone } from "@ant-design/icons";

import Window from "./components/Window";
import Fields from "./components/Fields";

import "./App.css";

//RE-ENABLE ONCE FIGURED OUT

ReactGA.initialize("UA-154637386-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div>
      <Layout className="layout">
        <Header style={{ color: "#FFF", fontSize: "16px" }}>Zoom Notifs</Header>
        <Content>
          <div
            className="site-layout-content"
            style={{ padding: "25px 50px 85px 50px" }}
          >
            <h1>
              <BellTwoTone /> Receive email reminders with Zoom invites to your
              classes
            </h1>
            {/* Add Product Info */}
            <Window />
            <Divider>Sign Up</Divider>
            <Fields />
          </div>
        </Content>
      </Layout>
      <Footer
        style={{
          textAlign: "center",
          width: "100%",
          position: "fixed",
          bottom: "0",
        }}
      >
        Wishing everyone well in these uncertain times
      </Footer>
    </div>
  );
}

export default App;
