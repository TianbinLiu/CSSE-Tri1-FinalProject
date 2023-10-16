let Battle = false;
let attack = false;
let npcAAlive = true;
let heroAlive = true;
let slimeAlive = true;
//initative decides if you or the enemy attacks first (true for player attacks first false for player attacks)

function initativechance(max) {
    return Math.floor(Math.random() * max); 
}  
// currently battle preperation only decides initative 
function BattlePreperation() {
   if (battle = true) { 
    var initative = initativechance(2)
    if (initative > 1) {
        // let the monster attack first 
    } else {
        //let the hero attack first 
    }
   }
}
