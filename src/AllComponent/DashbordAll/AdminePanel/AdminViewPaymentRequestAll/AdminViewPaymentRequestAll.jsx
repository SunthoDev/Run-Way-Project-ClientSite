import React from 'react';
import "./AdminViewPaymentRequestAll.css"
import { useQuery } from '@tanstack/react-query';
import AdminViewPaymentUnPaidAllData from './AdminViewPaymentUnPaidAllData/AdminViewPaymentUnPaidAllData';
import AdminViewPaymentPaidAllData from './AdminViewPaymentPaidAllData/AdminViewPaymentPaidAllData';

const AdminViewPaymentRequestAll = () => {

    // user data all find use tenStack query 
    let { refetch, data: PaymentRequestDataAll = [] } = useQuery(["AdminAllPaymentRequestData"], async () => {
        let res = await fetch("http://localhost:5000/AdminAllPaymentRequestData")
        return res.json()

    })

    // console.log(PaymentRequestDataAll)

    // Approved User
    let UnPaidPayment = PaymentRequestDataAll.filter(Approved => Approved.Payment == "UnPaid")
    // console.log(UnPaidPayment)

    // UnApproved User
    let PaidPayment = PaymentRequestDataAll.filter(Pending => Pending.Payment == "Paid")
    // console.log(PaidPayment)



    return (
        <div className='AdminViewPaymentRequestAll mx-8 my-8'>

            <div className='UnPaid'>
            <h3 className='text-black text-[24px] font-[600] text-center'>Payment Request All UnPaid Data</h3>
                <h3 className='TotalData text-left'>Total UnPaid Payment: {UnPaidPayment.length}</h3>
                {
                    UnPaidPayment.map(UnPaidAllData => <AdminViewPaymentUnPaidAllData key={UnPaidAllData._id} UnPaidAllData={UnPaidAllData} refetch={refetch}></AdminViewPaymentUnPaidAllData>)
                }

            </div>

            <div className='Paid mt-14'>
                <h3 className='text-black text-[24px] font-[600] text-center'>Payment Request All Paid Data</h3>
                <h3 className='TotalData text-left'>Total Paid Payment: {PaidPayment.length}</h3>

                {
                    PaidPayment.map(PaidAllData => <AdminViewPaymentPaidAllData key={PaidAllData._id} PaidAllData={PaidAllData} refetch={refetch}></AdminViewPaymentPaidAllData>)
                }
            </div>

        </div>
    );
};

export default AdminViewPaymentRequestAll;