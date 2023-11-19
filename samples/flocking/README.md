# Boids（鳥の群れ）の飛行シュミレーション

このサンプルは p5.js を使って鳥の群れをシュミレーションします。ただ見るだけでも面白く暇つぶしになりますね。

boid とは bird をもじったもので、鳥をコンピュータ上でシュミレートするさいに鳥っぽい人工生命のことを指します。

https://en.wikipedia.org/wiki/Boids

## 必要スキル&知識

- p5.js の基礎(setup, draw)
- クラス

事前にパーティクルをやった人のみが取り組めます。

## 群れのシュミレーション

ルール 1: 分離
separate() は近くの鳥との距離が近い場合に反発力を発生させ、個体同士を離れさせます。
これらのメソッドは、群れの中での個体同士の相互作用をシミュレートします。

ルール 2: 整列
align() は近くの仲間の平均速度を計算し、それに合わせて速度を調整します。

ルール 3: 結合
cohesion() は近くの仲間の平均位置を求め、その位置に向かう方向の力を発生させます。

## Get Started

### ステップ１ ready フォルダを開いて現在の状態を確認しましょう

LivePreview で ready フォルダの`index.html`を開く。青い背景のキャンバスが作成されているのを確認しましょう。また`my-p5.js`を開いてソースコードを確認しましょう。

チェックポイント

- createCanvas(720, 400)で 720×400 のキャンバスを作成しています
- background('#E0F4FF')でカラーコード#E0F4FF の背景色を指定してます

### ステップ２ クラスで Boid を表現する

クラスを触ったことのない人は先に JS におけるクラスの書き方を学んでください。

Boid クラスを作成します。Boid クラスには初期位置を渡してを渡してインスタンス化します。

```js
function setup() {
  // フレームレートを24フレーム/秒に設定
  // frameRate(24);

  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);

  // 背景色をカラーコード#E0F4FFに指定
  background("#E0F4FF");
}

function draw() {}

class Boid {
  /**
   * 初期位置
   * x: x座標
   * y: y座標
   */
  constructor(x, y) {
    this.position = {
      x: x,
      y: y,
    };
  }
}
```

この Boid を`setup`関数でインスタンス化します。

```js
let boid; // 鳥1羽

function setup() {
  // フレームレートを24フレーム/秒に設定
  // frameRate(24);

  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);

  // 背景色をカラーコード#E0F4FFに指定
  background("#E0F4FF");

  // x: 300, y:300 の位置でBoidを初期化
  boid = new Boid(300, 300);
}

function draw() {}
```

Boid を描画します。Boid はとりあえ半径 30 の円形の形としておきます。

```js
// 省略

draw(){
  circle(boid.position.x, boid.position.y, 30)
}
```

