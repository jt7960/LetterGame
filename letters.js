char_set = init_char_set()
score = 0
incorrect = 0
pass = 0
var timerid
missed_letters = []

function init_char_set(char_set){
    char_set = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    return char_set
}

function start_timer(timer){
    timer_val = 60
    document.getElementById('timer_val').innerHTML = timer_val
    timerid = setInterval(decrease_timer, 1000)
}

function decrease_timer(){
    console.log('this fired')
    timer_val = document.getElementById('timer_val').innerHTML
    if(timer_val == 0 || timer_val == ''){
        end_game()
        console.log('timer says 0 or null')
    }
    else{
        timer_val--
        document.getElementById('timer_val').innerHTML = timer_val
    }
}


function update_char(char){
    document.getElementById('char').innerHTML = char
}

function get_rand_char(){
    if(char_set.length == 0){
        char_set = init_char_set(char_set)
    }
    var rand_num = Math.floor(Math.random()*char_set.length);
    char = char_set.splice(rand_num, 1)
    rand_num % 2 == 0 ? update_char(char) : update_char(char.toString().toUpperCase())
    return char_set
}

function increase_score(){
    score++
    document.getElementById('score').innerHTML = score
}

function increment_incorrect(){
    incorrect++
    document.getElementById('incorrect').innerHTML = incorrect
}

function increment_pass(){
    pass++
    document.getElementById('pass').innerHTML = pass
}


function start_game(){
    document.getElementById('btn_correct').addEventListener("click", increase_score);
    document.getElementById('btn_pass').addEventListener('click', increment_pass);
    document.getElementById('btn_incorrect').addEventListener("click", increment_incorrect);
    document.getElementById('btn_correct').addEventListener("click", get_rand_char);
    document.getElementById('btn_incorrect').addEventListener("click", get_rand_char);
    document.getElementById('btn_incorrect').addEventListener("click", add_to_missed_letters);
    start_timer()
    show_timer()
    get_rand_char()
    score = 0
    document.getElementById('score').innerHTML = score
    
}

function end_game(timer){
    document.getElementById('btn_correct').removeEventListener("click", increase_score);
    document.getElementById('btn_correct').removeEventListener("click", get_rand_char);
    document.getElementById('btn_pass').removeEventListener('click', increment_pass);
    document.getElementById('btn_incorrect').removeEventListener("click", increment_incorrect);
    document.getElementById('btn_incorrect').removeEventListener("click", get_rand_char);
    document.getElementById('btn_incorrect').removeEventListener("click", add_to_missed_letters);
    console.log('endgame was called')
    clearInterval(timerid)
    show_start()
    document.getElementById('char').innerHTML = score
    document.getElementById('timer_val').innerHTML = 0
    reset_score()
}

function reset_score(){
    score = 0
    pass = 0
    incorrect = 0
    document.getElementById('score').innerHTML = score
    document.getElementById('pass').innerHTML = pass
    document.getElementById('incorrect').innerHTML = incorrect
}
function show_timer(){
    document.getElementById('start').style.display= 'none'
    document.getElementById('timer').style.display = 'inline'
}

function show_start(){
    document.getElementById('timer').style.display = 'none'
    document.getElementById('start').style.display = 'inline'
}

function add_to_missed_letters(){
    missed_letters.push(document.getElementById('char').innerHTML)
}

document.body.onload = show_start()
document.getElementById('start').addEventListener("click", start_game);
document.getElementById('timer').addEventListener("click", end_game);






