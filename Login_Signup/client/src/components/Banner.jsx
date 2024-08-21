// src/components/Banner.js
import React from 'react';
import './Banner.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { IoMdInformationCircle } from "react-icons/io";
import 'react-vertical-timeline-component/style.min.css';

const Banner = () => {
  return (
    <>
      <div className='container banner' id='banner'>
        <h2 className='col-12 mt-3 mb-1 text-center text-uppercase'>UIDAI Information</h2>
        <hr />
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'black' }}
            contentArrowStyle={{ borderRight: '7px solid black' }}
            date="2009"
            iconStyle={{ background: '#138781', color: '#fff' }}
            icon={<IoMdInformationCircle />}
          >
            <h3 className="vertical-timeline-element-title">Establishment of UIDAI</h3>
            <p>The Unique Identification Authority of India (UIDAI) was established in 2009 as a statutory authority under the provisions of the Aadhaar Act, 2016 by the Government of India.</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'black' }}
            contentArrowStyle={{ borderRight: '7px solid black' }}
            date="2016"
            iconStyle={{ background: '#138781', color: '#fff' }}
            icon={<IoMdInformationCircle />}
          >
            <h3 className="vertical-timeline-element-title">Aadhaar Act</h3>
            <p>The Aadhaar Act, 2016 was enacted to provide legal backing to the issuance of Aadhaar numbers, which are linked to the identity and residence of Indian residents.</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'black' }}
            contentArrowStyle={{ borderRight: '7px solid black' }}
            date="2018"
            iconStyle={{ background: '#138781', color: '#fff' }}
            icon={<IoMdInformationCircle />}
          >
            <h3 className="vertical-timeline-element-title">1 Billion Enrollments</h3>
            <p>UIDAI achieved a major milestone in 2018 by enrolling over 1 billion people under the Aadhaar scheme, making it one of the largest biometric ID systems in the world.</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'black' }}
            contentArrowStyle={{ borderRight: '7px solid black' }}
            date="2021"
            iconStyle={{ background: '#138781', color: '#fff' }}
            icon={<IoMdInformationCircle />}
          >
            <h3 className="vertical-timeline-element-title">Updated Aadhaar Services</h3>
            <p>In 2021, UIDAI introduced updated Aadhaar services, including online updates, mobile app access, and secure data sharing mechanisms.</p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </>
  );
}

export default Banner;
