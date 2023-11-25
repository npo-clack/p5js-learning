// 変数の宣言
let boids;

function setup() {
  // フレームレートを24フレーム/秒に設定
  // frameRate(24);

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
    // 画面端にきたら逆側から出現する
    if (boids[i].position.x >= width) {
      boids[i].position.x = 0;
    } else if (boids[i].position.x <= 0) {
      boids[i].position.x = width;
    } else if (boids[i].position.y >= height) {
      boids[i].position.y = 0;
    } else if (boids[i].position.y <= 0) {
      boids[i].position.y = height;
    }
    boids[i].update(boids);

    circle(boids[i].position.x, boids[i].position.y, boids[i].r * 2);
  }
}
class Boid {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.05;
    this.r = 8;
  }

  update(boids) {
    this.windowLoop();
    // 群れの力を適用
    this.flock(boids);
    // 速度を変化させる
    this.velocity.add(this.acceleration);
    // 最大速度を3にする。
    this.velocity.limit(this.maxSpeed);
    // 位置を変化させる
    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

  flock(boids) {
    const sep = this.separate(boids);
    const ali = this.align(boids);
    const coh = this.cohesion(boids);

    sep.mult(2.5);
    ali.mult(1.0);
    coh.mult(1.0);

    this.acceleration.add(sep);
    this.acceleration.add(ali);
    this.acceleration.add(coh);
  }

  windowLoop() {
    // 画面端にきたら逆側から出現する
    if (this.position.x < -this.r) {
      this.position.x = width + this.r;
    }
    if (this.position.y < -this.r) {
      this.position.y = height + this.r;
    }
    if (this.position.x > width + this.r) {
      this.position.x = -this.r;
    }
    if (this.position.y > height + this.r) {
      this.position.y = -this.r;
    }
  }

  /**
   * 反発力を与える
   * @param boids - 他のboidの群れを引数に取る
   */
  separate(boids) {
    const neighborDistance = this.r * 2;
    const separatePower = createVector(0, 0);
    // 他のすべてのboidをチェック
    for (let i = 0; i < boids.length; i++) {
      // 距離を計算する
      const d = p5.Vector.dist(this.position, boids[i].position);

      let count = 0;
      // 距離が近ければ、逆方向の加速度を加える
      // ２つの円が接する32ピクセルいないで
      // d === 0 は自分自身なので除く
      if (d !== 0 && d < neighborDistance) {
        // 反発ベクトルの向きの計算
        const diff = p5.Vector.sub(this.position, boids[i].position);
        separatePower.add(diff);

        count++;
      }

      // 速度分反発力を減少させる。
      if (separatePower.mag() > 0) {
        separatePower.normalize();
        separatePower.mult(this.maxSpeed);
        separatePower.sub(this.velocity);
        separatePower.limit(this.maxForce);
      }
      // 加速度を更新する
    }
    return separatePower;
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohesion(boids) {
    const neighbordist = 50;
    const sum = createVector(0, 0);
    let count = 0;

    for (let i = 0; i < boids.length; i++) {
      const d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].position);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0, 0);
    }
  }

  seek(target) {
    const desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxSpeed);
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }
}
