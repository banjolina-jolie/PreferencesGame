import { Template } from 'meteor/templating';

import { Entries } from '../../api/entries.js';

import '../components/entry.js';
import './body.html';
import '../pages/home-page.js';
import '../pages/games-show-page.js';

// Template.body.helpers({
//   entries() {
//     return Entries.find({});
//   },
//   entriesLength() {
//     return Entries.find({}).count();
//   },
// });

// Template.body.events({
//   'submit .new-entry'(event) {
//     // Prevent default browser form submit
//     event.preventDefault();

//     // Get value from form element
//     const target = event.target;
//     const text = target.text.value;

//     // Insert a entry into the collection
//     Entries.insert({
//       text,
//       createdAt: new Date(), // current time
//     });

//     // Clear form
//     target.text.value = '';
//   },
// });
