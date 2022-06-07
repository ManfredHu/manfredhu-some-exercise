/**
 * 
 * @authors manfredHu
 * @date    2015-05-04 10:42:50
 * @version $Id$
 	志愿者报名页面js
 */
 /*将页面数据读取转化为JSON*/
		function getData(){
			var constructor = new Object();
			var h1Object = new Object();
			$(".first").each(function(){
				var seconds = $(this).find('>div.second');
				var h3Object = new Object(); 
				var h2Object = new Object(); 
				if(seconds&&seconds.length){
					for(var j=0;j<seconds.length;j++){
						var thirds = $(seconds[j]).find('>div.third'); //获取当前div.second下的div.third

						if(thirds&&thirds.length){
							var h4s = $(thirds).find('>h4');
							var h4Object = new Object(); //三级标题对象构建，名字为h4,值为input的value
							if(h4s&&h4s.length){
								for(var i=0;i<h4s.length;i++){
									if($(h4s[i]).find('input').val().length==0)
										h4Object[$(h4s[i]).text()] = "#";
									else 
										h4Object[$(h4s[i]).text()] = $(h4s[i]).find('input').val();
								}
							}
							h3Object[$(seconds[j]).find('>h3').text()] = h4Object;
						}else{
							if($(seconds[j]).find('>h3>input').val() == ""){//如果没有内容
								h3Object[$(seconds[j]).find('>h3').text()] = "#";
							}else{
								h3Object[$(seconds[j]).find('>h3').text()] = $(seconds[j]).find('>h3>input').val();
							}
						}

					}
					h1Object[$(this).find('>h2').text()] = h3Object;
				}else {
					if($(this).find('>h2>input').val()=="")
						h1Object[$(this).find('>h2').text()] = "#";//只有一个一级标题
					else 
						h1Object[$(this).find('>h2').text()] = $(this).find('>h2>input').val();
				}
			});
			return h1Object;//返回构建的JSON对象
		}
		/*将JSON数据绑定到页面*/
		function setData(data){
			var html = "";
			var obj = eval('('+data+')'); //字符串转JSON对象
			$.each(obj,function(name,key){
				var html1 = ""; //采用分级加字符串的方法，每次迭代一个，然后记入总的html里面
				html1 += "<div class='first'><h2>"+name+"</h2>";
				if(!isEmptyObject(key)){
					$.each(key,function(name,key){
						var html2 = "<div class='second'>";
						html2 += "<h3>"+name+"</h3>";
						if(!isEmptyObject(key)&&key!='#'){
							html2 +="<div class='third'>";
							for(var temp in key){
								if(temp!=0)
									html2 += "<h4>"+temp+"</h4>";
							}
							html2 += "</div>";//对应<div class='third'>
						}
						html2 += "</div>";//对应<div class='second'>
						html1 += html2;
					});
					html1 += "</div>";
				}else{
					html1 += "</div>";//只有一级标题的时候，闭合标签
				}
				html += html1;
			});
			console.log(html);
			return html;
		}
		//判断一个对象是不是空的对象
		function isEmptyObject(obj){
			for(var name in obj){
				return false;
			}
			return true;
		}
		/*迭代向页面内添加文本框
		  文本框<input style="border:1px solid #aaa;padding:2px 5px;width:100px" type="text" value="" />
		*/
		function insertTextInput(){
			var textInput = "<input style='border:1px solid #aaa;padding:2px 5px;width:100px' type='text' value='' />"
			$(".first").each(function(){
				var divSedonds = $(this).find('>div.second');
				if(divSedonds&&divSedonds.length>0){
					$(divSedonds).each(function(){
						var divThirds = $(this).find('>div.third');
						if(divThirds&&divThirds.length>0){
							$(divThirds).each(function(){
								//三级标题里面添加文本框
								$(this).find('>h4').append(textInput);
							});
						}else{
							//只有二级标题没有三级标题
							$(this).find('>h3').append(textInput);
						}
					});
				}else{
					//找不到二级标题,向一级标题下加input
					$(this).find('>h2').append(textInput);
				}
			});
		}
		//设置结构
		function setStruct(jsonString){
			var html = "";
			//var obj = eval('('+jsonString+')'); //字符串转JSON对象
			var obj = $.parseJSON(jsonString);
			$.each(obj,function(name,key){
				var html1 = ""; //采用分级加字符串的方法，每次迭代一个，然后记入总的html里面
				html1 += "<div class='first'><h2>"+name+"</h2>";
				if(!isEmpty(key)){
					$.each(key,function(name,key){
						var html2 = "<div class='second'>";
						html2 += "<h3>"+name+"</h3>";
						if(!isEmpty(key)&&key!='#'){
							html2 +="<div class='third'>";
							for(var temp in key){
								if(temp!=0)
									html2 += "<h4>"+temp+"</h4>";
							}
							html2 += "</div>";//对应<div class='third'>
						}
						html2 += "</div>";//对应<div class='second'>
						html1 += html2;
					});
					html1 += "</div>";
				}else{
					html1 += "</div>";//只有一级标题的时候，闭合标签
				}
				html += html1;
			});
			return html;//返回生成的HTML代码
		}
		function isEmpty(obj){//当键值对的值为#符号时候标志为空
			if(obj==="#")
				return true;
			else
				return false;
		}
		/*发送叶子节点和文本框的键值对*/
		function userData(){
			var obj = new Object();
			$(".first>h2").each(function(){
				if($(this).find('>input[type="text"]').length>0){
					if($(this).find(">input[type='text']").val()==="")
						obj[$(this).text()] = "";
					else 
						obj[$(this).text()] = $(this).find(">input[type='text']").val();
				}
			});
			$('.second>h3').each(function(){
				if($(this).find('>input[type="text"]').length>0){
					if($(this).find(">input[type='text']").val()==="")
						obj[$(this).text()] = "";
					else 
						obj[$(this).text()] = $(this).find(">input[type='text']").val();
				}
			});
			$('.third>h4').each(function(){
				if($(this).find('>input[type="text"]').length>0){
					if($(this).find(">input[type='text']").val()==="")
						obj[$(this).text()] = "";
					else 
						obj[$(this).text()] = $(this).find(">input[type='text']").val();
				}
			});
			console.log(obj);
			return obj;//返回构建的JSON对象
		}

