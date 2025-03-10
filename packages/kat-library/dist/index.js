import * as React from 'react';
import React__default, { useState } from 'react';
import require$$4 from 'react-dom';
import { Menu, Tab } from '@headlessui/react';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE$2
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PORTAL_TYPE:
	          return "Portal";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_CONTEXT_TYPE:
	            return (type.displayName || "Context") + ".Provider";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = true;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function disabledLog() {}
	    function disableLogs() {
	      if (0 === disabledDepth) {
	        prevLog = console.log;
	        prevInfo = console.info;
	        prevWarn = console.warn;
	        prevError = console.error;
	        prevGroup = console.group;
	        prevGroupCollapsed = console.groupCollapsed;
	        prevGroupEnd = console.groupEnd;
	        var props = {
	          configurable: true,
	          enumerable: true,
	          value: disabledLog,
	          writable: true
	        };
	        Object.defineProperties(console, {
	          info: props,
	          log: props,
	          warn: props,
	          error: props,
	          group: props,
	          groupCollapsed: props,
	          groupEnd: props
	        });
	      }
	      disabledDepth++;
	    }
	    function reenableLogs() {
	      disabledDepth--;
	      if (0 === disabledDepth) {
	        var props = { configurable: true, enumerable: true, writable: true };
	        Object.defineProperties(console, {
	          log: assign({}, props, { value: prevLog }),
	          info: assign({}, props, { value: prevInfo }),
	          warn: assign({}, props, { value: prevWarn }),
	          error: assign({}, props, { value: prevError }),
	          group: assign({}, props, { value: prevGroup }),
	          groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
	          groupEnd: assign({}, props, { value: prevGroupEnd })
	        });
	      }
	      0 > disabledDepth &&
	        console.error(
	          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
	        );
	    }
	    function describeBuiltInComponentFrame(name) {
	      if (void 0 === prefix)
	        try {
	          throw Error();
	        } catch (x) {
	          var match = x.stack.trim().match(/\n( *(at )?)/);
	          prefix = (match && match[1]) || "";
	          suffix =
	            -1 < x.stack.indexOf("\n    at")
	              ? " (<anonymous>)"
	              : -1 < x.stack.indexOf("@")
	                ? "@unknown:0:0"
	                : "";
	        }
	      return "\n" + prefix + name + suffix;
	    }
	    function describeNativeComponentFrame(fn, construct) {
	      if (!fn || reentry) return "";
	      var frame = componentFrameCache.get(fn);
	      if (void 0 !== frame) return frame;
	      reentry = true;
	      frame = Error.prepareStackTrace;
	      Error.prepareStackTrace = void 0;
	      var previousDispatcher = null;
	      previousDispatcher = ReactSharedInternals.H;
	      ReactSharedInternals.H = null;
	      disableLogs();
	      try {
	        var RunInRootFrame = {
	          DetermineComponentFrameRoot: function () {
	            try {
	              if (construct) {
	                var Fake = function () {
	                  throw Error();
	                };
	                Object.defineProperty(Fake.prototype, "props", {
	                  set: function () {
	                    throw Error();
	                  }
	                });
	                if ("object" === typeof Reflect && Reflect.construct) {
	                  try {
	                    Reflect.construct(Fake, []);
	                  } catch (x) {
	                    var control = x;
	                  }
	                  Reflect.construct(fn, [], Fake);
	                } else {
	                  try {
	                    Fake.call();
	                  } catch (x$0) {
	                    control = x$0;
	                  }
	                  fn.call(Fake.prototype);
	                }
	              } else {
	                try {
	                  throw Error();
	                } catch (x$1) {
	                  control = x$1;
	                }
	                (Fake = fn()) &&
	                  "function" === typeof Fake.catch &&
	                  Fake.catch(function () {});
	              }
	            } catch (sample) {
	              if (sample && control && "string" === typeof sample.stack)
	                return [sample.stack, control.stack];
	            }
	            return [null, null];
	          }
	        };
	        RunInRootFrame.DetermineComponentFrameRoot.displayName =
	          "DetermineComponentFrameRoot";
	        var namePropDescriptor = Object.getOwnPropertyDescriptor(
	          RunInRootFrame.DetermineComponentFrameRoot,
	          "name"
	        );
	        namePropDescriptor &&
	          namePropDescriptor.configurable &&
	          Object.defineProperty(
	            RunInRootFrame.DetermineComponentFrameRoot,
	            "name",
	            { value: "DetermineComponentFrameRoot" }
	          );
	        var _RunInRootFrame$Deter =
	            RunInRootFrame.DetermineComponentFrameRoot(),
	          sampleStack = _RunInRootFrame$Deter[0],
	          controlStack = _RunInRootFrame$Deter[1];
	        if (sampleStack && controlStack) {
	          var sampleLines = sampleStack.split("\n"),
	            controlLines = controlStack.split("\n");
	          for (
	            _RunInRootFrame$Deter = namePropDescriptor = 0;
	            namePropDescriptor < sampleLines.length &&
	            !sampleLines[namePropDescriptor].includes(
	              "DetermineComponentFrameRoot"
	            );

	          )
	            namePropDescriptor++;
	          for (
	            ;
	            _RunInRootFrame$Deter < controlLines.length &&
	            !controlLines[_RunInRootFrame$Deter].includes(
	              "DetermineComponentFrameRoot"
	            );

	          )
	            _RunInRootFrame$Deter++;
	          if (
	            namePropDescriptor === sampleLines.length ||
	            _RunInRootFrame$Deter === controlLines.length
	          )
	            for (
	              namePropDescriptor = sampleLines.length - 1,
	                _RunInRootFrame$Deter = controlLines.length - 1;
	              1 <= namePropDescriptor &&
	              0 <= _RunInRootFrame$Deter &&
	              sampleLines[namePropDescriptor] !==
	                controlLines[_RunInRootFrame$Deter];

	            )
	              _RunInRootFrame$Deter--;
	          for (
	            ;
	            1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter;
	            namePropDescriptor--, _RunInRootFrame$Deter--
	          )
	            if (
	              sampleLines[namePropDescriptor] !==
	              controlLines[_RunInRootFrame$Deter]
	            ) {
	              if (1 !== namePropDescriptor || 1 !== _RunInRootFrame$Deter) {
	                do
	                  if (
	                    (namePropDescriptor--,
	                    _RunInRootFrame$Deter--,
	                    0 > _RunInRootFrame$Deter ||
	                      sampleLines[namePropDescriptor] !==
	                        controlLines[_RunInRootFrame$Deter])
	                  ) {
	                    var _frame =
	                      "\n" +
	                      sampleLines[namePropDescriptor].replace(
	                        " at new ",
	                        " at "
	                      );
	                    fn.displayName &&
	                      _frame.includes("<anonymous>") &&
	                      (_frame = _frame.replace("<anonymous>", fn.displayName));
	                    "function" === typeof fn &&
	                      componentFrameCache.set(fn, _frame);
	                    return _frame;
	                  }
	                while (1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter);
	              }
	              break;
	            }
	        }
	      } finally {
	        (reentry = false),
	          (ReactSharedInternals.H = previousDispatcher),
	          reenableLogs(),
	          (Error.prepareStackTrace = frame);
	      }
	      sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "")
	        ? describeBuiltInComponentFrame(sampleLines)
	        : "";
	      "function" === typeof fn && componentFrameCache.set(fn, sampleLines);
	      return sampleLines;
	    }
	    function describeUnknownElementTypeFrameInDEV(type) {
	      if (null == type) return "";
	      if ("function" === typeof type) {
	        var prototype = type.prototype;
	        return describeNativeComponentFrame(
	          type,
	          !(!prototype || !prototype.isReactComponent)
	        );
	      }
	      if ("string" === typeof type) return describeBuiltInComponentFrame(type);
	      switch (type) {
	        case REACT_SUSPENSE_TYPE:
	          return describeBuiltInComponentFrame("Suspense");
	        case REACT_SUSPENSE_LIST_TYPE:
	          return describeBuiltInComponentFrame("SuspenseList");
	      }
	      if ("object" === typeof type)
	        switch (type.$$typeof) {
	          case REACT_FORWARD_REF_TYPE:
	            return (type = describeNativeComponentFrame(type.render, false)), type;
	          case REACT_MEMO_TYPE:
	            return describeUnknownElementTypeFrameInDEV(type.type);
	          case REACT_LAZY_TYPE:
	            prototype = type._payload;
	            type = type._init;
	            try {
	              return describeUnknownElementTypeFrameInDEV(type(prototype));
	            } catch (x) {}
	        }
	      return "";
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return false;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = true),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = true;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: true
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = true),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(type, key, self, source, owner, props) {
	      self = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== self ? self : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: false,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: false, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: null
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      source,
	      self
	    ) {
	      if (
	        "string" === typeof type ||
	        "function" === typeof type ||
	        type === REACT_FRAGMENT_TYPE ||
	        type === REACT_PROFILER_TYPE ||
	        type === REACT_STRICT_MODE_TYPE ||
	        type === REACT_SUSPENSE_TYPE ||
	        type === REACT_SUSPENSE_LIST_TYPE ||
	        type === REACT_OFFSCREEN_TYPE ||
	        ("object" === typeof type &&
	          null !== type &&
	          (type.$$typeof === REACT_LAZY_TYPE ||
	            type.$$typeof === REACT_MEMO_TYPE ||
	            type.$$typeof === REACT_CONTEXT_TYPE ||
	            type.$$typeof === REACT_CONSUMER_TYPE ||
	            type.$$typeof === REACT_FORWARD_REF_TYPE ||
	            type.$$typeof === REACT_CLIENT_REFERENCE$1 ||
	            void 0 !== type.getModuleId))
	      ) {
	        var children = config.children;
	        if (void 0 !== children)
	          if (isStaticChildren)
	            if (isArrayImpl(children)) {
	              for (
	                isStaticChildren = 0;
	                isStaticChildren < children.length;
	                isStaticChildren++
	              )
	                validateChildKeys(children[isStaticChildren], type);
	              Object.freeze && Object.freeze(children);
	            } else
	              console.error(
	                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	              );
	          else validateChildKeys(children, type);
	      } else {
	        children = "";
	        if (
	          void 0 === type ||
	          ("object" === typeof type &&
	            null !== type &&
	            0 === Object.keys(type).length)
	        )
	          children +=
	            " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
	        null === type
	          ? (isStaticChildren = "null")
	          : isArrayImpl(type)
	            ? (isStaticChildren = "array")
	            : void 0 !== type && type.$$typeof === REACT_ELEMENT_TYPE
	              ? ((isStaticChildren =
	                  "<" +
	                  (getComponentNameFromType(type.type) || "Unknown") +
	                  " />"),
	                (children =
	                  " Did you accidentally export a JSX literal instead of a component?"))
	              : (isStaticChildren = typeof type);
	        console.error(
	          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
	          isStaticChildren,
	          children
	        );
	      }
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = true));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(type, children, self, source, getOwner(), maybeKey);
	    }
	    function validateChildKeys(node, parentType) {
	      if (
	        "object" === typeof node &&
	        node &&
	        node.$$typeof !== REACT_CLIENT_REFERENCE
	      )
	        if (isArrayImpl(node))
	          for (var i = 0; i < node.length; i++) {
	            var child = node[i];
	            isValidElement(child) && validateExplicitKey(child, parentType);
	          }
	        else if (isValidElement(node))
	          node._store && (node._store.validated = 1);
	        else if (
	          (null === node || "object" !== typeof node
	            ? (i = null)
	            : ((i =
	                (MAYBE_ITERATOR_SYMBOL && node[MAYBE_ITERATOR_SYMBOL]) ||
	                node["@@iterator"]),
	              (i = "function" === typeof i ? i : null)),
	          "function" === typeof i &&
	            i !== node.entries &&
	            ((i = i.call(node)), i !== node))
	        )
	          for (; !(node = i.next()).done; )
	            isValidElement(node.value) &&
	              validateExplicitKey(node.value, parentType);
	    }
	    function isValidElement(object) {
	      return (
	        "object" === typeof object &&
	        null !== object &&
	        object.$$typeof === REACT_ELEMENT_TYPE
	      );
	    }
	    function validateExplicitKey(element, parentType) {
	      if (
	        element._store &&
	        !element._store.validated &&
	        null == element.key &&
	        ((element._store.validated = 1),
	        (parentType = getCurrentComponentErrorInfo(parentType)),
	        !ownerHasKeyUseWarning[parentType])
	      ) {
	        ownerHasKeyUseWarning[parentType] = true;
	        var childOwner = "";
	        element &&
	          null != element._owner &&
	          element._owner !== getOwner() &&
	          ((childOwner = null),
	          "number" === typeof element._owner.tag
	            ? (childOwner = getComponentNameFromType(element._owner.type))
	            : "string" === typeof element._owner.name &&
	              (childOwner = element._owner.name),
	          (childOwner = " It was passed a child from " + childOwner + "."));
	        var prevGetCurrentStack = ReactSharedInternals.getCurrentStack;
	        ReactSharedInternals.getCurrentStack = function () {
	          var stack = describeUnknownElementTypeFrameInDEV(element.type);
	          prevGetCurrentStack && (stack += prevGetCurrentStack() || "");
	          return stack;
	        };
	        console.error(
	          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
	          parentType,
	          childOwner
	        );
	        ReactSharedInternals.getCurrentStack = prevGetCurrentStack;
	      }
	    }
	    function getCurrentComponentErrorInfo(parentType) {
	      var info = "",
	        owner = getOwner();
	      owner &&
	        (owner = getComponentNameFromType(owner.type)) &&
	        (info = "\n\nCheck the render method of `" + owner + "`.");
	      info ||
	        ((parentType = getComponentNameFromType(parentType)) &&
	          (info =
	            "\n\nCheck the top-level render call using <" + parentType + ">."));
	      return info;
	    }
	    var React = React__default,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"),
	      MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
	      REACT_CLIENT_REFERENCE$2 = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      assign = Object.assign,
	      REACT_CLIENT_REFERENCE$1 = Symbol.for("react.client.reference"),
	      isArrayImpl = Array.isArray,
	      disabledDepth = 0,
	      prevLog,
	      prevInfo,
	      prevWarn,
	      prevError,
	      prevGroup,
	      prevGroupCollapsed,
	      prevGroupEnd;
	    disabledLog.__reactDisabledLog = true;
	    var prefix,
	      suffix,
	      reentry = false;
	    var componentFrameCache = new (
	      "function" === typeof WeakMap ? WeakMap : Map
	    )();
	    var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var didWarnAboutKeySpread = {},
	      ownerHasKeyUseWarning = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey, source, self) {
	      return jsxDEVImpl(type, config, maybeKey, false, source, self);
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey, source, self) {
	      return jsxDEVImpl(type, config, maybeKey, true, source, self);
	    };
	  })();
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

function ArrowTrendingUpIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
  }));
}
const ForwardRef$7 = /*#__PURE__*/ React.forwardRef(ArrowTrendingUpIcon);

function CircleStackIcon$1({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
  }));
}
const ForwardRef$6 = /*#__PURE__*/ React.forwardRef(CircleStackIcon$1);

function UserCircleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const ForwardRef$5 = /*#__PURE__*/ React.forwardRef(UserCircleIcon);

const Avatar = ({ imageUrl }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (jsxRuntimeExports.jsxs("span", { children: [jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full overflow-hidden cursor-pointer border border-gray-300 dark:border-gray-700", onClick: handleOpenModal, children: imageUrl && !imageError ? (jsxRuntimeExports.jsx("img", { src: imageUrl, alt: "Avatar", className: "w-full h-full object-cover", onError: () => setImageError(true) })) : (jsxRuntimeExports.jsx(ForwardRef$5, { className: "w-full h-full text-gray-400" })) }), isModalOpen && (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50", onClick: handleCloseModal, children: jsxRuntimeExports.jsx("div", { className: "p-2 bg-white rounded-lg shadow-lg", children: imageUrl && !imageError ? (jsxRuntimeExports.jsx("img", { src: imageUrl, alt: "Avatar Large", className: "w-64 h-64 object-cover rounded-lg", onError: () => setImageError(true) })) : (jsxRuntimeExports.jsx(ForwardRef$5, { className: "w-64 h-64 text-gray-400" })) }) }))] }));
};

const AffiliateComponent = ({ affiliates, displayMode = "iconsWithNames", layout = "horizontal", }) => {
    return (jsxRuntimeExports.jsx("div", { className: `flex ${layout === "horizontal" ? "flex-row space-x-4" : "flex-col space-y-3"} items-center`, children: affiliates.map((affiliate, index) => (jsxRuntimeExports.jsx("div", { className: "flex items-center space-x-2", children: affiliate.url ? (jsxRuntimeExports.jsxs("a", { href: affiliate.url, target: "_blank", rel: "noopener noreferrer", className: "flex items-center space-x-2 hover:opacity-80 transition", children: [jsxRuntimeExports.jsx("img", { src: affiliate.icon, alt: affiliate.name, className: "w-8 h-8 rounded-full" }), displayMode === "iconsWithNames" && (jsxRuntimeExports.jsx("span", { className: "text-gray-700 dark:text-gray-300 text-sm font-medium", children: affiliate.name }))] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("img", { src: affiliate.icon, alt: affiliate.name, className: "w-8 h-8 rounded-full" }), displayMode === "iconsWithNames" && (jsxRuntimeExports.jsx("span", { className: "text-gray-700 dark:text-gray-300 text-sm font-medium", children: affiliate.name }))] })) }, index))) }));
};

function Bars3Icon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$4 = /*#__PURE__*/ React.forwardRef(Bars3Icon);

function ChevronDownIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$3 = /*#__PURE__*/ React.forwardRef(ChevronDownIcon);

function CircleStackIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    d: "M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z"
  }));
}
const ForwardRef$2 = /*#__PURE__*/ React.forwardRef(CircleStackIcon);

function MagnifyingGlassIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef$1 = /*#__PURE__*/ React.forwardRef(MagnifyingGlassIcon);

function StarIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = /*#__PURE__*/ React.forwardRef(StarIcon);

const Fav = ({ checked = false }) => {
    const [isChecked, setIsChecked] = useState(checked);
    return (jsxRuntimeExports.jsx("button", { onClick: () => setIsChecked(!isChecked), className: "transition-colors duration-300 text-gray-900 hover:text-teal-400", children: jsxRuntimeExports.jsx(ForwardRef, { className: `w-6 h-6 ${isChecked ? 'fill-teal-400 text-teal-400' : 'fill-gray-700'}` }) }));
};

const Card = ({ title, icon = jsxRuntimeExports.jsx(ForwardRef$7, { className: "w-6 h-6 text-gray-900 dark:text-gray-100" }), children }) => {
    return (jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 mb-4 text-teal-400", children: [icon, jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-teal-400", children: title })] }), jsxRuntimeExports.jsx("div", { children: children })] }));
};

const Grid = ({ children }) => {
    return (jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4", children: children }));
};

var imageExternal = {};

var _interop_require_default$1 = {};

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
_interop_require_default$1._ = _interop_require_default;

var getImgProps = {};

var warnOnce = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "warnOnce", {
	    enumerable: true,
	    get: function() {
	        return warnOnce;
	    }
	});
	let warnOnce = (_)=>{};
	if (process.env.NODE_ENV !== 'production') {
	    const warnings = new Set();
	    warnOnce = (msg)=>{
	        if (!warnings.has(msg)) {
	            console.warn(msg);
	        }
	        warnings.add(msg);
	    };
	}

	
} (warnOnce));

var imageBlurSvg = {};

/**
 * A shared function, used on both client and server, to generate a SVG blur placeholder.
 */

(function (exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "getImageBlurSvg", {
	    enumerable: true,
	    get: function() {
	        return getImageBlurSvg;
	    }
	});
	function getImageBlurSvg(param) {
	    let { widthInt, heightInt, blurWidth, blurHeight, blurDataURL, objectFit } = param;
	    const std = 20;
	    const svgWidth = blurWidth ? blurWidth * 40 : widthInt;
	    const svgHeight = blurHeight ? blurHeight * 40 : heightInt;
	    const viewBox = svgWidth && svgHeight ? "viewBox='0 0 " + svgWidth + " " + svgHeight + "'" : '';
	    const preserveAspectRatio = viewBox ? 'none' : objectFit === 'contain' ? 'xMidYMid' : objectFit === 'cover' ? 'xMidYMid slice' : 'none';
	    return "%3Csvg xmlns='http://www.w3.org/2000/svg' " + viewBox + "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='" + std + "'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='" + std + "'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" + preserveAspectRatio + "' style='filter: url(%23b);' href='" + blurDataURL + "'/%3E%3C/svg%3E";
	}

	
} (imageBlurSvg));

var imageConfig = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function _export(target, all) {
	    for(var name in all)Object.defineProperty(target, name, {
	        enumerable: true,
	        get: all[name]
	    });
	}
	_export(exports, {
	    VALID_LOADERS: function() {
	        return VALID_LOADERS;
	    },
	    imageConfigDefault: function() {
	        return imageConfigDefault;
	    }
	});
	const VALID_LOADERS = [
	    'default',
	    'imgix',
	    'cloudinary',
	    'akamai',
	    'custom'
	];
	const imageConfigDefault = {
	    deviceSizes: [
	        640,
	        750,
	        828,
	        1080,
	        1200,
	        1920,
	        2048,
	        3840
	    ],
	    imageSizes: [
	        16,
	        32,
	        48,
	        64,
	        96,
	        128,
	        256,
	        384
	    ],
	    path: '/_next/image',
	    loader: 'default',
	    loaderFile: '',
	    domains: [],
	    disableStaticImages: false,
	    minimumCacheTTL: 60,
	    formats: [
	        'image/webp'
	    ],
	    dangerouslyAllowSVG: false,
	    contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
	    contentDispositionType: 'attachment',
	    localPatterns: undefined,
	    remotePatterns: [],
	    qualities: undefined,
	    unoptimized: false
	};

	
} (imageConfig));

