import React from 'react';

class Choice extends React.Component {
    render() {
        return (
            <div className="choiceBox" style={{ display: this.props.showBox ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', border: '1px solid black' }}>
                <button onClick={this.props.choiceCallback.bind(this, 1)}>{this.props.choice1}</button>
                <button onClick={this.props.choiceCallback.bind(this, 2)}>{this.props.choice2}</button>
             </div>
        );
    }
}

export default Choice;
