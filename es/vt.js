var _excluded = ["style", "context"],
    _excluded2 = ["width"],
    _excluded3 = ["children", "ctx"],
    _excluded4 = ["context"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/*
The MIT License (MIT)

Copyright (c) 2019 https://github.com/wubostc/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useRef, useState, useCallback, useContext, useEffect, useMemo, useImperativeHandle } from "react";
/**
 * THE EVENTS OF SCROLLING.
 */

var SCROLLEVT_NULL = 0 << 0;
var SCROLLEVT_INIT = 1 << 0;
var SCROLLEVT_RECOMPUTE = 1 << 1;
var SCROLLEVT_NATIVE = 1 << 3;
var SCROLLEVT_BY_HOOK = 1 << 6; // any events will be `SCROLLEVT_BY_HOOK` if the `ctx.f_top ===  TOP_CONTINUE`.

var TOP_CONTINUE = 0;
var TOP_DONE = 1;
/**
 * `INIT` -> `LOADED` -> `RUNNING`
 */

var e_VT_STATE;

(function (e_VT_STATE) {
  e_VT_STATE[e_VT_STATE["INIT"] = 1] = "INIT";
  e_VT_STATE[e_VT_STATE["LOADED"] = 2] = "LOADED";
  e_VT_STATE[e_VT_STATE["RUNNING"] = 4] = "RUNNING";
})(e_VT_STATE || (e_VT_STATE = {}));

var row_idx = typeof Symbol === 'function' ? Symbol.for('idx') : '$$idx';

function default_context() {
  return {
    vt_state: e_VT_STATE.INIT,
    possible_hight_per_tr: -1,
    computed_h: 0,
    re_computed: 0,
    row_height: [],
    row_count: 0,
    prev_row_count: 0,
    _offset_top: 0 | 0,
    _offset_head: 0 | 0,
    _offset_tail: 0 | 1,
    WH: 0,
    top: 0,
    left: 0,
    evt: SCROLLEVT_NULL,
    end: false,
    final_top: 0,
    f_final_top: TOP_DONE,
    update_count: 0
  };
}
/* overload __DIAGNOSIS__. */


function helper_diagnosis(ctx) {
  if (ctx.hasOwnProperty("CLICK~__DIAGNOSIS__")) return;
  Object.defineProperty(ctx, "CLICK~__DIAGNOSIS__", {
    get: function get() {
      console.debug("OoOoOoO DIAGNOSIS OoOoOoO");
      var expect_height = 0;

      for (var i = 0; i < ctx.row_count; ++i) {
        expect_height += ctx.row_height[i];
      }

      var color, explain;

      if (expect_height > ctx.computed_h) {
        color = "color:rgb(15, 179, 9)"; // green

        explain = "lower than expected";
      } else if (expect_height < ctx.computed_h) {
        color = "color:rgb(202, 61, 81)"; // red

        explain = "higher than expected";
      } else {
        color = "color:rgba(0, 0, 0, 0.85)";
        explain = "normal";
      }

      console.debug("%c%d(%d)(".concat(explain, ")"), color, expect_height, ctx.computed_h - expect_height);
      console.debug("OoOoOoOoOoOoOOoOoOoOoOoOo");
    },
    configurable: false,
    enumerable: false
  });
}

function log_debug(ctx, msg) {
  if (ctx.debug) {
    var ts = new Date().getTime();
    console.debug("%c[".concat(ctx.id, "][").concat(ts, "][").concat(msg, "] vt"), "color:#a00", ctx);
  }
} // the factory function returns a SimEvent.


function make_evt(ne) {
  var target = ne.target;
  return {
    target: {
      scrollTop: target.scrollTop,
      scrollLeft: target.scrollLeft
    },
    end: target.scrollHeight - target.clientHeight === Math.round(target.scrollTop),
    flag: SCROLLEVT_NATIVE
  };
}
/**
 * Default Implementation Layer.
 */

/** AntD.TableComponent.table */


var TableImpl = /*#__PURE__*/React.forwardRef(function TableImpl(props, ref) {
  return /*#__PURE__*/React.createElement("table", Object.assign({
    ref: ref
  }, props));
});
/** AntD.TableComponent.body.wrapper */

function WrapperImpl(props) {
  return /*#__PURE__*/React.createElement("tbody", Object.assign({}, props));
}
/** AntD.TableComponent.body.row */


var RowImpl = /*#__PURE__*/React.forwardRef(function RowImpl(props, ref) {
  return /*#__PURE__*/React.createElement("tr", Object.assign({
    ref: ref
  }, props));
});
/**
 * O(n)
 * returns offset: [head, tail, top]
 */

function scroll_with_offset(ctx, top) {
  var _ctx$scroll;

  var row_height = ctx.row_height,
      row_count = ctx.row_count,
      overscanRowCount = ctx.overscanRowCount;
  var scroll_y = (_ctx$scroll = ctx.scroll) === null || _ctx$scroll === void 0 ? void 0 : _ctx$scroll.y;

  if (typeof scroll_y === "number") {
    ctx._raw_y = scroll_y;
    ctx._y = ctx._raw_y;
  } else if (typeof scroll_y === "string") {
    /* a string, like "calc(100vh - 300px)" */
    ctx._raw_y = scroll_y;
    ctx._y = ctx.wrap_inst.current.parentElement.offsetHeight;
  } else {
    console.warn("VT: did you forget to set `scroll.y`?");
    ctx._raw_y = null;
    ctx._y = ctx.wrap_inst.current.parentElement.offsetHeight;
  }

  console.assert(ctx._y >= 0); // to calc `_top` with `row_height` and `overscan`.

  var _top = 0,
      i = 0,
      j = 0; // the height to render.

  var torender_h = 0; // scroll to the bottom of the table.

  if (top === -1 && row_count > 0) {
    i = row_count;

    while (i > 0 && torender_h < ctx._y) {
      torender_h += row_height[--i];
    }

    return [0 | i, 0 | row_count, 0 | ctx.computed_h - torender_h];
  }

  for (; i < row_count && _top < top; ++i) {
    _top += row_height[i];
  } // start j from the visible area


  j = i;

  for (; j < row_count && torender_h < ctx._y; ++j) {
    torender_h += row_height[j];
  } // keep offset row on top and bottom


  var overscan = overscanRowCount < 0 ? 0 : overscanRowCount;

  while (i > 0 && overscan--) {
    _top -= row_height[--i];
  }

  j += overscanRowCount;
  if (j > row_count) j = row_count; // returns [head, tail, top].

  return [0 | i, 0 | j, 0 | _top];
} // set the variables for offset top/head/tail.


function set_offset(ctx, top, head, tail) {
  ctx._offset_top = 0 | top;
  ctx._offset_head = 0 | head;
  ctx._offset_tail = 0 | tail;
}

function set_scroll(ctx, top, left, evt, end) {
  ctx.top = top;
  ctx.left = left;
  ctx.evt = evt;
  ctx.end = end;
}

function update_wrap_style(ctx, h) {
  if (ctx.WH === h) return;
  ctx.WH = h;
  var s = ctx.wrap_inst.current.style;
  s.height = h ? (s.maxHeight = h + 'px', s.maxHeight) : (s.maxHeight = 'unset', s.maxHeight);
} // scrolls the parent element to specified location.


function scroll_to(ctx, top, left) {
  if (!ctx.wrap_inst.current) return;
  var ele = ctx.wrap_inst.current.parentElement;
  /** ie */

  ele.scrollTop = top;
  ele.scrollLeft = left;
}

function _repainting(ctx, ms) {
  var fn = function fn() {
    log_debug(ctx, "REPAINTING");

    if (ctx.vt_state === e_VT_STATE.RUNNING && ctx.wrap_inst.current) {
      // output to the buffer
      update_wrap_style(ctx, ctx.computed_h);
    } // free this handle manually.


    ctx.HND_PAINT = 0;
  };

  return ms < 0 ? window.requestAnimationFrame(fn) : window.setTimeout(fn, ms);
} // a wrapper function for `_repainting`.


function repainting(ctx) {
  if (ctx.HND_PAINT > 0) return;
  ctx.HND_PAINT = _repainting(ctx, -1);
}

function srs_expand(ctx, len, prev_len, fill_value) {
  var slen = len - prev_len;
  var shadow_rows = new Array(slen).fill(fill_value);
  ctx.row_height = ctx.row_height.concat(shadow_rows);
  ctx.computed_h += slen * fill_value;
}

function srs_shrink(ctx, len, prev_len) {
  if (len === 0) {
    ctx.computed_h = 0;
    ctx.row_height.length = 0;
    return;
  }

  var rows = ctx.row_height;
  var h2shrink = 0;

  for (var i = len; i < prev_len; ++i) {
    h2shrink += rows[i];
  }

  ctx.computed_h -= h2shrink;
}

function set_tr_cnt(ctx, n) {
  ctx.re_computed = n - ctx.row_count;
  ctx.prev_row_count = ctx.row_count;
  ctx.row_count = n;
}

function VTable(props, ref) {
  var style = props.style,
      context = props.context,
      rest = _objectWithoutProperties(props, _excluded); // force update this vt.


  var force = useState(0);
  var ref_func = useRef();
  /*********** DOM ************/

  var wrap_inst = useMemo(function () {
    return /*#__PURE__*/React.createRef();
  }, []);
  /*********** context ************/

  var ctx = useContext(context);
  useMemo(function () {
    Object.assign(ctx, default_context());

    if (ctx.wrap_inst && ctx.wrap_inst.current) {
      ctx.wrap_inst.current.parentElement.onscroll = null;
    }

    ctx.wrap_inst = wrap_inst;
    ctx.top = ctx.initTop;
    helper_diagnosis(ctx);
  }, []);
  /*********** scroll event ************/

  var event_queue = useRef([]).current;
  var HND_RAF = useRef(0); // handle of requestAnimationFrame

  /* eslint-disable prefer-const */

  var RAF_update_self;
  /*********** scroll hook ************/

  var scroll_hook = useCallback(function (e) {
    if (ctx.vt_state !== e_VT_STATE.RUNNING) return;

    if (e) {
      event_queue.push(e);

      if (ctx.f_final_top === TOP_CONTINUE) {
        e.flag = SCROLLEVT_BY_HOOK;
        return RAF_update_self(0);
      }
    }

    if (event_queue.length) {
      if (HND_RAF.current) cancelAnimationFrame(HND_RAF.current); // requestAnimationFrame, ie >= 10

      HND_RAF.current = requestAnimationFrame(RAF_update_self);
    }
  }, []);
  var scroll_hook_native = useCallback(function (e) {
    scroll_hook(make_evt(e));
  }, []);
  /* requestAnimationFrame callback */

  RAF_update_self = useCallback(function (_) {
    if (ctx.vt_state !== e_VT_STATE.RUNNING) return;
    var evq = event_queue;
    var e; // consume the `evq` first.

    if (evq.length) {
      e = evq.shift();
    } else {
      return;
    }

    var etop = e.target.scrollTop;
    var eleft = e.target.scrollLeft;
    var flag = e.flag;

    if (ctx.debug) {
      console.debug("[".concat(ctx.id, "][SCROLL] top: %d, left: %d"), etop, eleft);
    } // checks every tr's height, which will take some time...


    var offset = scroll_with_offset(ctx, ctx.f_final_top === TOP_CONTINUE ? ctx.final_top : etop);
    var head = offset[0];
    var tail = offset[1];
    var top = offset[2];
    var prev_head = ctx._offset_head;
    var prev_tail = ctx._offset_tail;
    var prev_top = ctx._offset_top;
    var end;

    switch (flag) {
      case SCROLLEVT_INIT:
        log_debug(ctx, "SCROLLEVT_INIT");
        end = false;
        break;

      case SCROLLEVT_BY_HOOK:
        log_debug(ctx, "SCROLLEVT_BY_HOOK");

        if (head === prev_head && tail === prev_tail && top === prev_top) {
          ctx.f_final_top = TOP_DONE;
          if (ctx.final_top === -1) etop = ctx.computed_h - ctx._y;
          end = true;
        } else {
          if (ctx.final_top === -1) etop = top;
          end = false;
        }

        break;

      case SCROLLEVT_RECOMPUTE:
        log_debug(ctx, "SCROLLEVT_RECOMPUTE");

        if (head === prev_head && tail === prev_tail && top === prev_top) {
          HND_RAF.current = 0;
          if (event_queue.length) scroll_hook(null); // consume the next.

          return;
        }

        end = false;
        break;

      case SCROLLEVT_NATIVE:
        log_debug(ctx, "SCROLLEVT_NATIVE");
        HND_RAF.current = 0;

        if (ctx.onScroll) {
          ctx.onScroll({
            top: etop,
            left: eleft,
            isEnd: e.end
          });
        }

        if (head === prev_head && tail === prev_tail && top === prev_top) {
          return;
        }

        end = e.end;
        break;
    }

    set_offset(ctx, top, head, tail);
    set_scroll(ctx, etop, eleft, flag, end);
    force[1](++ctx.update_count);
  }, []); // expose to the parent components you are using.

  useImperativeHandle(ref, function () {
    // `y === -1` indicates you need to scroll to the bottom of the table.
    var _scrollTo = function scrollTo(y) {
      ctx.f_final_top = TOP_CONTINUE;
      ctx.final_top = y;
      scroll_hook({
        target: {
          scrollTop: y,
          scrollLeft: -1
        },
        flag: SCROLLEVT_BY_HOOK
      });
    };

    return {
      scrollTo: function scrollTo(y) {
        ref_func.current = function () {
          return _scrollTo(y);
        };

        ref_func.current();
      },
      scrollToIndex: function scrollToIndex(idx) {
        ref_func.current = function () {
          if (idx > ctx.row_count - 1) idx = ctx.row_count - 1;
          if (idx < 0) idx = 0;
          var y = 0;

          for (var i = 0; i < idx; ++i) {
            y += ctx.row_height[i];
          }

          _scrollTo(y);
        };

        ref_func.current();
      }
    };
  }, []);
  useEffect(function () {
    ctx.wrap_inst.current.parentElement.onscroll = scroll_hook_native;
  }, [wrap_inst]); // update DOM style.

  useEffect(function () {
    switch (ctx.evt) {
      case SCROLLEVT_BY_HOOK:
        if (ctx.f_final_top === TOP_CONTINUE) {
          ref_func.current();
        } else {
          scroll_to(ctx, ctx.top, ctx.left);
        }

        break;

      case SCROLLEVT_INIT:
      case SCROLLEVT_RECOMPUTE:
        scroll_to(ctx, ctx.top, ctx.left);
        if (event_queue.length) RAF_update_self(0); // consume the next.

        break;
    }
  }, [force[0]
  /* for performance. */
  ]);
  useEffect(function () {
    switch (ctx.vt_state) {
      case e_VT_STATE.INIT:
        // init vt without the rows.
        break;

      case e_VT_STATE.LOADED:
        // changed by VTRow only.
        ctx.vt_state = e_VT_STATE.RUNNING; // force update.

        scroll_hook({
          target: {
            scrollTop: ctx.top,
            scrollLeft: 0
          },
          flag: SCROLLEVT_INIT
        });
        break;

      case e_VT_STATE.RUNNING:
        if (ctx.re_computed !== 0) {
          // rerender
          ctx.re_computed = 0;
          scroll_hook({
            target: {
              scrollTop: ctx.top,
              scrollLeft: ctx.left
            },
            flag: SCROLLEVT_RECOMPUTE
          });
        }

        break;
    }
  });
  style.position = "relative";
  style.top = ctx._offset_top;

  var width = style.width,
      rest_style = _objectWithoutProperties(style, _excluded2);

  var wrap_style = useMemo(function () {
    return {
      width: width,
      minWidth: "100%",
      position: "relative",
      transform: "matrix(1, 0, 0, 1, 0, 0)"
    };
  }, [width]);
  var Table = ctx.components.table;
  return /*#__PURE__*/React.createElement("div", {
    ref: wrap_inst,
    style: wrap_style
  }, /*#__PURE__*/React.createElement(context.Provider, {
    value: _objectSpread({}, ctx)
  }, /*#__PURE__*/React.createElement(Table, Object.assign({}, rest, {
    style: rest_style
  }))));
}

function VWrapper(props) {
  var c = props.children,
      ctx = props.ctx,
      restProps = _objectWithoutProperties(props, _excluded3);

  var measureRow = c[0];
  var rows = c[1];
  var Wrapper = ctx.components.body.wrapper; // reference https://github.com/react-component/table/blob/master/src/Body/index.tsx#L6

  var len = Array.isArray(rows) ? rows.length : 0;
  var head = ctx._offset_head,
      tail = ctx._offset_tail;
  var trs;

  switch (ctx.vt_state) {
    case e_VT_STATE.INIT:
      if (len >= 0) {
        console.assert(head === 0);
        console.assert(tail === 1);

        if (Array.isArray(rows)) {
          trs = rows.slice(head, tail);
          trs[0].props.record[row_idx] = 0;
        } else {
          trs = rows;
        }

        ctx.re_computed = len;
        ctx.prev_row_count = len;
        ctx.row_count = len;
      }

      break;

    case e_VT_STATE.RUNNING:
      {
        if (tail > len) {
          var offset = tail - len;
          tail -= offset;
          head -= offset;
          if (head < 0) head = 0;
          if (tail < 0) tail = 0; // update the `head` and `tail`.

          set_offset(ctx, ctx._offset_top
          /* NOTE: invalided param, just to fill for this param */
          , head, tail);
        }

        if (ctx.row_count !== len) {
          set_tr_cnt(ctx, len);
        }

        len = ctx.row_count;
        var prev_len = ctx.prev_row_count;
        /* shadow-rows rendering phase. */

        if (len < prev_len) {
          srs_shrink(ctx, len, prev_len);
        } else if (len > prev_len) {
          var row_h = ctx.row_height;

          if (len - row_h.length > 0) {
            srs_expand(ctx, len, row_h.length, ctx.possible_hight_per_tr);
          } else {
            // calculate the total height quickly.
            row_h.fill(ctx.possible_hight_per_tr, prev_len, len);
            ctx.computed_h += ctx.possible_hight_per_tr * (len - prev_len);
          }
        }
        /**
         * tree-structure if indent is not 0
         *        |  idx
         *        |   0   || 0a                                 0  || 0a
         *        |   1   || 0b     --collapse occurred--       1  || 0b
         *        |   2   || - 1                             5->2  || 0c
         *  head  |   3   || - 1                             6->3  || 0d
         *        |   4   ||   - 2                           7->4  || 0e
         *        |   5   || 0c                              8->5  || - 1
         *        |   6   || 0d                              9->6  ||   - 2
         *        |   7   || 0e                             10->7  ||     - 3
         *  tail  |   8   || - 1                            11->8  || 0f
         *        |   9   ||  - 2
         *        |  10   ||    - 3
         *        |  11   || 0f
         *        |  12   ||
         */


        if (len) {
          var idx = head;
          trs = rows.slice(idx, tail);
          trs.forEach(function (el) {
            return el.props.record[row_idx] = idx++;
          });
        } else {
          trs = rows;
        }

        ctx.prev_row_count = ctx.row_count;
      }
      break;

    case e_VT_STATE.LOADED:
      console.assert(false);
      break;
  }

  return /*#__PURE__*/React.createElement(Wrapper, Object.assign({}, restProps), measureRow, trs);
}

function VTRow(props) {
  var inst = /*#__PURE__*/React.createRef();

  var context = props.context,
      rest = _objectWithoutProperties(props, _excluded4);

  var ctx = context;
  var children = props.children;
  var Row = ctx.components.body.row;

  if (!Array.isArray(children)) {
    // https://github.com/react-component/table/blob/master/src/Body/BodyRow.tsx#L211
    // https://github.com/react-component/table/blob/master/src/Body/index.tsx#L105
    // only empty or expanded row...
    return /*#__PURE__*/React.createElement(Row, Object.assign({}, rest), children);
  }

  var row_props = children[0].props;
  var index = row_props.record[row_idx];
  var last_index = useRef(index);
  var expanded_cls = useMemo(function () {
    return ".".concat(row_props.prefixCls, "-expanded-row");
  }, [row_props.prefixCls]);
  useEffect(function () {
    if (ctx.vt_state === e_VT_STATE.RUNNING) {
      // apply_h(ctx, index, inst.current.offsetHeight, "dom");
      repainting(ctx);
    } else {
      console.assert(ctx.vt_state === e_VT_STATE.INIT);
      ctx.vt_state = e_VT_STATE.LOADED;
      ctx.possible_hight_per_tr = inst.current.offsetHeight;
      srs_expand(ctx, ctx.row_count, 0, ctx.possible_hight_per_tr); // create a timeout task.

      _repainting(ctx, 16);
    }

    return function () {
      return repainting(ctx);
    };
  }, []);
  useEffect(function () {
    var rowElm = inst.current; // for nested(expanded) elements don't calculate height and add on cache as its already accommodated on parent row
    // if (!rowElm.matches(".ant-table-row-level-0")) return;

    var h = rowElm.offsetHeight;
    var sibling = rowElm.nextSibling; // https://github.com/react-component/table/blob/master/src/Body/BodyRow.tsx#L212
    // include heights of all expanded rows, in parent rows

    while (sibling && sibling.matches(expanded_cls)) {
      h += sibling.offsetHeight;
      sibling = sibling.nextSibling;
    }

    var curr_h = ctx.row_height[index];
    var last_h = ctx.row_height[last_index.current];
    ctx.computed_h -= curr_h;
    ctx.computed_h += last_h;
    ctx.computed_h += h - last_h;
    ctx.row_height[index] = h;
    repainting(ctx);
  });
  return /*#__PURE__*/React.createElement(Row, Object.assign({}, rest, {
    ref: inst
  }));
}

export function _set_components(ctx, components) {
  var table = components.table,
      body = components.body,
      header = components.header;
  ctx.components.body = _objectSpread(_objectSpread({}, ctx.components.body), body);

  if (body && body.cell) {
    ctx._vtcomponents.body.cell = body.cell;
  }

  if (header) {
    ctx.components.header = header;
    ctx._vtcomponents.header = header;
  }

  if (table) {
    ctx.components.table = table;
  }
}
export function init(fnOpts, deps) {
  var ctx = useRef( /*#__PURE__*/React.createContext({})).current;
  var ctx_value = useContext(ctx);
  var default_ref = useRef();
  useMemo(function () {
    return Object.assign(ctx_value, {
      id: +new Date(),
      initTop: 0,
      overscanRowCount: 5,
      debug: false,
      ref: default_ref
    }, fnOpts());
  }, deps);
  useMemo(function () {
    var VTable2 = /*#__PURE__*/React.forwardRef(VTable); // set the virtual layer.

    ctx_value._vtcomponents = {
      table: function table(props) {
        return /*#__PURE__*/React.createElement(VTable2, Object.assign({}, props, {
          context: ctx,
          ref: ctx_value.ref
        }));
      },
      body: {
        wrapper: function wrapper(props) {
          return /*#__PURE__*/React.createElement(ctx.Consumer, null, function
            /* value */
          () {
            return /*#__PURE__*/React.createElement(VWrapper, Object.assign({}, props, {
              ctx: ctx_value
            }));
          });
        },
        row: function row(props) {
          return /*#__PURE__*/React.createElement(VTRow, Object.assign({}, props, {
            context: ctx_value
          }));
        }
      }
    }; // set the default implementation layer.

    ctx_value.components = {};

    _set_components(ctx_value, {
      table: TableImpl,
      body: {
        wrapper: WrapperImpl,
        row: RowImpl
      }
    }); // start -> `INIT`


    ctx_value.vt_state = e_VT_STATE.INIT;
  }, []);
  return ctx_value;
}