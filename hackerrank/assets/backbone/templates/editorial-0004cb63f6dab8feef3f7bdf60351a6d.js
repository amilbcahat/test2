HR.appController.addTemplate("backbone/templates/editorial",function(obj){{var __t,__p="";Array.prototype.join}with(obj||{}){if(__p+='<div class="row">\n    <div class="span11">\n        ',model.draft&&(__p+=' <h2 class="text-center">THIS POST IS STILL A DRAFT.</h2> '),__p+="\n        ",model._data){if(__p+="\n        <!-- if an approach is included -->\n        ",model._data.approach&&(__p+="\n\n        <!-- and if there is an editorialist, include these -->\n        ",model._data.editorialist&&(__p+='\n            <p class="bold msB">\n                <img src="'+(null==(__t=model.editorialist_avatar)?"":__t)+'" height="25" width="25" class="avatar" onerror="this.onerror=null; this.src=\'https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg\';">\n                Editorial by <a href="/'+(null==(__t=model._data.editorialist)?"":__t)+'" target="_blank" >'+(null==(__t=model._data.editorialist)?"":__t)+"</a>\n\n            </p>\n        "),__p+=' <!-- end editorialist -->\n        <div class="mlB">\n            '+(null==(__t=model._data.approach)?"":__t)+"\n        </div>\n\n        "),__p+=" <!-- end approach -->\n\n        <!-- If we include the problem setter's code -->\n        ",model._data.setter_code&&(__p+="\n\n        <!-- and if we have their name, include these -->\n        ",model._data.setter_name&&(__p+='\n            <p class="bold msB">\n                <img src="'+(null==(__t=model.setter_avatar)?"":__t)+'" height="25" width="25" class="avatar" onerror="this.onerror=null; this.src=\'https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg\';">\n                Set by <a href="/'+(null==(__t=model._data.setter_name)?"":__t)+'" target="_blank">'+(null==(__t=model._data.setter_name)?"":__t)+"</a>\n            </p>\n        "),__p+=' <!-- end problem setter name -->\n        <div class="editorial-header-box">\n            <p class="pull-left">Problem Setter\'s code : </p>\n        </div>\n        <div class="editorial-code-box">\n            <p class="pull-left">'+(null==(__t=model._data.setter_code)?"":__t)+"</p>\n        </div>\n        "),__p+=" <!-- end problem setter code -->\n\n        <!-- If we include the problem tester's code -->\n        ",model._data.tester_code&&(__p+="\n\n        <!-- and if we have their name, include these -->\n\n        ",model._data.tester_name&&(__p+='\n            <p class="bold msB">\n                <img src="'+(null==(__t=model.tester_avatar)?"":__t)+'" height="25" width="25" class="avatar" onerror="this.onerror=null; this.src=\'https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg\';">\n                Tested by <a href="/'+(null==(__t=model._data.tester_name)?"":__t)+'" target="_blank">'+(null==(__t=model._data.tester_name)?"":__t)+"</a>\n            </p>\n\n        "),__p+=' <!-- end problem tester\'s name -->\n\n        <div class="editorial-header-box">\n            <p class="pull-left">Problem Tester\'s code : </p>\n        </div>\n\n        <div class="editorial-code-box">\n            <p class="pull-left">'+(null==(__t=model._data.tester_code)?"":__t)+"</p>\n        </div>\n        "),__p+=' <!-- end problem tester\'s code -->\n\n    </div>\n    <div class="span4 pull-right">\n        <div class="mlB">\n            <h4 class="bold">Statistics</h4>\n            ',model._data.difficulty&&(__p+='<p class="small bold"><span class="zeta">Difficulty: </span><span class="">'+(null==(__t=model._data.difficulty)?"":__t)+"</span></p>"),__p+="\n            ",model.statistics){__p+="\n            ";var statistics_json=JSON.parse(model.statistics);__p+="\n            "}__p+="\n            ",statistics_json&&(__p+='\n            <p class="small bold"><span class="zeta">Success Rate: </span><span class="">'+(null==(__t=(100*statistics_json.successful_submissions/statistics_json.challenge_submissions).round(2))?"":__t)+"%</span></p>\n            "),__p+="\n            ",model._data.time_complexity&&(__p+='<p class="small bold"><span class="zeta">Time Complexity: </span><span class="">'+(null==(__t=model._data.time_complexity)?"":__t)+"</span></p>"),__p+="\n            ",model._data.required_knowledge&&(__p+='<p class="small bold"><span class="zeta">Required Knowledge: </span>'+(null==(__t=model._data.required_knowledge)?"":__t)+"</p>"),__p+='\n            <p class="small bold"><span class="zeta">Publish Date: </span><span class="">'+(null==(__t=$.format.date(new Date(model.created_at),"MMM dd yyyy"))?"":__t)+"</span></p>\n        </div>\n\n        ","master"==HR.appController.get_current_contest_slug()&&"master"!=model.contest_slug&&(__p+='\n        <p><span class="small bold">Originally featured in <a class="backbone" href="/contests/'+(null==(__t=model.contest_slug)?"":__t)+'">'+(null==(__t=model.contest_name)?"":__t)+"</a></span></p>\n        "),__p+="\n        ","master"==model.contest_slug&&(__p+='\n        <p><span class="small bold">This is a Practice Challenge</span></p>\n        '),__p+="\n        ",statistics_json&&(__p+='\n        <p class="mlB">Of the '+(null==(__t=statistics_json.contest_participation)?"":__t)+" contest participants,\n           "+(null==(__t=statistics_json.challenge_submissions)?"":__t)+"\n           ("+(null==(__t=(100*statistics_json.challenge_submissions/statistics_json.contest_participation).round(2))?"":__t)+"%)\n           submitted code for this challenge.\n        </p>\n        "),__p+="\n\n        "}__p+="\n\n    </div>\n</div>\n"}return __p});
//# sourceMappingURL=editorial-d8a267023db6c23687d42cfc3bb97749.js.map