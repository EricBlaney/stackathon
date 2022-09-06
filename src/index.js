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

let text;
let timedEvent;

function create() {
    this.add.image(400, 300, 'sky');
 
    this.matter.world.setBounds();

    const canDrag = this.matter.world.nextGroup();

    const ball1 = this.matter.add.image(48, 46, 'ball', null, { chamfer: 16 }).setBounce(0.7).setCollisionGroup(canDrag);
    const ground1 = this.matter.add.image(400, 600, 'ground').setScale(3).setStatic(true);
    this.matter.add.mouseSpring({ length: 1, stiffness: 0.6, collisionFilter: { group: canDrag } });

    
    text = this.add.text(400,32)
    timedEvent = this.time.addEvent({ delay: 5000, timeScale: 0.93 });


    ball1.setInteractive();

    ball1.on('pointerup', function(){
        timedEvent = this.time.addEvent({
            delay: 5000,
            timeScale: 0.93
        })
    },this)

    this.matter.world.on('collisionstart', function (event, ball1, ground1) {
        timedEvent['paused'] = true ;
        console.log('hit');
    })



}



function update() {
    let progress = timedEvent.getProgress() * 5;
    text.setText('Fall time: ' + progress.toString().substr(0, 4) + 's');

}
