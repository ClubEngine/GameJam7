var print_id = 0;
function printMessage (msg, good) {
    var $msg = $('#message');
    console.log($msg, msg, good)
    $msg.text(msg);
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
    console.log($msg.attr('id'));
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
    $carac.text(msg);
}
function eraseCarac() {
    var $carac = $('#carac');
    $carac.removeClass('up');
    $carac.text("");
}
