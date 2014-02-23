/**
* Test app root package
*/
package;
/**
* classes imports
*/
import babylonx.cameras.ArcRotateCamera;
import babylonx.cameras.FreeCamera;
import babylonx.Engine;
import babylonx.lights.PointLight;
import babylonx.materials.Material;
import babylonx.materials.StandardMaterial;
import babylonx.materials.textures.Texture;
import babylonx.mesh.Mesh;
import babylonx.Scene;
import babylonx.tools.math.Color3;
import babylonx.tools.math.Matrix;
import babylonx.tools.math.Vector3;
import babylonx.tools.Tools;
import haxe.Timer;
import js.Browser;
import js.html.Element;
import js.html.CanvasElement;
/**
* root class
*/
class Test  {
	var engine:Engine;
	var scene:Scene;
	var renderLoop:Dynamic;
	var camera2:ArcRotateCamera;
	var camera:FreeCamera;
	var canvas:CanvasElement;
	var localDirection:Vector3 ;
    var transformedDirection:Vector3 ;
	var cameraTransformMatrix:Matrix;
	//translations
	var goCamEnable:Bool;
	var backCamEnable:Bool;
	var leftCamEnable:Bool;
	var rightCamEnable:Bool;
	var upCamEnable:Bool;
	var downCamEnable:Bool;
	//rotations
	var leftRotCamEnable:Bool;
	var rightRotCamEnable:Bool;
	var upRotCamEnable:Bool;
	var downRotCamEnable:Bool;
	
