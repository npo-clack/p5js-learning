# p5js-learning
p5jsを勉強するコンテンツ。
このコースは魅力的かつダイナミックな動きを実現できるp5jsを学ぶコースです。
週一のTR+だけでなく家庭学習前提のコースとなるため、時間が確保できる人のみ選択してください。

## この教材で学べること
p5jsというクリエイティブコーディング用のライブラリの使い方を学び、プログラミングをつかった強力な表現力をみにつける。

### [ピクセルアート](https://npo-clack.github.io/p5js-learning/samples/pixel-art/complete/)
ボード系の考え方を身につける。ポチポチで色を変える。
<img width="734" alt="Screen Shot 0005-12-02 at 12 04 31" src="https://github.com/npo-clack/p5js-learning/assets/25113191/33fb77ed-6429-4024-8e25-fcc9ac1dc1e7">

### [パーティクル](https://npo-clack.github.io/p5js-learning/samples/particle/complete/)
パーティクルはクリエイティブコーディングの基本。大量のパーティクルを制御する方法を学ぶ。応用すれば宇宙の星空を再現したり、雨や雪を表現したりできる。クラスを学ぶ。
<img width="729" alt="Screen Shot 0005-12-02 at 12 09 24" src="https://github.com/npo-clack/p5js-learning/assets/25113191/f58f9b11-54eb-4c6f-9cbc-829c444ad251">

### [ライフゲーム](https://npo-clack.github.io/p5js-learning/samples/gameoflife/complete/)
誕生、生存、過疎、過密の４つのルールを与えて、人工生命をシュミレーションする。ピクセルアートを完全に理解できる人のみ選択可能。
<img width="730" src="https://github.com/npo-clack/p5js-learning/blob/main/samples/gameoflife/images/lifegame.gif">

## コースの内容

コースは「学習」と「エクササイズ」に別れています。「エクササイズ」はコードを提出してください。

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
- お絵かき

応用サンプルアプリ
- スネークゲーム(ピクセルアートをクリアした人のみ)
- ゲームオブライフ(ピクセルアートをクリアした人のみ)
- 鳥の群衆シュミレーションBoids(パーティクルをクリアした人のみ)

## Week2 zenn本のチャプタ-5まで終わらせる。終わらなければ家でやる

学習
https://zenn.dev/ojk/books/intro-to-p5js

エクササイズ
p5jsを使って簡単な絵を描きましょう。

## Week3 zenn本のチャプタ-9まで終わらせる。終わらなければ家でやる

学習
https://zenn.dev/ojk/books/intro-to-p5js

エクササイズ
キーボードの矢印キーを入力すると、四角が移動するプログラミムを書いてみましょう。ChatGPTに相談してもよいですが、まずは自分で手を動かして悩んだほうが、覚えやすいです。

## Week4 p5jsをHTMLに統合してWebブラウザ上でみれるようにする
今まではオンラインのエディタを使ってp5jsを書いていました。オンラインエディタの内容はアカウント登録すれば保存でき他の人に見せることができます。
今回はアカウント登録せずに、他の人に見せることができるように、p5jsとHTMLを統合する方法を学びます。

学習

エクササイズ1
p5jsのライブラリの他に`index.html`ファイルと`main.js`を自作して、Week3のエクササイズを再現してください。

エクササイズ２
エクササイズ１で作ったものを、GitHub Pagesにホスティングしてください。

## Week5~Week6 サンプルアプリの実装

学習
サンプルアプリ
- パーティクル
- ゲームオブライフ
- お絵かき
- アート
- フォース(物理的な力)

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
(p5.js のキャンバスにパワポの画面を取り込む（Screen Capture API を活用）)[https://protopedia.net/prototype/2804]
(ブラウザ上で録音できるツールをflask + recorder.js + p5.js on TypeScript で作る)[https://www.atsuya.xyz/blog/ts-p5-webapp]
(発した言葉の中にGとWがあれば祝福してくれるブラウザアプリをブラウザのみで作ってみた)[https://zenn.dev/tkyko13/articles/2c64f53c06e713]
(Web Serial API を利用できる p5.js用のライブラリ「p5.web-serial」で micro:bit とのシリアル通信（p5.js Web Editor・MakeCodeを利用）)[https://qiita.com/youtoy/items/1abd620bd5cbe531fe01]

