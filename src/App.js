import React from 'react';
import './App.css';
import Players from './Players';
import Objectives from './Objectives';
import Cards from './Cards';

// random from min to max both included
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// checks if a card stack satisfies the objective (number of cards of color)
var isObjectiveAttained = function (cardStack, condition) {
  let conditionArray = condition.match(/([0-9]?[YGBP])+/g);
  for(var i = 0; i < conditionArray.length; i++){
    var number = conditionArray[i].match(/[0-9]/).length > 0 ? parseInt(conditionArray[i].match(/[0-9]/)[0], 10) : 1;
    var color = conditionArray[i].match(/[YGBP]/)[0];
    var nbCards = 0;
    for(let j = 0; j < cardStack.length; j++)
      nbCards += cardStack[j].color === color ? 1 : 0;
    if (nbCards < number)
      return false;
  }
  return true;
}

// var objectivesList = [
//   {id: 1, condition:'2B', victoryPoints: 2, attained: false},
//   {id: 2, condition:'2Y', victoryPoints: 2, attained: false},
//   {id: 3, condition:'2P', victoryPoints: 2, attained: false},
//   {id: 4, condition:'2G', victoryPoints: 2, attained: false},
//   {id: 5, condition:'1G-1Y', victoryPoints: 2, attained: false},
//   {id: 6, condition:'1Y-1B', victoryPoints: 2, attained: false},
//   {id: 7, condition:'1P-1B', victoryPoints: 2, attained: false},
//   {id: 8, condition:'1G-1P', victoryPoints: 2, attained: false},
//   {id: 9, condition:'1G-1B-1P-1Y', victoryPoints: 2, attained: false}
// ];
var objectivesList = [
  {id: 1, condition:'3B', victoryPoints: 2, attained: false},
  {id: 2, condition:'3Y', victoryPoints: 2, attained: false},
  {id: 3, condition:'3P', victoryPoints: 2, attained: false},
  {id: 4, condition:'3G', victoryPoints: 2, attained: false},
  {id: 5, condition:'2G-2Y', victoryPoints: 2, attained: false},
  {id: 6, condition:'2Y-2B', victoryPoints: 2, attained: false},
  {id: 7, condition:'2P-2B', victoryPoints: 2, attained: false},
  {id: 8, condition:'2G-2P', victoryPoints: 2, attained: false},
  {id: 9, condition:'1G-1B-1P-1Y', victoryPoints: 2, attained: false}
];

// effets:
// piecesPerColor=1xG means 1 piece per Green card
// pieces=2 means 2 pieces
// piecesVictoryDiscard=1&GBx1 means 1 piece and at the end, if you have a green or blue card you gain 1 victory point per card in your discard pile
// victoryPoints=1x2G means 1 victory point for each 2 green cards
var cardsList = [
  {id: 1, cost: 1, effect: 'pieces=1', color: 'G', discard:'testDiscard2', power: 'testPower3', configuration: '2'},
  {id: 2, cost: 3, effect: 'pieces=1', color: 'G', discard:'testDiscard2', power: 'testPower3', configuration: '3'},
  {id: 3, cost: 4, effect: 'pieces=2', color: 'G', discard:'testDiscard2', power: 'testPower3', configuration: '2'},
  {id: 4, cost: 1, effect: 'pieces=1', color: 'B', discard:'testDiscard2', power: 'testPower3', configuration: '2'},
  {id: 5, cost: 3, effect: 'pieces=1', color: 'B', discard:'testDiscard2', power: 'testPower3', configuration: '3'},
  {id: 6, cost: 4, effect: 'pieces=2', color: 'B', discard:'testDiscard2', power: 'testPower3', configuration: '2'},
  {id: 7, cost: 1, effect: 'pieces=1', color: 'Y', discard:'testDiscard2', power: 'testPower3', configuration: '2'},
  {id: 8, cost: 3, effect: 'pieces=1', color: 'Y', discard:'testDiscard2', power: 'testPower3', configuration: '3'},
  {id: 9, cost: 4, effect: 'pieces=2', color: 'Y', discard:'testDiscard2', power: 'testPower3', configuration: '2'},
  {id: 10, cost: 1, effect: 'pieces=1', color: 'P', discard:'testDiscard2', power: 'testPower3', configuration: '2'},
  {id: 11, cost: 4, effect: 'pieces=2', color: 'P', discard:'testDiscard2', power: 'testPower3', configuration: '2'},
  {id: 12, cost: 2, effect: 'piecesPerColor=1xB', color: 'G', discard:'testDiscard', power: 'testPower', configuration: '2'},
  {id: 13, cost: 2, effect: 'piecesPerColor=1xP', color: 'Y', discard:'testDiscard', power: 'testPower', configuration: '2'},
  {id: 14, cost: 2, effect: 'piecesPerColor=1xG', color: 'B', discard:'testDiscard', power: 'testPower', configuration: '2'},
  {id: 15, cost: 2, effect: 'piecesPerColor=1xY', color: 'P', discard:'testDiscard', power: 'testPower', configuration: '2'},
  {id: 16, cost: 4, effect: 'piecesVictoryDiscard=1&PBx1', color: 'G', discard:'testDiscard', power: 'testPower', configuration: '2'},
  {id: 17, cost: 4, effect: 'piecesVictoryDiscard=1&BYx1', color: 'P', discard:'testDiscard', power: 'testPower', configuration: '2'},
  {id: 18, cost: 4, effect: 'piecesVictoryDiscard=1&GYx1', color: 'B', discard:'testDiscard', power: 'testPower', configuration: '2'},
  {id: 19, cost: 4, effect: 'piecesVictoryDiscard=1&GPx1', color: 'Y', discard:'testDiscard', power: 'testPower', configuration: '2'},
  {id: 20, cost: 2, effect: 'victoryPoints=1x2Y', color: 'B', discard:'testDiscard', power: 'testPower', configuration: '2'},
  {id: 21, cost: 2, effect: 'victoryPoints=1x2P', color: 'G', discard:'testDiscard', power: 'testPower', configuration: '2'},
  {id: 22, cost: 2, effect: 'victoryPoints=1x2B', color: 'P', discard:'testDiscard', power: 'testPower', configuration: '2'},
  {id: 23, cost: 2, effect: 'victoryPoints=1x2G', color: 'Y', discard:'testDiscard', power: 'testPower', configuration: '2'}
];

