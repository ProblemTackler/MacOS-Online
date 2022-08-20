////////////////////////////////////
//  A thing by Vlad Shapochnikov  //
//        www.vladshap.com        //
////////////////////////////////////

var $body = $('body');
var $window = $('.window');
var menuBar = function() {
  var $menu = $('.menu');

  // Menu Bar Logic
  $menu.on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('active-nav');
  });
};
menuBar();

var activeWindow = function() {
  // Active Window Logic
  $window.on('click', function(e) {
    e.stopPropagation();
    $window.removeClass('current-window');
    $(this).addClass('current-window');
  });

};
activeWindow();

var draggableWindow = function() {
  $window.draggable({
    handle: '.window-actions, .window-nav, .status-bar',
    containment: 'parent',
    disabled: false,
    start: function(event, ui) {
      $window.removeClass('current-window');
      $(this).addClass('current-window');
    }
  });
};
draggableWindow();

var resizableWindow = function() {
  $window.resizable({
    handles: 'all',
    disabled: false,
    minWidth: 320,
    minHeight: 225,
    start: function(event, ui) {
      draggableWindow();
    }
  });
};
resizableWindow();

var closeWindow = function() {
  $('.window-close').bind('click', function(e) {
    e.preventDefault();
    $(this).parents('.window').removeClass('current-window window-opened').addClass('window-closed').hide();
  });
};
closeWindow();

var zoomWindow = function() {
  $('.window-zoom').on('click', function() {
    //$(this).parents('.window').addClass('animated').toggleClass('window-zoomed');

    if ($window.hasClass('window-zoomed')) {
      $(this).parents('.window').removeClass('window-zoomed').css({
        width: '',
        height: '',
        left: Math.floor(Math.random() * 100) + 1,
        top: Math.floor(Math.random() * 100) + 1

      });

      setTimeout(function() {
        $('.window').removeClass('animated');
      }, 400);

      draggableWindow();

    } else {
      $(this).parents('.window').addClass('animated window-zoomed').css({
        left: 0,
        top: 0,
        right: 0,
        width: $('.screen').width(),
        height: $('.screen').height() - 50
      });

      $window.draggable({
        disabled: true
      })
    }
  });
};
zoomWindow();

var resizableWindowSidebar = function() {
  $('.window-sidebar').resizable({
    handles: 'e'
  });
};
resizableWindowSidebar();

var sortableSidebar = function() {
  var $sidebarUL = $('.sidebar-nav ul');

  // Make sidebar rearrangeable
  $sidebarUL.sortable({
    distance: 10,
    axis: 'y',
    revert: 150
  });
  $sidebarUL.disableSelection();
};
sortableSidebar();

var sidebarToggle = function() {
  // Show/hide sidebar nav items
  $('.toggle-nav').on('click', function() {
    $(this).parent().next('.child-nav').slideToggle(200);
  });
};
sidebarToggle();

var windowTitle = function() {
  //console.log($imageSrc);
  var $selectedTitle = $(this).text();
  var $imageSrc = $(this).find('img').attr('src');
  $(this).parents('.window').find('.window-title .title').text($selectedTitle);
  $(this).parents('.window').find('.title-icon').prop('src', $imageSrc);
};
windowTitle();

var selectableSidebarNav = function() {
  $window.each(function() {
    $('.child-nav li', '.sidebar-nav').on("click", function() {
      $('.child-nav li', '.sidebar-nav').removeClass('active');
      $(this).addClass('active');

      windowTitle();

    });
  });
};
selectableSidebarNav();

var clearWindowClasses = function() {
  $body.click(function() {
    $window.removeClass('current-window');
  });
};
clearWindowClasses();

var sortableTabs = function() {
  var $nativeTabs = $('.native-tabs ul');

  // Tab Sorting
  $nativeTabs.sortable({
    cancel: '.ui-state-disabled',
    axis: "x",
    revert: 100,

    containment: "parent"
  });
  $nativeTabs.disableSelection();
};
sortableTabs();

var switchTabs = function() {

  var $tabs = $('a', '.native-tabs'),
    $tab = $('.tab');

  // Menu Bar Logic
  $tabs.on('click', function(e) {
    e.preventDefault();
    $tab.not(this).removeClass('tab-active');
    $(this).parent().addClass('tab-active');
  });
};
switchTabs();

var tabCount = null;
var countWindowTabs = function() {

  var windowName = null;

  $window.each(function(e) {
    tabCount = $(this).find('.tab').size();
    windowName = $(this).attr("id");

    //console.log(windowName + " window tab count: " + tabCount);
  });

  $window.on('click', function(e) {
    e.stopPropagation();
    $('.window').removeClass('current-window');
    $(this).addClass('current-window');

    tabCount = $(this).find('.tab').size();

    //console.log("Current window tab count: " + tabCount);

  });

};
countWindowTabs();

