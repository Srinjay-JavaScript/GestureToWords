Webcam.set({
 width: 350,
 height: 300,
 image_format: "png",
 png_quality: 100
}); 
Webcam.attach("#result");
var prediction1;
var prediction2;

function speak(){
    var synth = window.speechSynthesis;
    var data1 = "The meaning for prediction 1 is" + prediction1;
    var data2 = "The meaning for prediction 2 is" + prediction2;
    var utter = new SpeechSynthesisUtterance(data1 + data2);
    synth.speak(utter);
}

function take_snap(){
    Webcam.snap(function(data_uri){
     document.getElementById("photo").innerHTML = "<img style=' border: 5px solid black; width:350px; height: 260px;'src= '"+ data_uri + "' id='img_taken'></img>";
    });
}
   
   console.log("ML5 version: "+ ml5.version);
   var brain_finder = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tYz1D_zHL/model.json", loaded);
   //var brain_finder = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/XgMphg_oy/model.json", loaded);
   function loaded(){
       console.log("MODEL LOADED!")
   }
   function change(){
     var imgOfgesture = document.getElementById("img_taken");
     brain_finder.classify(imgOfgesture, output);
   }

   function output(error, finalResult){
     if (error){
         console.error(error);
         return;
     }
     else{
         console.log(finalResult);
         prediction1 = finalResult[0].label;
         prediction2 = finalResult[1].label;
         speak();
         document.getElementById("word1").innerHTML = prediction1;
         document.getElementById("word2").innerHTML = prediction2;
     }
     //PREDICTION 1
      if(prediction1.toLowerCase() == "all the best"){
          document.getElementById("emoji1").innerHTML = "&#128077;";
      }
      else if(prediction1.toLowerCase() == "amazing"){
        document.getElementById("emoji1").innerHTML = "&#128076;";
        }
        else{
            document.getElementById("emoji1").innerHTML = "&#9996;";
        }
        //PREDICTION 2
      if(prediction2.toLowerCase() == "all the best"){
        document.getElementById("emoji2").innerHTML = "&#128077;";
    }
    else if(prediction2.toLowerCase() == "amazing"){
      document.getElementById("emoji2").innerHTML = "&#128076;";
      }
      else{
          document.getElementById("emoji2").innerHTML = "&#9996;";
      }
   }