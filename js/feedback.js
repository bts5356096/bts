function goSubmit() {
  	/*var f=document.f;
  	
  	if(f.CompEmail.value == "") {
  		alert("很抱歉，本功能暫時無法使用，若有需要，請以電話與我們聯絡，謝謝！");	
  		return false;
  	}
  	
  	if (f.Name.value == "") {
          alert("請輸入姓名");                   
          f.Name.focus();                   
          return false;                     	
  	}  	
  	
	if (f.Email.value == "")                   
        {                   
          alert("請輸入E-mail帳號");                   
          f.Email.focus();                   
          return false;                   
        }
        
	if (f.rand.value == "")                   
        {                   
          alert("請輸入正確的安全碼");                   
          f.Email.focus();                   
          return false;                   
        }                         
                   
        var Ap = (f.Email.value);                   
        if (Ap.indexOf ('@',0) == -1){                   
                alert("請輸入正確的E-mail帳號");                   
                f.Email.focus();                   
                return false;                   
        }                   
       var Dp = (f.Email.value);                   
        if (Dp.indexOf ('.',0) == -1){                   
                alert("請輸入正確的E-mail帳號");                   
                f.Email.focus();                   
                return false;                   
        }                   
		
	//f.submit();
	alert("回函已寄出，謝謝您！");
	*/
	return true;
	
}

function goProductSubmit() {
  	/*var f=document.sendForm;
  	
  	if(f.CompEmail.value == "") {
  		alert("很抱歉，E-mail訂購暫時無法使用，若有需要，請以電話與我們訂購，謝謝！");	
  		return false;
  	}  	
  	
  	if (f.Name.value == "") {
          alert("請輸入姓名");                   
          f.Name.focus();                   
          return false;                     	
  	}  	
  	
	if (f.TelDay.value == "" && f.TelNight.value== "" && f.Email.value == "")
        {                   
          alert("請輸入聯絡電話或E-mail（至少一項）");                   
          f.Email.focus();                   
          return false;                   
        }
        
        if(f.Email.value != ""){
	        var Ap = (f.Email.value);                   
	        if (Ap.indexOf ('@',0) == -1){                   
	                alert("請輸入正確的E-mail帳號");                   
	                f.Email.focus();                   
	                return false;                   
	        }                   
	       var Dp = (f.Email.value);                   
	        if (Dp.indexOf ('.',0) == -1){                   
	                alert("請輸入正確的E-mail帳號");                   
	                f.Email.focus();                   
	                return false;                   
	        }
	}

	if (f.Addr.value == "")                   
        {                   
          alert("請輸入正確地址");                   
          f.Email.focus();                   
          return false;                   
        }               
        
	if (f.rand.value == "")                   
        {                   
          alert("請輸入正確的安全碼");                   
          f.Email.focus();                   
          return false;                   
        }                        
		
	//f.submit();
	alert("訂購信已寄出，謝謝您！");
*/ 	
	//CHTRemoveCookies();	
	return true;
	
}

function clearChtCookies() {
	var ary,bry;
	if (location.search.length > 0) {
	    ary = unescape(location.search.substring(1)).split('&');
		for(i=0; i<ary.length;i++){
			bry = ary[i].split('=');
			if((bry[0] == "clear") && (bry[1] == "1")) {
				CHTRemoveCookies();
			}
		}
	    location.href = "catalog.html"
	}
}
