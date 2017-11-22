function valid(){
	//验证手机号码
	this.mobile=function(value){
		//num=num.replace(/\(|\)|\s+|-/g,'');
		return /^1[3|4|5|7|8]\d{9}$/i.test(value);
	};
	//验证字符是否超长
	this.isOverLength=function(value,max_length){
		return value.length>max_length?true:false;
	};
	//验证日期格式
	this.date=function(value){
		return /^[1-9]{1}\d{3}[-|\/|\.]\d{1,2}[-|\/|\.]\d{1,2}(\s+\d{1,2}:\d{1,2}(:\d{1,2})?)?$/.test(value);
	};
	//是否为空
	this.isEmpty=function(value){
		return !/\S/.test(value);
	};
	//验证邮箱格式
	this.email=function(value){
		return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
	};
	//验证金额格式
	this.price=function(value){
		return this.isEmpty(value)?false:/^[+-]?([1-9]{1}\d{0,2}(,\d{3})*(\.\d{0,2})?|[1-9]{1}\d*(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2})?)$/.test(value);
	};
	//是否为数字
	this.isNum=function(value){
		return this.isEmpty(value)?false:/^[+-]?([1-9]{1}\d{0,2}(,\d{3})*(\.\d*)?|[1-9]{1}\d*(\.\d*)?|0(\.\d*)?|(\.\d+)?)$/.test(value);
	};
	//是否为纯数字，不带小数点
	this.isInt=function(value){
		return this.isEmpty(value)?false:/^\d+$/.test(value);
	};
	//日期比较
	this.isDateBeginEnd=function(begin,end){
		if(!this.date(begin)||!this.date(end))
			return false;
		begin=new Date(begin.replace(/-|\./g,'/')).getTime();
		end=new Date(end.replace(/-|\./g,'/')).getTime();
		return begin>end?false:true;
	};
	//验证身份证号码格式
	this.idCard=function(value){
		return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}\d{16}[\dxX\*]$/.test(value);
	};
}
var valid_test=new valid();
console.log(valid_test.isNum('2'));