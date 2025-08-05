import React from 'react';
import "./Home.css"
import VideoSlider from '../HomeAllSection/VideoSlider/VideoSlider';
import Hero from '../HomeAllSection/Hero/Hero';
import HeroSection from '../HomeAllSection/HeroSection/HeroSection';
import Banner from '../HomeAllSection/Banner/Banner';
import ServicesDetails from '../HomeAllSection/ServicesDEtails/ServicesDetails';
import ServicesArea from '../HomeAllSection/ServicesArea/ServicesArea';

import OurServices from '../HomeAllSection/OurServices/OurServices';
import ExperienceSection from '../HomeAllSection/ExperienceSection/ExperienceSection';
import ContactSection from '../HomeAllSection/ContactSection/ContactSection';
import Licensed from '../HomeAllSection/Licensed/Licensed';

const Home = () => {
    return (
        <div>
            <VideoSlider />
            {/* <Banner />  Test Component */}

            {/* <Hero />   */} {/*Test Component*/}
            {/* <ServicesDetails /> */} {/*Test Component*/}
            {/* <ServicesArea /> */} {/*Test Component*/}


            <HeroSection />  
            <OurServices />  
            <Licensed /> 
            <ExperienceSection /> 
            <ContactSection />

        </div>
    );
};

export default Home;