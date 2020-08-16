var express         = require("express");
const e = require("express");
const user = require("./models/user");
var app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    flash           = require("connect-flash"),
    methodOverride  = require("method-override"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user")
    seedDB          = require("./seeds");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

// seedDB();
mongoose.connect("mongodb://localhost/yelpCamp", {useNewUrlParser: true});
// mongoose.connect("mongodb+srv://yelpCamp:Jiraiya_1997@cluster0.mqqel.mongodb.net/<dbname>?retryWrites=true&w=majority", {useNewUrlParser: true}); 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());



//Passport Config
app.use(require("express-session")({
    secret: "Naruto is greatest",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);



app.listen("3000", function(){
    console.log("Server has started");
});