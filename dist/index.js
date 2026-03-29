"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  babel: () => babel,
  default: () => src_default,
  esbuild: () => esbuild,
  next: () => next,
  rollup: () => rollup,
  rspack: () => rspack,
  vite: () => vite,
  webpack: () => webpack
});
module.exports = __toCommonJS(src_exports);

// src/plugin.ts
var import_core = require("@babel/core");
var import_plugin_syntax_jsx = __toESM(require("@babel/plugin-syntax-jsx"));
var import_plugin_syntax_typescript = __toESM(require("@babel/plugin-syntax-typescript"));
var import_helper_plugin_utils = require("@babel/helper-plugin-utils");
var import_unplugin = require("unplugin");

// src/pattycake.ts
var b3 = __toESM(require("@babel/types"));

// src/hir.ts
var b = __toESM(require("@babel/types"));
function callExpressionsFlat(ht, callExpr) {
  const depth = hirHasPatternMatchRoot(ht, callExpr);
  if (depth === 0)
    return void 0;
  const buf = Array(depth).fill(
    void 0
  );
  hirPatternMatchTopDownCallExprs(
    ht,
    callExpr,
    buf,
    depth - 1
  );
  return buf;
}
function hirFromCallExpr(ht, callExpr) {
  const buf = callExpressionsFlat(ht, callExpr);
  if (buf === void 0)
    return void 0;
  return hirFromCallExprImpl(ht, buf);
}
function hirFromCallExprImpl(ht, callExprs) {
  const expr = callExprs[0].arguments[0];
  if (!b.isExpression(expr))
    return void 0;
  let exhaustive = false;
  let otherwise = void 0;
  const branches = [];
  for (let i = 1; i < callExprs.length; i++) {
    const callExpr = callExprs[i];
    const callee = callExpr.callee;
    if (!b.isMemberExpression(callee)) {
      throw new Error("unreachable");
    }
    const property = callee.property;
    if (!b.isIdentifier(property)) {
      throw new Error("unreachable");
    }
    switch (property.name) {
      case "with": {
        const branch = transformToPatternMatchBranch(ht, callExpr.arguments);
        branches.push(branch);
        break;
      }
      case "otherwise": {
        const arg = callExpr.arguments[0];
        if (b.isExpression(arg)) {
          otherwise = arg;
        } else if (b.isSpreadElement(arg)) {
          throw new Error("spread elements not handled yet");
        } else {
          throw new Error(`unhandled ${arg.type}`);
        }
        break;
      }
      case "exhaustive": {
        exhaustive = true;
        break;
      }
      case "run": {
        exhaustive = true;
        break;
      }
      default: {
        throw new Error(`Unhandled ts-pattern API function: ${property.name}`);
      }
    }
  }
  return {
    expr,
    branches,
    exhaustive,
    otherwise
  };
}
function isFunction(expr) {
  return b.isArrowFunctionExpression(expr) || b.isFunctionExpression(expr);
}
function hirPatternMatchTopDownCallExprs(ht, expr, buf, i) {
  if (!b.isExpression(expr.callee))
    return;
  if (b.isIdentifier(expr.callee) && expr.callee.name == ht.matchIdentifier) {
    buf[0] = expr;
    return;
  }
  if (b.isMemberExpression(expr.callee)) {
    if (b.isCallExpression(expr.callee.object)) {
      buf[i] = expr;
      return hirPatternMatchTopDownCallExprs(
        ht,
        expr.callee.object,
        buf,
        i - 1
      );
    }
  }
  return;
}
function hirHasPatternMatchRoot(ht, expr) {
  return hirHasPatternMatchRootImpl(ht, expr, 1);
}
function hirHasPatternMatchRootImpl(ht, expr, depth) {
  if (!b.isExpression(expr.callee))
    return 0;
  if (b.isIdentifier(expr.callee) && expr.callee.name == ht.matchIdentifier)
    return depth;
  if (b.isMemberExpression(expr.callee)) {
    if (b.isCallExpression(expr.callee.object))
      return hirHasPatternMatchRootImpl(ht, expr.callee.object, depth + 1);
  }
  return 0;
}
function transformToPatternMatchBranch(ht, args) {
  if (args.length < 2) {
    throw new Error(`Invalid amount of args: ${args.length}`);
  }
  if (args.length === 3) {
    if (isFunction(args[1])) {
      const then2 = args[2];
      if (!b.isExpression(then2))
        throw new Error(`unsupported: ${then2.type}}`);
      if (!b.isExpression(args[0]))
        throw new Error(`unsupported: ${args[0].type}`);
      return {
        patterns: [transformExprToPattern(ht, args[0])],
        guard: args[1],
        then: then2
      };
    }
  }
  const then = args[args.length - 1];
  if (!b.isExpression(then))
    throw new Error(`unsupported: ${then.type}}`);
  return {
    patterns: args.slice(0, args.length - 1).map((arg) => {
      if (!b.isExpression(arg))
        throw new Error("unimplemented");
      return transformExprToPattern(ht, arg);
    }),
    guard: void 0,
    then
  };
}
function transformExprToPattern(ht, expr) {
  if (b.isObjectExpression(expr))
    return transformToPatternObjExpr(ht, expr);
  if (b.isStringLiteral(expr))
    return { type: "literal", value: { type: "string", value: expr.value } };
  if (b.isNumericLiteral(expr))
    return { type: "literal", value: { type: "number", value: expr.value } };
  if (b.isBooleanLiteral(expr))
    return { type: "literal", value: { type: "boolean", value: expr.value } };
  if (b.isBigIntLiteral(expr))
    return { type: "literal", value: { type: "bigint", value: expr.value } };
  if (b.isArrayExpression(expr)) {
    return {
      type: "array",
      value: expr.elements.map((el) => {
        if (!b.isExpression(el))
          throw new Error(`unimplemented type: ${el?.type || "null"}`);
        return transformExprToPattern(ht, el);
      })
    };
  }
  if (b.isMemberExpression(expr) && b.isIdentifier(expr.object) && expr.object.name === ht.patternIdentifier && b.isIdentifier(expr.property)) {
    return transformToSimpleTsPattern(ht, expr.property);
  }
  if (b.isCallExpression(expr) && b.isMemberExpression(expr.callee) && b.isIdentifier(expr.callee.object) && expr.callee.object.name == ht.patternIdentifier && b.isIdentifier(expr.callee.property)) {
    return transformToComplexTsPattern(
      ht,
      expr.callee.property,
      expr.arguments
    );
  }
  if (b.isTSAsExpression(expr)) {
    return transformExprToPattern(ht, expr.expression);
  }
  if (b.isCallExpression(expr) && b.isMemberExpression(expr.callee) && b.isMemberExpression(expr.callee.object) && b.isIdentifier(expr.callee.object.object) && expr.callee.object.object.name === ht.patternIdentifier && b.isIdentifier(expr.callee.object.property) && b.isIdentifier(expr.callee.property)) {
    const typeName = expr.callee.object.property.name;
    const methodName = expr.callee.property.name;
    const args = expr.arguments;
    return {
      type: "refinedType",
      typeName,
      methodName,
      args: args.filter((a) => b.isExpression(a))
    };
  }
  if (b.isIdentifier(expr) || b.isMemberExpression(expr)) {
    return { type: "expression", value: expr };
  }
  throw new Error(`unsupported pattern expression: ${expr.type}`);
}
function transformToComplexTsPattern(ht, functionName, args) {
  switch (functionName.name) {
    case "select": {
      const selection = transformToSelectPattern(ht, args);
      return {
        type: "select",
        value: selection
      };
    }
    case "union": {
      const patterns = args.map((arg) => {
        if (!b.isExpression(arg))
          throw new Error("Only expressions are supported for `P.union()`");
        return transformExprToPattern(ht, arg);
      });
      return { type: "union", patterns };
    }
    case "when": {
      const predicate = args[0];
      if (!predicate || !b.isExpression(predicate)) {
        throw new Error("P.when() requires a predicate function argument");
      }
      return { type: "when", predicate };
    }
    case "intersection": {
      const patterns = args.map((arg) => {
        if (!b.isExpression(arg))
          throw new Error(
            "Only expressions are supported for `P.intersection()`"
          );
        return transformExprToPattern(ht, arg);
      });
      return { type: "intersection", patterns };
    }
    case "_array":
    case "set":
    case "map":
    case "not":
    default: {
      throw new Error(
        `unimplemented pattern function: '${ht.patternIdentifier}.${functionName.name}'`
      );
    }
  }
}
function transformToSelectPattern(ht, args) {
  if (args.length === 0)
    return {
      type: "anonymous",
      subpattern: void 0
    };
  if (!b.isExpression(args[0]))
    throw new Error("Only expressions are supported for `P.select()`");
  if (args.length === 1) {
    if (b.isStringLiteral(args[0]))
      return {
        type: "named",
        name: args[0],
        subpattern: void 0
      };
    return {
      type: "anonymous",
      subpattern: transformExprToPattern(ht, args[0])
    };
  }
  if (!b.isExpression(args[1]))
    throw new Error("Only expressions are supported for `P.select()`");
  return {
    type: "named",
    name: args[0],
    subpattern: transformExprToPattern(ht, args[1])
  };
}
function transformToSimpleTsPattern(ht, expr) {
  switch (expr.name) {
    case "string":
      return { type: "string" };
    case "number":
      return { type: "number" };
    case "boolean":
      return { type: "boolean" };
    case "nullish":
      return { type: "nullish" };
    case "bigint":
      return { type: "bigint" };
    case "symbol":
      return { type: "symbol" };
    case "_":
      return { type: "wildcard" };
    default: {
      throw new Error(
        `unrecognized pattern: '${ht.patternIdentifier}.${expr.name}'`
      );
    }
  }
}
function transformToPatternObjExpr(ht, objectExpr) {
  const value = {};
  for (const prop of objectExpr.properties) {
    if (!b.isObjectProperty(prop)) {
      throw new Error(`invalid pattern property type: ${prop.type}`);
    }
    let keyName;
    if (b.isIdentifier(prop.key)) {
      keyName = prop.key.name;
    } else if (b.isStringLiteral(prop.key)) {
      keyName = prop.key.value;
    } else if (b.isNumericLiteral(prop.key)) {
      keyName = String(prop.key.value);
    } else {
      throw new Error(`invalid pattern property key type: ${prop.key.type}`);
    }
    if (!b.isExpression(prop.value)) {
      throw new Error(
        `invalid pattern property value type: ${prop.value.type}`
      );
    }
    value[keyName] = transformExprToPattern(ht, prop.value);
  }
  return {
    type: "object",
    value
  };
}

