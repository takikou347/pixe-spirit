import type { BodyShape, ColorPalette, SpiritFrame } from "../types.js";
import { setPixel } from "../frame.js";

const CX = 16;
const CY = 16;

/**
 * Draw a body shape on the frame and return the filled pixel coordinates
 * so other parts know where the body is.
 */
export function drawBody(
  frame: SpiritFrame,
  shape: BodyShape,
  size: number,
  palette: ColorPalette,
  oy: number,
): void {
  const fillBody = (x: number, y: number) => {
    setPixel(frame, x, y + oy, palette.body);
  };
  const fillOutline = (x: number, y: number) => {
    setPixel(frame, x, y + oy, palette.bodyDark);
  };
  const fillHighlight = (x: number, y: number) => {
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
  }
}

type FillFn = (x: number, y: number) => void;

function drawCircleBody(size: number, fill: FillFn, outline: FillFn, highlight: FillFn) {
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

function drawOvalTallBody(size: number, fill: FillFn, outline: FillFn, highlight: FillFn) {
  const rx = size - 1;
  const ry = size + 2;
  for (let dy = -ry; dy <= ry; dy++) {
    for (let dx = -rx; dx <= rx; dx++) {
      const dist = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
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

function drawOvalWideBody(size: number, fill: FillFn, outline: FillFn, highlight: FillFn) {
  const rx = size + 1;
  const ry = size - 2;
  for (let dy = -ry; dy <= ry; dy++) {
    for (let dx = -rx; dx <= rx; dx++) {
      const dist = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
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

function drawRoundedSquareBody(size: number, fill: FillFn, outline: FillFn, highlight: FillFn) {
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
        const isEdge =
          Math.abs(dx) === half || Math.abs(dy) === half || (cornerDist > r - 1.2 && ax > 0);
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

function drawTeardropBody(size: number, fill: FillFn, outline: FillFn, highlight: FillFn) {
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

/** Get the vertical center and top of the body for positioning other parts. */
export function getBodyBounds(
  shape: BodyShape,
  size: number,
): { top: number; bottom: number; eyeY: number } {
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
  }
}
