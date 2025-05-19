import React from 'react';
import "./AdminDataEntryUserApproved.css"
import { Link, useLoaderData } from 'react-router-dom';

const AdminDataEntryUserApproved = () => {

    // let data=useLoaderData()
    // console.log(data)





    return (
        <div className='AdminDataEntryUserApproved px-2 md:px-10 pt-10'>
        <h2 className='text-black text-center text-[18px] pb-[6px] font-[600]'>Choose Service Type</h2>
        <div className="DataEntryUserApproved bg-white p-[28px] rounded-[8px]  grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link to={`/dashboard/AdminDashboard/AdminEntryParcelOrApproved`} className="Approved bg-[#4E599A] relative rounded-[8px] py-[37px]">
                <div className='hours bg-[#5A6AC5] absolute'><h3 className='text-white text-[12px]'>24h</h3></div>
                <h4 className='text-[white] text-center font-[500] text-[14px] pt-[0px]'>Standard</h4>
                <h4 className='text-[white] text-center text-[12px]'>Delivery</h4>
            </Link>
            <div className="Approved bg-[#25A7B7] relative rounded-[8px] py-[37px]">
                <div className='hours absolute bg-[#09BFD6]'><h3 className='text-white text-[12px]'>8h</h3></div>
                <h4 className='text-[white] text-center font-[500] text-[14px] pt-[0px]'>Express</h4>
                <h4 className='text-[white] text-center text-[12px]'>Delivery</h4>
            </div>
            


        </div>
            
        
    </div>
    );
};

export default AdminDataEntryUserApproved;