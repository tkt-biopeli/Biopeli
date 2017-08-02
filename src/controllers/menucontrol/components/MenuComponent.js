export default class MenuComponent {
  constructor ({layoutType, linePadding, sectionPadding, vertical, sections}) {
    this.type = 'submenu'
    this.layoutType = layoutType
    this.linePadding = linePadding
    this.sectionPadding = sectionPadding
    this.vertical = vertical
    this.sections = sections
  }
}
