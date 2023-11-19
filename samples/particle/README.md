# パーティクル

パーティクルとは粒子のことです。小さな粒子をシュミレーションします。宇宙を表現したり、砂を表現したり、花火を表現したりなんかもできるかもしれません。

## Get Started

### ステップ１ ready フォルダを開いて現在の状態を確認しましょう

LivePreview で ready フォルダの`index.html`を開く。青い背景のキャンバスが作成されているのを確認しましょう。また`my-p5.js`を開いてソースコードを確認しましょう。

チェックポイント

- createCanvas(720, 400)で 720×400 のキャンバスを作成しています
- background('#E0F4FF')でカラーコード#E0F4FF の背景色を指定してます

### ステップ 2 最初のパーティクルを描画する

パーティクルは、半径 12 の円形をしているとします。

x： 100, y:350 の位置に半径１２の円を配置してください。

<details>
<summary>答え</summary>

```js
function setup() {
  // フレームレートを24フレーム/秒に設定
  // frameRate(24);

  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);
  // 背景色をカラーコード#E0F4FFに指定
  background("#E0F4FF");
}

function draw() {
  circle(350, 100, 12);
}
```

</details>

これで最初のパーティクル画鋲ができました。

### ステップ 3 速度を与える

いまのままだとパーティクルが動かないので面白くないですね。速度を与えましょう。

以下に一般的な速度とアニメーション(シュミレーション)における速度の違いを式として表してみました。

一般的な速度 = 距離(m など) / 時間(s など)
アニメーションにおける速度 = ピクセル数 / フレーム

アニメーションやシュミレーションにおける速度とは、各フレームで移動するピクセル数のことを指します。毎フレームごとにこの速度を位置(`position`)に足します。

完成コード

```js
let velocity; // 速度
let position; // パーティクルの位置
function setup() {
  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);
  // 背景色をカラーコード#F4F2FF
  background("#F4F2FF");

  velocity = {
    x: 0,
    y: 1,
  };
  position = {
    x: 350,
    y: 100,
  };
}

// drawが今回フレームを更新する関数
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  // パーティクルの位置を更新する
  // 位置に速度を加算する
  position.x += velocity.x;
  position.y += velocity.y;

  circle(position.x, position.y, 12);
}
```

これで画面を確認しましょう。ちゃんと動いてくれてますね。

![速度を与えた](/samples/particle/first-particle-velocity.jpeg)

ただ、前の軌跡が残ってしまっています。毎フレームごとに背景色で上塗りして、前の軌跡を消しましょう。

```js
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  // パーティクルの位置を更新する
  // 位置に速度を加算する
  position.x += velocity.x;
  position.y += velocity.y;

  circle(position.x, position.y, 12);
}
```

これで黒い軌跡はなくなりました。

### ステップ 4 パーティクルを増やす

パーティクルの数を 10 個に増やしたいと思います。また 10 このパーティクルが全て重なっていたら見えないので、x 座標が 345 から 355 の間にランダムにずらしたいと思います。これは次のコードで実現できます。

```js
// 345 ~ 355の値をランダムに返す
random(345, 355);
```

以下のコードをどうすればよいでしょうか？考えてみてください。ただし、今回速度は同じものとします。

```js
let velocity; // 速度
let position; // パーティクルの位置
function setup() {
  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);
  // 背景色をカラーコード#F4F2FF
  background("#F4F2FF");

  velocity = {
    x: 0,
    y: 1,
  };
  position = {
    x: 350,
    y: 100,
  };
}

// drawが今回フレームを更新する関数
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  // パーティクルの位置を更新する
  // 位置に速度を加算する
  position.x += velocity.x;
  position.y += velocity.y;

  circle(position.x, position.y, 12);
}
```

<details>
<summary>ヒント</summary>
複数個を操作するなら配列がよさそうですね。問題はどこを配列にするかです。
</details>

<details>
<summary>答え</summary>

