import React, { useState } from 'react';
import "./AdminCoveragesPoliceStations.css"
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const AdminCoveragesPoliceStations = () => {

    // =========================================================================================
    // All Coverage Ploce Station Find By Query
    // =========================================================================================
    let { refetch, data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/CoveragesPoliceStationAll")
        return res.json()

    })
    // console.log(AllCoveragesPoliceStation)

    // ============================================
    // Delete Add Coverage Ploce Station
    // ============================================

    const handleDeletePsOfCoverage = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Delete hub`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                // Hub request data insert 
                // =================================
                try {
                    let res = await fetch(`https://server.trustereocourier.com.bd/DeletedPoliceStationWithOfCoverage/${id}`, {
                        method: "DELETE",
                    })
                    let result = await res.json()

                    if (res.ok) {
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "The Ploce Station has been deleted.",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        await refetch();
                    }
                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: err.message || "Something went wrong",
                    });
                }
            }
        });
    };


    // ================================================================================================
    // Created All Police Station find of Hub
    // ================================================================================================
    let { data: AllStationOfHub = [] } = useQuery(["HubManageAdminCreateOrUpdatePs"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/PoliceStationWithOfHub")
        return res.json()
    })
    // console.log(AllStationOfHub)




    return (
        <div className='AdminCoveragesPoliceStations bg-white my-14  md:w-[58%] rounded-[8px] w-[100%] mx-auto '>
            <h2>Districts ( {AllCoveragesPoliceStation.length} )</h2>

            <div className='CoveragesPoliceStations px-[20px] py-[14px]'>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>NUMBER</th>
                                <th>DISTRICT</th>
                                <th>POLICE STATIONS</th>
                                <th>HUB</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                AllCoveragesPoliceStation.map((PoliceStationAll, i) =>

                                    <tr className='TableData' key={i}>

                                        <td> <h4>{i + 1}</h4></td>
                                        <td> <h4>{PoliceStationAll?.AddDistrict}</h4></td>
                                        <td> <h4>{PoliceStationAll?.AddPoliceStation}</h4></td>
                                        <td>
                                            {
                                                (() => {
                                                    let HubNameData = AllStationOfHub?.find(Station => Station?.PoliceStation === PoliceStationAll?.AddPoliceStation)
                                                    // console.log(HubNameData)
                                                    return (
                                                        <div>
                                                            <h4>{HubNameData?.HubName ? HubNameData?.HubName : "No add Hub"}</h4>
                                                        </div>
                                                    )
                                                })()
                                            }

                                        </td>
                                        <td> <h3 onClick={() => handleDeletePsOfCoverage(PoliceStationAll?._id)} className="AddButton">Delete</h3></td>

                                    </tr>

                                )
                            }


                        </tbody>

                    </table>
                </div>

            </div>


        </div>
    );
};

export default AdminCoveragesPoliceStations;