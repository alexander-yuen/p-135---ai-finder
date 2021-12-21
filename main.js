objects = [];
status = "";

function preload(){
    
}

function setup(){
    canvas = createCanvas(480, 380);
    video = createCapture(480, 380);
     canvas.center();
     video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 480, 380);
        if(status != "")
        {
            console.log("Status Detecting Objects");
        }
}