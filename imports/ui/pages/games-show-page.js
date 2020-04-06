import { Template } from 'meteor/templating';

import { Games } from '../../api/games.js';
import { Entries } from '../../api/entries.js';

import './games-show-page.html';

Template.Games_show_page.onCreated(function gamesShowPageOnCreated() {
  this.getGameId = () => FlowRouter.getParam('_id');
  this.getCurrentGame = () => Games.findOne({ _id: this.getGameId() });
});

Template.Games_show_page.helpers({
  selectedEntries() {
    const gameId = Template.instance().getGameId();
    return Entries.find({ gameId, selected: true }, { sort: [['rank']]});
  },
  entriesLength() {
    const gameId = Template.instance().getGameId();
    return Entries.find({ gameId, selected: null }).count();
  },
  players() {
    const gameId = Template.instance().getGameId();
    const game = Games.findOne({ _id: gameId });

    if (game && game.playerNames) {
      game.playerNames = JSON.parse(game.playerNames);
      return game.playerNames.filter(p => !!p);
    }
  }
});

Template.Games_show_page.events({
  'submit .new-entry'(event) {
    event.preventDefault();

    const text = $('#new-entry-input').val();

    if (!text) return;

    const gameId = Template.instance().getGameId();

    Entries.insert({
      gameId,
      text,
      createdAt: new Date(),
    });

    $('#new-entry-input').val('');
  },

  'submit .new-round'(event) {
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
