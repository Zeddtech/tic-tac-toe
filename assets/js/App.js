const boxes = document.querySelectorAll('li');
const activePlayer = document.querySelector('.active-player');
const resetBtn = document.querySelectorAll('button');
resetBtn.forEach((btn)=> {
  btn.addEventListener('click', ()=> {
    location.reload();
  });
})
let player_x = 1;
let player_o = 0;
let boxActived = false;
let currentplayer;
let xRemainingCard = 3;
let yRemainingCard = 3;
let finishedMode = false;
let prevbox;
let clickedcontent = '';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
function checkwin() {
  return WINNING_COMBINATIONS.some((combn)=> {
    return combn.every((index)=> {
      return boxes[index].innerText == currentplayer

    })
  })
}
function currentplayerfn() {
  currentplayer = player_x ? 'x': 'o'
}
boxes.forEach((box, indx)=> {

  box.addEventListener("click", (e)=> {

    if (player_x & !box.innerText & xRemainingCard > 0 & !boxActived) {
      currentplayerfn()
      box.innerHTML = '<div class="">x</div>';
      activePlayer.innerText = 'player O turn';
      player_x = 0;
      player_o = 1;
      xRemainingCard--;

    } else if (player_o & !box.innerText & yRemainingCard > 0) {
      currentplayerfn();
      box.innerHTML = '<div class="">o</div>';
      activePlayer.innerText = 'player X turn';
      player_x = 1;
      player_o = 0;
      yRemainingCard--;

    }
    if (player_x & box.hasChildNodes() & yRemainingCard == -1 & !boxActived) {
      if (e.target.innerHTML == 'x') {
        currentplayerfn();
        boxinner = box.querySelector('div');
        boxinner.classList.toggle ('active');
        boxActived = true;
        clickedcontent = e.target.innerHTML;
        prevbox = e.target;
      } else if(e.target.innerHTML == 'o'){
        activePlayer.classList.add("shake")
        setTimeout(function() {
           activePlayer.classList.remove("shake")
        }, 1000);
      }
    } else if (player_o & box.hasChildNodes() & yRemainingCard == -1 & !boxActived) {
      if (e.target.innerHTML == 'o') {
        currentplayerfn()
        boxinner = box.querySelector('div');
        boxinner.classList.toggle ('active');
        boxActived = true;
        clickedcontent = e.target.innerHTML;
        prevbox = e.target;
      } else if(e.target.innerHTML == 'x') {
        activePlayer.classList.add("shake")
        setTimeout(function() {
           activePlayer.classList.remove("shake")
        }, 1000);
      }
    }
    transfer(clickedcontent, e, prevbox);
    if (xRemainingCard == 0) {
      xRemainingCard--;
    }


    if (yRemainingCard == 0) {
      yRemainingCard--;
    }
    if (checkwin()) {
      const winbox = document.querySelector('.winner');
      console.log(winbox);
      winbox.classList.remove('hide')
      winbox.querySelector('h4').innerText = `player ${currentplayer} won `
    }
  });

});

function transfer(clickedcontent, e, prevbox) {
  if (boxActived && !e.target.innerHTML) {
    currentplayerfn()
    e.target.innerHTML = clickedcontent;
    prevbox.innerHTML = '';
    prevbox.classList.remove('active');
    boxActived = false;

    if (clickedcontent == 'x') {
      currentplayerfn()
      player_x = 0;
      player_o = 1;
      activePlayer.innerText = 'player O turn';

    } else {
      currentplayerfn()
      player_x = 1;
      player_o = 0;
      activePlayer.innerText = 'player X turn';

    }

  }
}