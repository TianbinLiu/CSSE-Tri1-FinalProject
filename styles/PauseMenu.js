class PauseMenu {
  constructor({ onComplete }) {
    this.onComplete = onComplete;
  }

  getOptions(pageKey) {
    if (pageKey === "root") {
      return [
        {
          label: "Close",
          description: "Close the pause menu",
          handler: () => {
            this.close();
          },
        },
      ];
    }

    // Additional options for other cases can be added here if needed.

    return [];
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("PauseMenu");
    this.element.innerHTML = (`
      <h2>Pause Menu</h2>
    `);
  }

  close() {
    this.esc?.unbind();
    // Additional cleanup or actions can be performed here if needed.
    this.element.remove();
    this.onComplete();
  }

  async init(container) {
    this.createElement();
    container.appendChild(this.element);

    utils.wait(200);
    this.esc = new KeyPressListener("Escape", () => {
      this.close();
    });
  }
}
