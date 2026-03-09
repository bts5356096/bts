//=====================================================================||
//                    中華電信 JavaScript 購物車程式                   ||
//---------------------------------------------------------------------||

//=====================================================================||
//                              選擇性設定                             ||
// CHT_MinimumOrder：設定結帳的最低總價                                ||
// CHT_MinimumOrderPrompt：設定結帳的最低總價之提示                    ||
// CHT_CartCapacity：設定購物車的最大容量                              ||
//---------------------------------------------------------------------||
MonetarySymbol        = '';			
DisplayNotice         = true;
DisplayShippingColumn = false;
DisplayShippingRow    = false;
DisplayTaxRow         = false;
TaxRate               = 0.00;
TaxByRegion           = false;
TaxPrompt             = 'For tax purposes, please select if you are an Arizona resident before continuing';
TaxablePrompt         = 'Arizona Residents';
NonTaxablePrompt      = 'Other States';
//CHT_MinimumOrder          = 100.00;
CHT_MinimumOrderPrompt    = '訂單總額至少需要 ' + moneyFormat(CHT_MinimumOrder) +  ' 元，在結帳前請再訂購更多商品。';
CHT_CartCapacity		  = 12;

//Payment Processor Options:
PaymentProcessor      = '';

//Options for Programmers:
OutputItemId          = 'itemid_';
OutputItemQuantity    = 'itemnum_';
OutputItemPrice       = 'itemprice_';
OutputItemName        = 'itemname_';
OutputItemShipping    = '商品運費 _ ';
OutputItemAddtlInfo   = 'itemmemo_';
OutputOrderSubtotal   = 'ordersubtotal';
OutputOrderShipping   = '訂單運費 ';
OutputOrderTax        = '訂單稅額 ';
OutputOrderTotal      = 'ordertotal';
OutputOrderCurrency		= 'ordercurrency';
AppendItemNumToOutput = true;
HiddenFieldsToCheckout = false;

//---------------------------------------------------------------------||
//                          語言字串設定                               ||
//---------------------------------------------------------------------||

CHT_strSorry  = " 抱歉，您的購物車已滿，請先行結帳 ";
CHT_strAdded  = " 已加入您的購物車 ";
CHT_strRemove = " 請點選【確定】將此商品從您的購物車中移除 ";
CHT_strILabel = " 商品編號 ";
CHT_strDLabel = " 商品名稱 ";
CHT_strQLabel = " 數量 ";
CHT_strPLabel = " 單價 ";
CHT_strSLabel = " 運費 ";
CHT_strRLabel = " 由購物車中移除 ";
CHT_strRButton= " 移除 ";
CHT_strSUB    = " 小計 (一千元(含)以上，免運費) ";
CHT_strSHIP   = " 運費 ";
CHT_strTAX    = " 稅額 ";
CHT_strTOT    = " 總　　價 ";
CHT_strCUR		= " 訂單幣別 "
CHT_strErrQty = " 數量無效 ";
CHT_strNewQty = ' 請輸入新數量 ';
CHT_strEmptyCartPrompt = "購物車是空的";

//---------------------------------------------------------------------||
// 函式名稱：checkQuantityFormate                                      ||
// 參    數：Quantity                                                  ||
// 回    傳：Quantity as a number                                      ||
// 目    的：確認回傳值為數字，如輸入錯誤，預設為１			           ||
// 使用時機：產品頁，加入購物車的表單                                  ||
//---------------------------------------------------------------------||
function CheckQuantityFormate(quaility) {
   var numberTypeOFQuantity = "";

   for ( i = 0; i < quaility.length; i++ ) {
      ch = quaility.substring(i, i+1);
      if ( (ch >= "0" && ch <= "9") || (ch == '.') )
			numberTypeOFQuantity += ch;         
   }

   if ( numberTypeOFQuantity.length < 1 )
      numberTypeOFQuantity = "1";

   return(numberTypeOFQuantity);
}

