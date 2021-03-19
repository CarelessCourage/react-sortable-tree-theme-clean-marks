import React from 'react';
import style from './node-content-renderer.scss';

class ModularIcon extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isClass: '',
      };
      this.testCheckIconChange = this.testCheckIconChange.bind(this);
    }

    testCheckIconChange(newClass) {
      this.setState({ isClass: newClass});
    }
  
    render() {
      return (
        <div style={this.props.style} onClick={this.props.onClick} className={style.container + " " + this.props.class}>

          {false &&
          <div>
            <button onClick={() => this.testCheckIconChange((style.cross))}>cross</button>
            <button onClick={() => this.testCheckIconChange((style.cross + " " + style.rotate45))}>pluss</button>
            <button onClick={() => this.testCheckIconChange((" "))}>arrow down</button>
            <button onClick={() => this.testCheckIconChange((style.rotate90))}>arrow side</button>
            <button onClick={() => this.testCheckIconChange((style.checkmark))}>checkbox</button>
            <button onClick={() => this.testCheckIconChange((style.checkmark + " " + style.empty))}>empty</button>
          </div>
          }

          
          <svg id="Layer_1" data-name="Layer 1" className={this.state.isClass + this.props.expandedClass} viewBox="0 0 24 24">
            <circle id="circleBg" className={style.circleBg} cx="12" cy="12" r="12" />
            <circle id="circleStroke" className={style.circleStroke} cx="12" cy="12" r="12" />
            <g id="lines" className={style.lines}>
            <line id="line" className={style.line} x1="11.99" y1="16.74" x2="20.47" y2="8.26" />
            <line id="line2" className={style.line2} x1="11.99" y1="16.74" x2="3.5" y2="8.26" />
            </g>
          </svg>
      
        </div>
      );
    }
}

export default ModularIcon;