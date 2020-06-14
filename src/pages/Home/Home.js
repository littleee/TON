import React, { useEffect, useState } from "react";
import footerIcon from "./footer.png";
import bannerIcon from "./banner.png";
import { Layout, Row, Divider, Card, Typography, Col, Tag, Button } from "antd";
import axios from "axios";
import echarts from "echarts";
import cn from "classnames";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  getNumberColor,
  getNumberFormat,
  getRunDays,
  getIncomeRate,
  getNumberWithDecimal,
} from "../../utils";
import { Statistic, LineChart } from "../../components";
import logo from "./logo.png";

const { Title, Paragraph, Text } = Typography;
const { Content, Footer } = Layout;

const HomeComponent = ({ className }) => {
  const [t1Income, setT1Income] = useState([]);
  const [handleIncome, setHandleIncome] = useState([]);
  const [t1Data, setT1Data] = useState([]);
  const [handleData, setHandleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchCharts = async () => {
      const [{ data: t1 }, { data: handleBtc }] = await Promise.all([
        axios.get(
          `https://raw.githubusercontent.com/odofmine/ocd/master/fund/__t1__/t1/main.json`
        ),
        axios.get(
          `https://raw.githubusercontent.com/odofmine/ocd/master/t1/btc_price/2020-05.json`
        ),
      ]);
      setT1Data(t1);
      setHandleData(handleBtc);
      const startPriceByT1 = t1[0][1];
      const startPriceByHandle = handleBtc[0][1];
      const t1Income = t1.map((x) => [
        x[0] * 1000,
        (x[1] / startPriceByT1 - 1) * 100,
      ]);
      const handleIncome = handleBtc.map((x) => [
        x[0] * 1000,
        (x[1] / startPriceByHandle - 1) * 100,
      ]);
      setT1Income(t1Income);
      setHandleIncome(handleIncome);
      setIsLoading(false);
    };

    fetchCharts();
  }, []);

  const option = {
    title: {
      text: "业绩走势",
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const date = new Date(params[0].data[0]);
        const dateFormat = echarts.format.formatTime(
          "yyyy-MM-dd hh:mm:ss",
          date
        );
        var returnHtmT1 = params[0]
          ? `${getNumberWithDecimal(params[0].data[1], 2)}%`
          : "--";
        var returnHtmlBTC = params[1]
          ? `${getNumberWithDecimal(params[1].data[1], 2)}%`
          : "--";
        return `<span>${dateFormat}</span><br/><span>本策略：${returnHtmT1}</span> <br/> <span>BTCUSD: ${returnHtmlBTC}</span>`;
      },
    },
    legend: {
      data: [
        {
          name: "本策略",
          // 强制设置图形为圆。
          icon: "circle",
        },
        {
          name: "BTCUSD",
          // 强制设置图形为圆。
          icon: "circle",
        },
      ],
      formatter: (name) => {
        const value = name === "本策略" ? t1Income : handleIncome;
        return value.length === 0
          ? `${name} +0.00%`
          : `${name} ${getNumberFormat(
              getNumberWithDecimal(value[value.length - 1][1], 2)
            )}%`;
      },
      right: 0,
      top: 3,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },

    xAxis: {
      type: "time",
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#888",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        show: true,
        formatter: "{value}%",
      },
      splitLine: {
        show: true,
      },
      splitNumber: 3,
      axisLine: {
        lineStyle: {
          color: "#888",
        },
      },
    },
    series: [
      {
        name: "本策略",
        type: "line",
        data: t1Income,
        showSymbol: false,
        hoverAnimation: true,
        itemStyle: {
          color: "rgb(73,151,247)",
        },
      },
      {
        name: "BTCUSD",
        type: "line",
        data: handleIncome,
        itemStyle: {
          color: "rgb(105,193,111)",
        },
        showSymbol: false,
        hoverAnimation: true,
      },
    ],
  };

  return (
    <Layout className={className}>
      <Divider className="divider" />
      <Content>
        <Row className="banner">
          <div className="title-wrapper">
            <p className="title">TON Blockchain Test NetWork</p>
            <Button type="primary">Primary Button</Button>
          </div>
        </Row>
        <div style={{ background: "#fff" }}>
          <Row className="content" id="news">
            <Title>News</Title>
            <Typography>
              <Paragraph>
                蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
              </Paragraph>
              <Paragraph>
                随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁金服体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系
                Ant Design。基于<Text mark>『确定』和『自然』</Text>
                的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于
                <Text strong>更好的用户体验</Text>。
              </Paragraph>
              <Title level={2}>设计资源</Title>
              <Paragraph>
                我们提供完善的设计原则、最佳实践和设计资源文件（
                <Text code>Sketch</Text> 和<Text code>Axure</Text>
                ），来帮助业务快速设计出高质量的产品原型。
              </Paragraph>
              <Paragraph>
                <ul>
                  <li>
                    <a href="/docs/spec/proximity">设计原则</a>
                  </li>
                  <li>
                    <a href="/docs/pattern/navigation">设计模式</a>
                  </li>
                  <li>
                    <a href="/docs/resource/download">设计资源</a>
                  </li>
                </ul>
              </Paragraph>

              <Paragraph>
                按<Text keyboard>Esc</Text>键退出阅读……
              </Paragraph>
            </Typography>
          </Row>
        </div>
        <div style={{ background: "#efefef" }}>
          <div className="content" id="resources">
            <Title>Resources</Title>
            <Row justify="space-between" gutter={[16, 16]}>
              <Col xs={8} lg={8}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={8} lg={8}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={8} lg={8}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
            <Row justify="space-between" gutter={[16, 16]}>
              <Col xs={8} lg={8}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={8} lg={8}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={8} lg={8}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        <div style={{ background: "#fff" }}>
          <div className="content" id="howtos">
            <Title>HOWTOs</Title>
            <Row justify="space-between" gutter={[16, 16]}>
              <Col xs={12} lg={6}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={12} lg={6}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={12} lg={6}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={12} lg={6}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
            <Row justify="space-between" gutter={[16, 16]}>
              <Col xs={12} lg={6}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={12} lg={6}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={12} lg={6}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={12} lg={6}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        <div style={{ background: "#efefef" }}>
          <div className="content" id="decumentation">
            <Title>Decumentation</Title>
            <Row justify="space-between" gutter={[16, 16]}>
              <Col xs={8} lg={8}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={8} lg={8}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={8} lg={8}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
            <Row justify="space-between" gutter={[16, 16]}>
              <Col xs={8} lg={8}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={8} lg={8}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col xs={8} lg={8}>
                <Card title="Card title">
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
      <Footer className="footer">
        <Row>
          <Col xs={12}>
            <img src={logo} alt="logo" className="logo" />
          </Col>
          <Col xs={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#fff",
              }}
            >
              <img src={logo} alt="logo" className="logo" />
              <span>telegram 1</span>
            </div>
          </Col>
          <Col xs={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#fff",
              }}
            >
              <img src={logo} alt="logo" className="logo" />
              <span>telegram 2</span>
            </div>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export const Home = styled(HomeComponent)`
  .divider {
    border-color: #000;
    opacity: 0.8;
    margin: 0;
  }

  .banner {
    height: 380px;
    background: rgb(14, 16, 20);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title-wrapper {
    color: #fff;
    max-width: 1120px;
    width: 100%;
  }
  .content {
    max-width: 1120px;
    margin: 0 auto;
    padding: 60px 0;
  }
  .title-wrapper .title {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 200;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 17px;
  }

  .card {
    max-width: 1120px;
    width: 100%;
    border-radius: 6px;
    margin: -64px auto 0 auto;
    box-shadow: 0px 6px 13px 0px rgba(0, 0, 0, 0.03);
    border-radius: 6px;
  }

  .card-left {
    padding: 0 20px;
    margin-bottom: 20px;
  }
  .card-right {
    padding: 0 20px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
  }

  .more {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(19, 24, 31, 1);
    opacity: 0.6;
    margin: 80px auto;
    text-align: center;
  }

  .green {
    color: #3f8600;
  }
  .red {
    color: #cf1322;
  }
  .grey {
    color: rgba(19, 24, 31, 0.6);
  }

  .footer {
    background: rgb(14, 16, 20);
    text-align: center;
  }
  .footer-title {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .footer-subtitle {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    opacity: 0.6;
    margin-bottom: 60px;
  }

  .footer-icon {
    width: 100%;
    max-width: 412px;
    margin-bottom: 108px;
  }
`;
