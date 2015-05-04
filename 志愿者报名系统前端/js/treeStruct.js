/**
 * 
 * @authors manfredHu
 * @date    2015-05-04 10:47:51
 * @version $Id$
 	表结构页面JSON
 */

function modifyThis(t){//修改函数
		if(document.getElementById('textInput')) {
			alert("请点击蓝色确定按钮完成标题修改！");
			$("#textInput").focus();
			return;
		}
		var text = t.innerHTML;
		t.innerHTML = "<input id='textInput' class='textInput' type='text' value='"+text+"' /><input id='buttonInput' class='buttonInput' type='button' value='确定' />";
		$("#buttonInput").click(function(){
			var newtext = document.getElementById('textInput').value;
			if(newtext===""){
				alert("标题不能为空");
				$("#textInput").focus();
				return;
			}
			t.innerHTML = newtext;
		});
	}
	function deleteThis(t){//删除函数
		t.parentNode.parentNode.removeChild(t.parentNode);
	}
	/*将表结构转化为JSON*/
	function getStruct(){
		var h1Object = new Object();//新建对象
		$(".first").each(function(){//遍历页面的div.first
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
								h4Object[$(h4s[i]).text()] = "#";
							}
						}
						h3Object[$(seconds[j]).find('>h3').text()] = h4Object;
					}else{
						h3Object[$(seconds[j]).find('>h3').text()] = "#";
					}

				}
				h1Object[$(this).find('>h2').text()] = h3Object;
			}else {
				h1Object[$(this).find('>h2').text()] = "#";//只有一个一级标题
			}
		});
		return h1Object;
	}

	/*接收JOSN数据生成页面结构*/
	//var jString = '{"1":"#","2":{"2.1":"#"},"3":{"3.1":{"3.1.1":"#","3.1.2":"#"},"3.2":{"3.2.1":"#","3.2.2":"#"},"3.3":{"3.3.1":"#"}}}';
	var jString = '{"1":"#","2":{"2.1":"#"},"3":{"3.1":{"3.1.1":"#","3.1.2":"#"},"3.2":{"3.2.1":"#","3.2.2":"#"},"3.3":{"3.3.1":"#"}},"个人信息":{"项目经验":"#","办公软件":{"Word":"#","Excel":"#","PPT":"#","Access":"#"},"其他":{"礼仪":"#","医疗":"#","活动策划":"#"}}}';
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
	function addStyle(){//向当前页面添加缩进样式
		$("#add").find(".first").each(function(){//this为div.first
			if($(this).find('>div').length!==0){
				$(this).find('>h2').addClass('minus');
				$(this).find('>div').each(function(){ //this=div.second
					if($(this).find('>div').length!==0){
						$(this).find('>h3').addClass('minus');
					}
				});
			}
		});
	}
	function addFunction(){//向当前页面添加左右键功能
		$("#add").find(".first").each(function(){//this为div.first
			//对h2绑定左右键行为
			$(this).find('>h2').each(function(){
				$(this).contextMenu('myMenu1',{//对新的标题绑定事件,t是h2
					bindings:{
						'add': function(t){//在一级标题H2的基础上添加二级标题
							$(t.parentNode).append("<div class='second'><h3>新的二级标题</h3></div>"); //添加新的二级标题
							$(t.parentNode).find('>div').find('h3').contextMenu('myMenu2',{//对新的标题绑定事件,t是h3
								bindings:{
									'add': function(t){ //在二级标题H3的基础上添加三级标题
										if(t.parentNode.getElementsByTagName('div').length>0){ //当h3后面已经有一个div.third时候
											$(t).next('div').append('<h4>新的三级标题</h4>');
										}else{
											$(t.parentNode).append("<div class='third'><h4>新的三级标题</h4></div>"); //添加新的二级标题
										}
										$(t.parentNode).find('>div').find('h4').contextMenu('myMenu3',{//对新的标题绑定事件
											bindings:{
												'modify': function(t){modifyThis(t)},
												'delete': function(t){deleteThis(t)}
											}
										});
										$(t).addClass("minus"); //添加了子元素，显示减号
										$(t).click(function(){ //t是h2
											$(t.parentNode).find('>div').toggle();
											$(this).toggleClass("add");
										});
									},	
									'modify': function(t){modifyThis(t)},
									'delete': function(t){deleteThis(t)}
								}
							});
							$(t).addClass("minus"); //添加了子元素，显示减号
							$(t).click(function(){ //t是h2
								$(t.parentNode).find('>div').toggle();
								$(this).toggleClass("add");
							});
						},
						'modify': function(t){modifyThis(t)},
						'delete': function(t){deleteThis(t)}
					}
				});	
			});
			//对h2绑定左右键行为
			$(this).find(">div>h3").each(function(){
				$(this).contextMenu('myMenu2',{//对新的标题绑定事件,t是h3
					bindings:{
						'add': function(t){ //在二级标题H3的基础上添加三级标题
							if(t.parentNode.getElementsByTagName('div').length>0){ //当h3后面已经有一个div.third时候
								$(t).next('div').append('<h4>新的三级标题</h4>');
							}else{
								$(t.parentNode).append("<div class='third'><h4>新的三级标题</h4></div>"); //添加新的二级标题
							}
							$(t.parentNode).find('>div').find('h4').contextMenu('myMenu3',{//对新的标题绑定事件
								bindings:{
									'modify': function(t){modifyThis(t)},
									'delete': function(t){deleteThis(t)}
								}
							});
							$(t).addClass("minus"); //添加了子元素，显示减号
							$(t).click(function(){ //t是h2
								$(t.parentNode).find('>div').toggle();
								$(this).toggleClass("add");
							});
						},	
						'modify': function(t){modifyThis(t)},
						'delete': function(t){deleteThis(t)}
					}
				});
			});
			//对h3绑定左右键行为
			$(this).find(">div>div>h4").each(function(){
				$(this).contextMenu('myMenu3',{//对新的标题绑定事件
					bindings:{
						'modify': function(t){modifyThis(t)},
						'delete': function(t){deleteThis(t)}
					}
				});
			});
		});
	}