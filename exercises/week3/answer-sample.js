let x = 50; // 四角形の初期位置(X座標)
let y = 50; // 四角形の初期位置(Y座標)
let speed = 5; // 移動速度

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  fill(100);
  rect(x, y, 100);

  // キー入力を処理する
  if (keyIsDown(LEFT_ARROW)) {
    x -= speed; // 左に移動
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x += speed; // 右に移動
  }
  if (keyIsDown(UP_ARROW)) {
    y -= speed; // 上に移動
  }
  if (keyIsDown(DOWN_ARROW)) {
    y += speed; // 下に移動
  }
}
