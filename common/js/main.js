$(document).ready(function() {
  //function ClickItem => show-hidden content
  $( ".cascade-menu .js-tabitem" ).on( "click", function() {       
    let innerWidthCase = $( ".cascade-menu" ).innerWidth() / 4;  
    //global data color
    let dataColor = $(this).data('color');  

    //global idActive tabshowcontent
    let idActive = $(this).data("href");
    let template = document.getElementById(idActive);


    
    if($(this).hasClass("active")){
      
      $(this).removeClass("active");      
      //change color Case-close (border) 0
      $(".tabcontent").removeClass("active-color");
      $(".tabcontent .cascade-close").css("background-color", "dataColor");
      $( ".tabcontent" ).animate({
        width: "0",
        opacity: 0,         
      }, 500, function() {      
        $(".tabcontent").animate({                             
          width: "0",
          opacity: 0,   
        }, 200 ,function(){                
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
              }, 300);
            });
        });           
      });   
      
      // when No-Acitve => Remove tabcontent
      document.querySelector(".cascade-content .template ").remove();
    }
    
    else {        
      $(this).addClass("active");       

      //change color Case-close (border)   
      $(".tabcontent").addClass("active-color");
      $(".tabcontent.active-color .cascade-close").css("background-color", dataColor);
        
        //animate showcontent   
      $( this ).animate({
        zIndex: 2,
        opacity: 1,
        left: "0",            
      }, 300, function() {
        let dataIdTabContent = $(".tabcontent").data("tabcontent-id");
        let dataResidual = $(".tabcontent").data("residual");
        let widthTabContent = dataIdTabContent * innerWidthCase - dataResidual;
        $( ".tabcontent" ).animate({
            // width: "640px",
            width: widthTabContent ,
            opacity: 1,         
          }, 400, function() {    
            
            // when Acitve => add tabcontent
            let contentTab = template.content.cloneNode(true);  
            document.getElementById("cascade-content").appendChild(contentTab);
            $(".tabcontent .cascade-close").addClass("show-content");
              
          });                      
        });
        $( ".cascade-menu li:not(.active)" ).each(function() {          
          let opacity ;  
          let dataLeft = $(this).data('left');                             

          opacity = 0;
          dataLeft = 0;                                 

          $(this).animate({               
            zIndex: 1,
            opacity: opacity,
            left: dataLeft,            
        }, 300);
      });  
      

      // when Acitve => add tabcontent
      // let idActive = $(this).data("href");
      // // console.log(idActive);
      // let template = document.getElementById(idActive);
      // // console.log(temp1);
      // let contentTab = template.content.cloneNode(true);  
      // document.getElementById("cascade-content").appendChild(contentTab);
    }          
  });

  //function btn Close => show-hidden content
  $( ".btn-close" ).on( "click", function() {
    $( ".cascade-menu li" ).removeClass("active");
    let innerWidthCase = $( ".cascade-menu" ).innerWidth() / 4;
    
    $(this).parent().removeClass("show-content");  

    $( ".cascade-menu li:not(.active)" ).each(function() {
      let opacity ;  
      let dataLeft = $(this).data('left');    
      let dataId = $(this).data('id');                

      opacity = 1;                       
      dataLeft = dataId * innerWidthCase + dataLeft;       
      $(this).animate({
          zIndex: 1,
          opacity: opacity,
          left: dataLeft,            
      }, 400);
    });           
      document.querySelector(".cascade-content .template ").remove();
  }); 


});