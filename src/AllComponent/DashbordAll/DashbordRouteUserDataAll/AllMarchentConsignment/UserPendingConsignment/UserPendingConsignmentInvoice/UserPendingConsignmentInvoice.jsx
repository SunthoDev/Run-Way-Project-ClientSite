import React from 'react';
import "./UserPendingConsignmentInvoice.css"
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

const UserPendingConsignmentInvoice = () => {

    let data = useLoaderData()
    //   console.log(data)
    let { _id, weight, status, policeStation, number, note, name, district, date, address, StandardParcelId, StandardEmailUser, Invoice, CodAmount,DeliveryCharge ,ApprovedDate,ApprovedName,ApprovedOffice} = data

    // console.log(data)

    return (
        <div className='AdminSearchStandardParcelUser px-2 md:px-10 py-10'>
            <div className="StandardMain bg-white rounded-[8px] p-[28px]">


                <div className="flex justify-between w-[100%] md:w-[60%] md:ml-auto items-center">
                    <h2 className='text-left font-[700] text-black text-[20px] '>ID #{StandardParcelId} </h2>

                    <div className="flex items-center gap-5">
                        <button className='text-black bg-[#ffc107] py-[6px] px-[13px] text-[16px] rounded-[7px]  font-[500]'>Invoice</button>

                        <Link to={`/dashboard/UserConsignmentPendingInvoiceUpdate/${_id}`} className='text-white bg-[#17838C] rounded-[7px] py-[6px] px-[13px] text-[16px] font-[500]'>Edite</Link>
                        
                    </div>
                </div>

                <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>

                <div className="flex justify-between mt-6">
                    <h3 className='text-[16px] font-[500] text-black'>Merchant: <span className="text-white bg-[#17838C] rounded-[7px] py-[6px] px-[13px] text-[16px] font-[500]'">{name}</span></h3>
                    <button className='text-black bg-[#ffc107] py-[6px] px-[13px] text-[16px] rounded-[7px]  font-[500]'>Print</button>
                </div>

                <div className="flex justify-between mt-2">
                    <h3 className='text-[16px] font-[500] text-black'>Category: Regular <span className="text-white bg-[#17838C] rounded-[7px] py-[4px] px-[13px] text-[16px] font-[500]'">Update</span></h3>
                    <h3 className='text-left font-[700] text-black text-[19px]'>৳ {CodAmount}</h3>
                </div>

                <div className="flex justify-between mt-4">
                    <h3 className='text-[16px] font-[500] text-black'>Delivery Type: Home Delivery<span className="text-white bg-[#ffc107] rounded-[7px] py-[4px] px-[13px] text-[16px] font-[500]'">Change</span></h3>
                    <div className="flex items-center gap-5">
                        <button className='text-black bg-[#ffc107] py-[6px] px-[13px] text-[16px] rounded-[7px]  font-[500]'>Pending</button>
                        <button className='text-white bg-[#17838C] rounded-[7px] py-[6px] px-[13px] text-[16px] font-[500]'>Mark as Urgent</button>
                    </div>

                </div>

                <div className="flex justify-between mt-2">
                    <div className="">
                        <h3 className='text-[16px] font-[500] text-black'>Entry: {date}</h3>
                        <h3 className='text-left font-[500] text-black text-[16px]'>Approved: {ApprovedDate}</h3>
                    </div>
                    <button className='text-black bg-[#f8f9fa] rounded-[7px] py-[6px] px-[13px] text-[16px] font-[500]'>Re-Schedule</button>

                </div>

                <h3 className='text-[16px] font-[500] text-black mt-1'>Invoice: {Invoice}</h3>
                <h3 className='text-[16px] font-[500] text-black mt-1'>Weight: {weight}KG</h3>
                <h3 className='text-[16px] font-[500] text-black mt-1'>Delivery cost: {DeliveryCharge}tk</h3>
                <button className='text-white bg-[#17838C] rounded-[7px] py-[6px] px-[13px] text-[16px] font-[500] mt-2'>Paid By Cash</button>

                <h3 className='text-[16px] font-[500] text-black mt-6'>Name: {name}</h3>
                <h3 className='text-[16px] font-[500] text-black mt-1'>Address: {address}</h3>
                <h3 className='text-[16px] font-[500] text-black mt-6'>Police Station: {policeStation}</h3>
                <h3 className='text-[16px] font-[500] text-black mt-1'>Phone Number: {number}</h3>

                <h3 className='text-[16px] font-[500] text-black mt-6'>Tracking Code: 3C7ADD84D</h3>


                {/* jode updare hoy ja update korva tar details and date info sob hova */}
                {/* <h3 className='text-[16px] font-[500] text-black mt-6'>Last Update: last update date hova</h3> */}
                <h3 className='text-[16px] font-[500] text-black mt-6'>Entry By: {ApprovedName}</h3>
                <h3 className='text-[16px] font-[500] text-black mt-1'>Entry Hub: {ApprovedOffice}</h3>
                <button className='text-white bg-red-700 rounded-[7px] py-[6px] px-[13px] text-[16px] font-[500] mt-1'>Report Wrong Entry</button>
                <h3 className='text-[16px] font-[500] text-black mt-1'>Updated By : {ApprovedName}</h3>

                {/* ===============================  */}

                <h2 className='text-center bg-[#F3F3F3] text-black text-[20px] font-[600] py-[12px] mt-[44px]'>Assign To</h2>
                <h3 className='mt-[26px] text-[16px] font-[500] text-black'>Zone: Not Assigned</h3>
                <h2 className='text-center bg-[#F3F3F3] text-black text-[20px] font-[600] py-[12px] mt-[44px]'>Note</h2>
                <h3 className='mt-[26px] text-[16px] font-[500] text-black'>{Invoice}</h3>
            </div>
        </div>
    );
};

export default UserPendingConsignmentInvoice;