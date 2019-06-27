# ui-sticky

## 学習内容
CodeGridの記事を元に、スティッキーナビを作成
- https://app.codegrid.net/entry/2018-common-ui-5

スティッキーナビにおけるJavaScriptの基本的な考え方を学ぶ。

### ポイント
- `.Nav`がfixedになるタイミングでのコンテンツのズレ解消方法
    - `.Nav`が`fixed`になるタイミングで、`.Header`の下方向にマージンまたはパディングを付け、逆の場合は外す
    - `.Nav`が`fixed`になるタイミングで、`.Content`の上方向にマージンまたはパディングを付け、逆の場合は外す
    - `.Nav`に高さを持たせ、`position:fixed`にするのは`.Nav-list`にする（マージンやパディングの付け外しは処理の回数が増えるので、これが良さげ）
- `getBoundingClientRect()`で要素のサイズとビューポートからの位置を取得できる
    - 結果はオブジェクトなので、プロパティ名を指定して値を取得する  
    例）`element.getBoundingClientRect().top`

## 課題
- スクロールイベントが高頻度で発生するので、throttle処理を行ってイベントハンドラの実行回数を間引いてみる。
- IE以外ではcssの`position: sticky;`が使えるので、`@supportsルール`や`CSSSupportsRule`を使用して、基本はCSS Sticky positioningで実装しつつ、非対応の環境にはJavaScriptでの実装してみる（単純なもののみ）。
