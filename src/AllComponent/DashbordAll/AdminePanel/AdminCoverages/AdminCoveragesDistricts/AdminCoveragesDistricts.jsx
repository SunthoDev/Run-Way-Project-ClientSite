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

    // ================================
    // All District Data Find!!
    // ================================
    let { refetch, data: AllCoveragesDistricts = [] } = useQuery(["CoveragesDistrictsAll"], async () => {
        let res = await fetch("http://localhost:5000/CoveragesDistrictsAll")
        return res.json()

    })
    // console.log(AllCoveragesDistricts)

    // ==========================================
    // Police Stations Add With District!!
    // ==========================================
    let handlePoliceStationsAdd = (event) => {
        event.preventDefault()
        let AddDistrict = event.target.District.value
        let AddPoliceStation = event.target.PoliceStation.value
        let Data = { AddDistrict, AddPoliceStation }
        // console.log(Data)

        fetch("http://localhost:5000/AdminAddPoliceStationCoverage", {
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
                else {
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AllCoveragesDistricts.map(DistrictAll =>
                                    <tr className='TableData'>
                                        <td> <h4>{DistrictAll.DistrictID}</h4></td>
                                        <td> <h4>{DistrictAll.DistrictName}</h4></td>
                                        <td> <h3 onClick={handlePoliceStationAdd} className="AddButton">ADD PS</h3></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>

            {/* ============================================= */}
            {/* Police station Add with District (Modal) */}
            {/* ============================================= */}

            <div className={`alertContainer rounded-[8px]  px-4  lg:px-0 w-full lg:w-[34%]  ${poup === true && "showAlertJs"}`} >
                <div className="poup ">
                    <div className="popInfo px-4 py-4 mt-3">
                        <h6>Police Stations Add!!</h6>
                        <form onSubmit={handlePoliceStationsAdd}>
                            <h3 className='mt[24px] pb-[6px] text-black font-[600] text-[16px]'>Distric</h3>
                            <select required name='District' className="select select-bordered w-[100%] max-w-xs ">
                                <option disabled selected>Selected District</option>
                                <option>Bogra</option>
                                <option>Habiganj</option>
                                <option>Sylhet</option>
                                <option>Chattogram</option>
                                <option>Kishoreganj</option>
                                <option>Lakshmipur</option>
                                <option>Pabna</option>
                                <option>Pirojpur</option>
                                <option>Shariatpur</option>
                                <option>Thakurgaon</option>
                                <option>Joypurhat</option>
                                <option>Munshiganj</option>
                                <option>Rangamati</option>
                                <option>Bandarban</option>
                                <option>Dinajpur</option>
                                <option>Mymensingh</option>
                                <option>Nilphamari</option>
                                <option>Noakhali</option>
                                <option>Rajbari</option>
                                <option>Chuadanga</option>
                                <option>Jhalokati</option>
                                <option>Narsingdi</option>
                                <option>Jashore</option>
                                <option>Manikganj</option>
                                <option>Sherpur</option>
                                <option>Sirajganj</option>
                                <option>Gopalganj</option>
                                <option>Jamalpur</option>
                                <option>Khagrachhari</option>
                                <option>Naogaon</option>
                                <option>Narayanganj</option>
                                <option>Panchagarh</option>
                                <option>Chandpur</option>
                                <option>Cox's Bazar</option>
                                <option>Gaibandha</option>
                                <option>Rajshahi</option>
                                <option>Bagerhat</option>
                                <option>Feni</option>
                                <option>Magura</option>
                                <option>Sunamganj</option>
                                <option>Barishal</option>
                                <option>Cumilla</option>
                                <option>Madaripur</option>
                                <option>Chapainawabganj</option>
                                <option>Khulna</option>
                                <option>Moulvibazar</option>
                                <option>Natore</option>
                                <option>Rangpur</option>
                                <option>Satkhira</option>
                                <option>Dhaka</option>
                                <option>Tangail</option>
                                <option>Lalmonirhat</option>
                                <option>Meherpur</option>
                                <option>Gazipur</option>
                                <option>Kurigram</option>
                                <option>Netrokona</option>
                                <option>Barguna</option>
                                <option>Kushtia</option>
                                <option>Patuakhali</option>
                                <option>Bhola</option>
                                <option>Brahmanbaria</option>
                                <option>Faridpur</option>
                                <option>Jhenaidah</option>
                                <option>Narail</option>
                            </select>
                            <h3 className='pt[18px] pb-[6px] text-black font-[600] text-[16px]'>Police Station Type</h3>
                            <input required className='w-[100%] px-4' name='PoliceStation' type="text" placeholder='Type Police Station' />
                            <button type='submit' className='UpdateButton'>Submit</button>
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
