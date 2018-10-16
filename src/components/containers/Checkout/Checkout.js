import React,  { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component {

    // state = {
    //     ingredients: {
    //         salad: 1,
    //         meat: 1,
    //         cheese: 1,
    //         bacon: 1
    //     },
    //     totalPrice: 0
    // }

    // componentDidMount = () => {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }

    //     this.setState({ingredients: ingredients, totalPrice : price});
    // }

    // componentWillMount() {
    //     this.props.onInitPurchase();
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };



    render() {

        let sumary = <Redirect to="/" />;

        if(this.props.ingredients) {

            const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null;

            sumary = <div>
                        {purchaseRedirect}
                        <CheckoutSummary
                            ingredients={this.props.ingredients}
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler}/>
                    </div>;
        }

        return(
            <div>
                {sumary}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
};


export default connect(mapStateToProps)(Checkout);