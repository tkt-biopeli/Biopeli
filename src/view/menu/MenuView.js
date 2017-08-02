import LabeledButton from './menuitems/LabeledButton'
import Text from './menuitems/Text'
import AnimatedBar from './menuitems/AnimatedBar'
import Icon from './menuitems/Icon'

import StaticLayout from './layouts/StaticLayout'
import StackingLayout from './layouts/StackingLayout'

/**
 * Component that draws menu with given component list and with wanted layout
 */
export default class MenuView {
  constructor ({ game, layout, background, backgroundInTheMiddle }) {
    this.game = game
    this.layout = layout
    this.backgroundInTheMiddle = backgroundInTheMiddle
    this.menuViewGroup = game.add.group()
    this.menuViewGroup.fixedToCamera = true
    this.game.world.bringToTop(this.menuViewGroup)
    this.activeMenuitems = new Map()
    this.createBackground(background)
  }

  /**
   * Creates background image of menu
   */
  createBackground (backgroundAsset) {
    var menuRect = this.layout.menuRect

    if (backgroundAsset != null) {
      var x = menuRect.x
      var y = menuRect.y
      if (this.backgroundInTheMiddle) {
        var aHeight = this.game.cache.getImage(backgroundAsset).height
        var aWidth = this.game.cache.getImage(backgroundAsset).width
        var mHeight = menuRect.height
        var mWidth = menuRect.width

        y = y + (mHeight - aHeight) / 2
        x = x + (mWidth - aWidth) / 2
      }
      this.background = this.game.add.sprite(x, y, backgroundAsset)
      this.background.fixedToCamera = true
      this.game.world.moveDown(this.background)
    } else {
      this.background = this.game.make.graphics()
      this.background.beginFill(0x000000, 0.25)
      this.background.drawRoundedRect(
        menuRect.x, menuRect.y, menuRect.width, menuRect.height, 1
      )
      this.background.endFill()
      this.background.fixedToCamera = true
      this.game.add.existing(this.background)
      this.game.world.bringToTop(this.background)
    }
  }

  /**
   * Redraws the menu with given components
   * @param {*} sections
   */
  draw (sections) {
    this.active = new Set()
    this.activeSections = []
    this.activeButtons = []
    this.activeTexts = []
    this.layout.init(sections)
    this.updateMenu(sections)
    this.game.world.bringToTop(this.background)
    this.game.world.bringToTop(this.menuViewGroup)
  }

  /**
   * Iterates through given sections
   * @param {*} sections
   */
  updateMenu (sections) {
    var newSections = new Map()

    for (let i = 0; i < sections.length; i++) {
      var section = sections[i]

      var menuitems = this.activeMenuitems.has(section.name) 
        ? this.updateSection(this.activeMenuitems.get(section.name), section.components)
        : this.createSection(section.components)

      this.activeSections.push(menuitems)
      newSections.set(section.name, menuitems)

      if (i !== sections.length - 1) {
        this.layout.afterSection()
      }
    }

    this.removeExtraSections(this.activeMenuitems, newSections)
    this.activeMenuitems = newSections
  }

  /**
   * Iterates through given components in a section
   * @param {*} components
   */
  createSection (components) {
    var menuitems = []
    for (let i = 0; i < components.length; i++) {
      menuitems.push(this.createComponent(components[i]))

      if (i !== components.length - 1) {
        this.layout.afterLine()
      }
    }

    return menuitems
  }

  createComponent (component) {
    var coords = this.layout.nextComponentLocation(component)

    return this.componentFunction(component.type, 'create')
      .call(this, coords, component)
  }

  componentFunction (type, prefix) {
    return this[prefix + type.charAt(0).toUpperCase() + type.slice(1)]
  }

  /**
   * Creates a button with given button action
   * @param {ButtonAction} buttonAction
   */
  createButton (coords, buttonComponent) {
    var button = new LabeledButton({
      game: this.game,
      viewGroup: this.menuViewGroup,
      label: buttonComponent.name,
      fontSize: buttonComponent.fontSize,
      asset: buttonComponent.asset,
      x: coords.x,
      y: coords.y,
      callback: buttonComponent.function,
      context: buttonComponent.context,
      buttonWidth: buttonComponent.width,
      buttonHeight: buttonComponent.height
    })
    this.activeButtons.push(button)
    return button
  }