// src/codegen.ts
var b2 = __toESM(require("@babel/types"));
var import_traverse = __toESM(require("@babel/traverse"));
var traverse = import_traverse.default.default ?? import_traverse.default;
function uniqueIdent(n) {
  return b2.identifier(`__patsy_temp_${n}`);
}
function hirCodegenUniqueIdent(hc) {
  return uniqueIdent(hc.counter++);
}
function hirCodegenInit(path, opts) {
  if (b2.isVariableDeclarator(path.parent)) {
    const outVar = path.parent.id;
    if (!b2.isLVal(outVar))
      throw new Error("unimplemented");
    if (b2.isArrayPattern(path.parent.id)) {
      return {
        ...opts,
        kind: "block",
        outVar: uniqueIdent(0),
        outLabel: uniqueIdent(1),
        counter: 2,
        patternOriginalOutVar: outVar,
        type: "pattern-var-decl",
        branchCtx: {},
        hasAsync: false
      };
    }
    return {
      ...opts,
      kind: "block",
      outVar,
      outLabel: uniqueIdent(0),
      counter: 1,
      patternOriginalOutVar: void 0,
      type: "var-decl",
      branchCtx: {},
      hasAsync: false
    };
  }
  if (b2.isAssignmentExpression(path.parent)) {
    return {
      ...opts,
      kind: "block",
      outVar: path.parent.left,
      outLabel: uniqueIdent(0),
      counter: 1,
      patternOriginalOutVar: void 0,
      type: "assignment",
      branchCtx: {},
      hasAsync: false
    };
  }
  return { ...opts, kind: "iife", counter: 0, branchCtx: {}, hasAsync: false };
}
function hirCodegen(hc, hir) {
  let expr = hir.expr;
  const body = [];
  if (!b2.isIdentifier(hir.expr) && !isInexpensiveExpr(hir.expr)) {
    expr = hirCodegenUniqueIdent(hc);
    body.push(
      b2.variableDeclaration("const", [b2.variableDeclarator(expr, hir.expr)])
    );
  }
  for (const branch of hir.branches) {
    body.push(hirCodegenBranch(hc, expr, branch));
  }
  if (hir.otherwise !== void 0) {
    if (hir.otherwise.type === "ArrowFunctionExpression" || hir.otherwise.type === "FunctionExpression") {
      const fn = hir.otherwise;
      if (fn.async)
        hc.hasAsync = true;
      const block = [];
      if (fn.params.length >= 1) {
        const { lval, init } = paramToBinding(fn.params[0], expr);
        block.push(
          b2.variableDeclaration("let", [
            b2.variableDeclarator(lval, init)
          ])
        );
      }
      if (fn.body.type !== "BlockStatement") {
        block.push(...hirCodegenOutput(hc, fn.body));
      } else {
        hirCodegenRewriteReturns(hc, fn.body);
        block.push(...fn.body.body);
      }
      body.push(...block);
    } else {
      body.push(
        ...hirCodegenOutput(
          hc,
          b2.callExpression(b2.parenthesizedExpression(hir.otherwise), [expr])
        )
      );
    }
  } else {
    const displayedValue = b2.identifier("__patsy__displayedValue");
    const e = b2.identifier("e");
    const jsonStrExpr = b2.callExpression(
      b2.memberExpression(b2.identifier("JSON"), b2.identifier("stringify")),
      [expr]
    );
    const tryCatch = b2.tryStatement(
      b2.blockStatement([
        b2.expressionStatement(
          b2.assignmentExpression("=", displayedValue, jsonStrExpr)
        )
      ]),
      b2.catchClause(
        e,
        b2.blockStatement([
          b2.expressionStatement(
            b2.assignmentExpression("=", displayedValue, expr)
          )
        ])
      )
    );
    const throwError = b2.throwStatement(
      b2.newExpression(b2.identifier("Error"), [
        b2.templateLiteral(
          [
            b2.templateElement({
              raw: "Pattern matching error: no pattern matches value ",
              cooked: "Pattern matching error: no pattern matches value "
            }),
            b2.templateElement({ raw: "", cooked: "" })
          ],
          [displayedValue]
        )
      ])
    );
    const letDisplayedValue = b2.variableDeclaration("let", [
      b2.variableDeclarator(displayedValue, null)
    ]);
    body.push(...[letDisplayedValue, tryCatch, throwError]);
  }
  if (hc.kind === "iife") {
    const arrow = b2.arrowFunctionExpression([], b2.blockStatement(body), hc.hasAsync);
    return b2.callExpression(arrow, []);
  }
  return b2.labeledStatement(hc.outLabel, b2.blockStatement(body));
}
function hirCodegenBranch(hc, expr, branch) {
  if (branch.patterns.length > 1) {
    const perAltCtxs = [];
    for (const pat of branch.patterns) {
      hc.branchCtx = {};
      const check = hirCodegenPattern(hc, expr, pat);
      perAltCtxs.push({ check, selections: hc.branchCtx.selections });
    }
    const hasSelections = perAltCtxs.some((a) => a.selections !== void 0);
    if (!hasSelections) {
      let condition2 = perAltCtxs.reduce(
        (acc, { check }) => acc === null ? check : b2.logicalExpression("||", acc, check),
        null
      );
      if (branch.guard !== void 0) {
        condition2 = b2.logicalExpression("&&", condition2, b2.callExpression(branch.guard, [expr]));
      }
      hc.branchCtx = {};
      const then2 = hirCodegenPatternThen(hc, expr, branch.then);
      return b2.ifStatement(condition2, then2);
    }
    let result = null;
    for (let i = perAltCtxs.length - 1; i >= 0; i--) {
      let condition2 = perAltCtxs[i].check;
      if (branch.guard !== void 0) {
        condition2 = b2.logicalExpression("&&", condition2, b2.callExpression(branch.guard, [expr]));
      }
      hc.branchCtx = { selections: perAltCtxs[i].selections };
      const then2 = hirCodegenPatternThen(hc, expr, branch.then);
      result = b2.ifStatement(condition2, then2, result ?? void 0);
    }
    return result;
  }
  hc.branchCtx = {};
  const condition = hirCodegenPattern(hc, expr, branch.patterns[0]);
  let finalCondition = condition;
  if (branch.guard !== void 0) {
    const guardCall = b2.callExpression(branch.guard, [expr]);
    finalCondition = b2.logicalExpression("&&", finalCondition, guardCall);
  }
  const then = hirCodegenPatternThen(hc, expr, branch.then);
  return b2.ifStatement(finalCondition, then);
}
function hirCodegenPatternThen(hc, expr, then) {
  if (then.type === "ArrowFunctionExpression") {
    if (then.async)
      hc.hasAsync = true;
    return hirCodegenPatternThenFunction(
      hc,
      expr,
      then.params,
      then.body
    );
  } else if (then.type === "FunctionExpression") {
    if (then.async)
      hc.hasAsync = true;
    return hirCodegenPatternThenFunction(
      hc,
      expr,
      then.params,
      then.body
    );
  }
  return b2.blockStatement([
    ...hirCodegenOutput(
      hc,
      b2.callExpression(
        then,
        hc.branchCtx.selections !== void 0 ? [hirCodegenConstructSelectionExpr(hc.branchCtx.selections), expr] : [expr]
      )
    )
    // b.returnStatement(b.callExpression(then, [expr]))
  ]);
}
function hirCodegenOutput(hc, value) {
  switch (hc.kind) {
    case "iife": {
      return [b2.returnStatement(value)];
    }
    case "block": {
      return [
        b2.expressionStatement(b2.assignmentExpression("=", hc.outVar, value)),
        b2.breakStatement(hc.outLabel)
      ];
    }
  }
}
function hirCodegenConstructSelectionExpr(selections) {
  if (selections.type === "anonymous")
    return selections.expr;
  const properties = selections.selections.map(
    ([pattern, expr]) => b2.objectProperty(pattern.name, expr, true)
  );
  return b2.objectExpression(properties);
}
function paramToBinding(param, initExpr) {
  if (b2.isRestElement(param)) {
    return { lval: param.argument, init: b2.arrayExpression([initExpr]) };
  }
  if (b2.isAssignmentPattern(param)) {
    return { lval: b2.arrayPattern([param]), init: b2.arrayExpression([initExpr]) };
  }
  return { lval: param, init: initExpr };
}
function hirCodegenPatternThenFunction(hc, expr, args, body) {
  const block = [];
  if (args.length > 1 && hc.branchCtx.selections === void 0) {
    throw new Error("unimplemented more than one arg on result function");
  } else if (args.length === 1) {
    const param = args[0];
    if (b2.isRestElement(param) && hc.branchCtx.selections !== void 0) {
      const selExpr = hirCodegenConstructSelectionExpr(hc.branchCtx.selections);
      block.push(
        b2.variableDeclaration("let", [
          b2.variableDeclarator(param.argument, b2.arrayExpression([selExpr, expr]))
        ])
      );
    } else {
      const valueExpr = hc.branchCtx.selections === void 0 ? expr : hirCodegenConstructSelectionExpr(hc.branchCtx.selections);
      const { lval, init } = paramToBinding(param, valueExpr);
      block.push(
        b2.variableDeclaration("let", [b2.variableDeclarator(lval, init)])
      );
    }
  } else if (args.length === 2 && hc.branchCtx.selections !== void 0) {
    const selExpr = hirCodegenConstructSelectionExpr(hc.branchCtx.selections);
    const { lval: lval0, init: init0 } = paramToBinding(args[0], selExpr);
    const { lval: lval1, init: init1 } = paramToBinding(args[1], expr);
    block.push(
      b2.variableDeclaration("let", [b2.variableDeclarator(lval0, init0)]),
      b2.variableDeclaration("let", [b2.variableDeclarator(lval1, init1)])
    );
  }
  if (body.type !== "BlockStatement") {
    block.push(...hirCodegenOutput(hc, body));
  } else {
    hirCodegenRewriteReturns(hc, body);
    block.push(...body.body);
    if (hc.kind === "iife") {
      const last = block[block.length - 1];
      if (!last || !b2.isReturnStatement(last)) {
        block.push(b2.returnStatement(null));
      }
    }
  }
  return b2.blockStatement(block);
}
function hirCodegenRewriteReturns(hc, body) {
  if (hc.kind === "iife")
    return;
  traverse(body, {
    noScope: true,
    ReturnStatement(path) {
      const output = hirCodegenOutput(
        hc,
        path.node.argument || b2.identifier("undefined")
      );
      path.replaceWithMultiple(output);
    }
  });
}
function hirCodegenPattern(hc, expr, pattern) {
  switch (pattern.type) {
    case "literal": {
      return hirCodegenPatternLiteral(expr, pattern.value);
    }
    case "object": {
      return hirCodegenPatternObject(hc, expr, pattern.value);
    }
    case "array": {
      return hirCodegenPatternArray(hc, expr, pattern.value);
    }
    case "string":
    case "number":
    case "bigint":
    case "boolean": {
      return hirCodegenPatternSimpleTypeof(hc, expr, pattern.type);
    }
    case "wildcard": {
      return b2.booleanLiteral(true);
    }
    case "nullish": {
      return b2.binaryExpression("==", expr, b2.nullLiteral());
    }
    case "when": {
      return b2.callExpression(pattern.predicate, [expr]);
    }
    case "intersection": {
      const checks = pattern.patterns.map(
        (subPattern) => hirCodegenPattern(hc, expr, subPattern)
      );
      return checks.reduce(
        (acc, check) => b2.logicalExpression("&&", acc, check)
      );
    }
    case "refinedType": {
      const typeCheck = hirCodegenPatternSimpleTypeof(
        hc,
        expr,
        pattern.typeName
      );
      const methodCall = b2.callExpression(
        hirCodegenMemberExpr(hc, expr, b2.identifier(pattern.methodName)),
        pattern.args
      );
      return b2.logicalExpression("&&", typeCheck, methodCall);
    }
    case "symbol":
    case "_array":
    case "set":
    case "map":
    case "not": {
      throw new Error(`unimplemented pattern: ${pattern.type}`);
    }
    case "select": {
      return hirCodegenPatternSelect(hc, expr, pattern.value);
    }
    case "expression": {
      const patId = pattern.value;
      const objectIs = b2.callExpression(
        b2.memberExpression(b2.identifier("Object"), b2.identifier("is")),
        [expr, patId]
      );
      const isObject = b2.logicalExpression(
        "&&",
        b2.binaryExpression("===", b2.unaryExpression("typeof", patId), b2.stringLiteral("object")),
        b2.binaryExpression("!==", patId, b2.nullLiteral())
      );
      const kParam = b2.identifier("k");
      const everyCheck = b2.callExpression(
        b2.memberExpression(
          b2.callExpression(
            b2.memberExpression(b2.identifier("Object"), b2.identifier("keys")),
            [patId]
          ),
          b2.identifier("every")
        ),
        [
          b2.arrowFunctionExpression(
            [kParam],
            b2.logicalExpression(
              "&&",
              b2.binaryExpression("!=", expr, b2.nullLiteral()),
              b2.callExpression(
                b2.memberExpression(b2.identifier("Object"), b2.identifier("is")),
                [
                  b2.memberExpression(expr, kParam, true),
                  b2.memberExpression(patId, kParam, true)
                ]
              )
            )
          )
        ]
      );
      return b2.conditionalExpression(isObject, everyCheck, objectIs);
    }
    case "union": {
      const checks = pattern.patterns.map(
        (p) => hirCodegenPattern(hc, expr, p)
      );
      if (checks.length === 0)
        return b2.booleanLiteral(false);
      if (checks.length === 1)
        return checks[0];
      return checks.reduce(
        (acc, check) => b2.logicalExpression("||", acc, check)
      );
    }
  }
}
function hirCodegenPatternSimpleTypeof(hc, expr, type) {
  return b2.binaryExpression(
    "===",
    b2.unaryExpression("typeof", expr, true),
    b2.stringLiteral(type)
  );
}
function hirCodegenMemberExpr(hc, object, property, computed = false) {
  if (!hc.disableOptionalChaining)
    return b2.optionalMemberExpression(
      object,
      property,
      computed,
      true
    );
  return b2.memberExpression(object, property, computed);
}
function hirCodegenPatternArray(hc, expr, arr) {
  const isArrayCall = b2.callExpression(
    b2.memberExpression(b2.identifier("Array"), b2.identifier("isArray")),
    [expr]
  );
  const inputLength = hirCodegenMemberExpr(hc, expr, b2.identifier("length"));
  const boundsCheck = b2.binaryExpression(
    ">=",
    inputLength,
    b2.numericLiteral(arr.length)
  );
  const finalExpression = b2.logicalExpression("&&", isArrayCall, boundsCheck);
  const conditionals = [finalExpression];
  for (let i = 0; i < arr.length; i++) {
    const arrayAccess = b2.memberExpression(expr, b2.numericLiteral(i), true);
    conditionals.push(hirCodegenPattern(hc, arrayAccess, arr[i]));
  }
  return concatConditionals(conditionals);
}
function hirCodegenPatternSelect(hc, expr, select) {
  if (hc.branchCtx.selections !== void 0) {
    if (hc.branchCtx.selections.type === "anonymous") {
      throw new Error(
        "Cannot have more than one anonymous `P.select()` in a single pattern match branch"
      );
    }
    if (select.type !== "named")
      throw new Error(
        "Cannot mix anonymous and named `P.select()` in a single pattern match branch"
      );
    hc.branchCtx.selections.selections.push([select, expr]);
  } else {
    if (select.type === "anonymous") {
      hc.branchCtx.selections = { type: "anonymous", expr };
    } else {
      hc.branchCtx.selections = { type: "named", selections: [[select, expr]] };
    }
  }
  if (select.subpattern !== void 0)
    return hirCodegenPattern(hc, expr, select.subpattern);
  return b2.booleanLiteral(true);
}
function isValidIdentifier(name) {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
}
function hirCodegenPropertyAccess(hc, object, key) {
  if (isValidIdentifier(key)) {
    return hirCodegenMemberExpr(hc, object, b2.identifier(key));
  }
  if (!hc.disableOptionalChaining) {
    return b2.optionalMemberExpression(
      object,
      b2.stringLiteral(key),
      true,
      true
    );
  }
  return b2.memberExpression(object, b2.stringLiteral(key), true);
}
function hirCodegenPatternObject(hc, expr, obj) {
  const conditionals = [];
  for (const [key, pat] of Object.entries(obj)) {
    const memberExpr = hirCodegenPropertyAccess(hc, expr, key);
    conditionals.push(hirCodegenPattern(hc, memberExpr, pat));
  }
  return concatConditionals(conditionals);
}
function hirCodegenPatternLiteral(expr, lit) {
  if (lit.type === "nan") {
    return b2.callExpression(
      b2.memberExpression(b2.identifier("Number"), b2.identifier("isNaN")),
      [expr]
    );
  }
  return b2.binaryExpression("===", expr, patternLiteralToExpr(lit));
}
function patternLiteralToExpr(lit) {
  switch (lit.type) {
    case "string": {
      return b2.stringLiteral(lit.value);
    }
    case "number": {
      return b2.numericLiteral(lit.value);
    }
    case "boolean": {
      return b2.booleanLiteral(lit.value);
    }
    case "bigint": {
      return b2.bigIntLiteral(lit.value);
    }
    case "undefined": {
      return b2.identifier("undefined");
    }
    case "null": {
      return b2.nullLiteral();
    }
    case "nan": {
      return b2.identifier("NaN");
    }
  }
}
function concatConditionals(conds_) {
  const conds = conds_.filter(
    (cond) => !(b2.isBooleanLiteral(cond) && cond.value === true)
  );
  if (conds.length === 0)
    return b2.booleanLiteral(true);
  if (conds.length === 1)
    return conds[0];
  let i = conds.length - 1;
  let out = conds[i];
  i--;
  for (i; i >= 0; i--) {
    const cond = conds[i];
    out = b2.logicalExpression("&&", cond, out);
  }
  return out;
}
function isInexpensiveExpr(expr) {
  if (b2.isIdentifier(expr))
    return true;
  return false;
}

