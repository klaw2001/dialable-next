"use strict";
(() => {
var exports = {};
exports.id = 2738;
exports.ids = [2738];
exports.modules = {

/***/ 7096:
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ 5142:
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 1738:
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ 1423:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 4357:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GET)
/* harmony export */ });
/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1738);
/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(multer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1423);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_models_productModel_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var _src_dbConfig_dbConfig_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(393);





(0,_src_dbConfig_dbConfig_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)().then(() => {
  console.log("connected");
}).catch(() => {
  console.log("not connected");
});
const storage = multer__WEBPACK_IMPORTED_MODULE_0___default().diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./uploads";
    const subfolder = "products"; // Create "uploads" folder if it doesn't exist

    if (!fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(uploadPath)) {
      fs__WEBPACK_IMPORTED_MODULE_1___default().mkdirSync(uploadPath);
    } // Create subfolder inside "uploads"


    const subfolderPath = path__WEBPACK_IMPORTED_MODULE_2___default().join(uploadPath, subfolder);

    if (!fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(subfolderPath)) {
      fs__WEBPACK_IMPORTED_MODULE_1___default().mkdirSync(subfolderPath);
    }

    cb(null, subfolderPath);
  },
  filename: function (req, file, cb) {
    const name = file.originalname; // abc.png

    const ext = path__WEBPACK_IMPORTED_MODULE_2___default().extname(name); // .png

    const nameArr = name.split("."); // [abc,png]

    nameArr.pop();
    const fname = nameArr.join("."); //abc

    const fullname = fname + "-" + Date.now() + ext; // abc-12345.png

    cb(null, fullname);
  }
});
const upload = multer__WEBPACK_IMPORTED_MODULE_0___default()({
  storage: storage
});
async function GET(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const products = await _src_models_productModel_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].find */ .Z.find().populate({
      path: "category",
      model: "Category"
    }) // .populate({
    //   path: "subcategory",
    //   model: "SubCategory",
    // })
    .exec();

    if (products) {
      return res.status(200).json({
        data: products,
        message: "Success"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

/***/ }),

/***/ 393:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);


(__webpack_require__(5142).config)();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(`${process.env.MONGO_URI}`);
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [5812,16], () => (__webpack_exec__(4357)));
module.exports = __webpack_exports__;

})();