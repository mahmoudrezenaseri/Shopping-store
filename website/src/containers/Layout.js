import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth/AuthContext';
import { Header, Content, SubHeader } from './index'

import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { green, orange, grey } from '@material-ui/core/colors';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff'
        },
        secondary: {
            main: '#EF394E'
        },
        text: {
            primary: orange[500],
        },
        text: {
            secondary: green[500],
        }
    }
})

const Layout = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xlg" disableGutters={true}>
                <Header />
                <SubHeader />
                <Content />
            </Container>
        </ThemeProvider>
    )
}

export default Layout;