// src/pattycake.ts
var pattycakePlugin = (opts) => {
  let state = {
    matchIdentifier: void 0,
    patternIdentifier: void 0
  };
  let hirTransform = void 0;
  return {
    name: "pattycake",
    visitor: {
      Program(path) {
        state = {
          matchIdentifier: void 0,
          patternIdentifier: void 0
        };
        hirTransform = void 0;
        path.traverse(
          {
            ImportDeclaration(path2, state2) {
              if (path2.node.source.value != "ts-pattern")
                return;
              for (const specifier of path2.node.specifiers) {
                if (!b3.isImportSpecifier(specifier))
                  continue;
                if (b3.isIdentifier(specifier.imported) && specifier.imported.name === "match") {
                  state2.matchIdentifier = specifier.local.name;
                  continue;
                }
                if (b3.isIdentifier(specifier.imported) && (specifier.imported.name === "Pattern" || specifier.imported.name === "P")) {
                  state2.patternIdentifier = specifier.local.name;
                  continue;
                }
              }
            }
          },
          state
        );
        if (state.matchIdentifier !== void 0) {
          hirTransform = {
            matchIdentifier: state.matchIdentifier,
            patternIdentifier: state.patternIdentifier
          };
        }
      },
      CallExpression(path) {
        if (hirTransform === void 0)
          return;
        if (!terminatesMatchExpression(hirTransform, path))
          return;
        try {
          const pat = hirFromCallExpr(hirTransform, path.node);
          if (pat === void 0)
            return;
          let hc = hirCodegenInit(path, opts);
          const exprOrLabelStmt = hirCodegen(hc, pat);
          if (hc.kind === "iife") {
            path.replaceWith(exprOrLabelStmt);
            return;
          }
          switch (hc.type) {
            case "var-decl": {
              const letDecl = b3.variableDeclaration("let", [
                b3.variableDeclarator(hc.outVar)
              ]);
              path.parentPath.parentPath.replaceWithMultiple([
                letDecl,
                exprOrLabelStmt
              ]);
              break;
            }
            case "pattern-var-decl": {
              const letDecl = b3.variableDeclaration("let", [
                b3.variableDeclarator(hc.outVar)
              ]);
              if (!b3.isIdentifier(hc.outVar))
                throw new Error("unreachable");
              const assignBack = b3.variableDeclaration("let", [
                b3.variableDeclarator(hc.patternOriginalOutVar, hc.outVar)
              ]);
              path.parentPath.parentPath.replaceWithMultiple([
                letDecl,
                exprOrLabelStmt,
                assignBack
              ]);
              break;
            }
            case "assignment": {
              path.parentPath.parentPath.replaceWith(exprOrLabelStmt);
              break;
            }
          }
        } catch (err) {
          if (!opts.mute) {
            console.error(err);
          }
        }
      }
    }
  };
};
function terminatesMatchExpression(ht, callExpr) {
  const callExprs = callExpressionsFlat(ht, callExpr.node);
  if (callExprs === void 0)
    return false;
  const last = callExprs[callExprs.length - 1];
  if (!b3.isMemberExpression(last.callee))
    return false;
  if (!b3.isIdentifier(last.callee.property))
    return false;
  switch (last.callee.property.name) {
    case "otherwise":
    case "run":
    case "exhaustive":
      return true;
  }
  return false;
}
var pattycake_default = pattycakePlugin;

