var prediction_1 = ""

var prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function (data_url){
        document.getElementById("result").innerHTML = '<img id="capture_image" src=" '+ data_url+'"/>';
    });
}

console.log('ml5 version',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/aeYY3mcDj/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction Is"+prediction_1;
    speak_data_2 = "The Second Prediction Is"+prediction_2;
    var utterdhis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterdhis);
}

function check(){
    img = document.getElementById('capture_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById('result1').innerHTML = results[0].label;
        document.getElementById('result2').innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Thumbs up"){
            document.getElementById('hand1').innerHTML = "&#128522;";

        }
        if(results[1].label == "Thumbs up"){
            document.getElementById('hand2').innerHTML = "&#128522;";
            
        }
        if(results[0].label == "Victory"){
            document.getElementById('hand1').innerHTML = "&#128532;";

        }
        if(results[1].label == "Victory"){
            document.getElementById('hand2').innerHTML = "&#128532;";
            
        }
        if(results[0].label == "Loss"){
            document.getElementById('hand1').innerHTML = "&#128548;";

        }
        if(results[1].label == "Loss"){
            document.getElementById('hand2').innerHTML = "&#128548;";
            
        }
    }

}