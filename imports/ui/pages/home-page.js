import { Template } from 'meteor/templating';

import { Games } from '../../api/games.js';

import './home-page.html';


Template.Home_page.events({
  'submit .create-game'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Insert a task into the collection
    Games.insert({
      createdAt: new Date(), // current time
    }, (err, gameId) => {
      FlowRouter.go('Games.show', { _id: gameId });
    });
  },
});
