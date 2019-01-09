;function UserInfo(){
};

//清除登录信息
UserInfo.clear = function(){
    plus.storage.removeItem('username');
    plus.storage.removeItem('password');
    plus.storage.removeItem('token');
    plus.storage.removeItem('imgurl');
}

//检查是否包含自动登录的信息
UserInfo.auto_login = function(){
    var username = UserInfo.username();
    var pwd = UserInfo.password();
    if(!username || !pwd){
        return false;
    }
    return true;
}

//检查是否已登录
UserInfo.has_login = function(){
    var username = UserInfo.username();
    var pwd = UserInfo.password();
    var token = UserInfo.token();
    if(!username || !token){
        return false;
    }
    return true;
};

UserInfo.username = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('username');        
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('username');
        return;
    }
    plus.storage.setItem('username', arguments[0]);
};

UserInfo.password = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('password');        
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('password');
        return;
    }
    plus.storage.setItem('password', arguments[0]);
};

UserInfo.token = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('token');       
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('token');
        return;
    }
    plus.storage.setItem('token', arguments[0]);
};

UserInfo.imgurl = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('imgurl');        
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('imgurl');
        return;
    }
    plus.storage.setItem('imgurl', arguments[0]);
};

(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback,callback_err) {
		callback = callback || $.noop;
		callback_err = callback_err || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';

		$.web_query('get_token', {user_name:loginInfo.account,passwd:loginInfo.password}, function(data){
			if(data.data.token){
				UserInfo.username(loginInfo.account);
				UserInfo.password(loginInfo.password);
				UserInfo.token(data.data.token);
				UserInfo.imgurl(data.data.imgurl);
				plus.nativeUI.toast('登录成功');
			}else{
				plus.nativeUI.toast('登录失败');
			}
			callback(data);
		}, function(status,status_err){
			callback_err(status);
			switch(status){
			    case 2:
			        plus.nativeUI.toast(status_err, {verticalAlign: 'center'});
			        break;
			    default:
			    		plus.nativeUI.toast(status_err, {verticalAlign: 'center'});
			        break;
		    }
		}, 3);
	};
	
	owner.is_login = function(success_callback,callback) {
		success_callback = success_callback || $.noop;
		callback = callback || $.noop;
		if(UserInfo.has_login()){
			success_callback();
		}else{
			callback();
		}
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'youdanhui' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
	
	owner.login_auth = function(auth_id,authInfo,userInfo, callback,callback_err) {
		callback = callback || $.noop;
		callback_err = callback_err || $.noop;

		auth_id = auth_id || '';
		openid = authInfo.openid || '';
		access_token = authInfo.access_token || '';
		expires_in = authInfo.expires_in || '';
		refresh_token = authInfo.refresh_token || '';
		scope = authInfo.scope || '';
		headimgurl = userInfo.headimgurl || '';
		nickname = userInfo.nickname || '';
		email = userInfo.email || '';
		phonenumber = userInfo.phonenumber || '';
		sex = userInfo.sex || '';
		province = userInfo.province || '';
		city =userInfo.city || '';
		country = userInfo.country || '';
		
		$.web_query('auth', {auth_id:auth_id,openid:openid
			,access_token:access_token
			,expires_in:expires_in
			,refresh_token:refresh_token
			,scope:scope
			,headimgurl:headimgurl
			,nickname:nickname
			,email:email
			,phonenumber:phonenumber
			,sex:sex
			,province:province
			,city:city
			,country:country
		}, function(data){
			if(data.data.auth_info&&data.data.auth_info.id){
				callback(data.data);
			}
		}, function(status,status_err){
			callback_err(status);
		}, 3);
	};
	
	owner.login_auth_id = function(auth_info, callback,callback_err) {
		callback = callback || $.noop;
		callback_err = callback_err || $.noop;
		auth_info = auth_info || {};
		auth_id = auth_info.auth_id || '';
		openid = auth_info.openid || '';

		$.web_query('get_auth', {auth_id:auth_id,openid:openid}, function(data){
			if(data.data.token){
				UserInfo.username(data.data.user_name);
				UserInfo.token(data.data.token);
				UserInfo.imgurl(data.data.imgurl);
				plus.nativeUI.toast('登录成功');
				callback(data);
			}else{
				callback_err(auth_info);
			}
		}, function(status,status_err){
			callback_err(status);
			switch(status){
			    case 2:
			        plus.nativeUI.toast(status_err, {verticalAlign: 'center'});
			        break;
			    default:
			    		plus.nativeUI.toast(status_err, {verticalAlign: 'center'});
			        break;
		    }
		}, 3);
	};
	
	owner.openWV=function(id,extras,url){
	    $.openWindow({
	        id:id,
	        url:url||id,
	        extras:extras,
	        show: {
	            autoShow:true,
	            aniShow: 'pop-in',
	            duration:300
	        },
	        waiting: {
	            autoShow: false
	        }
	    });
	}
	
	owner.online = function(){
	   $.web_query('online', {vendor:plus.device.vendor,model:plus.device.model}, null, null, 3);
	}
	
	owner.set_status_bar = function(color){
		if(color&&plus&&plus.navigator){
			plus.navigator.setStatusBarBackground(color);
		}
	}
	
}(mui, window.app = {}));

