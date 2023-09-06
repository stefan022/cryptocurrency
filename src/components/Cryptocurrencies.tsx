import React, { useEffect, useState } from "react";

import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptoCoinQuery } from "../redux-store/api/crypto";
import { Spinner } from ".";

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching, error } = useGetCryptoCoinQuery(count);
    
    const [cryptos, setCryptos] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));

        setCryptos(filteredData);

    }, [cryptosList, search]);
    // kada se ažuriraju podaci za cryptoList i search
    // prekida se ponovno učitavanje podataka
    // [] => radi samo prvi put kad se stranica učita
    
    if (isFetching) return <Spinner/>
    if (error) return 'Sorry, try again!'

    return (
        <>
        {
            !simplified && (
            <div className="search-crypto">
                <Input 
                placeholder="Search Cryptocurrency" 
                onChange={(e) => setSearch(e.target.value)}/>
            </div>
            )
        }

        <Row gutter={[32, 32]} className='crypto-card-container'>
        {
            cryptos?.map((currency) => (
                <Col 
                key={currency.uuid}
                xs={24} sm={12} lg={6} 
                className='crypto-card'>
                    <Link to={`/crypto/${currency.uuid}`}>
                        <Card 
                        title={`${currency.rank}. ${currency.name}`}
                        extra={<img src={currency.iconUrl} className="crypto-image"/>}
                        hoverable
                        >
                            <p>Price: {millify(currency.price)}</p>
                            <p>Market Cap: {millify(currency.marketCap)}</p>
                            <p>Daily Change: {millify(currency.change)}%</p>
                        </Card>
                    </Link>
                </Col>
            ))
        }
        </Row>
        </>
    )
};

export default Cryptocurrencies;