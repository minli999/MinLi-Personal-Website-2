"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
// instantiate an object of type index controller
const index_1 = require("../Controllers/index");
/* GET home page. */
router.get('/', index_1.DisplayHomePage);
/* GET home page. */
router.get('/home', index_1.DisplayHomePage);
/* GET About Us page. */
router.get('/about', index_1.DisplayAboutPage);
/* GET Projects page. */
router.get('/projects', index_1.DisplayProjectsPage);
/* GET Services page. */
router.get('/services', index_1.DisplayServicesPage);
/* GET Contact Us page. */
router.get('/contact', index_1.DisplayContactPage);
/* GET Resume page. */
router.get('/resume', index_1.DisplayResumePage);
/* GET games-list page */
router.get('/games-list', index_1.DisplayGamesListPage);
/* GET - display /games-list/edit/:id page. */
router.get('/games-list/edit/:id', index_1.DisplayEditPage);
/* GET contacts-list page */
router.get('/contacts-list', index_1.DisplayContactsListPage);
/* GET - display /contacts-list/update/:id page. */
router.get('/contacts-list/update/:id', index_1.DisplayUpdatePage);
/* GET - display login page */
router.get('/login', index_1.DisplayLoginPage);
/* POST process login page */
router.post('/login', index_1.ProcessLoginPage);
/* GET display register page */
router.get('/register', index_1.DisplayRegisterPage);
/* POST process register page */
router.post('/register', index_1.ProcessRegisterPage);
/* GET logout page */
router.get('/logout', index_1.ProcessLogoutPage);
//module.exports = router;
//# sourceMappingURL=index.js.map