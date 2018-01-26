import React from 'react';
import Cards from './Cards';
import Objectives from './Objectives';

class Player extends React.Component {
    render() {
        var alreadySelectedClass = this.props.alreadySelected ? 'alreadySelected' : '';
        return (
            <div className={`header ${alreadySelectedClass}`} onClick={() => { this.props.clickCallback(this.props.name); }}>
                <span className="victoryPoints">{this.props.victoryPoints}</span> {this.props.name} <span className="goldpiece">{this.props.money}</span>
            </div>
        );
    }
}

class Players extends React.Component {
    render() {
        var playerList = [];
        for (var i = 0; i < this.props.players.length; i++) {
            var p = this.props.players[i];
            var currentClass = p.current ? 'current' : '';
            var discardModeClass = p.discardMode ? 'discardMode' : '';
            playerList.push(
                <div className={`player ${currentClass} ${discardModeClass}`} key={p.name}>
                    <Objectives objectives={p.objectivesAttained} /><br className="clearFloat" />
                    <Player
                        name={p.name}
                        money={p.money}
                        victoryPoints={p.victoryPoints}
                        alreadySelected={p.alreadySelected}
                        discardMode={p.discardMode}
                        clickCallback={this.props.clickCallback}
                    />
                    <br className="clearFloat" />
                    <Cards cards={p.cards} discardCallback={this.props.discardCallback} />
                    <br className="clearFloat" />
                    <Cards cards={p.discard} discardCallback={() => {}} />
                </div>
            );
        }
        return (
            <div className="players">
                {playerList}
            </div>
        );
    }
}

export default Players;
