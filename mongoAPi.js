
var data = JSON.stringify({
    collection: "users",
    database: "ver-sys",
    dataSource: "verteilte-systeme",
    projection: {
      _id: 1,
    },
  });
  
  var config = {
    method: "post",
    url: "https://eu-central-1.aws.data.mongodb-api.com/app/data-lqvwu/endpoint/data/v1/action/findOne",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.DATABASE_API_KEY,
      Accept: "application/ejson",
    },
    data: data,
  };
  
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  