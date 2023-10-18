let Battle = false;
let attack = false;
let npcAAlive = true;
let heroAlive = true;
let slimeAlive = true;
let pause = false;
//initative decides if you or the enemy attacks first (true for player attacks first false for player attacks)

function initativechance(max) {
    return Math.floor(Math.random() * max); 
}  
function battlepreperation() {
    if (battle = true) {
    canMove = false 
}
}
// currently battle preperation only decides initative 
function BattlePreperationinitative() {
    var initative = initativechance(2)
    if (initative > 1) {
        // let the monster attack first 
    } else {
        //let the hero attack first 
    }
   
}
function battlepreperationformation() {

    //set a new scene with a new background for combat 
    // need image for that 
    // also makes the enemy be all the way in the middle right and player on the middle left 
    // see github issues 
    
}
function battlepreperationui() {
    // sets up the ui at the bottom hand corner 
    // need image for ui and skills // see github issues 
}
// INbattle functions 
function INbattleslimeattack1() {
  //code for slime attack 1 
}
function INbattleslimeattack2() {
    //code for slime attack 2  
}