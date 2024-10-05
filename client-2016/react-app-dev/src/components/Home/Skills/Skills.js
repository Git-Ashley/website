import React from 'react';
import {skillPill} from './Skills.css';
import text from '@styles/text.css';

const keySkills = [
  "Node",
  "Typescript",
  "JavaScript",
  "ReactJS",
  "Redux",
  "AWS",
  "AWS Lambda",
  "Docker",
  "MongoDB",
  "PostgreSQL",
  "React Query",
];

const otherSkills = [
  "WebSockets",
  "C++",
  "Cypress",
  "Nginx",
  "Express",
  "Website Hosting",
  "Python",
  "Webpack",
  "Networking",
  "TDD"
];

export default class Skills extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      more: false
    }
  }

  render() {

    const skills = this.state.more ? keySkills.concat(otherSkills) : keySkills;

    return (
      <div className={text.center}>
        {
          skills.map((skill) => (
            <div key={skill} className={`${skillPill} ${text.bold}`}>
              {skill}
            </div>
          ))
        }
        <div className={text.link}>
          {
            this.state.more ?
              (<div onClick={() => this.setState({more: false})}>less</div>) :
              (<div onClick={() => this.setState({more: true})}>more...</div>)
          }
        </div>
      </div>
    );
  }
}
