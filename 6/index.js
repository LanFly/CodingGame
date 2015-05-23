var max=true;
function close_notice(){
	if(max){
		var obj=document.getElementById("notice");
		var cobj=document.getElementById("close-notice");
		obj.style.zIndex=-999;
		obj.style.opacity=0;
		obj.style.width="600px";
		obj.style.height="400px";
		// obj.style.boxShadow="10px 10px 100px #fff";
		cobj.style.width="100px";
		cobj.style.height="100px";
		cobj.style.transform="rotate(360deg)";
		max=false;
	}else{
		var obj=document.getElementById("notice");
		var cobj=document.getElementById("close-notice");
		obj.style.zIndex=999;
		obj.style.opacity=1;
		obj.style.width="500px";
		obj.style.height="300px";
		// obj.style.boxShadow="10px 10px 50px #888";
		cobj.style.width="30px";
		cobj.style.height="30px";
		cobj.style.transform="rotate(0deg)";
		max=true;
	}
}