import React, { Suspense, lazy } from "react";
import logo from "./logo.png";
import { Layout, Menu, Spin, Anchor } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Home = lazy(() => import("../Home"));

const { Link: AnchorLink } = Anchor;
const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

const App = styled(({ className }) => {
  return (
    <Layout className={className}>
      <Suspense
        fallback={
          <div className="loading">
            <Spin indicator={antIcon} />
          </div>
        }
      >
      <div className="header-wrapper">
        <div className="wrapper">
          <Anchor className="header">
            <img src={logo} alt="logo" className="logo" />
            <AnchorLink href="#news" title="news" />
            <AnchorLink href="#resources" title="resources" />
            <AnchorLink href="#howtos" title="howtos" />
            <AnchorLink href="#decumentation" title="decumentation" />
          </Anchor>
          <div>
            <a href="" target="_blank">Telegram</a>
            <a href="" target="_blank">Twitter</a>
          </div>
        </div>
      </div>
      <Home />
      </Suspense>
    </Layout>
  );
})`
  .header-wrapper {
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 999;
    .wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1120px;
      margin: 0 auto;
    }
    a {
      padding: 7px 0 7px 16px;
      color: #28A5E7;
    }
  }
  .header {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #fff;
    .ant-anchor {
      width: 100%;
      display: flex;
      align-items: center;
      .ant-anchor-ink {
        display: none;
      }
      .ant-anchor-link-title {
        color: #28A5E7;
      }
      .ant-anchor-link-active > .ant-anchor-link-title {
        color: #28A5E7;
      }
      a:hover {
        color: #28A5E7;
      }
    }
  }

  .logo {
    height: 30px;
    margin: 16px 24px 16px 0;
    float: left;
  }
  .ant-menu-item {

  }
  .loading {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
`;

export default App;