```js
let velocities; // 速度の配列
let positions; // パーティクルの位置の配列
function setup() {
  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);
  // 背景色をカラーコード#F4F2FF
  background("#F4F2FF");

  positions = [];
  velocities = [];
  for (let i = 0; i < 10; i++) {
    positions[i] = {
      x: random(345, 355),
      y: 150,
    };
    velocities[i] = {
      x: random(-1, 1),
      y: 150,
    };
  }
}

// drawが今回フレームを更新する関数
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  for (let i = 0; i < positions.length; i++) {
    // パーティクルの位置を更新する
    // 位置に速度を加算する
    positions[i].x += velocities[i].x;
    positions[i].y += velocities[i].y;

    circle(positions[i].x, positions[i].y, 12);
  }
}
```

</details>

10 個の塊が下に落ちていきますね。

### ステップ 5 それぞれのパーティクルに別々の速度を与える

みなが同じ方向に落ちていくのは面白くありません。そこで 10 個のパーティクルに別々の速度を与えたいと思います。速度は x 方向 y 方向それぞれで　-1 ~ 1 の値をランダムに与えたいです。これはステップ 4 のときと似ていますね。コードを考えてみてください。

<details>
<summary>答え</summary>

```js
let velocities; // 速度の配列
let positions; // パーティクルの位置の配列
function setup() {
  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);
  // 背景色をカラーコード#F4F2FF
  background("#F4F2FF");

  velocity = {
    x: 0,
    y: 1,
  };
  positions = [];
  velocities = [];
  for (let i = 0; i < 10; i++) {
    positions[i] = {
      x: random(345, 355),
      y: 150,
    };
    velocities[i] = {
      x: random(-1, 1),
      y: random(-1, 1),
    };
  }
}

// drawが今回フレームを更新する関数
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  for (let i = 0; i < positions.length; i++) {
    // パーティクルの位置を更新する
    // 位置に速度を加算する
    positions[i].x += velocities[i].x;
    positions[i].y += velocities[i].y;

    circle(positions[i].x, positions[i].y, 12);
  }
}
```

</details>

パーティクルが四散するようになりました。

![散らばるパーティクル](/samples/particle/particle-scatter.jpeg)

### ステップ 6 クラスを利用する

次に、パーティクルたちに下方向のか速度を与えて重力を再現したいところですが、その前に。

いまもう一度コードを見返してください。特に以下のポイントに注意して見返してください。

_1 つの粒子に関する情報が positions 配列と velocities 配列に別々に存在している_

1 つの粒子に関する情報なら１つのオブジェクトにまとめたほうが、わかりやすいですし、概念とコードが一致してよりメンテナンスをしやすくなります。

<details>
<summary>[コラム]コードは概念を表すべきか</summary>

今回パーティクルという概念を 1 つのオブジェクトで表現しました。ました。JS ではオブジェクトと配列を使って、現実世界の様々な概念を再現できます。

```js
const Person = {
  name: 'はなわ',
  age: 16,
  sex: 1 // 0: unknown, 1: male, 2: female
  friends: [
    '太郎',
    '花子'
  ]
}
```

</details>

位置と速度を別々の配列でもつよりも、１つのパーティクルオブジェクトにまとめてしまったほうが直感的ではないでしょうか？ こんな感じで。

```js
const sampleParticle = {
  position: {
    x: 350,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0.5,
  },
};

const particles = [sampleParticle];
```

一旦これで書き換えてみましょう！

```js
let particles; // パーティクルの配列

function setup() {
  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);
  // 背景色をカラーコード#F4F2FF
  background("#F4F2FF");

  particles = [];

  for (let i = 0; i < 10; i++) {
    particles[i] = {
      position: {
        x: random(345, 355),
        y: 150,
      },
      velocity: {
        x: random(-1, 1),
        y: random(-1, 1),
      },
    };
  }
}

// drawが今回フレームを更新する関数
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  for (let i = 0; i < particles.length; i++) {
    // パーティクルの位置を更新する
    // 位置に速度を加算する
    particles[i].position.x += particles[i].velocity.x;
    particles[i].position.y += particles[i].velocity.y;

    circle(particles[i].position.x, particles[i].position.y, 12);
  }
}
```

ふぅ、いい感じですね。これでも満足してしまいそうですが、今回はさらにもう一歩進めます。`draw`関数の次の部分に注目してください。

