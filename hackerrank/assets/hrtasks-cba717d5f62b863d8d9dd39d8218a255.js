sampleData = {
servers:[ {
id:"i-3312f51c",
dns_name:null,
security_groups:[ "tasks-allow-ssh", "tasks" ],
tags:[ [ "hrxtask-server", "true" ], [ "company-IS", "true" ], [ "Name", "hrxtask-IS" ] ],
public_ip:null,
private_ip:null,
status:"stopped"
}, {
id:"i-b0eb0d9f",
dns_name:"ec2-54-80-90-248.compute-1.amazonaws.com",
security_groups:[ "tasks-allow-ssh", "tasks-allow-ping" ],
tags:[ [ "hrxtask-server", "true" ], [ "company-IS", "true" ], [ "Name", "hrxtask-IS" ] ],
public_ip:"54.80.90.248",
private_ip:"10.90.187.56",
status:"running"
}, {
id:"i-fa86c6d4",
dns_name:"ec2-54-205-100-202.compute-1.amazonaws.com",
security_groups:[ "tasks" ],
tags:[ [ "Name", "task-master" ], [ "hrxtask-server", "true" ] ],
public_ip:"54.205.100.202",
private_ip:"10.7.22.147",
status:"running"
}, {
id:"i-fb86c6d5",
dns_name:null,
security_groups:[ "tasks" ],
tags:[ [ "Name", "task-slave" ], [ "hrxcompany-123", null ], [ "hrxtask-server", "true" ] ],
public_ip:null,
private_ip:null,
status:"stopped"
} ]
}, $("document").ready(function() {
HR = {}, window.HR = HR, HR.CredentialsModel = Backbone.Model.extend({
intialize:function() {},
url:"endpoint-recieve"
}), HR.MachineModel = Backbone.Model.extend({
intialize:function() {},
url:function() {
return this.isNew() ? "/xrest/instances" :"/xrest/instances/" + this.get("id");
},
startMachine:function() {
HR.notifications.push("info", "Starting instance: " + this.get("id")), this.save({
instance_action:"start"
}, {
success:function(model, response) {
HR.notifications.push("success", "Instance started"), model.set(response.model);
}
});
},
stopMachine:function() {
HR.notifications.push("info", "Stopping instance: " + this.get("id")), this.save({
instance_action:"stop"
}, {
success:function(model, response) {
HR.notifications.push("success", "Instance stopped"), model.set(response.model);
}
});
},
setPassword:function(pass) {
HR.notifications.push("info", "Setting password on: " + this.get("id")), this.save({
instance_action:"setpassword",
password:pass
}, {
success:function(model, response) {
HR.notifications.push("success", "password successfully set."), model.set(response.model);
}
});
},
removeMachine:function() {
HR.notifications.push("info", "Removing Machine : " + this.get("id")), console.log("Removing " + this.get("id")), 
this.save({
instance_action:"remove"
}, {
success:function(model, response) {
HR.notifications.push("success", "Machined marked for removal"), model.set(response.model);
}
});
},
parse:function(resp) {
return HR.notifications.push("success", "Machine configurations fetched"), model = resp.model ? resp.model :resp, 
("pending" == model.status || "stopping" == model.status) && setTimeout(this.fetch, 1e4), 
model;
}
}), HR.TaskModel = Backbone.Model.extend({
initialize:function() {},
urlRoot:"/xrest/tasks",
startNewInstance:function(description) {
HR.notifications.push("info", "Starting new instance for task  " + this.get("name")), 
$.ajax({
url:"/xrest/instances",
type:"POST",
data:{
task_id:this.id,
description:description
},
success:function(resp) {
resp.model && (machineModel = new HR.MachineModel(resp.model), HR.machines.add(machineModel), 
HR.notifications.push("success", "New instance created."), HR.router.navigate("machines/" + resp.model.id + "/configure", !0));
}
});
},
parse:function(resp) {
return resp.model ? resp.model :resp;
}
}), HR.UserModel = Backbone.Model.extend({
initialize:function() {},
url:"/xrest/tasks/login",
checkLogin:function(user, pass) {
that = this, this.set({
error:!1
}), $.ajax({
url:this.url,
type:"POST",
data:{
company:user,
password:pass
},
success:function(resp) {
console.log(resp), that.set({
user:"admin",
company:"Palantir",
id:2,
name:"Admin"
});
},
error:function() {
that.set({
error:!0
});
}
});
}
}), HR.MachineCollection = Backbone.Collection.extend({
model:HR.MachineModel,
initialize:function() {
this.constructor.__super__.initialize.apply(this);
},
url:"/xrest/instances",
parse:function(resp) {
return HR.notifications.push("success", "Machines list fetched"), resp.models;
}
}), HR.TaskCollection = Backbone.Collection.extend({
model:HR.TaskModel,
initialize:function() {
this.constructor.__super__.initialize.apply(this);
},
url:"/xrest/tasks",
parse:function(resp) {
return HR.notifications.push("success", "Tasks list fetched"), resp.models;
}
}), HR.LoginView = Backbone.View.extend({
el:"#displayPanel",
intialize:function(options) {
this.model = options.model;
},
render:function() {
return html = _.template($("#login-template").html(), window), this.$el.html(html), 
this;
},
events:{
"submit form[name=login-form]":"loginUser"
},
loginUser:function(event) {
event.preventDefault(), user = this.$el.find("input[name=user]").val(), pass = this.$el.find("input[name=pass]").val(), 
this.model.on("change", this.checkStatus, this), this.model.checkLogin(user, pass);
},
checkStatus:function() {
HR.current_user.get("name") ? HR.router.navigate("home", !0) :HR.current_user.get("error") && $(this.el).find(".login-error").show();
}
}), HR.HomeView = Backbone.View.extend({
el:"#displayPanel",
intialize:function(options) {
this._super("intialize", options);
},
render:function() {
return html = _.template($("#home-template").html(), window), this.$el.html(html), 
this;
}
}), HR.NavView = Backbone.View.extend({
el:"#navPanel",
intialize:function(options) {
this.activeLink = "home", this._super("intialize", options);
},
setActive:function(activeLink) {
return this.activeLink = activeLink, this;
},
render:function() {
return html = _.template($("#navigation-template").html(), {
activeLink:this.activeLink
}), this.$el.html(html), this;
}
}), HR.TasksView = Backbone.View.extend({
el:"#displayPanel",
intialize:function() {
this.constructor.__super__.initialize.apply(this);
},
events:{
"click .startBtn":"startNewInstance"
},
startNewInstance:function(e) {
description = window.prompt("Please enter a description for instance?"), task_id = $(e.target).data("id"), 
model = this.collection.where({
id:task_id
})[0], model.startNewInstance(description);
},
render:function() {
return html = _.template($("#tasks-template").html(), {
tasks:this.collection.toJSON()
}), this.$el.html(html), this;
}
}), HR.MachineView = Backbone.View.extend({
el:"#displayPanel",
intialize:function(options) {
console.log(options), this.collection = options.collection, this._super("intialize", options);
},
events:{
"click .startBtn":"startMachine",
"click .stopBtn":"stopMachine",
"click .setPswdBtn":"setPassword",
"click .refresh":"refreshList"
},
refreshList:function() {
HR.notifications.push("info", "Fetching instances list"), this.collection.fetch();
},
render:function() {
return this.collection.on("reset", this.render, this), this.collection.on("add", this.render, this), 
this.collection.on("change", this.render, this), this.collection.on("remove", this.render, this), 
console.log("Rendering View"), $("#displayPanel").empty(), html = _.template($("#machines-list-view").html(), {
machines:this.collection.toJSON()
}), this.$el.html(html), this;
},
startMachine:function(e) {
$(e.target).hasClass("disabled") || (machine_id = $(e.target).data("machine"), machineModel = this.collection.where({
id:machine_id
})[0], machineModel.startMachine());
},
stopMachine:function(e) {
$(e.target).hasClass("disabled") || (machine_id = $(e.target).data("machine"), machineModel = this.collection.where({
id:machine_id
})[0], machineModel.stopMachine());
},
setPassword:function(e) {
$(e.target).hasClass("disabled") || (machine_id = $(e.target).data("machine"), machineModel = this.collection.where({
id:machine_id
})[0], password = window.prompt("Please Enter a password"), machineModel.setPassword(password));
}
}), HR.ConfigView = Backbone.View.extend({
el:"#displayPanel",
intialize:function(options) {
this.model = options.model, this._super("intialize", options);
},
events:{
"click .start":"startMachine",
"click .stop":"stopMachine",
"click .remove":"removeMachine"
},
render:function() {
return console.log("Config View Render", this.model), this.model.get("status") ? (html = _.template($("#params-template").html(), {
machine:this.model.toJSON()
}), this.$el.html(html), this) :(this.model.on("change", this.render, this), void 0);
},
startMachine:function() {
this.model.startMachine();
},
stopMachine:function() {
this.model.stopMachine();
},
removeMachine:function() {
this.model.removeMachine();
}
}), HR.CredentialsView = Backbone.View.extend({
el:"#appView",
initialize:function(options) {
this.model = options.model;
},
render:function() {
return html = _.template($("#notifications-template").html(), {
model:this.model.toJSON()
}), this.$el.html(html), this;
}
}), HR.AppView = Backbone.View.extend({
el:"#appView",
initialize:function() {
this.appView = null;
},
renderSubView:function(newView, currentLink) {
HR.navView || (HR.navView = new HR.NavView()), HR.navView.setActive(currentLink).render(), 
this.appView && (this.appView.undelegateEvents(), this.appView.remove(), this.$el.find("#displayPanel").remove(), 
this.$el.append("<div id='displayPanel'></div> ")), newView.setElement("#displayPanel"), 
this.appView = newView, newView.render();
}
}), HR.NotificationView = Backbone.View.extend({
el:"#notificationPanel",
push:function(type, message) {
this.type = type, this.message = message, this.render();
},
render:function() {
return html = _.template($("#notifications-template").html(), {
type:this.type,
message:this.message
}), this.$el.html(html), clearTimeout(this.timeout), that = this, "success" == this.type && (this.timeout = setTimeout(function() {
$("#notificationPanel .panel").fadeOut();
}, 3e3)), this;
}
}), HRTaskRouter = Backbone.Router.extend({
routes:{
login:"login",
home:"home",
tasks:"tasks",
machines:"machines",
"machines/:id/configure":"configure",
"getlogin/:id":"credentials",
"*path":"default"
},
initialize:function() {},
credentials:function(id) {
credentialsModel = new HR.CredentialsModel({
id:id
}), credentialsView = new HR.CredentialsView({
model:credentialsModel
}), HR.appView.renderSubView(credentialsView);
},
checkLogin:function() {
return HR && HR.current_user && HR.current_user.get("id") ? (console.log("test"), 
!0) :$.cookie("tcompany") ? (HR.current_user || (HR.current_user = new HR.UserModel({
company:"Palantir"
})), !0) :(this.navigate("login", !0), !1);
},
"default":function() {
this.navigate("login", !0);
},
login:function() {
userModel = new HR.UserModel(), HR.current_user = userModel, loginView = new HR.LoginView({
model:userModel
}), HR.appView.renderSubView(loginView);
},
home:function() {
this.checkLogin() && (console.log("Home fxn"), HR.appView.renderSubView(new HR.HomeView(), "home"));
},
tasks:function() {
this.checkLogin() && (HR.tasks || (HR.tasks = new HR.TaskCollection()), HR.notifications.push("info", "Fetching Tasks"), 
HR.tasks.fetch({
success:function(collection) {
tasksView = new HR.TasksView({
collection:collection
}), HR.appView.renderSubView(tasksView, "tasks");
}
}));
},
machines:function() {
this.checkLogin() && (0 == HR.machines.length && (HR.machines.fetch({
add:!0
}), HR.notifications.push("info", "Fetching instances list")), machinesView = new HR.MachineView({
collection:HR.machines
}), HR.appView.renderSubView(machinesView, "machines"));
},
configure:function(id) {
if (this.checkLogin()) {
var machineModel = null;
console.log(id), machineModel = HR.machines.where({
id:id
})[0], machineModel || (machineModel = new HR.MachineModel({
id:id
}), machineModel.fetch(), HR.notifications.push("info", "Fetching configurations")), 
configView = new HR.ConfigView({
model:machineModel
}), HR.appView.renderSubView(configView, "configure");
}
}
}), HR.notifications = new HR.NotificationView(), HR.router = new HRTaskRouter(), 
HR.appView = new HR.AppView(), HR.machines = new HR.MachineCollection(), Backbone.history.start({
pushState:!1,
root:window.location.pathname
}), $("a.backbone-route").on("click", function(e) {
e.preventDefault(), HR.router.navigate($(e.target).attr("href"), !0);
});
});