import Noise from 'shared/noise';

export default class World {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.depth = 50;
    this.blocks = this.generate();
  }

  update() {
  }

  generate() {
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
    for (let x = 0; x < this.width; x++) {
      blocks.push([]);
      for (let y = 0; y < this.height; y++) {
        blocks[x].push([]);
        for(let z = 0; z < this.depth; z++) {
          let type;
          if(y > 10) type = 0; //air above 100 blocks
          else type = this.calculateTypeFromDensity(noise.perlin3(x/10,y/10,z/10));
          blocks[x][y][z] = type;
        }
      }
    }
    return require('ndarray-pack')(blocks);
  }

  calculateTypeFromDensity(density) {
    if(density < .15) return 0;
    return 1;
  }

  get(x,y,z) {
    return this.blocks.get(x,y,z);
  }

  set(x,y,z) {
    return this.blocks.set(x,y,z);
  }

  index(x,y,z) {
    return this.blocks.index(x,y,z);
  }
}
