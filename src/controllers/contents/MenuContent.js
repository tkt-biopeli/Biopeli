export default class MenuContent {

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
}