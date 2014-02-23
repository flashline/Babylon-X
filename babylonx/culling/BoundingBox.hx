//
package babylonx.culling ;
//
import babylonx.tools.math.Vector3;
import babylonx.tools.math.Matrix;
import babylonx.tools.math.Plane;
import babylonx.Scene;
//
@:native("BABYLON.BoundingBox") extern class BoundingBox {
	public var minimum : Vector3;
	public var maximum : Vector3;
	public var vectors : Array<Vector3>;
	public var center : Vector3;
	public var directions : Array<Vector3>;
	public var vectorsWorld : Array<Vector3>;
	public var minimumWorld : Vector3;
	public var maximumWorld : Vector3;
	//
	public function new (minimum : Vector3, maximum : Vector3 ) : Void;
	//
	public function _update( world : Matrix ) : Void;
	public function isInFrustrum( frustrumPlanes : Array<Plane> ) : Bool;
	public function intersectsPoint( point : Vector3 ) : Bool; 
	public function intersectsSphere( sphere : Sphere ) : Bool;
	public function intersectsMinMax( min : Vector3, max : Vector3 ) : Bool;
	public function IsInFrustrum( boundingVectors : Array<Vector3>, frustrumPlanes : Array<Plane> ) : Bool;
	public function intersects( box0 : BoundingBox, box1 : BoundingBox ) : Bool ;
}
//
/**
 * BoundingBox.extends can't exist in Haxe
 * do : 
 * 		using babylonx.culling.BoundingBox.BB ; 
 * 		// ...
 * 		// bb is a BoundingBox:		
 * 		bb.getExtends(); 
 */
class BB {
	public static function getExtends (bb:BoundingBox):Vector3 {
		var ret = (untyped __js__ ("bb.extends"));
		return cast(ret, Vector3);
	}
	public static function setExtends (bb:BoundingBox, v3:Vector3) {
		untyped __js__ ("bb.extends=v3;");
	}
	
}
