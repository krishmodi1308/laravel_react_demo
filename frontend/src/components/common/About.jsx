import React from 'react';
import AboutImg from "../../assets/images/about-us.jpg";

const About = () => {
    return (
        <section className='section-2 futuristic-about py-5'>
            <div className='container py-5'>
                <div className='row align-items-center'>
                    <div className='col-md-6'>
                        <div className='about-image-wrapper'>
                            <img src={AboutImg} alt="About us" className='about-image' />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='about-content'>
                            <span className='subtitle'>About Us</span>
                            <h2 className='title'>Crafting Structures That Last a Lifetime</h2>
                            <p>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem Ipsum has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'.
                            </p>
                            <p>
                                Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text. Various versions have evolved over the years, sometimes by accident.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;
