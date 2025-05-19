import React from 'react';
import "./Main.css"
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import kornofuliIcon from "../../../assets/ShipAllImage/baroawliaIcon.png"
// import baroawliaIcon from "../../../assets/ShipAllImage/kornofuliIcon.png"




const Main = () => {

    let location = useLocation();
    const isAuthPage = location.pathname.includes("login") || location.pathname.includes("singUp");
    // const isAuthPage = location.pathname.includes("login")




    return (
        <div>
            {!isAuthPage && <Header></Header>}


            {/* <div className="KarnofuliIcons">
                <img src={kornofuliIcon} alt="img" />
                <p>karnafuly</p>
            </div>

            <div className="Baroawlia">
                <img src={baroawliaIcon} alt="img" />
                <p>Baro<br/>awlia</p>
            </div>

            <div className="PhoneCall">
            <i class="fa fa-phone" aria-hidden="true"></i>
            </div>

            <div className="messenger">
            </div> */}


            <Outlet></Outlet>

            {!isAuthPage && <Footer></Footer>}

        </div>
    );
};

export default Main;