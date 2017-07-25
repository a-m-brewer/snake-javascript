function snake_hits_wall(snake, map) {
    var snake_pos = snake.col_row();
    var a_i = map.array_index_of_tile(snake_pos.x, snake_pos.y);

    if(map.CURRENT_MAP[a_i] === map.WALL.id) {
        game_over();
    }
}

function snake_hits_apple(snake, map, apple) {
    var snake_pos = snake.col_row();
    var a_i = map.array_index_of_tile(snake_pos.x, snake_pos.y);    
    var eat_sound = new Sounds();
    if(map.CURRENT_MAP[a_i] === map.APPLE.id) {
        eat_sound.apple.play();
        map.CURRENT_MAP[a_i] = map.FLOOR.id;
        snake.increase_score();
        snake.tail_length++;
        apple.random_index(snake, map);
    }
}

function snake_hits_self(snake, map) {
    var snake_pos = snake.col_row();
    var a_i = map.array_index_of_tile(snake_pos.x, snake_pos.y);   
    
    for (var i = 0; i < snake.tail_col_row.length; i++) {
        var snake_tail_index = map.array_index_of_tile(snake.tail_col_row[i].x, 
                                                        snake.tail_col_row[i].y);
        if (a_i == snake_tail_index) {
            game_over()
        }
    }
}

function apple_spawn_on_snake(snake, map, new_apple_index) {
    var snake_pos = snake.col_row();
    var snake_head_index = map.array_index_of_tile(snake_pos.x, snake_pos.y);   

    if (new_apple_index == snake_head_index) {
        return true;
    }
    for (var i = 0; i < snake.tail_col_row.length; i++) {
        var snake_tail_index = map.array_index_of_tile(snake.tail_col_row[i].x, 
                                                        snake.tail_col_row[i].y);  
        if(new_apple_index == snake_tail_index) {
            return true;
        }      
    }
    return false;
}