// クロンダイク
window.onload = function(){
main();
};

function main(){
	var canvas = document.getElementById("canvas0");
  var canvas2 = document.getElementById("canvas2");//
  var canvas5 = document.getElementById("canvas5");//イベントキャッチ/カーソル/create
	if ( ! canvas || ! canvas.getContext ) { return false; }
	var cx = canvas.getContext("2d");
  var cx2 = canvas2.getContext("2d");
var stage = new createjs.Stage("canvas5");//Stage
if (createjs.Touch.isSupported() == true) {
createjs.Touch.enable(stage);//タップに対応する
}
stage.enableMouseOver();
//アップデートする
createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.addEventListener("tick",function(){
    stage.update();
});
//bgm 使用時のループ設定など
class Music extends Howl {
  constructor (data, debugStart=0) {
    const params = {
      src: [data.src],
      volume:[data.volume]*vBar,
      preload: false,
      // オーデイオスプライト設定
      sprite: {
        start: [debugStart, data.loopEnd-debugStart],
        loop: [data.loopStart, data.loopEnd - data.loopStart, true],
      },
    };
    super(params);
    this.load();
  }
  playMusic () {
    this.play("start");
    this.once('end', ()=> {
      console.log('bgm loop!');
      this.play("loop");
    });
  }
}
//☆
var graphics;
graphics=new createjs.Graphics();
graphics
  .beginRadialGradientFill(["white","orange"],[0.0,1.0],0,0,20,0,0,100)
  .drawPolyStar(0, 0, 50, 5, 0.4, -90);
var Cstar = new createjs.Shape(graphics);
  Cstar.x=100;
  Cstar.y=225;
var deckmap = new createjs.Container();//山札
var field = new createjs.Container();//メイン
var clearBG = new createjs.Container();//clear画面
var yakumap = new createjs.Container();//ヒントボタン等
var Titleyard = new createjs.Container();//タイトル
var Roomyard = new createjs.Container();//おへや
var Backyard = new createjs.Container();//背景
var Configmap = new createjs.Container();//scoreのボタン
var Loadmap = new createjs.Container();//ダイアログ
//コンテナを順に追加
stage.addChild(Backyard);
stage.addChild(Roomyard);
stage.addChild(Titleyard);
stage.addChild(field);
stage.addChild(deckmap);
stage.addChild(yakumap);
stage.addChild(clearBG);
stage.addChild(Configmap);
stage.addChild(Loadmap);
//設定
var dragPointX;
var dragPointY;
var debugmode=false;//出荷時にfalseにする
var cLock=true;//true->操作可能
var opLock=0;// optionを開いている間など 0->操作可能 -1->gamestartまで 10->×ボタンを禁止する
var mLock=true;//deckめくっている最中falseとする
var gamestate=-1;//-1:load中 10:title 0:now playing 1:game over
var startT = 0;
var clearT = 0;
var hour = 0;
var min = 0;
var sec = 0;
var datet =0;
//たいとるがめん
var yakumap_hint = new createjs.Bitmap("soL_hint.png");
yakumap_hint.alpha=0;
yakumap_hint.scale=0.6;
yakumap_hint.x=720;
yakumap_hint.y=75;
var yakumap_undo = new createjs.Bitmap("soL_undo.png");
yakumap_undo.alpha=0;
yakumap_undo.scale=0.6;
yakumap_undo.x=720;
yakumap_undo.y=140;
var yakumap_reset = new createjs.Bitmap("soL_retry.png");
yakumap_reset.alpha=0
yakumap_reset.scale=0.6;
yakumap_reset.x=720;
yakumap_reset.y=205;
var yakumap_solve = new createjs.Bitmap("soL_new.png");
yakumap_solve.alpha=0
yakumap_solve.scale=0.6;
yakumap_solve.x=720;
yakumap_solve.y=270;
yakumap.addChild(yakumap_hint);
yakumap.addChild(yakumap_undo);
yakumap.addChild(yakumap_reset);
yakumap.addChild(yakumap_solve);
var yakumap_rule = new createjs.Bitmap("soL_rule1.png");
yakumap_rule.alpha=0;
yakumap.addChild(yakumap_rule)
var clear_1 = new createjs.Bitmap("soL_clear_1.png");
var clear_3 = new createjs.Bitmap("soL_clear_3.png");
var clear_4 = new createjs.Bitmap("soL_clear_4.png");
var retry_bt = new createjs.Bitmap("soL_retry_bt.png");
var retry_bt3 = new createjs.Bitmap("soL_retry_bt3.png");
//データベース
var Card_src= new Array('Card_images/BackColor_Black.png','Card_images/Spade01_classic.png','Card_images/Spade02_classic.png','Card_images/Spade03_classic.png','Card_images/Spade04_classic.png','Card_images/Spade05_classic.png','Card_images/Spade06_classic.png','Card_images/Spade07_classic.png','Card_images/Spade08_classic.png','Card_images/Spade09_classic.png','Card_images/Spade10_classic.png','Card_images/Spade11_classic.png','Card_images/Spade12_classic.png','Card_images/Spade13_classic.png','Card_images/Heart01_classic.png','Card_images/Heart02_classic.png','Card_images/Heart03_classic.png','Card_images/Heart04_classic.png','Card_images/Heart05_classic.png','Card_images/Heart06_classic.png','Card_images/Heart07_classic.png','Card_images/Heart08_classic.png','Card_images/Heart09_classic.png','Card_images/Heart10_classic.png','Card_images/Heart11_classic.png','Card_images/Heart12_classic.png','Card_images/Heart13_classic.png','Card_images/Club01_classic.png','Card_images/Club02_classic.png','Card_images/Club03_classic.png','Card_images/Club04_classic.png','Card_images/Club05_classic.png','Card_images/Club06_classic.png','Card_images/Club07_classic.png','Card_images/Club08_classic.png','Card_images/Club09_classic.png','Card_images/Club10_classic.png','Card_images/Club11_classic.png','Card_images/Club12_classic.png','Card_images/Club13_classic.png','Card_images/Diamond01_classic.png','Card_images/Diamond02_classic.png','Card_images/Diamond03_classic.png','Card_images/Diamond04_classic.png','Card_images/Diamond05_classic.png','Card_images/Diamond06_classic.png','Card_images/Diamond07_classic.png','Card_images/Diamond08_classic.png','Card_images/Diamond09_classic.png','Card_images/Diamond10_classic.png','Card_images/Diamond11_classic.png','Card_images/Diamond12_classic.png','Card_images/Diamond13_classic.png')
var cards = [];
var hands = [];
var decks = [];//裏向きになっている山札
var deckfaces = [];//表向きになっている山札
var decksNow=0;//触れる山札
var decksNow2=0;//n枚めくった時の変化用
var Extras=[0,13,26,39];
var Cardlists=[];//create用の画像リスト
var Decklists=[];//デッキ用
var DeckFacelists=[];//デッキ
var Exlists=[[],[],[],[]];//クリア済み
var cardWidth=80;//トランプの横幅
var cardHeight=140;//トランプの縦幅
var cardgapY=20;//トランプを重ねる時の
var cardgapX=10;//行同士の隙間
var duelLog=[];//アンドゥ用
var handsLog=[];//リセット用
var retryswitch=0;
var undocount=0;
var score=0;
var Cbt=canvas2.toDataURL();
var Cbtlist=[];
var Cbutton = new createjs.Bitmap(Cbt);
field.addChild(Cbutton);
Cbtlist.push(Cbutton);
//ボタン描画用
yakumap_hint.addEventListener("click", {handleEvent:ruleButton});
yakumap_reset.addEventListener("click", {handleEvent:resetButton});
yakumap_undo.addEventListener("click", {handleEvent:undoButton});
yakumap_solve.addEventListener("click", {handleEvent:solveButton});
retry_bt.addEventListener("click", {handleEvent:Gamestart});
retry_bt3.addEventListener("click", {handleEvent:ToGameretry});
//保存するデータ
var cleared=[0,0];//クリア回数, 挑戦回数
var highscore=[
  {time:[324000,324000,324000],score:[-1,-1,-1]},
]
var playtime=0;
var totalcardmove=0;
var se1 = new Howl({
  src:"card-flip.mp3",
      volume: 0.2,
    });
var se2 = new Howl({
  src:"card-flip.mp3",
      volume: 0.4,
    });
var se4 = new Howl({
  src:"shufflecard2.mp3",
      volume: 0.4,
    });
var se7 = new Howl({
  src:"decision3.mp3",
  volume: 0.3,
  });
var se11 = new Howl({
  src:"count_single.mp3",
      volume: 0.4,
  });
var se12 = new Howl({
  src:"004_se_kira4.mp3",
      volume: 0.2,
  });
// LoadQueueのインスタンスを作成
var queue = new createjs.LoadQueue(),
      // manifestを定義
      manifest = [
        {src:'Card_images/BackColor_Black.png'},{src:'Card_images/Spade01_classic.png'},{src:'Card_images/Spade02_classic.png'},{src:'Card_images/Spade03_classic.png'},{src:'Card_images/Spade04_classic.png'},{src:'Card_images/Spade05_classic.png'},{src:'Card_images/Spade06_classic.png'},{src:'Card_images/Spade07_classic.png'},{src:'Card_images/Spade08_classic.png'},{src:'Card_images/Spade09_classic.png'},{src:'Card_images/Spade10_classic.png'},{src:'Card_images/Spade11_classic.png'},{src:'Card_images/Spade12_classic.png'},{src:'Card_images/Spade13_classic.png'},
        {src:'Card_images/Heart01_classic.png'},{src:'Card_images/Heart02_classic.png'},{src:'Card_images/Heart03_classic.png'},{src:'Card_images/Heart04_classic.png'},{src:'Card_images/Heart05_classic.png'},{src:'Card_images/Heart06_classic.png'},{src:'Card_images/Heart07_classic.png'},{src:'Card_images/Heart08_classic.png'},{src:'Card_images/Heart09_classic.png'},{src:'Card_images/Heart10_classic.png'},{src:'Card_images/Heart11_classic.png'},{src:'Card_images/Heart12_classic.png'},{src:'Card_images/Heart13_classic.png'},
        {src:'Card_images/Club01_classic.png'},{src:'Card_images/Club02_classic.png'},{src:'Card_images/Club03_classic.png'},{src:'Card_images/Club04_classic.png'},{src:'Card_images/Club05_classic.png'},{src:'Card_images/Club06_classic.png'},{src:'Card_images/Club07_classic.png'},{src:'Card_images/Club08_classic.png'},{src:'Card_images/Club09_classic.png'},{src:'Card_images/Club10_classic.png'},{src:'Card_images/Club11_classic.png'},{src:'Card_images/Club12_classic.png'},{src:'Card_images/Club13_classic.png'},
        {src:'Card_images/Diamond01_classic.png'},{src:'Card_images/Diamond02_classic.png'},{src:'Card_images/Diamond03_classic.png'},{src:'Card_images/Diamond04_classic.png'},{src:'Card_images/Diamond05_classic.png'},{src:'Card_images/Diamond06_classic.png'},{src:'Card_images/Diamond07_classic.png'},{src:'Card_images/Diamond08_classic.png'},{src:'Card_images/Diamond09_classic.png'},{src:'Card_images/Diamond10_classic.png'},{src:'Card_images/Diamond11_classic.png'},{src:'Card_images/Diamond12_classic.png'},{src:'Card_images/Diamond13_classic.png'},
      ];
// 同時接続数を設定
queue.setMaxConnections(6);
// 読み込みの進行状況が変化した
queue.addEventListener("progress", handleProgress);
// 1つのファイルを読み込み終わったら
queue.addEventListener(
  "fileload",
  handleFileLoadComplete
);
// 全てのファイルを読み込み終わったら
queue.addEventListener("complete", handleComplete);
// 読み込み開始
queue.loadManifest(manifest);
function handleProgress(event) {
  // 読み込み率を0.0~1.0で取得
  var progress = event.progress;
  Loadmap.removeAllChildren();
  var Rate=Math.floor(progress*100);
  var load = new createjs.Text("Now loading..."+Rate+"%", "24px serif", "white");
  load.y=30;
  Loadmap.addChild(load);
}
function handleFileLoadComplete(event) {
  // 読み込んだファイル
  var result = event.result;
}
function handleComplete() {
  console.log("LOAD COMPLETE");
  Loadmap.removeAllChildren();
  gamestate=10;
  GameReady();
  ScoreConfig(0,-1);
}

createjs.Ticker.addEventListener("tick", UpdateParticles);
function UpdateParticles(event){
  updateParticles();
  if(gamestate==0){yakumap_hint.alpha=1}else{yakumap_hint.alpha=0};
  if(gamestate==0 && duelLog.length>1){yakumap_undo.alpha=1;}else{yakumap_undo.alpha=0;}
  if(gamestate==0 && duelLog.length){yakumap_reset.alpha=1;}else{yakumap_reset.alpha=0;}
  if(gamestate==0 && duelLog.length){yakumap_solve.alpha=1}else{yakumap_solve.alpha=0};
}
function MouseCircle(event){
  //クリックした場所を教える
  //create化する
  emitParticles();
  // パーティクルを更新
  updateParticles();
}
var count = 0; // tick イベントの回数
var MAX_LIFE = 20; // 寿命の最大値
var particles = [];
// パーティクルを発生させます
function emitParticles() {
  // パーティクルの生成
  for (var i = 0; i < 5; i++) {
    // カウントの更新
    count += 1;
    // オブジェクトの作成
    var particle = new createjs.Shape();
    particle.graphics
            .beginFill(createjs.Graphics.getHSL(count, 50, 50))
            .drawCircle(0, 0, 30 * Math.random());
    Configmap.addChild(particle);
    particle.compositeOperation = "lighter";
    particle.alpha=0.25;
    // パーティクルの発生場所
    particle.x = stage.mouseX*(1/stage.scaleX);
    particle.y = stage.mouseY*(1/stage.scaleY);
    // 動的にプロパティーを追加します。
    // 速度
    particle.vx = 6 * (Math.random() - 0.5);
    particle.vy = 6 * (Math.random() - 0.5);
    // 寿命
    particle.life = MAX_LIFE;
    particles.push(particle);
  }
}
// パーティクルを更新します
function updateParticles() {
  // パーティクルの計算を行う
  for (var i = 0; i < particles.length; i++) {
    // オブジェクトの作成
    var particle = particles[i];
    // 重力
    particle.vy += 0.2;
    // 摩擦
    particle.vx *= 0.96;
    particle.vy *= 0.96;
    // 速度を位置に適用
    particle.x += particle.vx;
    particle.y += particle.vy;
    // 地面
    if (particle.y > stage.canvas.height) {
      particle.y = stage.canvas.height; // 行き過ぎ補正
      particle.vy *= -1; // Y軸の速度を反転
    }
    // パーティクルのサイズをライフ依存にする
    var scale = particle.life / MAX_LIFE;
    particle.scaleX = particle.scaleY = scale;
    // 寿命を減らす
    particle.life -= 1;
    // 寿命の判定
    if (particle.life <= 0) {
      // ステージから削除
      Configmap.removeChild(particle);
      // 配列からも削除
      particles.splice(i, 1);
    }
  }
}

function GameReady(){
  Titleyard.alpha=0;
  Roomyard.alpha=0;
  opLock=0;
  Gamestart();
};
function ruleButton(event){
  if(cLock){
  //ルール画像を表示/格納
  cLock=false;
  se11.play();
      if(opLock==0){
        createjs.Tween.get(yakumap_rule)
        .to({x:60,alpha:1},400, createjs.Ease.backOut)
        .call(step);
      }else{
        createjs.Tween.get(yakumap_rule)
        .to({x:800,alpha:0},400, createjs.Ease.backIn)
        .call(step);
      }
  function step(){
    if(opLock==0){opLock=1}else{opLock=0};
    cLock=true;
  }
}};
function undoButton(event){
  console.log('undobutton',cLock)
  if(cLock){
  cLock=false;
      if(duelLog.length<2){
        cLock=true;
        return false
      };
      se1.play();
      var Ary=duelLog.pop();
      if(debugmode){
        console.log(Ary);
        console.log(Ary.card,Ary.card[0]);
      }
      //-1 Deck 10- Ex
          for(var i=0;i<Ary.card.length;i++){
            var T=Ary.card[i];
            switch(Ary.from){
              case -1:
                  //ウラ
                  var newCard = new createjs.Bitmap(Card_src[0]);
                  newCard.x=50;
                  newCard.y=5;
                  deckmap.addChild(newCard);
                  Decklists.push(newCard); 
                  //オモテ
                  var newCard = new createjs.Bitmap(Card_src[T]);
                  decks.push(T)
                  deckmap.addChild(newCard);
                  DeckFacelists.push(newCard); 
                  var HashCard=-T;
                  newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                  newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                  newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                  switch(Ary.to){
                    case 10:
                      case 11:
                        case 12:
                          case 13:
                  newCard.x=230+(Ary.to-10)*(cardWidth+cardgapX);
                  newCard.y=5;
                  newCard.alpha=1;
                  createjs.Tween.get(newCard)
                    .to({x:50,y:5},150)
                    .to({alpha:0},70)
                    .call(step);
                    break;
                    default:
                  newCard.x=50+(Ary.to)*(cardWidth+cardgapX);
                  newCard.y=150+(hands[Ary.to].length-1)*cardgapY;
                  createjs.Tween.get(newCard)
                  .to({x:50,y:5},150)
                  .to({alpha:0},70)
                  .call(step);
                  }
              break;
              case 10:
                case 11:
                  case 12:
                    case 13:
                      break;
              default:
                var newCard = new createjs.Bitmap(Card_src[T]);
                switch(Ary.to){
                  case 10:
                    case 11:
                      case 12:
                        case 13:
                newCard.x=230+(Ary.to-10)*(cardWidth+cardgapX);
                newCard.y=5;
                  break;
                  default:
                newCard.x=50+(Ary.to)*(cardWidth+cardgapX);
                newCard.y=150+(hands[Ary.to].length-1)*cardgapY;
                }
                field.addChild(newCard);
                hands[Ary.from].push(T);
                Cardlists[Ary.from].push(newCard);
                var HashCard=Ary.from*100+hands[Ary.from].length-1;
                newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                createjs.Tween.get(newCard)
                .to({x:50+Ary.from*(cardWidth+cardgapX),y:150+(hands[Ary.from].length-1)*cardgapY},70)
              break;
            }
            switch(Ary.to){
              case 10:
                case 11:
                  case 12:
                    case 13:
                      //Ex
                      var TX=Ary.to -10;
                        Extras[TX]-=1;
                        var T=Exlists[TX].pop();
                        field.removeChild(T);
                        step()
                      break;
              default:
                var T=Cardlists[Ary.to].pop();
                field.removeChild(T)
                hands[Ary.to].pop();
                step()
                break;
            }
  }
function step(){
  drawbuttom(10,50,decks.length,1,50,40);
  undocount+=1;
  cLock=true;
}
}};

function resetButton(event){
  if(opLock==0){
    opLock=2;
    se11.play();
    Dialogue("RETRY？","同じ盤面を最初からやり直します",3,-1);
  }
}
function solveButton(event=-1){
  if(cLock){
  if(opLock==0){
    opLock=2;
    se11.play();
    Dialogue("NEW GAME？","この盤面を放棄して新しいゲームを始めます",2,-1);
  }
}}
function DeckReset(p=0,point=0,X=0){
  if(p!==0 && X==0){
    //pがクリックイベントの場合
    p=this.point;
    decksNow2=0;
    if(!cLock || opLock!==0){return false};
  };
  cLock=false;
  switch(p){
  case 0:
    deckmap.removeAllChildren();
    decksNow=0;
    decksNow2=0;
    DeckFacelists=[];
    if(!decks.length){
    decks=deckfaces.concat();
    deckfaces=[];
    }
    for(var i=0;i<decks.length;i++){
      //ウラ
      var newCard = new createjs.Bitmap(Card_src[0]);
      newCard.x=50;
      newCard.y=10-i*0.5;
      deckmap.addChild(newCard);
      Decklists.push(newCard); 
    }
    for(var i=0;i<decks.length;i++){
      //オモテ
      //山札のカードは負+カード数とする
      var newCard = new createjs.Bitmap(Card_src[decks[i]]);
      newCard.x=50;
      newCard.y=5;
      newCard.alpha=0;
      deckmap.addChild(newCard);
      DeckFacelists.push(newCard); 
      var HashCard=-decks[i];
      newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
      newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
      newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
    }
    drawbuttom(10,50,decks.length,1,50,40);
    cLock=true;
    break;
  default:
    //p枚だけめくる
    //decks->数字が格納された配列
    //decklists->createが格納された配列
    if(!decks.length){
      if(deckfaces.length){
      se4.play();
      DeckReset(0);
      return true;
      }
      cLock=true;
      return false;
    }
    mLock=false;
    var TT=decks.shift();
    deckfaces.push(TT);
    var T=Decklists.pop();
    var S=DeckFacelists[decksNow];
    createjs.Tween.get(T)
    .to({x:105,y:-10,scaleX:0.05,scaleY:1.2},70)
    .to({alpha:0},10);
    createjs.Tween.get(S)
    .to({scaleX:0.05},70)
    .to({scaleX:1,alpha:1},70)
    .to({x:140+point*15},100)
    .call(step);
    function step(){
      point+=1;
      decksNow+=1;
      decksNow2+=1;
      se2.play();
      if(point>=p || !decks.length){
        //end
        drawbuttom(10,50,decks.length,1,50,40);
        mLock=true;
        cLock=true;
        return true;
      }else{
        cLock=true;
        DeckReset(p,point,1);
      }
    }
    break;
  }
  };
function moveAllow(card=0){
      if(card<0){
        //デッキのカード
        var C=-(card);
        if(deckfaces[deckfaces.length-1]==C){
          return true;
        }else{
          return false;
        };
      }
      var I=Math.floor(card/100);
      var J=card%100;
      if(J < hands[I].length){
        //複数のカードを持っている
        for(var i=J;i<hands[I].length-1;i++){
          var A=hands[I][i]%13;
          var B=hands[I][i+1]%13;
          if(A==0){A+=13};
          if(B==0){B+=13};
          var C=Math.floor((hands[I][i]-1)/13);
          var D=Math.floor((hands[I][i+1]-1)/13);
          if(A-B!==1 || (C+D)%2==0){
            return false;
          }
        }
        return true;
      }else{
        //カード1枚のみ
        return true;
      }
}
function handleDown(event) {
  if(cLock && mLock && opLock==0){
        if(moveAllow(this.card)){
        if(this.card<0){
          //デッキのカード
          var T=DeckFacelists[decksNow-1];
          dragPointX = stage.mouseX - T.x;
          dragPointY = stage.mouseY - T.y;
          T.alpha=0.5;
          se1.play()
          return true;
          };
        var I=Math.floor(this.card/100);
        var J=this.card%100;
        if(J < hands[I].length){
          se1.play()
          for(var i=J;i<hands[I].length;i++){
          var T=Cardlists[I][i];
          dragPointX = stage.mouseX - T.x;
          dragPointY = stage.mouseY - T.y;
          T.alpha=0.5;
          }
        }else{
          //最上段のカード
          se1.play()
          var T=Cardlists[I][J];
          dragPointX = stage.mouseX - T.x;
          dragPointY = stage.mouseY - T.y;
          T.alpha=0.5;
        }
      }
    }
  }
function handleMove(event) {
  if(cLock && mLock && opLock==0){
        if(moveAllow(this.card)){
            if(this.card<0){
              //デッキのカード
                var T=DeckFacelists[decksNow-1]
                T.x = stage.mouseX-dragPointX;
                T.y = stage.mouseY-dragPointY;
              return true;
            }
            var I=Math.floor(this.card/100);
            var J=this.card%100;
            var T=Cardlists[I][J];
            if(J < hands[I].length){
              var X=1-hands[I].length+J;
              for(var i=J;i<hands[I].length;i++){
                var T=Cardlists[I][i];
                T.x = stage.mouseX-dragPointX;
                T.y = stage.mouseY-dragPointY+20*X;
                X+=1;
                }
              }else{
                T.x = stage.mouseX-dragPointX;
                T.y = stage.mouseY-dragPointY;
              }
            }
}};
function handleUp(event) {
  if(cLock && mLock && opLock==0){
        if(moveAllow(this.card)){
        if(this.card<0){
          //デッキのカード
          se1.play()
          cLock=false;
          var X=-(this.card)
          var T=DeckFacelists[decksNow-1];
        //移動が許可されれば移動する
        //却下であれば元の位置へ
        var TX=Math.floor((stage.mouseX-70)/90);
        var TY=stage.mouseY;
        if(TY<140){
          //上
          TX-=3;
          //Exlists
          switch(TX){
            case -2:
              //自動的にUP
              TX=Math.floor((X-1)/13);
              if(X==Extras[TX]+1){
                se12.play();
                Extras[TX]+=1;
                var newCard = new createjs.Bitmap(Card_src[X]);
                newCard.x=T.x
                newCard.y=T.y
                field.addChild(newCard);
                //extraへ追加
                createjs.Tween.get(newCard)
                .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5},70)
                .call(endPhase);
                Exlists[TX].push(newCard);
                //cardlistから消去
                deckmap.removeChild(T);
                DeckFacelists.splice(decksNow-1,1);
                decksNow-=1;
                decksNow2-=1;
                deckfaces.pop();
                duelLog.push({card:[X],from:-1,to:10+TX});
                //クリア条件
                if(Extras[0]==13 && Extras[1]==26 && Extras[2]==39 && Extras[3]==52){
                  Gameover();
                }
              }else{
                ExitCard(-1);            
              };
              break;
            case 0:
              case 1:
                case 2:
                  case 3:
              if(X==Extras[TX]+1){
                se12.play();
                Extras[TX]+=1;
                var newCard = new createjs.Bitmap(Card_src[X]);
                newCard.x=T.x
                newCard.y=T.y
                field.addChild(newCard);
                //extraへ追加
                createjs.Tween.get(newCard)
                .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5},70)
                .call(endPhase);
                Exlists[TX].push(newCard);
                //cardlistから消去
                deckmap.removeChild(T);
                DeckFacelists.splice(decksNow-1,1);
                decksNow-=1;
                decksNow2-=1
                deckfaces.pop();
                duelLog.push({card:[X],from:-1,to:10+TX});
                //クリア条件
                if(Extras[0]==13 && Extras[1]==26 && Extras[2]==39 && Extras[3]==52){
                  Gameover();
                }
              }else{
                ExitCard(-1);            
              };
              break;
              default:
                ExitCard(-1);
              break;
                  
          }
        }else{
          switch(TX){
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            var A=X%13;
            var B=hands[TX][hands[TX].length-1]%13;
            if(A==0){A+=13}
            if(B==0){B+=13};
            var C=Math.floor((X-1)/13);
            var D=Math.floor((hands[TX][hands[TX].length-1]-1)/13);
            if((hands[TX].length==0 && A==13) || (B-A==1 && (C+D)%2==1)){
              //移動先に追加する
                  var newCard = new createjs.Bitmap(Card_src[X]);
                  newCard.x=T.x;
                  newCard.y=T.y;
                  field.addChild(newCard);
                  hands[TX].push(X);
                  Cardlists[TX].push(newCard);
                  var HashCard=TX*100+hands[TX].length-1;
                  newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                  newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                  newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                  createjs.Tween.get(newCard)
                  .to({x:50+TX*(cardWidth+cardgapX),y:150+(hands[TX].length-1)*cardgapY},70)
                  .call(endPhase);
                  //cardlistから消去
                  deckmap.removeChild(T);
                  DeckFacelists.splice(decksNow-1,1);
                  decksNow-=1;
                  decksNow2-=1
                  deckfaces.pop();
                  duelLog.push({card:[X],from:-1,to:TX});
            }else{
              ExitCard(-1);          
            }
            break;
          default:
            ExitCard(-1);
            }
          };
          return true;
        }
        //一般のカード
        cLock=false;
        var I=Math.floor(this.card/100);
        var J=this.card%100;
        var T=Cardlists[I][J];
        var TX=Math.floor((stage.mouseX-70)/90);
        var TY=stage.mouseY;
        if(TY<140){
          //上
          TX-=3;
          //Exlists
          switch(TX){
            case 0:
              case 1:
                case 2:
                  case 3:
              if(hands[I][J]==Extras[TX]+1){
                se12.play();
                var C=hands[I][J];
                Extras[TX]+=1;
                var newCard = new createjs.Bitmap(Card_src[hands[I][J]]);
                newCard.x=T.x
                newCard.y=T.y
                field.addChild(newCard);
                //extraへ追加
                createjs.Tween.get(newCard)
                .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5},70)
                .call(endPhase);
                Exlists[TX].push(newCard);
                //cardlistから消去
                field.removeChild(T);
                Cardlists[I].splice(J,1);
                hands[I].splice(J,1);
                duelLog.push({card:[C],from:I,to:10+TX});
                //クリア条件
                if(Extras[0]==13 && Extras[1]==26 && Extras[2]==39 && Extras[3]==52){
                  Gameover();
                }
              }else{
                ExitCard();            
              };
              break;
              default:
                ExitCard();
              break;           
          }
        }else{
          switch(TX){
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            if(I==TX && J==hands[I].length-1){
              //自動的にUP
              TX=Math.floor((hands[I][J]-1)/13);
              if(hands[I][J]==Extras[TX]+1){
                se12.play();
                var C=hands[I][J];
                Extras[TX]+=1;
                var newCard = new createjs.Bitmap(Card_src[hands[I][J]]);
                newCard.x=T.x
                newCard.y=T.y
                field.addChild(newCard);
                //extraへ追加
                createjs.Tween.get(newCard)
                .to({x:50+(TX+3)*(cardWidth+cardgapX),y:5},70)
                .call(endPhase);
                Exlists[TX].push(newCard);
                //cardlistから消去
                field.removeChild(T);
                Cardlists[I].splice(J,1);
                hands[I].splice(J,1);
                duelLog.push({card:[C],from:I,to:10+TX});
                //クリア条件
                if(Extras[0]==13 && Extras[1]==26 && Extras[2]==39 && Extras[3]==52){
                  Gameover();
                }
                break;
              }else{ExitCard();break;};
          }
            var A=hands[I][J]%13;
            var B=hands[TX][hands[TX].length-1]%13;
            if(A==0){A+=13};
            if(B==0){B+=13};//K裁定
            var C=Math.floor((hands[I][J]-1)/13);
            var D=Math.floor((hands[TX][hands[TX].length-1]-1)/13);
            //無のスペースならばKのみ許可する
            if((hands[TX].length==0 && A==13) || (B-A==1 && (C+D)%2==1)){
              //移動先に追加する
                se1.play()
                var X=0;
                for(var i=J;i<hands[I].length;i++){
                  var T=Cardlists[I][i];
                  var newCard = new createjs.Bitmap(Card_src[hands[I][i]]);
                  newCard.x=T.x;
                  newCard.y=T.y;
                  field.addChild(newCard);
                  hands[TX].push(hands[I][i]);
                  Cardlists[TX].push(newCard);
                  var HashCard=TX*100+hands[TX].length-1;
                  newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
                  newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
                  newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
                  createjs.Tween.get(newCard)
                  .to({x:50+TX*(cardWidth+cardgapX),y:150+(hands[TX].length-1)*cardgapY},70)
                  .call(endPhase);
                  //cardlistから消去
                  field.removeChild(T)
                  X+=1;
                  }
                  Cardlists[I].splice(J,X);
                  var Ary=hands[I].splice(J,X);
                  duelLog.push({card:Ary,from:I,to:TX});
            }else{
              ExitCard();          
            }
            break;
          default:
            ExitCard();
          }}
        };
    //Yes
    function endPhase(){
      cLock=true;
    };
    //No
    function ExitCard(t=0){
      if(t==-1){
        //山札
        var T=DeckFacelists[decksNow-1];
        createjs.Tween.get(T)
        .to({x:50+cardWidth+cardgapX,y:5},90)
        .call(endPhase);
        T.alpha=1;  
        return true; 
      }
          if(J < hands[I].length){
            var X=0;
            for(var i=J;i<hands[I].length;i++){
              var T=Cardlists[I][i];
              createjs.Tween.get(T)
              .to({x:50+I*(cardWidth+cardgapX),y:150+(J+X)*cardgapY},90)
              .call(endPhase);
              T.alpha=1;
              X+=1;
              }
        }else{
          createjs.Tween.get(T)
          .to({x:50+I*(cardWidth+cardgapX),y:150+J*cardgapY},90)
          .call(endPhase);
          T.alpha=1;    
          }
      }
    }
};
function ScoreConfig(event,p=0){
  if(p!==0){
  //score
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#3b7353");
  shape.graphics.drawRect(700, 0, 100, 50); // 長方形を描画
  shape.alpha=0.8;
  Configmap.addChild(shape); // 表示リストに追加
  var t = new createjs.Text("SCORE", "20px serif", "white");
  t.x=705;
  t.y=0;
  Configmap.addChild(t);
  shape.addEventListener("click", {card:0,handleEvent:ScoreDetail});
  var Z = new createjs.Bitmap('zoom650.png');
  Z.x=735;
  Z.y=18;
  Z.scale=0.3;
  var shape = new createjs.Shape();
  shape.graphics.beginFill("rgb(244,177,131)");
  shape.graphics.beginStroke("rgb(237,125,50)");
  shape.graphics.setStrokeStyle(3);
  shape.graphics.drawRect(702, 20, 96, 28);
  Configmap.addChild(shape);
  Configmap.addChild(Z);
  return false;
  }
//
function ScoreDetail(){
  function dispR(time){
    if(time==324000 || time==-1){
      return "--:--:--"
    }
    var Hr=Math.floor(time/3600);
    var Min=Math.floor((time-3600*Hr)/60);
    var Sec=Math.floor(time-3600*Hr-60*Min);
    if(Min<10){Min="0"+Min};
    if(Sec<10){Sec="0"+Sec}
    return Hr+":"+Min+":"+Sec;
  }
  function ScoreDisp(score){
    if(score==-1){
      return "------"
    }else{
      return score;
    }
  }
  if(opLock!==10){
  var T="　　　タイム　　　　　　スコア&"+"1st　"+dispR(highscore[this.card].time[0])+"　　　1st　"+ScoreDisp(highscore[this.card].score[0])
  T+="&2nd　"+dispR(highscore[this.card].time[1])+"　　 2nd　"+ScoreDisp(highscore[this.card].score[1])
  T+="&3rd　"+dispR(highscore[this.card].time[2])+"　　  3rd　"+ScoreDisp(highscore[this.card].score[2])
  T+="&クリア回数："+cleared[0]+"/プレイ回数："+cleared[1];
  Dialogue("プレイデータ",T,-4,-1,"OK",520,330,80,40);
  opLock=10;
  }
}
//
};
canvas5.onmousedown = mouseDownListener;
function mouseDownListener(e) {
  createjs.Ticker.addEventListener("tick", MouseCircle);
};
canvas5.onmouseup = mouseUpListener;
function mouseUpListener(e) {
  createjs.Ticker.removeEventListener("tick", MouseCircle);
};
  function Dialogue(word,detail="　",yes=1,no=-1,ok=-1,okx=345,oky=300,okw=105,okh=60,ok2=-1,ok2x=345,ok2y=300,ok2w=105,ok2h=60){
    //ok 0->OKボタンにする
    Loadmap.removeAllChildren();
    Loadmap.alpha=1;
    Loadmap.x=800;
    var shape = new createjs.Shape();
    shape.graphics.beginFill("rgba(20,20,20,0.7)");
    shape.graphics.drawRect(0, 0, 800, 600);
    shape.alpha=0;
    Loadmap.addChild(shape);
    createjs.Tween.get(shape)
    .wait(120)
    .to({alpha:1},500);
    var DL= new createjs.Bitmap("soL_dialogue.png");
    DL.scale=1.7;
    DL.x=190;
    DL.y=180;
    Loadmap.addChild(DL);
    var t=new createjs.Text(word,"bold 26px 'メイリオ'","black");
    t.x=245;
    t.y=200;
    Loadmap.addChild(t);
    for( var lines=detail.split( "&" ), i=0, l=lines.length; l>i; i++ ) {
      var line = lines[i] ;
      var t=new createjs.Text(line,"bold 18px 'メイリオ'","black");
      t.x=210;
      t.y=260+i*20;
      Loadmap.addChild(t);
    };
    if(ok==-1){
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#ff3838");
    shape.graphics.drawRect(220, 300, 120, 60);
    Loadmap.addChild(shape);
    shape.addEventListener("click", {card:yes,handleEvent:DialogueResult});
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#3898ff");
    shape.graphics.drawRect(460, 300, 120, 60);
    Loadmap.addChild(shape);
    shape.addEventListener("click", {card:no,handleEvent:DialogueResult});
    var t=new createjs.Text("YES","bold 24px 'メイリオ'","white");
    t.x=250;
    t.y=320;
    Loadmap.addChild(t);
    var t=new createjs.Text("NO","bold 24px 'メイリオ'","white");
    t.x=500;
    t.y=320;
    Loadmap.addChild(t);
    }else{
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#ff3838");
    shape.graphics.drawRect(okx, oky, okw, okh);
    Loadmap.addChild(shape);
    shape.addEventListener("click", {card:yes,handleEvent:DialogueResult});
    var t=new createjs.Text(ok,"bold 24px 'メイリオ'","white");
    t.x=okx+okw/4;
    t.y=oky+okh/4;
    Loadmap.addChild(t); 
      if(ok2 !==-1){
      var shape = new createjs.Shape();
      shape.graphics.beginFill("#ff3838");
      shape.graphics.drawRect(ok2x, ok2y, ok2w, ok2h);
      Loadmap.addChild(shape);
      shape.addEventListener("click", {card:no,handleEvent:DialogueResult});
      var t=new createjs.Text(ok2,"bold 24px 'メイリオ'","white");
      t.x=ok2x+ok2w/4;
      t.y=ok2y+ok2h/4;
      Loadmap.addChild(t);
      }
    }
    createjs.Tween.get(Loadmap)
    .to({x:0},150);
    function DialogueResult(e){
      se7.play();
      switch(this.card){
        case 0:
          //game over for debug/henir
          Gameover();
          break;
        case 1:
          //game over-failed
          Gameover(1);
          break;
        case 2:
          cleared[1]+=1;
          Gamestart();
          break;
        case 3:
          retryswitch+=1;
          Gameretry();
          break;
        default:
          //no
        break;
      }
      Loadmap.alpha=0;
      opLock=0;
    }}
