import React from 'react';
import ScheduleForm from './ScheduleForm';
import ScheduleTable from './ScheduleTable';
import Accessories from './Components/AccessoriesMgmt/accessories';
import Devices from './Components/DeviceMgmt/devices';
import Technicians from './Components/TechnicianMgmt/technicians';
import Update from './Components/UpdateInfo/update';
import Home from './Components/HomePage/home';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import useStyle from './Styling';
function App() {
  const classes = useStyle();
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Home />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/ScheduleForm' component={ScheduleForm} />
            <Route exact path='/ScheduleTable' component={ScheduleTable} />
            <Route exact path='/' component={ScheduleTable} />
            <Route exact path='/Update' component={Update} />
            <Route exact path='/Accessories' component={Accessories} />
            <Route exact path='/Devices' component={Devices} />
            <Route exact path='/Technicians' component={Technicians} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
//done