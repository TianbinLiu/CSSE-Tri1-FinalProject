// sets the variables 
let Battle = false;
let attack = false;
let npcAAlive = true;
let heroAlive = true;
let slimeAlive = true;
let pause = false;
let monsterTurn = null;
let heroTurn = null;
//initative decides if you or the enemy attacks first (true for player attacks first false for player attacks)



function BattlePreperationinitative() {
    var initative = hitchance(3)
    if (initative > 1) {
        monsterTurn = true; 
        heroTurn = false 
        console.log (initative)
    } else {
        heroTurn = true;
        monsterTurn = false;
        console.log (initative)
    }
   
}
function battlepreperationui() {
    // sets up the ui at the bottom hand corner 
    // need image for ui and skills
}
function battlepreperation() {
    if (battle = true) {
    canMove = false  
}
}
// INbattle functions 
function INbattleslimeattack1() {
  //code for slime attack 1 
}
function INbattleslimeattack2() {
    //code for slime attack 2  
}