![鳥1羽を描画](/samples//flocking/boid-1.jpeg)

1 匹だけだと寂しいので適当な位置に 3 匹の Boid を描画してみてください。今後たくさんの Boid を描画したいので、配列としてその Boid たちを保持してあげましょう。

<details>

<summary>ヒント</summary>

配列は次のように初期化できます。

```js
let boids;

function(){
  boids = []
}
```

配列に要素を追加するには`boids.push(ようそ)`で可能です。

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/push

</details>

<details>

<summary>答え</summary>

```js
let boids; // 鳥の群れ

function setup() {
  // フレームレートを24フレーム/秒に設定
  // frameRate(24);

  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);

  // 背景色をカラーコード#E0F4FFに指定
  background("#E0F4FF");

  // x: 300, y:300 の位置でBoidを初期化
  boids.push(new Boid(30, 30));
  boids.push(new Boid(250, 250));
  boids.push(new Boid(300, 300));
}

function draw() {
  for (let i = 0; i < boids.length; i++) {
    circle(boids[i].position.x, boids[i].position.y, 30);
  }
}
```

</details>

![鳥3羽を描画](/samples//flocking/boids-static.jpeg)

### ステップ 3 Boid に動きを与える

これは鳥の群れの飛行シュミレーションなので、動きがほしいですね。ということで Boid に速度を与えます。Boid クラスに以下のコードを追加しましょう。速度は一旦 x 方向に 50、y 方向に 50 にします。

```js
// 省略

class Boid {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y,
    };
    // ここから追記
    this.velocity = {
      x: 50,
      y: 50,
    };
  }
}
```

そして、各フレームごとに、現在の Boid の位置(position)に速度(velocity)を加えます。

速度とは、現実世界では、秒間でどれくらいの距離移動するのかを指します。アニメーションの世界では、秒ではなくフレームに置き換え、フレーム間でどれくらいのピクセル移動するのかを指します。フレームごとの更新は`draw()`が担っているので、`draw()`が実行されるごとに、position に velocity を足せば良いのです。

といことで、`draw()`を更新します。

```js
function draw() {
  for (let i = 0; i < boids.length; i++) {
    // 現在のpositionにvelocityを足す
    // += になっていることに注意
    boids[i].position.x += boids[i].velocity.x;
    boids[i].position.y += boids[i].velocity.y;

    circle(boids[i].position.x, boids[i].position.y, 30);
  }
}
```

画面を更新して...。うまく動きましたか？

![鳥3羽を描画](/samples//flocking/boids-velocity.jpeg)

かなりスピードが早いですね。もう少し速度を抑えましょう。

```js
// 省略

class Boid {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y,
    };
    // ここから追記
    this.velocity = {
      x: 5,
      y: 5,
    };
  }
}
```

ちょうどよい速度になりました。ただ、前の描画が残って軌跡になってしまっています。`draw()`の最初に背景色で塗りつぶすことで前回の描画の残りを上塗りしてしまいましょう。

```js
function draw() {
  // 背景色で塗りつぶし
  background("#E0F4FF");

  for (let i = 0; i < boids.length; i++) {
    // 現在のpositionにvelocityを足す
    // += になっていることに注意
    boids[i].position.x += boids[i].velocity.x;
    boids[i].position.y += boids[i].velocity.y;

    circle(boids[i].position.x, boids[i].position.y, 30);
  }
}
```

![鳥3羽が動く](/samples//flocking/boids-moving.gif)

### ステップ 4 数を増やして、ランダム性を与える

鳥の群れのシュミレーションなので、数を増やしましょう！ 鳥の数を 3 羽から 100 羽に増やしてみてください。とりあえず、すべての鳥を座標 x: 300 y: 300 で描画してください。

<details>

<summary>答え</summary>

```js
let boids; // 鳥の群れ

function setup() {
  // フレームレートを24フレーム/秒に設定
  // frameRate(24);

  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);

  // 背景色をカラーコード#E0F4FFに指定
  background("#E0F4FF");

  // x: 300, y:300 の位置でBoidを初期化
  for (let i = 0; i < 100; i++) {
    boids[i].position.x += boids[i].velocity.x;
    boids[i].position.y += boids[i].velocity.y;

    boids.push(new Boid(300, 300));
  }
}

function draw() {
  for (let i = 0; i < boids.length; i++) {
    circle(boids[i].position.x, boids[i].position.y, 30);
  }
}

class Boid {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y,
    };
    this.velocity = {
      x: 5,
      y: 5,
    };
  }
}
```

</details>

つぎに座標の位置をランダムにしましょう！ p5.js には`random`という関数が提供されています。また`width`と`height`という変数が最初から定義されており、キャンバスのサイズがが取得できます。

[ランダムの使い方](https://p5js.org/reference/#/p5/random)

この`random`に`width`を渡すと、0 ~ `width`の範囲を返してくれます。どうように`height`を渡すと、0 ~ `height`の範囲を返してくれます。

```js
// 省略

function setup() {
  // フレームレートを24フレーム/秒に設定
  // frameRate(24);

  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);

  // 背景色をカラーコード#E0F4FFに指定
  background("#E0F4FF");

  console.log("ランダムなx", random(width));
  console.log("ランダムなｙ", random(height));

  // x: 300, y:300 の位置でBoidを初期化
  for (let i = 0; i < 100; i++) {
    boids.push(new Boid(300, 300));
  }
}

// 省略
```

これを使って、100 個の Boid をランダムに配置してみてください。

<details>

<summary>答え</summary>

```js
let boids; // 鳥の群れ

function setup() {
  // フレームレートを24フレーム/秒に設定
  // frameRate(24);

  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);

  // 背景色をカラーコード#E0F4FFに指定
  background("#E0F4FF");

  // x: 300, y:300 の位置でBoidを初期化
  for (let i = 0; i < 100; i++) {
    boids.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  for (let i = 0; i < boids.length; i++) {
    boids[i].position.x += boids[i].velocity.x;
    boids[i].position.y += boids[i].velocity.y;

    circle(boids[i].position.x, boids[i].position.y, 30);
  }
}

class Boid {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y,
    };
    this.velocity = {
      x: 5,
      y: 5,
    };
  }
}
```

</details>

大量の円が流れて行きますね。速度にもランダム性をもたせましょう！ Boid の速度はコンストラクタで定義されていました。

```js
// 省略

class Boid {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y,
    };
    this.velocity = {
      x: 5,
      y: 5,
    };
  }
}
```

これをランダムにします。

```js
// 省略

class Boid {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y,
    };
    this.velocity = {
      x: random(),
      y: random(),
    };
  }
}
```

とても遅くなりましたね。これは random()の基本範囲が 0~1 だからです。これだと少し遅すぎるので速度の最大を 5 にしましょう。最大値は`random()`の引数に渡します。

```js
// 省略

class Boid {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y,
    };
    this.velocity = {
      x: random(5), // ここを編集
      y: random(5), // ここを編集
    };
  }
}
```

いい感じにバラけましたね!

### ステップ 5 画面の端っこに来たら反対から出現するようにする。

複数の円が 100 個一斉に動かすことはできました。しかし、数秒すると皆画面から消えてしまいます。これではシュミレーションとしては一瞬でつまらないですね。そこで画面端っこにきたら反対側から出現するようにします。

どうすれば実現できそうですか？一度考えてみてください。

<details>
  <summary>ヒント</summary>

</details>

<details>
  <summary>答え</summary>

`draw`関数のループの中で、上下端にきたらキャンバスの高さの分、Boid の`position.y`を移動させ、左右端にきたらキャンバスの幅の分、Boid の`position.x`を移動させる。

```js
let boids; // 鳥の群れ

function setup() {
  // フレームレートを24フレーム/秒に設定
  // frameRate(24);

  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);

  // 背景色をカラーコード#E0F4FFに指定
  background("#E0F4FF");

  // x: 300, y:300 の位置でBoidを初期化
  for(let i = 0; i < 100; i++){
    boids.push(new Boid(random(width), random(height)));
  }
}

function draw(){
  for(let i = 0; i < boids.length; i++){
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

    // 毎フレーム速度成分を足して移動
    boids[i].position.x += boids[i].velocity.x;
    boids[i].position.y += boids[i].velocity.y;

    circle(boids[i].position.x, boids[i].position.y, 30);
  }
}

class Boid {
  constructor(x, y){
    this.position = {
      x: x,
      y: y
    };
    this.velocity = {
      x: random(),
      y: random(),
    }
  }
}
```

</details>

雪みたいになってきましたか？

![画面端ループ](/samples//flocking/boids-like-snow.jpeg)

### ステップ6 クラスとして整理する

いま`draw()`の中で、たくさんのBoidの`position`を修正する処理をしています。これをクラスのメソッドとしてまとめましょう。

```js
let boids; // 鳥の群れ

function setup() {
  // フレームレートを24フレーム/秒に設定
  // frameRate(24);

  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);

  // 背景色をカラーコード#E0F4FFに指定
  background("#E0F4FF");

  // x: 300, y:300 の位置でBoidを初期化
  for(let i = 0; i < 100; i++){
    boids.push(new Boid(random(width), random(height)));
  }
}

function draw(){
  for(let i = 0; i < boids.length; i++){

    // positionを変化させる処理をまとめる。
    boids[i].update();

    circle(boids[i].position.x, boids[i].position.y, 30);
  }
}

class Boid {
  constructor(x, y){
    this.position = {
      x: x,
      y: y
    };
    this.velocity = {
      x: random(),
      y: random(),
    }
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
  plusVelocity(){
    // 毎フレーム速度成分を足して移動
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  update(){
    this.windowLoop();
    this.plusVelocity();
  }
}
```

少しスッキリしましたね。このようにクラスは自分自身の値を変えるのがとても得意です。こうすることで、Boidに関するコードが様々な場所にバラけずにまとまりが良くなります。

### ステップ7 他のBoidと相互作用をする。反発力編

いまはまだ、この Boidたちは他のBoidと相互作用していません。各々が独自に動いているだけです。しかし実際の鳥の群れは他の鳥と相互作用しているはずです。

例えば、今はBoid同士が重なってしまっていますが、現実では鳥同士が完全にかさなることはありえませんね。そこでBoid同士に反発力を与えます。

そこでBoidクラスに`separate`メソッドを定義しました。

```js

class Boid {
  constructor(x, y){
    this.position = {
      x: x,
      y: y
    };
    this.velocity = {
      x: random(),
      y: random(),
    }
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
  plusVelocity(){
    // 毎フレーム速度成分を足して移動
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  /**
   * 反発力を与える
   * @param boids - 他のboidの群れを引数に取る
   */
  separate(boids){
    // 自分のpositionを変化させる
  }

  update(){
    this.windowLoop();
    this.plusVelocity();
  }
}
```

では皆さん、この`separate`メソッドの実装を考えてみてください。

もう一度説明すると、

- Boid同士は基本的に重なることはないので、個体同士に反発力を与えたい
- separateメソッドで他のBoidを受け取って、重ならないようにする

ことを実現したいです。

<details>
  <summary>ヒント1</summary>

  1つの方法としては、他のBoidの座標をチェックして、自分の円の範囲ないに存在する場合は、自分のpositionをずらすことが考えられますね。しかし、現実ではではそれは瞬間移動となりありえません。そこで、速度成分を変えることを考えましょう。
</details>

<details>
  <summary>ヒント2</summary>

  速度成分を変える力のことを加速度と言います。Boidクラスを以下のように書き換えてください。

  ```js
  class Boid {
    constructor(x, y){
      this.position = {
        x: x,
        y: y
      };
      // 速度
      this.velocity = {
        x: random(),
        y: random(),
      }
      // 加速度
      this.acceleration = {
        x: -0.1,
        y: -0.1,
      }
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
    plusVelocity(){
      // 毎フレーム速度成分を足して移動
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }

    /**
     * 反発力を与える
     * @param boids - 他のboidの群れを引数に取る
     */
    separate(boids){
      // 自分のpositionを変化させる
    }

    /**
     * 速度成分を変化させる。
     */
    plusAcceleration(){
      this.velocity.x += this.acceleration.x;
      this.velocity.y += this.acceleration.y;
    }

    update(){
      this.windowLoop();
      this.plusAcceleration();
      this.plusVelocity();
    }
  }
  ```

　　 そして、コンストラクタないの加速度に適当な値を入れてみましょう。例えば、左上方向に方向に風が吹いているとします。
  ```js
　　 this.acceleration = {
    x: -0.1, // 左方向に引っ張られる力
    y: -0.1, // 上方向に引っ張られる力
  }
  ```

  すごいことになりましたね笑。一旦加速度を0に戻して、最大速度を超えないように設定しましょう。

  ```js
  class Boid {
    constructor(x, y){
      this.position = {
        x: x,
        y: y
      };
      // 速度
      this.velocity = {
        x: random(),
        y: random(),
      }
      // 加速度
      this.acceleration = {
        x: 0,
        y: 0,
      }
      // 最大速度
      this.maxVelocity = {
        x: 1,
        x: 1,
      }
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
    plusVelocity(){
      // 毎フレーム速度成分を足して移動
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }

    /**
     * 反発力を与える
     * @param boids - 他のboidの群れを引数に取る
     */
    separate(boids){
      // 自分のpositionを変化させる
    }

    /**
     * 速度成分を変化させる。
     */
    plusAcceleration(){
      this.velocity.x += this.acceleration.x;
      this.velocity.y += this.acceleration.y;
      // 最大速度を超えないようにする
      if(this.velocity.x > this.maxVelocity.x) {
        this.velocity.x = this.maxVelocity.x;
      }
      if(this.velocity.y > this.maxVelocity.y) {
        this.velocity.y = this.maxVelocity.y;
      }
    }

    update(){
      this.windowLoop();
      this.plusAcceleration();
      this.plusVelocity();
    }
  }
  ```

  これで、加速度を設定しても安心です。

　　　　```js
　　 this.acceleration = {
    x: -0.1, // 左方向に引っ張られる力
    y: -0.1, // 上方向に引っ張られる力
  }
  ```

  これでも、やっぱり目がチカチカしますね笑。一旦加速度は0に戻しておきましょう。
</details>

<details>
<summary>ヒント3</summary>

加速度を定義できたので、反発力を新しく定義できそうです。

- Boid同士は基本的に重なることはないので、個体同士に反発力を与えたい
- separateメソッドで他のBoidを受け取って、重ならないようにする
- 他のBoidとの距離が近ければ逆方向の加速度を与える。

では他のBoidとの距離はどう計算すればよいでしょうか？ 2点間の(x,y)座標の距離の計算です。これはユークリッド距離と呼ばれ次の計算式で表すことができます。

点A(x1, y1)と点B(x2, y2)がある。
点Aと点Bの距離 = √((y2 - y1)^2 + (x2 - x1)^2)
√は平方根、^は乗数を示す

要は、x座標の差分の2乗と、y座標の差分の2乗を足して、平方根を取ったものです。

```js

class Boid{
  // 省略

  /**
 * 反発力を与える
 * @param boids - 他のboidの群れを引数に取る
 */
  separate(boids){
    // 他のすべてのboidをチェック
    for(let i = 0; i < boids.length; i++){
      // 距離を計算する
      const d = Math.sqrt((boids[i].position.x - this.position.x)**2 + (boids[i].position.y - this.position.y)**2)

      // 距離が近ければ、逆方向の加速度を加える
      // d === 0 は自分自身なので除く 
      // if(d !== 0 && d < ???){
      //   // ???
      // }
    }
  }

  // 省略
}
```

これで他のBoidとの距離がわかりました。ところで次のコメント部分が気になったかもしれません。
```js
      // 距離が近ければ、逆方向の加速度を加える
      // d === 0 は自分自身なので除く 
      // if(d !== 0 && d < ???){
      //   // ???
      // }
```

距離が近ければ、という条件に対して、プログラムには具体的な数値を指示しなければいけません。とりあえず円の半径が30ピクセルなので、60ピクセル(２つの円がちょうど接する距離)を与えてみます。
```js
      // 距離が近ければ、逆方向の加速度を加える
      // d === 0 は自分自身なので除く 
      if(d !== 0 && d < 60){
        // ???
      }
```

また、引数のboidsにはには自分自身も含まれているため、自分を除外する処理が必要です。この場合距離が0のものを実質自分として除外することにします。ｘ

次に、逆方向の加速度を計算するにはどうしたらよいでしょうか？

</details>

<details>
<summary>ヒント4</summary>

逆方向の加速度を計算するには、単純に２点間の差分をとればよいです。これをより詳しく理解するにはベクトルという概念を学ぶ必要がありますが、以下の図をみれば直感的にわかるかもしれません。

![反発ベクトル](/samples//flocking/separate.jpg)

ということで、反発力の方向は単純に２つのBoidのx座標とy座標の差分を取ることでわかります。

```js

class Boid{
  // 省略

  /**
 * 反発力を与える
 * @param boids - 他のboidの群れを引数に取る
 */
  separate(boids){
    // 他のすべてのboidをチェック
    for(let i = 0; i < boids.length; i++){
      // 距離を計算する
      const d = Math.sqrt((boids[i].position.x - this.position.x)**2 + (boids[i].position.y - this.position.y)**2)

      // 距離が近ければ、逆方向の加速度を加える
      // ２つの円が接する60ピクセルいないで
      // d === 0 は自分自身なので除く
      if(d !== 0 && d < 60){
        // 反発ベクトルの向きの計算
        const separatePower = {
          x: 0,
          y: 0
        } 

        // 仮に相手が右側にいた場合、反発力はマイナス方向になるはず。
        // その場合、相手 - 自分だと 値がプラスになるから、
        // 自分 - 相手 が値がマイナスになり正解
        // これは一般的に相手がどの位置にいてもいえることなので、自分 - 相手で反発方向を取得できる
        separatePower.x = this.position.x - boids[i].position.x
        separatePower.y = this.position.y - boids[i].position.y

        // 加速度を更新する
        this.acceleration.x = separatePower.x;
        this.acceleration.y = separatePower.y;
      }
    }
  }

  // 省略
}
```

さて、`separate`メソッドにboidsを渡してあげるために、いろいろと更新する必要があります。

まずは`update`で`separate`メソッドを`plusAcceleration`の前に追加します。これで速度に加速度を加算するまえに、反発力を反映させることができるようになりました。そして`separate`メソッドに`boids`を渡してあげますが、そのためにはそもそも`update`メソッドに`boids`を渡してあげないといけませんね。

```js

  update(boids) {
    this.windowLoop();
    // 新しく追加
    this.separate(boids);
    this.plusAcceleration();
    this.plusVelocity();

    this.acceleration = {
      x: 0,
      y: 0,
    };
  }
```

`draw`関数で`update`を呼び出している箇所で、`update`の引数に`boids`そのものを渡してあげます。

```js
function draw(){
  for(let i = 0; i < boids.length; i++){

    // positionを変化させる処理をまとめる。
    // boidsを渡す
    boids[i].update(boids);

    circle(boids[i].position.x, boids[i].position.y, 30);
  }
}

```

これで一度実行してみましょう。多分すごいことになります。

なぜなら、加速度が半永久的に速度に加算されていっているからです。
基本的に重力や風がない限り加速度は永遠に発生しないはずです。ほかのBoidから十分な距離があれば反発力は発生しません。そこで、加速度を`update`ないで`position`の計算をしたあとで、0にリセットしたいと思います。

```js

  update(boids) {
    this.windowLoop();
    this.separate(boids);
    this.plusAcceleration();
    this.plusVelocity();

    // 加速度を毎フレームごとに0にリセット
    this.acceleration = {
      x: 0,
      y: 0,
    };
  }
```

これでもかなりのスピードです。実は先程のロジックには欠陥があります。

具体的にはここです。

```js
  // 仮に相手が右側にいた場合、反発力はマイナス方向になるはず。
  // その場合、相手 - 自分だと 値がプラスになるから、
  // 自分 - 相手 が値がマイナスになり正解
  // これは一般的に相手がどの位置にいてもいえることなので、自分 - 相手で反発方向を取得できる
  separatePower.x = this.position.x - boids[i].position.x
  separatePower.y = this.position.y - boids[i].position.y

  // 加速度を更新する
  this.acceleration.x = separatePower.x;
  this.acceleration.y = separatePower.y;
```

２つの欠陥があります。
- 60ピクセルいないにいないに存在するすべてのBoidに対して、反発力を計算しているが、結局一番最後のやつで上書きされてしまっている。本当であれば、60ピクセルいないにすべてのBoidの反発力を計算して、合計しなければいけない。それで最終的な反発力の向きが決まる(ベクトルの合成)。
- 反発力を単に2点間の距離として加速度を更新しているが、これだと加速度の値が余裕で30とかいってしまう。毎フレームごとに速度が30増えればかなりのスピードになってしまうため現実的ではない。加速度の値は0.1あたりに抑えとく。

これを修正すると次のようになります。

```js

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
      // ２つの円が接する60ピクセルいないで
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

    // 0でわるのを防ぐ
    if (separatePowerSize > 0) {
      // separatePowerSizeでわれば大体1以下になる
      // それをさらに10でわれば大体0.1以下になる
      separatePower.x = separatePower.x / separatePowerSize / 10;
      separatePower.y = separatePower.y / separatePowerSize / 10;
    }

    // 加速度に反映させる
    this.acceleration.x = separatePower.x;
    this.acceleration.y = separatePower.y;
  }
```

これで異常加速するのを防ぐことができました。ただまだ早いので初期速度を5から1ぐらいに落としましょう。


</details>

<details>
<summary>
答え
</summary>

```js
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
      x: 1,
      x: 1,
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
    }
    if (this.velocity.y > this.maxVelocity.y) {
      this.velocity.y = this.maxVelocity.y;
    }
  }

  update(boids) {
    this.windowLoop();
    this.separate(boids);
    this.plusAcceleration();
    this.plusVelocity();

    this.acceleration = {
      x: 0,
      y: 0,
    };
  }
}
```
</details>
