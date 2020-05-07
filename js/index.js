window.addEventListener("load", function () {
  // 1.获取元素
  var focus = this.document.querySelector(".focus");
  var lBtn = this.document.querySelector(".arrow-l");
  var rBtn = this.document.querySelector(".arrow-r");
  var ul = focus.querySelector("ul");
  var ol = focus.querySelector("ol");
  focus.addEventListener("mouseenter", function () {
    lBtn.style.display = "block";
    rBtn.style.display = "block";
    clearInterval(timer);
    timer = null;
  });
  focus.addEventListener("mouseleave", function () {
    lBtn.style.display = "none";
    rBtn.style.display = "none";
    timer = setInterval(function () {
      rBtn.click();
    }, 2000);
  });
  //动态生成小圆圈
  for (var i = 0; i < ul.children.length; i++) {
    var li = this.document.createElement("li");
    ol.appendChild(li);
    // 设置自定义属性
    li.setAttribute("index", i);
    li.addEventListener("click", function () {
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      this.className = "current";
      var focusWidth = focus.offsetWidth;
      // 得到自定义属性
      var index = this.getAttribute("index");
      // console.log(index);
      // console.log(focusWidth);
      num = circle = index;
      animate(ul, -index * focusWidth);
    });
  }
  // 把ol的第一个小li设置类名:current
  ol.children[0].className = "current";
  //克隆一个li 把他放在ul最后面
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  // 左右按钮
  var num = 0;
  var circle = 0;
  // flag 节流阀
  var flag = true;
  lBtn.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + "px ";
      }
      num--;
      var focusWidth = focus.offsetWidth;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      // 让小圆圈跟着一起播放
      circle--;
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }

      ol.children[circle].className = "current";
    }
  });

  rBtn.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      var focusWidth = focus.offsetWidth;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      // 让小圆圈跟着一起播放
      circle++;
      if (circle == ol.children.length) {
        circle = 0;
      }
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }

      ol.children[circle].className = "current";
    }
  });
  // 自动播放轮播图
  var timer = this.setInterval(function () {
    // 手动调用点击事件
    rBtn.click();
  }, 2000);
  //load 结束
});
