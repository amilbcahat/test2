HR.appController.addTemplate("backbone/templates/hackathon-scoring", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="container">\n    <header class="page-title container">\n        <h1>Contest Scoring</h1>\n    </header>\n    <div class="light-wrap faq clearfix">\n        ', 
__p += model.custom_documentation ? "\n        " + (null == (__t = model.custom_documentation) ? "" :__t) + "\n        " :'\n        <div class="questions span5 pull-left">\n            <ul class="unstyled general">\n                <li><a class="backbone" href="/scoring/score-evaluation">Overall Scoring</a></li>\n                <li><a class="backbone" href="/scoring/leaderboard">Overall Leaderboard</a></li>\n                <li><a class="backbone" href="/scoring/leaderboard-challenge">Challenge Leaderboard</a></li>\n                \n                <li><a class="backbone" href="/scoring/code-golf">Code Golf</a></li>\n                <li><a class="backbone" href="/scoring/algorithmic-challenges">Algorithmic Challenges</a></li>\n                <li><a class="backbone" href="/scoring/single-player-games">Single Player Games</a></li>\n                <li><a class="backbone" href="/scoring/competitive-games">Competitive Game Scoring</a></li>\n            </ul>           \n        </div>\n\n        <div class="content span10 pull-left">\n\n            <h2 id="score-evaluation">Scoring and Leaderboards</h2>  \n\n            <h3 id="score-evaluation">Overall Scoring</h3>\n                <p>Each challenge will have its own scoring formula and maximum score. The formulas for each type of challenge are explained below. Your total score will simply be the sum of all your scores. \n                </p>\n\n            <section id="leaderboard">\n                <h3>Overall Leaderboard</h3>\n                <p>\n                    The Leaderboard will rank everyone in order of their total scores. The contests winners will be the top people on the leaderboard. \n                </p>\n            </section>\n\n            <section id="leaderboard-challenge">\n                <h3>Challenge Leaderboards</h3>\n                <p>\n                    Each challenge will have its own leaderboard which will rank people by their scores for that challenge only. The score for each challenge will depend upon the type of the challenge it is.\n                </p>\n            </section>\n\n            <h2 id="score-evaluation">Scoring for Challenge Types</h2>            \n           \n            <section id="code-golf">\n                <h3>Code Golf</h3>\n                <p>In the code golf challenges, the goal is to write a correct solution with the shortest possible code. \n                A submission that passes all test cases will receive a score based on the character length of the source code, including spaces and new-lines. The shorter your code is, the higher you will score. The specific scoring details will be given in the challenge statement.</p>\n            </section>\n            <section id="algorithmic-challenges">\n                <h3>Algorithmic Challenges</h3>\n                <p>The algorithmic challenges come with test cases which are increasingly difficult to pass. </p>\n                <p>The score will be based on the percentage of tests cases which your code passes. For example, if you pass 5 out of 10 tests cases, you will receive the points allotted for those 5 passed test cases of that challenge. A correct and optimal solution will pass all test cases. </p>\n            </section>\n            <section id="single-player-games">\n                <h3>Single Player Games</h3>\n                <p>Single player games involve your code interacting with an environment. The game ends when a terminating condition is reached. Scoring and terminating conditions are game dependant and the same will be explained in the problem description.</p>\n            </section>\n\n            <section id="competitive-games">\n                <h3>Competitive Games</h3>\n                <p>In game challenges, your Bot will play against a large sample of other contestants\' bots to see how it performs. It will play against many higher-ranked bots and some of the lower-ranked bots. Your score will then be calculated with a Bayesian Approximation formula to reach a statistically accurate ranking. More details are below.</p>\n\n                <h4>Matchup Details </h4>\n                <p> Your bot will play against every bot ranked 1-10, and then against randomly chosen bots from the rest. It will play against 1 of 2 bots ranked 11-30, 1 of 4 bots ranked 31-70, 1 of 8 bots ranked 71-150, and so on.\n                </p>\n            \n                <h4>Scoring Details</h4>\n                <p>Two-player games are evaluated based on <a href="http://jmlr.csail.mit.edu/papers/volume12/weng11a/weng11a.pdf" target="_blank">Bayesian Approximation</a>. Each game has 3 possible outcomes - win, loss or a draw. A win will have 1 associated with it, 0.5 for a draw and 0 for a loss.</p>\n                <p> Given &#956;<sub>i</sub>, &#963;<sup>2</sup><sub>i</sub> of Player i, we use the Bradley-Terry full pair update rules.</p>\n                <p>We obtain &#937;<sub>i</sub> and &#916;<sub>i</sub> for every player i using the following steps.</p>\n                <p>For q = 1,......,k, q!=i,</p>\n                <p>where <strong>q</strong> are the number of bots competing in a game</p>\n                <p class="math"><img src="https://s3.amazonaws.com/hr-logos/bayesian2.gif"/></p>\n                <p>where &#946; is the uncertainty in the score and is kept constant at 25/6.</p>\n                <p class="math"><img src="https://s3.amazonaws.com/hr-logos/bayesian3-1.png"/><img src="https://s3.amazonaws.com/hr-logos/bayesian3-2.png"/></p>\n                <p>where &gamma;<sub>q</sub> = &sigma;<sub>i</sub>/c<sub>iq</sub> and r(i) is the rank of a player i at the end of a game.</p>\n                <p>We get<p>\n                <p class="math"><img src="https://s3.amazonaws.com/hr-logos/bayesian4.gif"/></p>\n                <p>Now, the individual skills are updated using </p>\n                <p>j = 1,......,n<sub>i</sub></p>\n                <p class="math"><img src="https://s3.amazonaws.com/hr-logos/bayesian6.gif"/></p>\n                <p>where &kappa; = 0.0001. Its used to always have a positive standard deviation &#963;.</p>\n                <p>Score for every player is given as </p>\n                <p class="math"><img src="https://s3.amazonaws.com/hr-logos/bayesian7.png"/></p>\n                <p>&mu; for a new bot is kept at 25 and &sigma; at 25/3.</p>\n            </section>\n            \n        </div>\n        ', 
__p += "\n    </div>\n</div>\n";
return __p;
});