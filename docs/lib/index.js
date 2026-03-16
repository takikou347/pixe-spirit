// src/palettes.ts
var PALETTES = {
  red_light: {
    body: "#FF6B6B",
    bodyLight: "#FF9999",
    bodyDark: "#CC4444",
    eye: "#333333",
    accent: "#FFD93D"
  },
  blue_light: {
    body: "#6BB5FF",
    bodyLight: "#99CCFF",
    bodyDark: "#4488CC",
    eye: "#333333",
    accent: "#FFD93D"
  },
  green_light: {
    body: "#6BCB77",
    bodyLight: "#99DD99",
    bodyDark: "#44AA55",
    eye: "#333333",
    accent: "#FFD93D"
  },
  yellow_light: {
    body: "#FFD93D",
    bodyLight: "#FFE680",
    bodyDark: "#CCAA22",
    eye: "#333333",
    accent: "#FF6B6B"
  },
  red_dark: {
    body: "#CC3333",
    bodyLight: "#DD5555",
    bodyDark: "#991111",
    eye: "#FFEEEE",
    accent: "#FFD93D"
  },
  blue_dark: {
    body: "#3366AA",
    bodyLight: "#5588CC",
    bodyDark: "#224488",
    eye: "#EEEEFF",
    accent: "#FFD93D"
  },
  green_dark: {
    body: "#338844",
    bodyLight: "#55AA66",
    bodyDark: "#226633",
    eye: "#EEFFEE",
    accent: "#FFD93D"
  },
  yellow_dark: {
    body: "#AA8800",
    bodyLight: "#CCAA33",
    bodyDark: "#886600",
    eye: "#FFFFEE",
    accent: "#FF6B6B"
  }
};
var DEFAULT_PALETTE = PALETTES.blue_light;
function getPalettes() {
  return { ...PALETTES };
}
function resolvePalette(id) {
  return PALETTES[id];
}

// src/frame.ts
var GRID_SIZE = 32;
function createFrame() {
  const pixels = Array.from(
    { length: GRID_SIZE },
    () => Array.from({ length: GRID_SIZE }).fill(null)
  );
  return { width: GRID_SIZE, height: GRID_SIZE, pixels };
}
function setPixel(frame, x, y, color) {
  if (x >= 0 && x < frame.width && y >= 0 && y < frame.height) {
    frame.pixels[y][x] = color;
  }
}