//---------------------------------------------------------------------||
// 函式名稱：AddItemToCart                                             ||
// 參    數：Form Object                                               ||
// 回    傳：Quantity as a number                                      ||
// 目    的：加入訂購產品到購物車               		       ||
// 使用時機：產品頁，加入購物車的表單                                  ||
//---------------------------------------------------------------------||
function AddItemToCart(thisForm) {
	
   var tmpcookie = new Date();
   chkcookie = (tmpcookie.getTime() + '');
   document.cookie = "chkcookie=" + chkcookie + "; path=/";
   
    if (document.cookie.indexOf(chkcookie,0) < 0) {
	alert("Cookie尚未開啟。若要使用購物車，請您將瀏覽器的Cookie開啟。");
    }
    else {
	   var iNumberOrdered = 0;
	   var bAlreadyInCart = false;
	   var notice = "";
	   iNumberOrdered = GetCookie("NumberOrdered");
	
	   if ( iNumberOrdered == null )
	      iNumberOrdered = 0;
	
	   if ( thisForm.ID_NUM == null )
	      strID_NUM    = "";
	   else
	      strID_NUM    = thisForm.ID_NUM.value;
	
	   if ( thisForm.QUANTITY == null )
	      strQUANTITY  = "1";
	   else
	      strQUANTITY  = thisForm.QUANTITY.value;
	
	   if ( thisForm.PRICE == null )
	      strPRICE     = "0.00";
	   else
	      strPRICE     = thisForm.PRICE.value;
	
	   if ( thisForm.NAME == null )
	      strNAME      = "";
	   else
	      strNAME      = thisForm.NAME.value;
	
	   if ( thisForm.SHIPPING == null )
	      strSHIPPING  = "0.00";
	   else
	      strSHIPPING  = thisForm.SHIPPING.value;
	
	   if ( thisForm.ADDITIONALINFO == null ) {
	      strADDTLINFO = "";
	   } else {
	      strADDTLINFO = thisForm.ADDITIONALINFO[thisForm.ADDITIONALINFO.selectedIndex].value;
	   }
	   if ( thisForm.ADDITIONALINFO2 != null ) {
	      strADDTLINFO += "; " + thisForm.ADDITIONALINFO2[thisForm.ADDITIONALINFO2.selectedIndex].value;
	   }
	   if ( thisForm.ADDITIONALINFO3 != null ) {
	      strADDTLINFO += "; " + thisForm.ADDITIONALINFO3[thisForm.ADDITIONALINFO3.selectedIndex].value;
	   }
	   if ( thisForm.ADDITIONALINFO4 != null ) {
	      strADDTLINFO += "; " + thisForm.ADDITIONALINFO4[thisForm.ADDITIONALINFO4.selectedIndex].value;
	   }
	
	   //Is this product already in the cart?  If so, increment quantity instead of adding another.
	   for ( i = 1; i <= iNumberOrdered; i++ ) {
	      NewOrder = "Order." + i;
	      database = "";
	      database = GetCookie(NewOrder);
	
	      Token0 = database.indexOf("|", 0);
	      Token1 = database.indexOf("|", Token0+1);
	      Token2 = database.indexOf("|", Token1+1);
	      Token3 = database.indexOf("|", Token2+1);
	      Token4 = database.indexOf("|", Token3+1);
	
	      fields = new Array;
	      fields[0] = database.substring( 0, Token0 );
	      fields[1] = database.substring( Token0+1, Token1 );
	      fields[2] = database.substring( Token1+1, Token2 );
	      fields[3] = database.substring( Token2+1, Token3 );
	      fields[4] = database.substring( Token3+1, Token4 );
	      fields[5] = database.substring( Token4+1, database.length );
	
	      if ( fields[0] == strID_NUM &&
	           fields[2] == strPRICE  &&
	           fields[3] == strNAME   &&
	           fields[5] == strADDTLINFO
	         ) {
	         bAlreadyInCart = true;
	         dbUpdatedOrder = strID_NUM    + "|" +
	                          (parseInt(strQUANTITY)+parseInt(fields[1]))  + "|" +
	                          strPRICE     + "|" +
	                          strNAME      + "|" +
	                          strSHIPPING  + "|" +
	                          strADDTLINFO;
	         strNewOrder = "Order." + i;
	         DeleteCookie(strNewOrder, "/");
	         SetCookie(strNewOrder, dbUpdatedOrder, null, "/");
	         notice = strNAME + CHT_strAdded+" 數量："+strQUANTITY;
	         break;
	      }
	   }
	
	
	   if ( !bAlreadyInCart ) {
	      iNumberOrdered++;
	
	      if ( iNumberOrdered > CHT_CartCapacity )
	         alert( CHT_strSorry );
	      else {
	         dbUpdatedOrder = strID_NUM    + "|" + 
	                          strQUANTITY  + "|" +
	                          strPRICE     + "|" +
	                          strNAME      + "|" +
	                          strSHIPPING  + "|" +
	                          strADDTLINFO;
	
	         strNewOrder = "Order." + iNumberOrdered;
	         SetCookie(strNewOrder, dbUpdatedOrder, null, "/");
	         SetCookie("NumberOrdered", iNumberOrdered, null, "/");
	         notice = strNAME + CHT_strAdded+" 數量："+strQUANTITY;
	      }
	   }
	
	   if ( DisplayNotice && !(iNumberOrdered > CHT_CartCapacity)) 
	      alert(notice);

    }		
	

}

//---------------------------------------------------------------------||
// 函式名稱：RemoveItemFromCart                                        ||
// 參    數：Order Number to Remove                                    ||
// 回    傳：Null                                                      ||
// 目    的：Removes an item from a users shopping cart		           ||
// 使用時機：購物車管理頁                                              ||
//---------------------------------------------------------------------||

function RemoveItemFromCart(RemOrder) {
   if ( confirm( CHT_strRemove ) ) {
      NumberOrdered = GetCookie("NumberOrdered");
      for ( i=RemOrder; i < NumberOrdered; i++ ) {
         NewOrder1 = "Order." + (i+1);
         NewOrder2 = "Order." + (i);
         database = GetCookie(NewOrder1);
         SetCookie (NewOrder2, database, null, "/");
      }
      NewOrder = "Order." + NumberOrdered;
      SetCookie ("NumberOrdered", NumberOrdered-1, null, "/");
      DeleteCookie(NewOrder, "/");
      location.href=location.href;
   }
}


