import React from 'react';
import PhotoWidget from './PhotoWidget';

//css
import text from '@styles/text.css';
import icons from '@fonts/icons/icons.css';

import { IoLanguage } from 'react-icons/io5';
import { IoBriefcase } from 'react-icons/io5';
//import { IoChatbubbleEllipses } from 'react-icons/io5';

export default (props) => {

  const containerStyle = {
    paddingTop: 10 + 'px',
    paddingBottom: 30 + 'px'
  }

  const statsStyles = {
    marginTop: '12px',
  }

  return (
    <section style={containerStyle} className="">
      <PhotoWidget/>
      <div className={`${text.title} ${text.center}`}>
        Ashley Phillips
      </div>
      <div className={`${text.subTitle} ${text.center}`}>
        Full Stack Developer
      </div>
      <div className={`${text.regular} ${text.center}`} style={statsStyles}>
        <IoBriefcase />
        <span>&nbsp; 7+ years of professional experience</span>
        <br/>
        <span className={icons['icon-graduation-cap']}/>
        <span>&nbsp; Bsc Mathematics</span>
        <br/>
        <IoLanguage />
        <span>&nbsp; English (native), French (B2+)</span>
        <br/>
        <span className={icons['icon-mail']}/>
        <span>&nbsp; ashp1621@gmail.com</span>
        <br/>
        {<a href="/CV.pdf" target="_blank">View CV</a>}
      </div>
      <div className={text.regular}>
      </div>
    </section>
  );
}