var closeTab = function() {
  $('.close-tab').on('click', function(e) {
    e.preventDefault();
    tabCount--;
    console.log("New tab count: " + tabCount);

    var $currentWindow = $(this).parents('.window');
    //console.log($currentWindow);

    if (tabCount < 1) {
      $currentWindow.addClass('hide-tabs');
    } else {
      $currentWindow.removeClass('hide-tabs');
    }

    $(this).parents('.tab').addClass('removing').delay(200).queue(function() {
      $(this).remove();
    });

  });
};
closeTab();

var setDateAndTime = function() {
  // Set system date
  var currentDate = new Date();
  var hours = currentDate.getHours();
  var amPM = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  var weekday = new Array(7);
  weekday[0] = 'Sun';
  weekday[1] = 'Mon';
  weekday[2] = 'Tue';
  weekday[3] = 'Wed';
  weekday[4] = 'Thu';
  weekday[5] = 'Fri';
  weekday[6] = 'Sat';

  var weekdayFull = new Array(7);
  weekdayFull[0] = 'Sunday';
  weekdayFull[1] = 'Monday';
  weekdayFull[2] = 'Tuesday';
  weekdayFull[3] = 'Wednesday';
  weekdayFull[4] = 'Thursday';
  weekdayFull[5] = 'Friday';
  weekdayFull[6] = 'Saturday';

  var month = new Array();
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';

  // Add a leading zero
  function addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  var dateTime = weekday[currentDate.getDay()] + ' ' + hours + ':' + addZero(currentDate.getMinutes() + ' ' + amPM);

  var fullDate = weekdayFull[currentDate.getDay()] + ', ' + month[currentDate.getMonth()] + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear();

  // Set time in Menu Bar
  $('.date-time').text(dateTime);

  // Set date in Time dropdown
  $('.full-date').text(fullDate);
};
setDateAndTime();

var $appIcon = $('.app-icon');

var sortableDock = function() {
  var $dockUL = $('.dock ul');

  // Dock Sorting
  $dockUL.sortable({
    cancel: '.ui-state-disabled',
    revert: 100
  });
  $dockUL.disableSelection();
};
sortableDock();

var resizableDock = function() {
  // Dock Resizing
  $('.dock-resizer').resizable({
    handles: 'n',
    maxHeight: 120,
    minHeight: 20,
    resize: function(event, ui) {
      $appIcon.css({
        width: ui.size.height,
        height: ui.size.height
      });
      $('.dock').css('height', ui.size.height + 10);
    }

  });
};
resizableDock();

var whichAppsAreRunning = function() {
  function runningApp() {
    $('a', '.dock').each(function() {
      var $linkName = $(this).attr('href');

      if ($($linkName).is(':visible')) {
        $(this).parent().addClass('running');
        //console.log($linkName + " is running")
      } else {
        $(this).parent().removeClass('running');
        //console.log($linkName + " is not running")
      }
    });
  }

  runningApp();

  $('a', '.dock').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $appLink = $(this).attr('href');
    $('.window').removeClass('current-window');
    $($appLink).show();

    setTimeout(function() {
      $($appLink).removeClass('window-closed').addClass('current-window window-opened');
      runningApp();
    });
  });
};
whichAppsAreRunning();

var rightClickMenu = function() {
  var $screen = $('.screen');

  // Trigger action when the contexmenu is about to be shown
  $screen.bind('contextmenu', function(e) {

    // Avoid the real one
    e.preventDefault();

    // Show contextmenu
    $('.context-menu').finish().toggle().

    // In the right position (the mouse)
    css({
      top: e.pageY - 32 + 'px',
      left: e.pageX + 1 + 'px'
    });

    //console.log(e.pageY + ', ' + e.pageX);
  });

  // If the document is clicked somewhere
  $screen.bind('mousedown', function(e) {

    // If the clicked element is not the menu
    if (!$(e.target).parents('.context-menu').length > 0) {

      // Hide it
      $('.context-menu').hide();
    }
  });

  // If the menu element is clicked
  $('li', '.context-menu').on('on', function() {

    // This is the triggered action name
    switch ($(this).attr('data-action')) {

      // A case for each action. Your actions here
      case 'first':
        alert('first');
        break;
      case 'second':
        alert('second');
        break;
      case 'third':
        alert('third');
        break;
    }

    // Hide it AFTER the action was triggered
    $('.context-menu').hide();
  });
};
rightClickMenu();

var windowThumbSize = function() {

  $(".thumb-size-slider").slider({
    range: "min",
    min: -10,
    max: -4,
    value: -6,
    slide: function(event, ui) {
      $(".album-photos").removeClass(function(index, className) {
        return (className.match(/(^|\s)grid-\S+/g) || []).join(' ');
      }).addClass("grid" + ui.value);
    }
  });

  $(".album-photos").addClass("grid" + $(".thumb-size-slider").slider("value"));
};
windowThumbSize();

var baseUrl = "https://api.flickr.com/services/rest/?method=";
var apiKey = "8563c61491f61f1cf1055ac503a9b86f";
var userID = "14843363@N03";
//var defaultPhotoset = "72157645611652682";
var src;