//---------------------------------------------------------------------||
// FUNCTION:    getCookieVal                                           ||
// PARAMETERS:  offset                                                 ||
// RETURNS:     URL unescaped Cookie Value                             ||
// PURPOSE:     Get a specific value from a cookie                     ||
//---------------------------------------------------------------------||
function getCookieVal (offset) {
   var endstr = document.cookie.indexOf (";", offset);

   if ( endstr == -1 )
      endstr = document.cookie.length;
   return(unescape(document.cookie.substring(offset, endstr)));
}


//---------------------------------------------------------------------||
// FUNCTION:    FixCookieDate                                          ||
// PARAMETERS:  date                                                   ||
// RETURNS:     date                                                   ||
// PURPOSE:     Fixes cookie date, stores back in date                 ||
//---------------------------------------------------------------------||
function FixCookieDate (date) {
   var base = new Date(0);
   var skew = base.getTime();

   date.setTime (date.getTime() - skew);
}


//---------------------------------------------------------------------||
// 函式名稱：GetCookie                                                 ||
// 參    數：Name                                                      ||
// 回    傳：Value in Cookie                                           ||
// 目    的：Retrieves cookie from users browser			           ||
// 使用時機：Script 內部檢查                                           || 
//---------------------------------------------------------------------||

function GetCookie (name) {
   var arg = name + "=";
   var alen = arg.length;
   var clen = document.cookie.length;
   var i = 0;

   while ( i < clen ) {
      var j = i + alen;
      if ( document.cookie.substring(i, j) == arg ) return(getCookieVal (j));
      i = document.cookie.indexOf(" ", i) + 1;
      if ( i == 0 ) break;
   }

   return(null);
}

//---------------------------------------------------------------------||
// 函式名稱：SetCookie                                                 ||
// 參    數：name, value, expiration date, path, domain, security      ||
// 回    傳：Null                                                      ||
// 目    的：Stores a cookie in the users browser			           ||
// 使用時機：Script 內部檢查                                           || 
//---------------------------------------------------------------------||
function SetCookie (name,value,expires,path,domain,secure) {
   document.cookie = name + "=" + escape (value) +
                     ((expires) ? "; expires=" + expires.toGMTString() : "") +
                     ((path) ? "; path=" + path : "") +
                     ((domain) ? "; domain=" + domain : "") +
                     ((secure) ? "; secure" : "");
}


//---------------------------------------------------------------------||
// 函式名稱：DeleteCookie                                              ||
// 參    數：Cookie name, path, domain                                 ||
// 回    傳：null                                                      ||
// 目    的：Removes a cookie from users browser			           ||
// 使用時機：Script 內部檢查                                           || 
//---------------------------------------------------------------------||
function DeleteCookie (name,path,domain) {
   if ( GetCookie(name) ) {
      document.cookie = name + "=" +
                        ((path) ? "; path=" + path : "") +
                        ((domain) ? "; domain=" + domain : "") +
                        "; expires=Thu, 01-Jan-70 00:00:01 GMT";
   }
}

//---------------------------------------------------------------------||
// 函式名稱：MoneyFormat                                               ||
// 參    數：MoneyFormat                                               ||
// 回    傳：Number to be formatted                                    ||
// 目    的：Reformats Dollar Amount to #.## format			           ||
// 使用時機：Script 內部檢查                                           || 
//---------------------------------------------------------------------||
function moneyFormat(input) {
   var dollars = Math.floor(input);

   if(input - dollars > 0)
   	return(input);
   else
   	return(dollars);

/*	old effort
   var tmp = new String(input);

   for ( var decimalAt = 0; decimalAt < tmp.length; decimalAt++ ) {
      if ( tmp.charAt(decimalAt)=="." )
         break;
   }

   var cents  = "" + Math.round(input * 100);
   cents = cents.substring(cents.length-2, cents.length)
           dollars += ((tmp.charAt(decimalAt+1)=="9")&&(cents=="00"))? 1 : 0;

   if ( cents == "0" )
      cents = "00";

   //return(dollars + "." + cents);
   return(dollars);*/
}

//---------------------------------------------------------------------||
// 函式名稱：ChangeOrderQuantity                                       ||
// 參    數：Order Number to Change Quantity                           ||
// 回    傳：null                                                      ||
// 目    的：Changes quantity of an item in the shopping cart          ||
// 使用時機：Script 內部檢查                                           || 
//---------------------------------------------------------------------||
function ChangeOrderQuantity(OrderItem,NewQuantity) {
   if ( isNaN(NewQuantity) ) {
      alert( CHT_strErrQty );
   } else {
      NewOrder = "Order." + OrderItem;
      database = "";
      database = GetCookie(NewOrder);

      Token0 = database.indexOf("|", 0);
      Token1 = database.indexOf("|", Token0+1);
      Token2 = database.indexOf("|", Token1+1);
      Token3 = database.indexOf("|", Token2+1);
      Token4 = database.indexOf("|", Token3+1);

      fields = new Array;
      fields[0] = database.substring( 0, Token0 );
      fields[1] = database.substring( Token0+1, Token1 );
      fields[2] = database.substring( Token1+1, Token2 );
      fields[3] = database.substring( Token2+1, Token3 );
      fields[4] = database.substring( Token3+1, Token4 );
      fields[5] = database.substring( Token4+1, database.length );

      dbUpdatedOrder = fields[0] + "|" +
                       NewQuantity + "|" +
                       fields[2] + "|" +
                       fields[3] + "|" +
                       fields[4] + "|" +
                       fields[5];
      strNewOrder = "Order." + OrderItem;
      DeleteCookie(strNewOrder, "/");
      SetCookie(strNewOrder, dbUpdatedOrder, null, "/");
      location.href=location.href;      
   }
}


