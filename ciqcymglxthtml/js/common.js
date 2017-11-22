/*
确认窗口
依赖layer
params:
layer：layer对象
content:内容，
handleOk:【确定】按钮回调
handleCancel:【取消】按钮回调
*/
function fyConfirm(params){
	params.doc=params.doc||top.document
	params.layer=params.layer||layer;
	params.content=params.content||'';
	params.handleOk=params.handleOk||function(){};
	params.handleCancel=params.handleCancel||function(){};
	var index=params.layer.confirm(params.content,{icon:3,shade:0.3,title:'确认框',btn:['确定','取消'],skin:'layui-layer-lan'},function(index){
		params.handleOk();
		params.layer.close(index);
	},function(index){
		params.handleCancel();
	});
	$('#layui-layer-shade'+index,params.doc).css('z-index',120);
}

/*
删除确认窗口
依赖layer
params:
layer：layer对象
content:内容，
handleOk:【确定】按钮回调
handleCancel:【取消】按钮回调
*/
function fyConfirmDel(params){
	params.layer=params.layer||layer;
	params.content=params.content||'';
	params.handleOk=params.handleOk||function(){};
	params.handleCancel=params.handleCancel||function(){};
	params.layer.open({
		type:1,
		area:['400px'],
		title:['提示','color:#FFF;border-bottom:none;background-color:#1492ff'],
		content:'<div class="confirm_box"><p>'+params.content+'</p><ul><li><input type="button" value="是" class="btn_ok"></li><li><input type="button" value="否" class="btn_cancel"></li></ul></div>',
		success: function(layero,index){
			//是
			$('input.btn_ok',layero).focus().on('click',function(){
				params.handleOk(layero,index);
				params.layer.close(index);
			});
			//否
			$('input.btn_cancel',layero).on('click',function(){
				params.handleCancel(layero,index);
				params.layer.close(index);
			});
		}
	});
}


//提交数据等待
function waiting(config){
	this.doc=config.doc||document;
	this.layer=config.layer||layer;
	this.index;
	this.start=function(){
		this.index=this.layer.load(2);
  		$('#layui-layer-shade'+this.index,this._doc).css('z-index',120);
	}
	this.stop=function(){
		this.layer.close(this.index);
	}
}


/*
新增/修改表单弹窗
依赖layer
params:
layer：layer对象
title：弹窗名称
formItems:表单项[{title:名称,value:内容,required:是否必填,默认false}...]，
width：窗体宽度，默认auto
height：窗体高度，默认auto
titleWidth:左边名称栏宽度，默认28%
handleSuccess：窗体加载完成后回调
handleOk:【保存】按钮回调
handleCancel:【取消】按钮回调
*/
function fyDialogForm(params){
	params.layer=params.layer||layer;
    params.title=params.title||'';
	params.formItems=params.formItems||[];
	params.width=params.width||'auto';
	params.height=params.height||'auto';
	params.titleWidth=params.titleWidth||'28%';
	params.handleSuccess=params.handleSuccess||function(){};
	params.handleOk=params.handleOk||function(){};
	params.handleCancel=params.handleCancel||function(){};
    var content='<table class="common_table_1">';
	var formItem={};
    for(var i=0;i<params.formItems.length;i++){
		formItem=params.formItems[i];
		formItem.title=formItem.title||'&nbsp;';
		formItem.required=formItem.required||false;
		content+='<tr><th width="'+params.titleWidth+'">'+(formItem.required?'<em style="color:#F00;">*</em>':'')+formItem.title+'</th><td>'+formItem.value+'</td></tr>';
    }
	content+='</table>';
	params.layer.open({
		type:1,
		area:[params.width,params.height],
		scrollbar:false,
		title:[params.title,'color:#FFF;border-bottom:none;background-color:#1492ff'],
		content:'<div class="dialog_form"><div class="body">'+content+'</div><div class="footer"><div class="error_box"></div><ul><li><input type="button" value="保存" class="btn_ok"></li><li><input type="button" value="取消" class="btn_cancel"></li></ul></div></div>',
		success: function(layero,index){
			params.handleSuccess(layero,index);
			if(params.height!='auto'){
				var body_height=$('.layui-layer-content',layero).height()-$('.footer',layero).outerHeight()-40;
				console.log($('ul.footer',layero).height());
				$('.body',layero).css({padding:'20px',height:body_height});
			}
			var width=0;
			$('.footer>ul>li',layero).each(function(i){
				width+=parseInt($(this).outerWidth());
			});
			$('.footer>ul',layero).css('width',width);
			$('.btn_ok',layero).on('click',function(){params.handleOk($('.error_box',layero),layero,index);});
			$('.btn_cancel',layero).on('click',function(){params.layer.close(index);params.handleCancel(layero,index);});
		}
		
	});
}

