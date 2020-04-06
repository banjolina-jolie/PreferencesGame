import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

// export function removeSelectedTasks(gameId) {
//   return Tasks.remove({ gameId, selected: true });
// }

if (Meteor.isServer) {
  Meteor.startup(function() {
    return Meteor.methods({
      removeSelectedTasks: function(gameId) {
        return Tasks.remove({ gameId, selected: true });
      },
      setNewSelected: function(gameId) {
        const entries = Tasks.find({ gameId }).fetch();

        // Shuffle array
        const shuffled = entries.sort(() => 0.5 - Math.random());

        // Get sub-array of first n elements after shuffled
        const selected = shuffled.slice(0, 4).map(x => x._id);
        Tasks.update({
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