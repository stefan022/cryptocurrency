import React, { useState } from 'react'

import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import LineChart from './LineChart'

const { Title, Text } = Typography;
const { Option } = Select; 

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../redux-store/api/crypto'

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory, isFetching } = useGetCryptoHistoryQuery({ coinId, timePeriod });
    // data?.data?.coin

    if(isFetching) return 'Loading...'

    const stats = [
        { title: 'Price to USD', value: `$ ${data?.data?.coin?.price && millify(data?.data?.coin?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: data?.data?.coin?.rank, icon: <NumberOutlined /> },
        { title: 'Market Cap', value: `$ ${data?.data?.coin?.marketCap && millify(data?.data?.coin?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${data?.data?.coin?.allTimeHigh?.price && millify(data?.data?.coin?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: data?.data?.coin?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: data?.data?.coin?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: data?.data?.coin?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${data?.data?.coin?.supply?.total && millify(data?.data?.coin?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${data?.data?.coin?.supply?.circulating && millify(data?.data?.coin?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title level={2} className='coin-name'>
                    {data?.data?.coin?.name} ({data?.data?.coin?.symbol}) Price
                </Title>
                <p>
                    {data?.data?.coin.name} live price in US dollars.
                    View value statistics, market cap and supply.
                </p>
            </Col>

            <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(data?.data?.coin.price)}
            coinName={data?.data?.coin.name}
            />

            <Col className='stats-container'>

                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            {data?.data?.coin.name} Value Statistics
                        </Title>
                        <p>
                            An overview showing the stats of {data?.data?.coin.name}
                        </p>
                    </Col>
                    {
                        stats.map(({ icon, title, value }) => (
                            <Col key={coinId + title} className='coin-stats'>
                                <Col className='coin-stats-name'>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className='stats'>{value}</Text>
                            </Col>
                        ))
                    }
                </Col>

                <Col className='other-stats-info'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            Other Statistics
                        </Title>
                        <p>
                            An overview showing the stats of all cryptocurrencies
                        </p>
                    </Col>
                    {
                        genericStats.map(({ icon, title, value }) => (
                            <Col key={coinId + title} className='coin-stats'>
                                <Col className='coin-stats-name'>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className='stats'>{value}</Text>
                            </Col>
                        ))
                    }
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={2} className='coin-details-heading'>
                        What is {data?.data?.coin.name}
                        {
                            parse(`${data?.data?.coin.description}`)
                        }
                    </Title>
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'>
                        {data?.data?.coin.name} links
                    </Title>
                    {
                        data?.data?.coin.links.map((link) => (
                            <Row className='coin-link' key={link.name}>
                                <Title level={5} className='link-name'>
                                    {link.type}
                                </Title>
                                <a href={link.url} target='blank' rel=''>
                                    {link.name}
                                </a>
                            </Row>
                        ))
                    }
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails