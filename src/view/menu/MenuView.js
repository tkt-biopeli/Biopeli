import LabeledButton from './menuitems/LabeledButton'
import Text from './menuitems/Text'
import AnimatedBar from './menuitems/AnimatedBar'
import Icon from './menuitems/Icon'

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
  constructor ({ game, layout, background }) {
    this.game = game

    this.layout = layout
    this.background = background

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

    this.layout.init(sections)
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
    var menuRect = this.layout.menuRect

    if(this.background != null){
      this.background = this.game.add.sprite(menuRect.x, menuRect.y, this.background)
      this.background.fixedToCamera = true
      this.game.world.moveDown(this.background)
    }else{
      this.background = this.game.make.graphics()
      this.background.beginFill(0x000000, 0.25)
      //
      //
      this.background.drawRoundedRect(menuRect.x, menuRect.y, menuRect.width, menuRect.height, 1)            
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
        this.layout.afterSection()
      }
    }
  }

  createSection (components) {
    for (let i = 0 ; i < components.length ; i++) {
      var component = components[i]
      switch (component.type) {
        case 'text': {
          this.createText(component)
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
        this.layout.afterLine()
      }
    }
  }

  /**
   * Creates a button with given button action
   *
   * @param {ButtonAction} buttonAction
   */
  createButton (buttonComponent) {
    var coords = this.layout.nextComponentLocation(buttonComponent)

    var button = new LabeledButton({
      game: this.game,
      viewGroup: this.menuViewGroup,
      label: buttonComponent.name,
      fontSize: buttonComponent.fontSize,
      x: coords.x,
      y: coords.y,
      callback: buttonComponent.function,
      context: buttonComponent.context,
      buttonWidth: buttonComponent.width,
      buttonHeight: buttonComponent.height
    })

    this.activeButtons.push(button)
  }

  /**
   * Creates a visible text with given text and font size
   *
   * @param {*} text
   * @param {*} fontSize
   *
   * @return { ??? }
   */
  createText (textComponent) {
    var coords = this.layout.nextComponentLocation(textComponent)

    var anchor
    if(this.layout.vertical){
      anchor = {
        x: 0.5,
        y: 0
      }
    }else{
      anchor = {
        x: 0,
        y: 0.5
      }
    }

    var tex = new Text({
      game: this.game,
      viewGroup: this.menuViewGroup,
      text: textComponent.text,
      fontSize: textComponent.fontSize,
      x: coords.x,
      y: coords.y,
      anchor: anchor
    })

    this.activeTexts.push(tex)
  }

  createAnimatedBar (animatedBarComponent) {
    var coords = this.layout.nextComponentLocation(animatedBarComponent)

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
  }

  createIcon (iconComponent) {
    var coords = this.layout.nextComponentLocation(iconComponent)

    var icon = new Icon({
      game: this.game,
      group: this.menuViewGroup,
      x: coords.x,
      y: coords.y,
      asset: iconComponent.asset
    })

    this.activeIcons.push(icon)
  }
}