/*
新增/修改表单弹窗
依赖layer
params:
layer：layer对象
title：弹窗名称
content:表单内容，html字串，
width：窗体宽度，默认auto
height：窗体高度，默认auto
handleSuccess：窗体加载完成后回调
handleOk:【保存】按钮回调
handleCancel:【取消】按钮回调
*/
function fyDialogComForm(params){
	params.layer=params.layer||layer;
    params.title=params.title||'';
	params.content=params.content||'';
	params.width=params.width||'auto';
	params.height=params.height||'auto';
	params.handleSuccess=params.handleSuccess||function(){};
	params.handleOk=params.handleOk||function(){};
	params.handleCancel=params.handleCancel||function(){};
	params.layer.open({
		type:1,
		area:[params.width,params.height],
		scrollbar:false,
		title:[params.title,'color:#FFF;border-bottom:none;background-color:#1492ff'],
		content:'<div class="dialog_form"><div class="body">'+params.content+'</div><div class="footer"><div class="error_box"></div><ul><li><input type="button" value="确定" class="btn_ok"></li><li><input type="button" value="取消" class="btn_cancel"></li></ul></div></div>',
		success: function(layero,index){
			params.handleSuccess(layero,index);
			if(params.height!='auto'){
				var body_height=$('.layui-layer-content',layero).height()-$('.footer',layero).outerHeight()-50;
				//console.log($('ul.footer',layero).height());
				$('.body',layero).css({padding:'20px',height:body_height});
			}
			//确定和取消水平居中代码
			var width=0;
			$('.footer>ul>li',layero).each(function(i){
				width+=parseInt($(this).outerWidth());
			});
			$('.footer>ul',layero).css('width',width);
			$('.btn_ok',layero).on('click',function(){params.handleOk($('.error_box',layero),layero,index);});
			$('.btn_cancel',layero).on('click',function(){params.layer.close(index);params.handleCancel(layero,index);});
		}
		
	});
}

/*
新增/修改表单弹窗   在线发码 发码弹窗 
依赖layer
params:
layer：layer对象
title：弹窗名称
content:表单内容，html字串，
width：窗体宽度，默认auto
height：窗体高度，默认auto
handleSuccess：窗体加载完成后回调
handleOk:【保存】按钮回调
handleCancel:【取消】按钮回调
*/
function fyDialogCode(params){
	params.layer=params.layer||layer;
    params.title=params.title||'';
	params.content=params.content||'';
	params.width=params.width||'auto';
	params.height=params.height||'auto';
	params.handleSuccess=params.handleSuccess||function(){};
	params.handleOk=params.handleOk||function(){};
	params.handleCancel=params.handleCancel||function(){};
	params.layer.open({
		type:1,
		area:[params.width,params.height],
		scrollbar:false,
		title:[params.title,'color:#FFF;border-bottom:none;background-color:#1492ff'],
		content:'<div class="dialog_form"><div class="body">'+params.content+'</div><div class="footer"><div class="error_box" style=" margin-top:10px;"></div><ul><li><input type="button" value="保存 " class="btn_ok"></li><li><input type="button" value="取消" class="btn_cancel"></li></ul></div></div>',
		success: function(layero,index){
			params.handleSuccess(layero,index);
			if(params.height!='auto'){
				var body_height=$('.layui-layer-content',layero).height()-$('.footer',layero).outerHeight()-50;
				$('.body',layero).css({padding:'20px',height:body_height});
			}
			//确定和取消水平居中代码
			var width=0;
			$('.footer>ul>li',layero).each(function(i){
				width+=parseInt($(this).outerWidth());
			});
			$('.footer>ul',layero).css('width',width);
			$('.btn_ok',layero).on('click',function(){params.handleOk($('.error_box',layero),layero,index);});
			$('.btn_cancel',layero).on('click',function(){params.layer.close(index);params.handleCancel(layero,index);});
		}
		
	});
}

/*
新增/修改表单弹窗   按钮放到页面里面
依赖layer
params:
layer：layer对象
title：弹窗名称
content:表单内容，html字串，
width：窗体宽度，默认auto
height：窗体高度，默认auto
handleSuccess：窗体加载完成后回调
handleOk:【保存】按钮回调
handleCancel:【取消】按钮回调
*/
function fyDialogFinancial(params){
	params.layer=params.layer||layer;
    params.title=params.title||'';
	params.content=params.content||'';
	params.width=params.width||'auto';
	params.height=params.height||'auto';
	params.handleSuccess=params.handleSuccess||function(){};
	params.handleOk=params.handleOk||function(){};
	params.handleCancel=params.handleCancel||function(){};
	params.layer.open({
		type:1,
		area:[params.width,params.height],
		scrollbar:false,
		title:[params.title,'color:#FFF;border-bottom:none;background-color:#1492ff'],
		content:'<div class="dialog_form"><div class="body">'+params.content+'</div></div>',
		success: function(layero,index){
			params.handleSuccess(layero,index);
			
			/*if(params.height!='auto'){
				var body_height=$('.layui-layer-content',layero).height()-$('.footer',layero).outerHeight()-50;
				$('.body',layero).css({padding:'20px',height:body_height});
			}*/
			//确定和取消水平居中代码
			var width=0;
			$('.footer>ul>li',layero).each(function(i){
				width+=parseInt($(this).outerWidth());
			});
			$('.footer>ul',layero).css('width',width);
			$('.btn_ok',layero).on('click',function(){params.handleOk($('.error_box',layero),layero,index);});
			$('.btn_cancel',layero).on('click',function(){params.layer.close(index);params.handleCancel(layero,index);});
		}
		
	});
}



