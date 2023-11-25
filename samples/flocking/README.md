# Boids（鳥の群れ）の飛行シュミレーション

このサンプルは p5.js を使って鳥の群れをシュミレーションします。ただ見るだけでも面白く暇つぶしになりますね。

boid とは bird をもじったもので、鳥をコンピュータ上でシュミレートするさいに鳥っぽい人工生命のことを指します。

https://en.wikipedia.org/wiki/Boids

## 必要スキル&知識

- パーティクル(ベクトル)を事前に終わらせている前提
- 

事前にパーティクルをやった人のみが取り組めます。

## 群れのシュミレーション

ルール 1: 分離
separate() は近くの鳥との距離が近い場合に反発力を発生させ、個体同士を離れさせます。

ルール 2: 整列
align() は近くの仲間の平均速度を計算し、それに合わせて速度を調整します。

ルール 3: 結合
cohesion() は近くの仲間の平均位置を求め、その位置に向かう方向の力を発生させます。

## Get Started

### ステップ1 クラスで Boid を表現する

Boid クラスを作成します。Boid クラスには初期位置を渡してを渡してインスタンス化します。
また、最初から速度と加速度を持たせておきます。
Boid の形は鳥型にしたいところですが、今回は簡単のため、とりあえ半径 16 の円形の形としておきます。

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
    // 半径
    this.r = 16;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
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

Boid を描画します。

```js
// 省略

draw(){
  circle(boid.position.x, boid.position.y, boid.r)
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

配列に要素を追加するには`boids.push(要素)`で可能です。

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
    circle(boids[i].position.x, boids[i].position.y, boids[i].r);
  }
}
```

</details>

![鳥3羽を描画](/samples//flocking/boids-static.jpeg)

### ステップ 3 Boid に動きを与える

これは鳥の群れの飛行シュミレーションなので、動きがほしいですね。ということで Boid にランダムに速度を与えます。速度を初期化している式で` createVector(0, 0)`のかわりに`p5.Vector.random2D()`で置き換えます。これはp5jsが提供しているメソッドで0~1の値をとるランダムなx成分とy成分をもったベクトルを作成します。

```js
// 省略

class Boid {
  constructor(x, y) {
    this.r = 16;
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
  }
}
```

そして、各フレームごとに、現在の Boid の位置(position)に速度(velocity)を加えます。

Boidクラスに`update`というメソッドを定義して、そこで位置に速度を加算します。そしてこの`update`メソッドを`draw`関数から呼び出します。

```js
function draw() {
  for (let i = 0; i < boids.length; i++) {
    boids[i].update();

    circle(boids[i].position.x, boids[i].position.y, boids[i].r;
  }
}

class Boid {
  constructor(x, y) {
    this.r = 16;
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
  }

  update(){
    this.position.add(this.velocity);
  }
}
```

画面を更新して...。うまく動きましたか？

![鳥3羽を描画](/samples//flocking/boids-velocity.jpeg)

前の描画が残って軌跡になってしまっています。`draw()`の最初に背景色で塗りつぶすことで前回の描画の残りを上塗りしてしまいましょう。

```js
function draw() {
  // 背景色で塗りつぶし
  background("#E0F4FF");

  for (let i = 0; i < boids.length; i++) {
    // 現在のpositionにvelocityを足す
    // += になっていることに注意
    boids[i].position.x += boids[i].velocity.x;
    boids[i].position.y += boids[i].velocity.y;

    circle(boids[i].position.x, boids[i].position.y, boids[i].r);
  }
}
```

![鳥3羽が動く](/samples//flocking/boids-moving.gif)

### ステップ 4 数を増やして、位置をランダムにする

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
    boids[i].update()

    boids.push(new Boid(300, 300));
  }
}

function draw() {
  for (let i = 0; i < boids.length; i++) {
    circle(boids[i].position.x, boids[i].position.y, boids[i].r);
  }
}

// 省略
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
    boids[i].update()

    circle(boids[i].position.x, boids[i].position.y, boids[i].r);
  }
}

// 省略
```

</details>


### ステップ 5 画面の端っこに来たら反対から出現するようにする。

複数の円が 100 個一斉に動かすことはできました。しかし、数秒すると皆画面から消えてしまいます。これではシュミレーションとしては一瞬でつまらないですね。そこで画面端っこにきたら反対側から出現するようにします。これを`windowLoop`というメソッドにし、`update`から呼び出すことにします。

```js
class Boid {
  constructor(x, y) {
    this.r = 16;
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
  }

  update() {
    this.windowLoop();
    this.position.add(this.velocity);
  }

  windowLoop(){
    // ここに処理を書く
  }
}

