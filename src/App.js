import React from 'react';
import './App.css';
import Players from './Players';
import Objectives from './Objectives';
import Cards from './Cards';
import Choice from './Choice';
import {cardsList} from './CardList';

// random from min to max both included
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// checks if a card stack satisfies the objective (number of cards of color)
var isObjectiveAttained = function (cardStack, condition) {
    let conditionArray = condition.match(/([0-9]?[YGBP])+/g);
    for (var i = 0; i < conditionArray.length; i++) {
        var number = conditionArray[i].match(/[0-9]/).length > 0 ? parseInt(conditionArray[i].match(/[0-9]/)[0], 10) : 1;
        var color = conditionArray[i].match(/[YGBP]/)[0];
        var nbCards = 0;
        for (let j = 0; j < cardStack.length; j++)
            nbCards += cardStack[j].color === color ? 1 : 0;
        if (nbCards < number)
            return false;
    }
    return true;
}

// checks if a deck of cards contains all the colors asked (for example 1B for 1 blue or 2G for 2 green)
var colorsInDeck = function(colors, deck) {
    var nbCards = parseInt(/(\d)(\w)/.exec(colors)[1], 10);
    var color = /(\d)(\w)/.exec(colors)[2];
    for (var i = 0; i < deck.length; i++)
        if (deck[i].color === color)
            nbCards--;
    // if nbCards === 0 then we found all the cards of that color in the deck
    return nbCards === 0;
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
    { id: 1, condition: '3B', victoryPoints: 2, attained: false },
    { id: 2, condition: '3Y', victoryPoints: 2, attained: false },
    { id: 3, condition: '3P', victoryPoints: 2, attained: false },
    { id: 4, condition: '3G', victoryPoints: 2, attained: false },
    { id: 5, condition: '2G-2Y', victoryPoints: 2, attained: false },
    { id: 6, condition: '2Y-2B', victoryPoints: 2, attained: false },
    { id: 7, condition: '2P-2B', victoryPoints: 2, attained: false },
    { id: 8, condition: '2G-2P', victoryPoints: 2, attained: false },
    { id: 9, condition: '1G-1B-1P-1Y', victoryPoints: 2, attained: false }
];

