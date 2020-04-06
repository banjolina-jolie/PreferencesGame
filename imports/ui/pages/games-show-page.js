import { Template } from 'meteor/templating';

import { Games } from '../../api/games.js';
import { Tasks } from '../../api/tasks.js';

import './games-show-page.html';

Template.Games_show_page.onCreated(function gamesShowPageOnCreated() {
  this.getGameId = () => FlowRouter.getParam('_id');
  // console.log(this.getGameId());
  this.game = Games.findOne({ _id: this.getGameId() });
  // console.log(this.game);
  this.autorun(() => {
    // this.playerName = prompt('what is your name?');
    // console.log(this.game);
    // Games.update(this.getGameId, {$set: { playerNames }});
  });
});

Template.Games_show_page.onDestroyed(function gamesShowPageOnDestroyed() {

});

Template.Games_show_page.helpers({
  game() {
    return  Games.findOne({ _id: this.getGameId() });
  },
  selectedEntries() {
    const gameId = Template.instance().getGameId();
    return Tasks.find({ gameId, selected: true });
  },
  tasks() {
    const gameId = Template.instance().getGameId();
    return Tasks.find({ gameId });
  },
  tasksLength() {
    const gameId = Template.instance().getGameId();
    return Tasks.find({ gameId, selected: null }).count();
  },
});

Template.Games_show_page.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const text = $('#new-entry-input').val();

    if (!text) return;

    const gameId = Template.instance().getGameId();

    // Insert a task into the collection
    Tasks.insert({
      gameId,
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    $('#new-entry-input').val('');
  },

  'submit .new-round'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    const gameId = Template.instance().getGameId();

    Meteor.call('removeSelectedTasks', gameId);
    Meteor.call('setNewSelected', gameId);
  },
});