```
`windowLoop`の実装を一度考えてみてください。

<details>
  <summary>ヒント</summary>

まずは、状況を整理する。
上下端にきたらキャンバスの高さの分、Boid の`position.y`を移動させ、左右端にきたらキャンバスの幅の分、Boid の`position.x`を移動させる。

```js
  windowLoop() {
    // 画面端にきたら逆側から出現する
    if (this.position.x >= width) {
      this.position.x = 0;
    } 
    if (this.position.x <= 0) {
      this.position.x = width;
    } 
    if (this.position.y >= height) {
      this.position.y = 0;
    } 
    if (this.position.y <= 0) {
      this.position.y = height;
    }
  }
```

画面を更新してしばらく眺めてると...
あれれ、Boidたちが画面端っこにあつまってひっかかってますね。これは、画面右端にきて左にワープしたあと、次のフレームで、画面左端にきてるから画面右端にワープして...と、シーソーをしてしまっているからです。イコールが悪さをしています。イコールを取っ払いましょう。

```js
  windowLoop() {
    // 画面端にきたら逆側から出現する
    if (this.position.x > width) {
      this.position.x = 0;
    } 
    if (this.position.x < 0) {
      this.position.x = width;
    } 
    if (this.position.y > height) {
      this.position.y = 0;
    } 
    if (this.position.y < 0) {
      this.position.y = height;
    }
  }
```

あとは、円なので半径をを考慮します。

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
  for(let i = 0; i < 100; i++){
    boids.push(new Boid(random(width), random(height)));
  }
}

function draw(){
  for(let i = 0; i < boids.length; i++){
    boids[i].update();

    circle(boids[i].position.x, boids[i].position.y, 16);
  }
}


class Boid {
  constructor(x, y) {
    this.r = 16;
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
  }

  update() {
    this.windowLoop();
    this.position.add(this.velocity);
  }

  windowLoop() {
    // 画面端にきたら逆側から出現する
    if (this.position.x < -this.r) {
      this.position.x = width + this.r
    };
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
}
```

</details>

雪みたいになってきましたか？

