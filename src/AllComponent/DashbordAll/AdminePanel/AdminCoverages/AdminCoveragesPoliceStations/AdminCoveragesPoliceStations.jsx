import React, { useState } from 'react';
import "./AdminCoveragesPoliceStations.css"
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const AdminCoveragesPoliceStations = () => {


    let [poup, setPoup] = useState(false)
    const clseAlertButton = () => {
        setPoup(false)
    }
    const handleHubAdd = () => {
        setPoup(true)
    }
    // =============================================

    // user data all find use tenStack query 
    let { refetch, data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("http://localhost:5000/CoveragesPoliceStationAll")
        return res.json()

    })
    // console.log(AllCoveragesPoliceStation)


    let handleAdminHubAdd = (event) => {
        event.preventDefault()
        let AddPoliceStation = event.target.PoliceStation.value
        let MyHub = event.target.Hub.value
        let Data = {MyHub}
        // console.log(Data)

        fetch(`http://localhost:5000/AdminAddHubAndUpdateHub/${AddPoliceStation}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(Data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Add You Hub Success',
                        showConfirmButton: false,
                        timer: 1500
                    })

                }
                refetch()
            })
    }


    return (
        <div className='AdminCoveragesPoliceStations bg-white my-14  md:w-[58%] rounded-[8px] w-[100%] mx-auto '>
            <h2>Districts ( {AllCoveragesPoliceStation.length} )</h2>

            <div className='CoveragesPoliceStations px-[20px] py-[14px]'>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>NAME</th>
                                <th>HUB</th>
                                <th>ADD POLICE STATION</th>
                                <th>EDIT</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                AllCoveragesPoliceStation.map(PoliceStationAll =>

                                    <tr className='TableData'>

                                        <td> <h4>1</h4></td>
                                        <td> <h4>{PoliceStationAll?.AddPoliceStation}</h4></td>
                                        <td> <h4>{PoliceStationAll?.MyHub ? PoliceStationAll.MyHub : "No Hub"}</h4></td>

                                        <td> <h3 onClick={handleHubAdd} className="AddButton">ADD HUB</h3></td>
                                        <td> <h3 className="AddButton">View</h3></td>

                                    </tr>

                                )
                            }


                        </tbody>

                    </table>
                </div>

            </div>

            {/* ============================================= */}

            <div className={`alertContainer rounded-[8px]  px-4  lg:px-0 w-full lg:w-[34%]  ${poup === true && "showAlertJs"}`} >

                <div className="poup ">
                    <div className="popInfo px-4 py-4 mt-3">

                        <h6>Payment Request</h6>

                        <form onSubmit={handleAdminHubAdd}>

                            <h3 className='mt[24px] pb-[6px] text-black font-[600] text-[16px]'>Police Station</h3>
                            <select required name='PoliceStation' className="select select-bordered w-[100%] max-w-xs ">
                                <option disabled selected>Selected Police Station</option>
                                {
                                    AllCoveragesPoliceStation.map(PoliceStationAll => <option>{PoliceStationAll.AddPoliceStation}</option>)
                                }


                            </select>
                            <h3 className='pt[18px] pb-[6px] text-black font-[600] text-[16px]'>Add Hub</h3>
                            <input required className='w-[100%] px-4' name='Hub' type="text" placeholder='Add Hub' />


                            <button type='submit' className='UpdateButton' >Add Now</button>

                        </form>

                    </div>
                    <button onClick={clseAlertButton} className="removeAlertBtn"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                </div>

            </div>

            {/* ============================================= */}


        </div>
    );
};

export default AdminCoveragesPoliceStations;