export default class StackingLayout {
  constructor ({menuRect, linePadding, sectionPadding, vertical}) {
    this.menuRect = menuRect
    
    if(vertical){
      this.perpendicularSize = menuRect.width
      this.parallelSize = menuRect.height
    }else{
      this.perpendicularSize = menuRect.height
      this.parallelSize = menuRect.width
    }

    this.linePadding = linePadding
    this.sectionPadding = sectionPadding
    this.vertical = vertical
  }

  init(){
    this.drawLocation = this.sectionPadding
  }

  nextComponentLocation(component){
    var location = this.coordinates(component)
    this.addComponentPadding(location)
    return location
  }

  afterLine(){
    this.drawLocation += this.linePadding
  }

  afterSection(){
    this.drawLocation += this.sectionPadding
  }

  addComponentPadding(component){
    if(this.vertical) this.drawLocation += component.height
    else this.drawLocation += component.width
  }

  coordinates(component){
    if(this.vertical){
      return {
        x: (this.menuLocation + this.menuPerpendicularSize - component.width) / 2,
        y: this.drawLocation
      }
    }else{
      return {
        x: this.drawLocation,
        y: (this.menuLocation + this.menuPerpendicularSize - component.height) / 2
      }
    }
  }
}