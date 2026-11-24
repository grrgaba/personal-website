(function () {
  const COLORS = [
    { name: 'Pink', fill: '#f4a6c0', dark: '#d46a93' },
    { name: 'Red', fill: '#d9434f', dark: '#9c2330' },
    { name: 'White', fill: '#fdfdfb', dark: '#cfc8bf' },
    { name: 'Yellow', fill: '#f8d548', dark: '#d1a416' },
    { name: 'Orange', fill: '#f59b4a', dark: '#c4691b' },
    { name: 'Blue', fill: '#7aaeea', dark: '#3f78bd' },
    { name: 'Lavender', fill: '#b9a2e0', dark: '#8468b8' },
    { name: 'Peach', fill: '#f9c3a5', dark: '#d98d68' }
  ];

  const GLASS = [
    { name: 'Clear', fill: '#cfe6ef' },
    { name: 'Rose', fill: '#f2b8c4' },
    { name: 'Sage', fill: '#b5d3b0' },
    { name: 'Sky', fill: '#a9c8ef' },
    { name: 'Cream', fill: '#f1e4c8' }
  ];

  // Keychain vials: every flower sits inside the container, filling from the bottom up
  const RING = '<circle cx="200" cy="42" r="30" fill="none" stroke="#b9bcc2" stroke-width="6"/>';
  const VASES = [
    { name: 'Glass vial', half: 66, top: 140, bottom: 498, opacity: 0.3,
      path: 'M134 140H266V466Q266 498 234 498H166Q134 498 134 466Z',
      hardware: RING +
        '<rect x="126" y="102" width="148" height="42" rx="8" fill="#d9b25f" stroke="#b08a35" stroke-width="2"/>' +
        '<circle cx="200" cy="82" r="13" fill="none" stroke="#b08a35" stroke-width="5"/>',
      shine: '<path d="M150 170V440" stroke="#fff" stroke-opacity=".7" stroke-width="6" stroke-linecap="round"/>' },
    { name: 'Plastic capsule', half: 56, top: 150, bottom: 500, opacity: 0.5,
      path: 'M144 150H256V440Q256 504 200 504Q144 504 144 440Z',
      hardware: RING +
        '<rect x="136" y="104" width="128" height="50" rx="12" fill="#f3f1ee" stroke="#c9c4be" stroke-width="2"/>' +
        '<path d="M156 112V146M174 112V146M192 112V146M210 112V146M228 112V146M246 112V146" stroke="#c9c4be" stroke-width="2"/>' +
        '<rect x="184" y="76" width="32" height="30" rx="14" fill="none" stroke="#c9c4be" stroke-width="5"/>',
      shine: '<path d="M158 180V420" stroke="#fff" stroke-opacity=".55" stroke-width="5" stroke-linecap="round"/>' }
  ];

  // [column, row]: column -1..1 across the vial, rows counted up from the bottom
  const SLOTS = [
    [-0.7, 0], [0.7, 0], [0, 1], [-0.7, 2], [0.7, 2], [0, 3],
    [-0.7, 4], [0.7, 4], [0, 5], [-0.7, 6], [0.7, 6]
  ];
  const ROW_GAP = 46;
  const HEAD_SCALE = 0.78;

  const TYPES = {
    Daisy: function (c) {
      let s = '';
      for (let i = 0; i < 12; i++) {
        s += '<ellipse cx="0" cy="-16" rx="6" ry="16" fill="' + c.fill + '" stroke="' + c.dark + '" stroke-width="1" transform="rotate(' + i * 30 + ')"/>';
      }
      return s + '<circle r="9" fill="' + (c.name === 'Yellow' ? '#e08a1e' : '#f6c945') + '"/>';
    },
    Tulip: function (c) {
      return '<path d="M-19 -8Q-22 22 0 26Q22 22 19 -8L10 -26L0 -10L-10 -26Z" fill="' + c.fill + '" stroke="' + c.dark + '" stroke-width="1.5" stroke-linejoin="round"/>' +
        '<path d="M0 -10Q-8 8 0 26Q8 8 0 -10Z" fill="' + c.dark + '" opacity=".25"/>';
    },
    Rose: function (c) {
      return '<circle r="24" fill="' + c.fill + '" stroke="' + c.dark + '" stroke-width="1.5"/>' +
        '<circle r="16" fill="none" stroke="' + c.dark + '" stroke-width="1.5" opacity=".6"/>' +
        '<path d="M-5 0a5 5 0 1 1 5 5a10 10 0 1 1 -10 -10a15 15 0 1 1 15 15" fill="none" stroke="' + c.dark + '" stroke-width="2" stroke-linecap="round"/>';
    },
    Lavender: function (c) {
      let s = '<path d="M0 16V-34" stroke="#6f9b69" stroke-width="2.5"/>';
      for (let i = 0; i < 8; i++) {
        const y = 12 - i * 6;
        s += '<ellipse cx="-5" cy="' + y + '" rx="4" ry="6" fill="' + c.fill + '" stroke="' + c.dark + '" stroke-width="1" transform="rotate(-25 -5 ' + y + ')"/>' +
          '<ellipse cx="5" cy="' + (y - 3) + '" rx="4" ry="6" fill="' + c.fill + '" stroke="' + c.dark + '" stroke-width="1" transform="rotate(25 5 ' + (y - 3) + ')"/>';
      }
      return s + '<ellipse cx="0" cy="-36" rx="3.5" ry="6" fill="' + c.fill + '" stroke="' + c.dark + '" stroke-width="1"/>';
    },
    Sunflower: function (c) {
      let s = '';
      for (let i = 0; i < 18; i++) {
        s += '<path d="M0 -12L-6 -28L0 -36L6 -28Z" fill="' + c.fill + '" stroke="' + c.dark + '" stroke-width="1" transform="rotate(' + i * 20 + ')"/>';
      }
      s += '<circle r="14" fill="#5b3a22"/>';
      for (let i = 0; i < 6; i++) {
        s += '<circle cx="' + (Math.cos(i * 1.047) * 7).toFixed(1) + '" cy="' + (Math.sin(i * 1.047) * 7).toFixed(1) + '" r="1.6" fill="#a8774a"/>';
      }
      return s;
    },
    Hydrangea: function (c) {
      const dots = [[0, 0], [-12, -6], [12, -6], [-8, 10], [8, 10], [0, -16], [-18, 8], [18, 8], [0, 20], [-20, -14], [20, -14]];
      return dots.map(function (d) {
        return '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="10" fill="' + c.fill + '" stroke="' + c.dark + '" stroke-width="1"/>' +
          '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="2.5" fill="' + c.dark + '" opacity=".5"/>';
      }).join('');
    }
  };

  const $ = function (id) { return document.getElementById(id); };
  const stage = $('stage');
  const state = { color: 0, type: 'Daisy', vase: 0, glass: 0, flowers: [], redo: [], isNew: false };

  function vaseGeometry() {
    const v = VASES[state.vase];
    return { v: v, cx: 200 };
  }

  function flowerSvg(f, i, g) {
    const v = g.v;
    const sx = SLOTS[i][0], row = SLOTS[i][1];
    const hx = g.cx + sx * (v.half - 28);
    const hy = v.bottom - 50 - row * ROW_GAP;
    const bx = g.cx + sx * (v.half - 28) * 0.4;
    const by = v.bottom - 10;
    const c = COLORS[f.color];
    const isNew = state.isNew && i === state.flowers.length - 1;
    const cls = 'flower' + (isNew ? ' is-new' : '');
    return {
      back: '<g class="' + cls + '"><path class="stem" pathLength="1" d="M' + bx + ' ' + by + 'Q' + hx + ' ' + (by + hy) / 2 + ' ' + hx + ' ' + hy + '"/></g>',
      front: '<g class="' + cls + '"><g class="head" transform="translate(' + hx + ' ' + hy + ') scale(' + HEAD_SCALE + ')"><g class="pop">' + TYPES[f.type](c) + '</g></g></g>'
    };
  }

  function render() {
    const g = vaseGeometry();
    const v = g.v;
    const tint = GLASS[state.glass].fill;
    const parts = state.flowers.map(function (f, i) { return flowerSvg(f, i, g); });
    const back = parts.map(function (p) { return p.back; }).join('');
    const front = parts.map(function (p) { return p.front; }).join('');

    // flowers are clipped to the vial so nothing pokes outside; the tint layer sits over them like glass or plastic
    stage.innerHTML =
      '<defs><clipPath id="vial-clip"><path d="' + v.path + '"/></clipPath></defs>' +
      '<ellipse cx="200" cy="516" rx="90" ry="10" fill="#000" opacity=".12"/>' +
      '<path d="' + v.path + '" fill="#fff" fill-opacity=".45"/>' +
      '<g clip-path="url(#vial-clip)">' + back + front + '</g>' +
      '<path d="' + v.path + '" fill="' + tint + '" fill-opacity="' + v.opacity + '" stroke="' + tint + '" stroke-width="3" stroke-linejoin="round"/>' +
      v.shine + v.hardware;
    state.isNew = false;
    updateUi();
  }

  function updateUi() {
    const n = state.flowers.length;
    $('count').textContent = n === 0 ? 'The vial is empty — add a flower!' :
      n >= SLOTS.length ? 'The vial is full (' + n + ' flowers).' : n + ' of ' + SLOTS.length + ' flowers';
    $('add').disabled = n >= SLOTS.length;
    $('undo').disabled = n === 0;
    $('redo').disabled = state.redo.length === 0;
    $('clear').disabled = n === 0;

    const counts = {};
    state.flowers.forEach(function (f) {
      const key = COLORS[f.color].name + ' ' + f.type;
      counts[key] = (counts[key] || 0) + 1;
    });
    const lines = Object.keys(counts).map(function (k) { return counts[k] + ' × ' + k; });
    $('list').innerHTML = lines.map(function (l) { return '<li>' + l + '</li>'; }).join('');
    const body = ['Hi Sarj! Here is my keychain idea:', '', 'Vial: ' + VASES[state.vase].name + ' (' + GLASS[state.glass].name + ' tint)']
      .concat(lines.length ? lines : ['(no flowers picked yet)']).join('\n');
    $('email').href = 'mailto:sarjlabrador@gmail.com?subject=' + encodeURIComponent('Bouquet idea') + '&body=' + encodeURIComponent(body);
  }

  function radioGroup(el, items, label, bg, onPick, isSwatch) {
    el.innerHTML = '';
    items.forEach(function (item, i) {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-label', label(item));
      if (isSwatch) b.style.background = bg(item);
      else b.textContent = label(item);
      b.addEventListener('click', function () {
        onPick(item, i);
        Array.prototype.forEach.call(el.children, function (c, j) { c.setAttribute('aria-checked', String(j === i)); });
      });
      b.setAttribute('aria-checked', 'false');
      el.appendChild(b);
    });
    return function (idx) { Array.prototype.forEach.call(el.children, function (c, j) { c.setAttribute('aria-checked', String(j === idx)); }); };
  }

  const checkColor = radioGroup($('colors'), COLORS, function (c) { return c.name; }, function (c) { return c.fill; },
    function (c, i) { state.color = i; }, true);
  const checkType = radioGroup($('types'), Object.keys(TYPES), function (t) { return t; }, null,
    function (t) { state.type = t; }, false);
  const checkVase = radioGroup($('vases'), VASES, function (v) { return v.name; }, null,
    function (v, i) { state.vase = i; render(); }, false);
  const checkGlass = radioGroup($('glass'), GLASS, function (g) { return g.name; }, function (g) { return g.fill; },
    function (g, i) { state.glass = i; render(); }, true);
  checkColor(0); checkType(0); checkVase(0); checkGlass(0);

  function add() {
    if (state.flowers.length >= SLOTS.length) return;
    state.flowers.push({ color: state.color, type: state.type });
    state.redo = [];
    state.isNew = true;
    render();
  }
  function undo() {
    if (!state.flowers.length) return;
    state.redo.push(state.flowers.pop());
    render();
  }
  function redo() {
    if (!state.redo.length) return;
    state.flowers.push(state.redo.pop());
    state.isNew = true;
    render();
  }

  $('add').addEventListener('click', add);
  $('undo').addEventListener('click', undo);
  $('redo').addEventListener('click', redo);
  $('clear').addEventListener('click', function () { state.flowers = []; state.redo = []; render(); });
  document.addEventListener('keydown', function (e) {
    if (!(e.ctrlKey || e.metaKey) || e.target instanceof HTMLInputElement) return;
    const k = e.key.toLowerCase();
    if (k === 'z') { e.preventDefault(); (e.shiftKey ? redo : undo)(); }
    else if (k === 'y') { e.preventDefault(); redo(); }
  });

  render();
})();
