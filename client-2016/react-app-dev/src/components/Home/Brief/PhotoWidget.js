import React from 'react';
import {SocialSymbol} from '@lib/SocialButton/SocialButton';
import position from '@styles/position.css';
import {polarToCartesian} from 'math-tools';
import {offsetFromParent} from 'dom-tools';
import Me from '@media/ashpic1.jpg';

export default class PhotoWidget extends React.PureComponent {

  constructor(props){
      super(props);

      this.state = {
        coords: []
      };
      this.updateCoords = this.updateCoords.bind(this);
  }

  render(){
    let linkedinIcon = null;
    let githubIcon = null;

    if(this.state.coords && this.state.coords.length === 2){

      const gitStyle = {
        position: 'absolute',
        top: this.state.coords[0].y - 15,
        left: this.state.coords[0].x - 15,
        borderWidth: 4 + 'px'
      };
      githubIcon = (<SocialSymbol style={gitStyle} site="github"/>);

      const linkedinStyle = {
        position: 'absolute',
        top: this.state.coords[1].y - 14.5,
        left: this.state.coords[1].x - 14.5,
        borderWidth: 3 + 'px'
      }
      linkedinIcon = (<SocialSymbol style={linkedinStyle} site="linkedin"/>);
    }
    return (
      <div className={position.center}>
        <img
          src={Me}
          style={{borderRadius: 100 + 'px', margin: 20 + 'px', backgroundColor: 'rgb(102, 204, 51)'}}
          className={position.center}
          height="150" width="150" id="home-profile-img"/>
          <br/>
          {githubIcon ? (<a href="https://github.com/Git-Ashley?tab=repositories" target="_blank">{githubIcon}</a>) : null}
          {linkedinIcon ? (<a href="https://www.linkedin.com/in/ashley-p-5b5a8599/" target="_blank">{linkedinIcon}</a>) : null}
      </div>);
  }

  updateCoords(){
    const imgEle = window.document.getElementById('home-profile-img');
    const coords = this.getCoords(imgEle, 2, null, 0.09);
    this.setState({coords: coords});
  }

  componentDidMount(){
    window.addEventListener("resize", this.updateCoords);
    window.addEventListener("load", this.updateCoords);
    this.updateCoords();
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.updateCoords);
    window.removeEventListener("load", this.updateCoords);
  }

  // Function which calculates center coordinates of element, relative to
  // the parent, and returns {numItems} coordinates which are positions,
  // {inputSpread}*2*PI radians apart from each other around midTheta, around
  // a circular circumference of {element}, with radius element.width/2.
  getCoords(element, numItems, midTheta, inputSpread){

    if(!numItems || !element)
      return null;

    const returnCoords = [];
    const theta = midTheta || 0.875; //Think of angle as a float from 0 -> 1
    const spread = inputSpread || 0.1; // i.e. symbols will be spaced a tenth of the circle apart if !inputSpread

    // Obtain center of element & radius
    const x0 = offsetFromParent(element).x;
    const y0 = offsetFromParent(element).y;
    const height = element.height;
    const width = element.width;
    const originX = x0 + 0.5*width;
    const originY = y0 + 0.5*height;
    const radius = width/2;

    for(let i = 0; i < numItems; i++){
      const thetaI = (theta + spread*(i + 0.5*(1-numItems)))*2*Math.PI;
      const offsetCoords = polarToCartesian(thetaI, radius);
      returnCoords.push(
        {
          x: originX + offsetCoords.x,
          y: originY - offsetCoords.y
        });
    }

    return returnCoords;

  }
}
