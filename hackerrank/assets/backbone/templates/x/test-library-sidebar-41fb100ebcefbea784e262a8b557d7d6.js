HR.appController.addTemplate("backbone/templates/x/test-library-sidebar",function(obj){{var __t,__p="";Array.prototype.join}with(obj||{}){__p+='<div class="stats-head">\n     <strong>Test questions</strong>\n    <a class="pull-right js-closesidebar"><i class="icon2-close txt-navy"></i></a>\n</div>\n\n<ul class="added-quest-list">\n';var h=window.istreet.cfg.hrqn;_.each(questions,function(t){__p+='\n  <li id="q'+(null==(__t=t.id)?"":__t)+'">\n    <strong class="lib-sidebar-questitle">',__p+=t.name?""+(null==(__t=t.name)?"":__t):""+(null==(__t=h[t.type])?"":__t),__p+='</strong>\n    <a class="pull-right btn btn-alert quest-remove-btn js-remove-question" data-qid="'+(null==(__t=t.id)?"":__t)+'" data-quid="'+(null==(__t=t.unique_id)?"":__t)+'" ><i class="icon2-delete"></i></a>\n    <div class="clear"></div>\n    <span class="txt-navy">'+(null==(__t=t.points)?"":__t)+' points</span>\n    <p class="txt-alt-grey">\n        '+(null==(__t=t.preview)?"":__t)+"\n    </p>\n  </li>\n"}),__p+="\n</ul>\n"}return __p});
//# sourceMappingURL=test-library-sidebar-6728af23a7b539bac62fbc26224f0339.js.map