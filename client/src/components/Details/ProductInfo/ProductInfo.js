import { useState } from 'react';
import { Row, Tabs, Tab, Image } from 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function ProductInfo({ params }) {
    console.log(params)
    return (
        <>
            <Image className="col-lg-12" src={params.image} rounded />
            <Row>
                <h1 className="col-lg-10 col-sm-10 product-info-heading">{params.title}</h1>
                <Link to="" id="heartIconDetails" className="col-lg-1 col-sm-1"><BsHeart /></Link>
            </Row>
            <div id="detailsCardText" className="col-lg-12">
                <Tabs defaultActiveKey="details" transition={false} id="noanim-tab-example">
                    <Tab eventKey="details" title="Details">
                        {params.description}
                        <hr />
                        <p>Product listed at {params.addedAt}</p>
                    </Tab>
                    <Tab eventKey="aboutSeller" title="About seller">
                        <p>Name: {params.name || "Not specified"}</p>
                        <p>Email: {params.email}</p>
                        <p>Telephone: {params.phone}</p>
                        <p>City: {params.city}</p>
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default ProductInfo;