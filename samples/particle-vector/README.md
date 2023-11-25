# パーティクル ベクトル

パーティクルのコードをベクトル使って書き直します。

## 必要スキル&知識

- パーティクルをすでにやっている前提
- ベクトル

## Get Started

### ステップ１ ready フォルダを開いて現在の状態を確認しましょう

パーティクルの完成の状態のコードです。

### ステップ 2 ベクトルに書き換える

ベクトルとは向きと大きさを持ったものです。ベクトルを使えば２次元や３次元の位置や速度や加速度の計算が楽になります。

クラスのconstructorにある次のコードををベクトルに書き換えます。
```js
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
```

ベクトルは`createVector`で初期化できます。これはp5jsが提供する関数です。ベクトルはx成分とy成分で構成されています。第一引数はx成分、第二引数はy成分です。先程のコードをベクトル化すると以下になります。

```js
  constructor() {
    this.position = createVector(random(345, 355), 150);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, random(0, 0.05));
    this.lifespan = 255;
  }
```

ベクトル化すると、位置や速度や加速度の計算が楽になります。Particleクラスの`addVelocityToPosition`メソッドを見てください。位置のx成分とy成分にそれぞれ速度のx成分とy成分を足していました。

```js

  addVelocityToPosition() {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
```

ベクトルはベクトル同士の足し算をすることができます。先程のコードは次のようになります。


```js

  addVelocityToPosition() {
    // thisで自分自身のpositionとvelocityにアクセスできます。
    this.position.add(this.velocity)
  }
```

同様に速度に加速度を足すメソッドも更新しましょう！

これが
```js
  addAccelerationToVelocity() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }
```

こうなります。
```js
  addAccelerationToVelocity() {
    this.velocity.add(this.acceleration)
  }
```

## ベクトルとは

次の動画がわかりやすかったです。
https://www.youtube.com/watch?v=ruUGEtyF--0

このチャンネルの作者ゲームプログラミングにつかう数学とか公開してくれてて面白そうですね。

p5jsのベクトルのドキュメント

https://p5js.org/reference/#/p5.Vector

かなりたくさんのメソッドがあります。とりあえずベクトル同士の足し算`add`は最低限理解しておいてください。他は必要になれば解説します。

このサンプルで教えることは以上です。