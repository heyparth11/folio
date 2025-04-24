jQuery(document).ready(function($){

    if(window.innerWidth < 1280){
        $('.modal-overlay').css('display', 'flex');
        $('body').html($('.modal-wrapper').html());
    }

    const dot = $('.heading_mask.masked-image');
    
    let mouseX = 0;
    let mouseY = 0;

    mouseX = $(document).width() / 2;
    mouseY = $(document).height() / 2;

    $(document).mousemove(function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
    });

    function updateDot() {
        // dot.css({
        //     transform: `translate(${mouseX - dot.width() / 2}px, ${mouseY - dot.height() / 2}px)`
        // });
        dot.css({
            '--x': `${mouseX}px`,
            '--y': `${mouseY}px`
        });
        // $('.layer_cursor').css({
        //     '--x': `${mouseX - dot.width() / 2}px`,
        //     '--y': `${mouseY - dot.height() / 2}px`
        // })
        requestAnimationFrame(updateDot);
    }
    requestAnimationFrame(updateDot);

    // $('.navbar-brand').mouseover(function(){
    //     $(this).find('svg path')
    // });
    // $('.navbar-brand').mouseleave(function(){
    //     dot.css('--width', '38px');
    // });

})

// jQuery(document).ready(function ($) {
//     const logo = $('.logo');
//     const range = 150;

//     logo.mouseover(function (event) {
//         const logoOffset = logo.offset();
//         const logoCenterX = logoOffset.left + logo.width() / 2;
//         const logoCenterY = logoOffset.top + logo.height() / 2;

//         // Calculate the distance between the cursor and the logo's center
//         const distanceX = event.pageX - logoCenterX;
//         const distanceY = event.pageY - logoCenterY;

//         // Calculate the distance from the cursor to the logo's center
//         const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

//         if (distance < range) {
//             const moveX = distanceX * 0.9;
//             const moveY = distanceY * 0.9;
//             logo.css({
//                 transform: `translate(${moveX}px, ${moveY}px)`
//             });
//             // logo.find('svg path').css('fill', 'var(--cursor-color)')
//         } else {
//             logo.css({
//                 transform: 'translate(0, 0)'
//             })
//             // logo.find('svg path').css('fill', 'var(--primary-color)')
//         }
//     })

//     logo.mouseleave(function () {
//         logo.css({
//             transform: 'translate(0, 0)'
//         })
//         // logo.find('svg path').css('fill', 'var(--primary-color)')
//     })

// });


const container = document.querySelector('.cursor_layer');

let xTo = gsap.quickTo(".cursor_layer", "--x", { duration: 0.8, ease: "power3" }),
    yTo = gsap.quickTo(".cursor_layer", "--y", { duration: 0.8, ease: "power3" });

window.addEventListener("mousemove", e => {
    const rect = container.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    xTo(xPercent);
    yTo(yPercent);
    // xTo(e.clientX);
    // yTo(e.clientY);
});

$('.dot_expand').on('mouseenter', () => {
    gsap.to(".cursor_layer", {
        "--width": 250,  // Expands the mask
        duration: 0.4,
        ease: "power2.inOut"
    });
});

// On mouse leave, shrink the size of the mask
$('.dot_expand').on('mouseleave', () => {
    gsap.to(".cursor_layer", {
        "--width": 20,
        duration: 0.4,
        ease: "power2.inOut"
    });
});



$('.dot_shrink').on('mouseleave', () => {
  gsap.to(".cursor_layer", {
      "--width": 20,
      duration: 0.4,
      ease: "power2.inOut"
  });
});
$('.dot_shrink').on('mouseenter', () => {
  gsap.to(".cursor_layer", {
      "--width": 0,
      duration: 0.3,
      ease: "power2.inOut"
  });
});
// hoverTarget.addEventListener('mouseleave', () => {
//     gsap.to(".dot", {
//         width: 20,
//         duration: 0.3,
//         ease: "power2.inOut"
//     });
// });
// $(window).on('load', function () {
//     $('.page-loading').addClass('loaded');
// })


