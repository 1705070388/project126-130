song1 = "";
song2 = "";
song1Status= "";
song2Status= "";
function preload() {
    song1 = loadSound("babyShark.mp3");
    song2 = loadSound("Shiny.mp3");
}
scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded() {
    console.log("Posenet is initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function draw() {
    image(video,0,0,600,500);
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1Status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing Baby Shark Song";
        }
    }
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2Status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing Shiny Song";
        }
    }

}
