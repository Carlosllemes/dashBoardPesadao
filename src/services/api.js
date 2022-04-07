class Api {
  constructor() {
    this.myHeaders = new Headers();
    this.myHeaders.append("App-Key", "a4229842b679e1db3bfd96005c5fbac6");
    this.myHeaders.append("User-Token", "AHU1NfyqFEHuvouXQxY");
    this.requestOptions = {
      method: "GET",
      headers: this.myHeaders,
      redirect: "follow",
    };
  }

  getRquest(endPoint) {
    return this.apiRequest(endPoint);
  }

  apiRequest(endPoint) {
    const data = fetch(
      `https://runrun.it/api/${endPoint}`,
      this.requestOptions
    )
    .then((response) => response.json())
    .then((resolve) => resolve)
    .catch((error) => console.log("error", error));
    return data
  }
}

export default Api;