var getPhotoAlbums = function() {
  var getListUrl = baseUrl + "flickr.photosets.getList" + "&user_id=" + userID + "&api_key=" + apiKey + "&format=json&jsoncallback=?";
  //console.log(getListUrl);

  // Get Album Names
  $.getJSON(getListUrl, function(data) {
      $.each(data.photosets.photoset, function(i, item) {

        var albumThumbSrc = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.primary + "_" + item.secret + "_s.jpg";
        $("<li>" +
            "<a href='#album-" + item.id + "'>" +
            "<i class='icon-sidebar icon-album'><img src='" + albumThumbSrc + "' alt='Album thumbnail for " + item.title._content + "'/></i>" +
            item.title._content + "" +
            "</a>" +
            "</li>")
          .appendTo('.photo-albums');

      });

    })
    .done(function() {

      var $activeAlbum = $('.active a', '.photo-albums');
      var $selectedTitle = $activeAlbum.text();
      $('.album-title').text($selectedTitle);

      var selectedAlbumID = $activeAlbum.attr("href").replace('#album-', '');
      //console.log(photoID);

      var displaySelectedAlbum = function() {
        if (selectedAlbumID === "all") {
          getAllPhotos();
        } else {
          getPhotos(selectedAlbumID);
        }
      }
      displaySelectedAlbum();

      $("a", ".photo-albums").on("click", function(e) {
        e.preventDefault();
        selectedAlbumID = $(this).attr("href").replace('#album-', '');
        //console.log(photoID);

        displaySelectedAlbum();
        $selectedTitle = $(this).text();
        $(this).parents('.window').find('.album-title').text($selectedTitle);

      });

      selectableSidebarNav();

    });
};
getPhotoAlbums();

// Get Photos from Albums
var getPhotos = function(photosetid) {
  var getPhotosUrl = baseUrl + "flickr.photosets.getPhotos" + "&photoset_id=" + photosetid + "&user_id=" + userID + "&api_key=" + apiKey + "&format=json&jsoncallback=?";
  //console.log(getPhotosUrl);
  $(".album-photos").empty();

  $.getJSON(getPhotosUrl, function(data) {
    $.each(data.photoset.photo, function(i, item) {
      src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_n.jpg";
      $("<li class='photo'><div class='photo-wrapper'><span class='image'><img src='" + src + "' alt=''/></span></div></li>").appendTo('.album-photos');
    });
    $(".photo-count").text(data.photoset.total + " Photos");

  }).done(function() {
    selectedPhoto();
  });
};
//getPhotos();

// Get All Photos
var getAllPhotos = function() {
  var getPhotosUrl = baseUrl + "flickr.people.getPublicPhotos" + "&user_id=" + userID + "&api_key=" + apiKey + "&per_page=500&format=json&jsoncallback=?";
  //console.log(getPhotosUrl);
  $(".album-photos").empty();

  $.getJSON(getPhotosUrl, function(data) {
    $.each(data.photos.photo, function(i, item) {
      src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_n.jpg";
      $("<li class='photo'><div class='photo-wrapper'><span class='image'><img src='" + src + "' alt=''/></span></div></li>").appendTo('.album-photos');
    });
    $(".photo-count").text(data.photos.total + " Photos");
  }).done(function() {
    selectedPhoto();
  });
};
//getAllPhotos();

//var $date = $('.photo', 'album-photos').not(':has(:empty)');
//var o = {
//    38: 'up',
//    40: 'bottom',
//    37: 'prev',
//    39: 'next'
//}
//
//
//$(document).on('keyup', function (e) {
//    var dir = o[e.which];
//    var $active = $('.active'),
//        i = $date.index($active);
//    if (e.which == 13) {
//        $('.selected').removeClass('selected');
//        $active.addClass('selected');
//        return;
//    }
//    if (!$active.length) {
//        $date.first().addClass('active');
//        return;
//    } else {
//        if (dir === 'next' || dir === 'prev') {
//            $active.removeClass('active')[dir]().addClass('active');
//        } else {
//            var p = dir === 'up' ? (i - 7) : (i + 7);
//            $date.removeClass('active').eq(p).addClass('active');
//        }
//    }
//})

var selectedPhoto = function() {
  $('.photo').on('click', function(e) {

    if (!$(this).hasClass('photo__selected')) {
      $('.photo__selected').removeClass('photo__selected');
      $(this).addClass('photo__selected');

      zoomSelectedPhoto();
    }

  });
};

var zoomSelectedPhoto = function() {

  $('.photo__selected').on('dblclick', function() {

    if ($(this).hasClass('photo__zoomed')) {
      $(this).removeClass('photo__zoomed');
      $('.image-large').remove();

    } else {

      $("<img/>").on('load', function() {
        console.log("image loaded correctly");

      }).on('error', function() {
        console.log("error loading image");

      }).attr("src", $(originalImage).attr("src"));

      $(this).addClass('photo__zoomed');

      var selectedImgSrc = $(this).find('img').attr('src');
      var largeImgSrc = selectedImgSrc.replace('_n.jpg', '_h.jpg');

      //console.log(largeImgSrc);

      $(this).find('.photo-wrapper').append("<span class='image-large'><img src='" + largeImgSrc + "' alt=''/></span>");
    }

  });

};
// zoomSelectedPhoto();
selectedPhoto();