(function($, doc) {
	$.plusReady(function() {
		$.preload({
		    url: 'login.html',
		    id: 'login.html',
		    styles: {}
		});
	});
}(mui, document));

;mui.web_query = function(func_url, params, onSuccess, onError, retry){
    var onSuccess = arguments[2]?arguments[2]:function(){};
    var onError = arguments[3]?arguments[3]:function(){};
    var retry = arguments[4]?arguments[4]:3;
    func_url = app_config.url +"?action="+ func_url;
    mui.extend(params,{app_id:app_config.app_id});
    if(plus&&plus.storage&&UserInfo.token()){
    		mui.extend(params,{token:UserInfo.token()});
    }
    if(plus&&plus.push&&plus.push.getClientInfo()&&plus.push.getClientInfo().clientid){
    		mui.extend(params,{client_id:plus.push.getClientInfo().clientid});
    		mui.extend(params,{client_token:plus.push.getClientInfo().token});
    }
    
    var now_time = new Date().getTime();
    mui.ajax(func_url, {
        data:params,
        dataType:'json',
        type:'post',
        timeout:30000,
        success:function(data){
            if(data.info.status === 1){
                onSuccess(data);
            }
            else if(data.info.status === 3){
            		
            }
            else if(data.info.status === -1){
                retry--;
                return mui.web_query(func_url, params, onSuccess, onError, retry);
            }
            else{
                onError(data.info.status,data.info.status_err);
            }
        },
        error:function(xhr,type,errorThrown){
            retry--;
            if(retry > 0) return mui.web_query(func_url, params, onSuccess, onError, retry);
            onError(2,'网络不稳定,请重试');
        }, 
		headers:{
			"Access-Control-Allow-Headers":"X-Requested-With", 
			"app_id":app_config.app_id,
			"time":now_time,
			"url_sign":md5(app_config.app_id+now_time),
		}
    })
};
/*  -1 非法请求
 *  1 成功
 *  2 网络不稳定
 *  3 未登录
 *  
 */


;mui.web_query_ok = function(func_url, params, onSuccess, onError, retry){
    var onSuccess = arguments[2]?arguments[2]:function(){};
    var onError = arguments[3]?arguments[3]:function(){};
    var retry = arguments[4]?arguments[4]:3;
    func_url = app_config.ok_domain+ func_url;
    mui.extend(params,{app_id:app_config.app_id});
    if(plus&&plus.storage&&UserInfo.token()){
    		mui.extend(params,{token:UserInfo.token()});
    }
    if(plus&&plus.push&&plus.push.getClientInfo()&&plus.push.getClientInfo().clientid){
    		mui.extend(params,{client_id:plus.push.getClientInfo().clientid});
    		mui.extend(params,{client_token:plus.push.getClientInfo().token});
    }

    var now_time = new Date().getTime();
    mui.ajax(func_url, {
        data:params,
        dataType:'json',
        type:'post',
        timeout:10000,
        success:function(data){
            if(data.info.status === 0){
                onSuccess(data);
            }
            else if(data.info.status === 3){
            		
            }
            else if(data.info.status === -1){
                retry--;
                return mui.web_query_ok(func_url, params, onSuccess, onError, retry);
            }
            else{
                onError(data.info.status,data.info.status_err);
            }
        },
        error:function(xhr,type,errorThrown){
            retry--;
            if(retry > 0) return mui.web_query_ok(func_url, params, onSuccess, onError, retry);
            onError(2,'网络不稳定,请重试');
        }, 
		headers:{
			"Access-Control-Allow-Headers":"X-Requested-With", 
			"app_id":app_config.app_id,
			"time":now_time,
			"url_sign":md5(app_config.app_id+now_time),
		}
    })
};

;mui.web_query_http = function(func_url, params, onSuccess, onError, retry){
    var onSuccess = arguments[2]?arguments[2]:function(){};
    var onError = arguments[3]?arguments[3]:function(){};
    var retry = arguments[4]?arguments[4]:3;
//  mui.extend(params,{app_id:app_config.app_id});
//  if(plus&&plus.storage&&UserInfo.token()){
//  		mui.extend(params,{token:UserInfo.token()});
//  }
//  if(plus&&plus.push&&plus.push.getClientInfo()&&plus.push.getClientInfo().clientid){
//  		mui.extend(params,{client_id:plus.push.getClientInfo().clientid});
//  		mui.extend(params,{client_token:plus.push.getClientInfo().token});
//  }

    var now_time = new Date().getTime();
    mui.ajax(func_url, {
        data:params,
        dataType:'json',
        type:'GET',
        timeout:10000,
        success:function(data){
        		onSuccess(data);
//          if(data.info.status === 0){
//              onSuccess(data);
//          }
//          else if(data.info.status === 3){
//          		
//          }
//          else if(data.info.status === -1){
//              retry--;
//              return mui.web_query_http(func_url, params, onSuccess, onError, retry);
//          }
//          else{
//              onError(data.info.status,data.info.status_err);
//          }
        },
        error:function(xhr,type,errorThrown){
            retry--;
            if(retry > 0) return mui.web_query_http(func_url, params, onSuccess, onError, retry);
            onError(2,'网络不稳定,请重试');
        }, 
		headers:{
			"Access-Control-Allow-Headers":"X-Requested-With", 
			"app_id":app_config.app_id,
			"time":now_time,
			"url_sign":md5(app_config.app_id+now_time),
		}
    })
};
