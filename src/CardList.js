
/* 
effets:
    piecesPerColor=1xG means 1 piece per Green card
    pieces=2 means 2 pieces
    piecesVictoryDiscard=1&GBx1 means 1 piece and at the end, if you have a green or blue card you gain 1 victory point per card in your discard pile
    victoryPoints=1x2G means 1 victory point for each 2 green cards

discard:
    1AND1G means 1 piece and 1 green card
    1OR2G means 1 piece OR 2 green cards
    6OR1G+1B means 1 piece OR 1 green card and 1 blue card

power: 
    piecesAndVictory=1AND2 means 1 piece and 2 victory points
    choiceOthersLooseOrPAV=1AND2OR2AND3 means either every enemy looses 1 piece and 2 victory points OR you win 2 pieces and 3 victory points
    choiceVictoryFirstOrPAV=2OR3AND2 means either you have 2 victory points and you start first next round OR you win 3 pieces and 3 victory points
*/
export var cardsList = [
    { cost: 1, effect: 'pieces=1', color: 'G', discard: '6OR2P', power: 'piecesAndVictory=3AND2', configuration: '2' },
    { cost: 1, effect: 'pieces=1', color: 'B', discard: '6OR2Y', power: 'piecesAndVictory=3AND2', configuration: '2' },
    { cost: 1, effect: 'pieces=1', color: 'Y', discard: '6OR2G', power: 'piecesAndVictory=3AND2', configuration: '2' },
    { cost: 1, effect: 'pieces=1', color: 'P', discard: '6OR2B', power: 'piecesAndVictory=3AND2', configuration: '2' },
    {cost: 3, effect: 'pieces=1', color: 'G', discard:'6OR1P+1B', power: 'choiceVictoryFirstOrPAV=2OR3AND2', configuration: '3'},
    {cost: 3, effect: 'pieces=1', color: 'B', discard:'6OR1G+1Y', power: 'choiceVictoryFirstOrPAV=2OR3AND2', configuration: '3'},
    {cost: 3, effect: 'pieces=1', color: 'Y', discard:'6OR1G+1P', power: 'choiceVictoryFirstOrPAV=2OR3AND2', configuration: '3'},
    {cost: 3, effect: 'pieces=1', color: 'P', discard:'6OR1B+1Y', power: 'choiceVictoryFirstOrPAV=2OR3AND2', configuration: '3'},
    //   {cost: 4, effect: 'pieces=2', color: 'G', discard:'testDiscard2', power: 'testPower3', configuration: '2'},
    //   {cost: 4, effect: 'pieces=2', color: 'B', discard:'testDiscard2', power: 'testPower3', configuration: '2'},
    //   {cost: 4, effect: 'pieces=2', color: 'Y', discard:'testDiscard2', power: 'testPower3', configuration: '2'},
    //   {cost: 4, effect: 'pieces=2', color: 'P', discard:'testDiscard2', power: 'testPower3', configuration: '2'},
    { cost: 2, effect: 'piecesPerColor=1xB', color: 'G', discard: '5AND1P', power: 'choiceOthersLooseOrPAV=3AND2OR3AND2', configuration: '2' },
    { cost: 2, effect: 'piecesPerColor=1xP', color: 'Y', discard: '5AND1G', power: 'choiceOthersLooseOrPAV=3AND2OR3AND2', configuration: '2' },
    { cost: 2, effect: 'piecesPerColor=1xG', color: 'B', discard: '5AND1Y', power: 'choiceOthersLooseOrPAV=3AND2OR3AND2', configuration: '2' },
    { cost: 2, effect: 'piecesPerColor=1xY', color: 'P', discard: '5AND1B', power: 'choiceOthersLooseOrPAV=3AND2OR3AND2', configuration: '2' },
    //   {cost: 4, effect: 'piecesVictoryDiscard=1&PBx1', color: 'G', discard:'testDiscard', power: 'testPower', configuration: '2'},
    //   {cost: 4, effect: 'piecesVictoryDiscard=1&BYx1', color: 'P', discard:'testDiscard', power: 'testPower', configuration: '2'},
    //   {cost: 4, effect: 'piecesVictoryDiscard=1&GYx1', color: 'B', discard:'testDiscard', power: 'testPower', configuration: '2'},
    //   {cost: 4, effect: 'piecesVictoryDiscard=1&GPx1', color: 'Y', discard:'testDiscard', power: 'testPower', configuration: '2'},
    //   {cost: 2, effect: 'victoryPoints=1x2Y', color: 'B', discard:'testDiscard', power: 'testPower', configuration: '2'},
    //   {cost: 2, effect: 'victoryPoints=1x2P', color: 'G', discard:'testDiscard', power: 'testPower', configuration: '2'},
    //   {cost: 2, effect: 'victoryPoints=1x2B', color: 'P', discard:'testDiscard', power: 'testPower', configuration: '2'},
    //   {cost: 2, effect: 'victoryPoints=1x2G', color: 'Y', discard:'testDiscard', power: 'testPower', configuration: '2'}
];
