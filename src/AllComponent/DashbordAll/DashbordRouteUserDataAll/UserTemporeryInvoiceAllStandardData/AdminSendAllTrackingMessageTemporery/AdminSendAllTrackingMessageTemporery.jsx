import React from 'react';
import "./AdminSendAllTrackingMessageTemporery.css"

const AdminSendAllTrackingMessageTemporery = ({messageAllData}) => {
    // console.log(messageAllData)
    let { TrackingDate, TrackingTime, TrackingMessage, userOrderIdTracking, _id } = messageAllData

    return (
        <div className='AllTrackingMessageShow mt-[4px]'>

            <div className="TimelineItem">
                <div className="Line">
                    <div className="Overlay"></div>
                    <div className="OverlayTow"></div>
                </div>

                <div className="Message">
                    <h3>{TrackingDate}, {TrackingTime}</h3>
                    <h4>{TrackingMessage}</h4>
                </div>

            </div>

        </div>
    );
};

export default AdminSendAllTrackingMessageTemporery;