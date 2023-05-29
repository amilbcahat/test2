HR.appController.addTemplate("backbone/templates/administration/challenge-edit-languages-list-dropdown", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
for (__p += '<div class="cc_limits">\n    <div class="span11pct">\n        &nbsp;\n    </div>\n    <div class="span33pct">\n        <div class="timelimit-slider"></div>\n        <div class="timelimit-slider-markings">\n            ', 
i = language_data.min_time, ctr = 0; i <= language_data.max_time; i++, ctr++) __p += '\n              <span class="slider-marking-step" style="\n                left: ' + (null == (__t = 100 / (time_period - 1) * ctr) ? "" :__t) + "%;\n                margin-left: -0.", 
__p += i > 9 ? "4" :"2", __p += "em;\n                ", time_period > 16 && ctr % 2 == 1 && (__p += "display: none;"), 
__p += ';\n                ">\n                ' + (null == (__t = i) ? "" :__t) + "\n              </span>\n            ";
for (__p += '\n        </div>\n    </div>\n    <div class="span3pct">\n        &nbsp;\n    </div>\n    <div class="span33pct">\n        <div class="memlimit-slider"></div>\n        <div class="memlimit-slider-markings">\n            ', 
i = language_data.min_mem, ctr = 0; i <= language_data.max_mem; i++, ctr++) __p += "\n              ", 
(ctr % 50 == 0 && ctr != 50 * parseInt(mem_period / 50) || i == language_data.max_mem) && (__p += '\n                <span class="slider-marking-step" style="\n                  left: ' + (null == (__t = 100 / (mem_period - 1) * ctr) ? "" :__t) + "%;\n                  margin-left: -0.", 
__p += i > 9 ? "4" :"2", __p += 'em;\n                  ">\n                  ' + (null == (__t = i) ? "" :__t) + "\n                </span>\n              "), 
__p += "\n            ";
__p += '\n        </div>\n    </div>\n    <div class="span3pct">\n        &nbsp;\n    </div>\n    <div class="clearfix"></div>\n</div>\n<p><b>Code Editor Templates</b><p>\n<div class="template-edit">\n    <textarea class="template_head"></textarea>\n    <div class="cm-label template_head">\n        <div class="cm-label-text">\n            Head\n        </div>\n    </div>\n    <div class="clearfix"></div>\n    <textarea class="template_body"></textarea>\n     <div class="cm-label template_body">\n         <div class="cm-label-text">\n             Body\n         </div>\n     </div>\n     <div class="clearfix"></div>\n     <textarea class="template_tail"></textarea>\n     <div class="cm-label template_tail">\n         <div class="cm-label-text">\n             Tail\n         </div>\n     </div>\n     <div class="clearfix"></div>\n</div>\n';
}
return __p;
});