import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from 'app/auth/store/actions';
import { bindActionCreators } from 'redux';
import * as Actions from 'app/store/actions';
import jwtService from 'app/services/jwtService';

class Auth extends Component {
    /*eslint-disable-next-line no-useless-constructor*/
    constructor(props) {
        super(props);
        /**
         * Comment the line if you do not use JWt
         */
        this.jwtCheck();


    }

    jwtCheck = () => {
        jwtService.on('onAutoLogin', () => {

           // this.props.showMessage({ message: 'Reconnexion ...' });
            this.props.requestReLogin();
            // this.props.setUserData({ role: "login", data: {} });

            /**
             * Sign in and retrieve user data from Api
             */
            jwtService.signInWithToken()
                .then(user => {
                    this.props.setUserData(user);
                    this.props.successReLogin();

                    /* ============= TOKENS & Abonnement FOURNISSEURS ============*/
                    if (user.role === 'ROLE_FOURNISSEUR') {
                        this.props.getTokenFournisseur();
                        this.props.getAbonnementFournisseur(user.id);
                    }
                    //this.props.showMessage({ message: 'Logged in with JWT' });
                })
                .catch(error => {
                    //this.props.setUserData({ role: [], data: {} });
                    this.props.showMessage({ message: error });
                    this.props.errorReLogin(error);

                })
        });

        jwtService.on('onAutoLogout', (message) => {
            if (message) {
                this.props.showMessage({ message });
            }
            this.props.logout();
        });

        jwtService.init();
    };



    render() {
        const { children } = this.props;

        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: userActions.logoutUser,
        setUserData: userActions.setUserData,
        getTokenFournisseur: userActions.getTokenFournisseur,
        getAbonnementFournisseur: userActions.getAbonnementFournisseur,
        showMessage: Actions.showMessage,
        hideMessage: Actions.hideMessage,
        requestReLogin: userActions.requestReLogin,
        successReLogin: userActions.successReLogin,
        errorReLogin: userActions.errorReLogin
    },
        dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
