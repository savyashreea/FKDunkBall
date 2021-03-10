
import { _decorator, Component, Node, Vec3, tween, systemEvent, SystemEvent, CCFloat, RigidBodyComponent, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Jump')
export class Jump extends Component {
    // [1]
    // dummy = '';

    // [2]
    @property(CCFloat)
    jumpHeight: number= 0;

    @property(CCFloat)
    jumpDuration: number= 0;
    
    

    onLoad () {
          systemEvent.on(SystemEvent.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    start () {
        var _rigidBody = this.node.getComponent(RigidBodyComponent)
        _rigidBody.applyImpulse(new math.Vec3(0,1000,0));
    }
    onMouseDown(){
        console.log("MOUSE down");
        //  tween(this.node)
        //     .to(this.jumpDuration, { position: new Vec3(this.node.getPosition().x, this.node.getPosition().y+this.jumpHeight, this.node.getPosition().z) }, { easing: 'cubicOut' })
        //     .to(this.jumpDuration, { position: new Vec3(this.node.getPosition().x, this.node.getPosition().y-this.jumpHeight, this.node.getPosition().z) }, { easing: 'cubicOut' })
        //     .union()
        //     .repeatForever()
        //     .start();
        
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}


function v3_0(v3_0: any) {
    throw new Error('Function not implemented.');
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