(function (exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "getImgProps", {
	    enumerable: true,
	    get: function() {
	        return getImgProps;
	    }
	});
	const _warnonce = warnOnce;
	const _imageblursvg = imageBlurSvg;
	const _imageconfig = imageConfig;
	const VALID_LOADING_VALUES = [
	    'lazy',
	    'eager',
	    undefined
	];
	function isStaticRequire(src) {
	    return src.default !== undefined;
	}
	function isStaticImageData(src) {
	    return src.src !== undefined;
	}
	function isStaticImport(src) {
	    return !!src && typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src));
	}
	const allImgs = new Map();
	let perfObserver;
	function getInt(x) {
	    if (typeof x === 'undefined') {
	        return x;
	    }
	    if (typeof x === 'number') {
	        return Number.isFinite(x) ? x : NaN;
	    }
	    if (typeof x === 'string' && /^[0-9]+$/.test(x)) {
	        return parseInt(x, 10);
	    }
	    return NaN;
	}
	function getWidths(param, width, sizes) {
	    let { deviceSizes, allSizes } = param;
	    if (sizes) {
	        // Find all the "vw" percent sizes used in the sizes prop
	        const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
	        const percentSizes = [];
	        for(let match; match = viewportWidthRe.exec(sizes); match){
	            percentSizes.push(parseInt(match[2]));
	        }
	        if (percentSizes.length) {
	            const smallestRatio = Math.min(...percentSizes) * 0.01;
	            return {
	                widths: allSizes.filter((s)=>s >= deviceSizes[0] * smallestRatio),
	                kind: 'w'
	            };
	        }
	        return {
	            widths: allSizes,
	            kind: 'w'
	        };
	    }
	    if (typeof width !== 'number') {
	        return {
	            widths: deviceSizes,
	            kind: 'w'
	        };
	    }
	    const widths = [
	        ...new Set(// > This means that most OLED screens that say they are 3x resolution,
	        // > are actually 3x in the green color, but only 1.5x in the red and
	        // > blue colors. Showing a 3x resolution image in the app vs a 2x
	        // > resolution image will be visually the same, though the 3x image
	        // > takes significantly more data. Even true 3x resolution screens are
	        // > wasteful as the human eye cannot see that level of detail without
	        // > something like a magnifying glass.
	        // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
	        [
	            width,
	            width * 2 /*, width * 3*/ 
	        ].map((w)=>allSizes.find((p)=>p >= w) || allSizes[allSizes.length - 1]))
	    ];
	    return {
	        widths,
	        kind: 'x'
	    };
	}
	function generateImgAttrs(param) {
	    let { config, src, unoptimized, width, quality, sizes, loader } = param;
	    if (unoptimized) {
	        return {
	            src,
	            srcSet: undefined,
	            sizes: undefined
	        };
	    }
	    const { widths, kind } = getWidths(config, width, sizes);
	    const last = widths.length - 1;
	    return {
	        sizes: !sizes && kind === 'w' ? '100vw' : sizes,
	        srcSet: widths.map((w, i)=>loader({
	                config,
	                src,
	                quality,
	                width: w
	            }) + " " + (kind === 'w' ? w : i + 1) + kind).join(', '),
	        // It's intended to keep `src` the last attribute because React updates
	        // attributes in order. If we keep `src` the first one, Safari will
	        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
	        // updated by React. That causes multiple unnecessary requests if `srcSet`
	        // and `sizes` are defined.
	        // This bug cannot be reproduced in Chrome or Firefox.
	        src: loader({
	            config,
	            src,
	            quality,
	            width: widths[last]
	        })
	    };
	}
	function getImgProps(param, _state) {
	    let { src, sizes, unoptimized = false, priority = false, loading, className, quality, width, height, fill = false, style, overrideSrc, onLoad, onLoadingComplete, placeholder = 'empty', blurDataURL, fetchPriority, decoding = 'async', layout, objectFit, objectPosition, lazyBoundary, lazyRoot, ...rest } = param;
	    const { imgConf, showAltText, blurComplete, defaultLoader } = _state;
	    let config;
	    let c = imgConf || _imageconfig.imageConfigDefault;
	    if ('allSizes' in c) {
	        config = c;
	    } else {
	        var _c_qualities;
	        const allSizes = [
	            ...c.deviceSizes,
	            ...c.imageSizes
	        ].sort((a, b)=>a - b);
	        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
	        const qualities = (_c_qualities = c.qualities) == null ? void 0 : _c_qualities.sort((a, b)=>a - b);
	        config = {
	            ...c,
	            allSizes,
	            deviceSizes,
	            qualities
	        };
	    }
	    if (typeof defaultLoader === 'undefined') {
	        throw new Error('images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config');
	    }
	    let loader = rest.loader || defaultLoader;
	    // Remove property so it's not spread on <img> element
	    delete rest.loader;
	    delete rest.srcSet;
	    // This special value indicates that the user
	    // didn't define a "loader" prop or "loader" config.
	    const isDefaultLoader = '__next_img_default' in loader;
	    if (isDefaultLoader) {
	        if (config.loader === 'custom') {
	            throw new Error('Image with src "' + src + '" is missing "loader" prop.' + "\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader");
	        }
	    } else {
	        // The user defined a "loader" prop or config.
	        // Since the config object is internal only, we
	        // must not pass it to the user-defined "loader".
	        const customImageLoader = loader;
	        loader = (obj)=>{
	            const { config: _, ...opts } = obj;
	            return customImageLoader(opts);
	        };
	    }
	    if (layout) {
	        if (layout === 'fill') {
	            fill = true;
	        }
	        const layoutToStyle = {
	            intrinsic: {
	                maxWidth: '100%',
	                height: 'auto'
	            },
	            responsive: {
	                width: '100%',
	                height: 'auto'
	            }
	        };
	        const layoutToSizes = {
	            responsive: '100vw',
	            fill: '100vw'
	        };
	        const layoutStyle = layoutToStyle[layout];
	        if (layoutStyle) {
	            style = {
	                ...style,
	                ...layoutStyle
	            };
	        }
	        const layoutSizes = layoutToSizes[layout];
	        if (layoutSizes && !sizes) {
	            sizes = layoutSizes;
	        }
	    }
	    let staticSrc = '';
	    let widthInt = getInt(width);
	    let heightInt = getInt(height);
	    let blurWidth;
	    let blurHeight;
	    if (isStaticImport(src)) {
	        const staticImageData = isStaticRequire(src) ? src.default : src;
	        if (!staticImageData.src) {
	            throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " + JSON.stringify(staticImageData));
	        }
	        if (!staticImageData.height || !staticImageData.width) {
	            throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " + JSON.stringify(staticImageData));
	        }
	        blurWidth = staticImageData.blurWidth;
	        blurHeight = staticImageData.blurHeight;
	        blurDataURL = blurDataURL || staticImageData.blurDataURL;
	        staticSrc = staticImageData.src;
	        if (!fill) {
	            if (!widthInt && !heightInt) {
	                widthInt = staticImageData.width;
	                heightInt = staticImageData.height;
	            } else if (widthInt && !heightInt) {
	                const ratio = widthInt / staticImageData.width;
	                heightInt = Math.round(staticImageData.height * ratio);
	            } else if (!widthInt && heightInt) {
	                const ratio = heightInt / staticImageData.height;
	                widthInt = Math.round(staticImageData.width * ratio);
	            }
	        }
	    }
	    src = typeof src === 'string' ? src : staticSrc;
	    let isLazy = !priority && (loading === 'lazy' || typeof loading === 'undefined');
	    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
	        // https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
	        unoptimized = true;
	        isLazy = false;
	    }
	    if (config.unoptimized) {
	        unoptimized = true;
	    }
	    if (isDefaultLoader && !config.dangerouslyAllowSVG && src.split('?', 1)[0].endsWith('.svg')) {
	        // Special case to make svg serve as-is to avoid proxying
	        // through the built-in Image Optimization API.
	        unoptimized = true;
	    }
	    const qualityInt = getInt(quality);
	    if (process.env.NODE_ENV !== 'production') {
	        if (config.output === 'export' && isDefaultLoader && !unoptimized) {
	            throw new Error("Image Optimization using the default loader is not compatible with `{ output: 'export' }`.\n  Possible solutions:\n    - Remove `{ output: 'export' }` and run \"next start\" to run server mode including the Image Optimization API.\n    - Configure `{ images: { unoptimized: true } }` in `next.config.js` to disable the Image Optimization API.\n  Read more: https://nextjs.org/docs/messages/export-image-api");
	        }
	        if (!src) {
	            // React doesn't show the stack trace and there's
	            // no `src` to help identify which image, so we
	            // instead console.error(ref) during mount.
	            unoptimized = true;
	        } else {
	            if (fill) {
	                if (width) {
	                    throw new Error('Image with src "' + src + '" has both "width" and "fill" properties. Only one should be used.');
	                }
	                if (height) {
	                    throw new Error('Image with src "' + src + '" has both "height" and "fill" properties. Only one should be used.');
	                }
	                if ((style == null ? void 0 : style.position) && style.position !== 'absolute') {
	                    throw new Error('Image with src "' + src + '" has both "fill" and "style.position" properties. Images with "fill" always use position absolute - it cannot be modified.');
	                }
	                if ((style == null ? void 0 : style.width) && style.width !== '100%') {
	                    throw new Error('Image with src "' + src + '" has both "fill" and "style.width" properties. Images with "fill" always use width 100% - it cannot be modified.');
	                }
	                if ((style == null ? void 0 : style.height) && style.height !== '100%') {
	                    throw new Error('Image with src "' + src + '" has both "fill" and "style.height" properties. Images with "fill" always use height 100% - it cannot be modified.');
	                }
	            } else {
	                if (typeof widthInt === 'undefined') {
	                    throw new Error('Image with src "' + src + '" is missing required "width" property.');
	                } else if (isNaN(widthInt)) {
	                    throw new Error('Image with src "' + src + '" has invalid "width" property. Expected a numeric value in pixels but received "' + width + '".');
	                }
	                if (typeof heightInt === 'undefined') {
	                    throw new Error('Image with src "' + src + '" is missing required "height" property.');
	                } else if (isNaN(heightInt)) {
	                    throw new Error('Image with src "' + src + '" has invalid "height" property. Expected a numeric value in pixels but received "' + height + '".');
	                }
	                // eslint-disable-next-line no-control-regex
	                if (/^[\x00-\x20]/.test(src)) {
	                    throw new Error('Image with src "' + src + '" cannot start with a space or control character. Use src.trimStart() to remove it or encodeURIComponent(src) to keep it.');
	                }
	                // eslint-disable-next-line no-control-regex
	                if (/[\x00-\x20]$/.test(src)) {
	                    throw new Error('Image with src "' + src + '" cannot end with a space or control character. Use src.trimEnd() to remove it or encodeURIComponent(src) to keep it.');
	                }
	            }
	        }
	        if (!VALID_LOADING_VALUES.includes(loading)) {
	            throw new Error('Image with src "' + src + '" has invalid "loading" property. Provided "' + loading + '" should be one of ' + VALID_LOADING_VALUES.map(String).join(',') + ".");
	        }
	        if (priority && loading === 'lazy') {
	            throw new Error('Image with src "' + src + '" has both "priority" and "loading=\'lazy\'" properties. Only one should be used.');
	        }
	        if (placeholder !== 'empty' && placeholder !== 'blur' && !placeholder.startsWith('data:image/')) {
	            throw new Error('Image with src "' + src + '" has invalid "placeholder" property "' + placeholder + '".');
	        }
	        if (placeholder !== 'empty') {
	            if (widthInt && heightInt && widthInt * heightInt < 1600) {
	                (0, _warnonce.warnOnce)('Image with src "' + src + '" is smaller than 40x40. Consider removing the "placeholder" property to improve performance.');
	            }
	        }
	        if (placeholder === 'blur' && !blurDataURL) {
	            const VALID_BLUR_EXT = [
	                'jpeg',
	                'png',
	                'webp',
	                'avif'
	            ] // should match next-image-loader
	            ;
	            throw new Error('Image with src "' + src + '" has "placeholder=\'blur\'" property but is missing the "blurDataURL" property.\n        Possible solutions:\n          - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image\n          - Change the "src" property to a static import with one of the supported file types: ' + VALID_BLUR_EXT.join(',') + ' (animated images not supported)\n          - Remove the "placeholder" property, effectively no blur effect\n        Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url');
	        }
	        if ('ref' in rest) {
	            (0, _warnonce.warnOnce)('Image with src "' + src + '" is using unsupported "ref" property. Consider using the "onLoad" property instead.');
	        }
	        if (!unoptimized && !isDefaultLoader) {
	            const urlStr = loader({
	                config,
	                src,
	                width: widthInt || 400,
	                quality: qualityInt || 75
	            });
	            let url;
	            try {
	                url = new URL(urlStr);
	            } catch (err) {}
	            if (urlStr === src || url && url.pathname === src && !url.search) {
	                (0, _warnonce.warnOnce)('Image with src "' + src + '" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.' + "\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader-width");
	            }
	        }
	        if (onLoadingComplete) {
	            (0, _warnonce.warnOnce)('Image with src "' + src + '" is using deprecated "onLoadingComplete" property. Please use the "onLoad" property instead.');
	        }
	        for (const [legacyKey, legacyValue] of Object.entries({
	            layout,
	            objectFit,
	            objectPosition,
	            lazyBoundary,
	            lazyRoot
	        })){
	            if (legacyValue) {
	                (0, _warnonce.warnOnce)('Image with src "' + src + '" has legacy prop "' + legacyKey + '". Did you forget to run the codemod?' + "\nRead more: https://nextjs.org/docs/messages/next-image-upgrade-to-13");
	            }
	        }
	        if (typeof window !== 'undefined' && !perfObserver && window.PerformanceObserver) {
	            perfObserver = new PerformanceObserver((entryList)=>{
	                for (const entry of entryList.getEntries()){
	                    var _entry_element;
	                    // @ts-ignore - missing "LargestContentfulPaint" class with "element" prop
	                    const imgSrc = (entry == null ? void 0 : (_entry_element = entry.element) == null ? void 0 : _entry_element.src) || '';
	                    const lcpImage = allImgs.get(imgSrc);
	                    if (lcpImage && !lcpImage.priority && lcpImage.placeholder === 'empty' && !lcpImage.src.startsWith('data:') && !lcpImage.src.startsWith('blob:')) {
	                        // https://web.dev/lcp/#measure-lcp-in-javascript
	                        (0, _warnonce.warnOnce)('Image with src "' + lcpImage.src + '" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.' + "\nRead more: https://nextjs.org/docs/api-reference/next/image#priority");
	                    }
	                }
	            });
	            try {
	                perfObserver.observe({
	                    type: 'largest-contentful-paint',
	                    buffered: true
	                });
	            } catch (err) {
	                // Log error but don't crash the app
	                console.error(err);
	            }
	        }
	    }
	    const imgStyle = Object.assign(fill ? {
	        position: 'absolute',
	        height: '100%',
	        width: '100%',
	        left: 0,
	        top: 0,
	        right: 0,
	        bottom: 0,
	        objectFit,
	        objectPosition
	    } : {}, showAltText ? {} : {
	        color: 'transparent'
	    }, style);
	    const backgroundImage = !blurComplete && placeholder !== 'empty' ? placeholder === 'blur' ? 'url("data:image/svg+xml;charset=utf-8,' + (0, _imageblursvg.getImageBlurSvg)({
	        widthInt,
	        heightInt,
	        blurWidth,
	        blurHeight,
	        blurDataURL: blurDataURL || '',
	        objectFit: imgStyle.objectFit
	    }) + '")' : 'url("' + placeholder + '")' // assume `data:image/`
	     : null;
	    let placeholderStyle = backgroundImage ? {
	        backgroundSize: imgStyle.objectFit || 'cover',
	        backgroundPosition: imgStyle.objectPosition || '50% 50%',
	        backgroundRepeat: 'no-repeat',
	        backgroundImage
	    } : {};
	    if (process.env.NODE_ENV === 'development') {
	        if (placeholderStyle.backgroundImage && placeholder === 'blur' && (blurDataURL == null ? void 0 : blurDataURL.startsWith('/'))) {
	            // During `next dev`, we don't want to generate blur placeholders with webpack
	            // because it can delay starting the dev server. Instead, `next-image-loader.js`
	            // will inline a special url to lazily generate the blur placeholder at request time.
	            placeholderStyle.backgroundImage = 'url("' + blurDataURL + '")';
	        }
	    }
	    const imgAttributes = generateImgAttrs({
	        config,
	        src,
	        unoptimized,
	        width: widthInt,
	        quality: qualityInt,
	        sizes,
	        loader
	    });
	    if (process.env.NODE_ENV !== 'production') {
	        if (typeof window !== 'undefined') {
	            let fullUrl;
	            try {
	                fullUrl = new URL(imgAttributes.src);
	            } catch (e) {
	                fullUrl = new URL(imgAttributes.src, window.location.href);
	            }
	            allImgs.set(fullUrl.href, {
	                src,
	                priority,
	                placeholder
	            });
	        }
	    }
	    const props = {
	        ...rest,
	        loading: isLazy ? 'lazy' : loading,
	        fetchPriority,
	        width: widthInt,
	        height: heightInt,
	        decoding,
	        className,
	        style: {
	            ...imgStyle,
	            ...placeholderStyle
	        },
	        sizes: imgAttributes.sizes,
	        srcSet: imgAttributes.srcSet,
	        src: overrideSrc || imgAttributes.src
	    };
	    const meta = {
	        unoptimized,
	        priority,
	        placeholder,
	        fill
	    };
	    return {
	        props,
	        meta
	    };
	}

	
} (getImgProps));

var imageComponent = {exports: {}};

var _interop_require_wildcard$1 = {};

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;

    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();

    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };

    var cache = _getRequireWildcardCache(nodeInterop);

    if (cache && cache.has(obj)) return cache.get(obj);

    var newObj = { __proto__: null };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }

    newObj.default = obj;

    if (cache) cache.set(obj, newObj);

    return newObj;
}
_interop_require_wildcard$1._ = _interop_require_wildcard;

var head = {exports: {}};

var sideEffect = {};

var hasRequiredSideEffect;

function requireSideEffect () {
	if (hasRequiredSideEffect) return sideEffect;
	hasRequiredSideEffect = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return SideEffect;
		    }
		});
		const _react = React__default;
		const isServer = typeof window === 'undefined';
		const useClientOnlyLayoutEffect = isServer ? ()=>{} : _react.useLayoutEffect;
		const useClientOnlyEffect = isServer ? ()=>{} : _react.useEffect;
		function SideEffect(props) {
		    const { headManager, reduceComponentsToState } = props;
		    function emitChange() {
		        if (headManager && headManager.mountedInstances) {
		            const headElements = _react.Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));
		            headManager.updateHead(reduceComponentsToState(headElements, props));
		        }
		    }
		    if (isServer) {
		        var _headManager_mountedInstances;
		        headManager == null ? void 0 : (_headManager_mountedInstances = headManager.mountedInstances) == null ? void 0 : _headManager_mountedInstances.add(props.children);
		        emitChange();
		    }
		    useClientOnlyLayoutEffect(()=>{
		        var _headManager_mountedInstances;
		        headManager == null ? void 0 : (_headManager_mountedInstances = headManager.mountedInstances) == null ? void 0 : _headManager_mountedInstances.add(props.children);
		        return ()=>{
		            var _headManager_mountedInstances;
		            headManager == null ? void 0 : (_headManager_mountedInstances = headManager.mountedInstances) == null ? void 0 : _headManager_mountedInstances.delete(props.children);
		        };
		    });
		    // We need to call `updateHead` method whenever the `SideEffect` is trigger in all
		    // life-cycles: mount, update, unmount. However, if there are multiple `SideEffect`s
		    // being rendered, we only trigger the method from the last one.
		    // This is ensured by keeping the last unflushed `updateHead` in the `_pendingUpdate`
		    // singleton in the layout effect pass, and actually trigger it in the effect pass.
		    useClientOnlyLayoutEffect(()=>{
		        if (headManager) {
		            headManager._pendingUpdate = emitChange;
		        }
		        return ()=>{
		            if (headManager) {
		                headManager._pendingUpdate = emitChange;
		            }
		        };
		    });
		    useClientOnlyEffect(()=>{
		        if (headManager && headManager._pendingUpdate) {
		            headManager._pendingUpdate();
		            headManager._pendingUpdate = null;
		        }
		        return ()=>{
		            if (headManager && headManager._pendingUpdate) {
		                headManager._pendingUpdate();
		                headManager._pendingUpdate = null;
		            }
		        };
		    });
		    return null;
		}

		
	} (sideEffect));
	return sideEffect;
}

var ampContext_sharedRuntime = {};

var hasRequiredAmpContext_sharedRuntime;

function requireAmpContext_sharedRuntime () {
	if (hasRequiredAmpContext_sharedRuntime) return ampContext_sharedRuntime;
	hasRequiredAmpContext_sharedRuntime = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "AmpStateContext", {
		    enumerable: true,
		    get: function() {
		        return AmpStateContext;
		    }
		});
		const _interop_require_default = _interop_require_default$1;
		const _react = /*#__PURE__*/ _interop_require_default._(React__default);
		const AmpStateContext = _react.default.createContext({});
		if (process.env.NODE_ENV !== 'production') {
		    AmpStateContext.displayName = 'AmpStateContext';
		}

		
	} (ampContext_sharedRuntime));
	return ampContext_sharedRuntime;
}

var headManagerContext_sharedRuntime = {};

var hasRequiredHeadManagerContext_sharedRuntime;

function requireHeadManagerContext_sharedRuntime () {
	if (hasRequiredHeadManagerContext_sharedRuntime) return headManagerContext_sharedRuntime;
	hasRequiredHeadManagerContext_sharedRuntime = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "HeadManagerContext", {
		    enumerable: true,
		    get: function() {
		        return HeadManagerContext;
		    }
		});
		const _interop_require_default = _interop_require_default$1;
		const _react = /*#__PURE__*/ _interop_require_default._(React__default);
		const HeadManagerContext = _react.default.createContext({});
		if (process.env.NODE_ENV !== 'production') {
		    HeadManagerContext.displayName = 'HeadManagerContext';
		}

		
	} (headManagerContext_sharedRuntime));
	return headManagerContext_sharedRuntime;
}

var ampMode = {};

var hasRequiredAmpMode;

function requireAmpMode () {
	if (hasRequiredAmpMode) return ampMode;
	hasRequiredAmpMode = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "isInAmpMode", {
		    enumerable: true,
		    get: function() {
		        return isInAmpMode;
		    }
		});
		function isInAmpMode(param) {
		    let { ampFirst = false, hybrid = false, hasQuery = false } = param === void 0 ? {} : param;
		    return ampFirst || hybrid && hasQuery;
		}

		
	} (ampMode));
	return ampMode;
}

var hasRequiredHead;

function requireHead () {
	if (hasRequiredHead) return head.exports;
	hasRequiredHead = 1;
	(function (module, exports) {
		'use client';
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    default: function() {
		        return _default;
		    },
		    defaultHead: function() {
		        return defaultHead;
		    }
		});
		const _interop_require_default = _interop_require_default$1;
		const _interop_require_wildcard = _interop_require_wildcard$1;
		const _jsxruntime = jsxRuntimeExports;
		const _react = /*#__PURE__*/ _interop_require_wildcard._(React__default);
		const _sideeffect = /*#__PURE__*/ _interop_require_default._(requireSideEffect());
		const _ampcontextsharedruntime = requireAmpContext_sharedRuntime();
		const _headmanagercontextsharedruntime = requireHeadManagerContext_sharedRuntime();
		const _ampmode = requireAmpMode();
		const _warnonce = warnOnce;
		function defaultHead(inAmpMode) {
		    if (inAmpMode === void 0) inAmpMode = false;
		    const head = [
		        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
		            charSet: "utf-8"
		        }, "charset")
		    ];
		    if (!inAmpMode) {
		        head.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
		            name: "viewport",
		            content: "width=device-width"
		        }, "viewport"));
		    }
		    return head;
		}
		function onlyReactElement(list, child) {
		    // React children can be "string" or "number" in this case we ignore them for backwards compat
		    if (typeof child === 'string' || typeof child === 'number') {
		        return list;
		    }
		    // Adds support for React.Fragment
		    if (child.type === _react.default.Fragment) {
		        return list.concat(// @ts-expect-error @types/react does not remove fragments but this could also return ReactPortal[]
		        _react.default.Children.toArray(child.props.children).reduce(// @ts-expect-error @types/react does not remove fragments but this could also return ReactPortal[]
		        (fragmentList, fragmentChild)=>{
		            if (typeof fragmentChild === 'string' || typeof fragmentChild === 'number') {
		                return fragmentList;
		            }
		            return fragmentList.concat(fragmentChild);
		        }, []));
		    }
		    return list.concat(child);
		}
		const METATYPES = [
		    'name',
		    'httpEquiv',
		    'charSet',
		    'itemProp'
		];
		/*
		 returns a function for filtering head child elements
		 which shouldn't be duplicated, like <title/>
		 Also adds support for deduplicated `key` properties
		*/ function unique() {
		    const keys = new Set();
		    const tags = new Set();
		    const metaTypes = new Set();
		    const metaCategories = {};
		    return (h)=>{
		        let isUnique = true;
		        let hasKey = false;
		        if (h.key && typeof h.key !== 'number' && h.key.indexOf('$') > 0) {
		            hasKey = true;
		            const key = h.key.slice(h.key.indexOf('$') + 1);
		            if (keys.has(key)) {
		                isUnique = false;
		            } else {
		                keys.add(key);
		            }
		        }
		        // eslint-disable-next-line default-case
		        switch(h.type){
		            case 'title':
		            case 'base':
		                if (tags.has(h.type)) {
		                    isUnique = false;
		                } else {
		                    tags.add(h.type);
		                }
		                break;
		            case 'meta':
		                for(let i = 0, len = METATYPES.length; i < len; i++){
		                    const metatype = METATYPES[i];
		                    if (!h.props.hasOwnProperty(metatype)) continue;
		                    if (metatype === 'charSet') {
		                        if (metaTypes.has(metatype)) {
		                            isUnique = false;
		                        } else {
		                            metaTypes.add(metatype);
		                        }
		                    } else {
		                        const category = h.props[metatype];
		                        const categories = metaCategories[metatype] || new Set();
		                        if ((metatype !== 'name' || !hasKey) && categories.has(category)) {
		                            isUnique = false;
		                        } else {
		                            categories.add(category);
		                            metaCategories[metatype] = categories;
		                        }
		                    }
		                }
		                break;
		        }
		        return isUnique;
		    };
		}
		/**
		 *
		 * @param headChildrenElements List of children of <Head>
		 */ function reduceComponents(headChildrenElements, props) {
		    const { inAmpMode } = props;
		    return headChildrenElements.reduce(onlyReactElement, []).reverse().concat(defaultHead(inAmpMode).reverse()).filter(unique()).reverse().map((c, i)=>{
		        const key = c.key || i;
		        if (process.env.NODE_ENV !== 'development' && process.env.__NEXT_OPTIMIZE_FONTS && !inAmpMode) {
		            if (c.type === 'link' && c.props['href'] && // TODO(prateekbh@): Replace this with const from `constants` when the tree shaking works.
		            [
		                'https://fonts.googleapis.com/css',
		                'https://use.typekit.net/'
		            ].some((url)=>c.props['href'].startsWith(url))) {
		                const newProps = {
		                    ...c.props || {}
		                };
		                newProps['data-href'] = newProps['href'];
		                newProps['href'] = undefined;
		                // Add this attribute to make it easy to identify optimized tags
		                newProps['data-optimized-fonts'] = true;
		                return /*#__PURE__*/ _react.default.cloneElement(c, newProps);
		            }
		        }
		        if (process.env.NODE_ENV === 'development') {
		            // omit JSON-LD structured data snippets from the warning
		            if (c.type === 'script' && c.props['type'] !== 'application/ld+json') {
		                const srcMessage = c.props['src'] ? '<script> tag with src="' + c.props['src'] + '"' : "inline <script>";
		                (0, _warnonce.warnOnce)("Do not add <script> tags using next/head (see " + srcMessage + "). Use next/script instead. \nSee more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component");
		            } else if (c.type === 'link' && c.props['rel'] === 'stylesheet') {
		                (0, _warnonce.warnOnce)('Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="' + c.props['href'] + '"). Use Document instead. \nSee more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component');
		            }
		        }
		        return /*#__PURE__*/ _react.default.cloneElement(c, {
		            key
		        });
		    });
		}
		/**
		 * This component injects elements to `<head>` of your page.
		 * To avoid duplicated `tags` in `<head>` you can use the `key` property, which will make sure every tag is only rendered once.
		 */ function Head(param) {
		    let { children } = param;
		    const ampState = (0, _react.useContext)(_ampcontextsharedruntime.AmpStateContext);
		    const headManager = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
		    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_sideeffect.default, {
		        reduceComponentsToState: reduceComponents,
		        headManager: headManager,
		        inAmpMode: (0, _ampmode.isInAmpMode)(ampState),
		        children: children
		    });
		}
		const _default = Head;

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (head, head.exports));
	return head.exports;
}

var imageConfigContext_sharedRuntime = {};

var hasRequiredImageConfigContext_sharedRuntime;

function requireImageConfigContext_sharedRuntime () {
	if (hasRequiredImageConfigContext_sharedRuntime) return imageConfigContext_sharedRuntime;
	hasRequiredImageConfigContext_sharedRuntime = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "ImageConfigContext", {
		    enumerable: true,
		    get: function() {
		        return ImageConfigContext;
		    }
		});
		const _interop_require_default = _interop_require_default$1;
		const _react = /*#__PURE__*/ _interop_require_default._(React__default);
		const _imageconfig = imageConfig;
		const ImageConfigContext = _react.default.createContext(_imageconfig.imageConfigDefault);
		if (process.env.NODE_ENV !== 'production') {
		    ImageConfigContext.displayName = 'ImageConfigContext';
		}

		
	} (imageConfigContext_sharedRuntime));
	return imageConfigContext_sharedRuntime;
}

var routerContext_sharedRuntime = {};

var hasRequiredRouterContext_sharedRuntime;

function requireRouterContext_sharedRuntime () {
	if (hasRequiredRouterContext_sharedRuntime) return routerContext_sharedRuntime;
	hasRequiredRouterContext_sharedRuntime = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "RouterContext", {
		    enumerable: true,
		    get: function() {
		        return RouterContext;
		    }
		});
		const _interop_require_default = _interop_require_default$1;
		const _react = /*#__PURE__*/ _interop_require_default._(React__default);
		const RouterContext = _react.default.createContext(null);
		if (process.env.NODE_ENV !== 'production') {
		    RouterContext.displayName = 'RouterContext';
		}

		
	} (routerContext_sharedRuntime));
	return routerContext_sharedRuntime;
}

var imageLoader = {};

var matchLocalPattern = {};

var picomatch = {exports: {}};

var hasRequiredPicomatch;

