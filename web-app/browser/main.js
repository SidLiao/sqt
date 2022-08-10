import Tetris from "../common/Tetris.js";
//得到游戏宽度和高度
const grid_columns = Tetris.field_width;
const grid_rows = Tetris.field_height;
//初始化游戏对象
let game = Tetris.new_game();
document.documentElement.style.setProperty("--grid-rows", grid_rows);
document.documentElement.style.setProperty("--grid-columns", grid_columns);
const grid = document.getElementById("grid");
const range = (n) => Array.from({ "length": n }, (ignore, k) => k);
//画出棋盘
const cells = range(grid_rows).map(function () {
    const row = document.createElement("div");
    row.className = "row";
    const rows = range(grid_columns).map(function () {
        const cell = document.createElement("div");
        cell.className = "cell";

        row.append(cell);

        return cell;
    });

    grid.append(row);
    return rows;
});
function clearLeftColor() {
    let i;
    range(16).map(e => {
        let idstr = "aside-grid" + (e + 1);
        document.getElementById(idstr).style.backgroundColor = "#2D3136";
        document.getElementById(idstr).style.border = "0px";
    })
}
function colorLeft() {
    if (game.next_tetromino.block_type === "L") {
        [2, 6, 10, 11].map(e => {
            setColor('aside-grid' + e)
        })
    } else if (game.next_tetromino.block_type === "Z") {
        [6, 7, 11, 12].map(e => {
            setColor('aside-grid' + e)
        })
    } else if (game.next_tetromino.block_type === "T") {
        [6, 7, 8, 11].map(e => {
            setColor('aside-grid' + e)
        })
    } else if (game.next_tetromino.block_type === "I") {
        [5, 6, 7, 8].map(e => {
            setColor('aside-grid' + e)
        })
    } else if (game.next_tetromino.block_type === "J") {
        [5, 6, 7, 11].map(e => {
            setColor('aside-grid' + e)
        })
    } else if (game.next_tetromino.block_type === "O") {
        [6, 7, 10, 11].map(e => {
            setColor('aside-grid' + e)
        })
    } else if (game.next_tetromino.block_type === "S") {
        [7, 8, 10, 11].map(e => {
            setColor('aside-grid' + e)
        })
    }
}
const update_grid = function () {
    clearLeftColor();
    colorLeft();
    //记录的是落下来之后的状态,s所有定下来了的方块 都变成一个颜色
    game.field.forEach(function (line, line_index) {
        line.forEach(function (block, column_index) {
            const cell = cells[line_index][column_index];
            cell.className = `cell ${block}`;
        });
    });
    Tetris.tetromino_coordiates(game.current_tetromino, game.position).forEach(
        function (coord) {
            try {
                const cell = cells[coord[1]][coord[0]];
                cell.className = (
                    `cell ${game.current_tetromino.block_type}`
                );
            } catch (ignore) {

            }
        }
    );
};

function xclearLeftColor() {
    let i;
    for (i = 1; i <= 16; i++) {
        let idstr = "xaside-grid" + i;
        document.getElementById(idstr).style.backgroundColor = "#2D3136";
        document.getElementById(idstr).style.border = "0px";
    }
}
function setColor(domStr) {
    document.getElementById(domStr).style.backgroundColor = "#faa777";
    document.getElementById(domStr).style.border = "1px solid #31363B";
}
function xcolorLeft() {
    if (game.held_tetromino.block_type === "L") {
        ['xaside-grid6', 'xaside-grid10', 'xaside-grid611'].map(e => {
            setColor(e)
        })
    } else if (game.held_tetromino.block_type === "Z") {
        [6, 7, 11, 12].map(e => {
            setColor('xaside-grid' + e)
        })
    } else if (game.held_tetromino.block_type === "T") {
        [6, 7, 8, 11].map(e => {
            setColor('xaside-grid' + e)
        })
    } else if (game.held_tetromino.block_type === "I") {
        [5, 6, 7, 8].map(e => {
            setColor('xaside-grid' + e)
        })
    } else if (game.held_tetromino.block_type === "J") {
        [5, 6, 7, 11].map(e => {
            setColor('xaside-grid' + e)
        })
    } else if (game.held_tetromino.block_type === "O") {
        [6, 7, 10, 11].map(e => {
            setColor('xaside-grid' + e)
        })
    } else if (game.held_tetromino.block_type === "S") {
        [7, 8, 10, 11].map(e => {
            setColor('xaside-grid' + e)
        })
    }
}
var deepCopy = (obj) => JSON.parse(JSON.stringify(obj))
let key_locked = false;
document.body.onkeyup = function () {
    key_locked = false;
};
// let can_hold=false;
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 67) { // 按 c
        game = Tetris.hold(game)
        xclearLeftColor();
        xcolorLeft();
    }
};

document.body.onkeydown = function (event) {
    if (!key_locked && event.key === "ArrowUp") {
        key_locked = true;
        game = Tetris.rotate_ccw(game);
    }
    if (event.key === "ArrowDown") {
        game = Tetris.soft_drop(game);
    }
    if (event.key === "ArrowLeft") {
        game = Tetris.left(game);
    }
    if (event.key === "ArrowRight") {
        game = Tetris.right(game);
    }
    if (event.key === " ") {
        game = Tetris.hard_drop(game);
    }
    update_grid();
};

const timer_function = function () {
    game = Tetris.next_turn(game);
    update_grid();
    setTimeout(timer_function, 500);
};

setTimeout(timer_function, 500);

update_grid();
