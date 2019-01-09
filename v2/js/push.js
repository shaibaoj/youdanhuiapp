
mui.plusReady(function () {
    var NotifyID = 1;
	var Context = plus.android.importClass("android.content.Context");
	var main = plus.android.runtimeMainActivity();
	var Noti = plus.android.importClass("android.app.Notification");
	var NotificationManager = plus.android.importClass("android.app.NotificationManager");
	var nm = main.getSystemService(Context.NOTIFICATION_SERVICE)
	var Notification = plus.android.importClass("android.app.Notification");
	var mNotification = new Notification.Builder(main);
	mNotification.setOngoing(true);
	mNotification.setContentTitle("优惠券")
	mNotification.setContentText("购物就是这么好的事情")
	mNotification.setSmallIcon(17301620)
	mNotification.setTicker("PadInfo")
	
	mNotification.setNumber(10)
	var mNb = mNotification.build()
	nm.notify(NotifyID , mNb);
})

