/*DOCUMENTATION FOR LINKING JQUERY LECTURE*/

$( function() {
 
    $("#h1_syntax").css("background","black");
    $("#div1_syntax").fadeOut(1000);
    $("button").click( function() { $("#div2_syntax").fadeOut(1000)});

});

/*DOCUMENTATON FOR SELECTORS LECTURES(selectors.html) */
$(function() {
   //$("h1,h2,h3").css("background","#AEFFFF");
    //$("li:first").css("background","#AEFFFF");
    //$("li").css("background","#AEFFFF");
    //$("li:last").css("background","#AEFFFF");
    //$("p:even").css("background","#AEFFFF");
    //$("p:odd").css("background","#AEFFFF");
    //$("div em").css("background","#AEFFFF");
    //$("div>em").css("background","#AEFFFF");
    //$("div > p").css("background","#AEFFFF");
    //$(":header").css("background","#AEFFFF");
    //$("footer").css("background","#AEFFFF");
    //$('p:contains("text")').css("color","#AEFFFF");
});

/*DOCUMENTATION FOR EVENT LECTURES(events.html)*/

$( function() {
   $("#div_events").click( function() {
       alert("you just clicked!");
   });
    
    $("input").blur( function() {
        if($(this).val() == "")
            {
                $(this).css('border','solid 2px red');
                $("#div_events").text('forget to add text');
                
            }
    });
    
    $("#div_events").hover( function() {
        $(this).text("you hovered in!");
    },function() {
        $(this).text("you hovered out!");
    });
    
    $("input").keydown(function() {
        if($(this).val()!== "")
            {
                $(this).css("border","solid 2px green");
                $("#div_events").text('thankyou!');
            }
    });
});


/*DOCUMENTATION FOR CHAINING LECTURE)(chaining.html) */

$(function() {
    
  //  $("#div_chaining").css('color','white');
      $("#div_chaining").delay(1000).slideDown().delay(1000).fadeOut().delay(1000).fadeIn();
    
});


$( function() {
   
    $("#h1_hide").hide(2000);
    $("#h1_hide").show(3000);
    $("#p_hide").fadeOut(2000);
    $("#p_hide").fadeIn(3000);
    $("#div_hide").fadeTo(3000,0.37);
    $("#div_hide").fadeTo(3000,1);
    $("#button_hide").slideUp(2000);
    $("#button_hide").slideDown(3000);
    $("#button_hide").click(function() {
       $("#div_hide").slideToggle(2500); 
    });
    
});

/*DOCUMENTATION FOR ANIMATIONS LECTURE(animations.html)*/

$( function() {
   $("#button_left").click( function() {
       $("#div_move").animate( {
           left:"-=40px",
           fontSize:"+=2px",
           borderTopLeftRadius:"+=20px"
       })
   }) 
    
    $("#button_right").click( function() {
       $("#div_move").animate( {
           left:"+=40px",
           fontSize:"-=2px",
           borderTopRightRadius:"+=20px"
       })
   }) 
    
    $("#button_top").click( function() {
       $("#div_move").animate( {
           top:"-=40px",
           borderRadius:"+=20px",
           opacity:"-=0.02"
       })
   }) 
    
    
    $("#button_bottom").click( function() {
       $("#div_move").animate( {
           top:"+=40px",
           borderRadius:"-=20px",
           opacity:"+=0.02"
       })
   }) 
});


/*DOCUMENTATION FOR CSS MODIFICATION LECTURE(cssmodification.html)*/

$(function() { 
$("#div_jquery").css({
    "height":"200px",
    "width":"200px",
    "border":"solid 1px red",
    "background":"radial-gradient(#0F2438,#252632,#4F6673)"
}).addClass('class_css');
     });

/*DOCUMENTATION FOR RACING CARS LECTURE(race.html)*/

$(function() {
    
    
    $("#button_race1").click( function() { 
        
          function decider() {
        if( iscomplete == false) {
            iscomplete = true;
        }
        else{
            position = "second";
        }
    }
    var carwidth1 = $("#div_race1").width();
    var carwidth2 = $("#div_race2").width();
    var tracklength1 = $(window).width() - carwidth1;
    var tracklength2 = $(window).width() - carwidth2;       
          var iscomplete = false;
          var position = "first";
    // random number generator
     var raceduration1 = Math.floor(  ( Math.random() * 5000) + 1 );
    var raceduration2 = Math.floor( (Math.random() * 5000) +  1 );
  
   $("#div_race1").animate( { 
   
      left: tracklength1 
   }, raceduration1 , function() { 
       decider();
       $("#div_car1 span").text("Position : " + position + " Time taken : " + raceduration1 + " milliseconds");   });
        $("#div_race2").animate( { 
   
      left: tracklength2 
   },raceduration2, function() { 
            decider();
       $("#div_car2 span").text("Position : " + position + " Time taken : " + raceduration2 +" milliseconds!");
   });
        $("#button_race2").click( function() {
            $(".class_race").css("left","0px");
            $(".class_span").text("result! coming soon");
        });
    
 });
    
});