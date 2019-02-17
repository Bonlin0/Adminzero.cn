var scene1, camera1, renderer1, light1, lightpoint, plane1, texture;
var mesh1, helper1, dragon;

function init() {
	scene1 = new THREE.Scene();

	renderer1 = new THREE.WebGLRenderer({
		//*元素是canvas在这里设置
		canvas: document.getElementById('canvas1')
	});
	renderer1.setSize(430, 460);
	renderer1.setClearColor(0xb07bdc);
	renderer1.shadowMapEnabled = true;
	//*元素是div在这里设置
	//document.getElementById('canvas1').appendChild(renderer1.domElement);

	camera1 = new THREE.PerspectiveCamera(75, 430 / 460, 0.1, 1000);
	camera1.position.set(5, 2, 0);
	camera1.lookAt(new THREE.Vector3(0, 0, 0));
	scene1.add(camera1);

	light1 = new THREE.SpotLight(0xF0E68C, 1, 100, Math.PI / 6, 25);
	light1.position.set(30, 30, 30);
	light1.target.position.set(0, 0, 0);
	light1.castShadow = true;
	light1.shadowCameraNear = 2;
	light1.shadowCameraFar = 40;
	light1.shadowCameraFov = 50;
	light1.shadowMapWidth = 512;
	light1.shadowMapHeight = 512;
	light1.shadowDarkness = 0.5;
	scene1.add(light1);
	
	lightpoint = new THREE.PointLight(0xffffff, 0.8);
	lightpoint.position.set(0, 10, 0);
	scene1.add(lightpoint);

	helper1 = new THREE.AxesHelper(20);
	scene1.add(helper1);

	var loader = new THREE.OBJLoader();
	loader.load("OBJmodel/su.obj", function(obj) {
		var material = new THREE.MeshLambertMaterial({
			color: 0x5C3A21
		});
		obj.children.forEach(function(child) {

			child.material = material;

			child.geometry.computeFaceNormals();

			child.geometry.computeVertexNormals();

		});
		obj.scale.set(0.3, 0.3, 0.3);
		//		obj.castShadow = true;
		dragon = obj;
		dragon.castShadow = true;
		scene1.add(obj);
	});
	//		dragon.castShadow = true;
	//	mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
	//		color: 0x00ff00
	//	}));
	//	scene1.add(mesh1);

	texture = THREE.ImageUtils.loadTexture('img/chess.jpg', {}, function() {
		renderer1.render(scene1, camera1);
	});
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(1, 1);
	plane1 = new THREE.Mesh(new THREE.PlaneGeometry(8, 8),
		new THREE.MeshLambertMaterial({
			map: texture
		}));
	plane1.receiveShadow = true;

	// 沿x轴旋转-90度
	plane1.rotation.x = Math.PI / -2;
	plane1.position.y = -0.5;
	scene1.add(plane1);
}

var scene3, camera3, renderer3, light3;
var mesh3, helper3, plane3;

function init3() {
	scene3 = new THREE.Scene();

	renderer3 = new THREE.WebGLRenderer({
		//*元素是canvas在这里设置
		canvas: document.getElementById('canvas2')
	});
	renderer3.setSize(430, 460);
	renderer3.setClearColor(0xffccff);
	renderer3.shadowMapEnabled = true;

	camera3 = new THREE.PerspectiveCamera(75, 430 / 460, 0.1, 1000);
	camera3.position.set(5, 2, 5);
	camera3.lookAt(new THREE.Vector3(0, 0, 0));
	scene3.add(camera3);

	lightpoint.position.set(10, 10, 20);
	scene3.add(lightpoint);

	light3 = new THREE.SpotLight(0xF0E68C, 1, 100, Math.PI / 6, 25);
	light3.position.set(30, 30, 30);
	light3.target.position.set(0, 0, 0);
	light3.castShadow = true;
	light3.shadowCameraNear = 2;
	light3.shadowCameraFar = 40;
	light3.shadowCameraFov = 50;
	light3.shadowMapWidth = 512;
	light3.shadowMapHeight = 512;
	light3.shadowDarkness = 0.5;
	scene3.add(light3);

	helper3 = new THREE.AxesHelper(20);
	scene3.add(helper3);

	mesh3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
		color: 0x00ff00
	}));
	mesh3.castShadow = true;
	scene3.add(mesh3);

	plane3 = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshLambertMaterial({
		map: texture
	}));
	plane3.receiveShadow = true;
	// 沿x轴旋转-90度
	plane3.rotation.x = Math.PI / -2;
	plane3.position.y = -2;
	scene3.add(plane3);
}

var controls;

function initControls() {
	
	controls = new THREE.OrbitControls(camera1, renderer1.domElement);

	// 如果使用animate方法时，将此函数删除

//	controls.addEventListener('change', render);

	// 使动画循环使用时阻尼或自转 意思是否有惯性

	controls.enableDamping = true;

	//动态阻尼系数 就是鼠标拖拽旋转灵敏度

	controls.dampingFactor = 0.25;

	//是否可以缩放

	controls.enableZoom = true;

	//是否自动旋转

//	controls.autoRotate = true;
//	controls.autoRotateSpeed = 1.0;

	//设置相机距离原点的最远距离

	controls.minDistance = 1;

	//设置相机距离原点的最远距离

	controls.maxDistance = 200;

	//是否开启右键拖拽

	controls.enablePan = true;

	//键盘控制
	//			controls.enableKeys = true;

}

function animate() {
	controls.update();
	requestAnimationFrame(animate);
	mesh3.rotation.x += 0.01;
	mesh3.rotation.y += 0.01;
	dragon.rotation.y += 0.01;
	renderer3.render(scene3, camera3);
	renderer1.render(scene1, camera1);
}