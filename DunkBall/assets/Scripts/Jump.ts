
import { _decorator, Component, Node, Vec3, tween, systemEvent, SystemEvent, CCFloat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Jump')
export class Jump extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    private _pos: Vec3 = new Vec3(0, 0, 0);

    onLoad () {
        // [3]
        this.node.on(Node.EventType.MOUSE_DOWN, () => {
            // tween(this.node)
            // .to(3, { position: new Vec3(this.node.getPosition().x, this.node.getPosition().y+10, this.node.getPosition().z) }, { easing: 'bounceInOut' })
            // .union()
            // .repeat(2) // execute 2 times
            // .start();
            console.log("MOUSE down");
          }, this);
          systemEvent.on(SystemEvent.EventType.MOUSE_DOWN, this.onMouseDown, this);
       
    }
    onMouseDown(){
        console.log("MOUSE down");
         tween(this.node)
            .to(1, { position: new Vec3(this.node.getPosition().x, this.node.getPosition().y+50, this.node.getPosition().z) }, { easing: 'cubicOut' })
            .to(2, { position: new Vec3(this.node.getPosition().x, this.node.getPosition().y-50, this.node.getPosition().z) }, { easing: 'cubicOut' })
            .union()
            .repeatForever()
            .start();

        
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
