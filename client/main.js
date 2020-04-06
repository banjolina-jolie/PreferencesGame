import '../imports/ui/layouts/body.js';
import '../imports/ui/pages/home-page.js';


FlowRouter.route('/games/:_id', {
  name: 'Games.show',
  action(params, queryParams) {
    BlazeLayout.render('App_body', {main: 'Games_show_page'});
  }
});

FlowRouter.route('/', {
  name: 'Home',
  action(params, queryParams) {
    BlazeLayout.render('App_body', {main: 'Home_page'});
  }
});