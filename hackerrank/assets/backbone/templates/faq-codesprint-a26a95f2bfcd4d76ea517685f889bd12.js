HR.appController.addTemplate("backbone/templates/faq-codesprint",function(obj){{var __p="";Array.prototype.join}with(obj||{})__p+='<div class="container">\n    <header class="page-title container">\n        <h1>Frequently Asked Questions</h1>\n    </header>\n    <div class="light-wrap faq clearfix">\n        <div class="questions span5 pull-left">\n            <ul class="unstyled general">\n                <li class="title"><a class="backbone" href="/faq/faq-general-questions">Hackathon Questions</a></li>\n                <li><a class="backbone" href="/faq/why-solve-challenges">What is the purpose of the Hackathon?</a></li>\n                <li><a class="backbone" href="/faq/internet-use">Can we use the Internet for help during the Hackathon?</a></li>\n                <li><a class="backbone" href="/faq/how-does-scoring-work">How does scoring work?</a></li>\n                <li><a class="backbone" href="/faq/two-contests">What is the difference between CodeSprint4 and the Back-to-School Hackathon?</a></li>              \n                <li><a class="backbone" href="/faq/prizes">What are the prizes for this event?</a></li>\n                <li><a class="backbone" href="/faq/jobs">Can I contact companies for a job?</a></li>\n                <li><a class="backbone" href="/faq/decide-winner">How are the winners decided?</a></li>\n                <li><a class="backbone" href="/faq/contact-admin">How can I contact the mods if I have a query?</a></li>\n                \n            </ul>\n            <ul class="unstyled challenges">\n                <li class="title"><a class="backbone" href="/faq/faq-challenge-details">General Challenge FAQ</a></li>\n                <li><a class="backbone" href="/faq/how-to-submit-code">How do I test out and submit my code?</a></li>\n                <li><a class="backbone" href="/faq/how-to-debug-code">How do I debug my code?</a></li>\n                <li><a class="backbone" href="/faq/time-to-run-code">How much time will my code have to run?</a></li>\n                <li><a class="backbone" href="/faq/can-i-write-to-file">Can my code write to a file?</a></li>\n                \n                \n            </ul>\n        </div>\n        <div class="content span10 pull-left">\n            <h2 id="faq-general-questions">Hackathon Questions</h2>\n\n            <section id="why-solve-challenges">\n                <h3>What can I gain by participating in the Hackathon?</h3>\n                <p>\n                    A hackathon is generally meant for fun and to learn something new. Now added to that, the top winners will <a href = "https://www.hackerrank.com/backtoschool#prizes">receive huge prizes!</a> Everyone who gets on the leaderboard will also get a $100 AWS credit (courtesy Amazon Web services).\n                </p>\n            </section>\n\n            <section id="internet-use">\n                <h3>Can we use the Internet for help during the Hackathon?</h3>\n                <p>You can search online for help about any topic, but you cannot receive help from another person. Any code you submit must be your own.\n                </p>\n            </section>\n\n            <section id="how-does-scoring-work">\n               <h3>How does the scoring work?</h3>\n                <p>Each challenge will have its own scoring. Your total score will simply be the sum of all your scores. You can see more information on the <a href="https://www.hackerrank.com/backtoschool/scoring">scoring page</a>.\n                </p>\n            </section>\n\n              <section id="two-contests">\n                <h3>What is the difference between CodeSprint4 and the Back-to-School Hackathon? They seem to have similar templates and also run on the same time</h3>\n                <p>\n                    The Back-to-School Hackathon is only for University Students in the USA, while CodeSprint4 is open to everyone in the world. The challenges are the same, but the prizes are different. Every participant will be able to connect with tech companies after the contests are over.\n                </p>\n            </section>\n\n            <section id="prizes">\n                <h3>What are the prizes for this event?</h3>\n                <p>\n                    The top three winners get an iPad or apple credits if we\'re not able to ship. As always, there are amazing companies lined up whom you can get connected to!\n                </p>                    \n            </section>\n\n            <section id="jobs">\n                <h3>Can I contact companies for a job?</h3>\n                <p>\n                    Yes. After the contest, we\'ll send you a link where you can express your interest in getting connected to companies who\'re sponsoring the event. The companies include Facebook, Twitter, Dropbox, Pandora, Box, Quora and <a href = "hackerrank.com/backtoschool#sponsors">many more</a>. The companies will get back to you with a yes/no. Over 100+ people have got job offers. This process is purely opt-in. Only if you express interest, will we connect you with companies. Otherwise your data is safely stored in hackerrank servers (we hate spam too!)\n                </p>                    \n            </section>\n\n            <section id="decide-winner">\n                <h3>How are the winners decided?</h3>\n                <p>\n                    The top rankers in the leaderboard. Ties will be broken by the submission time. \n                </p>                    \n            </section>            \n            \n            <section id="contact-admin">\n                <h3>How can I contact the mods if I have a query?</h3>\n                <p>\n                    One of us will definitely be on IRC (#hackerrank on freenode). If you\'ve a query about a challenge, you can use the discussion board for each challenge. You can e-mail us as well: hackers [at] hackerrank. I\'m still contemplating if I should leave my mobile number here. Hmm. \n                </p>                    \n            </section>\n            \n            \n            <h2 id="faq-challenge-details">General Challenge FAQ</h2>\n           \n            <section id="how-to-submit-code">\n                 <h3>How do I test out and submit my code?</h3>\n                 <p>When your finish your first version of code, you can click “Compile & Test” to see it run on a test case. When you finish completely, you can click on “Submit” and it will run against all the test cases (or bots if it\'s a game), and you will get a score for that challenge. You can still make changes and submit it again to get a new score.</p>\n            </section>\n            <section id="how-to-debug-code">\n                <h3>How do I debug my code?</h3>\n                <p>You can print the output to STDERR and debug the code.</p>\n            </section>\n            <section id="time-to-run-code">\n                <h3>How much time will my code have to run?</h3>\n                <p><a href="https://www.hackerrank.com/environment" target="_blank">See environment for the programming languages</a></p>\n            </section>\n            <section id="can-i-write-to-file">\n                <h3>Can my code write to a file?</h3>\n                <p>Yes, it can create a file only in its current directory. Each submission is run in a sandboxed environment. So, the files you create with a submission will not be available for the next one. The file will be persistent in the filesystem till your submission is running. Once it is completed, it\'ll be deleted from the system. \n</p>\n            </section>\n        </div>\n    </div>\n</div>\n';return __p});
//# sourceMappingURL=faq-codesprint-5dbc92051eacd05979c69016ce374ad3.js.map