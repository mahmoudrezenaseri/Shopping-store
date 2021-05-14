import React, { Fragment, useState, useRef } from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import "../sub-header.css"
var lodash = require('lodash');

const DropDownMenu = (props) => {
    const [categoryInfo, setCategoryInfo] = useState(props.categories[0].data)

    const categoryEntered = (event, data) => {
        setCategoryInfo(data)
    }

    const categoryLeaved = (event, data) => {
        setCategoryInfo(data)

        event.target.parentNode.classList.remove('active-cat');
    }

    const categoryItem = (value, index) => {
        return (
            (index == 0) ?
                <Grid item className="dropdown-right-item active-cat" key={index} >
                    <Button
                        variant="text"
                        color="inherit"
                        fullWidth={true}
                        startIcon={value.icon}
                        disableRipple
                        onMouseEnter={(e) => { categoryEntered(e, value.data) }}
                        onMouseLeave={(e) => { categoryLeaved(e, value.data) }}
                    >
                        {value.title}
                    </Button>
                </Grid> :
                <Grid item className="dropdown-right-item" key={index} >
                    <Button
                        variant="text"
                        color="inherit"
                        fullWidth={true}
                        startIcon={value.icon}
                        disableRipple
                        onMouseEnter={(e) => { categoryEntered(e, value.data) }}
                        onMouseLeave={(e) => { categoryLeaved(e, value.data) }}
                    >
                        {value.title}
                    </Button>
                </Grid>
        )

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
                    props.categories.map((value, index) => {
                        return categoryItem(value, index)
                    })
                }
            </Grid>
            <Grid
                container
                xs={10}
                className="dropdown-left"
            >
                {
                    categoryInfoContent(categoryInfo)
                }
            </Grid>
        </Box>
    );
}

const categoryInfoContent = (data) => {
    const firstCol = lodash.filter(data, { column: 1 })
    const secCol = lodash.filter(data, { column: 2 })
    const thidCol = lodash.filter(data, { column: 3 })
    const fourthCol = lodash.filter(data, { column: 4 })

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
                            <li key={index}><h4>{value.title}</h4></li>
                        )
                    })
                }
            </ul>
        </Grid>
    )
}

export default DropDownMenu;

