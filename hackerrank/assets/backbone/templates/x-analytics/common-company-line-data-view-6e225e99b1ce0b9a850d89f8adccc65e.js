HR.appController.addTemplate("backbone/templates/x-analytics/common-company-line-data-view",function(obj){{var __t,__p="";Array.prototype.join}with(obj||{})__p+='<div id="detailed-results" class="mjT">\n    ',data.from_time&&data.to_time&&(__p+="\n    <h2>"+(null==(__t=tableHeader)?"":__t)+" ("+(null==(__t=data.from_time)?"":__t)+" - "+(null==(__t=data.to_time)?"":__t)+') </h2>\n\n    <div class="table-container">\n        <table cellpadding="0" cellspacing="0" border="0" class="line-graph-data-table table dt-sleektable">\n            <thead>\n            <tr>\n                ',_.each(data.keys,function(t){__p+="\n                    <td>"+(null==(__t=t)?"":__t)+"</td>\n                "}),__p+="\n            </tr>\n            </thead>\n            <tbody>\n            ",_.each(data.table_data,function(t){__p+="\n            <tr>\n                ",_.each(t,function(t){__p+="\n                <td>"+(null==(__t=t)?"":__t)+"</td>\n                "}),__p+="\n            </tr>\n            "}),__p+="\n            </tbody>\n        </table>\n    </div>\n    "),__p+="\n</div>\n";return __p});
//# sourceMappingURL=common-company-line-data-view-2d481da83f00a890af555039db74138f.js.map