function ToGameretry(){
  //gameover画面からのリトライは挑戦回数を-1しておく
  clearBG.removeAllChildren();
  field.removeAllChildren();
  gamestate=0;
  retryswitch+=1;
  yakumap.removeChild(yakumap_rule);
  yakumap_rule = new createjs.Bitmap("soL_rule1.png");
  yakumap_rule.alpha=0;
  yakumap_rule.x=800;
  yakumap_rule.y=70;
  yakumap.addChild(yakumap_rule);
  Gameretry();
}
function Gamestart(){
    gamestate=0;
    retryswitch=0;
    cLock=false;
    clearBG.removeAllChildren();
    field.removeAllChildren();
    cx.clearRect(0,0,800,600)
    cx2.clearRect(0,0,800,600)
    yakumap.removeChild(yakumap_rule);
      //クロンダイク
      yakumap_rule = new createjs.Bitmap("soL_rule1.png");
      yakumap_rule.alpha=0;
      yakumap_rule.x=800;
      yakumap_rule.y=70;
      yakumap.addChild(yakumap_rule);
      cards = new Array(52);
      for (var i = 0;  i < cards.length;  i++  ) {
        cards[i]=i+1;
      }
      shuffle();
   handsLog=cards.concat();
    Gameretry(1);
  };
