// Interactiveness now
(function() {
    var clock = document.querySelector('digiclock');
    var pad = function(x) {
        return x < 10 ? '0' + x : x;
    };

    var ticktock = function() {
        var d = new Date();

        var h = pad(d.getHours());
        var m = pad(d.getMinutes());
        var s = pad(d.getSeconds());

        var current_time = [h, m, s].join(':');

        clock.innerHTML = current_time;

    };

    ticktock();
    // Calling ticktock() every 1 second
    setInterval(ticktock, 1000);
}());