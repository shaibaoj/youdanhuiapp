
(function($, owner) {

	owner.set_txt = function(page_id){
		try {
			　　// 此处是可能产生例外的语句
			if(page_id=='index'){
				document.querySelector("#kuaibao_txt").innerHTML = '优惠线报';
				document.querySelector("#search_txt").innerHTML = '搜优惠';
				document.querySelector("#jiu_txt").innerHTML = '9块9';
				document.querySelector("#footer_home_txt").innerHTML = '精选';
				document.querySelector("#footer_kuaibao_txt").innerHTML ='优惠线';
				document.querySelector("#foot_search_txt").innerHTML = '搜优惠';
				document.querySelector("#foot_99_txt").innerHTML = '9块9';
				document.querySelector("#foot_member_txt").innerHTML = '我的';
				document.querySelector("#search-key").placeholder = '搜宝贝';
				
				document.querySelector("#btn-check-in").classList.add("no_icon");
				
				document.querySelector("#footer_home_icon").classList.add("no_icon");
				document.querySelector("#footer_kuaibao_icon").classList.add("no_icon");
				document.querySelector("#foot_search_icon").classList.add("no_icon");
				document.querySelector("#foot_99_icon").classList.add("no_icon");
				document.querySelector("#foot_member_icon").classList.add("no_icon");
			}
			else if(page_id=='tab-home'){
				document.querySelector("#home_goods_txt").innerHTML = '先领券 后购物';
			}
			else if(page_id=='tab-member'){
				document.querySelector("#user_name").innerHTML = '未登录';
				document.querySelector("#yuer_txt").innerHTML = '余额';
				document.querySelector("#jifen_keyong_txt").innerHTML = '可用积分';
				document.querySelector("#jifen_txt").innerHTML = '预估积分';
				document.querySelector("#leijiyugu_txt").innerHTML = '累计预估';
				document.querySelector("#my_order_txt").innerHTML = '我的订单';
				document.querySelector("#my_shaidan_txt").innerHTML = '晒单奖励';
				document.querySelector("#my_jifenduihuan_txt").innerHTML = '积分兑换';
				document.querySelector("#my_soucang_txt").innerHTML = '搜藏';
				document.querySelector("#my_yaoqing_txt").innerHTML = '邀请';
				document.querySelector("#my_hehuoren_txt").innerHTML = '合伙人';
				document.querySelector("#my_gouwuche_txt").innerHTML = '淘宝购物车';
				
				document.querySelector("#my_xiaoxi_icon").classList.add("no_icon");
				document.querySelector("#my_shezhi_icon").classList.add("no_icon");
				
				document.querySelector("#my_order_icon").classList.add("no_icon");
				document.querySelector("#my_shaidan_icon").classList.add("no_icon");			
				document.querySelector("#my_jifenduihuan_icon").classList.add("no_icon");		
				document.querySelector("#my_soucang_icon").classList.add("no_icon");		
				document.querySelector("#my_yaoqing_icon").classList.add("no_icon");		
				document.querySelector("#my_hehuoren_icon").classList.add("no_icon");		
				document.querySelector("#my_gouwuche_icon").classList.add("no_icon");
				
			}
			else if(page_id=='member/agent'){
				document.querySelector("#agent_txt").innerHTML = '合伙人';
			}
			else if(page_id=='member/invite'){
				document.querySelector("#invite_img").src="https://res1.huopinjie.com/app/images/invite/shf_bg_01.png";
				document.querySelector("#invite_title_txt").innerHTML = '邀请';
				document.querySelector("#yaoqing_btn_txt").innerHTML = '邀请好友赢奖励';
			}
			else if(page_id=='tab-search'){
				document.querySelector("#search_cid1").src="images/search/qjt_type1.png?v=2";
				document.querySelector("#search_cid2").src="images/search/qjt_type2.png?v=2";
				document.querySelector("#search_cid3").src="images/search/qjt_type3.png?v=2";
				document.querySelector("#search_cid4").src="images/search/qjt_type4.png?v=2";
				document.querySelector("#search_cid5").src="images/search/qjt_type5.png?v=2";
				document.querySelector("#search_cid6").src="images/search/qjt_type6.png?v=2";
			}
	　　} catch(error) {
	　　// 此处是负责例外处理的语句
	　　}
	}
	
}(mui, window.app_cn = {}));