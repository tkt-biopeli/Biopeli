
/**
 * Description goes here
 */
export default {

  //configurations for game
  gameWidth: 1024,
  gameHeight: 768,
  localStorageName: 'biopeli',

  //configurations for tiles
  tileWidth: 128,
  tileHeight: 128,

  //configurations for map
  madWidthMultiplier: 4,
  mapHeightMultiplier: 4,

  //configurations for menu
  menuWidth: 256,
  menuLeftPadding: 35,
  menuButtonWidth: 189,
  menuButtonHeight: 66,
  menuTextStartingPoint: 0.5,
  font: '16px Arial',
  textColor: '#ffff00',
  textAlignment: 'center',
  linePadding: 8,
  sectionPadding: 12,
  menuFontSize: 16,

  //configuration for top bar
  topBarItems: [
    { name: "time", type: "text" },
    { name: "score", type: "text" },
    { name: "turnip", type: "bar" }],
  topBarHeight: 64,


  
  //configurations for camera
  cameraSpeed: 400,
  tweenCameraDuration: 500,

  //amount of time between time events
  gameTimerInterval: 1000

}
