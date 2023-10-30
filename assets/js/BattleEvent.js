let Battle = false;
let attack = false;
let npcAAlive = true;
let heroAlive = true;
let slimeAlive = true;
let pause = false;
let monsterTurn = null;
let heroTurn = null;
let initative = 0;
//initative decides if you or the enemy attacks first (true for player attacks first false for player attacks)


// currently battle preperation only decides initative 
function BattlePreperationinitative() {
    hitchance();
    if (initative === 1) {
        monsterTurn = true; 
        heroTurn = false 
        console.log (initative)
        console.log (monsterTurn)
    } else if (initative === 0){
        heroTurn = true;
        monsterTurn = false;
        console.log (initative)
        console.log (monsterTurn)
    }
   
}
function battlepreperationui() {
    // sets up the ui at the bottom hand corner 
    // need image for ui and skills // see github issues 
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