// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMIME("text/mirc", "mirc"), CodeMirror.defineMode("mirc", function() {
function parseWords(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function chain(stream, state, f) {
return state.tokenize = f, f(stream, state);
}
function tokenBase(stream, state) {
var beforeParams = state.beforeParams;
state.beforeParams = !1;
var ch = stream.next();
if (/[\[\]{}\(\),\.]/.test(ch)) return "(" == ch && beforeParams ? state.inParams = !0 :")" == ch && (state.inParams = !1), 
null;
if (/\d/.test(ch)) return stream.eatWhile(/[\w\.]/), "number";
if ("\\" == ch) return stream.eat("\\"), stream.eat(/./), "number";
if ("/" == ch && stream.eat("*")) return chain(stream, state, tokenComment);
if (";" == ch && stream.match(/ *\( *\(/)) return chain(stream, state, tokenUnparsed);
if (";" != ch || state.inParams) {
if ('"' == ch) return stream.eat(/"/), "keyword";
if ("$" == ch) return stream.eatWhile(/[$_a-z0-9A-Z\.:]/), specials && specials.propertyIsEnumerable(stream.current().toLowerCase()) ? "keyword" :(state.beforeParams = !0, 
"builtin");
if ("%" == ch) return stream.eatWhile(/[^,^\s^\(^\)]/), state.beforeParams = !0, 
"string";
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), "operator";
stream.eatWhile(/[\w\$_{}]/);
var word = stream.current().toLowerCase();
return keywords && keywords.propertyIsEnumerable(word) ? "keyword" :functions && functions.propertyIsEnumerable(word) ? (state.beforeParams = !0, 
"keyword") :null;
}
return stream.skipToEnd(), "comment";
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = tokenBase;
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
function tokenUnparsed(stream, state) {
for (var ch, maybeEnd = 0; ch = stream.next(); ) {
if (";" == ch && 2 == maybeEnd) {
state.tokenize = tokenBase;
break;
}
")" == ch ? maybeEnd++ :" " != ch && (maybeEnd = 0);
}
return "meta";
}
var specials = parseWords("$! $$ $& $? $+ $abook $abs $active $activecid $activewid $address $addtok $agent $agentname $agentstat $agentver $alias $and $anick $ansi2mirc $aop $appactive $appstate $asc $asctime $asin $atan $avoice $away $awaymsg $awaytime $banmask $base $bfind $binoff $biton $bnick $bvar $bytes $calc $cb $cd $ceil $chan $chanmodes $chantypes $chat $chr $cid $clevel $click $cmdbox $cmdline $cnick $color $com $comcall $comchan $comerr $compact $compress $comval $cos $count $cr $crc $creq $crlf $ctime $ctimer $ctrlenter $date $day $daylight $dbuh $dbuw $dccignore $dccport $dde $ddename $debug $decode $decompress $deltok $devent $dialog $did $didreg $didtok $didwm $disk $dlevel $dll $dllcall $dname $dns $duration $ebeeps $editbox $emailaddr $encode $error $eval $event $exist $feof $ferr $fgetc $file $filename $filtered $finddir $finddirn $findfile $findfilen $findtok $fline $floor $fopen $fread $fserve $fulladdress $fulldate $fullname $fullscreen $get $getdir $getdot $gettok $gmt $group $halted $hash $height $hfind $hget $highlight $hnick $hotline $hotlinepos $ial $ialchan $ibl $idle $iel $ifmatch $ignore $iif $iil $inelipse $ini $inmidi $inpaste $inpoly $input $inrect $inroundrect $insong $instok $int $inwave $ip $isalias $isbit $isdde $isdir $isfile $isid $islower $istok $isupper $keychar $keyrpt $keyval $knick $lactive $lactivecid $lactivewid $left $len $level $lf $line $lines $link $lock $lock $locked $log $logstamp $logstampfmt $longfn $longip $lower $ltimer $maddress $mask $matchkey $matchtok $md5 $me $menu $menubar $menucontext $menutype $mid $middir $mircdir $mircexe $mircini $mklogfn $mnick $mode $modefirst $modelast $modespl $mouse $msfile $network $newnick $nick $nofile $nopath $noqt $not $notags $notify $null $numeric $numok $oline $onpoly $opnick $or $ord $os $passivedcc $pic $play $pnick $port $portable $portfree $pos $prefix $prop $protect $puttok $qt $query $rand $r $rawmsg $read $readomo $readn $regex $regml $regsub $regsubex $remove $remtok $replace $replacex $reptok $result $rgb $right $round $scid $scon $script $scriptdir $scriptline $sdir $send $server $serverip $sfile $sha1 $shortfn $show $signal $sin $site $sline $snick $snicks $snotify $sock $sockbr $sockerr $sockname $sorttok $sound $sqrt $ssl $sreq $sslready $status $strip $str $stripped $syle $submenu $switchbar $tan $target $ticks $time $timer $timestamp $timestampfmt $timezone $tip $titlebar $toolbar $treebar $trust $ulevel $ulist $upper $uptime $url $usermode $v1 $v2 $var $vcmd $vcmdstat $vcmdver $version $vnick $vol $wid $width $wildsite $wildtok $window $wrap $xor"), keywords = parseWords("abook ajinvite alias aline ame amsg anick aop auser autojoin avoice away background ban bcopy beep bread break breplace bset btrunc bunset bwrite channel clear clearall cline clipboard close cnick color comclose comopen comreg continue copy creq ctcpreply ctcps dcc dccserver dde ddeserver debug dec describe dialog did didtok disable disconnect dlevel dline dll dns dqwindow drawcopy drawdot drawfill drawline drawpic drawrect drawreplace drawrot drawsave drawscroll drawtext ebeeps echo editbox emailaddr enable events exit fclose filter findtext finger firewall flash flist flood flush flushini font fopen fseek fsend fserve fullname fwrite ghide gload gmove gopts goto gplay gpoint gqreq groups gshow gsize gstop gtalk gunload hadd halt haltdef hdec hdel help hfree hinc hload hmake hop hsave ial ialclear ialmark identd if ignore iline inc invite iuser join kick linesep links list load loadbuf localinfo log mdi me menubar mkdir mnick mode msg nick noop notice notify omsg onotice part partall pdcc perform play playctrl pop protect pvoice qme qmsg query queryn quit raw reload remini remote remove rename renwin reseterror resetidle return rlevel rline rmdir run ruser save savebuf saveini say scid scon server set showmirc signam sline sockaccept sockclose socklist socklisten sockmark sockopen sockpause sockread sockrename sockudp sockwrite sound speak splay sreq strip switchbar timer timestamp titlebar tnick tokenize toolbar topic tray treebar ulist unload unset unsetall updatenl url uwho var vcadd vcmd vcrem vol while whois window winhelp write writeint if isalnum isalpha isaop isavoice isban ischan ishop isignore isin isincs isletter islower isnotify isnum ison isop isprotect isreg isupper isvoice iswm iswmcs elseif else goto menu nicklist status title icon size option text edit button check radio box scroll list combo link tab item"), functions = parseWords("if elseif else and not or eq ne in ni for foreach while switch"), isOperatorChar = /[+\-*&%=<>!?^\/\|]/;
return {
startState:function() {
return {
tokenize:tokenBase,
beforeParams:!1,
inParams:!1
};
},
token:function(stream, state) {
return stream.eatSpace() ? null :state.tokenize(stream, state);
}
};
});
});