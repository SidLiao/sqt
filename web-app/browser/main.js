import Tetris from "../common/Tetris.js";
//得到游戏宽度和高度
const grid_columns = Tetris.field_width;
const grid_rows = Tetris.field_height;
//初始化游戏对象
let game = Tetris.new_game();
document.documentElement.style.setProperty("--grid-rows", grid_rows);
document.documentElement.style.setProperty("--grid-columns", grid_columns);
const grid = document.getElementById("grid");
const range = (n) => Array.from({"length": n}, (ignore, k) => k);
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
function clearLeftColor(){
    let i;
    for(i=1;i<=16;i++){
        let idstr="aside-grid"+i;
        document.getElementById(idstr).style.backgroundColor="#2D3136";
        document.getElementById(idstr).style.border="0px";
    }
}
function colorLeft(){
    if(game.next_tetromino.block_type === "L"){
        document.getElementById("aside-grid2").style.backgroundColor="#faa777";
        document.getElementById("aside-grid2").style.border="1px solid #31363B";
        document.getElementById("aside-grid6").style.backgroundColor="#faa777";
        document.getElementById("aside-grid6").style.border="1px solid #31363B";
        document.getElementById("aside-grid10").style.backgroundColor="#faa777";
        document.getElementById("aside-grid10").style.border="1px solid #31363B";
        document.getElementById("aside-grid11").style.backgroundColor="#faa777";
        document.getElementById("aside-grid11").style.border="1px solid #31363B";
    }else if(game.next_tetromino.block_type === "Z"){
        document.getElementById("aside-grid6").style.backgroundColor="#f00000";
        document.getElementById("aside-grid6").style.border="1px solid #31363B";
        document.getElementById("aside-grid7").style.backgroundColor="#f00000";
        document.getElementById("aside-grid7").style.border="1px solid #31363B";
        document.getElementById("aside-grid11").style.backgroundColor="#f00000";
        document.getElementById("aside-grid11").style.border="1px solid #31363B";
        document.getElementById("aside-grid12").style.backgroundColor="#f00000";
        document.getElementById("aside-grid12").style.border="1px solid #31363B";
    }else if(game.next_tetromino.block_type === "T"){
        document.getElementById("aside-grid6").style.backgroundColor="#fbb800";
        document.getElementById("aside-grid6").style.border="1px solid #31363B";
        document.getElementById("aside-grid7").style.backgroundColor="#fbb800";
        document.getElementById("aside-grid7").style.border="1px solid #31363B";
        document.getElementById("aside-grid8").style.backgroundColor="#fbb800";
        document.getElementById("aside-grid8").style.border="1px solid #31363B";
        document.getElementById("aside-grid11").style.backgroundColor="#fbb800";
        document.getElementById("aside-grid11").style.border="1px solid #31363B";
    }else if(game.next_tetromino.block_type === "I"){
        document.getElementById("aside-grid5").style.backgroundColor="#3dae99";
        document.getElementById("aside-grid5").style.border="1px solid #31363B";
        document.getElementById("aside-grid6").style.backgroundColor="#3dae99";
        document.getElementById("aside-grid6").style.border="1px solid #31363B";
        document.getElementById("aside-grid7").style.backgroundColor="#3dae99";
        document.getElementById("aside-grid7").style.border="1px solid #31363B";
        document.getElementById("aside-grid8").style.backgroundColor="#3dae99";
        document.getElementById("aside-grid8").style.border="1px solid #31363B";
    }else if(game.next_tetromino.block_type === "J"){
        document.getElementById("aside-grid5").style.backgroundColor="#3da000";
        document.getElementById("aside-grid5").style.border="1px solid #31363B";
        document.getElementById("aside-grid6").style.backgroundColor="#3da000";
        document.getElementById("aside-grid6").style.border="1px solid #31363B";
        document.getElementById("aside-grid7").style.backgroundColor="#3da000";
        document.getElementById("aside-grid7").style.border="1px solid #31363B";
        document.getElementById("aside-grid11").style.backgroundColor="#3da000";
        document.getElementById("aside-grid11").style.border="1px solid #31363B";
    }else if(game.next_tetromino.block_type === "O"){
        document.getElementById("aside-grid6").style.backgroundColor="#fdaee9";
        document.getElementById("aside-grid6").style.border="1px solid #31363B";
        document.getElementById("aside-grid7").style.backgroundColor="#fdaee9";
        document.getElementById("aside-grid7").style.border="1px solid #31363B";
        document.getElementById("aside-grid10").style.backgroundColor="#fdaee9";
        document.getElementById("aside-grid10").style.border="1px solid #31363B";
        document.getElementById("aside-grid11").style.backgroundColor="#fdaee9";
        document.getElementById("aside-grid11").style.border="1px solid #31363B";
    }else if(game.next_tetromino.block_type === "S"){
        document.getElementById("aside-grid7").style.backgroundColor="#effff9";
        document.getElementById("aside-grid7").style.border="1px solid #31363B";
        document.getElementById("aside-grid8").style.backgroundColor="#effff9";
        document.getElementById("aside-grid8").style.border="1px solid #31363B";
        document.getElementById("aside-grid10").style.backgroundColor="#effff9";
        document.getElementById("aside-grid10").style.border="1px solid #31363B";
        document.getElementById("aside-grid11").style.backgroundColor="#effff9";
        document.getElementById("aside-grid11").style.border="1px solid #31363B";
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

function xclearLeftColor(){
    let i;
    for(i=1;i<=16;i++){
        let idstr="xaside-grid"+i;
        document.getElementById(idstr).style.backgroundColor="#2D3136";
        document.getElementById(idstr).style.border="0px";
    }
}
function xcolorLeft(){
    if(game.held_tetromino.block_type === "L"){
        document.getElementById("xaside-grid2").style.backgroundColor="#faa777";
        document.getElementById("xaside-grid2").style.border="1px solid #31363B";
        document.getElementById("xaside-grid6").style.backgroundColor="#faa777";
        document.getElementById("xaside-grid6").style.border="1px solid #31363B";
        document.getElementById("xaside-grid10").style.backgroundColor="#faa777";
        document.getElementById("xaside-grid10").style.border="1px solid #31363B";
        document.getElementById("xaside-grid11").style.backgroundColor="#faa777";
        document.getElementById("xaside-grid11").style.border="1px solid #31363B";
    }else if(game.held_tetromino.block_type === "Z"){
        document.getElementById("xaside-grid6").style.backgroundColor="#f00000";
        document.getElementById("xaside-grid6").style.border="1px solid #31363B";
        document.getElementById("xaside-grid7").style.backgroundColor="#f00000";
        document.getElementById("xaside-grid7").style.border="1px solid #31363B";
        document.getElementById("xaside-grid11").style.backgroundColor="#f00000";
        document.getElementById("xaside-grid11").style.border="1px solid #31363B";
        document.getElementById("xaside-grid12").style.backgroundColor="#f00000";
        document.getElementById("xaside-grid12").style.border="1px solid #31363B";
    }else if(game.held_tetromino.block_type === "T"){
        document.getElementById("xaside-grid6").style.backgroundColor="#fbb800";
        document.getElementById("xaside-grid6").style.border="1px solid #31363B";
        document.getElementById("xaside-grid7").style.backgroundColor="#fbb800";
        document.getElementById("xaside-grid7").style.border="1px solid #31363B";
        document.getElementById("xaside-grid8").style.backgroundColor="#fbb800";
        document.getElementById("xaside-grid8").style.border="1px solid #31363B";
        document.getElementById("xaside-grid11").style.backgroundColor="#fbb800";
        document.getElementById("xaside-grid11").style.border="1px solid #31363B";
    }else if(game.held_tetromino.block_type === "I"){
        document.getElementById("xaside-grid5").style.backgroundColor="#3dae99";
        document.getElementById("xaside-grid5").style.border="1px solid #31363B";
        document.getElementById("xaside-grid6").style.backgroundColor="#3dae99";
        document.getElementById("xaside-grid6").style.border="1px solid #31363B";
        document.getElementById("xaside-grid7").style.backgroundColor="#3dae99";
        document.getElementById("xaside-grid7").style.border="1px solid #31363B";
        document.getElementById("xaside-grid8").style.backgroundColor="#3dae99";
        document.getElementById("xaside-grid8").style.border="1px solid #31363B";
    }else if(game.held_tetromino.block_type === "J"){
        document.getElementById("xaside-grid5").style.backgroundColor="#3da000";
        document.getElementById("xaside-grid5").style.border="1px solid #31363B";
        document.getElementById("xaside-grid6").style.backgroundColor="#3da000";
        document.getElementById("xaside-grid6").style.border="1px solid #31363B";
        document.getElementById("xaside-grid7").style.backgroundColor="#3da000";
        document.getElementById("xaside-grid7").style.border="1px solid #31363B";
        document.getElementById("xaside-grid11").style.backgroundColor="#3da000";
        document.getElementById("xaside-grid11").style.border="1px solid #31363B";
    }else if(game.held_tetromino.block_type === "O"){
        document.getElementById("xaside-grid6").style.backgroundColor="#fdaee9";
        document.getElementById("xaside-grid6").style.border="1px solid #31363B";
        document.getElementById("xaside-grid7").style.backgroundColor="#fdaee9";
        document.getElementById("xaside-grid7").style.border="1px solid #31363B";
        document.getElementById("xaside-grid10").style.backgroundColor="#fdaee9";
        document.getElementById("xaside-grid10").style.border="1px solid #31363B";
        document.getElementById("xaside-grid11").style.backgroundColor="#fdaee9";
        document.getElementById("xaside-grid11").style.border="1px solid #31363B";
    }else if(game.held_tetromino.block_type === "S"){
        document.getElementById("xaside-grid7").style.backgroundColor="#effff9";
        document.getElementById("xaside-grid7").style.border="1px solid #31363B";
        document.getElementById("xaside-grid8").style.backgroundColor="#effff9";
        document.getElementById("xaside-grid8").style.border="1px solid #31363B";
        document.getElementById("xaside-grid10").style.backgroundColor="#effff9";
        document.getElementById("xaside-grid10").style.border="1px solid #31363B";
        document.getElementById("xaside-grid11").style.backgroundColor="#effff9";
        document.getElementById("xaside-grid11").style.border="1px solid #31363B";
    }
}

const deepCopy = (obj) => {
    //浅拷贝子节点
    let handleChild = (child) => {
        if(typeof child === 'object'){
            if(Array.isArray(child)){ // 数组
            return [...child]
            }else if(child){ // 对象
            return {...child}
            }else{ // null
            return child
            }
        }else{ // 值类型
            return child
        }
    }
    let arr = [];
    let target = {result: obj};
    let current = target; 
    while(current){
    if(typeof current === 'object'){
        if(Array.isArray(current)){ //数组
        current.forEach((item, index) => {
            let child = handleChild(item)
            current[index] = child;
            arr.push(child);
        })
        }else if(current){ //对象
        let objKeys = Object.keys(current);
        objKeys.forEach(key => {
            let child = handleChild(current[key]);
            current[key] = child;
            arr.push(child);
        })
        }else{ //null
        temp = current;
        }
    }
    current = arr.shift()
    }
    return target.result
}
// Don't allow the player to hold down the rotate key.
let key_locked = false;

document.body.onkeyup = function () {
    key_locked = false;
};
// let can_hold=false;
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==67){ // 按 c
        if(game.can_hold==false){
            game.can_hold=true;
            game.held_tetromino=Tetris.hold(game);
            game.current_tetromino=deepCopy(game.next_tetromino);
        }else{
            // game.can_hold=false;
            let t=Tetris.hold(game);
            game.current_tetromino=deepCopy(game.held_tetromino);
            game.held_tetromino=t;
        }
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
