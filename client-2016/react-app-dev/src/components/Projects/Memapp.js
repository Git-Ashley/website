import React from 'react';
import text from '@styles/text.css';
import memappImg from '@media/memapp-screenshot.png';

export default () => (
  <section className="container">
    <div className="col-md-10 col-md-offset-1">
      <div className={`${text.title} ${text.center}`}>Memapp</div>
      <hr/>

      <img width="900" alt="" src={memappImg}/>
      <br />
      <br />
      <p>{"Memapp is based on the spaced repetition learning (SRL) technique. This is a project which I originally created to help me learn Japanese Kanji characters. I wasn't happy with anki and other SRL apps at the time, so created this."}</p>

      <br />
      <br/>Git repo: <a href="https://github.com/Git-Ashley/playlist/tree/japanese" target="_blank">https://github.com/Git-Ashley/playlist/tree/japanese</a>. The 'japanese' branch is most up to date.

      <br />
      <p>{"Keep a look out for further updates, this page will be updated soon with a technical overview, and possibly a demo running on a different port."}</p>
    </div>
  </section>
);
