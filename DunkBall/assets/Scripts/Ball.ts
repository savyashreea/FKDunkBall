
import { _decorator, Component, Node, BoxCollider, CollisionCallback, ColliderComponent, SystemEvent, systemEvent, SystemEventType, EventKeyboard, macro, math, RigidBodyComponent, clamp, EventTouch, RigidBody } from 'cc';
const { ccclass, property } = _decorator;

const v3_0 = new math.Vec3();
const v3_1 = new math.Vec3();
const v2_0 = new math.Vec2();

enum EKey {
    NONE = 0,
    W = 1 << 0,
    A = 1 << 1,
    S = 1 << 2,
    D = 1 << 3,
    SHIFT = 1 << 4,
}
@ccclass('Ball')
export class Ball extends Component {
    // [1]
    // dummy = '';

    // [2]
    @property
    public readonly shiftScale = 2;
    public _rigidBody!: RigidBodyComponent;

    private _key: number = EKey.NONE;
    // serializableDummy = 0;

    
    start () {
        this._rigidBody = this.getComponent(RigidBodyComponent);
    }
    update (dt: number) {
        if (this._key & EKey.W) {
            v3_0.z = 100;
        }
        if (this._key & EKey.S) {
            v3_0.z = -100;
        }
        if (this._key & EKey.A) {
            v3_0.x = 100;
        }
        if (this._key & EKey.D) {
            v3_0.x = -100;
        }
        if (this._key & EKey.SHIFT) {
            v3_0.multiplyScalar(this.shiftScale);
        }

        if (v3_0.z != 0 || v3_0.x != 0) {
            this._rigidBody.applyImpulse(v3_0);
            v3_0.set(0, 0, 0);
            this._rigidBody.getLinearVelocity(v3_1);
            v3_1.x = clamp(v3_1.x, -4, 4);
            v3_1.y = clamp(v3_1.y, -4, 4);
            v3_1.z = clamp(v3_1.z, -4, 4);
            this._rigidBody.setLinearVelocity(v3_1);
        }
    }
    onEnable () {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);

    }
    onDisable () {
        systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEventType.KEY_UP, this.onKeyUp, this);

    }


    onKeyDown (event: EventKeyboard) {
        if (event.keyCode == macro.KEY.w) {
            this._key |= EKey.W;
        } else if (event.keyCode === macro.KEY.s) {
            this._key |= EKey.S;
        } else if (event.keyCode === macro.KEY.a) {
            this._key |= EKey.A;
        } else if (event.keyCode === macro.KEY.d) {
            this._key |= EKey.D;
        } else if (event.keyCode === macro.KEY.shift) {
            this._key |= EKey.SHIFT;
        }
    }
    onKeyUp (event: EventKeyboard) {
        if (event.keyCode == macro.KEY.w) {
            this._key &= ~EKey.W;
        } else if (event.keyCode === macro.KEY.s) {
            this._key &= ~EKey.S;
        } else if (event.keyCode === macro.KEY.a) {
            this._key &= ~EKey.A;
        } else if (event.keyCode === macro.KEY.d) {
            this._key &= ~EKey.D;
        } else if (event.keyCode === macro.KEY.shift) {
            this._key &= ~EKey.SHIFT;
        }
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