```js
// パーティクルの位置を更新する
// 位置に速度を加算する
particles[i].position.x += particles[i].velocity.x;
particles[i].position.y += particles[i].velocity.y;
```

見つけましたか？ これは、パーティクルが自分の位置に自分の速度を加算している部分です。

いっそのこと、この振る舞い自体もオブジェクトに閉じ込めてしまえば面白そうじゃないですか？

何言っているかわからないと思うので、コードで表現してみます。

```js
const sampleParticle = {
  position: {
    x: 350,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0.5,
  },
  // パーティクルの位置を更新する
  // 位置に速度を加算する
  addVelocityToPosition: function () {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  },
};
```

すべてのコードを修正してみましょう！

```js
let particles; // パーティクルの配列

function setup() {
  // キャンバスの大きさを720x400ピクセルに指定
  createCanvas(720, 400);
  // 背景色をカラーコード#F4F2FF
  background("#F4F2FF");

  particles = [];

  for (let i = 0; i < 10; i++) {
    particles[i] = {
      position: {
        x: random(345, 355),
        y: 150,
      },
      velocity: {
        x: random(-1, 1),
        y: random(-1, 1),
      },
      // パーティクルの位置を更新する
      // 位置に速度を加算する
      addVelocityToPosition: function () {
        // thisで自分自身のpositionとvelocityにアクセスできます。
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
      },
    };
  }
}

// drawが今回フレームを更新する関数
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  for (let i = 0; i < particles.length; i++) {
    // パーティクルの位置を更新する
    // 位置に速度を加算する
    particles[i].addVelocityToPosition();

    circle(particles[i].position.x, particles[i].position.y, 12);
  }
}
```

画面を更新して、ちゃんと動くか確かめてみてください。
特に for ループに注目してほしいです。

from:

```js
for (let i = 0; i < particles.length; i++) {
  // パーティクルの位置を更新する
  // 位置に速度を加算する
  particles[i].position.x += particles[i].velocity.x;
  particles[i].position.y += particles[i].velocity.y;

  circle(particles[i].position.x, particles[i].position.y, 12);
}
```

to:

```js
for (let i = 0; i < particles.length; i++) {
  // パーティクルの位置を更新する
  // 位置に速度を加算する
  particles[i].addVelocityToPosition();

  circle(particles[i].position.x, particles[i].position.y, 12);
}
```

2 行に渡った位置の更新が、`addVelocityToPosition`という関数にまとまりました！ 僕らは日本語を第一言語とするので、このメリットが分かりにくかもしれませんが、コードがより説明的になったのです。

ちょっと、`addVelocityToPosition`を日本語に変えてみます。

from:

```js
for (let i = 0; i < particles.length; i++) {
  // パーティクルの位置を更新する
  // 位置に速度を加算する
  particles[i].position.x += particles[i].velocity.x;
  particles[i].position.y += particles[i].velocity.y;

  circle(particles[i].position.x, particles[i].position.y, 12);
}
```

to:

```js
for (let i = 0; i < particles.length; i++) {
  // パーティクルの位置を更新する
  // 位置に速度を加算する
  particles[i].位置に速度を加算();

  circle(particles[i].position.x, particles[i].position.y, 12);
}
```

上と下、どちらがわかりやすいでしょうか？ 一般的に下のようになるべくデータ操作を意味のある塊にまとめて名前をつけたほうが、人間の認知的負荷(脳のメモリに対する負担)下がりメンテナンスしやすくなります。

もう少しいうと、例えば玉ねぎの「みじん切り」あるじゃないですか？あれはいわば関数名です。「みじん切り」と一言で説明するのと、「玉ねぎを縦方向にスライスして、つぎに横方向にスライスして...」と説明するのは、どちらがよいでしょうか？

```js
function みじん切り(玉ねぎ) {
  垂直縦方向にスライスを入れる(玉ねぎ);
  水平方向にスライスを入れる(玉ねぎ);
  垂直横方向にスライスを入れる(玉ねぎ);
}
```

