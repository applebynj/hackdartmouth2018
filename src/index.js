//Built off of https://github.com/timoxley/threejs/blob/master/examples/misc_controls_pointerlock.html example
var THREE = require('three');
var Detector = require('./detector');
var PointerLockControls = require('./PointerLockControls');

var camera, scene, renderer, font;
var geometry, material, mesh;
var controls,time = Date.now();
var objects = [];
var ray;
var crosshair = document.getElementById( 'crosshair' );
var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();

var loader = new THREE.FontLoader();

//TODO: add loading screen
//Render text ahead and then just show?
loader.load( 'fonts/helvetiker_regular.typeface.json', function ( newfont ) {
    font = newfont;
});


// http://www.html5rocks.com/en/tutorials/pointerlock/intro/
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
if ( havePointerLock ) {
    var element = document.body;
    var pointerlockchange = function ( event ) {
        if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
            controls.enabled = true;
            blocker.style.display = 'none';
            crosshair.style.display = 'block';
            crosshair.style.display = '-webkit-block';
            crosshair.style.display = '-moz-block';
        } else {
            controls.enabled = false;
            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';
            crosshair.style.display = 'none';
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
    
    var numThemes, radius, angleIncr;

    //TODO: abstract this out
    radius = 100;  //TODO: generate based on num of theme
    numThemes = 5; //TODO: get from JSON
    slice = 2 * Math.PI / numThemes;

    for ( var i = 0; i < numThemes; i ++ ) {
        material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
        var mesh = new THREE.Mesh( geometry, material );

        mesh.position.x = radius * Math.cos(slice*i);
        mesh.position.y = 50;
        mesh.position.z = radius * Math.sin(slice*i);
        scene.add( mesh );
        // material.color.setHSV( Math.random() * 0.2 + 0.5, Math.random() * 0.5, 1 );

        mesh.userData.type = 'theme'; //TODO: replace with enum / class and such
        mesh.userData.lines = [
            "how inspiring this is wow",
            "amazing I cannot believe",
            "hello wow amazing",
            "guap guap get some chicken",
            "guap guap get some bread",
            "ayo I been off, laura been croft"
        ];
        mesh.userData.toggled = false;
        objects.push( mesh );
    }


    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
    var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light.position.set( 1, 1, 1 );
    scene.add( light );
    var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
    light.position.set( -1, - 0.5, -1 );
    scene.add( light );
    
    ray = new THREE.Ray();
    ray.direction.set( 0, -1, 0 );

    controls = new PointerLockControls( camera, mouse, raycaster);
    scene.add( controls.getObject() );

    
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

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( scene.children );

    for ( var i = 0; i < intersects.length; i++ ) {

        let intersectedObject = intersects[ i ].object;

        //TODO: animate object
        intersectedObject.material.color.set( 0xff0000 );
        
        //TODO: if intersects a theme and then click, jump inside it
        if(intersectedObject.userData.type === "theme") {
            if(!intersectedObject.userData.toggled) {
                intersectedObject.userData.toggled = true;
                displayExcerpts(intersectedObject);
            }                

            controls.getObject().position.set(intersectedObject.position.x,
                intersectedObject.position.y,
                intersectedObject.position.z);
        }
    }

    scene.remove(raycaster);

    controls.update( Date.now() - time );
    renderer.render( scene, camera );
    time = Date.now();
};


function displayExcerpts(themeObject) {
    var numLines = themeObject.userData.lines.length;

    radius = 20; //TODO: generate based on num of lines
    slice = 2 * Math.PI / numLines;

    for ( i = 0; i < numLines; i++ ) {
        var geometry;

            geometry = new THREE.TextGeometry( themeObject.userData.lines[i], {
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