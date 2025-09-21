const express = require("express");
const createError = require("http-errors");
const path = require("node:path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const compress = require("compression");
require("dotenv").config();
const Cookies = require("cookies");
const JWT = require("jsonwebtoken");
const { createServer } = require("node:http");
const servicesLoarder = require("./services/index.js");
const db = require("./database/index.js"); 

// Global database instance holds all utilities our services might need access to
const app = express();
const PORT = process.env.LISTEN_PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;
const server = createServer(app);

const allowedOrigins = ["http://localhost:3000", "https://femme-organics.com", "https://studio.apollographql.com", "https://graph.facebook.com"]

const corsOption = {
  origin: allowedOrigins,
  credentials: true
}

app.use(cors(corsOption));
//initialize the cookies package(come back here later when implementing jwt authentication)
app.use((req, res, next) => {
  const options = { keys: [`${process.env.COOKIE_SIGNATURE}`] };
  req.cookies = new Cookies(req, res, options);
  next();
});

const utils = {
  db,
};


const { json } = bodyParser;
app.use(compress());

// Copy raw body buffer to req["rawBody"] to generate x-hub signature
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

// default view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// some usefull middleware to process the request
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});
// ##############################################
// Bind graphql to expressjs web server
const services = servicesLoarder(utils);
async function main() {
  const serviceNames = Object.keys(services);

  for (let i = 0; i < serviceNames.length; i += 1) {
    const name = serviceNames[i];
    switch (name) {
      case "graphql": {
        const apolloServer = services.graphql;
        await apolloServer.start();

        app.use(
          "/graphql",
          cors(corsOption),
          json(),
          expressMiddleware(apolloServer, {
            context: async ({ req }) => {
              const authorization = req.headers.authorization; // read the auth token from the headers of the request
              if (typeof authorization !== typeof undefined) {
                const search = "Bearer ";
                const regEx = new RegExp(search, "ig");
                const token = authorization.replace(regEx, "").trim(); // strip out the beare string

                console.log("From cookies".bgBlue, req.cookies.get('authorization', { signed: true }))
                console.log("TOKEN$".bgBlue, token)
                //verify the token received against our secret
                return JWT.verify(token, JWT_SECRET, (err, result) => {
                  if (err) {
                    return req; // triggers an error when it reaches the auth directive since no merchant is attached to it
                  }

                  // if verified retrieve the user from the database based on the id
                  return utils.db.db.models.User.findByPk(
                    result.id // we used id to sign the JWT
                  ).then(async (user) => {
                    if (user?.role === "admin") {
                      const admin = await utils.db.db.models.Admin.findOne({
                        where: {
                          userId: user.id
                        }
                      })
                      return Object.assign({}, req, { user, admin }); //add the merchat to the request object as the context(makes the authenticated variable to the merchants)
                    }
                    if (user?.role === "customer") {
                      const customer = await utils.db.db.models.Customer.findOne({
                        where: {
                          userId: user.id
                        }
                      })
                      return Object.assign({}, req, { user, customer }); //add the merchat to the request object as the context(makes the authenticated variable to the merchants)
                    }
                    throw new Error("User role not specified")
                  });
                });
              }
              return req;  // return the unauthenticated request the function auth.js will throw an error to the client
            },
          })
        );

        // server.listen(PORT, () => {
        //   console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
        //   console.log("subscription", services[name])
        //   services[name](server);
        // });

        break;
      }
      case "subscriptions":
      //   // before initializing SubscriptionServer should already be listening
      //   server.listen(PORT, () => {
      //     console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
      //     console.log("subscription", services[name])
      //     services[name](server);
      //   });
        break
      default:
        app.use("/${name}", services[name]);
        break;
    }
  }

  // Start the HTTP server
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

main();

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log("ERROR ", err)
  // render the error page
  res.status(err.status || 500);
  res.render("error"); // render the error template
});