// contains a copy of the state of the application, that's the object we modify and we modify the state via setState on it
var stateCopy = {
  players : [
    {name: 'Mat', money: 10, victoryPoints: 0, current: true, alreadySelected: true, cards: [], objectivesAttained: []}, 
    {name: 'Clare', money: 10, victoryPoints: 0, current: false, alreadySelected: false, cards: [], objectivesAttained: []}, 
    {name: 'Gaet', money: 10, victoryPoints: 0, current: false, alreadySelected: false, cards: [], objectivesAttained: []}, 
    {name: 'Audrey', money: 10, victoryPoints: 0, current: false, alreadySelected: false, cards: [], objectivesAttained: []}
    ]
  };

class App extends React.Component {
  constructor(props){
    super(props);
    this.state= stateCopy;
    // copy of the initial array of cards
    this.objectiveStack = JSON.parse(JSON.stringify(objectivesList));
    this.cardStack = JSON.parse(JSON.stringify(cardsList));
    this.objectives = [];
    this.cards = [];
    this.gameState = "Welcome to Casu !";
    this.turnNumber = 1;
    this.disableCardSelection = false;
    // let's pick 4 random objective cards
    for(let i = 0; i < 4; i++){
      let pos = randomIntFromInterval(0, this.objectiveStack.length - 1);
      this.objectives.push(this.objectiveStack.splice(pos, 1)[0]);
    }

    // and 4 random play cards
    for(let i = 0; i < 4; i++){
      let pos = randomIntFromInterval(0, this.cardStack.length - 1);
      this.cards.push(this.cardStack.splice(pos, 1)[0]);
    }
  }

  // Check all objectives for all players
  checkObjectives = () => {
    for(let i = 0; i < this.objectives.length; i++){
      let o = this.objectives[i];
      for(let j = 0; j < stateCopy.players.length; j++){
        let p = stateCopy.players[j];
        if(isObjectiveAttained(p.cards, o.condition)){
          console.log(p.name, "objectif atteint : ", o.condition);
          o.attained = true;
          p.objectivesAttained.push(o);
          p.victoryPoints += o.victoryPoints;
          this.objectives.splice(i, 1);
        }
      }
    }
  }

