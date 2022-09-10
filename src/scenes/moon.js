import Phaser from 'phaser';
import moon from '../assets/moon.png';
import ground from '../assets/Ground.png';
import ball from '../assets/ball.png';
import moon_text from '../assets/moon_text.png';
import feather from '../assets/feather.png';
import earth_button from '../assets/earth_button.png';
import mars_button from '../assets/mars_button.png';
import moon_button from '../assets/moon_button.png';
import venus_button from '../assets/venus_button.png';

class Moon extends Phaser.Scene {
    constructor() {
        super({key: 'Moon',
        physics: {
            default: 'matter',
            matter: {
                gravity: {y: 0.22}
            }
        }
    });
    }
    preload() {
        this.load.image('moon_sky', moon);
        this.load.image('ground', ground);
        this.load.image('ball', ball); 
        this.load.image('moon_text', moon_text);
        this.load.image('feather', feather);
        this.load.image('earth_button', earth_button);
        this.load.image('mars_button', mars_button);
        this.load.image('moon_button', moon_button);
        this.load.image('venus_button', venus_button);
    }

    
    
    create() {

        this.background = this.add.image(400, 300, 'moon_sky');
        this.earth_button = this.add.image(700, 300, 'earth_button').setScale(0.4);
        this.mars_button = this.add.image(700, 340, 'mars_button').setScale(0.4);
        this.moon_button = this.add.image(700, 380, 'moon_button').setScale(0.4);
        this.venus_button = this.add.image(700, 420, 'venus_button').setScale(0.4);
        this.moon_text = this.add.image(200, 50, 'moon_text').setScale(0.35);
        this.matter.world.setBounds();
    
        this.canDrag = this.matter.world.nextGroup();
    
        this.ball1 = this.matter.add.image(48, 46, 'ball', null, { chamfer: 16 }).setBounce(0.7).setCollisionGroup(this.canDrag);
        this.ground1 = this.matter.add.image(400, 600, 'ground').setScale(3).setStatic(true);
        this.matter.add.mouseSpring({ length: 1, stiffness: 0.6, collisionFilter: { group: this.canDrag } });
    
        
        this.text = this.add.text(490,28).setScale(1.3);
        this.timedEvent = this.time.addEvent({ delay: 5000, timeScale: 0.93 });
        this.feather1 = this.matter.add.image(150, 46, 'feather', null, {chamfer: 16}).setBounce(0).setCollisionGroup(this.canDrag)
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
            this.scene.stop();
        }, this)
        this.earth_button.on('pointerdown', function(){
            this.scene.start('Earth');
            this.scene.stop();
        }, this)
        this.moon_button.on('pointerdown', function(){
            this.scene.start('Moon');

        }, this)
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
    
    this.earth_button.on('pointerover', function(){
        this.earth_button.alpha = 0.7;

    }, this)
    this.earth_button.on('pointerout', function() {
        this.earth_button.alpha = 1;
    }, this)
    this.mars_button.on('pointerover', function(){
        this.mars_button.alpha = 0.7;

    }, this)
    this.mars_button.on('pointerout', function() {
        this.mars_button.alpha = 1;
    }, this)
    this.moon_button.on('pointerover', function(){
        this.moon_button.alpha = 0.7;

    }, this)
    this.moon_button.on('pointerout', function() {
        this.moon_button.alpha = 1;
    }, this)
    this.venus_button.on('pointerover', function(){
        this.venus_button.alpha = 0.7;

    }, this)
    this.venus_button.on('pointerout', function() {
        this.venus_button.alpha = 1;
    }, this)
    }
    
    
    
    update() {
        let progress = this.timedEvent.getProgress() * 5;
        this.text.setText('Ball fall time: ' + progress.toString().substr(0, 4) + 's');
        let featherProgress = this.timedEventFeather.getProgress() * 5;
        this.text2.setText('Feather fall time: ' + featherProgress.toString().substr(0, 4) + 's' )
    }
    
    

}

export default Moon;