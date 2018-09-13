var moving = false;

var positionX = 0;//옆으로 0~2고유한 위치 넘버링 
var positionY = 0;//아래로 0~2고유한 위치 넘버링 
var position=0;//0~9넘버링 
var w = window.innerWidth * (-1) *positionX;
var t = window.innerHeight *-1*positionY;

var x=0;//옆으로 이동해야할 거리값 
var y=0;//위아래 이동해야할 거리값

var a=0;//앞으로 옆 가고 싶을 위치값
var b=0;//앞으로 위아래 가고 싶을 위치값

//창크기를 결정해서 화면의 사이즈를 변경
function doLayout(){
    
	$(".slide").css({left:w+"px"});
    $(".slide").css({top:t+"px"});
    
	$(".section .slide").removeClass("loading")
	.each(function(){
		$(this).css({left:window.innerWidth*($(this).index()), width:window.innerWidth, height:innerHeight});
	});
}
//버튼,슬라이더 디자인 변경 
function controlBtn(){
	// pageNav;
    
	$(".main .item").removeClass("on");
	$(".main .item").eq(position).addClass("on");
    
    //slider
	if(positionX == 0){
		$(".next").removeClass("hide");
		$(".prev").addClass("hide");
	}else if(positionX == 2){
		$(".next").addClass("hide");
		$(".prev").removeClass("hide");
	}else{
		$(".prev, .next").removeClass("hide");
	}
    
	if(positionY == 0){
		$(".down").removeClass("hide");
		$(".up").addClass("hide");
	}else if(positionY == 2){
		$(".down").addClass("hide");
		$(".up").removeClass("hide");
	}else{
		$(".down, .up").removeClass("hide");
	}
}
    

