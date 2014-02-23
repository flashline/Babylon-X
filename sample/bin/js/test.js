(function () { "use strict";
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var Test = function() {
	var _g = this;
	var noop = function () {} ;
	for (var i in Array.prototype) Array.prototype[i].prepare = noop ;
	this.goCamEnable = false;
	this.backCamEnable = false;
	this.leftCamEnable = false;
	this.rightCamEnable = false;
	this.upCamEnable = false;
	this.downCamEnable = false;
	this.leftRotCamEnable = false;
	this.rightRotCamEnable = false;
	this.upRotCamEnable = false;
	this.downRotCamEnable = false;
	this.canvas = js.Boot.__cast(js.Browser.document.getElementById("renderCanvas") , HTMLCanvasElement);
	var control = js.Browser.document.getElementById("control");
	if(!BABYLON.Engine.isSupported()) control.innerHTML = "<h1 style='text-align:center' >WEBGL is NOT supported ! </h1>"; else {
		this.localDirection = BABYLON.Vector3.Zero();
		this.transformedDirection = BABYLON.Vector3.Zero();
		this.cameraTransformMatrix = BABYLON.Matrix.Zero();
		var goCam = js.Browser.document.getElementById("goCam");
		var backCam = js.Browser.document.getElementById("backCam");
		var leftCam = js.Browser.document.getElementById("leftCam");
		var rightCam = js.Browser.document.getElementById("rightCam");
		var upCam = js.Browser.document.getElementById("upCam");
		var downCam = js.Browser.document.getElementById("downCam");
		var leftRotCam = js.Browser.document.getElementById("leftRotCam");
		var rightRotCam = js.Browser.document.getElementById("rightRotCam");
		var upRotCam = js.Browser.document.getElementById("upRotCam");
		var downRotCam = js.Browser.document.getElementById("downRotCam");
		this.engine = new BABYLON.Engine(this.canvas,true);
		this.scene = new BABYLON.Scene(this.engine);
		this.camera = new BABYLON.FreeCamera("Camera",new BABYLON.Vector3(0,0,0),this.scene);
		this.camera.attachControl(this.canvas);
		new BABYLON.PointLight("Omni0",new BABYLON.Vector3(0,100,100),this.scene);
		var sphere = BABYLON.Mesh.CreateSphere("Sphere",16,3,this.scene);
		var sphere2 = sphere.clone("Sphere2");
		var sphere3 = sphere.clone("Sphere3");
		var sphere4 = sphere.clone("Sphere4");
		sphere.position.x = 3;
		sphere2.position.x = -2;
		sphere3.position.x = 8;
		sphere4.position.x = -8;
		sphere.position.z = 3;
		sphere2.position.z = 4;
		sphere3.position.z = -6;
		sphere4.position.z = -8;
		var box = BABYLON.Mesh.CreateBox("Box",1.0,this.scene);
		box.position = new BABYLON.Vector3(0,-2,2);
		box.parent = sphere;
		var renderLoop = function() {
			_g.scene.render();
		};
		this.engine.runRenderLoop(renderLoop);
		var alpha = Math.PI / 1024;
		var m = 0;
		sphere.scaling.x = 1.2;
		sphere.scaling.z = 1.3;
		sphere2.scaling.x = 0.6;
		sphere2.scaling.z = 0.6;
		sphere2.scaling.y = 0.6;
		sphere3.scaling.x = 0.3;
		sphere3.scaling.z = 0.3;
		sphere3.scaling.y = 0.3;
		this.scene.beforeRender = function() {
			sphere.rotation.y += alpha;
			box.rotation.x += alpha * .5;
			_g.onClock();
		};
		var material = new BABYLON.StandardMaterial("default",this.scene);
		material.diffuseTexture = new BABYLON.Texture("asset/material.transpa.png",this.scene);
		material.emissiveColor = new BABYLON.Color3(0.5,0.3,0.3);
		material.diffuseTexture.hasAlpha = true;
		material.specularColor = new BABYLON.Color3(12,10,10);
		material.specularPower = 256;
		material.backFaceCulling = false;
		var material2 = material.clone("material2");
		var material3 = material.clone("material3");
		var material4 = material.clone("material4");
		material2.emissiveColor = new BABYLON.Color3(0.3,0.5,0.3);
		material3.emissiveColor = new BABYLON.Color3(0.3,0.3,0.5);
		material4.emissiveColor = new BABYLON.Color3(0.5,0.3,0.5);
		material.diffuseTexture.hasAlpha = false;
		sphere.material = material;
		sphere2.material = material2;
		sphere3.material = material3;
		sphere4.material = material4;
		var boxmat = new BABYLON.StandardMaterial("boxmat",this.scene);
		boxmat.diffuseTexture = new BABYLON.Texture("asset/clo.jpg",this.scene);
		box.material = boxmat;
		goCam.addEventListener("mousedown",$bind(this,this.onGoCamMouseDown),false);
		goCam.addEventListener("mouseup",$bind(this,this.onGoCamMouseUp),false);
		backCam.addEventListener("mousedown",$bind(this,this.onBackCamMouseDown),false);
		backCam.addEventListener("mouseup",$bind(this,this.onBackCamMouseUp),false);
		leftCam.addEventListener("mousedown",$bind(this,this.onLeftCamMouseDown),false);
		leftCam.addEventListener("mouseup",$bind(this,this.onLeftCamMouseUp),false);
		rightCam.addEventListener("mousedown",$bind(this,this.onRightCamMouseDown),false);
		rightCam.addEventListener("mouseup",$bind(this,this.onRightCamMouseUp),false);
		upCam.addEventListener("mousedown",$bind(this,this.onUpCamMouseDown),false);
		upCam.addEventListener("mouseup",$bind(this,this.onUpCamMouseUp),false);
		downCam.addEventListener("mousedown",$bind(this,this.onDownCamMouseDown),false);
		downCam.addEventListener("mouseup",$bind(this,this.onDownCamMouseUp),false);
		leftRotCam.addEventListener("mousedown",$bind(this,this.onLeftRotCamMouseDown),false);
		leftRotCam.addEventListener("mouseup",$bind(this,this.onLeftRotCamMouseUp),false);
		rightRotCam.addEventListener("mousedown",$bind(this,this.onRightRotCamMouseDown),false);
		rightRotCam.addEventListener("mouseup",$bind(this,this.onRightRotCamMouseUp),false);
		upRotCam.addEventListener("mousedown",$bind(this,this.onUpRotCamMouseDown),false);
		upRotCam.addEventListener("mouseup",$bind(this,this.onUpRotCamMouseUp),false);
		downRotCam.addEventListener("mousedown",$bind(this,this.onDownRotCamMouseDown),false);
		downRotCam.addEventListener("mouseup",$bind(this,this.onDownRotCamMouseUp),false);
	}
};
Test.__name__ = true;
Test.main = function() {
	new Test();
}
Test.prototype = {
	onDownRotCamDoIt: function(e) {
		this.camera.cameraRotation.x = 0.01;
	}
	,onUpRotCamDoIt: function(e) {
		this.camera.cameraRotation.x = -0.01;
	}
	,onRightRotCamDoIt: function(e) {
		this.camera.cameraRotation.y = Math.PI / 128;
	}
	,onLeftRotCamDoIt: function(e) {
		this.camera.cameraRotation.y = -Math.PI / 128;
	}
	,translate: function(v3) {
		this.localDirection.copyFromFloats(v3.x,v3.y,v3.z);
		BABYLON.Matrix.RotationYawPitchRollToRef(this.camera.rotation.y,this.camera.rotation.x,0,this.cameraTransformMatrix);
		BABYLON.Vector3.TransformCoordinatesToRef(this.localDirection,this.cameraTransformMatrix,this.transformedDirection);
		this.camera.cameraDirection.addInPlace(this.transformedDirection);
	}
	,onDownCamDoIt: function(e) {
		this.translate(new BABYLON.Vector3(0,-0.03,0));
	}
	,onUpCamDoIt: function(e) {
		this.translate(new BABYLON.Vector3(0,0.03,0));
	}
	,onRightCamDoIt: function(e) {
		this.translate(new BABYLON.Vector3(0.03,0,0));
	}
	,onLeftCamDoIt: function(e) {
		this.translate(new BABYLON.Vector3(-0.03,0,0));
	}
	,onBackCamDoIt: function(e) {
		this.translate(new BABYLON.Vector3(0,0,-0.05));
	}
	,onGoCamDoIt: function(e) {
		this.translate(new BABYLON.Vector3(0,0,0.05));
	}
	,onDownRotCamMouseUp: function(e) {
		this.downRotCamEnable = false;
	}
	,onDownRotCamMouseDown: function(e) {
		this.downRotCamEnable = true;
	}
	,onUpRotCamMouseUp: function(e) {
		this.upRotCamEnable = false;
	}
	,onUpRotCamMouseDown: function(e) {
		this.upRotCamEnable = true;
	}
	,onRightRotCamMouseUp: function(e) {
		this.rightRotCamEnable = false;
	}
	,onRightRotCamMouseDown: function(e) {
		this.rightRotCamEnable = true;
	}
	,onLeftRotCamMouseUp: function(e) {
		this.leftRotCamEnable = false;
	}
	,onLeftRotCamMouseDown: function(e) {
		this.leftRotCamEnable = true;
	}
	,onDownCamMouseUp: function(e) {
		this.downCamEnable = false;
	}
	,onDownCamMouseDown: function(e) {
		this.downCamEnable = true;
	}
	,onUpCamMouseUp: function(e) {
		this.upCamEnable = false;
	}
	,onUpCamMouseDown: function(e) {
		this.upCamEnable = true;
	}
	,onRightCamMouseUp: function(e) {
		this.rightCamEnable = false;
	}
	,onRightCamMouseDown: function(e) {
		this.rightCamEnable = true;
	}
	,onLeftCamMouseUp: function(e) {
		this.leftCamEnable = false;
	}
	,onLeftCamMouseDown: function(e) {
		this.leftCamEnable = true;
	}
	,onBackCamMouseUp: function(e) {
		this.backCamEnable = false;
	}
	,onBackCamMouseDown: function(e) {
		this.backCamEnable = true;
	}
	,onGoCamMouseUp: function(e) {
		this.goCamEnable = false;
	}
	,onGoCamMouseDown: function(e) {
		this.goCamEnable = true;
	}
	,onClock: function() {
		var e = null;
		if(this.goCamEnable) this.onGoCamDoIt(e);
		if(this.backCamEnable) this.onBackCamDoIt(e);
		if(this.leftCamEnable) this.onLeftCamDoIt(e);
		if(this.rightCamEnable) this.onRightCamDoIt(e);
		if(this.upCamEnable) this.onUpCamDoIt(e);
		if(this.downCamEnable) this.onDownCamDoIt(e);
		if(this.leftRotCamEnable) this.onLeftRotCamDoIt(e);
		if(this.rightRotCamEnable) this.onRightRotCamDoIt(e);
		if(this.upRotCamEnable) this.onUpRotCamDoIt(e);
		if(this.downRotCamEnable) this.onDownRotCamDoIt(e);
	}
	,__class__: Test
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Browser = function() { }
js.Browser.__name__ = true;
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
js.Browser.document = typeof window != "undefined" ? window.document : null;
Test.main();
})();
