import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import logo from "../img/logo.png";


export default function Nav() {
    return (
        <AppBar position="relative" sx={{ padding: '5px', height: '5rem' }}>
            <Container fixed>
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        sx={{
                            height: 64,
                        }}
                        alt="Your logo."
                        src={logo}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            ml: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontSize: '1rem',
                            fontWeight: 500,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        WALAILAK UNIVERSITY <br /> RESEARCH

                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            ml: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 500,
                            fontSize: '1rem',
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        RESEARCH <br />
                        WALAILAK UNIVERSITY
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}