(function() {
  'use strict';

  let pathnameArray = location.pathname.split('/');
  let matchId = pathnameArray[pathnameArray.length - 1];

  let allAddMovesButtonDOM = document.querySelectorAll('.add-moves');
  let allMovesDOM = document.querySelectorAll('.move');
  let saveMatchButtonDOM = document.querySelector('.save-match');
  let finishMatchButtonDOM = document.querySelector('.finish-match');
  let deleteMoveButtonDOM = document.querySelectorAll('.delete-move');

  // bind events
  bindMovesListEvents(allMovesDOM);
  bindAddMovesButton(allAddMovesButtonDOM);
  bindSaveMatchButton(saveMatchButtonDOM);
  bindDeleteMoveButton(deleteMoveButtonDOM);

  if (finishMatchButtonDOM) {
    bindFinishMatchbutton(finishMatchButtonDOM);
  }

  function bindDeleteMoveButton(deleteButton) {
    if (!deleteButton) {
      return;
    }

    if (deleteButton instanceof HTMLElement) {
        deleteButton = [deleteButton];
    }

    addBatchEventListener(deleteButton, 'click', e => {
      let moves = searchParent(e.target, e => e.classList.contains('moves'));
      let prevSibling = moves.previousSibling;

      moves.parentElement.removeChild(moves);
      updatePlayerMatchFromMoves(prevSibling);
    });
  }

  function bindFinishMatchbutton(finishMatchButton) {
    finishMatchButton.addEventListener('click', e => {
      let players = getPlayersData();
      let parameters = {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ players: players })
      };

      let endpoint = '/api/matches/' + matchId + '/finish';

      fetch(endpoint, parameters).then(response => {
        return response.json();
      }).then(jsonResult => {
        location.href = '/matches';
      });
    });
  }

  function bindSaveMatchButton(saveMatchButton) {
    saveMatchButton.addEventListener('click', e => {
      let players = getPlayersData();
      let parameters, endpoint, putData;

      parameters = {
        method: 'PUT',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      };

      players.forEach(p => {
        endpoint = '/api/matches/' + matchId + '/player/' + p.id + '/moves';
        parameters.body = JSON.stringify({ moves: p.moves });

        fetch(endpoint, parameters).then(response => {
          return response.json()
        }).then(jsonResult => {
          console.log('-> jsonResult: ', jsonResult);
        });;
      });
    });
  }

  function getPlayersData() {
    let players = document.querySelectorAll('.player');
    let playerData = [];
    let moves, playerObject;

    players.forEach((p, i) => {
      playerObject = {
        id: p.getAttribute('data-player-id'),
        moves: []
      };

      moves = p.querySelectorAll('.moves');
      moves.forEach(m => playerObject.moves.push(getMovesFromMoveElement(m)));

      playerData.push(playerObject)
    });

    return playerData;
  }

  function getMovesFromMoveElement(move) {
    return {
      firstMove: parseInt(move.querySelector('.first-move').value, 10) || 0,
      secondMove: parseInt(move.querySelector('.second-move').value, 10) || 0,
      thirdMove: parseInt(move.querySelector('.third-move').value, 10) || 0
    };
  }

  function bindAddMovesButton(addMovesButtonDOM) {
    addBatchEventListener(addMovesButtonDOM, 'click', e => {
      e.preventDefault();

      let startElement = e.target;
      let playerElement = searchParent(startElement, e => e.classList.contains('player'));

      addNewMoves(playerElement);
    });
  }

  function bindMovesListEvents(movesList) {
    // single elemenet
    if (movesList instanceof HTMLElement) {
        movesList = [movesList];
    }

    addBatchEventListener(movesList, 'keyup', e => {
      updatePlayerMatchFromMoves(e.target);
    });
  }

  function updatePlayerMatchFromMoves(moves) {
    let playerElement = searchParent(moves, e => e.classList.contains('player'));
    let allMoves = playerElement.querySelectorAll('.move');
    let matchTotal = playerElement.querySelector('.match-total .value');

    let movesContainer = searchParent(moves, e => e.classList.contains('moves'));
    let movesList = movesContainer.querySelectorAll('.move');
    let moveTotal = movesContainer.querySelector('.move-total');

    let moveTotalValue = 0;
    let matchTotalValue = 0;

    movesList.forEach(e => {
      moveTotalValue += parseInt(e.value, 10) || 0;
    });

    allMoves.forEach(e => {
      matchTotalValue += parseInt(e.value, 10) || 0;
    });

    moveTotal.textContent = '= ' + moveTotalValue;
    matchTotal.textContent = 301 - matchTotalValue;
  }

  function searchParent(startElement, conditionCallback) {
    let element = startElement;
    do {
      if (conditionCallback(element)) {
        return element;
      }

    } while(element = element.parentElement);
  }

  function addNewMoves(playerElement) {
    let movesList = playerElement.querySelectorAll('.moves');
    let lastMovesElement = movesList[movesList.length - 1];

    let newMovesTemplate = `
      <button class="delete-move">Delete</button>
      <input class="move first-move"  value="0">
      <input class="move second-move" value="0">
      <input class="move third-move"  value="0">
      <span class="move-total">
        = 0
      </span>
    `;

    let newMovesElement = document.createElement('div');
    let deleteMovesButton;

    newMovesElement.classList.add('moves');
    newMovesElement.innerHTML = newMovesTemplate;
    deleteMovesButton = newMovesElement.querySelector('.delete-move');

    lastMovesElement.parentNode.insertBefore(
      newMovesElement, lastMovesElement.nextSibling
    );

    bindMovesListEvents(newMovesElement);
    bindDeleteMoveButton(deleteMovesButton)
  }

  function addBatchEventListener(elements, eventName, callback) {
    elements.forEach(e => {
      e.addEventListener(eventName, callback);
    });
  }
}());
