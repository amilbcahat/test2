jQuery.fn.dataTableExt.oApi.fnSetFilteringDelay = function(oSettings, iDelay) {
var _that = this;
return void 0 === iDelay && (iDelay = 250), this.each(function(i) {
$.fn.dataTableExt.iApiIndex = i;
var oTimerId = null, sPreviousSearch = null, anControl = $("input", _that.fnSettings().aanFeatures.f);
return anControl.unbind("keyup search input").bind("keyup search input", function() {
(null === sPreviousSearch || sPreviousSearch != anControl.val()) && (window.clearTimeout(oTimerId), 
sPreviousSearch = anControl.val(), oTimerId = window.setTimeout(function() {
$.fn.dataTableExt.iApiIndex = i, _that.fnFilter(anControl.val());
}, iDelay));
}), this;
}), this;
};