// src/parts/body.ts
var CX = 16;
var CY = 16;
function drawBody(frame, shape, size, palette, oy) {
  const fillBody = (x, y) => {
    setPixel(frame, x, y + oy, palette.body);
  };
  const fillOutline = (x, y) => {
    setPixel(frame, x, y + oy, palette.bodyDark);
  };
  const fillHighlight = (x, y) => {
    setPixel(frame, x, y + oy, palette.bodyLight);
  };
  switch (shape) {
    case "circle":
      drawCircleBody(size, fillBody, fillOutline, fillHighlight);
      break;
    case "oval_tall":
      drawOvalTallBody(size, fillBody, fillOutline, fillHighlight);
      break;
    case "oval_wide":
      drawOvalWideBody(size, fillBody, fillOutline, fillHighlight);
      break;
    case "rounded_square":
      drawRoundedSquareBody(size, fillBody, fillOutline, fillHighlight);
      break;
    case "teardrop":
      drawTeardropBody(size, fillBody, fillOutline, fillHighlight);
      break;
    case "dome":
      drawDomeBody(size, fillBody, fillOutline, fillHighlight);
      break;
    case "tall_dome":
      drawTallDomeBody(size, fillBody, fillOutline, fillHighlight);
      break;
    case "creature":
      drawCreatureBody(size, fillBody, fillOutline, fillHighlight);
      break;
  }
}
function drawCircleBody(size, fill, outline, highlight) {
  const r = size;
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= r) {
        const x = CX + dx;
        const y = CY + dy;
        if (dist > r - 1.2) {
          outline(x, y);
        } else {
          fill(x, y);
        }
      }
    }
  }
  highlight(CX - r + 2, CY - r + 3);
  highlight(CX - r + 2, CY - r + 4);
  highlight(CX - r + 3, CY - r + 3);
}
function drawOvalTallBody(size, fill, outline, highlight) {
  const rx = size - 1;
  const ry = size + 2;
  for (let dy = -ry; dy <= ry; dy++) {
    for (let dx = -rx; dx <= rx; dx++) {
      const dist = dx * dx / (rx * rx) + dy * dy / (ry * ry);
      if (dist <= 1) {
        const x = CX + dx;
        const y = CY + dy;
        if (dist > 0.8) {
          outline(x, y);
        } else {
          fill(x, y);
        }
      }
    }
  }
  highlight(CX - rx + 2, CY - ry + 3);
  highlight(CX - rx + 2, CY - ry + 4);
  highlight(CX - rx + 3, CY - ry + 3);
}
function drawOvalWideBody(size, fill, outline, highlight) {
  const rx = size + 1;
  const ry = size - 2;
  for (let dy = -ry; dy <= ry; dy++) {
    for (let dx = -rx; dx <= rx; dx++) {
      const dist = dx * dx / (rx * rx) + dy * dy / (ry * ry);
      if (dist <= 1) {
        const x = CX + dx;
        const y = CY + dy;
        if (dist > 0.8) {
          outline(x, y);
        } else {
          fill(x, y);
        }
      }
    }
  }
  highlight(CX - rx + 2, CY - ry + 2);
  highlight(CX - rx + 2, CY - ry + 3);
  highlight(CX - rx + 3, CY - ry + 2);
}
function drawRoundedSquareBody(size, fill, outline, highlight) {
  const half = size;
  const r = 2;
  for (let dy = -half; dy <= half; dy++) {
    for (let dx = -half; dx <= half; dx++) {
      const ax = Math.max(0, Math.abs(dx) - (half - r));
      const ay = Math.max(0, Math.abs(dy) - (half - r));
      const cornerDist = Math.sqrt(ax * ax + ay * ay);
      if (cornerDist <= r) {
        const x = CX + dx;
        const y = CY + dy;
        const isEdge = Math.abs(dx) === half || Math.abs(dy) === half || cornerDist > r - 1.2 && ax > 0;
        if (isEdge) {
          outline(x, y);
        } else {
          fill(x, y);
        }
      }
    }
  }
  highlight(CX - half + 2, CY - half + 2);
  highlight(CX - half + 2, CY - half + 3);
  highlight(CX - half + 3, CY - half + 2);
}
function drawTeardropBody(size, fill, outline, highlight) {
  for (let dy = -size - 2; dy <= size; dy++) {
    const t = (dy + size + 2) / (size * 2 + 2);
    const width = Math.floor(size * Math.sin(t * Math.PI) * 1.2);
    for (let dx = -width; dx <= width; dx++) {
      const x = CX + dx;
      const y = CY + dy;
      if (Math.abs(dx) >= width - 1 || dy === -size - 2 || dy === size) {
        outline(x, y);
      } else {
        fill(x, y);
      }
    }
  }
  highlight(CX - 2, CY - size);
  highlight(CX - 2, CY - size + 1);
  highlight(CX - 1, CY - size);
}
function drawDomeBody(size, fill, outline, highlight) {
  const r = size;
  const bottomY = CY + Math.floor(r * 0.4);
  for (let dy = -r; dy <= 0; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= r) {
        const x = CX + dx;
        const y = CY + dy;
        if (dist > r - 1.2) {
          outline(x, y);
        } else {
          fill(x, y);
        }
      }
    }
  }
  for (let dy = 1; dy <= bottomY - CY; dy++) {
    const width = r;
    for (let dx = -width; dx <= width; dx++) {
      const x = CX + dx;
      const y = CY + dy;
      if (Math.abs(dx) >= width || dy === bottomY - CY) {
        outline(x, y);
      } else {
        fill(x, y);
      }
    }
  }
  highlight(CX - r + 2, CY - r + 2);
  highlight(CX - r + 2, CY - r + 3);
  highlight(CX - r + 3, CY - r + 2);
}
function drawTallDomeBody(size, fill, outline, highlight) {
  const rx = size - 1;
  const ry = size;
  const bottomY = CY + Math.floor(ry * 0.6);
  for (let dy = -ry; dy <= 0; dy++) {
    for (let dx = -rx; dx <= rx; dx++) {
      const dist = dx * dx / (rx * rx) + dy * dy / (ry * ry);
      if (dist <= 1) {
        const x = CX + dx;
        const y = CY + dy;
        if (dist > 0.82) {
          outline(x, y);
        } else {
          fill(x, y);
        }
      }
    }
  }
  for (let dy = 1; dy <= bottomY - CY; dy++) {
    const taper = 1 - dy / (bottomY - CY + 1);
    const width = Math.floor(rx * taper);
    for (let dx = -width; dx <= width; dx++) {
      const x = CX + dx;
      const y = CY + dy;
      if (Math.abs(dx) >= width || dy === bottomY - CY) {
        outline(x, y);
      } else {
        fill(x, y);
      }
    }
  }
  highlight(CX - rx + 2, CY - ry + 2);
  highlight(CX - rx + 2, CY - ry + 3);
  highlight(CX - rx + 3, CY - ry + 2);
}
function drawCreatureBody(size, fill, outline, highlight) {
  const r = size - 1;
  const bodyBottom = CY + r - 1;
  const bodyCY = CY - 1;
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= r) {
        const x = CX + dx;
        const y = bodyCY + dy;
        if (dist > r - 1.2) {
          outline(x, y);
        } else {
          fill(x, y);
        }
      }
    }
  }
  const legSpread = Math.floor(r * 0.5);
  for (const lx of [-legSpread, legSpread]) {
    for (let dy = 0; dy < 3; dy++) {
      outline(CX + lx - 1, bodyBottom + dy);
      fill(CX + lx, bodyBottom + dy);
      outline(CX + lx + 1, bodyBottom + dy);
    }
  }
  highlight(CX - r + 2, bodyCY - r + 2);
  highlight(CX - r + 2, bodyCY - r + 3);
  highlight(CX - r + 3, bodyCY - r + 2);
}
function getBodyBounds(shape, size) {
  switch (shape) {
    case "circle":
      return { top: CY - size, bottom: CY + size, eyeY: CY - 1 };
    case "oval_tall":
      return { top: CY - size - 2, bottom: CY + size + 2, eyeY: CY - 2 };
    case "oval_wide":
      return { top: CY - size + 2, bottom: CY + size - 2, eyeY: CY - 1 };
    case "rounded_square":
      return { top: CY - size, bottom: CY + size, eyeY: CY - 1 };
    case "teardrop":
      return { top: CY - size - 2, bottom: CY + size, eyeY: CY - 2 };
    case "dome":
      return { top: CY - size, bottom: CY + Math.floor(size * 0.4), eyeY: CY - 2 };
    case "tall_dome":
      return { top: CY - size, bottom: CY + Math.floor(size * 0.6), eyeY: CY - 3 };
    case "creature":
      return { top: CY - size, bottom: CY + size + 2, eyeY: CY - 2 };
  }
}