//---------------------------------------------------------------------||
// FUNCTION:    GetFromCart                                            ||
// PARAMETERS:  Null                                                   ||
// RETURNS:     Product Table Written to Document                      ||
// PURPOSE:     Draws current cart product table on HTML page          ||
//              **DEPRECATED FUNCTION, USE ManageCart or Checkout**    ||
//---------------------------------------------------------------------||
function GetFromCart( fShipping ) {
   ManageCart( );
}


//---------------------------------------------------------------------||
// FUNCTION:    RadioChecked                                           ||
// PARAMETERS:  Radio button to check                                  ||
// RETURNS:     True if a radio has been checked                       ||
// PURPOSE:     Form fillin validation                                 ||
//---------------------------------------------------------------------||
function RadioChecked( radiobutton ) {
   var bChecked = false;
   var rlen = radiobutton.length;
   for ( i=0; i < rlen; i++ ) {
      if ( radiobutton[i].checked )
         bChecked = true;
   }    
   return bChecked;
} 


//---------------------------------------------------------------------||
// FUNCTION:    QueryString                                            ||
// PARAMETERS:  Key to read                                            ||
// RETURNS:     value of key                                           ||
// PURPOSE:     Read data passed in via GET mode                       ||
//---------------------------------------------------------------------||
QueryString.keys = new Array();
QueryString.values = new Array();
function QueryString(key) {
   var value = null;
   for (var i=0;i<QueryString.keys.length;i++) {
      if (QueryString.keys[i]==key) {
         value = QueryString.values[i];
         break;
      }
   }
   return value;
} 

//---------------------------------------------------------------------||
// FUNCTION:    QueryString_Parse                                      ||
// PARAMETERS:  (URL string)                                           ||
// RETURNS:     null                                                   ||
// PURPOSE:     Parses query string data, must be called before Q.S.   ||
//---------------------------------------------------------------------||
function QueryString_Parse() {
   var query = window.location.search.substring(1);
   var pairs = query.split("&"); for (var i=0;i<pairs.length;i++) {
      var pos = pairs[i].indexOf('=');
      if (pos >= 0) {
         var argname = pairs[i].substring(0,pos);
         var value = pairs[i].substring(pos+1);
         QueryString.keys[QueryString.keys.length] = argname;
         QueryString.values[QueryString.values.length] = value;
      }
   }
}

//---------------------------------------------------------------------||
// 函式名稱：ManageCart                                                ||
// 參    數：CURRENCY（幣別）                                          ||
// 回    傳：Product Table Written to Document                         ||
// 目    的：Draws current cart product table on HTML page             ||
// 使用時機：產品頁，加入購物車的表單                                  ||
//---------------------------------------------------------------------||

