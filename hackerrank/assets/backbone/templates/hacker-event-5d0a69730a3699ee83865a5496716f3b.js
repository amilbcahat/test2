HR.appController.addTemplate("backbone/templates/hacker-event",function(obj){{var __t,__p="";Array.prototype.join}with(obj||{})__p+="",0==model.length&&(__p+="\n\n  ",__p+=hacker===HR.profile().get("username")?'\n    <p class="mlB aside text-center">You have not participated in any events yet.</p>\n    <p class=" text-center"><a href="/" class="btn span3 block-center">View Contests</a></p>\n  ':'\n    <p class="mlB aside text-center">'+(null==(__t=hacker)?"":__t)+" has not participated in any events yet.</p>\n  ",__p+="\n"),__p+="\n",_.each(model,function(n){__p+='\n    <div class="profile-events-item">\n        <p><strong>'+(null==(__t=n.name)?"":__t)+"</strong>\n            ",n.ended&&""!=n.rank?__p+='\n                &bull; <span class="aside">placed '+(null==(__t=n.rank)?"":__t)+"</span>\n            ":n.started&&""!=n.rank&&(__p+='\n                &bull; <span class="aside">currently '+(null==(__t=n.rank)?"":__t)+"</span>\n            "),__p+="\n\n         ",__p+=n.ended?'\n            <a href="/contests/'+(null==(__t=n.slug)?"":__t)+'/leaderboard" class="btn btn-text btn-small pull-right backbone psT"><i class="icon-trophy icon--single"></i></a>\n         ':'\n            <a href="/contests/'+(null==(__t=n.slug)?"":__t)+'/" class="btn btn-text pull-right backbone">Join</a>\n         ',__p+="\n         </p>\n    </div>\n"}),__p+="\n";return __p});
//# sourceMappingURL=hacker-event-44e5f389d283b457767d083633c7f871.js.map