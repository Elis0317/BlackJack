phina.globalize();

// Constant
var SCREEN_WIDTH = 640;            // 画面横サイズ
var SCREEN_HEIGHT = 960;           // 画面縦サイズ
var GRID_SIZE = SCREEN_WIDTH / 6;  // グリッドのサイズ
var PIECE_SIZE = GRID_SIZE * 0.95; // ピースの大きさ
var PIECE_NUM_XY = 6;              // 縦横のピース数
var PIECE_OFFSET = GRID_SIZE / 2;  // オフセット値

// MainScene
phina.define('MainScene', {
  superClass: 'CanvasScene',
  // Constructor
  init: function() {
    // Initialize ParentClass
    this.superInit();
    // backgroundColor
    this.backgroundColor = 'gray';
    // Grid
    var grid = Grid(SCREEN_WIDTH, PIECE_NUM_XY);
    // ピースグループ
    var pieceGroup = CanvasElement().addChildTo(this);
    // set pieces
    PIECE_NUM_XY.times(function(spanX) {
      PIECE_NUM_XY.times(function(spanY) {
        // make piece
        var piece = Piece().addChildTo(pieceGroup);
        // Gridを利用して配置
        piece.x = grid.span(spanX) + PIECE_OFFSET;
        piece.y = grid.span(spanY) + PIECE_OFFSET;
      });
    });
  },
});

// Piece Class
phina.define('Piece', {
  //Inheritance RectangleShape
  superClass: 'phina.display.RectangleShape',
    // Constructor
    init: function() {
      // Initialize ParentClass
      this.superInit({
        width: PIECE_SIZE,
        height: PIECE_SIZE,
        cornerRadius: 10,
        // 塗りつぶしの色
        fill: 'silver',
        // 枠の色
        stroke: 'white',
      });
    },
});

// Main
phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
  });
  app.run();
});
