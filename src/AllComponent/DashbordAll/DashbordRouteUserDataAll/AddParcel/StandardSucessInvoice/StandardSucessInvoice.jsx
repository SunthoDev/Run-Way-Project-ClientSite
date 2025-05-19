import React, { useContext } from 'react';
import "./StandardSucessInvoice.css"
import { AuthContext } from '../../../../AuthoncationAll/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const StandardSucessInvoice = () => {

    let { user ,StandardId} = useContext(AuthContext)
    // console.log(StandardId)


    
    let { refetch, data: InVoiceData = [] } = useQuery(["StandardDeliveryData"], async () => {
        let res = await fetch(`http://localhost:5000/StandardDeliveryData?StandardParcelId=${StandardId}`)
        return res.json()

    })


// console.log(InVoiceData)

let {_id,weight,status,policeStation,number,note,name,district,date,address,StandardParcelId,StandardEmailUser,Invoice,CodAmount}=InVoiceData

    
    return (
        <div className='AdminSearchStandardParcelUser px-2 md:px-10 py-10'>

            <div className="StandardMain bg-white rounded-[8px] p-[28px]">

                <h2 className='bg-[#D1ECF1] text-left font-[600] text-black py-[12px] px-[22px] text-[16px] rounded-[8px]'>Please mention this Consignment ID ({StandardParcelId}) on parcel.</h2>

                <div className="flex justify-center gap-3 mt-8">
                    <button className='text-black bg-[#ffc107] py-[8px] px-[13px] text-[16px] rounded-[7px]  font-[500]'>Print this Order</button>
                    <button className='text-white bg-[#17838C] rounded-[7px] py-[8px] px-[13px] text-[16px] font-[500]'>New Order</button>
                </div>
                <div className="flex justify-between ml-auto w-[100%] md:w-[60%]">

                    <h3 className='text-black  font-[600] text-[18px] pt-[16px]'>ID #{StandardParcelId} (Standard)</h3>

                    <button className='text-white bg-[#138496] py-[8px] px-[13px] rounded-[6px] text-[14px] font-[500]'>Edite</button>
                </div>
                <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>

                <div className="flex justify-between mt-2">
                    <h3 className='text-[16px] font-[500] text-black'>{date}</h3>
                    <h4 className='text-[20px] font-[600] text-black'>৳ {CodAmount}</h4>
                </div>

                <div className="flex justify-between">
                    <h3 className='text-[16px] font-[500] text-black'>Invoice: {Invoice}</h3>
                    <div className="div">
                        <button className='text-white bg-[#FA6969] py-[6px] px-[12px] rounded-[12px] text-[14px] font-[500] mt-[10px]'>In Review</button>
                        <br />
                        <button className='text-white py-[6px] px-[12px] bg-black rounded-[7px] text-[14px] font-[500] mt-[8px]'>Delete</button>
                    </div>
                </div>
                <h3 className='text-[16px] font-[500] text-black'>{name}</h3>
                <h3 className='text-[16px] font-[500] text-black'>{address}</h3>
                <h3 className='text-[16px] mt-[18px] font-[500] text-black'>Phone Number: {number}</h3>
                <h3 className='text-[16px] font-[500] text-black'>Tracking Code: 3C7ADD84D</h3>
                <h2 className='text-center bg-[#F3F3F3] text-black text-[20px] font-[600] py-[12px] mt-[44px]'>Assign To</h2>
                <h3 className='mt-[26px] text-[16px] font-[500] text-black'>Zone: Not Assigned</h3>
                <h2 className='text-center bg-[#F3F3F3] text-black text-[20px] font-[600] py-[12px] mt-[44px]'>Note</h2>
                <h3 className='mt-[26px] text-[16px] font-[500] text-black'>{Invoice}</h3>
            </div>
            
        </div>
    );
};

export default StandardSucessInvoice;