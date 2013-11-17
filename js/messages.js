var print_id = 0;
var printing = false;
function printMessage (msg, good) {
    var $msg = $('#message');
    if (printing) {
        setTimeout(function() {
            printMessage (msg, good);
        }, 3000);
    } else {
        $msg.html(msg);
        if (good == undefined) {
            $msg.removeClass("bad");
            $msg.removeClass("good");
        } else if (good) {
            $msg.removeClass("bad");
            $msg.addClass("good");
        } else {
            $msg.removeClass("good");
            $msg.addClass("bad");
        }
        printing = true;
        setTimeout(function() {
            printing = false;
        }, 2500);
        $msg.addClass("up");
        print_id++;
        var current_print_id = print_id;
        setTimeout(function () {
            if (current_print_id == print_id) {
                $msg.removeClass("up");
            }
        }, 4000);
    }
}
function printCarac(msg) {
    var $carac = $('#carac');
    $carac.addClass('up');
    $carac.html(msg);
}
function eraseCarac() {
    var $carac = $('#carac');
    $carac.removeClass('up');
    $carac.text("");
}
