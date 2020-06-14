import React, { Suspense, lazy } from "react";
import logo from "./logo.png";
import { Layout, Menu, Spin, Anchor } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = lazy(() => import("../Home"));

const { Header } = Layout;
const { Link: AnchorLink } = Anchor;
const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

const App = styled(({ className }) => {
  const { hash } = window.location;
  const navigate = useNavigate();
  return (
    <Layout className={className}>
      <Suspense
        fallback={
          <div className="loading">
            <Spin indicator={antIcon} />
          </div>
        }
      >
        <Anchor className="header">
          <img src={logo} alt="logo" className="logo" />
          <AnchorLink href="#news" title="news" />
          <AnchorLink href="#resources" title="resources" />
          <AnchorLink href="#howtos" title="howtos" />
          <AnchorLink href="#decumentation" title="decumentation" />
        </Anchor>
        <Home />
      </Suspense>
    </Layout>
  );
})`
  .header {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: rgb(14, 16, 20);
    color: #fff;
    padding: 0 60px;
    .ant-anchor {
      width: 100%;
      display: flex;
      align-items: center;
      .ant-anchor-ink {
        display: none;
      }
      .ant-anchor-link-title {
        color: #fff;
      }
      .ant-anchor-link-active > .ant-anchor-link-title {
        color: #1890ff;
      }
      a:hover {
        color: #40a9ff;
      }
    }
  }

  .logo {
    height: 20px;
    margin: 16px 24px 16px 0;
    float: left;
  }
  .ant-menu-item {
    background: rgb(14, 16, 20);
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
