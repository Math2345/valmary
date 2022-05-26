$(document).ready(function () {
  $(".s_pound-slider").owlCarousel({
    items: 1,
    dots: true,
    autoplay: true,
    margin: 30,
    loop: true,
    smartSpeed: 1200,
    autoplayTimeout: 10000,
  });
  $(".s_news-slider").owlCarousel({
    items: 1,
    margin: 60,
  });

  $(".news__slider").owlCarousel({
    loop: true,
    items: 1,
    margin: 15,
    responsive: {
      768: {
        items: 2,
      },
    },
  });

  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
  });
  $(".slider-nav").slick({
    asNavFor: ".slider-for",
    autoplay: false,
    dots: false,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true
  });

	new WOW().init();

  $(function() {
    $('.lazy').lazy();
  });
});



// $('.header-sub_menu').each(function() {
//   var curHeight = $(this).height();
//   $(this).attr('data-height', curHeight);
//   $(this).css('height', 0);
//   $(this).css('display', 'flex');
// });
// $( ".wrapper_sub_menu" ).hover(function(){
//   $(this).find('.header-sub_menu').css('height', '');
// });

getScrnWidth();

// $(window).resize(function(){
//   getScrnWidth()
// });

function getScrnWidth() {
  if (screen.width <= 768) {
    $(".hover_indicator").click(function () {
      $(this).toggleClass("active");
      $(this).next().next("ul").slideToggle(200);
    });
  } else {
    $(".wrapper_sub_menu").hover(
      function () {
        clearTimeout($.data(this, "timer"));
        $(".header-sub_menu", this).stop(true, true).slideDown(200);
      },
      function () {
        $.data(
          this,
          "timer",
          setTimeout(
            $.proxy(function () {
              $(".header-sub_menu", this).stop(true, true).slideUp(200);
            }, this),
            100
          )
        );
      }
    );
  }
}

$(".header-burger").click(function () {
  $(".header-menu").slideToggle(300);
});

//////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".s_news-slider")) {
    let newsSlider = document.querySelector(".s_news-slider");
    let sliderList = newsSlider.querySelectorAll(
      ".s_news-slider--item.cards .card"
    );
    for (let i = 0; i < sliderList.length; i++) {
      sliderList[i].addEventListener("mouseenter", function () {
        this.parentNode.setAttribute(
          "data-focus",
          this.getAttribute("data-id")
        );
      });
    }
    newsSlider.addEventListener("mouseleave", function () {
      sliderList[0].parentNode.setAttribute("data-focus", "0");
    });
  }
  if (document.querySelector(".s_achive button")) {
    let btn = document.querySelector(".s_achive button");
    let list = document.querySelector(".s_achive-list");
    btn.addEventListener("click", function () {
      list.classList.toggle("active");
      // btn.remove();
      if (list.classList.contains('active')) {
        btn.innerHTML = 'Свернуть <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.14221 0C7.42403 0 7.6656 0.104677 7.87495 0.330136L14.0106 6.59467C14.1878 6.77181 14.2844 6.99727 14.2844 7.26299C14.2844 7.79443 13.8657 8.22119 13.3262 8.22119C13.0605 8.22119 12.827 8.10846 12.6418 7.93132L7.14221 2.2868L1.64263 7.93132C1.45743 8.10846 1.21587 8.22119 0.9582 8.22119C0.418709 8.22119 0 7.79443 0 7.26299C0 6.99727 0.0966252 6.77181 0.273771 6.59467L6.40142 0.330136C6.61882 0.104677 6.86039 0 7.14221 0Z" fill="#00365F"/></svg>';
      }
      else {
        btn.innerHTML = "Показать все";
      }
    });
  }
  if (document.querySelector(".s_priority-social .img-list")) {
    let imgList = document.querySelector(".s_priority-social .img-list");
    let list = document.querySelectorAll(".s_priority-social .img-list img");
    for (let i = 0; i < list.length; i++) {
      list[i].addEventListener("mouseenter", function () {
        this.parentNode.parentNode.setAttribute(
          "data-focus",
          this.getAttribute("data-id")
        );
      });
      imgList.addEventListener("mouseleave", function () {
        this.setAttribute("data-focus", "");
      });
    }
  }
  if (document.querySelector(".s_career-story")) {
    let btnsMore = document.querySelectorAll(".story button.more");
    let btnsLess = document.querySelectorAll(".story button.less");
    for (let i = 0; i < btnsMore.length; i++) {
      btnsMore[i].addEventListener("click", function () {
        this.parentNode.querySelector(".about").classList.add("active");
        this.parentNode.querySelector(".less").classList.add("active");
        this.classList.remove("active");
      });
    }
    for (let j = 0; j < btnsLess.length; j++) {
      btnsLess[j].addEventListener("click", function () {
        this.parentNode.querySelector(".about").classList.remove("active");
        this.parentNode.querySelector(".more").classList.add("active");
        this.classList.remove("active");
      });
    }
  }
  if (document.querySelector(".s_vakancy-list")) {
    let list = document.querySelector(".s_vakancy .s_vakancy-list");
    let btn = document.querySelector(".s_vakancy button");
    btn.addEventListener("click", function () {
      list.classList.add("active");
      btn.style.display = "none";
    });
  }

  if (document.querySelector(".reestr")) {
    let tree = document.querySelector(".parent-list");
    // for (let i = 0; i < items.length; i++) {
    //   items[i].addEventListener("click", function () {
    //     this.classList.toggle("active");
    //   });
    // }

    let childrenContainers = document.querySelectorAll('.list-doc');
    childrenContainers.forEach(item => {
      item.hidden = true
    })

    //  ловим клики на всём дереве
    tree.onclick = function(event) {
      let childrenContainer = event.target.parentNode.querySelector('.list-doc');
      if (!childrenContainer) return; // нет детей

      childrenContainer.hidden = !childrenContainer.hidden;
    }
  }

  if (document.querySelector(".s_smi-btn button")) {
    let btn = document.querySelector(".s_smi-btn button");
    let sections = document.querySelector(".s_news-banner.s_smi");
    btn.addEventListener("click", function () {
      sections.classList.add("active");
      // btn.remove();
    });
  }
});


