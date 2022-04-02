var myHeaders = new Headers();
myHeaders.append("App-Key", "a4229842b679e1db3bfd96005c5fbac6");
myHeaders.append("User-Token", "AHU1NfyqFEHuvouXQxY");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://runrun.it/api/users", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));