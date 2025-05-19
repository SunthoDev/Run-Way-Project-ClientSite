import React, { useState } from 'react';
import "./AdminMyHubAllPendingData.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AdminMyHubAllPendingData = ({ PendingAllData }) => {

    // console.log(PendingAllData)
    let { _id, Address, BusinessName, Districts, LastName, Phone, PickReqUserEmail, PickupIdUser, PoliceStations, UserPickupReqDate, name, photo, status, userId } = PendingAllData


    // ================================================
    // DictatedHub Operation Start
    // ================================================
    // user data all find use tenStack query 
    let { refetch, data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("http://localhost:5000/CoveragesPoliceStationAll")
        return res.json()

    })
    let HubDictatedPoliceStation = AllCoveragesPoliceStation.filter(PoliceStationAll => PoliceStationAll?.AddPoliceStation == PoliceStations)
    // console.log(HubDictatedPoliceStation)
    let DictatedHub = HubDictatedPoliceStation.map(Hub => Hub?.MyHub ? Hub.MyHub : "No Add Hub Admin")
    // ================================================
    // DictatedHub Operation End
    // ================================================
    // ================================================
    // Admin User Hun Request Approved Start
    // ================================================

    let [parcelNum,setParcelNum]=useState("")
    let handleParcelNumber=(e)=>{
        setParcelNum(e.target.value)
    }
  
    let handleHubRequestApproved=(id)=>{

        let HubData={parcelNum}

        fetch(`http://localhost:5000/AdminApprovedUserPickupRequestData/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(HubData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Pickup Request Approved Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })

    }
    // ================================================
    // Admin User Hun Request Approved End
    // ================================================



    return (
        <div className='AdminMyHubAllPendingData'>

            <div className='MyHubAllPendingData'>

                <div className="PendingAllData grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

                    <div className="One">
                        <h3>ID: #{PickupIdUser}</h3>
                        <h3>Date: {UserPickupReqDate}</h3>
                        <input onBlur={handleParcelNumber} defaultValue={0} type="number" className='px-2 text-black font-[600] text-[16px]' placeholder='Pres Parcel number' />
                        <br />
                        <button onClick={() => handleHubRequestApproved(_id)} className='PaidNow'>Approved Now</button>

                    </div>

                    <div className="Tow">
                        <h3>{name} {LastName}</h3>
                        <h3>{Address}</h3>
                        <h3>Police.ST: {PoliceStations}</h3>
                        <h3>Hub: {DictatedHub}</h3>
                    </div>

                    <div className="Three">
                        <h3>{Phone}</h3>
                        <h3>{PickReqUserEmail}</h3>
                        <button className='Pending'>{status}</button>

                    </div>


                </div>


            </div>
        </div>
    );
};

export default AdminMyHubAllPendingData;