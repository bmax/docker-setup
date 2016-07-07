import Noise from 'shared/noise';

export const World = {
  generate(world) {
    let noise = new Noise();
    let blocks = [];
      /*[
        [1,1,1],
        [1,1,1],
        [1,1,1]
      ],
      [
        [1,1,1],
        [1,1,1],
        [1,1,1]
      ],
      [
        [1,1,1],
        [1,1,1],
        [1,1,1]
      ]
    ];*/
    for (let x = 0; x < world.width; x++) {
      blocks.push([]);
      for (let y = 0; y < world.height; y++) {
        blocks[x].push([]);
        for(let z = 0; z < world.depth; z++) {
          let type;
          if(y > 10) type = 0; //air above 100 blocks
          else type = this.calculateTypeFromDensity(noise.perlin3(x/10,y/10,z/10));
          blocks[x][y][z] = type;
        }
      }
    }
    return require('ndarray-pack')(blocks);
  },

  calculateTypeFromDensity(density) {
    if(density < .15) return 0;
    return 1;
  }
}