このようにベテランのプログラマは、より下位の振る舞いのまとまりに対して、名前付けして抽象化することで、より人間フレンドリーなメンテナンスしやすいプログラムを作ることができます。

話が長くなりました。先程オブジェクトに関数を定義しました。

```js
const sampleParticle = {
  position: {
    x: 350,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0.5,
  },
  // パーティクルの位置を更新する
  // 位置に速度を加算する
  addVelocityToPosition: function () {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  },
};
```

これは実は、あまり良くないです。`setup`関数ないで particles を初期化するとき、`position`と`velocity`はランダムな値が入ってくるのに対して、`addVelocityToPosition`は 10 回とも同じコードを宣言しているのがわかりますか？

```js
// setup関数内
for (let i = 0; i < 10; i++) {
  particles[i] = {
    position: {
      x: random(345, 355),
      y: 150,
    },
    velocity: {
      x: random(-1, 1),
      y: random(-1, 1),
    },
    // パーティクルの位置を更新する
    // 位置に速度を加算する
    addVelocityToPosition: function () {
      // thisで自分自身のpositionとvelocityにアクセスできます。
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    },
  };
}
```

同じ関数を 10 回も回も繰り返すのはメモリ効率がよくありません。まだ 10 回ならいいですが、これが 100、1000 となっていけばなおさらです。
最近のプログラミング言語はこれに対して*クラス*という解決策を持っています。次のコードがクラスです。

```js
class Particle {
  constructor(){
    this.position =  {
      x: random(345, 355),
      y: 150,
    };
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    }
  }

  addVelocityToPosition(){
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
```

次のコードがこのクラスを使った全体の書き換えです。
```js
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

  for (let i = 0; i < particles.length; i++) {
    // パーティクルの位置を更新する
    // 位置に速度を加算する
    particles[i].addVelocityToPosition();

    circle(particles[i].position.x, particles[i].position.y, 12);
  }
}

class Particle {
  constructor(){
    this.position =  {
      x: random(345, 355),
      y: 150,
    };
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    }
  }

  addVelocityToPosition(){
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

```

オブジェクトをつかったコードとの違いはどこですか？考えてみてください。

<details>
<summary>答え</summary>

- Particleクラスがコードに追加された
- `setup`関数でparticlesを初期化する際に、オブジェクトを使わず、`new Particle()`という書き方に変わっている
- その他のコードは変わっていない
</details>

クラスはオブジェクトを生産する工場です。`class`宣言のなかでオブジェクトの設計図(ブループリントともいう)を作成し`new`演算子でオブジェクトを作成します。作成されたオブジェクトはインスタンス(実体)とも呼ばれます。
クラスを使うメリットは、直接オブジェクトに関数を定義するよりも、メモリ効率がよくなることです。

次のような書き方をする場合は、

```js
const sampleParticle = {
  position: {
    x: 350,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0.5,
  },
  // パーティクルの位置を更新する
  // 位置に速度を加算する
  addVelocityToPosition: function () {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  },
};

sampleParticle.addVelocityToPosition();
```

クラスとして書いたほうがメモリ効率がよいです。
```js
class Particle {
  constructor(){
    this.position =  {
      x: random(345, 355),
      y: 150,
    };
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    }
  }

  addVelocityToPosition(){
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const sampleParticle = new Particle();

sampleParticle.addVelocityToPosition();
```

クラスの書き方を説明します。クラスは`class`宣言の中に記述します。クラス名は好きな名前を入れて構いませんが、「名は体を表す」という慣用句があるとおり、適切な名前を入れることが大切です。またクラス名は一般的に大文字から始めます(例: Particle)。

```js
class クラス名 {
  // ここにクラスに対する情報を書く。
}
```

クラスは特別なメソッドを1つ持ちます。あっ、ちなみにクラスに定義された関数のことを*メソッド(method)*と呼びます。慣用的なものです。

特別なメソッドは`constructor`です。直訳すると建設者となりますが、このメソッドがクラスを初期化するときに呼ばれるものです。


```js
class クラス名 {
  constructor(){
    // 初期化処理
  }
}
```