// gsap.to("h1", {
//     fontSize: () => Math.max(window.innerWidth * 0.085, 18) + "px", // 5% of viewport width, minimum of 18px
//     ease: "none",
//     onUpdate: () => {
//         window.addEventListener('resize', () => {
//             gsap.to("h1", {
//                 fontSize: Math.max(window.innerWidth * 0.085, 18) + "px"
//             });
//         });
//     }
// });
// gsap.to("h2", {
//     fontSize: () => Math.max(window.innerWidth * 0.04, 18) + "px", // 5% of viewport width, minimum of 18px
//     ease: "none",
//     onUpdate: () => {
//         window.addEventListener('resize', () => {
//             gsap.to("h1", {
//                 fontSize: Math.max(window.innerWidth * 0.04, 18) + "px"
//             });
//         });
//     }
// });






const target = document.querySelector(".navbar-brand"); // The logo (target element)

document.addEventListener("mousemove", function(e) {
  const cursorPosition = {
    left: e.clientX,
    top: e.clientY
  };

  document.querySelectorAll(".navbar-brand").forEach(function(single) {
    const triggerDistance = single.getBoundingClientRect().width * 2; // Define the range around the logo
    const targetRect = single.getBoundingClientRect();

    // Calculate the distance between the logo and the cursor
    const distance = {
      x: targetRect.left + targetRect.width / 2 - cursorPosition.left,
      y: targetRect.top + targetRect.height / 2 - cursorPosition.top
    };

    const hypotenuse = Math.sqrt(
      distance.x * distance.x + distance.y * distance.y
    );

    if (hypotenuse < triggerDistance) {
      // Always move the logo to the exact center of the cursor
      TweenMax.to(single, 0.4, {
        x: cursorPosition.left - targetRect.width / 2 - targetRect.left, // Align the logo to cursor center
        y: cursorPosition.top - targetRect.height / 2 - targetRect.top, // Align the logo to cursor center
        ease: "power3.out"
      });
    } else {
      // Reset logo position when the cursor moves out of the range
      TweenMax.to(single, 0.4, {
        x: 0,
        y: 0,
        ease: "power3.out"
      });
    }
  });
});


$('.padding:not(.history-js) .tech-head-wrap').on('mouseenter', function(){
  $('.primary_layer .padding:not(.history-js) .tech-head-wrap').eq($(this).index() - 1).addClass('is-hover');
})
$('.padding:not(.history-js) .tech-head-wrap').on('mouseleave', function(){
  $('.primary_layer .padding:not(.history-js) .tech-head-wrap').eq($(this).index() - 1).removeClass('is-hover');
})
$('.padding.history-js .tech-head-wrap').on('mouseenter', function(){
  $('.primary_layer .padding.history-js .tech-head-wrap').eq($(this).index() - 1).addClass('is-hover');
})
$('.padding.history-js .tech-head-wrap').on('mouseleave', function(){
  $('.primary_layer .padding.history-js .tech-head-wrap').eq($(this).index() - 1).removeClass('is-hover');
})

// $('.padding:not(.footer-js) .tech-head-wrap').on('mouseenter', function(){
//     $('.primary_layer .padding:not(.footer-js) .tech-head-wrap').eq($(this).index() - 1).addClass('is-hover');
// })
// $('.padding:not(.footer-js) .tech-head-wrap').on('mouseleave', function(){
//     $('.primary_layer .padding:not(.footer-js) .tech-head-wrap').eq($(this).index() - 1).removeClass('is-hover');
// })
$('.padding.footer-js .tech-head-wrap').on('mouseenter', function(){
    $('.primary_layer .padding.footer-js .tech-head-wrap').eq($(this).parent().parent().index()).addClass('is-hover');
})
$('.padding.footer-js .tech-head-wrap').on('mouseleave', function(){
    $('.primary_layer .padding.footer-js .tech-head-wrap').eq($(this).parent().parent().index()).removeClass('is-hover');
})