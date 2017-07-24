var canvas, context, score, hs;
var fps = 60;
// colemak left: 65, up: 87, right: 83, down: 82
// qwerty: left: 65, up: 87, right: 68, down: 83
// arrow keys: left: 37, up: 38, right: 39, down: 40

const APPLE_GET_POINTS = 100;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const BLOCK_SIZE = 20;
const BORDER = 2;

var Snk = new Snake(BLOCK_SIZE, BORDER, APPLE_GET_POINTS);
var Apl = new Apple(BLOCK_SIZE, BORDER);
var Mp = new Map();

var in_game = true;

window.onload = function() {
    canvas = document.getElementById("snek");
    context = canvas.getContext('2d');
    score = document.getElementById("score");
    hs = document.getElementById("high_score");
    go = document.getElementById("game_over");

    check_cookie("highscore");

    Snk.input(KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT);

    reset();

    document.addEventListener('keydown', function(evt) {
        Snk.key_handler(evt);
    });

    
    setInterval(function() {
        draw_all();
        if (in_game) {
            console.log(timer.can_move(6));
            if (timer.can_move(6)) {
                move_all();
            }
            all_collision(Snk, Mp, Apl);
        }
        timer.increment();
    }, 1000/fps);
}

var timer  = {
    time: 0,
    increment: function() {
        this.time++;
        if (this.time == 60 || !in_game) {
            this.reset();
        }
    },
    reset: function() {
        this.time = 0;
    },
    can_move: function(mod) {
        return this.time % mod == 0;
    }
}

function game_over() {
    in_game = false;
    go.innerHTML = "Game Over! Press Space to Restart!";
}

function move_all() {
    Snk.move();
}

function draw_all() {
    Mp.draw();
    Snk.draw();
    Apl.draw();
    if(!in_game) {
        draw_block(Snk.x, Snk.y, Snk.size, '#99ff99', '#1aff1a', Snk.border);
    }
    score.innerHTML = "Score: " + Snk.player_score;
}

function reset() {
    check_if_new_highscore();
    go.innerHTML = "";
    Mp.reset(Mp.LEVEL_ONE);
    Snk.reset();
    Apl.random_index(Snk, Mp);
}

function check_if_new_highscore() {
    var prev_hs = get_cookie("highscore");
    var this_game_score = Snk.player_score;
    if (prev_hs != "") {
        prev_hs = parseInt(prev_hs);
        if (prev_hs < this_game_score) {
            update_highscore_cookie(this_game_score.toString());
            hs.innerHTML = "High Score: " + this_game_score;
        }
    } else {
        update_highscore_cookie(this_game_score.toString());
        hs.innerHTML = "High Score: " + this_game_score;
    }
}

function update_highscore_cookie(score) {
    document.cookie = "highscore=" + score + ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
}

function get_cookie(cookie_name) {
    var name = cookie_name + "=";
    var decoded_cookie = decodeURIComponent(document.cookie);
    var ca = decoded_cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }        
    }
    return "";
}

function check_cookie() {
    var hscookie = get_cookie("highscore");
    if (hscookie != "") {
        hs.innerHTML = "High Score: " + hscookie;
    } else {
        var zero = 0;
        update_highscore_cookie(zero.toString());
        hs.innerHTML = "High Score: 0";
    }
}

