import React, { useState } from 'react';
import "./AdminCoveragesDistricts.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AdminCoveragesDistricts = () => {

    let [poup, setPoup] = useState(false)
    const clseAlertButton = () => {
        setPoup(false)
    }
    const handlePoliceStationAdd = () => {
        setPoup(true)
    }
    // =============================================

    // user data all find use tenStack query 
    let { refetch, data: AllCoveragesDistricts = [] } = useQuery(["CoveragesDistrictsAll"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/CoveragesDistrictsAll")
        return res.json()

    })
    // console.log(AllCoveragesDistricts)


    let handleUserPaymentRequest = (event) => {
        event.preventDefault()
        let AddDistrict = event.target.District.value
        let AddPoliceStation = event.target.PoliceStation.value
        let Data={AddDistrict,AddPoliceStation}
        // console.log(Data)

        fetch("https://server.trustereocourier.com.bd/AdminAddPoliceStationCoverage",{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(Data)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'New PoliceStation Add Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Already Add PoliceStation',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                
            })

    }   

    return (
        <div className='AdminCoveragesDistricts bg-white my-14  md:w-[58%] rounded-[8px] w-[100%] mx-auto '>
            <h2>Districts ( {AllCoveragesDistricts.length} )</h2>

            <div className='CoveragesDistricts px-[20px] py-[14px]'>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>NAME</th>
                                <th>ADD POLICE STATION</th>
                                <th>EDIT</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                AllCoveragesDistricts.map(DistrictAll =>

                                    <tr className='TableData'>

                                        <td> <h4>{DistrictAll.DistrictID}</h4></td>
                                        <td> <h4>{DistrictAll.DistrictName}</h4></td>
                                        <td> <h3 onClick={handlePoliceStationAdd} className="AddButton">ADD PS</h3></td>
                                        <td> <h3 className="AddButton">View</h3></td>

                                    </tr>

                                )
                            }


                        </tbody>

                    </table>
                </div>

            </div>

            {/* ============================================= */}

            <div className={`alertContainer rounded-[8px]  px-4  lg:px-0 w-full lg:w-[34%]  ${poup === true && "showAlertJs"}`} >

                <div className="poup ">
                    <div className="popInfo px-4 py-4 mt-3">

                        <h6>Payment Request</h6>

                        <form onSubmit={handleUserPaymentRequest}>

                            <h3 className='mt[24px] pb-[6px] text-black font-[600] text-[16px]'>Distric</h3>
                            <select required name='District' className="select select-bordered w-[100%] max-w-xs ">
                                <option disabled selected>Habiganj</option>
                                <option>Bagerhat</option>
                                <option>Bandarban</option>
                                <option>Barguna</option>
                                <option>Barishal</option>
                                <option>Bhola</option>
                                <option>Bogra</option>
                                <option>Brahmanbaria</option>
                                <option>Chandpur</option>
                                <option>Chapainawabganj</option>
                                <option>Chittagong</option>
                                <option>Chuadanga</option>
                                <option>Cox's Bazar</option>
                                <option>Cumilla</option>
                                <option>Dhaka City</option>
                                <option>Dhaka Sub-Urban</option>
                                <option>Dinajpur</option>
                                <option>Faridpur</option>
                                <option>Feni</option>
                                <option>Gaibandha</option>
                                <option>Gazipur</option>
                                <option>Gopalganj</option>
                                <option>Jamalpur</option>
                                <option>Jashore</option>
                                <option>Jhalokati</option>
                                <option>Jhenaidah</option>
                                <option>Joypurhat</option>
                                <option>Khagrachori</option>
                                <option>Khulna</option>
                                <option>Kishoreganj</option>
                                <option>Kurigram</option>
                                <option>Kustia</option>
                                <option>Lalmonirhat</option>
                                <option>Laxmipur</option>
                                <option>Madaripur</option>
                                <option>Magura</option>
                                <option>Manikganj</option>
                                <option>Meherpur</option>
                                <option>Moulvibazar</option>
                                <option>Munshiganj</option>
                                <option>Mymenshingh</option>
                                <option>Naogaon</option>
                                <option>Narail</option>
                                <option>Narayanganj</option>
                                <option>Narshindi</option>
                                <option>Natore</option>
                                <option>Netrokona</option>
                                <option>Nilphamari</option>
                                <option>Noakhali</option>
                                <option>Pabna</option>
                                <option>Panchgarh</option>
                                <option>Patuakhali</option>
                                <option>Pirojpur</option>
                                <option>Rajbari</option>
                                <option>Rajshahi</option>
                                <option>Rangamati</option>
                                <option>Rangpur</option>
                                <option>Shariatpur</option>
                                <option>Shatkhira</option>
                                <option>Sherpur</option>
                                <option>Sirajganj</option>
                                <option>Sunamganj</option>
                                <option>Sylhet</option>
                                <option>Tangail</option>
                                <option>Thakurgaon</option>
                            </select>
                            <h3 className='pt[18px] pb-[6px] text-black font-[600] text-[16px]'>Police Station Type</h3>
                            <input required className='w-[100%] px-4' name='PoliceStation' type="text" placeholder='Type Police Station' />


                            <button type='submit' className='UpdateButton' >Add Now</button>

                        </form>

                    </div>
                    <button onClick={clseAlertButton} className="removeAlertBtn"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                </div>

            </div>

            {/* ============================================= */}


        </div>
    );
};

export default AdminCoveragesDistricts;
