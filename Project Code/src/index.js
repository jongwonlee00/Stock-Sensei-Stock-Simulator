/*
Section 1: Import the necessary dependencies. Remember to check what each dependency does.
Section 2: Connect to DB: Initialize a dbConfig variable that specifies the connection information for the database. The variables in the .env file can be accessed by using process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD and process.env.API_KEY.
Section 3: App Settings
Section 4: This is where you will add the implementation for all your API routes
Section 5: Starting the server and keeping it active.

*/

// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcrypt'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part B.

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// database configuration
const dbConfig = {
 host: 'db', // the database server
 port: 5432, // the database port
 database: process.env.POSTGRES_DB, // the database name
 user: process.env.POSTGRES_USER, // the user account to connect with
 password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
 .then(obj => {
   console.log('Database connection successful'); // you can view this message in the docker compose logs
   obj.done(); // success, release the connection;
 })
 .catch(error => {
   console.log('ERROR:', error.message || error);
 });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

app.set('view engine', 'ejs'); // set the view engine to EJS
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

// initialize session variables
app.use(
 session({
   secret: process.env.SESSION_SECRET,
   saveUninitialized: false,
   resave: false,
 })
);

app.use(
 bodyParser.urlencoded({
   extended: true,
 })
);

// *****************************************************
// <!-- Section 4 : API Routes -->
// *****************************************************

app.get('/', (req, res) => {
 res.render('pages/landing')
});

app.get('/home', (req, res) => {
 res.render('pages/home'); //this will call the /anotherRoute route in the API
});

app.get('/register', (req,res) => {
 //register
 res.render('pages/register')
});

app.get('/account', (req,res) => {
  //register
  res.render('pages/account')
 });

 app.get('/learn', (req,res) => {
  //register
  res.render('pages/learn')
 });

//register
app.post('/register', async (req, res) => {
 try {
   const hash = await bcrypt.hash(req.body.password, 10);
   console.log('Password Hash Length:', hash.length);
   const username = req.body.username;

   var query = 'INSERT into users (username, password) values ($1, $2) returning *;';
   console.log('Generated Query:', query);
   console.log('Username:', username);
   console.log('Password:', hash);
   console.log('Generated Query:', query);
   const data = await db.one(query, [username, hash]);
 

   console.log(data);
   console.log("User registered successfully");
   res.redirect("/login");
 } catch (err) {
   console.error("Error occurred during database operation:", err);
   res.status(500).redirect("/register");
 }
});

app.get('/login', (req, res) => {
 //login
 res.render('pages/login')
});

app.post('/login', (req, res) => {
 const username = req.body.username;
 const password = req.body.password;
 const query = "select * from users where username = $1;";
 const values = [username, password];

 db.one(query,values)
  .then(async(data) => {
   console.log(data);

   const match = await bcrypt.compare(req.body.password, data.password);

   if(match){
     req.session.user = data;
     req.session.save();
     res.redirect("/home");
   }

   else{
     res.render("pages/login", {message: "Incorrect username or password"});
   }
 })
 .catch((err) => {
   /*
   console.log(err);
   res.redirect("/login");
   */
   res.render("pages/login", {message: "Incorrect username or password"});
 });
});


// Authentication Middleware.
const auth = (req, res, next) => {
 if (!req.session.user) {
   // Default to login page.
   return res.redirect('/login');
 }
 next();
};

// Authentication Required
//app.use(auth);
app.get('/invest', async (req, res) => {
  try {
    const stockSymbol = 'PLTR'; // Replace with your desired stock symbol
    const apiKey = 'cl9s089r01qk1fmlilp0cl9s089r01qk1fmlilpg'; // Replace with your Finnhub API key
    const resolution = 'D'; // Replace with your desired resolution (e.g., 'D' for daily)

    const { data } = await axios.get(`https://finnhub.io/api/v1/stock/candle`, {
      params: {
        symbol: stockSymbol,
        token: apiKey,
        resolution: resolution,
        from: Math.floor(new Date('2023-01-01').getTime() / 1000),
        to: Math.floor(new Date().getTime() / 1000),
      },
    });

    const stockCandleData = {
      openPrices: data.o,
      closePrices: data.c,
      highPrices: data.h,
      lowPrices: data.l,
      timestamps: data.t,
      volumes: data.v,
    };

    res.render('pages/invest', { stockCandleData, stockSymbol });
  } catch (error) {
    console.error('Error fetching stock candle data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});



app.get("/logout", (req, res) => {
 req.session.destroy();
 res.render('pages/login', { message: "Logged out Successfully"});
});

// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
app.listen(3000);
console.log('Server is listening on port 3000');