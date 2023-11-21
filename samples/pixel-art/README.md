# ピクセルアート

このサンプルは p5.js を使ってお絵かきツールを作成するものです。他のサンプルよりも簡単です。

## 必要スキル&知識

- p5.jsの基礎(setup, draw)
- 関数
- p5.jsでマウスクリックイベントの使い方
- 2重ループ
- ２次元配列
- 少数の整数化、四捨五入(round, floor, ceil)

## Get Started!


### ステップ 1 ready フォルダを開いて現在の状態を確認しましょう

LivePreview で ready フォルダの`index.html`を開く。青い背景のキャンバスが作成されているのを確認しましょう。また`my-p5.js`を開いてソースコードを確認しましょう。

チェックポイント

- createCanvas(720, 400)で 720×400 のキャンバスを作成しています
- background('#E0F4FF')でカラーコード#E0F4FF の背景色を指定してます

### ステップ 2 セルで埋め尽くしましょう

この何もない背景を正方形のセルで埋め尽くします。ピクセルアートはセルの数が多ければ多いほど面白くなります。今回はセルの１つの幅を 20 ピクセルとします。

キャンバスに敷き詰めるセルの数は

縦の数 = キャンバスの高さ / 20
横の数 = キャンバスの幅 / 20

となります。今回はキャンバスの高さは 400 で、幅は 720 なので

縦の数 = 400 / 20 = 20 個
横の数 = 720 / 20 = 36 個

と予想できそうですね。

ちなみに縦の数のことを行数とよび row(ロウ)と書きます。横の数のことをは列数と呼び column(カラム)と書きます。

まずはここまでをコードに書きましょう。

```js
// 変数の宣言
let w; // セルの幅(ピクセル)
let columns; // 列数
let rows; // 行数

function setup() {
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

  // コンソールにcolumnsとrowsの値を出力
  console.log("行数:", rows);
  console.log("列数:", columns);
}

function draw() {}
```

コンソールにはなんと表示されましたでしょうか？

次のように表示されていたら成功です。

```
行数: 20
列数: 36
```

さて、次はこれを視覚化します。縦方向に 20 個、横方向に 36 個の四角形を敷き詰めるにはどうしたら良いでしょうか？

ちなみに、p5js で四角形の書き方は次のとおりです。

```js
function draw() {
  // 第一引数: x座標
  // 第二引数: y座標
  // 第三引数: 横幅
  // 第四引数: 縦幅
  rect(20, 20, 100, 100);
}
```

少し時間を作って考えてみてください。

<details>
<summary>ヒント1</summary>
２重ループを使います
</details>

<details>
<summary>ヒント2</summary>

```js
function draw() {
  // 行ループ
  for (let i = 0; i < rows; i++) {
    // 列ループ
    for (let j = 0; j < columns; j++) {
      // ここに四角形を描画
    }
  }
}
```

</details>

<details>
<summary>答え</summary>

```js
function draw() {
  // 行ループ
  for(let i = 0; i < rows; i++){
    // 列ループ
    for(let j = 0; j < columns; j++){
      rect(j*w, i*w, w, w);
    }
  }
}
```

ところでずっとプレビュー画面を起動していると PC のファンが回りだすことがあります。これは無限ループを扱っているため CPU 負荷が高いためです。そこでフレームレートを落とすことで、CPU 負荷を下げましょう。フレームレートとは１秒間に何回`draw`関数を呼ぶかの値です。格ゲーをやっている人はよく知っている値かもしれません。通常ゲームではフレームレートが高いとヌルヌル動き、低いとカクカク動きます。p5.js においてデフォルトのフレームレートはディスプレイのフレームレート(ここでは「リフレッシュレート」とも呼ばれます)に基づいており、ほとんどのコンピュータでは 60 フレーム/秒に設定されています。スムーズなアニメーションを作成するには、1 秒あたり 24 フレーム(映画では通常)以上のフレームレートで十分です。そこで今回フレームレートを 24 に設定しましょう。

```js
function setup() {
  // フレームレートを24フレーム/秒に設定
  frameRate(24);

  // 省略
}
```

</details>

### ステップ 3 セルの状態を変数として保持して、表示しよう

ステップ２でセルを敷き詰めることができました。今回はセルの状態(塗りつぶされている or 何もない)を変数で保持し、それを画面に再現しようと思います。

ところで、３行目&3 列目のセルが塗りつぶされていたとします(黒になるはず)。それを`draw()`のなかでどう表現したらよいでしょうか？

少し、考えてみてください。

2重ループの中で条件分岐を使います。四角形の色は`rect()`を呼び出す前に`fill(0)`で黒`fill(255)`で白に指定できます。