// $(".select").each(function () {
//   // Variables
//   var $this = $(this),
//     selectOption = $this.find("option"),
//     selectOptionLength = selectOption.length,
//     selectedOption = selectOption.filter(":selected"),
//     dur = 500;
//
//   $this.hide();
//   // Wrap all in select box
//   $this.wrap('<div class="select"></div>');
//   // Style box
//   $("<div>", {
//     class: "select__gap",
//     text: "Выберите год", //Placeholder
//   }).insertAfter($this);
//
//   var selectGap = $this.next(".select__gap"),
//     caret = selectGap.find(".caret");
//   // Add ul list
//   $("<ul>", {
//     class: "select__list",
//   }).insertAfter(selectGap);
//
//   var selectList = selectGap.next(".select__list");
//   // Add li - option items
//   for (var i = 0; i < selectOptionLength; i++) {
//     $("<li>", {
//         class: "select__item",
//         html: $("<span>", {
//           text: selectOption.eq(i).text(),
//         }),
//       })
//       .attr("data-value", selectOption.eq(i).val())
//       .appendTo(selectList);
//   }
//   // Find all items
//   var selectItem = selectList.find("li");
//
//   selectList.slideUp(0);
//   selectGap.on("click", function () {
//     if (!$(this).hasClass("on")) {
//       $(this).addClass("on");
//       selectList.slideDown(dur);
//
//       selectItem.on("click", function () {
//         var chooseItem = $(this).data("value");
//         console.log(chooseItem);
//         $("select").val(chooseItem).attr("selected", "selected");
//         selectGap.text($(this).find("span").text());
//         $("#mydiv").text(chooseItem);
//         selectList.slideUp(dur);
//         selectGap.removeClass("on");
//       });
//     } else {
//       $(this).removeClass("on");
//       selectList.slideUp(dur);
//     }
//   });
// });

var yearSelect = document.getElementById("yearSelect");
var yearSelectDiv = document.getElementById("mydiv");
if (yearSelect) {
  yearSelect.addEventListener('change',function(){
    var chosenYear = yearSelect.value;
    yearSelectDiv.innerHTML = chosenYear
  });
}

var agroList = document.querySelector('.s_agro-list--items')

if (agroList) {
  if (screen.width <= 768) {
    agroList.onclick = function(event) {
      let itemOpen = document.querySelector('.item-click')
      if (itemOpen) {
        itemOpen.classList.remove('item-click')
      }
      let item = event.target.closest('.item');
      item.classList.add('item-click')
    }
  }
}

$(".countries-list").on("click", "li", function(){
  $(".s_fieldexp").attr('style', 'background-image: url(' + $(this).attr("data-bg") + ')');
  $(".s_fieldexp .earth img").attr('src', $(this).attr("data-map"));
})