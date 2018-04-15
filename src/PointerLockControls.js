var THREE = require('three');
var poem = document.getElementById( 'poem' );
var crosshair = document.getElementById( 'crosshair' );

//TODO: clean this and refactor to not have to pass in entire scene, again its 4am 
//TODO: and remove passing font
var PointerLockControls = function ( camera, mouse, raycaster, scene, font ) {

	var scope = this;

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var lastTraveledObject;

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
		
		// ray.origin.copy( controls.getObject().position );
		// ray.origin.y -= 10;

		// update the picking ray with the camera and mouse position
		let centerScreen = new THREE.Vector2( 0, 0 );
		raycaster.setFromCamera( centerScreen, camera, raycaster );

		// calculate objects intersecting the picking ray
		var intersects = raycaster.intersectObjects( scene.children );
    
		for ( var i = 0; i < intersects.length; i++ ) {
	
			let intersectedObject = intersects[ i ].object;
	
			//TODO: animate object
			intersectedObject.material.color.set( 0xff0000 );
			
			//TODO abstract this out to a handler
	
			if(intersectedObject.userData.type === "theme") {

				if(lastTraveledObject !== undefined) {
					lastTraveledObject.visible = true;
					lastTraveledObject == undefined;
				}

				if(!intersectedObject.userData.toggled) {
					intersectedObject.userData.toggled = true;
					displayExcerpts(intersectedObject);
				}                
	
				yawObject.position.set(intersectedObject.position.x,
					intersectedObject.position.y,
					intersectedObject.position.z);

					lastTraveledObject = intersectedObject;
					lastTraveledObject.visible = false;
			}
	
			if(intersectedObject.userData.type === "excerpt") {
				this.enabled = false;
				blocker.style.display = '-webkit-box';
				blocker.style.display = '-moz-box';
				blocker.style.display = 'box';
				crosshair.style.display = 'none';
				poem.style.display = '';
				document.exitPointerLock();
			}

			if(intersectedObject.userData.type === "floor") {
				yawObject.position.set(0,20,0);
			}
		}
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

	//TODO: Refactor all below here back out of this file ---------------------

	var displayExcerpts = function(themeObject) {
		var numLines = themeObject.userData.lines.length;

		radius = 20; //TODO: generate based on num of lines
		slice = 2 * Math.PI / numLines;

		for ( i = 0; i < numLines; i++ ) {
			var geometry;

				geometry = new THREE.TextGeometry( themeObject.userData.lines[i].line, {
					font: font,
					size: 2,
					height: 1,
					curveSegments: 12,
					bevelEnabled: false,
					//bevelThickness: 10,
					//bevelSize: 8,
					//bevelSegments: 5
				} );


				material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
				var mesh = new THREE.Mesh( geometry, material );
				mesh.userData.type = 'excerpt';

				mesh.position.x = radius * Math.cos(slice*i);
				mesh.position.y = 25 - (Math.random() * 50);
				mesh.position.z = radius * Math.sin(slice*i);

				mesh.position.x += themeObject.position.x;
				mesh.position.y += themeObject.position.y;
				mesh.position.z += themeObject.position.z;

				mesh.lookAt(themeObject.position);

				scene.add( mesh );
    };    
}

};



// browserify support
if ( typeof module === 'object' ) {

	module.exports = PointerLockControls;

}