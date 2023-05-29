(function() {
$.ajaxSetup({
cache:!1
}), $(document).ready(function() {
var HR, contest, profile, tour, tour1, tour2, tour3, tour_challenges, _makeTopLevel;
return HR = window.HR, HR.appController = new HR.AppController(), HR.master = "master", 
$.timeago.settings.allowFuture = !0, require.config({
waitSeconds:30
}), _makeTopLevel = function(source, attributes) {
return _.each(attributes, function(attribute) {
return HR[attribute] = source[attribute];
});
}, _makeTopLevel(HR.appController, [ "namespace", "requires", "routeNamespace", "restURL", "model", "collection", "profile", "contest" ]), 
_makeTopLevel(HR.appController, [ "logger" ]), HR.PREFETCH_DATA.messages && (HR.cachedMessagesCollection = new HR.collection("message-thread"), 
_.each(HR.PREFETCH_DATA.messages, function(message) {
var model;
return model = new HR.MessageThreadModel(message), HR.cachedMessagesCollection.add(model);
})), profile = new HR.ProfileModel(), contest = new HR.ContestModel(), tour_challenges = {}, 
_.extend(HR.GenericModel.prototype, HR.CacheMixin), _.extend(HR.GenericCollection.prototype, HR.CacheMixin), 
HR.key_prefix = HR.PREFETCH_DATA.profile.key_prefix, profile.cacheSet(_.extend(HR.PREFETCH_DATA.profile, {
me:!0
})), contest.cacheSet(HR.PREFETCH_DATA.contest), _.each(HR.PREFETCH_DATA.challenges, function(challenge) {
var cc;
return cc = new HR.ChallengeModel(), cc.cacheSet(challenge), tour_challenges[challenge.slug] = cc;
}), HR.tour_challenges = tour_challenges, void 0 === profile.get("id") || profile.get("tour_done") || (tour1 = function() {
var tour;
return tour = new HR.MultiFrameModal({
frames:"onboarding",
data:{
version:1
}
}), tour.on("preFrameChange", function(frame_from, frame_to) {
var fav;
return 0 === frame_from && 1 === frame_to && (fav = $("input:radio[name=favorite]:checked").val(), 
"undefined" != typeof mixpanel && "undefined" != typeof mixpanel.track && mixpanel.track("OnboardingSelect", {
category:fav
}), fav) ? (profile.set("favorite_category", fav), profile.save()) :void 0;
}), tour.on("postFrameChange", function(frame_from, frame_to) {
var category_challenge_mapping, challenge, challenge_view, fav;
return 0 === frame_from && 1 === frame_to ? (fav = profile.get("favorite_category"), 
category_challenge_mapping = {
codegolf:"fizzbuzz",
ml:"battery",
algorithms:"pairs",
fp:"fp-hello-world",
games:"the-bidding-game"
}, challenge = HR.tour_challenges[category_challenge_mapping[fav]], challenge_view = new HR.OnboardingChallengesListView({
contest:HR.contest(),
model:challenge
}), challenge_view.el = $(".frame-subview"), challenge_view.render(), challenge_view.on("linkClicked", function() {
return function() {
return window.touring = !0, window.tour_up = !1, tour.$(".close").click();
};
}(this)), challenge_view.$el = $(challenge_view.el), challenge_view.delegateEvents(), 
tour.$(".hr_solve-challenge").on("click", function() {
return challenge_view.$(".challengelist_button").click();
})) :void 0;
}), profile.set("tour_done", !0), profile.save(), tour;
}, tour2 = function() {
var tour;
return tour = new HR.MultiFrameModal({
frames:"onboarding",
data:{
version:2
}
}), tour.on("preFrameChange", function(frame_from, frame_to) {
var fav;
return 0 === frame_from && 1 === frame_to && (fav = $("input:radio[name=favorite]:checked").val(), 
"undefined" != typeof mixpanel && "undefined" != typeof mixpanel.track && mixpanel.track("OnboardingSelect", {
category:fav
}), fav) ? (profile.set("favorite_category", fav), profile.save()) :void 0;
}), tour.on("postFrameChange", function(frame_from, frame_to) {
var category_challenge_mapping, challenge, challenge_view, fav;
return 0 === frame_from && 1 === frame_to ? (fav = profile.get("favorite_category"), 
category_challenge_mapping = {
codegolf:"fizzbuzz",
ml:"battery",
algorithms:"lonely-integer",
fp:"fp-hello-world",
games:"the-bidding-game"
}, challenge = HR.tour_challenges[category_challenge_mapping[fav]], challenge_view = new HR.OnboardingChallengesListView({
contest:HR.contest(),
model:challenge
}), challenge_view.el = $(".frame-subview"), challenge_view.render(), challenge_view.on("linkClicked", function() {
return function() {
return window.touring = !0, window.tour_up = !1, tour.$(".close").click();
};
}(this)), challenge_view.$el = $(challenge_view.el), challenge_view.delegateEvents(), 
tour.$(".hr_solve-challenge").on("click", function() {
return challenge_view.$(".challengelist_button").click();
})) :void 0;
}), profile.set("tour_done", !0), profile.save(), tour;
}, tour3 = function() {
var tour;
return tour = new HR.Onboarding3View({
model:HR.profile()
}), profile.set("tour_done", !0), profile.save(), tour;
}, window.tourABTest = new HR.ABTest(), window.tourABTest.test = "onboarding1", 
tour = new HR.ABTestingView({
model:window.tourABTest,
variants:{
onboardingv1:tour1,
onboardingv2:tour2,
onboardingv3:tour3
}
}), tour.el = null, tour.render()), HR.appController.manifest(), HR.router = new HR.DashboardRouter(), 
Backbone.history.start({
pushState:!0
});
});
}).call(this);