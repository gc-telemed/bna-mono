/**
 * Ridgelines for the drawn landscapes (Himalaya.astro, NepalSection.astro). Everything runs at
 * build time from fixed seeds, so every build draws the same mountains.
 */

/** The landscapes' drawing space; the SVGs crop the top 150 units of sky. */
export const SCENE_W = 1600;
export const SCENE_H = 720;

/** A small deterministic generator. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** A ridgeline by midpoint displacement between fixed peaks, closed to the bottom edge. */
export function ridge(seed: number, anchors: [number, number][], rough: number, depth: number) {
  const r = rng(seed);
  let pts = anchors.map(([x, y]) => [x, y] as [number, number]);
  let spread = rough;
  for (let d = 0; d < depth; d++) {
    const next: [number, number][] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i]!;
      const [x2, y2] = pts[i + 1]!;
      next.push([x1, y1]);
      next.push([(x1 + x2) / 2, (y1 + y2) / 2 + (r() - 0.5) * spread]);
    }
    next.push(pts[pts.length - 1]!);
    pts = next;
    spread *= 0.55;
  }
  const line = pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L');
  return `M${line}L${SCENE_W} ${SCENE_H}L0 ${SCENE_H}Z`;
}
