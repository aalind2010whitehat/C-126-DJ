var song;
var button;
var ScoreLeftwrist = ""

var leftWristX ;
var leftWristY ;
var rightWristX ;
var rightWristY ;

function preload() {
song = loadSound("blank-space.mp3");
}


function setup() {
canvas = createCanvas(600, 500);
canvas.center();
button = createButton("PLAY");
button.mousePressed(togglePlaying);
button.position(600, 70);
song.setVolume(0.3);

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded)
poseNet.on("pose", gotPoses)
}
function modelLoaded() {
    console.log('Posenet is Initialized');0
}
function togglePlaying() {

if(! song.isPlaying()) {
song.play();
song.setVolume(0.3);
button.html("PAUSE")
} else {
song.pause();
button.html("PLAY")


}
}
function gotPoses(results) {
if(results.length > 0) {
console.log(results)
ScoreLeftwrist = results[0].pose.keypoints[9].score ;
console.log("ScoreLeftwrist = " +ScoreLeftwrist);

rightWristX = results[0].pose.rightWrist.x ;
rightWristY = results[0].pose.rightWrist.y ;
console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

leftWristX = results[0].pose.leftWrist.x ;
leftWristY = results[0].pose.rightWrist.y ;
console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
}   
}

function draw() {

image(video,0, 0, 600, 500);
fill("red");
stroke('green');
strokeWeight(4);

if(ScoreLeftwrist > 0.2) {
circle(rightWristX, rightWristY, 20);
InNumberLeftwristY = Number(leftWristX);
removed_Decimal = floor(InNumberLeftwristY);
volume = removed_Decimal/500
document.getElementById("volume").innerHTML = "Volume = " + volume ;
song.setVolume(volume);


}
}