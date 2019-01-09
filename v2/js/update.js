
var server = app_config.url+"?action=update"; //获取升级描述文件服务器地址

function update(callback) {
	callback = callback || mui.noop;
	// 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid,function(inf){
		app_config.version_name=inf.version;
//		plus.nativeUI.toast("当前应用版本："+wgtVer);
//		console.log("当前应用版本："+wgtVer);
		update_callback(callback);
	});
}

function update_callback(callback) {
	callback = callback || mui.noop;
	mui.getJSON(server, {
		"app_id":app_config.app_id,
		"client_type":app_config.client_type,
		"appid": plus.runtime.appid,
		"version": plus.runtime.version,
		"version_name": app_config.version_name,
		"imei": plus.device.imei
	}, function(data) {
//		console.log("plus.runtime.version："+plus.runtime.version);
//		console.log("app_config.version_name："+app_config.version_name);
//		console.log("data.data.version："+data.data.version);
		if (data.data.status) {
			if(data.data.wgt_url){
				downWgt(data.data.wgt_url);
			}else{
				plus.nativeUI.confirm(data.data.note, function(event) {
					if (0 == event.index) {
						plus.runtime.openURL(data.data.url);
					}
				}, data.data.title, ["立即更新", "取　　消"]);
			}			
		}
		else{
			callback(data);
		}
	});
}

function downWgt(wgtUrl) {
//	plus.nativeUI.showWaiting("下载wgt文件...");
	plus.downloader.createDownload(wgtUrl, {
		filename: "_doc/update/"
	}, function(d, status) {
		if(status == 200) {
//			console.log("下载wgt成功：" + d.filename);
			installWgt(d.filename); // 安装wgt包
		} else {
//			console.log("下载wgt失败！");
//			plus.nativeUI.alert("下载wgt失败！");
		}
//		plus.nativeUI.closeWaiting();
	}).start();
}
// 更新应用资源
function installWgt(path) {
//	plus.nativeUI.showWaiting("安装更新文件...");
	plus.runtime.install(path, {force:true}, function() {
//		plus.nativeUI.closeWaiting();
//		console.log("安装wgt文件成功！");
//		plus.nativeUI.alert("应用资源更新完成！", function() {
			plus.runtime.restart();
//		});
	}, function(e) {
//		plus.nativeUI.closeWaiting();
//		console.log("安装更新文件失败[" + e.code + "]：" + e.message);
//		plus.nativeUI.alert("安装更新文件失败[" + e.code + "]：" + e.message);
	});
}