// src/plugin.ts
var unplugin = (0, import_unplugin.createUnplugin)((options) => {
  return {
    enforce: "pre",
    name: "pattycake",
    transformInclude(id) {
      return /\.[jt]s[x]?$/.test(id);
    },
    async transform(code, id) {
      if (!code.includes("ts-pattern")) {
        return null;
      }
      const plugins = [[import_plugin_syntax_jsx.default]];
      const isTypescript = /\.ts[x]?$/.test(id);
      if (isTypescript) {
        plugins.push([
          import_plugin_syntax_typescript.default,
          { allExtensions: true, isTSX: id.endsWith(".tsx") }
        ]);
      }
      plugins.push([babelPlugin, options]);
      try {
        const result = await (0, import_core.transformAsync)(code, { plugins, filename: id });
        return result?.code || null;
      } catch {
        return null;
      }
    }
  };
});
var babelPlugin = (0, import_helper_plugin_utils.declare)((api, options) => {
  api.assertVersion(7);
  return pattycake_default(options);
});

// src/index.ts
var babel = babelPlugin;
var vite = unplugin.vite;
var webpack = unplugin.webpack;
var rollup = unplugin.rollup;
var rspack = unplugin.rspack;
var esbuild = unplugin.esbuild;
var next = (nextConfig = {}, options) => {
  return {
    ...nextConfig,
    webpack(config, webpackOptions) {
      config.plugins.unshift(webpack(options));
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, webpackOptions);
      }
      return config;
    }
  };
};
var src_default = {
  vite,
  webpack,
  rollup,
  rspack,
  esbuild,
  next,
  unplugin,
  babel: babelPlugin
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  babel,
  esbuild,
  next,
  rollup,
  rspack,
  vite,
  webpack
});
//# sourceMappingURL=index.js.map