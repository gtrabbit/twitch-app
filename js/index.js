 var data=[];
var data1=[];

var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin", "wefihjweopigfwe"]

function refresh(){
  
    
streamers.forEach(function(a){
var requestURL = 'https://wind-bow.gomix.me/twitch-api/streams/' + a + "?";
var requestFCC = new XMLHttpRequest();
requestFCC.open('GET', requestURL, true);
requestFCC.onload = function() {
   if (requestFCC.status >= 200 && requestFCC.status < 400) {
     data.push(JSON.parse(requestFCC.responseText));
     
     
     if (data.length===streamers.length){
     getNames();
     }
     
     
     
      } else {
       console.log("error")
  }
};
requestFCC.onerror = function() {
  console.log("error");// There was a connection error of some sort
};
requestFCC.send();
 
})

  
  
  
  

streamers.forEach(function(a){
var requestURL = 'https://wind-bow.gomix.me/twitch-api/channels/' + a + "?";
var requestFCC = new XMLHttpRequest();
requestFCC.open('GET', requestURL, true);
requestFCC.onload = function() {
   if (requestFCC.status >= 200 && requestFCC.status < 400) {
     data1.push(JSON.parse(requestFCC.responseText));
     
     
     
     
     
      } else {
       console.log("error")
  }
};
requestFCC.onerror = function() {
  console.log("error");// There was a connection error of some sort
};
requestFCC.send();
 
})

}





function clearPrevious(){
  var nameList = document.getElementById("nameList");
  var offline = document.getElementById("offlineNames");
  offline.textContent = "";
  nameList.textContent = "";
  
}

function getNames() {
    var notFounds = [];
  data1.forEach(function(a){
     if (a.hasOwnProperty("error")){
  
     var splits = a.message.split(" ");
     var nameDel = splits[1];
     var cats = /\w*/g
     var dogs = nameDel.match(cats);
     notFounds.push(dogs[1]);
   
     
     
     }
           })
  

  
  clearPrevious()
  var firstClick = 1;
  var nameList = document.getElementById("nameList");
  var offline = document.getElementById("offlineNames");
  var filtered = document.querySelector("input[name='filter']:checked").value;
  
  data.forEach(function(a){
    
    if (a["stream"] !== null){
    
    var displayName = document.createTextNode(a["stream"]["channel"]["display_name"]);
    var onlineTable = document.createElement("li");
    var icon = 'url(' + a["stream"]["channel"]["logo"] + ')';
    onlineTable.style.backgroundImage = icon;
    onlineTable.appendChild(displayName);
    nameList.insertBefore(onlineTable, null);
   
    var statusDisplay = document.createElement("a");
    statusDisplay.innerText = a["stream"]["channel"]["status"];
    statusDisplay.style.display = "none";
    statusDisplay.href = a["stream"]["channel"]["url"];
    statusDisplay.target = "_blank";
    onlineTable.insertBefore(statusDisplay, null);
  
    onlineTable.addEventListener("click", function(){
     
      if (statusDisplay.style.display === "none"){
         statusDisplay.style.display = "block";
         firstClick--;
     
       } else {
       statusDisplay.style.display = "none";
       firstClick++;
        }
                      
    })
               
      
  }   else if (filtered === "all") {
      

    
      var ender = /\w+$/;
      var name = a["_links"]["self"].match(ender);
 
    if (notFounds.includes(name[0])){
     
      var channelLink = document.createElement("a");
      channelLink.innerText = name[0]+" ... no such channel";
      
      } else {
      var channelLink = document.createElement("a");
      channelLink.innerText = name + " ... is offline";
      channelLink.href = "https://www.twitch.tv/" + name;
    
      }
    
    
     
    
      var offlineTable = document.createElement("li");
      offlineTable.appendChild(channelLink);
      offline.insertBefore(offlineTable, null);
     
         
    
    
    
    }
})
}
refresh();