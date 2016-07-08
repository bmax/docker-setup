'use strict'

import THREE from 'three';
import Stats from 'stats.js';
import path  from 'path';
import { World } from './world';
import { World as ServerWorld } from 'server/world';
import Keyboard from './keyboard';
import * as UI from './ui/ui';
import * as Loader from './loader';
import * as Entities from './entities';
import * as Camera   from './systems/camera';
import * as Render   from './systems/render';
import Input    from './systems/input';
import Physics  from './systems/physics';
import Collision from './systems/collision';
import Movement from 'shared/systems/movement'
import Jump     from 'shared/systems/jump';
import Gravity  from 'shared/systems/gravity';

export default class Client {
  constructor() {
    this.stats     = this.setupStats();
    this.ui        = this.setupUI();
    this.keyboard  = this.setupKeyboard();
    this.textures  = this.setupTextures();
    this.scene     = this.setupScene();
    this.world     = this.setupWorld();
    this.camera    = this.setupCamera();
    this.renderer  = this.setupRenderer();
    this.container = this.setupContainer();
    this.entities  = this.setupEntities();
    this.player    = this.setupPlayers();

    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    window.addEventListener('resize', this.onWindowResize, false);
    this.lastLog = Math.floor(Date.now() / 1000);
  }

  setupUI() {
    this.messages = [
      {time: '10:02:11', sender: 'Djinn21', message: 'Let go adventuring sometime', style: {color: 'red'}},
      {time: '10:03:32', sender: 'Porlas', message: 'Yo anyone wanna come chill later', style: {color: 'blue'}}
    ];

    let ui = {
      chat: {
        messages: this.messages,
        sendMessage: this.sendMessage
      },
      power: {
        level: 100
      },
      inventory: {
        items: [{
          name: "thing"
        }]
      },
      menu: {
        show: false
      },
      dev: {
        show: true,
        render: this.stats.render.dom,
        game: this.stats.game.dom
      }
    };
    return ui;
  }

  sendMessage(message) {
    this.messages.push({time: '11:11:11', sender: "kale", message: message, style: {color: 'green'}});
  }

  setupStats() {
    let stats = {};
    stats.game = new Stats();
    stats.render = new Stats();
    stats.game.dom.style.cssText = 'z-index:10000;margin-left:20px';
    stats.render.dom.style.cssText = 'z-index:10000;margin-left:20px';
    stats.game.showPanel(0);
    stats.render.showPanel(0);
    return stats;
  }

  setupTextures() {
    return {
      block: Loader.blockTexture()
    }
  }

  setupWorld() {
    // Get the world from server eventually
    let world = {
      width: 50,
      height: 10,
      depth: 50
    };
    world.blocks = ServerWorld.generate(world);
    world.mesh = World.createMesh(world, this.textures.block);

    // wireframe
    let helper = new THREE.EdgesHelper(world.mesh, 0xffffff); // or THREE.WireframeHelper
    helper.material.linewidth = 2;
    this.scene.add(helper);
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
    let container = document.getElementById('three');
    container.innerHTML = "";
    container.appendChild(this.renderer.domElement);

    return container;
  }

  setupEntities() {
    return [];
  }

  setupPlayers() {
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
    this.stats.game.begin();
    this.updateInput();
    this.updateWorld();
    this.updateMovement();
    this.updatePhysics();
    this.updateCollision();
    this.updateGravity();
    this.updateJump();
    this.stats.game.end();
    this.log();
  }

  updateInput() {
    this.entities = Input.update(this.entities, this.keyboard);
  }

  updateWorld() {
    // map update may eventually take input components to check for
    // actions that would change the map.
    //this.world = this.world.update();

    // collision debugging
    this.world.mesh.material.color.set( 0x0000ff );
  }

  updateMovement() {
    this.entities = Movement.update(this.entities);
  }

  updatePhysics() {
    this.entities = Physics.update(this.entities);
  }

  updateCollision() {
    this.entities = Collision.update(this.entities, this.world);
  }

  updateGravity() {
    this.entities = Gravity.update(this.entities);
  }

  updateJump() {
    this.entities = Jump.update(this.entities);
  }

  render() {
    requestAnimationFrame(this.render);
    this.stats.render.begin();
    this.updateCamera();
    this.updateScene();
    UI.render(this.ui);
    Render.render(this.renderer, this.scene, this.camera);
    this.stats.render.end();
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
