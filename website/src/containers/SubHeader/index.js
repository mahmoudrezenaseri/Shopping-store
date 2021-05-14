import React from 'react'
import DropDownMenu from './component/dropDownMenu.component';
import Nav from './component/Nav.component';
import NavItem from './component/NavItem.component';
import Reorder from '@material-ui/icons/Reorder';
import Kitchen from '@material-ui/icons/Kitchen';
import LocalOffer from '@material-ui/icons/LocalOffer';

import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import WatchIcon from '@material-ui/icons/Watch';

import "./sub-header.css"

const SubHeader = () => {

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
    }, {
        title: "زیبایی و سلامت",
        icon: <SportsBasketballIcon />,
        data: [{
            title: "لوازم آرایشی",
            column: 1
        },
        {
            title: "لوازم بهداشتی",
            column: 2
        },
        {
            title: "لوازم شخصی برقی ",
            column: 2
        }]
    }, {
        title: "خانه و آشپزخانه",
        icon: <SportsBasketballIcon />,
        data: [{
            title: "صوتی و تصویری",
            column: 1
        },
        {
            title: "آشپزخانه",
            column: 2
        },
        {
            title: "نور و روشنایی",
            column: 1
        }]
    }]

    return (
        <Nav>
            <NavItem link="دسته بندی کالا ها" icon={<Reorder />}>
                <DropDownMenu categories={categories} />
            </NavItem>
            <NavItem link="سوپر مارکت" icon={<Kitchen />}>

            </NavItem>
            <NavItem link="تخفیف ها و پیشنهاد ها" icon={<LocalOffer />}>

            </NavItem>
        </Nav>
    );
}

export default SubHeader;

