!function($) {
$.fn.completer = function(cat, data) {
data = $.extend({
source:function(typeahead, query) {
$.getJSON("/autocomplete", {
fq:"cat:" + cat,
q:query + "*"
}, function(resp) {
typeahead.process(_.map(resp.models, function(e) {
return e.name;
}));
});
},
matcher:function() {
return !0;
}
}, data), this.typeahead(data);
};
}(jQuery);