// src/parts/decoration.ts
var CX2 = 16;
function drawDecoration(frame, type, bodyTop, palette, oy) {
  switch (type) {
    case "none":
      break;
    case "halo":
      drawHalo(frame, bodyTop, palette, oy);
      break;
    case "horns":
      drawHorns(frame, bodyTop, palette, oy);
      break;
    case "antennae":
      drawAntennae(frame, bodyTop, palette, oy);
      break;
    case "hat":
      drawHat(frame, bodyTop, palette, oy);
      break;
    case "leaf":
      drawLeaf(frame, bodyTop, palette, oy);
      break;
    case "crown":
      drawCrown(frame, bodyTop, palette, oy);
      break;
    case "book":
      drawBook(frame, bodyTop, palette, oy);
      break;
  }
}
function drawHalo(frame, bodyTop, palette, oy) {
  const y = bodyTop - 2;
  for (let dx = -2; dx <= 2; dx++) {
    setPixel(frame, CX2 + dx, y + oy, palette.accent);
  }
  setPixel(frame, CX2 - 3, y + 1 + oy, palette.accent);
  setPixel(frame, CX2 + 3, y + 1 + oy, palette.accent);
}
function drawHorns(frame, bodyTop, palette, oy) {
  const y = bodyTop - 1;
  setPixel(frame, CX2 - 3, y + oy, palette.accent);
  setPixel(frame, CX2 - 4, y - 1 + oy, palette.accent);
  setPixel(frame, CX2 - 4, y - 2 + oy, palette.accent);
  setPixel(frame, CX2 + 3, y + oy, palette.accent);
  setPixel(frame, CX2 + 4, y - 1 + oy, palette.accent);
  setPixel(frame, CX2 + 4, y - 2 + oy, palette.accent);
}
function drawAntennae(frame, bodyTop, palette, oy) {
  const y = bodyTop;
  setPixel(frame, CX2 - 2, y - 1 + oy, palette.bodyDark);
  setPixel(frame, CX2 - 3, y - 2 + oy, palette.bodyDark);
  setPixel(frame, CX2 - 3, y - 3 + oy, palette.accent);
  setPixel(frame, CX2 + 2, y - 1 + oy, palette.bodyDark);
  setPixel(frame, CX2 + 3, y - 2 + oy, palette.bodyDark);
  setPixel(frame, CX2 + 3, y - 3 + oy, palette.accent);
}
function drawHat(frame, bodyTop, palette, oy) {
  const y = bodyTop - 1;
  for (let dx = -4; dx <= 4; dx++) {
    setPixel(frame, CX2 + dx, y + oy, palette.accent);
  }
  for (let dx = -2; dx <= 2; dx++) {
    setPixel(frame, CX2 + dx, y - 1 + oy, palette.accent);
    setPixel(frame, CX2 + dx, y - 2 + oy, palette.accent);
  }
}
function drawLeaf(frame, bodyTop, palette, oy) {
  const y = bodyTop - 1;
  setPixel(frame, CX2, y + oy, palette.bodyDark);
  setPixel(frame, CX2 - 1, y - 1 + oy, palette.accent);
  setPixel(frame, CX2, y - 1 + oy, palette.accent);
  setPixel(frame, CX2 + 1, y - 1 + oy, palette.accent);
  setPixel(frame, CX2, y - 2 + oy, palette.accent);
}
function drawCrown(frame, bodyTop, palette, oy) {
  const y = bodyTop - 1;
  for (let dx = -3; dx <= 3; dx++) {
    setPixel(frame, CX2 + dx, y + oy, palette.accent);
  }
  setPixel(frame, CX2 - 3, y - 1 + oy, palette.accent);
  setPixel(frame, CX2, y - 1 + oy, palette.accent);
  setPixel(frame, CX2 + 3, y - 1 + oy, palette.accent);
  setPixel(frame, CX2 - 3, y - 2 + oy, palette.accent);
  setPixel(frame, CX2, y - 2 + oy, palette.accent);
  setPixel(frame, CX2 + 3, y - 2 + oy, palette.accent);
}
function drawBook(frame, bodyTop, palette, oy) {
  const y = bodyTop - 1;
  for (let dx = -3; dx <= 3; dx++) {
    setPixel(frame, CX2 + dx, y + oy, palette.accent);
  }
  for (let dx = -2; dx <= 2; dx++) {
    setPixel(frame, CX2 + dx, y - 1 + oy, palette.accent);
  }
  setPixel(frame, CX2, y + oy, palette.bodyDark);
  setPixel(frame, CX2, y - 1 + oy, palette.bodyDark);
}

// src/parts/ears.ts
var CX3 = 16;
function drawEars(frame, type, bodyTop, bodySize, palette, oy) {
  switch (type) {
    case "none":
      break;
    case "pointed":
      drawPointedEars(frame, bodyTop, bodySize, palette, oy);
      break;
    case "round":
      drawRoundEars(frame, bodyTop, bodySize, palette, oy);
      break;
    case "long":
      drawLongEars(frame, bodyTop, bodySize, palette, oy);
      break;
    case "cat":
      drawCatEars(frame, bodyTop, bodySize, palette, oy);
      break;
  }
}
function drawPointedEars(frame, bodyTop, bodySize, palette, oy) {
  const earSpread = Math.floor(bodySize * 0.6);
  const y = bodyTop;
  setPixel(frame, CX3 - earSpread, y + oy, palette.body);
  setPixel(frame, CX3 - earSpread - 1, y - 1 + oy, palette.body);
  setPixel(frame, CX3 - earSpread - 2, y - 2 + oy, palette.bodyDark);
  setPixel(frame, CX3 - earSpread - 1, y - 2 + oy, palette.bodyDark);
  setPixel(frame, CX3 - earSpread, y - 1 + oy, palette.bodyDark);
  setPixel(frame, CX3 + earSpread, y + oy, palette.body);
  setPixel(frame, CX3 + earSpread + 1, y - 1 + oy, palette.body);
  setPixel(frame, CX3 + earSpread + 2, y - 2 + oy, palette.bodyDark);
  setPixel(frame, CX3 + earSpread + 1, y - 2 + oy, palette.bodyDark);
  setPixel(frame, CX3 + earSpread, y - 1 + oy, palette.bodyDark);
}
function drawRoundEars(frame, bodyTop, bodySize, palette, oy) {
  const earSpread = Math.floor(bodySize * 0.7);
  const y = bodyTop;
  for (const side of [-1, 1]) {
    const ex = CX3 + side * earSpread;
    setPixel(frame, ex, y - 2 + oy, palette.bodyDark);
    setPixel(frame, ex - 1, y - 1 + oy, palette.bodyDark);
    setPixel(frame, ex, y - 1 + oy, palette.body);
    setPixel(frame, ex + 1, y - 1 + oy, palette.bodyDark);
    setPixel(frame, ex, y + oy, palette.body);
    setPixel(frame, ex, y - 1 + oy, palette.accent);
  }
}
function drawLongEars(frame, bodyTop, bodySize, palette, oy) {
  const earSpread = Math.floor(bodySize * 0.5);
  const y = bodyTop;
  for (const side of [-1, 1]) {
    const ex = CX3 + side * earSpread;
    for (let dy = -5; dy <= -1; dy++) {
      setPixel(frame, ex, y + dy + oy, palette.body);
      setPixel(frame, ex + side, y + dy + oy, palette.bodyDark);
    }
    setPixel(frame, ex, y - 6 + oy, palette.bodyDark);
    setPixel(frame, ex, y - 3 + oy, palette.accent);
    setPixel(frame, ex, y - 4 + oy, palette.accent);
  }
}
function drawCatEars(frame, bodyTop, bodySize, palette, oy) {
  const earSpread = Math.floor(bodySize * 0.6);
  const y = bodyTop;
  for (const side of [-1, 1]) {
    const ex = CX3 + side * earSpread;
    setPixel(frame, ex, y + oy, palette.body);
    setPixel(frame, ex + side, y + oy, palette.body);
    setPixel(frame, ex, y - 1 + oy, palette.body);
    setPixel(frame, ex + side, y - 1 + oy, palette.bodyDark);
    setPixel(frame, ex + side * 2, y - 1 + oy, palette.bodyDark);
    setPixel(frame, ex + side, y - 2 + oy, palette.bodyDark);
    setPixel(frame, ex + side * 2, y - 2 + oy, palette.bodyDark);
    setPixel(frame, ex + side * 2, y - 3 + oy, palette.bodyDark);
    setPixel(frame, ex + side, y - 1 + oy, palette.accent);
  }
}

