(function() {
$("document").ready(function() {
var HR, HRTaskRouter;
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
setPassword:function(pass, sudo) {
HR.notifications.push("info", "Setting up task, and password on: " + this.get("id")), 
this.save({
instance_action:"setup",
password:pass,
sudo:sudo
}, {
success:function(model, response) {
HR.notifications.push("success", "Task, and password setup. You may now share the login details with the candidate."), 
model.set(response.model);
}
});
},
flashMessage:function(msg) {
HR.notifications.push("info", "Sending flash command.. " + this.get("id")), this.save({
instance_action:"flashmsg",
message:msg
}, {
success:function(model, response) {
HR.notifications.push("success", "Message flashed."), model.set(response.model);
}
});
},
lockReport:function() {
HR.notifications.push("info", "Logging candidate out and building report" + this.get("id")), 
this.save({
instance_action:"lockbuild"
}, {
success:function(model, response) {
HR.notifications.push("success", "Done. Report available via 'Report URL' above."), 
model.set(response.model);
}
});
},
removeMachine:function() {
HR.notifications.push("info", "Removing Machine : " + this.get("id")), this.save({
instance_action:"remove"
}, {
success:function(model, response) {
HR.notifications.push("success", "Machined marked for removal"), model.set(response.model);
}
});
},
parse:function(resp) {
var model;
return HR.notifications.push("success", "Machine configurations fetched"), model = resp.model ? resp.model :resp, 
("pending" === model.status || "stopping" === model.status) && (console.log("Test"), 
clearTimeout(window.tout), window.tout = setTimeout(this.fetch, 1e4)), model;
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
var machineModel;
resp.model && (machineModel = new HR.MachineModel(resp.model), HR.machines.add(machineModel), 
HR.notifications.push("success", "New instance created."), HR.router.navigate("machines/" + resp.model.id + "/configure", !0));
}
});
},
parse:function(resp) {
return resp.model ? resp.model :resp;
}
}), HR.ReportModel = Backbone.Model.extend({
initialize:function() {},
urlRoot:"/xrest/taskreports",
parse:function(resp) {
return resp.model ? resp.model :resp;
}
}), HR.UserModel = Backbone.Model.extend({
initialize:function() {},
url:"/xrest/tasks/login",
checkLogin:function(user, pass, callback) {
var that;
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
that.set(resp.model), callback && callback();
},
error:function() {
that.set({
error:!0
});
}
});
},
getLogin:function(callback) {
var that;
that = this, $.ajax({
url:this.url,
type:"POST",
success:function(resp) {
that.set(resp.model), callback();
},
error:function() {
that.set({
error:!0
});
}
});
},
logout:function() {
$.get("/xrest/tasks/logout"), setTimeout(function() {
HR.router.navigate("login", !0);
}, 500);
}
}), HR.MachineCollection = Backbone.Collection.extend({
model:HR.MachineModel,
initialize:function() {
this.constructor.__super__.initialize.apply(this);
},
url:"/xrest/instances",
parse:function(resp) {
return "machines" !== Backbone.history.fragment && clearInterval(window.collectiontimer), 
HR.notifications.push("success", "Machines list fetched"), resp.models;
}
}), HR.TaskCollection = Backbone.Collection.extend({
model:HR.TaskModel,
initialize:function() {
this.constructor.__super__.initialize.apply(this);
},
url:"/xrest/tasks",
parse:function(resp) {
return resp.models;
}
}), HR.ReportCollection = Backbone.Collection.extend({
model:HR.ReportModel,
initialize:function() {
this.constructor.__super__.initialize.apply(this);
},
url:"/xrest/taskreports",
parse:function(resp) {
return resp.models;
}
}), HR.LoginView = Backbone.View.extend({
el:"#displayPanel",
intialize:function(options) {
this.model = options.model;
},
render:function() {
var html;
return html = _.template($("#login-template").html(), window), this.$el.html(html), 
this;
},
events:{
"submit form[name=login-form]":"loginUser"
},
loginUser:function(event) {
var pass, user;
event.preventDefault(), user = this.$el.find("input[name=user]").val(), pass = this.$el.find("input[name=pass]").val(), 
this.model.on("change", this.checkStatus, this), this.model.checkLogin(user, pass, function() {
HR.router.navigate("home", !0);
});
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
var html;
return html = _.template($("#home-template").html(), window), this.$el.html(html), 
this;
}
}), HR.NavView = Backbone.View.extend({
el:"#navPanel",
events:{
"click #logout":"logout"
},
intialize:function(options) {
this.activeLink = "home", this._super("intialize", options);
},
setActive:function(activeLink) {
return this.activeLink = activeLink, this;
},
render:function() {
var html;
return html = _.template($("#navigation-template").html(), {
activeLink:this.activeLink
}), this.$el.html(html), this;
},
logout:function() {
HR.current_user.logout();
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
var description, model, task_id;
description = window.prompt("Please enter a description/candidate email for instance"), 
description && (task_id = $(e.target).data("id"), model = this.collection.where({
id:task_id
})[0], model.startNewInstance(description));
},
render:function() {
var html;
return html = _.template($("#tasks-template").html(), {
tasks:this.collection.toJSON()
}), this.$el.html(html), this;
}
}), HR.TaskEditView = Backbone.View.extend({
el:"#displayPanel",
intialize:function() {
this.constructor.__super__.initialize.apply(this);
},
events:{
"click .startBtn":"startNewInstance",
"click #save":"saveData"
},
startNewInstance:function() {
var description, task_id;
return this.model.isNew() ? description = window.prompt("Please enter a description/candidate email for instance") :(task_id = this.model.id, 
this.model.startNewInstance(description), void 0);
},
render:function() {
var html;
return html = _.template($("#task-edit-template").html(), {
task:this.model.toJSON()
}), this.$el.html(html), this;
},
saveData:function() {
var params;
params = {
name:this.$el.find("#name").val(),
description:this.$el.find("#description").val(),
script:this.$el.find("#script").val(),
duration:60
}, this.model.save(params, {
success:function() {
HR.notifications.push("success", "Task has been saved/updated");
}
});
}
}), HR.MachineView = Backbone.View.extend({
el:"#displayPanel",
intialize:function(options) {
this.collection = options.collection, this._super("intialize", options);
},
events:{
"click .startBtn":"startMachine",
"click .stopBtn":"stopMachine",
"click .refresh":"refreshList"
},
refreshList:function() {
HR.notifications.push("info", "Fetching instances list"), this.collection.fetch();
},
render:function() {
var html;
return this.collection.on("reset", this.render, this), this.collection.on("add", this.render, this), 
this.collection.on("change", this.render, this), this.collection.on("remove", this.render, this), 
$("#displayPanel").empty(), html = _.template($("#machines-list-view").html(), {
machines:this.collection.toJSON()
}), this.$el.html(html), this;
},
startMachine:function(e) {
var machineModel, machine_id;
$(e.target).hasClass("disabled") || (machine_id = $(e.target).data("machine"), machineModel = this.collection.where({
id:machine_id
})[0], machineModel.startMachine());
},
stopMachine:function(e) {
var machineModel, machine_id;
$(e.target).hasClass("disabled") || (machine_id = $(e.target).data("machine"), machineModel = this.collection.where({
id:machine_id
})[0], machineModel.stopMachine());
}
}), HR.ReportsView = Backbone.View.extend({
el:"#displayPanel",
intialize:function(options) {
this.collection = options.collection, this._super("intialize", options);
},
refreshList:function() {
HR.notifications.push("info", "Fetching instances list"), this.collection.fetch();
},
render:function() {
var html;
return this.collection.on("reset", this.render, this), this.collection.on("add", this.render, this), 
this.collection.on("change", this.render, this), this.collection.on("remove", this.render, this), 
$("#displayPanel").empty(), html = _.template($("#reports-template").html(), {
reports:this.collection.toJSON()
}), this.$el.html(html), this;
}
}), HR.ConfigView = Backbone.View.extend({
el:"#displayPanel",
intialize:function(options) {
this.model = options.model, this._super("intialize", options);
},
events:{
"click .start":"startMachine",
"click .stop":"stopMachine",
"click .remove":"removeMachine",
"click .setup-pw":"showSetup",
"click .flash-message":"flashMessage",
"click .setuptask":"setupTask",
"click .canceltask":"cancelTask",
"click .lockreport":"lockReport"
},
render:function() {
var html;
return console.log("Machine:", this.model), this.model.get("status") ? (html = _.template($("#params-template").html(), {
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
},
showSetup:function() {
this.$(".setuppanel").removeClass("hide");
},
setupTask:function() {
var password, sudoaccess;
password = this.$(".passwd").val(), sudoaccess = this.$(".sudocheck").prop("checked"), 
this.model.setPassword(password, sudoaccess), this.$(".setuppanel").addClass("hide");
},
cancelTask:function() {
this.$(".setuppanel").addClass("hide");
},
flashMessage:function() {
var val;
val = prompt("What message would you like to flash to logged in sessions?"), val && this.model.flashMessage(val);
},
lockReport:function() {
var yes_;
yes_ = confirm("This will disconnect the user, and disable any further user login.\n\nAre you sure you want to disconnect the user, and build report?"), 
yes_ && this.model.lockReport();
}
}), HR.CredentialsView = Backbone.View.extend({
el:"#appView",
initialize:function(options) {
this.model = options.model;
},
render:function() {
var html;
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
var html, that;
return html = _.template($("#notifications-template").html(), {
type:this.type,
message:this.message
}), this.$el.html(html), clearTimeout(this.timeout), that = this, "success" === this.type && (this.timeout = setTimeout(function() {
$("#notificationPanel .panel").fadeOut();
}, 3e3)), this;
}
}), HRTaskRouter = Backbone.Router.extend({
routes:{
login:"login",
home:"home",
tasks:"tasks",
"tasks/new":"newtask",
"tasks/:id/edit":"edittask",
machines:"machines",
"machines/:id/configure":"configure",
reports:"reports",
"getlogin/:id":"credentials",
"*path":"default"
},
initialize:function() {},
credentials:function(id) {
var credentialsModel, credentialsView;
credentialsModel = new HR.CredentialsModel({
id:id
}), credentialsView = new HR.CredentialsView({
model:credentialsModel
}), HR.appView.renderSubView(credentialsView);
},
checkLogin:function() {
var u;
return HR && HR.current_user && HR.current_user.get("id") ? !0 :$.cookie("t_company") ? (HR.current_user || (u = new HR.UserModel(), 
u.getLogin(function() {
HR.current_user = u, HR.router.navigate("home", {
trigger:!0,
replace:!0
});
})), this.navigate("login"), !1) :(this.navigate("login", !0), !1);
},
"default":function() {
this.navigate("login", !0);
},
login:function() {
var loginView, u, userModel;
$.cookie("t_company") ? (u = new HR.UserModel(), u.getLogin(function() {
HR.current_user = u, HR.router.navigate("home", {
trigger:!0,
replace:!0
});
}), HR.router.navigate("home", {
trigger:!0,
replace:!0
})) :(userModel = new HR.UserModel(), HR.current_user = userModel, loginView = new HR.LoginView({
model:userModel
}), HR.appView.renderSubView(loginView));
},
home:function() {
return this.checkLogin() ? HR.appView.renderSubView(new HR.HomeView(), "home") :void 0;
},
tasks:function() {
return this.checkLogin() ? (HR.notifications.push("info", "Fetching tasks"), HR.tasks.fetch({
success:function(collection) {
var tasksView;
tasksView = new HR.TasksView({
collection:collection
}), HR.appView.renderSubView(tasksView, "tasks");
}
})) :void 0;
},
newtask:function() {
var taskEditView;
if (this.checkLogin()) return taskEditView = new HR.TaskEditView({
model:new HR.TaskModel()
}), HR.appView.renderSubView(taskEditView, "tasks");
},
edittask:function(id) {
var taskModel;
if (this.checkLogin()) return taskModel = new HR.TaskModel({
id:id
}), taskModel.fetch({
success:function(model) {
var taskEditView;
taskEditView = new HR.TaskEditView({
model:model
}), HR.appView.renderSubView(taskEditView, "tasks");
}
});
},
machines:function() {
var machinesView;
if (this.checkLogin()) return 0 === HR.machines.length && (HR.machines.fetch({
add:!0
}), HR.notifications.push("info", "Fetching instances list")), machinesView = new HR.MachineView({
collection:HR.machines
}), HR.appView.renderSubView(machinesView, "machines"), window.collectiontimer && clearInterval(window.collectiontimer), 
window.collectiontimer = setInterval(function() {
HR.current_user && HR.machines.fetch();
}, 2e4);
},
reports:function() {
return this.checkLogin() ? (HR.notifications.push("info", "Fetching reports"), HR.reports.fetch({
success:function(collection) {
var reportsView;
return reportsView = new HR.ReportsView({
collection:collection
}), HR.appView.renderSubView(reportsView, "reports");
}
})) :void 0;
},
configure:function(id) {
var configView, machineModel;
if (this.checkLogin()) return machineModel = null, machineModel = HR.machines.where({
id:id
})[0], machineModel || (machineModel = new HR.MachineModel({
id:id
}), machineModel.fetch(), HR.notifications.push("info", "Fetching configurations")), 
configView = new HR.ConfigView({
model:machineModel
}), HR.appView.renderSubView(configView, "configure");
}
}), HR.notifications = new HR.NotificationView(), HR.router = new HRTaskRouter(), 
HR.appView = new HR.AppView(), HR.machines = new HR.MachineCollection(), HR.tasks = new HR.TaskCollection(), 
HR.reports = new HR.ReportCollection(), Backbone.history.start({
pushState:!1,
root:window.location.pathname
}), $("a.backbone-route").on("click", function(e) {
e.preventDefault(), HR.router.navigate($(e.target).attr("href"), !0);
});
});
}).call(this);