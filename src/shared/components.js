export const body = (
  position={x:0, y:0, z:0},
  rotation={x:0, y:0, z:0}
) => ({ position, rotation })

export const velocity = (
  linear={x:0, y:0, z:0},
  angular={x:0, y:0, z:0}
) => ({ linear, angular })

export const collision = (
  colliding={
    left: false, right: false,
    back: false, front: false,
    top: false, bottom: false
  }
) => ({colliding})

export const gravity = () => ({})

export const jump = (jumping=false, start=0) => ({jumping, start})

export const block = (type=0) => ({ type })