// src/seed.ts
function seedVariation(seed, index) {
  const h = (seed * 2654435761 + index * 340573321 >>> 0) % 1e3;
  return h / 1e3;
}
function seedOffset(seed, index, range) {
  return Math.floor(seedVariation(seed, index) * (range * 2 + 1)) - range;
}
function seedPick(seed, index, items) {
  const i = Math.floor(seedVariation(seed, index) * items.length);
  return items[i];
}
function seedRange(seed, index, min, max) {
  return min + Math.floor(seedVariation(seed, index) * (max - min + 1));
}
function seedBool(seed, index, probability = 0.5) {
  return seedVariation(seed, index) < probability;
}

// src/parts/effects.ts
function drawEffects(frame, animation, animFrame, eyeY, palette, seed, oy) {
  if (animation === "happy") {
    const cheekY = eyeY + 2;
    setPixel(frame, 10, cheekY + oy, "#FFAAAA");
    setPixel(frame, 22, cheekY + oy, "#FFAAAA");
  }
  const sp1x = 5 + seedOffset(seed, 30, 2);
  const sp1y = 6 + seedOffset(seed, 31, 2);
  const sp2x = 26 + seedOffset(seed, 32, 2);
  const sp2y = 10 + seedOffset(seed, 33, 2);
  if (animFrame % 4 < 2) {
    setPixel(frame, sp1x, sp1y + oy, palette.accent);
    setPixel(frame, sp2x, sp2y + oy, palette.accent);
  } else {
    setPixel(frame, sp1x + 1, sp1y + 1 + oy, palette.accent);
    setPixel(frame, sp2x - 1, sp2y + 1 + oy, palette.accent);
  }
}

// src/parts/eyes.ts
var CX4 = 16;
function drawEyes(frame, style, spread, eyeY, palette, animation, animFrame, oy) {
  const blink = animation === "idle" && animFrame === 3;
  const sleeping = animation === "sleep";
  if (sleeping) {
    drawSleepingEyes(frame, spread, eyeY, palette, animFrame, oy);
    return;
  }
  if (blink) {
    drawBlinkEyes(frame, style, spread, eyeY, palette, oy);
    return;
  }
  switch (style) {
    case "dot":
      drawDotEyes(frame, spread, eyeY, palette, oy);
      break;
    case "small":
      drawSmallEyes(frame, spread, eyeY, palette, oy);
      break;
    case "medium":
      drawMediumEyes(frame, spread, eyeY, palette, oy);
      break;
    case "large":
      drawLargeEyes(frame, spread, eyeY, palette, oy);
      break;
    case "cyclops":
      drawCyclopsEye(frame, eyeY, palette, oy);
      break;
  }
}
function drawSleepingEyes(frame, spread, eyeY, palette, animFrame, oy) {
  const lx = CX4 - spread;
  const rx = CX4 + spread;
  setPixel(frame, lx - 1, eyeY + oy, palette.eye);
  setPixel(frame, lx, eyeY + oy, palette.eye);
  setPixel(frame, rx, eyeY + oy, palette.eye);
  setPixel(frame, rx + 1, eyeY + oy, palette.eye);
  if (animFrame === 0) {
    setPixel(frame, CX4 + spread + 3, eyeY - 4 + oy, palette.accent);
    setPixel(frame, CX4 + spread + 4, eyeY - 5 + oy, palette.accent);
    setPixel(frame, CX4 + spread + 5, eyeY - 4 + oy, palette.accent);
  }
}
function drawBlinkEyes(frame, style, spread, eyeY, palette, oy) {
  if (style === "cyclops") {
    setPixel(frame, CX4, eyeY + oy, palette.eye);
    setPixel(frame, CX4 + 1, eyeY + oy, palette.eye);
  } else {
    setPixel(frame, CX4 - spread, eyeY + oy, palette.eye);
    setPixel(frame, CX4 + spread, eyeY + oy, palette.eye);
  }
}
function drawDotEyes(frame, spread, eyeY, palette, oy) {
  setPixel(frame, CX4 - spread, eyeY + oy, palette.eye);
  setPixel(frame, CX4 + spread, eyeY + oy, palette.eye);
}
function drawSmallEyes(frame, spread, eyeY, palette, oy) {
  setPixel(frame, CX4 - spread, eyeY + oy, palette.eye);
  setPixel(frame, CX4 - spread, eyeY + 1 + oy, palette.eye);
  setPixel(frame, CX4 + spread, eyeY + oy, palette.eye);
  setPixel(frame, CX4 + spread, eyeY + 1 + oy, palette.eye);
}
function drawMediumEyes(frame, spread, eyeY, palette, oy) {
  for (const ex of [CX4 - spread, CX4 + spread]) {
    setPixel(frame, ex, eyeY + oy, palette.eye);
    setPixel(frame, ex + 1, eyeY + oy, palette.eye);
    setPixel(frame, ex, eyeY + 1 + oy, palette.eye);
    setPixel(frame, ex + 1, eyeY + 1 + oy, palette.eye);
    setPixel(frame, ex, eyeY + oy, "#FFFFFF");
  }
}
function drawLargeEyes(frame, spread, eyeY, palette, oy) {
  for (const ex of [CX4 - spread - 1, CX4 + spread - 1]) {
    for (let dy = 0; dy < 3; dy++) {
      for (let dx = 0; dx < 2; dx++) {
        setPixel(frame, ex + dx, eyeY + dy + oy, palette.eye);
      }
    }
    setPixel(frame, ex, eyeY + oy, "#FFFFFF");
    setPixel(frame, ex + 1, eyeY + oy, "#FFFFFF");
  }
}
function drawCyclopsEye(frame, eyeY, palette, oy) {
  for (let dy = 0; dy < 3; dy++) {
    for (let dx = 0; dx < 3; dx++) {
      setPixel(frame, CX4 - 1 + dx, eyeY + dy + oy, palette.eye);
    }
  }
  setPixel(frame, CX4 - 1, eyeY + oy, "#FFFFFF");
  setPixel(frame, CX4, eyeY + oy, "#FFFFFF");
}

