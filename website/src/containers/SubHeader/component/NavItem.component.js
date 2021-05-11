import React, { useState } from 'react'
import ReactDOM from 'react-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import "../sub-header.css"

const NavItem = (props) => {
    const [open, SetOpen] = useState(false);

    return (
        <li className="nav-item" onMouseEnter={() => { SetOpen(!open); }} onMouseLeave={() => { SetOpen(!open) }}>
            <Button
                variant="text"
                color="inherit"
                fullWidth={true}
                startIcon={props.icon} >
                {props.link}
            </Button>
            <div className="menu">
                {/* {(open) ? props.children : null} */}
                {props.children}
            </div>
        </li>
    );
}

export default NavItem;