```js
function setup() {
  // 省略
}

function draw() {
  // 行ループ
  for (let i; i < rows; i++) {
    // 列ループ
    for (let j; j < columns; j++) {
      // ここにコードを追加
      rect(j * w, i * w, w, w);
    }
  }
}
```

![ステップ3で3行目3列目を黒にした画像](/samples/gameoflife/images/step3-index3-black.jpeg)

答えは以下です。

<details>
<summary>答え</summary>

```js
function setup() {
  // 省略
}

function draw() {
  // 行ループ
  for (let i = 0; i < rows; i++) {
    // 列ループ
    for (let j = 0; j < columns; j++) {
      if (i === 2 && j === 2) {
        fill(0); // 黒で塗りつぶし
      } else {
        fill(255); // 白で塗りつぶし
      }
      rect(j * w, i * w, w, w);
    }
  }
}
```

</details>

では、次の問題です。塗りつぶされているセルが

- ３行目、3 列目
- １０行目、10 列目
- ７行目、7 列目
- 4 行目、１０列目

だった場合、どのようにコードを書き換えますか？ 単純に if 文を 4 つ書くのもありでしょう。しかし、今回 20 個 ×36 個= 720 個のセルがあります。72 ０個の if 文を書くのは現実的じゃないですね。ミスもしやくなります。そこで使えるのが配列です。

配列は JS(JavaScript の略称)が変数として保持できるものの１つです。配列には複数の値を入れる事ができます。

```js
const numbers = [1, 2, 3];
const strings = ["a", "b", "c"];
const various = [1, "a", [1, 2, 3]];
```

この配列を使って、「20 個 x36 個のセルが塗りつぶされているかどうか」を表現できれば、セルの塗りつぶし条件分岐がかなりスッキリと書けるようになります(後ほど実践します)。

では問題です。「20 個 x36 個のセルが塗りつぶされているかどうか」を配列を使えばどう表現できるでしょうか？　少し自分で考えてみてください。

<details>
<summary>ヒント1</summary>

セルを塗りつぶしている状態をo、白紙の状態をxとして表で表してみました。セルの場所は何行目、何列目で表現することができますね。

|     | 1   | 2   | 3   | 4   | ... | 36  |
| --- | --- | --- | --- | --- | --- | --- |
| 1   | o   | x   | x   | x   | ... | o   |
| 2   | x   | x   | x   | x   | ... | x   |
| 3   | o   | o   | o   | x   | ... | x   |
| ... | o   | x   | o   | x   | ... | o   |
| 20  | o   | x   | x   | x   | ... | o   |

</details>

<details>
<summary>ヒント2</summary>

最初からすべてを表すのは難しいでしょう。まずは 1 行目のみを配列で表現してみましょう。このとき塗りつぶされている状態と白紙の状態をどう表現するのかはあなた次第です。true, false でもいいですし"o","x"でもいいです。

|     | 1   | 2   | 3   | 4   | ... | 36  |
| --- | --- | --- | --- | --- | --- | --- |
| 1   | o   | x   | x   | x   | ... | o   |
| 2   | x   | x   | x   | x   | ... | x   |
| 3   | o   | o   | o   | x   | ... | x   |
| ... | o   | x   | o   | x   | ... | o   |
| 20  | o   | x   | x   | x   | ... | o   |

```js
// 1行目のみを表現
const first = ["o", "x", "x", "x"]; // とりあえず36個書いてみる。

// 1行目の3列目の値は?
first[2];
```

1 行目が表現できたら、2 行目はどうなりますか？

</details>

<details>
<summary>答え</summary>
ヒント2で各行のみであれば、配列で表現できましたね。

```js
const first = ["o", "x", "x", "x"];
const second = ["x", "x", "x", "x"];
```

しかしこれだと、20 個の配列の変数を扱わないといけないですね。だから、各行自体も配列に入れてしまいましょう。

```js
const cells = [
  ["o", "x", "x", "x"], // 1行目
  ["x", "x", "x", "x"], // 2行目
];

// 1行目の3列目の値は?
cells[0][2];
```

このように配列の配列を使えば、2 次元を表すことができます。

|     | 1   | 2   | 3   | 4   | ... | 36  |
| --- | --- | --- | --- | --- | --- | --- |
| 1   | o   | x   | x   | x   | ... | o   |
| 2   | x   | x   | x   | x   | ... | x   |
| 3   | o   | o   | o   | x   | ... | x   |
| ... | o   | x   | o   | x   | ... | o   |
| 20  | o   | x   | x   | x   | ... | o   |

</details>

次に、20x36 個もの"o"と"x"を手で書くのは大変なので、最初に、2 重ループを使って、すべてのセルの状態を"x"(白紙)にしてみましょう。`setup()`の最後に`init`関数を追加します。そして`init`関数の中身を埋めてください。ちなみに`init`とは`initialize`の略で初期化処理のことを指す一般的なプログラミング略語です。

