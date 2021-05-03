import React, { Fragment, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import routes from '../routes'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

export default function TheContent() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container direction="row">
                <Suspense fallback={loading}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={props => (
                                        <Fragment>
                                            <route.component {...props} />
                                        </Fragment>
                                    )} />
                            )
                        })}
                        <Redirect from="/" to="/dashboard" />
                    </Switch>
                </Suspense>
            </Grid>
        </div>
    );
}

