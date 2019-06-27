(function () {
  // .Navに高さを持たせ、position:fixedにするのは.Nav-listにする
  // スティッキーにする要素（ターゲット）
  const stickyTarget = document.querySelector('.js-sticky');

  // ターゲットの親要素
  const stickyTargetParent = document.querySelector('.js-stickyParent');

  // ターゲットのDOMRect
  const stickyTargetRect = stickyTarget.getBoundingClientRect();

  // ターゲット要素の本来のY座標（ページの左上基準）
  const stickyTargetPosY = getAbsolutePosY(stickyTargetRect);

  // ターゲット要素がfixedな状態かどうかを管理する変数
  let isFixed = false;

  // 親に高さをセットする
  setHeight(stickyTargetParent, stickyTargetRect);

  // 現在のスクロール量（Y方向）を取得する
  function getScrollY() {
    // IEがwindow.scrollYをサポートしていないため、`window.pageYOffset`
    return window.scrollY || window.pageYOffset;
  }

  // ターゲット要素の本来のY座標を取得する
  function getAbsolutePosY(domRect) {
    const scrollY = getScrollY();
    // getBoundingClientRect()で、要素のサイズとビューポートからの位置を取得
    const offsetFromViewportTop = domRect.top;
    // elementのページ左上基準のY座標 = Y方向スクロール量 + ビューポート上辺から位置
    return scrollY + offsetFromViewportTop;
  }

  // 親にターゲットの高さをセットする関数
  function setHeight(element, domRect) {
    element.style.height = `${domRect.height}px`;
  }

  // スクロールイベントの処理
  // fixed解除
  function unfixed() {
    // 解除済みだったら何もしない
    if (!isFixed) {
      return;
    }
    stickyTarget.classList.remove('fixed');
    isFixed = false;
  }

  // fixedにする
  function fixed() {
    // 既にfixedなら何もしない
    if (isFixed) {
      return;
    }
    stickyTarget.classList.add('fixed');
    isFixed = true;
  }

  // イベントハンドラ
  function onScroll(event) {
    // 現在のY方向スクロール量
    const currentScrollY = getScrollY();
    // スクロール量とターゲット要素の元の位置を比較して、
    // スクロール量のほうが小さければfixed解除
    // そうでなければfixedにする
    console.log(currentScrollY, stickyTargetPosY);
    if (currentScrollY < stickyTargetPosY) {
      unfixed();
    } else {
      fixed();
    }
  }

  window.addEventListener('scroll', onScroll, false);
})();