
document.getElementById("form").addEventListener("submit", addKey);


window.onscroll = function (e) { 
  const nav = document.querySelector('#footerPage');
  if(this.scrollY <= 10) nav.className = 'page-footer'; else nav.className  = 'page-footer scroll';
 

  } 

function addKey(e) {
  var siteName = document.getElementById("name").value;
  var siteUrl = document.getElementById("siteUrl").value;
  var sitePassword = document.getElementById("password").value;
  var userName = document.getElementById("userName").value;

  if (!validateForm(siteUrl)) {
    return false;
  }
var keyHolder = {
    name: siteName,
    url: siteUrl,
    username: userName,
    password: sitePassword
  };
  if (localStorage.getItem("keyHolders") === null) {
    var keyHolders = [];

    keyHolders.push(keyHolder);

    localStorage.setItem("keyHolders", JSON.stringify(keyHolders));
  } else {
    var keyHolders = JSON.parse(localStorage.getItem("keyHolders"));

    keyHolders.push(keyHolder);

    localStorage.setItem("keyHolders", JSON.stringify(keyHolders));
  }
  
 location.reload();
  e.preventDefault();
}

function deleteKeyHolder(i) {
  var keyHolders = JSON.parse(localStorage.getItem("keyHolders"));

  if (keyHolders[i] !== null) {
    keyHolders.splice(i, 1);
    localStorage.setItem("keyHolders", JSON.stringify(keyHolders));
    location.reload();
  }

  
}


function fetchKeyHolders() {

  var keyHolders = JSON.parse(localStorage.getItem("keyHolders"));
  
  var listUp = document.getElementById("keyholder-list");

  for (var i = 0; i < keyHolders.length; i++) {
    var listItem = document.createElement("li");
    listItem.className = "collection-item";

    var keyHolderName = keyHolders[i].name;
    var keyHolderUrl = keyHolders[i].url;
    var keyHolderUserName = keyHolders[i].username;
    var keyHolderPassword = keyHolders[i].password;

    listItem.innerHTML +=
      '<div  class="list-header">' +
      '<span class="header-list">' +
      keyHolderName +
      "</span>" +
      '<div class="icon-list">'+
      ' <a class="visit" data-toggle="tooltip" title="Visit to Website!" target="_blank" href="' +
      addhttp(keyHolderUrl) +
      '"> <i class="material-icons">public</i></a> ' +
      ' <a  data-toggle="tooltip" title="Delete!" onClick="deleteKeyHolder(\'' +
      i +
      '\')" class="remove" href="#"><i class="material-icons">delete</i></a> ' +
      '</div>'+
      "</div>" +
      '<div id="user-info">' +
      "<p >Username:" +
      keyHolderUserName +
      "</p>"  +
      "<p >Password:" +
      keyHolderPassword +
      "</p>" +
      "</div>";
    listUp.appendChild(listItem);
   
  }

 
}

function validateForm(siteUrl) {
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");

    return false;
  }

  return true;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }

  return url;
}
