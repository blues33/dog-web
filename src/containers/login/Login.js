import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/es/Grid/Grid";
import Paper from "@material-ui/core/es/Paper";
import { withStyles } from '@material-ui/core/styles';
import LoginCreators from './LoginRedux';
import LocalLoginForm from './components/LocalLoginForm';
import { Route, Switch } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import { SITE_NAME } from '../../constants/appData';
import Typography from '@material-ui/core/Typography';

const { googleLogin, signup, login } = LoginCreators;

const styles = {
    container: {
        padding: 20,
        height: '80vh'
    },
    loginWrapper: {
        width: 420,
        backgroundColor: 'white',
        padding: 20
    },
    brandContainer: {
        textAlign: 'center',
        maxWidth: 420,
        marginBottom: -60
    },
    brand: {
        fontFamily: '"Garamond", "Helvetica", "Arial", sans-serif',
        fontWeight: '600',
        textShadow: '0px 1px 4px #9797977d'
    }
};

class Login extends Component {

    componentWillUpdate({ auth: { user, fetching }, history }) {
        if (user && !fetching) {
            history.push('/')
        }
    }

    render() {
        const { classes, login, signup } = this.props;
        return (
            <Grid container justify="space-evenly" alignItems="center"
                direction="column" className={classes.container}>
                <Grid item className={classes.brandContainer}>
                    <Typography component="h2" variant="h2" color="primary"
                        className={classes.brand} gutterBottom>
                        {SITE_NAME}
                    </Typography>
                </Grid>
                <Grid item className={classes.loginWrapper} component={Paper}>
                    <Grid container>
                        <Grid item style={{ width: '100%' }}>
                            <Switch>
                                <Route path="/auth/login" component={props => <LocalLoginForm {...props} login={login} />} />
                                <Route path="/auth/signup" component={props => <SignupForm {...props} signup={signup} />} />
                            </Switch>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => bindActionCreators({ googleLogin, signup, login }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
