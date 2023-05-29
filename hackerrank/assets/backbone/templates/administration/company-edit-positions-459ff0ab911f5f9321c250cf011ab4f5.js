HR.appController.addTemplate("backbone/templates/administration/company-edit-positions",function(obj){{var __t,__p="";Array.prototype.join}with(obj||{})__p+='<p class="aside block-margin margin-large">Positions for which the Company is\n  hiring for.</p>\n\n<div class="formgroup horizontal row">\n  <div class="span16">\n    <button class="add-position btn btn-green">+ Add Position</button>\n  </div>\n</div>\n\n',_.each(_model.company_positions,function(n){__p+='\n<div class="formgroup horizontal row" style="border-bottom: 2px solid #eee; padding-bottom: 15px;">\n  <div class="span14">\n    <p><strong>'+(null==(__t=n.name)?"":__t)+"</strong><br>"+(null==(__t=n.description)?"":__t)+'</p>\n  </div>\n  <div class="span2 right">\n    <button class="btn btn-text edit-position" data-id="'+(null==(__t=n.id)?"":__t)+'"><i class="icon-pencil"></i> edit</button> &nbsp;&nbsp;&nbsp;\n    <button class="btn btn-text remove-position" data-id="'+(null==(__t=n.id)?"":__t)+'">&#215; delete</button>\n  </div>\n</div>\n'}),__p+="\n";return __p});
//# sourceMappingURL=company-edit-positions-b86a55683ad3f288c81d32c5ddf4c921.js.map