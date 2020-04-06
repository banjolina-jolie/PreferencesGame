import { Template } from 'meteor/templating';

import { Tasks } from '../../api/tasks.js';

import '../components/task.js';
import './body.html';
import '../pages/home-page.js';
import '../pages/games-show-page.js';

// Template.body.helpers({
//   tasks() {
//     return Tasks.find({});
//   },
//   tasksLength() {
//     return Tasks.find({}).count();
//   },
// });

// Template.body.events({
//   'submit .new-task'(event) {
//     // Prevent default browser form submit
//     event.preventDefault();

//     // Get value from form element
//     const target = event.target;
//     const text = target.text.value;

//     // Insert a task into the collection
//     Tasks.insert({
//       text,
//       createdAt: new Date(), // current time
//     });

//     // Clear form
//     target.text.value = '';
//   },
// });