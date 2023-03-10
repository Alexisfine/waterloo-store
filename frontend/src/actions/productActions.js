import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS
} from "../constants/productConstants";
import axios from "axios";
import {USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS} from "../constants/userConstants";


// Action to get all products
export const listProducts = () => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get('/api/products');
        dispatch({type:PRODUCT_LIST_SUCCESS, payload:data});

    } catch (e) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message: e.message})
    }
}

// Action to get single product
export const listProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get('/api/products/' + id);
        dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data});

    } catch (e) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message: e.message})
    }
}

// Delete Product  Action
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST});

        // Get user info after login
        const {userLogin:{userInfo}} = getState();

        const config = {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            },
        }
        await axios.delete('/api/products/' + id, config)

        dispatch({type:PRODUCT_DELETE_SUCCESS})
    } catch (error) {
        dispatch({type:PRODUCT_DELETE_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message: error.message})
    }
}

// Add Product Action
export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_REQUEST});

        // Get user info after login
        const {userLogin:{userInfo}} = getState();

        const config = {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            },
        }

        const {data} = await axios.post('/api/products', {}, config);

        dispatch({type:PRODUCT_CREATE_SUCCESS, payload: data});

    } catch (error) {
        dispatch({type:PRODUCT_CREATE_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message: error.message})
    }
}

// Update Product Action
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_UPDATE_REQUEST});

        // Get user info after login
        const {userLogin:{userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + userInfo.token
            },
        }

        const {data} = await axios.put('/api/products/'+product._id, product, config);

        dispatch({type:PRODUCT_UPDATE_SUCCESS, payload: data});

    } catch (error) {
        dispatch({type:PRODUCT_UPDATE_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message: error.message})
    }
}

