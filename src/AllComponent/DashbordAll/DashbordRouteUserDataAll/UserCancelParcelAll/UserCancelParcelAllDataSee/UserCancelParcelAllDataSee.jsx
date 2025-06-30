import React from 'react';
import "./UserCancelParcelAllDataSee.css"
import { Link } from 'react-router-dom';

const UserCancelParcelAllDataSee = ({ cancelAllData, refetch }) => {

    let { CodAmount, Invoice, StandardEmailUser, StandardParcelId, address, date, district, name, note, number, policeStation, status, weight, _id } = cancelAllData

    return (
        <Link to={`/dashboard/UserTemporeryInvoiceAllStandardData/${StandardParcelId}`}  className='UserCancelParcelAllDataSee'>

            <div className='CancelParcelAllDataSee'>

                <div className="CancelData grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

                    <div className="One">
                        <h3>ID: #{StandardParcelId}</h3>
                        <h3>{date}</h3>
                        {/* <h3>Last Update</h3>
                        <h3>21/10/23 6:46:58 pm</h3> */}
                    </div>
                    <div className="Tow">
                        <h3>{name}</h3>
                        <h3>{address}</h3>
                        <h3>{number}</h3>
                        <button className='NotAssigned'>Not Assigned</button>

                    </div>
                    <div className="Three">
                        <h3>Cod Amount: {CodAmount}</h3>
                        <h3>Charge: 150</h3>
                        <button className='Pending'>{status}</button>
                        <br />
                        <div className="">
                            <button className='Unassigned'>Unassigned</button>
                            {/* <button className='Zero'>0</button> */}
                        </div>
                        {/* <button className='Zero'>0</button> */}

                    </div>


                </div>


            </div>
        </Link>
    );
};

export default UserCancelParcelAllDataSee;