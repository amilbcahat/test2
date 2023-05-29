HR.appController.addTemplate("backbone/templates/api",function(obj){{var __t,__p="";Array.prototype.join}with(obj||{})__p+='<section class="api">\n    <header class="hero hero--grey container">\n        <div class="container--inner text-center">\n	        <h1>HackerRank API</h1>\n	        <h4>Power your programming contest using the HackerRank platform.</h4>\n        </div>\n    </header>\n    <div class="container">\n        <ul class="nav-tabs nav hero--grey_tabs">\n            <li class="active"><a href="#apiKeys" data-toggle="tab">API Keys</a></li>\n            <li><a href="#apiMethods" data-toggle="tab">Documentation</a></li>\n            <li><a href="#apiSample" data-toggle="tab">Sample code</a></li>\n        </ul>\n\n    <div class="container--inner">\n        <div class="tab-content">\n            <div class="tab-pane padded active" id="apiKeys">\n    		',isLoggedIn?(__p+="\n    		    ",consumers.length>0&&(__p+='\n                    <h3 class="margin-small bottom"><strong>API Keys</strong></h3>\n    		<div class="api-list api-group margin-large bottom">\n			    <div class="row margin-small bottom">\n			        <span class="span2"><strong>Name</strong></span>\n			        <span class="span10"><strong>Key</strong></span>\n			    </div>\n			',_.each(consumers,function(a){__p+='\n			    <div class="row margin-small bottom">\n			        <span class="span2">'+(null==(__t=a.name)?"":__t)+'</span>\n			        <span class="span10">'+(null==(__t=a.api_key)?"":__t)+"</span>\n			    </div>\n			"}),__p+="\n		    </div>\n    		"),__p+='\n                    <h3 class="margin-large top"><strong>Generate a new API key</strong></h3>\n                    <form>\n                        <div class="formgroup">\n                        <label><strong>Name</strong></label>\n                            <input type="text" placeholder="required" id="genkey-app-name">\n                            <p class="small">Your application\'s name</p>\n                        </div>\n                        <div class="formgroup">\n                        <label><strong>Description</strong></label>\n    		    <textarea rows="10" type="text" id="genkey-app-description"></textarea>\n                            <p class="small">Your application\'s description</p>\n                        </div>\n                        <div class="formgroup">\n                        <label><strong>Website</strong></label>\n                            <input type="text" id="genkey-app-website">\n                            <p class="small">Your application\'s website</p>\n                        </div>\n\n    		    <a class="btn btn-green api-button margin-large top" id="genkey-api-btn">Generate your API code</a><br>\n      		    <small class="error">'+(null==(__t=_.map(errors,function(a){return _.escape(a)}).join("<br>"))?"":__t)+"</small>\n                    </form>\n    		"):__p+="\n    		<p>You need to be logged in to generate an API key</p>\n    		",__p+='\n                </div>\n            <div class="tab-pane padded" id="apiMethods">\n                <h3 class="margin-large bottom"><strong>API Methods</strong></h3>\n                <ul class="nav nav-tabs" id="api-tabs">\n                    <li class="active"><a href="#api-submissions" data-toggle="tab">Submissions</a></li>\n                    <li><a href="#api-languages" data-toggle="tab">Languages</a></li>\n                </ul>\n    	    	<div class="tab-content">\n    	    		<div class="tab-pane active api-subtabs" id="api-submissions">\n    	    		    <h4><strong>Post a submission</strong></h4>\n    	    		    <small class="meta">Updated on Tuesday March 12, 2013</small>\n    	    		    <p class="margin-large bottom">Allows users to use the HackerRank code checker for their own purposes. Submit source code, which is compiled and run against a list of provided test cases.</p>\n    	    		    <code class="api-code margin-large bottom">POST http://api.hackerrank.com/checker/submission.json</code>\n    	    		    <div class="table-lined no-border table-wrap margin-large top">\n	    			    <header><strong>\n	    			        <span class="span3">Parameter</span>\n	    			        <span class="span5">Value</span>\n	    			        <span class="span2">Type</span>\n	    			        <span class="span5">Description</span>\n	    			    </strong></header>\n	    			    <div class="table-body">\n	    			        <div class="row row-alt">\n	    			            <span class="span3 api-text">source</span>\n	    			            <span class="span5"><textarea id="api-submission-source" rows="5" type="text" placeholder="required"></textarea></span>\n	    			            <span class="span2 api-text">text</span>\n	    			            <span class="span5">The source code for a submission</span>\n	    			        </div>\n	    			        <div class="row">\n	    			            <span class="span3 api-text">lang</span>\n	    			            <span class="span5"><input id="api-submission-language" class="api-input" type="text" placeholder="required"></span>\n	    			            <span class="span2 api-text">text</span>\n	    			            <span class="span5">The language code for the submission<br>Ex: 5 (Python)</span>\n	    			        </div>\n	    			        <div class="row row-alt">\n	    			            <span class="span3 api-text">testcases</span>\n	    			            <span class="span5"><input id="api-submission-testcases" class="api-input" type="text" placeholder="required"></span>\n	    			            <span class="span2 api-text">string</span>\n	    			            <span class="span5">A JSON list of strings, each being a test case.</span>\n	    			        </div>\n	    			        <div class="row">\n	    			            <span class="span3 api-text">api_key</span>\n	    			            <span class="span5" style="color: #666;">A dummy api key will be used</span>\n	    			            <span class="span2 api-text">string</span>\n	    			            <span class="span5">Your HackerRank API key</span>\n	    			        </div>\n	    			        <div class="row row-alt">\n	    			            <span class="span3 api-text">wait</span>\n	    			            <span class="span5"><select id="api-submission-wait"><option>true</option><option>false</option></select></span>\n	    			            <span class="span2 api-text">enumerated</span>\n	    			            <span class="span5">\n	    			        	    <strong>true</strong> The response is sent only after the submission is compiled and run<br><br>\n	    			        	    <strong>false</strong> The request returns immediately and submission response will posted through the callback URL.\n	    			            </span>\n	    			        </div>\n	    			        <div class="row">\n	    			            <span class="span3 api-text">callback_url</span>\n	    			            <span class="span5"><input id="api-submission-callbackurl" class="api-input" type="text" placeholder="optional"></span>\n	    			            <span class="span2 api-text">string</span>\n	    			            <span class="span5">A callback url, on which the submission response will be posted as a JSON string under `data` parameter.</span>\n	    			        </div>\n	    			        <div class="row row-alt">\n	    			            <span class="span3 api-text">format</span>\n	    			            <span class="span5"><select id="api-submission-format"><option>json</option><option>xml</option></select></span>\n	    			            <span class="span2 api-text">enumerated</span>\n	    			            <span class="span5">Output format as JSON or XML</span>\n	    			        </div>\n	    			    </div>\n	    		    </div>\n    	    		    <p class="text-center margin-large top"><a class="btn btn-green btn-large api-button try-submission-btn">Try it!</a></p>\n    	    		    <div id="api-submission-output"></div>\n    	    		</div>\n    	    		<div class="tab-pane api-subtabs" id="api-languages">\n    	    		    <h4><strong>Get supported languages and their codes</strong></h4>\n    	    		    <small class="meta">Updated on Tuesday March 12, 2013</small>\n    	    		    <p class="margin-large bottom">This method provides you with information regarding the language codes which our code checker supports</p>\n    	    			<code class="api-code">GET http://api.hackerrank.com/checker/languages.json</code>\n    	    			<div class="margin-large top table-wrap">\n    	    			    <header>\n                                <span class="span3">Parameter</span>\n                                <span class="span5">Value</span>\n                                <span class="span2">Type</span>\n                                <span class="span5">Description</span>\n                            </header>\n                            <div class="table-body">\n    	    	        		<div class="row">\n    	    	        		    <span class="span3">format</span>\n    	    	        		    <span class="span5"><select id="api-languages-format"><option>json</option><option>xml</option></select></span>\n    	    	        		    <span class="span2">enumerated</span>\n    	    	        		    <span class="span5">Output format as JSON or XML</span>\n    	    	        		</div>\n                            </div>\n    	    			</div>\n    	    		    <p class="margin-large top text-center"><a class="btn btn-green btn-large api-button try-languages-btn">Try it!</a></p>\n    	    		    <div id="api-languages-output"></div>\n    	    		</div>\n    	    	</div>\n            </div>\n    	    <div class="tab-pane padded" id="apiSample">\n    		    <h3><strong>Sample submission</strong></h3>\n    		    <p class="margin-large bottom">A basic submission requires three parameters:</p>\n    		    <dl class="api-parameters margin-large bottom">\n    			    <dt>source</dt>\n    			    <dd>The source code, which needs to be compiled and run against the provided test cases.</dd><br>\n    			    <dt>lang</dt>\n    			    <dd>The language key for the language, the submission is made in. The data about language keys is available through the <a href="http://api.hackerrank.com/checker/languages.json">languages endpoint</a>.</dd><br>\n    			    <dt>testcases</dt>\n    			    <dd>A valid JSON, which on parse should result in a list of strings.</dd><br>\n    			    <dt>api_key</dt>\n    			    <dd>Your HackerRank API Key</dd>\n    		    </dl>\n    		    <p class="margin-small bottom">Here is a very simple submission using the <code>curl</code> command line tool to post a submission. The source code just prints the number `1` on any input and there is a single testcase, the string "1". Language key `5` means the language "python".</p>\n    		    <pre><code>curl -sX POST api.hackerrank.com/checker/submission.json -d \'source=print 1&lang=5&testcases=["1"]&api_key=yourapikeyfoobarbaz\'</code></pre>\n    		    <p class="margin-small bottom">The JSON response:</p>\n    		    <pre><code>{\n    "result": {\n       "callback_url": "",\n	"compilemessage": "Compiling /run-Wau8DkGiVQakETUogLnm/solution.py ...\\n",\n	"hash": "run-JWv0DRvGh6fEuu4rurgL",\n	"memory": [\n	    "552928"\n	],\n	"message": [\n	    "Success"\n	],\n	"result": 0,\n	"server": "ip-10-244-235-113.ec2.internal",\n	"signal": [\n	    0\n	],\n	"stderr": [\n	    false\n	],\n	"stdout": [\n	    "1\\n"\n	],\n	"time": [\n	    "0.24375"\n	]\n\n    }\n}\n</code></pre>\n    		    <h3 class="margin-large top bottom"><strong>Optional parameters</strong></h3>\n    		    <p class="margin-small bottom">Apart from the above required params, we accept following extra options:</p>\n    	    	<dl class="api-parameters margin-large bottom">\n    	    	    <dt>callback_url</dt>\n    	    	    <dd>A url, on which the checker response data is posted. The data will be a POST request with the JSON string under the parameter `data`.</dd><br>\n    	    	    <dt>wait </dt>\n    	    	    <dd>(default: "true")</dd>\n    	    	    <dd>This will only be effective when the callback url is provided. When wait is set to the string "false", the request to the API does not wait for a response back, and just responds with a positive status that the submission has been made. The result can be obtained from the callback url.</dd>\n    	    	</dl>\n    		    <p class="margin-small bottom">Here is the same submission with a callback url and the wait disabled.</p>\n    		    <pre><code>curl -sX POST api.hackerrank.com/checker/submission.json -d \'source=print 1&lang=5&testcases=["1"]&callback_url=http://your-site.com/checker_callback&wait=false&api_key=yourapikeyfoobarbaz\'\n    </code></pre>\n                <p class="margin-small bottom">The JSON response:</p>\n                <pre><code>{\n    "result": true\n}\n    </code></pre>\n    		    </div>\n    	    </div>\n    </div>\n</section>\n';return __p});
//# sourceMappingURL=api-1b2984ee32d3cda7cc3f57c355c6393e.js.map