// hit and miss are the factor that decide if 
let miss = false 
let hit = false 
//cooldowns for skill 2,3,4 and ultimate 
let cooldown1 = 1
let cooldown2 = 3
let cooldown3 = 2 
// variables for skills 2,3,4  will be used for vfx and damage 
let skill1 = false
let skill2 = false 
let skill3 = false 
let damage1 = 45
let damage2 = 90
let damage3 = 20
let damage4 = 350
// random number generator 
function hitchance(max) {
   return Math.floor(Math.random() * max);   
}
//functions for skills for now checks if it hitted or m
function Skillmanager1() {
  var hitcheck1 = hitchance(100)
  if (skill1 = true) {
  console.log(hitcheck1);
  if (hitcheck1 > 50) {
    hit = true
    miss = false
    console.log("critical")
  } else if (hitcheck1 < 50) {
    miss = true 
    hit = false
    console.log("miss")
  }
  }
}
function Skillmanager2() {
  var hitcheck2 = hitchance(100)
  if (skill2 = true) {
    console.log(hitcheck2);
    if (hitcheck2 > 50) {
      hit = true
      miss = false
      console.log("critical")
    } else if (hitcheck2 < 50) {
      miss = true
      hit = false
      console.log("miss")
    }
    }
  }
function Skillmanager3() {
  var hitcheck3 = hitchance(100)
    if (skill3 = true) {
      console.log(hitcheck3);
      if (hitcheck3 > 50) {
        hit = true
        miss = false
        console.log("critical")
      } else if (hitcheck3 < 50) {
        miss = true
        hit = false
        console.log("miss") 
      }
      }
    }


      