function requirePicomatch () {
	if (hasRequiredPicomatch) return picomatch.exports;
	hasRequiredPicomatch = 1;
	(()=>{var t={170:(t,e,u)=>{const n=u(510);const isWindows=()=>{if(typeof navigator!=="undefined"&&navigator.platform){const t=navigator.platform.toLowerCase();return t==="win32"||t==="windows"}if(typeof process!=="undefined"&&process.platform){return process.platform==="win32"}return false};function picomatch(t,e,u=false){if(e&&(e.windows===null||e.windows===undefined)){e={...e,windows:isWindows()};}return n(t,e,u)}Object.assign(picomatch,n);t.exports=picomatch;},154:t=>{const e="\\\\/";const u=`[^${e}]`;const n="\\.";const o="\\+";const s="\\?";const r="\\/";const a="(?=.)";const i="[^/]";const c=`(?:${r}|$)`;const p=`(?:^|${r})`;const l=`${n}{1,2}${c}`;const f=`(?!${n})`;const A=`(?!${p}${l})`;const _=`(?!${n}{0,1}${c})`;const R=`(?!${l})`;const E=`[^.${r}]`;const h=`${i}*?`;const g="/";const b={DOT_LITERAL:n,PLUS_LITERAL:o,QMARK_LITERAL:s,SLASH_LITERAL:r,ONE_CHAR:a,QMARK:i,END_ANCHOR:c,DOTS_SLASH:l,NO_DOT:f,NO_DOTS:A,NO_DOT_SLASH:_,NO_DOTS_SLASH:R,QMARK_NO_DOT:E,STAR:h,START_ANCHOR:p,SEP:g};const C={...b,SLASH_LITERAL:`[${e}]`,QMARK:u,STAR:`${u}*?`,DOTS_SLASH:`${n}{1,2}(?:[${e}]|$)`,NO_DOT:`(?!${n})`,NO_DOTS:`(?!(?:^|[${e}])${n}{1,2}(?:[${e}]|$))`,NO_DOT_SLASH:`(?!${n}{0,1}(?:[${e}]|$))`,NO_DOTS_SLASH:`(?!${n}{1,2}(?:[${e}]|$))`,QMARK_NO_DOT:`[^.${e}]`,START_ANCHOR:`(?:^|[${e}])`,END_ANCHOR:`(?:[${e}]|$)`,SEP:"\\"};const y={alnum:"a-zA-Z0-9",alpha:"a-zA-Z",ascii:"\\x00-\\x7F",blank:" \\t",cntrl:"\\x00-\\x1F\\x7F",digit:"0-9",graph:"\\x21-\\x7E",lower:"a-z",print:"\\x20-\\x7E ",punct:"\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",space:" \\t\\r\\n\\v\\f",upper:"A-Z",word:"A-Za-z0-9_",xdigit:"A-Fa-f0-9"};t.exports={MAX_LENGTH:1024*64,POSIX_REGEX_SOURCE:y,REGEX_BACKSLASH:/\\(?![*+?^${}(|)[\]])/g,REGEX_NON_SPECIAL_CHARS:/^[^@![\].,$*+?^{}()|\\/]+/,REGEX_SPECIAL_CHARS:/[-*+?.^${}(|)[\]]/,REGEX_SPECIAL_CHARS_BACKREF:/(\\?)((\W)(\3*))/g,REGEX_SPECIAL_CHARS_GLOBAL:/([-*+?.^${}(|)[\]])/g,REGEX_REMOVE_BACKSLASH:/(?:\[.*?[^\\]\]|\\(?=.))/g,REPLACEMENTS:{"***":"*","**/**":"**","**/**/**":"**"},CHAR_0:48,CHAR_9:57,CHAR_UPPERCASE_A:65,CHAR_LOWERCASE_A:97,CHAR_UPPERCASE_Z:90,CHAR_LOWERCASE_Z:122,CHAR_LEFT_PARENTHESES:40,CHAR_RIGHT_PARENTHESES:41,CHAR_ASTERISK:42,CHAR_AMPERSAND:38,CHAR_AT:64,CHAR_BACKWARD_SLASH:92,CHAR_CARRIAGE_RETURN:13,CHAR_CIRCUMFLEX_ACCENT:94,CHAR_COLON:58,CHAR_COMMA:44,CHAR_DOT:46,CHAR_DOUBLE_QUOTE:34,CHAR_EQUAL:61,CHAR_EXCLAMATION_MARK:33,CHAR_FORM_FEED:12,CHAR_FORWARD_SLASH:47,CHAR_GRAVE_ACCENT:96,CHAR_HASH:35,CHAR_HYPHEN_MINUS:45,CHAR_LEFT_ANGLE_BRACKET:60,CHAR_LEFT_CURLY_BRACE:123,CHAR_LEFT_SQUARE_BRACKET:91,CHAR_LINE_FEED:10,CHAR_NO_BREAK_SPACE:160,CHAR_PERCENT:37,CHAR_PLUS:43,CHAR_QUESTION_MARK:63,CHAR_RIGHT_ANGLE_BRACKET:62,CHAR_RIGHT_CURLY_BRACE:125,CHAR_RIGHT_SQUARE_BRACKET:93,CHAR_SEMICOLON:59,CHAR_SINGLE_QUOTE:39,CHAR_SPACE:32,CHAR_TAB:9,CHAR_UNDERSCORE:95,CHAR_VERTICAL_LINE:124,CHAR_ZERO_WIDTH_NOBREAK_SPACE:65279,extglobChars(t){return {"!":{type:"negate",open:"(?:(?!(?:",close:`))${t.STAR})`},"?":{type:"qmark",open:"(?:",close:")?"},"+":{type:"plus",open:"(?:",close:")+"},"*":{type:"star",open:"(?:",close:")*"},"@":{type:"at",open:"(?:",close:")"}}},globChars(t){return t===true?C:b}};},697:(t,e,u)=>{const n=u(154);const o=u(96);const{MAX_LENGTH:s,POSIX_REGEX_SOURCE:r,REGEX_NON_SPECIAL_CHARS:a,REGEX_SPECIAL_CHARS_BACKREF:i,REPLACEMENTS:c}=n;const expandRange=(t,e)=>{if(typeof e.expandRange==="function"){return e.expandRange(...t,e)}t.sort();const u=`[${t.join("-")}]`;try{new RegExp(u);}catch(e){return t.map((t=>o.escapeRegex(t))).join("..")}return u};const syntaxError=(t,e)=>`Missing ${t}: "${e}" - use "\\\\${e}" to match literal characters`;const parse=(t,e)=>{if(typeof t!=="string"){throw new TypeError("Expected a string")}t=c[t]||t;const u={...e};const p=typeof u.maxLength==="number"?Math.min(s,u.maxLength):s;let l=t.length;if(l>p){throw new SyntaxError(`Input length: ${l}, exceeds maximum allowed length: ${p}`)}const f={type:"bos",value:"",output:u.prepend||""};const A=[f];const _=u.capture?"":"?:";const R=n.globChars(u.windows);const E=n.extglobChars(R);const{DOT_LITERAL:h,PLUS_LITERAL:g,SLASH_LITERAL:b,ONE_CHAR:C,DOTS_SLASH:y,NO_DOT:$,NO_DOT_SLASH:x,NO_DOTS_SLASH:S,QMARK:H,QMARK_NO_DOT:v,STAR:d,START_ANCHOR:L}=R;const globstar=t=>`(${_}(?:(?!${L}${t.dot?y:h}).)*?)`;const T=u.dot?"":$;const O=u.dot?H:v;let k=u.bash===true?globstar(u):d;if(u.capture){k=`(${k})`;}if(typeof u.noext==="boolean"){u.noextglob=u.noext;}const m={input:t,index:-1,start:0,dot:u.dot===true,consumed:"",output:"",prefix:"",backtrack:false,negated:false,brackets:0,braces:0,parens:0,quotes:0,globstar:false,tokens:A};t=o.removePrefix(t,m);l=t.length;const w=[];const N=[];const I=[];let B=f;let G;const eos=()=>m.index===l-1;const D=m.peek=(e=1)=>t[m.index+e];const M=m.advance=()=>t[++m.index]||"";const remaining=()=>t.slice(m.index+1);const consume=(t="",e=0)=>{m.consumed+=t;m.index+=e;};const append=t=>{m.output+=t.output!=null?t.output:t.value;consume(t.value);};const negate=()=>{let t=1;while(D()==="!"&&(D(2)!=="("||D(3)==="?")){M();m.start++;t++;}if(t%2===0){return false}m.negated=true;m.start++;return true};const increment=t=>{m[t]++;I.push(t);};const decrement=t=>{m[t]--;I.pop();};const push=t=>{if(B.type==="globstar"){const e=m.braces>0&&(t.type==="comma"||t.type==="brace");const u=t.extglob===true||w.length&&(t.type==="pipe"||t.type==="paren");if(t.type!=="slash"&&t.type!=="paren"&&!e&&!u){m.output=m.output.slice(0,-B.output.length);B.type="star";B.value="*";B.output=k;m.output+=B.output;}}if(w.length&&t.type!=="paren"){w[w.length-1].inner+=t.value;}if(t.value||t.output)append(t);if(B&&B.type==="text"&&t.type==="text"){B.output=(B.output||B.value)+t.value;B.value+=t.value;return}t.prev=B;A.push(t);B=t;};const extglobOpen=(t,e)=>{const n={...E[e],conditions:1,inner:""};n.prev=B;n.parens=m.parens;n.output=m.output;const o=(u.capture?"(":"")+n.open;increment("parens");push({type:t,value:e,output:m.output?"":C});push({type:"paren",extglob:true,value:M(),output:o});w.push(n);};const extglobClose=t=>{let n=t.close+(u.capture?")":"");let o;if(t.type==="negate"){let s=k;if(t.inner&&t.inner.length>1&&t.inner.includes("/")){s=globstar(u);}if(s!==k||eos()||/^\)+$/.test(remaining())){n=t.close=`)$))${s}`;}if(t.inner.includes("*")&&(o=remaining())&&/^\.[^\\/.]+$/.test(o)){const u=parse(o,{...e,fastpaths:false}).output;n=t.close=`)${u})${s})`;}if(t.prev.type==="bos"){m.negatedExtglob=true;}}push({type:"paren",extglob:true,value:G,output:n});decrement("parens");};if(u.fastpaths!==false&&!/(^[*!]|[/()[\]{}"])/.test(t)){let n=false;let s=t.replace(i,((t,e,u,o,s,r)=>{if(o==="\\"){n=true;return t}if(o==="?"){if(e){return e+o+(s?H.repeat(s.length):"")}if(r===0){return O+(s?H.repeat(s.length):"")}return H.repeat(u.length)}if(o==="."){return h.repeat(u.length)}if(o==="*"){if(e){return e+o+(s?k:"")}return k}return e?t:`\\${t}`}));if(n===true){if(u.unescape===true){s=s.replace(/\\/g,"");}else {s=s.replace(/\\+/g,(t=>t.length%2===0?"\\\\":t?"\\":""));}}if(s===t&&u.contains===true){m.output=t;return m}m.output=o.wrapOutput(s,m,e);return m}while(!eos()){G=M();if(G==="\0"){continue}if(G==="\\"){const t=D();if(t==="/"&&u.bash!==true){continue}if(t==="."||t===";"){continue}if(!t){G+="\\";push({type:"text",value:G});continue}const e=/^\\+/.exec(remaining());let n=0;if(e&&e[0].length>2){n=e[0].length;m.index+=n;if(n%2!==0){G+="\\";}}if(u.unescape===true){G=M();}else {G+=M();}if(m.brackets===0){push({type:"text",value:G});continue}}if(m.brackets>0&&(G!=="]"||B.value==="["||B.value==="[^")){if(u.posix!==false&&G===":"){const t=B.value.slice(1);if(t.includes("[")){B.posix=true;if(t.includes(":")){const t=B.value.lastIndexOf("[");const e=B.value.slice(0,t);const u=B.value.slice(t+2);const n=r[u];if(n){B.value=e+n;m.backtrack=true;M();if(!f.output&&A.indexOf(B)===1){f.output=C;}continue}}}}if(G==="["&&D()!==":"||G==="-"&&D()==="]"){G=`\\${G}`;}if(G==="]"&&(B.value==="["||B.value==="[^")){G=`\\${G}`;}if(u.posix===true&&G==="!"&&B.value==="["){G="^";}B.value+=G;append({value:G});continue}if(m.quotes===1&&G!=='"'){G=o.escapeRegex(G);B.value+=G;append({value:G});continue}if(G==='"'){m.quotes=m.quotes===1?0:1;if(u.keepQuotes===true){push({type:"text",value:G});}continue}if(G==="("){increment("parens");push({type:"paren",value:G});continue}if(G===")"){if(m.parens===0&&u.strictBrackets===true){throw new SyntaxError(syntaxError("opening","("))}const t=w[w.length-1];if(t&&m.parens===t.parens+1){extglobClose(w.pop());continue}push({type:"paren",value:G,output:m.parens?")":"\\)"});decrement("parens");continue}if(G==="["){if(u.nobracket===true||!remaining().includes("]")){if(u.nobracket!==true&&u.strictBrackets===true){throw new SyntaxError(syntaxError("closing","]"))}G=`\\${G}`;}else {increment("brackets");}push({type:"bracket",value:G});continue}if(G==="]"){if(u.nobracket===true||B&&B.type==="bracket"&&B.value.length===1){push({type:"text",value:G,output:`\\${G}`});continue}if(m.brackets===0){if(u.strictBrackets===true){throw new SyntaxError(syntaxError("opening","["))}push({type:"text",value:G,output:`\\${G}`});continue}decrement("brackets");const t=B.value.slice(1);if(B.posix!==true&&t[0]==="^"&&!t.includes("/")){G=`/${G}`;}B.value+=G;append({value:G});if(u.literalBrackets===false||o.hasRegexChars(t)){continue}const e=o.escapeRegex(B.value);m.output=m.output.slice(0,-B.value.length);if(u.literalBrackets===true){m.output+=e;B.value=e;continue}B.value=`(${_}${e}|${B.value})`;m.output+=B.value;continue}if(G==="{"&&u.nobrace!==true){increment("braces");const t={type:"brace",value:G,output:"(",outputIndex:m.output.length,tokensIndex:m.tokens.length};N.push(t);push(t);continue}if(G==="}"){const t=N[N.length-1];if(u.nobrace===true||!t){push({type:"text",value:G,output:G});continue}let e=")";if(t.dots===true){const t=A.slice();const n=[];for(let e=t.length-1;e>=0;e--){A.pop();if(t[e].type==="brace"){break}if(t[e].type!=="dots"){n.unshift(t[e].value);}}e=expandRange(n,u);m.backtrack=true;}if(t.comma!==true&&t.dots!==true){const u=m.output.slice(0,t.outputIndex);const n=m.tokens.slice(t.tokensIndex);t.value=t.output="\\{";G=e="\\}";m.output=u;for(const t of n){m.output+=t.output||t.value;}}push({type:"brace",value:G,output:e});decrement("braces");N.pop();continue}if(G==="|"){if(w.length>0){w[w.length-1].conditions++;}push({type:"text",value:G});continue}if(G===","){let t=G;const e=N[N.length-1];if(e&&I[I.length-1]==="braces"){e.comma=true;t="|";}push({type:"comma",value:G,output:t});continue}if(G==="/"){if(B.type==="dot"&&m.index===m.start+1){m.start=m.index+1;m.consumed="";m.output="";A.pop();B=f;continue}push({type:"slash",value:G,output:b});continue}if(G==="."){if(m.braces>0&&B.type==="dot"){if(B.value===".")B.output=h;const t=N[N.length-1];B.type="dots";B.output+=G;B.value+=G;t.dots=true;continue}if(m.braces+m.parens===0&&B.type!=="bos"&&B.type!=="slash"){push({type:"text",value:G,output:h});continue}push({type:"dot",value:G,output:h});continue}if(G==="?"){const t=B&&B.value==="(";if(!t&&u.noextglob!==true&&D()==="("&&D(2)!=="?"){extglobOpen("qmark",G);continue}if(B&&B.type==="paren"){const t=D();let e=G;if(B.value==="("&&!/[!=<:]/.test(t)||t==="<"&&!/<([!=]|\w+>)/.test(remaining())){e=`\\${G}`;}push({type:"text",value:G,output:e});continue}if(u.dot!==true&&(B.type==="slash"||B.type==="bos")){push({type:"qmark",value:G,output:v});continue}push({type:"qmark",value:G,output:H});continue}if(G==="!"){if(u.noextglob!==true&&D()==="("){if(D(2)!=="?"||!/[!=<:]/.test(D(3))){extglobOpen("negate",G);continue}}if(u.nonegate!==true&&m.index===0){negate();continue}}if(G==="+"){if(u.noextglob!==true&&D()==="("&&D(2)!=="?"){extglobOpen("plus",G);continue}if(B&&B.value==="("||u.regex===false){push({type:"plus",value:G,output:g});continue}if(B&&(B.type==="bracket"||B.type==="paren"||B.type==="brace")||m.parens>0){push({type:"plus",value:G});continue}push({type:"plus",value:g});continue}if(G==="@"){if(u.noextglob!==true&&D()==="("&&D(2)!=="?"){push({type:"at",extglob:true,value:G,output:""});continue}push({type:"text",value:G});continue}if(G!=="*"){if(G==="$"||G==="^"){G=`\\${G}`;}const t=a.exec(remaining());if(t){G+=t[0];m.index+=t[0].length;}push({type:"text",value:G});continue}if(B&&(B.type==="globstar"||B.star===true)){B.type="star";B.star=true;B.value+=G;B.output=k;m.backtrack=true;m.globstar=true;consume(G);continue}let e=remaining();if(u.noextglob!==true&&/^\([^?]/.test(e)){extglobOpen("star",G);continue}if(B.type==="star"){if(u.noglobstar===true){consume(G);continue}const n=B.prev;const o=n.prev;const s=n.type==="slash"||n.type==="bos";const r=o&&(o.type==="star"||o.type==="globstar");if(u.bash===true&&(!s||e[0]&&e[0]!=="/")){push({type:"star",value:G,output:""});continue}const a=m.braces>0&&(n.type==="comma"||n.type==="brace");const i=w.length&&(n.type==="pipe"||n.type==="paren");if(!s&&n.type!=="paren"&&!a&&!i){push({type:"star",value:G,output:""});continue}while(e.slice(0,3)==="/**"){const u=t[m.index+4];if(u&&u!=="/"){break}e=e.slice(3);consume("/**",3);}if(n.type==="bos"&&eos()){B.type="globstar";B.value+=G;B.output=globstar(u);m.output=B.output;m.globstar=true;consume(G);continue}if(n.type==="slash"&&n.prev.type!=="bos"&&!r&&eos()){m.output=m.output.slice(0,-(n.output+B.output).length);n.output=`(?:${n.output}`;B.type="globstar";B.output=globstar(u)+(u.strictSlashes?")":"|$)");B.value+=G;m.globstar=true;m.output+=n.output+B.output;consume(G);continue}if(n.type==="slash"&&n.prev.type!=="bos"&&e[0]==="/"){const t=e[1]!==void 0?"|$":"";m.output=m.output.slice(0,-(n.output+B.output).length);n.output=`(?:${n.output}`;B.type="globstar";B.output=`${globstar(u)}${b}|${b}${t})`;B.value+=G;m.output+=n.output+B.output;m.globstar=true;consume(G+M());push({type:"slash",value:"/",output:""});continue}if(n.type==="bos"&&e[0]==="/"){B.type="globstar";B.value+=G;B.output=`(?:^|${b}|${globstar(u)}${b})`;m.output=B.output;m.globstar=true;consume(G+M());push({type:"slash",value:"/",output:""});continue}m.output=m.output.slice(0,-B.output.length);B.type="globstar";B.output=globstar(u);B.value+=G;m.output+=B.output;m.globstar=true;consume(G);continue}const n={type:"star",value:G,output:k};if(u.bash===true){n.output=".*?";if(B.type==="bos"||B.type==="slash"){n.output=T+n.output;}push(n);continue}if(B&&(B.type==="bracket"||B.type==="paren")&&u.regex===true){n.output=G;push(n);continue}if(m.index===m.start||B.type==="slash"||B.type==="dot"){if(B.type==="dot"){m.output+=x;B.output+=x;}else if(u.dot===true){m.output+=S;B.output+=S;}else {m.output+=T;B.output+=T;}if(D()!=="*"){m.output+=C;B.output+=C;}}push(n);}while(m.brackets>0){if(u.strictBrackets===true)throw new SyntaxError(syntaxError("closing","]"));m.output=o.escapeLast(m.output,"[");decrement("brackets");}while(m.parens>0){if(u.strictBrackets===true)throw new SyntaxError(syntaxError("closing",")"));m.output=o.escapeLast(m.output,"(");decrement("parens");}while(m.braces>0){if(u.strictBrackets===true)throw new SyntaxError(syntaxError("closing","}"));m.output=o.escapeLast(m.output,"{");decrement("braces");}if(u.strictSlashes!==true&&(B.type==="star"||B.type==="bracket")){push({type:"maybe_slash",value:"",output:`${b}?`});}if(m.backtrack===true){m.output="";for(const t of m.tokens){m.output+=t.output!=null?t.output:t.value;if(t.suffix){m.output+=t.suffix;}}}return m};parse.fastpaths=(t,e)=>{const u={...e};const r=typeof u.maxLength==="number"?Math.min(s,u.maxLength):s;const a=t.length;if(a>r){throw new SyntaxError(`Input length: ${a}, exceeds maximum allowed length: ${r}`)}t=c[t]||t;const{DOT_LITERAL:i,SLASH_LITERAL:p,ONE_CHAR:l,DOTS_SLASH:f,NO_DOT:A,NO_DOTS:_,NO_DOTS_SLASH:R,STAR:E,START_ANCHOR:h}=n.globChars(u.windows);const g=u.dot?_:A;const b=u.dot?R:A;const C=u.capture?"":"?:";const y={negated:false,prefix:""};let $=u.bash===true?".*?":E;if(u.capture){$=`(${$})`;}const globstar=t=>{if(t.noglobstar===true)return $;return `(${C}(?:(?!${h}${t.dot?f:i}).)*?)`};const create=t=>{switch(t){case "*":return `${g}${l}${$}`;case ".*":return `${i}${l}${$}`;case "*.*":return `${g}${$}${i}${l}${$}`;case "*/*":return `${g}${$}${p}${l}${b}${$}`;case "**":return g+globstar(u);case "**/*":return `(?:${g}${globstar(u)}${p})?${b}${l}${$}`;case "**/*.*":return `(?:${g}${globstar(u)}${p})?${b}${$}${i}${l}${$}`;case "**/.*":return `(?:${g}${globstar(u)}${p})?${i}${l}${$}`;default:{const e=/^(.*?)\.(\w+)$/.exec(t);if(!e)return;const u=create(e[1]);if(!u)return;return u+i+e[2]}}};const x=o.removePrefix(t,y);let S=create(x);if(S&&u.strictSlashes!==true){S+=`${p}?`;}return S};t.exports=parse;},510:(t,e,u)=>{const n=u(716);const o=u(697);const s=u(96);const r=u(154);const isObject=t=>t&&typeof t==="object"&&!Array.isArray(t);const picomatch=(t,e,u=false)=>{if(Array.isArray(t)){const n=t.map((t=>picomatch(t,e,u)));const arrayMatcher=t=>{for(const e of n){const u=e(t);if(u)return u}return false};return arrayMatcher}const n=isObject(t)&&t.tokens&&t.input;if(t===""||typeof t!=="string"&&!n){throw new TypeError("Expected pattern to be a non-empty string")}const o=e||{};const s=o.windows;const r=n?picomatch.compileRe(t,e):picomatch.makeRe(t,e,false,true);const a=r.state;delete r.state;let isIgnored=()=>false;if(o.ignore){const t={...e,ignore:null,onMatch:null,onResult:null};isIgnored=picomatch(o.ignore,t,u);}const matcher=(u,n=false)=>{const{isMatch:i,match:c,output:p}=picomatch.test(u,r,e,{glob:t,posix:s});const l={glob:t,state:a,regex:r,posix:s,input:u,output:p,match:c,isMatch:i};if(typeof o.onResult==="function"){o.onResult(l);}if(i===false){l.isMatch=false;return n?l:false}if(isIgnored(u)){if(typeof o.onIgnore==="function"){o.onIgnore(l);}l.isMatch=false;return n?l:false}if(typeof o.onMatch==="function"){o.onMatch(l);}return n?l:true};if(u){matcher.state=a;}return matcher};picomatch.test=(t,e,u,{glob:n,posix:o}={})=>{if(typeof t!=="string"){throw new TypeError("Expected input to be a string")}if(t===""){return {isMatch:false,output:""}}const r=u||{};const a=r.format||(o?s.toPosixSlashes:null);let i=t===n;let c=i&&a?a(t):t;if(i===false){c=a?a(t):t;i=c===n;}if(i===false||r.capture===true){if(r.matchBase===true||r.basename===true){i=picomatch.matchBase(t,e,u,o);}else {i=e.exec(c);}}return {isMatch:Boolean(i),match:i,output:c}};picomatch.matchBase=(t,e,u)=>{const n=e instanceof RegExp?e:picomatch.makeRe(e,u);return n.test(s.basename(t))};picomatch.isMatch=(t,e,u)=>picomatch(e,u)(t);picomatch.parse=(t,e)=>{if(Array.isArray(t))return t.map((t=>picomatch.parse(t,e)));return o(t,{...e,fastpaths:false})};picomatch.scan=(t,e)=>n(t,e);picomatch.compileRe=(t,e,u=false,n=false)=>{if(u===true){return t.output}const o=e||{};const s=o.contains?"":"^";const r=o.contains?"":"$";let a=`${s}(?:${t.output})${r}`;if(t&&t.negated===true){a=`^(?!${a}).*$`;}const i=picomatch.toRegex(a,e);if(n===true){i.state=t;}return i};picomatch.makeRe=(t,e={},u=false,n=false)=>{if(!t||typeof t!=="string"){throw new TypeError("Expected a non-empty string")}let s={negated:false,fastpaths:true};if(e.fastpaths!==false&&(t[0]==="."||t[0]==="*")){s.output=o.fastpaths(t,e);}if(!s.output){s=o(t,e);}return picomatch.compileRe(s,e,u,n)};picomatch.toRegex=(t,e)=>{try{const u=e||{};return new RegExp(t,u.flags||(u.nocase?"i":""))}catch(t){if(e&&e.debug===true)throw t;return /$^/}};picomatch.constants=r;t.exports=picomatch;},716:(t,e,u)=>{const n=u(96);const{CHAR_ASTERISK:o,CHAR_AT:s,CHAR_BACKWARD_SLASH:r,CHAR_COMMA:a,CHAR_DOT:i,CHAR_EXCLAMATION_MARK:c,CHAR_FORWARD_SLASH:p,CHAR_LEFT_CURLY_BRACE:l,CHAR_LEFT_PARENTHESES:f,CHAR_LEFT_SQUARE_BRACKET:A,CHAR_PLUS:_,CHAR_QUESTION_MARK:R,CHAR_RIGHT_CURLY_BRACE:E,CHAR_RIGHT_PARENTHESES:h,CHAR_RIGHT_SQUARE_BRACKET:g}=u(154);const isPathSeparator=t=>t===p||t===r;const depth=t=>{if(t.isPrefix!==true){t.depth=t.isGlobstar?Infinity:1;}};const scan=(t,e)=>{const u=e||{};const b=t.length-1;const C=u.parts===true||u.scanToEnd===true;const y=[];const $=[];const x=[];let S=t;let H=-1;let v=0;let d=0;let L=false;let T=false;let O=false;let k=false;let m=false;let w=false;let N=false;let I=false;let B=false;let G=false;let D=0;let M;let P;let K={value:"",depth:0,isGlob:false};const eos=()=>H>=b;const peek=()=>S.charCodeAt(H+1);const advance=()=>{M=P;return S.charCodeAt(++H)};while(H<b){P=advance();let t;if(P===r){N=K.backslashes=true;P=advance();if(P===l){w=true;}continue}if(w===true||P===l){D++;while(eos()!==true&&(P=advance())){if(P===r){N=K.backslashes=true;advance();continue}if(P===l){D++;continue}if(w!==true&&P===i&&(P=advance())===i){L=K.isBrace=true;O=K.isGlob=true;G=true;if(C===true){continue}break}if(w!==true&&P===a){L=K.isBrace=true;O=K.isGlob=true;G=true;if(C===true){continue}break}if(P===E){D--;if(D===0){w=false;L=K.isBrace=true;G=true;break}}}if(C===true){continue}break}if(P===p){y.push(H);$.push(K);K={value:"",depth:0,isGlob:false};if(G===true)continue;if(M===i&&H===v+1){v+=2;continue}d=H+1;continue}if(u.noext!==true){const t=P===_||P===s||P===o||P===R||P===c;if(t===true&&peek()===f){O=K.isGlob=true;k=K.isExtglob=true;G=true;if(P===c&&H===v){B=true;}if(C===true){while(eos()!==true&&(P=advance())){if(P===r){N=K.backslashes=true;P=advance();continue}if(P===h){O=K.isGlob=true;G=true;break}}continue}break}}if(P===o){if(M===o)m=K.isGlobstar=true;O=K.isGlob=true;G=true;if(C===true){continue}break}if(P===R){O=K.isGlob=true;G=true;if(C===true){continue}break}if(P===A){while(eos()!==true&&(t=advance())){if(t===r){N=K.backslashes=true;advance();continue}if(t===g){T=K.isBracket=true;O=K.isGlob=true;G=true;break}}if(C===true){continue}break}if(u.nonegate!==true&&P===c&&H===v){I=K.negated=true;v++;continue}if(u.noparen!==true&&P===f){O=K.isGlob=true;if(C===true){while(eos()!==true&&(P=advance())){if(P===f){N=K.backslashes=true;P=advance();continue}if(P===h){G=true;break}}continue}break}if(O===true){G=true;if(C===true){continue}break}}if(u.noext===true){k=false;O=false;}let U=S;let X="";let F="";if(v>0){X=S.slice(0,v);S=S.slice(v);d-=v;}if(U&&O===true&&d>0){U=S.slice(0,d);F=S.slice(d);}else if(O===true){U="";F=S;}else {U=S;}if(U&&U!==""&&U!=="/"&&U!==S){if(isPathSeparator(U.charCodeAt(U.length-1))){U=U.slice(0,-1);}}if(u.unescape===true){if(F)F=n.removeBackslashes(F);if(U&&N===true){U=n.removeBackslashes(U);}}const Q={prefix:X,input:t,start:v,base:U,glob:F,isBrace:L,isBracket:T,isGlob:O,isExtglob:k,isGlobstar:m,negated:I,negatedExtglob:B};if(u.tokens===true){Q.maxDepth=0;if(!isPathSeparator(P)){$.push(K);}Q.tokens=$;}if(u.parts===true||u.tokens===true){let e;for(let n=0;n<y.length;n++){const o=e?e+1:v;const s=y[n];const r=t.slice(o,s);if(u.tokens){if(n===0&&v!==0){$[n].isPrefix=true;$[n].value=X;}else {$[n].value=r;}depth($[n]);Q.maxDepth+=$[n].depth;}if(n!==0||r!==""){x.push(r);}e=s;}if(e&&e+1<t.length){const n=t.slice(e+1);x.push(n);if(u.tokens){$[$.length-1].value=n;depth($[$.length-1]);Q.maxDepth+=$[$.length-1].depth;}}Q.slashes=y;Q.parts=x;}return Q};t.exports=scan;},96:(t,e,u)=>{const{REGEX_BACKSLASH:n,REGEX_REMOVE_BACKSLASH:o,REGEX_SPECIAL_CHARS:s,REGEX_SPECIAL_CHARS_GLOBAL:r}=u(154);e.isObject=t=>t!==null&&typeof t==="object"&&!Array.isArray(t);e.hasRegexChars=t=>s.test(t);e.isRegexChar=t=>t.length===1&&e.hasRegexChars(t);e.escapeRegex=t=>t.replace(r,"\\$1");e.toPosixSlashes=t=>t.replace(n,"/");e.removeBackslashes=t=>t.replace(o,(t=>t==="\\"?"":t));e.escapeLast=(t,u,n)=>{const o=t.lastIndexOf(u,n);if(o===-1)return t;if(t[o-1]==="\\")return e.escapeLast(t,u,o-1);return `${t.slice(0,o)}\\${t.slice(o)}`};e.removePrefix=(t,e={})=>{let u=t;if(u.startsWith("./")){u=u.slice(2);e.prefix="./";}return u};e.wrapOutput=(t,e={},u={})=>{const n=u.contains?"":"^";const o=u.contains?"":"$";let s=`${n}(?:${t})${o}`;if(e.negated===true){s=`(?:^(?!${s}).*$)`;}return s};e.basename=(t,{windows:e}={})=>{const u=t.split(e?/[\\/]/:"/");const n=u[u.length-1];if(n===""){return u[u.length-2]}return n};}};var e={};function __nccwpck_require__(u){var n=e[u];if(n!==undefined){return n.exports}var o=e[u]={exports:{}};var s=true;try{t[u](o,o.exports,__nccwpck_require__);s=false;}finally{if(s)delete e[u];}return o.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var u=__nccwpck_require__(170);picomatch.exports=u;})();
	return picomatch.exports;
}

var hasRequiredMatchLocalPattern;

function requireMatchLocalPattern () {
	if (hasRequiredMatchLocalPattern) return matchLocalPattern;
	hasRequiredMatchLocalPattern = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    hasLocalMatch: function() {
		        return hasLocalMatch;
		    },
		    matchLocalPattern: function() {
		        return matchLocalPattern;
		    }
		});
		const _picomatch = requirePicomatch();
		function matchLocalPattern(pattern, url) {
		    if (pattern.search !== undefined) {
		        if (pattern.search !== url.search) {
		            return false;
		        }
		    }
		    var _pattern_pathname;
		    if (!(0, _picomatch.makeRe)((_pattern_pathname = pattern.pathname) != null ? _pattern_pathname : '**', {
		        dot: true
		    }).test(url.pathname)) {
		        return false;
		    }
		    return true;
		}
		function hasLocalMatch(localPatterns, urlPathAndQuery) {
		    if (!localPatterns) {
		        // if the user didn't define "localPatterns", we allow all local images
		        return true;
		    }
		    const url = new URL(urlPathAndQuery, 'http://n');
		    return localPatterns.some((p)=>matchLocalPattern(p, url));
		}

		
	} (matchLocalPattern));
	return matchLocalPattern;
}

var matchRemotePattern = {};

var hasRequiredMatchRemotePattern;

function requireMatchRemotePattern () {
	if (hasRequiredMatchRemotePattern) return matchRemotePattern;
	hasRequiredMatchRemotePattern = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    hasRemoteMatch: function() {
		        return hasRemoteMatch;
		    },
		    matchRemotePattern: function() {
		        return matchRemotePattern;
		    }
		});
		const _picomatch = requirePicomatch();
		function matchRemotePattern(pattern, url) {
		    if (pattern.protocol !== undefined) {
		        const actualProto = url.protocol.slice(0, -1);
		        if (pattern.protocol !== actualProto) {
		            return false;
		        }
		    }
		    if (pattern.port !== undefined) {
		        if (pattern.port !== url.port) {
		            return false;
		        }
		    }
		    if (pattern.hostname === undefined) {
		        throw new Error("Pattern should define hostname but found\n" + JSON.stringify(pattern));
		    } else {
		        if (!(0, _picomatch.makeRe)(pattern.hostname).test(url.hostname)) {
		            return false;
		        }
		    }
		    if (pattern.search !== undefined) {
		        if (pattern.search !== url.search) {
		            return false;
		        }
		    }
		    var _pattern_pathname;
		    // Should be the same as writeImagesManifest()
		    if (!(0, _picomatch.makeRe)((_pattern_pathname = pattern.pathname) != null ? _pattern_pathname : '**', {
		        dot: true
		    }).test(url.pathname)) {
		        return false;
		    }
		    return true;
		}
		function hasRemoteMatch(domains, remotePatterns, url) {
		    return domains.some((domain)=>url.hostname === domain) || remotePatterns.some((p)=>matchRemotePattern(p, url));
		}

		
	} (matchRemotePattern));
	return matchRemotePattern;
}

var hasRequiredImageLoader;

function requireImageLoader () {
	if (hasRequiredImageLoader) return imageLoader;
	hasRequiredImageLoader = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return _default;
		    }
		});
		const DEFAULT_Q = 75;
		function defaultLoader(param) {
		    let { config, src, width, quality } = param;
		    var _config_qualities;
		    if (process.env.NODE_ENV !== 'production') {
		        const missingValues = [];
		        // these should always be provided but make sure they are
		        if (!src) missingValues.push('src');
		        if (!width) missingValues.push('width');
		        if (missingValues.length > 0) {
		            throw new Error("Next Image Optimization requires " + missingValues.join(', ') + " to be provided. Make sure you pass them as props to the `next/image` component. Received: " + JSON.stringify({
		                src,
		                width,
		                quality
		            }));
		        }
		        if (src.startsWith('//')) {
		            throw new Error('Failed to parse src "' + src + '" on `next/image`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)');
		        }
		        if (src.startsWith('/') && config.localPatterns) {
		            if (process.env.NODE_ENV !== 'test' && // micromatch isn't compatible with edge runtime
		            process.env.NEXT_RUNTIME !== 'edge') {
		                // We use dynamic require because this should only error in development
		                const { hasLocalMatch } = requireMatchLocalPattern();
		                if (!hasLocalMatch(config.localPatterns, src)) {
		                    throw new Error("Invalid src prop (" + src + ") on `next/image` does not match `images.localPatterns` configured in your `next.config.js`\n" + "See more info: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns");
		                }
		            }
		        }
		        if (!src.startsWith('/') && (config.domains || config.remotePatterns)) {
		            let parsedSrc;
		            try {
		                parsedSrc = new URL(src);
		            } catch (err) {
		                console.error(err);
		                throw new Error('Failed to parse src "' + src + '" on `next/image`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)');
		            }
		            if (process.env.NODE_ENV !== 'test' && // micromatch isn't compatible with edge runtime
		            process.env.NEXT_RUNTIME !== 'edge') {
		                // We use dynamic require because this should only error in development
		                const { hasRemoteMatch } = requireMatchRemotePattern();
		                if (!hasRemoteMatch(config.domains, config.remotePatterns, parsedSrc)) {
		                    throw new Error("Invalid src prop (" + src + ') on `next/image`, hostname "' + parsedSrc.hostname + '" is not configured under images in your `next.config.js`\n' + "See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host");
		                }
		            }
		        }
		        if (quality && config.qualities && !config.qualities.includes(quality)) {
		            throw new Error("Invalid quality prop (" + quality + ") on `next/image` does not match `images.qualities` configured in your `next.config.js`\n" + "See more info: https://nextjs.org/docs/messages/next-image-unconfigured-qualities");
		        }
		    }
		    const q = quality || ((_config_qualities = config.qualities) == null ? void 0 : _config_qualities.reduce((prev, cur)=>Math.abs(cur - DEFAULT_Q) < Math.abs(prev - DEFAULT_Q) ? cur : prev)) || DEFAULT_Q;
		    return config.path + "?url=" + encodeURIComponent(src) + "&w=" + width + "&q=" + q + (src.startsWith('/_next/static/media/') && process.env.NEXT_DEPLOYMENT_ID ? "&dpl=" + process.env.NEXT_DEPLOYMENT_ID : '');
		}
		// We use this to determine if the import is the default loader
		// or a custom loader defined by the user in next.config.js
		defaultLoader.__next_img_default = true;
		const _default = defaultLoader;

		
	} (imageLoader));
	return imageLoader;
}

var useMergedRef = {exports: {}};

var hasRequiredUseMergedRef;

function requireUseMergedRef () {
	if (hasRequiredUseMergedRef) return useMergedRef.exports;
	hasRequiredUseMergedRef = 1;
	(function (module, exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "useMergedRef", {
		    enumerable: true,
		    get: function() {
		        return useMergedRef;
		    }
		});
		const _react = React__default;
		function useMergedRef(refA, refB) {
		    const cleanupA = (0, _react.useRef)(()=>{});
		    const cleanupB = (0, _react.useRef)(()=>{});
		    return (0, _react.useMemo)(()=>{
		        if (!refA || !refB) {
		            return refA || refB;
		        }
		        return (current)=>{
		            if (current === null) {
		                cleanupA.current();
		                cleanupB.current();
		            } else {
		                cleanupA.current = applyRef(refA, current);
		                cleanupB.current = applyRef(refB, current);
		            }
		        };
		    }, [
		        refA,
		        refB
		    ]);
		}
		function applyRef(refA, current) {
		    if (typeof refA === 'function') {
		        const cleanup = refA(current);
		        if (typeof cleanup === 'function') {
		            return cleanup;
		        } else {
		            return ()=>refA(null);
		        }
		    } else {
		        refA.current = current;
		        return ()=>{
		            refA.current = null;
		        };
		    }
		}

		if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
		  Object.defineProperty(exports.default, '__esModule', { value: true });
		  Object.assign(exports.default, exports);
		  module.exports = exports.default;
		}

		
	} (useMergedRef, useMergedRef.exports));
	return useMergedRef.exports;
}

(function (module, exports) {
	'use client';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	Object.defineProperty(exports, "Image", {
	    enumerable: true,
	    get: function() {
	        return Image;
	    }
	});
	const _interop_require_default = _interop_require_default$1;
	const _interop_require_wildcard = _interop_require_wildcard$1;
	const _jsxruntime = jsxRuntimeExports;
	const _react = /*#__PURE__*/ _interop_require_wildcard._(React__default);
	const _reactdom = /*#__PURE__*/ _interop_require_default._(require$$4);
	const _head = /*#__PURE__*/ _interop_require_default._(requireHead());
	const _getimgprops = getImgProps;
	const _imageconfig = imageConfig;
	const _imageconfigcontextsharedruntime = requireImageConfigContext_sharedRuntime();
	const _warnonce = warnOnce;
	const _routercontextsharedruntime = requireRouterContext_sharedRuntime();
	const _imageloader = /*#__PURE__*/ _interop_require_default._(requireImageLoader());
	const _usemergedref = requireUseMergedRef();
	// This is replaced by webpack define plugin
	const configEnv = process.env.__NEXT_IMAGE_OPTS;
	if (typeof window === 'undefined') {
	    globalThis.__NEXT_IMAGE_IMPORTED = true;
	}
	// See https://stackoverflow.com/q/39777833/266535 for why we use this ref
	// handler instead of the img's onLoad attribute.
	function handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput) {
	    const src = img == null ? void 0 : img.src;
	    if (!img || img['data-loaded-src'] === src) {
	        return;
	    }
	    img['data-loaded-src'] = src;
	    const p = 'decode' in img ? img.decode() : Promise.resolve();
	    p.catch(()=>{}).then(()=>{
	        if (!img.parentElement || !img.isConnected) {
	            // Exit early in case of race condition:
	            // - onload() is called
	            // - decode() is called but incomplete
	            // - unmount is called
	            // - decode() completes
	            return;
	        }
	        if (placeholder !== 'empty') {
	            setBlurComplete(true);
	        }
	        if (onLoadRef == null ? void 0 : onLoadRef.current) {
	            // Since we don't have the SyntheticEvent here,
	            // we must create one with the same shape.
	            // See https://reactjs.org/docs/events.html
	            const event = new Event('load');
	            Object.defineProperty(event, 'target', {
	                writable: false,
	                value: img
	            });
	            let prevented = false;
	            let stopped = false;
	            onLoadRef.current({
	                ...event,
	                nativeEvent: event,
	                currentTarget: img,
	                target: img,
	                isDefaultPrevented: ()=>prevented,
	                isPropagationStopped: ()=>stopped,
	                persist: ()=>{},
	                preventDefault: ()=>{
	                    prevented = true;
	                    event.preventDefault();
	                },
	                stopPropagation: ()=>{
	                    stopped = true;
	                    event.stopPropagation();
	                }
	            });
	        }
	        if (onLoadingCompleteRef == null ? void 0 : onLoadingCompleteRef.current) {
	            onLoadingCompleteRef.current(img);
	        }
	        if (process.env.NODE_ENV !== 'production') {
	            const origSrc = new URL(src, 'http://n').searchParams.get('url') || src;
	            if (img.getAttribute('data-nimg') === 'fill') {
	                if (!unoptimized && (!sizesInput || sizesInput === '100vw')) {
	                    let widthViewportRatio = img.getBoundingClientRect().width / window.innerWidth;
	                    if (widthViewportRatio < 0.6) {
	                        if (sizesInput === '100vw') {
	                            (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has "fill" prop and "sizes" prop of "100vw", but image is not rendered at full viewport width. Please adjust "sizes" to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes');
	                        } else {
	                            (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes');
	                        }
	                    }
	                }
	                if (img.parentElement) {
	                    const { position } = window.getComputedStyle(img.parentElement);
	                    const valid = [
	                        'absolute',
	                        'fixed',
	                        'relative'
	                    ];
	                    if (!valid.includes(position)) {
	                        (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has "fill" and parent element with invalid "position". Provided "' + position + '" should be one of ' + valid.map(String).join(',') + ".");
	                    }
	                }
	                if (img.height === 0) {
	                    (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has "fill" and a height value of 0. This is likely because the parent element of the image has not been styled to have a set height.');
	                }
	            }
	            const heightModified = img.height.toString() !== img.getAttribute('height');
	            const widthModified = img.width.toString() !== img.getAttribute('width');
	            if (heightModified && !widthModified || !heightModified && widthModified) {
	                (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles \'width: "auto"\' or \'height: "auto"\' to maintain the aspect ratio.');
	            }
	        }
	    });
	}
	function getDynamicProps(fetchPriority) {
	    if (Boolean(_react.use)) {
	        // In React 19.0.0 or newer, we must use camelCase
	        // prop to avoid "Warning: Invalid DOM property".
	        // See https://github.com/facebook/react/pull/25927
	        return {
	            fetchPriority
	        };
	    }
	    // In React 18.2.0 or older, we must use lowercase prop
	    // to avoid "Warning: Invalid DOM property".
	    return {
	        fetchpriority: fetchPriority
	    };
	}
	const ImageElement = /*#__PURE__*/ (0, _react.forwardRef)((param, forwardedRef)=>{
	    let { src, srcSet, sizes, height, width, decoding, className, style, fetchPriority, placeholder, loading, unoptimized, fill, onLoadRef, onLoadingCompleteRef, setBlurComplete, setShowAltText, sizesInput, onLoad, onError, ...rest } = param;
	    const ownRef = (0, _react.useCallback)((img)=>{
	        if (!img) {
	            return;
	        }
	        if (onError) {
	            // If the image has an error before react hydrates, then the error is lost.
	            // The workaround is to wait until the image is mounted which is after hydration,
	            // then we set the src again to trigger the error handler (if there was an error).
	            // eslint-disable-next-line no-self-assign
	            img.src = img.src;
	        }
	        if (process.env.NODE_ENV !== 'production') {
	            if (!src) {
	                console.error('Image is missing required "src" property:', img);
	            }
	            if (img.getAttribute('alt') === null) {
	                console.error('Image is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.');
	            }
	        }
	        if (img.complete) {
	            handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
	        }
	    }, [
	        src,
	        placeholder,
	        onLoadRef,
	        onLoadingCompleteRef,
	        setBlurComplete,
	        onError,
	        unoptimized,
	        sizesInput
	    ]);
	    const ref = (0, _usemergedref.useMergedRef)(forwardedRef, ownRef);
	    return /*#__PURE__*/ (0, _jsxruntime.jsx)("img", {
	        ...rest,
	        ...getDynamicProps(fetchPriority),
	        // It's intended to keep `loading` before `src` because React updates
	        // props in order which causes Safari/Firefox to not lazy load properly.
	        // See https://github.com/facebook/react/issues/25883
	        loading: loading,
	        width: width,
	        height: height,
	        decoding: decoding,
	        "data-nimg": fill ? 'fill' : '1',
	        className: className,
	        style: style,
	        // It's intended to keep `src` the last attribute because React updates
	        // attributes in order. If we keep `src` the first one, Safari will
	        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
	        // updated by React. That causes multiple unnecessary requests if `srcSet`
	        // and `sizes` are defined.
	        // This bug cannot be reproduced in Chrome or Firefox.
	        sizes: sizes,
	        srcSet: srcSet,
	        src: src,
	        ref: ref,
	        onLoad: (event)=>{
	            const img = event.currentTarget;
	            handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
	        },
	        onError: (event)=>{
	            // if the real image fails to load, this will ensure "alt" is visible
	            setShowAltText(true);
	            if (placeholder !== 'empty') {
	                // If the real image fails to load, this will still remove the placeholder.
	                setBlurComplete(true);
	            }
	            if (onError) {
	                onError(event);
	            }
	        }
	    });
	});
	function ImagePreload(param) {
	    let { isAppRouter, imgAttributes } = param;
	    const opts = {
	        as: 'image',
	        imageSrcSet: imgAttributes.srcSet,
	        imageSizes: imgAttributes.sizes,
	        crossOrigin: imgAttributes.crossOrigin,
	        referrerPolicy: imgAttributes.referrerPolicy,
	        ...getDynamicProps(imgAttributes.fetchPriority)
	    };
	    if (isAppRouter && _reactdom.default.preload) {
	        // See https://github.com/facebook/react/pull/26940
	        _reactdom.default.preload(imgAttributes.src, // @ts-expect-error TODO: upgrade to `@types/react-dom@18.3.x`
	        opts);
	        return null;
	    }
	    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_head.default, {
	        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
	            rel: "preload",
	            // Note how we omit the `href` attribute, as it would only be relevant
	            // for browsers that do not support `imagesrcset`, and in those cases
	            // it would cause the incorrect image to be preloaded.
	            //
	            // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
	            href: imgAttributes.srcSet ? undefined : imgAttributes.src,
	            ...opts
	        }, '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes)
	    });
	}
	const Image = /*#__PURE__*/ (0, _react.forwardRef)((props, forwardedRef)=>{
	    const pagesRouter = (0, _react.useContext)(_routercontextsharedruntime.RouterContext);
	    // We're in the app directory if there is no pages router.
	    const isAppRouter = !pagesRouter;
	    const configContext = (0, _react.useContext)(_imageconfigcontextsharedruntime.ImageConfigContext);
	    const config = (0, _react.useMemo)(()=>{
	        var _c_qualities;
	        const c = configEnv || configContext || _imageconfig.imageConfigDefault;
	        const allSizes = [
	            ...c.deviceSizes,
	            ...c.imageSizes
	        ].sort((a, b)=>a - b);
	        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
	        const qualities = (_c_qualities = c.qualities) == null ? void 0 : _c_qualities.sort((a, b)=>a - b);
	        return {
	            ...c,
	            allSizes,
	            deviceSizes,
	            qualities
	        };
	    }, [
	        configContext
	    ]);
	    const { onLoad, onLoadingComplete } = props;
	    const onLoadRef = (0, _react.useRef)(onLoad);
	    (0, _react.useEffect)(()=>{
	        onLoadRef.current = onLoad;
	    }, [
	        onLoad
	    ]);
	    const onLoadingCompleteRef = (0, _react.useRef)(onLoadingComplete);
	    (0, _react.useEffect)(()=>{
	        onLoadingCompleteRef.current = onLoadingComplete;
	    }, [
	        onLoadingComplete
	    ]);
	    const [blurComplete, setBlurComplete] = (0, _react.useState)(false);
	    const [showAltText, setShowAltText] = (0, _react.useState)(false);
	    const { props: imgAttributes, meta: imgMeta } = (0, _getimgprops.getImgProps)(props, {
	        defaultLoader: _imageloader.default,
	        imgConf: config,
	        blurComplete,
	        showAltText
	    });
	    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
	        children: [
	            /*#__PURE__*/ (0, _jsxruntime.jsx)(ImageElement, {
	                ...imgAttributes,
	                unoptimized: imgMeta.unoptimized,
	                placeholder: imgMeta.placeholder,
	                fill: imgMeta.fill,
	                onLoadRef: onLoadRef,
	                onLoadingCompleteRef: onLoadingCompleteRef,
	                setBlurComplete: setBlurComplete,
	                setShowAltText: setShowAltText,
	                sizesInput: props.sizes,
	                ref: forwardedRef
	            }),
	            imgMeta.priority ? /*#__PURE__*/ (0, _jsxruntime.jsx)(ImagePreload, {
	                isAppRouter: isAppRouter,
	                imgAttributes: imgAttributes
	            }) : null
	        ]
	    });
	});

	if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
	  Object.defineProperty(exports.default, '__esModule', { value: true });
	  Object.assign(exports.default, exports);
	  module.exports = exports.default;
	}

	
} (imageComponent, imageComponent.exports));

