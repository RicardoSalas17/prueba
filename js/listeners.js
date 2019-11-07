document.onkeydown = e => {
    switch (e.keyCode) {
      case 37:
        megaMan.moveLeft()
        stay = "left"
        
        return
      case 39:
        megaMan.moveRight()
        stay = "right"
        return
      case 38:
        megaMan.jump()
        return
        case 77:
            megaMan.shot()
            console.log(megaMan.status)
            console.log(megaMan.status)
          return

          case 90:
        megaMan2.moveLeft()
        stay2 = "left"
        
        return
      case 88:
        megaMan2.moveRight()
       stay2 = "right"
        return
      case 83:
        megaMan2.jump()
        return
        case 32:
          megaMan2.shot()
          console.log(megaMan2.status)
          
          return
    }
  }
  
  document.onkeyup = e => {
    megaMan.vx = 0
    megaMan.position = 0
    megaMan2.vx = 0
    megaMan2.position = 0

  }


  