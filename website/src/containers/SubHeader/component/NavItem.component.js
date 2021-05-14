import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import "../sub-header.css"
import { CSSTransition } from 'react-transition-group';

const NavItem = (props) => {
    const [open, SetOpen] = useState(false);

    const duration = {
        appear: 500,
        enter: 300,
        exit: 100,
    }

    return (
        <li className="nav-item" onMouseEnter={() => { SetOpen(!open); }} onMouseLeave={() => { SetOpen(!open) }}>
            <Button
                variant="text"
                color="inherit"
                fullWidth={true}
                startIcon={props.icon} >
                {props.link}
            </Button>
            <CSSTransition in={open} timeout={duration} unmountOnExit>
                <div className="menu">
                    {/* {(open) ? props.children : null} */}
                    {props.children}
                </div>
            </CSSTransition>
        </li>
    );
}

export default NavItem;

