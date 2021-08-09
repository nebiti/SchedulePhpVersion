import React from 'react';
import axios from 'axios';
import { Box, Container, Grid, Table, TableCell, TableContainer, Typography, TableBody, TableHead, TableRow, Button, TextField, Tooltip, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import useStyle from '../../Styling';
import Loading from '../LoadingScreen/loading'
const Devices = ({ history }) => {
    const classes = useStyle()
    const [devName, setDevName] = React.useState("");
    const [id, setId] = React.useState("");
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setLoading(false);
        fetchDevices()
    }, [])

    const fetchDevices = () => {
        axios.get('/devices').then(res=>{
            setData(res.data.device)
            setLoading(true)
            console.log(res.data)
        })
    }

    const addDevices = async () => {
        const deviceInfo = {
            deviceName: devName
        }
        const addRes = await axios.post('/device/add', deviceInfo)
        if (addRes.status() === 200) {
            history.push({ pathname: '/Devices' })
        }
        else {
            alert("Failed to add new Device")
        }
    }

    const deleteDevices = async () => {
        const delRes = await axios.delete(`/device/remove/?id=${id}`)
        console.log(delRes.status)
        if(delRes.status === 200){
            history.go()
        }
    }
    return (
        <div>
            {loading? (
            <Container maxWidth='xl' >
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <Container>
                            <Box display="flex" justifyContent="center">
                                <Typography classes={{ root: classes.basicHeader }}>Remove Device(s)</Typography>
                            </Box>
                            <TableContainer classes={{ root: classes.dataContainer }}>
                                <Table>
                                    <TableHead>
                                        <TableCell>Device Name</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((value) => (
                                            <TableRow key={value._id}>
                                                <TableCell>{value.deviceName}</TableCell>
                                                <TableCell>
                                                    <Tooltip title="Remove Device">
                                                        <IconButton onClick={() => { const id = value._id;setId(id);deleteDevices();}}><Delete/></IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Container>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Box display="flex" alignItems="flex-top" flexDirection="column" style={{ width: "100%" }}>
                            <Box display="flex" justifyContent="center">
                                <Typography classes={{ root: classes.basicHeader }}>Add Device</Typography>

                            </Box>
                            <Box paddingY={2} />
                            <form onSubmit={addDevices}>
                                <TextField variant='outlined' fullWidth required label="Device Name" value={devName} onChange={(e) => { setDevName(e.target.value) }} />
                                <Box mx={6} my={3} display="flex" justifyContent="center">
                                    <Button classes={{ root: classes.submitBtn }} type="submit">Add</Button>
                                </Box>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            ): <Loading/>}
        </div>
    );

}

export default withRouter(Devices);
//done