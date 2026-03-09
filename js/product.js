var productWin = null;
var imageWin = null;//new added for showing image

function openProductWin(cssfile, pname ,pimg, pno, spec, desc, lprice, sprice, lpricename, spricename) {
  	
  	//productWin = window.open('','aWin','top=0,left=0,width=850,height=600');
	productWin = windowOpen('','ProductWin', 700, 500, 'yes');
	
	//head start
 	var ePen = '<html><head><META http-equiv="Content-Type" content="text/html;" "charset=UTF-8"><title>'+pname+'</title>';
 	ePen +='<link type="text/css" rel="stylesheet" href="'+cssfile+'"></head>';
 	
 	//body start...
 	ePen += '<body background="image/bg.gif">';
 		ePen += '<table width="640" border="0" cellspacing="5" cellpadding="0" align="center">';
 			ePen += '<tr>';
 				ePen += '<td width="98%" height="241" valign="top">';
 					ePen += '<table width="100%" border="0" cellpadding="0" cellspacing="5" class="table1">';
 						ePen += '<tr>';
 							
 						if(pimg.length != 0 && pimg != 'none.jpg'){
 							ePen += '<td width="30%" valign="top" align="center">';
 								ePen += '<p><img src="'+pimg+'" hspace="0" border="1" width="240"></p>';
 							ePen += '</td>';
 						}
 							ePen += '<td width="70%" valign="top">'; 
 								ePen += '<table border="0" width="100%">';
								
								if(pno != "空白型號"){
									ePen += '<tr>';
										ePen += '<td width="100" align="right" height="30" class="title1">型號：</td>';
										ePen += '<td width="340" class="text1">'+pno+'</td>';
									ePen += '</tr>';
								}
								if(pname != ""){
									ePen += '<tr>';
										ePen += '<td width="100" align="right" height="30" class="title1">品名：</td>';
										ePen += '<td width="340" class="text1">'+pname+'</td>';
									ePen += '</tr>';
								}
								if(spec != ""){
									ePen += '<tr>';
										ePen += '<td width="100" align="right" height="30" class="title1">規格：</td>';
										ePen += '<td width="340" class="text1">'+spec+'</td>';
									ePen += '</tr>';
								}
								if(desc != ""){
									ePen += '<tr>';
										ePen += '<td width="100" align="right" height="80" class="title1">說明：</td>';
										ePen += '<td width="340" class="text1">'+desc+'</td>';
									ePen += '</tr>';
								}
								if(lprice != "0.0元" && lprice != "0.0美金" && lprice != "0元" && lprice != "0美金"){									
									ePen += '<tr>';
										ePen += '<td width="100" align="right" height="30" class="title1">'+lpricename+'：</td>';
										ePen += '<td width="340" class="text1"><strike>'+lprice+'</strike></td>';
									ePen += '</tr>';
								}
								if(sprice != "0.0元" && sprice != "0.0美金" && sprice != "0元" && sprice != "0美金"){								
									ePen += '<tr>';
										ePen += '<td width="100" align="right" height="30" class="title1">'+spricename+'：</td>';
										ePen += '<td width="340" class="text1">'+sprice+'</td>';
									ePen += '</tr>';
								}				
 									ePen +='<tr>';
                      			ePen += '<td width="100%" colspan="2">';
                      			ePen += '</td>';
                    			ePen += '</tr>';
                    		ePen += '</table>';
                    	ePen += '</td>';
                  ePen += '</tr>';		
 					ePen += '</table>';
 				ePen += '</td>';
 			ePen += '</tr>';
 		ePen += '</table>';								
 	ePen += '</body>
<script src="js/imagePath.js"></script></html>';
 	
  	var wd = productWin.document;
  
 	wd.open();
  wd.write(ePen);
  wd.close();
}

function blowOut() {
  	if (productWin != null && productWin.open) productWin.close();
  	if (imageWin != null && imageWin.open) imageWin.close();
}

function openImageWin(cssfile, pimg) {

	var theImg = new Image();
	theImg.src = pimg;
	imageWin = windowOpen('','ImageWin', theImg.width + 50, theImg.height + 70, 'yes');
	
	//head start
 	var ePen = '<html><head><META http-equiv="Content-Type" content="text/html;" "charset=UTF-8"><title>原圖顯示</title>';
 	ePen +='<link type="text/css" rel="stylesheet" href="'+cssfile+'"></head>';
 	
 	//body start...
 	ePen += '<body background="image/bg.gif">';
 		ePen += '<table width="100%" height="100%" border="0" cellspacing="5" cellpadding="0">';
 			ePen += '<tr>';
 				ePen += '<td align="center">';
					ePen += '<img src="'+pimg+'" hspace="0" border="1">';
 				ePen += '</td>';
 			ePen += '</tr>';
 			ePen += '<tr>';
 				ePen += '<td align="center">';
					ePen += '<input type="button" class="BTN" onclick="window.close();" value="關閉視窗"/>';
 				ePen += '</td>';
 			ePen += '</tr>'; 			
 		ePen += '</table>';								
 	ePen += '</body>
<script src="js/imagePath.js"></script></html>';
 	
	var wd = imageWin.document;
  
 	wd.open();
  wd.write(ePen);
  wd.close();
}

window.onfocus = blowOut;

//function windowOpen(URL, Name, Width, Height, ChannelMode, Directories, ToolBar, Location, Status, MenuBar, Resizable) {
function windowOpen(URL, Name, Width, Height, Resizable) {
	var iWidth	= jsLeast(screen.availWidth, Width);
	var iHeight = jsLeast(screen.availHeight, Height);
	var iLeft	= ((window.screen.width - iWidth) / 2);
	var iTop	= ((window.screen.height - iHeight) / 2);
	if (iLeft < 0){ iLeft = 0;}
	if (iTop < 0){ iTop = 0;}
	
	var sFeatures = "left=" + iLeft;
	sFeatures += " top=" + iTop;
	sFeatures += " width=" + iWidth;
	sFeatures += " height=" + iHeight;
	//sFeatures += " channelmode=" + ChannelMode;
	//sFeatures += " directories=" + Directories;
	//sFeatures += " toolbar=" + ToolBar;
	//sFeatures += " location=" + Location;
	//sFeatures += " status=" + Status;
	//sFeatures += " menubar=" + MenuBar;
	sFeatures += " resizable=" + Resizable;
	sFeatures += " scrollbars=1";
	
	var retHandle = window.open(URL, Name, sFeatures);
	
	return retHandle;
}

function jsLeast(Val1, Val2) {
    var xVal = Val1;
	if (Val1 > Val2){
	    xVal = Val2;
	}
	return xVal;
}
