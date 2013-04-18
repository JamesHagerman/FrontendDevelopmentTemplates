App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.route("ember_intro", { path: "/ember_intro" });
  this.route("skeleton_into", { path: "/skeleton_into" });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});
