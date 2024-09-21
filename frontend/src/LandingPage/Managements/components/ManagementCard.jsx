import React from 'react'

const ManagementCard = () => {
    return (
        <div className="custom-card">
            <img className="custom-card-image" src="https://via.placeholder.com/150" alt="Person" />
            <div className="custom-card-content">
                <h2 className="custom-card-title">Col (Dr.) Inderjeet Singh, CISO</h2>
                <p className="custom-card-text">• Chief Cyber Officer, CyberSleuths</p>
                {/* <p className="custom-card-text">• Expert in Operational Excellence</p> */}
                <button className="custom-card-button">Learn More</button>
            </div>
        </div>
    )
}

export default ManagementCard