// src/parts/markings.ts
var CX5 = 16;
var CY2 = 16;
function drawMarkings(frame, pattern, palette, seed, oy) {
  const ox = seedOffset(seed, 10, 1);
  switch (pattern) {
    case 0:
      drawDots(frame, palette, ox, oy);
      break;
    case 1:
      drawStripe(frame, palette, ox, oy);
      break;
    case 2:
      drawPatch(frame, palette, ox, oy);
      break;
    case 3:
      drawSpeckles(frame, palette, seed, oy);
      break;
  }
}
function drawDots(frame, palette, ox, oy) {
  setPixel(frame, CX5 - 2 + ox, CY2 - 2 + oy, palette.bodyLight);
  setPixel(frame, CX5 + 2 + ox, CY2 + oy, palette.bodyLight);
  setPixel(frame, CX5 + ox, CY2 + 2 + oy, palette.bodyLight);
}
function drawStripe(frame, palette, ox, oy) {
  for (let dx = -2; dx <= 2; dx++) {
    setPixel(frame, CX5 + dx + ox, CY2 + 2 + oy, palette.bodyLight);
  }
}
function drawPatch(frame, palette, ox, oy) {
  setPixel(frame, CX5 + 1 + ox, CY2 + oy, palette.bodyLight);
  setPixel(frame, CX5 + 2 + ox, CY2 + oy, palette.bodyLight);
  setPixel(frame, CX5 + 1 + ox, CY2 + 1 + oy, palette.bodyLight);
  setPixel(frame, CX5 + 2 + ox, CY2 + 1 + oy, palette.bodyLight);
}
function drawSpeckles(frame, palette, seed, oy) {
  for (let i = 0; i < 4; i++) {
    const sx = CX5 + seedOffset(seed, 20 + i * 2, 3);
    const sy = CY2 + seedOffset(seed, 21 + i * 2, 3);
    setPixel(frame, sx, sy + oy, palette.bodyLight);
  }
}

// src/parts/mouth.ts
var CX6 = 16;
function drawMouth(frame, style, mouthY, palette, animation, oy) {
  if (animation === "sleep") return;
  if (animation === "happy") {
    drawSmileMouth(frame, mouthY, palette, oy);
    return;
  }
  if (animation === "sad") {
    drawSadMouth(frame, mouthY, palette, oy);
    return;
  }
  switch (style) {
    case "line":
      drawLineMouth(frame, mouthY, palette, oy);
      break;
    case "smile":
      drawSmileMouth(frame, mouthY, palette, oy);
      break;
    case "open":
      drawOpenMouth(frame, mouthY, palette, oy);
      break;
    case "none":
      break;
  }
}
function drawLineMouth(frame, mouthY, palette, oy) {
  setPixel(frame, CX6 - 1, mouthY + oy, palette.eye);
  setPixel(frame, CX6, mouthY + oy, palette.eye);
  setPixel(frame, CX6 + 1, mouthY + oy, palette.eye);
}
function drawSmileMouth(frame, mouthY, palette, oy) {
  setPixel(frame, CX6 - 1, mouthY + oy, palette.eye);
  setPixel(frame, CX6, mouthY + 1 + oy, palette.eye);
  setPixel(frame, CX6 + 1, mouthY + oy, palette.eye);
}
function drawSadMouth(frame, mouthY, palette, oy) {
  setPixel(frame, CX6 - 1, mouthY + 1 + oy, palette.eye);
  setPixel(frame, CX6, mouthY + oy, palette.eye);
  setPixel(frame, CX6 + 1, mouthY + 1 + oy, palette.eye);
}
function drawOpenMouth(frame, mouthY, palette, oy) {
  setPixel(frame, CX6 - 1, mouthY + oy, palette.eye);
  setPixel(frame, CX6, mouthY + oy, palette.eye);
  setPixel(frame, CX6 + 1, mouthY + oy, palette.eye);
  setPixel(frame, CX6, mouthY + 1 + oy, palette.eye);
}

