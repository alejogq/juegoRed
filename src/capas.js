var MenuCapa = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
		this.audioEngine = cc.audioEngine;
		this.audioEngine.playMusic(res.musica_escena_2,true);
        var size = cc.winSize;
        var helloLabel = new cc.LabelTTF("Red Sentir", "Arial", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        this.addChild(helloLabel, 5);
        this.sprite = new cc.Sprite(res.inicio);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        backgroundLayer = cc.LayerColor.create(new cc.Color(200,100,40,255),size.width, size.height);
        this.addChild(backgroundLayer);
        this.addChild(this.sprite, 0);
		cc.eventManager.addListener({
        	event:cc.EventListener.MOUSE,
        	onMouseDown:function(event){
				energia=100;
				puntage = 0;
				cc.director.runScene(new JuegoEscena());
        	}
        },this)
        return true;
    }
});

var PuntageCapa = cc.Layer.extend({
    ctor:function () {
		this._super();
		altura = cc.winSize.height - 40;
		var energiaTitulo = new cc.LabelTTF("Energía :", "Arial", 18);
		energiaTitulo.x = 50;
		energiaTitulo.y = altura;
		energiaValor = new cc.LabelTTF(energia, "Arial", 18);
		energiaValor.x = 100;
		energiaValor.y = altura;
		var puntageTitulo = new cc.LabelTTF("Puntaje :", "Arial", 18);
		puntageTitulo.x = 180;
		puntageTitulo.y = altura;
		puntageValor = new cc.LabelTTF(puntage, "Arial", 18);
		puntageValor.x = 250;
		puntageValor.y = altura;
		this.addChild(energiaTitulo);
		this.addChild(energiaValor);
		this.addChild(puntageTitulo);
		this.addChild(puntageValor);
	}
});

var JuegoCapa = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        this.audioEngine = cc.audioEngine;
        this.audioEngine.playMusic(res.musica_escena_2,true);
        //cargar las fuentes
        cache = cc.spriteFrameCache;
        cache.addSpriteFrames(res.hamsterplist, res.hamster);
        
        
        // Create sprite and set attributes
        var mostafa = cc.Sprite.create(cache.getSpriteFrame("hamster1.png"));
        var size = cc.winSize;
        mostafa.attr({
            x: size.width / 3,
            y: size.height / 3,
            scale: 0.5,
            rotation: 0
        });
        this.addChild(mostafa, 0);        
        // Load sprite frames to frame cache, add texture node
        cc.spriteFrameCache.addSpriteFrames(res.hamsterplist);
        var mostafaTexture = cc.textureCache.addImage(cache.getSpriteFrame("hamster1.png")),
        mostafaImages  = cc.SpriteBatchNode.create(mostafaTexture);
        this.addChild(mostafaImages);
        
        var animFrames = [];
        var str = "";
        for (var i = 1; i < 9; i++) {
        str = "hamster" + (i < 9 ? (i) : i) + ".png";
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(spriteFrame, 1, null);
        animFrames.push(animFrame);
        }
        var animation = cc.Animation.create(animFrames, 0.08, 100);
        var animate   = cc.Animate.create(animation); 
        
        mostafa.runAction(animate,cc.RepeatForever());
        //end animation       
        
        
        
        this.scheduleUpdate();
        cc.eventManager.addListener({
        	event:cc.EventListener.MOUSE,
        	onMouseDown:function(event){
        		ovulo.encendido = true;
        	},
        	onMouseUp:function(event){
        		ovulo.encendido = false;
        	}
        },this)
        this.schedule(this.agregarEsperma,0.5);
    },
    agregarEsperma:function(event){
    	var esperma = new Esperma();
    	this.addChild(esperma,1);
    },
    update:function(){
            //fondo.mover();
            //ovulo.caer();
            puntage += 1;
            puntageValor.setString(puntage);
            energiaValor.setString(energia);
    }
});
