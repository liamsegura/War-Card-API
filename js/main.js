document.querySelector('button').addEventListener('click', getFetch)

// let deckId = ''
// let twoCards = ''
// document.getElementById('player1').src = ''
// document.getElementById('player2').src = ''

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => res.json()) // parse response as JSON
.then(data => {
  deckId = data.deck_id
  twoCards = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

})
.catch(err => {
    console.log(`error ${err}`)
});

function getFetch(){
  

fetch(twoCards)
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data.cards[0].value)
  console.log(data.cards[1].value)
  document.getElementById('player1').src = data.cards[0].image
  document.getElementById('player2').src = data.cards[1].image

  let player1Val = convertToNum(data.cards[0].value)
  let player2Val = convertToNum(data.cards[1].value)

  if(player1Val > player2Val){
    document.getElementById('result').innerText = 'Player 1 wins!'
  }
  else if(player1Val == player2Val){
    document.getElementById('result').innerText = 'Draw!'
  }
  else if(player1Val < player2Val){
    document.getElementById('result').innerText = 'Player 2 wins!' 
  }
})
.catch(err => {
    console.log(`error ${err}`)
});

}


function convertToNum(val){
  if(val === 'ACE'){
    return 14
  }
  else if(val === 'KING'){
    return 13
  }
  else if(val === 'QUEEN'){
    return 12
  }
  else if(val === 'JOKER'){
    return 11
  }
  else{
    return Number(val)
  }
}
