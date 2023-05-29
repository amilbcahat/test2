HR.appController.addTemplate("backbone/templates/environment", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<section class="container--inner">\n    <header class="page-title">\n        <h1>Environment and Samples</h1>\n    </header>\n\n    <ul class="nav-tabs nav margin-large bottom">\n        <li class="active"><a href="#languages" data-toggle="tab">Environment for the programming languages</a></li>\n        <li><a href="#sampleproblem" data-toggle="tab">Sample Problem Statement</a></li>\n        <li><a href="#writefile" data-toggle="tab">Writing state information to a file</a></li>\n    </ul>\n\n    <div class="tab-content">\n    <div class="tab-pane active" id="languages">\n        <h3 id="languages"><b>Environment for the programming languages</b></h3>\n        <table class="table table-striped table-bordered">\n            <tr>\n                <th class="m">Language</th>\n                <th class="m">Version</th>\n                <th class="m">Time limit<br/>(in seconds)</th>\n                <th class="m">Memory limit<br/>(in MB)</th>\n                <th class="m">Notes</th>\n                <th class="m"> Additional libraries for Machine-Learning and Natural-Language-Processing challenges </th>\n            </tr>\n            <tr>\n                <td class="m" width="15%" >C</td>\n                <td class="m" width="20%">gcc 4.8.1, C99 Mode</td>\n                <td class="m" width="12%">2</td>\n                <td class="m" >512</td>\n                <td class="m">Math library (<code>-lm</code>)<br/><a href="http://www.digip.org/jansson/">json library</a><code>#include&lt;jansson.h&gt;</code></td>\n                <td class="m"><a href="http://www.csie.ntu.edu.tw/~cjlin/liblinear/">liblinear</a><code>#include"linear.h"</code> <a href="http://www.csie.ntu.edu.tw/~cjlin/libsvmtools/">libsvm   </a><code>#include"svm.h"</code></td>\n            </tr>\n            <tr>\n                <td class="m">C++</td>\n                <td class="m">g++ 4.8.1, C++0x Mode</td>\n                <td class="m">2</td>\n                <td class="m">512</td>\n                <td class="m">Math library (<code>-lm</code>)<br/><a href="http://sourceforge.net/projects/jsoncpp/">json library</a></br><code>#include&lt;jsoncpp/json/json.h&gt;</code></td>\n                <td class="m"><a href="http://www.csie.ntu.edu.tw/~cjlin/liblinear/">liblinear</a><code>#include"linear.h"</code> <a href="http://www.csie.ntu.edu.tw/~cjlin/libsvmtools/">libsvm   </a><code>#include"svm.h"</code></td>\n            </tr>\n            <tr>\n                <td class="m">C#</td>\n                <td class="m">Mono 2.10.8.1, C# 4</td>\n                <td class="m">5</td>\n                <td class="m">512</td>\n                <td class="m">Name your class <code>Solution</code><br/><a href="http://nuget.org/packages/newtonsoft.json/"> newtonsoft </a> json library</td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Python</td>\n                <td class="m">Python 2.7.5</td>\n                <td class="m">16</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"><a href="http://www.numpy.org/">numpy</a>, <a href="http://www.scipy.org/">scipy</a>, <a href="http://scikit-learn.org/stable/">sklearn</a> and <a href="http://nltk.org/">nltk</a></td>\n            </tr>\n            <tr>\n                <td class="m">Python 3</td>\n                <td class="m">Python 3.3.2</td>\n                <td class="m">16</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"><a href="http://www.numpy.org/">numpy</a>, <a href="http://www.scipy.org/">scipy</a>, <a href="http://scikit-learn.org/stable/">sklearn</a> and <a href="http://nltk.org/">nltk</a></td>\n            </tr>\n            <tr>\n                <td class="m">Java</td>\n                <td class="m">Sun Java 1.7.0_40</td>\n                <td class="m">5</td>\n                <td class="m">512</td>\n                <td class="m">Name your class <code>Solution</code><br/> <a href="https://code.google.com/p/json-simple/"> json-simple </a> json library</td>\n                <td class="m"><a href="http://nlp.stanford.edu/software/corenlp.shtml">stanford-nlp</a>, <a href="http://www.cs.waikato.ac.nz/ml/weka/">weka</a> and <a href="http://java-ml.sourceforge.net/">java-ml</a></td>\n            </tr>\n            <tr>\n                <td class="m">PHP</td>\n                <td class="m">PHP 5.5.3</td>\n                <td class="m">16</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Perl</td>\n                <td class="m">Perl 5.14.2</td>\n                <td class="m">16</td>\n                <td class="m">512</td>\n                <td class="m"><a href="http://search.cpan.org/~makamaka/JSON-2.59/lib/JSON.pm">json library</a></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Ruby</td>\n                <td class="m">Ruby 1.9.3p194</td>\n                <td class="m">16</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Objective-C</td>\n                <td class="m">Objective-C 2.0: clang 3.2-7</td>\n                <td class="m">2</td>\n                <td class="m">512</td>\n                <td class="m">Runtime(gnustep-libobjc2)<br/>Foundation Kit<br/>Blocks runtime<br/>libdispatch</td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Haskell</td>\n                <td class="m">haskell-platform 2013.2.0.0 0</td>\n                <td class="m">5</td>\n                <td class="m">512</td>\n                <td class="m">logict lens pipes mwc-random hashtables regex-pcre hmatrix aeson and hashmap libraries are available.</td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Clojure</td>\n                <td class="m">clojure 1.4.0</td>\n                <td class="m">10</td>\n                <td class="m">512</td>\n                <td class="m"><strike>Name your namespace <code>solution</code> with <code>:gen-class</code> attribute.</strike> we have removed the restriction of defining a namespace.</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Scala</td>\n                <td class="m">scala 2.10.3</td>\n                <td class="m">10</td>\n                <td class="m">512</td>\n                <td class="m">Have your entry point inside an object named <code>Solution</code></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Lisp</td>\n                <td class="m">GNU CLISP 2.49</td>\n                <td class="m">16</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Lua</td>\n                <td class="m">Lua 5.2.2</td>\n                <td class="m">16</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Erlang</td>\n                <td class="m">Erlang R16B01 (erts-5.10.2)</td>\n                <td class="m">16</td>\n                <td class="m">512</td>\n                <td class="m">Have your <code>main</code> function in module <code>solution</code></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Javascript</td>\n                <td class="m">node v0.10.21</td>\n                <td class="m">16</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Go</td>\n                <td class="m">go1.1.2</td>\n                <td class="m">6</td>\n                <td class="m">1024</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Brainf**k</td>\n                <td class="m">bf</td>\n                <td class="m">16</td>\n                <td class="m">30000 cells</td>\n                <td class="m">You can download the interpreter here: <a href="http://packages.ubuntu.com/hardy/bf">bf</a>. Decrementing 0 and incrementing 255 is disallowed. <code>\\n</code> is not interpreted as 0</td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Groovy</td>\n                <td class="m">1.8.6</td>\n                <td class="m">5</td>\n                <td class="m">512</td>\n                <td class="m">JVM: 1.7.0_40</td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">OCaml</td>\n                <td class="m">3.12.1</td>\n                <td class="m">3</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">F#</td>\n                <td class="m">Fsharp 3.0.26, Mono 2.10.8</td>\n                <td class="m">5</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">VB.NET</td>\n                <td class="m">Mono 2.10.8</td>\n                <td class="m">5</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">LOLCODE</td>\n                <td class="m">Version 1.2 with lci v0.10.3</td>\n                <td class="m">5</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Smalltalk</td>\n                <td class="m">GNU Smalltalk 3.2.4</td>\n                <td class="m">5</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n            <tr>\n                <td class="m">Tcl</td>\n                <td class="m">Version 8.5 with tclsh</td>\n                <td class="m">5</td>\n                <td class="m">512</td>\n                <td class="m"></td>\n                <td class="m"></td>\n            </tr>\n        </table>\n        <p>These run on quad core Xeon machines running 64-bit Ubuntu (Ubuntu 13.10). You should, however, write your programs in a portable manner and not assume that it will <em>always</em> be run on a 32 bit architecture. We don\'t support multi-threaded programs and all your programs should run in a single thread. Also, please note that the size of the submitted code should not be more than 50KB. </p>\n    </div>\n    <div class="tab-pane" id="sampleproblem">\n        <h3 id="sampleproblem">Sample Problem Statement</h3>\n        <p>Given an integer <strong>N</strong>, print \'hello world\' <strong>N</strong> times.</p>\n\n        <h4>Sample Input</h4>\n        <p>\n        <pre>5</pre>\n        </p>\n        <h4>Sample Output</h4>\n        <p>\n        <pre>hello world\nhello world\nhello world\nhello world\nhello world</pre>\n        </p>\n\n        <h3>Solution</h3>\n        <h4>C</h4>\n        <p>\n        <pre><xmp>#include <stdio.h>\nint main() {\n    int i, n;\n    scanf("%d", &n);\n    for (i=0; i<n; i++) {\n        printf("hello world\\n");\n    }\n    return 0;\n}</xmp></pre>\n        </p>\n        <h4>C++</h4>\n        <br>\n        <pre><xmp>#include <iostream>\nusing namespace std;\nint main() {\n    int i, n;\n    cin >> n;\n    for (i=0; i<n; i++) {\n        cout << "hello world\\n";\n    }\n    return 0;\n}</xmp></pre>\n        <br>\n        <h4>C#</h4>\n        <br>\n        <pre><xmp>using System;\nnamespace Solution {\n    class Solution {\n        static void Main(string[] args) {\n            var line1 = System.Console.ReadLine().Trim();\n            var N = Int32.Parse(line1);\n            for (var i = 0; i < N; i++) {\n                System.Console.WriteLine("hello world");\n            }\n        }\n    }\n}</xmp></pre>\n        <br>\n        <h4>Java</h4>\n        <br>\n        <pre><xmp>import java.io.*;\npublic class Solution {\n    public static void main(String args[] ) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        int N = Integer.parseInt(line);\n        for (int i = 0; i < N; i++) {\n            System.out.println("hello world");\n        }\n    }\n}</xmp></pre>\n        <br>\n        <h4>JavaScript</h4>\n        <br>\n        <pre><xmp>function processData(input) {\n    var i;\n    for (i = 0; i < parseInt(input); i++) {\n        console.log("hello world");\n    }\n}\n\nprocess.stdin.resume();\nprocess.stdin.setEncoding("ascii");\n_input = "";\nprocess.stdin.on("data", function (input) {\n    _input += input;\n});\n\nprocess.stdin.on("end", function () {\n   processData(_input);\n});</xmp></pre>\n        <br>\n        <h4>Python</h4>\n        <br>\n        <pre><xmp>N = int(raw_input())\nfor i in xrange(N):\n    print "hello world"</xmp></pre>\n        <br>\n        <h4>Ruby</h4>\n        <br>\n        <pre><xmp>N = gets\n1.step(N.to_i, 1) { |i| print "hello world\\n" }</xmp></pre>\n        <br>\n        <h4>PHP</h4>\n        <br>\n        <pre><xmp><?php\nfscanf(STDIN, "%d\\n", $number);\n\nfor ( $i = 0; $i < $number; $i++) {\n    echo "hello world\\n";\n}</xmp></pre>\n        <br>\n        <h4>Lua</h4>\n        <br>\n        <pre><xmp>N = io.read ()\nfor i = 1, tonumber(N), 1 do\n    print("hello world")\nend</xmp></pre>\n        <br>\n        <h4>Common Lisp</h4>\n        <br>\n        <pre><xmp>(setq strN (read-line))\n(setq N (parse-integer strN))\n(loop for i from 1 to N do\n    (write "hello world")\n    (terpri)\n)</xmp></pre>\n        <br>\n<h4>ERLANG</h4>\n<pre><xmp>-module(solution).\n-export([main/0]).\n\nmain() ->\n    {ok, [Num]} = io:fread("", "~d"),\n    print_hello(Num).\n\nprint_hello(0) ->\n    0;\nprint_hello(N) ->\n    io:format("Hello World~n"),\n    print_hello(N - 1).</xmp></pre><br>\n<!--        <h4>Haskell</h4>\n        <br>\n        <pre><xmp></xmp></pre>\n        <br>\n        <h4>Perl</h4>\n        <br>\n        <pre></pre>\n        <br>\n        <h4>Clojure</h4>\n        <br>\n        <pre></pre>\n        <br>\n        <h4>Scala</h4>\n        <br>\n        <pre></pre> -->\n    </div>\n    <div class="tab-pane" id="writefile">\n        <h3 id="writefile"><strong>Writing state information to a file</strong></h3>\n        <br/>\n        <h4>C</h4>\n        <pre><xmp>\n#include<stdio.h>\n\nint main()\n{\n    FILE *read;\n    FILE *write;\n    char *filename = "myfile.txt";\n    read = fopen( filename, "r" );\n    if( read == NULL )\n    {\n        //File doesn\'t exist. Have to write something\n        write = fopen( filename, "w" );\n        fprintf( write, "%s", "writesomethinghere" );\n        fclose( write );\n    }\n    else\n    {\n        //File exists. Read data from the file\n        char somedata[ 20 ];\n        fscanf( read, "%s", somedata );\n        printf( "%s\\n", somedata );\n        fclose( read );\n    }\n    return 0;\n}\n        </xmp></pre>\n<br/>\n        <h4>C++</h4>\n        <pre><xmp>\n#include<iostream>\n#include<fstream>\n#include<string>\n\nusing namespace std;\n\nint main()\n{\n    ifstream readfile;\n    ofstream writefile;\n    string filename = "myfile.txt";\n    readfile.open( filename.c_str() );\n    if( readfile )\n    {\n        //I can read something from the file\n        readfile.close();\n    }\n    else\n    {\n        //The file doesn\'t exist\n        writefile.open( filename.c_str() );\n        //write something to the file\n        writefile << " write some data " <&lt; endl;\n        writefile.close();\n    }\n    return 0;\n}\n        </xmp></pre>\n<br/>\n        <h4>JAVA</h4>\n        <pre><xmp>\nimport java.io.*;\nimport java.lang.*;\n\npublic class Solution\n{\n    public static void main( String[] args )\n    {\n        File fileName = new File( "myfile.txt" );\n        if( !fileName.exists() )\n        {\n            System.out.println( "this file doesn\'t exist " );\n            try\n            {\n                fileName.createNewFile();\n                FileWriter fileWrite = new FileWriter( fileName );\n                BufferedWriter bufferedWriter = new BufferedWriter( fileWrite );\n                //bufferedWriter.write( "write something here " );\n                bufferedWriter.close();\n            } catch ( IOException e )\n            {\n                //catch exception\n            }\n        }\n        else\n        {\n            //System.out.println( "this file exists " );\n            try\n            {\n                byte[] buffer = new byte[ 100 ];\n                FileInputStream inputStream  = new FileInputStream( fileName );\n                int readLines = -1;\n                while( ( readLines = inputStream.read( buffer ) ) != -1 )\n                {\n                    //System.out.println( new String( buffer ) );\n                }\n                inputStream.close();\n            } catch ( IOException e )\n            {\n                //catch exception\n            }\n        }\n    }\n}\n        </xmp></pre>\n<br/>\n        <h4>CSHARP</h4>\n        <pre><xmp>\nusing System;\nusing System.IO;\n\n\npublic class Solution\n{\n    public static void Main( )\n    {\n        string fileName = "myfile.txt";\n        FileStream file = new FileStream( fileName, FileMode.OpenOrCreate, FileAccess.Read );\n        StreamReader sr = new StreamReader( file );\n        string s = sr.ReadToEnd();\n        if( string.IsNullOrEmpty( s ) )\n        {\n            file.Close();\n            //The file is empty. Write something to it\n            //Console.WriteLine( "file doesn\'t exist " );\n            file = new FileStream( fileName, FileMode.OpenOrCreate, FileAccess.Write );\n            StreamWriter sw = new StreamWriter( file );\n            sw.Write( "Write something here " );\n            sw.Close();\n        }\n        else\n        {\n            //Console.WriteLine( s );\n        }\n    }\n}\n        </xmp></pre>\n<br/>\n        <h4>PYTHON</h4>\n        <pre><xmp>\n#!/usr/bin/python\n\nfilename = "myfile.txt"\nwith open( filename ) as f:\n    # file read can happen here\n    # print "file exists"\n    print f.readlines()\n\nwith open( filename, "w") as f:\n    # print "file write happening here"\n    f.write("write something here ")\n        </xmp></pre>\n<br/>\n        <h4>RUBY</h4>\n        <pre><xmp>\n#!/usr/bin/env ruby\n\nfilename = "myfile.txt"\nif File.exist?( filename )\n    #puts "file read happening"\n    f = File.open(filename, \'r\')\n    data = f.read\n    puts data\nend\n\nf = File.open(filename, \'a+\')\n#puts "file write happening"\nf.puts "write something here"\n        </xmp></pre>\n<br/>\n        <h4>PHP</h4>\n        <pre><xmp>\n<?php\n$filename = "myfile.txt";\nif(file_exists($filename)) {\n    $data = file_get_contents( $filename );\n    print $data;\n    $filewrite = fopen( $filename, \'a\') or die(\'Cannot open file:\'.$filename);\n    fwrite( $filewrite, "write something here");\n    fclose( $filewrite );\n} else {\n    $filewrite = fopen( $filename, \'w\') or die(\'Cannot open file:\'.$filename);\n    fwrite( $filewrite, "write something here");\n    fclose( $filewrite );\n}\n?>\n        </xmp></pre>\n        <h4>PERL</h4>\n        <pre><xmp>\n#!/usr/bin/env perl\n\n$filename = "myfile.txt";\n\nif( -e $filename )\n{\n    unless(open FILE, $filename)\n    {\n        die "Cannot open file";\n    }\n\n    while(my $line = <FILE>)\n    {\n        print $line;\n    }\n\n    close FILE;\n}\nunless(open FILE, \'>>\'.$filename)\n{\n    die "Cannot open file";\n}\nprint FILE "Write something here";\nclose FILE;\n        </xmp></pre>\n</section>\n</div>\n';
return __p;
});