$(function(){
    
	doLayout();//레이아웃을 초기화하는 함수를 호출합니다.
	controlBtn();//버튼을 초기화하는 함수를 호출합니다.
    
    //1) mainNav 버튼
	$(".main .item a").click(function(e){
        
        e.preventDefault;
        var mainpositionX=$(this).parent("ul.main li").index();
        position=mainpositionX;
        
		if(!moving){
			moving=true;
            
			var w=window.innerWidth;
			var h=window.innerHeight;
            
			var offsetL=$(".section").offset().left;
            var offsetT=$(".section").offset().top;
            
            if(mainpositionX == 0){
                a=0;
                b=0;
			}else if(mainpositionX == 1){
                a=1;
                b=0;
			}else if(mainpositionX == 2){
                a=2;
                b=0;
			}else if(mainpositionX == 3){
                a=0;
                b=1;
			}else if(mainpositionX == 4){
                a=1;
                b=1;
			}else if(mainpositionX == 5){
                a=2;
                b=1;
			}else if(mainpositionX == 6){
                a=0;
                b=2;
			}else if(mainpositionX == 7){
                a=1;
                b=2;
			}else if(mainpositionX==8){
				a=2;
                b=2;
			}
            
            x= a-positionX;
            y= b-positionY;

            positionX=a;
            positionY=b;
            
            offsetL-=w*x;
            offsetT-=h*y;
            
			$(".section").animate({left:offsetL+"px",
                                   top:offsetT+"px"
                                  }, 400, function(){
				moving=false;
				controlBtn();
			});
		}
	});
    
    //2)슬라이더 클릭 이벤트
	$(".next").click(function(){
		var w=window.innerWidth;
		var offsetL=$(".section").offset().left;
		if(!moving){
			moving=true;
			if(positionX < 2){
				positionX+=1;
				offsetL-=w;
                    position++;
				$(".section").animate({left:offsetL}, 200, function(){
					moving=false;
					controlBtn();
				});
			}
		}
	});

	$(".prev").click(function(){
		var w=window.innerWidth;
		var offsetL=$(".section").offset().left;

		if(!moving){
			moving=true;
            console.log(position);
			if(positionX > 0){
				positionX-=1;
                offsetL+=w;
                position--;
                
				$(".section").animate({left:offsetL}, 200, function(){
					moving=false;
					controlBtn();
				});
			}
		}
	});
    
	$(".up").click(function(){
		var w=window.innerWidth;
		var offsetL=$(".section").offset().left;

		if(!moving){
			moving=true;
			var w=window.innerWidth;
			var h=window.innerHeight;
			var offsetL=$(".section").offset().left;
            var offsetT=$(".section").offset().top;
            
            if(positionY == 0){
					positionX = 0;
                    positionY = 0;
                    position = 0;
					offsetT+=h;
                    offsetL=0;
            }else if(positionY == 1){
					positionX = 0;
                    positionY = 0;
                    position = 0;
					offsetT+=h;
                    offsetL=0;
            }else if(positionY == 2){
                    
					positionX = 0;
                    positionY = 1;
                    position = 3;
					offsetT+=h;
                    offsetL=0;
            }
            
			$(".section").animate({left:offsetL+"px",
                                  top:offsetT+"px"}, 200, function(){
				    moving=false;
					controlBtn();			});
		}
	});
    
	$(".down").click(function(){
		if(!moving){
			moving=true;
			var w=window.innerWidth;
			var h=window.innerHeight;
			var offsetL=$(".section").offset().left;
            var offsetT=$(".section").offset().top;

            if(positionY == 0){
                positionX = 0;
                positionY = 1;
                position = 3;
                offsetT-=h;
                offsetL=0;
                console.log(position);
            }else if(positionY == 1){

                positionX = 0;
                positionY = 2;
                position = 6;
                offsetT-=h;
                offsetL=0;
                console.log(position);
            }else if(positionY == 2){

                positionX = 0;
                positionY = 2;
                position = 6;
                offsetT-=h;
                offsetL=0;
                console.log(position);
            }   
			$(".section").animate({left:offsetL+"px",
                                  top:offsetT+"px"}, 200, function(){
				    moving=false;
					controlBtn();			});
		}
	});
    
    

	// 3) keybord event
	$(this).keyup(function(e){
        
		if(!moving){
			moving=true;
			var w=window.innerWidth;
			var h=window.innerHeight;
            
			var offsetL=$(".section").offset().left;
            var offsetT=$(".section").offset().top;
            
            if(e.keyCode == 38){  //상단 키보드를 눌렀을 경우입니다.
				if(positionY == 1){
					positionX = 0;
                    positionY = 0;
                    position = 0;
					offsetT+=h;
                    offsetL=0;
				}else if(positionY == 2){
                    
					positionX = 0;
                    positionY = 1;
                    position = 3;
					offsetT+=h;
                    offsetL=0;
                }
			}else if(e.keyCode == 40){   //하단 키보드를 눌렀을 경우입니다.
				if(positionY == 0){
					positionX = 0;
                    positionY = 1;
                    position = 3;
					offsetT-=h;
                    offsetL=0;
				}else if(positionY == 1){
                    
					positionX = 0;
                    positionY = 2;
                    position = 6;
					offsetT-=h;
                    offsetL=0;
                }
			}
            
			if(e.keyCode == 39){ //오른쪽
				if(positionX < 2){
					positionX+=1;
                    position++;
					offsetL-=w;
				}
			}else if(e.keyCode == 37){//왼쪽
				if(positionX > 0){
					positionX-=1;
                    position--;
					offsetL+=w;
				}
			}
            
			$(".section").animate({left:offsetL+"px",
                                  top:offsetT+"px"}, 200, function(){
				moving=false;
					controlBtn();			});
		}
	});
    
    // 4) mouse wheel event
        $(".section").mousewheel(function(e){
            if(!moving){
                moving=true;
                var w=window.innerWidth;
                var h=window.innerHeight;

                var offsetL=$(".section").offset().left;
                var offsetT=$(".section").offset().top;

                if(e.deltaY == 1){    //위로 휠 이벤트가 발생될 경우입니다. 상방향 키보드 키를 누를 때와 처리되는 내용이 같습니다.
                        if(positionY == 1){
                        positionX = 0;
                        positionY = 0;
                        position = 0;
                        offsetT+=h;
                        offsetL=0;
                    }else if(positionY == 2){

                        positionX = 0;
                        positionY = 1;
                        position = 3;
                        offsetT+=h;
                        offsetL=0;
                    }
                }else if(e.deltaY == -1){  //아래로 휠 이벤트가 발생될 경우입니다. 하방향 키보드 키를 누를 때와 처리되는 내용이 같습니다.
                    
                    if(positionY == 0){
                        positionX = 0;
                        positionY = 1;
                        position = 3;
                        offsetT-=h;
                        offsetL=0;
                    }else if(positionY == 1){

                        positionX = 0;
                        positionY = 2;
                        position = 6;
                        offsetT-=h;
                        offsetL=0;
                    }
                }

			$(".section").animate({left:offsetL+"px",
                                  top:offsetT+"px"}, 200, function(){
				moving=false;
					controlBtn();			});
            }
        });

    // 6) resize event
        $(window).resize(function(){
            doLayout();
        });
    
    
    //7.menu nav
    
	$(".mainlink").click(function(e){
        
        e.preventDefault;
		if(!moving){
			moving=true;
            a=0;
            b=0;
            position=0;
			var w=window.innerWidth;
			var h=window.innerHeight;
            
			var offsetL=$(".section").offset().left;
            var offsetT=$(".section").offset().top;
        
            var moving = function(){
                
                x= a-positionX;
                y= b-positionY;

                positionX=a;
                positionY=b;

                offsetL-=w*x;
                offsetT-=h*y;

                $(".section").animate({left:offsetL+"px",
                                       top:offsetT+"px"
                                      }, 400, function(){
                    moving=false;
                    controlBtn();
                });
            };
        moving();
		}
	});
	$(".worklink").click(function(e){
        
        e.preventDefault;
		if(!moving){
			moving=true;
            a=0;
            b=1;
            position=3;
			var w=window.innerWidth;
			var h=window.innerHeight;
            
			var offsetL=$(".section").offset().left;
            var offsetT=$(".section").offset().top;
        
            var moving = function(){
                x= a-positionX;
                y= b-positionY;

                positionX=a;
                positionY=b;

                offsetL-=w*x;
                offsetT-=h*y;

                $(".section").animate({left:offsetL+"px",
                                       top:offsetT+"px"
                                      }, 400, function(){
                    moving=false;
                    controlBtn();
                });
            };
        moving();
		}
	});
	$(".aboutmelink").click(function(e){
        
        e.preventDefault;
		if(!moving){
			moving=true;
            a=0;
            b=2;
            position=6;
            
			var w=window.innerWidth;
			var h=window.innerHeight;
            
			var offsetL=$(".section").offset().left;
            var offsetT=$(".section").offset().top;
        
            var moving = function(){
                x= a-positionX;
                y= b-positionY;

                positionX=a;
                positionY=b;

                offsetL-=w*x;
                offsetT-=h*y;

                $(".section").animate({left:offsetL+"px",
                                       top:offsetT+"px"
                                      }, 400, function(){
                    moving=false;
                    controlBtn();
                });
            };
        moving();
		}
	});
    
    //전구 
        var lampLight=true;
    $("#switch input").click(function(){
        if(lampLight==false){
            $(".lamp .bulb, .cable, .main3").addClass('on');
            $(".lamp .bulb, .cable, .main3").removeClass('off');
            lampLight=true;
        }else{
            $(".lamp .bulb, .cable, .main3").addClass('off');
            $(".lamp .bulb, .cable, .main3").removeClass('on');
            lampLight=false;
        }
    });
    
//    logo moving
    $(".main1, .work1, .aboutme1").mousemove(function(e) {  
      var ax = -($(window).innerWidth()/2- e.pageX)/50;
      var ay = ($(window).innerHeight()/2- e.pageY)/100;
          $('.logoWrap .text').attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg)");

          $(".logo").attr("style", "transform: rotateY("+ax*25+"deg);-webkit-transform: rotateY("+ax*25+"deg);-moz-transform: rotateY("+ax*25+"deg)");
    });
    
//main2 canvas
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    
    function resize() {
        var box = c.getBoundingClientRect();
        c.width = box.width;
        c.height = box.height;
        c.style.opacity = 1;
    }

    var light = {
        x: 160,
        y: 200
    }

    var colors = ["#ffb620", "#eb3699", "#2ce5aa"];

    function drawLight() {
        ctx.beginPath();
        ctx.arc(light.x, light.y, 1000, 0, 2 * Math.PI);
        var gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 1000);
        gradient.addColorStop(0, "#646464");
        gradient.addColorStop(1, "#2c2c2c");
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(light.x, light.y, 20, 0, 2 * Math.PI);
        gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 5);
        gradient.addColorStop(0, "#fff");
        gradient.addColorStop(1, "#646464");
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    function Box() {
        this.half_size = Math.floor((Math.random() * 50) + 1);
        this.x = Math.floor((Math.random() * c.width) + 1);
        this.y = Math.floor((Math.random() * c.height) + 1);
        this.r = Math.random() * Math.PI;
        this.shadow_length = 2000;
        this.color = colors[Math.floor((Math.random() * colors.length))];

        this.getDots = function() {

            var full = (Math.PI * 2) / 4;


            var p1 = {
                x: this.x + this.half_size * Math.sin(this.r),
                y: this.y + this.half_size * Math.cos(this.r)
            };
            var p2 = {
                x: this.x + this.half_size * Math.sin(this.r + full),
                y: this.y + this.half_size * Math.cos(this.r + full)
            };
            var p3 = {
                x: this.x + this.half_size * Math.sin(this.r + full * 2),
                y: this.y + this.half_size * Math.cos(this.r + full * 2)
            };
            var p4 = {
                x: this.x + this.half_size * Math.sin(this.r + full * 3),
                y: this.y + this.half_size * Math.cos(this.r + full * 3)
            };

            return {
                p1: p1,
                p2: p2,
                p3: p3,
                p4: p4
            };
        }
        this.rotate = function() {
            var speed = (60 - this.half_size) / 20;
            this.r += speed * 0.002;
            this.x += speed;
            this.y += speed;
        }
        this.draw = function() {
            var dots = this.getDots();
            ctx.beginPath();
            ctx.moveTo(dots.p1.x, dots.p1.y);
            ctx.lineTo(dots.p2.x, dots.p2.y);
            ctx.lineTo(dots.p3.x, dots.p3.y);
            ctx.lineTo(dots.p4.x, dots.p4.y);
            ctx.fillStyle = this.color;
            ctx.fill();


            if (this.y - this.half_size > c.height) {
                this.y -= c.height + 100;
            }
            if (this.x - this.half_size > c.width) {
                this.x -= c.width + 100;
            }
        }
        this.drawShadow = function() {
            var dots = this.getDots();
            var angles = [];
            var points = [];

            for (dot in dots) {
                var angle = Math.atan2(light.y - dots[dot].y, light.x - dots[dot].x);
                var endX = dots[dot].x + this.shadow_length * Math.sin(-angle - Math.PI / 2);
                var endY = dots[dot].y + this.shadow_length * Math.cos(-angle - Math.PI / 2);
                angles.push(angle);
                points.push({
                    endX: endX,
                    endY: endY,
                    startX: dots[dot].x,
                    startY: dots[dot].y
                });
            };

            for (var i = points.length - 1; i >= 0; i--) {
                var n = i == 3 ? 0 : i + 1;
                ctx.beginPath();
                ctx.moveTo(points[i].startX, points[i].startY);
                ctx.lineTo(points[n].startX, points[n].startY);
                ctx.lineTo(points[n].endX, points[n].endY);
                ctx.lineTo(points[i].endX, points[i].endY);
                ctx.fillStyle = "#2c2c2c";
                ctx.fill();
            };
        }
    }

    var boxes = [];

    function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        drawLight();

        for (var i = 0; i < boxes.length; i++) {
            boxes[i].rotate();
            boxes[i].drawShadow();
        };
        for (var i = 0; i < boxes.length; i++) {
            collisionDetection(i)
            boxes[i].draw();
        };
        requestAnimationFrame(draw);
    }

    resize();
    draw();

    while (boxes.length < 14) {
        boxes.push(new Box());
    }

    window.onresize = resize;
    c.onmousemove = function(e) {
        light.x = e.offsetX == undefined ? e.layerX : e.offsetX;
        light.y = e.offsetY == undefined ? e.layerY : e.offsetY;
    }


    function collisionDetection(b){
        for (var i = boxes.length - 1; i >= 0; i--) {
            if(i != b){	
                var dx = (boxes[b].x + boxes[b].half_size) - (boxes[i].x + boxes[i].half_size);
                var dy = (boxes[b].y + boxes[b].half_size) - (boxes[i].y + boxes[i].half_size);
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < boxes[b].half_size + boxes[i].half_size) {
                    boxes[b].half_size = boxes[b].half_size > 1 ? boxes[b].half_size-=1 : 1;
                    boxes[i].half_size = boxes[i].half_size > 1 ? boxes[i].half_size-=1 : 1;
                }
            }
        }
    }
    
