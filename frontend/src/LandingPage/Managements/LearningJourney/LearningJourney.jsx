import React from 'react'
import './learning.css'
import ArrowRight from '../Asset/arrow-right.png'
import Circle from '../Asset/circle.png'
import Manager from '../Asset/manager.png'
import Online from '../Asset/online.png'
import Payment from '../Asset/payment.png'
import Lecture from '../Asset/lecture.png'

const LearningJourney = () => {
    return (
        <div className='learning-journey-cnt'>
            <div className='joining-process-cnt'>
                <h4 className=''>Joining Process</h4>
                <div className='nav-line'>
                    <img src={Circle} alt="circle" className='line-img' />
                    <img src={ArrowRight} alt="circle" className='line-img-arrow' />
                    <img src={ArrowRight} alt="circle" className='line-img-arrow' />
                    <img src={ArrowRight} alt="circle" className='line-img-arrow' />
                    <img src={ArrowRight} alt="circle" className='line-img-arrow' />
                </div>
                <div className='nav-element-cnt'>
                    <div className='element-cnt' data-aos="fade-down" >
                        <img src={Manager} alt="icon" className='element-icon' />
                        <p className='text-value'>Choose CTO or CISO</p>
                    </div>
                    <div className='element-cnt' data-aos="fade-down" >
                        <img src={Online} alt="icon" className='element-icon' />
                        <p className='text-value'>Take online qualifying Assessment</p>
                    </div>
                    <div className='element-cnt' data-aos="fade-down" >
                        <img src={Payment} alt="icon" className='element-icon' />
                        <p className='text-value'>Post qualifying pay fess</p>
                    </div>
                    <div className='element-cnt' data-aos="fade-down" >
                        <img src={Lecture} alt="icon" className='element-icon' />
                        <p className='text-value'>Start Learning</p>
                    </div>
                </div>
                <h4 className=''>Joining Process</h4>
            </div>
        </div>
    )
}

export default LearningJourney