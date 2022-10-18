import mongoose, { Error, ConnectOptions } from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import express from "express";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import * as dotenv from 'dotenv';
import User from "./model/User";
import { UserInterface } from "./config/UserInterface";

dotenv.config()
//connect mongo database
mongoose
  .connect( process.env.REACT_APP_MONGO_URI ?? '',
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
    User.findOne({ username}, (err: Error, user: any) => {
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
// persist user data (after successful authentication) into session
passport.serializeUser((user:any, cb) => {
  cb(null, user.id)
})
// used to retrieve user data from session
passport.deserializeUser((id:string,cb) => {
  User.findOne({_id:id}, (err: Error,user:any) => {
    const userInformation = {
      username: user.username,
      isAdmin: user.isAdmin
    }
    cb(err, userInformation)
  })
})

//Routes
app.post("/register", async (req, res) => {
  const {username, password} = req.body
 User.findOne({ username }, async (err: Error, doc: UserInterface) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User created");
    }
  });
});

app.post('/login', passport.authenticate('local'), (req,res) => {
res.send('Successfully Authenticated');
});

app.get('/user', (req,res) => {
    res.send(req.user)
})
app.get('/logout', (req,res, next) => {
  req.logout((err) => {
    if(err) return err
  });
  res.send('Nice! Log out complete')
  res.redirect('/')
})
/* This will be the routes for the admin to look and handle at all of the employees */
// app.get('/roaster',async (req,res) => {
//   await User.find({}, (err: Error, data: UserInterface[]) => {
//     if(err) throw err
//     res.send(data)
//   })
// })

// app.post('/deleteEmployee', async (req,res) => {
//   const {id} = req.body;
//   await User.findByIdAndDelete(id, (err:Error) => {
//     if(err) throw err
//   })
//   res.send('User deleted')
// })
app.listen(3030, () => {
  console.log("Listening on the server");
});
