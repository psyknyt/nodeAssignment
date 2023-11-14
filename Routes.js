const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Nice title boi</title></head>");
    res.write(
      "<body><form action='/users' method='POST'><input type='text' placeholder='userName' name='users'/><button type='submit'>Submit</button></form></body>"
    );
    res.write("</html>");

    return res.end();
  }
  if (url === "/users" && method === "POST") {
    const body = [];
    console.log("Is it working!!!");

    req.on("data", (chunk) => {
      console.log("someone connected");
      body.push(chunk);
      console.log(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1].split("+").join(" ");

      console.log("someone disconected!!!");
      console.log(message);

      fs.writeFileSync("message.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-type", "type/html");
  res.write("<html>");
  res.write("<head><title>MY node js page</title></head>");
  res.write("<body><h1>MY NODE JS WEBSITE</h1></body>");
  res.write("</html>");
  return res.end();

  console.log(url);
  console.log(method);
};

module.exports = requestHandler;
