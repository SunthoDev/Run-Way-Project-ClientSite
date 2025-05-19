import React, { useState } from 'react';
import "./AdminSearchStandardParcelUser.css"
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AdminSendAllTrackingMessage from './AdminSendAllTrackingMessage/AdminSendAllTrackingMessage';
import Swal from 'sweetalert2';
import useRole from '../../../../Hook/useRole';

const AdminSearchStandardParcelUser = () => {

    let [poup, setPoup] = useState(false)
    const clseAlertButton = () => {
        setPoup(false)
    }
    const handlePaymentRequestUser = () => {
        setPoup(true)
    }
    // ===================================================



    // ===================================================
    // Find user information
    // ===================================================
    let userInfo = useRole()
    // console.log(userInfo[0].BusinessName)

    let AdminSearchStandardParcel = useLoaderData()
    console.log(AdminSearchStandardParcel)
    let { _id, weight, status, policeStation, number, note, name, District, date, address, StandardParcelId, StandardEmailUser, Invoice, CodAmount, DeliveryCharge } = AdminSearchStandardParcel



    // =============================================
    // Tracking Work
    // =============================================
    // Admin is get all tracking data 
    let { refetch, data: AllTrackingData = [] } = useQuery(["AllTrackingData"], async () => {
        let res = await fetch("http://localhost:5000/AllTrackingData")
        return res.json()

    })
    // console.log(AllTrackingData)



    let adminSendTrackingAllMessage = AllTrackingData.filter(TrackingMes => TrackingMes.userOrderIdTracking == StandardParcelId)
    // console.log(adminSendTrackingAllMessage)

    // ==========================================================

    let handleUpdateUserOrderInformation = (event) => {
        event.preventDefault()
        let nameUp = event.target.nameU.value
        let WeightUp = event.target.WeightU.value
        let policeStationUp = event.target.policeStationU.value
        let numberUp = event.target.numberU.value
        let noteUp = event.target.noteU.value
        let addressUp = event.target.addressU.value
        let districtUp = event.target.districtU.value
        let CodAmountUp = event.target.CodAmountU.value
        let DeliveryChargeUp = event.target.DeliveryChargeU.value
        let InvoiceUP = event.target.InvoiceU.value

        let adminUserOrderUp = { nameUp, WeightUp, policeStationUp, numberUp, noteUp, addressUp, districtUp, CodAmountUp, DeliveryChargeUp, InvoiceUP }

        fetch(`http://localhost:5000/AdminUserOrderInvoiceUpdate/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(adminUserOrderUp)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }








    return (
        <div className='StandardDeliveryParent px-2 md:px-10 py-10'>
            <div className="StandardMain bg-white rounded-[8px] p-[28px]">

                <div className="ml-auto flex justify-between items-center w-[100%] md:w-[60%]">
                    <h2 className='text-center font-[600] text-black text-[20px] '>ID #{StandardParcelId}</h2>

                    <div className="flex  gap-3 ">
                        <button className='text-black bg-[#ffc107] py-[8px] px-[13px] text-[16px] rounded-[7px]  font-[500]'>Invoice</button>
                        <button onClick={handlePaymentRequestUser} className='text-white bg-[#17838C] rounded-[7px] py-[8px] px-[13px] text-[16px] font-[500]'>Edite</button>
                    </div>
                </div>

                <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>

                <div className="md:flex justify-between items-center mt-2">
                    <div className='flex gap-2 items-center'>
                        <h3 className='text-[16px] font-[500] text-black'>Merchant :</h3>
                        <button className='text-white bg-[#17838C] rounded-[7px] py-[4px] px-[6px] text-[16px] font-[500]'>{userInfo[0].BusinessName}</button>
                        <button className='text-white bg-[#17838C] rounded-[7px] py-[4px] px-[6px] text-[16px] font-[500]'>{name}</button>
                    </div>
                    <button className='text-white ml-[8px] bg-[#17838C] rounded-[7px] py-[8px] px-[13px] text-[16px] font-[500]'>Print</button>
                </div>

                <div className="flex items-center">
                    <h3 className='text-[16px] font-[500] text-black'>Gmaile :</h3>
                    <button className='text-white bg-[#17838C] rounded-[7px] py-[4px] px-[6px] text-[16px] font-[500]'>{StandardEmailUser}</button>
                </div>

                <div className="flex justify-between mt-2">
                    <h3 className='text-[16px] font-[500] text-black'>Category: Regular</h3>
                    <h4 className='text-[20px] font-[600] text-black'>৳ {CodAmount}</h4>
                </div>
                <div className="flex justify-between mt-2">
                    <div className='flex gap-2 items-center'>
                        <h3 className='text-[16px] font-[500] text-black'>Delivery Type:  <span className='font-[700]'>Home Delivery</span> :</h3>
                        <button className='text-white bg-[#17838C] rounded-[7px] py-[4px] px-[6px] text-[16px] font-[500]'>Change</button>
                    </div>
                    <button className='text-white bg-[#17838C] rounded-[14px] py-[4px] px-[6px] text-[16px] font-[500]'>In Review</button>
                </div>

                <div className="flex justify-between mt-2">
                    <h3 className='text-[16px] font-[500] text-black'>Entry: {date}</h3>
                    <button className='text-white bg-[#17838C] rounded-[7px] py-[4px] px-[6px] text-[16px] font-[500]'>Delete</button>
                </div>
                <h3 className='text-[16px] font-[500] text-black'>Invoice: {Invoice}</h3>

                <div className="flex justify-between mt-2">
                    <h3 className='text-[16px] font-[500] text-black'>Weight: {weight}</h3>
                    <button className='text-white bg-[#17838C] rounded-[7px] py-[4px] px-[6px] text-[16px] font-[500]'>Re-Schedule</button>
                </div>
                <h3 className='text-[16px] font-[500] text-black'>Delivery cost: {DeliveryCharge}tk</h3>
                <button className='text-white bg-[#17838C] rounded-[7px] py-[4px] px-[6px] text-[16px] font-[500]'>Paid By Cahs</button>


                <h3 className='text-[16px] font-[500] text-black mt-6'>{name}</h3>
                <h3 className='text-[16px] font-[500] text-black'>{address}</h3>
                <h3 className='text-[16px] mt-6 font-[500] text-black'>Police Station: {policeStation}</h3>
                <h3 className='text-[16px] mt-6 font-[500] text-black'>Phone Number: {number}</h3>
                <h3 className='text-[16px] font-[500] text-black'>Tracking Code: 3CDE5B538</h3>
                <h3 className='text-[16px] mt-6 font-[500] text-black'>Last Update: {date}</h3>
                <h3 className='text-[16px] font-[500] text-black'>Entry By: Merchant</h3>
                <button className='text-white bg-red-600 rounded-[7px] py-[4px] px-[6px] text-[16px] font-[500]'>Report Wrong Entry</button>
                <h3 className='text-[16px] mt-6 font-[500] text-black'>Last Update</h3>

                <h2 className='text-center bg-[#F3F3F3] text-black text-[20px] font-[600] py-[12px] mt-[44px]'>Assign To</h2>

                <h3 className='mt-[26px] text-[16px] font-[500] text-black'>Zone: Not Assigned</h3>
                <h2 className='text-center bg-[#F3F3F3] text-black text-[20px] font-[600] py-[12px] mt-[44px]'>Note</h2>
                <h3 className='mt-[26px] text-[16px] font-[500] text-black'>{note}</h3>

                {/* ================================================== */}
                {/* Parcel Tracking Work Start*/}
                {/* ================================================== */}

                <h2 className=' bg-[#F3F3F3] py-[12px] mt-[44px]'></h2>
                <h2 className='mt-[41px] text-[#17838C] text-center text-[16px] font-[500] '>Parcel Tracking</h2>
                <div className="Horijontal bg-[#17838C] my-[12px] w-[full] h-[1px]"></div>

                <div className="trackingMessageShow w-[100%] md:w-[60%]">

                    {
                        adminSendTrackingAllMessage.map(messageAll => <AdminSendAllTrackingMessage key={messageAll._id} messageAllData={messageAll}></AdminSendAllTrackingMessage>)
                    }

                </div>

                {/* ================================================== */}
                {/* Parcel Tracking Work End */}
                {/* ================================================== */}


                {/* ============================================= */}

                <div className={`alertContainer rounded-[8px]  px-4  lg:px-0 w-full lg:w-[60%]  ${poup === true && "showAlertJs"}`} >

                    <div className="poup ">
                        <div className="popInfo px-4 py-4 mt-3">

                            <h6>Update Parcel Information</h6>

                            <form onSubmit={handleUpdateUserOrderInformation}>
                                <div className="md:flex gap-4">
                                    <input defaultValue={name} type="text" name="nameU" id="" />
                                    <input defaultValue={weight} type="text" name="WeightU" id="" />
                                </div>
                                <div className="md:flex gap-4">
                                    <input defaultValue={policeStation} type="text" name="policeStationU" id="" />
                                    <input defaultValue={number} type="text" name="numberU" id="" />
                                </div>
                                <div className="md:flex gap-4">
                                    <input defaultValue={note} type="text" name="noteU" id="" />
                                    <input defaultValue={address} type="text" name="addressU" id="" />
                                </div>
                                <div className="md:flex gap-4">
                                    <input defaultValue={District} type="text" name="districtU" id="" />
                                    <input defaultValue={CodAmount} type="text" name="CodAmountU" id="" />
                                </div>
                                <div className="md:flex gap-4">
                                    <input defaultValue={DeliveryCharge} type="text" name="DeliveryChargeU" id="" />
                                    <input defaultValue={Invoice} type="text" name="InvoiceU" id="" />
                                </div>



                                <button type='submit' className='UpdateButton' >Update User Parcel Information</button>

                            </form>

                        </div>
                        <button onClick={clseAlertButton} className="removeAlertBtn"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                    </div>

                </div>

                {/* ============================================= */}


            </div>
        </div>
    );
}


export default AdminSearchStandardParcelUser;