import Phaser from 'phaser';
import perserverance from '../assets/perseverance.png';
import ground from '../assets/Ground.png';
import ball from '../assets/ball.png';
import mars_text from '../assets/mars_text.png'
import feather from '../assets/feather.png'

class Mars extends Phaser.Scene {
    constructor() {
        super({key: 'Mars',
        physics: {
            default: 'matter',
            matter: {
                gravity: {y: 0.46}
            }
        }
    });
    }
    preload() {
        this.load.image('mars_sky', perserverance);
        this.load.image('ground', ground);
        this.load.image('ball', ball); 
        this.load.image('mars_text', mars_text);
        this.load.image('feather', feather);
    }

    
    
    create() {

        this.background = this.add.image(400, 300, 'mars_sky');
        this.earth_button = this.add.text(600, 300, 'Earth', {fontSize: '24px'}).setPadding({x: 5 , y:5}).setStyle({ backgroundColor: 'blue'});
        this.mars_button = this.add.text(600, 335, 'Mars', {fontSize: '24px'}).setPadding({left: 5, right: 20 , y:5}).setStyle({backgroundColor: 'red'});
        this.moon_button = this.add.text(600, 370, 'Moon', {fontSize: '24px'}).setPadding({left: 5 ,right: 20, y:5}).setStyle({backgroundColor: 'gray'});
        this.venus_button = this.add.text(600, 405, '????', {fontSize: '24px'}).setPadding({left: 5 , right:20, y:5}).setStyle({backgroundColor: 'purple'});
        this.mars_text = this.add.image(200, 50, 'mars_text').setScale(0.35);
        this.matter.world.setBounds();
        this.canDrag = this.matter.world.nextGroup();
    
        this.ball1 = this.matter.add.image(48, 46, 'ball', null, { chamfer: 16 }).setBounce(0.7).setCollisionGroup(this.canDrag);
        this.ground1 = this.matter.add.image(400, 600, 'ground').setScale(3).setStatic(true);
        this.matter.add.mouseSpring({ length: 1, stiffness: 0.6, collisionFilter: { group: this.canDrag } });
    
        
        this.text = this.add.text(490,28).setScale(1.3);
        this.timedEvent = this.time.addEvent({ delay: 5000, timeScale: 0.93 });
        
        this.feather1 = this.matter.add.image(150, 46, 'feather', null, {chamfer: 16}).setBounce(0).setCollisionGroup(this.canDrag).setFrictionAir(0.015);
        this.text2 = this.add.text(490,56).setScale(1.3);
        this.feather1.setInteractive();
        this.feather1.on('pointerup', function(){
    
            this.timedEventFeather = this.time.addEvent({
                delay: 5000,
                timeScale: 0.93
            })
        },this);
    
        this.ball1.setInteractive();
    
        this.ball1.on('pointerup', function(){
    
                this.timedEvent = this.time.addEvent({
                    delay: 5000,
                    timeScale: 0.93
                })
    
    
        },this)

        this.mars_button.setInteractive();
        this.earth_button.setInteractive();
        this.moon_button.setInteractive();
        this.venus_button.setInteractive();
        this.mars_button.on('pointerdown', function(){
            this.scene.start('Mars');

        }, this);
        this.earth_button.on('pointerdown', function(){
            this.scene.start('Earth');
            this.scene.stop();
        }, this);
        this.moon_button.on('pointerdown', function(){
            this.scene.start('Moon');
            this.scene.stop();
        }, this);
        this.venus_button.on('pointerdown', function(){
            this.scene.start('Venus');
            this.scene.stop();
        }, this)
    
    

        this.timedEventFeather = this.time.addEvent({ delay: 5000, timeScale: 0.93 });
        this.matter.world.on('collisionstart', function(event) {
            if ( this.feather1.body.position.y > 550 && this.ball1.body.position.y < 550 ) {
                this.timedEventFeather['paused'] = true;
            } else if ( this.ball1.body.position.y > 550 && this.feather1.body.position.y < 550 ){
                this.timedEvent['paused'] = true ;
            } else {
                this.timedEvent['paused'] = true ;
                this.timedEventFeather['paused'] = true;
            }
    }, this)
    
    }
    
    
    
    update() {
        let progress = this.timedEvent.getProgress() * 5;
        this.text.setText('Fall time: ' + progress.toString().substr(0, 4) + 's');
        let featherProgress = this.timedEventFeather.getProgress() * 5;
        this.text2.setText('Feather fall time: ' + featherProgress.toString().substr(0, 4) + 's' )
    }
    
    

}

export default Mars;