```js
let cells;
// 省略

function setup() {
  // 省略

  // 最後に追加
  init();
}

function draw() {
  // 省略
}

// 追加
function init() {
  // cellsを20行36列の2次元配列として、"x"で埋めるコード
}
```

<details>
<summary>ヒント1</summary>

配列を初期化する便利な API があります。まずは、その要素をもった空の配列を作成し、次に for ループを使って"x"を代入していきましょう。2 次元配列だと難しいので、最初は 1 行だけで考えるといいと思います。

```js
// 例: 3この"x"要素を持った配列の作成
// 要素を3つ持った空の配列を作成してくれる。
const array3 = new Array(3);
// forループで代入
for (let i = 0; i < 3; i++) {
  array3[i] = "x";
}
```

</details>

<details>
<summary>答え</summary>

```js
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
      // i行目j列目の要素を'x'で埋める
      cells[i][j] = 'x'
    }
  }
}
```

</details>

cellsをすべて'x'に初期化しました。しかしまだ、画面には反映されていませんね。そこで`draw()`を以下のように書き換えましょう！

```js
function draw() {
  // 行ループ
  for(let i = 0; i < rows; i++){
    // 列ループ
    for(let j = 0; j < columns; j++){
      if (cells[i][j] === "x") {
        fill(255); // 白で塗りつぶし
      } else {
        fill(0); // 黒で塗りつぶし
      }
      rect(j*w, i*w, w, w);
    }
  }
}
```

これでcellsの状態が画面に反映されるようになりました。

基本的にプログラマーはデザイナーとは違い、画面の UI ではなく、データの形(配列やオブジェクト)で物事を表現し、それがどう変化するのか(アルゴリズム)を考えます。画面はデータの出口の１つに過ぎません。この感覚に慣れましょう。

### ステップ4 マウスでクリックしたセルを黒くする

残念ながら、HTMLの通常のタグと違って、p5jsで使っているキャンバスでは、描画された四角形は自分がクリックされたかどうかがわかりません。

はるか昔に学習したことを思い出してほしいのですが、ボタンタグがクリックされたときに、何かをする際に以下のようなコードを書いていたはずです。

```js
const button = document.getElementById('my-button');

button.onclick = function(){
    console.log("クリックされたよ！")
}
```

残念ながら、キャンバスでは簡単にはその四角形がクリックされたことを検知する仕組みを提供してくれていません。

```js
// こんなのはできない
const myRect = rect(20, 20, 10, 10)

myRect.onclick = function() {
  console.log("クリックされたよ！")
}
```

じゃあどうすればよいかというと、マウスがクリックされたときの座標はわかるので、その座標が、四角形の座標内部であれば、その四角形がクリックされたとみなすのです。

次のコードを`init()`関数の次くらいにコピペしてみてください。

```js
function mouseClicked() {
  console.log('マウスのx座標', mouseX)
  console.log('マウスのy座標', mouseY)
}
```

<details>
<summary>ここまでのコード</summary>

```js
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
        fill(255); // 白で塗りつぶし
      } else {
        fill(0); // 黒で塗りつぶし
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
      // i行目j列目の要素を'x'で埋める
      cells[i][j] = "x";
    }
  }
}

function mouseClicked() {
  console.log("マウスのx座標", mouseX);
  console.log("マウスのy座標", mouseY);
}

```
</details>

![マウスのクリックイベント](/samples/pixel-art/mouse-event.jpeg)

p5jsには`setup`や`draw`関数と同じように`mouseClicked`という名前の関数は特別扱いされます。マウスがクリックされると、この関数が呼ばれます。マウスの座標は`mouseX`と`mouseY`という変数に(グローバルに)格納されます。

このクリックされたx座標とy座標から、セルのインデックスを計算するにはどうしたらよいでしょう？考えてみてください。以下はヒントの画像

![セルのインデックス計算](/samples/pixel-art/cell-index.jpeg)

<details>
<summary>答え</summary>

マウスのx座標をセルの幅でわれば、横にセルが何個入るかがわかります。
マウスのy座標をセルの高さでわれば、縦にセルが何個入るかがわかります。

例えば先程の画像では、マウスがx座標75、y座標５0をクリック下とします。

横方向に入るセルの数 = 75 / 20 = 3.75
縦方向に入るセルの数 = 50 / 20 = 2.5

ということで、そのセルの座標はそれぞれを繰り上げた値になります。`ceil`は天井関数と呼ばれ値を繰り上げます。ちなみに四捨五入は`round`で繰り下げは`floor`です。

