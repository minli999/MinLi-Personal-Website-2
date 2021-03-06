"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.DisplayRegisterPage = exports.ProcessLoginPage = exports.DisplayLoginPage = exports.ProcessDeletePage = exports.ProcessUpdatePage = exports.DisplayUpdatePage = exports.DisplayContactsListPage = exports.DisplayResumePage = exports.DisplayContactPage = exports.DisplayServicesPage = exports.DisplayProjectsPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
const passport_1 = __importDefault(require("passport"));
// create an instance of the User Model
const user_1 = __importDefault(require("../Models/user"));
// get a reference to the Contact Model Class
const contact_1 = __importDefault(require("../Models/contact"));
// import Util Functions
const Util_1 = require("../Util");
//Display and Process functions
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayAboutPage(req, res, next) {
    res.render('index', { title: 'About', page: 'about', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayAboutPage = DisplayAboutPage;
function DisplayProjectsPage(req, res, next) {
    res.render('index', { title: 'Projects', page: 'projects', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayProjectsPage = DisplayProjectsPage;
function DisplayServicesPage(req, res, next) {
    res.render('index', { title: 'Services', page: 'services', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayServicesPage = DisplayServicesPage;
function DisplayContactPage(req, res, next) {
    res.render('index', { title: 'Contact Me', page: 'contact', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayContactPage = DisplayContactPage;
function DisplayResumePage(req, res, next) {
    res.render('index', { title: 'Resume', page: 'resume', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayResumePage = DisplayResumePage;
//(R)ead contacts list in CRUD
function DisplayContactsListPage(req, res, next) {
    // db.contacts.find()
    contact_1.default.find(function (err, contactsCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Contacts', page: 'contacts-list', contacts: contactsCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    }).sort({ "name": 1 });
}
exports.DisplayContactsListPage = DisplayContactsListPage;
// Display (U)pdate page
function DisplayUpdatePage(req, res, next) {
    let id = req.params.id;
    // pass the id to the db
    // db.contacts.find({"_id": id})
    contact_1.default.findById(id, {}, {}, (err, contactsItemToUpdate) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        // show the update view
        res.render('index', { title: 'Update', page: 'update', contacts: contactsItemToUpdate, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayUpdatePage = DisplayUpdatePage;
// Process (U)pdate page
function ProcessUpdatePage(req, res, next) {
    let id = req.params.id;
    // instantiate a new Contact Item
    let updatedContactItem = new contact_1.default({
        "_id": id,
        "name": req.body.name,
        "contactnumber": req.body.contactnumber,
        "email": req.body.email
    });
    // find the contact item via db.contact.update({"_id":id}) and then update
    contact_1.default.updateOne({ _id: id }, updatedContactItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contacts-list');
    });
}
exports.ProcessUpdatePage = ProcessUpdatePage;
// Process (D)elete page
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    // db.contacts.remove({"_id: id"})
    contact_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contacts-list');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
/* functions for authentication */
function DisplayLoginPage(req, res, next) {
    res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayLoginPage = DisplayLoginPage;
function ProcessLoginPage(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        console.log(user);
        // are there any server errors?
        if (err) {
            console.error(err);
            return next(err);
        }
        // are there any login errors?
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // are there any db errors?
            if (err) {
                console.error(err);
                return next(err);
            }
            console.log("Logged in Successfully");
            return res.redirect('/contacts-list');
        });
    })(req, res, next);
}
exports.ProcessLoginPage = ProcessLoginPage;
function DisplayRegisterPage(req, res, next) {
    res.render('index', { title: 'Register', page: 'register', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayRegisterPage = DisplayRegisterPage;
function ProcessRegisterPage(req, res, next) {
    // instantiate a new User Object
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastName
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');
            return res.redirect('/register');
        }
        // after successful registration - let's login the user
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.redirect('/contacts-list');
        });
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
function ProcessLogoutPage(req, res, next) {
    req.logOut();
    res.redirect('/login');
}
exports.ProcessLogoutPage = ProcessLogoutPage;
/* GET Route for displaying the Add page - CREATE Operation */
//# sourceMappingURL=index.js.map