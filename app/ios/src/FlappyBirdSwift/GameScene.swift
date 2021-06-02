//
//  GameScene.swift
//  Flappy
//
//  Created by Leoraten on 15/2/28.
//  Copyright (c) 2015年 Leoraten. All rights reserved.
//

import SpriteKit

class GameScene: SKScene, SKPhysicsContactDelegate {
    
    var bird = SKSpriteNode()
    var bg = SKSpriteNode()
    var pipe1 = SKSpriteNode()
    var pipe2 = SKSpriteNode()
    var gameover = 0
    var movingObjects = SKNode()
    
    let birdGroup:UInt32 = 1
    let objectGroup:UInt32 = 2
    
    override func didMoveToView(view: SKView) {
        
        /* Setup your scene here */
        
        self.physicsWorld.contactDelegate = self
        self.addChild(movingObjects)
        //bird
        let birdTexture1 = SKTexture(imageNamed: "flappy1.png")
        let birdTexture2 = SKTexture(imageNamed: "flappy2.png")
 
        let animation = SKAction.animateWithTextures([birdTexture1,birdTexture2], timePerFrame: 0.1)
        let makeBirdFly = SKAction.repeatActionForever(animation)
        bird = SKSpriteNode(texture: birdTexture1)
        bird.position = CGPoint(x: CGRectGetMidX(self.frame), y: CGRectGetMidY(self.frame))
        bird.runAction(makeBirdFly)
        bird.zPosition = 10
        bird.physicsBody = SKPhysicsBody(circleOfRadius: bird.size.height/2)
        bird.physicsBody?.dynamic = true
        bird.physicsBody?.allowsRotation = false
        bird.physicsBody?.categoryBitMask = birdGroup
        bird.physicsBody?.collisionBitMask = objectGroup
        bird.physicsBody?.contactTestBitMask = objectGroup
        
        self.addChild(bird)
        //background
        
        let bgTexture = SKTexture(imageNamed: "bg.png")
        let movebg = SKAction.moveByX(-bgTexture.size().width,y:0,duration:9)
        let replacebg = SKAction.moveByX(bgTexture.size().width,y:0,duration:0)
        let movebgForever = SKAction.repeatActionForever(SKAction.sequence([movebg,replacebg]))
        for var i:CGFloat = 0; i < 3; i++ {
            bg = SKSpriteNode(texture: bgTexture)
            bg.position = CGPoint(x: bgTexture.size().width/2 + bgTexture.size().width * i, y: CGRectGetMidY(self.frame))
            bg.size.height = self.frame.height
            bg.runAction(movebgForever)
            bg.physicsBody?.categoryBitMask = objectGroup
            self.movingObjects.addChild(bg)
            
            }
        
       /* bg = SKSpriteNode(texture: bgTexture)
        bg.position = CGPoint(x: CGRectGetMidX(self.frame), y: CGRectGetMidY(self.frame))
        bg.size.height = self.frame.height
        bg.runAction(movebgForever)
        self.addChild(bg)*/
        
        //Ground
        let ground = SKNode()
        ground.position = CGPointMake(0, 0)
        ground.physicsBody = SKPhysicsBody(rectangleOfSize: CGSizeMake(self.frame.width * 2, 1))
        ground.physicsBody?.dynamic = false
        
        self.movingObjects.addChild(ground)
        
        var timer = NSTimer.scheduledTimerWithTimeInterval(3, target: self, selector: Selector("makepipes"),userInfo:nil, repeats: true)
        
        self.makepipes()
        
    }
    
    func makepipes(){
        //pipe
        let gapHeight = bird.size.height * 4
        
        let moveAmount = arc4random() %  UInt32(self.frame.size.height/2 - gapHeight/2)
        let offset = CGFloat(moveAmount) - self.frame.size.height/4
        
        print("\(offset)")
        
        let movepipes = SKAction.moveByX(-self.frame.size.width * 2, y: 0, duration: NSTimeInterval(self.frame.size.width/100))
        let removePipes = SKAction.removeFromParent()
        let moveAndRemovePipes = SKAction.sequence([movepipes,removePipes])
        
        
        let pipe1Texture = SKTexture(imageNamed: "pipe1.png")
        pipe1 = SKSpriteNode(texture: pipe1Texture)
        pipe1.position =  CGPoint(x: CGRectGetMidX(self.frame) + self.frame.size.width , y: (CGRectGetMidX(self.frame)) + pipe1.size.height/2 + gapHeight/2 + offset)
        
        pipe1.physicsBody = SKPhysicsBody(rectangleOfSize: pipe1.size)
        pipe1.physicsBody?.dynamic = false
        
        pipe1.runAction(moveAndRemovePipes)
        self.movingObjects.addChild(pipe1)
        
        
        let pipe2Texture = SKTexture(imageNamed: "pipe2.png")
        pipe2 = SKSpriteNode(texture: pipe2Texture)
        pipe2.position =  CGPoint(x: CGRectGetMidX(self.frame) + self.frame.size.width, y: (CGRectGetMidX(self.frame)) - pipe2.size.height/2 - gapHeight/2 + offset)
        pipe2.physicsBody = SKPhysicsBody(rectangleOfSize: pipe2.size)
        pipe2.physicsBody?.dynamic = false
        pipe2.runAction(moveAndRemovePipes)
        
        
        self.movingObjects.addChild(pipe2)
        
    }
    func didBeginContact(contact: SKPhysicsContact) {
        print("contact")
        gameover = 1;
        movingObjects.speed = 0
    }
    
    override func touchesBegan(touches: Set<UITouch>, withEvent: UIEvent?) {
        /* Called when a touch begins */
        bird.physicsBody?.velocity = CGVectorMake(0, 0)
        bird.physicsBody?.applyImpulse(CGVectorMake(0, 50))
    }
   
    override func update(currentTime: CFTimeInterval) {
        /* Called before each frame is rendered */
    }
}
