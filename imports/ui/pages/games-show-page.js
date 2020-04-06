import { Template } from 'meteor/templating';

import { Games } from '../../api/games.js';
import { Entries } from '../../api/entries.js';

import './games-show-page.html';

Template.Games_show_page.onCreated(function gamesShowPageOnCreated() {
  this.getGameId = () => FlowRouter.getParam('_id');
  this.autorun(() => {
    // this.playerName = prompt('what is your name?');
    // Games.update(this.getGameId, {$set: { playerNames }});
  });
});

Template.Games_show_page.onDestroyed(function gamesShowPageOnDestroyed() {

});

Template.Games_show_page.helpers({
  game() {
    return Games.findOne({ _id: this.getGameId() });
  },
  selectedEntries() {
    const gameId = Template.instance().getGameId();
    return Entries.find({ gameId, selected: true }, { sort: [['rank']]});
  },
  entries() {
    const gameId = Template.instance().getGameId();
    return Entries.find({ gameId });
  },
  entriesLength() {
    const gameId = Template.instance().getGameId();
    return Entries.find({ gameId, selected: null }).count();
  },
});

Template.Games_show_page.events({
  'submit .new-entry'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const text = $('#new-entry-input').val();

    if (!text) return;

    const gameId = Template.instance().getGameId();

    // Insert a entry into the collection
    Entries.insert({
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

    Meteor.call('removeSelectedEntries', gameId);
    Meteor.call('setNewSelected', gameId);
  },

  'click .change-rank'(event) {
    const gameId = Template.instance().getGameId();
    const { rank, entryId } = $(event.target).data();

    Meteor.call('changeEntryRank', {
      gameId,
      entryId,
      rank,
    });
  },

});
