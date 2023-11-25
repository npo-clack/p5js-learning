let particles; // パーティクルの配列

function setup() {
  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);
  // 背景色をカラーコード#F4F2FF
  background("#F4F2FF");

  particles = [];

  for (let i = 0; i < 10; i++) {
    particles[i] = new Particle();
  }
}

// drawが今回フレームを更新する関数
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  // パーティクルの位置を更新する
  for (let i = 0; i < particles.length; i++) {
    // パーティクルの状態を更新
    particles[i].update();

    // 周りの線も透明化
    stroke(0, 0, 0, particles[i].lifespan);
    // 色と透明度を設定
    fill(255, 249, 79, particles[i].lifespan);
    circle(particles[i].position.x, particles[i].position.y, 12);

    // パーティクルの残り寿命がなくなったら配列から削除
    if (particles[i].isDead()) {
      // splice(インデックス番号、1)でその要素を削除できる
      particles.splice(i, 1);
    }
  }

  // パーティクルの数を増やす
  particles.push(new Particle());
}

class Particle {
  constructor() {
    this.position = createVector(random(345, 355), 150);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, random(0, 0.05));
    this.lifespan = 255;
  }

  addVelocityToPosition() {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.add(this.velocity);
  }

  addAccelerationToVelocity() {
    this.velocity.add(this.acceleration);
  }

  update() {
    // 速度に加速度を加算する
    this.addAccelerationToVelocity();

    // 位置に速度を加算する
    this.addVelocityToPosition();

    // 寿命を減らす
    this.lifespan--;
  }

  // パーティクルが死んでいるかどうかを判定するメソッド
  // Booleanを返すメソッドは一般的に「isなんちゃら」という名前をつける
  isDead() {
    return this.lifespan < 0;
  }
}
