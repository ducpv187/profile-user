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

    if($(this).hasClass("active")){
      closeTab(innerWidthCase,400);
    } else {        
      openTab(thisClick,innerWidthCase,dataColor,template,400);
    }          
  });

  //function btn Close => show-hidden content
  $( ".btn-close" ).on( "click", function() {
    let innerWidthCase = $( ".cascade-menu" ).innerWidth() / 4;
    
    closeTab(innerWidthCase,400);    
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
        let dataIdTabContent = $(".tabcontent").data("tabcontent-id");
        let dataResidual = $(".tabcontent").data("residual");
        let widthTabContent = dataIdTabContent * innerWidthCase - dataResidual;
        $( ".tabcontent" ).animate({            
            width: widthTabContent ,
            opacity: 1,         
        }, time, function() {                
            // when Acitve => add tabcontent
            let contentTab = template.content.cloneNode(true);  
            document.getElementById("cascade-content").appendChild(contentTab);
            $(".tabcontent .cascade-close").addClass("show-content");                
        });                      
    });
    $( ".cascade-menu li:not(.active)" ).each(function() {
        // console.log($(this));          
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
    $( ".tabcontent" ).animate({
      width: "0",
      opacity: 0,         
    }, time, function() {  
        $(".tabcontent .cascade-close").removeClass("show-content");     
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
    document.querySelector(".cascade-content .template ").remove();
  }
});