window.onload=function(){

	max=false;
	obj=document.getElementById('waiting');
	imgobj=document.getElementById('loading-image');
	
	$(".tab").click(function(){
		var tab=$(this).attr("href") || "all";
		console.log("get list start\n");
		GetList(tab);
		return false;
	});
	GetList("all");
}
function blindID(){
	$(".title").click(function(){
		var id=$(this).attr("href");
		if(id=="" || id==undefined || id==null){
			alert("ID参数错误");
		}else{
			closeBox();
			console.log("get content start\n");
			$.ajax({
				cache: true,
				type: "GET",
				url: "http://cnodejs.org/api/v1/topic/"+id,
				async: true,
				dataType: "JSON",
				error: function(request){
					closeBox();
					console.log("get content wrong\n");
				},
				success: function(data){
					Display_Content(data.data);
					Display_Replies(data.data.replies);
				}
			});
		}
		return false;
	});
	console.log("blindID end\n");
}
function Display_Content(d){
	var content=d.content;
	var title="<h4>"+d.title+"</h4>";
	content.replace("/\n/g","<br/>",content);
	document.getElementById("show-content").innerHTML=title+content;
	console.log("display content\n");
	closeBox();
}
function Display_Replies(r){
	console.log("show replies start\n");
	var html="";
	for(var i=0; i<r.length; ++i){
		html+="<li>";
			html+="<img src=\"http://cnodejs.org"+r[i].author.avatar_url+"\" class=\"replies-logo\">";
			html+="<p class=\"replies-name\">";
				html+="<span class=\"tag\">"+(i+1)+"楼</span>";
				html+="<span class=\"username tag\">"+r[i].author.loginname+"</span>";
				html+="<span class=\"tag\">发表于</span>";
				html+="<span class=\"replies-time tag\">"+r[i].create_at.substr(0,10)+" "+r[i].create_at.substr(11,8)+"</span>";
			html+="</p>";
			html+="<p class=\"replies-content\">";
			html+=r[i].content;
			html+="</p>";
		html+="</li>";
	}
	document.getElementById("show-replies").innerHTML=html;
	console.log("show replies end\n");
}

function GetList(tab){
	if(tab=="" || tab==undefined || tab==null){
		alert("Tab无效");
	}else{
		closeBox();
		$.ajax({
		    cache: false,
		    type: "GET",
		    url:"http://cnodejs.org/api/v1/topics?tab="+tab,
		    async: true,
		    dataType:"json",
		    error: function(request) {
		        closeBox();
		        console.log("get list wrong\n");
		    },
		    success: function(data) {
		    	console.log("display list start\n");
		    	Display_List(data.data);
		    	closeBox();
		    	$(".title")[0].click();
		    }
		});
	}
}
function Display_List(t){
	var html="";
	for(var i=0; i<t.length; ++i){
		html+="<li>";
			html+="<img src=\"http://cnodejs.org"+t[i].author.avatar_url+"\" class=\"logo\">";
			html+="<p class=\"main\">";
				if(t[i].good){
					html+="<span class=\"tab-type top\">";
					html+="精华</span>";
				}else if(t[i].top){
					html+="<span class=\"tab-type top\">";
					html+="置顶</span>";
				}else{
					if(t[i].tab=="share"){
						html+="<span class=\"tab-type share\">";
						html+="分享</span>";
					}else if(t[i].tab=="ask"){
						html+="<span class=\"tab-type ask\">";
						html+="问答</span>";
					}else{
						html+="<span class=\"tab-type job\">";
						html+="工作</span>";
					}
				}
				html+="<a href=\""+t[i].id+"\" class=\"title\">"+t[i].title+"</a>";
			html+="</p>";
			html+="<p class=\"plug\">";
				html+="<span class=\"create-time tag\">"+t[i].create_at.substr(0,10)+" "+t[i].create_at.substr(11,8)+"</span>";
				html+="<span class=\"click-num tag\">"+t[i].reply_count+"/"+t[i].visit_count+"</span>";
			html+="</p>";
		html+="</li>";
	}
	document.getElementById('show-list').innerHTML=html;
	console.log("display list end\n");
	console.log("blindID start\n");
	blindID();
}
//--------------------------遮罩层关闭和打开
function closeBox(){
	if(max){
		obj.style.backgroundColor="white";
		obj.style.opacity=0;
		imgobj.style.width="400px";
		imgobj.style.height="400px";
		imgobj.style.zIndex=-9;
		obj.style.zIndex=-10;
		max=false;
		console.log("loading close\n");
		
	}else{
		obj.style.zIndex=10;		
		
		obj.style.backgroundColor="#383737";
		obj.style.opacity=0.5;
		imgobj.style.width="200px";
		imgobj.style.height="200px";
		imgobj.style.zIndex=11;
		max=true;
		console.log("loading open\n");
	}
}