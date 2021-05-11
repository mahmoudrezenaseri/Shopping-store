import React, { Fragment, Suspense } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MegaMenu from 'react-mega-menu';
import DropDownMenu from './component/dropDownMenu.component';
import Nav from './component/Nav.component';
import NavItem from './component/NavItem.component';
import Reorder from '@material-ui/icons/Reorder';
import Kitchen from '@material-ui/icons/Kitchen';
import LocalOffer from '@material-ui/icons/LocalOffer';
import "./sub-header.css"

const useStyles = makeStyles((theme) => ({
    grid: {
        // height: "45px",
        backgroundColor: theme.palette.primary.main,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const menuStyle = {
    menuProps: {
        style: {
            border: "2px solid red",
            height: "20em",
            padding: "2px",
            width: "20%",
            margin: "0"
        }
    },
    contentProps: {
        style: {
            width: "78.8%",
            border: "2px solid yellow",
            padding: "2px"
        }
    },
    menuItemProps: {
        style: {
            border: "2px solid green",
            padding: "2px",
            height: "2em"
        }
    },
    menuItemSelectedProps: {
        style: {
            border: "2px solid purple",
            padding: "2px",
            height: "2em",
            backgroundColor: "#f5f5f5",
            color: "red",
            cursor: "pointer"
        }
    },
    containerProps: {
        style: {
            border: "2px solid blue",
            width: "90%",
            padding: "2px"
        }
    }
}


const SubHeader = () => {
    const classes = useStyles();

    const categories = [
        {
            label: "کالای دیجیتال",
            key: "Category1",
            items:
                <Grid container>
                    <Grid item xs={3}>
                        <ul>
                            <li><h4>لوازم جانبی گوشی</h4></li>
                            <li><h4>گوشی موبایل</h4></li>
                            <li><h4>واقعیت مجازی</h4></li>
                            <li><h4>دوربین</h4></li>
                        </ul>
                    </Grid>
                    <Grid item xs={3}>
                        <ul>
                            <li><h4>لوازم جانبی گوشی</h4></li>
                            <li><h4>گوشی موبایل</h4></li>
                            <li><h4>واقعیت مجازی</h4></li>
                            <li><h4>دوربین</h4></li>
                        </ul>
                    </Grid>
                    <Grid item xs={3}>
                        <ul>
                            <li><h4>لوازم جانبی گوشی</h4></li>
                            <li><h4>گوشی موبایل</h4></li>
                            <li><h4>واقعیت مجازی</h4></li>
                            <li><h4>دوربین</h4></li>
                        </ul>
                    </Grid>
                    <Grid item xs={3}>
                        <ul>
                            <li><h4>لوازم جانبی گوشی</h4></li>
                            <li><h4>گوشی موبایل</h4></li>
                            <li><h4>واقعیت مجازی</h4></li>
                            <li><h4>دوربین</h4></li>
                        </ul>
                    </Grid>
                </Grid>
        },
        {
            label: "مد و پوشاک",
            key: "Category2",
            items: <div>
                <ul>
                    <li><h4>ورزشی</h4></li>
                    <li><h4>زنانه</h4></li>
                    <li><h4>مردانه</h4></li>
                </ul>
            </div>
        },
        {
            label: "ورزش و سفر",
            key: "Category3",
            items: <div>
                <ul>
                    <li><h4>دوچرخه</h4></li>
                    <li><h4>اسکوتر</h4></li>
                    <li><h4>چتر</h4></li>
                </ul>
            </div>
        }
    ];

    return (
        <Nav>
            <NavItem link="دسته بندی کالا ها" icon={<Reorder />}>
                <DropDownMenu />
            </NavItem>
            <NavItem link="سوپر مارکت" icon={<Kitchen />}>

            </NavItem>
            <NavItem link="تخفیف ها و پیشنهاد ها" icon={<LocalOffer />}>

            </NavItem>
        </Nav>
    );
}

export default SubHeader;

