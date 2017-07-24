var Apple = function(size, border) {
    this.x = -20;
    this.y = -20;
    this.size = size;
    this.border = border;
    this.fg = '#e60000';
    this.bg = '#881111';
}

Apple.prototype.draw = function() {
    draw_block(this.x, this.y, this.size, this.fg, this.bg, this.border); 
};

Apple.prototype.set_position = function(x, y) {
    this.x = x;
    this.y = y;
};

Apple.prototype.random_index = function(snake, map) {
    this.rp = Math.floor(Math.random() * ((map.CURRENT_MAP.length - 1) - 0 + 1)) + 0;
    var on_snake = apple_spawn_on_snake(snake, map, this.rp);
    if (map.CURRENT_MAP[this.rp] != map.FLOOR.id || on_snake) {
        this.random_index(snake, map);
    } else {
        map.CURRENT_MAP[this.rp] = map.APPLE.id;
    }
}