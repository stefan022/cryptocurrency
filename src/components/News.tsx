import React, { useState } from 'react'

import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment/moment'

import { useGetNewsQuery } from '../redux-store/api/news'
import { useGetCryptoCoinQuery } from '../redux-store/api/crypto'
import { Spinner } from '.'

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [category, setCategory] = useState('Cryptocurrency')
    const { data: cryptoNews } = useGetNewsQuery({ category, count: simplified ? 6 : 12 });
    const { data } = useGetCryptoCoinQuery(100);

    if(!cryptoNews?.value) return <Spinner/>

    return (
        <Row gutter={[ 24, 24 ]}>
        {!simplified && (
            <Col span={24}>
                <Select
                showSearch
                className='select-news'
                placeholder='Select a Crypto'
                optionFilterProp='children'
                onChange={(value) => setCategory(value)}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)}
                >
                    <Option value='Cryptocurrency'>Cryptocurrency</Option>
                    {
                        data?.data?.coins.map((coin) => (
                            <Option value={coin.name}>{coin.name}</Option>
                        ))
                    }
                </Select>
            </Col>
        )}
        {
          cryptoNews.value.map((news, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
                <Card hoverable className='news-card'>
                    <a href={news.url} target='_blank' rel='news'>
                        <div className='news-image-container'>
                            <Title className='news-title' level={4}>
                                {news.name}
                            </Title>
                            <img 
                            src={news?.image?.thumbnail?.contentUrl} 
                            alt="news image"
                            style={{ width: '75px', height: '75px', borderRadius: '5px' }}
                            />
                        </div>
                        <p>
                            {
                            news.description > 100
                            ? `${news.description.substring(0, 100)}...`
                            : news.description
                            }
                        </p>
                        <div className='provider-container'>
                            <div>
                                <Avatar 
                                src={news.provider[0]?.image?.thumbnail?.contentUrl} 
                                alt='news avatar'
                                />
                                <Text className='provider-name'>{news.provider[0]?.name}</Text>
                            </div>
                            <Text>
                                {moment(news.datePublished).startOf('ss').fromNow()}
                            </Text>
                        </div>
                    </a>
                </Card>
            </Col>
          ))
        }
        </Row>
    )
}

export default News