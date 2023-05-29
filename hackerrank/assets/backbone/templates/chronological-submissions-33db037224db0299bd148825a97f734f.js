HR.appController.addTemplate("backbone/templates/chronological-submissions",function(obj){{var __t,__p="";Array.prototype.join}with(obj||{})__p+='<section class="submissions container">\n  <div class="padded">\n    <header class="clearfix">\n        <div class="page_heading">\n        </div>\n\n      <!-- ##Breadcrumbs should only show on challenge-specific submission lists-->\n      <!-- sort mode toggle -->\n      <div class="page_title">\n          <div class="clearfix">\n              <h1 class="pull-left">Submissions</h1>\n\n              <div class="margin-small top pull-right btn-group submissions_filters-buttons">\n                <!-- strip trailing slash -->\n                <a href='+(null==(__t=collection.pageURL()+"all")?"":__t)+'  class="backbone btn btn-white active"><span class="icon-text">Sort by Date</span></a>\n                <a href='+(null==(__t=collection.pageURL()+"grouped")?"":__t)+' class="backbone btn btn-white"><span class="icon-text">Sort by Challenge</span></a>\n              </div>\n          </div>\n          <h5 class="alpha page_title-subtitle">\n              ',collection.challenge&&collection.challenge.get("name")&&(__p+="for "+(null==(__t=collection.challenge.get("name"))?"":__t)),__p+='\n          </h5>\n      </div>\n  </header>\n  <div class="submissions_list text-center">\n\n  ',__p+=0!=collection.total?'\n      <div class="table-wrap">\n          <header class="row-clear list-header submissions_list-header">\n              <div class="span4 submissions-title">\n                <p>Problem</p>\n              </div>\n              <div class="span2 submissions-language">\n                <p>Language</p>\n              </div>\n              <div class="span1 submissions-time">\n                <p>Time</p>\n              </div>\n              <div class="span3">\n                <p>Result</p>\n              </div>\n              <div class="span1">\n                <p>Score</p>\n              </div>\n              <div class="span2">\n                <p></p>\n              </div>\n          </header>\n\n          <div class="table-body submissions-list-wrapper table--striped">\n          </div>\n\n          <div class="pagination-wrap clearfix pagination-wrapper">\n          </div>\n      </div>\n      ':'\n      <div class="light-wrap padded">\n        <p>You have not made any submissions yet.</p>\n        <p class="text-center block-margin"><a href="/categories" class="btn btn-green btn-large backbone">View Challenges</a></p>\n      </div>\n      ',__p+="\n\n  </div>\n  </div>\n</section>\n";return __p});
//# sourceMappingURL=chronological-submissions-c1ef2082b9fbd969eadf0b7b613c879c.js.map