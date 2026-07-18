import React from 'react';
import "./AdminUserConsignmentPickupRequestApproved.css"
import { useQuery } from '@tanstack/react-query';

const AdminUserConsignmentPickupRequestApproved = ({ PickUpAll }) => {
    // console.log(PickUpAll)

    let { _id, Address, BusinessName, Districts, LastName, Phone, PickReqUserEmail, PickupIdUser, PoliceStations, UserPickupReqDate, name, photo, status, userId } = PickUpAll

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


    return (
        <div className='AdminUserConsignmentPickupRequestApproved'>

            <div className='UserConsignmentPickupRequestApproved'>

                <div className="ApprovedAllData grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

                    <div className="One">
                        <h3>ID: #{PickupIdUser}</h3>
                        <h3>Date: {UserPickupReqDate}</h3>
                        <h3>Police.ST: {PoliceStations}</h3>
                        {/* <button onClick={() => handlePaymentRequestPaid(_id)} className='PaidNow'>Paid Now</button> */}

                    </div>

                    <div className="Tow">
                        <h3>{name} {LastName}</h3>
                        <h3>{Address}</h3>
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

export default AdminUserConsignmentPickupRequestApproved;