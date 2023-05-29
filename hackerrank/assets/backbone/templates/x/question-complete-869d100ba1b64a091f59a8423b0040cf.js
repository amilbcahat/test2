HR.appController.addTemplate("backbone/templates/x/question-complete",function(obj){{var __t,__p="";Array.prototype.join}with(obj||{})__p+='<div class="top-fixed-bar">\n    ',test&&(__p+=' <h3 class="topbar-h3 mjL">'+(null==(__t=test.name)?"":_.escape(__t))+"</h3> "),__p+='\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Questions</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>',__p+=edit?"Edit":"Create",__p+=' question</h3>\n</div><!-- end .top-fixed-bar -->\n<div class="overflow-content" id="control-overflow">\n    <form name="question-complete-form" class="mjA">\n        <div class="formgroup span-xs-16 span-md-10">\n            <label>Problem statement</label>\n            <p class="txt-alt-grey-dark span15 no-padding">The text you enter into the box below will be shown as a preamble to the sentence that needs to be completed. Enter any instructions, show any diagrams, or set the context for your question in any other way. You could leave this box empty if you so choose to.</p>\n            <div class="clear"></div>\n\n            <textarea name="problem-statement" class="texteditor">',model.question&&(__p+=""+(null==(__t=model.question)?"":__t)),__p+='</textarea>\n        </div>\n        <div class="span-xs-16 span-md-6 js-tags"></div>\n        <div class="clear"></div>\n        <div class="formgroup">\n            <label>Complete string</label>\n            <p class="txt-alt-grey-dark span11 no-padding">This is the sentence that needs to be completed by the candidate. You have to insert the sequence {blank} including the curly braces wherever you want to display a literal blank line where the candidate will type her answer. There can be more than one {blank}</p>\n            <textarea id="problem-text" name="text" rows="2" class="txt_box span12 mlT" placeholder="Enter sentence here">',model.complete_string&&(__p+=""+(null==(__t=model.complete_string)?"":__t)+" "),__p+='</textarea>\n            <div class="clear"></div>\n        </div>\n\n            <div class="formgroup blanks-container">\n                <label>Choices</label>\n                <p class="txt-alt-grey-dark span9 no-padding">Enter the correct answers below</p>\n                <div class="clear"></div>\n\n                ',model.options?(__p+="\n                    ",_.each(model.options,function(n){__p+='\n                        <div class="white-grid-block no-margin no-padding blank-container">\n                            <div class="mlA">\n                                <div class="choices-container">\n                                    ',_.each(n,function(n){__p+='\n                                    <div class="new-choice">\n                                        <input type="text" value="'+(null==(__t=n)?"":__t)+'"/><a href="javascript:;" class="delete-choice" class="txt-alt-grey msL"><i class="icon2-close fnt-sz-big"></i></a>\n                                        <br/>\n                                    </div>\n                                    '}),__p+='\n                                </div>\n                                <button class="btn add-new-choice">Add one more Choice</button>\n                            </div>\n                        </div>\n                '}),__p+="\n                "):__p+='\n                    <div class="white-grid-block no-margin no-padding blank-container">\n                        <div class="mlA">\n                            <div class="choices-container">\n                                <div class="new-choice">\n                                    <input type="text" /><a href="javascript:;" class="delete-choice" class="txt-alt-grey msL"><i class="icon2-close fnt-sz-big"></i></a>\n                                    <br/>\n                                </div>\n                            </div>\n                            <button class="btn add-new-choice">Add one more Choice</button>\n                        </div>\n                    </div>\n                ',__p+='\n\n            </div>\n            <button class="btn add-new-blank">Add one more Blank</button>\n\n        <div class="row no-margin plT">\n            <div class="span-xs-16 span-md-16">\n                <button type="submit" class="btn btn-primary btn-mid">Save Question</button>\n                <em>or</em>\n                <button type="button" class="btn btn-mid js-save-and-add">Save & Add another</button>\n                <div id="complete-sentence-response-box" class="hidden mlT">Some Error</div>\n\n            </div>\n        </div>\n    </form>\n</div>\n';return __p});
//# sourceMappingURL=question-complete-270cc37e7bd7b91cf45581577ea3d325.js.map