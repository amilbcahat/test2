(function() {
$(document).ready(function() {
return window.update_leaderboard = function(url) {
return $("#leaderboard-rows").html("    <div style='padding: 123px 0; height: 64px;'>        <img src='https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_64x64.gif'>    </div>    "), 
$.ajax({
type:"GET",
url:url,
success:function(data) {
var i, row_alt, _results;
if (data && data.models) {
for ($("#leaderboard-rows").html(""), 0 === data.models.length && $("#leaderboard-rows").html("    <div style='padding: 123px 0; height: 64px;'>        <p class='m gray' style='padding: 24px 0;'>Leaderboard is empty.</p>    </div>    "), 
i = 0, _results = []; i < data.models.length; ) row_alt = void 0, row_alt = i % 2 === 1 ? " row-alt" :"", 
$("#leaderboard-rows").append("    <div class='row" + row_alt + "'>        <div class='span2'>            <p>" + data.models[i].rank + "</p>        </div>        <div class='span4'>            <p>" + data.models[i].hacker + "</p>        </div>        <div class='span2'>            <p>" + parseFloat(data.models[i].score).toFixed(2) + "</p>        </div>        <div class='span4'>            <p>" + data.models[i].country + "</p>        </div>        <div class='span2 language-column'>            <p>" + data.models[i].language + "</p>        </div>    </div>    "), 
_results.push(i++);
return _results;
}
return $("#leaderboard-rows").find(".span16").html("<p style='color: IndianRed;'>Unable to load leaderboard. Illegal response from server.</p>");
},
error:function(jqXHR, textStatus, errorThrown) {
return $("#leaderboard-rows").find(".span16").html("<p style='color: IndianRed;'>Unable to load leaderboard. Error occured: `<span style='font-family: monospace;'>" + errorThrown + "</span>`.</p>");
}
});
};
});
}).call(this), function() {
$(document).ready(function() {
return $(".login-button").click(function() {
return HR.util.ShowLoginDialog().render();
}), $(".signup-button").click(function() {
return HR.util.ShowLoginDialog({
purpose:"signup"
}).render();
});
});
}.call(this);