export default class RadioButtonComponent {
  constructor ({activeAsset, inactiveAsset, selectedButton, buttonInfos}) {
    this.type = 'radio'
    this.activeAsset = activeAsset
    this.inactiveAsset = inactiveAsset
    this.selectedButton = selectedButton
    this.buttonInfos = buttonInfos
  }
}
