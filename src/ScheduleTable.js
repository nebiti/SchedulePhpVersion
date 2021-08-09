import React from 'react';
import axios from 'axios';
import { Tooltip, IconButton } from '@material-ui/core'
import MUIDataTable from 'mui-datatables';
import { withRouter } from 'react-router';
import { Update } from '@material-ui/icons';
import useStyle from './Styling';
const ScheduleTable = ({ history }) => {

     const urlData = "http://192.168.1.3/mct_sch/api.php";
     const classes = useStyle();
     const [data, setData] = React.useState([null])

     React.useEffect(() => {
          fetchSchedule()
          document.title = "Schedule Table"
     }, [])

     const handleClick = (row) => {
          const selectedRow = {
               accessory: row[7],
               accessoryQty: row[8],
               companyName: row[1],
               contactNumber: row[2],
               date: row[0],
               device: row[4],
               deviceQty: row[5],
               jobType: row[7],
               location: row[3],
               status: row[10],
               technician: row[9],
               _id: row[11],
          }
          history.push({ pathname: '/Update', state: { data: selectedRow } })
     }
     const fetchSchedule = async () => {
          const res = await axios.get(urlData + '/schedule')
          setData(res.data.schedule);
          console.log(res.data)
     }
     const options = {
          rowsPerPage: 10,
          rowsPerPageOptions: [5, 10],
          print: false,
          fixedHeader: true,
          selectableRows: 'none',
          filterType: 'checkbox',
          responsive: "scrollMaxHeight",
     }

     const columns = [
          {
               name: "date",
               label: "Date",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "companyName",
               label: "Company Name",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "contactNumber",
               label: "Contact Number",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "location",
               label: "Location",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "device",
               label: "Device",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "deviceQty",
               label: "Device Quantity",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "accessory",
               label: "Accessory",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "accessoryQty",
               label: "Accessory Quantity",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "technician",
               label: "Technician",
               options: {
                    filter: true,
                    sort: true
               }
          },
          {
               name: "jobType",
               label: "Job Type",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "status",
               label: "Status",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "_id",
               options: {
                    display: false,
                    filter: false,
               }
          },
          {
               name: "update",
               label: "Update",
               options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (index, value) => {
                         return (
                              <Tooltip title="Update Info">
                                   <IconButton onClick={() => {
                                        const row = value.rowData;
                                        handleClick(row)
                                   }}><Update /></IconButton>
                              </Tooltip>
                         );
                    }
               }
          },
     ]
     
     return (
          <div className={classes.root}>
               <MUIDataTable
                    title={"Table Of Schedules"}
                    data={data}
                    columns={columns}
                    options={options}
               />
          </div>
     );
}

export default withRouter(ScheduleTable);
//done