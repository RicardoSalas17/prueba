const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let interval
let frames = 0
let gravity = 8.9
const obstacles = []
const batsGen = []
let counter = 0
let batsPosition =[]
onload = () => {
  update()
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function megaManAnimation() {
   if (frames % 40 === 0) {
     if (megaMan.animate > 0) {
      megaMan.animate = 0
    } else {
      frames++
    }
    if(megaMan2.animate > 0){
      megaMan2.animate = 0
     }else {
       frames++
     }
   }
   
}

// function badGuyAnimation() {
//   if (frames % 15 === 0) {
//     if (badGuy.animate === 15) {
//      badGuy.animate =  0
//    } else {
     
//      if(megaMan.x <= 366){
//        if (badGuy.x === 0){
//          badGuy.x = 0
//          badGuy.animate++
//        }else{
//        badGuy.x-=50
//        badGuy.animate++
//        }
//       }
//       else if(megaMan.x > 733){
//         if (badGuy.x === canvas.width  - 6400 / 16){
//           badGuy.x =canvas.width  - 6400 / 16
//           badGuy.animate++
//         }else{
//         badGuy.x+=50
//         badGuy.animate++
//         }
//       }
//       else if (megaMan.x< 733 && megaMan.x > 366) {

//          if(badGuy.x === 280){
//           badGuy.x = 280
//            badGuy.animate++
//          } else if (badGuy.x < 300){
//           badGuy.x+=50
//           badGuy.animate++
//          } else if(badGuy.x > 300 ){
//           badGuy.x-=50
//           badGuy.animate++

        
//          } 
//       }
//     }}}



function checkColitions() {
  if (megaMan.x <= 0) {
    megaMan.x = 0
  }else if (megaMan.x + 100 >= canvas.width) {
    megaMan.x = canvas.width  - 100
  } 
  if (megaMan.y <= 0) {
    megaMan.y = 0
    megaMan.capturaY = 0
  }


  
  if(megaMan2.x <= 0){
    megaMan2.x = 0
  } else if( megaMan2.x + 100 >= canvas.width){
    megaMan2.x = canvas.width  - 100
  }

  if (megaMan2.y <= 0) {
    megaMan2.y = 0
    megaMan2.capturaY = 0
  }

  // if(badGuy.x <= 0){
  //   badGuy.x = 0
  // } else if( badGuy.x + 6400 / 16 >= canvas.width){
  //   badGuy.x = canvas.width  - 6400 / 16
  // }

  obstacles.forEach((munition, i) => {
    if (batsPosition.isTouching(munition)) {
      obstacles.splice(i, 1)
      batsPosition.hp--
    }
  })


  batsGen.forEach((batsPosition, i) => {
    if (megaMan.isTouching(batsPosition )) {
      batsGen.splice(i, 1)
      megaMan.hp--
    }
  })

  batsGen.forEach((batsPosition, i) => {
    if (megaMan2.isTouching(batsPosition )) {
      batsGen.splice(i, 1)
      megaMan2.hp--
    }
  })


}
function batsitoDead() {
  if (batsPosition.hp === 0) {
    counter++
    batsPosition.height= 0
    batsPosition.hp = 1 
  }
}

function gameOver() {
  if (megaMan.hp === 0) {
    clearInterval(interval)
    ctx.font = '30px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText('Game Over', canvas.width / 2 - 30, canvas.height / 2 - 10)
  } 
   if (megaMan2.hp === 0){
    clearInterval(interval)
    ctx.font = '30px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText('Game Over', canvas.width / 2 - 30, canvas.height / 2 - 10)

  }
}




function drawShots() {
  obstacles.forEach(munition => munition.draw())
 
}




function generateBats() {
  if (frames % 100 === 0) {
    const randomPosition = Math.floor(Math.random() * canvas.height) + 50
    batsPosition =  new Batsito(randomPosition)
    batsGen.push(batsPosition)
    
  }
}


function drawBats() {
  batsGen.forEach(batsPosition  => batsPosition.draw())
}





function update() {
  frames++
  clearCanvas()
  board.draw()
  generateBats()
  drawBats()
  megaManAnimation()
  // badGuyAnimation()
  megaMan.draw()
  megaMan2.draw()
  megaMan.x += megaMan.vx
  megaMan.y += megaMan.vy
  megaMan.y += gravity

  megaMan2.x += megaMan2.vx
  megaMan2.y += megaMan2.vy
  megaMan2.y += gravity
  checkColitions()

  // badGuy.draw()
  //  badGuy.x += badGuy.vx
  //  badGuy.y += badGuy.vy
  // badGuy.y += gravity

  drawShots()
  batsitoDead()
 
}

interval = setInterval(update, 1000/ 120)





class Board {
    constructor() {
      this.x = 0
      this.y = 0
      this.width = canvas.width
      this.height = canvas.height
      this.img = new Image()
      this.img.onload = () => {
        this.draw()
      }
    }
    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
  }
  

  class Megaman {
    constructor() {
      this.status= "right"
      this.width = 100
      this.height = 100
      this.y = -canvas.height 
      this.capturaY = -canvas.height
      this.x = 8
      this.vx = 0
      this.vy = 0
      this.animate = 0
      this.position = 0
      this.jumpStrenght = 26
      this.hp = 3
      this.img = new Image()
      this.img.src = '../Images/megamanstand-right.png'
      this.img.onload = () => {
        this.draw()
      }
    }
    draw() {
      if (this.y > canvas.height - this.height) {
        this.y = canvas.height - this.height
        this.capturaY =  canvas.height - this.height
      } 
    
      else {
        this.vy++
        
        
      }
      ctx.drawImage(
        this.img,
         (this.animate * 1400) / 14,
        this.position,
        1400 / 14,
        100,
        this.x,
        this.y,
        this.width,
        this.height
      )
      
    }

      stand(){
        this.width = 100
        this.height = 100
        this.img.src = '../megamanstand-right'
        this.animate ++
        
      }
      
      
      moveLeft() {
        this.status= "left"
        this.width = 100
        this.height = 100
        this.vx -= 1
        this.position = 1
        this.img.src = '../Images/mmx_x-left.png'
        this.animate ++

    }
    moveRight() {
      this.status= "right"
      this.width = 100
      this.height = 100
      this.vx += 1
      this.position = 1
      this.img.src = '../Images/mmx_x-right.png'
      this.animate ++

      
    }
    jump() {
      this.vy = -this.jumpStrenght
      this.width = 200
      this.height = 200
      ctx.drawImage(
        this.img,
         (this.animate * 1600) / 16,
        this.position,
        1600 / 16,
        129,
        this.x,
        canvas.height + 129,
        this.width,
        this.height
      )
       this.img.src = '../Images/mmx-x-jump-right.png'
       this.img.onload = () => {
        this.draw()
      }
      this.animate ++



      
      
    }
    shot(){
      if(this.status === "right"){
      if(frames % 1 === 0){
        const munition = new Municion ( this.x + 100 ,   this.capturaY + 20)
        obstacles.push(munition)
      }
      this.width = 100
      this.height = 100
      this.img.src = '../Images/shot-right.png'
      this.animate ++}
    
      



      if(this.status === "left"){
        if(frames % 1 === 0){
          const munition = new Municion ( this.x + 100 ,   this.capturaY + 20)
          obstacles.push(munition)
        }
        this.width = 100
        this.height = 100
        this.img.src = '../Images/shot-left.png'
        this.animate ++}
    }


    isTouching(obstacle) {
      // algo está tratando de ocupar el mismo espacio en canvas que flash
      return (
        this.x < obstacle.x + obstacle.width &&
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height &&
        this.y + this.height > obstacle.y
        )
    }



  }


  class BadGuy {
    constructor() {
      this.width = 300
      this.height = 300
      this.y = 90
      this.x = 200
      this.vx = 0
      this.vy = 0
      this.animate = 0
      this.position = 0
      this.hp = 20
      this.img = new Image()
      this.img.src = '../Images/badguy.png'
      this.img.onload = () => {
        this.draw()
      }
    }
    draw() {
      
      ctx.drawImage(
        this.img,
        (this.animate * 6400 )/ 16,
       this.position,
       6400 / 16,
       300,
       this.x,
       this.y,
       this.width,
       this.height
      )
      
    }



  }

  class Municion {
    constructor(x , y) {
      this.x = x
      this.y = y
      this.width = 50
      this.height = 50
      this.img = new Image()
      this.img.src = '../Images/municion.png'
      this.img.onload = () => {
        this.draw()
      }
    }
    draw() {
      if(megaMan.status === "right"){
       if(megaMan.status === "right") {
      this.x += 9}
      else if(megaMan.status === "left"){
        this.x += 9
      }
      ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height)}

       if(megaMan2.status === "right"){
        if(megaMan2.status === "right") {
          this.x += 9}
          else if(megaMan2.status === "left"){
            this.x += 9
          }
        ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height)}


          if(megaMan.status === "left"){
            if(megaMan.status === "right") {
              this.x -= 9}
              else if(megaMan.status === "left"){
                this.x -= 9}
            ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height)}

            if(megaMan2.status === "left"){
              if(megaMan2.status === "right") {
                this.x -= 9}
                else if(megaMan2.status === "left"){
                  this.x -= 9
                }
            ctx.drawImage(
              this.img,
              this.x,
              this.y,
              this.width,
              this.height)}
      
    }
  }



  class Batsito {
    constructor(y) {
      this.x = canvas.width
      this.y = y
      this.width = 140
      this.height = 140
      this.animate =0
      this.hp = 1
      this.img = new Image()
      this.img.src = '/Images/batsito.png'
    }
    draw() {
      this.x--
      ctx.drawImage(
        this.img,
        (this.animate*440) / 11,
        0,
        440 / 11,
        60,
         this.x,
          this.y,
           this.width,
            this.height)
    }
    isTouching(obstacle) {
      // algo está tratando de ocupar el mismo espacio en canvas que flash
      return (
        batsPosition.x < obstacle.x + obstacle.width &&
        batsPosition.x + batsPosition.width > obstacle.x &&
        batsPosition.y < obstacle.y + obstacle.height &&
        batsPosition.y + batsPosition.height > obstacle.y
        )
        
    }
 
  
}
 


 const board = new Board()
const megaMan = new Megaman()
const megaMan2 = new Megaman()
// const badGuy = new BadGuy()
let bat = new Batsito()






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

 
