import React from 'react';
import axios from 'axios';
import { Box, Container, Grid, Table, TableCell, TableContainer, Typography, TableBody, TableHead, TableRow, Button, TextField, Tooltip, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import useStyle from '../../Styling';
const Accessories = ({ history }) => {
    const classes = useStyle()
    const [acsName, setAcsName] = React.useState("");
    const [id, setId] = React.useState("");
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        fetchAccessories()
    }, [])

    const fetchAccessories = async () => {
        const res = await axios.get('/accessories')
        setData(res.data.accessories)
    }

    const addAccessory = async () => {
        const accessoryInfo = {
            accessoryName: acsName
        }
        const addRes = await axios.post('/accessory/add', accessoryInfo)
        if(addRes.status === 200){
        console.log("new accessory added")
        }
        else{
            alert("Failed to add new Accessory")
        }
    }

    const deleteAccessories = async () => {
        const delRes = await axios.delete(`/accessory/remove/?id=${id}`)
        if(delRes.status === 200){
            history.go()
        }
    }
    return (
        <div>
            <Container maxWidth='xl' >
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                    <Container>
                        <Box display="flex" justifyContent="center">
                            <Typography classes={{root:classes.basicHeader}}>Remove Accessory</Typography>
                        </Box>
                        <TableContainer classes={{ root: classes.dataContainer }}>
                            <Table>
                                <TableHead>
                                    <TableCell>Accessory Name</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableHead>
                                <TableBody>
                                    {data.map((value) => (
                                        <TableRow key={value._id}>
                                            <TableCell>{value.accessoryName}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Remove Accessory">
                                                <IconButton onClick={()=>{const id=value._id;setId(id);deleteAccessories();}}><Delete/></IconButton>
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
                                <Typography classes={{ root: classes.basicHeader }}>Add Accessory</Typography>

                            </Box>
                            <Box paddingY={2} />
                            <form onSubmit={addAccessory}>
                                <TextField variant='outlined' fullWidth required label="Accessory Name" value={acsName} onChange={(e) => { setAcsName(e.target.value) }} />
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

export default withRouter(Accessories);
//done