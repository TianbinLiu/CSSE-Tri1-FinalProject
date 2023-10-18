class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = config.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    let isReach = false;
    Object.values(this.gameObjects).forEach(hero => {
      if (hero.isPlayerControlled) {
        if ((((x) >= (hero.x) && ((x - this.gameObjects["hero"].WallSizex) <= (hero.x + hero.WallSizex))) && ((y >= (hero.y)) && (y <= (hero.y + hero.WallSizey))))) {
          isReach = true;
        }
      }
    })
    Object.values(this.walls).forEach(wall => {
      if (((x >= wall.x) && ((x - this.gameObjects["hero"].WallSizex) <= (wall.x + wall.sizex))) && ((y >= wall.y) && (y <= (wall.y + wall.sizey)))) {
        if (wall.wall) {
          isReach = true;
        }
        if (!this.isCutscenePlaying && wall.event) {
          this.startCutscene(this.cutsceneSpaces[wall.id][0].events, this.cutsceneSpaces[wall.id][0].events.length !== 0);
          wall.event = false;
        }
      }
    })
    return isReach;
  }

  heroisSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.heronextPosition(currentX, currentY, direction);
    let isReach = false;
    Object.values(this.gameObjects).forEach(npc => {
      if (npc.isMounted) {
        if ((((x) >= (npc.Wallx) && ((x - this.gameObjects["hero"].WallSizex) <= (npc.Wallx + npc.WallSizex))) && ((y >= (npc.Wally)) && (y <= (npc.Wally + npc.WallSizey))))) {
          isReach = true;
        }
      }
    })
    Object.values(this.walls).forEach(wall => {
      if (((x >= wall.x) && ((x - this.gameObjects["hero"].WallSizex) <= (wall.x + wall.sizex))) && ((y >= wall.y) && (y <= (wall.y + wall.sizey)))) {
        if (wall.wall) {
          isReach = true;
        }
        if (!this.isCutscenePlaying && wall.event) {
          this.startCutscene(this.cutsceneSpaces[wall.id][0].events, this.cutsceneSpaces[wall.id][0].events.length !== 0);
          wall.event = false;
        }
      }
    })
    return isReach;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach(key => {

      let object = this.gameObjects[key];
      object.id = key;

      //TODO: determine if this object should actually mount
      if (key.isMounted) {
        object.mount(this);
      }
    })
  }

  async startCutscene(events, alive) {
    this.isCutscenePlaying = true;
    canMove = false;
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
        alive: alive,
      })
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
    canMove = true;
  }

  checkForPause(){
    if(canMove && !this.isCutscenePlaying && !pause){
      canMove = false;
      this.isCutscenePlaying = true;
      pause = true;
    }
    else if(pause){
      canMove = true;
      this.isCutscenePlaying = false;
      console.log(this.isCutscenePlaying)
      Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
      pause = false;
    }
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.heronextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      let ifisReach = false;
      if (object.isMounted) {
        if ((((nextCoords.x) >= (object.Wallx) && ((nextCoords.x - hero.WallSizex) <= (object.Wallx + object.WallSizex))) && ((nextCoords.y >= (object.Wally)) && (nextCoords.y <= (object.Wally + (object.WallSizey)))))) {
          ifisReach = true;
        }
        return ifisReach;
      }
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      if (match.ifdialogue && match.alive) {
        this.startCutscene(match.talking[0].events, match.alive)
        match.ifdialogue = false;
      }
    }
  }
  checkForBattle() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.heronextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      if (object.isMounted) {
        if ((((nextCoords.x) >= (object.Wallx) && ((nextCoords.x - object.WallSizex) <= (object.Wallx + object.WallSizex))) && ((nextCoords.y >= (object.Wally)) && (nextCoords.y <= (object.Wally + (object.WallSizey)))))) {
          object.reach = true;
        }
        return object.reach;
      }
    });
    if (!this.isCutscenePlaying && match && match.alive) {
      match.hp -= 1;
      if (match.hp > 0) {
        setTimeout(() => {
          this.startCutscene(match.talking[1].Receiveattackevents, match.alive);
        }, 500); // Delay for 0.5 second (500 milliseconds)
      }
      else if (match.hp <= 0) {
        setTimeout(() => {
          this.startCutscene(match.talking[2].death, match.alive);
        }, 500); // Delay for 0.5 second (500 milliseconds)
        if (match.id === "npcA") {
          match.alive = false;
          npcAAlive = match.alive;
        } 
        if (match.id === "slime") {
          match.alive = false;
          slimeAlive = match.alive;
        }
        if (typeof (this.cutsceneSpaces[match.id]) !== "undefined") {
          this.cutsceneSpaces[match.id][0].events = [];
        }
        match.isMounted = false;
      }
      if(match.monster){
        Battle = true;
        battlepreperation()
        match.behaviorLoop = [];
        this.startCutscene(this.cutsceneSpaces["battle"][0].events)
        canMove = false;
      }

    }
  }


}


