import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth/AuthContext';
import { TheHeader, TheContent } from './index'

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

const TheLayout = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xlg" disableGutters={true}>
                <TheHeader />
                <TheContent />
            </Container>
        </ThemeProvider>
    )
}

export default TheLayout;