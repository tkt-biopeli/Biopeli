export default class TopBar{
  constructor({menuView}){
    this.menuView = menuView
  }

  redraw () {
    this.menuView.draw(this.createSections())
  }

  createSections () {
    
  }
}