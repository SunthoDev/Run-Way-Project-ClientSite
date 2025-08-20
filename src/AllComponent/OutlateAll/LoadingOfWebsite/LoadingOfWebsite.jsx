import React from 'react';
import "./LoadingOfWebsite.css"

const LoadingOfWebsite = () => {
    return (
        <div className="LoadingComponentParent">
            <div className="loading-overlay">
                {/* <div className="loading-animation">
                <div className="loading-text">MoneyFly</div>
            </div> */}

                <div class="loading-container">
                    <div class="loading-text">
                        <span>T</span>
                        <span>R</span>
                        <span>U</span>
                        <span>S</span>
                        <span>T</span>
                        <span>E</span>
                        <span>R</span>
                        <span>E</span>
                        <span>O</span>
                    </div>
                </div>
                <div class="socials">
                    <a class="social-link" href="#" target="_top">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                        </svg>
                    </a>
                    <a class="social-link" href="#" target="_top">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                    </a>
                </div>


                {/* ====================================== */}
            </div>
        </div>
    );
};

export default LoadingOfWebsite;