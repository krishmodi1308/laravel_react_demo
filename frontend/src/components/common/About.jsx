import React from 'react'
import AboutImg from "../../assets/images/about-us.jpg";

const About = () => {
    return (
        <>
            <section className='section-2 py-5'>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <img src={AboutImg} className='w-100' />
                        </div>
                        <div className='col-md-6'>
                                <span>
                                    About us
                                </span>
                            <h2>Crafting structure that last a lifetime</h2>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                            <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About