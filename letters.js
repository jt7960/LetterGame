char_set = init_char_set()
score = 0
incorrect = 0
var timerid
missed_letters = []
practice_mode = false

function init_char_set(char_set){
    //char_set = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    if(this.practice_mode){
        char_set = missed_letters
    }
    else{
        char_set = ['my', 'you', 'we', 'see', 'can', 'with', 'he', 'and', 'do','to','go', 'I', 'the', 'a', 'are', 'had']
    }
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

function set_practice_mode(practice_mode, true_or_false){
    practice_mode = true_or_false
    return practice_mode
}

function update_char(char){
    document.getElementById('char').innerHTML = char
}

function get_rand_char(){
    if(char_set.length == 0){
        practice_mode ? char_set = init_char_set(missed_letters) : char_set = init_char_set(char_set)
    }
    var rand_num = Math.floor(Math.random()*char_set.length);
    char = char_set.splice(rand_num, 1)
    //rand_num % 2 == 0 ? update_char(char) : update_char(char.toString().toUpperCase())
    rand_num % 2 == 0 ? update_char(char) : update_char(char.toString())
    return char_set
}

function increase_score(){
    score++
    document.getElementById('score').innerHTML = score
}

function increment_incorrect(){
    add_to_missed_letters()
    incorrect++
    document.getElementById('incorrect').innerHTML = incorrect
}


function start_game(){
    practice_mode = set_practice_mode(practice_mode, false)
    char_set = init_char_set(char_set)
    missed_letters = []
    document.getElementById('btn_correct').addEventListener("click", increase_score);
    document.getElementById('btn_correct').addEventListener("click", get_rand_char);
    document.getElementById('btn_incorrect').addEventListener("click", increment_incorrect);
    document.getElementById('btn_incorrect').addEventListener("click", get_rand_char);
    start_timer()
    show_timer()
    get_rand_char()
    score = 0
    incorrect = 0
    document.getElementById('score').innerHTML = score
    
}

function end_game(timer){
    document.getElementById('btn_correct').removeEventListener("click", increase_score);
    document.getElementById('btn_correct').removeEventListener("click", get_rand_char);
    document.getElementById('btn_incorrect').removeEventListener("click", get_rand_char);
    document.getElementById('btn_incorrect').removeEventListener("click", increment_incorrect);
    console.log('endgame was called')
    clearInterval(timerid)
    show_practice()
    document.getElementById('char').innerHTML = score
    document.getElementById('timer_val').innerHTML = 0
    reset_score()
}

function reset_score(){
    score = 0
    incorrect = 0
    document.getElementById('score').innerHTML = score
    document.getElementById('incorrect').innerHTML = incorrect
}
function show_timer(){
    document.getElementById('start').style.display= 'none'
    document.getElementById('practice').style.display = 'none'
    document.getElementById('mytimer').style.display = 'flex'
}

function show_start(){
    document.getElementById('mytimer').style.display = 'none'
    document.getElementById('practice').style.display = 'none'
    document.getElementById('start').style.display = 'flex'
}

function show_practice(){
    document.getElementById('yes_practice').addEventListener('click', start_practice_mode);
    document.getElementById('no_practice').addEventListener('click', end_practice);
    document.getElementById('mytimer').style.display = 'none'
    document.getElementById('start').style.display = 'none'
    document.getElementById('practice').style.display = 'flex'
}

function end_practice(){
    document.getElementById('btn_correct').removeEventListener("click", increase_score);
    document.getElementById('btn_correct').removeEventListener("click", get_rand_char);
    document.getElementById('btn_incorrect').removeEventListener("click", get_rand_char);
    document.getElementById('btn_incorrect').removeEventListener("click", increment_incorrect);
    show_start()
}


function start_practice_mode(){
    practice_mode = set_practice_mode(practice_mode, true)
    console.log('start practice was clicked')
    show_start()
    char_set = missed_letters
    document.getElementById('btn_correct').addEventListener("click", increase_score);
    document.getElementById('btn_correct').addEventListener("click", get_rand_char);
    document.getElementById('btn_incorrect').addEventListener("click", increment_incorrect);
    document.getElementById('btn_incorrect').addEventListener("click", get_rand_char);
    get_rand_char();
}

function add_to_missed_letters(){
    missed_letters.push(document.getElementById('char').innerHTML)
}

document.body.onload = show_start()
document.getElementById('start').addEventListener("click", start_game);
document.getElementById('mytimer').addEventListener("click", end_game);






