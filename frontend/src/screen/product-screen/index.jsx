import React, {useEffect, useState} from 'react';
import {Link,useParams, useNavigate} from "react-router-dom";
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap';
import Rating from "../../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from "../../actions/productActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const ProductScreen = ({}) => {
    const [quantity, setQuantity] = useState(1);
    const {id} = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state=>state.productDetails)
    const {loading, error, product} = productDetails;
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(listProductDetails(id));
    },[dispatch])

    const addToCartHandler = () => {
        navigate('/cart/'+id+'/?quantity='+quantity);
    }

    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>Return Home</Link>
            {loading ? <Loader/> : error ?  <Message variant='danger'>{error}</Message> :
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} numReviews={product.numReviews}/>
                            </ListGroup.Item>
                            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                            <ListGroup.Item>Description: ${product.description}</ListGroup.Item>

                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Price: </Col>
                                        <Col><strong>$ {product.price}</strong></Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Stock: </Col>
                                        <Col>{product.countInStock > 0 ? 'In Stock':'Out of Stock'}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Quantity</Col>
                                        <Col>
                                            <Form.Control as='select' value={quantity}
                                            onChange={(e)=> setQuantity(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map(
                                                    i => <option key={i+1} value={i+1}>{i+1}</option>
                                                )}
                                            </Form.Control>
                                        </Col>

                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button onClick={addToCartHandler}
                                            className='btn-block' type='button'
                                            disabled={product.countInStock === 0}>
                                        Add to cart</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>}
        </>
    )
}


export default ProductScreen;