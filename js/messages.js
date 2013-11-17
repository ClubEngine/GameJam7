var print_id = 0;
function printMessage (msg, good) {
    var $msg = $('#message');
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
    $msg.addClass("up");
    print_id++;
    var current_print_id = print_id;
    setTimeout(function () {
        if (current_print_id == print_id) {
            $msg.removeClass("up");
        }
    }, 4000);
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
