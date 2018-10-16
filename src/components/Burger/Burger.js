import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {

    const ingredientsKey = Object.keys(props.ingredients);
    let burgerContent = ingredientsKey.map((ingredient) => {
                                return [...Array(props.ingredients[ingredient])].map((_, i) => {
                                    return <BurgerIngredient key={ingredient+i} type={ingredient} />
                                })

                            })
                            .reduce((arr, el) => {
                                return arr.concat(el)
                            }, []);
    if(burgerContent.length === 0) {
        burgerContent = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {burgerContent}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;