	public function new () {	
		// bug incompability btween babylon/haxe
		untyped __js__ ("var noop = function () {} ");
		untyped __js__ ("for (var i in Array.prototype) Array.prototype[i].prepare = noop ");
		//
		//translations
		goCamEnable = false;
		backCamEnable = false;
		leftCamEnable = false;
		rightCamEnable = false;
		upCamEnable = false;
		downCamEnable = false;		
		//rotations
		leftRotCamEnable = false;
		rightRotCamEnable = false;
		upRotCamEnable = false;
		downRotCamEnable = false;
		//
		canvas = cast(Browser.document.getElementById("renderCanvas"),CanvasElement);
		var control:Element = Browser.document.getElementById("control");
		if (!Engine.isSupported()) {
			control.innerHTML = "<h1 style='text-align:center' >WEBGL is NOT supported ! </h1>";
		} else {
			//Browser.alert("WEBGL is SUPPORTED ! ");
			// used to translations
			localDirection= Vector3.Zero();
			transformedDirection = Vector3.Zero();
			cameraTransformMatrix = Matrix.Zero();
			//translations		
			var goCam = untyped Browser.document.getElementById("goCam");
			var backCam = untyped Browser.document.getElementById("backCam");
			var leftCam = untyped Browser.document.getElementById("leftCam");
			var rightCam = untyped Browser.document.getElementById("rightCam");
			var upCam = untyped Browser.document.getElementById("upCam");
			var downCam = untyped Browser.document.getElementById("downCam");
			//rotations
			var leftRotCam = untyped Browser.document.getElementById("leftRotCam");
			var rightRotCam = untyped Browser.document.getElementById("rightRotCam");
			var upRotCam = untyped Browser.document.getElementById("upRotCam");
			var downRotCam = untyped Browser.document.getElementById("downRotCam");
			
			engine = new Engine(canvas, true);
			scene = new Scene(engine);			
			//scene.collisionsEnabled = true;
			//scene.gravity = new Vector3(0, -9, 0);
			camera = new FreeCamera("Camera", new Vector3(0, 0, 0), scene);
			//camera2 = new ArcRotateCamera("ArcRotateCamera", Math.PI/8, Math.PI/2, 20, Vector3.Zero(), scene);
			//scene.activeCamera = camera2;
			//camera2.attachControl(canvas);
			camera.attachControl(canvas);
			/*
			camera.checkCollisions = true;
			camera.applyGravity = true;
			camera.ellipsoid = new Vector3(0.5, 1, 0.5);
			camera.keysUp.push(90); // Z
            camera.keysDown.push(83); // S
            camera.keysLeft.push(65); // A
            ca*/
			new PointLight("Omni0", new Vector3(0, 100, 100), scene);
			
			var sphere = Mesh.CreateSphere("Sphere", 16, 3, scene);
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
			// child of
			var box:Mesh = Mesh.CreateBox("Box", 1.0, scene);
			box.position = new Vector3(0, -2, 2);
			box.parent = sphere;
			// 
			var renderLoop = function () {scene.render(); };
			engine.runRenderLoop(renderLoop);
			//engine.stopRenderLoop();
			// END THAT/OR
			//
			//
			
			var alpha:Float = Math.PI/1024;
			var m:Int = 0;
			sphere.scaling.x = 1.2;
			sphere.scaling.z = 1.3;
			sphere2.scaling.x = 0.6;
			sphere2.scaling.z = 0.6;
			sphere2.scaling.y = 0.6;
			sphere3.scaling.x = 0.3;
			sphere3.scaling.z = 0.3;
			sphere3.scaling.y = 0.3;
			scene.beforeRender = function() {
				sphere.rotation.y += alpha;
				box.rotation.x += alpha*.5;
				onClock();
			};
			//
			// texture
			//
			// Material
			var material:StandardMaterial = new StandardMaterial("default", scene);
			material.diffuseTexture = new Texture("asset/material.transpa.png", scene);
			material.emissiveColor = new Color3 (0.5, 0.3, 0.3);
			material.diffuseTexture.hasAlpha = true;
			material.specularColor = new Color3(12,10,10);
			material.specularPower = 256;
			material.backFaceCulling = false;
			var material2 = material.clone("material2");
			var material3 = material.clone("material3");
			var material4 = material.clone("material4");
			material2.emissiveColor = new Color3 (0.3, 0.5, 0.3);
			material3.emissiveColor = new Color3 (0.3, 0.3, 0.5);
			material4.emissiveColor = new Color3 (0.5, 0.3, 0.5);
			material.diffuseTexture.hasAlpha = false;
			
			sphere.material = material;
			sphere2.material = material2;
			sphere3.material = material3;
			sphere4.material = material4;
			// box mat
			var boxmat:StandardMaterial = new StandardMaterial("boxmat", scene);
			boxmat.diffuseTexture = new Texture("asset/clo.jpg", scene);
			//boxmat.specularColor = new Color3(12,10,10);
			box.material = boxmat;
			
			// translations
			goCam.addEventListener("mousedown", onGoCamMouseDown, false);
			goCam.addEventListener("mouseup", onGoCamMouseUp, false);
			backCam.addEventListener("mousedown", onBackCamMouseDown, false);
			backCam.addEventListener("mouseup", onBackCamMouseUp, false);
			leftCam.addEventListener("mousedown", onLeftCamMouseDown, false);
			leftCam.addEventListener("mouseup", onLeftCamMouseUp, false);
			rightCam.addEventListener("mousedown", onRightCamMouseDown, false);
			rightCam.addEventListener("mouseup", onRightCamMouseUp, false);
			upCam.addEventListener("mousedown", onUpCamMouseDown, false);
			upCam.addEventListener("mouseup", onUpCamMouseUp, false);
			downCam.addEventListener("mousedown", onDownCamMouseDown, false);
			downCam.addEventListener("mouseup", onDownCamMouseUp, false);
			
			// rotations
			leftRotCam.addEventListener("mousedown", onLeftRotCamMouseDown , false);
			leftRotCam.addEventListener("mouseup", onLeftRotCamMouseUp , false);
			rightRotCam.addEventListener("mousedown", onRightRotCamMouseDown, false);
			rightRotCam.addEventListener("mouseup", onRightRotCamMouseUp, false);			
			upRotCam.addEventListener("mousedown", onUpRotCamMouseDown, false);
			upRotCam.addEventListener("mouseup", onUpRotCamMouseUp, false);
			downRotCam.addEventListener("mousedown", onDownRotCamMouseDown, false);
			downRotCam.addEventListener("mouseup", onDownRotCamMouseUp, false);
			
			
			
			
		}
	}
    //function onClock (e) { 
	function onClock () { 
		var e=null;
		//translations
		if (goCamEnable) {
			onGoCamDoIt(e);
		}	
		if (backCamEnable) {
			onBackCamDoIt(e);
		}			
		if (leftCamEnable) {
			onLeftCamDoIt (e);
		}
		if (rightCamEnable) {
			onRightCamDoIt (e);
		}
		if (upCamEnable) {
			onUpCamDoIt (e);
		}
		if (downCamEnable) {
			onDownCamDoIt (e);
		}
		// rotations
		if (leftRotCamEnable) {
			onLeftRotCamDoIt (e);
		}	
		if (rightRotCamEnable) {
			onRightRotCamDoIt (e);
		}	
		if (upRotCamEnable) {
			onUpRotCamDoIt (e);
		}
		if (downRotCamEnable) {
			onDownRotCamDoIt (e);
		}
		
	}
	//listeners 
	/// translations
	function onGoCamMouseDown (e) { 
		goCamEnable = true;		
	}
	function onGoCamMouseUp (e) { 
		goCamEnable = false;		
	}
	function onBackCamMouseDown (e) { 
		backCamEnable = true;		
	}
	function onBackCamMouseUp (e) { 
		backCamEnable = false;		
	}
	function onLeftCamMouseDown (e) { 
		leftCamEnable = true;		
	}
	function onLeftCamMouseUp (e) { 
		leftCamEnable = false;		
	}
	function onRightCamMouseDown (e) { 
		rightCamEnable = true;		
	}
	function onRightCamMouseUp (e) { 
		rightCamEnable = false;		
	}
	function onUpCamMouseDown (e) { 
		upCamEnable = true;		
	}
	function onUpCamMouseUp (e) { 
		upCamEnable = false;		
	}
	function onDownCamMouseDown (e) { 
		downCamEnable = true;		
	}
	function onDownCamMouseUp (e) { 
		downCamEnable = false;		
	}
	/// rotations
	function onLeftRotCamMouseDown (e) { 
		leftRotCamEnable = true;		
	}
	function onLeftRotCamMouseUp (e) { 
		leftRotCamEnable = false;		
	}
	function onRightRotCamMouseDown (e) { 
		rightRotCamEnable = true;		
	}
	function onRightRotCamMouseUp (e) { 
		rightRotCamEnable = false;		
	}
	function onUpRotCamMouseDown (e) { 
		upRotCamEnable = true;		
	}
	function onUpRotCamMouseUp (e) { 
		upRotCamEnable = false;		
	}
	function onDownRotCamMouseDown (e) { 
		downRotCamEnable = true;		
	}
	function onDownRotCamMouseUp (e) { 
		downRotCamEnable = false;		
	}
	//
	// actions
	/// translations
	function onGoCamDoIt (e) { 
		translate(new Vector3(0, 0, 0.05));
	}
	function onBackCamDoIt (e) { 
		translate(new Vector3(0, 0, -0.05));		
	}
	function onLeftCamDoIt (e) { 
		translate(new Vector3( -0.03, 0, 0) );		
	}
	function onRightCamDoIt (e) { 
		translate(new Vector3(0.03,0, 0 ));
	}
	function onUpCamDoIt (e) { 
		translate(new Vector3(0,0.03, 0 ));
	}
	function onDownCamDoIt (e) { 
		translate(new Vector3(0,-0.03, 0 ));
	}
	function translate (v3:Vector3) {
		 localDirection.copyFromFloats(v3.x,v3.y,v3.z); //
		 Matrix.RotationYawPitchRollToRef(camera.rotation.y, camera.rotation.x, 0, cameraTransformMatrix);
         Vector3.TransformCoordinatesToRef(localDirection, cameraTransformMatrix,transformedDirection);
         camera.cameraDirection.addInPlace(transformedDirection);
	}
	/// rotations
	function onLeftRotCamDoIt (e) { 
		//camera.position.z += 1;
		//camera.rotation.y -= 0.01;
		camera.cameraRotation.y = -Math.PI / 128 ;// -0.025 radians // -1,41°
		//camera.cameraDirection.x = -0.03;
		//camera.rotation.y -= Math.PI / 16 ; //Math.PI*2;//360°//Math.PI;//180°//Math.PI/2;//90°//Math.PI/4;//45°//Math.PI/8;//22,5°//Math.PI/16;//11,25°  ;
	}
	function onRightRotCamDoIt (e) { 
		camera.cameraRotation.y =Math.PI / 128 ;// 0.025 radians // 1,41°
	}
	function onUpRotCamDoIt (e) { 
		camera.cameraRotation.x = -0.01;
	}
	function onDownRotCamDoIt (e) { 
		camera.cameraRotation.x = 0.01;
	}
	
 /**/
    static function main() {  
		new Test();
	}
}