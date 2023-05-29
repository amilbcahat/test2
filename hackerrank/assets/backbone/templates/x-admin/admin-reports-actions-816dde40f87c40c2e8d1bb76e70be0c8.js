HR.appController.addTemplate("backbone/templates/x-admin/admin-reports-actions", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<hr>\n<div class="invite-customization-fields-container mlT">\n\n    <div class="date-range-container mlB">\n        <div class="section-header msB">\n            <h3>Select Date Range</h3>\n        </div>\n\n        <div class="date-range">\n            <input type="text" id="invite-report-date-range" value="' + (null == (__t = startDate + " - " + endDate) ? "" :__t) + '"/>\n        </div>\n    </div>\n\n    <div class="user-select-container mlB">\n        <div class="section-header msB">\n            <h3>Select Users</h3>\n        </div>\n\n        <div class="select-all-container">\n            <label for="select-all-users"\n                   class="users">\n                <input id="select-all-users" class="select-all-input select-all" name="users" type="checkbox"\n                       value="select-all" data-list-container="user-custom-container" checked="checked"/>\n                <span class="">All Users</span>\n            </label>\n        </div>\n\n        <div class="show-custom-user-options">\n            <a href="#" data-container="user-custom-container" class="show-custom-link">Show Users Table <i\n                    class="icon-down-open-mini"></i></a>\n            <a href="#" data-container="user-custom-container" class="hide-custom-link hidden">Hide Users Table <i\n                    class="icon-up-open-mini"></i></a>\n        </div>\n\n        <div class="mlT hidden user-custom-container custom-container">\n            <table class="users_table table dt-sleektable" border="0" cellpadding="0" cellspacing="0">\n                <thead>\n                <tr>\n                    <td>\n                        &nbsp;\n                    </td>\n                    <td>\n                        id\n                    </td>\n                    <td>\n                        Name\n                    </td>\n                    <td>\n                        Email\n                    </td>\n                </tr>\n                </thead>\n                <tbody>\n                ', 
_.each(model.users, function(user) {
__p += '\n                <tr>\n                        <td>\n                            <input id="user-' + (null == (__t = user.id) ? "" :__t) + '" name="users" type="checkbox"\n                                   value="' + (null == (__t = user.id) ? "" :__t) + '" checked="checked" class="row-checkbox"/>\n                        </td>\n                        <td>\n                            <label for="user-' + (null == (__t = user.id) ? "" :__t) + '" class="users" style="font-weight: 400">\n                            ' + (null == (__t = user.id) ? "" :__t) + '\n                            </label>\n                        </td>\n                    <td>\n                            <label for="user-' + (null == (__t = user.id) ? "" :__t) + '" class="users" style="font-weight: 400">\n                            ' + (null == (__t = user.firstname) ? "" :__t) + '\n                            </label>\n                        </td>\n                        <td>\n                            <label for="user-' + (null == (__t = user.id) ? "" :__t) + '" class="users" style="font-weight: 400">\n                            ' + (null == (__t = user.email) ? "" :__t) + "\n                            </label>\n                        </td>\n                </tr>\n                ";
}), __p += '\n                </tbody>\n            </table>\n        </div>\n        <div class="clearfix"></div>\n\n    </div>\n\n    <div class="test-select-container mlB">\n\n        <div class="section-header msB">\n            <h3>Select Tests</h3>\n        </div>\n\n        <div class="select-all-container">\n            <label for="select-all-tests"\n                   class="tests">\n                <input id="select-all-tests" class="select-all-input select-all" name="tests" type="checkbox"\n                       value="select-all" data-list-container="tests-custom-container" checked="checked"/>\n                <span class="">All Tests</span>\n            </label>\n        </div>\n\n        <div class="show-custom-test-options">\n            <a href="#" data-container="tests-custom-container" class="show-custom-link">Show Tests Table <i\n                    class="icon-down-open-mini"></i></a>\n            <a href="#" data-container="tests-custom-container" class="hide-custom-link hidden">Hide Tests Table <i\n                    class="icon-up-open-mini"></i></a>\n        </div>\n\n        <div class="mlT hidden tests-custom-container custom-container">\n            <table class="tests_table table dt-sleektable" border="0" cellpadding="0" cellspacing="0">\n                <thead>\n                <tr>\n                    <td>\n                        &nbsp;\n                    </td>\n                    <td>\n                        id\n                    </td>\n                    <td>\n                        Name\n                    </td>\n                </tr>\n                </thead>\n                <tbody>\n                ', 
_.each(model.tests, function(test) {
__p += '\n                <tr>\n                    <td>\n                        <input id="test-' + (null == (__t = test.id) ? "" :__t) + '" name="tests" type="checkbox"\n                               value="' + (null == (__t = test.id) ? "" :__t) + '" checked="checked" class="row-checkbox"/>\n                    </td>\n                    <td>\n                        <label for="test-' + (null == (__t = test.id) ? "" :__t) + '" class="tests" style="font-weight: 400">\n                            ' + (null == (__t = test.id) ? "" :__t) + '\n                        </label>\n                    </td>\n                    <td>\n                        <label for="test-' + (null == (__t = test.id) ? "" :__t) + '" class="tests" style="font-weight: 400">\n                            ' + (null == (__t = test.name) ? "" :__t) + "\n                        </label>\n                    </td>\n                </tr>\n                ";
}), __p += '\n                </tbody>\n            </table>\n        </div>\n        <div class="clearfix"></div>\n\n    </div>\n\n    <div class="fields-select-container">\n\n        <div class="section-header">\n            <h3>Select Report Fields</h3>\n        </div>\n\n        <div class="select-all-container">\n            <label for="select-all-fields"\n                   class="tests">\n                <input id="select-all-fields" name="fields" type="checkbox"\n                       value="select-all" class="select-all-fields select-all" data-list-container="fields-custom-container"/>\n                <span class="">All Fields</span>\n            </label>\n            <label for="select-default-fields"\n                   class="tests">\n                <input id="select-default-fields" name="fields" type="checkbox"\n                       value="select-default" checked="checked" class="select-default-fields select-all" data-list-container="fields-custom-container"/>\n                <span class="">Default Fields</span>\n            </label>\n        </div>\n\n        <div class="show-custom-field-options">\n            <a href="#" data-container="fields-custom-container" class="show-custom-link">Show Fields List <i\n                    class="icon-down-open-mini"></i></a>\n            <a href="#" data-container="fields-custom-container" class="hide-custom-link hidden">Hide Fields List <i\n                    class="icon-up-open-mini"></i></a>\n        </div>\n\n        <div class="mlT hidden fields-custom-container custom-container">\n            <table class="fields_table table data-sleektable" border="0" cellpadding="0" cellspacing="0">\n                <thead>\n                <tr>\n                    <td>\n                        &nbsp;\n                    </td>\n                    <td>\n                        Field\n                    </td>\n                </tr>\n                </thead>\n                <tbody>\n                ', 
_.each(allFields, function(field) {
__p += '\n                <tr>\n                    <td>\n                        <input id="field-' + (null == (__t = field.id) ? "" :__t) + '" name="fields" type="checkbox"\n                               value="' + (null == (__t = field.id) ? "" :__t) + '" class="row-checkbox" ', 
-1 != defaultFields.indexOf(field.id) && (__p += ' checked="checked" '), __p += '/>\n                    </td>\n                    <td>\n                        <label for="field-' + (null == (__t = field.id) ? "" :__t) + '" class="fields" style="font-weight: 400">\n                            ' + (null == (__t = field.value) ? "" :__t) + "\n                        </label>\n                    </td>\n                </tr>\n                ";
}), __p += '\n                </tbody>\n            </table>\n        </div>\n\n    </div>\n\n    <div class="row no-margin plT">\n        <div class="span-xs-16 span-md-16">\n            <button type="submit" id="create-report" class="btn btn-primary btn-mid">Generate\n            </button>\n        </div>\n    </div>\n\n    <div class="report-link-section mlT">\n        <a href="" target="_blank" id="link-box" class="hidden"></a>\n    </div>\n</div>\n';
return __p;
});