var imageComponentExports = imageComponent.exports;

(function (exports) {
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function _export(target, all) {
	    for(var name in all)Object.defineProperty(target, name, {
	        enumerable: true,
	        get: all[name]
	    });
	}
	_export(exports, {
	    default: function() {
	        return _default;
	    },
	    getImageProps: function() {
	        return getImageProps;
	    }
	});
	const _interop_require_default = _interop_require_default$1;
	const _getimgprops = getImgProps;
	const _imagecomponent = imageComponentExports;
	const _imageloader = /*#__PURE__*/ _interop_require_default._(requireImageLoader());
	function getImageProps(imgProps) {
	    const { props } = (0, _getimgprops.getImgProps)(imgProps, {
	        defaultLoader: _imageloader.default,
	        // This is replaced by webpack define plugin
	        imgConf: process.env.__NEXT_IMAGE_OPTS
	    });
	    // Normally we don't care about undefined props because we pass to JSX,
	    // but this exported function could be used by the end user for anything
	    // so we delete undefined props to clean it up a little.
	    for (const [key, value] of Object.entries(props)){
	        if (value === undefined) {
	            delete props[key];
	        }
	    }
	    return {
	        props
	    };
	}
	const _default = _imagecomponent.Image;

	
} (imageExternal));

var image = imageExternal;

var Image = /*@__PURE__*/getDefaultExportFromCjs(image);

