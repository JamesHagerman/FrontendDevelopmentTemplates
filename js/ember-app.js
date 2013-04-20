App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.route('ember_intro', { path: "/ember_intro" });
  this.route('skeleton_into', { path: "/skeleton_into" });
});

// Notice how the underscores in the route and path are removed and replaced with camelcase here:
App.EmberIntroRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});
