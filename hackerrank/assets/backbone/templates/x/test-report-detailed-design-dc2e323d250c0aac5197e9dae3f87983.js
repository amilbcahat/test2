HR.appController.addTemplate("backbone/templates/x/test-report-detailed-design",function(obj){{var __p="";Array.prototype.join}with(obj||{})__p+='<div class="msA">\n  ',question.answered!==!1||anysubmissions?(__p+="\n    ",question.answered===!1&&(__p+='\n    <div class="common_margin alert alert-block alert-info">\n      <center>No answer was submitted for this question. Showing rendered/autosaved versions.</center>\n    </div>\n    '),__p+="\n\n    ","pdf"!=tab&&(__p+='\n    <div class="position-relative">\n        ',anysubmissions&&(__p+='<ul class="nav nav-tabs ungroup js-code-tab"></ul>'),__p+="\n        ","true"!==question.multiple_files&&question.submissions.length>1&&(__p+='\n            <div class="code-player" id="code-player">\n                <span class="txt-alt-grey fnt-wt-600">\n                    <i class="icon-menu-large"></i>&nbsp;PLAY CODE\n                </span>\n                <div class="code_play_slide_wrap" style="display: none">\n                    <div class="timeline-slider-wrapper msT">\n                        <div class="slider" style="width:220px;"></div>\n                    </div>\n                </div>\n            </div>\n        '),__p+="\n    </div>\n    "),__p+="\n    ",anysubmissions&&(__p+="\n        ","true"===question.multiple_files?__p+='\n            <div id=\'editor-with-tree\' class="row">\n                <div class="js-file-tree span-md-3">\n                </div>\n                <pre class="outbox cm-s-default no-padding span-md-13" style="border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;">\n                Please click on any file on the left to view.\n                </pre>\n            </pre>\n          </div>\n        ':(__p+="\n            ",__p+="pdf"==tab?'\n            <div class="js-code-pdf"></div>\n            ':'\n            <div class="tab-content js-code-content"></div>\n            ',__p+="\n        "),__p+='\n        <div class="clearfix grey-header rendered-output-title hidden cap plL plR psT psB mmL span16">\n            <p class="f-weight-600">Rendered Output:</p>\n        </div>\n        <div class="span16 js-rendered-data-loading hidden pjT light-wrap mmL" style="height:600px;">\n            <div style=\'background: url(https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_64x64.gif); height: 64px; width: 64px; display:block; margin: auto\'></div>\n        </div>\n        <iframe class="mmL span16 no-padding hidden js-rendered-data light-wrap" height="600px"></iframe>\n    '),__p+="\n"):__p+='\n  <div class="common_margin alert alert-block">\n      <center>This candidate has not answered this question.</center>\n  </div>\n  ',__p+='\n</div>\n\n<div class="clear"></div>\n';return __p});
//# sourceMappingURL=test-report-detailed-design-031d3e4af0410e2df19a0c606486c27f.js.map