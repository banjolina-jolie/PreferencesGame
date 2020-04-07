import { Template } from 'meteor/templating';

import { Games } from '../../api/games.js';
import { Entries } from '../../api/entries.js';
import { Session } from 'meteor/session';

import './games-show-page.html';

Template.Games_show_page.onCreated(function gamesShowPageOnCreated() {
  this.getGameId = () => FlowRouter.getParam('_id');
  this.getCurrentGame = () => Games.findOne({ _id: this.getGameId() });

  Session.set('submitOnReturn', true);
  // this.getSubmitOnReturn = () => this.submitOnReturn
  // this.toggleSubmitOnReturn = () => this.submitOnReturn = !this.submitOnReturn
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
  },
});

Template.Games_show_page.events({
  'keydown #new-entry-input'(e) {
    if (e.keyCode === 13 && Session.get('submitOnReturn')) {
      e.preventDefault();
      const text = $('#new-entry-input').val();
      $('#new-entry-input').val('');
      const gameId = Template.instance().getGameId();
      Entries.insert({
        gameId,
        text,
        createdAt: new Date(),
      });
    }
  },
  'submit .new-entry'(e) {
    e.preventDefault();

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

  'submit .new-round'(e) {
    e.preventDefault();

    const gameId = Template.instance().getGameId();

    Meteor.call('removeSelectedEntries', gameId);
    Meteor.call('setNewSelected', gameId);
  },

  'click .change-rank'(e) {
    const gameId = Template.instance().getGameId();
    const { rank, entryId } = $(e.target).data();

    Meteor.call('changeEntryRank', {
      gameId,
      entryId,
      rank,
    });
  },

  'change [name="submitOnReturn"]'(e) {
    Session.set('submitOnReturn', !Session.get('submitOnReturn'));
  }

});
