import React, { Component } from 'react';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import classes from './Auth.css';

import { Redirect } from 'react-router-dom';

// redux state
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your email",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        isSignup: true,
    };

    componentDidMount() {
        if (this.props.pendingOrder && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity = (value, rules) => {

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
                },

        };
        this.setState({controls: updatedControls});
    };

    submitHandler = event => {
        event.preventDefault();

        this.props.onAuthenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);

    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return{isSignup: !prevState.isSignup}
        });
    };

    render () {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const formInputs = formElementsArray.map(formElement => (
            <Input key={formElement.id}
                   changed={(event) => this.inputChangedHandler(event, formElement.id)}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   shouldValidate={formElement.config.validation}
                   touched={formElement.config.touched} />

        ));

        let form = <form onSubmit={this.submitHandler}>
                        {formInputs}
                        <Button btnType="Success">Submit</Button>
                    </form>;

        if (this.props.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        if (this.props.isAuth) {
            form = <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                {form}
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        pendingOrder: state.burgerBuilder.ingredients !== null,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onAuthenticate: (email, password, isSingup) => dispatch(actions.auth(email, password, isSingup)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth );