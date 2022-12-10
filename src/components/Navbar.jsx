import React from 'react'

import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'

const { Title } = Typography;

import icon from '../images/cryptocurrency.png'

const Navbar = () => {

  return (
    <div className="nav-container">
        <div className="logo-container">
            <Avatar src={icon} size="large"/>
            <Title level={2} className="logo">
                <Link to="/">Cryptoverse</Link>
            </Title>
            {/* <Button className="menu-control-container">

            </Button> */}
        </div>
        <Menu theme="dark">
            <Menu.Item key={'home'} icon={<HomeOutlined/>}>
              <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item key={'cryptocurrencies'} icon={<FundOutlined/>}>
              <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item key={'news'} icon={<BulbOutlined/>}>
              <Link to='/news'>News</Link>
            </Menu.Item>
        </Menu>
    </div>
  )
}

export default Navbar