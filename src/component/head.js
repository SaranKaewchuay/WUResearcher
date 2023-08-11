import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';

export default function Head() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <Container maxWidth='sm' sx={{ paddingTop: '3rem', height: '50' }} >
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '33rem' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, flexDirection: 'column' }}
                    placeholder="Search Researcher"
                    onChange={handleChange}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon/>
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>
    
        </Container>
    );
}
