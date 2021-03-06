var port = 9912;
require('console-stamp')( console, {  } );
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();
app.disable('x-powered-by'); // security by obscurity: mask attack surface
app.use(favicon(path.join(__dirname, 'favicon.ico')));

console.log('app start');
console.log("start CMU load");
app.locals.maj = require('./majormap');
app.locals.cmu = require('./cmu');
app.locals.cmu.loadCmu(major_mapping);
app.locals.pidig = require('./pidig');
app.locals.pidig.loadTenThousand();

var router = express.Router();

// map string of phonemes to major digits
function major_mapping(phones) {
    var m = app.locals.maj.majmap;
    var sa = phones.split(" ");
    var ms = sa.map(function(p) { return m[p]; });
    return ms.join("");
}

console.log("majormap info: "+app.locals.maj.majmap["N"]);
console.log("major_mapping test: "+major_mapping("N B D AA OW0 K"));

app.get('/', function (req, res) {
    console.log('serving root');
    var cmu = app.locals.cmu;
    var pi = app.locals.pidig;
    var info = "INFO = ";
    if(cmu.isCmuLoaded()){
        info +=  cmu.getCmu("INFO");
    } else {
        info = "(CMU is not loaded)";
    }
    if(pi.isLoaded()){
        var nun = pi.getTen(100/10);
        info += " pi digits loaded: and digits 101-110 are " + nun;
    } else {
        info += " pi digits NOT loaded";
    }
    avoidCache(res);
    
    res.send('Hello! Nothing to see here!\n'+"  server says "+ info);
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, function () {
    console.log('app listening on port '+ port);
});


//----------------------------------------------------------------------------
// utils
function getUptime() {
    return process.uptime();
}

function avoidCache(res) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    res.setHeader("Expires", "0"); // Proxies.
}

