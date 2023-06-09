var lang_mime_mapping = {
c:"text/x-csrc",
cpp:"text/x-c++src",
java:"text/x-java",
csharp:"text/x-csharp",
haskell:"text/x-haskell",
php:"text/x-php",
python:"text/x-python",
perl:"text/x-perl",
ruby:"text/x-ruby",
bash:"text/x-bash",
oracle:"text/x-plsql",
mysql:"text/x-plsql",
sql:"text/x-plsql",
clojure:"text/x-scheme",
scala:"text/x-scala",
code:"text/plain",
text:"text/plain",
brainfuck:"text/plain",
javascript:"text/javascript",
d:"text/x-d",
go:"text/x-go",
lua:"text/x-lua",
erlang:"text/x-erlang",
sbcl:"text/x-common-lisp",
ocaml:"text/x-ocaml",
pascal:"text/x-pascal",
python3:"text/x-python",
groovy:"text/x-groovy",
text_pseudo:"text/plain",
objectivec:"text/x-csrc",
fsharp:"text/x-fsharp",
visualbasic:"text/x-vb",
smalltalk:"text/x-stsrc",
tcl:"text/x-tcl",
html:"text/html",
css:"text/css",
java8:"text/x-java",
db2:"text/x-plsql"
}, lang_display_mapping = {
c:"C",
cpp:"C++",
java:"Java",
csharp:"C#",
haskell:"Haskell",
php:"PHP",
python:"Python 2",
ruby:"Ruby",
perl:"Perl",
bash:"BASH",
oracle:"Oracle",
mysql:"MySQL",
sql:"SQL",
clojure:"Clojure",
scala:"Scala",
code:"Generic",
text:"Plain Text",
brainfuck:"Brainfuck",
javascript:"Javascript",
lua:"Lua",
sbcl:"Lisp",
erlang:"Erlang",
go:"Go",
d:"D",
ocaml:"OCaml",
pascal:"Pascal",
python3:"Python 3",
groovy:"Groovy",
objectivec:"Objective C",
text_pseudo:"Plain Text",
fsharp:"F#",
visualbasic:"VB.NET",
lolcode:"LOLCODE",
smalltalk:"Smalltalk",
tcl:"Tcl",
whitespace:"Whitespace",
html:"HTML",
css:"CSS",
java8:"Java 8",
db2:"DB2"
}, default_head_end = {
c:"/* Head ends here */",
cpp:"/* Head ends here */",
java:"/* Head ends here */",
csharp:"/* Head ends here */",
haskell:"-- Head ends here",
php:"/* Head ends here */",
python:"# Head ends here",
perl:"# Head ends here",
ruby:"# Head ends here",
bash:"# Head ends here",
clojure:"; Head ends here",
scala:"/* Head ends here */",
sbcl:"; Head ends here",
lua:"-- Head ends here",
javascript:"/* Head ends here */",
pascal:"{ Head ends here }",
python3:"# Head ends here",
groovy:"// Head ends here",
objectivec:"// Head ends here",
fsharp:"// Head ends here",
visualbasic:"' Head ends here",
lolcode:"BTW Head ends here",
smalltalk:'" Head ends here"',
tcl:"# Head ends here",
whitespace:"Head ends here",
html:"<!-- Head ends here -->",
css:"/* Head ends here */",
java8:"/* Head ends here */",
db2:"/* Head ends here */"
}, lang_fold_mapping = {
c:"brace",
cpp:"brace",
java:"brace",
csharp:"brace",
haskell:"indent",
php:"brace",
python:"indent",
ruby:"indent",
perl:"brace",
bash:"brace",
oracle:"indent",
mysql:"indent",
sql:"indent",
clojure:"indent",
scala:"brace",
code:"brace",
text:"indent",
brainfuck:"indent",
javascript:"brace",
lua:"indent",
sbcl:"indent",
erlang:"indent",
go:"brace",
d:"brace",
ocaml:"indent",
pascal:"indent",
python3:"indent",
groovy:"brace",
objectivec:"brace",
text_pseudo:"indent",
fsharp:"indent",
visualbasic:"indent",
lolcode:"indent",
smalltalk:"indent",
tcl:"brace",
whitespace:"indent",
html:"tag",
css:"brace",
java8:"brace",
db2:"indent"
}, default_tail_start = {
c:"/* Tail starts here */",
cpp:"/* Tail starts here */",
java:"/* Tail starts here */",
csharp:"/* Tail starts here */",
haskell:"-- Tail starts here",
php:"/* Tail starts here */",
python:"# Tail starts here",
perl:"# Tail starts here",
ruby:"# Tail starts here",
bash:"# Tail starts here",
clojure:"; Tail starts here",
scala:"/* Tail starts here */",
sbcl:"; Tail starts here",
lua:"-- Tail starts here",
javascript:"/* Tail starts here */",
pascal:"{ Tail starts here }",
python3:"# Tail starts here",
groovy:"// Tail starts here",
objectivec:"// Tail starts here",
fsharp:"// Tail starts here",
visualbasic:"' Tail starts here",
lolcode:"BTW Tail starts here",
smalltalk:'" Tail starts here"',
tcl:"# Tail starts here",
whitespace:"Tail starts here",
html:"<!-- Tail starts here -->",
css:"/* Tail starts here */",
java8:"/* Tail starts here */",
db2:"/* Tail starts here */"
}, lang_default_text = {
c:"#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint main() {\n\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */    \n    return 0;\n}\n",
cpp:"#include <cmath>\n#include <cstdio>\n#include <vector>\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\n\nint main() {\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   \n    return 0;\n}\n",
java:"import java.io.*;\nimport java.util.*;\nimport java.text.*;\nimport java.math.*;\nimport java.util.regex.*;\n\npublic class Solution {\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */\n    }\n}",
csharp:"using System;\nusing System.Collections.Generic;\nusing System.IO;\nclass Solution {\n    static void Main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution */\n    }\n}",
php:'<?php\n$_fp = fopen("php://stdin", "r");\n/* Enter your code here. Read input from STDIN. Print output to STDOUT */\n\n?>',
ruby:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
python:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
perl:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
haskell:"-- Enter your code here. Read input from STDIN. Print output to STDOUT",
clojure:"; Enter your code here. Read input from STDIN. Print output to STDOUT\n;",
lua:"-- Enter your code here. Read input from STDIN. Print output to STDOUT",
sbcl:";; Enter your code here. Read input from STDIN. Print output to STDOUT",
erlang:"% Enter your code here. Read input from STDIN. Print output to STDOUT\n% Your class should be named solution\n\n-module(solution).\n-export([main/0]).\n\nmain() ->\n	.\n",
scala:"object Solution {\n\n    def main(args: Array[String]) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution\n*/\n    }\n}",
go:'package main\nimport "fmt"\n\nfunc main() {\n //Enter your code here. Read input from STDIN. Print output to STDOUT\n}',
javascript:'function processData(input) {\n    //Enter your code here\n} \n\nprocess.stdin.resume();\nprocess.stdin.setEncoding("ascii");\n_input = "";\nprocess.stdin.on("data", function (input) {\n    _input += input;\n});\n\nprocess.stdin.on("end", function () {\n   processData(_input);\n});\n',
d:"/* Enter your code here. Read input from STDIN. Print output to STDOUT */",
ocaml:"(* Enter your code here. Read input from STDIN. Print output to STDOUT *)",
pascal:"(* Enter your code here. Read input from STDIN. Print output to STDOUT *)",
groovy:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
text:"",
objectivec:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
fsharp:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
visualbasic:"'Enter your code here. Read input from STDIN. Print output to STDOUT",
lolcode:"BTW Enter your code here. Read input from STDIN. Print output to STDOUT",
smalltalk:'"Enter your code here. Read input from STDIN. Print output to STDOUT"',
tcl:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
whitespace:"Enter your code here. Read input from STDIN. Print output to STDOUT",
html:"<!-- Enter your HTML code here -->",
css:"/* Declare your styles here*/",
java8:"import java.io.*;\nimport java.util.*;\nimport java.text.*;\nimport java.math.*;\nimport java.util.regex.*;\n\npublic class Solution {\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */\n    }\n}"
}, default_checker_limits = {
c:{
timelimit:3
},
clojure:{
timelimit:5
},
cpp:{
timelimit:3
},
csharp:{
timelimit:5
},
go:{
timelimit:6
},
haskell:{
timelimit:5
},
java:{
timelimit:5
},
javascript:{
timelimit:16
},
perl:{
timelimit:16
},
php:{
timelimit:16
},
python:{
timelimit:16
},
ruby:{
timelimit:16
},
scala:{
timelimit:5
}
}, lang_mode_location_unconventional_mapping = {
cpp:"clike_manual",
c:"clike_manual",
java:"clike_manual",
csharp:"clike_manual",
scala:"codemirror/mode/clike/clike",
sbcl:"codemirror/mode/commonlisp/commonlisp",
ocaml:"codemirror/mode/mllike/mllike",
fsharp:"codemirror/mode/mllike/mllike",
visualbasic:"codemirror/mode/vb/vb",
sql:"codemirror/mode/sql/sql",
mysql:"codemirror/mode/sql/sql",
mssql:"codemirror/mode/sql/sql",
pgsql:"codemirror/mode/sql/sql",
oracle:"codemirror/mode/sql/sql",
html:[ "codemirror/mode/xml/xml", "codemirror/mode/css/css", "codemirror/mode/javascript/javascript", "codemirror/mode/htmlmixed/htmlmixed" ],
php:[ "clike_manual", "codemirror/mode/php/php" ],
python3:"codemirror/mode/python/python",
java8:"clike_manual",
db2:"codemirror/mode/sql/sql"
}, codechecker_resource_limits = {
c:{
title:"C",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:4,
def_time:2
},
cpp:{
title:"C++",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:4,
def_time:2
},
java:{
title:"Java",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:8,
def_time:4
},
csharp:{
title:"C#",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:6,
def_time:3
},
php:{
title:"PHP",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:18,
def_time:9
},
ruby:{
title:"Ruby",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:20,
def_time:10
},
python:{
title:"Python 2",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:20,
def_time:10
},
perl:{
title:"Perl",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:18,
def_time:9
},
haskell:{
title:"Haskell",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:10,
def_time:5
},
clojure:{
title:"Clojure",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:16,
def_time:8
},
scala:{
title:"Scala",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:14,
def_time:7
},
clisp:{
title:"CLISP",
min_mem:256,
max_mem:512,
def_mem:256,
min_time:2,
max_time:24,
def_time:12
},
lua:{
title:"Lua",
min_mem:256,
max_mem:512,
def_mem:256,
min_time:2,
max_time:24,
def_time:12
},
erlang:{
title:"Erlang",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:24,
def_time:12
},
brainfuck:{
title:"Brainfuck",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:4,
def_time:2
},
javascript:{
title:"Javascript",
min_mem:256,
max_mem:512,
def_mem:256,
min_time:2,
max_time:20,
def_time:10
},
go:{
title:"Go",
min_mem:256,
max_mem:1024,
def_mem:1024,
min_time:2,
max_time:8,
def_time:4
},
d:{
title:"D",
min_mem:256,
max_mem:512,
def_mem:256,
min_time:2,
max_time:28,
def_time:14
},
ocaml:{
title:"OCaml",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:6,
def_time:3
},
pascal:{
title:"Pascal",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:6,
def_time:3
},
sbcl:{
title:"Lisp",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:20,
def_time:10
},
python3:{
title:"Python 3",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:20,
def_time:10
},
groovy:{
title:"Groovy",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:10,
def_time:5
},
objectivec:{
title:"Objective C",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:6,
def_time:3
},
fsharp:{
title:"F#",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:8,
def_time:4
},
cobol:{
title:"COBOL",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:10,
def_time:5
},
visualbasic:{
title:"VB.NET",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:10,
def_time:5
},
lolcode:{
title:"LOLCODE",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:10,
def_time:5
},
smalltalk:{
title:"Smalltalk",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:10,
def_time:5
},
tcl:{
title:"Tcl",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:10,
def_time:5
},
whitespace:{
title:"Whitespace",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:10,
def_time:5
},
tsql:{
title:"T-SQL",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:124,
def_time:62
},
java8:{
title:"Java 8",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:8,
def_time:4
},
db2:{
title:"DB2",
min_mem:256,
max_mem:512,
def_mem:512,
min_time:2,
max_time:124,
def_time:62
}
};