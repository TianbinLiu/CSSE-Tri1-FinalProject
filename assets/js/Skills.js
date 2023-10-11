// hit and miss are the factor that decide if 
let miss = false 
let hit = false 
//cooldowns for skill 2,3,4 and ultimate 
let cooldown1 = 1
let cooldown2 = 3
let cooldown3 = 2
let cooldown4 = 4 
// variables for skills 2,3,4 and ultimate will be used for vfx and damage 
let skill1 = false
let skill2 = false 
let skill3 = false 
let skill4 = false 
//non functional for now
function chanced(max) {
    return Math.floor(Math.random() * max);
  }
  if (skill1 = true) {
  console.log(chanced(100));
  if (chanced > 50) {
    hit = true
    console.log("critical")
  } else if (chanced < 50) {
    miss = true 
    console.log("miss")
  }
  }
  if (skill2 = true) {
    console.log(chanced(100));
    if (chanced > 50) {
      hit = true
      console.log("critical")
    } else if (chanced < 50) {
      miss = true
      console.log("miss")
    }
    }
    if (skill3 = true) {
      console.log(chanced(100));
      if (chanced > 50) {
        hit = true
        console.log("critical")
      } else if (chanced < 50) {
        miss = true
        console.log("miss") 
      }
      }
      if (skill4 = true) {
        console.log(chanced(100));
        if (chanced >= 50) {
          hit = true
          console.log("critical")
        } else if (chanced <= 49) {
          miss = true 
          console.log("miss")
        }}

      