// src/parts/tail.ts
var CX7 = 16;
function drawTail(frame, type, bodyBottom, bodySize, palette, oy) {
  switch (type) {
    case "none":
      break;
    case "bushy":
      drawBushyTail(frame, bodyBottom, bodySize, palette, oy);
      break;
    case "thin":
      drawThinTail(frame, bodyBottom, bodySize, palette, oy);
      break;
    case "curled":
      drawCurledTail(frame, bodyBottom, bodySize, palette, oy);
      break;
  }
}
function drawBushyTail(frame, bodyBottom, bodySize, palette, oy) {
  const tx = CX7 + bodySize;
  const ty = bodyBottom - 2;
  setPixel(frame, tx, ty + oy, palette.body);
  setPixel(frame, tx + 1, ty + oy, palette.body);
  setPixel(frame, tx + 1, ty - 1 + oy, palette.body);
  setPixel(frame, tx + 2, ty - 1 + oy, palette.body);
  setPixel(frame, tx + 2, ty - 2 + oy, palette.body);
  setPixel(frame, tx + 3, ty - 2 + oy, palette.body);
  setPixel(frame, tx + 3, ty - 3 + oy, palette.bodyLight);
  setPixel(frame, tx + 2, ty - 3 + oy, palette.bodyLight);
  setPixel(frame, tx + 4, ty - 3 + oy, palette.bodyDark);
  setPixel(frame, tx + 4, ty - 2 + oy, palette.bodyDark);
  setPixel(frame, tx + 3, ty - 1 + oy, palette.bodyDark);
  setPixel(frame, tx + 2, ty + oy, palette.bodyDark);
}
function drawThinTail(frame, bodyBottom, bodySize, palette, oy) {
  const tx = CX7 + bodySize;
  const ty = bodyBottom - 1;
  setPixel(frame, tx, ty + oy, palette.body);
  setPixel(frame, tx + 1, ty - 1 + oy, palette.body);
  setPixel(frame, tx + 2, ty - 2 + oy, palette.body);
  setPixel(frame, tx + 3, ty - 2 + oy, palette.bodyDark);
  setPixel(frame, tx + 3, ty - 3 + oy, palette.accent);
}
function drawCurledTail(frame, bodyBottom, bodySize, palette, oy) {
  const tx = CX7 + bodySize;
  const ty = bodyBottom - 2;
  setPixel(frame, tx, ty + oy, palette.body);
  setPixel(frame, tx + 1, ty + oy, palette.body);
  setPixel(frame, tx + 2, ty - 1 + oy, palette.body);
  setPixel(frame, tx + 2, ty - 2 + oy, palette.body);
  setPixel(frame, tx + 1, ty - 2 + oy, palette.body);
  setPixel(frame, tx + 1, ty - 3 + oy, palette.bodyDark);
  setPixel(frame, tx + 2, ty - 3 + oy, palette.accent);
}

// src/presets/baby.ts
function drawPresetBaby(frame, palette, animation, seed) {
  const result = createFrame();
  const bounce = animation === "happy" ? frame % 2 === 0 ? -2 : 0 : 0;
  const blink = animation === "idle" && frame === 3;
  const sleeping = animation === "sleep";
  const oy = bounce;
  const eyeSpread = seedOffset(seed, 0, 1);
  const markingY = 12 + seedOffset(seed, 1, 2);
  const markingX = 15 + seedOffset(seed, 2, 1);
  const hasMarking = seedVariation(seed, 3) > 0.4;
  for (let y = 10; y <= 24; y++) {
    const radius = y <= 14 ? y - 9 : y <= 20 ? 7 : 24 - y;
    const cx = 16;
    for (let x = cx - radius; x <= cx + radius; x++) {
      setPixel(result, x, y + oy, palette.body);
    }
  }
  if (hasMarking) {
    setPixel(result, markingX, markingY + oy, palette.bodyLight);
    setPixel(result, markingX + 1, markingY + oy, palette.bodyLight);
  }
  for (let x = 12; x <= 20; x++) setPixel(result, x, 9 + oy, palette.bodyDark);
  setPixel(result, 11, 10 + oy, palette.bodyDark);
  setPixel(result, 21, 10 + oy, palette.bodyDark);
  setPixel(result, 10, 11 + oy, palette.bodyDark);
  setPixel(result, 22, 11 + oy, palette.bodyDark);
  setPixel(result, 9, 13 + oy, palette.bodyDark);
  setPixel(result, 23, 13 + oy, palette.bodyDark);
  const leftEyeX = 13 + eyeSpread;
  const rightEyeX = 19 - eyeSpread;
  if (sleeping) {
    setPixel(result, leftEyeX, 16 + oy, palette.eye);
    setPixel(result, leftEyeX + 1, 15 + oy, palette.eye);
    setPixel(result, rightEyeX - 1, 16 + oy, palette.eye);
    setPixel(result, rightEyeX, 15 + oy, palette.eye);
    if (frame === 0) {
      setPixel(result, 24, 8, palette.accent);
      setPixel(result, 25, 7, palette.accent);
      setPixel(result, 26, 8, palette.accent);
    }
  } else if (blink) {
    setPixel(result, leftEyeX, 16 + oy, palette.eye);
    setPixel(result, rightEyeX, 16 + oy, palette.eye);
  } else {
    setPixel(result, leftEyeX, 15 + oy, palette.eye);
    setPixel(result, leftEyeX, 16 + oy, palette.eye);
    setPixel(result, rightEyeX, 15 + oy, palette.eye);
    setPixel(result, rightEyeX, 16 + oy, palette.eye);
  }
  if (animation === "happy") {
    setPixel(result, 15, 19 + oy, palette.eye);
    setPixel(result, 16, 20 + oy, palette.eye);
    setPixel(result, 17, 19 + oy, palette.eye);
  } else if (animation === "sad") {
    setPixel(result, 15, 20 + oy, palette.eye);
    setPixel(result, 16, 19 + oy, palette.eye);
    setPixel(result, 17, 20 + oy, palette.eye);
  } else if (!sleeping) {
    setPixel(result, 15, 19 + oy, palette.eye);
    setPixel(result, 16, 19 + oy, palette.eye);
    setPixel(result, 17, 19 + oy, palette.eye);
  }
  setPixel(result, 12, 12 + oy, palette.bodyLight);
  setPixel(result, 12, 13 + oy, palette.bodyLight);
  setPixel(result, 13, 12 + oy, palette.bodyLight);
  if (animation === "happy") {
    setPixel(result, 11, 17 + oy, "#FFAAAA");
    setPixel(result, 21, 17 + oy, "#FFAAAA");
  }
  return result;
}

