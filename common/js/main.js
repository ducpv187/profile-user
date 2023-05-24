$(document).ready(function() {
  //function ClickItem => show-hidden content
  $( ".cascade-menu .js-on" ).on( "click", function() {       
    let innerWidthCase = $( ".cascade-menu" ).innerWidth() / 4;

    if($(this).hasClass("active")){
      $(this).removeClass("active");    
      $( ".tabcontent" ).animate({
        width: "0",
        opacity: 0,         
      }, 500, function() {      
        $(".tabcontent").animate({                             
          width: "0",
          opacity: 0,   
        }, 500 ,function(){                
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
    }
    
    else {        
        $(this).addClass("active");
        $( this ).animate({
          zIndex: 2,
          opacity: 1,
          left: "0",            
        }, 300, function() {
          $( ".tabcontent" ).animate({
            width: "640px",
            opacity: 1,         
          }, 300, function() {              
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
      }, 300);
    });           
  }); 
});