"use strict";
(() => {
var exports = {};
exports.id = 7166;
exports.ids = [7166];
exports.modules = {

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

/***/ 8824:
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
/* harmony import */ var _src_models_subCategoryModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6951);




const storage = multer__WEBPACK_IMPORTED_MODULE_0___default().diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./uploads";
    const subfolder = "sub-category"; // Create "uploads" folder if it doesn't exist

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
  try {
    const subcategoryData = await _src_models_subCategoryModel__WEBPACK_IMPORTED_MODULE_3__/* ["default"].aggregate */ .Z.aggregate([{
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categories"
      }
    }, {
      $unwind: "$categories"
    }]);

    if (subcategoryData) {
      return res.status(200).json({
        data: subcategoryData,
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

/***/ 1180:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const CategorySchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
const Category = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Category) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Category", CategorySchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Category);

/***/ }),

/***/ 6951:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _categoryModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1180);


const SubCategorySchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,
    required: true,
    ref: _categoryModel__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z
  },
  image: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
const SubCategory = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.SubCategory) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("SubCategory", SubCategorySchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubCategory);

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8824));
module.exports = __webpack_exports__;

})();