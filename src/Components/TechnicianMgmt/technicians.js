import React from 'react';
import axios from 'axios';
import { Box, Container, Grid, Table, TableCell, TableContainer, Typography, TableBody, TableHead, TableRow, Button, TextField, Tooltip, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import useStyle from '../../Styling';
const Technicians = ({ history }) => {
    const classes = useStyle()
    const [techName, setTechName] = React.useState("");
    const [id, setId] = React.useState("");
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        fetchTechnicians()
    }, [])

    const fetchTechnicians = async () => {
        const res = await axios.get('/technicians')
        setData(res.data.technician)
    }

    const addTechnician = async () => {
        const technicianInfo = {
            technicianName: techName
        }
        const addRes = await axios.post('/technician/add', technicianInfo)
        if(addRes.status()===200){
            history.go()
        }
        else{
            alert("Failed to add new Technician")
        }
    }

    const deleteTechnicians = async () => {
        const delRes = await axios.delete(`/technician/remove/?id=${id}`)
        if(delRes.status === 200){
            history.push({pathname:'/Technicians'})
        }
        else{
            alert("Failed to Remove Technicians")
        }
    }
    return (
        <div>
            <Container maxWidth='xl' >
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                    <Container>
                        <Box display="flex" justifyContent="center">
                            <Typography classes={{root:classes.basicHeader}}>Remove Technician(s)</Typography>
                        </Box>
                        <TableContainer classes={{ root: classes.dataContainer }}>
                            <Table>
                                <TableHead>
                                    <TableCell>Technician Name</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableHead>
                                <TableBody>
                                    {data.map((value) => (
                                        <TableRow key={value._id}>
                                            <TableCell>{value.technicianName}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Remove Technician">
                                                <IconButton onClick={()=>{const id=value._id;setId(id);deleteTechnicians();}}><Delete/></IconButton>
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
                                <Typography classes={{ root: classes.basicHeader }}>Add Technician</Typography>
                            </Box>
                            <Box paddingY={2} />
                            <form onSubmit={addTechnician}>
                                <TextField variant='outlined' fullWidth required label="Technician Name" value={techName} onChange={(e) => { setTechName(e.target.value) }} />
                                <Box mx={6} my={3} display="flex" justifyContent="center">
                                    <Button classes={{ root: classes.submitBtn }} type="submit">Add</Button>
                                </Box>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );

}

export default withRouter(Technicians);
//done