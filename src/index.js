//Built off of https://github.com/timoxley/threejs/blob/master/examples/misc_controls_pointerlock.html example
var THREE = require('three');
var Detector = require('./detector');
var PointerLockControls = require('./PointerLockControls');

var camera, scene, renderer;
var geometry, material, mesh;
var controls,time = Date.now();
var objects = [];
var ray;
var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );
// http://www.html5rocks.com/en/tutorials/pointerlock/intro/
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
if ( havePointerLock ) {
    var element = document.body;
    var pointerlockchange = function ( event ) {
        if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
            controls.enabled = true;
            blocker.style.display = 'none';
        } else {
            controls.enabled = false;
            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';
            instructions.style.display = '';
        }
    }
    var pointerlockerror = function ( event ) {
        instructions.style.display = '';
    }
    // Hook pointer lock state change events
    document.addEventListener( 'pointerlockchange', pointerlockchange, false );
    document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
    document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
    document.addEventListener( 'pointerlockerror', pointerlockerror, false );
    document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
    document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
    instructions.addEventListener( 'click', function ( event ) {
        instructions.style.display = 'none';
        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        if ( /Firefox/i.test( navigator.userAgent ) ) {
            var fullscreenchange = function ( event ) {
                if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
                    document.removeEventListener( 'fullscreenchange', fullscreenchange );
                    document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
                    element.requestPointerLock();
                }
            }
            document.addEventListener( 'fullscreenchange', fullscreenchange, false );
            document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
            element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
            element.requestFullscreen();
        } else {
            element.requestPointerLock();
        }
    }, false );
} else {
    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
}

geometry = new THREE.BoxGeometry( 1, 1, 1 );
material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );


init();
animate();
function init() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    // camera.position.z = 100;
    // camera.position.x = 100;
    // camera.position.y = 0
    scene = new THREE.Scene();

    // floor
    geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
        var vertex = geometry.vertices[ i ];
        vertex.x += Math.random() * 20 - 10;
        vertex.y += Math.random() * 2;
        vertex.z += Math.random() * 20 - 10;
    }
    for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
        var face = geometry.faces[ i ];
        // face.vertexColors[ 0 ] = new THREE.Color().setHSV( Math.random() * 0.2 + 0.5, Math.random() * 0.5, 1 );
        // face.vertexColors[ 1 ] = new THREE.Color().setHSV( Math.random() * 0.2 + 0.5, Math.random() * 0.5, 1 );
        // face.vertexColors[ 2 ] = new THREE.Color().setHSV( Math.random() * 0.2 + 0.5, Math.random() * 0.5, 1 );
        // face.vertexColors[ 3 ] = new THREE.Color().setHSV( Math.random() * 0.2 + 0.5, Math.random() * 0.5, 1 );
    }
    material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );


    // objects
    geometry = new THREE.CubeGeometry( 20, 20, 20 );
    for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
        var face = geometry.faces[ i ];
        // face.vertexColors[ 0 ] = new THREE.Color().setHSV( Math.random() * 0.2 + 0.5, Math.random() * 0.5, 1 );
        // face.vertexColors[ 1 ] = new THREE.Color().setHSV( Math.random() * 0.2 + 0.5, Math.random() * 0.5, 1 );
        // face.vertexColors[ 2 ] = new THREE.Color().setHSV( Math.random() * 0.2 + 0.5, Math.random() * 0.5, 1 );
        // face.vertexColors[ 3 ] = new THREE.Color().setHSV( Math.random() * 0.2 + 0.5, Math.random() * 0.5, 1 );
    }
    
    for ( var i = 0; i < 10; i ++ ) {
        material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = Math.floor( Math.random() * 200) - 100;
        mesh.position.y = 50//Math.floor( Math.random() * 10 ) * 10 + 50;
        mesh.position.z = Math.floor( Math.random() * 100) - 100;
        scene.add( mesh );
        // material.color.setHSV( Math.random() * 0.2 + 0.5, Math.random() * 0.5, 1 );
        objects.push( mesh );
    }


    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
    var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light.position.set( 1, 1, 1 );
    scene.add( light );
    var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
    light.position.set( -1, - 0.5, -1 );
    scene.add( light );

    
    controls = new PointerLockControls( camera );
    scene.add( controls.getObject() );
    // ray = new THREE.Ray();
    // ray.direction.set( 0, -1, 0 );

    
    //
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //

    window.addEventListener( 'resize', onWindowResize, false );
};
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
};
function animate() {
    requestAnimationFrame( animate );

    // cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;
    // ray.origin.copy( controls.getObject().position );
    // ray.origin.y -= 10;
    controls.update( Date.now() - time );
    renderer.render( scene, camera );
    time = Date.now();
};
