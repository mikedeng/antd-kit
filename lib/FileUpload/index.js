"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var kb = 1024 * 1024;

function getBase64(img, callback) {
  var reader = new FileReader();
  reader.addEventListener('load', function () {
    return callback(reader.result);
  });
  reader.readAsDataURL(img);
}

var getNameFromUrl = function getNameFromUrl(imgUrl) {
  return imgUrl.match(/[0-9,a-z,.]{9,}(?=\?)/)[0];
};

function showInfoModal(content) {
  _antd.Modal.info({
    title: '提示',
    content: content
  });
}

var uploadButton = function uploadButton() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'picture-card';
  return type === 'picture-card' ? _react["default"].createElement("div", null, _react["default"].createElement(_antd.Icon, {
    type: "plus"
  }), _react["default"].createElement("div", {
    className: "ant-upload-text"
  }, "\u4E0A\u4F20")) : _react["default"].createElement(_antd.Button, null, _react["default"].createElement(_antd.Icon, {
    type: "upload"
  }), " \u9009\u62E9\u6587\u4EF6");
};

var FileUpload =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FileUpload, _React$Component);

  function FileUpload(props) {
    var _this;

    _classCallCheck(this, FileUpload);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FileUpload).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "beforeUpload", function (file) {
      var _this$props = _this.props,
          _this$props$listType = _this$props.listType,
          listType = _this$props$listType === void 0 ? 'picture-card' : _this$props$listType,
          _this$props$reg = _this$props.reg,
          reg = _this$props$reg === void 0 ? /(jpe?g|JPE?G|png|PNG)$/ : _this$props$reg,
          _this$props$tips = _this$props.tips,
          tips = _this$props$tips === void 0 ? '请选择jpg,png类型的图片格式' : _this$props$tips,
          _this$props$fileSize = _this$props.fileSize,
          size = _this$props$fileSize === void 0 ? 5 : _this$props$fileSize;
      var fileType = file.name;
      var fileSize = file.size;
      return new Promise(function (resolve, reject) {
        if (!reg.test(fileType)) {
          showInfoModal(tips);
          reject();
          return;
        }

        if (fileSize > size * kb) {
          showInfoModal("\u6587\u4EF6\u7684\u5927\u5C0F\u4E0D\u80FD\u8D85 ".concat(size, "M"));
          reject();
          return;
        }

        if (listType === 'picture-card') {
          var img = new Image();

          img.onload = function () {
            resolve();
          };

          img.onerror = reject;
          img.src = URL.createObjectURL(file);
        } else {
          resolve();
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "customRequest", function (option) {
      var _this$props2 = _this.props,
          handleSetStart = _this$props2.handleSetStart,
          upload = _this$props2.upload;
      var file = option.file,
          onSuccess = option.onSuccess;
      handleSetStart && handleSetStart();
      upload({
        file: file
      }).then(function (res) {
        var content = res.content;
        onSuccess({
          content: content
        });
      })["catch"](function () {
        console.log('some error');
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (_ref) {
      var file = _ref.file,
          fileList = _ref.fileList;
      var ids = _this.state.ids;
      var onChange = _this.props.onChange;

      if (file.status === 'done') {
        var storeId = file.response.content.storeId;
        var storeIds = ids.concat(storeId);

        _this.setState({
          ids: storeIds
        });

        getBase64(file.originFileObj, function (imageUrl) {
          return file.thumbUrl = imageUrl;
        });
        onChange && onChange(storeIds.join(','), file.name);
      }

      _this.setState({
        fileList: fileList
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handlePreview", function (file) {
      var _this$props$listType2 = _this.props.listType,
          listType = _this$props$listType2 === void 0 ? 'picture-card' : _this$props$listType2;

      if (listType !== 'picture-card') {
        return;
      }

      _this.setState({
        imageUrl: file.url || file.thumbUrl,
        previewVisible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSimplePreview", function (url) {
      return function () {
        _this.setState({
          imageUrl: url,
          previewVisible: true
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      _this.setState({
        previewVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemove", function (file) {
      var ids = _this.state.ids;
      var index; // 回显的图片的删除逻辑

      if (file.specialId) {
        index = ids.indexOf(file.uid);
      } else if (!file.response || !file.response.content) {
        // 上传中图片的删除逻辑
        return true;
      } else {
        var storeId = file.response.content.storeId;
        index = ids.indexOf(storeId);
      }

      if (index === -1) {
        return true;
      }

      var onChange = _this.props.onChange;
      ids.splice(index, 1);
      onChange && onChange(ids.length ? ids.join(',') : undefined);

      _this.setState({
        ids: ids
      });

      return true;
    });

    var _url = props.url,
        name = props.name,
        value = props.value;
    _this.state = {
      initUrl: _url,
      imageUrl: '',
      ids: _url ? [value] : [],
      previewVisible: false,
      fileList: _url ? [{
        uid: value,
        name: name,
        status: 'done',
        specialId: value,
        url: _url
      }] : []
    };
    return _this;
  }

  _createClass(FileUpload, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          _this$props3$maxSize = _this$props3.maxSize,
          maxSize = _this$props3$maxSize === void 0 ? 1 : _this$props3$maxSize,
          _this$props3$listType = _this$props3.listType,
          listType = _this$props3$listType === void 0 ? 'picture-card' : _this$props3$listType,
          children = _this$props3.children,
          simple = _this$props3.simple,
          info = _this$props3.info,
          disabled = _this$props3.disabled;
      var child = children || uploadButton(listType);
      var _this$state = this.state,
          imageUrl = _this$state.imageUrl,
          fileList = _this$state.fileList,
          previewVisible = _this$state.previewVisible;
      return _react["default"].createElement("div", {
        className: "doddle-image-upload"
      }, _react["default"].createElement("div", {
        className: fileList.length ? 'imgArea has-child' : 'imgArea'
      }, _react["default"].createElement(_antd.Upload, {
        listType: listType,
        fileList: fileList,
        disabled: disabled,
        beforeUpload: this.beforeUpload,
        onPreview: this.handlePreview,
        customRequest: this.customRequest,
        onChange: this.handleChange,
        onRemove: this.handleRemove
      }, fileList.length >= maxSize ? null : child), simple && fileList.length === 0 &&
      /* eslint-disable-next-line */
      _react["default"].createElement("img", {
        src: simple,
        alt: "\u6837\u4F8B",
        onClick: this.handleSimplePreview(simple),
        className: "show-simple"
      })), info && fileList.length === 0 && _react["default"].createElement("div", {
        className: 'show-info'
      }, info), _react["default"].createElement(_antd.Modal, {
        visible: previewVisible,
        footer: null,
        onCancel: this.handleCancel
      }, _react["default"].createElement("img", {
        alt: "",
        style: {
          width: '100%'
        },
        src: imageUrl
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      // 用于组件初始化时没有接收到原始url，且下一周期原始url更新；
      if (!prevState.initUrl && nextProps.url) {
        var url = nextProps.url,
            name = nextProps.name,
            value = nextProps.value;
        return {
          initUrl: url,
          ids: [value],
          fileList: [{
            uid: value,
            name: name || getNameFromUrl(url),
            status: 'done',
            url: url,
            specialId: value
          }]
        };
      }

      return null;
    }
  }]);

  return FileUpload;
}(_react["default"].Component);

exports["default"] = FileUpload;