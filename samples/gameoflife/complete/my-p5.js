// 変数の宣言
let w; // セルの幅(ピクセル)
let columns; // 列数
let rows; // 行数
let cells; // セルの状態2次元配列
let next; // 次世代のセルの状態を保持する。

function setup() {
  // フレームレートを24フレーム/秒に設定
  frameRate(10);

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

function randomDeadOrLive() {
  let deadOrLive = ["o", "x"];
  return random(deadOrLive);
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
      // i行目j列目の要素をランダムに埋める
      // ただし端は死んだ状態にする
      if(i === 0 || j === 0 || i === rows - 1 || j === columns - 1){
        cells[i][j] = 'x'
      }else {
        cells[i][j] = randomDeadOrLive();
      }
    }
  }

  // 行数分のundefined要素をもった配列で初期化
  next = new Array(rows);

  // 行ループ
  for (let i = 0; i < rows; i++) {
    // さらに要素ごとに、列数分のundefined要素をを持った配列で初期化
    next[i] = new Array(columns);

    // 列ループ
    for (let j = 0; j < columns; j++) {
      // i行目j列目の要素を'x'で埋める
      next[i][j] = "x";
    }
  }

}


function draw() {
  goNextGeneration();

  // 行ループ
  for (let i = 0; i < rows; i++) {
    // 列ループ
    for (let j = 0; j < columns; j++) {
      if (cells[i][j] === "x") {
        fill(0); // 黒で塗りつぶし
      } else {
        fill(255); // 白で塗りつぶし
      }
      rect(j * w, i * w, w, w);
    }
  }
}

// 現在のcellsの値をもとに次の世代のcellsの値を決める
function goNextGeneration() {
  console.log('ij', cells[1][5])
  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < columns - 1; j++) {
      // 周囲のセルの条件をチェック
      // 隣接するセルの'o'の数をカウント
      let neighbors = 0;
      // 左上
      if (cells[i - 1][j - 1] === "o") {
        neighbors++;
      }
      // 真上
      if (cells[i - 1][j] === "o") {
        neighbors++;
      }
      // 右上
      if (cells[i - 1][j + 1] === "o") {
        neighbors++;
      }
      // 左
      if (cells[i][j - 1] === "o") {
        neighbors++;
      }
      // 右
      if (cells[i][j + 1] === "o") {
        neighbors++;
      }
      // 左下
      if (cells[i + 1][j - 1] === "o") {
        neighbors++;
      }
      // 真下
      if (cells[i + 1][j] === "o") {
        neighbors++;
      }
      // 右下
      if (cells[i + 1][j + 1] === "o") {
        neighbors++;
      }


      // そのセルが死んでいたとする。そのセルに隣接するセルのうちちょうど３つが生きていれば、次の世代で、そのセルは誕生する。
      if (cells[i][j] === "x" && neighbors === 3) {
        next[i][j] = "o";
        // そのセルが生きていたとする。そのセルに隣接するセルのうち4つ以上のセルが生きていれば、次の世代で、そのセルは過密により死滅する。
      } else if (cells[i][j] === "o" && neighbors > 3) {
        next[i][j] = "x";
        // そのセルが生きていたとする。そのセルに隣接するセルのうちちょうど２つか３つが生きていれば、次の世代で、そのセルは生存する。
      } else if (cells[i][j] === "o" && neighbors >= 2) {
        next[i][j] = "o";
        // そのセルが生きていたとする。そのセルに隣接するセルのうち1つ以下しか生きていなければ、次の世代で、そのセルは過疎により死滅する。
      } else if (cells[i][j] === "o" && neighbors <= 1) {
        next[i][j] = "x";
      } else {
        next[i][j] = cells[i][j]
      } 

    }
  }

  // 世代を置き換える
  // このとき、cells = nextだけだと、配列は参照渡しなので、
  // nextが書き換わるとcellsの値まで書き換わってしまう。
  // そこで値をコピーして渡す。structuredCloneはコピー関数。
  cells = structuredClone(next);

  // コピーするかわりに参照を入れ替えるやり方もある
  // let temp = cells;
  // next = temp;
  // next = cells;
}