function Gameretry(t=0){
  cLock=false;
  opLock=-1;
  field.removeAllChildren();
  undocount=0;
  score=0;
  startT = Date.now();
  if(t==0){cards =handsLog.concat()};
    duelLog=[];
    Cardlists=[[],[],[],[],[],[],[]]
    //handsLog=cards.concat();
    hands = [
      cards.splice(0, 1),
      cards.splice(0, 2),
      cards.splice(0, 3),
      cards.splice(0, 4),
      cards.splice(0, 5),
      cards.splice(0, 6),
      cards.splice(0, 7),
    ]
    decks = cards.concat();
    deckfaces=[];
    Extras=[0,13,26,39];
    Exlists=[[],[],[],[]];
  for(var i=0;i<hands.length;i++){
    for(var j=0;j<hands[i].length;j++){
    var newCard = new createjs.Bitmap(Card_src[hands[i][j]]);
    newCard.x=50;
    newCard.y=5;
    field.addChild(newCard);
    Cardlists[i].push(newCard);
    //アニメーションを用意しておく
    //i列目のj行目でアクセスする
    var HashCard=i*100+j;
    newCard.addEventListener("mousedown", {card:HashCard,handleEvent:handleDown});
    newCard.addEventListener("pressmove", {card:HashCard,handleEvent:handleMove});
    newCard.addEventListener("pressup", {card:HashCard,handleEvent:handleUp});
    }
  };
  printView();
  console.log('デュエル開始')  
};
  function printView(){
    //シャッフルして描画するまで
        cx.strokeStyle="white";
        for(var i=0;i<6;i++){
          if(i!==2){
          createRoundRect(74+90*i,5,80,128,5,cx);
          cx.stroke();
          }};
        for(var i=0;i<7;i++){
        createRoundRect(74+90*i,150,80,128,5,cx);
        cx.stroke();
        }
        var newCard = new createjs.Bitmap(Card_src[0]);
        newCard.x=50
        newCard.y=5
        newCard.alpha=0.3;
        newCard.addEventListener("click", {point:1,handleEvent:DeckReset});
        field.addChild(newCard);
        //deck
        var newCard = new createjs.Bitmap(Card_src[1]);
        newCard.x=50+3*(cardWidth+cardgapX)
        newCard.y=5
        newCard.alpha=0.3;
        field.addChild(newCard);
        var newCard = new createjs.Bitmap(Card_src[14]);
        newCard.x=50+4*(cardWidth+cardgapX)
        newCard.y=5
        newCard.alpha=0.3;
        field.addChild(newCard);
        var newCard = new createjs.Bitmap(Card_src[27]);
        newCard.x=50+5*(cardWidth+cardgapX)
        newCard.y=5
        newCard.alpha=0.3;
        field.addChild(newCard);
        var newCard = new createjs.Bitmap(Card_src[40]);
        newCard.x=50+6*(cardWidth+cardgapX)
        newCard.y=5
        newCard.alpha=0.3;
        field.addChild(newCard);
        DeckReset();
        FirstAnimation();
  };
  function FirstAnimation(i=0,j=0){
    //カードを配るように見せる
        var T = Cardlists[i][j];
      createjs.Tween.get(T)
      .to({x:50+i*(cardWidth+cardgapX),y:150+j*cardgapY,alpha:1},80)
      .call(nextcard);
    function nextcard(){
          se1.play();
          i+=1;
          if(i>6){
            j+=1;
            if(j>6){
              cLock=true;
              opLock=0;
              duelLog.push("start");
              return false;
            };
            i=j};
          FirstAnimation(i,j);
    }
    };
  function disp(when=0){
  clearT =Date.now();
  if(when==0){
    datet = parseInt((clearT - startT )/ 1000);
  }else{
    datet = parseInt((playtime + clearT - when )/ 1000);
  }
	hour = parseInt(datet / 3600);
	min = parseInt((datet / 60) % 60);
	sec = datet % 60;
	if(hour >99){hour =99}
    }
