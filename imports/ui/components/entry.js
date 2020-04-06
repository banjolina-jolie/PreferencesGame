import { Template } from 'meteor/templating';

import { Entries } from '../../api/entries.js';

import './entry.html';

Template.entry.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Entries.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Entries.remove(this._id);
  },
});
