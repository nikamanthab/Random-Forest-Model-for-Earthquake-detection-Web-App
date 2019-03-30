var QUESTION = (function () {

    $("#demo01").animatedModal({
        color: 'white',
        overflow: 'scroll'
    });

    var stack=[];
    var counter=0;
    var mylimit;
   var stuff;
   var percentage;
    var master = sel('.modal-content2');
    var progressbar;

    master.addEventListener('click',(e)=>{
        if(e.target.tagName=="BUTTON"){
            log(e.target);
            let val=e.target.previousElementSibling.value;
            val.split(' ').forEach((d)=>{
                stack.push(d);
            });
           counter+=1;
           progressbar=sel('.progress-bar');
           let width=parseInt(progressbar.style.width)+percentage;
           console.log(width+"%");
           progressbar.style.width =width+"%";
     
           processor(stuff);
        }else if(e.target.classList.contains("card")){
            var myroot=e.target.children[1];
            stack.push([myroot.getAttribute("data-translation"),myroot.textContent]);
            counter+=1;
            progressbar=sel('.progress-bar');
            let width=parseInt(progressbar.style.width)+percentage;
            console.log(width+"%");
            progressbar.style.width =width+"%";
            processor(stuff);
        }
    });
    function log(d){
        console.log(d);
    }

    function httpreq(route, json) {
        var http = new Promise((res, rej) => {
          var xhttp = new XMLHttpRequest();
          xhttp.open('POST', route, true);
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              res(this.response);
            } else if (this.readyState === 4 && this.status === 404) {
              rej("error:file not found");
            } else if (this.readyState === 4 && this.status === 401) {
              rej(this.response);
            }
          };
     
          xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
          xhttp.send(json);
        });
     
        return http;
      }

    function processor(stuff){
        console.log(counter,mylimit);
        if(counter<mylimit){
            console.log("hit")
            createTemplate(stuff[counter].id,stuff[counter].data);
        }else{
            alert("All questions ended");
            stack.push(city);
            console.log(stack);
            var obj={
                age:stack[0],
                floor:stack[1],
                height :stack[2],
                plinth:stack[3],
                land_surface:stack[4][0],
                foundation:stack[5][0],
                rooftype:stack[6][0],
                groundfloor:stack[7][0],
                position:stack[8][0],
                plan_config:stack[9][0],
                condition_post_eq:stack[10],
                city:stack[11]
            }
            console.log(JSON.stringify(obj));
        
          httpreq("/send",JSON.stringify(obj)).then((data)=>{
              console.log(data);
              var con;
            if(~data.indexOf(4)){
                con=sel("#final").innerHTML;
                con=con.replace(/{{src}}/,"./images/caution.svg");
                con=con.replace(/{{data}}/,"Level 5 Warning");
            }
            if(~data.indexOf(3)){
                con=sel("#final").innerHTML;
                con=con.replace(/{{src}}/,"./images/tick-purple.png");
                con=con.replace(/{{data}}/,"Level 4 Warning");
            }
            if(~data.indexOf(2)){
                con=sel("#final").innerHTML;
                con=con.replace(/{{src}}/,"./images/warning.svg");
                con=con.replace(/{{data}}/,"Level 3 Warning");
            }
            if(~data.indexOf(1)){
                con=sel("#final").innerHTML;
                con=con.replace(/{{src}}/,"./images/caution.svg");
                con=con.replace(/{{data}}/,"Level 2 Warning");
            }
            if(~data.indexOf(0)){
                con=sel("#final").innerHTML;
                con=con.replace(/{{src}}/,"./images/greentick.svg");
                con=con.replace(/{{data}}/,"Level 1 Warning");
            }
            master.innerHTML=con;

          });
        }
    }


    function resultProcess(){
        
    }

   


    

    function createTemplate(id, data) {
        var sub;
        var card=sel('#card').innerHTML;
        if (id == "tempy1") {
            var template = sel("#" + id).innerHTML;
            inject(replace(template, new RegExp("{{question}}", "g"), data));
            return;
        } else if (id == "tempy2") {
            var template = sel("#" + id).innerHTML;
            var question = data[0];
            var modified = replace(template, new RegExp("{{question}}", "g"), question);
            mreset();
            inject(modified);
            sub = sel('.wrap');
            data = data.slice(1);
            data.forEach(element => {
                var newcard=replace(card,new RegExp("{{src}}","g"),element[0]);
                newcard=replace(newcard,new RegExp("{{content}}","g"),element[1]);
                newcard=replace(newcard,new RegExp("{{tid}}","g"),element[2]);
                sub.innerHTML+=newcard;
            });
         
        } else {
            console.log("Something went wrong !");
        }
    }

    function mreset() {
        master.innerHTML = "";
    }

    function inject(d) {
        master.innerHTML = d;
    }

    function replace(string, regex, data) {
        console.log(string);
        return string.replace(regex, data);
    }


    function sel(d) {
        return document.querySelector(d);
    }

    return {
        init:function(bundle){
            stuff=bundle;
            mylimit=bundle.length;
            processor(stuff);
            percentage=100/bundle.length;
            log(percentage+"dfdkf");

        }
    }

})();


QUESTION.init([{
    id:"tempy1",
    data:"Enter age,floor count,height,plinth seperated by spaces"
},{
    id:"tempy2",
    data:["Land surface condition ?",["images/roof.svg","Flat surface",0],["images/slope.svg","Moderate slope",1],
["images/slope (1).svg","Steep slope",2]
]},{
    id:"tempy2",
    data:["Foundation type ?",["images/mudmortar.jpg","Mud mortar-Stone/Brick",2],
["images/brick-wall.svg","Cement/brick",1],["images/bamboo.svg", 'Bamboo/Timber',3],
["images/rcc.jpg","RC",0],["images/asterik.svg","Other",4]
]},{
  id:"tempy2",
  data:["Roof type ?",["images/timber-light roof.jpg","Bamboo/Timber-Light roof",1],["images/rcc.jpg","RCC/RB/RBC",0],
["images/heavytimber.jpg","Bamboo/Timber-Heavy roof",2]
]  
},{
    id:"tempy2",
    data:["Ground floor type ?",["images/mud.jpg","Mud",2],["images/brick-wall.svg","Brick wall",1],
["images/rcc.jpg","RC",0],["images/timberbruh.jpg","Timber",3],["images/asterik.svg","Other",4]
]
},{
    id:"tempy2",
    data:["Position ?",["images/attached1.jpg","Attached 1",0],["images/attached2.jpg","Attached 2",1],
    ["images/attached3.jpg","Attached 3",2],
    ["images/notattached.jpg","Not attached",3]]
},{
    id:"tempy2",
    data:["Whats the Plan configuration ?",["images/rectangle.jpg","Rectangle",0],["images/lshape.jpg","Lshape",1],["images/square.jpg","Square",2],
["images/tshape.jpg","Tshape",3],["images/ushape.jpg","Ushape",4],["images/multiproject.jpg","Multiproject",5],["images/court.jpg","Building with courtyard",6],
["images/eshape.jpg","Eshape",7],["images/hshape.jpg","Hshape",8],["images/asterik.svg","Others",9]
]
},{
    id:"tempy1",
    data:"Structural faults ?"
}]);