HR.appController.addTemplate("backbone/templates/recruit/question-mcq", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", __p += "mcq" == question.type ? '\n<p class="font20 f-weight-600">PICK ONE OF THE CHOICES</p>\n' :'\n<p class="font20 f-weight-600">PICK THE CORRECT CHOICES</p>\n', 
__p += '\n<ul class="mcq-question-choices">\n  ', "mcq" == question.type ? (__p += "\n    ", 
i = 0, _.each(question.options, function(o) {
i++, __p += '\n     <li><input type="radio" name="mcqopts" id="mcqopts' + (null == (__t = i) ? "" :__t) + '" value="' + (null == (__t = i) ? "" :__t) + '"/><label for="mcqopts' + (null == (__t = i) ? "" :__t) + '">' + (null == (__t = o) ? "" :__t) + "</label></li>\n    ";
}), __p += "\n  ") :(__p += "\n    ", i = 0, _.each(question.options, function(o) {
i++, __p += '\n     <li><input type="checkbox" name="mcqopts" id="mcqopts' + (null == (__t = i) ? "" :__t) + '" value="' + (null == (__t = i) ? "" :__t) + '"/><label for="mcqopts' + (null == (__t = i) ? "" :__t) + '">' + (null == (__t = o) ? "" :__t) + "</label></li>\n    ";
}), __p += "\n  "), __p += '\n  <a href="#" class="clearall">Clear selection</a>\n  ', 
question.explanation_box && "true" == question.explanation_box && (__p += '\n  <label for="explanation">Explanation</label><textarea id="explanation" name="explanation" rows="10" cols="80"></textarea>\n  '), 
__p += "\n</ul>\n";
return __p;
});