![画面端ループ](/samples//flocking/boids-like-snow.jpeg)


### ステップ6 反発力を考慮する

このBoidたちは重なってしまいます。現実では鳥同士が完全にかさなることはありえませんね。そこでBoid同士に反発力を与えて重ならないようにしたいと思います。

そこでBoidクラスに`separate`メソッドを定義しました。`separate`は(自身を含む)Boidの群れ(配列)を受け取り、反発力を計算して、自身の加速度を変化させるメソッドです。

速度を変化させる加速度の概念をコードに反映させるため以下の処理を追加しています。

- `update`メソッド内部で、`this.velocity.add(this.acceleration)`を`this.position.add(this.velocity)`の前に追加しました。
- `update`メソッド内部で、`this.separate()`を`this.velocity.add(this.acceleration)`の前に追加しました。


```js

function draw(){
  for(let i = 0; i < boids.length; i++){
    // 引数のboidsの配列をまるごと渡す。
    boids[i].update(boids);

    circle(boids[i].position.x, boids[i].position.y, 16);
  }
}

class Boid {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
  }

  // 引数にboidsを追加
  update(boids) {
    this.windowLoop();
    // 個体が重ならないように加速度を変化させる。
    // 引数のboidsはupdateの引数から渡す。
    this.separate(boids);
    // 速度を変化させる
    this.velocity.add(this.acceleration);
    // 位置を変化させる 
    this.position.add(this.velocity);
  }

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
   * 加速度を変化させる
   * 個体同士が重ならないようにする
   * 引数 boids - 自身を含むBoidの配列
   */
  separate(boids){
    // ここに処理を書く
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

  速度成分を変える力のことを加速度と言います。

　　 そして、コンストラクタないの加速度に適当な値を入れてみましょう。例えば、左上方向に方向に風が吹いているとします。
  ```js
　　// 左上方向に引っ張られる力
　　 this.acceleration = createVector(-0.1, -0.1);
  ```

  これで画面を更新すると白い円たちが左上に流れていきます。このコードでは加速度は毎フレームごとに永遠足されていくので、最終的には速度が無限になってしまいますが、実際は空気摩擦などがあり、もう少し加速が遅くなるはずです。今回は速度にリミットをかけようと思います。速度が3より大きくならないようにします。`update`を次のように変更します。

  p5jsのベクトルには`limit`というメソッドがあり、これでベクトルの大きさを引数の値まで「刈り取る」ことができます。便利ですね！

  ```js
  class Boid {

    constructor(x, y){
      // 省略
      this.maxSpeed = 3
    }

    update() {
      this.windowLoop();
      // 個体が重ならないように加速度を変化させる。
      this.separate();
      // 速度を変化させる
      this.velocity.add(this.acceleration);
      // 最大速度を3にする。
      this.velocity.limit(this.maxSpeed);
      // 位置を変化させる 
      this.position.add(this.velocity);
    }
  ```

加速度がわかったので、加速度の初期化をもとの0に戻しておきましょう。

コンストラクタ内で、
```js
this.acceleration = createVector(0,0);
```
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

p5jsのベクトルの場合、`p5.Vector.dist(p1, p2)`を使えば２点間の距離を計算することができます。

```js
//　２点間の距離
const d = p5.Vector.dist(自分の座標ベクトル, 相手の座標ベクトル);
```

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
      const d = p5.Vector.dist(this.position, boids[i].position);

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

距離が近ければ、という条件に対して、プログラムには具体的な数値を指示しなければいけません。そこで`neighborDistance`(ご近所との距離)という自身の半径に3ピクセル足した範囲内を対象にしようと思います。
```js

  separate(boids) {
    const neighborDistance = this.r + 3;
    // 他のすべてのboidをチェック
    for (let i = 0; i < boids.length; i++) {
      // 距離を計算する
      const d = p5.Vector.dist(this.position, boids[i].position);

      // 距離が近ければ、逆方向の加速度を加える
      if (d < neighborDistance) {
        /// ???
      }
    }
  }
```

また、引数のboidsにはには自分自身も含まれているため、自分を除外する処理が必要です。この場合距離が0のものを実質自分として除外することにします。
```js
      // 距離が近ければ、逆方向の加速度を加える
      // d === 0 は自分自身なので除く 
      if(d !==0 && d < neighborDistance){
        // ???
      }
```

```js
/*
 * 反発力を与える
 * @param boids - 他のboidの群れを引数に取る
 */
  separate(boids){
  　　　　const neighborDistance = this.r + 3;

    // 他のすべてのboidをチェック
    for(let i = 0; i < boids.length; i++){
      // 距離を計算する
      const d = p5.Vector.dist(this.position, boids[i].position);

      // 距離が近ければ、逆方向の加速度を加える
      // d === 0 は自分自身なので除く 
      if(d !== 0 && d < neighborDistance){
        // ???
      }
    }
  }
```

逆方向の加速度を与えるにはどうすればよいでしょうか？

次のヒントに続く...

</details>

<details>
<summary>ヒント4</summary>

逆方向の加速度は、自分の位置ベクトルと相手の位置ベクトルの差がとなります。相手から自分に向かって反発力が発生している感じですね。

![反発ベクトル](/samples//flocking/separate.jpg)

p5jsでは`p5.Vector.sub`をつかって２点間のベクトルの差分ベクトルを計算できます。

```js
const 反発力ベクトル = p5.Vector.sub(自分の位置ベクトル, 相手の位置ベクトル);
```

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
      const d = p5.Vector.dist(this.position, boids[i].position);

      // 距離が近ければ、逆方向の加速度を加える
      // ２つの円が接する60ピクセルいないで
      // d === 0 は自分自身なので除く
      if(d !== 0 && d < 2*this.r){
        // 反発ベクトルの向きの計算
        const separatePower = p5.Vector.sub(this.position, boids[i].position);

        // 加速度を更新する
        this.acceleration.add(separatePower);
      }
    }
  }

  // 省略
}
```


これで一度実行してみましょう。重ならないように反発していますが、つねにマックススピードで動いていますね。

なぜなら、加速度が半永久的に速度に加算されていっているからです。
基本的に重力や風がない限り加速度は永遠に発生しないはずです。ほかのBoidから十分な距離があれば反発力は発生しません。そこで、加速度を`update`ないで`position`の計算をしたあとで、0にリセットしたいと思います。`mult()`はベクトルを引数の数値分掛け算して矢印を伸ばしたり短くしたりします。multiple(掛ける)の略です。

```js

  update(boids) {
    this.windowLoop();
    this.separate(boids);
    this.velocity.add(this.acceleration);
        // 最大速度を3にする。
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    // 加速度を毎フレームごとに0にリセット
    // 0をかけることで0にリセットする
    this.acceleration.mult(0)
  }
```

これでもスピードは徐々にあがり落ちません。加速度は反発力が発生しない限り0ですが、一度上がった速度を減速させる力がないからです。しかし本来であれば、上がったスピードは他のBoidにぶつかれば減速するはずです。これをコードで再現しましょう！

```js

  /**
 * 反発力を与える
 * @param boids - 他のboidの群れを引数に取る
 */
  separate(boids){
    // 他のすべてのboidをチェック
    for(let i = 0; i < boids.length; i++){
      // 距離を計算する
      const d = p5.Vector.dist(this.position, boids[i].position);

      // 距離が近ければ、逆方向の加速度を加える
      // ２つの円が接する60ピクセルいないで
      // d === 0 は自分自身なので除く
      if(d !== 0 && d < 2*this.r){
        // 反発ベクトルの向きの計算
        const separatePower = p5.Vector.sub(this.position, boids[i].position);

        // 加速度を更新する
        this.acceleration.add(separatePower);
      }
    }
  }
```
