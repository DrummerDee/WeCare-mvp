import mongoose, { Error, ConnectOptions } from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import express from "express";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import "dotenv/config";
import User from "./User";
import { UserInterface } from "./UserInterface";

//connect mongo database
mongoose
  .connect(
    "mongodb+srv://DrummerDee:codeWillProvide@cluster1.eaesbrh.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    } as ConnectOptions
  )
  .then((res) => {
    console.log("Database Connected Successfully.");
  })
  .catch((err: Error) => {
    console.log("Error Connecting to the Database");
  });

//Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "daddy-long-legs",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
//Passport
const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err: Error, user: any) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);
//Routes
app.post("/register", async (req, res) => {
  const {username, password} = req.body
 User.findOne({ username }, async (err: Error, doc: UserInterface) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        hashedPassword,
      });
      await newUser.save();
      res.send("User created");
    }
  });
});

app.post('/login', passport.authenticate('local'), (req,res)=> {
res.send('Successfully Authenticated');
});

app.get('/user', (req,res)=>{
    res.send(req.user)
})


app.listen(3030, () => {
  console.log("Listening on the server");
});
