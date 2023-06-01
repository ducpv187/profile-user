$(document).ready(function() {
  //function ClickItem => show-hidden content
  $( ".cascade-menu .js-tabitem" ).on( "click", function() { 
    let thisClick= $(this);
    let innerWidthCase = $( ".cascade-menu" ).innerWidth() / 4;  

    //global data color
    let dataColor = $(this).data('color');  

    //global idActive tabshowcontent
    let idActive = $(this).data("href");
    let template = document.getElementById(idActive);
  
    //Callback active Function
    if($(this).hasClass("active")){
      closeTab(innerWidthCase,400);
    } else {        
      openTab(thisClick,innerWidthCase,dataColor,template,400);
    }          
  });

  //function button Close => show-hidden content
  $( ".btn-close" ).on( "click", function() {
    let innerWidthCase = $( ".cascade-menu" ).innerWidth() / 4;
   
    //callback function closeTab
    closeTab(innerWidthCase,400);    
  }); 

  //function button arrow prev-next
  $( ".cascade-nav" ).on( "click", function() {
    let innerWidthCase = $( ".cascade-menu" ).innerWidth() / 4;
    let thisActive = $(".cascade-menu .js-tabitem.active");
    let thisIdActive = $(".cascade-menu .js-tabitem.active").data("id") + 1;
    let thisIdNext;
    let numberSelectAll = document.querySelectorAll(".js-tabitem");    
    let datatype = $(this).data("type");    
    if(thisIdActive < numberSelectAll.length && datatype == "next"){        
        thisIdNext = thisActive.data("id") + 1;   
    }
    else if(thisIdActive > 1 && datatype == "prev"){
      thisIdNext = thisActive.data("id") - 1;   
    }
    else if(thisIdActive == 1 && datatype == "prev"){
      thisIdNext = numberSelectAll.length - 1;   
    }
    else {
      thisIdNext = 0 ;
    }    
    //console.log(thisIdNext);   
    let thisNext = $(`[data-href="tab${( thisIdNext + 1)}"]`);    
    let dataColor = thisNext.data('color');
    let template = document.getElementById("tab"+ ( thisIdNext + 1) );
    
    //callback function closeTab
    closeTab(innerWidthCase,300); 
    setTimeout(function() { 
        openTab(thisNext,innerWidthCase,dataColor,template,400);
    }, 1000);
   
  }); 
  
  //function OpenTab
  function openTab(thisClick,innerWidthCase,dataColor,template,time){
    thisClick.addClass("active");       

    //change color Case-close (border)   
    $(".tabcontent").addClass("active-color");
    $(".tabcontent.active-color .cascade-close").css("background-color", dataColor);
        
    //animate showcontent   
    thisClick.animate({
        zIndex: 2,
        opacity: 1,
        left: "0",            
    }, time, function() {
        let dataIdTabContent = $(".tabcontent").data("total");
        let dataMinus = $(".tabcontent").data("minus");
        let widthTabContent = dataIdTabContent * innerWidthCase - dataMinus;
        // console.log(innerWidthCase);
        $( ".tabcontent" ).animate({            
            width: widthTabContent ,
            opacity: 1,         
        }, time, function() {                
            // when Acitve => add tabcontent
            let contentTab = template.content.cloneNode(true);             
            $(".tabcontent .cascade-close").addClass("show-content");  
            setTimeout(function(){
                //append content after border has show
                document.getElementById("cascade-content").appendChild(contentTab);

                //when click => active arrow
                $( ".cascade-nav" ).addClass('block');
            },800)          
        });                      
    });
    $( ".cascade-menu li:not(.active)" ).each(function() {               
        $(this).animate({               
        zIndex: 1,
        opacity: 0,
        left: 0,            
        }, time);
    });  
  }

  //function CloseTab
  function closeTab(innerWidthCase,time){    
    $( ".cascade-menu li" ).removeClass("active");
     
    //change color Case-close (border) 
    $(".tabcontent").removeClass("active-color"); 
    //when click => active arrow
    $( ".cascade-nav" ).removeClass('block');      
    $( ".tabcontent" ).animate({
      width: "0",
      opacity: 0,         
    }, time, function() {  
        //remove show-content=> animation close border
        $(".tabcontent .cascade-close").removeClass("show-content");   
                 
        //hidden tabcontent
        $(".tabcontent").animate({                             
            width: "0",
            opacity: 0,   
        }, time ,function(){                        
            $( ".cascade-menu li:not(.active)" ).each(function() {  
            let $thisNoActive = $(this);
            let opacity ;  
            let dataLeft = $(this).data('left');    
            let dataId = $(this).data('id');                          

            opacity = 1;                        
            dataLeft = dataId * innerWidthCase + dataLeft;   
        
                $($thisNoActive).animate({               
                zIndex: 1,
                opacity: opacity,
                left: dataLeft,            
                }, time);
            });
        });           
    });   

    // when No-Acitve => Remove tabcontent
    $(".cascade-content").empty();   
  }
  //click show map
  $( document ).on( "click", ".tab-parent" ,function() { 
    let clickTabParent = $(this);
    clickTabParent.toggleClass("active");
    clickTabParent.parent().find(".tab-child").slideToggle();  
  });

  $( document ).on( "click", ".js-map" , function() {     
    let dataIframe = $(this).data("iframe");    
    $(".position-map").empty().append(dataIframe);
  });


//   // If absolute URL from the remote server is provided, configure the CORS
// // header on that server.
// var url = 'common/pdf/An-Thanh-Bicsol-profile-FINAL-1_compressed.pdf';

// // Loaded via <script> tag, create shortcut to access PDF.js exports.
// var pdfjsLib = window['pdfjs-dist/build/pdf'];

// // The workerSrc property shall be specified.
// pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

// var pdfDoc = null,
//     pageNum = 1,
//     pageRendering = false,
//     pageNumPending = null,
//     scale = 0.8,
//     canvas = document.getElementById('the-canvas'),
//     ctx = canvas.getContext('2d');

// /**
//  * Get page info from document, resize canvas accordingly, and render page.
//  * @param num Page number.
//  */
// function renderPage(num) {
//   pageRendering = true;
//   // Using promise to fetch the page
//   pdfDoc.getPage(num).then(function(page) {
//     var viewport = page.getViewport({scale: scale});
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     // Render PDF page into canvas context
//     var renderContext = {
//       canvasContext: ctx,
//       viewport: viewport
//     };
//     var renderTask = page.render(renderContext);

//     // Wait for rendering to finish
//     renderTask.promise.then(function() {
//       pageRendering = false;
//       if (pageNumPending !== null) {
//         // New page rendering is pending
//         renderPage(pageNumPending);
//         pageNumPending = null;
//       }
//     });
//   });

//   // Update page counters
//   document.getElementById('page_num').textContent = num;
// }

// /**
//  * If another page rendering in progress, waits until the rendering is
//  * finised. Otherwise, executes rendering immediately.
//  */
// function queueRenderPage(num) {
//   if (pageRendering) {
//     pageNumPending = num;
//   } else {
//     renderPage(num);
//   }
// }

// /**
//  * Displays previous page.
//  */
// function onPrevPage() {
//   if (pageNum <= 1) {
//     return;
//   }
//   pageNum--;
//   queueRenderPage(pageNum);
// }
// document.getElementById('prev').addEventListener('click', onPrevPage);

// /**
//  * Displays next page.
//  */
// function onNextPage() {
//   if (pageNum >= pdfDoc.numPages) {
//     return;
//   }
//   pageNum++;
//   queueRenderPage(pageNum);
// }
// document.getElementById('next').addEventListener('click', onNextPage);

// /**
//  * Asynchronously downloads PDF.
//  */
// pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
//   pdfDoc = pdfDoc_;
//   document.getElementById('page_count').textContent = pdfDoc.numPages;

//   // Initial/first page rendering
//   renderPage(pageNum);
// });

  //view show pdf js  
  // $(".pdf-show").click(function(){
  //   alert("Inner width of div: " + $("div").innerWidth());
  // });
  // let x = screen.width;
  // console.log(x);    
  // if( x <= 968 ){
  //   // console.log("hihii");
  //   $(".iframe-pdf").css("display", "none");
  //   $(".picture").css("display", "block");
  // } else {
  //   $(".iframe-pdf").css("display", "block");
  //   $(".picture").css("display", "none");
  // }
  
});