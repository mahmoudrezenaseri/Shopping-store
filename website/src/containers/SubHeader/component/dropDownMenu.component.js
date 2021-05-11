import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import WatchIcon from '@material-ui/icons/Watch';
import DropDownContent from "./dropDownContent.component"
import "../sub-header.css"

const DropDownMenu = (props) => {

    return (
        <Box
            component={Grid}
            container
            className="dropdown"
            boxShadow={3}
            width="92%"
        >
            <Grid
                className="dropdown-right"
                direction="column"
                alignItems={'stretch'}
                justify={'flex-start'}
                container
                xs={2}
            >
                <Grid item className="dropdown-right-item" key="cat-1">
                    <Button
                        variant="text"
                        color="inherit"
                        fullWidth={true}
                        startIcon={<LaptopChromebookIcon />} >
                        کالای دیجیتال
                    </Button>
                </Grid>
                <Grid item className="dropdown-right-item" key="cat-2">
                    <Button
                        variant="text"
                        color="inherit"
                        fullWidth={true}
                        startIcon={<WatchIcon />} >
                        مد و پوشاک
                    </Button>
                </Grid>
                <Grid item className="dropdown-right-item" key="cat-3">
                    <Button
                        variant="text"
                        color="inherit"
                        fullWidth={true}
                        startIcon={<SportsBasketballIcon />} >
                        ورزش و سرگرمی
                    </Button>
                </Grid>
            </Grid>
            <Grid container xs={10} className="dropdown-left">
                <Grid item className="category-content" xs={3}>
                    <ul>
                        <li><h4>لوازم جانبی گوشی</h4></li>
                        <li><h4>گوشی موبایل</h4></li>
                        <li><h4>واقعیت مجازی</h4></li>
                        <li><h4>دوربین</h4></li>
                    </ul>
                </Grid>
                <Grid item className="category-content" xs={3}>
                    <ul>
                        <li><h4>لوازم جانبی گوشی</h4></li>
                        <li><h4>گوشی موبایل</h4></li>
                        <li><h4>واقعیت مجازی</h4></li>
                        <li><h4>دوربین</h4></li>
                    </ul>
                </Grid>
            </Grid>
        </Box >
    );
}

export default DropDownMenu;