// contains a copy of the state of the application, that's the object we modify and we modify the state via setState on it
var stateCopy = {
    players: [
        { name: 'Mat', money: 10, victoryPoints: 0, current: true, alreadySelected: true, forceStartFirst: false, cards: [], objectivesAttained: [] },
        { name: 'Clare', money: 10, victoryPoints: 0, current: false, alreadySelected: false, forceStartFirst: false, cards: [], objectivesAttained: [] },
        { name: 'Gaet', money: 10, victoryPoints: 0, current: false, alreadySelected: false, forceStartFirst: false, cards: [], objectivesAttained: [] },
        { name: 'Audrey', money: 10, victoryPoints: 0, current: false, alreadySelected: false, forceStartFirst: false, cards: [], objectivesAttained: [] }
    ],
    showChoice: false,
    choiceFunction: () => {},
    choice1: '1',
    choice2: '2',
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = stateCopy;
        // copy of the initial array of cards
        this.objectiveStack = JSON.parse(JSON.stringify(objectivesList));
        // let's add unique ids to the cards
        for(var i = 0; i < cardsList.length; i++){
            cardsList[i].id = i;
        }
        this.cardStack = JSON.parse(JSON.stringify(cardsList));
        this.objectives = [];
        this.cards = [];
        this.gameState = "Welcome to Casu !";
        this.turnNumber = 1;
        this.disableCardSelection = false;
        // let's pick 4 random objective cards
        for (let i = 0; i < 4; i++) {
            let pos = randomIntFromInterval(0, this.objectiveStack.length - 1);
            this.objectives.push(this.objectiveStack.splice(pos, 1)[0]);
        }

        // and 4 random play cards
        for (let i = 0; i < 4; i++) {
            let pos = randomIntFromInterval(0, this.cardStack.length - 1);
            this.cards.push(this.cardStack.splice(pos, 1)[0]);
        }
    }

    // Check all objectives for all players
    checkObjectives = () => {
        for (let i = 0; i < this.objectives.length; i++) {
            let o = this.objectives[i];
            for (let j = 0; j < stateCopy.players.length; j++) {
                let p = stateCopy.players[j];
                if (isObjectiveAttained(p.cards, o.condition)) {
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
        for (let i = 0; i < stateCopy.players.length; i++) {
            let p = stateCopy.players[i];
            for (let j = 0; j < p.cards.length; j++) {
                let c = p.cards[j];
                let action = c.effect.match(/(\w+)=(.+)/)[1];
                let params = c.effect.match(/(\w+)=(.+)/)[2];
                switch (action) {
                    case 'pieces':
                        p.money += parseInt(params, 10);
                        break;
                    case 'piecesPerColor':
                        let qtyPerColor = params.match(/(\d+)x(\w+)/)[1];
                        let color = params.match(/(\d+)x(\w+)/)[2];
                        for (let k = 0; k < p.cards.length; k++)
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
                        for (let l = 0; l < p.cards.length; l++)
                            nbCardsVP += p.cards[l].color === colorVP ? 1 : 0;
                        if (nbCardsVP >= parseInt(numberVP, 10)) {
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
        if (!this.disableCardSelection) {
            // first find the card from its Id
            var posCard = 0;
            for (; posCard < this.cards.length; posCard++) {
                if (this.cards[posCard].id === cardId)
                    break;
            }

            // then find the current player
            var posPlayer = 0;
            for (; posPlayer < stateCopy.players.length; posPlayer++) {
                if (stateCopy.players[posPlayer].current)
                    break;
            }

            stateCopy.players[posPlayer].cards.push(this.cards[posCard]);
            stateCopy.players[posPlayer].money -= this.cards[posCard].cost;
            this.setState(stateCopy);
            this.cards.splice(posCard, 1);

            var nbSelected = 0;
            for (let i = 0; i < stateCopy.players.length; i++)
                nbSelected += stateCopy.players[i].alreadySelected ? 1 : 0;
            if (nbSelected === 4) {
                // the turn is finished, we start a new one
                // but first everyone is paid
                this.cardPayments();
                this.turnNumber++;
                var forceFirst = -1;
                for (let i = 0; i < stateCopy.players.length; i++)
                    if(stateCopy.players[i].forceStartFirst)
                        forceFirst = i; // if someone has earned the right to begin first let's remember his id
                console.log("first", forceFirst);
                // let's make everyone selectable again
                for (let i = 0; i < stateCopy.players.length; i++){
                    stateCopy.players[i].forceStartFirst = false; // you can only start first for one turn
                    if(forceFirst !== -1 && forceFirst === i){
                        // this is the player that HAS to start first
                        stateCopy.players[i].current = true;
                        stateCopy.players[i].alreadySelected = true;                        
                    } else if(forceFirst !== -1 && forceFirst !== i){
                        // someone has to start first and this is not you
                        stateCopy.players[i].current = false;
                        stateCopy.players[i].alreadySelected = false;                        
                    } else if (forceFirst === -1 && i !== posPlayer){
                        // if nobody has to start first, the last one starts first
                        stateCopy.players[i].alreadySelected = false;
                    }
                }
                // and we pick 4 new cards
                for (let i = 0; i < 4; i++) {
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

    discardCard = (cardId) => {
        // find the current player
        var posPlayer = 0;
        var hasCard = false;
        var currentCard;
        for (; posPlayer < stateCopy.players.length; posPlayer++) {
            if (stateCopy.players[posPlayer].current) {
                for (let i = 0; i < stateCopy.players[posPlayer].cards.length; i++)
                    if (stateCopy.players[posPlayer].cards[i].id === cardId) {
                        hasCard = true;
                        currentCard = stateCopy.players[posPlayer].cards[i];
                    }
                break;
            }
        }
        if (hasCard) {
            // the player possess the card he wants to play and is the current player
            console.log("discard OK");
            var canDiscardCard = true;
            if (currentCard.discard.indexOf("AND") > 0) {
                // you need both conditions
                let nbPieces = parseInt(/(\d+)AND([\dBGYP]+)/.exec(currentCard.discard)[1], 10);
                let cardsToHave = /(\d+)AND([\dBGYP]+)/.exec(currentCard.discard)[2];
                if (stateCopy.players[posPlayer].money >= nbPieces) {
                    // he can pay
                    // we currently never have more than 1 colored card to have
                    var cardColor = /\d([BGYP])/.exec(cardsToHave)[1];
                    var okColorCard = false;
                    for (var i = 0; i < stateCopy.players[posPlayer].cards.length; i++)
                        if (stateCopy.players[posPlayer].cards[i].color === cardColor)
                            okColorCard = true;

                    if (okColorCard){
                        console.log("You can pay")
                    } else {
                        console.log("pieces OK mais pas carte");
                        canDiscardCard = false;
                    }
                } else {
                    console.log("pas assez pieces")
                    canDiscardCard = false;
                }
            } else {
                // you need one of the 2 conditions
                let nbPieces = parseInt(/(\d+)OR([\dBGYP\+]+)/.exec(currentCard.discard)[1], 10);
                let cardsToHave = /(\d+)OR([\dBGYP\+]+)/.exec(currentCard.discard)[2];
                console.log(nbPieces, cardsToHave);
                if(stateCopy.players[posPlayer].money >= nbPieces){
                    console.log("C'est OK pour les pieces")
                }
                var OKAllColors = true;
                for(let i = 0; i < cardsToHave.split("+").length; i++){
                    if(!colorsInDeck(cardsToHave.split("+")[i], stateCopy.players[posPlayer].cards))
                        OKAllColors = false;
                }
                if(!OKAllColors && stateCopy.players[posPlayer].money < nbPieces){
                    canDiscardCard = false;
                }
            }

            if(canDiscardCard){
                // all is OK to discard, we can activate the power !
                var action = currentCard.power.match(/(\w+)=(.+)/)[1];
                var params = currentCard.power.match(/(\w+)=(.+)/)[2];
                switch(action){
                    case 'piecesAndVictory':
                        stateCopy.players[posPlayer].money += parseInt(params.match(/(\d+)AND(\d+)/)[1], 10);
                        stateCopy.players[posPlayer].victoryPoints += parseInt(params.match(/(\d+)AND(\d+)/)[2], 10);
                        break;
                    case 'choiceOthersLooseOrPAV': 
                        stateCopy.showChoice = true;
                        var choix = params.match(/(.*)OR(.*)/);
                        stateCopy.choice1 = 'Others loose ' + choix[1];
                        stateCopy.choice2 = 'You win ' + choix[2];
                        stateCopy.choiceFunction = (choice) => {
                            switch(choice){
                                case 1:
                                    for(var i = 0; i < stateCopy.players.length; i++){
                                        if(i !== posPlayer){
                                            stateCopy.players[i].money -= parseInt(choix[1].match(/(\d+)AND(\d+)/)[1], 10);
                                            stateCopy.players[i].victoryPoints -= parseInt(choix[1].match(/(\d+)AND(\d+)/)[2], 10);                                            
                                        }
                                    }
                                    break;
                                case 2:
                                    stateCopy.players[posPlayer].money += parseInt(choix[1].match(/(\d+)AND(\d+)/)[1], 10);
                                    stateCopy.players[posPlayer].victoryPoints += parseInt(choix[1].match(/(\d+)AND(\d+)/)[2], 10);                                            
                                    break;
                                default:
                                    break;
                            }
                            stateCopy.showChoice = false;
                            this.setState(stateCopy);
                        }
                        break;
                    case 'choiceVictoryFirstOrPAV':
                        stateCopy.showChoice = true;
                        var choix = params.match(/(.*)OR(.*)/);
                        stateCopy.choice1 = 'You start first and have ' + choix[1] + ' victory points';
                        stateCopy.choice2 = 'You have ' + choix[2];
                        stateCopy.choiceFunction = (choice) => {
                            switch(choice){
                                case 1:
                                    stateCopy.players[posPlayer].victoryPoints += parseInt(choix[1], 10);
                                    for(var i = 0; i < stateCopy.players.length; i++){
                                        // only the current player will start first
                                        stateCopy.players[i].forceStartFirst = i === posPlayer;
                                    }
                                    break;
                                case 2:
                                    stateCopy.players[posPlayer].money += parseInt(choix[1].match(/(\d+)AND(\d+)/)[1], 10);
                                    stateCopy.players[posPlayer].victoryPoints += parseInt(choix[1].match(/(\d+)AND(\d+)/)[2], 10);                                            
                                    break;
                                default:
                                    break;
                            }
                            stateCopy.showChoice = false;
                            this.setState(stateCopy);
                        }
                        break;
                    default:
                        break;
                }
                this.setState(stateCopy);
            }
        } else {
            console.log("discard pas OK")
        }
    }

    selectPlayer = (pName) => {
        var posPlayer = 0;
        for (; posPlayer < stateCopy.players.length; posPlayer++) {
            if (stateCopy.players[posPlayer].name === pName)
                break;
        }
        if (this.disableCardSelection && !stateCopy.players[posPlayer].alreadySelected) {
            stateCopy.players[posPlayer].alreadySelected = true;
            for (let i = 0; i < stateCopy.players.length; i++) {
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
                <Players players={this.state.players} clickCallback={this.selectPlayer} discardCallback={this.discardCard} />
                <Objectives objectives={this.objectives} /><br className="clearFloat" />
                <Cards cards={this.cards} selectCallback={this.selectCard} discardCallback={this.discardCard} />
                <Choice showBox={this.state.showChoice} choiceCallback={this.state.choiceFunction} choice1={this.state.choice1} choice2={this.state.choice2} />
            </div>
        );
    }
}

export default App;
