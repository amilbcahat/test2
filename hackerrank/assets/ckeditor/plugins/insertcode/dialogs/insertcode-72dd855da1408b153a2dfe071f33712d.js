"use strict";

!function() {
CKEDITOR.dialog.add("insertCode", function() {
var clientHeight = document.documentElement.clientHeight, size = CKEDITOR.document.getWindow().getViewPaneSize(), width = Math.min(size.width - 70, 800), height = size.height / 1.5;
return 650 > clientHeight && (height = clientHeight - 220), {
title:"Paste Code",
minHeight:200,
resizable:CKEDITOR.DIALOG_RESIZE_NONE,
contents:[ {
id:"info-1",
elements:[ {
id:"code",
type:"textarea",
label:"",
setup:function(widget) {
this.setValue(widget.data.code);
},
commit:function(widget) {
widget.setData("code", this.getValue());
},
required:!0,
inputStyle:"cursor:auto;width:" + width + "px;height:" + height + "px;tab-size:4;text-align:left;",
"class":"cke_source"
} ]
} ]
};
});
}();