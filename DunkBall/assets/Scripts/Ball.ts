
import { _decorator, Component, Node, CCLoader, CCObject, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ball')
export class Ball extends Component {
    // [1]
    // dummy = '';

    // [2]
   @property
    // serializableDummy = 0;
    

    start () {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    
    }
    
    onTouchStart(touch: Touch){
        this.node.setPosition(10,100,0);
    }
    
    update (deltaTime: number) {
        this.node.setPosition(-10,-100*deltaTime,0);
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
