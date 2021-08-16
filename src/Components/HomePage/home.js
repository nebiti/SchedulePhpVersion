import React from 'react';
import { Box, AppBar, Toolbar, Typography, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { Menu, CalendarToday, Devices, Router, Build, Add } from '@material-ui/icons'
import useStyle from '../../Styling';
import { Link, withRouter } from 'react-router-dom'
const Home = () => {
    const classes = useStyle()
    const [mobileScreen, setMobileScreen] = React.useState(false);
    const handleMobileScreen = () => {
        setMobileScreen(!mobileScreen);
    }
    const drawerHeader = (
        <div>
            <Box display='flex' justifyContent='center' p={2}>
                <Typography variant='h6' classes={{ root: classes.itemHeader }}>Mella Tech Scheduling System</Typography>
            </Box>
        </div>
    )
    const drawerItems = (
        <div>
            <Divider />
            <List>
                <Link to='/ScheduleForm' className={classes.links}>
                    <ListItem classes={{ root: classes.itemColor }} button>
                        <ListItemIcon><Add /></ListItemIcon>
                        <ListItemText>Add New Schedule</ListItemText>
                    </ListItem>
                </Link>
                <Box height={20} />
                <Link to='/ScheduleTable' className={classes.links}>
                    <ListItem classes={{ root: classes.itemColor }} button>
                        <ListItemIcon><CalendarToday /></ListItemIcon>
                        <ListItemText>Schedules</ListItemText>
                    </ListItem>
                    <Box height={20} />
                </Link>
            </List>
        </div>
    )
    return (
        <div className={classes.root}>
            <div >
                <AppBar classes={{ root: classes.appBar }} display='flex'>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={handleMobileScreen}
                        >
                            <Menu />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        open={mobileScreen}
                        onClose={handleMobileScreen}
                        variant='temporary'
                        classes={{ paper: classes.drawerPaper }}
                    >
                        {drawerHeader}
                        {drawerItems}
                    </Drawer>
                </nav>
            </div>
        </div>
    );
}

export default withRouter(Home);
//done