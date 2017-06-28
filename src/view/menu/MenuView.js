import LabeledButton from './LabeledButton'
import Text from './Text'
import AnimatedBar from './AnimatedBar'
import Icon from './Icon'

/**
 * Controls drawing of game's menu
 */
export default class MenuView {
  /**
   * Description goes here
   *
   * @param {Phaser.Game} param.game
   * @param {number} param.leftBorderCoordinate the x-coordinate of menu's left border
   * @param {number} param.leftPadding amount of space before line starts
   * @param {number} param.sectionPadding amount of empty space after section
   * @param {number} param.linePadding amount of empty space after line
   * @param {number} param.buttonWidth width of buttons
   * @param {number} param.buttonHeight height of buttons
   */
  constructor ({ game, menuBorderCoordinate, vertical, borderPadding, sectionPadding, linePadding, buttonWidth, buttonHeight, fontSize, background }) {
    this.game = game

    this.vertical = vertical
    this.menuBorderCoordinate = menuBorderCoordinate
    this.borderPadding = borderPadding
    this.buttonWidth = buttonWidth
    this.buttonHeight = buttonHeight
    this.sectionPadding = sectionPadding
    this.linePadding = linePadding
    this.fontSize = fontSize
    this.backgroundSettings = background

    this.menuViewGroup = game.add.group()
    this.menuViewGroup.fixedToCamera = true
    this.game.world.bringToTop(this.menuViewGroup)
    
    this.activeButtons = []
    this.activeTexts = []
    this.activeBars = []
    this.activeIcons = []

    this.createBackground()
  }

  draw (sections) {
    this.menuViewGroup.removeAll(true, true)
    this.activeButtons = []
    this.activeTexts = []
    this.activeBars = []
    this.activeIcons = []

    this.drawPosition = this.sectionPadding

    this.createMenuComponents(sections)
    //
    //
    this.game.world.bringToTop(this.background)
    this.game.world.bringToTop(this.menuViewGroup)
    //
    //
  }

  /**
   * Creates background image of menu
   */
  createBackground () {
    var x = this.menuBorderCoordinate
    var y = 0
    var height = this.game.camera.height
    var width = this.game.camera.width - this.menuBorderCoordinate
    if(!this.vertical){
      y = 0
      x = 0
      height = this.menuBorderCoordinate
      width = this.game.camera.width
    }

    if(this.backgroundSettings.asset != null){
      this.background = this.game.add.sprite(x, y, this.backgroundSettings.asset)
      this.background.fixedToCamera = true
      this.game.world.moveDown(this.background)
    }else{
      this.background = this.game.make.graphics()
      this.background.beginFill(0x000000, 0.25)
      //
      //
      this.background.drawRoundedRect(0, 0, width, height, 1)            
      //
      //
      this.background.endFill()
      this.background.fixedToCamera = true
      this.game.add.existing(this.background)
      this.game.world.bringToTop(this.background)
    }

  }

  createMenuComponents (sections) {
    for(let i = 0 ; i < sections.length ; i++){
      this.createSection(sections[i])

      if(i != sections.length -1){
        this.addSectionPadding()
      }
    }
  }

  createSection (components) {
    for (let i = 0 ; i < components.length ; i++) {
      var component = components[i]
      switch (component.type) {
        case 'text': {
          this.createText(component.text)
          break
        }
        case 'button': {
          this.createButton(component)
          break
        }
        case 'icon': {
          this.createIcon(component)
          break
        }
        case 'bar': {
          this.createAnimatedBar(component)
          break
        }
        default: throw new Error('Invalid menu component type')
      }

      if (i != components.length - 1) {
        this.addLinePadding()
      }
    }
  }

  /**
   * Creates a button with given button action
   *
   * @param {ButtonAction} buttonAction
   */
  createButton (buttonComponent) {
    var coords = this.getNextElementCoordinates()

    var button = new LabeledButton({
      game: this.game,
      viewGroup: this.menuViewGroup,
      label: buttonComponent.name,
      x: coords.x,
      y: coords.y,
      callback: buttonComponent.function,
      context: buttonComponent.context,
      buttonWidth: this.buttonWidth,
      buttonHeight: this.buttonHeight
    })

    this.activeButtons.push(button)

    if(this.vertical){
      this.addPadding(this.buttonHeight)
    }else{
      this.addPadding(this.buttonWidth)
    }
  }

  /**
   * Creates a visible text with given text and font size
   *
   * @param {*} text
   * @param {*} fontSize
   *
   * @return { ??? }
   */
  createText (text) {
    var coords = this.getNextElementCoordinates()

    var tex = new Text({
      game: this.game,
      viewGroup: this.menuViewGroup,
      text: text,
      fontSize: this.fontSize,
      x: coords.x,
      y: coords.y
    })

    this.activeTexts.push(tex)

    if(this.vertical){
      this.addPadding(this.fontSize)
    }else{
      this.addPadding(this.fontSize * text.length)
    }
  }

  createAnimatedBar (animatedBarComponent) {
    var coords = this.getNextElementCoordinates()

    var animatedBar = new AnimatedBar({
      game: this.game,
      group: this.menuViewGroup,
      horizontal: animatedBarComponent.horizontal,
      width: animatedBarComponent.width,
      height: animatedBarComponent.height,
      x: coords.x,
      y: coords.y
    })

    this.activeBars.push(animatedBar)

    if(this.vertical){
      this.addPadding(animatedBarComponent.height)
    }else{
      this.addPadding(animatedBarComponent.width)
    }
  }

  createIcon (iconComponent) {
    var coords = this.getNextElementCoordinates()



    var icon = new Icon({
      game: this.game,
      group: this.menuViewGroup,
      x: coords.x,
      y: coords.y,
      asset: iconComponent.asset
    })

    this.activeIcons.push(icon)

    if(this.vertical){
      this.addPadding(iconComponent.height)
    }else{
      this.addPadding(iconComponent.width)
    }
  }

  getNextElementCoordinates () {
    if(this.vertical){
      return {
        x: this.menuBorderCoordinate + this.borderPadding,
        y: this.drawPosition
      }
    }else{
      return {
        x: this.drawPosition,
        // y: this.menuBorderCoordinate - this.borderPadding
        //
        y: 0
        //
      }
    }
  }

  /**
   * Adds given amount of padding
   *
   * @param {Number} amount
   */
  addPadding (amount) {
    this.drawPosition += amount
  }

  /**
   * Adds predefined padding after line
   */
  addLinePadding () {
    this.addPadding(this.linePadding)
  }

  /**
   * Adds predefined padding after section
   */
  addSectionPadding () {
    this.addPadding(this.sectionPadding)
  }
}
