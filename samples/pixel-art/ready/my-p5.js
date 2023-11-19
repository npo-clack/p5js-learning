// 変数の宣言
let w; // セルの幅(ピクセル)
let columns; // 列数
let rows; // 行数
let cells; // セルの状態2次元配列

function setup() {
  // フレームレートを24フレーム/秒に設定
  // frameRate(24);

  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);
  // 背景色をカラーコード#E0F4FFに指定
  background("#E0F4FF");

  // セルの幅を20ピクセルに指定
  w = 20;

  // 行数の計算
  rows = 400 / w;

  // 列数の計算
  columns = 720 / w;

  init();
}

function draw() {
  // 行ループ
  for (let i = 0; i < rows; i++) {
    // 列ループ
    for (let j = 0; j < columns; j++) {
      if (cells[i][j] === "x") {
        fill(255); // 白で塗りつぶし
      } else {
        fill(0); // 黒で塗りつぶし
      }
      rect(j * w, i * w, w, w);
    }
  }
}

function init() {
  // cellsを20行36列の2次元配列として、"x"で埋めるコード

  // 行数分のundefined要素をもった配列で初期化
  cells = new Array(rows);

  // 行ループ
  for (let i = 0; i < rows; i++) {
    // さらに要素ごとに、列数分のundefined要素をを持った配列で初期化
    cells[i] = new Array(columns);

    // 列ループ
    for (let j = 0; j < columns; j++) {
      // i行目j列目の要素を'x'で埋める
      cells[i][j] = "x";
    }
  }
}

function mouseClicked() {
  console.log("マウスのx座標", mouseX);
  console.log("マウスのy座標", mouseY);
  const clickedCellIndex = getCurrentIndexFromMousePosition(mouseX, mouseY);

  console.log(clickedCellIndex);
  toggleCellColor(clickedCellIndex.rowIndex, clickedCellIndex.columnIndex);
}

function getCurrentIndexFromMousePosition(x, y) {
  return {
    columnIndex: ceil(x / w) - 1,
    rowIndex: ceil(y / w) - 1,
  };
}

function toggleCellColor(rowIndex, columnIndex) {
  if (cells[rowIndex][columnIndex] === "o") {
    cells[rowIndex][columnIndex] = "x";
  } else {
    cells[rowIndex][columnIndex] = "o";
  }
}
