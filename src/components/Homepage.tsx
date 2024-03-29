import React from 'react'

import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'

import { useGetCryptoCoinQuery } from '../redux-store/api/crypto'

import { Cryptocurrencies, News, Spinner } from './index'

const { Title } = Typography;

const Homepage = () => {
    const { data, isFetching } = useGetCryptoCoinQuery(10);
    const globalStats = data?.data?.stats;

    if (isFetching) return <Spinner/>

    return (
    <>
        <Title level={2} className='heading'>
            Global Crypto Stats
        </Title>
        <Row>
            <Col span={12}>
                <Statistic 
                title='Total Cryptocurrencies' 
                value={globalStats.total}
                />
            </Col>
            <Col span={12}>
                <Statistic 
                title='Total Exchanges' 
                value={globalStats.totalExchanges}
                />
            </Col>
            <Col span={12}>
                <Statistic 
                title='Total Market Cap' 
                value={millify(globalStats.totalMarketCap)}
                />
            </Col>
            <Col span={12}>
                <Statistic 
                title='Total 24h Volume' 
                value={millify(globalStats.total24hVolume)}
                />
             </Col>
            <Col span={12}>
                <Statistic 
                title='Total Markets' 
                value={millify(globalStats.totalMarkets)}
                />
                </Col>
        </Row>
      
        <div className='home-heading-container'>
            <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the World</Title>
            <Title level={3} className='show-more'>
                <Link to='/cryptocurrencies'>Show more</Link>
            </Title>
        </div>

        <Cryptocurrencies simplified/>

        <div className='home-heading-container'>
            <Title level={2} className='home-title'>Latest Crypto News</Title>
            <Title level={3} className='show-more'>
                <Link to='/news'>Show more</Link>
            </Title>
        </div>

        <News simplified/>
    </>
  )
}

export default Homepage