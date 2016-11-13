recorderApp.controller('recordCtrl', ['$scope', '$cordovaMedia', '$ionicPopup' ,function($scope, $cordovaMedia, $ionicPopup){

    $scope.myTime = '';
    $scope.currentMedia = '';

    $scope.startRecording = function(){
      $scope.playFlag =true;

      //create an mp3 file with _audio postfix
      var src = getRandomText()+"_audio.mp3";

      var mediaRec = $cordovaMedia.newMedia(src, onSuccess, onError);
      $scope.currentMedia = mediaRec;
      startTime = new Date();

      // Record audio
      mediaRec.startRecord();
      recTime =  setInterval(displayFunction, 1000);
      $scope.myTime = recTime;
    };

    $scope.stopRecording = function(){
        $scope.playFlag =false;
        console.log('stop tapped');

        //Stop Recording
        $scope.currentMedia.stopRecord();
        clearInterval($scope.myTime);
        document.getElementById('time').innerHTML = "00h  :  00m  :  00s";
        //alert('Audio Saved!');
        $ionicPopup.alert({
          title: 'Sound Recorder',
          template: 'Audio Saved In Your Device Storage!'
        });

    };

    // onError Callback
    function onSuccess() {
       console.log("recordAudio():Audio Success");
   }

   // onError Callback
   function onError(error) {
       alert('code: '    + error.code    + '\n' +
             'message: ' + error.message + '\n');
   }

   // used to generate random audio file name
   function getRandomText(){
     return Math.random().toString(36).substring(2).slice(18);
   }

   //used for the record timer
   var displayFunction = function() {

    // later record end time
    var endTime = new Date();

    // time difference in ms
    var timeDiff = endTime - startTime;

    // strip the miliseconds
    timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff % 60);
    if(seconds < 10){
      seconds='0'+seconds;
    }

    // remove seconds from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get minutes
    var minutes = Math.round(timeDiff % 60);
    if(minutes < 10){
      minutes='0'+minutes;
    }

    // remove minutes from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get hours
    var hours = Math.round(timeDiff % 24);
    if(hours < 10){
      hours='0'+hours;
    }

    document.getElementById('time').innerHTML = hours + "h  : " + minutes + "m  :  " + seconds + "s";

}

}]);
