let Battle = false;
let attack = false;
let npcAAlive = true;
let heroAlive = true;
let slimeAlive = true;
//initative decides if you or the enemy attacks first (true for player attacks first false for player attacks)
let initiative = 0 
function initativechance(max) {
    return Math.floor(Math.random() * max); 
}  
function BattlePreperation() {
    initativechance(2)
}