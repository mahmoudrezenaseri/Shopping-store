import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import "../sub-header.css"

const DropDownContent = (props) => {
    const [show, setShow] = useState(false)

    return (
        <Fragment>
            <Grid
                className="dropdown-right"
                direction="column"
                alignItems={'stretch'}
                justify={'flex-start'}
                container
                xs={2}
            >
                <Grid item className="dropdown-right-item">
                    <Button
                        variant="text"
                        color="inherit"
                        fullWidth={true}
                        startIcon={props.icon} >
                        {props.title}
                    </Button>
                </Grid>
            </Grid>
            <Grid container xs={10} className="dropdown-left">
                {props.children}
            </Grid>
        </Fragment>
    );
}

export default DropDownContent;

