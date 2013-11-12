
var x = new clsStopwatch();
var $time;
var clocktimer;

function pad(num, size) {
    var s = "0000" + num;
    return s.substr(s.length - size);
}

function formatTime(time) {
    var h = m = s = ms = 0;
    var newTime = '';

    h = Math.floor( time / (60 * 60 * 1000) );
    time = time % (60 * 60 * 1000);
    m = Math.floor( time / (60 * 1000) );
    time = time % (60 * 1000);
    s = Math.floor( time / 1000 );
    ms = time % 1000;

    newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
    return newTime;
}

function show() {
    $time = document.getElementById('time');
    update();
}

function update() {
    $time.innerHTML = formatTime(x.time());
}

function start() {
    clocktimer = setInterval("update()", 1);
    x.start();
}

function stop() {
    x.stop();
    clearInterval(clocktimer);
}

function reset() {
    stop();
    x.reset();
    update();
}

function updateLog() {
    var e = document.querySelector('#log');
    ppl.all(function(data){
        var str = JSON.stringify(data);
        e.innerHTML = str.replace(/},/g, "},\n");
    });

    
}

var ppl;

window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

document.addEventListener('DOMContentLoaded', function () {
    show();

    ppl = Lawnchair({
        name:'people',
        adapter: 'dom'
    }, function(event){

        var self = this;
/*
        this.keys(function(keys) {
            keys.forEach(function(key){
                console.log(key);
                self.get(key, function(value){
                    console.log(value);
                });
            });
        });
*/
        // Hmm... but `this` won't work inside an anon handler
        var e = document.querySelector('#saveEvent');
        e.addEventListener('click', function(e){
            var rep = {
                'rep': $time.innerHTML
            };
            event.save(rep);
            updateLog();
        }, false);
        
        var e = document.querySelector('#saveLogToServer');
        e.addEventListener('click', sendLog);
        

    });
    updateLog();
});



function sendLog() {

    var x = new XMLHttpRequest();  
    var string = '';

    ppl.all(function(data){
        string = JSON.stringify(data);
    });

    x.open('POST','server.php',true);
    x.setRequestHeader('Content-type','application/json; charset=utf-8');

    x.onreadystatechange = function(){
        if (x.readyState != 4) {
            return;   
        }
        if (x.status != 200 && x.status != 304) {
            alert('HTTP error ' + req.status);
            return;
        }

        var resp = JSON.parse(x.responseText);
        if(resp.status=='success'){
            alert('That worked!');
        }else{
            alert('That didn\'t work!');
        }
    }
    x.send(string);
}