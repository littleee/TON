import React, { Suspense, lazy, useRef, useEffect, useState, useCallback } from "react";
import logo from "./logo.png";
import { Layout, Menu, Spin, Anchor, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Scrollbars } from 'react-custom-scrollbars-better';
import useScroll from '../useScrollTop';
import cn from 'classnames';

const Home = lazy(() => import("../Home"));

const { Link: AnchorLink } = Anchor;
const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;
console.log(window.scrollY);

const App = styled(({ className }) => {
  const scrollTop = useScroll();
  return (
    <Layout className={className}>

      <Suspense
        fallback={
          <div className="loading">
            <Spin indicator={antIcon} />
          </div>
        }
      >
      <div className={cn('header-wrapper', {'shadow': scrollTop > 60})}>
      <div style={{maxWidth: '1120px',display: 'flex', margin: '0 auto', padding: '0 20px'}}>
        <div className="top-jumper" onClick={()=>window.scrollTo(0, 0)}>
        <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="wrapper">
          <Anchor className="header" >
            <AnchorLink href="#news" title="News" />
            <AnchorLink href="#resources" title="Resources" />
            <AnchorLink href="#howtos" title="HOWTOs" />
            <AnchorLink href="#decumentation" title="Documentation" />
          </Anchor>
          <Button type="primary">Join & Get 100+ coins for free</Button>
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
      width: 100%;
      margin: 0 auto;
    }
    a {
      padding: 7px 3px 7px 16px;
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
    overflow: hidden;
    .ant-anchor {
      width: 100%;
      display: flex;
      align-items: center;
      .ant-anchor-ink {
        display: none;
      }
      .ant-anchor-link-active {
        color: #28A5E7;
      }
    }
  }
  a:hover {
    color: #71bfff!important;
  }
  .logo {
    height: 30px;
    margin: 16px 24px 16px 0;
    float: left;
  }
  .loading {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  .top-jumper {
    cursor: pointer;
  }
  .shadow {
    box-shadow: 0 5px 5px rgba(0,0,0, 0.1);
  }
  .ant-btn-primary {
    color: #fff;
    background-color: #28A5E7;
    border-color:#28A5E7;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    &:hover {
      color: #fff;
      background-color: #3997e4;
      border-color: #3997e4;
    }
  }
  @media (max-width: 480px) {
    .header-wrapper {
      .wrapper {
        display: none!important;
      }
    }
  }
`;

export default App;
