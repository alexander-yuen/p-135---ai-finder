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
            objectDetector.detect(video, gotResult);
            for (i = 0; i < objects.length; i++){
                document.getElementById("status").innerHTML = "Status : Objects Detected";
                document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are : "+ objects.length;

                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);


                if(objects[i].label == object_name)
                {
                    
                    objectDetector.detect(gotResult);
                    document.getElementById("object_status").innerHTML = object_name + " Found";
                    synth = window.speechSynthesis;
                    utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                
                }
                else
                {
                    document.getElementById("object_status").innerHTML = object_name + " Not Found";
                }
            }
        }
}