function ManageCart(CURRENCY) {
   var iNumberOrdered = 0;    //Number of products ordered
   var fTotal         = 0;    //Total cost of order
   var fTax           = 0;    //Tax amount
   var fShipping      = 0;    //Shipping amount
   var strTotal       = "";   //Total cost formatted as money
   var strTax         = "";   //Total tax formatted as money
   var strShipping    = "";   //Total shipping formatted as money
   var strOutput      = "";   //String to be written to page
   var bDisplay       = true; //Whether to write string to the page (here for programmers)

   iNumberOrdered = GetCookie("NumberOrdered");
   if ( iNumberOrdered == null )
      iNumberOrdered = 0;

   if ( bDisplay )
      strOutput = "<TABLE cellpadding=\"3\" cellspacing=\"1\" border=\"0\" align=\"center\" width=\"500\"><TR vAlign=\"center\">" +
                  "<TD CLASS=\"title1\" align=\"center\" width=\"74\" height=\"25\">"+CHT_strILabel+"</TD>" +
                  "<TD CLASS=\"title1\" align=\"center\" width=\"227\" height=\"25\">"+CHT_strDLabel+"</TD>" +
                  "<TD CLASS=\"title1\" align=\"center\" width=\"35\" height=\"25\">"+CHT_strQLabel+"</TD>" +
                  "<TD CLASS=\"title1\" align=\"center\" width=\"63\" height=\"25\">"+CHT_strPLabel+"</TD>" +
                  (DisplayShippingColumn?"<TD CLASS=\"title1\" align=\"center\">"+CHT_strSLabel+"</TD>":"") +
                  "<TD CLASS=\"title1\" align=\"center\" width=\"115\" height=\"25\">"+CHT_strRLabel+"</TD></TR>";

   if ( iNumberOrdered == 0 ) {
      strOutput += "<TR><TD COLSPAN=6 CLASS=\"text1\"><CENTER><BR>" + CHT_strEmptyCartPrompt + "<BR><BR></CENTER></TD></TR>";
   }

   // ************************ 列印每筆訂購產品的資料 START ************************ ||
   for ( i = 1; i <= iNumberOrdered; i++ ) {
      NewOrder = "Order." + i;
      database = "";
      database = GetCookie(NewOrder);

      Token0 = database.indexOf("|", 0);
      Token1 = database.indexOf("|", Token0+1);
      Token2 = database.indexOf("|", Token1+1);
      Token3 = database.indexOf("|", Token2+1);
      Token4 = database.indexOf("|", Token3+1);

      fields = new Array;
      fields[0] = database.substring( 0, Token0 );                 // Product ID
      fields[1] = database.substring( Token0+1, Token1 );          // Quantity
      fields[2] = database.substring( Token1+1, Token2 );          // Price
      fields[3] = database.substring( Token2+1, Token3 );          // Product Name/Description
      fields[4] = database.substring( Token3+1, Token4 );          // Shipping Cost
      fields[5] = database.substring( Token4+1, database.length ); //Additional Information

      fTotal     += (parseInt(fields[1]) * parseFloat(fields[2]) );
      fShipping  += (parseInt(fields[1]) * parseFloat(fields[4]) );
      fTax        = (fTotal * TaxRate);
      strTotal    = moneyFormat(fTotal);
      strTax      = moneyFormat(fTax);
      strShipping = moneyFormat(fShipping);

      if ( bDisplay ) {
         strOutput += "<TR><TD align=\"center\" CLASS=\"text1\">"  + fields[0] + "</TD>";

         if ( fields[5] == "" )
            strOutput += "<TD align=\"center\" CLASS=\"text1\">"  + fields[3] + "</TD>";
         else
            strOutput += "<TD align=\"center\" CLASS=\"text1\">"  + fields[3] + " - <I>"+ fields[5] + "</I></TD>";

         strOutput += "<TD align=\"center\" CLASS=\"text1\"><INPUT TYPE=TEXT NAME=Q SIZE=2 VALUE=\"" + fields[1] + "\" onChange=\"ChangeOrderQuantity("+i+", this.value);\"></TD>";
         strOutput += "<TD align=\"center\" CLASS=\"text1\">"+ MonetarySymbol + moneyFormat(fields[2]) + "</TD>";

         if ( DisplayShippingColumn ) {
            if ( parseFloat(fields[4]) > 0 )
               strOutput += "<TD align=\"center\" CLASS=\"text1\">"+ MonetarySymbol + moneyFormat(fields[4]) + "</TD>";
            else
               strOutput += "<TD align=\"center\" CLASS=\"text1\">N/A</TD>";
         }

         strOutput += "<TD align=\"center\" CLASS=\"text1\" ALIGN=CENTER><input type=button class=BTN value=\" "+CHT_strRButton+" \" onClick=\"RemoveItemFromCart("+i+")\" class=\"nopbutton\"></TD></TR>";
      }

      if ( AppendItemNumToOutput ) {
         strFooter = i;
      } else {
         strFooter = "";
      }
      if ( HiddenFieldsToCheckout ) {
         strOutput += "<input type=hidden name=\"" + OutputItemId        + strFooter + "\" value=\"" + fields[0] + "\">";
         strOutput += "<input type=hidden name=\"" + OutputItemQuantity  + strFooter + "\" value=\"" + fields[1] + "\">";
         strOutput += "<input type=hidden name=\"" + OutputItemPrice     + strFooter + "\" value=\"" + fields[2] + "\">";
         strOutput += "<input type=hidden name=\"" + OutputItemName      + strFooter + "\" value=\"" + fields[3] + "\">";
         strOutput += "<input type=hidden name=\"" + OutputItemShipping  + strFooter + "\" value=\"" + fields[4] + "\">";
         strOutput += "<input type=hidden name=\"" + OutputItemAddtlInfo + strFooter + "\" value=\"" + fields[5] + "\">";
      }

   }
   // ************************ 列印每筆訂購產品的資料 END ************************ ||

   if (fTotal > 1000)
   {
	   fShipping = 0;
	   strShipping = moneyFormat(fShipping);
   }

   if ( bDisplay ) {
      //strOutput += "<TR><TD CLASS=\"text1\" COLSPAN=4><B>"+CHT_strSUB+"</B></TD>";
      //strOutput += "<TD CLASS=\"text1\" COLSPAN=2><B>" + MonetarySymbol + strTotal + "</B></TD>";
      //strOutput += "</TR>";

      if ( DisplayShippingRow ) {
         strOutput += "<TR><TD CLASS=\"text1\" COLSPAN=4 align=\"right\"><p align=\"right\"><B>"+CHT_strSHIP+"</B></TD>";
         strOutput += "<TD CLASS=\"text1\" COLSPAN=2><B>" + MonetarySymbol + strShipping + "</B></TD>";
         strOutput += "</TR>";
      }

      if ( DisplayTaxRow || TaxByRegion ) {
         if ( TaxByRegion ) {
            strOutput += "<TR><TD CLASS=\"text1\" COLSPAN=4 align=\"right\"><p align=\"right\"><B>"+CHT_strTAX+"</B></TD>";
            strOutput += "<TD CLASS=\"text1\" COLSPAN=2><B>";
            strOutput += "<input type=radio name=\""+OutputOrderTax+"\" value=\"" + strTax + "\">";
            strOutput += TaxablePrompt + ": " + MonetarySymbol + strTax;
            strOutput += "<BR><input type=radio name=\""+OutputOrderTax+"\" value=\"0.00\">";
            strOutput += NonTaxablePrompt + ": " + MonetarySymbol + "0.00";
            strOutput += "</B></TD>";
            strOutput += "</TR>";
         } else {
            strOutput += "<TR><TD CLASS=\"text1\" COLSPAN=4 align=\"right\"><p align=\"right\"><B>"+CHT_strTAX+"</B></TD>";
            strOutput += "<TD CLASS=\"text1\" COLSPAN=2><B>" + MonetarySymbol + strTax + "</B></TD>";
            strOutput += "</TR>";
         }
      }

      if ( !TaxByRegion ) {
         strOutput += "<TR><TD CLASS=\"text1\" COLSPAN=4 align=\"right\" height=\"30\"><p align=\"right\">"+CHT_strTOT+"</TD>";
         strOutput += "<TD CLASS=\"text1\" COLSPAN=2 align=\"center\">" + MonetarySymbol + moneyFormat((fTotal + fShipping + fTax)) + "</TD>";
         strOutput += "</TR>";
         
				 if( CURRENCY == '元' )
					 CURRENCY += "（新台幣）";  
         strOutput += "<TR><TD CLASS=\"text1\" COLSPAN=4 align=\"right\" height=\"30\"><p align=\"right\">"+CHT_strCUR+"</TD>";
         strOutput += "<TD CLASS=\"text1\" COLSPAN=2 align=\"center\">" + CURRENCY + "</TD>";
         strOutput += "</TR>";         
       
      }
      strOutput += "</TABLE>";

      if ( HiddenFieldsToCheckout ) {
         strOutput += "<input type=hidden name=\""+OutputOrderSubtotal+"\" value=\""+ MonetarySymbol + strTotal + "\">";
         strOutput += "<input type=hidden name=\""+OutputOrderShipping+"\" value=\""+ MonetarySymbol + strShipping + "\">";
         strOutput += "<input type=hidden name=\""+OutputOrderTax+"\"      value=\""+ MonetarySymbol + strTax + "\">";
         strOutput += "<input type=hidden name=\""+OutputOrderTotal+"\"    value=\""+ MonetarySymbol + moneyFormat((fTotal + fShipping + fTax)) + "\">";
         strOutput += "<input type=hidden name=\""+OutputOrderCurrency+"\"    value=\""+ CURRENCY + "\">";
         

      }
   }
   CHT_TotalCost = (fTotal + fShipping + fTax);

   document.write(strOutput);
   document.close();
}

