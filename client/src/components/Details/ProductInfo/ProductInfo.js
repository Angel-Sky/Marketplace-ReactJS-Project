import { useState, useEffect } from 'react';
import { Row, Tabs, Tab, Image } from 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { wishProduct, unwishProduct } from '../../../services/productService'

function ProductInfo({ params }) {
    const [wish, setWish] = useState(false);

    useEffect(() => {
        if (params.isWished == true) {
            setWish(true)
        } else {
            setWish(false)
        }
    }, [params.isWished, setWish])

    const onHearthClick = () => {
        if (wish == false) {
            wishProduct(params._id)
            .then(res => {
                setWish(true);
            })
        } else {
            wishProduct(params._id)
            .then(res => {
                setWish(false);
            })
        }
    }

    return (
        <>
            <Image className="col-lg-12" src={params.image} rounded />
            <Row>
                <h1 className="col-lg-10 col-sm-10 product-info-heading">{params.title}</h1>
                <span id="heartIconDetails" className="col-lg-1 col-sm-1" onClick={onHearthClick}>   
                    {!wish ? <BsHeart /> : <BsHeartFill />}
                </span>
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