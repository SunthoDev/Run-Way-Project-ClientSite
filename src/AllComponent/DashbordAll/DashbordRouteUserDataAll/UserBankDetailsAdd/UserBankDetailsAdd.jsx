import React from 'react';
import "./UserBankDetailsAdd.css"
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import useRole from '../../../../Hook/useRole';

const UserBankDetailsAdd = () => {

    let BankDetailsAddUserData = useLoaderData()
    //    console.log(BankDetailsAddUserData)
    let { email, _id, name, LastName, userId } = BankDetailsAddUserData
    const [roles] = useRole()
    let { status } = roles


    let handleBankInformationAddUser = (event) => {
        event.preventDefault()

        let BankName = event.target.bankName.value
        let AccountName = event.target.accountName.value
        let AccountNumber = event.target.accountNumber.value
        let BranchName = event.target.branchName.value
        let RoutingNo = event.target.routingNo.value
        let BakashNo = event.target.bkashNum.value
        let RocketNo = event.target.rocketNum.value
        let NagadNo = event.target.nagadNum.value

        let allBankInformationData = { BankName, AccountName, AccountNumber, BranchName, RoutingNo, BakashNo, RocketNo, NagadNo }

        // console.log(allBankInformationData)


        fetch(`http://localhost:5000/UserBankDetailsAddAndUpdate/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(allBankInformationData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your Bank Details Add  Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })


    }





    return (
        <div>
            {status == "pending" ?

                <h2 className='text-black font-[700] text-center mt-[40px] text-[34px]'>Please Waite, For Admin Approved</h2>

                :

                <div className='UserBankDetailsAdd bg-white mx-2 md:mx-6 p-8 my-4 rounded-[8px]'>
                    <h3 className='text-black font-[600] text-center text-[20px] mb-4'>Add Payment Information {name}{LastName}. ID: #{userId}</h3>
                    <div className='BankDetailsAdd w-[100%] md:w-[34%]'>
                        <form onSubmit={handleBankInformationAddUser}>
                            <h3 className='mb-[24px]'>Bank Account Information</h3>
                            <div className="Bank">
                                <h3>Bank Name</h3>
                                <input required defaultValue={BankDetailsAddUserData?.BankName ? BankDetailsAddUserData.BankName : "Please Add Your Bank Name"} name='bankName' className='w-[100%]' type="text" />
                            </div>
                            <div className="Bank">
                                <h3>Account Name</h3>
                                <input required defaultValue={BankDetailsAddUserData?.AccountName ? BankDetailsAddUserData.AccountName : "Please Add Your Account Name"} name='accountName' className='w-[100%]' type="text" />
                            </div>
                            <div className="Bank">
                                <h3>Account Number</h3>
                                <input required defaultValue={BankDetailsAddUserData?.AccountNumber ? BankDetailsAddUserData.AccountNumber : "Please Add Your Account Number"} name='accountNumber' className='w-[100%]' type="text" />
                            </div>
                            <div className="Bank">
                                <h3>Branch Name</h3>
                                <input required defaultValue={BankDetailsAddUserData?.BranchName ? BankDetailsAddUserData.BranchName : "Please Add Your Branch Name"} name='branchName' className='w-[100%]' type="text" />
                            </div>
                            <div className="Bank">
                                <h3>Routing No</h3>
                                <input required defaultValue={BankDetailsAddUserData?.RoutingNo ? BankDetailsAddUserData.RoutingNo : "Please Add Your Routing No"} name='routingNo' className='w-[100%]' type="text" />
                            </div>

                            <h3 className='mt-[24px] mb-[24px]'>Mobile Financial Account</h3>
                            <div className="Bank">
                                <h3>Bkash Number</h3>
                                <input required defaultValue={BankDetailsAddUserData?.BakashNo ? BankDetailsAddUserData.BakashNo : "Please Add Your Bakash Number"} name='bkashNum' className='w-[100%]' type="text" />
                            </div>
                            <div className="Bank">
                                <h3>Rocket Number</h3>
                                <input required defaultValue={BankDetailsAddUserData?.RocketNo ? BankDetailsAddUserData.RocketNo : "Please Add Your Rocket Number"} name='rocketNum' className='w-[100%]' type="text" />
                            </div>
                            <div className="Bank">
                                <h3>Nagad Number</h3>
                                <input required defaultValue={BankDetailsAddUserData?.NagadNo ? BankDetailsAddUserData.NagadNo : "Please Add Your Nogod Number"} name='nagadNum' className='w-[100%]' type="text" />
                            </div>

                            <button className='Submit' type='submit'>Add Bank Details</button>

                        </form>


                    </div>
                </div>
            }
        </div>
    );
};

export default UserBankDetailsAdd;