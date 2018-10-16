import React,  {Component} from 'react';
import Button from '../../../UI/Button/Button';
import axios from '../../../../axios-orders';
import withErrorHandler from '../../../../hoc/withErrorHandler/withHandlerError';

import classes from './ContactData.css';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';

import {connect} from 'react-redux';
import * as actionTypes from '../../../../store/actions';

class ContactData extends Component {

    state = {
        orderForm:{
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your name",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zip: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your email",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest"},
                        {value: "cheapest", displayValue: "Cheapest"}
                    ]
                },
                value: "fastest",
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
    }

    orderHandler = (e) => {
        e.preventDefault();
        
        const formData = {};

        for (let formId in this.state.orderForm) {
            formData[formId] = this.state.orderForm[formId].value;
        }

        // this.setState({loading: true});

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId,
        };

        this.props.onOrderBurger(order, this.props.token);

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false});
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({loading: false});
        //     });
    };

    checkValidity = (value, rules) => {

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inptuIdentifier) => {
        
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFromElement = {
            ...updatedOrderForm[inptuIdentifier]
        }

        updatedFromElement.value = event.target.value;
        updatedFromElement.touched = true;
        updatedFromElement.valid = this.checkValidity(updatedFromElement.value, updatedFromElement.validation);
        updatedOrderForm[inptuIdentifier] = updatedFromElement;

        let formIsValid = true;
        for ( let inputId in updatedOrderForm) {
            formIsValid =  updatedOrderForm[inputId].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

    }


    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (<form onSubmit={this.orderHandler}>
                        {formElementsArray.map(formElement => (
                            <Input 
                                key={formElement.id}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                />
                        ))}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                    </form>);

        if (this.props.loading) {
            form = <Spinner />;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data </h4>
                {form}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionTypes.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));