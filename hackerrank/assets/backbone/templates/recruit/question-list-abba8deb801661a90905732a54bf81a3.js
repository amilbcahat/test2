HR.appController.addTemplate("backbone/templates/recruit/question-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
for (__p += '<div class="container" style="margin-top:63px;">\n	<table class="candidate-sleek-table candidate-question-list" width="100%" cell-spacing="0" cell-padding="0">\n		<thead>\n			<tr>\n				<td width="5%"></td>\n				<td width="46%" class="upper-case grey">QUESTION NAME</td>\n				<td width="12%" class="upper-case grey">TYPE</td>\n				<td width="12%" class="upper-case grey">STATUS</td>\n				<td width="19%"></td>\n			</tr>\n		</thead>\n	</table>\n    ', 
i = 1; section_count >= i; i++) __p += '\n	<table class="candidate-sleek-table candidate-question-list section' + (null == (__t = i) ? "" :__t) + " ", 
i != current_section && (__p += "disabled"), __p += '" width="100%" cell-spacing="0" cell-padding="0" >\n	</table>\n	<center>\n		<button class="btn margin-20 section-finish-' + (null == (__t = i) ? "" :__t) + ' next-section hidden" data-section="' + (null == (__t = i) ? "" :_.escape(__t)) + '">Close and goto next section</button>\n		<br/>\n	</center>\n	';
__p += '\n    <div style="margin-top:60px"></div><!-- Don\'t remove this empty div. -->\n    <div style="width:100%;background:white;margin-top:60px; margin-bottom:60px;" >\n	<center>\n		<button class="btn margin-20 test-done" ', 
section_count != current_section && (__p += "disabled"), __p += ">I am done with the test</button>\n	</center>\n    </div>\n</div>\n\n\n\n";
}
return __p;
});