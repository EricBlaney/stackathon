import Phaser from 'phaser';
import sky from './assets/skyRuler.png';
import ground from './assets/Ground.png';
import ball from './assets/ball.png';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    dom: {
        createContainer: true
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'matter'
    }
}

const game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', sky);
    this.load.image('ground', ground);
    this.load.image('ball', ball);
}

let platforms;
let player;
function create() {
    this.add.image(400, 300, 'sky');
 
    this.matter.world.setBounds();

    const canDrag = this.matter.world.nextGroup();

    this.matter.add.image(48, 46, 'ball', null, { chamfer: 16 }).setBounce(0.7).setCollisionGroup(canDrag);
    this.matter.add.image(400, 599, 'ground').setScale(3).setStatic(true);
    this.matter.add.mouseSpring({ length: 1, stiffness: 0.6, collisionFilter: { group: canDrag } });
}

function update() {

}