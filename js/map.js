var Map = function() {
    this.TILE_SIZE = 20;
    this.COL = 20;
    this.ROW = 20;
    this.OUTLINE = 2;
    
    this.FLOOR = {id: 0, fg: '#545454', bg: '#505050'};
    this.WALL = {id: 1, fg: '#111111', bg: '#000000'};
    this.SNAKE = {id: 2, fg: Snk.fg, bg: Snk.bg};
    this.APPLE = {id: 3, fg: Apl.fg, bg: Snk.bg};

    this.LEVEL_ONE = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

    this.CURRENT_MAP = [];    
}

Map.prototype.reset = function(level) {
    this.CURRENT_MAP = level.slice();
}

// gets the x and y coordinates of the tile (useful for drawing blocks)
Map.prototype.tile_coordinates_at_tile = function(col, row) {
    return {
        x: (this.COL * col),
        y: (this.ROW * row)
    };
};

// gets the array index of a tile (useful for checking what kind of tile it is)
Map.prototype.array_index_of_tile = function(col, row) {
    return col + this.COL * row;
};

Map.prototype.draw = function() {
    for (var row = 0; row < this.ROW; row++) {
        for (var col = 0; col < this.COL; col++) {
            var array_index = this.array_index_of_tile(col, row);
            var c_coord = this.tile_coordinates_at_tile(col, row);
            switch(this.CURRENT_MAP[array_index]) {
                case this.FLOOR.id: 
                    draw_block(c_coord.x, c_coord.y, this.TILE_SIZE, this.FLOOR.fg, this.FLOOR.bg, this.OUTLINE);
                    break;
                case this.WALL.id: 
                    draw_block(c_coord.x, c_coord.y, this.TILE_SIZE, this.WALL.fg, this.WALL.bg, this.OUTLINE);
                    break;              
                case this.SNAKE.id:
                    this.CURRENT_MAP[array_index] = this.FLOOR.id;
                    Snk.set_position(c_coord.x, c_coord.y);
                    break;
                case this.APPLE.id:
                    Apl.set_position(c_coord.x, c_coord.y);
                    break;
                default:
                    break;      
            }
        }
    }
};