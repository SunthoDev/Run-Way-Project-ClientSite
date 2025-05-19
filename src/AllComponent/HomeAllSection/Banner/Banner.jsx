import React from 'react';
import "./Banner.css"
import bannerPhoto from "../../../assets/BannerImage/bannerPhoto.png"

const Banner = () => {

    return (
        <div className="banner">

            <div className="px-2 md:px-24  relative pt-48">

                <div className="grid grid-cols-1 md:grid-cols-7 gap-5 items-center">

                    <div className=" bannerText  col-span-4 order-2 md:order-1">
                        <h1 className='text-3xl'>test</h1>
                        <h2 className="text-white font-[700] text-[44px]">Runwaya Parcel Delivered</h2>
                        <h2 className="text-white font-[700] leading-[44px] text-[44px]">On Time With No Hassle</h2>
                        <p className='text-[16px] text-white font-[400] pt-[24px]'>Easily track your courier, Get courier within hours. Efficient & safe delivery for Runwaya.</p>
                        <button className='text-[#22afa3] bg-white py-[10px] px-[20px] rounded-[6px] text-[16px] mt-[8px] font-[600] text-center '>GON NOW MERCHANT</button>
                    </div>

                    <div className="img col-span-3 order-1 md:order-2 w-[100%]">
                        <img className='w-[100%] h-[100%]' src={bannerPhoto} alt="img" />
                    </div>
                </div>

                <div className="trackLocations bg-white rounded-[7px] mx-[0px] lg:mx-[180px] md:my-[114px] mb-[144px]">
                    <div className="md:flex gap-5 mb-2">
                        <h3 className='text-[16px] font-[700]'>TRACK YOUR CONSIGNMENT</h3>
                        <h4 className='text-[14px] font-[400]'>Now you can easily track your consignment</h4>
                    </div>

                    <div className="flex gap-4 items-center">
                        
                        <input placeholder='Enter Your  Tracking Code' className='text-black rounded-[3px] text-[16px] font-[500] w-[145%]' type="text" />

                        <i className="bg-[#38B6FF] text-center  py-[14px] w-[100%] rounded-[6px] text-white text-[16px] fa fa-search" aria-hidden="true"></i>
                    </div>

                </div>



            </div>

        </div>
    );
};

export default Banner