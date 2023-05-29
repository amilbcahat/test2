HR.appController.addTemplate("backbone/templates/notifications-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="clearfix notifications_single status-' + (null == (__t = model.STATUS_TEXT[model.STATUS_CODE[_model.notification_status]]) ? "" :__t) + '">\n\n    <div class="span10">\n        <h4 class="notifications_single-subject show-body" data-id="' + (null == (__t = _model.id) ? "" :__t) + '">' + (null == (__t = _model.subject) ? "" :__t) + '</h4>\n        <p class="notifications_single-body notification-body" ', 
showbody || (__p += " "), __p += ">" + (null == (__t = _model.body) ? "" :__t) + '</p>\n    </div>\n    <div class="span5 pull-right">\n    	<p class="notifications_single-date small"><span class="alpha">Posted On: </span>', 
d = new Date(0), __p += "", d.setUTCSeconds(_model.created_at_epoch), __p += "" + (null == (__t = moment(d).format("MMMM Do YYYY at h:mm:ss a")) ? "" :__t) + "</p>\n		", 
null != _model.from && (__p += '\n        <p class="notifications_single-author small"><span class="alpha">Posted By: </span>' + (null == (__t = _.escape(_model.from.username)) ? "" :__t) + "\n            <!--", 
_model.from.is_admin && (__p += '\n                <span class="label label-info">STAFF</span>\n            '), 
__p += "-->\n        </p>\n        "), __p += '\n        <p class="notifications_single-status">' + (null == (__t = model.STATUS_TEXT[model.STATUS_CODE[_model.notification_status]]) ? "" :__t) + '</p>\n		<div class="notifications_single-buttons">\n		    ', 
_model.notification_status < model.STATUS.READ && (__p += '<a class="notifications_single-markread mark-as-read btn btn-mini"><i class="icon-ok">Mark as read</i></a>'), 
__p += ' <a class="notifications_single-delete delete btn btn-alert btn-mini"><i class="icon-trash"></i>Delete</a>\n		</div>\n    </div>\n</div>\n';
return __p;
});