window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "https://tianbinliu.github.io/CSSE-Tri1-FinalProject/images/maps/map.JPG",
    upperSrc: "https://tianbinliu.github.io/CSA-FinalProject/images/maps/transparent.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(20),
        y: utils.withGrid(30),
        sizex: 50,
        sizey: 37,
        hp: 2,
        alive: true,
        WallSizex: utils.withGrid(1),
        WallSizey: utils.withGrid(1),
        id: "hero",
      }),
      npcA: new Person({
        isMounted: true,
        x: utils.withGrid(21),
        y: utils.withGrid(32),
        Wallx: utils.withGrid(20),
        Wally: utils.withGrid(32),
        WallSizex: utils.withGrid(1),
        WallSizey: utils.withGrid(1),
        sizex: 48,
        sizey: 48,
        reach: false,
        hp: 2,
        alive: true,
        id: "npcA",
        ifdialogue: true,
        src: "https://tianbinliu.github.io/CSA-FinalProject/images/character/Charakter.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
          { type: "stand", direction: "down", time: 800 },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "I'm busy..." },
              { type: "textMessage", text: "Go away!" },
            ]
          },
          {
            Receiveattackevents: [
              { type: "textMessage", text: "Ouch!!!!" },
              { type: "textMessage", text: "You really want to piss me off?!" },
              { type: "textMessage", text: "I will kill you!" },
            ]
          },
          {
            death: [
              { type: "textMessage", text: "Well, my time is come......." },
            ]
          },
        ],
      }),
      slime: new Person({
        isMounted: true,
        x: utils.withGrid(15),
        y: utils.withGrid(30),
        Wallx: utils.withGrid(13.5),
        Wally: utils.withGrid(28.5),
        WallSizex: utils.withGrid(1),
        WallSizey: utils.withGrid(1),
        sizex: 32,
        sizey: 32,
        hp: 2,
        reach: false,
        alive: true,
        id: "slime",
        monster: true,
        ifdialogue: true,
        src: "https://tianbinliu.github.io/CSSE-Tri1-FinalProject/images/characters/Blueslime.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "walk", direction: "left", spritedirection: "left" },
          { type: "stand", direction: "left", time: 800 },
          { type: "walk", direction: "left", spritedirection: "left" },
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
          { type: "walk", direction: "right", spritedirection: "right" },
          { type: "stand", direction: "right", time: 1200 },
          { type: "walk", direction: "right", spritedirection: "right" },
          { type: "stand", direction: "right", time: 1200 },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "(slime language)I'ha'mham a shaslhalimhame,ha," },
              { type: "textMessage", text: "(slime language)I whawanhanthat thato khakilhallhal phapeophaplhale" },
            ]
          },
          {
            Receiveattackevents: [
              { type: "textMessage", text: "(slime language)Ouchachhah!ha!!ha!!ha!!ha!" },
              { type: "textMessage", text: "(slime language)I whawilhallhal khakilhallhal yhayou!ha!" },
            ]
          },
          {
            death: [
              { type: "textMessage", text: "(slime language)Ahhahhhahhhahhhahhhah!ha!!ha!!ha!!ha!!ha!" },
              
            ]
          },
        ],
      }),
      marketplace: new Person({
        isMounted: true,
        x: utils.withGrid(15),
        y: utils.withGrid(24),
        Wallx: utils.withGrid(15),
        Wally: utils.withGrid(28),
        WallSizex: utils.withGrid(2),
        WallSizey: utils.withGrid(1),
        sizex: 196,
        sizey: 228,
        reach: false,
        id: "marketplace",
        ifdialogue: true,
        src: "https://tianbinliu.github.io/CSSE-Tri1-FinalProject/images/characters/marketplace.png",
      }),
    },
    walls: {
      wall1: new GameObject({
        id: "wall1",
        wall: true,
        x: utils.withGrid(6),
        y: utils.withGrid(5),
        sizex: utils.withGrid(2),
        sizey: utils.withGrid(2),
      }),
      event1: new GameObject({
        id: "npcA",
        event: true,
        x: utils.withGrid(4),
        y: utils.withGrid(8),
        sizex: utils.withGrid(1),
        sizey: utils.withGrid(1),
      }),
      door1: new GameObject({
        id: "door1",
        event: true,
        x: utils.withGrid(4),
        y: utils.withGrid(9),
        sizex: utils.withGrid(1),
        sizey: utils.withGrid(1),
      }),
    },
    cutsceneSpaces: {

      ["npcA"]: [
        {
          events: [
            { who: "npcA", type: "walk", direction: "left", spritedirection: "left" },
            { who: "npcA", type: "stand", direction: "up", time: 500 },
            { type: "textMessage", text: "You can't stay there! " },
            { type: "textMessage", text: "Go straight to the CS classroom. You don't want to be late right?" },
            { type: "textMessage", text: "..." },
            { type: "textMessage", text: "......." },
            { type: "textMessage", text: "..........." },
            { type: "textMessage", text: "Move!!!!!!!!!" },
            { who: "npcA", type: "walk", direction: "right", spritedirection: "right" },
            { who: "npcA", type: "stand", direction: "up", time: 500 },
          ]
        }
      ],
      ["door1"]: [
        {
          events: [
            { type: "changeMap", map: "classroom" }
          ]
        }
      ],
      ["battle"]:[
        {
          events:[
            {type: "changeMap", map: "classroom" }
          ]
        }
      ]
    }
  },
  classroom: {
    lowerSrc: "https://tianbinliu.github.io/CSA-FinalProject/images/maps/classroom.png",
    upperSrc: "https://tianbinliu.github.io/CSA-FinalProject/images/maps/classroomUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(3),
        y: utils.withGrid(4),
        sizex: 50,
        sizey: 37,
        id: "hero",
      }),
    },
    walls: {
      table1left: new GameObject({
        id: "table1left",
        wall: true,
        x: utils.withGrid(0), //table left 1
        y: utils.withGrid(5),
        sizex: utils.withGrid(1),
        sizey: utils.withGrid(5),
      }),
      table1righttop: new GameObject({
        id: "table1righttop",
        wall: true,
        x: utils.withGrid(2), //table left 1
        y: utils.withGrid(5),
        sizex: utils.withGrid(1),
        sizey: utils.withGrid(1),
      }),
      table1rightbutton: new GameObject({
        id: "table1rightbutton",
        wall: true,
        x: utils.withGrid(2), //table left 1
        y: utils.withGrid(9),
        sizex: utils.withGrid(1),
        sizey: utils.withGrid(1),
      }),
      wall2: new GameObject({
        id: "wall2",
        wall: true,
        x: utils.withGrid(0),
        y: utils.withGrid(2.5),
        sizex: utils.withGrid(19),
        sizey: utils.withGrid(1),
      }),
      wall3: new GameObject({
        id: "wall3",
        wall: true,
        x: utils.withGrid(0),
        y: utils.withGrid(3),
        sizex: utils.withGrid(0.5),
        sizey: utils.withGrid(22),
      }),
      wall4: new GameObject({
        id: "wall4",
        wall: true,
        x: utils.withGrid(0),
        y: utils.withGrid(25),
        sizex: utils.withGrid(19),
        sizey: utils.withGrid(0.25),
      }),
      wall5: new GameObject({
        id: "wall5",
        wall: true,
        x: utils.withGrid(18.5),
        y: utils.withGrid(2),
        sizex: utils.withGrid(0),
        sizey: utils.withGrid(25),
      }),

      table2topleft: new GameObject({
        id: "table2topleft",               //table middle 1
        wall: true,
        x: utils.withGrid(6.5),
        y: utils.withGrid(5.5),
        sizex: utils.withGrid(1),
        sizey: utils.withGrid(1),
      }),
      table2topright: new GameObject({
        id: "table2topright",               //table middle 1
        wall: true,
        x: utils.withGrid(11.5),
        y: utils.withGrid(5.5),
        sizex: utils.withGrid(1),
        sizey: utils.withGrid(1),
      }),
      table2buttonleft: new GameObject({
        id: "table2buttonleft",               //table middle 1
        wall: true,
        x: utils.withGrid(6.5),
        y: utils.withGrid(10.5),
        sizex: utils.withGrid(1.5),
        sizey: utils.withGrid(1.5),
      }),
      table2buttonright: new GameObject({
        id: "table2buttonright",               //table middle 1
        wall: true,
        x: utils.withGrid(11.5),
        y: utils.withGrid(10.5),
        sizex: utils.withGrid(1.5),
        sizey: utils.withGrid(1.5),
      }),

      table3: new GameObject({
        id: "table3",               //table left 2
        wall: true,
        x: utils.withGrid(0),
        y: utils.withGrid(12),
        sizex: utils.withGrid(3),
        sizey: utils.withGrid(4.5),
      }),

      table4: new GameObject({
        id: "table4",               //table left 3
        wall: true,
        x: utils.withGrid(0),
        y: utils.withGrid(18),
        sizex: utils.withGrid(3),
        sizey: utils.withGrid(4.5),
      }),

      table5: new GameObject({
        id: "table5",               //table middle 2
        wall: true,
        x: utils.withGrid(7),
        y: utils.withGrid(21.5),
        sizex: utils.withGrid(4),
        sizey: utils.withGrid(3.5),
      }),

      table6: new GameObject({
        id: "table6",               //table right 1
        wall: true,
        x: utils.withGrid(16),
        y: utils.withGrid(5.5),
        sizex: utils.withGrid(3),
        sizey: utils.withGrid(4.5),
      }),

      table7: new GameObject({
        id: "table7",               //table right 2
        wall: true,
        x: utils.withGrid(16),
        y: utils.withGrid(11.5),
        sizex: utils.withGrid(3),
        sizey: utils.withGrid(4.5),
      }),

      table8: new GameObject({
        id: "table8",               //table right 3
        wall: true,
        x: utils.withGrid(16),
        y: utils.withGrid(18.5),
        sizex: utils.withGrid(3),
        sizey: utils.withGrid(4.5),
      }),

      chair1: new GameObject({
        id: "chair1",             //chair left 1
        wall: true,
        x: utils.withGrid(3),
        y: utils.withGrid(7),
        sizex: utils.withGrid(2),
        sizey: utils.withGrid(2),
      }),

      chair2: new GameObject({
        id: "chair2",               // chair middle 1
        wall: true,
        x: utils.withGrid(8),
        y: utils.withGrid(12),
        sizex: utils.withGrid(2),
        sizey: utils.withGrid(2),
      }),

      chair3: new GameObject({
        id: "chair3",               // chair middle 2
        wall: true,
        x: utils.withGrid(12),
        y: utils.withGrid(6),
        sizex: utils.withGrid(2),
        sizey: utils.withGrid(2),
      }),
      chair4: new GameObject({
        id: "chair4",               // chair middle 3
        wall: true,
        x: utils.withGrid(12),
        y: utils.withGrid(9),
        sizex: utils.withGrid(2),
        sizey: utils.withGrid(2),
      }),

      chair5: new GameObject({
        id: "chair5",               // chair left 2
        wall: true,
        x: utils.withGrid(3),
        y: utils.withGrid(13),
        sizex: utils.withGrid(2),
        sizey: utils.withGrid(2),
      }),

      chair6: new GameObject({
        id: "chair6",               // chair left 3
        wall: true,
        x: utils.withGrid(3),
        y: utils.withGrid(18),
        sizex: utils.withGrid(2),
        sizey: utils.withGrid(2),
      }),

      chair7: new GameObject({
        id: "chair7",               // chair left 3
        wall: true,
        x: utils.withGrid(3),
        y: utils.withGrid(20),
        sizex: utils.withGrid(2),
        sizey: utils.withGrid(2),
      }),

      chair8: new GameObject({
        id: "chair8",               // chair left 3
        wall: true,
        x: utils.withGrid(11.75),
        y: utils.withGrid(22.75),
        sizex: utils.withGrid(1.25),
        sizey: utils.withGrid(1.25),
      }),

      bookshelf: new GameObject({
        id: "bookshelf",               // chair left 3
        wall: true,
        x: utils.withGrid(15.75),
        y: utils.withGrid(3),
        sizex: utils.withGrid(2.25),
        sizey: utils.withGrid(1),
      }),
    },
  },
}