  // Gives each player the amount its cards should give him
  cardPayments = () => {
    // debugger;
    for(let i = 0; i < stateCopy.players.length; i++){
      let p = stateCopy.players[i];
      for(let j = 0; j < p.cards.length; j++){
        let c = p.cards[j];
        let action = c.effect.match(/(\w+)=(.+)/)[1];
        let params = c.effect.match(/(\w+)=(.+)/)[2];
        switch(action){
          case 'pieces':
            p.money += parseInt(params, 10);
            break;
          case 'piecesPerColor':
            let qtyPerColor = params.match(/(\d+)x(\w+)/)[1];          
            let color = params.match(/(\d+)x(\w+)/)[2];
            for(let k = 0; k < p.cards.length; k++)
              p.money += p.cards[k].color === color ? parseInt(qtyPerColor, 10) : 0;          
            break;
          case 'piecesVictoryDiscard':
            let qtyPieces = params.match(/(\d+)&(\w+)x(\d+)/)[1];          
            p.money += parseInt(qtyPieces, 10);
            //TODO finish victory points at the end
            break; 
          case 'victoryPoints':
            let qtyVictoryPoints = params.match(/(\d+)x([\w\d]+)/)[1];
            let cardsForVictoryPoints = params.match(/(\d+)x([\w\d]+)/)[2];
            let numberVP = cardsForVictoryPoints.match(/[0-9]/).length > 0 ? parseInt(cardsForVictoryPoints.match(/[0-9]/)[0], 10) : 1;
            let colorVP = cardsForVictoryPoints.match(/[YGBP]/)[0];
            var nbCardsVP = 0;
            for(let l = 0; l < p.cards.length; l++)
              nbCardsVP += p.cards[l].color === colorVP ? 1 : 0;
            if(nbCardsVP >= parseInt(numberVP, 10)){
              // we have the required amount of cards
              p.victoryPoints += parseInt(qtyVictoryPoints, 10) * Math.floor(nbCardsVP / parseInt(numberVP, 10));
            }
            break;
          default:
            break;
        }
      }
    }
  }

  selectCard = (cardId) => {
    if(!this.disableCardSelection){
      // first find the card from its Id
      var posCard = 0;
      for(; posCard < this.cards.length; posCard++){
        if(this.cards[posCard].id === cardId)
          break;
      }

      // then find the current player
      var posPlayer = 0;
      for(; posPlayer < stateCopy.players.length; posPlayer++){
        if(stateCopy.players[posPlayer].current)
          break;
      }

      stateCopy.players[posPlayer].cards.push(this.cards[posCard]);
      stateCopy.players[posPlayer].money -= this.cards[posCard].cost;
      this.setState(stateCopy);
      this.cards.splice(posCard, 1);

      var nbSelected = 0;
      for(let i = 0; i < stateCopy.players.length; i++)
        nbSelected += stateCopy.players[i].alreadySelected ? 1 : 0;
      if(nbSelected === 4){
        // the turn is finished, we start a new one
        // but first everyone is paid
        this.cardPayments();
        this.turnNumber++;
        // let's make everyone selectable again
        for(let i = 0; i < stateCopy.players.length; i++)
          if(i !== posPlayer)
            stateCopy.players[i].alreadySelected = false;
        // and we pick 4 new cards
        for(let i = 0; i < 4; i++){
          let pos = randomIntFromInterval(0, this.cardStack.length - 1);
          this.cards.push(this.cardStack.splice(pos, 1)[0]);
        }        
        this.gameState = stateCopy.players[posPlayer].name + " to play : pick a card";
        this.disableCardSelection = false;
      } else {
        this.gameState = "Now select next player";
        this.disableCardSelection = true;
      }
      this.checkObjectives();
    }
  }

  selectPlayer = (pName) => {
    var posPlayer = 0;
    for(; posPlayer < stateCopy.players.length; posPlayer++){
      if(stateCopy.players[posPlayer].name === pName)
        break;
    }
    if(this.disableCardSelection && !stateCopy.players[posPlayer].alreadySelected){
      stateCopy.players[posPlayer].alreadySelected = true;
      for(let i = 0; i < stateCopy.players.length; i++){
        stateCopy.players[i].current = false;
      }
      stateCopy.players[posPlayer].current = true;
      this.setState(stateCopy);
      this.disableCardSelection = false;
      this.gameState = pName + " to play : pick a card";
    }
  }

  render() {
    return (
      <div className="App">
        <div className="gameState">Turn {this.turnNumber}<br />{this.gameState}</div>
        <Players players={this.state.players} clickCallback={this.selectPlayer} />
        <Objectives objectives={this.objectives} /><br className="clearFloat" />
        <Cards cards={this.cards} selectCallback={this.selectCard} />
      </div>
    );
  }
}

export default App;