// src/presets/child-balanced.ts
function drawPresetChildBalanced(frame, palette, animation, seed) {
  const result = createFrame();
  const bounce = animation === "happy" ? frame % 2 === 0 ? -1 : 0 : 0;
  const blink = animation === "idle" && frame === 3;
  const oy = bounce;
  for (let y = 8; y <= 24; y++) {
    const dist = Math.abs(y - 16);
    const radius = dist <= 2 ? 8 : 8 - (dist - 2);
    const cx = 16;
    for (let x = cx - radius; x <= cx + radius; x++) {
      setPixel(result, x, y + oy, palette.body);
    }
  }
  const haloOx = seedOffset(seed, 0, 1);
  const haloPixels = [
    [14 + haloOx, 6],
    [15 + haloOx, 5],
    [16 + haloOx, 5],
    [17 + haloOx, 5],
    [18 + haloOx, 6]
  ];
  for (const [x, y] of haloPixels) {
    setPixel(result, x, y + oy, palette.accent);
  }
  if (blink) {
    setPixel(result, 12, 15 + oy, palette.eye);
    setPixel(result, 13, 15 + oy, palette.eye);
    setPixel(result, 19, 15 + oy, palette.eye);
    setPixel(result, 20, 15 + oy, palette.eye);
  } else {
    for (const ex of [12, 19]) {
      setPixel(result, ex, 14 + oy, palette.eye);
      setPixel(result, ex + 1, 14 + oy, palette.eye);
      setPixel(result, ex, 15 + oy, palette.eye);
      setPixel(result, ex + 1, 15 + oy, palette.eye);
      setPixel(result, ex, 14 + oy, "#FFFFFF");
    }
  }
  setPixel(result, 15, 18 + oy, palette.eye);
  setPixel(result, 16, 18 + oy, palette.eye);
  setPixel(result, 10, 11 + oy, palette.bodyLight);
  setPixel(result, 10, 12 + oy, palette.bodyLight);
  setPixel(result, 11, 11 + oy, palette.bodyLight);
  const lo = seedOffset(seed, 1, 1);
  const lightPositions = [
    [[6 + lo, 10], [26 - lo, 12]],
    [[7 + lo, 9], [25 - lo, 13]],
    [[6 + lo, 10], [26 - lo, 12]],
    [[5 + lo, 11], [27 - lo, 11]]
  ];
  const lightPhase = frame % 4;
  for (const [lx, ly] of lightPositions[lightPhase]) {
    setPixel(result, lx, ly + oy, palette.accent);
  }
  return result;
}

// src/presets/child-diary.ts
function drawPresetChildDiary(frame, palette, animation, seed) {
  const result = createFrame();
  const bounce = animation === "happy" ? frame % 2 === 0 ? -1 : 0 : 0;
  const blink = animation === "idle" && frame === 3;
  const oy = bounce;
  for (let y = 7; y <= 25; y++) {
    const radius = y <= 12 ? y - 6 : y <= 20 ? 8 : 25 - y;
    const cx = 16;
    for (let x = cx - radius; x <= cx + radius; x++) {
      setPixel(result, x, y + oy, palette.body);
    }
  }
  for (let x = 12; x <= 19; x++) setPixel(result, x, 5 + oy, palette.accent);
  for (let x = 13; x <= 18; x++) setPixel(result, x, 4 + oy, palette.accent);
  setPixel(result, 15, 5 + oy, palette.bodyDark);
  setPixel(result, 16, 5 + oy, palette.bodyDark);
  if (blink) {
    setPixel(result, 12, 14 + oy, palette.eye);
    setPixel(result, 13, 14 + oy, palette.eye);
    setPixel(result, 19, 14 + oy, palette.eye);
    setPixel(result, 20, 14 + oy, palette.eye);
  } else {
    for (const ex of [12, 19]) {
      setPixel(result, ex, 13 + oy, palette.eye);
      setPixel(result, ex + 1, 13 + oy, palette.eye);
      setPixel(result, ex, 14 + oy, palette.eye);
      setPixel(result, ex + 1, 14 + oy, palette.eye);
      setPixel(result, ex, 13 + oy, "#FFFFFF");
    }
  }
  if (animation === "happy") {
    setPixel(result, 14, 17 + oy, palette.eye);
    setPixel(result, 15, 18 + oy, palette.eye);
    setPixel(result, 16, 18 + oy, palette.eye);
    setPixel(result, 17, 17 + oy, palette.eye);
  } else {
    setPixel(result, 15, 17 + oy, palette.eye);
    setPixel(result, 16, 17 + oy, palette.eye);
  }
  setPixel(result, 10, 10 + oy, palette.bodyLight);
  setPixel(result, 10, 11 + oy, palette.bodyLight);
  setPixel(result, 11, 10 + oy, palette.bodyLight);
  const px1 = 5 + seedOffset(seed, 0, 1);
  const py1 = 10 + seedOffset(seed, 1, 1);
  const px2 = 27 + seedOffset(seed, 2, 1);
  const py2 = 8 + seedOffset(seed, 3, 1);
  if (frame % 4 < 2) {
    setPixel(result, px1, py1 + oy, palette.accent);
    setPixel(result, px2, py2 + oy, palette.accent);
  }
  return result;
}

// src/presets/egg.ts
var EGG_OUTLINE = [
  [13, 8],
  [14, 8],
  [15, 8],
  [16, 8],
  [17, 8],
  [18, 8],
  [11, 9],
  [12, 9],
  [13, 9],
  [14, 9],
  [15, 9],
  [16, 9],
  [17, 9],
  [18, 9],
  [19, 9],
  [20, 9],
  [10, 10],
  [11, 10],
  [12, 10],
  [21, 10],
  [20, 10],
  [9, 11],
  [10, 11],
  [21, 11],
  [22, 11],
  [9, 12],
  [22, 12],
  [8, 13],
  [23, 13],
  [8, 14],
  [23, 14],
  [8, 15],
  [23, 15],
  [8, 16],
  [23, 16],
  [8, 17],
  [23, 17],
  [9, 18],
  [22, 18],
  [9, 19],
  [22, 19],
  [10, 20],
  [21, 20],
  [11, 21],
  [12, 21],
  [19, 21],
  [20, 21],
  [13, 22],
  [14, 22],
  [15, 22],
  [16, 22],
  [17, 22],
  [18, 22]
];
function drawPresetEgg(frame, palette, _animation, seed) {
  const result = createFrame();
  const wobble = frame % 4 === 1 ? 1 : frame % 4 === 3 ? -1 : 0;
  const ox = wobble;
  for (let y = 8; y <= 22; y++) {
    const rowPixels = EGG_OUTLINE.filter(([, py]) => py === y).map(([px]) => px);
    if (rowPixels.length >= 2) {
      const minX = Math.min(...rowPixels);
      const maxX = Math.max(...rowPixels);
      for (let x = minX; x <= maxX; x++) {
        setPixel(result, x + ox, y, palette.body);
      }
    }
  }
  for (const [x, y] of EGG_OUTLINE) {
    setPixel(result, x + ox, y, palette.bodyDark);
  }
  setPixel(result, 12 + ox, 11, palette.bodyLight);
  setPixel(result, 12 + ox, 12, palette.bodyLight);
  setPixel(result, 11 + ox, 12, palette.bodyLight);
  setPixel(result, 11 + ox, 13, palette.bodyLight);
  const sp1x = 6 + seedOffset(seed, 0, 1);
  const sp1y = 6 + seedOffset(seed, 1, 1);
  const sp2x = 25 + seedOffset(seed, 2, 1);
  const sp2y = 10 + seedOffset(seed, 3, 1);
  if (frame % 4 < 2) {
    setPixel(result, sp1x + ox, sp1y, palette.accent);
    setPixel(result, sp2x + ox, sp2y, palette.accent);
  } else {
    setPixel(result, sp1x + 1 + ox, sp1y + 1, palette.accent);
    setPixel(result, sp2x - 1 + ox, sp2y + 1, palette.accent);
  }
  return result;
}

