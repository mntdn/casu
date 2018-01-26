import React from 'react';

class Card extends React.Component {
    render() {
        var effectAction = this.props.effect.match(/(\w+)=(.+)/)[1];
        var effectParams = this.props.effect.match(/(\w+)=(.+)/)[2];
        var effectHtml = null;
        switch(effectAction){
            case 'pieces':
                effectHtml = <span className="goldpiece">{effectParams}</span>;
                break;
            case 'piecesPerColor':
                let qtyPerColor = +effectParams.match(/(\d+)x(\d+)(\w+)/)[1];
                let qtyOfColor = +effectParams.match(/(\d+)x(\d+)(\w+)/)[2];
                let color = effectParams.match(/(\d+)x(\d+)(\w+)/)[3];
                effectHtml = <span><span className={"fullCard color" + color}>{qtyOfColor}</span> = <span className="goldpiece">{qtyPerColor}</span></span>
                break;
            case 'piecesVictoryDiscard':
                let qtyPieces = +effectParams.match(/(\d+)&([\w\+]+)x(\d+)/)[1];
                let colors = effectParams.match(/(\d+)&([\w\+]+)x(\d+)/)[2];
                let qtyVictory = +effectParams.match(/(\d+)&([\w\+]+)x(\d+)/)[3];
                var cardArray = [];
                var colorsArray = colors.split('+');
                for(var i = 0; i < colorsArray.length; i++){
                    cardArray.push(<span className={"fullCard sm color" + colorsArray[i]}></span>);
                    cardArray.push(<span>+</span>);
                }
                cardArray.pop();
                effectHtml = <span>
                    <span className="endFlag"></span> : {cardArray} -> <span className={"fullCard sm colorDiscard"}></span> = 
                    <span className="victoryPoints sm">{qtyVictory}</span>
                </span>
                break;
            case 'piecesAndDiscard':
                var qtyPieces = +effectParams.match(/(\d+)AND(\d+)/)[1];
                let qtyDiscard = +effectParams.match(/(\d+)AND(\d+)/)[2];
                effectHtml = <span>
                    <span className="goldpiece">{qtyPieces}</span><br />
                    <span className={"fullCard colorDiscard"}>&nbsp;</span> = <span className="goldpiece">{qtyDiscard}</span>
                </span>
                break;
            case 'victoryPoints':
                let qtyVictoryPoints = +effectParams.match(/(\d+)x(\d+)(\w+)/)[1];
                let cardsQtyForVictoryPoints = +effectParams.match(/(\d+)x(\d+)(\w+)/)[2];
                let cardsColorForVictoryPoints = effectParams.match(/(\d+)x(\d+)(\w+)/)[3];
                effectHtml = <span>
                        <span className={"fullCard color" + cardsColorForVictoryPoints}>{cardsQtyForVictoryPoints}</span> = 
                        <span className="victoryPoints">{qtyVictoryPoints}</span>
                    </span>;
                break;
            default:
                break;
        }

        var discardHtml = null;
        if (this.props.discard.indexOf("AND") > 0) {
            // you need both conditions
            let nbPieces = +this.props.discard.match(/(\d+)AND([\dBGYP]+)/)[1];
            let cardsToHave = this.props.discard.match(/(\d+)AND([\dBGYP]+)/)[2];
            discardHtml = <span>
                <span className="goldpiece">{nbPieces}</span> +&nbsp;
                <span className={"fullCard color" + cardsToHave.match(/\d([BGYP])/)[1]}>{cardsToHave.match(/(\d)[BGYP]/)[1]}</span>
            </span>;
        } else {
            let nbPieces = +this.props.discard.match(/(\d+)OR([\dBGYP\+]+)/)[1];
            let cardsToHave = this.props.discard.match(/(\d+)OR([\dBGYP\+]+)/)[2];
            let cardsHtml = [];
            for (let i = 0; i < cardsToHave.split("+").length; i++) {
                let c = cardsToHave.split("+")[i];
                cardsHtml.push(<span className={"fullCard color" + c.match(/\d([BGYP])/)[1]}>{c.match(/(\d)[BGYP]/)[1]}</span>);
                cardsHtml.push(<span>+</span>);
            }
            cardsHtml.pop();
            discardHtml = <span>
                    <span className="goldpiece">{nbPieces}</span> / {cardsHtml}
                </span>;
        }

        var action = this.props.power.match(/(\w+)=(.+)/)[1];
        var params = this.props.power.match(/(\w+)=(.+)/)[2];
        var powerHtml = null;
        switch (action) {
            case 'piecesAndVictory':
                let money = +params.match(/(\d+)AND(\d+)/)[1];
                let victoryPoints = +params.match(/(\d+)AND(\d+)/)[2];
                powerHtml = <span><span className="goldpiece">{money}</span> + <span className="victoryPoints">{victoryPoints}</span></span>;
                break;
            case 'choiceOthersLooseOrPAV':
                var choix = params.match(/(.*)OR(.*)/);
                powerHtml = <span>
                        <span className="enemy"></span> -<span className="goldpiece">{choix[1].match(/(\d+)AND(\d+)/)[1]}</span> -<span className="victoryPoints">{choix[1].match(/(\d+)AND(\d+)/)[2]}</span>
                        <hr className="choice" />
                        <span className="goldpiece">{choix[2].match(/(\d+)AND(\d+)/)[1]}</span> <span className="victoryPoints">{choix[2].match(/(\d+)AND(\d+)/)[2]}</span>
                    </span>;
                break;
            case 'choiceVictoryFirstOrPAV':
                var choix = params.match(/(.*)OR(.*)/);
                powerHtml = <span>
                    <span className="victoryPoints">{choix[1]}</span> + <span className="first"></span>
                    <hr className="choice" />
                    <span className="goldpiece">{choix[2].match(/(\d+)AND(\d+)/)[1]}</span> + <span className="victoryPoints">{choix[2].match(/(\d+)AND(\d+)/)[2]}</span>
                </span>;
                break;
            case 'discardAndVictory':
                powerHtml = <span>
                        <span className="enemy"></span>: <span className="fullCard sm colorWhite"></span>&#8631;<span className="fullCard sm colorDiscard"></span>&#8594;
                        +<span className="victoryPoints">{params}</span>
                    </span>;                
                break;
            case 'piecesVictoryAndFirst':
                var money = +params.match(/(\d+)AND(\d+)/)[1];
                var victoryPoints = +params.match(/(\d+)AND(\d+)/)[2];
                powerHtml = <span><span className="goldpiece">{money}</span> + <span className="victoryPoints">{victoryPoints}</span> + <span className="first"></span></span>;
                break;
            case 'choicePAVOrVictory':
                var choix = params.match(/(.*)OR(.*)/);
                powerHtml = <span>
                        <span className="goldpiece">{choix[1].match(/(\d+)AND(\d+)/)[1]}</span> + <span className="victoryPoints">{choix[1].match(/(\d+)AND(\d+)/)[2]}</span>
                        <hr className="choice" />
                        <span className="victoryPoints">{choix[2]}</span>
                    </span>;
                break;
            case 'choiceEnemyLooseVictoryAndDiscardOrVictoryPoints':
                var choix = params.match(/(.*)OR(.*)/);
                powerHtml = <div>
                        <div><span className="enemy"></span> - <span className="victoryPoints">{choix[1].match(/(\d+)AND(\d+)/)[1]}</span> - <span className="fullCard colorDiscard">{choix[1].match(/(\d+)AND(\d+)/)[2]}</span></div>
                        <hr className="choice" />
                        <span className="victoryPoints">{choix[2]}</span>
                    </div>;
                break;
            case 'choicePAVAndFirstOrDiscard':
                powerHtml = <div>
                        <span className="goldpiece">{params.match(/(\d+)AND(\d+)/)[1]}</span> + <span className="victoryPoints">{params.match(/(\d+)AND(\d+)/)[2]}</span> + <span className="first"></span>
                        <hr className="choice" />
                        <span className="enemy"></span>: <span className="fullCard sm colorWhite"></span>&#8631;<span className="fullCard sm colorDiscard"></span>
                    </div>;
                break;
            case 'victoryPerDiscard':
                powerHtml = <div>
                        <span className="fullCard colorDiscard"></span> = <span className="victoryPoints">{params}</span>
                    </div>;
                break;
            case 'enemyLoosePiecesYouWinVictory':
                powerHtml = <div>
                        <span className="enemy"></span> - <span className="goldpiece">{params.match(/(\d+)AND(\d+)/)[1]}</span>
                        <br />
                        + <span className="victoryPoints">{params.match(/(\d+)AND(\d+)/)[2]}</span>
                    </div>;
                break;
            default:
                break;
        }
        return (
            <div className={"card " + this.props.color}>
                <span className="cost clickable" onClick={() => { this.props.clickCallback(this.props.id); }}>
                    <span className="goldpiece">{this.props.cost}</span>
                </span>
                <span className="effect">{effectHtml}</span>
                <hr />
                <span className="discard clickable" onClick={() => { this.props.discardCallback(this.props.id); }}>{discardHtml}</span>
                <hr />
                <span className="power">{powerHtml}</span>
            </div>
        );
    }
}

class Cards extends React.Component {
    render() {
        var cardList = [];
        if (this.props.cards) {
            for (var i = 0; i < this.props.cards.length; i++) {
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
        return (
            <div>{cardList}</div>
        );
    }
}

export default Cards;
