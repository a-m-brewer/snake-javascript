var canvas, context, score, hs;
var fps = 60;

const APPLE_GET_POINTS = 100;
const KEY_LEFT = 65;
const KEY_UP = 87;
const KEY_RIGHT = 83;
const KEY_DOWN = 82;

const BLOCK_SIZE = 20;
const BORDER = 2;

var Snk = new Snake(BLOCK_SIZE, BORDER, APPLE_GET_POINTS);
var Apl = new Apple(BLOCK_SIZE, BORDER);
var Mp = new Map();
var Gtimer = new Timer();

var in_game = true;
var flip = false;

window.onload = function() {
    canvas = document.getElementById("snek");
    context = canvas.getContext('2d');
    score = document.getElementById("score");
    hs = document.getElementById("high_score");
    go = document.getElementById("game_over");

    check_cookie("highscore");

    reset();

    document.addEventListener('keydown', function(evt) {
        Snk.key_handler(evt);
    });

    
    setInterval(function() {
        game.draw_all();
        if (in_game) {
            if (Gtimer.modullo(6)) {
                game.move_all();
            }
            game.all_collision(Snk, Mp, Apl);
        }
        Gtimer.increment();
    }, 1000/fps);
}

var game = {
    move_all: function() {
        Snk.move();
    },
    draw_all: function() {
        Mp.draw();
        Snk.draw();
        Apl.draw();
        if (Gtimer.less_than(30) && !in_game) {
            draw_block(Snk.x, Snk.y, Snk.size, '#99ff99', '#1aff1a', Snk.border);
        }
        score.innerHTML = "Score: " + Snk.player_score;        
    },
    all_collision: function(snake, map, apple) {
        snake_hits_wall(snake, map);
        snake_hits_apple(snake, map, apple);
        snake_hits_self(snake, map);        
    }
}

function game_over() {
    Gtimer.reset();
    in_game = false;
    go.innerHTML = "Game Over! Press Space to Restart!";
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

// COOKIE STUFF

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