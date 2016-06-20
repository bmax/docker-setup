'use strict'

import THREE from 'three';
import Stats from 'stats.js';
import path  from 'path';
import World from './world';
import Keyboard from './keyboard';
import * as Loader from './loader';
import * as Entities from './entities';
import * as Camera   from './systems/camera';
import * as Render   from './systems/render';
import * as Input    from './systems/input';
import * as Physics  from './systems/physics';
import * as Movement from 'shared/systems/movement'

export default class Client {
  constructor() {
    this.stats     = this.setupStats();
    this.keyboard  = this.setupKeyboard();
    this.textures  = this.setupTextures();
    this.scene     = this.setupScene();
    this.world     = this.setupWorld();
    this.camera    = this.setupCamera();
    this.renderer  = this.setupRenderer();
    this.container = this.setupContainer();
    this.entities  = this.setupEntities();
    this.player    = this.setupPlayer();

    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    window.addEventListener('resize', this.onWindowResize, false);
    this.lastLog = Math.floor(Date.now() / 1000);
  }

  setupStats() {
    let stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    return stats;
  }

  setupTextures() {
    return {
      block: Loader.blockTexture()
    }
  }

  setupWorld() {
    let world = new World(this.textures.block);
    this.scene.add(world.mesh);
    return world;
  }

  setupKeyboard() {
    return new Keyboard();
  }

  setupScene() {
    let ambientLight = new THREE.AmbientLight(0xcccccc);
    let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set( 1, 1, 0.5 ).normalize();

    let scene = new THREE.Scene();
    scene.add(ambientLight);
    scene.add(directionalLight);
    return scene;
  }

  setupCamera() {
    return new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
  }

  setupRenderer() {
    let renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(0xbfd1e5);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
  }

  setupContainer() {
    let container = document.getElementById('client');
    container.innerHTML = "";
    container.appendChild(this.renderer.domElement);

    return container;
  }

  setupEntities() {
    return [];
  }

  setupPlayer() {
    let player = Entities.localPlayer();
    this.addEntity(player);
    this.scene.add(player.mesh.mesh);
    return player.id;
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  start() {
    this.update();
    requestAnimationFrame(this.render);
  }

  update() {
    setTimeout(this.update, 20);
    this.updateInput();
    this.updateWorld();
    this.updateMovement();
    this.updatePhysics();
    const player = this.entities.find(e => e.id === this.player);
    console.log(player.mesh.mesh.position, player.body.position);
    this.log();
  }

  updateInput() {
    this.entities = Input.update(this.keyboard, this.entities);
  }

  updateWorld() {
    // map update may eventually take input components to check for
    // actions that would change the map.
    //this.world = this.world.update();
  }

  updateMovement() {
    this.entities = Movement.update(this.entities);
  }

  updatePhysics() {
    //eventually return a new world as well
    this.entities = Physics.update(this.world, this.entities);
  }

  render() {
    requestAnimationFrame(this.render);
    this.stats.begin();
    this.updateCamera();
    this.updateScene();
    Render.render(this.renderer, this.scene, this.camera);
    this.stats.end();
  }

  updateCamera() {
    Camera.update(this.camera, this.entities.find(e => e.id === this.player).mesh.mesh);
  }

  updateScene() {
    if(this.world.dirty) {
      this.scene.remove(this.scene.getObjectByName('world'));
      this.scene.add(this.world.mesh);
    }
  }

  log() {
    let now = Math.floor(Date.now() / 1000);
    if(now > this.lastLog + 5) {
      console.log(this.entities);
      this.lastLog = now;
    }
  }

  onWindowResize() {
    //RenderSystem.handleResize(this.renderer);
  }
}