const Header = ({ logoSrc, title, subtitle }) => {
    return (jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700", children: jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 lg:px-8", children: jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between h-16", children: jsxRuntimeExports.jsx("nav", { className: "flex items-center lg:grow", children: jsxRuntimeExports.jsxs("ul", { className: "flex grow justify-start flex-wrap items-center", children: [jsxRuntimeExports.jsx("li", { className: "relative group", children: jsxRuntimeExports.jsx("a", { className: "flex items-center px-3 py-2 text-sm font-medium transition-colors", href: "https://katpool.xyz", children: jsxRuntimeExports.jsx(Image, { src: logoSrc, alt: "Navigation Logo", width: 50, height: 50, className: "mr-6 opacity-100" }) }) }), jsxRuntimeExports.jsx("li", { className: "relative group", children: jsxRuntimeExports.jsx("span", { className: "flex items-center px-3 py-2 text-xl font-medium transition-colors text-gray-400 dark:text-white hover:text-primary-500 dark:hover:text-primary-400", children: title }) }), jsxRuntimeExports.jsx("li", { className: "relative group", children: jsxRuntimeExports.jsx("span", { className: "flex items-center px-3 py-2 text-sm font-medium transition-colors text-gray-500", children: subtitle }) })] }) }) }) }) }));
};

const MenuComponent = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggleMenu = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle submenu while ensuring only one is open at a time
    };
    return (jsxRuntimeExports.jsx("nav", { className: "p-4", children: jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex justify-between items-center", children: [jsxRuntimeExports.jsx(Menu, { as: "div", className: "relative inline-block text-left lg:hidden", children: ({ open }) => (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Menu.Button, { className: "p-2 rounded-md text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700", children: jsxRuntimeExports.jsx(ForwardRef$4, { className: "w-6 h-6" }) }), open && (jsxRuntimeExports.jsx("div", { className: "absolute left-0 mt-2 w-48 origin-top-left bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 rounded-md focus:outline-none z-50", children: items.map((item, idx) => (jsxRuntimeExports.jsxs("div", { className: "py-1", children: [jsxRuntimeExports.jsxs("button", { onClick: () => toggleMenu(idx), className: "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex justify-between items-center", children: [item.label, item.children && (jsxRuntimeExports.jsx(ForwardRef$3, { className: `w-4 h-4 text-gray-500 transition-transform ${openIndex === idx ? "rotate-180" : ""}` }))] }), item.children && openIndex === idx && (jsxRuntimeExports.jsx("div", { className: "pl-4 z-50 relative", children: item.children.map((subItem, subIdx) => (jsxRuntimeExports.jsx("a", { href: subItem.href || "#", className: "block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: subItem.label }, subIdx))) }))] }, idx))) }))] })) }), jsxRuntimeExports.jsx("ul", { className: "hidden lg:flex space-x-6", children: items.map((item, idx) => (jsxRuntimeExports.jsxs("li", { className: "relative group", children: [jsxRuntimeExports.jsxs("a", { href: item.href || "#", className: "text-gray-700 dark:text-white px-3 py-2 font-medium hover:text-primary-500", children: [item.label, item.children && (jsxRuntimeExports.jsx(ForwardRef$3, { className: "w-4 h-4 inline ml-2 text-gray-500" }))] }), item.children && (jsxRuntimeExports.jsx("div", { className: "absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50", children: item.children.map((subItem, subIdx) => (jsxRuntimeExports.jsxs("div", { className: "relative group", children: [jsxRuntimeExports.jsx("a", { href: subItem.href || "#", className: "block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: subItem.label }), subItem.children && (jsxRuntimeExports.jsx("div", { className: "absolute left-full top-0 ml-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-[60]", children: subItem.children.map((thirdLevelItem, thirdIdx) => (jsxRuntimeExports.jsx("a", { href: thirdLevelItem.href || "#", className: "block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md", children: thirdLevelItem.label }, thirdIdx))) }))] }, subIdx))) }))] }, idx))) })] }) }));
};

const colorClasses = {
    primary: "bg-teal-400 text-white",
    dark: "bg-gray-900 text-white",
    gray: "bg-gray-500 text-white",
    accent: "bg-teal-300 text-gray-900",
};
const Pill = ({ label, color = "primary" }) => {
    return (jsxRuntimeExports.jsx("span", { className: `px-3 py-1 text-sm font-semibold rounded-full ${colorClasses[color]}`, children: label }));
};

const ProgressBar = ({ value, color = "bg-teal-400" }) => {
    return (jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [jsxRuntimeExports.jsxs("div", { className: "absolute left-1/2 -translate-x-1/2 -top-4 text-[10px] font-medium text-gray-900 dark:text-white", children: [value, "%"] }), jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden", children: jsxRuntimeExports.jsx("div", { className: `h-full ${color} transition-all duration-300`, style: { width: `${value}%` } }) })] }));
};

const SearchComponent = ({ placeholder = "Search...", onSearch, onChange, onKeyDown, suggestions = [], showHint = false, enableAutocomplete = false, }) => {
    const [query, setQuery] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [hintVisible, setHintVisible] = useState(showHint);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const handleInputChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        setHintVisible(true);
        // ✅ Call onChange only if it's provided
        if (onChange) {
            onChange(newQuery);
        }
        if (enableAutocomplete) {
            if (newQuery.trim() === "") {
                setShowAutocomplete(false);
                setFilteredSuggestions([]);
            }
            else {
                const filtered = suggestions.filter((item) => item.tick.toLowerCase().includes(newQuery.toLowerCase()));
                setFilteredSuggestions(filtered);
                setShowAutocomplete(filtered.length > 0);
            }
        }
    };
    const handleKeyDown = (event) => {
        // ✅ Call onKeyDown only if it's provided
        if (onKeyDown) {
            onKeyDown(event);
        }
        if (event.key === "Enter" && onSearch) {
            onSearch(query);
            setHintVisible(false);
            setShowAutocomplete(false);
            setFilteredSuggestions([]);
        }
    };
    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setShowAutocomplete(false);
        setFilteredSuggestions([]);
        if (onSearch)
            onSearch(suggestion);
    };
    return (jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [jsxRuntimeExports.jsx(ForwardRef$1, { className: "absolute left-3 top-5 h-5 w-5 text-gray-500 dark:text-gray-400" }), jsxRuntimeExports.jsx("input", { type: "text", value: query, onChange: handleInputChange, onKeyDown: handleKeyDown, className: "pl-10 pr-4 py-4 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-white", placeholder: placeholder }), hintVisible && showHint && query && (jsxRuntimeExports.jsxs("p", { className: "absolute left-10 top-full mt-1 text-xs text-gray-500 dark:text-gray-400", children: ["Press ", jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Enter" }), " to search"] })), enableAutocomplete && showAutocomplete && filteredSuggestions.length > 0 && (jsxRuntimeExports.jsx("ul", { className: "absolute left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg max-h-40 overflow-y-auto z-10", children: filteredSuggestions.map((item, index) => (jsxRuntimeExports.jsxs("li", { onClick: () => handleSuggestionClick(item.tick), className: "flex items-center px-4 py-2 cursor-pointer text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700", children: [item.image ? (jsxRuntimeExports.jsx("img", { src: item.image, alt: item.tick, className: "w-6 h-6 rounded-full mr-2" })) : (jsxRuntimeExports.jsx(ForwardRef$2, { className: "w-6 h-6 text-gray-400 mr-2" })), item.tick] }, index))) }))] }));
};

/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
// type Person = {
//   firstName: string
//   lastName: string
//   age: number
//   visits: number
//   status: string
//   progress: number
//   createdAt: Date
//   nested: {
//     foo: [
//       {
//         bar: 'bar'
//       }
//     ]
//     bar: { subBar: boolean }[]
//     baz: {
//       foo: 'foo'
//       bar: {
//         baz: 'baz'
//       }
//     }
//   }
// }


// Is this type a tuple?

// If this type is a tuple, what indices are allowed?

///

function functionalUpdate(updater, input) {
  return typeof updater === 'function' ? updater(input) : updater;
}
function makeStateUpdater(key, instance) {
  return updater => {
    instance.setState(old => {
      return {
        ...old,
        [key]: functionalUpdate(updater, old[key])
      };
    });
  };
}
function isFunction(d) {
  return d instanceof Function;
}
function isNumberArray(d) {
  return Array.isArray(d) && d.every(val => typeof val === 'number');
}
function flattenBy(arr, getChildren) {
  const flat = [];
  const recurse = subArr => {
    subArr.forEach(item => {
      flat.push(item);
      const children = getChildren(item);
      if (children != null && children.length) {
        recurse(children);
      }
    });
  };
  recurse(arr);
  return flat;
}
function memo(getDeps, fn, opts) {
  let deps = [];
  let result;
  return depArgs => {
    let depTime;
    if (opts.key && opts.debug) depTime = Date.now();
    const newDeps = getDeps(depArgs);
    const depsChanged = newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep);
    if (!depsChanged) {
      return result;
    }
    deps = newDeps;
    let resultTime;
    if (opts.key && opts.debug) resultTime = Date.now();
    result = fn(...newDeps);
    opts == null || opts.onChange == null || opts.onChange(result);
    if (opts.key && opts.debug) {
      if (opts != null && opts.debug()) {
        const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
        const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
        const resultFpsPercentage = resultEndTime / 16;
        const pad = (str, num) => {
          str = String(str);
          while (str.length < num) {
            str = ' ' + str;
          }
          return str;
        };
        console.info(`%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * resultFpsPercentage, 120))}deg 100% 31%);`, opts == null ? void 0 : opts.key);
      }
    }
    return result;
  };
}
function getMemoOptions(tableOptions, debugLevel, key, onChange) {
  return {
    debug: () => {
      var _tableOptions$debugAl;
      return (_tableOptions$debugAl = tableOptions == null ? void 0 : tableOptions.debugAll) != null ? _tableOptions$debugAl : tableOptions[debugLevel];
    },
    key: process.env.NODE_ENV === 'development' && key,
    onChange
  };
}

function createCell(table, row, column, columnId) {
  const getRenderValue = () => {
    var _cell$getValue;
    return (_cell$getValue = cell.getValue()) != null ? _cell$getValue : table.options.renderFallbackValue;
  };
  const cell = {
    id: `${row.id}_${column.id}`,
    row,
    column,
    getValue: () => row.getValue(columnId),
    renderValue: getRenderValue,
    getContext: memo(() => [table, column, row, cell], (table, column, row, cell) => ({
      table,
      column,
      row,
      cell: cell,
      getValue: cell.getValue,
      renderValue: cell.renderValue
    }), getMemoOptions(table.options, 'debugCells', 'cell.getContext'))
  };
  table._features.forEach(feature => {
    feature.createCell == null || feature.createCell(cell, column, row, table);
  }, {});
  return cell;
}

function createColumn(table, columnDef, depth, parent) {
  var _ref, _resolvedColumnDef$id;
  const defaultColumn = table._getDefaultColumnDef();
  const resolvedColumnDef = {
    ...defaultColumn,
    ...columnDef
  };
  const accessorKey = resolvedColumnDef.accessorKey;
  let id = (_ref = (_resolvedColumnDef$id = resolvedColumnDef.id) != null ? _resolvedColumnDef$id : accessorKey ? typeof String.prototype.replaceAll === 'function' ? accessorKey.replaceAll('.', '_') : accessorKey.replace(/\./g, '_') : undefined) != null ? _ref : typeof resolvedColumnDef.header === 'string' ? resolvedColumnDef.header : undefined;
  let accessorFn;
  if (resolvedColumnDef.accessorFn) {
    accessorFn = resolvedColumnDef.accessorFn;
  } else if (accessorKey) {
    // Support deep accessor keys
    if (accessorKey.includes('.')) {
      accessorFn = originalRow => {
        let result = originalRow;
        for (const key of accessorKey.split('.')) {
          var _result;
          result = (_result = result) == null ? void 0 : _result[key];
          if (process.env.NODE_ENV !== 'production' && result === undefined) {
            console.warn(`"${key}" in deeply nested key "${accessorKey}" returned undefined.`);
          }
        }
        return result;
      };
    } else {
      accessorFn = originalRow => originalRow[resolvedColumnDef.accessorKey];
    }
  }
  if (!id) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(resolvedColumnDef.accessorFn ? `Columns require an id when using an accessorFn` : `Columns require an id when using a non-string header`);
    }
    throw new Error();
  }
  let column = {
    id: `${String(id)}`,
    accessorFn,
    parent: parent,
    depth,
    columnDef: resolvedColumnDef,
    columns: [],
    getFlatColumns: memo(() => [true], () => {
      var _column$columns;
      return [column, ...((_column$columns = column.columns) == null ? void 0 : _column$columns.flatMap(d => d.getFlatColumns()))];
    }, getMemoOptions(table.options, 'debugColumns', 'column.getFlatColumns')),
    getLeafColumns: memo(() => [table._getOrderColumnsFn()], orderColumns => {
      var _column$columns2;
      if ((_column$columns2 = column.columns) != null && _column$columns2.length) {
        let leafColumns = column.columns.flatMap(column => column.getLeafColumns());
        return orderColumns(leafColumns);
      }
      return [column];
    }, getMemoOptions(table.options, 'debugColumns', 'column.getLeafColumns'))
  };
  for (const feature of table._features) {
    feature.createColumn == null || feature.createColumn(column, table);
  }

  // Yes, we have to convert table to unknown, because we know more than the compiler here.
  return column;
}

const debug = 'debugHeaders';
//

function createHeader(table, column, options) {
  var _options$id;
  const id = (_options$id = options.id) != null ? _options$id : column.id;
  let header = {
    id,
    column,
    index: options.index,
    isPlaceholder: !!options.isPlaceholder,
    placeholderId: options.placeholderId,
    depth: options.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const leafHeaders = [];
      const recurseHeader = h => {
        if (h.subHeaders && h.subHeaders.length) {
          h.subHeaders.map(recurseHeader);
        }
        leafHeaders.push(h);
      };
      recurseHeader(header);
      return leafHeaders;
    },
    getContext: () => ({
      table,
      header: header,
      column
    })
  };
  table._features.forEach(feature => {
    feature.createHeader == null || feature.createHeader(header, table);
  });
  return header;
}
const Headers = {
  createTable: table => {
    // Header Groups

    table.getHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allColumns, leafColumns, left, right) => {
      var _left$map$filter, _right$map$filter;
      const leftColumns = (_left$map$filter = left == null ? void 0 : left.map(columnId => leafColumns.find(d => d.id === columnId)).filter(Boolean)) != null ? _left$map$filter : [];
      const rightColumns = (_right$map$filter = right == null ? void 0 : right.map(columnId => leafColumns.find(d => d.id === columnId)).filter(Boolean)) != null ? _right$map$filter : [];
      const centerColumns = leafColumns.filter(column => !(left != null && left.includes(column.id)) && !(right != null && right.includes(column.id)));
      const headerGroups = buildHeaderGroups(allColumns, [...leftColumns, ...centerColumns, ...rightColumns], table);
      return headerGroups;
    }, getMemoOptions(table.options, debug, 'getHeaderGroups'));
    table.getCenterHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allColumns, leafColumns, left, right) => {
      leafColumns = leafColumns.filter(column => !(left != null && left.includes(column.id)) && !(right != null && right.includes(column.id)));
      return buildHeaderGroups(allColumns, leafColumns, table, 'center');
    }, getMemoOptions(table.options, debug, 'getCenterHeaderGroups'));
    table.getLeftHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.left], (allColumns, leafColumns, left) => {
      var _left$map$filter2;
      const orderedLeafColumns = (_left$map$filter2 = left == null ? void 0 : left.map(columnId => leafColumns.find(d => d.id === columnId)).filter(Boolean)) != null ? _left$map$filter2 : [];
      return buildHeaderGroups(allColumns, orderedLeafColumns, table, 'left');
    }, getMemoOptions(table.options, debug, 'getLeftHeaderGroups'));
    table.getRightHeaderGroups = memo(() => [table.getAllColumns(), table.getVisibleLeafColumns(), table.getState().columnPinning.right], (allColumns, leafColumns, right) => {
      var _right$map$filter2;
      const orderedLeafColumns = (_right$map$filter2 = right == null ? void 0 : right.map(columnId => leafColumns.find(d => d.id === columnId)).filter(Boolean)) != null ? _right$map$filter2 : [];
      return buildHeaderGroups(allColumns, orderedLeafColumns, table, 'right');
    }, getMemoOptions(table.options, debug, 'getRightHeaderGroups'));

    // Footer Groups

    table.getFooterGroups = memo(() => [table.getHeaderGroups()], headerGroups => {
      return [...headerGroups].reverse();
    }, getMemoOptions(table.options, debug, 'getFooterGroups'));
    table.getLeftFooterGroups = memo(() => [table.getLeftHeaderGroups()], headerGroups => {
      return [...headerGroups].reverse();
    }, getMemoOptions(table.options, debug, 'getLeftFooterGroups'));
    table.getCenterFooterGroups = memo(() => [table.getCenterHeaderGroups()], headerGroups => {
      return [...headerGroups].reverse();
    }, getMemoOptions(table.options, debug, 'getCenterFooterGroups'));
    table.getRightFooterGroups = memo(() => [table.getRightHeaderGroups()], headerGroups => {
      return [...headerGroups].reverse();
    }, getMemoOptions(table.options, debug, 'getRightFooterGroups'));

    // Flat Headers

    table.getFlatHeaders = memo(() => [table.getHeaderGroups()], headerGroups => {
      return headerGroups.map(headerGroup => {
        return headerGroup.headers;
      }).flat();
    }, getMemoOptions(table.options, debug, 'getFlatHeaders'));
    table.getLeftFlatHeaders = memo(() => [table.getLeftHeaderGroups()], left => {
      return left.map(headerGroup => {
        return headerGroup.headers;
      }).flat();
    }, getMemoOptions(table.options, debug, 'getLeftFlatHeaders'));
    table.getCenterFlatHeaders = memo(() => [table.getCenterHeaderGroups()], left => {
      return left.map(headerGroup => {
        return headerGroup.headers;
      }).flat();
    }, getMemoOptions(table.options, debug, 'getCenterFlatHeaders'));
    table.getRightFlatHeaders = memo(() => [table.getRightHeaderGroups()], left => {
      return left.map(headerGroup => {
        return headerGroup.headers;
      }).flat();
    }, getMemoOptions(table.options, debug, 'getRightFlatHeaders'));

    // Leaf Headers

    table.getCenterLeafHeaders = memo(() => [table.getCenterFlatHeaders()], flatHeaders => {
      return flatHeaders.filter(header => {
        var _header$subHeaders;
        return !((_header$subHeaders = header.subHeaders) != null && _header$subHeaders.length);
      });
    }, getMemoOptions(table.options, debug, 'getCenterLeafHeaders'));
    table.getLeftLeafHeaders = memo(() => [table.getLeftFlatHeaders()], flatHeaders => {
      return flatHeaders.filter(header => {
        var _header$subHeaders2;
        return !((_header$subHeaders2 = header.subHeaders) != null && _header$subHeaders2.length);
      });
    }, getMemoOptions(table.options, debug, 'getLeftLeafHeaders'));
    table.getRightLeafHeaders = memo(() => [table.getRightFlatHeaders()], flatHeaders => {
      return flatHeaders.filter(header => {
        var _header$subHeaders3;
        return !((_header$subHeaders3 = header.subHeaders) != null && _header$subHeaders3.length);
      });
    }, getMemoOptions(table.options, debug, 'getRightLeafHeaders'));
    table.getLeafHeaders = memo(() => [table.getLeftHeaderGroups(), table.getCenterHeaderGroups(), table.getRightHeaderGroups()], (left, center, right) => {
      var _left$0$headers, _left$, _center$0$headers, _center$, _right$0$headers, _right$;
      return [...((_left$0$headers = (_left$ = left[0]) == null ? void 0 : _left$.headers) != null ? _left$0$headers : []), ...((_center$0$headers = (_center$ = center[0]) == null ? void 0 : _center$.headers) != null ? _center$0$headers : []), ...((_right$0$headers = (_right$ = right[0]) == null ? void 0 : _right$.headers) != null ? _right$0$headers : [])].map(header => {
        return header.getLeafHeaders();
      }).flat();
    }, getMemoOptions(table.options, debug, 'getLeafHeaders'));
  }
};
function buildHeaderGroups(allColumns, columnsToGroup, table, headerFamily) {
  var _headerGroups$0$heade, _headerGroups$;
  // Find the max depth of the columns:
  // build the leaf column row
  // build each buffer row going up
  //    placeholder for non-existent level
  //    real column for existing level

  let maxDepth = 0;
  const findMaxDepth = function (columns, depth) {
    if (depth === void 0) {
      depth = 1;
    }
    maxDepth = Math.max(maxDepth, depth);
    columns.filter(column => column.getIsVisible()).forEach(column => {
      var _column$columns;
      if ((_column$columns = column.columns) != null && _column$columns.length) {
        findMaxDepth(column.columns, depth + 1);
      }
    }, 0);
  };
  findMaxDepth(allColumns);
  let headerGroups = [];
  const createHeaderGroup = (headersToGroup, depth) => {
    // The header group we are creating
    const headerGroup = {
      depth,
      id: [headerFamily, `${depth}`].filter(Boolean).join('_'),
      headers: []
    };

    // The parent columns we're going to scan next
    const pendingParentHeaders = [];

    // Scan each column for parents
    headersToGroup.forEach(headerToGroup => {
      // What is the latest (last) parent column?

      const latestPendingParentHeader = [...pendingParentHeaders].reverse()[0];
      const isLeafHeader = headerToGroup.column.depth === headerGroup.depth;
      let column;
      let isPlaceholder = false;
      if (isLeafHeader && headerToGroup.column.parent) {
        // The parent header is new
        column = headerToGroup.column.parent;
      } else {
        // The parent header is repeated
        column = headerToGroup.column;
        isPlaceholder = true;
      }
      if (latestPendingParentHeader && (latestPendingParentHeader == null ? void 0 : latestPendingParentHeader.column) === column) {
        // This column is repeated. Add it as a sub header to the next batch
        latestPendingParentHeader.subHeaders.push(headerToGroup);
      } else {
        // This is a new header. Let's create it
        const header = createHeader(table, column, {
          id: [headerFamily, depth, column.id, headerToGroup == null ? void 0 : headerToGroup.id].filter(Boolean).join('_'),
          isPlaceholder,
          placeholderId: isPlaceholder ? `${pendingParentHeaders.filter(d => d.column === column).length}` : undefined,
          depth,
          index: pendingParentHeaders.length
        });

        // Add the headerToGroup as a subHeader of the new header
        header.subHeaders.push(headerToGroup);
        // Add the new header to the pendingParentHeaders to get grouped
        // in the next batch
        pendingParentHeaders.push(header);
      }
      headerGroup.headers.push(headerToGroup);
      headerToGroup.headerGroup = headerGroup;
    });
    headerGroups.push(headerGroup);
    if (depth > 0) {
      createHeaderGroup(pendingParentHeaders, depth - 1);
    }
  };
  const bottomHeaders = columnsToGroup.map((column, index) => createHeader(table, column, {
    depth: maxDepth,
    index
  }));
  createHeaderGroup(bottomHeaders, maxDepth - 1);
  headerGroups.reverse();

  // headerGroups = headerGroups.filter(headerGroup => {
  //   return !headerGroup.headers.every(header => header.isPlaceholder)
  // })

  const recurseHeadersForSpans = headers => {
    const filteredHeaders = headers.filter(header => header.column.getIsVisible());
    return filteredHeaders.map(header => {
      let colSpan = 0;
      let rowSpan = 0;
      let childRowSpans = [0];
      if (header.subHeaders && header.subHeaders.length) {
        childRowSpans = [];
        recurseHeadersForSpans(header.subHeaders).forEach(_ref => {
          let {
            colSpan: childColSpan,
            rowSpan: childRowSpan
          } = _ref;
          colSpan += childColSpan;
          childRowSpans.push(childRowSpan);
        });
      } else {
        colSpan = 1;
      }
      const minChildRowSpan = Math.min(...childRowSpans);
      rowSpan = rowSpan + minChildRowSpan;
      header.colSpan = colSpan;
      header.rowSpan = rowSpan;
      return {
        colSpan,
        rowSpan
      };
    });
  };
  recurseHeadersForSpans((_headerGroups$0$heade = (_headerGroups$ = headerGroups[0]) == null ? void 0 : _headerGroups$.headers) != null ? _headerGroups$0$heade : []);
  return headerGroups;
}

const createRow = (table, id, original, rowIndex, depth, subRows, parentId) => {
  let row = {
    id,
    index: rowIndex,
    original,
    depth,
    parentId,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: columnId => {
      if (row._valuesCache.hasOwnProperty(columnId)) {
        return row._valuesCache[columnId];
      }
      const column = table.getColumn(columnId);
      if (!(column != null && column.accessorFn)) {
        return undefined;
      }
      row._valuesCache[columnId] = column.accessorFn(row.original, rowIndex);
      return row._valuesCache[columnId];
    },
    getUniqueValues: columnId => {
      if (row._uniqueValuesCache.hasOwnProperty(columnId)) {
        return row._uniqueValuesCache[columnId];
      }
      const column = table.getColumn(columnId);
      if (!(column != null && column.accessorFn)) {
        return undefined;
      }
      if (!column.columnDef.getUniqueValues) {
        row._uniqueValuesCache[columnId] = [row.getValue(columnId)];
        return row._uniqueValuesCache[columnId];
      }
      row._uniqueValuesCache[columnId] = column.columnDef.getUniqueValues(row.original, rowIndex);
      return row._uniqueValuesCache[columnId];
    },
    renderValue: columnId => {
      var _row$getValue;
      return (_row$getValue = row.getValue(columnId)) != null ? _row$getValue : table.options.renderFallbackValue;
    },
    subRows: [],
    getLeafRows: () => flattenBy(row.subRows, d => d.subRows),
    getParentRow: () => row.parentId ? table.getRow(row.parentId, true) : undefined,
    getParentRows: () => {
      let parentRows = [];
      let currentRow = row;
      while (true) {
        const parentRow = currentRow.getParentRow();
        if (!parentRow) break;
        parentRows.push(parentRow);
        currentRow = parentRow;
      }
      return parentRows.reverse();
    },
    getAllCells: memo(() => [table.getAllLeafColumns()], leafColumns => {
      return leafColumns.map(column => {
        return createCell(table, row, column, column.id);
      });
    }, getMemoOptions(table.options, 'debugRows', 'getAllCells')),
    _getAllCellsByColumnId: memo(() => [row.getAllCells()], allCells => {
      return allCells.reduce((acc, cell) => {
        acc[cell.column.id] = cell;
        return acc;
      }, {});
    }, getMemoOptions(table.options, 'debugRows', 'getAllCellsByColumnId'))
  };
  for (let i = 0; i < table._features.length; i++) {
    const feature = table._features[i];
    feature == null || feature.createRow == null || feature.createRow(row, table);
  }
  return row;
};

//

const ColumnFaceting = {
  createColumn: (column, table) => {
    column._getFacetedRowModel = table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, column.id);
    column.getFacetedRowModel = () => {
      if (!column._getFacetedRowModel) {
        return table.getPreFilteredRowModel();
      }
      return column._getFacetedRowModel();
    };
    column._getFacetedUniqueValues = table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, column.id);
    column.getFacetedUniqueValues = () => {
      if (!column._getFacetedUniqueValues) {
        return new Map();
      }
      return column._getFacetedUniqueValues();
    };
    column._getFacetedMinMaxValues = table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, column.id);
    column.getFacetedMinMaxValues = () => {
      if (!column._getFacetedMinMaxValues) {
        return undefined;
      }
      return column._getFacetedMinMaxValues();
    };
  }
};

const includesString = (row, columnId, filterValue) => {
  var _filterValue$toString, _row$getValue;
  const search = filterValue == null || (_filterValue$toString = filterValue.toString()) == null ? void 0 : _filterValue$toString.toLowerCase();
  return Boolean((_row$getValue = row.getValue(columnId)) == null || (_row$getValue = _row$getValue.toString()) == null || (_row$getValue = _row$getValue.toLowerCase()) == null ? void 0 : _row$getValue.includes(search));
};
includesString.autoRemove = val => testFalsey(val);
const includesStringSensitive = (row, columnId, filterValue) => {
  var _row$getValue2;
  return Boolean((_row$getValue2 = row.getValue(columnId)) == null || (_row$getValue2 = _row$getValue2.toString()) == null ? void 0 : _row$getValue2.includes(filterValue));
};
includesStringSensitive.autoRemove = val => testFalsey(val);
const equalsString = (row, columnId, filterValue) => {
  var _row$getValue3;
  return ((_row$getValue3 = row.getValue(columnId)) == null || (_row$getValue3 = _row$getValue3.toString()) == null ? void 0 : _row$getValue3.toLowerCase()) === (filterValue == null ? void 0 : filterValue.toLowerCase());
};
equalsString.autoRemove = val => testFalsey(val);
const arrIncludes = (row, columnId, filterValue) => {
  var _row$getValue4;
  return (_row$getValue4 = row.getValue(columnId)) == null ? void 0 : _row$getValue4.includes(filterValue);
};
arrIncludes.autoRemove = val => testFalsey(val);
const arrIncludesAll = (row, columnId, filterValue) => {
  return !filterValue.some(val => {
    var _row$getValue5;
    return !((_row$getValue5 = row.getValue(columnId)) != null && _row$getValue5.includes(val));
  });
};
arrIncludesAll.autoRemove = val => testFalsey(val) || !(val != null && val.length);
const arrIncludesSome = (row, columnId, filterValue) => {
  return filterValue.some(val => {
    var _row$getValue6;
    return (_row$getValue6 = row.getValue(columnId)) == null ? void 0 : _row$getValue6.includes(val);
  });
};
arrIncludesSome.autoRemove = val => testFalsey(val) || !(val != null && val.length);
const equals = (row, columnId, filterValue) => {
  return row.getValue(columnId) === filterValue;
};
equals.autoRemove = val => testFalsey(val);
const weakEquals = (row, columnId, filterValue) => {
  return row.getValue(columnId) == filterValue;
};
weakEquals.autoRemove = val => testFalsey(val);
const inNumberRange = (row, columnId, filterValue) => {
  let [min, max] = filterValue;
  const rowValue = row.getValue(columnId);
  return rowValue >= min && rowValue <= max;
};
inNumberRange.resolveFilterValue = val => {
  let [unsafeMin, unsafeMax] = val;
  let parsedMin = typeof unsafeMin !== 'number' ? parseFloat(unsafeMin) : unsafeMin;
  let parsedMax = typeof unsafeMax !== 'number' ? parseFloat(unsafeMax) : unsafeMax;
  let min = unsafeMin === null || Number.isNaN(parsedMin) ? -Infinity : parsedMin;
  let max = unsafeMax === null || Number.isNaN(parsedMax) ? Infinity : parsedMax;
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  return [min, max];
};
inNumberRange.autoRemove = val => testFalsey(val) || testFalsey(val[0]) && testFalsey(val[1]);

// Export

const filterFns = {
  includesString,
  includesStringSensitive,
  equalsString,
  arrIncludes,
  arrIncludesAll,
  arrIncludesSome,
  equals,
  weakEquals,
  inNumberRange
};
// Utils

function testFalsey(val) {
  return val === undefined || val === null || val === '';
}

//

const ColumnFiltering = {
  getDefaultColumnDef: () => {
    return {
      filterFn: 'auto'
    };
  },
  getInitialState: state => {
    return {
      columnFilters: [],
      ...state
    };
  },
  getDefaultOptions: table => {
    return {
      onColumnFiltersChange: makeStateUpdater('columnFilters', table),
      filterFromLeafRows: false,
      maxLeafRowFilterDepth: 100
    };
  },
  createColumn: (column, table) => {
    column.getAutoFilterFn = () => {
      const firstRow = table.getCoreRowModel().flatRows[0];
      const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
      if (typeof value === 'string') {
        return filterFns.includesString;
      }
      if (typeof value === 'number') {
        return filterFns.inNumberRange;
      }
      if (typeof value === 'boolean') {
        return filterFns.equals;
      }
      if (value !== null && typeof value === 'object') {
        return filterFns.equals;
      }
      if (Array.isArray(value)) {
        return filterFns.arrIncludes;
      }
      return filterFns.weakEquals;
    };
    column.getFilterFn = () => {
      var _table$options$filter, _table$options$filter2;
      return isFunction(column.columnDef.filterFn) ? column.columnDef.filterFn : column.columnDef.filterFn === 'auto' ? column.getAutoFilterFn() : // @ts-ignore
      (_table$options$filter = (_table$options$filter2 = table.options.filterFns) == null ? void 0 : _table$options$filter2[column.columnDef.filterFn]) != null ? _table$options$filter : filterFns[column.columnDef.filterFn];
    };
    column.getCanFilter = () => {
      var _column$columnDef$ena, _table$options$enable, _table$options$enable2;
      return ((_column$columnDef$ena = column.columnDef.enableColumnFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableColumnFilters) != null ? _table$options$enable : true) && ((_table$options$enable2 = table.options.enableFilters) != null ? _table$options$enable2 : true) && !!column.accessorFn;
    };
    column.getIsFiltered = () => column.getFilterIndex() > -1;
    column.getFilterValue = () => {
      var _table$getState$colum;
      return (_table$getState$colum = table.getState().columnFilters) == null || (_table$getState$colum = _table$getState$colum.find(d => d.id === column.id)) == null ? void 0 : _table$getState$colum.value;
    };
    column.getFilterIndex = () => {
      var _table$getState$colum2, _table$getState$colum3;
      return (_table$getState$colum2 = (_table$getState$colum3 = table.getState().columnFilters) == null ? void 0 : _table$getState$colum3.findIndex(d => d.id === column.id)) != null ? _table$getState$colum2 : -1;
    };
    column.setFilterValue = value => {
      table.setColumnFilters(old => {
        const filterFn = column.getFilterFn();
        const previousFilter = old == null ? void 0 : old.find(d => d.id === column.id);
        const newFilter = functionalUpdate(value, previousFilter ? previousFilter.value : undefined);

        //
        if (shouldAutoRemoveFilter(filterFn, newFilter, column)) {
          var _old$filter;
          return (_old$filter = old == null ? void 0 : old.filter(d => d.id !== column.id)) != null ? _old$filter : [];
        }
        const newFilterObj = {
          id: column.id,
          value: newFilter
        };
        if (previousFilter) {
          var _old$map;
          return (_old$map = old == null ? void 0 : old.map(d => {
            if (d.id === column.id) {
              return newFilterObj;
            }
            return d;
          })) != null ? _old$map : [];
        }
        if (old != null && old.length) {
          return [...old, newFilterObj];
        }
        return [newFilterObj];
      });
    };
  },
  createRow: (row, _table) => {
    row.columnFilters = {};
    row.columnFiltersMeta = {};
  },
  createTable: table => {
    table.setColumnFilters = updater => {
      const leafColumns = table.getAllLeafColumns();
      const updateFn = old => {
        var _functionalUpdate;
        return (_functionalUpdate = functionalUpdate(updater, old)) == null ? void 0 : _functionalUpdate.filter(filter => {
          const column = leafColumns.find(d => d.id === filter.id);
          if (column) {
            const filterFn = column.getFilterFn();
            if (shouldAutoRemoveFilter(filterFn, filter.value, column)) {
              return false;
            }
          }
          return true;
        });
      };
      table.options.onColumnFiltersChange == null || table.options.onColumnFiltersChange(updateFn);
    };
    table.resetColumnFilters = defaultState => {
      var _table$initialState$c, _table$initialState;
      table.setColumnFilters(defaultState ? [] : (_table$initialState$c = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.columnFilters) != null ? _table$initialState$c : []);
    };
    table.getPreFilteredRowModel = () => table.getCoreRowModel();
    table.getFilteredRowModel = () => {
      if (!table._getFilteredRowModel && table.options.getFilteredRowModel) {
        table._getFilteredRowModel = table.options.getFilteredRowModel(table);
      }
      if (table.options.manualFiltering || !table._getFilteredRowModel) {
        return table.getPreFilteredRowModel();
      }
      return table._getFilteredRowModel();
    };
  }
};
function shouldAutoRemoveFilter(filterFn, value, column) {
  return (filterFn && filterFn.autoRemove ? filterFn.autoRemove(value, column) : false) || typeof value === 'undefined' || typeof value === 'string' && !value;
}

