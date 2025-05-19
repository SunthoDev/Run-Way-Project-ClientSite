import React from 'react';
import "./ServicesDetails.css"

const ServicesDetails = () => {
    return (
        <div className='ServicesDetails px-2 md:px-24 bg-white text-black'>

            <div className="Services">

                <div className="ServicesCard collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" checked="checked" />
                    <div className="collapse-title text-xl font-medium">
                        <div className="flex gap-4 items-center">
                            <div className="svg">
                                <svg xmlns: svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="32" height="24" viewBox="0 0 32 24" xml: space="preserve"><g transform="matrix(0.05228758,0,0,0.05579799,0,-5.0742123)"><path fill="#22afa3" d="M 21.474,377.522 V 117.138 c 0,-14.469 11.729,-26.199 26.199,-26.199 h 260.25 c 14.469,0 26.198,11.73 26.198,26.199 v 260.385 c 0,4.823 -3.909,8.733 -8.733,8.733 H 30.207 c -4.824,0 -8.733,-3.91 -8.733,-8.734 z m 210.16,89.202 c 0,30.01 -24.329,54.338 -54.338,54.338 -30.009,0 -54.338,-24.328 -54.338,-54.338 0,-30.011 24.329,-54.338 54.338,-54.338 30.009,0 54.338,24.327 54.338,54.338 z m -27.17,0 c 0,-15.005 -12.164,-27.169 -27.169,-27.169 -15.005,0 -27.17,12.164 -27.17,27.169 0,15.005 12.165,27.17 27.17,27.17 15.005,0 27.169,-12.165 27.169,-27.17 z M 130.495,412.385 H 8.733 C 3.91,412.385 0,416.295 0,421.118 v 26.495 c 0,4.823 3.91,8.733 8.733,8.733 h 97.598 c 2.548,-17.484 11.373,-32.928 24.164,-43.961 z m 385.443,54.339 c 0,30.01 -24.329,54.338 -54.338,54.338 -30.01,0 -54.338,-24.328 -54.338,-54.338 0,-30.011 24.328,-54.338 54.338,-54.338 30.009,-0.001 54.338,24.327 54.338,54.338 z m -27.168,0 c 0,-15.005 -12.165,-27.169 -27.17,-27.169 -15.006,0 -27.169,12.164 -27.169,27.169 0,15.005 12.164,27.17 27.169,27.17 15.005,0 27.17,-12.165 27.17,-27.17 z M 612,421.118 v 26.495 c 0,4.823 -3.91,8.733 -8.733,8.733 h -70.704 c -5.057,-34.683 -34.906,-61.427 -70.961,-61.427 -36.062,0 -65.912,26.745 -70.969,61.427 H 248.261 c -2.549,-17.483 -11.373,-32.928 -24.164,-43.961 H 359.091 V 162.594 c 0,-9.646 7.82,-17.466 17.466,-17.466 h 82.445 c 23.214,0 44.911,11.531 57.9,30.77 l 53.15,78.721 c 7.796,11.547 11.962,25.161 11.962,39.094 v 118.672 h 21.253 c 4.823,0 8.733,3.91 8.733,8.733 z M 523.408,256.635 480.907,196.242 c -1.636,-2.324 -4.3,-3.707 -7.142,-3.707 H 407.47 c -4.822,0 -8.733,3.91 -8.733,8.733 v 60.393 c 0,4.824 3.91,8.733 8.733,8.733 h 108.798 c 7.074,0 11.212,-7.973 7.14,-13.759 z"></path></g></svg>
                            </div>
                            <h3 className='text-black font-[700] text-[18px]'>Daily Pick up, No limitations</h3>
                        </div>
                    </div>
                    <div className="collapse-content">
                        <p className="text-[16px] font-[400] pt-[14px]">Steadfast Courier gives you the opportunity of unlimited pickup. You can give any amount of parcels regardless of their size and weight. Also you don’t have to bring your parcels to our office! Our trusted pickup man will visit your location and pick up your parcels on behalf of you. You can request for pickup for every day of the week.</p>
                    </div>
                </div>

                <div className="ServicesCard collapse collapse-arrow bg-white mt-8">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        <div className="flex gap-4 items-center">
                            <div className="svg">
                                <svg xmlns: svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="32" height="26" viewBox="0 0 32 26" xml: space="preserve"><g transform="matrix(0.03368894,0,0,0.03041577,1,-0.5426301)"><path fill="#22afa3" d="m 208.1,180.56 355,-96.9 -18.8,-38 C 532,20.96 502,10.76 477.3,23.06 l -317.8,157.5 z"></path> <path fill="#22afa3" d="m 673.3,86.46 c -4.399,0 -8.8,0.6 -13.2,1.8 L 576.701,111.06 322,180.56 h 289.1 126 l -15.6,-57.2 c -6,-22.3 -26.2,-36.9 -48.2,-36.9 z"></path> <path fill="#22afa3" d="m 789.2,215.56 h -11.4 -15.5 -15.5 -118.3 -434.7 -57 -48 -8.9 -29.8 c -15.8,0 -29.9,7.3 -39.1,18.8 -4.2,5.3 -7.4,11.4 -9.2,18.1 -1.1,4.2 -1.8,8.6 -1.8,13.1 v 6 57 494.1 c 0,27.601 22.4,50 50,50 h 739.1 c 27.601,0 50,-22.399 50,-50 V 683.16 H 542.4 c -46.9,0 -85,-38.1 -85,-85 v -45.8 -15.5 -15.5 -34.4 c 0,-23 9.199,-43.899 24.1,-59.199 13.2,-13.601 30.9,-22.801 50.7,-25.101 3.3,-0.399 6.7,-0.6 10.1,-0.6 h 255.2 15.5 15.5 10.6 v -136.5 c 0.1,-27.6 -22.3,-50 -49.9,-50 z"></path> <path fill="#22afa3" d="m 874.2,449.86 c -5,-4.6 -10.9,-8.1 -17.5,-10.4 -5.101,-1.699 -10.5,-2.699 -16.2,-2.699 h -1.3 -1 -15.5 -55.9 -224.4 c -27.601,0 -50,22.399 -50,50 v 24.899 15.5 15.5 55.4 c 0,27.6 22.399,50 50,50 h 296.8 1.3 c 5.7,0 11.1,-1 16.2,-2.7 6.6,-2.2 12.5,-5.8 17.5,-10.4 10,-9.1 16.3,-22.3 16.3,-36.899 v -111.3 c 0,-14.601 -6.3,-27.802 -16.3,-36.901 z m -227.4,102.5 c 0,13.8 -11.2,25 -25,25 h -16.6 c -13.8,0 -25,-11.2 -25,-25 v -16.6 c 0,-8 3.7,-15.101 9.6,-19.601 4.3,-3.3 9.601,-5.399 15.4,-5.399 h 4.2 12.4 c 13.8,0 25,11.199 25,25 z"></path></g></svg>
                            </div>
                            <h3 className='text-black font-[700] text-[18px]'>Cash on Delivery</h3>
                        </div>
                    </div>
                    <div className="collapse-content">
                        <p className="text-[16px] font-[400] pt-[14px]">At Steadfast Courier we will collect the cash on behalf of you. Our trusted delivery man will deliver your parcel to your customer and collect the money. And then with our various payment methods we will give your money back to you. Also we are giving you the opportunity of sending a non-conditioned parcel to delivery as well.</p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ServicesDetails;