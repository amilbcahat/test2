CodeMirror.defineMode("pig", function(_config, parserConfig) {
function chain(stream, state, f) {
return state.tokenize = f, f(stream, state);
}
function ret(tp, style) {
return type = tp, style;
}
function tokenComment(stream, state) {
for (var ch, isEnd = !1; ch = stream.next(); ) {
if ("/" == ch && isEnd) {
state.tokenize = tokenBase;
break;
}
isEnd = "*" == ch;
}
return ret("comment", "comment");
}
function tokenString(quote) {
return function(stream, state) {
for (var next, escaped = !1, end = !1; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return (end || !escaped && !multiLineStrings) && (state.tokenize = tokenBase), ret("string", "error");
};
}
function tokenBase(stream, state) {
var ch = stream.next();
return '"' == ch || "'" == ch ? chain(stream, state, tokenString(ch)) :/[\[\]{}\(\),;\.]/.test(ch) ? ret(ch) :/\d/.test(ch) ? (stream.eatWhile(/[\w\.]/), 
ret("number", "number")) :"/" == ch ? stream.eat("*") ? chain(stream, state, tokenComment) :(stream.eatWhile(isOperatorChar), 
ret("operator", "operator")) :"-" == ch ? stream.eat("-") ? (stream.skipToEnd(), 
ret("comment", "comment")) :(stream.eatWhile(isOperatorChar), ret("operator", "operator")) :isOperatorChar.test(ch) ? (stream.eatWhile(isOperatorChar), 
ret("operator", "operator")) :(stream.eatWhile(/[\w\$_]/), keywords && keywords.propertyIsEnumerable(stream.current().toUpperCase()) && !stream.eat(")") && !stream.eat(".") ? "keyword" :builtins && builtins.propertyIsEnumerable(stream.current().toUpperCase()) ? "variable-2" :types && types.propertyIsEnumerable(stream.current().toUpperCase()) ? "variable-3" :ret("variable", "pig-word"));
}
var type, keywords = parserConfig.keywords, builtins = parserConfig.builtins, types = parserConfig.types, multiLineStrings = parserConfig.multiLineStrings, isOperatorChar = /[*+\-%<>=&?:\/!|]/;
return {
startState:function() {
return {
tokenize:tokenBase,
startOfLine:!0
};
},
token:function(stream, state) {
if (stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
return style;
}
};
}), function() {
function keywords(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
var pBuiltins = "ABS ACOS ARITY ASIN ATAN AVG BAGSIZE BINSTORAGE BLOOM BUILDBLOOM CBRT CEIL CONCAT COR COS COSH COUNT COUNT_STAR COV CONSTANTSIZE CUBEDIMENSIONS DIFF DISTINCT DOUBLEABS DOUBLEAVG DOUBLEBASE DOUBLEMAX DOUBLEMIN DOUBLEROUND DOUBLESUM EXP FLOOR FLOATABS FLOATAVG FLOATMAX FLOATMIN FLOATROUND FLOATSUM GENERICINVOKER INDEXOF INTABS INTAVG INTMAX INTMIN INTSUM INVOKEFORDOUBLE INVOKEFORFLOAT INVOKEFORINT INVOKEFORLONG INVOKEFORSTRING INVOKER ISEMPTY JSONLOADER JSONMETADATA JSONSTORAGE LAST_INDEX_OF LCFIRST LOG LOG10 LOWER LONGABS LONGAVG LONGMAX LONGMIN LONGSUM MAX MIN MAPSIZE MONITOREDUDF NONDETERMINISTIC OUTPUTSCHEMA  PIGSTORAGE PIGSTREAMING RANDOM REGEX_EXTRACT REGEX_EXTRACT_ALL REPLACE ROUND SIN SINH SIZE SQRT STRSPLIT SUBSTRING SUM STRINGCONCAT STRINGMAX STRINGMIN STRINGSIZE TAN TANH TOBAG TOKENIZE TOMAP TOP TOTUPLE TRIM TEXTLOADER TUPLESIZE UCFIRST UPPER UTF8STORAGECONVERTER ", pKeywords = "VOID IMPORT RETURNS DEFINE LOAD FILTER FOREACH ORDER CUBE DISTINCT COGROUP JOIN CROSS UNION SPLIT INTO IF OTHERWISE ALL AS BY USING INNER OUTER ONSCHEMA PARALLEL PARTITION GROUP AND OR NOT GENERATE FLATTEN ASC DESC IS STREAM THROUGH STORE MAPREDUCE SHIP CACHE INPUT OUTPUT STDERROR STDIN STDOUT LIMIT SAMPLE LEFT RIGHT FULL EQ GT LT GTE LTE NEQ MATCHES TRUE FALSE DUMP", pTypes = "BOOLEAN INT LONG FLOAT DOUBLE CHARARRAY BYTEARRAY BAG TUPLE MAP ";
CodeMirror.defineMIME("text/x-pig", {
name:"pig",
builtins:keywords(pBuiltins),
keywords:keywords(pKeywords),
types:keywords(pTypes)
});
}();