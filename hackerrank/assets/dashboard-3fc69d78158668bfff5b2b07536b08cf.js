(function() {
$.ajaxSetup({
cache:!1
}), $(document).ready(function() {
var HR, contest, profile, view, _makeTopLevel;
return HR = window.HR, HR.appController = new HR.AppController(), HR.master = "master", 
$.timeago.settings.allowFuture = !0, require.config({
waitSeconds:60
}), _makeTopLevel = function(source, attributes) {
return _.each(attributes, function(attribute) {
return HR[attribute] = source[attribute];
});
}, _makeTopLevel(HR.appController, [ "namespace", "requires", "routeNamespace", "restURL", "model", "collection", "profile", "contest" ]), 
_makeTopLevel(HR.appController, [ "logger" ]), HR.PREFETCH_DATA.messages && (HR.cachedMessagesCollection = new HR.collection("message-thread"), 
_.each(HR.PREFETCH_DATA.messages, function(message) {
var model;
return model = new HR.MessageThreadModel(message), HR.cachedMessagesCollection.add(model);
})), profile = new HR.ProfileModel(), contest = new HR.ContestModel(), _.extend(HR.GenericModel.prototype, HR.CacheMixin), 
_.extend(HR.GenericCollection.prototype, HR.CacheMixin), HR.key_prefix = HR.PREFETCH_DATA.profile.key_prefix, 
profile.cacheSet(_.extend(HR.PREFETCH_DATA.profile, {
me:!0
})), contest.cacheSet(HR.PREFETCH_DATA.contest), void 0 === profile.get("id") || profile.get("tour_done") || (view = new HR.OnboardingView(), 
view.render()), HR.router = new HR.DashboardRouter(), Backbone.history.start({
pushState:!0
});
});
}).call(this);