HR.appController.addTemplate("backbone/templates/manage/hacker-applications-item",function(obj){{var __t,__p="";Array.prototype.join}with(obj||{})__p+='<div class="span15 block-center" style="margin-top:20px;">\n  <ul class="nav nav-tabs unstyled">\n    <li class="active">\n      <a href="#profile-'+(null==(__t=index)?"":__t)+"\" data-toggle='tab'>Profile</a>\n    </li>\n    ",_.each(model.challenges,function(n){__p+='\n      <li>\n        <a class="change-tab" data-id="'+(null==(__t=n.id)?"":__t)+'" href="#'+(null==(__t=n.slug)?"":__t)+"-"+(null==(__t=index)?"":__t)+"\" data-toggle='tab'>"+(null==(__t=n.name)?"":__t)+"</a>\n      </li>\n    "}),__p+='\n  </ul>\n  <div class="span15 block-center tab-content" style="border-left: 1px solid #DDD; border-right: 1px solid #DDD; border-bottom: 1px solid #DDD; overflow:visible;">\n    <div class="tab-pane active" id="profile-'+(null==(__t=index)?"":__t)+'" style="padding:15px; overflow:auto;">\n      <div class="span11">\n          <p>\n            <a class="btn btn-small pull-right" style="margin-top:-3px;" target="_blank" href="'+(null==(__t=model.resume.url)?"":__t)+'">Download Resume</a>\n            <h3>'+(null==(__t=model.hacker_name)?"":__t)+"\n              <small>("+(null==(__t=model.hacker_username)?"":__t)+')</small>\n            </h3>\n            <hr/>\n            <div class="row">\n              <h5 class="span5"><strong>Country:</strong> '+(null==(__t=model.hacker_country)?"":__t)+'</h5>\n            </div>\n          </p>\n      </div>\n      <div class="span3 pull-right light-wrap text-center">\n          <h6>Contest Rank</h6>\n          <h1>'+(null==(__t=model.rank)?"":__t)+"</h1>\n          <h5><strong>Score: </strong>"+(null==(__t=Math.round(100*model.score)/100)?"":__t)+'</h5>\n      </div>\n      <div class="span14">\n        <div class="row">\n          <h6 class="span6"><strong>Email:</strong> '+(null==(__t=model.email)?"":__t)+'</h6>\n          <h6 class="span6"><strong>Contact Number:</strong> '+(null==(__t=model.contact_number)?"":__t)+'</h6>\n        </div>\n        <div class="row">\n          <h6 class="span6"><strong>Visa Status:</strong> '+(null==(__t=visa_status)?"":__t)+'</h6>\n          <h6 class="span6"><strong>Role:</strong> '+(null==(__t=role)?"":__t)+'</h6>\n        </div>\n        <div class="row">\n          <h6 class="span13"><strong>Languages Used:</strong>\n            ',_.each(model.languages,function(n){__p+="\n              "+(null==(__t=lang_display_mapping[n])?"":__t)+",\n            "}),__p+='\n          </h6>\n        </div>\n        <div class="row">\n          <h6 class="span13"><strong>Biggest Hack:</strong>\n            '+(null==(__t=model.hacker_hack)?"":__t)+"\n          </h6>\n        </div>\n      </div>\n    </div>\n    ",_.each(model.challenges,function(n){__p+='\n      <div class="tab-pane" id="'+(null==(__t=n.slug)?"":__t)+"-"+(null==(__t=index)?"":__t)+"\" style=\"padding:15px;\">\n        <div class='throbber text-center' style='padding: 95px 0; height: 64px;'>\n          <img src='https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_64x64.gif'>\n        </div>\n      </div>\n    "}),__p+="\n  </div>\n</div>\n";return __p});
//# sourceMappingURL=hacker-applications-item-ba1b9a917204160c167fad58d56c91e4.js.map