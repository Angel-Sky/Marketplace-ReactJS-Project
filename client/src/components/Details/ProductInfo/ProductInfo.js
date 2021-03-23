import { useState } from 'react';
import { Row, Tabs, Tab, Image } from 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function ProductInfo({ params }) {
    let [key, setKey] = useState('home');
    return (
        <>
            <Image className="col-lg-12" src={params.image} rounded />
            <Row>
                <h1 className="col-lg-10 col-sm-10 heading">{params.title}</h1>
                <Link to="" id="heartIconDetails" className="col-lg-1 col-sm-1"><BsHeart /></Link>
            </Row>
            <div id="detailsCardText" className="col-lg-12">
                <Tabs id="controlled-tab-example" activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="details" title="Details">
                        {params.description}
                        <hr />
                        <p>Product listed at {params.addedAt}</p>
                    </Tab>
                    <Tab eventKey="aboutSeller" title="About seller">
                        <p>Name: Pesho</p>
                        <p>Email: pesho@abv.bg</p>
                        <p>Telephone: +359 882 218 816</p>
                        <p>City: {params.city}</p>
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default ProductInfo;