  /**
   * Creates a visible text with given text and font size
   * @param {*} text
   * @param {*} fontSize
   * @return { ??? }
   */
  createText (coords, textComponent) {
    var anchor

    if (this.layout.vertical) {
      anchor = {
        x: 0.5,
        y: 0
      }
    } else {
      anchor = {
        x: 0,
        y: 0.5
      }
    }

    var tex = new Text({
      game: this.game,
      menuSize: this.layout.menuRect.width,
      viewGroup: this.menuViewGroup,
      text: textComponent.text,
      fontSize: textComponent.fontSize,
      x: coords.x,
      y: coords.y,
      anchor: anchor
    })

    this.activeTexts.push(tex)
    return tex
  }

  /**
   * Creates a new animated bar to the menu
   * @param {*} animatedBarComponent
   */
  createBar (coords, animatedBarComponent) {
    return new AnimatedBar({
      game: this.game,
      group: this.menuViewGroup,
      vertical: animatedBarComponent.vertical,
      width: animatedBarComponent.width,
      height: animatedBarComponent.height,
      x: coords.x,
      y: coords.y,
      percent: animatedBarComponent.percent
    })
  }

  /**
   * Creates new icon to the menu
   * @param {*} iconComponent
   */
  createIcon (coords, iconComponent) {
    return new Icon({
      game: this.game,
      group: this.menuViewGroup,
      x: coords.x,
      y: coords.y,
      asset: iconComponent.asset
    })
  }

  createSubmenu (coords, menuComponent) {
    var layout
    if (menuComponent.layoutType === 'static') {
      layout = new StaticLayout({
        menuRect: coords,
        linePadding: menuComponent.linePadding,
        vertical: menuComponent.vertical
      })
    } else {
      layout = new StackingLayout({
        menuRect: coords,
        linePadding: menuComponent.linePadding,
        sectionPadding: menuComponent.sectionPadding,
        vertical: menuComponent.vertical
      })
    }
    
    var menu = new MenuView({
      game: this.game,
      layout: layout,
      background: null
    })

    menu.draw(menuComponent.sections)

    return menu
  }

  updateSection (section, components) {
    var menuitems = []

    var i = 0
    for (let j = 0; j < components.length; j++) {
      var component = components[j]
      var menuitem = section[i]
      if (i < section.length && menuitem.type === component.type) {
        if (component.type === 'button' && 
            (component.asset !== menuitem.asset || 
            component.function !== menuitem.callback)) {
          menuitems.push(this.createComponent(component))
          menuitem.destroy()
        } else {
          menuitems.push(menuitem)
          this.updateComponent(menuitem, component)
        }
        i++
      } else {
        menuitems.push(this.createComponent(component))
      }

      if (j !== components.length - 1) {
        this.layout.afterLine()
      }
    }

    this.removeExtraMenuitems(section, i)

    return menuitems
  }

  removeExtraMenuitems (section, startIndex) {
    for (let i = section.length - 1; i >= startIndex; i--) {
      section[i].destroy()
      section.pop()
    }
  }

  updateComponent (menuitem, component) {
    var coords = this.layout.nextComponentLocation(component)

    this.componentFunction(component.type, 'update')
      .call(this, coords, component, menuitem)
  }

  updateButton (coords, component, button) {
    button.update(component.name, component.fontSize, coords.x, coords.y,
      component.function, component.context, component.width, component.height)
    this.activeButtons.push(button)
  }

  updateText (coords, component, text) {
    text.update(component.text, component.fontSize, coords.x, coords.y)
    this.activeTexts.push(text)
  }

  updateIcon (coords, component, icon) {
    icon.update(coords.x, coords.y)
  }

  updateBar (coords, component, bar) {
    bar.update(coords.x, coords.y, component.percent)
  }

  updateSubmenu (coords, component, menu) {
    menu.layout.menuRect = coords
    menu.draw(component.sections)
  }

  removeExtraSections (oldSections, newSections) {
    for (let key of oldSections.keys()) {
      if (!newSections.has(key)) this.destroySection(oldSections.get(key))
    }
  }

  destroySection (menuitems) {
    for (let menuitem of menuitems) {
      menuitem.destroy()
    }
  }

  destroy () {
    for (let section of this.activeMenuitems.values()) {
      this.destroySection(section)
    }
  }
}
