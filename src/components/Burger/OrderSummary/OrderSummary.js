import React, {Component} from 'react';
import Aux from '../../../hoc/Auxilliar/Auxilliar';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render () {

        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
        return <li key={igKey}> <span style={{textTransform: 'capitalize'}}>{igKey}:</span> {this.props.ingredients[igKey]}</li>
         });

         return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <h3>Price: {this.props.orderPrice.toFixed(2)}</h3>
            <p>Continue to checkout?</p>

            <Button btnType='Danger' clicked={this.props.purchaseCancelled} >Cancel</Button>
            <Button btnType='Success' clicked={this.props.purchaseContinued} >Continue</Button>
            </Aux>
         )
    }
}

export default OrderSummary;