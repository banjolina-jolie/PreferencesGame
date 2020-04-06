import { Mongo } from 'meteor/mongo';

export const Entries = new Mongo.Collection('entries');

// export function removeSelectedEntries(gameId) {
//   return Entries.remove({ gameId, selected: true });
// }

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
        Entries.update({
          gameId,
          _id: { $in: selected },
        },
        {
          $set: {
            selected: true,
          },
        },
        {
          multi: true,
        });
      }
    });
  });

}