/*
详情
依赖layer
params:
layer：layer对象
title：弹窗名称
formItems:详情项[{title:名称,value:内容}...]，
width：窗体宽度，默认auto
height：窗体高度，默认auto
handleSuccess：窗体加载完成后回调
*/
function fyDialogView(params){
	params.layer=params.layer||layer;
    params.title=params.title||'';
	params.formItems=params.formItems||[];
	params.width=params.width||'auto';
	params.height=params.height||'auto';
	params.titleWidth=params.titleWidth||'28%';
	params.handleSuccess=params.handleSuccess||function(){};
    var content='<table class="common_table_1">';
	var formItem={};
    for(var i=0;i<params.formItems.length;i++){
		formItem=params.formItems[i];
		formItem.title=formItem.title||'&nbsp;';
		formItem.required=formItem.required||false;
		content+='<tr><th width="'+params.titleWidth+'">'+(formItem.required?'<em style="color:#F00;">*</em>':'')+formItem.title+'</th><td>'+formItem.value+'</td></tr>';
    }
	content+='</table>';
	params.layer.open({
		type:1,
		area:[params.width,params.height],
		scrollbar:false,
		title:[params.title,'color:#FFF;border-bottom:none;background-color:#1492ff'],
		content:'<div class="dialog_form"><div class="body">'+content+'</div></div>',
		success: function(layero,index){
			params.handleSuccess(layero,index);
			if(params.height!='auto'){
				var body_height=$('.layui-layer-content',layero).height()-40;
				$('.body',layero).css({padding:'20px',height:body_height});
			}
			var width=0;
			$('.footer>ul>li',layero).each(function(i){
				width+=parseInt($(this).outerWidth());
			});
			$('.footer>ul',layero).css('width',width);
		}
		
	});
}

/*
详情
依赖layer
params:
layer：layer对象
title：弹窗名称
content:详情html字串，
width：窗体宽度，默认auto
height：窗体高度，默认auto
handleSuccess：窗体加载完成后回调
*/
function fyDialogComView(params){
	params.layer=params.layer||layer;
    params.title=params.title||'';
	params.content=params.content||'';
	params.width=params.width||'auto';
	params.height=params.height||'auto';
	params.titleWidth=params.titleWidth||'28%';
	params.handleSuccess=params.handleSuccess||function(){};
	params.layer.open({
		type:1,
		area:[params.width,params.height],
		scrollbar:false,
		title:[params.title,'color:#FFF;border-bottom:none;background-color:#1492ff'],
		content:'<div class="dialog_form"><div class="body">'+params.content+'</div><div class="footer"><div class="error_box"></div><ul><li><input type="button" value="关闭" class="btn_cancel"></li></ul></div></div>',
		success: function(layero,index){
			params.handleSuccess(layero,index);
			if(params.height!='auto'){
				var body_height=$('.layui-layer-content',layero).height()-$('.footer',layero).outerHeight()-50;
				$('.body',layero).css({padding:'20px',height:body_height});console.log(body_height);
			}
			var width=0;
			$('.footer>ul>li',layero).each(function(i){
				width+=parseInt($(this).outerWidth());
			});
			$('.footer>ul',layero).css('width',width);
			
			$('input.btn_cancel',layero).on('click',function(){
				params.handleSuccess(layero,index);
				params.layer.close(index);
			});
		}
		
	});
}
//图片放大<img src="" width="106" height="122" id="detailImg1" class="image_view">
jQuery(function($){
	$(document).on('click','img.image_view',function(){
		var imgsrc=$(this).attr('src');
		var max_width=$(window).width()-46;
		var max_height=$(window).height()-46;
		var image=new Image();
		image.src=imgsrc;
		if(image.width>max_width){
			image.height=Math.floor((image.height/image.width)*max_width);
			image.width=max_width;
		}
		console.log(image.width+','+image.height);
		if(image.height>max_height){
			image.width=Math.floor((image.width/image.height)*max_height);
			image.height=max_height;
		}
		console.log(image.width+','+image.height);

		layer.open({
			type:1,
			title:false,
			shade:0,
			area:[image.width+'px',image.height+'px'],
			content:'<img src="'+imgsrc+'" width="'+image.width+'" height="'+image.height+'">'
		});
	});
});

//滑动门效果
$(function(){
	var aLi = $('.qy_czgl ul li');
	var aDiv = $('.qy_czgl_kj .qy_czgl_lr');
	aLi.click(function(){
		$(this).addClass('qy_czgl_mr').siblings().removeClass('qy_czgl_mr');
		var index = $(this).index();
		aDiv.eq(index).show().siblings().hide();
			
	});
});