マウスでクリックされたセルの座標
x = ceil(3.75) = 4
y = ceil(2.5) = 3

インデックスは0始まりなので、それぞれを-1します。

セルの列インデックス = 4 - 1
セルの行インデックス = 3 - 1

`mouseClicked`を以下のように書き換えましょう

```js
function mouseClicked() {
  console.log("マウスのx座標", mouseX);
  console.log("マウスのy座標", mouseY);
  const clickedCellIndex = getCurrentIndexFromMousePosition(mouseX, mouseY)

  console.log(clickedCellIndex)
}

function getCurrentIndexFromMousePosition(x, y) {
  return {
    columnIndex: ceil(x / w)  - 1,
    rowIndex: ceil(y / w) - 1,
  };
}
```

実際にセルをクリックしてみて、どうでしょうか？あってますか？
</details>

<details>
<summary>ここまでのコード</summary>

```js
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
        fill(255); // 白で塗りつぶし
      } else {
        fill(0); // 黒で塗りつぶし
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
      // i行目j列目の要素を'x'で埋める
      cells[i][j] = "x";
    }
  }
}

function mouseClicked() {
  console.log("マウスのx座標", mouseX);
  console.log("マウスのy座標", mouseY);
  const clickedCellIndex = getCurrentIndexFromMousePosition(mouseX, mouseY);

  console.log(clickedCellIndex);
}

function getCurrentIndexFromMousePosition(x, y) {
  return {
    columnIndex: ceil(x / w) - 1,
    rowIndex: ceil(y / w) - 1,
  };
}

```
</details>

クリックされたセルの座標がわかりました。つぎにクリックされたセルを黒くしたいと思います。

新しく`fillCellColor`という関数を定義しました。

```js
function mouseClicked() {
  console.log("マウスのx座標", mouseX);
  console.log("マウスのy座標", mouseY);
  const clickedCellIndex = getCurrentIndexFromMousePosition(mouseX, mouseY);

  console.log(clickedCellIndex);
  fillCellColor(clickedCellIndex.rowIndex, clickedCellIndex.columnIndex);
}

function getCurrentIndexFromMousePosition(x, y) {
  return {
    columnIndex: floor(x / w),
    rowIndex: floor(y / w),
  };
}

function fillCellColor(rowIndex, columnIndex) {
    // 該当するセルを塗りつぶす'o'
}
```

この関数の実装を自分で考えてうめてみてください。

<details>
<summary>答え</summary>

```js
function fillCellColor(rowIndex, columnIndex) {
    cells[rowIndex][columnIndex] = 'o'
}

```
</details>

うまく動きましたか？

### ステップ5 黒く塗りつぶしたところをもう一度クリックすると白くできるようにする(トグル)

いよいよ最後のステップです。

今の状態だと、、一度塗りつぶしたセルは元に戻すことができません。そこで、一度塗りつぶしたセルはもう一度クリックすとでもとに戻るようにしたいと思います。

このようなうこきのことを一般的にトグル(toggle)と呼びます。

`fillCellColor`関数にかえて`toggleCellColor`という関数を定義しましょう。

```js
function mouseClicked() {
  console.log("マウスのx座標", mouseX);
  console.log("マウスのy座標", mouseY);
  const clickedCellIndex = getCurrentIndexFromMousePosition(mouseX, mouseY);

  console.log(clickedCellIndex);
  toggleCellColor(clickedCellIndex.rowIndex, clickedCellIndex.columnIndex);
}

function getCurrentIndexFromMousePosition(x, y) {
  return {
    columnIndex: floor(x / w),
    rowIndex: floor(y / w),
  };
}

function toggleCellColor(rowIndex, columnIndex) {
    // 現在'x'なら'o'に、’o'なら'x'に変える
}
```

この`toggleCellColor`の実装を考えてみてください。

<details>
<summary>答え</summary>

```js
function toggleCellColor(rowIndex, columnIndex) {
  if (cells[rowIndex][columnIndex] === 'o') {
    cells[rowIndex][columnIndex] = 'x';
  } else {
    cells[rowIndex][columnIndex] = 'o';
  }
}

```
</details>

以上でこのサンプルで教えることは終わりです。

あとは、好きに自分でカスタマイズしてみましょう！

例えば
- 色を白黒じゃなくて他の色にする
- セルの大きさを変えてみる
- 色を変えられる[スライダー](https://p5js.org/examples/dom-slider.html)を取り付けてみる
- 四角じゃなくて他の図形にしてみる
- しきつめるのではなく、間を適当にあける
- クリックするたびに白黒になるのではなく、３段階くらい色が変わるようにする
- cellsに'o'と'x'を格納するのではなく、数字を格納して表現力をあげる

など、いろいろと考えられそうですね。