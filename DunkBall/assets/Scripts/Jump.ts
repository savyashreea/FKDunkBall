
import { _decorator, Component, Node, Vec3, tween, systemEvent, SystemEvent, CCFloat, RigidBodyComponent, math, Director, Quat, Collider, ICollisionEvent, CCObject, Scene, SceneAsset, find, Label, random, ProgressBar, Tween, director } from 'cc';
const { ccclass, property } = _decorator;

enum GameState{
    GS_INIT,
    GS_PLAYING,
    GS_END,
};

@ccclass('Jump')
export class Jump extends Component {
    // [1]
    // dummy = '';

    // [2]
    @property(CCFloat)
    jumpHeight: number= 0;

    @property(CCFloat)
    jumpDuration: number= 0;

    @property(CCFloat)
    progressTimerIncrement: number= 0;

    @property
    isCollided = false;

    @property
    gameStarted = false;

    @property
    isRightBasketEnabled = true;

    @property(CCFloat)
    score: number= 0;

    @property({type: Label})
    public scoreLabel: Label|null = null;

    @property({type: Node})
    public rightBasket: Node|null = null;

    
    @property({type: Node})
    public leftBasket: Node|null = null;

    @property({type: Node})
    public colliderForHoopRight: Node|null = null;

    @property({type: Node})
    public colliderForHoopLeft: Node|null = null;

    private currentState: GameState = GameState.GS_INIT;
    private _rigidBody: RigidBodyComponent | undefined;
   
    @property({type: Node})
    public startMenu: Node |null = null;

    @property({type: Node})
    public GameOverMenu: Node |null = null;

    @property(ProgressBar)
    timer: ProgressBar |null = null;
  
   
    onLoad () {
         this.toggleBasket();   
    }

    start () {
        this.curState = GameState.GS_INIT; //initialize game state to GS_INIT
        this.setInputActive(false);

        this.scoreLabel.string = 'Score '+ this.score;
        
        this._rigidBody = this.node.getComponent(RigidBodyComponent);

        let collider = this.getComponent(Collider);
        collider.on('onCollisionStay', this.onCollision, this);
    }

    // to change game states
    set curState (value: GameState) {
        switch(value) {
            case GameState.GS_INIT:
                this.init();
                break;
            case GameState.GS_PLAYING:
                if (this.startMenu) {
                    this.startMenu.active = false;
                }
                setTimeout(() => {
                    this.setInputActive(true);
                    this.gameStarted=true;
                }, 0.1);
                console.log("game playing");
                break;
            case GameState.GS_END:
                this.setInputActive(false);
                if (this.GameOverMenu) {
                    this.GameOverMenu.active = true;
                }
                break;
        }
        this.currentState = value;
      }

    onStartButtonClicked() {
        this.curState = GameState.GS_PLAYING;
    }

    onReplayButtonClicked() {
        if (this.GameOverMenu) {
            this.GameOverMenu.active = false;
        }
    }

    init() {
        if (this.startMenu) {
            this.startMenu.active = true;
        }
    }

    setInputActive(active: boolean) {
        if (active) {
            systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseDown, this);
        } else {
            systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.onMouseDown, this);
        }
    }

    private onCollision (event: ICollisionEvent) {
        if(event.otherCollider.node.name=="Platform"){
            this.node.setPosition(new math.Vec3(this.node.getPosition().x,this.node.getPosition().y,5)); // to stay on z=5 after bounicing

        }

        if(event.otherCollider.node.name=="ColliderForHoopRight" || event.otherCollider.node.name=="ColliderForHoopLeft"){
                //console.log("COLLIDED");
                this._rigidBody?.setLinearVelocity(new math.Vec3(0,0,0));
                event.otherCollider.node.active= false;
                this.isCollided=true; 
                this.onGoal();
                
        }
        if(this.isCollided){
            if(this.isRightBasketEnabled){
               // var colliderForHoopRight= find("basketball_hoop_Right/ColliderForHoopRight");
                if(event.otherCollider.node.name=="Platform"){
                    //console.log("COLLIDED with surface");
                    this.colliderForHoopRight.active= true;
                    this.isCollided=false; 
                    this.toggleBasket();
                }
            }
            else{
                //var colliderForHoopLeft= find("basketball_hoop_Left/ColliderForHoopLeft");
                if(event.otherCollider.node.name=="Platform"){
                   // console.log("COLLIDED with surface");
                    this.colliderForHoopLeft.active= true;
                    this.isCollided=false; 
                    this.toggleBasket();
                }
            }

        }
    }
    onGoal(){
        this.updateScore(++this.score);
        this.progressTimerIncrement+=20;
        if (this.progressTimerIncrement>100){
            this.progressTimerIncrement=100;
        }
    }

    toggleBasket(){
        var basketHeight=(math.random()*(35-15)+15).toFixed(2);

        if(this.isRightBasketEnabled)
            this.enabledLeftBasket(basketHeight);
        else
            this.enabledRightBasket(basketHeight);
    }

    enabledRightBasket(basketHeight: string){
        this.leftBasket.active= false;
        this.rightBasket.active= true;
        this.rightBasket.setPosition(this.rightBasket.getPosition().x,basketHeight,this.rightBasket.getPosition().z);
        this.isRightBasketEnabled= true;
    }
    enabledLeftBasket(basketHeight: string){
        console.log("Called enabledLeftBasket");
        this.leftBasket.active= true;
        this.rightBasket.active= false;
        this.leftBasket.setPosition( this.leftBasket.getPosition().x,basketHeight,this.leftBasket.getPosition().z);
        this.isRightBasketEnabled= false;
    }

    updateScore(score: number){
        console.log(score);
        this.scoreLabel.string = 'Score '+ score;
    }
    
    onMouseDown(){
        console.log(this.isRightBasketEnabled)
        tween(this.timer?.node)
            .to(0.25, { scale: new Vec3(1,2,1) }, { easing: 'cubicOut' })
            .to(0.5, { scale: new Vec3(1,1,1) }, { easing: 'cubicOut' })
            .repeatForever()
            .start();
        if(this.isRightBasketEnabled)
            this._rigidBody?.applyImpulse(new math.Vec3(4,55,0));
        else
            this._rigidBody?.applyImpulse(new math.Vec3(-4,55,0));
    }


    onTouchEnd(){
       
    }


    update (deltaTime: number) {
        if(this.gameStarted)
             this.progress_bar_update();
        if(this.node.getPosition().x>18){
             this._rigidBody?.setAngularVelocity(new math.Vec3(0,0,0));
            this.node.setPosition(new math.Vec3(-18,this.node.getPosition().y,5));
        }
        else if(this.node.getPosition().x<-18){
            this._rigidBody?.setAngularVelocity(new math.Vec3(0,0,0));
           this.node.setPosition(new math.Vec3(18,this.node.getPosition().y,5));
       }
    }


    progress_bar_update(){
    this.progressTimerIncrement-=0.03;// This sentence can be placed after the bubble is generated and before the function to update the progress bar is called. Since there is no function to generate the bubble, it is temporarily placed here, and it does not affect the use

    let update_fillRange =this.timer?.progress;
    //console.log(this.progressTimerIncrement);
    if(update_fillRange > 0){
      update_fillRange = 1 / 100 * this.progressTimerIncrement
      
    } 
    else {
      update_fillRange = 0
      
    }
    this.timer.progress = update_fillRange //update_fillRange After the value is calculated, it needs to be re-assigned to the fillRange property of the Sprite component. This is very important (I have ignored this. If there is no assignment, the component's fillRange property value will not be updated, and the progress bar will not go.
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


