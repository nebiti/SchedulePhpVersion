import axios from 'axios';
import React from 'react';
import useStyle from '../../Styling';
import { Select, TextField, MenuItem, Grid, Container, Box, Paper, FormControl, InputLabel, Button } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
const Update = ({ history }) => {

    const urlData = "http://192.168.1.3/mct_sch/api.php";
    const classes = useStyle();
    const [date, setDate] = React.useState('');
    const [type, setDeviceType] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [contactNum, setContactNum] = React.useState(0);
    const [accesoriesQty, setAccessoriesQty] = React.useState(0);
    const [deviceQty, setDeviceQty] = React.useState(0);
    const [accesoriesType, setAccessoriesType] = React.useState('');
    const [jobType, setJobType] = React.useState('');
    const [technician, setTechnician] = React.useState([]);
    const [status, setStatus] = React.useState('');
    const [acsData, setAcsData] = React.useState([]);
    const [devData, setDevData] = React.useState([]);
    const [tecData, setTecData] = React.useState([]);
    const [id, setId] = React.useState('');
    const [userData, setUserData] = React.useState({})

    React.useEffect(() => {
        fetchAccessories()
        fetchDevices()
        fetchTechnicians()
        handleID()
        document.title = "Change Schedule Info"
    }, [])

    const handleID = () => {
        setUserData()
        const {
            accessory,
            accessoryQty,
            companyName,
            contactNumber,
            date,
            device,
            deviceQty,
            jobType,
            location,
            status,
            technician,
            _id,
        } = history.location.state.data;
        setId(_id)
        setAccessoriesQty(accessoryQty)
        setCompany(companyName)
        setContactNum(contactNumber)
        setDeviceQty(deviceQty)
        setLocation(location)
        setJobType(jobType)
        setDate(date)
        setAccessoriesType(accessory)
        setTechnician(technician)
        setStatus(status)
        setDeviceType(device)
    }
    const update = async (e) => {
        e.preventDefault()
        const schForm = {
            date: date,
            companyName: company,
            contactNumber: contactNum,
            location: location,
            device: type,
            deviceQty: deviceQty,
            accessory: accesoriesType,
            accessoryQty: accesoriesQty,
            technician: technician,
            jobType: jobType,
            status: status
        }
        const res = await axios.post(urlData + `/schedule_edit/?id=${id}`, schForm)
        console.log(res.status);
        if (res.status === 200) {
            history.push('/ScheduleTable')
        } else {
            alert("Failed to Update Information")
        }
    }
    const fetchAccessories = async () => {
        const res = await axios.get(urlData + '/accessories')
        setAcsData(res.data.accessories)
    }
    const fetchDevices = async () => {
        const res = await axios.get(urlData + '/devices')
        setDevData(res.data.device)
    }
    const fetchTechnicians = async () => {
        const res = await axios.get(urlData + '/technicians')
        setTecData(res.data.technician)
    }
    return (
        <div>
            <Container maxWidth='xl'>
                <Box paddingY={3} />
                <Grid container classes={{ root: classes.grid }}>
                    <Grid item md={6} xs={12}>
                        <form onSubmit={update}>
                            <Paper>
                                <Box display='flex' flexDirection='column'>
                                    <Box paddingY={2} />
                                    <Box marginX={3}><TextField type="date" onChange={(e) => { setDate(e.target.value) }} value={date} /></Box>
                                    <Box paddingY={2} />
                                    <Box marginX={3}><TextField fullWidth label="Company" onChange={(e) => { setCompany(e.target.value) }} value={company} /></Box>
                                    <Box paddingY={2} />
                                    <Box marginX={3}><TextField variant="outlined" type="number" label="Contact Number" onChange={(e) => { setContactNum(e.target.value) }} value={contactNum} /></Box>
                                    <Box paddingY={2} />
                                    <Box marginX={3}><TextField fullWidth label="Location" onChange={(e) => { setLocation(e.target.value) }} value={location} /></Box>
                                    <Box paddingY={2} />
                                    <FormControl classes={{ root: classes.formControl }}>
                                        <InputLabel>Device Type</InputLabel>
                                        <Select
                                            value={type}
                                            onChange={(e) => { setDeviceType(e.target.value) }}
                                        >
                                            {devData.map((values) => (
                                                <MenuItem value={values.deviceName}>{values.deviceName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Box paddingY={2} />
                                    <Box marginX={3}><TextField variant="outlined" type="number" label="Device Qty" onChange={(e) => { setDeviceQty(e.target.value) }} value={deviceQty} /></Box>
                                    <Box paddingY={2} />
                                    <FormControl classes={{ root: classes.formControl }}>
                                        <InputLabel>Accessories Type</InputLabel>
                                        <Select
                                            value={accesoriesType}
                                            onChange={(e) => { setAccessoriesType(e.target.value) }}
                                        >

                                            {acsData.map((values) => (
                                                <MenuItem value={values.accessoryName}>{values.accessoryName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Box paddingY={2} />
                                    <Box marginX={3}><TextField variant="outlined" type="number" label="Accesories Qty" onChange={(e) => { setAccessoriesQty(e.target.value) }} value={accesoriesQty} /></Box>
                                    <Box paddingY={2} />
                                    <FormControl classes={{ root: classes.formControl }}>
                                        <InputLabel>Technician Assigned</InputLabel>
                                        <Select
                                            multiple
                                            value={technician}
                                            onChange={(e) => { setTechnician(e.target.value) }}
                                        >
                                            {tecData.map((values) => (
                                                <MenuItem value={values.technicianName}>{values.technicianName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl classes={{ root: classes.formControl }}>
                                        <InputLabel>Job Type</InputLabel>
                                        <Select
                                            value={jobType}
                                            onChange={(e) => { setJobType(e.target.value) }}
                                        >
                                            <MenuItem value={"Installation"}>Installation</MenuItem>
                                            <MenuItem value={"Maintenance"}>Maintenance</MenuItem>
                                            <MenuItem value={"Dismantle"}>Dismantle</MenuItem>
                                            <MenuItem value={"Caliberation"}>Caliberation</MenuItem>
                                            <MenuItem value={"Replacement"}>Replacement</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl classes={{ root: classes.formControl }}>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            value={status}
                                            onChange={(e) => { setStatus(e.target.value) }}
                                        >
                                            <MenuItem value={"Ongoing"}>Ongoing</MenuItem>
                                            <MenuItem value={"Incomplete"}>Incomplete</MenuItem>
                                            <MenuItem value={"Completed"}>Completed</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Box paddingY={3} />
                                    <Box display="flex" flexDirection='row' marginX={3}>
                                        <Button type="submit" classes={{ root: classes.submitBtn }}>Submit</Button>
                                        <Box paddingX={2} />
                                        <Link className={classes.links} to='/ScheduleTable'>
                                            <Button classes={{ root: classes.cancelBtn }}>Cancel</Button>
                                        </Link>
                                    </Box>
                                    <Box paddingY={2} />
                                </Box>
                            </Paper>
                        </form>
                    </Grid>
                </Grid>
            </Container>

        </div>
    );

}

export default withRouter(Update);
//done