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
  
