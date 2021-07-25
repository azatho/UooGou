define("encodeUrlParams", function() {
	function t(t) {
		var e = [];
		for (var o in t) null != t[o] && e.push(o + "=" + encodeURIComponent(t[o]));
		return e.join("&")
	}
	return t
}), define("prStat", ["encodeUrlParams"], function(t, e, o) {
	function a() {
		var t = 1,
			e = navigator.userAgent,
			o = window.devicePixelRatio || 1;
		(navigator.platform.match(/iPhone|iPad|iPod/) || e.match(/Chrome/) && window.chrome || e.match(/Opera/) || e.match(
			/Firefox/) || e.match(/IEMobile/)) && (t = o), c.report("pv", {
			sw: screen.width * t,
			sh: screen.height * t,
			dpr: o
		})
	}
	var i = t("encodeUrlParams"),
		n = null,
		r = null,
		s = "",
		l = !1,
		c = {};
	return c.init = function(t) {
		if (l) throw new Error("Statistics module can not be initialized multiple times");
		t = t || {}, n = t.appId || "", r = t.statService || "//pr.map.qq.com/pingd", s = t.from || "", a(), l = !0
	}, c.report = function(t, e, o) {
		if (!n || !r) throw new Error("Statistics module is not initialized");
		o = o || function() {};
		var a = new Image(1, 1);
		a.onload = o, a.onerror = function() {
			this.onerror = null, o()
		};
		var l = {
			appid: n,
			from: s || "",
			logid: t,
			rand: Math.random()
		};
		e = e || {};
		for (var c in e) e.hasOwnProperty(c) && !l.hasOwnProperty(c) && (l[c] = e[c]);
		a.src = r + "?" + i(l)
	}, c.clickReport = function(t, e, o) {
		if (!n || !r) throw new Error("Statistics module is not initialized");
		var a = new Image(1, 1);
		a.onload = o, a.onerror = function() {
			this.onerror = null, o()
		};
		var l = {
			appid: n,
			from: s || "http://www.qq.com",
			logid: "btnclick",
			num: t,
			rand: Math.random()
		};
		e = e || {};
		for (var c in e) e.hasOwnProperty(c) && !l.hasOwnProperty(c) && (l[c] = e[c]);
		a.src = r + "?" + i(l)
	}, c.init({
		appId: "la_poiloc",
		from: ""
	}), c
}), define("scaleControl", function(t, e, o) {
	function a(t, e) {
		return 156543.04 * Math.cos(t * Math.PI / 180) / Math.pow(2, e)
	}

	function i(t, e) {
		this.dom = t, this.map = e, this.baseWidth = 50, n(this)
	}

	function n(t) {
		function e(e) {
			l(t)
		}
		qq.maps.event.addListener(t.map, "zoom_changed", e), qq.maps.event.addListener(t.map, "center_changed", e)
	}

	function r(t, e) {
		t.dom.style.width = e + "px"
	}

	function s(t, e) {
		e < 1e3 ? e += " 绫�" : e = e / 1e3 + " 鍏噷", t.dom.textContent = e
	}

	function l(t) {
		var e = a(t.map.getCenter().lat, t.map.getZoom()),
			o = t.baseWidth * e;
		o = c(o), s(t, o), r(t, o / e)
	}

	function c(t) {
		for (var e = 1; e < d.length; e++) {
			var o = (d[e] + d[e - 1]) / 2;
			if (t <= o) return d[e - 1]
		}
		return d[d.length - 1]
	}
	for (var d = [5, 10, 20, 50], p = 2; p < 7; p++) d.push(10 * d[d.length - 3]), d.push(10 * d[d.length - 3]), d.push(
		10 * d[d.length - 3]);
	return i
}), define("search", function(t, e, o) {
	function a() {
		var t = this;
		t.sugSource = $("#sugTpl").html(), t.sugTemplate = Handlebars.compile(t.sugSource), t.searchWrap = $(".search-wrap"),
			t.searchBar = $(".search-wrap .search-bar"), t.searchInput = $(".search-wrap .search-bar .keyword"), t.cancle = $(
				".cancle"), t.submit = $(".submit"), t.searchForm = $("#poiSearch"), t.clearInput = $(".clear-input"), t.suggestionWrap =
			$(".suggestion-wrap"), t.poiListUL = $(".suggestion-wrap .poi-list ul"), t.poiListLoad = $(
				".suggestion-wrap .load-wrap"), t.poiListNo = $(".suggestion-wrap .no-more-results"), t.isLoad = !1, t.NPAGE = 1,
			t.init()
	}
	return a.prototype.init = function() {
		var t = this;
		t.bindEvent(), t.initScroll()
	}, a.prototype.reset = function() {
		var t = this;
		t.searchInput.blur().val(""), t.searchWrap.addClass("init-status"), t.suggestionWrap.hide()
	}, a.prototype.clear = function() {
		var t = this;
		t.NPAGE = 1, t.poiListNo.hide(), t.poiListUL.empty()
	}, a.prototype.initScroll = function() {
		var t = this;
		t.poiScroll = new IScroll(".suggestion-wrap", {
			scrollbars: !0,
			mouseWheel: !0,
			interactiveScrollbars: !0,
			shrinkScrollbars: "scale",
			fadeScrollbars: !0,
			click: !0,
			tap: !0
		}), t.poiScroll.on("scrollEnd", function() {
			var e = t.searchWrap;
			if (!t.isLoad && e[0].scrollHeight - (e.height() - this.y) <= 10) {
				t.isLoad = !0, t.NPAGE += 1;
				var o = t.searchInput.val();
				"" != o && t.loadData(o, !0, t.NPAGE)
			}
		})
	}, a.prototype.bindEvent = function() {
		var t = this;
		t.searchInput.on("focus", function() {
			t.searchWrap.removeClass("init-status"), t.suggestionWrap.show(), t._changeStatus()
		}), t.cancle.on("click", function() {
			t.reset()
		}), t.clearInput.on("click", function() {
			t.searchInput.blur().val(""), t._showCancle()
		}), t.searchForm.on("submit", function(e) {
			e.preventDefault(), t.clear(), t.searchInput.blur();
			var o = t.searchInput.val();
			"" != o && t.loadData(o, !1, 1)
		}), t.searchInput.on("input", function(e) {
			t._changeStatus();
			var o = e.target,
				a = $.trim($(o).val());
			$.ajax({
				url: "//apis.map.qq.com/ws/place/v1/suggestion",
				type: "GET",
				dataType: "jsonp",
				jsonp: "cb",
				data: {
					region: window.locInfo.city,
					keyword: a,
					policy: getQueryStr("policy") ? getQueryStr("policy") : 0,
					output: "jsonp",
					key: getQueryStr("key")
				},
				success: function(e) {
					if (e && e.data && e.data.length) {
						t.suggestion = [];
						for (var o = 0; o < e.data.length; o++) e.data[o].location && e.data[o].location.lat && e.data[o].location
							.lng && t.suggestion.push(e.data[o]);
						var a = {
								suggestion: t.suggestion
							},
							i = t.sugTemplate(a);
						t.poiListUL.html(i), t.poiListNo.show(), t.poiScroll.refresh(), t.poiScroll.scrollTo(0, 0)
					}
					t.isLoad = !0
				}
			})
		}), t.poiListUL.on("tap", function(e) {
			var o = $(e.target).find(".poi-address").text(),
				a = $(e.target).find(".poi-title").text(),
				i = $(e.target).find(".poi-latlng").text(),
				n = $(e.target).find(".poi-city").text(),
				r = {
					addr: o,
					title: a,
					latlng: i,
					city: n,
					isChangeCenter: !0,
					isRenderList: !0
				};
			t.clear(), t.reset(), $("#iosFix").focus().blur(), $(document).trigger("E_GLOBAL_POI_CHANGED", r)
		})
	}, a.prototype.loadData = function(t, e, o) {
		var a = this;
		return a.poiListLoad.show(), $.ajax({
			url: "//apis.map.qq.com/ws/place/v1/search",
			type: "GET",
			dataType: "jsonp",
			data: {
				boundary: "region(" + window.locInfo.city + ",1)",
				page_size: 20,
				page_index: o,
				keyword: t,
				key: getQueryStr("key"),
				output: "jsonp"
			},
			success: function(t) {
				a.poiListLoad.hide(), a.render(t, e, o)
			}
		}), !0
	}, a.prototype.render = function(t, e, o) {
		var a = this;
		if (!(t && t.data && t.data.length > 0)) return t && t.data && 0 == t.data.length ? (a.poiListNo.show(), void(a.isLoad = !
			0)) : (e ? a.poiListUL.append('<p class="no-results">鑾峰彇娑堟伅鍒楄〃澶辫触</p>') : a.poiListUL.html(
			'<p class="no-results">鑾峰彇娑堟伅鍒楄〃澶辫触</p>'), void(a.isLoad = !0));
		for (var i = 0; i < t.data.length; i++) t.data[i].location && t.data[i].location.lat && t.data[i].location.lng ||
			t.data.splice(i, 1);
		var n = t.data || [],
			r = t.count,
			s = {
				list: n
			},
			l = a.sugTemplate(s),
			c = function() {
				e ? a.poiListUL.append(l) : a.poiListUL.html(l), a.poiScroll.refresh()
			};
		return o == Math.ceil(r / 20) ? (c(), a.isLoad = !0, void a.poiListNo.show()) : (a.poiListNo.hide(), c(), a.isLoad = !
			1, void 0)
	}, a.prototype._changeStatus = function() {
		var t = this;
		"" != t.searchInput.val() ? (t.cancle.addClass("hide"), t.clearInput.removeClass("hide"), t.submit.removeClass(
			"hide")) : t._showCancle()
	}, a.prototype._showCancle = function() {
		var t = this;
		t.cancle.removeClass("hide"), t.clearInput.addClass("hide"), t.submit.addClass("hide"), t.poiListUL.empty(), t.poiListNo
			.hide()
	}, a
}), define("list", function(t, e, o) {
	function a() {
		var t = this;
		t.poiSource = $("#listTpl").html(), t.poiTemplate = Handlebars.compile(t.poiSource), t.listWrap = $(".list-wrap"),
			t.poiListUL = $(".list-wrap .poi-list ul"), t.poiListLoad = $(".list-wrap .load-wrap"), t.poiListNo = $(
				".list-wrap .no-more-results"), t.activePos = $(".list-wrap #activePosition"), t.activeTitle = $(
				"#activePosition .poi-title"), t.activeAddr = $("#activePosition .poi-address"), t.activeLatlng = $(
				"#activePosition .poi-latlng"), t.activeCity = $("#activePosition .poi-city"), t.activeIcon = $(
				"#activePosition .active"), t.isLoad = !1, t.NPAGE = 1, t._init()
	}
	var i;
	return a.prototype._init = function() {
		var t = this;
		t.listWrap.css("top", $(".search-wrap").height() + $(".map-wrap").height()), t._initScroll(), t._bindEvents()
	}, a.prototype.render = function(t, e, o, a) {
		var i = this;
		i.poiListNo.hide(), i.poiScroll.scrollTo(0, 0), i._renderActivePos(t, e, o, a), i._loadData(t, !1, 1)
	}, a.prototype._bindEvents = function() {
		var t = this;
		t.poiListUL.on("tap", function(e) {
			t._listTap(e)
		}), t.activePos.on("tap", function(e) {
			t._listTap(e)
		})
	}, a.prototype._listTap = function(t) {
		if (null == i) i = (new Date).getTime();
		else {
			var e = (new Date).getTime();
			if (e - i < 100) return void(i = e);
			i = e
		}
		var o = $(t.target).find(".poi-address").text(),
			a = $(t.target).find(".poi-title").text(),
			n = $(t.target).find(".poi-latlng").text(),
			r = $(t.target).find(".poi-city").text();
		$(".active").hide(), $(t.target).find(".active")[0].style.display = "inline-block";
		var s = {
			addr: o,
			title: a,
			latlng: n,
			city: r,
			isChangeCenter: !0,
			isRenderList: !1
		};
		if (n && n.split(",").length > 2) return !1;
		if ($(document).trigger("E_GLOBAL_POI_CHANGED", s), getQueryStr("type") && 1 == getQueryStr("type")) {
			var l = s.latlng.split(",")[0],
				c = s.latlng.split(",")[1],
				d = {
					module: "locationPicker",
					latlng: new qq.maps.LatLng(l, c),
					poiaddress: s.addr,
					poiname: s.title,
					cityname: s.city
				};
			window.parent.postMessage(d, "*")
		} else {
			var p = filterXSS(decodeURIComponent(getQueryStr("backurl")));
			if (p) {
				var u = p.indexOf("?") != -1 ? "&" : "?";
				u = u + "name=" + encodeURIComponent(s.title) + "&latng=" + s.latlng + "&addr=" + encodeURIComponent(s.addr) +
					"&city=" + encodeURIComponent(s.city) + "&module=locationPicker", window.location.replace(p + u)
			}
		}
	}, a.prototype._renderActivePos = function(t, e, o, a) {
		var i = this;
		i.activeTitle.text(e), i.activeAddr.text(o), i.activeLatlng.text(t), i.activeCity.text(a), $(".active").hide()
	}, a.prototype._loadData = function(t, e, o) {
		var a = this;
		a.poiListLoad.show();
		var i = 1e3;
		return getQueryStr("radius") && getQueryStr("radius") >= 1e3 && (i = getQueryStr("radius")), $.ajax({
			url: "//apis.map.qq.com/ws/place/v1/search",
			type: "GET",
			dataType: "jsonp",
			data: {
				boundary: "nearby(" + t + "," + i + ")",
				page_size: 20,
				page_index: o,
				key: getQueryStr("key"),
				output: "jsonp"
			},
			success: function(t) {
				a.poiListLoad.hide(), a._render(t, e, o)
			}
		}), !0
	}, a.prototype._render = function(t, e, o) {
		var a = this;
		if (!(t && t.data && t.data.length > 0)) return t && t.data && 0 == t.data.length ? (a.poiListNo.show(), void(a.isLoad = !
			0)) : (e ? a.poiListUL.append('<p class="no-results">鑾峰彇娑堟伅鍒楄〃澶辫触</p>') : a.poiListUL.html(
			'<p class="no-results">鑾峰彇娑堟伅鍒楄〃澶辫触</p>'), void(a.isLoad = !0));
		for (var i = 0; i < t.data.length; i++)
			if (t.data[i].title == a.activeTitle.text()) {
				t.data.splice(i, 1);
				break
			} var n = t.count,
			r = t.data || [];
		if (getQueryStr("total") && getQueryStr("total") < t.count && (n = getQueryStr("total"), o == Math.ceil(n / 20))) {
			var s = n - 20 * (o - 1);
			s < 20 && (r = t.data.splice(0, s))
		}
		var l = {
				list: r
			},
			c = a.poiTemplate(l),
			d = function() {
				e ? a.poiListUL.append(c) : a.poiListUL.html(c), a.poiScroll.refresh()
			};
		return o == Math.ceil(n / 20) ? (d(), a.isLoad = !0, void a.poiListNo.show()) : (a.poiListNo.hide(), d(), a.isLoad = !
			1, void 0)
	}, a.prototype._initScroll = function() {
		var t = this;
		t.poiScroll = new IScroll(".list-wrap", {
			scrollbars: !0,
			mouseWheel: !0,
			interactiveScrollbars: !0,
			shrinkScrollbars: "scale",
			fadeScrollbars: !0,
			click: !0,
			tap: !0
		}), t.poiScroll.on("scrollEnd", function() {
			var e = t.listWrap;
			t.isLoad || e[0].scrollHeight - (e.height() - this.y) <= 10 && (t.isLoad = !0, t.NPAGE += 1, t._loadData(t.activeLatlng
				.text(), !0, t.NPAGE))
		})
	}, a
}), define("map", ["scaleControl", "prStat", "list"], function(t, e, o) {
	function a() {
		var t = this;
		t.mapContainer = null, t.scaleControl = null, t.markerImg = $(".marker img"), t.markerPlus = $(".marker i"), t.geoButton =
			$(".go-back-pos"), t.lock = !1, t.list = new s, t.updating = $("#updating"), t.geoFail = $("#geoFail")
	}
	var i, n = t("scaleControl"),
		r = t("prStat"),
		s = t("list"),
		l = !1;
	return a.prototype.render = function() {
		var t = this;
		t._createMap(), t._bindEvents()
	}, a.prototype._bindEvents = function() {
		var t = this;
		qq.maps.event.addListener(t.map, "center_changed", function() {
			if (t.markerPlus.show(), t.markerImg.addClass("bounceInDown"), setTimeout(function() {
					t.markerImg.removeClass("bounceInDown")
				}, 500), !t.lock) {
				var e = t.map.getCenter();
				t._geocoder(e)
			}
		}), t.geoButton.on("touchstart", function(e) {
			var o = {};
			t.updating.addClass("show"), t.updating.removeClass("hide"), document.getElementById("geoPage").contentWindow.postMessage(
				"getLocation", "*"), window.addEventListener("message", function(e) {
				var a = e.data;
				if (window.locInfo = a, t.updating.addClass("hide"), getQueryStr("coord")) window.currentLoc ? o = {
					addr: window.currentLoc.addr,
					title: "鎴戠殑浣嶇疆",
					latlng: window.currentLoc.lat + "," + window.currentLoc.lng,
					city: window.currentLoc.city,
					isChangeCenter: !0,
					isRenderList: !0
				} : alert("鎮ㄥ凡鍏抽棴GPS锛岃鍦ㄨ缃�>闅愮>浣嶇疆閲屾墦寮€");
				else if (a)
					if (l = !0, a.city) {
						o = {
							addr: window.locInfo.addr,
							title: "鎴戠殑浣嶇疆",
							latlng: window.locInfo.lat + "," + window.locInfo.lng,
							city: window.locInfo.city,
							isChangeCenter: !0,
							isRenderList: !0
						};
						var n = new qq.maps.LatLng(window.locInfo.lat, window.locInfo.lng);
						i.setPosition(n), l = !1
					} else a.cityname && (o = {
						addr: window.locInfo.poiaddress,
						title: window.locInfo.poiname,
						latlng: window.locInfo.latlng.lat + "," + window.locInfo.latlng.lng,
						city: window.locInfo.cityname,
						isChangeCenter: !0,
						isRenderList: !0
					});
				setTimeout(function() {
					a || alert("鎮ㄥ凡鍏抽棴GPS锛岃鍦ㄨ缃�>闅愮>浣嶇疆閲屾墦寮€")
				}, 8e3), $(document).trigger("E_GLOBAL_POI_CHANGED", o), t.markerPlus.hide()
			})
		})
	}, a.prototype._createMap = function() {
		var t = this,
			e = !0,
			o = !1,
			a = 15;
		getQueryStr("mapdraggable") && "0" == getQueryStr("mapdraggable") && (e = !1, o = !0), getQueryStr("zoom") &&
			getQueryStr("zoom") >= 1 && getQueryStr("zoom") <= 18 && (a = parseInt(getQueryStr("zoom")));
		var s = new qq.maps.LatLng(window.locInfo.lat, window.locInfo.lng);
		t.map = new qq.maps.Map(document.getElementById("container"), {
			draggable: e,
			disableDoubleClickZoom: o,
			center: s,
			disableDefaultUI: !0,
			zoom: a
		}), qq.maps.event.addListenerOnce(t.map, "tilesloaded", function() {
			StatTimer.stub("map_complete"), r.report("customtiming", StatTimer.data)
		}), i = new qq.maps.Marker({
			map: t.map,
			position: s
		});
		var l = new qq.maps.Point(13, 8),
			c = new qq.maps.Size(27, 27),
			d = new qq.maps.Point(0, 0),
			p = new qq.maps.Size(27, 27),
			u = new qq.maps.MarkerImage("//3gimg.qq.com/lightmap/components/locationPicker2/image/location.png
", c, d, l, p);
		i.setIcon(u), t.scaleControl = new n($("#map-info .scale")[0], t.map)
	}, a.prototype.changeCenter = function(t) {
		var e = this,
			o = t.split(",")[0],
			a = t.split(",")[1],
			i = new qq.maps.LatLng(o, a);
		e.lock = !0, e.map.panTo(i), e.lock = !1
	}, a.prototype._geocoder = function(t) {
		var e = {
			location: t.lat + "," + t.lng,
			key: getQueryStr("key"),
			output: "jsonp"
		};
		$.ajax({
			url: "//apis.map.qq.com/ws/geocoder/v1",
			type: "GET",
			dataType: "jsonp",
			data: e,
			success: function(e) {
				if(!e.result) return;var o = e.result.formatted_addresses.recommend ? e.result.formatted_addresses.recommend : e.result.address_component
					.street,
					a = e.result.address,
					i = t.lat + "," + t.lng,
					n = e.result.ad_info.city,
					r = {
						addr: a,
						title: o,
						latlng: i,
						city: n,
						isChangeCenter: !1,
						isRenderList: !0
					};
				$(document).trigger("E_GLOBAL_POI_CHANGED", r)
			}
		})
	}, a
}), define("index-6781e3253a", ["map", "list", "search"], function(t, e, o) {
	function a() {
		var t = this;
		t.map = new i, t.list = new n, t.loading = $("#loading"), t.geoFail = $("#geoFail"), t.locIllegal = $(
			"#locationIllegal"), t.refreshBtn = $("#geoFail .refresh-btn"), t.adaptParams(), t.stat(), t.init(), t.bindEvents()
	}
	var i = t("map"),
		n = t("list"),
		r = !1,
		s = !1;
	return window.updateLoc = !1, a.prototype.init = function() {
		var t = this;
		if (window.addEventListener("message", function(t) {
				var e = t.data;
				e && (window.currentLoc = e)
			}, !1), document.getElementById("geoPage").contentWindow.postMessage("getLocation", "*"), getQueryStr("coord")) {
			var e = checkAndFixCoord(getQueryStr("coord"));
			e ? t.geocoder(e) : (t.loading.addClass("hide"), t.locIllegal.removeClass("hide"))
		} else t.geoLocation();
		window.onresize = function() {
			$(".list-wrap").css("top", $(".search-wrap").height() + $(".map-wrap").height())
		}
	}, a.prototype.geoLocation = function() {
		var t = this;
		window.addEventListener("message", function(e) {
			var o = e.data;
			o && o.lat && !r && o.module && "geolocation" == o.module ? (StatTimer.stub("geolocation_succ"), window.locInfo =
					o, window.updateLoc = !0, r = !0, !o.addr && o.city && (window.locInfo.addr = window.locInfo.city), t.loading
					.addClass("hide"), t.map.render(), t.list.render(o.lat + "," + o.lng, "鎴戠殑浣嶇疆", o.addr, o.city)) : !s || o &&
				o.lat || r || (t.loading.addClass("hide"), t.geoFail.removeClass("hide"))
		}, !1), document.getElementById("geoPage").contentWindow.postMessage("getLocation", "*"), setTimeout(function() {
			window.locInfo || (s = !0, document.getElementById("geoPage").contentWindow.postMessage("getLocation.robust",
				"*"))
		}, 8e3)
	}, a.prototype.geocoder = function(t) {
		var e = this;
		$.ajax({
			url: "//apis.map.qq.com/ws/geocoder/v1?",
			type: "GET",
			dataType: "jsonp",
			jsonp: "cb",
			data: {
				location: t,
				coord_type: getQueryStr("coordtype") ? parseInt(getQueryStr("coordtype")) : 5,
				output: "jsonp",
				key: getQueryStr("key")
			},
			success: function(t) {
				t && t.result ? (e.loading.addClass("hide"), window.locInfo = {
					title: t.result.formatted_addresses && t.result.formatted_addresses.recommend ? t.result.formatted_addresses
						.recommend : t.result.address_component.street,
					addr: t.result.address,
					lat: t.result.location.lat,
					lng: t.result.location.lng,
					city: t.result.ad_info.city
				}, e.loading.addClass("hide"), e.map.render(), e.list.render(window.locInfo.lat + "," + window.locInfo.lng,
					window.locInfo.title, window.locInfo.addr, window.locInfo.city)) : (e.loading.addClass("hide"), e.locIllegal
					.removeClass("hide"))
			}
		})
	}, a.prototype.bindEvents = function() {
		var t = this;
		t.refreshBtn.on("tap", function(t) {
			window.location.reload(!0)
		}), $(document).on("E_GLOBAL_POI_CHANGED", function(e, o) {
			o.isChangeCenter && t.map.changeCenter(o.latlng), o.isRenderList && t.list.render(o.latlng, o.title, o.addr, o.city)
		})
	}, a.prototype.adaptParams = function() {
		var e = this;
		if (getQueryStr("search") && 0 == getQueryStr("search")) $(".search-wrap, .suggestion-wrap").remove(), $(
			".map-wrap").css({
			top: 0,
			height: "50%"
		}), $(".list-wrap").css("top", $(".map-wrap").height());
		else {
			var o = t("search");
			e.search = new o
		}
	}, a.prototype.stat = function() {
		var t = new Image(1, 1),
			e = getQueryStr("referer") ? getQueryStr("referer") : "myapp";
		t.src = "//pr.map.qq.com/pingd?appid=la_poiloc&logid=pv&referer=" + e
	}, a
});