//---------------------------------------------------------------------||
// 函式名稱：ValidateCart                                              ||
// 參    數：Form to validate                                          ||
// 回    傳：true/false                                                ||
// 目    的：Validates the managecart form        			           ||
// 使用時機：購物車管理頁，進入結帳的表單                              ||
//---------------------------------------------------------------------||

var CHT_TotalCost = 0;
function ValidateCart( theForm ) {
   if ( TaxByRegion ) {
      if ( !RadioChecked(eval("theForm."+OutputOrderTax)) ) {
         alert( TaxPrompt );
         return false;
      }
   }

   //if ( CHT_MinimumOrder >= 0.01 ) {
      if ( CHT_TotalCost < CHT_MinimumOrder ) {
         alert( CHT_MinimumOrderPrompt );
         return false;
      }
   //}

   return true;
}

//---------------------------------------------------------------------||
// FUNCTION:    CheckoutCart                                           ||
// PARAMETERS:  CURRENCY（幣別）                                       ||
// RETURNS:     Product Table Written to Document                      ||
// PURPOSE:     Draws current cart product table on HTML page for      ||
//              checkout.                                              ||
//---------------------------------------------------------------------||
function CheckoutCart(CURRENCY) {
   var iNumberOrdered = 0;    //Number of products ordered
   var fTotal         = 0;    //Total cost of order
   var fTax           = 0;    //Tax amount
   var fShipping      = 0;    //Shipping amount
   var strTotal       = "";   //Total cost formatted as money
   var strTax         = "";   //Total tax formatted as money
   var strShipping    = "";   //Total shipping formatted as money
   var strOutput      = "";   //String to be written to page
   var bDisplay       = true; //Whether to write string to the page (here for programmers)
   var strPP          = "";   //Payment Processor Description Field

   iNumberOrdered = GetCookie("NumberOrdered");
   if ( iNumberOrdered == null )
      iNumberOrdered = 0;

   if ( TaxByRegion ) {
      QueryString_Parse();
      fTax = parseFloat( QueryString( OutputOrderTax ) );
      strTax = moneyFormat(fTax);
   }

   if ( bDisplay )
      strOutput = "<TABLE cellpadding=\"3\" cellspacing=\"1\" border=\"0\ align=\"center\" width=\"500\"><TR vAlign=\"center\">" +
                  "<TD CLASS=\"title1\" align=\"middle\" width=\"74\" height=\"25\">"+CHT_strILabel+"</TD>" +
                  "<TD CLASS=\"title1\" align=\"middle\" width=\"227\" height=\"25\">"+CHT_strDLabel+"</TD>" +
                  "<TD CLASS=\"title1\" align=\"middle\" width=\"35\" height=\"25\">"+CHT_strQLabel+"</TD>" +
                  "<TD CLASS=\"title1\" align=\"middle\" width=\"115\" height=\"25\">"+CHT_strPLabel+"</TD>" +
                  (DisplayShippingColumn?"<TD CLASS=\"title1\" align=\"center\">"+CHT_strSLabel+"</TD>":"") +
                  "</TR>";

   for ( i = 1; i <= iNumberOrdered; i++ ) {
      NewOrder = "Order." + i;
      database = "";
      database = GetCookie(NewOrder);

      Token0 = database.indexOf("|", 0);
      Token1 = database.indexOf("|", Token0+1);
      Token2 = database.indexOf("|", Token1+1);
      Token3 = database.indexOf("|", Token2+1);
      Token4 = database.indexOf("|", Token3+1);

      fields = new Array;
      fields[0] = database.substring( 0, Token0 );                 // Product ID
      fields[1] = database.substring( Token0+1, Token1 );          // Quantity
      fields[2] = database.substring( Token1+1, Token2 );          // Price
      fields[3] = database.substring( Token2+1, Token3 );          // Product Name/Description
      fields[4] = database.substring( Token3+1, Token4 );          // Shipping Cost
      fields[5] = database.substring( Token4+1, database.length ); //Additional Information

      fTotal     += (parseInt(fields[1]) * parseFloat(fields[2]) );
      fShipping  += (parseInt(fields[1]) * parseFloat(fields[4]) );
      if ( !TaxByRegion ) fTax = (fTotal * TaxRate);
      strTotal    = moneyFormat(fTotal);
      if ( !TaxByRegion ) strTax = moneyFormat(fTax);
      strShipping = moneyFormat(fShipping);

      if ( bDisplay ) {
         strOutput += "<TR><TD align=\"center\" CLASS=\"text1\">"  + fields[0] + "</TD>";

         if ( fields[5] == "" )
            strOutput += "<TD align=\"center\" CLASS=\"text1\">"  + fields[3] + "</TD>";
         else
            strOutput += "<TD align=\"center\" CLASS=\"text1\">"  + fields[3] + " - <I>"+ fields[5] + "</I></TD>";

         strOutput += "<TD align=\"center\" CLASS=\"text1\">" + fields[1] + "</TD>";
         strOutput += "<TD align=\"center\" CLASS=\"text1\">"+ MonetarySymbol + moneyFormat(fields[2]) + "</TD>";

         if ( DisplayShippingColumn ) {
            if ( parseFloat(fields[4]) > 0 )
               strOutput += "<TD align=\"center\" CLASS=\"text1\">"+ MonetarySymbol + moneyFormat(fields[4]) + "</TD>";
            else
               strOutput += "<TD align=\"center\" CLASS=\"text1\">N/A</TD>";
         }

         strOutput += "</TR>";
      }

      if ( AppendItemNumToOutput ) {
         strFooter = i;
      } else {
         strFooter = "";
      }
      if ( PaymentProcessor != '' ) {
         //Process description field for payment processors instead of hidden values.
         //Format Description of product as:
         // ID, Name, Qty X
         strPP += fields[0] + ", " + fields[3];
         if ( fields[5] != "" )
            strPP += " - " + fields[5];
         strPP += ", Qty. " + fields[1] + "\n";
      } else {
         strOutput += "<input type=hidden name=\'" + OutputItemId        + strFooter + "\' value=\'" + fields[0] + "\'>";
         strOutput += "<input type=hidden name=\'" + OutputItemQuantity  + strFooter + "\' value=\'" + fields[1] + "\'>";
         strOutput += "<input type=hidden name=\'" + OutputItemPrice     + strFooter + "\' value=\'" + fields[2] + "\'>";
         strOutput += "<input type=hidden name=\'" + OutputItemName      + strFooter + "\' value=\'" + fields[3] + "\'>";
         //strOutput += "<input type=hidden name=\'" + OutputItemShipping  + strFooter + "\' value=\'" + fields[4] + "\'>";
         strOutput += "<input type=hidden name=\'" + OutputItemAddtlInfo + strFooter + "\' value=\'" + fields[5] + "\'>";
      } 

   }

   if (fTotal > 1000)
   {
	   fShipping = 0;
	   strShipping = moneyFormat(fShipping);
   }

   if ( bDisplay ) {
      //strOutput += "<TR><TD CLASS=\"text1\" COLSPAN=3><B>"+CHT_strSUB+"</B></TD>";
      //strOutput += "<TD CLASS=\"text1\" COLSPAN=2 ALIGN=RIGHT><B>" + MonetarySymbol + strTotal + "</B></TD>";
      //strOutput += "</TR>";

      if ( DisplayShippingRow ) {
         strOutput += "<TR><TD CLASS=\"text1\" COLSPAN=3><p align=\"right\"><B>"+CHT_strSHIP+"</B></TD>";
         strOutput += "<TD CLASS=\"text1\" COLSPAN=2 ALIGN=RIGHT><B>" + MonetarySymbol + strShipping + "</B></TD>";
         strOutput += "</TR>";
      }

      if ( DisplayTaxRow || TaxByRegion ) {
         strOutput += "<TR><TD CLASS=\"text1\" COLSPAN=3><p align=\"right\"><B>"+CHT_strTAX+"</B></TD>";
         strOutput += "<TD CLASS=\"text1\" COLSPAN=2 ALIGN=RIGHT><B>" + MonetarySymbol + strTax + "</B></TD>";
         strOutput += "</TR>";
      }

      strOutput += "<TR><TD align=\"center\" CLASS=\"text1\" COLSPAN=3 height=\"30\"><p align=\"right\">"+CHT_strTOT+"</TD>";
      //strOutput += "<TD CLASS=\"text1\" COLSPAN=2 ALIGN=RIGHT><B>" + MonetarySymbol + moneyFormat((fTotal + fShipping + fTax)) + "</B></TD>";
      strOutput += "<TD CLASS=\"text1\" ALIGN=CENTER>" + MonetarySymbol + moneyFormat((fTotal + fShipping)) + "</TD>";
      strOutput += "</TR>";

			if( CURRENCY == '元' )
				CURRENCY += "（新台幣）";      
      strOutput += "<TR><TD align=\"center\" CLASS=\"text1\" COLSPAN=3 height=\"30\"><p align=\"right\">"+CHT_strCUR+"</TD>";
      strOutput += "<TD CLASS=\"text1\" ALIGN=CENTER>" + CURRENCY + "</TD>";
      strOutput += "</TR>";      

      strOutput += "</TABLE>";

      
      if ( PaymentProcessor == 'an') {
         //Process this for Authorize.net WebConnect
         strOutput += "<input type=hidden name=\"x_Version\" value=\"3.0\">";
         strOutput += "<input type=hidden name=\"x_Show_Form\" value=\"PAYMENT_FORM\">";
         strOutput += "<input type=hidden name=\"x_Description\" value=\""+ strPP + "\">";
         strOutput += "<input type=hidden name=\"x_Amount\" value=\""+ moneyFormat((fTotal + fShipping + fTax)) + "\">";
      } else if ( PaymentProcessor == 'wp') {
         //Process this for WorldPay
         strOutput += "<input type=hidden name=\"desc\" value=\""+ strPP + "\">";
         strOutput += "<input type=hidden name=\"amount\" value=\""+ moneyFormat((fTotal + fShipping + fTax)) + "\">";
      } else if ( PaymentProcessor == 'lp') {
         //Process this for LinkPoint         
         strOutput += "<input type=hidden name=\"mode\" value=\"fullpay\">";
         strOutput += "<input type=hidden name=\"chargetotal\" value=\""+ moneyFormat((fTotal + fShipping + fTax)) + "\">";
         strOutput += "<input type=hidden name=\"tax\" value=\""+ MonetarySymbol + strTax + "\">";
         strOutput += "<input type=hidden name=\"subtotal\" value=\""+ MonetarySymbol + strTotal + "\">";
         strOutput += "<input type=hidden name=\"shipping\" value=\""+ MonetarySymbol + strShipping + "\">";
         strOutput += "<input type=hidden name=\"desc\" value=\""+ strPP + "\">";
      } else {
         strOutput += "<input type=hidden name=\'"+OutputOrderSubtotal+"\' value=\'"+ MonetarySymbol + strTotal + "\'>";
//         strOutput += "<input type=hidden name=\'"+OutputOrderShipping+"\' value=\'"+ MonetarySymbol + strShipping + "\'>";
         strOutput += "<input type=hidden name=\'"+OutputOrderTax+"\'      value=\'"+ MonetarySymbol + strTax + "\'>";
         strOutput += "<input type=hidden name=\'"+OutputOrderTotal+"\'    value=\'"+ MonetarySymbol + moneyFormat((fTotal + fShipping + fTax)) + "\'>";
         strOutput += "<input type=hidden name=\'"+OutputOrderCurrency+"\'    value=\'"+ CURRENCY + "\'>";
      }
   }

   document.write(strOutput);
   document.close();

}

