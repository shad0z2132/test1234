/**
 * Global film-grain overlay.
 * SVG fractal-noise fixed to the viewport at 3% opacity, pointer-events: none.
 * Rendered once in the root layout so every page inherits the same tonality.
 */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-overlay"
      style={{ opacity: 0.03 }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="studio-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#studio-noise)" />
      </svg>
    </div>
  )
}
