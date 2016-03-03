phina.globalize();

// 定数
var SCREEN_WIDTH = 640;            // 画面横サイズ
var SCREEN_HEIGHT = 960;           // 画面縦サイズ
var GRID_SIZE = SCREEN_WIDTH / 6;  // グリッドのサイズ
var PIECE_SIZE = GRID_SIZE * 0.95; // ピースの大きさ
var PIECE_NUM_XY = 6;              // 縦横のピース数
var PIECE_OFFSET = GRID_SIZE / 2;  // オフセット値 (座標の調整)

// メインシーン
phina.define('MainScene', {
  superClass: 'CanvasScene',
  // コンストラクタ
  init: function() {
    // 親クラス初期化 (親クラスコンストラクタの呼び出し)
    this.superInit();
    // 背景色
    this.backgroundColor = 'gray';
    // グリッド
    var grid = Grid(SCREEN_WIDTH, PIECE_NUM_XY);
    // ピースグループ
    var pieceGroup = CanvasElement().addChildTo(this);
    // ピース配置
    PIECE_NUM_XY.times(function(spanX) {
      PIECE_NUM_XY.times(function(spanY) {
        // 番号
        var num = Math.floor( ( Math.random() * 9 ) + 1 ) ;
        // ピース作成
        var piece = Piece(num).addChildTo(pieceGroup);
        // Gridを利用して配置
        piece.x = grid.span(spanX) + PIECE_OFFSET;
        piece.y = grid.span(spanY) + PIECE_OFFSET;
        // タッチを有効にする
        piece.setInteractive(true);
        // タッチされた時の処理
        this.sum = 0;
        piece.onpointend = function() {
          this.fill = 'blue';
          this.sum += num;
          console.log(this.num);
          console.log(this.sum);
        };
      });
    });
  },
});

// ピースクラス
phina.define('Piece', {
  // RectangleShape (矩形) を継承
  superClass: 'phina.display.RectangleShape',
    // コンストラクタ
    init: function(num) {
      // 親クラス初期化
      this.superInit({
        width: PIECE_SIZE,
        height: PIECE_SIZE,
        cornerRadius: 10,
        // 塗りつぶし
        fill: 'silver',
        // 枠の色
        stroke: 'white',
      });
      // 数字
      this.num = num;
      // 数字表示用ラベル
      this.label = Label({
        text: this.num + '',
        fontSize: PIECE_SIZE * 0.8,
        fill: 'white',
      }).addChildTo(this);
    },
});
// メイン
phina.main(function() {
  var app = GameApp({
    title: 'Black Jack Puzzle',
    // 最初に呼び出すシーンを指定 (ここではtitle)
    startLabel: 'title',
  });

  document.body.appendChild(app.domElement);
  app.run();
});
