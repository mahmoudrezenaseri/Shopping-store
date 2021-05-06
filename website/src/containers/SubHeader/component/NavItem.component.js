import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "../sub-header.css"

const NavItem = (props) => {
    const [open, SetOpen] = useState(false)

    return (
        <li className="nav-item" onMouseEnter={() => { SetOpen(!open) }} onMouseLeave={() => { SetOpen(!open) }}>
            <a href="#" className="nav-link">{props.link}</a>
            <div className="menu">
                {(open) ? props.children : null}
            </div>
        </li>
    );
}

export default NavItem;

