var Snake = function(size, border, points) {
    // snakes position on the canvas
    this.x;
    this.y;
    this.size = size;
    // direction the snake is traveling
    this.direction = [];
    this.speed = size;
    // width and height of the snake itself
    this.border = border;
    // color
    this.bg = '#004d1a';
    this.fg = 'lime';
    // trail
    this.tail_length = 0;
    this.tail_x = [];
    this.tail_y = [];
    this.tail_col_row = [];
    // keys the player uses to contol the snake
    this.control_up;
    this.control_down;
    this.control_left;
    this.control_right;
    this.restart = 32; // space bar

    this.player_score = 0;
    this.points_increase = points;

    this.flip = false;

    return this;
};

Snake.prototype.increase_score = function() {
    this.player_score += this.points_increase;
};

Snake.prototype.set_position = function(x_pos, y_pos) {
    this.x = x_pos;
    this.y = y_pos;
};

Snake.prototype.set_speed = function(x_s, y_s) {
    this.direction = [x_s, y_s];
};

Snake.prototype.move = function() {
    if (this.tail_length == this.tail_x.length) {
        for (var i = 0; i < this.tail_x.length; i++) {
            this.tail_x[i] = this.tail_x[i+1];
            this.tail_y[i] = this.tail_y[i+1];
            this.tail_col_row[i] = this.tail_col_row[i+1];
        }
    }
    this.tail_col_row[this.tail_length-1] = this.col_row();
    this.tail_x[this.tail_length-1] = this.x;
    this.tail_y[this.tail_length-1] = this.y;

    this.x += this.direction[0];
    this.y += this.direction[1];

};

Snake.prototype.draw = function() {
    draw_block(this.x, this.y, this.size, this.fg, this.bg, this.border); 
    for (var i = 0; i < this.tail_col_row.length; i++) {
        draw_block(this.tail_x[i], this.tail_y[i], this.size, this.fg, this.bg, this.border); 
    } 
};

Snake.prototype.key_handler = function(evt) {
    this.can_turn = this.legal_direction(evt.keyCode);
    if (this.can_turn) {
        switch(evt.keyCode) {
            case this.control_up:
                this.set_speed(0, -this.speed);
                break;
            case this.control_down:
                this.set_speed(0, this.speed);
                break;
            case this.control_left:
                this.set_speed(-this.speed, 0);
                break;
            case this.control_right:
                this.set_speed(this.speed, 0);
                break;      
            case this.restart:
                if (!in_game) {
                    reset();
                    in_game = true;
                }
                break;
            default: 
                break;                                
        }
    }
};

Snake.prototype.input = function(up, down, left, right) {
    this.control_up = up;
    this.control_down = down;
    this.control_left = left;
    this.control_right = right;
};

Snake.prototype.col_row = function() {
    return {
        x: Math.floor((this.x + this.size/2) / this.size),
        y: Math.floor((this.y + this.size/2) / this.size)
    };
};

Snake.prototype.reset = function() {
    this.set_speed(0, 0);
    this.player_score = 0;
    this.tail_length = 0;
    this.tail_x = [];
    this.tail_y = [];
    this.tail_col_row = [];
    this.prev = 0;    
};

Snake.prototype.get_direction = function() {
    if (this.direction[1] == -this.speed)  {return "up"}
    if (this.direction[1] ==  this.speed)  {return "down"}
    if (this.direction[0] == -this.speed)  {return "left"}
    if (this.direction[0] ==  this.speed)  {return "right"}
};

Snake.prototype.legal_direction = function(key) {
    this.cdirection = this.get_direction();
    if (this.tail_length > 0) {
        if (this.cdirection == "up" && key == this.control_down)    {return false} 
        if (this.cdirection == "down" && key == this.control_up)    {return false}
        if (this.cdirection == "left" && key == this.control_right) {return false}
        if (this.cdirection == "right" && key == this.control_left) {return false}
    }
    return true;
};