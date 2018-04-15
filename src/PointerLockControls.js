var THREE = require('three');

var PointerLockControls = function ( camera, mouse ) {

	var scope = this;

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 10;
	yawObject.add( pitchObject );
	
	// var isOnObject = false;
	// var canJump = false;

	//var velocity = new THREE.Vector3();

	var PI_2 = Math.PI / 2;

	var onMouseMove = function ( event ) {

		if ( scope.enabled === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

		// mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		// mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	};

	var onDocumentMouseDown = function ( event ) {
		
		//TODO: click to move into shape
	}
	
	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );

	this.enabled = false;

	this.getObject = function () {

		return yawObject;

	};

	this.update = function ( delta ) {

		if ( scope.enabled === false ) return;

		delta *= 0.1;
		//console.log('yep');

		// velocity.x += ( - velocity.x ) * 0.08 * delta;
		// velocity.z += ( - velocity.z ) * 0.08 * delta;

		// velocity.y -= 0.25 * delta;

		// if ( isOnObject === true ) {

		// 	velocity.y = Math.max( 0, velocity.y );

		// }

		// yawObject.translateX( velocity.x );
		// yawObject.translateY( velocity.y ); 
		// yawObject.translateZ( velocity.z );

		// if ( yawObject.position.y < 10 ) {

		// 	velocity.y = 0;
		// 	yawObject.position.y = 10;

		// 	canJump = true;

		// }

	};

};

// browserify support
if ( typeof module === 'object' ) {

	module.exports = PointerLockControls;

}