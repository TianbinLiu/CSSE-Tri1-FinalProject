class OverworldEvent {
  constructor({ map, event, alive }) {
    this.map = map;
    this.event = event;
    this.alive = alive;
  }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior({
      map: this.map
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time,
      alive: this.alive,
    },)

    //Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    }
    document.addEventListener("PersonStandComplete", completeHandler)
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior({
      map: this.map
    }, {
      type: "walk",
      direction: this.event.direction,
      spritedirection: this.event.spritedirection,
      alive: this.alive,
      retry: true
    })

    //Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    }
    document.addEventListener("PersonWalkingComplete", completeHandler)
  }


  textMessage(resolve) {
    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve()
    })
    message.init(document.querySelector(".game-container"))
  }

  changeMap(resolve) {
    const sceneTransition = new SceneTransition();
    sceneTransition.init(document.querySelector(".game-container"), () => {
    this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
    resolve();
      sceneTransition.fadeOut();
    })
  }


  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve)
    })
  }

}