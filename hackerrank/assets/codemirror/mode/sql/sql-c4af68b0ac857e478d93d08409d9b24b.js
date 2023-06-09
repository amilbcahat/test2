CodeMirror.defineMode("sql", function(config, parserConfig) {
"use strict";
function tokenBase(stream, state) {
var ch = stream.next();
if (hooks[ch]) {
var result = hooks[ch](stream, state);
if (result !== !1) return result;
}
if (1 == support.hexNumber && ("0" == ch && stream.match(/^[xX][0-9a-fA-F]+/) || ("x" == ch || "X" == ch) && stream.match(/^'[0-9a-fA-F]+'/))) return "number";
if (1 == support.binaryNumber && (("b" == ch || "B" == ch) && stream.match(/^'[01]+'/) || "0" == ch && stream.match(/^b[01]+/))) return "number";
if (ch.charCodeAt(0) > 47 && ch.charCodeAt(0) < 58) return stream.match(/^[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/), 
1 == support.decimallessFloat && stream.eat("."), "number";
if ("?" == ch && (stream.eatSpace() || stream.eol() || stream.eat(";"))) return "variable-3";
if ("'" == ch || '"' == ch && support.doubleQuote) return state.tokenize = tokenLiteral(ch), 
state.tokenize(stream, state);
if ((1 == support.nCharCast && ("n" == ch || "N" == ch) || 1 == support.charsetCast && "_" == ch && stream.match(/[a-z][a-z0-9]*/i)) && ("'" == stream.peek() || '"' == stream.peek())) return "keyword";
if (/^[\(\),\;\[\]]/.test(ch)) return null;
if (support.commentSlashSlash && "/" == ch && stream.eat("/")) return stream.skipToEnd(), 
"comment";
if (support.commentHash && "#" == ch || "-" == ch && stream.eat("-") && (!support.commentSpaceRequired || stream.eat(" "))) return stream.skipToEnd(), 
"comment";
if ("/" == ch && stream.eat("*")) return state.tokenize = tokenComment, state.tokenize(stream, state);
if ("." != ch) {
if (operatorChars.test(ch)) return stream.eatWhile(operatorChars), null;
if ("{" == ch && (stream.match(/^( )*(d|D|t|T|ts|TS)( )*'[^']*'( )*}/) || stream.match(/^( )*(d|D|t|T|ts|TS)( )*"[^"]*"( )*}/))) return "number";
stream.eatWhile(/^[_\w\d]/);
var word = stream.current().toLowerCase();
return dateSQL.hasOwnProperty(word) && (stream.match(/^( )+'[^']*'/) || stream.match(/^( )+"[^"]*"/)) ? "number" :atoms.hasOwnProperty(word) ? "atom" :builtin.hasOwnProperty(word) ? "builtin" :keywords.hasOwnProperty(word) ? "keyword" :client.hasOwnProperty(word) ? "string-2" :null;
}
return 1 == support.zerolessFloat && stream.match(/^(?:\d+(?:e[+-]?\d+)?)/i) ? "number" :1 == support.ODBCdotTable && stream.match(/^[a-zA-Z_]+/) ? "variable-2" :void 0;
}
function tokenLiteral(quote) {
return function(stream, state) {
for (var ch, escaped = !1; null != (ch = stream.next()); ) {
if (ch == quote && !escaped) {
state.tokenize = tokenBase;
break;
}
escaped = !escaped && "\\" == ch;
}
return "string";
};
}
function tokenComment(stream, state) {
for (;;) {
if (!stream.skipTo("*")) {
stream.skipToEnd();
break;
}
if (stream.next(), stream.eat("/")) {
state.tokenize = tokenBase;
break;
}
}
return "comment";
}
function pushContext(stream, state, type) {
state.context = {
prev:state.context,
indent:stream.indentation(),
col:stream.column(),
type:type
};
}
function popContext(state) {
state.indent = state.context.indent, state.context = state.context.prev;
}
var client = parserConfig.client || {}, atoms = parserConfig.atoms || {
"false":!0,
"true":!0,
"null":!0
}, builtin = parserConfig.builtin || {}, keywords = parserConfig.keywords || {}, operatorChars = parserConfig.operatorChars || /^[*+\-%<>!=&|~^]/, support = parserConfig.support || {}, hooks = parserConfig.hooks || {}, dateSQL = parserConfig.dateSQL || {
date:!0,
time:!0,
timestamp:!0
};
return {
startState:function() {
return {
tokenize:tokenBase,
context:null
};
},
token:function(stream, state) {
if (stream.sol() && state.context && null == state.context.align && (state.context.align = !1), 
stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
if ("comment" == style) return style;
state.context && null == state.context.align && (state.context.align = !0);
var tok = stream.current();
return "(" == tok ? pushContext(stream, state, ")") :"[" == tok ? pushContext(stream, state, "]") :state.context && state.context.type == tok && popContext(state), 
style;
},
indent:function(state, textAfter) {
var cx = state.context;
if (!cx) return 0;
var closing = textAfter.charAt(0) == cx.type;
return cx.align ? cx.col + (closing ? 0 :1) :cx.indent + (closing ? 0 :config.indentUnit);
},
blockCommentStart:"/*",
blockCommentEnd:"*/",
lineComment:support.commentSlashSlash ? "//" :support.commentHash ? "#" :null
};
}), function() {
"use strict";
function hookIdentifier(stream) {
for (var ch; null != (ch = stream.next()); ) if ("`" == ch && !stream.eat("`")) return "variable-2";
return null;
}
function hookVar(stream) {
return stream.eat("@") && (stream.match(/^session\./), stream.match(/^local\./), 
stream.match(/^global\./)), stream.eat("'") ? (stream.match(/^.*'/), "variable-2") :stream.eat('"') ? (stream.match(/^.*"/), 
"variable-2") :stream.eat("`") ? (stream.match(/^.*`/), "variable-2") :stream.match(/^[0-9a-zA-Z$\.\_]+/) ? "variable-2" :null;
}
function hookClient(stream) {
return stream.eat("N") ? "atom" :stream.match(/^[a-zA-Z.#!?]/) ? "variable-2" :null;
}
function set(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
var sqlKeywords = "alter and as asc between by count create delete desc distinct drop from having in insert into is join like not on or order select set table union update values where ";
CodeMirror.defineMIME("text/x-sql", {
name:"sql",
keywords:set(sqlKeywords + "begin"),
builtin:set("bool boolean bit blob enum long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision real date datetime year unsigned signed decimal numeric"),
atoms:set("false true null unknown"),
operatorChars:/^[*+\-%<>!=]/,
dateSQL:set("date time timestamp"),
support:set("ODBCdotTable doubleQuote binaryNumber hexNumber")
}), CodeMirror.defineMIME("text/x-mssql", {
name:"sql",
client:set("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),
keywords:set(sqlKeywords + "begin trigger proc view index for add constraint key primary foreign collate clustered nonclustered"),
builtin:set("bigint numeric bit smallint decimal smallmoney int tinyint money float real char varchar text nchar nvarchar ntext binary varbinary image cursor timestamp hierarchyid uniqueidentifier sql_variant xml table "),
atoms:set("false true null unknown"),
operatorChars:/^[*+\-%<>!=]/,
dateSQL:set("date datetimeoffset datetime2 smalldatetime datetime time"),
hooks:{
"@":hookVar
}
}), CodeMirror.defineMIME("text/x-mysql", {
name:"sql",
client:set("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),
keywords:set(sqlKeywords + "accessible action add after algorithm all analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general get global grant grants group groupby_concat handler hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show signal slave slow smallint snapshot soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views warnings when while with work write xa xor year_month zerofill begin do then else loop repeat"),
builtin:set("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric"),
atoms:set("false true null unknown"),
operatorChars:/^[*+\-%<>!=&|^]/,
dateSQL:set("date time timestamp"),
support:set("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired"),
hooks:{
"@":hookVar,
"`":hookIdentifier,
"\\":hookClient
}
}), CodeMirror.defineMIME("text/x-mariadb", {
name:"sql",
client:set("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),
keywords:set(sqlKeywords + "accessible action add after algorithm all always analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general generated get global grant grants group groupby_concat handler hard hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password persistent phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show shutdown signal slave slow smallint snapshot soft soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views virtual warnings when while with work write xa xor year_month zerofill begin do then else loop repeat"),
builtin:set("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric"),
atoms:set("false true null unknown"),
operatorChars:/^[*+\-%<>!=&|^]/,
dateSQL:set("date time timestamp"),
support:set("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired"),
hooks:{
"@":hookVar,
"`":hookIdentifier,
"\\":hookClient
}
}), CodeMirror.defineMIME("text/x-cassandra", {
name:"sql",
client:{},
keywords:set("use select from using consistency where limit first reversed first and in insert into values using consistency ttl update set delete truncate begin batch apply create keyspace with columnfamily primary key index on drop alter type add any one quorum all local_quorum each_quorum"),
builtin:set("ascii bigint blob boolean counter decimal double float int text timestamp uuid varchar varint"),
atoms:set("false true"),
operatorChars:/^[<>=]/,
dateSQL:{},
support:set("commentSlashSlash decimallessFloat"),
hooks:{}
}), CodeMirror.defineMIME("text/x-plsql", {
name:"sql",
client:set("appinfo arraysize autocommit autoprint autorecovery autotrace blockterminator break btitle cmdsep colsep compatibility compute concat copycommit copytypecheck define describe echo editfile embedded escape exec execute feedback flagger flush heading headsep instance linesize lno loboffset logsource long longchunksize markup native newpage numformat numwidth pagesize pause pno recsep recsepchar release repfooter repheader serveroutput shiftinout show showmode size spool sqlblanklines sqlcase sqlcode sqlcontinue sqlnumber sqlpluscompatibility sqlprefix sqlprompt sqlterminator suffix tab term termout time timing trimout trimspool ttitle underline verify version wrap"),
keywords:set("abort accept access add all alter and any array arraylen as asc assert assign at attributes audit authorization avg base_table begin between binary_integer body boolean by case cast char char_base check close cluster clusters colauth column comment commit compress connect connected constant constraint crash create current currval cursor data_base database date dba deallocate debugoff debugon decimal declare default definition delay delete desc digits dispose distinct do drop else elseif elsif enable end entry escape exception exception_init exchange exclusive exists exit external fast fetch file for force form from function generic goto grant group having identified if immediate in increment index indexes indicator initial initrans insert interface intersect into is key level library like limited local lock log logging long loop master maxextents maxtrans member minextents minus mislabel mode modify multiset new next no noaudit nocompress nologging noparallel not nowait number_base object of off offline on online only open option or order out package parallel partition pctfree pctincrease pctused pls_integer positive positiven pragma primary prior private privileges procedure public raise range raw read rebuild record ref references refresh release rename replace resource restrict return returning returns reverse revoke rollback row rowid rowlabel rownum rows run savepoint schema segment select separate session set share snapshot some space split sql start statement storage subtype successful synonym tabauth table tables tablespace task terminate then to trigger truncate type union unique unlimited unrecoverable unusable update use using validate value values variable view views when whenever where while with work"),
builtin:set("abs acos add_months ascii asin atan atan2 average bfile bfilename bigserial bit blob ceil character chartorowid chr clob concat convert cos cosh count dec decode deref dual dump dup_val_on_index empty error exp false float floor found glb greatest hextoraw initcap instr instrb int integer isopen last_day least lenght lenghtb ln lower lpad ltrim lub make_ref max min mlslabel mod months_between natural naturaln nchar nclob new_time next_day nextval nls_charset_decl_len nls_charset_id nls_charset_name nls_initcap nls_lower nls_sort nls_upper nlssort no_data_found notfound null number numeric nvarchar2 nvl others power rawtohex real reftohex round rowcount rowidtochar rowtype rpad rtrim serial sign signtype sin sinh smallint soundex sqlcode sqlerrm sqrt stddev string substr substrb sum sysdate tan tanh to_char text to_date to_label to_multi_byte to_number to_single_byte translate true trunc uid unlogged upper user userenv varchar varchar2 variance varying vsize xml"),
operatorChars:/^[*+\-%<>!=~]/,
dateSQL:set("date time timestamp"),
support:set("doubleQuote nCharCast zerolessFloat binaryNumber hexNumber")
});
}();