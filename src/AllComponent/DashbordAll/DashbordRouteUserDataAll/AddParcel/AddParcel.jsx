import React from 'react';
import "./AddParcel.css"
import { Link } from 'react-router-dom';
import useRole from '../../../../Hook/useRole';

const AddParcel = () => {

    const [roles] = useRole()
    let { role, Address, BusinessName, name, userId, photo, status } = roles



    return (
       <div className='bg-[#F6F6F6]'>

            {status == "pending" ?

                <h2 className='text-black font-[700] text-center mt-[40px] text-[34px]'>Please Waite, For Admin Approved</h2>
                :
                <div className='AddParcelParent px-[12px] md:px-4 my-4'>
                    <h2 className='text-black text-center text-[18px] pb-[18px] font-[600]'>Choose Service Type</h2>
                    <div className="AddParcel bg-white p-[28px] rounded-[8px]  grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Link to="/dashboard/StandardDelivery" className="ParcelOne bg-[#4E599A] relative rounded-[8px] py-[37px]">
                            <div className='hours bg-[#5A6AC5] absolute'><h3 className='text-white text-[12px]'>24h</h3></div>
                            <h4 className='text-[white] text-center font-[500] text-[14px] pt-[0px]'>Standard</h4>
                            <h4 className='text-[white] text-center text-[12px]'>Delivery</h4>
                        </Link>
                        <Link to="/dashboard/ExpressDelivery" className="ParcelOne bg-[#25A7B7] relative rounded-[8px] py-[37px]">
                            <div className='hours absolute bg-[#09BFD6]'><h3 className='text-white text-[12px]'>8h</h3></div>
                            <h4 className='text-[white] text-center font-[500] text-[14px] pt-[0px]'>Express</h4>
                            <h4 className='text-[white] text-center text-[12px]'>Delivery</h4>
                        </Link>
                        <Link to="/dashboard/ExpressDelivery" className="ParcelOne bg-[#9ad7ae] relative rounded-[8px] py-[37px]">
                            <div className='hours absolute bg-[#B8D6C2]'><h3 className='text-white text-[12px]'>8h</h3></div>
                            <h4 className='text-[white] text-center font-[500] text-[14px] pt-[0px]'>PickNDrop</h4>
                            <h4 className='text-[white] text-center text-[12px]'>Delivery</h4>
                        </Link>

                    </div>

                </div>
            }
        </div>
    );
};

export default AddParcel;