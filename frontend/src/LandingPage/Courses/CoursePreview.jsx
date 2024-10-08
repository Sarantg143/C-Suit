import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Book from '../Assets/Images/book.png'
import CheckMark from '../Assets/Images/check.png'
import VideoIcon from '../Assets/Images/online-video.png'

const CoursePreview = () => {
    const courseData = useLocation().state?.course
    const [fullDescription, setFullDescription] = useState(false)
    const navigate = useNavigate()
    console.log(`https://vimeo.com/video${courseData?.videoUrl?.slice(17,)}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`)
    return (
        <div className='preview-page'>
            <div className='course-info-cnt'>
                <h1 className='course-title'>{courseData?.title}</h1>
                <div className='lesson-count-cnt'>
                    <img src={Book} alt="book" className='lesson-icon' />
                    <p>Lessons {courseData?.lessons?.length}</p>
                </div>
                <iframe src={`https://player.vimeo.com/video/${courseData?.videoUrl
                    .split("/")
                    .pop()}`}
                    allow="autoplay"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className='lessons-video-cnt'></iframe>
                <div className='course-about-cnt'>
                    <h2 className='preview-header'>About This Course</h2>
                    <p>{fullDescription ? courseData?.description : courseData?.description?.slice(0, 250)}<span className='more-btn' onClick={() => setFullDescription(!fullDescription)}>{fullDescription ? 'Less' : 'More..'}</span></p>
                </div>

                <div className='course-outcome-cnt' style={{ background: ' #F8F8FD' }}>
                    <h2 className='preview-header'>After Completing This Course You Will Achieve</h2>
                    <div className='outcome-list'>
                        {courseData?.whatYouGet
                            ?.map((outcome, index) => (
                                <div className='outcome-item' key={index}>
                                    <img src={CheckMark} alt="checkmark" className='lesson-icon' />
                                    <div>
                                        <p>{outcome?.title}</p>
                                        <h6 className='outcome-description'>{outcome?.description}</h6>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <div className='course-outcome-cnt' style={{ background: ' #F8F8FD' }}>
                    <h2 className='preview-header'>This Course Is For</h2>
                    <div className='outcome-list'>
                        {courseData?.whoIsThisFor
                            ?.map((focus, index) => (
                                <div className='outcome-item' key={index}>
                                    <img src={CheckMark} alt="checkmark" className='lesson-icon' />
                                    <div>
                                        <p>{focus?.text}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <div className='course-outcome-cnt' style={{ background: ' #F8F8FD' }}>
                    <h2 className='preview-header'>Hot Topics Covered In This Course</h2>
                    <div className='outcome-list'>
                        {courseData?.lessons
                            ?.map((lesson, index) => (
                                <div className='outcome-item' key={index}>
                                    <img src={VideoIcon} alt="checkmark" className='lesson-icon' />
                                    <div>
                                        <p>{lesson?.title}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className='course-amount-cnt-phone'>
                    <div className='course-price-info-cnt'>
                        <div className='outcome-list'>
                            {courseData?.courseDetails
                                ?.map((lesson, index) => (
                                    <div className='outcome-item' key={index}>
                                        <p className='text-icon'>{lesson?.icon}</p>
                                        <div>
                                            <p>{lesson?.text}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className='price-display-cnt'>
                            <p className='price-text'>Price : ₹ {courseData?.price}</p>
                        </div>
                        <div className='enroll-btn' onClick={() => navigate('/authentication')}>
                            <h3 className='white-text'>{`Enroll Now >>`}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className='course-amount-cnt'>
                <div className='course-price-info-cnt'>
                    <div className='outcome-list'>
                        {courseData?.courseDetails
                            ?.map((lesson, index) => (
                                <div className='outcome-item' key={index}>
                                    <p className='text-icon'>{lesson?.icon}</p>
                                    <div>
                                        <p>{lesson?.text}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className='price-display-cnt'>
                        <p className='price-text'>Price : ₹ {courseData?.price}</p>
                    </div>
                    <div className='enroll-btn' onClick={() => navigate('/authentication')}>
                        <h3 className='white-text'>{`Enroll Now >>`}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoursePreview    