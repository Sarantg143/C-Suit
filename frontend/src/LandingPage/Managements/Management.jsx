import React, { useState, useEffect } from "react";
import "./managements.css";
import { MdOutlineAssessment, MdOutlineUnsubscribe, MdDashboard } from "react-icons/md";
import { LiaUniversitySolid } from "react-icons/lia";
import Aos from "aos";
import 'aos/dist/aos.css';
import p1 from "./Asset/panchimam.jpeg"
import p2 from "./Asset/selvaraj.jpg"
import p3 from "./Asset/mrm.jpg"
import p4 from "./Asset/col.jpg"
import { useNavigate } from "react-router-dom";

const contentData = {
  Assessment: {
    title: "ABOUT US",
    content: [
      {
        title: "The core purpose of C-Suite is to groom High Performing Executives and help them make it to the boardroom decades earlier than usual.",
        text: "• High-performing executives with great potential in strategic leadership spend decades to reach positions where they can steer the course of their companies."
      },
      {
        text: "• Many make it to CXO positions in the dusk years of their career and do not have enough time to contribute real value.",
      },
      {
        title: "C-Suite will help you climb the corporate ladder faster, giving you enough time to meaningfully contribute.",
        text: "• For your training and grooming C-Suite Academy has assembled a team of CXOs who have not only made it to the boardroom early in their careers, but have also made pioneering contributions to their industry.",
      },
      {
        text: "• C-Suite Academy is a Govt of India DIPP-recognized startup",
      }
    ],
    imageClass: "card-image"
  },
  Subscribe: {
    title: "Team | Faculty",
    content: [
      {
        component: ({ navigation }) => (
          <div className="custom-cards-container">
            {/* 1st Card */}
            <div className="custom-card">
              <img className="custom-card-image" src={p1} alt="Person" />
              <div className="custom-card-content">
                <h2 className="custom-card-title">Panchi Samuthirakani, Founder & MD</h2>
                <div class="custom-card-overlay">
                <p className="custom-card-text">• Ex-CTO, Indian Overseas Bank</p>
                <p className="custom-card-text">• Director, Lion’s Club</p>
                <button className="custom-card-button" onClick={() => navigation('management/details')}>Learn More</button>
                </div>
              </div>
            </div>

            {/* 2nd Card */}
            <div className="custom-card">
              <img className="custom-card-image" src={p2} alt="Person" />
              <div className="custom-card-content">
                <h2 className="custom-card-title">Selvaraj Veerachamy, <br />Co-Founder</h2>
                <div class="custom-card-overlay">
                <p className="custom-card-text">• Co-Founder/Director,<br /> iSheild Technology Pvt Ltd</p>
                {/* <p className="custom-card-text">• Expert in Operational Excellence</p> */}
                <button className="custom-card-button" onClick={() => navigation('management/details')}>Learn More</button>
                </div>
              </div>
            </div>

            {/* 3rd Card */}
            <div className="custom-card">
              <img className="custom-card-image" src={p3} alt="Person" />
              <div className="custom-card-content">
                <h2 className="custom-card-title">M R Muthuswamy (MRM), CTO</h2>
                <div class="custom-card-overlay">
                <p className="custom-card-text">• Founder,<br /> Procrama</p>
                {/* <p className="custom-card-text">• Expert in Operational Excellence</p> */}
                <button className="custom-card-button" onClick={() => navigation('management/details')}>Learn More</button>
                </div>
              </div>
            </div>

            {/* 4th Card */}
            <div className="custom-card">
              <img className="custom-card-image" src={p4} alt="Person" />
              <div className="custom-card-content">
                <h2 className="custom-card-title">Col (Dr.) Inderjeet Singh, CISO</h2>
                <div class="custom-card-overlay">
                <p className="custom-card-text">• Chief Cyber Officer, CyberSleuths</p>
                {/* <p className="custom-card-text">• Expert in Operational Excellence</p> */}
                <button className="custom-card-button" onClick={() => navigation('management/details')}>Learn More</button>
                </div>
              </div>
            </div>

          </div>
        ),
      },
    ],
    // imageClass: "card-image-subscribe",
  },

  Dashboard: {
    title: "Expert",
    content: [
      {
        component: ({ navigation }) => (
          <div className="custom-cards-container">
            {/* 1st Card */}
            <div className="custom-card">
              <img className="custom-card-image" src="https://via.placeholder.com/150" alt="Person" />
              <div className="custom-card-content">
                <h2 className="custom-card-title">Srinivas Mahankali, Experts Panel.</h2>
                <div class="custom-card-overlay">
                <p className="custom-card-text">• Ex-CTO, Indian Overseas Bank</p>
                <p className="custom-card-text">• Director, Lion’s Club</p>
                <button className="custom-card-button" onClick={() => navigation('management/details')}>Learn More</button>
                </div>
              </div>
            </div>

            {/* 2nd Card */}
            <div className="custom-card">
              <img className="custom-card-image" src="https://via.placeholder.com/150" alt="Person" />
              <div className="custom-card-content">
                <h2 className="custom-card-title">Venkatraman Rajendran, Experts Panel</h2>
                <div class="custom-card-overlay">
                <p className="custom-card-text">• Co-Founder/Director,<br /> iSheild Technology Pvt Ltd</p>
                {/* <p className="custom-card-text">• Expert in Operational Excellence</p> */}
                <button className="custom-card-button" onClick={() => navigation('management/details')}>Learn More</button>
                </div>
              </div>
            </div>

            {/* 3rd Card */}
            {/* <div className="custom-card">
              <img className="custom-card-image" src="https://via.placeholder.com/150" alt="Person" />
              <div className="custom-card-content">
                <h2 className="custom-card-title">M R Muthuswamy (MRM), CTO</h2>
                <p className="custom-card-text">•  CTO,<br />Founder,<br /> Procrama</p>
                <p className="custom-card-text">• Expert in Operational Excellence</p>
                <button className="custom-card-button">Learn More</button>
              </div>
            </div> */}
          </div>
        ),
      },
    ],
    imageClass: "card-image-dashboard"
  },
  Learning: {
    title: "Learning",
    content: [
      {
        title: "Interactive Courses",
        text: "Engage in interactive courses designed to cater to various learning styles. Access video lectures, quizzes, assignments, and interactive simulations to reinforce your understanding of key concepts."
      },
      {
        title: "Expert Instructors",
        text: "Learn from industry experts and experienced educators who provide valuable insights and guidance throughout your learning journey. Benefit from their expertise and practical knowledge."
      },
      {
        title: "Self-Paced Learning",
        text: "Enjoy the flexibility of self-paced learning, allowing you to study at your own convenience and progress through the courses at a pace that suits your schedule and learning preferences."
      }
    ],
    imageClass: "card-image-learning"
  }
};

const Management = () => {
  const [selectedContent, setSelectedContent] = useState("Assessment");
  const navigate = useNavigate()

  const handleButtonClick = (content) => {
    setSelectedContent(content);
  };

  const renderContent = () => {
    const content = contentData[selectedContent];
    if (!content) return null;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className={content.title === "Team | Faculty" || content.title === "Expert" ? "col-md-12" : "col-md-8"}>
            <div data-aos="fade-right" className="changes-head">
              <h1 className="content-title">{content.title}</h1>
              <div className="total-content">
                <div className="container-para">
                  {content.content.map((item, index) => (
                    <div key={index}>
                      <strong className="item-title">{item.title}</strong>
                      {item.text && <p className="pt-1">{item.text}</p>}
                      {item.component && <item.component navigation={(path) => navigate(path)} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={content.title === "Team | Faculty" || content.title === "Expert" ? "col-md-0" : "col-md-4"}>
            <div data-aos="fade-left" className="image-sytle">
              <div className={content.imageClass}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <div className="container-fluid" id="what">
        <div className="container-lms-head">
          <div className="heading-lms" data-aos="fade-up">
            <div>Why C-suite Academy?</div>
            <div> 
              So, you aced your performance review again. Yet, you do
              <br /> not see a clear career progression to the C-suite.
            </div>
            <div>
              There is only one quality that paves your way to upper management, Irreplaceable Dependence
              <br />
              <p id="para3">C-suite Academy will help you cultivate this.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-read">
        <div className="buttons-all">
          <button data-aos="fade-right" className="txt-access" onClick={() => handleButtonClick("Assessment")}>
            <MdOutlineAssessment className="text-primary-color mr-2" size="1.5rem" />
            <span>ABOUT US</span>
          </button>
          <button data-aos="fade-right" className="txt-access" onClick={() => handleButtonClick("Subscribe")}>
            <MdOutlineUnsubscribe className="text-primary-color mr-2" size="1.5rem" />
            <span>TEAM/FACULTY</span>
          </button>
          <button data-aos="fade-left" className="txt-access" onClick={() => handleButtonClick("Dashboard")}>
            <MdDashboard className="text-primary-color mr-2" size="1.5rem" />
            <span>EXPERTS</span>
          </button>
          <button data-aos="fade-left" className="txt-access" onClick={() => handleButtonClick("Learning")}>
            <LiaUniversitySolid className="text-primary-color mr-2" size="1.5rem" />
            <span>LEARNING GOURNEY</span>
          </button>
        </div>
      </div>

      {renderContent()}
    </>
  );
};

export default Management;
