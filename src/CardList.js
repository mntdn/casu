
/* 
effets:
    piecesPerColor=2x2G means 2 pieces for 2 Green card
    pieces=2 means 2 pieces
    piecesVictoryDiscard=1&G+Bx1 means 1 piece and at the end, if you have a green or blue card you gain 1 victory point per card in your discard pile
    victoryPoints=1x2G means 1 victory point for each 2 green cards
    piecesAndDiscard=1AND1 means 1 piece and 1 piece per card in your discard pile

discard:
    1AND1G means 1 piece and 1 green card
    1OR2G means 1 piece OR 2 green cards
    6OR1G+1B means 1 piece OR 1 green card and 1 blue card

power: 
    piecesAndVictory=1AND2 means 1 piece and 2 victory points
    choiceOthersLooseOrPAV=1AND2OR2AND3 means either every enemy looses 1 piece and 2 victory points OR you win 2 pieces and 3 victory points
    choiceVictoryFirstOrPAV=2OR3AND2 means either you have 2 victory points and you start first next round OR you win 3 pieces and 3 victory points
    discardAndVictory=2 means you discard 1 card for each adversary, he does not pay and does not gain the benefits but gains 2 VP
    choicePAVOrVictory=6AND1OR2 means you choose between 6 pieces and 1 victory point OR 2 victory points
    choicePAVAndFirstOrDiscard=8AND2 means you choose between 8 pieces and 2 victory points and starting first next turn OR discard 1 card for each enemy
    piecesVictoryAndFirst=10AND2 means you earn 10 pieces, 2 victory points and you start first next round
    choiceEnemyLooseVictoryAndDiscardOrVictoryPoints=2AND2OR3 means enemies lose 2 victory points and 2 card from their discard OR you earn 3 victory points
    victoryPerDiscard=1 means you earn 1 victory point per card in your discard pile
    enemyLoosePiecesYouWinVictory=3AND2 means each enemy looses 3 pieces and you earn 2 victory points
*/
export var cardsList = [
    { cost: 2, effect: 'piecesPerColor=1x1B', color: 'G', discard: '5AND1P', power: 'choiceOthersLooseOrPAV=3AND2OR3AND2', configuration: '2' },
    { cost: 2, effect: 'piecesPerColor=1x1P', color: 'Y', discard: '5AND1G', power: 'choiceOthersLooseOrPAV=3AND2OR3AND2', configuration: '2' },
    { cost: 2, effect: 'piecesPerColor=1x1G', color: 'B', discard: '5AND1Y', power: 'choiceOthersLooseOrPAV=3AND2OR3AND2', configuration: '2' },
    { cost: 2, effect: 'piecesPerColor=1x1Y', color: 'P', discard: '5AND1B', power: 'choiceOthersLooseOrPAV=3AND2OR3AND2', configuration: '2' },

    { cost: 1, effect: 'pieces=1', color: 'G', discard: '6OR2P', power: 'piecesAndVictory=3AND2', configuration: '2' },
    { cost: 1, effect: 'pieces=1', color: 'B', discard: '6OR2Y', power: 'piecesAndVictory=3AND2', configuration: '2' },
    { cost: 1, effect: 'pieces=1', color: 'Y', discard: '6OR2G', power: 'piecesAndVictory=3AND2', configuration: '2' },
    { cost: 1, effect: 'pieces=1', color: 'P', discard: '6OR2B', power: 'piecesAndVictory=3AND2', configuration: '2' },

    { cost: 4, effect: 'piecesVictoryDiscard=1&P+Bx1', color: 'G', discard: '7AND1Y', power: 'piecesVictoryAndFirst=10AND2', configuration: '2' },
    { cost: 4, effect: 'piecesVictoryDiscard=1&B+Yx1', color: 'P', discard: '7AND1G', power: 'piecesVictoryAndFirst=10AND2', configuration: '2' },
    { cost: 4, effect: 'piecesVictoryDiscard=1&G+Yx1', color: 'B', discard: '7AND1P', power: 'piecesVictoryAndFirst=10AND2', configuration: '2' },
    { cost: 4, effect: 'piecesVictoryDiscard=1&G+Px1', color: 'Y', discard: '7AND1B', power: 'piecesVictoryAndFirst=10AND2', configuration: '2' },

    { cost: 4, effect: 'pieces=2', color: 'G', discard: '4AND1B', power: 'discardAndVictory=2', configuration: '2' },
    { cost: 4, effect: 'pieces=2', color: 'B', discard: '4AND1G', power: 'discardAndVictory=2', configuration: '2' },
    { cost: 4, effect: 'pieces=2', color: 'Y', discard: '4AND1P', power: 'discardAndVictory=2', configuration: '2' },
    { cost: 4, effect: 'pieces=2', color: 'P', discard: '4AND1Y', power: 'discardAndVictory=2', configuration: '2' },

    { cost: 2, effect: 'victoryPoints=1x2Y', color: 'B', discard: '6OR2G', power: 'choicePAVOrVictory=6AND1OR2', configuration: '2' },
    { cost: 2, effect: 'victoryPoints=1x2P', color: 'G', discard: '6OR2B', power: 'choicePAVOrVictory=6AND1OR2', configuration: '2' },
    { cost: 2, effect: 'victoryPoints=1x2B', color: 'P', discard: '6OR2Y', power: 'choicePAVOrVictory=6AND1OR2', configuration: '2' },
    { cost: 2, effect: 'victoryPoints=1x2G', color: 'Y', discard: '6OR2P', power: 'choicePAVOrVictory=6AND1OR2', configuration: '2' },

    { cost: 3, effect: 'piecesAndDiscard=1AND1', color: 'P', discard: '6AND1Y', power: 'choiceEnemyLooseVictoryAndDiscardOrVictoryPoints=2AND2OR3', configuration: '2' },
    { cost: 3, effect: 'piecesAndDiscard=1AND1', color: 'B', discard: '6AND1G', power: 'choiceEnemyLooseVictoryAndDiscardOrVictoryPoints=2AND2OR3', configuration: '2' },
    { cost: 3, effect: 'piecesAndDiscard=1AND1', color: 'G', discard: '6AND1B', power: 'choiceEnemyLooseVictoryAndDiscardOrVictoryPoints=2AND2OR3', configuration: '2' },
    { cost: 3, effect: 'piecesAndDiscard=1AND1', color: 'Y', discard: '6AND1P', power: 'choiceEnemyLooseVictoryAndDiscardOrVictoryPoints=2AND2OR3', configuration: '2' },

    { cost: 3, effect: 'pieces=1', color: 'G', discard: '6OR1P+1B', power: 'choiceVictoryFirstOrPAV=2OR3AND2', configuration: '3' },
    { cost: 3, effect: 'pieces=1', color: 'B', discard: '6OR1G+1Y', power: 'choiceVictoryFirstOrPAV=2OR3AND2', configuration: '3' },
    { cost: 3, effect: 'pieces=1', color: 'Y', discard: '6OR1G+1P', power: 'choiceVictoryFirstOrPAV=2OR3AND2', configuration: '3' },
    { cost: 3, effect: 'pieces=1', color: 'P', discard: '6OR1B+1Y', power: 'choiceVictoryFirstOrPAV=2OR3AND2', configuration: '3' },

    { cost: 2, effect: 'piecesPerColor=1x1P', color: 'G', discard: '6AND1B', power: 'choicePAVOrVictory=8AND1OR3', configuration: '3' },
    { cost: 2, effect: 'piecesPerColor=1x1B', color: 'P', discard: '6AND1Y', power: 'choicePAVOrVictory=8AND1OR3', configuration: '3' },
    { cost: 2, effect: 'piecesPerColor=1x1Y', color: 'B', discard: '6AND1G', power: 'choicePAVOrVictory=8AND1OR3', configuration: '3' },
    { cost: 2, effect: 'piecesPerColor=1x1G', color: 'Y', discard: '6AND1P', power: 'choicePAVOrVictory=8AND1OR3', configuration: '3' },

    { cost: 4, effect: 'pieces=1', color: 'G', discard: '8OR1B+1P+1Y', power: 'choicePAVAndFirstOrDiscard=8AND2', configuration: '3' },
    { cost: 4, effect: 'pieces=1', color: 'B', discard: '8OR1G+1P+1Y', power: 'choicePAVAndFirstOrDiscard=8AND2', configuration: '3' },
    { cost: 4, effect: 'pieces=1', color: 'P', discard: '8OR1G+1B+1Y', power: 'choicePAVAndFirstOrDiscard=8AND2', configuration: '3' },
    { cost: 4, effect: 'pieces=1', color: 'Y', discard: '8OR1G+1B+1P', power: 'choicePAVAndFirstOrDiscard=8AND2', configuration: '3' },

    { cost: 1, effect: 'pieces=1', color: 'Y', discard: '8AND1B', power: 'victoryPerDiscard=1', configuration: '4' },
    { cost: 1, effect: 'pieces=1', color: 'B', discard: '8AND1P', power: 'victoryPerDiscard=1', configuration: '4' },
    { cost: 1, effect: 'pieces=1', color: 'G', discard: '8AND1Y', power: 'victoryPerDiscard=1', configuration: '4' },
    { cost: 1, effect: 'pieces=1', color: 'P', discard: '8AND1G', power: 'victoryPerDiscard=1', configuration: '4' },

    { cost: 3, effect: 'piecesPerColor=2x2P', color: 'P', discard: '5AND1B', power: 'enemyLoosePiecesYouWinVictory=3AND2', configuration: '4' },
    { cost: 3, effect: 'piecesPerColor=2x2B', color: 'B', discard: '5AND1Y', power: 'enemyLoosePiecesYouWinVictory=3AND2', configuration: '4' },
    { cost: 3, effect: 'piecesPerColor=2x2Y', color: 'Y', discard: '5AND1G', power: 'enemyLoosePiecesYouWinVictory=3AND2', configuration: '4' },
    { cost: 3, effect: 'piecesPerColor=2x2G', color: 'G', discard: '5AND1P', power: 'enemyLoosePiecesYouWinVictory=3AND2', configuration: '4' },
];
