class GameObject {
  constructor(config) {
    this.id = config.id || null;
    this.isMounted = config.isMounted || false;
    this.direction = config.direction || "right";
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.sizex = config.sizex || 0;
    this.sizey = config.sizey || 0;
    this.Wallx = config.Wallx || 0;
    this.Wally = config.Wally || 0;
    this.WallSizex = config.WallSizex || 0;
    this.WallSizey = config.WallSizey || 0;
    this.wall = config.wall || false;
    this.alive = config.alive || true;
    this.hp= config.hp || 1;
    this.reach = config.reach || false;
    this.monster = config.monster || false;
    this.ifdialogue = config.ifdialogue || false;
    this.sprite = new Sprite({
      gameObject: this,
      id: config.id || null,
      sizex: config.sizex || 0,
      sizey: config.sizey || 0,
      alive: config.alive || true,
      src: config.src || "https://tianbinliu.github.io/CSA-FinalProject/images/character/adventurer-v1.5-Sheetflip.png",
    });

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;

    this.talking = config.talking || [];
    this.event = config.event || false;
  }


  mount(map) {
    //If we have a behavior, kick off after a short delay
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10)
  }

  update() { }

  async doBehaviorEvent(map) {
    //Don't do anything if there is a more important cutscene or I don't have config to do anything
    //anyway.
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
      return;
    }

    //Setting up our event with relevant info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    //Create an event instance out of our next event config
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    //Setting the next event to fire
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    //Do it again!
    this.doBehaviorEvent(map);


  }
}