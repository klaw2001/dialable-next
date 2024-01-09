"use strict";
(() => {
var exports = {};
exports.id = 4219;
exports.ids = [4219];
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

/***/ 9267:
/***/ ((module) => {

module.exports = require("nextjs-cors");

/***/ }),

/***/ 1423:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 2175:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ POST)
/* harmony export */ });
/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1738);
/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(multer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1423);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_models_productModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var nextjs_cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9267);
/* harmony import */ var nextjs_cors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nextjs_cors__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_dbConfig_dbConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(393);






(0,_src_dbConfig_dbConfig__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)().then(() => {
  console.log("connected");
}).catch(() => {
  console.log("not connected");
});
async function POST(req, res) {
  await nextjs_cors__WEBPACK_IMPORTED_MODULE_4___default()(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

  });

  try {
    const {
      name,
      category,
      // subcategory,
      quantity,
      price,
      shortdescription,
      description,
      thumbnail
    } = req.body; // console.log('Files:', req.files);

    const productData = new _src_models_productModel__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z({
      name,
      category,
      // subcategory,
      quantity,
      price,
      shortdescription,
      description,
      thumbnail
    });
    console.log(category); // const validationError = productData.validateSync();
    // if (validationError) {
    //   return res.status(400).json({ message: validationError.message });
    // }

    productData.save();
    console.log(productData);

    if (productData) {
      return res.status(201).json({
        data: productData,
        message: "Product Added Successfully"
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
var __webpack_exports__ = __webpack_require__.X(0, [5812,16], () => (__webpack_exec__(2175)));
module.exports = __webpack_exports__;

})();