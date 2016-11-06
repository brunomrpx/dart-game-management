(function() {
  'use strict';

  let addPlayersButton = document.querySelector('#add-users');
  let removePlayersButton = document.querySelector('#remove-users');
  let usersSelect = document.querySelector('#users-list');
  let playersSelect = document.querySelector('#players');

  addPlayersButton.addEventListener('click', e => {
    e.preventDefault();

    let options = Array.prototype.slice.call(usersSelect.options);

    options.forEach(o => {
      if (o.selected) {
        playersSelect.options.add(o);
      }
    });
  });

  removePlayersButton.addEventListener('click', e => {
    e.preventDefault();

    let options = Array.prototype.slice.call(playersSelect.options);

    options.forEach(o => {
      if (o.selected) {
        usersSelect.options.add(o);
      }
    });
  });
}());
