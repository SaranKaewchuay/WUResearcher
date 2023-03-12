import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';

export default function Head() {
    return (
        <Container maxWidth='sm' sx={{ paddingTop: '3rem', height: '50' }} >
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '33rem' }}
                elevation='3'
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, flexDirection: 'column' }}
                    placeholder="Search Researcher"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>

        </Container>
    );
}