function shuffle(){
  for(var i =cards.length-1; i>0 ; i--){
  var r =Math.floor(Math.random()*(i+1));
  var temp = cards[i];
  cards[i] = cards[r]
  cards[r] = temp
}};
function drawbuttom(x,y,word,type=0,w=80,z=40,R=1){
  //type->活性化時 Rを大きくすると文字の大きさを小さくします
  cx2.lineWidth = 2;
  if(type==0){
  cx2.strokeStyle="#68ceed";//水色
  cx2.fillStyle="#0080ff"//蒼
  }else{
  cx2.strokeStyle="#233237";
  cx2.fillStyle="#043342";
  }
  cx2.beginPath();
  cx2.moveTo(x+1,y+1);
  cx2.lineTo(x+w-2, y+1);
  cx2.lineTo(x+w-2, y+z-2);
  cx2.lineTo(x+1,y+z-2);
  cx2.lineTo(x+1,y+1);
  cx2.fill();
  cx2.fillStyle="#68ceed";
  cx2.stroke();
  cx2.beginPath();
  cx2.moveTo(x+1,y+1);
  cx2.lineTo(x+31, y+1);
  cx2.lineTo(x+1, y+11);
  cx2.lineTo(x+1,y+1);
  cx2.fill();
  cx2.fillStyle = "#ffffff";
  if(R==0){
    cx2.font = "28px 'メイリオ'";
    cx2.fillText(word,x+20,y+35)
    }else if(R==1){
  cx2.font = "16px 'メイリオ'";
  cx2.fillText(word,x+10,y+25)
    }
  //create
  Cbt=canvas2.toDataURL();
  Cbutton = new createjs.Bitmap(Cbt);
  field.addChild(Cbutton);
  var T=Cbtlist.pop();
  Cbtlist.push(Cbutton);
  createjs.Tween.get(T)
  .to({x:0,alpha:0},120)
  .call(TX);
  function TX(){field.removeChild(T);}
  }