const sum = (columnId, _leafRows, childRows) => {
  // It's faster to just add the aggregations together instead of
  // process leaf nodes individually
  return childRows.reduce((sum, next) => {
    const nextValue = next.getValue(columnId);
    return sum + (typeof nextValue === 'number' ? nextValue : 0);
  }, 0);
};
const min = (columnId, _leafRows, childRows) => {
  let min;
  childRows.forEach(row => {
    const value = row.getValue(columnId);
    if (value != null && (min > value || min === undefined && value >= value)) {
      min = value;
    }
  });
  return min;
};
const max = (columnId, _leafRows, childRows) => {
  let max;
  childRows.forEach(row => {
    const value = row.getValue(columnId);
    if (value != null && (max < value || max === undefined && value >= value)) {
      max = value;
    }
  });
  return max;
};
const extent = (columnId, _leafRows, childRows) => {
  let min;
  let max;
  childRows.forEach(row => {
    const value = row.getValue(columnId);
    if (value != null) {
      if (min === undefined) {
        if (value >= value) min = max = value;
      } else {
        if (min > value) min = value;
        if (max < value) max = value;
      }
    }
  });
  return [min, max];
};
const mean = (columnId, leafRows) => {
  let count = 0;
  let sum = 0;
  leafRows.forEach(row => {
    let value = row.getValue(columnId);
    if (value != null && (value = +value) >= value) {
      ++count, sum += value;
    }
  });
  if (count) return sum / count;
  return;
};
const median = (columnId, leafRows) => {
  if (!leafRows.length) {
    return;
  }
  const values = leafRows.map(row => row.getValue(columnId));
  if (!isNumberArray(values)) {
    return;
  }
  if (values.length === 1) {
    return values[0];
  }
  const mid = Math.floor(values.length / 2);
  const nums = values.sort((a, b) => a - b);
  return values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
const unique = (columnId, leafRows) => {
  return Array.from(new Set(leafRows.map(d => d.getValue(columnId))).values());
};
const uniqueCount = (columnId, leafRows) => {
  return new Set(leafRows.map(d => d.getValue(columnId))).size;
};
const count = (_columnId, leafRows) => {
  return leafRows.length;
};
const aggregationFns = {
  sum,
  min,
  max,
  extent,
  mean,
  median,
  unique,
  uniqueCount,
  count
};

//

const ColumnGrouping = {
  getDefaultColumnDef: () => {
    return {
      aggregatedCell: props => {
        var _toString, _props$getValue;
        return (_toString = (_props$getValue = props.getValue()) == null || _props$getValue.toString == null ? void 0 : _props$getValue.toString()) != null ? _toString : null;
      },
      aggregationFn: 'auto'
    };
  },
  getInitialState: state => {
    return {
      grouping: [],
      ...state
    };
  },
  getDefaultOptions: table => {
    return {
      onGroupingChange: makeStateUpdater('grouping', table),
      groupedColumnMode: 'reorder'
    };
  },
  createColumn: (column, table) => {
    column.toggleGrouping = () => {
      table.setGrouping(old => {
        // Find any existing grouping for this column
        if (old != null && old.includes(column.id)) {
          return old.filter(d => d !== column.id);
        }
        return [...(old != null ? old : []), column.id];
      });
    };
    column.getCanGroup = () => {
      var _column$columnDef$ena, _table$options$enable;
      return ((_column$columnDef$ena = column.columnDef.enableGrouping) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableGrouping) != null ? _table$options$enable : true) && (!!column.accessorFn || !!column.columnDef.getGroupingValue);
    };
    column.getIsGrouped = () => {
      var _table$getState$group;
      return (_table$getState$group = table.getState().grouping) == null ? void 0 : _table$getState$group.includes(column.id);
    };
    column.getGroupedIndex = () => {
      var _table$getState$group2;
      return (_table$getState$group2 = table.getState().grouping) == null ? void 0 : _table$getState$group2.indexOf(column.id);
    };
    column.getToggleGroupingHandler = () => {
      const canGroup = column.getCanGroup();
      return () => {
        if (!canGroup) return;
        column.toggleGrouping();
      };
    };
    column.getAutoAggregationFn = () => {
      const firstRow = table.getCoreRowModel().flatRows[0];
      const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
      if (typeof value === 'number') {
        return aggregationFns.sum;
      }
      if (Object.prototype.toString.call(value) === '[object Date]') {
        return aggregationFns.extent;
      }
    };
    column.getAggregationFn = () => {
      var _table$options$aggreg, _table$options$aggreg2;
      if (!column) {
        throw new Error();
      }
      return isFunction(column.columnDef.aggregationFn) ? column.columnDef.aggregationFn : column.columnDef.aggregationFn === 'auto' ? column.getAutoAggregationFn() : (_table$options$aggreg = (_table$options$aggreg2 = table.options.aggregationFns) == null ? void 0 : _table$options$aggreg2[column.columnDef.aggregationFn]) != null ? _table$options$aggreg : aggregationFns[column.columnDef.aggregationFn];
    };
  },
  createTable: table => {
    table.setGrouping = updater => table.options.onGroupingChange == null ? void 0 : table.options.onGroupingChange(updater);
    table.resetGrouping = defaultState => {
      var _table$initialState$g, _table$initialState;
      table.setGrouping(defaultState ? [] : (_table$initialState$g = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.grouping) != null ? _table$initialState$g : []);
    };
    table.getPreGroupedRowModel = () => table.getFilteredRowModel();
    table.getGroupedRowModel = () => {
      if (!table._getGroupedRowModel && table.options.getGroupedRowModel) {
        table._getGroupedRowModel = table.options.getGroupedRowModel(table);
      }
      if (table.options.manualGrouping || !table._getGroupedRowModel) {
        return table.getPreGroupedRowModel();
      }
      return table._getGroupedRowModel();
    };
  },
  createRow: (row, table) => {
    row.getIsGrouped = () => !!row.groupingColumnId;
    row.getGroupingValue = columnId => {
      if (row._groupingValuesCache.hasOwnProperty(columnId)) {
        return row._groupingValuesCache[columnId];
      }
      const column = table.getColumn(columnId);
      if (!(column != null && column.columnDef.getGroupingValue)) {
        return row.getValue(columnId);
      }
      row._groupingValuesCache[columnId] = column.columnDef.getGroupingValue(row.original);
      return row._groupingValuesCache[columnId];
    };
    row._groupingValuesCache = {};
  },
  createCell: (cell, column, row, table) => {
    cell.getIsGrouped = () => column.getIsGrouped() && column.id === row.groupingColumnId;
    cell.getIsPlaceholder = () => !cell.getIsGrouped() && column.getIsGrouped();
    cell.getIsAggregated = () => {
      var _row$subRows;
      return !cell.getIsGrouped() && !cell.getIsPlaceholder() && !!((_row$subRows = row.subRows) != null && _row$subRows.length);
    };
  }
};
function orderColumns(leafColumns, grouping, groupedColumnMode) {
  if (!(grouping != null && grouping.length) || !groupedColumnMode) {
    return leafColumns;
  }
  const nonGroupingColumns = leafColumns.filter(col => !grouping.includes(col.id));
  if (groupedColumnMode === 'remove') {
    return nonGroupingColumns;
  }
  const groupingColumns = grouping.map(g => leafColumns.find(col => col.id === g)).filter(Boolean);
  return [...groupingColumns, ...nonGroupingColumns];
}

//

const ColumnOrdering = {
  getInitialState: state => {
    return {
      columnOrder: [],
      ...state
    };
  },
  getDefaultOptions: table => {
    return {
      onColumnOrderChange: makeStateUpdater('columnOrder', table)
    };
  },
  createColumn: (column, table) => {
    column.getIndex = memo(position => [_getVisibleLeafColumns(table, position)], columns => columns.findIndex(d => d.id === column.id), getMemoOptions(table.options, 'debugColumns', 'getIndex'));
    column.getIsFirstColumn = position => {
      var _columns$;
      const columns = _getVisibleLeafColumns(table, position);
      return ((_columns$ = columns[0]) == null ? void 0 : _columns$.id) === column.id;
    };
    column.getIsLastColumn = position => {
      var _columns;
      const columns = _getVisibleLeafColumns(table, position);
      return ((_columns = columns[columns.length - 1]) == null ? void 0 : _columns.id) === column.id;
    };
  },
  createTable: table => {
    table.setColumnOrder = updater => table.options.onColumnOrderChange == null ? void 0 : table.options.onColumnOrderChange(updater);
    table.resetColumnOrder = defaultState => {
      var _table$initialState$c;
      table.setColumnOrder(defaultState ? [] : (_table$initialState$c = table.initialState.columnOrder) != null ? _table$initialState$c : []);
    };
    table._getOrderColumnsFn = memo(() => [table.getState().columnOrder, table.getState().grouping, table.options.groupedColumnMode], (columnOrder, grouping, groupedColumnMode) => columns => {
      // Sort grouped columns to the start of the column list
      // before the headers are built
      let orderedColumns = [];

      // If there is no order, return the normal columns
      if (!(columnOrder != null && columnOrder.length)) {
        orderedColumns = columns;
      } else {
        const columnOrderCopy = [...columnOrder];

        // If there is an order, make a copy of the columns
        const columnsCopy = [...columns];

        // And make a new ordered array of the columns

        // Loop over the columns and place them in order into the new array
        while (columnsCopy.length && columnOrderCopy.length) {
          const targetColumnId = columnOrderCopy.shift();
          const foundIndex = columnsCopy.findIndex(d => d.id === targetColumnId);
          if (foundIndex > -1) {
            orderedColumns.push(columnsCopy.splice(foundIndex, 1)[0]);
          }
        }

        // If there are any columns left, add them to the end
        orderedColumns = [...orderedColumns, ...columnsCopy];
      }
      return orderColumns(orderedColumns, grouping, groupedColumnMode);
    }, getMemoOptions(table.options, 'debugTable', '_getOrderColumnsFn'));
  }
};

//