// src/presets/index.ts
var PRESET_DRAWERS = {
  egg: drawPresetEgg,
  baby: drawPresetBaby,
  child_diary: drawPresetChildDiary,
  child_balanced: drawPresetChildBalanced
};
var PRESET_INFO = [
  { id: "egg", name: "Egg", description: "A wobbling egg with sparkles" },
  { id: "baby", name: "Baby", description: "A round spirit with expressive eyes" },
  { id: "child_diary", name: "Child Diary", description: "A knowledge spirit with a book motif" },
  {
    id: "child_balanced",
    name: "Child Balanced",
    description: "A harmony spirit with a halo accent"
  }
];
function getPresetDrawer(presetId) {
  return PRESET_DRAWERS[presetId];
}
function getPresets() {
  return [...PRESET_INFO];
}

// src/traits.ts
var BODY_SHAPES = [
  "circle",
  "oval_tall",
  "oval_wide",
  "rounded_square",
  "teardrop",
  "dome",
  "tall_dome",
  "creature"
];
var EYE_STYLES = ["dot", "small", "medium", "large", "cyclops"];
var MOUTH_STYLES = ["line", "smile", "open", "none"];
var DECORATIONS = [
  "none",
  "none",
  "halo",
  "horns",
  "antennae",
  "hat",
  "leaf",
  "crown",
  "book"
];
var EAR_TYPES = ["none", "none", "none", "pointed", "round", "long", "cat"];
var TAIL_TYPES = ["none", "none", "none", "bushy", "thin", "curled"];
function deriveTraits(seed, overrides) {
  const base = {
    bodyShape: seedPick(seed, 0, BODY_SHAPES),
    bodySize: seedRange(seed, 1, 6, 8),
    eyeStyle: seedPick(seed, 2, EYE_STYLES),
    eyeSpread: seedRange(seed, 3, 2, 5),
    mouthStyle: seedPick(seed, 4, MOUTH_STYLES),
    decoration: seedPick(seed, 5, DECORATIONS),
    earType: seedPick(seed, 8, EAR_TYPES),
    tailType: seedPick(seed, 9, TAIL_TYPES),
    hasMarkings: seedBool(seed, 6, 0.4),
    markingPattern: seedRange(seed, 7, 0, 3)
  };
  if (!overrides) return base;
  return { ...base, ...overrides };
}

// src/generate.ts
var ANIMATION_CONFIGS = {
  idle: { frames: 4, fps: 4, loop: true },
  happy: { frames: 4, fps: 8, loop: false },
  sad: { frames: 4, fps: 4, loop: false },
  sleep: { frames: 2, fps: 2, loop: true }
};
var ALL_PALETTE_IDS = [
  "red_light",
  "blue_light",
  "green_light",
  "yellow_light",
  "red_dark",
  "blue_dark",
  "green_dark",
  "yellow_dark"
];
function generateSpirit(options) {
  const { seed, animation = "idle", frame: animFrame = 0, preset } = options;
  const palette = resolveSpiritPalette(options, seed);
  if (preset) {
    const drawer = getPresetDrawer(preset);
    return drawer(animFrame, palette, animation, seed);
  }
  return generateProcedural(seed, palette, animation, animFrame, options);
}
function resolveSpiritPalette(options, seed) {
  if (options.customPalette) return options.customPalette;
  if (options.palette) return resolvePalette(options.palette);
  const paletteId = seedPick(seed, 100, ALL_PALETTE_IDS);
  return resolvePalette(paletteId);
}
function generateProcedural(seed, palette, animation, animFrame, options) {
  const traits = deriveTraits(seed, options.traits);
  const frame = createFrame();
  const bounce = animation === "happy" ? animFrame % 2 === 0 ? -1 : 0 : 0;
  const oy = bounce;
  drawBody(frame, traits.bodyShape, traits.bodySize, palette, oy);
  const bounds = getBodyBounds(traits.bodyShape, traits.bodySize);
  drawEars(frame, traits.earType, bounds.top, traits.bodySize, palette, oy);
  drawDecoration(frame, traits.decoration, bounds.top, palette, oy);
  drawEyes(
    frame,
    traits.eyeStyle,
    traits.eyeSpread,
    bounds.eyeY,
    palette,
    animation,
    animFrame,
    oy
  );
  const mouthY = bounds.eyeY + 4;
  drawMouth(frame, traits.mouthStyle, mouthY, palette, animation, oy);
  drawTail(frame, traits.tailType, bounds.bottom, traits.bodySize, palette, oy);
  if (traits.hasMarkings) {
    drawMarkings(frame, traits.markingPattern, palette, seed, oy);
  }
  drawEffects(frame, animation, animFrame, bounds.eyeY, palette, seed, oy);
  return frame;
}
function getAnimationConfig(animation) {
  return { ...ANIMATION_CONFIGS[animation] };
}
export {
  deriveTraits,
  generateSpirit,
  getAnimationConfig,
  getPalettes,
  getPresets
};
//# sourceMappingURL=index.js.map