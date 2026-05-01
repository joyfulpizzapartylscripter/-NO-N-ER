let scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 2, 5);

const yellowMaterial = new THREE.MeshStandardMaterial({
    color: 0xffdd44,
    roughness: 1
});

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(500, 500),
    yellowMaterial
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

function createWall(x, z) {
    const wall = new THREE.Mesh(
        new THREE.BoxGeometry(4, 4, 1),
        yellowMaterial
    );
    wall.position.set(x, 2, z);
    scene.add(wall);
}

for (let i = -50; i < 50; i += 6) {
    createWall(i, -20);
    createWall(i, 20);
    createWall(-20, i);
    createWall(20, i);
}

let light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 10, 0);
scene.add(light);

const ambient = new THREE.AmbientLight(0x555555);
scene.add(ambient);

let keys = {};
let speed = 0.1;

document.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

function flickerLights() {
    setInterval(() => {
        light.intensity = Math.random() > 0.7 ? 0.3 : 2;
    }, 300);
}
flickerLights();

function showMessage(text, duration = 3000) {
    const box = document.getElementById("message");
    box.innerText = text;
    setTimeout(() => {
        box.innerText = "";
    }, duration);
}

function die() {
    const death = document.getElementById("deathScreen");
    death.style.display = "flex";

    setTimeout(() => {
        death.style.display = "none";
        camera.position.set(0, 2, 5);
    }, 3000);
}

function randomEvent() {
    const events = [
        () => {
            scene.background = new THREE.Color(0x550000);
            showMessage("RED LIGHTS");
            setTimeout(() => {
                scene.background = new THREE.Color(0x111111);
            }, 4000);
        },

        () => {
            showMessage("OUT OF ENERGY");
            speed = 0.02;
            setTimeout(() => {
                speed = 0.1;
            }, 3000);
        },

        () => {
            showMessage("Ø");
            let escaped = false;

            setTimeout(() => {
                if (!escaped) die();
            }, 5000);

            document.addEventListener("keydown", function runCheck(e) {
                if (e.key.toLowerCase() === "shift") {
                    escaped = true;
                }
            });
        }
    ];

    const random = events[Math.floor(Math.random() * events.length)];
    random();
}

setInterval(randomEvent, 15000);

function animate() {
    requestAnimationFrame(animate);

    let currentSpeed = keys["shift"] ? 0.2 : speed;

    if (keys["w"]) camera.position.z -= currentSpeed;
    if (keys["s"]) camera.position.z += currentSpeed;
    if (keys["a"]) camera.position.x -= currentSpeed;
    if (keys["d"]) camera.position.x += currentSpeed;

    renderer.render(scene, camera);
}

animate();
