window.addEventListener('load', function() {

    SpatialNavigation.init();
    SpatialNavigation.add({
      selector: '.focusable'
    });

    if (typeof AndroidBridge !== 'undefined') {
      initializeAndroidTVInput();
  }
   
    // All valid events.
    var validEvents = [
        'sn:willmove',
        'sn:enter-down',
        'sn:enter-up',
      ];

      var eventHandler = function(evt) {
        console.log(evt.type, evt.target, evt.detail);
        if(evt.type == 'sn:enter-down'){
          main.gameToggle()
          gameOver.gameToggle()
          scenePause.gameToggle()
        }
        switch(evt.detail.direction){
          case 'up':
            main.selectorUp()
            scenePause.selectorUp()
            gameOver.selectorUp()
            snake.faceUp()
            break;
          case 'down':
            main.selectorDown()
            gameOver.selectorDown()
            scenePause.selectorDown()
            snake.faceDown()
            break;
            case 'left':
              snake.faceLeft();
            break;
            case 'right':
              snake.faceRight();
            break;
        }
       
      };

      validEvents.forEach(function(type) {
        window.addEventListener(type, eventHandler);
      });
    
    SpatialNavigation.makeFocusable();
    SpatialNavigation.focus();
  });

  function initializeAndroidTVInput(){
AndroidBridge.onKeyEvent(function(event) {

  if (event.isTVKeyEvent) {
      var keyCode = event.keyCode;
      switch (keyCode) {
          case AndroidBridge.KEYCODE_DPAD_CENTER:
            main.gameToggle()
            gameOver.gameToggle()
            scenePause.gameToggle()
          break;
          case AndroidBridge.KEYCODE_DPAD_UP:
            scenePause.selectorUp()
            gameOver.selector()
            main.selectorUp()
            snake.faceUp()
              break;
          case AndroidBridge.KEYCODE_DPAD_DOWN:
            scenePause.selectorUp()
            gameOver.selectorDown()
            main.selectorDown()
            snake.faceDown()
              break;
          case AndroidBridge.KEYCODE_DPAD_LEFT:
            snake.faceLeft();
              break;
          case AndroidBridge.KEYCODE_DPAD_RIGHT:
            snake.faceRight();
              break;
          case AndroidBridge.KEYCODE_BACK:
            snacegame.pauseGame();
            break;
          default:
              break;
      }
  }
});
  }