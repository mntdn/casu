import React from 'react';
import ColorBlock from './ColorBlock';

class Objective extends React.Component {
  constructor(props){
    super(props);
    this.state= {selected : ""};
  }

  render(){
    // pour les tests, couleurs = *Y*ellow, *G*reen, *B*lue, *P*urple
    // => 3Y signifie avoir 3 cartes jaunes, 2Y2G sgnifie 2 jaunes et 2 vertes
    var blocksArray = [];
    var conditionArray = this.props.condition.match(/([0-9]?[YGBP])+/g);
    for(var i = 0; i < conditionArray.length; i++){
      var number = conditionArray[i].match(/[0-9]/).length > 0 ? conditionArray[i].match(/[0-9]/)[0] : 1;
      var color = 'color' + conditionArray[i].match(/[YGBP]/)[0];
      blocksArray.push(<ColorBlock color={color} number={number} key={color + number} />);
    }
    var attainedClass = this.props.attained ? 'attained' : '';
    return(
      <div className={`objective ${attainedClass}`}>{blocksArray} <p>{this.props.victoryPoints}</p></div>
    );
  }
}

class Objectives extends React.Component {
  render(){
    var objectivesList = [];
    for(var i = 0; i < this.props.objectives.length; i++){
      var o = this.props.objectives[i];
      objectivesList.push(<Objective id={o.id} condition={o.condition} victoryPoints={o.victoryPoints} attained={o.attained} key={o.id} />);
    }
    return(
      <div>{objectivesList}</div>
    );
  }
}

export default Objectives;
