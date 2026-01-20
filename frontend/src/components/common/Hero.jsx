import React from "react";
import { fileUrl } from "../common/http";
import heroAltImg from '../../assets/images/construction2.jpg';

const Hero = ({ preHeading, heading, text, bgImage }) => {

    const imageUrl = bgImage
        ? `${fileUrl}uploads/companies/${bgImage}`
        : {heroAltImg};

    const backgroundStyle = {
        backgroundImage: `
            linear-gradient(
                to right,
                rgba(0, 0, 0, 0.8),
                rgba(0, 0, 0, 0)
            ),
            url(${imageUrl})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center"
    };

    return (
        <section className="section-7">
            <div className="hero d-flex align-items-center" style={backgroundStyle}>
                <div className="container">
                    <div className="text-left">
                        <span>{preHeading}</span>
                        <h1>{heading}</h1>
                        <p dangerouslySetInnerHTML={{ __html: text }} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
