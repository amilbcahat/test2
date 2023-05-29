HR.appController.addTemplate("backbone/templates/x/library-setmodal", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="modal js-setdetails" data-width="1000px">\n    <div class="modal-header">\n        <div class="underline_title set_title">' + (null == (__t = set.title) ? "" :__t) + '</div>\n        <button type="button" class="close setmodalclose" data-dismiss="modal" aria-hidden="true"><small>Close</small> &times;</button>\n        <div class="pagination pagination-small pagination-centered" style:"margin:13px auto 0 auto">\n          <ul>\n              <li><a class="js-qprev" href="#">&laquo;</a></li>\n              ', 
_.each(set.questions, function(q, i) {
__p += "\n              <li ", 0 == i && (__p += 'class="active"'), __p += ' ><a href="#" class="js-qview" sid="' + (null == (__t = set.id) ? "" :__t) + '" qid="' + (null == (__t = q.id) ? "" :__t) + '" quid="' + (null == (__t = q.unique_id) ? "" :__t) + '" qindex="' + (null == (__t = i) ? "" :__t) + '">' + (null == (__t = i + 1) ? "" :__t) + "</a></li>\n              ";
}), __p += '\n              <li><a class="js-qnext" href="#">&raquo;</a></li>\n          </ul>\n        </div>\n    </div>\n    <div class="setqcontents"></div>\n</div>\n';
return __p;
});