//---------------------------------------------------------------------||
// 函式名稱：CHTRemoveCookies                                          ||
// 參    數：Null                                                      ||
// 回    傳：                   				       ||
// 目    的：Remove all data in cookies          		       ||
// 使用時機：傳送表單完成後                                            ||
//---------------------------------------------------------------------||

function CHTRemoveCookies( ) {
   var iNumberOrdered = 0;    //Number of products ordered

   iNumberOrdered = GetCookie("NumberOrdered");
   if ( iNumberOrdered == null )
      iNumberOrdered = 0;

   for ( i = iNumberOrdered; i >= 1; i-- ) {
      CHTRemoveItemFromCart(i);

   }
}

//---------------------------------------------------------------------||
// 函式名稱：CHTRemoveItemFromCart                                        ||
// 參    數：Order Number to Remove                                    ||
// 回    傳：Null                                                      ||
// 目    的：Removes an item from a users shopping cart		           ||
// 使用時機：購物車管理頁                                              ||
//---------------------------------------------------------------------||

function CHTRemoveItemFromCart(RemOrder) {
      NumberOrdered = GetCookie("NumberOrdered");
      for ( i=RemOrder; i < NumberOrdered; i++ ) {
         NewOrder1 = "Order." + (i+1);
         NewOrder2 = "Order." + (i);
         database = GetCookie(NewOrder1);
         SetCookie (NewOrder2, database, null, "/");
      }
      NewOrder = "Order." + NumberOrdered;
      SetCookie ("NumberOrdered", NumberOrdered-1, null, "/");
      DeleteCookie(NewOrder, "/");
      location.href=location.href;
}

//=====================================================================||
//               END NOP Design SmartPost Shopping Cart                ||
//=====================================================================||