//work2 
    var full2=false;

    $('.work2 .imgWrap').hover(function () {
     // $(this).css('width', '36%');
       $(this).addClass('current');
      //$(this).siblings().css('width', '16%');  
       $(this).siblings().addClass('notCurrent');
    }, function () {
      //$('.imgWrap').css('width', '20%');  
      $('.work2 .imgWrap').siblings().removeClass('notCurrent');
      $('.work2 .imgWrap').removeClass('current');
     });

    $('.work2 .imgWrap').click(function () {  
      if(!full2){
        full2 = true;
        // $(this).css('width', '100%');
        $(this).addClass('current-full');
      //$(this).siblings().css('width', '0%');  
       $(this).siblings().addClass('notCurrent-full');
        $('.work2 .close').removeClass('hide');
        $('.work2 .overlay-ribbon').removeClass('hide');
      }
    });

    $('.work2 .close').click(function () {
      full2 = false;
      $('.work2 .imgWrap').siblings().removeClass('notCurrent-full');
      $('.work2 .imgWrap').removeClass('current-full');
        $('.work2 .close').addClass('hide');
        $('.work2 .overlay-ribbon').addClass('hide');
    });

    
//work3 
    var full=false;

    $('.work3 .imgWrap').hover(function () {
     // $(this).css('width', '36%');
       $(this).addClass('current');
      //$(this).siblings().css('width', '16%');  
       $(this).siblings().addClass('notCurrent');
    }, function () {
      //$('.imgWrap').css('width', '20%');  
      $('.work3 .imgWrap').siblings().removeClass('notCurrent');
      $('.work3 .imgWrap').removeClass('current');
     });
    
//about me2 
    
});