`constructor`の引数には`new`演算子でクラスを初期化したときの引数が渡されます。

```js
class 動物{
  constructor(初期名){
    this.名前 = 初期名
  }
}

const うさぎ = new 動物("ぴょん吉");

console.log(うさぎ.名前) // ぴょん吉 
```

一度 [paiza.io](https://paiza.io/ja)などのオンラインコードエディタでさまざまクラスを定義して、遊んでみてください。

クラスが保持する`position`や`名前`などの変数のことを、*状態*と呼びます。これは*メソッド*と対の存在です。*状態*は`this`を使ってアクセスでき、*メソッド*を呼び出すことで*状態*を変更します。

```js
class 動物{
  constructor(初期名){
    this.名前 = 初期名
  }

  changeName(新規名){
    this.名前 = 新規名
  }
}

const うさぎ = new 動物("ぴょん吉");

console.log(うさぎ.名前) // ぴょん吉 

うさぎ.changeName("うさ子");

console.log(うさぎ.名前) // うさ子
```

ここまで理解できれば、次のコードの意味がわかると思います。
```js
class Particle {
  constructor(){
    this.position =  {
      x: random(345, 355),
      y: 150,
    };
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    }
  }

  addVelocityToPosition(){
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const sampleParticle = new Particle();

sampleParticle.addVelocityToPosition();
```

### ステップ7 重力を再現する

いまのままだと、ただパーティクルが最初に与えられた速度に従って四散するだけで、面白くありません。

そこで、速度を変化させましょう。

一般的に速度を変化させるもののことを力(force)と呼びます。そして力の大きさと向きのことを加速度と呼びます。

重力とは地球に向かう(鉛直下方向とも呼ばれる)大きさ9.81(m/s^2)の加速度です。

アニメーションの世界は、球体ではなく、水平世界なので、下方向(yの正の方向)に加速度をつけます。

一般的な加速度 = 距離(m など) / 時間(s など)　/ 時間(s など)
アニメーションにおける加速度 = ピクセル数 / フレーム / フレーム


アニメーションやシュミレーションにおける加速度とは、各フレームでの速度の変化量のことを指します。毎フレームごとにこの加速度を速度(`velocity`)に足します。

完成コード

```js
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
    // 速度に加速度を加算する
    particles[i].addAccelerationToVelocity();

    // 位置に速度を加算する
    particles[i].addVelocityToPosition();

    circle(particles[i].position.x, particles[i].position.y, 12);
  }
}

class Particle {
  constructor() {
    this.position = {
      x: random(345, 355),
      y: 150,
    };
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    };
    this.acceleration = {
      x: 0,
      y: 1,
    };
  }

  addVelocityToPosition() {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  addAccelerationToVelocity() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }
}

```

`addVelocityToPosition`をする前に`addAccelerationToVelocity`を足してくださいね。加速度は速度を変化させ、速度は位置を変化させます。この順番が逆だと、速度が変化するまえに位置が変化してしまい、つじつまが合いません。

さて、`draw()`関数内の次のコードですが、

```js
  // パーティクルの位置を更新する
  for (let i = 0; i < particles.length; i++) {
    // 速度に加速度を加算する
    particles[i].addAccelerationToVelocity();

    // 位置に速度を加算する
    particles[i].addVelocityToPosition();

    circle(particles[i].position.x, particles[i].position.y, 12);
  }
```

さらにまとめる事もできます。`addAccelerationToVelocity`と`addVelocityToPosition`を`update`メソッドにまとめてしまうのです。
```js
  // draw()ない
  // パーティクルの位置を更新する
  for (let i = 0; i < particles.length; i++) {
    // パーティクルの状態を更新
    particles[i].update();

    circle(particles[i].position.x, particles[i].position.y, 12);
  }

// 省略

class Particle {
  constructor() {
    this.position = {
      x: random(345, 355),
      y: 150,
    };
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    };
    this.acceleration = {
      x: 0,
      y: 1,
    };
  }

  addVelocityToPosition() {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  addAccelerationToVelocity() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }

  update{
    // 速度に加速度を加算する
    this.addAccelerationToVelocity();

    // 位置に速度を加算する
    this.addVelocityToPosition();
  }
}
```

どこまでまとめるかどうかはプログラマ次第です。あなたなりのまとめ方を見つけてみましょう。

少しここで、加速度の値を修正したいと思います。

- 消えるのが早すぎるので、1ではなく0.05くらいにする
- 重力でなくなるが、どうせなら加速度もパーティクルごとにランダムにする。0 ~ 0.05のいずれかにする

すこし自分で考えてみてください。

<details>
<summary>答え</summary>
Particleクラスを以下のように更新します。

```js
class Particle {
  constructor() {
    this.position = {
      x: random(345, 355),
      y: 150,
    };
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    };
    this.acceleration = {
      x: 0,
      y: random(0, 0.05),
    };
  }

  addVelocityToPosition() {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  addAccelerationToVelocity() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }

  update{
    // 速度に加速度を加算する
    this.addAccelerationToVelocity();

    // 位置に速度を加算する
    this.addVelocityToPosition();
  }
}
```

</details>

ちょっと、面白い感じになりましたか？

### ステップ8 噴水のようにパーティクルを溢れさせる

このままだと、最初の10個を描画して、パーティクルが消えて画面が寂しくなりますね。常にパーティクルが溢れてくるようにしましょう！

どうすれば実現できそうですか？考えてみてください。

<details>
<summary>ヒント1</summary>

毎フレームごとに、particles配列の要素を増やしてみましょう！
</details>


<details>
<summary>ヒント2</summary>

配列に新しく値を追加するには`push()`メソッドが使えます。

`particles.push(???)`すれば、良いのです。
</details>


<details>
<summary>答え</summary>

```js
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

    circle(particles[i].position.x, particles[i].position.y, 12);
  }

  // パーティクルの数を増やす
  particles.push(new Particle());
}

class Particle {
  constructor() {
    this.position = {
      x: random(345, 355),
      y: 150,
    };
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    };
    this.acceleration = {
      x: 0,
      y: random(0, 0.05),
    };
  }

  addVelocityToPosition() {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  addAccelerationToVelocity() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }

  update{
    // 速度に加速度を加算する
    this.addAccelerationToVelocity();

    // 位置に速度を加算する
    this.addVelocityToPosition();
  }
}

```
</details>

溢れてきましたか？
このままだとエンドレスで増え続けるのでPCに負荷を与えてしまいます。動作を確認したら一度タブを閉じて置きましょう。

### ステップ9 寿命を設定する

ステップ8の最後でも言及しましたが、画面に見えないだけで、画面外にパーティクルは存在しており、パーティクルの数が半永久的に増え続けることでPCに負荷を与えてしまいます。

そこで、パーティクルに寿命を設定し、寿命がきたパーティクルは`particles`配列から除外しましょう！

パーティクルに定命を設定するには、コードのどの部分を編集したら良さそうでしょうか？位置や速度と同じように、今自分がどれだけ生きたのかと言う情報はパーティクル独自のものです。つまり、、

<details>
<summary>答え</summary>
クラスに設定しましょう。`constructor`に残りの寿命`lifespan`を追加します。

```js

class Particle {
  constructor() {
    this.position = {
      x: random(345, 355),
      y: 150,
    };
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    };
    this.acceleration = {
      x: 0,
      y: random(0, 0.05),
    };
    this.lifespan = 255;
  }

  addVelocityToPosition() {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  addAccelerationToVelocity() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }

  update{
    // 速度に加速度を加算する
    this.addAccelerationToVelocity();

    // 位置に速度を加算する
    this.addVelocityToPosition();
  }
}

```

</details>

寿命は生まれたときは255フレームとし、`update`するたびに1フレームずつ減っていくことにします。

```js

class Particle {
  constructor() {
    this.position = {
      x: random(345, 355),
      y: 150,
    };
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    };
    this.acceleration = {
      x: 0,
      y: random(0, 0.05),
    };
    this.lifespan = 255;
  }

  addVelocityToPosition() {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  addAccelerationToVelocity() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }

  update() {
    // 速度に加速度を加算する
    particles[i].addAccelerationToVelocity();

    // 位置に速度を加算する
    particles[i].addVelocityToPosition();

    // 寿命を減らす
    this.lifespan--;
  }
}
```

そして、寿命が0になったら、`particles`配列から除外します。パーティクルを`draw`関数内で増やしたように、減らす操作も`draw`関数内に書きましょう！

配列から値を除外するときは`splice`というメソッドが利用できます。

[spliceの使い方](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

```js
// drawが今回フレームを更新する関数
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  // パーティクルの位置を更新する
  for (let i = 0; i < particles.length; i++) {
    // パーティクルの状態を更新
    particles[i].update();

    circle(particles[i].position.x, particles[i].position.y, 12);

    // パーティクルの残り寿命がなくなったら配列から削除
    if(particles[i].lifespan < 0){
      // splice(インデックス番号、1)でその要素を削除できる
      particles.splice(i, 1);
    }
  }

  // パーティクルの数を増やす
  particles.push(new Particle());
}
```

現在存在するパーティクルの数は`draw`関数の最後に`console.log(particles.length)`を追加することで確認できます。

```js
// drawが今回フレームを更新する関数
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  // パーティクルの位置を更新する
  for (let i = 0; i < particles.length; i++) {
    // パーティクルの状態を更新
    particles[i].update();

    circle(particles[i].position.x, particles[i].position.y, 12);

    // パーティクルの残り寿命がなくなったら配列から削除
    if(particles[i].lifespan < 0){
      // splice(インデックス番号、1)でその要素を削除できる
      particles.splice(i, 1);
    }
  }

  // パーティクルの数を増やす
  particles.push(new Particle());

  // パーティクルの数を確認
  console.log(particles.length)
}
```

ブラウザの検証ツールを開いて確認すると大体257あたりで、生まれてくる数と死ぬ数が拮抗して平衡状態になっていることがわかります。

![パーティクルの数](/samples/particle/particle-counts.jpeg)

確認したら`console.log`は消しておきましょう。

もう少しコードを整理したいと思います。`draw`関数ないの寿命をチェックする部分ですが、ここはまだ「みじん切り」になりきれていません。せっかくなので生死を判定するロジックをクラス側に持ちたいと思います。

```js
    // パーティクルの残り寿命がなくなったら配列から削除
    if(particles[i].lifespan < 0){
      // splice(インデックス番号、1)でその要素を削除できる
      particles.splice(i, 1);
    }
```

クラスを以下のように書き換えてください。


```js

class Particle {
  constructor() {
    this.position = {
      x: random(345, 355),
      y: 150,
    };
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    };
    this.acceleration = {
      x: 0,
      y: random(0, 0.05),
    };
    this.lifespan = 255;
  }

  addVelocityToPosition() {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  addAccelerationToVelocity() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }

  update() {
    // 速度に加速度を加算する
    particles[i].addAccelerationToVelocity();

    // 位置に速度を加算する
    particles[i].addVelocityToPosition();

    // 寿命を減らす
    this.lifespan--;
  }

  // 追加
  // パーティクルが死んでいるかどうかを判定するメソッド
  // Booleanを返すメソッドは一般的に「isなんちゃら」という名前をつける
  isDead(){
    return this.lifespan < 0;
  }
}
```

`draw`関数も書き換えます。


```js
// drawが今回フレームを更新する関数
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  // パーティクルの位置を更新する
  for (let i = 0; i < particles.length; i++) {
    // パーティクルの状態を更新
    particles[i].update();

    circle(particles[i].position.x, particles[i].position.y, 12);

    // パーティクルの残り寿命がなくなったら配列から削除
    if(particles[i].isDead()){
      // splice(インデックス番号、1)でその要素を削除できる
      particles.splice(i, 1);
    }
  }

  // パーティクルの数を増やす
  particles.push(new Particle());
}
```

これでコードがより「みじん切り」、つまり説明的になりましたね。

<details>

<summary>ここまでのコード</summary>

```js
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
    this.position = {
      x: random(345, 355),
      y: 150,
    };
    this.velocity = {
      x: random(-1, 1),
      y: random(-1, 1),
    };
    this.acceleration = {
      x: 0,
      y: random(0, 0.05),
    };
    this.lifespan = 255;
  }

  addVelocityToPosition() {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  addAccelerationToVelocity() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
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

```
</details>

### ステップ10 寿命にあわせて透明化していく

もう少し遊んでみます。寿命にあわせて透明化していきましょう！

と、その前にパーティクルに色を付けてみます。色の付け方は`circle`関数を呼ぶ前に`fill`関数を呼べばよいのでした。

`fill('red')`でパーティクルを赤くしてみます。

```js
// drawが今回フレームを更新する関数
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  // パーティクルの位置を更新する
  for (let i = 0; i < particles.length; i++) {
    // パーティクルの状態を更新
    particles[i].update();

    // 追加
    fill('red')
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

```

あまり、おしゃれじゃないですね。

[p5jsでは様々な色の指定の仕方ができます](https://zenn.dev/baroqueengine/books/a19140f2d9fc1a/viewer/aac014)

```js
  // エメラルドグリーン系
  fill('#2D9596');
  circle(20, 20, 30);
  
  // エメラルドグリーン系(透明度50%)
  fill('#2D959688');
  circle(60, 20, 30)
  
  // 黄色系
  fill(255, 200, 16);
  circle(20, 60, 30);
  
  // 黄色系(透明度50%)
  fill(255, 200, 16, 125);
  circle(60, 60, 30);
```

[p5jsのwebエディタ](https://editor.p5js.org/)を開いて以下のコードを貼り付けて実行してみてください。

```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // エメラルドグリーン系
  fill('#2D9596');
  circle(20, 20, 30);
  
  // エメラルドグリーン系(透明度50%)
  fill('#2D959688');
  circle(60, 20, 30)
  
  // 黄色系
  fill(255, 200, 16);
  circle(20, 60, 30);
  
  // 黄色系(透明度50%)
  fill(255, 200, 16, 125);
  circle(60, 60, 30);
}
```

値をいろいろ変えてみて、色の変化を楽しみましょう。

おしゃれな色を選択するのは、難しいものです。そういう場合はネットの力を頼りましょう！「color palette」と検索してみてください。色を選ぶサポートをしてくれるサービスがいくつかみつかります。

例えば[クーラー](https://coolors.co/)ではスペースキーを押すごとに、相性の良い色の一覧をだしてくれます。

![クーラーのサンプル](/samples/particle/coolors.jpeg)

自分だけのお気に入りを見つけてみましょう！

話を戻します。パーティクルに残り寿命ともに半透明にしたいという話でした。半透明にするには次のどちらかの書き方をします。

```js
  // エメラルドグリーン系(透明度50%)
  fill('#2D959688');
  circle(60, 20, 30)
  
  // 黄色系(透明度50%)
  fill(255, 200, 16, 125);
  circle(60, 60, 30);
```

クーラーでは、カラーコードをクリックして「ＲＧＢ」を選択するとRBA値を出してくれます。

![クーラーでRGBを取得](/samples/particle/coolor-rgb.jpeg)


```js
// drawが今回フレームを更新する関数
function draw() {
  // 背景色で上書きして、前の描画を消す。
  background("#F4F2FF");

  // パーティクルの位置を更新する
  for (let i = 0; i < particles.length; i++) {
    // パーティクルの状態を更新
    particles[i].update();

    // 色と、透明度設定
    fill(255, 249, 79, particles[i].lifespan)
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

```

どうでしょう？透明になっていっていますか？ まわりの黒い線が邪魔ですね。まわりの黒い線も透明化させましょう！


```js
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
    // 色と、透明度設定
    fill(255, 249, 79, particles[i].lifespan)
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

```

このサンプルは以上で完成です。あとは自分でいろいろとカスタマイズしてみましょう！

- 今の色が気に入らないので、おしゃれにする
- 加速度や数とかをいじってみる
- パーティクルごとに色をかえちゃう
- 最初の出現位置をバラけさせてみる
- マウスをクリックしている間パーティクルがでてくるようにする

など、いろいろできそですね！