const getDefaultColumnPinningState = () => ({
  left: [],
  right: []
});
const ColumnPinning = {
  getInitialState: state => {
    return {
      columnPinning: getDefaultColumnPinningState(),
      ...state
    };
  },
  getDefaultOptions: table => {
    return {
      onColumnPinningChange: makeStateUpdater('columnPinning', table)
    };
  },
  createColumn: (column, table) => {
    column.pin = position => {
      const columnIds = column.getLeafColumns().map(d => d.id).filter(Boolean);
      table.setColumnPinning(old => {
        var _old$left3, _old$right3;
        if (position === 'right') {
          var _old$left, _old$right;
          return {
            left: ((_old$left = old == null ? void 0 : old.left) != null ? _old$left : []).filter(d => !(columnIds != null && columnIds.includes(d))),
            right: [...((_old$right = old == null ? void 0 : old.right) != null ? _old$right : []).filter(d => !(columnIds != null && columnIds.includes(d))), ...columnIds]
          };
        }
        if (position === 'left') {
          var _old$left2, _old$right2;
          return {
            left: [...((_old$left2 = old == null ? void 0 : old.left) != null ? _old$left2 : []).filter(d => !(columnIds != null && columnIds.includes(d))), ...columnIds],
            right: ((_old$right2 = old == null ? void 0 : old.right) != null ? _old$right2 : []).filter(d => !(columnIds != null && columnIds.includes(d)))
          };
        }
        return {
          left: ((_old$left3 = old == null ? void 0 : old.left) != null ? _old$left3 : []).filter(d => !(columnIds != null && columnIds.includes(d))),
          right: ((_old$right3 = old == null ? void 0 : old.right) != null ? _old$right3 : []).filter(d => !(columnIds != null && columnIds.includes(d)))
        };
      });
    };
    column.getCanPin = () => {
      const leafColumns = column.getLeafColumns();
      return leafColumns.some(d => {
        var _d$columnDef$enablePi, _ref, _table$options$enable;
        return ((_d$columnDef$enablePi = d.columnDef.enablePinning) != null ? _d$columnDef$enablePi : true) && ((_ref = (_table$options$enable = table.options.enableColumnPinning) != null ? _table$options$enable : table.options.enablePinning) != null ? _ref : true);
      });
    };
    column.getIsPinned = () => {
      const leafColumnIds = column.getLeafColumns().map(d => d.id);
      const {
        left,
        right
      } = table.getState().columnPinning;
      const isLeft = leafColumnIds.some(d => left == null ? void 0 : left.includes(d));
      const isRight = leafColumnIds.some(d => right == null ? void 0 : right.includes(d));
      return isLeft ? 'left' : isRight ? 'right' : false;
    };
    column.getPinnedIndex = () => {
      var _table$getState$colum, _table$getState$colum2;
      const position = column.getIsPinned();
      return position ? (_table$getState$colum = (_table$getState$colum2 = table.getState().columnPinning) == null || (_table$getState$colum2 = _table$getState$colum2[position]) == null ? void 0 : _table$getState$colum2.indexOf(column.id)) != null ? _table$getState$colum : -1 : 0;
    };
  },
  createRow: (row, table) => {
    row.getCenterVisibleCells = memo(() => [row._getAllVisibleCells(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allCells, left, right) => {
      const leftAndRight = [...(left != null ? left : []), ...(right != null ? right : [])];
      return allCells.filter(d => !leftAndRight.includes(d.column.id));
    }, getMemoOptions(table.options, 'debugRows', 'getCenterVisibleCells'));
    row.getLeftVisibleCells = memo(() => [row._getAllVisibleCells(), table.getState().columnPinning.left], (allCells, left) => {
      const cells = (left != null ? left : []).map(columnId => allCells.find(cell => cell.column.id === columnId)).filter(Boolean).map(d => ({
        ...d,
        position: 'left'
      }));
      return cells;
    }, getMemoOptions(table.options, 'debugRows', 'getLeftVisibleCells'));
    row.getRightVisibleCells = memo(() => [row._getAllVisibleCells(), table.getState().columnPinning.right], (allCells, right) => {
      const cells = (right != null ? right : []).map(columnId => allCells.find(cell => cell.column.id === columnId)).filter(Boolean).map(d => ({
        ...d,
        position: 'right'
      }));
      return cells;
    }, getMemoOptions(table.options, 'debugRows', 'getRightVisibleCells'));
  },
  createTable: table => {
    table.setColumnPinning = updater => table.options.onColumnPinningChange == null ? void 0 : table.options.onColumnPinningChange(updater);
    table.resetColumnPinning = defaultState => {
      var _table$initialState$c, _table$initialState;
      return table.setColumnPinning(defaultState ? getDefaultColumnPinningState() : (_table$initialState$c = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.columnPinning) != null ? _table$initialState$c : getDefaultColumnPinningState());
    };
    table.getIsSomeColumnsPinned = position => {
      var _pinningState$positio;
      const pinningState = table.getState().columnPinning;
      if (!position) {
        var _pinningState$left, _pinningState$right;
        return Boolean(((_pinningState$left = pinningState.left) == null ? void 0 : _pinningState$left.length) || ((_pinningState$right = pinningState.right) == null ? void 0 : _pinningState$right.length));
      }
      return Boolean((_pinningState$positio = pinningState[position]) == null ? void 0 : _pinningState$positio.length);
    };
    table.getLeftLeafColumns = memo(() => [table.getAllLeafColumns(), table.getState().columnPinning.left], (allColumns, left) => {
      return (left != null ? left : []).map(columnId => allColumns.find(column => column.id === columnId)).filter(Boolean);
    }, getMemoOptions(table.options, 'debugColumns', 'getLeftLeafColumns'));
    table.getRightLeafColumns = memo(() => [table.getAllLeafColumns(), table.getState().columnPinning.right], (allColumns, right) => {
      return (right != null ? right : []).map(columnId => allColumns.find(column => column.id === columnId)).filter(Boolean);
    }, getMemoOptions(table.options, 'debugColumns', 'getRightLeafColumns'));
    table.getCenterLeafColumns = memo(() => [table.getAllLeafColumns(), table.getState().columnPinning.left, table.getState().columnPinning.right], (allColumns, left, right) => {
      const leftAndRight = [...(left != null ? left : []), ...(right != null ? right : [])];
      return allColumns.filter(d => !leftAndRight.includes(d.id));
    }, getMemoOptions(table.options, 'debugColumns', 'getCenterLeafColumns'));
  }
};

//

//

const defaultColumnSizing = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
};
const getDefaultColumnSizingInfoState = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: false,
  columnSizingStart: []
});
const ColumnSizing = {
  getDefaultColumnDef: () => {
    return defaultColumnSizing;
  },
  getInitialState: state => {
    return {
      columnSizing: {},
      columnSizingInfo: getDefaultColumnSizingInfoState(),
      ...state
    };
  },
  getDefaultOptions: table => {
    return {
      columnResizeMode: 'onEnd',
      columnResizeDirection: 'ltr',
      onColumnSizingChange: makeStateUpdater('columnSizing', table),
      onColumnSizingInfoChange: makeStateUpdater('columnSizingInfo', table)
    };
  },
  createColumn: (column, table) => {
    column.getSize = () => {
      var _column$columnDef$min, _ref, _column$columnDef$max;
      const columnSize = table.getState().columnSizing[column.id];
      return Math.min(Math.max((_column$columnDef$min = column.columnDef.minSize) != null ? _column$columnDef$min : defaultColumnSizing.minSize, (_ref = columnSize != null ? columnSize : column.columnDef.size) != null ? _ref : defaultColumnSizing.size), (_column$columnDef$max = column.columnDef.maxSize) != null ? _column$columnDef$max : defaultColumnSizing.maxSize);
    };
    column.getStart = memo(position => [position, _getVisibleLeafColumns(table, position), table.getState().columnSizing], (position, columns) => columns.slice(0, column.getIndex(position)).reduce((sum, column) => sum + column.getSize(), 0), getMemoOptions(table.options, 'debugColumns', 'getStart'));
    column.getAfter = memo(position => [position, _getVisibleLeafColumns(table, position), table.getState().columnSizing], (position, columns) => columns.slice(column.getIndex(position) + 1).reduce((sum, column) => sum + column.getSize(), 0), getMemoOptions(table.options, 'debugColumns', 'getAfter'));
    column.resetSize = () => {
      table.setColumnSizing(_ref2 => {
        let {
          [column.id]: _,
          ...rest
        } = _ref2;
        return rest;
      });
    };
    column.getCanResize = () => {
      var _column$columnDef$ena, _table$options$enable;
      return ((_column$columnDef$ena = column.columnDef.enableResizing) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableColumnResizing) != null ? _table$options$enable : true);
    };
    column.getIsResizing = () => {
      return table.getState().columnSizingInfo.isResizingColumn === column.id;
    };
  },
  createHeader: (header, table) => {
    header.getSize = () => {
      let sum = 0;
      const recurse = header => {
        if (header.subHeaders.length) {
          header.subHeaders.forEach(recurse);
        } else {
          var _header$column$getSiz;
          sum += (_header$column$getSiz = header.column.getSize()) != null ? _header$column$getSiz : 0;
        }
      };
      recurse(header);
      return sum;
    };
    header.getStart = () => {
      if (header.index > 0) {
        const prevSiblingHeader = header.headerGroup.headers[header.index - 1];
        return prevSiblingHeader.getStart() + prevSiblingHeader.getSize();
      }
      return 0;
    };
    header.getResizeHandler = _contextDocument => {
      const column = table.getColumn(header.column.id);
      const canResize = column == null ? void 0 : column.getCanResize();
      return e => {
        if (!column || !canResize) {
          return;
        }
        e.persist == null || e.persist();
        if (isTouchStartEvent(e)) {
          // lets not respond to multiple touches (e.g. 2 or 3 fingers)
          if (e.touches && e.touches.length > 1) {
            return;
          }
        }
        const startSize = header.getSize();
        const columnSizingStart = header ? header.getLeafHeaders().map(d => [d.column.id, d.column.getSize()]) : [[column.id, column.getSize()]];
        const clientX = isTouchStartEvent(e) ? Math.round(e.touches[0].clientX) : e.clientX;
        const newColumnSizing = {};
        const updateOffset = (eventType, clientXPos) => {
          if (typeof clientXPos !== 'number') {
            return;
          }
          table.setColumnSizingInfo(old => {
            var _old$startOffset, _old$startSize;
            const deltaDirection = table.options.columnResizeDirection === 'rtl' ? -1 : 1;
            const deltaOffset = (clientXPos - ((_old$startOffset = old == null ? void 0 : old.startOffset) != null ? _old$startOffset : 0)) * deltaDirection;
            const deltaPercentage = Math.max(deltaOffset / ((_old$startSize = old == null ? void 0 : old.startSize) != null ? _old$startSize : 0), -0.999999);
            old.columnSizingStart.forEach(_ref3 => {
              let [columnId, headerSize] = _ref3;
              newColumnSizing[columnId] = Math.round(Math.max(headerSize + headerSize * deltaPercentage, 0) * 100) / 100;
            });
            return {
              ...old,
              deltaOffset,
              deltaPercentage
            };
          });
          if (table.options.columnResizeMode === 'onChange' || eventType === 'end') {
            table.setColumnSizing(old => ({
              ...old,
              ...newColumnSizing
            }));
          }
        };
        const onMove = clientXPos => updateOffset('move', clientXPos);
        const onEnd = clientXPos => {
          updateOffset('end', clientXPos);
          table.setColumnSizingInfo(old => ({
            ...old,
            isResizingColumn: false,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        };
        const contextDocument = _contextDocument || typeof document !== 'undefined' ? document : null;
        const mouseEvents = {
          moveHandler: e => onMove(e.clientX),
          upHandler: e => {
            contextDocument == null || contextDocument.removeEventListener('mousemove', mouseEvents.moveHandler);
            contextDocument == null || contextDocument.removeEventListener('mouseup', mouseEvents.upHandler);
            onEnd(e.clientX);
          }
        };
        const touchEvents = {
          moveHandler: e => {
            if (e.cancelable) {
              e.preventDefault();
              e.stopPropagation();
            }
            onMove(e.touches[0].clientX);
            return false;
          },
          upHandler: e => {
            var _e$touches$;
            contextDocument == null || contextDocument.removeEventListener('touchmove', touchEvents.moveHandler);
            contextDocument == null || contextDocument.removeEventListener('touchend', touchEvents.upHandler);
            if (e.cancelable) {
              e.preventDefault();
              e.stopPropagation();
            }
            onEnd((_e$touches$ = e.touches[0]) == null ? void 0 : _e$touches$.clientX);
          }
        };
        const passiveIfSupported = passiveEventSupported() ? {
          passive: false
        } : false;
        if (isTouchStartEvent(e)) {
          contextDocument == null || contextDocument.addEventListener('touchmove', touchEvents.moveHandler, passiveIfSupported);
          contextDocument == null || contextDocument.addEventListener('touchend', touchEvents.upHandler, passiveIfSupported);
        } else {
          contextDocument == null || contextDocument.addEventListener('mousemove', mouseEvents.moveHandler, passiveIfSupported);
          contextDocument == null || contextDocument.addEventListener('mouseup', mouseEvents.upHandler, passiveIfSupported);
        }
        table.setColumnSizingInfo(old => ({
          ...old,
          startOffset: clientX,
          startSize,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart,
          isResizingColumn: column.id
        }));
      };
    };
  },
  createTable: table => {
    table.setColumnSizing = updater => table.options.onColumnSizingChange == null ? void 0 : table.options.onColumnSizingChange(updater);
    table.setColumnSizingInfo = updater => table.options.onColumnSizingInfoChange == null ? void 0 : table.options.onColumnSizingInfoChange(updater);
    table.resetColumnSizing = defaultState => {
      var _table$initialState$c;
      table.setColumnSizing(defaultState ? {} : (_table$initialState$c = table.initialState.columnSizing) != null ? _table$initialState$c : {});
    };
    table.resetHeaderSizeInfo = defaultState => {
      var _table$initialState$c2;
      table.setColumnSizingInfo(defaultState ? getDefaultColumnSizingInfoState() : (_table$initialState$c2 = table.initialState.columnSizingInfo) != null ? _table$initialState$c2 : getDefaultColumnSizingInfoState());
    };
    table.getTotalSize = () => {
      var _table$getHeaderGroup, _table$getHeaderGroup2;
      return (_table$getHeaderGroup = (_table$getHeaderGroup2 = table.getHeaderGroups()[0]) == null ? void 0 : _table$getHeaderGroup2.headers.reduce((sum, header) => {
        return sum + header.getSize();
      }, 0)) != null ? _table$getHeaderGroup : 0;
    };
    table.getLeftTotalSize = () => {
      var _table$getLeftHeaderG, _table$getLeftHeaderG2;
      return (_table$getLeftHeaderG = (_table$getLeftHeaderG2 = table.getLeftHeaderGroups()[0]) == null ? void 0 : _table$getLeftHeaderG2.headers.reduce((sum, header) => {
        return sum + header.getSize();
      }, 0)) != null ? _table$getLeftHeaderG : 0;
    };
    table.getCenterTotalSize = () => {
      var _table$getCenterHeade, _table$getCenterHeade2;
      return (_table$getCenterHeade = (_table$getCenterHeade2 = table.getCenterHeaderGroups()[0]) == null ? void 0 : _table$getCenterHeade2.headers.reduce((sum, header) => {
        return sum + header.getSize();
      }, 0)) != null ? _table$getCenterHeade : 0;
    };
    table.getRightTotalSize = () => {
      var _table$getRightHeader, _table$getRightHeader2;
      return (_table$getRightHeader = (_table$getRightHeader2 = table.getRightHeaderGroups()[0]) == null ? void 0 : _table$getRightHeader2.headers.reduce((sum, header) => {
        return sum + header.getSize();
      }, 0)) != null ? _table$getRightHeader : 0;
    };
  }
};
let passiveSupported = null;
function passiveEventSupported() {
  if (typeof passiveSupported === 'boolean') return passiveSupported;
  let supported = false;
  try {
    const options = {
      get passive() {
        supported = true;
        return false;
      }
    };
    const noop = () => {};
    window.addEventListener('test', noop, options);
    window.removeEventListener('test', noop);
  } catch (err) {
    supported = false;
  }
  passiveSupported = supported;
  return passiveSupported;
}
function isTouchStartEvent(e) {
  return e.type === 'touchstart';
}

//

const ColumnVisibility = {
  getInitialState: state => {
    return {
      columnVisibility: {},
      ...state
    };
  },
  getDefaultOptions: table => {
    return {
      onColumnVisibilityChange: makeStateUpdater('columnVisibility', table)
    };
  },
  createColumn: (column, table) => {
    column.toggleVisibility = value => {
      if (column.getCanHide()) {
        table.setColumnVisibility(old => ({
          ...old,
          [column.id]: value != null ? value : !column.getIsVisible()
        }));
      }
    };
    column.getIsVisible = () => {
      var _ref, _table$getState$colum;
      const childColumns = column.columns;
      return (_ref = childColumns.length ? childColumns.some(c => c.getIsVisible()) : (_table$getState$colum = table.getState().columnVisibility) == null ? void 0 : _table$getState$colum[column.id]) != null ? _ref : true;
    };
    column.getCanHide = () => {
      var _column$columnDef$ena, _table$options$enable;
      return ((_column$columnDef$ena = column.columnDef.enableHiding) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableHiding) != null ? _table$options$enable : true);
    };
    column.getToggleVisibilityHandler = () => {
      return e => {
        column.toggleVisibility == null || column.toggleVisibility(e.target.checked);
      };
    };
  },
  createRow: (row, table) => {
    row._getAllVisibleCells = memo(() => [row.getAllCells(), table.getState().columnVisibility], cells => {
      return cells.filter(cell => cell.column.getIsVisible());
    }, getMemoOptions(table.options, 'debugRows', '_getAllVisibleCells'));
    row.getVisibleCells = memo(() => [row.getLeftVisibleCells(), row.getCenterVisibleCells(), row.getRightVisibleCells()], (left, center, right) => [...left, ...center, ...right], getMemoOptions(table.options, 'debugRows', 'getVisibleCells'));
  },
  createTable: table => {
    const makeVisibleColumnsMethod = (key, getColumns) => {
      return memo(() => [getColumns(), getColumns().filter(d => d.getIsVisible()).map(d => d.id).join('_')], columns => {
        return columns.filter(d => d.getIsVisible == null ? void 0 : d.getIsVisible());
      }, getMemoOptions(table.options, 'debugColumns', key));
    };
    table.getVisibleFlatColumns = makeVisibleColumnsMethod('getVisibleFlatColumns', () => table.getAllFlatColumns());
    table.getVisibleLeafColumns = makeVisibleColumnsMethod('getVisibleLeafColumns', () => table.getAllLeafColumns());
    table.getLeftVisibleLeafColumns = makeVisibleColumnsMethod('getLeftVisibleLeafColumns', () => table.getLeftLeafColumns());
    table.getRightVisibleLeafColumns = makeVisibleColumnsMethod('getRightVisibleLeafColumns', () => table.getRightLeafColumns());
    table.getCenterVisibleLeafColumns = makeVisibleColumnsMethod('getCenterVisibleLeafColumns', () => table.getCenterLeafColumns());
    table.setColumnVisibility = updater => table.options.onColumnVisibilityChange == null ? void 0 : table.options.onColumnVisibilityChange(updater);
    table.resetColumnVisibility = defaultState => {
      var _table$initialState$c;
      table.setColumnVisibility(defaultState ? {} : (_table$initialState$c = table.initialState.columnVisibility) != null ? _table$initialState$c : {});
    };
    table.toggleAllColumnsVisible = value => {
      var _value;
      value = (_value = value) != null ? _value : !table.getIsAllColumnsVisible();
      table.setColumnVisibility(table.getAllLeafColumns().reduce((obj, column) => ({
        ...obj,
        [column.id]: !value ? !(column.getCanHide != null && column.getCanHide()) : value
      }), {}));
    };
    table.getIsAllColumnsVisible = () => !table.getAllLeafColumns().some(column => !(column.getIsVisible != null && column.getIsVisible()));
    table.getIsSomeColumnsVisible = () => table.getAllLeafColumns().some(column => column.getIsVisible == null ? void 0 : column.getIsVisible());
    table.getToggleAllColumnsVisibilityHandler = () => {
      return e => {
        var _target;
        table.toggleAllColumnsVisible((_target = e.target) == null ? void 0 : _target.checked);
      };
    };
  }
};
function _getVisibleLeafColumns(table, position) {
  return !position ? table.getVisibleLeafColumns() : position === 'center' ? table.getCenterVisibleLeafColumns() : position === 'left' ? table.getLeftVisibleLeafColumns() : table.getRightVisibleLeafColumns();
}

//

const GlobalFaceting = {
  createTable: table => {
    table._getGlobalFacetedRowModel = table.options.getFacetedRowModel && table.options.getFacetedRowModel(table, '__global__');
    table.getGlobalFacetedRowModel = () => {
      if (table.options.manualFiltering || !table._getGlobalFacetedRowModel) {
        return table.getPreFilteredRowModel();
      }
      return table._getGlobalFacetedRowModel();
    };
    table._getGlobalFacetedUniqueValues = table.options.getFacetedUniqueValues && table.options.getFacetedUniqueValues(table, '__global__');
    table.getGlobalFacetedUniqueValues = () => {
      if (!table._getGlobalFacetedUniqueValues) {
        return new Map();
      }
      return table._getGlobalFacetedUniqueValues();
    };
    table._getGlobalFacetedMinMaxValues = table.options.getFacetedMinMaxValues && table.options.getFacetedMinMaxValues(table, '__global__');
    table.getGlobalFacetedMinMaxValues = () => {
      if (!table._getGlobalFacetedMinMaxValues) {
        return;
      }
      return table._getGlobalFacetedMinMaxValues();
    };
  }
};

//

const GlobalFiltering = {
  getInitialState: state => {
    return {
      globalFilter: undefined,
      ...state
    };
  },
  getDefaultOptions: table => {
    return {
      onGlobalFilterChange: makeStateUpdater('globalFilter', table),
      globalFilterFn: 'auto',
      getColumnCanGlobalFilter: column => {
        var _table$getCoreRowMode;
        const value = (_table$getCoreRowMode = table.getCoreRowModel().flatRows[0]) == null || (_table$getCoreRowMode = _table$getCoreRowMode._getAllCellsByColumnId()[column.id]) == null ? void 0 : _table$getCoreRowMode.getValue();
        return typeof value === 'string' || typeof value === 'number';
      }
    };
  },
  createColumn: (column, table) => {
    column.getCanGlobalFilter = () => {
      var _column$columnDef$ena, _table$options$enable, _table$options$enable2, _table$options$getCol;
      return ((_column$columnDef$ena = column.columnDef.enableGlobalFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table.options.enableGlobalFilter) != null ? _table$options$enable : true) && ((_table$options$enable2 = table.options.enableFilters) != null ? _table$options$enable2 : true) && ((_table$options$getCol = table.options.getColumnCanGlobalFilter == null ? void 0 : table.options.getColumnCanGlobalFilter(column)) != null ? _table$options$getCol : true) && !!column.accessorFn;
    };
  },
  createTable: table => {
    table.getGlobalAutoFilterFn = () => {
      return filterFns.includesString;
    };
    table.getGlobalFilterFn = () => {
      var _table$options$filter, _table$options$filter2;
      const {
        globalFilterFn: globalFilterFn
      } = table.options;
      return isFunction(globalFilterFn) ? globalFilterFn : globalFilterFn === 'auto' ? table.getGlobalAutoFilterFn() : (_table$options$filter = (_table$options$filter2 = table.options.filterFns) == null ? void 0 : _table$options$filter2[globalFilterFn]) != null ? _table$options$filter : filterFns[globalFilterFn];
    };
    table.setGlobalFilter = updater => {
      table.options.onGlobalFilterChange == null || table.options.onGlobalFilterChange(updater);
    };
    table.resetGlobalFilter = defaultState => {
      table.setGlobalFilter(defaultState ? undefined : table.initialState.globalFilter);
    };
  }
};

//

const RowExpanding = {
  getInitialState: state => {
    return {
      expanded: {},
      ...state
    };
  },
  getDefaultOptions: table => {
    return {
      onExpandedChange: makeStateUpdater('expanded', table),
      paginateExpandedRows: true
    };
  },
  createTable: table => {
    let registered = false;
    let queued = false;
    table._autoResetExpanded = () => {
      var _ref, _table$options$autoRe;
      if (!registered) {
        table._queue(() => {
          registered = true;
        });
        return;
      }
      if ((_ref = (_table$options$autoRe = table.options.autoResetAll) != null ? _table$options$autoRe : table.options.autoResetExpanded) != null ? _ref : !table.options.manualExpanding) {
        if (queued) return;
        queued = true;
        table._queue(() => {
          table.resetExpanded();
          queued = false;
        });
      }
    };
    table.setExpanded = updater => table.options.onExpandedChange == null ? void 0 : table.options.onExpandedChange(updater);
    table.toggleAllRowsExpanded = expanded => {
      if (expanded != null ? expanded : !table.getIsAllRowsExpanded()) {
        table.setExpanded(true);
      } else {
        table.setExpanded({});
      }
    };
    table.resetExpanded = defaultState => {
      var _table$initialState$e, _table$initialState;
      table.setExpanded(defaultState ? {} : (_table$initialState$e = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.expanded) != null ? _table$initialState$e : {});
    };
    table.getCanSomeRowsExpand = () => {
      return table.getPrePaginationRowModel().flatRows.some(row => row.getCanExpand());
    };
    table.getToggleAllRowsExpandedHandler = () => {
      return e => {
        e.persist == null || e.persist();
        table.toggleAllRowsExpanded();
      };
    };
    table.getIsSomeRowsExpanded = () => {
      const expanded = table.getState().expanded;
      return expanded === true || Object.values(expanded).some(Boolean);
    };
    table.getIsAllRowsExpanded = () => {
      const expanded = table.getState().expanded;

      // If expanded is true, save some cycles and return true
      if (typeof expanded === 'boolean') {
        return expanded === true;
      }
      if (!Object.keys(expanded).length) {
        return false;
      }

      // If any row is not expanded, return false
      if (table.getRowModel().flatRows.some(row => !row.getIsExpanded())) {
        return false;
      }

      // They must all be expanded :shrug:
      return true;
    };
    table.getExpandedDepth = () => {
      let maxDepth = 0;
      const rowIds = table.getState().expanded === true ? Object.keys(table.getRowModel().rowsById) : Object.keys(table.getState().expanded);
      rowIds.forEach(id => {
        const splitId = id.split('.');
        maxDepth = Math.max(maxDepth, splitId.length);
      });
      return maxDepth;
    };
    table.getPreExpandedRowModel = () => table.getSortedRowModel();
    table.getExpandedRowModel = () => {
      if (!table._getExpandedRowModel && table.options.getExpandedRowModel) {
        table._getExpandedRowModel = table.options.getExpandedRowModel(table);
      }
      if (table.options.manualExpanding || !table._getExpandedRowModel) {
        return table.getPreExpandedRowModel();
      }
      return table._getExpandedRowModel();
    };
  },
  createRow: (row, table) => {
    row.toggleExpanded = expanded => {
      table.setExpanded(old => {
        var _expanded;
        const exists = old === true ? true : !!(old != null && old[row.id]);
        let oldExpanded = {};
        if (old === true) {
          Object.keys(table.getRowModel().rowsById).forEach(rowId => {
            oldExpanded[rowId] = true;
          });
        } else {
          oldExpanded = old;
        }
        expanded = (_expanded = expanded) != null ? _expanded : !exists;
        if (!exists && expanded) {
          return {
            ...oldExpanded,
            [row.id]: true
          };
        }
        if (exists && !expanded) {
          const {
            [row.id]: _,
            ...rest
          } = oldExpanded;
          return rest;
        }
        return old;
      });
    };
    row.getIsExpanded = () => {
      var _table$options$getIsR;
      const expanded = table.getState().expanded;
      return !!((_table$options$getIsR = table.options.getIsRowExpanded == null ? void 0 : table.options.getIsRowExpanded(row)) != null ? _table$options$getIsR : expanded === true || (expanded == null ? void 0 : expanded[row.id]));
    };
    row.getCanExpand = () => {
      var _table$options$getRow, _table$options$enable, _row$subRows;
      return (_table$options$getRow = table.options.getRowCanExpand == null ? void 0 : table.options.getRowCanExpand(row)) != null ? _table$options$getRow : ((_table$options$enable = table.options.enableExpanding) != null ? _table$options$enable : true) && !!((_row$subRows = row.subRows) != null && _row$subRows.length);
    };
    row.getIsAllParentsExpanded = () => {
      let isFullyExpanded = true;
      let currentRow = row;
      while (isFullyExpanded && currentRow.parentId) {
        currentRow = table.getRow(currentRow.parentId, true);
        isFullyExpanded = currentRow.getIsExpanded();
      }
      return isFullyExpanded;
    };
    row.getToggleExpandedHandler = () => {
      const canExpand = row.getCanExpand();
      return () => {
        if (!canExpand) return;
        row.toggleExpanded();
      };
    };
  }
};

//

const defaultPageIndex = 0;
const defaultPageSize = 10;
const getDefaultPaginationState = () => ({
  pageIndex: defaultPageIndex,
  pageSize: defaultPageSize
});
const RowPagination = {
  getInitialState: state => {
    return {
      ...state,
      pagination: {
        ...getDefaultPaginationState(),
        ...(state == null ? void 0 : state.pagination)
      }
    };
  },
  getDefaultOptions: table => {
    return {
      onPaginationChange: makeStateUpdater('pagination', table)
    };
  },
  createTable: table => {
    let registered = false;
    let queued = false;
    table._autoResetPageIndex = () => {
      var _ref, _table$options$autoRe;
      if (!registered) {
        table._queue(() => {
          registered = true;
        });
        return;
      }
      if ((_ref = (_table$options$autoRe = table.options.autoResetAll) != null ? _table$options$autoRe : table.options.autoResetPageIndex) != null ? _ref : !table.options.manualPagination) {
        if (queued) return;
        queued = true;
        table._queue(() => {
          table.resetPageIndex();
          queued = false;
        });
      }
    };
    table.setPagination = updater => {
      const safeUpdater = old => {
        let newState = functionalUpdate(updater, old);
        return newState;
      };
      return table.options.onPaginationChange == null ? void 0 : table.options.onPaginationChange(safeUpdater);
    };
    table.resetPagination = defaultState => {
      var _table$initialState$p;
      table.setPagination(defaultState ? getDefaultPaginationState() : (_table$initialState$p = table.initialState.pagination) != null ? _table$initialState$p : getDefaultPaginationState());
    };
    table.setPageIndex = updater => {
      table.setPagination(old => {
        let pageIndex = functionalUpdate(updater, old.pageIndex);
        const maxPageIndex = typeof table.options.pageCount === 'undefined' || table.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : table.options.pageCount - 1;
        pageIndex = Math.max(0, Math.min(pageIndex, maxPageIndex));
        return {
          ...old,
          pageIndex
        };
      });
    };
    table.resetPageIndex = defaultState => {
      var _table$initialState$p2, _table$initialState;
      table.setPageIndex(defaultState ? defaultPageIndex : (_table$initialState$p2 = (_table$initialState = table.initialState) == null || (_table$initialState = _table$initialState.pagination) == null ? void 0 : _table$initialState.pageIndex) != null ? _table$initialState$p2 : defaultPageIndex);
    };
    table.resetPageSize = defaultState => {
      var _table$initialState$p3, _table$initialState2;
      table.setPageSize(defaultState ? defaultPageSize : (_table$initialState$p3 = (_table$initialState2 = table.initialState) == null || (_table$initialState2 = _table$initialState2.pagination) == null ? void 0 : _table$initialState2.pageSize) != null ? _table$initialState$p3 : defaultPageSize);
    };
    table.setPageSize = updater => {
      table.setPagination(old => {
        const pageSize = Math.max(1, functionalUpdate(updater, old.pageSize));
        const topRowIndex = old.pageSize * old.pageIndex;
        const pageIndex = Math.floor(topRowIndex / pageSize);
        return {
          ...old,
          pageIndex,
          pageSize
        };
      });
    };
    //deprecated
    table.setPageCount = updater => table.setPagination(old => {
      var _table$options$pageCo;
      let newPageCount = functionalUpdate(updater, (_table$options$pageCo = table.options.pageCount) != null ? _table$options$pageCo : -1);
      if (typeof newPageCount === 'number') {
        newPageCount = Math.max(-1, newPageCount);
      }
      return {
        ...old,
        pageCount: newPageCount
      };
    });
    table.getPageOptions = memo(() => [table.getPageCount()], pageCount => {
      let pageOptions = [];
      if (pageCount && pageCount > 0) {
        pageOptions = [...new Array(pageCount)].fill(null).map((_, i) => i);
      }
      return pageOptions;
    }, getMemoOptions(table.options, 'debugTable', 'getPageOptions'));
    table.getCanPreviousPage = () => table.getState().pagination.pageIndex > 0;
    table.getCanNextPage = () => {
      const {
        pageIndex
      } = table.getState().pagination;
      const pageCount = table.getPageCount();
      if (pageCount === -1) {
        return true;
      }
      if (pageCount === 0) {
        return false;
      }
      return pageIndex < pageCount - 1;
    };
    table.previousPage = () => {
      return table.setPageIndex(old => old - 1);
    };
    table.nextPage = () => {
      return table.setPageIndex(old => {
        return old + 1;
      });
    };
    table.firstPage = () => {
      return table.setPageIndex(0);
    };
    table.lastPage = () => {
      return table.setPageIndex(table.getPageCount() - 1);
    };
    table.getPrePaginationRowModel = () => table.getExpandedRowModel();
    table.getPaginationRowModel = () => {
      if (!table._getPaginationRowModel && table.options.getPaginationRowModel) {
        table._getPaginationRowModel = table.options.getPaginationRowModel(table);
      }
      if (table.options.manualPagination || !table._getPaginationRowModel) {
        return table.getPrePaginationRowModel();
      }
      return table._getPaginationRowModel();
    };
    table.getPageCount = () => {
      var _table$options$pageCo2;
      return (_table$options$pageCo2 = table.options.pageCount) != null ? _table$options$pageCo2 : Math.ceil(table.getRowCount() / table.getState().pagination.pageSize);
    };
    table.getRowCount = () => {
      var _table$options$rowCou;
      return (_table$options$rowCou = table.options.rowCount) != null ? _table$options$rowCou : table.getPrePaginationRowModel().rows.length;
    };
  }
};

//

const getDefaultRowPinningState = () => ({
  top: [],
  bottom: []
});
const RowPinning = {
  getInitialState: state => {
    return {
      rowPinning: getDefaultRowPinningState(),
      ...state
    };
  },
  getDefaultOptions: table => {
    return {
      onRowPinningChange: makeStateUpdater('rowPinning', table)
    };
  },
  createRow: (row, table) => {
    row.pin = (position, includeLeafRows, includeParentRows) => {
      const leafRowIds = includeLeafRows ? row.getLeafRows().map(_ref => {
        let {
          id
        } = _ref;
        return id;
      }) : [];
      const parentRowIds = includeParentRows ? row.getParentRows().map(_ref2 => {
        let {
          id
        } = _ref2;
        return id;
      }) : [];
      const rowIds = new Set([...parentRowIds, row.id, ...leafRowIds]);
      table.setRowPinning(old => {
        var _old$top3, _old$bottom3;
        if (position === 'bottom') {
          var _old$top, _old$bottom;
          return {
            top: ((_old$top = old == null ? void 0 : old.top) != null ? _old$top : []).filter(d => !(rowIds != null && rowIds.has(d))),
            bottom: [...((_old$bottom = old == null ? void 0 : old.bottom) != null ? _old$bottom : []).filter(d => !(rowIds != null && rowIds.has(d))), ...Array.from(rowIds)]
          };
        }
        if (position === 'top') {
          var _old$top2, _old$bottom2;
          return {
            top: [...((_old$top2 = old == null ? void 0 : old.top) != null ? _old$top2 : []).filter(d => !(rowIds != null && rowIds.has(d))), ...Array.from(rowIds)],
            bottom: ((_old$bottom2 = old == null ? void 0 : old.bottom) != null ? _old$bottom2 : []).filter(d => !(rowIds != null && rowIds.has(d)))
          };
        }
        return {
          top: ((_old$top3 = old == null ? void 0 : old.top) != null ? _old$top3 : []).filter(d => !(rowIds != null && rowIds.has(d))),
          bottom: ((_old$bottom3 = old == null ? void 0 : old.bottom) != null ? _old$bottom3 : []).filter(d => !(rowIds != null && rowIds.has(d)))
        };
      });
    };
    row.getCanPin = () => {
      var _ref3;
      const {
        enableRowPinning,
        enablePinning
      } = table.options;
      if (typeof enableRowPinning === 'function') {
        return enableRowPinning(row);
      }
      return (_ref3 = enableRowPinning != null ? enableRowPinning : enablePinning) != null ? _ref3 : true;
    };
    row.getIsPinned = () => {
      const rowIds = [row.id];
      const {
        top,
        bottom
      } = table.getState().rowPinning;
      const isTop = rowIds.some(d => top == null ? void 0 : top.includes(d));
      const isBottom = rowIds.some(d => bottom == null ? void 0 : bottom.includes(d));
      return isTop ? 'top' : isBottom ? 'bottom' : false;
    };
    row.getPinnedIndex = () => {
      var _ref4, _visiblePinnedRowIds$;
      const position = row.getIsPinned();
      if (!position) return -1;
      const visiblePinnedRowIds = (_ref4 = position === 'top' ? table.getTopRows() : table.getBottomRows()) == null ? void 0 : _ref4.map(_ref5 => {
        let {
          id
        } = _ref5;
        return id;
      });
      return (_visiblePinnedRowIds$ = visiblePinnedRowIds == null ? void 0 : visiblePinnedRowIds.indexOf(row.id)) != null ? _visiblePinnedRowIds$ : -1;
    };
  },
  createTable: table => {
    table.setRowPinning = updater => table.options.onRowPinningChange == null ? void 0 : table.options.onRowPinningChange(updater);
    table.resetRowPinning = defaultState => {
      var _table$initialState$r, _table$initialState;
      return table.setRowPinning(defaultState ? getDefaultRowPinningState() : (_table$initialState$r = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.rowPinning) != null ? _table$initialState$r : getDefaultRowPinningState());
    };
    table.getIsSomeRowsPinned = position => {
      var _pinningState$positio;
      const pinningState = table.getState().rowPinning;
      if (!position) {
        var _pinningState$top, _pinningState$bottom;
        return Boolean(((_pinningState$top = pinningState.top) == null ? void 0 : _pinningState$top.length) || ((_pinningState$bottom = pinningState.bottom) == null ? void 0 : _pinningState$bottom.length));
      }
      return Boolean((_pinningState$positio = pinningState[position]) == null ? void 0 : _pinningState$positio.length);
    };
    table._getPinnedRows = (visibleRows, pinnedRowIds, position) => {
      var _table$options$keepPi;
      const rows = ((_table$options$keepPi = table.options.keepPinnedRows) != null ? _table$options$keepPi : true) ?
      //get all rows that are pinned even if they would not be otherwise visible
      //account for expanded parent rows, but not pagination or filtering
      (pinnedRowIds != null ? pinnedRowIds : []).map(rowId => {
        const row = table.getRow(rowId, true);
        return row.getIsAllParentsExpanded() ? row : null;
      }) :
      //else get only visible rows that are pinned
      (pinnedRowIds != null ? pinnedRowIds : []).map(rowId => visibleRows.find(row => row.id === rowId));
      return rows.filter(Boolean).map(d => ({
        ...d,
        position
      }));
    };
    table.getTopRows = memo(() => [table.getRowModel().rows, table.getState().rowPinning.top], (allRows, topPinnedRowIds) => table._getPinnedRows(allRows, topPinnedRowIds, 'top'), getMemoOptions(table.options, 'debugRows', 'getTopRows'));
    table.getBottomRows = memo(() => [table.getRowModel().rows, table.getState().rowPinning.bottom], (allRows, bottomPinnedRowIds) => table._getPinnedRows(allRows, bottomPinnedRowIds, 'bottom'), getMemoOptions(table.options, 'debugRows', 'getBottomRows'));
    table.getCenterRows = memo(() => [table.getRowModel().rows, table.getState().rowPinning.top, table.getState().rowPinning.bottom], (allRows, top, bottom) => {
      const topAndBottom = new Set([...(top != null ? top : []), ...(bottom != null ? bottom : [])]);
      return allRows.filter(d => !topAndBottom.has(d.id));
    }, getMemoOptions(table.options, 'debugRows', 'getCenterRows'));
  }
};

//

const RowSelection = {
  getInitialState: state => {
    return {
      rowSelection: {},
      ...state
    };
  },
  getDefaultOptions: table => {
    return {
      onRowSelectionChange: makeStateUpdater('rowSelection', table),
      enableRowSelection: true,
      enableMultiRowSelection: true,
      enableSubRowSelection: true
      // enableGroupingRowSelection: false,
      // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
      // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
    };
  },
  createTable: table => {
    table.setRowSelection = updater => table.options.onRowSelectionChange == null ? void 0 : table.options.onRowSelectionChange(updater);
    table.resetRowSelection = defaultState => {
      var _table$initialState$r;
      return table.setRowSelection(defaultState ? {} : (_table$initialState$r = table.initialState.rowSelection) != null ? _table$initialState$r : {});
    };
    table.toggleAllRowsSelected = value => {
      table.setRowSelection(old => {
        value = typeof value !== 'undefined' ? value : !table.getIsAllRowsSelected();
        const rowSelection = {
          ...old
        };
        const preGroupedFlatRows = table.getPreGroupedRowModel().flatRows;

        // We don't use `mutateRowIsSelected` here for performance reasons.
        // All of the rows are flat already, so it wouldn't be worth it
        if (value) {
          preGroupedFlatRows.forEach(row => {
            if (!row.getCanSelect()) {
              return;
            }
            rowSelection[row.id] = true;
          });
        } else {
          preGroupedFlatRows.forEach(row => {
            delete rowSelection[row.id];
          });
        }
        return rowSelection;
      });
    };
    table.toggleAllPageRowsSelected = value => table.setRowSelection(old => {
      const resolvedValue = typeof value !== 'undefined' ? value : !table.getIsAllPageRowsSelected();
      const rowSelection = {
        ...old
      };
      table.getRowModel().rows.forEach(row => {
        mutateRowIsSelected(rowSelection, row.id, resolvedValue, true, table);
      });
      return rowSelection;
    });

    // addRowSelectionRange: rowId => {
    //   const {
    //     rows,
    //     rowsById,
    //     options: { selectGroupingRows, selectSubRows },
    //   } = table

    //   const findSelectedRow = (rows: Row[]) => {
    //     let found
    //     rows.find(d => {
    //       if (d.getIsSelected()) {
    //         found = d
    //         return true
    //       }
    //       const subFound = findSelectedRow(d.subRows || [])
    //       if (subFound) {
    //         found = subFound
    //         return true
    //       }
    //       return false
    //     })
    //     return found
    //   }

    //   const firstRow = findSelectedRow(rows) || rows[0]
    //   const lastRow = rowsById[rowId]

    //   let include = false
    //   const selectedRowIds = {}

    //   const addRow = (row: Row) => {
    //     mutateRowIsSelected(selectedRowIds, row.id, true, {
    //       rowsById,
    //       selectGroupingRows: selectGroupingRows!,
    //       selectSubRows: selectSubRows!,
    //     })
    //   }

    //   table.rows.forEach(row => {
    //     const isFirstRow = row.id === firstRow.id
    //     const isLastRow = row.id === lastRow.id

    //     if (isFirstRow || isLastRow) {
    //       if (!include) {
    //         include = true
    //       } else if (include) {
    //         addRow(row)
    //         include = false
    //       }
    //     }

    //     if (include) {
    //       addRow(row)
    //     }
    //   })

    //   table.setRowSelection(selectedRowIds)
    // },
    table.getPreSelectedRowModel = () => table.getCoreRowModel();
    table.getSelectedRowModel = memo(() => [table.getState().rowSelection, table.getCoreRowModel()], (rowSelection, rowModel) => {
      if (!Object.keys(rowSelection).length) {
        return {
          rows: [],
          flatRows: [],
          rowsById: {}
        };
      }
      return selectRowsFn(table, rowModel);
    }, getMemoOptions(table.options, 'debugTable', 'getSelectedRowModel'));
    table.getFilteredSelectedRowModel = memo(() => [table.getState().rowSelection, table.getFilteredRowModel()], (rowSelection, rowModel) => {
      if (!Object.keys(rowSelection).length) {
        return {
          rows: [],
          flatRows: [],
          rowsById: {}
        };
      }
      return selectRowsFn(table, rowModel);
    }, getMemoOptions(table.options, 'debugTable', 'getFilteredSelectedRowModel'));
    table.getGroupedSelectedRowModel = memo(() => [table.getState().rowSelection, table.getSortedRowModel()], (rowSelection, rowModel) => {
      if (!Object.keys(rowSelection).length) {
        return {
          rows: [],
          flatRows: [],
          rowsById: {}
        };
      }
      return selectRowsFn(table, rowModel);
    }, getMemoOptions(table.options, 'debugTable', 'getGroupedSelectedRowModel'));

    ///

    // getGroupingRowCanSelect: rowId => {
    //   const row = table.getRow(rowId)

    //   if (!row) {
    //     throw new Error()
    //   }

    //   if (typeof table.options.enableGroupingRowSelection === 'function') {
    //     return table.options.enableGroupingRowSelection(row)
    //   }

    //   return table.options.enableGroupingRowSelection ?? false
    // },

    table.getIsAllRowsSelected = () => {
      const preGroupedFlatRows = table.getFilteredRowModel().flatRows;
      const {
        rowSelection
      } = table.getState();
      let isAllRowsSelected = Boolean(preGroupedFlatRows.length && Object.keys(rowSelection).length);
      if (isAllRowsSelected) {
        if (preGroupedFlatRows.some(row => row.getCanSelect() && !rowSelection[row.id])) {
          isAllRowsSelected = false;
        }
      }
      return isAllRowsSelected;
    };
    table.getIsAllPageRowsSelected = () => {
      const paginationFlatRows = table.getPaginationRowModel().flatRows.filter(row => row.getCanSelect());
      const {
        rowSelection
      } = table.getState();
      let isAllPageRowsSelected = !!paginationFlatRows.length;
      if (isAllPageRowsSelected && paginationFlatRows.some(row => !rowSelection[row.id])) {
        isAllPageRowsSelected = false;
      }
      return isAllPageRowsSelected;
    };
    table.getIsSomeRowsSelected = () => {
      var _table$getState$rowSe;
      const totalSelected = Object.keys((_table$getState$rowSe = table.getState().rowSelection) != null ? _table$getState$rowSe : {}).length;
      return totalSelected > 0 && totalSelected < table.getFilteredRowModel().flatRows.length;
    };
    table.getIsSomePageRowsSelected = () => {
      const paginationFlatRows = table.getPaginationRowModel().flatRows;
      return table.getIsAllPageRowsSelected() ? false : paginationFlatRows.filter(row => row.getCanSelect()).some(d => d.getIsSelected() || d.getIsSomeSelected());
    };
    table.getToggleAllRowsSelectedHandler = () => {
      return e => {
        table.toggleAllRowsSelected(e.target.checked);
      };
    };
    table.getToggleAllPageRowsSelectedHandler = () => {
      return e => {
        table.toggleAllPageRowsSelected(e.target.checked);
      };
    };
  },
  createRow: (row, table) => {
    row.toggleSelected = (value, opts) => {
      const isSelected = row.getIsSelected();
      table.setRowSelection(old => {
        var _opts$selectChildren;
        value = typeof value !== 'undefined' ? value : !isSelected;
        if (row.getCanSelect() && isSelected === value) {
          return old;
        }
        const selectedRowIds = {
          ...old
        };
        mutateRowIsSelected(selectedRowIds, row.id, value, (_opts$selectChildren = opts == null ? void 0 : opts.selectChildren) != null ? _opts$selectChildren : true, table);
        return selectedRowIds;
      });
    };
    row.getIsSelected = () => {
      const {
        rowSelection
      } = table.getState();
      return isRowSelected(row, rowSelection);
    };
    row.getIsSomeSelected = () => {
      const {
        rowSelection
      } = table.getState();
      return isSubRowSelected(row, rowSelection) === 'some';
    };
    row.getIsAllSubRowsSelected = () => {
      const {
        rowSelection
      } = table.getState();
      return isSubRowSelected(row, rowSelection) === 'all';
    };
    row.getCanSelect = () => {
      var _table$options$enable;
      if (typeof table.options.enableRowSelection === 'function') {
        return table.options.enableRowSelection(row);
      }
      return (_table$options$enable = table.options.enableRowSelection) != null ? _table$options$enable : true;
    };
    row.getCanSelectSubRows = () => {
      var _table$options$enable2;
      if (typeof table.options.enableSubRowSelection === 'function') {
        return table.options.enableSubRowSelection(row);
      }
      return (_table$options$enable2 = table.options.enableSubRowSelection) != null ? _table$options$enable2 : true;
    };
    row.getCanMultiSelect = () => {
      var _table$options$enable3;
      if (typeof table.options.enableMultiRowSelection === 'function') {
        return table.options.enableMultiRowSelection(row);
      }
      return (_table$options$enable3 = table.options.enableMultiRowSelection) != null ? _table$options$enable3 : true;
    };
    row.getToggleSelectedHandler = () => {
      const canSelect = row.getCanSelect();
      return e => {
        var _target;
        if (!canSelect) return;
        row.toggleSelected((_target = e.target) == null ? void 0 : _target.checked);
      };
    };
  }
};
const mutateRowIsSelected = (selectedRowIds, id, value, includeChildren, table) => {
  var _row$subRows;
  const row = table.getRow(id, true);

  // const isGrouped = row.getIsGrouped()

  // if ( // TODO: enforce grouping row selection rules
  //   !isGrouped ||
  //   (isGrouped && table.options.enableGroupingRowSelection)
  // ) {
  if (value) {
    if (!row.getCanMultiSelect()) {
      Object.keys(selectedRowIds).forEach(key => delete selectedRowIds[key]);
    }
    if (row.getCanSelect()) {
      selectedRowIds[id] = true;
    }
  } else {
    delete selectedRowIds[id];
  }
  // }

  if (includeChildren && (_row$subRows = row.subRows) != null && _row$subRows.length && row.getCanSelectSubRows()) {
    row.subRows.forEach(row => mutateRowIsSelected(selectedRowIds, row.id, value, includeChildren, table));
  }
};
function selectRowsFn(table, rowModel) {
  const rowSelection = table.getState().rowSelection;
  const newSelectedFlatRows = [];
  const newSelectedRowsById = {};

  // Filters top level and nested rows
  const recurseRows = function (rows, depth) {
    return rows.map(row => {
      var _row$subRows2;
      const isSelected = isRowSelected(row, rowSelection);
      if (isSelected) {
        newSelectedFlatRows.push(row);
        newSelectedRowsById[row.id] = row;
      }
      if ((_row$subRows2 = row.subRows) != null && _row$subRows2.length) {
        row = {
          ...row,
          subRows: recurseRows(row.subRows)
        };
      }
      if (isSelected) {
        return row;
      }
    }).filter(Boolean);
  };
  return {
    rows: recurseRows(rowModel.rows),
    flatRows: newSelectedFlatRows,
    rowsById: newSelectedRowsById
  };
}
function isRowSelected(row, selection) {
  var _selection$row$id;
  return (_selection$row$id = selection[row.id]) != null ? _selection$row$id : false;
}
function isSubRowSelected(row, selection, table) {
  var _row$subRows3;
  if (!((_row$subRows3 = row.subRows) != null && _row$subRows3.length)) return false;
  let allChildrenSelected = true;
  let someSelected = false;
  row.subRows.forEach(subRow => {
    // Bail out early if we know both of these
    if (someSelected && !allChildrenSelected) {
      return;
    }
    if (subRow.getCanSelect()) {
      if (isRowSelected(subRow, selection)) {
        someSelected = true;
      } else {
        allChildrenSelected = false;
      }
    }

    // Check row selection of nested subrows
    if (subRow.subRows && subRow.subRows.length) {
      const subRowChildrenSelected = isSubRowSelected(subRow, selection);
      if (subRowChildrenSelected === 'all') {
        someSelected = true;
      } else if (subRowChildrenSelected === 'some') {
        someSelected = true;
        allChildrenSelected = false;
      } else {
        allChildrenSelected = false;
      }
    }
  });
  return allChildrenSelected ? 'all' : someSelected ? 'some' : false;
}

const reSplitAlphaNumeric = /([0-9]+)/gm;
const alphanumeric = (rowA, rowB, columnId) => {
  return compareAlphanumeric(toString(rowA.getValue(columnId)).toLowerCase(), toString(rowB.getValue(columnId)).toLowerCase());
};
const alphanumericCaseSensitive = (rowA, rowB, columnId) => {
  return compareAlphanumeric(toString(rowA.getValue(columnId)), toString(rowB.getValue(columnId)));
};

// The text filter is more basic (less numeric support)
// but is much faster
const text = (rowA, rowB, columnId) => {
  return compareBasic(toString(rowA.getValue(columnId)).toLowerCase(), toString(rowB.getValue(columnId)).toLowerCase());
};

// The text filter is more basic (less numeric support)
// but is much faster
const textCaseSensitive = (rowA, rowB, columnId) => {
  return compareBasic(toString(rowA.getValue(columnId)), toString(rowB.getValue(columnId)));
};
const datetime = (rowA, rowB, columnId) => {
  const a = rowA.getValue(columnId);
  const b = rowB.getValue(columnId);

  // Can handle nullish values
  // Use > and < because == (and ===) doesn't work with
  // Date objects (would require calling getTime()).
  return a > b ? 1 : a < b ? -1 : 0;
};
const basic = (rowA, rowB, columnId) => {
  return compareBasic(rowA.getValue(columnId), rowB.getValue(columnId));
};

// Utils

function compareBasic(a, b) {
  return a === b ? 0 : a > b ? 1 : -1;
}
function toString(a) {
  if (typeof a === 'number') {
    if (isNaN(a) || a === Infinity || a === -Infinity) {
      return '';
    }
    return String(a);
  }
  if (typeof a === 'string') {
    return a;
  }
  return '';
}

// Mixed sorting is slow, but very inclusive of many edge cases.
// It handles numbers, mixed alphanumeric combinations, and even
// null, undefined, and Infinity
function compareAlphanumeric(aStr, bStr) {
  // Split on number groups, but keep the delimiter
  // Then remove falsey split values
  const a = aStr.split(reSplitAlphaNumeric).filter(Boolean);
  const b = bStr.split(reSplitAlphaNumeric).filter(Boolean);

  // While
  while (a.length && b.length) {
    const aa = a.shift();
    const bb = b.shift();
    const an = parseInt(aa, 10);
    const bn = parseInt(bb, 10);
    const combo = [an, bn].sort();

    // Both are string
    if (isNaN(combo[0])) {
      if (aa > bb) {
        return 1;
      }
      if (bb > aa) {
        return -1;
      }
      continue;
    }

    // One is a string, one is a number
    if (isNaN(combo[1])) {
      return isNaN(an) ? -1 : 1;
    }

    // Both are numbers
    if (an > bn) {
      return 1;
    }
    if (bn > an) {
      return -1;
    }
  }
  return a.length - b.length;
}

// Exports

const sortingFns = {
  alphanumeric,
  alphanumericCaseSensitive,
  text,
  textCaseSensitive,
  datetime,
  basic
};

//

const RowSorting = {
  getInitialState: state => {
    return {
      sorting: [],
      ...state
    };
  },
  getDefaultColumnDef: () => {
    return {
      sortingFn: 'auto',
      sortUndefined: 1
    };
  },
  getDefaultOptions: table => {
    return {
      onSortingChange: makeStateUpdater('sorting', table),
      isMultiSortEvent: e => {
        return e.shiftKey;
      }
    };
  },
  createColumn: (column, table) => {
    column.getAutoSortingFn = () => {
      const firstRows = table.getFilteredRowModel().flatRows.slice(10);
      let isString = false;
      for (const row of firstRows) {
        const value = row == null ? void 0 : row.getValue(column.id);
        if (Object.prototype.toString.call(value) === '[object Date]') {
          return sortingFns.datetime;
        }
        if (typeof value === 'string') {
          isString = true;
          if (value.split(reSplitAlphaNumeric).length > 1) {
            return sortingFns.alphanumeric;
          }
        }
      }
      if (isString) {
        return sortingFns.text;
      }
      return sortingFns.basic;
    };
    column.getAutoSortDir = () => {
      const firstRow = table.getFilteredRowModel().flatRows[0];
      const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
      if (typeof value === 'string') {
        return 'asc';
      }
      return 'desc';
    };
    column.getSortingFn = () => {
      var _table$options$sortin, _table$options$sortin2;
      if (!column) {
        throw new Error();
      }
      return isFunction(column.columnDef.sortingFn) ? column.columnDef.sortingFn : column.columnDef.sortingFn === 'auto' ? column.getAutoSortingFn() : (_table$options$sortin = (_table$options$sortin2 = table.options.sortingFns) == null ? void 0 : _table$options$sortin2[column.columnDef.sortingFn]) != null ? _table$options$sortin : sortingFns[column.columnDef.sortingFn];
    };
    column.toggleSorting = (desc, multi) => {
      // if (column.columns.length) {
      //   column.columns.forEach((c, i) => {
      //     if (c.id) {
      //       table.toggleColumnSorting(c.id, undefined, multi || !!i)
      //     }
      //   })
      //   return
      // }

      // this needs to be outside of table.setSorting to be in sync with rerender
      const nextSortingOrder = column.getNextSortingOrder();
      const hasManualValue = typeof desc !== 'undefined' && desc !== null;
      table.setSorting(old => {
        // Find any existing sorting for this column
        const existingSorting = old == null ? void 0 : old.find(d => d.id === column.id);
        const existingIndex = old == null ? void 0 : old.findIndex(d => d.id === column.id);
        let newSorting = [];

        // What should we do with this sort action?
        let sortAction;
        let nextDesc = hasManualValue ? desc : nextSortingOrder === 'desc';

        // Multi-mode
        if (old != null && old.length && column.getCanMultiSort() && multi) {
          if (existingSorting) {
            sortAction = 'toggle';
          } else {
            sortAction = 'add';
          }
        } else {
          // Normal mode
          if (old != null && old.length && existingIndex !== old.length - 1) {
            sortAction = 'replace';
          } else if (existingSorting) {
            sortAction = 'toggle';
          } else {
            sortAction = 'replace';
          }
        }

        // Handle toggle states that will remove the sorting
        if (sortAction === 'toggle') {
          // If we are "actually" toggling (not a manual set value), should we remove the sorting?
          if (!hasManualValue) {
            // Is our intention to remove?
            if (!nextSortingOrder) {
              sortAction = 'remove';
            }
          }
        }
        if (sortAction === 'add') {
          var _table$options$maxMul;
          newSorting = [...old, {
            id: column.id,
            desc: nextDesc
          }];
          // Take latest n columns
          newSorting.splice(0, newSorting.length - ((_table$options$maxMul = table.options.maxMultiSortColCount) != null ? _table$options$maxMul : Number.MAX_SAFE_INTEGER));
        } else if (sortAction === 'toggle') {
          // This flips (or sets) the
          newSorting = old.map(d => {
            if (d.id === column.id) {
              return {
                ...d,
                desc: nextDesc
              };
            }
            return d;
          });
        } else if (sortAction === 'remove') {
          newSorting = old.filter(d => d.id !== column.id);
        } else {
          newSorting = [{
            id: column.id,
            desc: nextDesc
          }];
        }
        return newSorting;
      });
    };
    column.getFirstSortDir = () => {
      var _ref, _column$columnDef$sor;
      const sortDescFirst = (_ref = (_column$columnDef$sor = column.columnDef.sortDescFirst) != null ? _column$columnDef$sor : table.options.sortDescFirst) != null ? _ref : column.getAutoSortDir() === 'desc';
      return sortDescFirst ? 'desc' : 'asc';
    };
    column.getNextSortingOrder = multi => {
      var _table$options$enable, _table$options$enable2;
      const firstSortDirection = column.getFirstSortDir();
      const isSorted = column.getIsSorted();
      if (!isSorted) {
        return firstSortDirection;
      }
      if (isSorted !== firstSortDirection && ((_table$options$enable = table.options.enableSortingRemoval) != null ? _table$options$enable : true) && (
      // If enableSortRemove, enable in general
      multi ? (_table$options$enable2 = table.options.enableMultiRemove) != null ? _table$options$enable2 : true : true) // If multi, don't allow if enableMultiRemove))
      ) {
        return false;
      }
      return isSorted === 'desc' ? 'asc' : 'desc';
    };
    column.getCanSort = () => {
      var _column$columnDef$ena, _table$options$enable3;
      return ((_column$columnDef$ena = column.columnDef.enableSorting) != null ? _column$columnDef$ena : true) && ((_table$options$enable3 = table.options.enableSorting) != null ? _table$options$enable3 : true) && !!column.accessorFn;
    };
    column.getCanMultiSort = () => {
      var _ref2, _column$columnDef$ena2;
      return (_ref2 = (_column$columnDef$ena2 = column.columnDef.enableMultiSort) != null ? _column$columnDef$ena2 : table.options.enableMultiSort) != null ? _ref2 : !!column.accessorFn;
    };
    column.getIsSorted = () => {
      var _table$getState$sorti;
      const columnSort = (_table$getState$sorti = table.getState().sorting) == null ? void 0 : _table$getState$sorti.find(d => d.id === column.id);
      return !columnSort ? false : columnSort.desc ? 'desc' : 'asc';
    };
    column.getSortIndex = () => {
      var _table$getState$sorti2, _table$getState$sorti3;
      return (_table$getState$sorti2 = (_table$getState$sorti3 = table.getState().sorting) == null ? void 0 : _table$getState$sorti3.findIndex(d => d.id === column.id)) != null ? _table$getState$sorti2 : -1;
    };
    column.clearSorting = () => {
      //clear sorting for just 1 column
      table.setSorting(old => old != null && old.length ? old.filter(d => d.id !== column.id) : []);
    };
    column.getToggleSortingHandler = () => {
      const canSort = column.getCanSort();
      return e => {
        if (!canSort) return;
        e.persist == null || e.persist();
        column.toggleSorting == null || column.toggleSorting(undefined, column.getCanMultiSort() ? table.options.isMultiSortEvent == null ? void 0 : table.options.isMultiSortEvent(e) : false);
      };
    };
  },
  createTable: table => {
    table.setSorting = updater => table.options.onSortingChange == null ? void 0 : table.options.onSortingChange(updater);
    table.resetSorting = defaultState => {
      var _table$initialState$s, _table$initialState;
      table.setSorting(defaultState ? [] : (_table$initialState$s = (_table$initialState = table.initialState) == null ? void 0 : _table$initialState.sorting) != null ? _table$initialState$s : []);
    };
    table.getPreSortedRowModel = () => table.getGroupedRowModel();
    table.getSortedRowModel = () => {
      if (!table._getSortedRowModel && table.options.getSortedRowModel) {
        table._getSortedRowModel = table.options.getSortedRowModel(table);
      }
      if (table.options.manualSorting || !table._getSortedRowModel) {
        return table.getPreSortedRowModel();
      }
      return table._getSortedRowModel();
    };
  }
};

const builtInFeatures = [Headers, ColumnVisibility, ColumnOrdering, ColumnPinning, ColumnFaceting, ColumnFiltering, GlobalFaceting,
//depends on ColumnFaceting
GlobalFiltering,
//depends on ColumnFiltering
RowSorting, ColumnGrouping,
//depends on RowSorting
RowExpanding, RowPagination, RowPinning, RowSelection, ColumnSizing];

//

function createTable(options) {
  var _options$_features, _options$initialState;
  if (process.env.NODE_ENV !== 'production' && (options.debugAll || options.debugTable)) {
    console.info('Creating Table Instance...');
  }
  const _features = [...builtInFeatures, ...((_options$_features = options._features) != null ? _options$_features : [])];
  let table = {
    _features
  };
  const defaultOptions = table._features.reduce((obj, feature) => {
    return Object.assign(obj, feature.getDefaultOptions == null ? void 0 : feature.getDefaultOptions(table));
  }, {});
  const mergeOptions = options => {
    if (table.options.mergeOptions) {
      return table.options.mergeOptions(defaultOptions, options);
    }
    return {
      ...defaultOptions,
      ...options
    };
  };
  const coreInitialState = {};
  let initialState = {
    ...coreInitialState,
    ...((_options$initialState = options.initialState) != null ? _options$initialState : {})
  };
  table._features.forEach(feature => {
    var _feature$getInitialSt;
    initialState = (_feature$getInitialSt = feature.getInitialState == null ? void 0 : feature.getInitialState(initialState)) != null ? _feature$getInitialSt : initialState;
  });
  const queued = [];
  let queuedTimeout = false;
  const coreInstance = {
    _features,
    options: {
      ...defaultOptions,
      ...options
    },
    initialState,
    _queue: cb => {
      queued.push(cb);
      if (!queuedTimeout) {
        queuedTimeout = true;

        // Schedule a microtask to run the queued callbacks after
        // the current call stack (render, etc) has finished.
        Promise.resolve().then(() => {
          while (queued.length) {
            queued.shift()();
          }
          queuedTimeout = false;
        }).catch(error => setTimeout(() => {
          throw error;
        }));
      }
    },
    reset: () => {
      table.setState(table.initialState);
    },
    setOptions: updater => {
      const newOptions = functionalUpdate(updater, table.options);
      table.options = mergeOptions(newOptions);
    },
    getState: () => {
      return table.options.state;
    },
    setState: updater => {
      table.options.onStateChange == null || table.options.onStateChange(updater);
    },
    _getRowId: (row, index, parent) => {
      var _table$options$getRow;
      return (_table$options$getRow = table.options.getRowId == null ? void 0 : table.options.getRowId(row, index, parent)) != null ? _table$options$getRow : `${parent ? [parent.id, index].join('.') : index}`;
    },
    getCoreRowModel: () => {
      if (!table._getCoreRowModel) {
        table._getCoreRowModel = table.options.getCoreRowModel(table);
      }
      return table._getCoreRowModel();
    },
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up

    getRowModel: () => {
      return table.getPaginationRowModel();
    },
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (id, searchAll) => {
      let row = (searchAll ? table.getPrePaginationRowModel() : table.getRowModel()).rowsById[id];
      if (!row) {
        row = table.getCoreRowModel().rowsById[id];
        if (!row) {
          if (process.env.NODE_ENV !== 'production') {
            throw new Error(`getRow could not find row with ID: ${id}`);
          }
          throw new Error();
        }
      }
      return row;
    },
    _getDefaultColumnDef: memo(() => [table.options.defaultColumn], defaultColumn => {
      var _defaultColumn;
      defaultColumn = (_defaultColumn = defaultColumn) != null ? _defaultColumn : {};
      return {
        header: props => {
          const resolvedColumnDef = props.header.column.columnDef;
          if (resolvedColumnDef.accessorKey) {
            return resolvedColumnDef.accessorKey;
          }
          if (resolvedColumnDef.accessorFn) {
            return resolvedColumnDef.id;
          }
          return null;
        },
        // footer: props => props.header.column.id,
        cell: props => {
          var _props$renderValue$to, _props$renderValue;
          return (_props$renderValue$to = (_props$renderValue = props.renderValue()) == null || _props$renderValue.toString == null ? void 0 : _props$renderValue.toString()) != null ? _props$renderValue$to : null;
        },
        ...table._features.reduce((obj, feature) => {
          return Object.assign(obj, feature.getDefaultColumnDef == null ? void 0 : feature.getDefaultColumnDef());
        }, {}),
        ...defaultColumn
      };
    }, getMemoOptions(options, 'debugColumns', '_getDefaultColumnDef')),
    _getColumnDefs: () => table.options.columns,
    getAllColumns: memo(() => [table._getColumnDefs()], columnDefs => {
      const recurseColumns = function (columnDefs, parent, depth) {
        if (depth === void 0) {
          depth = 0;
        }
        return columnDefs.map(columnDef => {
          const column = createColumn(table, columnDef, depth, parent);
          const groupingColumnDef = columnDef;
          column.columns = groupingColumnDef.columns ? recurseColumns(groupingColumnDef.columns, column, depth + 1) : [];
          return column;
        });
      };
      return recurseColumns(columnDefs);
    }, getMemoOptions(options, 'debugColumns', 'getAllColumns')),
    getAllFlatColumns: memo(() => [table.getAllColumns()], allColumns => {
      return allColumns.flatMap(column => {
        return column.getFlatColumns();
      });
    }, getMemoOptions(options, 'debugColumns', 'getAllFlatColumns')),
    _getAllFlatColumnsById: memo(() => [table.getAllFlatColumns()], flatColumns => {
      return flatColumns.reduce((acc, column) => {
        acc[column.id] = column;
        return acc;
      }, {});
    }, getMemoOptions(options, 'debugColumns', 'getAllFlatColumnsById')),
    getAllLeafColumns: memo(() => [table.getAllColumns(), table._getOrderColumnsFn()], (allColumns, orderColumns) => {
      let leafColumns = allColumns.flatMap(column => column.getLeafColumns());
      return orderColumns(leafColumns);
    }, getMemoOptions(options, 'debugColumns', 'getAllLeafColumns')),
    getColumn: columnId => {
      const column = table._getAllFlatColumnsById()[columnId];
      if (process.env.NODE_ENV !== 'production' && !column) {
        console.error(`[Table] Column with id '${columnId}' does not exist.`);
      }
      return column;
    }
  };
  Object.assign(table, coreInstance);
  for (let index = 0; index < table._features.length; index++) {
    const feature = table._features[index];
    feature == null || feature.createTable == null || feature.createTable(table);
  }
  return table;
}

function getCoreRowModel() {
  return table => memo(() => [table.options.data], data => {
    const rowModel = {
      rows: [],
      flatRows: [],
      rowsById: {}
    };
    const accessRows = function (originalRows, depth, parentRow) {
      if (depth === void 0) {
        depth = 0;
      }
      const rows = [];
      for (let i = 0; i < originalRows.length; i++) {
        // This could be an expensive check at scale, so we should move it somewhere else, but where?
        // if (!id) {
        //   if (process.env.NODE_ENV !== 'production') {
        //     throw new Error(`getRowId expected an ID, but got ${id}`)
        //   }
        // }

        // Make the row
        const row = createRow(table, table._getRowId(originalRows[i], i, parentRow), originalRows[i], i, depth, undefined, parentRow == null ? void 0 : parentRow.id);

        // Keep track of every row in a flat array
        rowModel.flatRows.push(row);
        // Also keep track of every row by its ID
        rowModel.rowsById[row.id] = row;
        // Push table row into parent
        rows.push(row);

        // Get the original subrows
        if (table.options.getSubRows) {
          var _row$originalSubRows;
          row.originalSubRows = table.options.getSubRows(originalRows[i], i);

          // Then recursively access them
          if ((_row$originalSubRows = row.originalSubRows) != null && _row$originalSubRows.length) {
            row.subRows = accessRows(row.originalSubRows, depth + 1, row);
          }
        }
      }
      return rows;
    };
    rowModel.rows = accessRows(data);
    return rowModel;
  }, getMemoOptions(table.options, 'debugTable', 'getRowModel', () => table._autoResetPageIndex()));
}

/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */

//

/**
 * If rendering headers, cells, or footers with custom markup, use flexRender instead of `cell.getValue()` or `cell.renderValue()`.
 */
function flexRender(Comp, props) {
  return !Comp ? null : isReactComponent(Comp) ? /*#__PURE__*/React.createElement(Comp, props) : Comp;
}
function isReactComponent(component) {
  return isClassComponent(component) || typeof component === 'function' || isExoticComponent(component);
}
function isClassComponent(component) {
  return typeof component === 'function' && (() => {
    const proto = Object.getPrototypeOf(component);
    return proto.prototype && proto.prototype.isReactComponent;
  })();
}
function isExoticComponent(component) {
  return typeof component === 'object' && typeof component.$$typeof === 'symbol' && ['react.memo', 'react.forward_ref'].includes(component.$$typeof.description);
}
function useReactTable(options) {
  // Compose in the generic options to the user options
  const resolvedOptions = {
    state: {},
    // Dummy state
    onStateChange: () => {},
    // noop
    renderFallbackValue: null,
    ...options
  };

  // Create a new table and store it in state
  const [tableRef] = React.useState(() => ({
    current: createTable(resolvedOptions)
  }));

  // By default, manage table state here using the table's initial state
  const [state, setState] = React.useState(() => tableRef.current.initialState);

  // Compose the default state above with any user state. This will allow the user
  // to only control a subset of the state if desired.
  tableRef.current.setOptions(prev => ({
    ...prev,
    ...options,
    state: {
      ...state,
      ...options.state
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: updater => {
      setState(updater);
      options.onStateChange == null || options.onStateChange(updater);
    }
  }));
  return tableRef.current;
}

const Table = ({ columns, data, summaryText, subText }) => {
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });
    return (jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm", children: [(summaryText || subText) && (jsxRuntimeExports.jsxs("div", { className: "p-4 font-bold text-md bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 font-medium", children: [summaryText && jsxRuntimeExports.jsx("p", { children: summaryText }), subText && jsxRuntimeExports.jsx("p", { children: subText })] })), jsxRuntimeExports.jsxs("table", { className: `min-w-full border-collapse ${summaryText || subText ? '' : 'border-t border-gray-200 dark:border-gray-700'}`, children: [jsxRuntimeExports.jsx("thead", { className: "bg-gray-500 dark:bg-gray-900 text-black dark:text-white text-sm text-left", children: table.getHeaderGroups().map((headerGroup) => (jsxRuntimeExports.jsx("tr", { children: headerGroup.headers.map((header) => (jsxRuntimeExports.jsx("th", { className: "px-4 py-2 border-b border-gray-700 text-white", children: flexRender(header.column.columnDef.header, header.getContext()) }, header.id))) }, headerGroup.id))) }), jsxRuntimeExports.jsx("tbody", { children: table.getRowModel().rows.map((row) => (jsxRuntimeExports.jsx("tr", { className: "bg-gray-50 text-black dark:text-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 transition", children: row.getVisibleCells().map((cell) => (jsxRuntimeExports.jsx("td", { className: "px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-black dark:text-white text-md", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))) }, row.id))) })] })] }));
};

const TabsComponent = ({ tabs }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (jsxRuntimeExports.jsx("div", { className: "w-full", children: jsxRuntimeExports.jsxs(Tab.Group, { selectedIndex: selectedIndex, onChange: setSelectedIndex, children: [jsxRuntimeExports.jsxs("div", { className: "relative", children: [jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-full border-b-2 border-gray-300 dark:border-gray-700" }), jsxRuntimeExports.jsx(Tab.List, { className: "flex relative z-10", children: tabs.map((tab, index) => (jsxRuntimeExports.jsx(Tab, { className: ({ selected }) => `px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none relative
                  ${selected
                                    ? "text-teal-500"
                                    : "text-gray-700 dark:text-gray-400 hover:text-teal-400"}`, children: ({ selected }) => (jsxRuntimeExports.jsxs("div", { className: "relative", children: [tab.label, selected && (jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 bottom-[-2px] border-b-4 border-teal-400" }))] })) }, index))) })] }), jsxRuntimeExports.jsx(Tab.Panels, { children: tabs.map((tab, index) => (jsxRuntimeExports.jsx(Tab.Panel, { className: "pt-4", children: tab.content }, index))) })] }) }));
};

const Title = ({ text }) => {
    return (jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl text-white dark:text-gray-100 font-bold", children: text }));
};

const TokenList = ({ title, icon, legend, tokens, maxItems = 10, showMoreUrl, showPrice = true, }) => {
    const [showAll, setShowAll] = useState(false);
    const displayedTokens = showAll ? tokens : tokens.slice(0, maxItems);
    return (jsxRuntimeExports.jsxs("div", { className: "bg-white min-h-80 dark:bg-gray-900 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700 max-w-md", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b pb-2", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [icon && jsxRuntimeExports.jsx("span", { className: "text-gray-500 dark:text-gray-300", children: icon }), jsxRuntimeExports.jsx("h3", { className: "ml-2 text-lg font-semibold text-gray-900 dark:text-white", children: title })] }), legend && (jsxRuntimeExports.jsx("span", { className: "ml-auto text-sm text-gray-600 dark:text-gray-400", children: legend }))] }), jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-3", children: displayedTokens.map((token, index) => {
                    const [imageError, setImageError] = useState(false);
                    const tokenLink = token.tokenLink || "#"; // Default to #
                    return (jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400 w-6", children: index + 1 }), jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center ml-4", children: token.image && !imageError ? (jsxRuntimeExports.jsx("img", { src: token.image, alt: token.tick, className: "w-full h-full object-cover", onError: () => setImageError(true) })) : (jsxRuntimeExports.jsx(ForwardRef$6, { className: "w-6 h-6 text-gray-400" })) }), jsxRuntimeExports.jsxs("div", { className: "flex-1 ml-3", children: [jsxRuntimeExports.jsx("a", { href: tokenLink, className: "text-gray-900 dark:text-white font-medium hover:text-teal-500", children: token.tick }), showPrice && (jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: token.price || "$0.000000" }))] }), token.change !== undefined && (jsxRuntimeExports.jsx("span", { className: `px-2 py-1 text-xs rounded-full ${token.change >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: token.change >= 0 ? `${token.change}` : `${token.change}` })), token.pillLabel && jsxRuntimeExports.jsx(Pill, { label: token.pillLabel, color: token.pillStyle || "primary" })] }, index));
                }) })] }));
};

