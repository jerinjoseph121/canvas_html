var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var frames = 0;

var mouse = {
    x: undefined,
    y: undefined
};

//Extracting mouse info
window.addEventListener('mousemove', 
function (event){
    mouse.x = event.x;
    mouse.y = event.y;
});

//Used to resize the canvas and call the init function
window.addEventListener('resize', 
function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

//Circle Function which consist of Draw and Update Circle Functions
function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.baseRadius = radius;
    this.maxRadius = (Math.random() * 10) + 40;

    this.draw = function(){
        c.beginPath();
        var r = Math.floor(255*Math.random());
        var g = Math.floor(255*Math.random());
        var b = Math.floor(255*Math.random());
        var a = 1;
        var colour = 'rgba('+r+', '+g+', '+b+', '+a+')';
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = colour;
        c.fillStyle = 'rgba(255, 255, 255, 0.5)';
        c.stroke();
        c.fill();
    }

    this.update = function(){
        if( ((this.x-this.radius)<0) || ((this.x+this.radius)>window.innerWidth) )
            this.dx *= -1
        if( ((this.y-this.radius)<0) || ((this.y+this.radius)>window.innerHeight) )
            this.dy *= -1
        this.x += this.dx;
        this.y += this.dy;

        if((mouse.x - this.x) < 50 && (mouse.x - this.x) > -50){
            if((mouse.y - this.y) < 50 && (mouse.y - this.y) > -50){
                this.radius = this.maxRadius;
            }
        }
        else    
            this.radius = this.baseRadius;
        this.draw();
    }
}

//No of Circle Particles stored in an array
var circleArray = [];
var totalCircles = 300;

//Initialization function called when window is resized
function init(){
    circleArray = [];

    for(i=0; i<totalCircles; i++){
        var radius = (Math.random() * 15) + 5;
        var x = Math.random()*(window.innerWidth - 2*radius) + radius;
        var dx = (Math.random()-0.5) * 5;
        var y = Math.random()*(window.innerHeight - 2*radius) + radius;
        var dy = (Math.random()-0.5) * 5;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

//Text Function for Canvas
function text(){
    c.font = "100px Arial";
    c.fillStyle = 'Black';
    c.fillText("Canvas", (window.innerWidth/2) - 175, (window.innerHeight/2) - 200);
    c.beginPath();
    c.moveTo((window.innerWidth/2) - 100, (window.innerHeight/2) - 170);
    c.lineTo((window.innerWidth/2) + 100, (window.innerHeight/2) - 170);
    c.strokeStyle = 'Black';
    c.stroke();
    var date = new Date();
    c.font = "20px Arial";
    c.fillStyle = 'Black';
    c.fillText(date, (window.innerWidth/2) - 270, (window.innerHeight/2) - 125);
}

//Initialization of Background Color
var r = Math.floor(255*Math.random());
var g = Math.floor(255*Math.random());
var b = Math.floor(255*Math.random());
var a = 0.5;
var bgColor = 'rgba('+r+', '+g+', '+b+', '+a+')';

//Main Animation Function
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    text();
    if(frames%10 == 0){
        r += Math.floor((Math.random()-0.5) * 10);
        g += Math.floor((Math.random()-0.5) * 10);
        b += Math.floor((Math.random()-0.5) * 10);
        a += (Math.random()-0.5)*0.02;
        bgColor = 'rgba('+r+', '+g+', '+b+', '+a+')';
    }
    c.fillStyle = bgColor;
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);
    for(i=0; i<totalCircles; i++){
        circleArray[i].update();
    }
    frames++;
}

init();
animate();