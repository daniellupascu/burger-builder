import React, {Component} from 'react';
import Aux from '../../../hoc/Auxilliar/Auxilliar';
import Burger from '../../../components/Burger/Burger';
import BuildControls from '../../../components/Burger/BuildControls/BuildControls';
import Modal from '../../../components/UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withHandlerError';
import axios from '../../../axios-orders';

// Redux
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../../store/actions/index';

export class BurgerBuilder extends Component {

    state = {
        purcharshing: false,
    };

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {

        let numberOfIngredients = 0;

        Object.keys(ingredients).map( key => {
                return numberOfIngredients += ingredients[key];
        });

        return numberOfIngredients > 0;
    }



    purchaseHandler = () => {

        if (this.props.isAuth) {
            this.setState({purcharshing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purcharshing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    
    render () {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded </p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings} />  
                    <BuildControls
                        isAuth={this.props.isAuth}
                        price = {this.props.totalPrice}
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}   
                        ordered = {this.purchaseHandler} 
                    /> 
                </Aux>
            )

            orderSummary = <OrderSummary 
                                    ingredients={this.props.ings} 
                                    purchaseCancelled={this.purchaseCancelHandler}
                                    purchaseContinued={this.purchaseContinueHandler}
                                    orderPrice = {this.props.totalPrice}/>;
                                    
        }

        return (
            <Aux>
                <Modal show={this.state.purcharshing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings:  state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: ()  => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));