const Widget = ({ value, icon, onClick, legend }) => {
    const handleClick = (event) => {
        if (onClick) {
            event.stopPropagation(); // Prevent unwanted bubbling
            onClick();
        }
    };
    return (jsxRuntimeExports.jsx("div", { className: `flex min-h-36 items-center flex-col col-span-full sm:col-span-4 xl:col-span-2 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700/60 transition-colors duration-300 ease-in-out ${onClick ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900' : ''}`, onClick: onClick ? handleClick : undefined, children: jsxRuntimeExports.jsxs("div", { className: "px-5 pt-5 pb-4", children: [jsxRuntimeExports.jsx("header", { className: "flex justify-center items-center mb-2", children: jsxRuntimeExports.jsx("div", { className: "text-teal-400", children: icon }) }), jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center", children: jsxRuntimeExports.jsx("div", { className: "text-lg center text-gray-500 dark:text-gray-100", children: value }) }), legend && (jsxRuntimeExports.jsx("div", { className: "text-md text-teal-500 mt-2", children: legend }))] }) }));
};

export { AffiliateComponent as Affiliates, Avatar, Card, Fav, Grid, Header, MenuComponent as Menu, Pill, ProgressBar, SearchComponent as Search, Table, TabsComponent as Tabs, Title, TokenList, Widget };
//# sourceMappingURL=index.js.map
