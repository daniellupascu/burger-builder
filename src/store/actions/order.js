import * as actionTypes from './actionTypes';
// import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
};

export const purchaseBurgerStart = () => {
    return{
         type: actionTypes.PURCHASE_BURGER_START,
    }
};

export const purchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData: orderData,
        token: token,
    }

    // return dispatch => {

    //     dispatch(purchaseBurgerStart());

    //     axios.post('/orders.json?auth=' + token, orderData)
    //         .then(response => {
    //             // this.setState({loading: false});
    //             // this.props.history.push('/');
    //             dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    //         })
    //         .catch(error => {
    //             // this.setState({loading: false});
    //             dispatch(purchaseBurgerFail(error))
    //         })
    // };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
};

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: fetchedOrders,
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    };
};

export const fetchOrders = (token, userId) => {

    return {
        type: actionTypes.FETCH_ORDERS,
        token: token,
        userId: userId, 
    }

    // return dispatch => {

    //     dispatch(fetchOrdersInit());

    //     const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

    //     axios.get('/orders.json' + queryParams)
    //         .then(res => {

    //             let fetchedOrders = [];

    //             for( let key in res.data ) {

    //                 fetchedOrders.push({
    //                     ...res.data[key],
    //                     id: key
    //                 });
    //             }
    //             // this.setState({loading: false, orders: fetchedOrders});
    //             dispatch(fetchOrdersSuccess(fetchedOrders));
    //         })
    //         .catch(error => {
    //             // this.setState({loading: false});
    //             dispatch(fetchOrdersFail(error));
    //         })

    // };

};