function createRoundRect(x, y, width, height, radius,context){
      context.beginPath();
      context.moveTo(x + radius, y);
      context.lineTo(x + width - radius, y);
      context.arcTo(x + width, y, x + width, y + radius, radius);
      context.lineTo(x + width, y + height - radius);
      context.arcTo(x + width, y + height, x + width - radius , y + height, radius);
      context.lineTo(x + radius, y + height); 
      context.arcTo(x, y + height, x, y + height - radius, radius);
      context.lineTo(x, y + radius);
      context.arcTo(x, y, x + radius, y, radius);
      context.closePath();
};
function Gameover(A=0){
  console.log('gameover',A);
  if(gamestate==0){
    cLock=false;
    gamestate=1;
    cx2.clearRect(0,0,800,600);
    field.removeChild(Cbutton)
    Cbt=canvas2.toDataURL();
    Cbutton = new createjs.Bitmap(Cbt);
    field.addChild(Cbutton);
    Cbtlist=[];
    Cbtlist.push(Cbutton);
    clear_1.x=800;
    clear_1.y=0;
    clearBG.addChild(clear_1);
    createjs.Tween.get(clear_1)
    .to({x:0,alpha:1},300);
    Cstar.x=580;
    Cstar.y=50;
    Cstar.rotation=15;
    Cstar.scale=0.7
    clearBG.addChild(Cstar);
    totalcardmove+=duelLog.length-1;
    var Rank="F";
    disp();
    switch(A){
      case 1:
        //failed...未使用
        var shape = new createjs.Shape();
        shape.graphics.beginFill("black");
        shape.graphics.drawRect(0, 0, 800, 600);
        shape.alpha=0;
        clearBG.addChild(shape);
        createjs.Tween.get(shape)
        .to({x:0,alpha:0.3},900)
        .wait(1000)
        .call(nextgame)            
        cleared[1]+=1;
        score=50*(duelLog.length-1);
        for(var i=0;i<Extras.length;i++){
          score+=100*Math.floor(Extras[i]/(i+1));
        var TB=500-(hour*3600+min*60+sec);
        score+=TB;
        score-=(undocount-2)*50;
        score-=(retryswitch-1)*100;
        var t=new createjs.Text("card move","22px メイリオ","white");
        t.x=600;
        t.y=150;
        clearBG.addChild(t);
        var t=new createjs.Text(duelLog.length-1,"36px メイリオ","white");
        t.x=610;
        t.y=175;
        clearBG.addChild(t);
        }
        var t=new createjs.Text("time","22px メイリオ","white");
        t.x=600;
        t.y=80;
        clearBG.addChild(t);
        if(min<10){min="0"+min};
        if(sec<10){sec="0"+sec};
        var Time=hour+":"+min+":"+sec;
        var t=new createjs.Text(Time,"36px メイリオ","white");
        t.x=610;
        t.y=105;
        clearBG.addChild(t);
        var t=new createjs.Text("undo "+undocount,"22px メイリオ","white");
        t.x=600;
        t.y=220;
        clearBG.addChild(t);
        if(retryswitch>0){
        var t=new createjs.Text("retry "+retryswitch,"22px メイリオ","white");
        t.x=600;
        t.y=250;
        clearBG.addChild(t);
        }
        var t=new createjs.Text("score "+score,"22px メイリオ","white");
        t.x=600;
        t.y=280;
        clearBG.addChild(t);
        var t=new createjs.Text(Rank,"bold 64px  メイリオ","#d14d4d");
        t.x=610;
        t.y=305;
        clearBG.addChild(t);
        clear_4.x=-20;
        clear_4.y=-20;
        clear_4.alpha=0;
        clearBG.addChild(clear_4);
        createjs.Tween.get(clear_4)
        .wait(450)
        .to({x:20,alpha:1},300)
        break;
      default:
        cleared[0]+=1;
        cleared[1]+=1;
        score=50*(duelLog.length-1);
        for(var i=0;i<Extras.length;i++){
          score+=100*Math.floor(Extras[i]/(i+1));
        }
        if(score>=10000){
          Rank="SS";
        }else if(score>=9000){
          Rank="S";
        }else if(score>=8000){
          Rank="A";
        }else if(score>=6000){
          Rank="B";
        }else{
          Rank="C";
        }
        var TimeTemp=hour*3600+min*60+sec
        var TB=500-TimeTemp;
        score+=TB;
        score-=(undocount-2)*50;
        score-=(retryswitch-1)*100;
            var A=highscore[0].time.findIndex(value=>value>TimeTemp);
              if(A !==-1){
              highscore[0].time.splice(2,1);
              highscore[0].time.splice(A,0,TimeTemp);
              }
            var B=highscore[0].score.findIndex(value=>value<score);
            if(B !==-1){
            highscore[0].score.splice(2,1);
            highscore[0].score.splice(B,0,score);
            }
        var t=new createjs.Text("card move","22px メイリオ","white");
        t.x=600;
        t.y=150;
        clearBG.addChild(t);
        var t=new createjs.Text(duelLog.length-1,"36px メイリオ","white");
        t.x=610;
        t.y=175;
        clearBG.addChild(t);
        var t=new createjs.Text("clear time","22px メイリオ","white");
        t.x=600;
        t.y=80;
        clearBG.addChild(t);
        if(min<10){min="0"+min};
        if(sec<10){sec="0"+sec};
        var Time=hour+":"+min+":"+sec;
        var t=new createjs.Text(Time,"36px メイリオ","white");
        t.x=610;
        t.y=105;
        clearBG.addChild(t);
        var t=new createjs.Text("undo "+undocount,"22px メイリオ","white");
        t.x=600;
        t.y=220;
        clearBG.addChild(t);
        if(retryswitch>0){
        var t=new createjs.Text("retry "+retryswitch,"22px メイリオ","white");
        t.x=600;
        t.y=250;
        clearBG.addChild(t);
        };
        var t=new createjs.Text("score "+score,"22px メイリオ","white");
        t.x=600;
        t.y=280;
        clearBG.addChild(t);
        var t=new createjs.Text(Rank,"bold 64px  メイリオ","#d14d4d");
        t.x=610;
        t.y=330;
        clearBG.addChild(t);
        clear_3.x=-50;
        clear_3.y=-20;
        clear_3.alpha=0;
        clearBG.addChild(clear_3);
        createjs.Tween.get(clear_3)
        .wait(450)
        .to({x:0,alpha:1},300)
        .wait(500)
        .call(nextgame)
        break;
    }
  function nextgame(){
    retry_bt3.x=600;
    retry_bt3.y=420;
    clearBG.addChild(retry_bt3);
    retry_bt.x=600;
    retry_bt.y=470;
    clearBG.addChild(retry_bt);
    cLock=true;
  }
}};
};//end of main
