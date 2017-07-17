/**
 * A base class for content creators. Content creators use Controller's interface
 * to create the blueprint of the menu for the menuView to draw.
 */
export default class Content {
  setOwner (owner) {
    this.owner = owner
  }

  section () {
    this.owner.section()
  }

  icon (asset) {
    this.owner.icon(asset)
  }

  text (text, size) {
    this.owner.text(text, size)
  }

  animatedBar (width, height, horizontal, percent) {
    this.owner.animatedBar(width, height, horizontal, percent)
  }

  button (name, functionToCall, context, asset) {
    this.owner.button(name, functionToCall, context, asset)
  }

  add (component) {
    this.owner.add(component)
  }

  addSection (section) {
    this.owner.addSection(section)
  }

  addSections (sections) {
    this.owner.addSections(sections)
  }

  /**
   * Helper function to format a number to not have decimals.
   *
   * @param {*} number
   */
  format (number) {
    return number.toFixed(0)
  }
}
