export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface SceneBeat {
  id: string
  /** DOM attribute value this beat binds to: elements are matched via `[data-beat="<id>"]`. */
  cameraFrom: Vec3
  cameraTo: Vec3
  lookAtFrom: Vec3
  lookAtTo: Vec3
}

/**
 * Declarative list of the Home scroll journey's camera "beats" — pure data, no
 * DOM/GSAP wiring here. HomeCanvasExperience matches each beat to a `[data-beat]`
 * section via ScrollTrigger and lerps the shared camera + this beat's uniforms
 * toward cameraFrom→cameraTo / lookAtFrom→lookAtTo as that section scrubs 0..1.
 */
// Each later beat's content is physically staged at its own X offset (see
// HomeCanvasExperience) so the camera dollies sideways to arrive at it — beats
// never overlap in space, no opacity-crossfade hacks needed.
export const PARTICLES_STAGE_X = 6
export const PROJECTS_STAGE_X = 13

export const SCENE_BEATS: SceneBeat[] = [
  {
    id: 'avatar',
    cameraFrom: { x: 0.6, y: 0.1, z: 3.4 },
    cameraTo: { x: 0, y: 0, z: 2.4 },
    lookAtFrom: { x: 0.15, y: 0, z: 0 },
    lookAtTo: { x: 0, y: 0, z: 0 },
  },
  {
    id: 'particles',
    cameraFrom: { x: PARTICLES_STAGE_X, y: 0.3, z: 5.5 },
    cameraTo: { x: PARTICLES_STAGE_X - 0.3, y: 0, z: 4.2 },
    lookAtFrom: { x: PARTICLES_STAGE_X, y: 0.2, z: 0 },
    lookAtTo: { x: PARTICLES_STAGE_X, y: 0, z: 0 },
  },
  {
    id: 'projects',
    cameraFrom: { x: PROJECTS_STAGE_X, y: 0.4, z: 5.2 },
    cameraTo: { x: PROJECTS_STAGE_X, y: 0, z: 3.6 },
    lookAtFrom: { x: PROJECTS_STAGE_X, y: 0, z: 0 },
    lookAtTo: { x: PROJECTS_STAGE_X, y: 0, z: 0 },
  },
]
