(function() {
  'use strict';

  let addMovesButtonList = document.querySelectorAll('.add-moves');

  addBatchEventListener(addMovesButtonList, 'click', e => {
    e.preventDefault();

    let playerElement = e.target;

    do {
      if (playerElement.classList.contains('player')) {
        addNewMoves(playerElement);
        break;
      }

    } while(playerElement = playerElement.parentElement);
  });

  function addNewMoves(playerElement) {
    let movesList = playerElement.querySelectorAll('.moves');
    let lastMovesElement = movesList[movesList.length - 1];

    let newMovesTemplate = `
      <button class="remove-moves">Remove</button>
      <input class="first-move"  value="0">
      <input class="second-move" value="0">
      <input class="third-move"  value="0">
      <span class="stage-total">
        = 0
      </span>
    `;

    let newMovesElement = document.createElement('div');
    newMovesElement.id = 'moves';
    newMovesElement.innerHTML = newMovesTemplate;

    lastMovesElement.parentNode.insertBefore(
      newMovesElement, lastMovesElement.nextSibling
    );
  }

  function addBatchEventListener(elements, eventName, callback) {
    elements.forEach(e => {
      e.addEventListener(eventName, callback);
    });
  }

}());
