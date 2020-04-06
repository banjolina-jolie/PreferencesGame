import { Mongo } from 'meteor/mongo';

export const Entries = new Mongo.Collection('entries');

if (Meteor.isServer) {
  Meteor.startup(function() {
    return Meteor.methods({

      removeSelectedEntries: function(gameId) {
        return Entries.remove({ gameId, selected: true });
      },

      setNewSelected: function(gameId) {
        const entries = Entries.find({ gameId }).fetch();

        // Shuffle array
        const shuffled = entries.sort(() => 0.5 - Math.random());

        // Get sub-array of first n elements after shuffled
        const selected = shuffled.slice(0, 4).map(x => x._id);

        selected.forEach((entryId, idx) => {
          Entries.update({
            gameId,
            _id: entryId,
          },
          {
            $set: {
              selected: true,
              rank: idx + 1,
            },
          })
        });
      },

      changeEntryRank: function({ gameId, entryId, rank }) {
        const entries = Entries.find({ gameId, selected: true }).fetch();
        let sortedByRank = [];
        let selectedEntry;

        entries.forEach((entry, idx) => {
          sortedByRank[entry.rank - 1] = entry;
        });

        for (let i in sortedByRank) {
          if (sortedByRank[i]._id === entryId) {
            selectedEntry = sortedByRank.splice(i, 1)[0];
          }
        }

        sortedByRank.splice(rank-1, 0, selectedEntry);

        sortedByRank.forEach((entry, idx) => {
          Entries.update({
            _id: entry._id
          },
          {
            $set: {
              rank: idx + 1,
            },
          })
        });
      },

    });
  });

}