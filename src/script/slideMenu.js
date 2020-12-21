/* Open the sidenav */
function openNav() {
  // document.getElementById("sidenav-menu").style.left = "0";
  $("#sidenav-menu").css("display", "block");
  let timeout = 0;
  $(".sidenav-site-links a").each(function() {
    let link = $(this);
    setTimeout(function() {
      link.css("display", "block");
    }, timeout);
    timeout += 200;
  });
  setTimeout(function() {
    $(".sidenav-social-links").css("display", "block");
  }, 1200);
}

/* Close/hide the sidenav */
function closeNav() {
  // document.getElementById("sidenav-menu").style.left = "-100%";
  $("#sidenav-menu").css("display", "none");
  $(".sidenav-site-links a").css("display", "none");
  $(".sidenav-social-links").css("display", "none");
}

let hidden = true;
$(document).ready(function(e) {
  // Slide down animate the music dropdown
  $(".dropdownContent").hide();
  $(".dropdown").hover(function(e) {
    e.preventDefault();
    $(this).children(".dropdownContent").slideDown();
  },
  function(e) {
    $(this).children(".dropdownContent").hide();
  });
});
