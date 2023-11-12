// 変数の宣言
let w; // セルの幅(ピクセル)
let columns; // 列数
let rows; // 行数

function setup() {
  frameRate(10);

  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);
  // 背景色をカラーコード#E0F4FFに指定
  background('#E0F4FF');

  // セルの幅を20ピクセルに指定
  w = 20;

  // 行数の計算
  rows = 400 / w;

  // 列数の計算
  columns = 720 / w;

  // コンソールにcolumnsとrowsの値を出力
  console.log('行数:', rows)
  console.log('列数:', columns)
}

function draw() {
  // 列ループ
  for(let i = 0; i < columns; i++){
    // 行ループ
    for(let j = 0; j < rows; j++){
      rect(i, j, w, w);
    }
  }
}