import React from 'react'
import "./managements.css";
import Header from '../Header/Header';
import p1 from "./Asset/panchimam.jpeg"


const MoreDetails = () => {
    return (
        <div className='moreDetailsPage gradientArea'>
            <Header />
            <div className='details-cnt'>
                <h2 data-aos="fade-up" className='gradientText'> Team | Faculty </h2>
                <div className='management-details-cnt'>
                    <img data-aos="fade-up" src={p1} alt="profile" className='details-profile-image' />
                    <div className='profile-details' >
                        <h3 data-aos="fade-left" style={{marginBottom:"1rem"}} >Panchi Samuthirakani, Founder & MD</h3>
                        <h6 data-aos="fade-left">• Ex-CTO, Indian Overseas Bank</h6>
                        <h6 data-aos="fade-left">• Director, Lion’s Club</h6>
                        <br/>
                        <p data-aos="fade-left" style={{textAlign:"justify"}}>A pioneering Technologist with expertise in Fintech and Cybersecurity. She implemented India’s first payment gateway with Indian Overseas Bank and continued leading all digital initiatives at IOB. Industry viewers have termed her efforts at IOB as not just influential in modernising IOB’s offerings but also as a catalyst for cutting-edge tech adoption for the Indian banking sector as a whole.
                        </p>
                        <br/>
                        <p data-aos="fade-left" style={{textAlign:"justify"}}>  One of her impressive traits is her ability to explain complex technical concepts to an average listener. Hence, she is sought after by News channels for interviews where she simplifies tech advancements in vernacular languages.</p>
                    <br/>
                    <p data-aos="fade-left" style={{textAlign:"justify"}}>
                    She serves as an Independent Board Member on Various Startups
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreDetails