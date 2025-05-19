import React from 'react';
import "./AdminSendAllTrackingMessageTemporery.css"

const AdminSendAllTrackingMessageTemporery = ({messageAllData}) => {
     // console.log(messageAllData)
     let {TrackingDate,TrackingMessage, userOrderIdTracking, _id}=messageAllData
    return (
        <div className='AllMessageShow mt-[18px]'>
            
            <div className="grid grid-cols-3 ">
                <h3>{TrackingDate}</h3>
                <div className="Line">
                    <div className="Overlay"></div>
                    <div className="OverlayTow"></div>
                </div>
                <h3>{TrackingMessage}</h3>

            </div>
            
        </div>
    );
};

export default AdminSendAllTrackingMessageTemporery;