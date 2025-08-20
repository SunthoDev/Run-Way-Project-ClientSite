import React, { useState } from 'react';
import "./DashboardItemAdmin.css"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';

const DashboardItemAdmin = () => {

    let [useId, setUserId] = useState("")
    let [Standard, setStandard] = useState("")
    let [Number, setNumber] = useState("")
    let [PaymentId, setPaymentId] = useState("")

    // admin find user profile id
    let handleAdminUserIdFind = (event) => {
        setUserId(event.target.value)
    }
    // admin find user standard parcel id
    let handleAdminStandardParcelIdFind = (event) => {
        setStandard(event.target.value)
    }
    // admin find user standard parcel id
    let handleAdminUserNumberFind = (event) => {
        setNumber(event.target.value)
    }
    // admin find payment Id
    let handleAdminPaymentIdFind = (event) => {
        setPaymentId(event.target.value)
    }



    return (
        <div className='DashboardItemAdmin px-2 md:px-10 py-10'>
            <div className="DashboardItem bg-white p-[28px] rounded-[8px]  grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* search Parcel ID !! */}
                {/* =================================================================== */}
                <div className="item">
                    <h3 className='text-[17px] font-[500] text-black mb-[8px]'>Search Parcel ID</h3>
                    <div className="relative">
                        <input onBlur={handleAdminStandardParcelIdFind} className='w-[100%]' placeholder='type only customer id here' type="text" />

                        <Link to={`AdminSearchStandardParcelId/${Standard}`} className='absolute top-[12px] right-[20px]'>
                            <button disabled={Standard === ""}>
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </button>admin

                        </Link>
                    </div>
                </div>

                {/* search User ID !! */}
                {/* =================================================================== */}
                <div className="item">
                    <h3 className='text-[17px] font-[500] text-black mb-[8px]'>Search user by Id and Number!!</h3>
                    <div className="relative">
                        <input onBlur={handleAdminUserIdFind} className='w-[100%]' placeholder='Search user id and number' type="text" />
                        <Link to={`AdminSearchUserId/${useId}`} className='absolute top-[12px] right-[20px]'>
                            <button disabled={useId === ""}>
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* search Payment ID !! */}
                {/* =================================================================== */}
                <div className="item">
                    <h3 className='text-[17px] font-[500] text-black mb-[8px]'>Search Payment ID</h3>
                    <div className="relative">
                        <input onBlur={handleAdminPaymentIdFind} className='w-[100%]' placeholder='type Tracking  id here' type="text" />
                        <Link to={`/dashboard/AdminDashboard/AdminPaymentRequestDetailsAll/${PaymentId}`} className='absolute top-[12px] right-[20px]'>
                            <button disabled={PaymentId === ""}>
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* search Tracking ID !! */}
                {/* =================================================================== */}
                <div className="item">
                    <h3 className='text-[17px] font-[500] text-black mb-[8px]'>Search Tracking ID</h3>
                    <div className="relative">
                        <input className='w-[100%]' placeholder='type only Ticket  id here' type="text" />
                        <button className='absolute top-[12px] right-[20px]'>
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

            </div>

            {/* Consignment Parcel search by number !! */}
            {/* =================================================================== */}
            {/* <div className="Consignment bg-white p-[28px] rounded-[8px]  flex mt-8">

                <div className="relative w-[100%]">
                    <input onBlur={handleAdminUserNumberFind} className='w-[100%] py-1' placeholder='Search User Number' type="text" />
                    <Link to={`AdminSearchUserNumber/${Number}`} className='absolute top-[12px] right-[20px]'>
                        <button disabled={Number === ""}>
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </Link>
                </div>


                <select className="select  w-[50%] md:w-[20%] max-w-xs">
                    <option disabled selected>Consignment</option>
                    <option>Consignment</option>
                    <option>Merchant</option>
                </select>

            </div> */}

            {/* =================================================================== */}
            {/* Send Tracking Message To bellow !! */}
            {/* =================================================================== */}
            {/* <div className="TrackingAllData mt-8">
                <h2 className='text-black font-[500] text-center mb-[14px] text-[24px]'>The Admin will Send Message id number</h2>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    let mes1 = event.target.message1.value
                    let mes2 = event.target.message2.value
                    let mes3 = event.target.message3.value
                    let mes4 = event.target.message4.value
                    let mes5 = event.target.message5.value
                    let mes6 = event.target.message6.value
                    let mes7 = event.target.message7.value
                    let mes8 = event.target.message8.value
                    let mes9 = event.target.message9.value
                    let mes10 = event.target.message10.value
                    let mes11 = event.target.message11.value
                    let mes12 = event.target.message12.value
                    let mes13 = event.target.message13.value
                    let mes14 = event.target.message14.value
                    let mes15 = event.target.message15.value
                    let mes16 = event.target.message16.value
                    let mes17 = event.target.message17.value
                    let mes18 = event.target.message18.value
                    let TrackingDate = moment().format("MM/D/YY , hh:mm A")

                    let TrackingMessage = event.target.MessageTracking.value
                    let allMessageValue = { mes1, mes2, mes3, mes4, mes5, mes6, mes7, mes8, mes9, mes10, mes11, mes12, mes13, mes14, mes15, mes16, mes17, mes18, TrackingMessage, TrackingDate }
                    // console.log(allMessageValue)

                    fetch("https://server.trustereocourier.com.bd/AdminTrackingSendMessage", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(allMessageValue)
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data)
                            if (data.insertedCount > 0) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'you is send message success full',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                            event.target.reset()
                        })
                }}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input name='message1' type="number" placeholder='user number id' />
                        <input name='message2' type="number" placeholder='user number id' />
                        <input name='message3' type="number" placeholder='user number id' />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input name='message4' type="number" placeholder='user number id' />
                        <input name='message5' type="number" placeholder='user number id' />
                        <input name='message6' type="number" placeholder='user number id' />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input name='message7' type="number" placeholder='user number id' />
                        <input name='message8' type="number" placeholder='user number id' />
                        <input name='message9' type="number" placeholder='user number id' />
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input name='message10' type="number" placeholder='user number id' />
                        <input name='message11' type="number" placeholder='user number id' />
                        <input name='message12' type="number" placeholder='user number id' />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input name='message13' type="number" placeholder='user number id' />
                        <input name='message14' type="number" placeholder='user number id' />
                        <input name='message15' type="number" placeholder='user number id' />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input name='message16' type="number" placeholder='user number id' />
                        <input name='message17' type="number" placeholder='user number id' />
                        <input name='message18' type="number" placeholder='user number id' />
                    </div>

                    <textarea name="MessageTracking" id="" cols="30" rows="10"></textarea>
                    <br />
                    <button type="submit"> Send Message</button>
                </form>

            </div> */}


        </div>
    );
};

export default DashboardItemAdmin;