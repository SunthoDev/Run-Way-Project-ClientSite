import React from 'react';
import "./AdminSearchUserNumber.css"
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const AdminSearchUserNumber = () => {

    let UserInformationNumber = useLoaderData()

    console.log(UserInformationNumber)

    let { _id, Address, BusinessName, LastName, Password, Phone, email, name, photo, role, status, userId, Districts, PoliceStations ,date} = UserInformationNumber

    // =======================================================================
    // User Hub Selected Start
    // =======================================================================

    // user data all find use tenStack query 
    let { data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/CoveragesPoliceStationAll")
        return res.json()

    })

    let CurrentPoliceStation = AllCoveragesPoliceStation.find(PoliceStationAll => PoliceStationAll?.AddPoliceStation == PoliceStations)

    // console.log(CurrentPoliceStation.MyHub)


    // =======================================================================
    // User Hub Selected End
    // =======================================================================


    return (
        <div className='AdminSearchUserNumber my-4'>
            <div className='UserIdParent grid grid-cols-1 md:grid-cols-7 gap-5'>

                <div className="left py-6 px-4 col-span-1 md:col-span-2 bg-white rounded-[8px]">

                    <div className="img ">
                        <img className="w-full h-[100%]" src={photo} alt="img" />
                    </div>
                    <h3 className='text-[#1cae42] font-[600px] text-[18px] pt-[18px] text-center'>{BusinessName}</h3>
                    <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>Owner: {name}</h3>
                    <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>ID: {userId}</h3>

                    <h3 className='text-black font-[500] text-[18px] pt-[18px] text-center'>Created at:  {date}</h3>

                    <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>Primary Phone: {Phone}</h3>

                    <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>Contact no: {Phone}</h3>
                    <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>{email}</h3>
                    <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>{Address}</h3>
                    <h3 className='text-red-600 font-[500] text-[16px] pt-[4px] text-center'>{PoliceStations}</h3>

                    <button className='font-[600] bg-[#22A197] py-2 px-2 text-[14px] text-white  rounded-[8px] w-[100%] mt-4 md:mt-6'>Update Address</button>

                </div>






                <div className="right p-6 col-span-1 md:col-span-5 bg-white rounded-[8px]">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        <div className="CurrentBalance bg-[#1f7f0e]">
                            <h2 className='text-left text-[18px] font-[500] text-white'>Curren Balance</h2>
                            <button>Check Balance</button>

                        </div>
                        <div className="CurrentBalance bg-[#cb8931]">
                            <h2 className="text-right text-[18px] font-[500] text-white">Cancel Parcel</h2>
                            <h2 className="text-right text-[18px] pt-[16px] font-[500] text-white">50000</h2>

                        </div>
                        <div className="CurrentBalance bg-[#0862af]">
                            <h2 className="text-right text-[18px] font-[500] text-white">Return Parcel</h2>
                            <h2 className="text-right text-[18px] pt-[16px] font-[500] text-white">Return List</h2>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-6">

                        <div className='font-[600] py-[4px] text-[16px] bg-[#22A197] text-white text-center px-4 rounded-[8px]'>Add Parcel</div>

                        <div className="div">
                            <h3 className='text-black font-[500] text-[16px] text-center'>Hub: {CurrentPoliceStation?.MyHub ? CurrentPoliceStation.MyHub : "Admin Not Add Any Hub"}</h3>
                            <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>Hub Phone: No HUB</h3>
                        </div>

                        <h3 className='font-[600] text-[16px] text-center text-[#14BF7D]'>COD Charge  <span className='text-black'>1%</span></h3>

                    </div>


                    <div className="md:flex items-center justify-between mt-6 ">

                        <div>

                            <button className='font-[600] bg-[#22A197] py-2 px-3 text-[14px] text-white  rounded-[8px]'>Change owner name</button>
                            <h3 className='font-[600] my-2 text-[17px] text-black'>PickUp Request</h3>
                            <button className='font-[600] bg-[#22A197] text-[14px] text-white  rounded-[8px] px-16 py-2'>Send</button>
                        </div>

                        <select className="select select-success w-full md:w-[30%] my-[24px] first-line:max-w-xs">
                            <option disabled selected>{status}</option>
                            <option className='text-black font-[500] text-[16px]'>Approved</option>
                            <option className='text-black font-[500] text-[16px]'>Denite</option>
                        </select>

                    </div>


                    <div className="md:flex justify-between items-center mt-8 gap-5">

                        <button className='font-[600] bg-[#22A197] py-2 px-2 text-[14px] text-white  rounded-[8px] w-[100%]'>Auto Change Password</button>

                        <button className='font-[600] bg-[#22A197] py-2 px-2 text-[14px] text-white  rounded-[8px] w-[100%] mt-4 md:mt-0'>Amount change parcels</button>

                        {/* <button className='font-[600] bg-[#22A197] py-2 px-1 text-[14px] text-white  rounded-[8px]'>Parcels By date</button> */}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminSearchUserNumber;