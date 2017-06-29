
/**
 * Description goes here
 */
export default {

  // configurations for game
  gameWidth: 1024,
  gameHeight: 768,
  localStorageName: 'biopeli',

  // configuration for game length
  gameLength: 1990,

  // configurations for tiles
  tileWidth: 128,
  tileHeight: 128,

  // configurations for map
  madWidthMultiplier: 4,
  mapHeightMultiplier: 4,

  // configurations for menu
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

  // configuration for top bar
  topBarItems: [
    { name: 'time', asset: 'time', type: 'text', widthPct: 1 / 3 },
    { name: 'score', asset: 'score', type: 'text', widthPct: 1 / 3 },
    { name: 'turnip', asset: 'turnip', type: 'bar', widthPct: 1 / 3 }],
  topBarSettings: {
    height: 64,
    paddingWidth: 32,
    iconWidth: 64,
    iconPadding: 16,
    verticalPadding: 16
  },

  // configurations for camera
  cameraSpeed: 400,
  tweenCameraDuration: 500,

  // amount of time between time events
  gameTimerInterval: 1000,

  // configurations for city
  cityInitialDemand: 100,
  cityInitialTurnips: 0,
  cityInitialPopulation: 100000
}
