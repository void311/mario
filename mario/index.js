

const image = new Image();
image.src = "./pics/platform.jpeg";
console.log('====================');
console.log(image);
console.log('====================');
const canvas=document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.7
class Player {
    constructor() {
        this.position = {
            x:120,
            y:120
        }
        this.velocity = {
            x:0,
            y:0
        }

        this.width = 40
        this.height = 40
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y 

        if (this.position.y +this.height +
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform {
    constructor({x, y ,image}) {
        this.position={
            x: x,
            y: y,

        }

        this.width = 200
        this.height=20
        this.image = image;
    }

    draw(){
       // c.fillStyle = 'yellow'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.imgae , this.position.x , this.position.y);
    }
}

const player = new Player()
const platforms =[new Platform(
    {x:200 ,
     y:300 ,
     image,
     
    }), new Platform({x:300, y:100 , image})]

const keys ={
    right: {
        pressed: false
    },
    left: {
        pressed: false 
    }    
}

let scrolloffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update() 
    platforms.forEach((platform) => {
        platform.draw()
    })
    player.draw()

    if (keys.right.pressed && player.position.x<400){
        player.velocity.x = 4
    } else if (keys.left.pressed && player.position.x>100){
        player.velocity.x= -4
        }    else {
            player.velocity.x = 0

            if(keys.right.pressed){
                scrolloffset +=4
                platforms.forEach((platform) => {
                    platform .position.x -= 4
                })
            } else if(keys.left.pressed){
                scrolloffset -=4
                platforms.forEach((platform) => {
                    platform.position.x += 4
                })
            }
        } 

        // platform par chadna and girna 
    platforms.forEach((platform) => {
        if (
            player.position.y + player.height
            <= platform.position.y &&
            player.position.y + player.height +
            player.velocity.y >= platform.
            position.y && player.position.x +
            player.width >= platform.position.x &&
            player.position.x <= platform.position.x
            + platform.width
        ) {
          player.velocity.y=0
        }
    })

    if (scrolloffset > 1500){
        console.log(' you win')
    }
}

animate()

window.addEventListener('keydown', ({keyCode}) =>{
    switch (keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = true
            break
         
         case 83:
            console.log('down')
            break

        case 68:
            console.log('right')
            keys.right.pressed = true
            break

        case 87:
            console.log('up')
            player.velocity.y -= 2
            break
    }
})

window.addEventListener('keyup', ({keyCode}) =>{
    switch (keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = false
            break
         
         case 83:
            console.log('down')
            break

        case 68:
            console.log('right')
            keys.right.pressed = false
            break

        case 87:
            console.log('up')
            player.velocity.y -= 20
            break
    }
})