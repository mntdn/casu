import React from 'react';

class Card extends React.Component {
  render(){
    return(
      <div className={"card " + this.props.color}>
        <span className="cost clickable" onClick={() => {this.props.clickCallback(this.props.id);}}>{this.props.cost}</span>
        <span className="effect">{this.props.effect}</span>
        <span className="discard clickable" onClick={() => {this.props.discardCallback(this.props.id);}}>{this.props.discard}</span>
        <span className="power">{this.props.power}</span>
      </div>
    );
  }
}

class Cards extends React.Component {
  render(){
    var cardList = [];
    if(this.props.cards){
      for(var i = 0; i < this.props.cards.length; i++){
        var c = this.props.cards[i];
        cardList.push(
            <Card 
                key={c.id} 
                id={c.id} 
                cost={c.cost} 
                effect={c.effect} 
                color={c.color} 
                discard={c.discard} 
                power={c.power} 
                configuration={c.configuration} 
                clickCallback={this.props.selectCallback} 
                discardCallback={this.props.discardCallback} 
            />);
      }
    }
    return(
      <div>{cardList}</div>
    );
  }
}

export default Cards;
