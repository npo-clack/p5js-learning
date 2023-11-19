// 変数の宣言
let boids;

function setup() {
  // フレームレートを24フレーム/秒に設定
  frameRate(24);

  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);

  // 背景色をカラーコード#E0F4FFに指定
  background("#E0F4FF");

  boids = [];
  // x: 300, y:300 の位置でBoidを初期化
  for (let i = 0; i < 100; i++) {
    boids.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  // 背景色で塗りつぶし
  background("#E0F4FF");

  for (let i = 0; i < boids.length; i++) {
    boids[i].update(boids);

    circle(boids[i].position.x, boids[i].position.y, 30);
  }
}
class Boid {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y,
    };
    // 速度
    this.velocity = {
      x: random(1),
      y: random(1),
    };
    // 加速度
    this.acceleration = {
      x: -0.1,
      y: -0.1,
    };
    // 最大速度
    this.maxVelocity = {
      x: 0.1,
      x: 0.1,
    };
  }

  /**
   * 画面端ループ
   */
  windowLoop() {
    // 画面端にきたら逆側から出現する
    if (this.position.x >= width) {
      this.position.x = 0;
    } else if (this.position.x <= 0) {
      this.position.x = width;
    } else if (this.position.y >= height) {
      this.position.y = 0;
    } else if (this.position.y <= 0) {
      this.position.y = height;
    }
  }

  /**
   * 速度成分を足す
   */
  plusVelocity() {
    // 毎フレーム速度成分を足して移動
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  /**
   * 反発力を与える
   * @param boids - 他のboidの群れを引数に取る
   */
  separate(boids) {
    // 反発力(ベクトル)
    const separatePower = {
      x: 0,
      y: 0,
    };

    // 他のすべてのboidをチェック
    for (let i = 0; i < boids.length; i++) {
      // 距離を計算する
      const d = Math.sqrt(
        (boids[i].position.x - this.position.x) ** 2 +
          (boids[i].position.y - this.position.y) ** 2
      );

      // 距離が近ければ、逆方向の加速度を加える
      // とりあえず50ピクセルいない？
      // d === 0 は自分自身なので除く
      if (d !== 0 && d < 60) {
        // 反発力をどんどん加算していく(ベクトルの合成)
        separatePower.x += this.position.x - boids[i].position.x;
        separatePower.y += this.position.y - boids[i].position.y;
      }
    }

    // 反発力を加速度に反映させたいが、大きさがだいたい0.1ぐらいになるように調整する。
    // そのために反発力の大きさを計算して、その値でそれぞれのx成分、y成分を割ると(正規化)、だいたい1以内になる。
    const separatePowerSize = Math.sqrt(
      separatePower.x ** 2 + separatePower.y ** 2
    );

    if (separatePowerSize > 0) {
      separatePower.x = separatePower.x / separatePowerSize / 10;
      separatePower.y = separatePower.y / separatePowerSize / 10;
    }

    // 加速度に反映させる
    this.acceleration.x = separatePower.x;
    this.acceleration.y = separatePower.y;
  }

  /**
   * 速度成分を変化させる。
   */
  plusAcceleration() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    // 最大速度を超えないようにする
    if (this.velocity.x > this.maxVelocity.x) {
      this.velocity.x = this.maxVelocity.x;
    } else if (this.velocity.x < -this.maxVelocity.x) {
      this.velocity.x = -this.maxVelocity.x;
    }
    if (this.velocity.y > this.maxVelocity.y) {
      this.velocity.y = this.maxVelocity.y;
    } else if (this.velocity.y < -this.maxVelocity.y) {
      this.velocity.y = -this.maxVelocity.y;
    }
  }

  update(boids) {
    this.windowLoop();
    this.separate(boids);
    this.plusAcceleration();
    this.plusVelocity();
    console.log(this.velocity);

    this.acceleration = {
      x: 0,
      y: 0,
    };
  }
}
