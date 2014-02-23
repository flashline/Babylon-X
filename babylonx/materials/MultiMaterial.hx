//
package babylonx.materials ;
//
import babylonx.Scene;
//
@:native("BABYLON.MultiMaterial")
extern class MultiMaterial   {
	public var subMaterials : Array<Material>;	
	//
	public function new (name:String, scene:Scene);
	//
	public function getSubMaterial( index : Float ) : Material;
}
