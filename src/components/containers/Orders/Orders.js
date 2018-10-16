import React, { Component } from 'react';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withHandlerError';

import Order from '../../Order/Order';
import Spinner from '../../UI/Spinner/Spinner';

import { connect } from 'react-redux';

import * as orderActions from '../../../store/actions';

class Orders extends Component {

    // state = {
    //     orders: [],
    //     loading: true,
    // }

    componentDidMount() {

        this.props.getOrders(this.props.token, this.props.userId);
        // axios.get('/orders.json')
        // .then(res => {
        //
        //     let fetchedOrders = [];
        //
        //     for( let key in res.data ) {
        //
        //         fetchedOrders.push({
        //             ...res.data[key],
        //             id: key
        //         })
        //     }
        //
        //     this.setState({loading: false, orders: fetchedOrders});
        // })
        // .catch(e => {
        //     this.setState({loading: false});
        // })
    }

    render () {

        let orders = <Spinner />;

        if(!this.props.loading) {

            orders = this.props.orders.map(order => (
                // console.log(order.ingredients)
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                    ));
        }

        return (
            <div>
                {orders}
             </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapsDispatchToProps = dispatch => {
    return {
        getOrders: (token, userId) => dispatch(orderActions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapsDispatchToProps)(withErrorHandler(Orders, axios));