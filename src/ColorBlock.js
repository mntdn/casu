import React from 'react';

class ColorBlock extends React.Component {
  render(){
    return(
      <span className={this.props.color}>{this.props.number}</span>
    )
  }
}

export default ColorBlock;
