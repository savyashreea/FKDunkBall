
import { _decorator, Component, Node, Vec3, tween, systemEvent, SystemEvent, CCFloat, RigidBodyComponent, math, Director, Quat, Collider, ICollisionEvent, CCObject, Scene, SceneAsset, find } from 'cc';
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

    @property
    isCollided = false;

    @property
    isRightBasketEnabled = true;

    private _rigidBody: RigidBodyComponent | undefined;
    
    

    onLoad () {
        console.log("Called on Load"+ this.isRightBasketEnabled);
          systemEvent.on(SystemEvent.EventType.MOUSE_DOWN, this.onMouseDown, this);
          systemEvent.on(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);

    }

    start () {
       this._rigidBody = this.node.getComponent(RigidBodyComponent);
       let collider = this.getComponent(Collider);
       collider.on('onCollisionStay', this.onCollision, this);
    }

    private onCollision (event: ICollisionEvent) {
        if(event.otherCollider.node.name=="ColliderForHoopRight" || event.otherCollider.node.name=="ColliderForHoopLeft"){
                console.log("COLLIDED");
                this._rigidBody?.setAngularVelocity(new math.Vec3(0,0,0));
                event.otherCollider.node.active= false;
                this.isCollided=true; 
                
        }
        if(this.isCollided){
            if(this.isRightBasketEnabled){
                var colliderForHoopRight= find("basketball_hoop_Right/ColliderForHoopRight");
                if(event.otherCollider.node.name=="Platform"){
                    console.log("COLLIDED with surface");
                    colliderForHoopRight.active= true;
                    this.isCollided=false; 
                    this.toggleBasket();
                }
            }
            else{
                var colliderForHoopLeft= find("basketball_hoop_Left/ColliderForHoopLeft");
                if(event.otherCollider.node.name=="Platform"){
                    console.log("COLLIDED with surface");
                    colliderForHoopLeft.active= true;
                    this.isCollided=false; 
                    this.toggleBasket();
                }
            }

        }
    }

    toggleBasket(){
        var rightBasket= find("basketball_hoop_Right");
        var leftBasket= find("basketball_hoop_Left");
        if(this.isRightBasketEnabled)
            this.enabledLeftBasket(rightBasket,leftBasket);
        else
            this.enabledRightBasket(rightBasket,leftBasket);
    }

    enabledRightBasket(rightBasket,leftBasket){
        leftBasket.active= false;
        rightBasket.active= true;
        this.isRightBasketEnabled= true;
    }
    enabledLeftBasket(rightBasket,leftBasket){
        
        console.log("Called enabledLeftBasket");
        leftBasket.active= true;
        rightBasket.active= false;
        this.isRightBasketEnabled= false;
    }
    
    onMouseDown(){
        //  tween(this.node)
        //     .to(this.jumpDuration, { position: new Vec3(this.node.getPosition().x, this.node.getPosition().y+this.jumpHeight, this.node.getPosition().z) }, { easing: 'cubicOut' })
        //     .to(this.jumpDuration, { position: new Vec3(this.node.getPosition().x, this.node.getPosition().y-this.jumpHeight, this.node.getPosition().z) }, { easing: 'cubicOut' })
        //     .union()
        //     .repeatForever()
        //     .start();
        console.log(this.isRightBasketEnabled)
        if(this.isRightBasketEnabled)
            this._rigidBody?.applyImpulse(new math.Vec3(3,60,0));
        else
            this._rigidBody?.applyImpulse(new math.Vec3(-3,60,0));
    }


    onTouchEnd(){
        //  tween(this.node)
        //     .to(this.jumpDuration, { position: new Vec3(this.node.getPosition().x, this.node.getPosition().y+this.jumpHeight, this.node.getPosition().z) }, { easing: 'cubicOut' })
        //     .to(this.jumpDuration, { position: new Vec3(this.node.getPosition().x, this.node.getPosition().y-this.jumpHeight, this.node.getPosition().z) }, { easing: 'cubicOut' })
        //     .union()
        //     .repeatForever()
        //     .start();
       // this._rigidBody?.applyImpulse(new math.Vec3(3,55,0));
        // this.node.setRotation(new math.Quat(0,-100,-100,0));
    }


    update (deltaTime: number) {
        if(this.node.getPosition().x>18){
             this._rigidBody?.setAngularVelocity(new math.Vec3(0,0,0));
        //     this._rigidBody?.setLinearVelocity(new math.Vec3(0,0,0));
            this.node.setPosition(new math.Vec3(-18,this.node.getPosition().y,5));
        }
        else if(this.node.getPosition().x<-18){
            this._rigidBody?.setAngularVelocity(new math.Vec3(0,0,0));
       //     this._rigidBody?.setLinearVelocity(new math.Vec3(0,0,0));
           this.node.setPosition(new math.Vec3(18,this.node.getPosition().y,5));
       }
        // console.log(this.node.getRotation().x,this.node.getRotation().y-100,this.node.getRotation().z-100,this.node.getRotation().w);
        // this.node.setRotation(new Quat(0,0,3.14/180*deltaTime));
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
