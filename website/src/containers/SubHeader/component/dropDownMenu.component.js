import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "../sub-header.css"

const DropDownMenu = (props) => {

    return (
        <div className="dropdown">
            <div className="dropdown-item" >
                <ul>
                    <li><h4>لوازم جانبی گوشی</h4></li>
                    <li><h4>گوشی موبایل</h4></li>
                    <li><h4>واقعیت مجازی</h4></li>
                    <li><h4>دوربین</h4></li>
                </ul>
            </div>
            <div className="dropdown-item" >
                <ul>
                    <li><h4>لوازم جانبی گوشی</h4></li>
                    <li><h4>گوشی موبایل</h4></li>
                    <li><h4>واقعیت مجازی</h4></li>
                    <li><h4>دوربین</h4></li>
                </ul>
            </div>
            <div className="dropdown-item">
                <ul>
                    <li><h4>لوازم جانبی گوشی</h4></li>
                    <li><h4>گوشی موبایل</h4></li>
                    <li><h4>واقعیت مجازی</h4></li>
                    <li><h4>دوربین</h4></li>
                </ul>
            </div>
            <div className="dropdown-item" >
                <ul>
                    <li><h4>لوازم جانبی گوشی</h4></li>
                    <li><h4>گوشی موبایل</h4></li>
                    <li><h4>واقعیت مجازی</h4></li>
                    <li><h4>دوربین</h4></li>
                </ul>
            </div>
        </div>
    );
}

export default DropDownMenu;

