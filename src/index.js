import Phaser from 'phaser';
import Earth from './scenes/earth';
import Mars from './scenes/mars';
import Venus from './scenes/venus';
import Moon from './scenes/moon';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    dom: {
        createContainer: true
    },
    scene:  [
        Earth,
        Mars,
        Venus,
        Moon
    ],
    physics: {
        default: 'matter',
        matter: {
            gravity: {y: 1}
        }
    }
}

const game = new Phaser.Game(config);

