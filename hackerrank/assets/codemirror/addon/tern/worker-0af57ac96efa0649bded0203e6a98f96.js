// CodeMirror, copyright (c) by Marijn Haverbeke and others
function getFile(file, c) {
postMessage({
type:"getFile",
name:file,
id:++nextId
}), pending[nextId] = c;
}

function startServer(defs, plugins, scripts) {
scripts && importScripts.apply(null, scripts), server = new tern.Server({
getFile:getFile,
async:!0,
defs:defs,
plugins:plugins
});
}

var server;

this.onmessage = function(e) {
var data = e.data;
switch (data.type) {
case "init":
return startServer(data.defs, data.plugins, data.scripts);

case "add":
return server.addFile(data.name, data.text);

case "del":
return server.delFile(data.name);

case "req":
return server.request(data.body, function(err, reqData) {
postMessage({
id:data.id,
body:reqData,
err:err && String(err)
});
});

case "getFile":
var c = pending[data.id];
return delete pending[data.id], c(data.err, data.text);

default:
throw new Error("Unknown message type: " + data.type);
}
};

var nextId = 0, pending = {}, console = {
log:function(v) {
postMessage({
type:"debug",
message:v
});
}
};