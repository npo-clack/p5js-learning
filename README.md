# p5js-learning
p5jsを勉強するコンテンツ。
このコースは魅力的かつダイナミックな動きを実現できるp5jsを学ぶコースです。
週一のTR+だけでなく家庭学習前提のコースとなるため、時間が確保できる人のみ選択してください。

## この教材で学べること
p5jsというクリエイティブコーディング用のライブラリの使い方を学び、プログラミングをつかった強力な表現力をみにつける。

### [ピクセルアート](https://npo-clack.github.io/p5js-learning/samples/pixel-art/complete/)
ボード系の考え方を身につける。ポチポチで色を変える。

<p align="center"> 
<img width="734" alt="Screen Shot 0005-12-02 at 12 04 31" src="https://github.com/npo-clack/p5js-learning/assets/25113191/33fb77ed-6429-4024-8e25-fcc9ac1dc1e7">
</p>

### [パーティクル](https://npo-clack.github.io/p5js-learning/samples/particle/complete/)
パーティクルはクリエイティブコーディングの基本。大量のパーティクルを制御する方法を学ぶ。応用すれば宇宙の星空を再現したり、雨や雪を表現したりできる。クラスを学ぶ。

<p align="center"> 
<img width="729" alt="Screen Shot 0005-12-02 at 12 09 24" src="https://github.com/npo-clack/p5js-learning/assets/25113191/f58f9b11-54eb-4c6f-9cbc-829c444ad251">
</p>

### [ライフゲーム](https://npo-clack.github.io/p5js-learning/samples/gameoflife/complete/)
誕生、生存、過疎、過密の４つのルールを与えて、人工生命をシュミレーションする。ピクセルアートを完全に理解できる人のみ選択可能。

<p align="center"> 
<img width="730" src="https://github.com/npo-clack/p5js-learning/blob/main/samples/gameoflife/images/lifegame.gif">
</p>

## コースの内容

初回はテーマ決め、zennで基礎を学習し、サンプルアプリを模写、そのあと自作アプリorサンプルのカスタマイズを行う。

通常
| week | コンテンツ                                 |
| ---- | ------------------------------------------ |
| 1    | 作りたいものを決める。                       |
| 2    | zenn本のチャプタ-5まで終わらせる。終わらなければ家でやる。 |
| 3    | zenn本のチャプタ-9まで終わらせる。終わらなければ家でやる。 |
| 4    | p5jsをHTMLに統合してWebブラウザ上でみれるようにする |
| 5    | サンプルアプリ実装                     |
| 6    | サンプルアプリ実装                |
| 7    | 自作アプリorカスタマイズ                          |
| 8    | 自作アプリorカスタマイズ                                |
| 9    | 自作アプリorカスタマイズ                             |
| 10   | 発表資料作成                               |
| 11   | 最終発表会                                 |

## Week1 作りたいものを決める
作りたいものを決めましょう。

好きなもの × サンプルアプリ =

サンプルアプリ
- パーティクル
- ピクセルアート

応用サンプルアプリ
- ゲームオブライフ(ピクセルアートをクリアした人のみ)

## Week2 zenn本のチャプタ-5まで終わらせる。終わらなければ家でやる

学習
https://zenn.dev/ojk/books/intro-to-p5js

エクササイズ
p5jsを使って簡単な絵を描きましょう。[オンラインエディタ](https://editor.p5js.org/)を使ってください。
コードは、`exercises/week2/your-code.js`に貼り付けてください。

## Week3 zenn本のチャプタ-9まで終わらせる。終わらなければ家でやる

学習
https://zenn.dev/ojk/books/intro-to-p5js

エクササイズ
キーボードの矢印キーを入力すると、四角が移動するプログラミムを書いてみましょう。ChatGPTに相談してもよいですが、まずは自分で手を動かして悩んだほうが、覚えやすいです。

[オンラインエディタ](https://editor.p5js.org/)を使ってください。
コードは、`exercises/week３/your-code.js`に貼り付けてください。

## Week4 p5jsをHTMLに統合してWebブラウザ上でみれるようにする
今まではオンラインのエディタを使ってp5jsを書いていました。オンラインエディタの内容はアカウント登録すれば保存でき他の人に見せることができます。
今回はアカウント登録せずに、他の人に見せることができるように、p5jsとHTMLを統合する方法を学びます。

学習
`samples/skeleton`フォルダを見てください。これがp5jsを利用するための最小構成です。`index.html`の`head`で`p5.min.js`ファイルを読み込みその後に`my-p5.js`を読み込んでいます。順番が大事です。なぜなら`my-p5.js`はp5jsのコードに依存するため、前もって読み込まれていなければいけないからです。

```index.html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- p5jsのライブラリ -->
    <script src="p5.min.js"></script>
    <!-- 自分のコード -->
    <script src="my-p5.js"></script>
</head>
<body>
    <!-- canvasはp5jsが作成してくれる -->
</body>
</html>
```

`p5.min.js`はp5jsの本体コードを圧縮したものです。読めなくて大丈夫ですが、これがp5jsのさまざまな機能を提供してくれていることを知っておいてください。

`my-p5.js`は自分たちのコードを書く場所です。ここまで理解したらエクササイズに進みましょう！

エクササイズ1
`exercises/week4`配下に`index.html`ファイルと`my-p5.js`を自作して、Week3のエクササイズを再現してください。p5jsのライブラリはそのフォルダ直下にある`p5.min.js`を利用してください。

エクササイズ２(余裕のある人だけ)
エクササイズ１で作ったものを、GitHub Pagesにホスティングしてください。

## Week5~Week6 サンプルアプリの実装

学習
サンプルアプリ
- ピクセルアート
- パーティクル
- ゲームオブライフ

エクササイズ
サンプルアプリに自分なりのカスタマイズをしてください。どんなに小さなカスタマイズでもOK!
カスタマイズした箇所の説明とともにコードを提出してください。

## Week7 ~ Week9 自作アプリorサンプルアプリのカスタマイズ


## Week10
最終発表会準備

## Week11
最終発表会

# 発展
p5jsでできること

p5jsの作例集
https://p5js.org/examples/

リリックビデオの作成。daniwellPさんは才能の塊だと思います。
[https://textalive.jp/](https://developer.textalive.jp/app/examples/)

チームラボの空間演出はp5jsの親戚であるProcessingで作られています
https://www.team-lab.com/recruit/fresh/product_engineer/

HTML5の機能と組み合わせれば可能性は無限大？

[p5.js のキャンバスにパワポの画面を取り込む（Screen Capture API を活用）](https://protopedia.net/prototype/2804)

[ブラウザ上で録音できるツールをflask + recorder.js + p5.js on TypeScript で作る](https://www.atsuya.xyz/blog/ts-p5-webapp)

[発した言葉の中にGとWがあれば祝福してくれるブラウザアプリをブラウザのみで作ってみた](https://zenn.dev/tkyko13/articles/2c64f53c06e713)

[Web Serial API を利用できる p5.js用のライブラリ「p5.web-serial」で micro:bit とのシリアル通信（p5.js Web Editor・MakeCodeを利用）](https://qiita.com/youtoy/items/1abd620bd5cbe531fe01)

