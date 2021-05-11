import React, { Fragment, useState } from 'react'
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
var _ = require('lodash');

const DropDownMenu = (props) => {
    const [categoryInfo, setCategoryInfo] = useState([])
    const categories = [{
        title: "کالای دیجیتال",
        icon: <LaptopChromebookIcon />,
        data: [{
            title: "لوازم جانبی گوشی",
            column: 1
        },
        {
            title: "گوشی موبایل",
            column: 2
        },
        {
            title: "واقعیت مجازی",
            column: 3
        },
        {
            title: "دوربین",
            column: 4
        }]
    },
    {
        title: "مد و پوشاک",
        icon: <WatchIcon />,
        data: [{
            title: "لباس مردانه",
            column: 1
        },
        {
            title: "لباس زنانه",
            column: 3
        },
        {
            title: "ساعت",
            column: 1
        }]
    }, {
        title: "ورزش و سرگرمی",
        icon: <SportsBasketballIcon />,
        data: [{
            title: "کفش سالن",
            column: 1
        },
        {
            title: "توپ",
            column: 2
        },
        {
            title: "شورت ورزشی",
            column: 3
        }]
    }]

    const categoryClicked = (data) => {
        setCategoryInfo(data)
    }

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
                {
                    categories.map((value, index) => {
                        return (
                            <Grid item className="dropdown-right-item" key={index}>
                                <Button
                                    variant="text"
                                    color="inherit"
                                    fullWidth={true}
                                    startIcon={value.icon}
                                    onClick={() => { categoryClicked(value.data) }}
                                >
                                    {value.title}
                                </Button>
                            </Grid>
                        )
                    })
                }

            </Grid>
            <Grid container xs={10} className="dropdown-left">
                {
                    categoryInfoContent(categoryInfo)
                }
            </Grid>
        </Box>
    );
}

const categoryInfoContent = (data) => {
    const firstCol = _.filter(data, { column: 1 })
    const secCol = _.filter(data, { column: 2 })
    const thidCol = _.filter(data, { column: 3 })
    const fourthCol = _.filter(data, { column: 4 })

    return (
        <Fragment>
            {
                categoryInfoCol(firstCol)
            }
            {
                categoryInfoCol(secCol)
            }
            {
                categoryInfoCol(thidCol)
            }
            {
                categoryInfoCol(fourthCol)
            }
        </Fragment>
    )
}

const categoryInfoCol = (data) => {
    return (
        <Grid item className="category-content" xs={3}>
            <ul>
                {
                    data.map((value, index) => {
                        return (
                            <li><h4>{value.title}</h4></li>
                        )
                    })
                }
            </ul>
        </Grid>
    )
}

export default DropDownMenu;

