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
        fill(255);
      } else {
        fill(0);
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
      cells[i][j] = "x";
    }
  }
}

function mouseClicked() {
  const currentIndex = getCurrentIndexFromMousePosition(mouseX, mouseY);
  toggleCellColor(currentIndex.rowIndex, currentIndex.columnIndex);
}

function getCurrentIndexFromMousePosition(x, y) {
  return {
    columnIndex: floor(x / w),
    rowIndex: floor(y / w),
  };
}

function toggleCellColor(rowIndex, columnIndex) {
  if (cells[rowIndex][columnIndex] === 255) {
    cells[rowIndex][columnIndex] = 0;
  } else {
    cells[rowIndex][columnIndex] = 255;
  }
}
