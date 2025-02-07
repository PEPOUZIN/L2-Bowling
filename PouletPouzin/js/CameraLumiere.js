 function cameraLumiere(scene,camera){   // creation de la camera 
  camera.up = new THREE.Vector3( 0, 0, 1 );
  var xPos=-3;
  //modification de la jauge si document.forms["controle"].PosX.value;
  var yPos=0;//document.forms["controle"].PosY.value;//*document.forms["controle"].zoom.value;
  var zPos=0.8;//document.forms["controle"].PosZ.value;//*document.forms["controle"].zoom.value;
  var xDir=0;//document.forms["controle"].DirX.value;
  var yDir=0;//document.forms["controle"].DirY.value;
  var zDir=0;//testZero(document.forms["controle"].DirZ.value);
  camera.position.set(xPos, yPos, zPos);
  camera.lookAt(xDir, yDir, zDir);
  actuaPosCameraHTML(xPos, yPos, zPos,xDir, yDir, zDir);
    //camera.lookAt(scene.position);
    //camera.lookAt(new THREE.Vector3(0,0,0));
} // fin fonction cameraLumiere
 
 function actuaPosCameraHTML(xPos, yPos, zPos,xDir, yDir, zDir){
  document.forms["controle"].PosX.value=xPos;
  document.forms["controle"].PosY.value=yPos;
  document.forms["controle"].PosZ.value=zPos;
  document.forms["controle"].DirX.value=xDir;
  document.forms["controle"].DirY.value=yDir;
  document.forms["controle"].DirZ.value=zDir;
 }
 
 function ajoutCameraGui(gui,menuGUI,camera){
  // ajout de la camera dans le menu du GUI
 let guiCamera = gui.addFolder("Camera");
  // ajout des propriete de la camera
 // actualisation de la camera apres clic sur la zone idoine 
 // guiCamera.add(menuGUI,"cameraxPos",-borneVue,borneVue).onChange(posCamera());
 // guiCamera.add(menuGUI,"camerayPos",-borneVue,borneVue).onChange(posCamera());
 // guiCamera.add(menuGUI,"camerazPos",-borneVue,borneVue).onChange(posCamera());
  // mouvement automatique mais il faut actualiser la direction et la position en meme temps
 // abscisse de la position de la camera dans le menu
 guiCamera.add(menuGUI,"cameraxPos",-borneVue,borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    // ecriture des proprietes de la camera dans html
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
    //document.forms["controle"].PosX.value=testZero(menuGUI.cameraxPos);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });
 // ordonnee de la position de la camera dans le menu
 guiCamera.add(menuGUI,"camerayPos",-borneVue,borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    // ecriture des proprietes de la camera dans html
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });
 // cote de la position de la camera dans le menu
 guiCamera.add(menuGUI,"camerazPos",-borneVue,borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    // ecriture des proprietes de la camera dans html
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
   // document.forms["controle"].PosX.value=testZero(menuGUI.cameraxPos);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir));
  });
 
 // zoom de la camera dans le menu
 guiCamera.add(menuGUI,"cameraZoom",-10,10).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
  });
 // fin de la position de camera
 // direction de la camera
 // abscisse de la direction de la camera dans le menu
 guiCamera.add(menuGUI,"cameraxDir",-borneVue,borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    // ecriture des proprietes de la camera dans html
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
  });
 // ordonnee de la direction de la camera dans le menu
 guiCamera.add(menuGUI,"camerayDir",-borneVue,borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    // ecriture des proprietes de la camera dans html
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
  });
 // cote de la direction de la camera dans le menu
 guiCamera.add(menuGUI,"camerazDir",-borneVue,borneVue).onChange(function () {
    camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom), menuGUI.camerayPos*testZero(menuGUI.cameraZoom), menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
    // ecriture des proprietes de la camera dans html
    actuaPosCameraHTML(menuGUI.cameraxPos, menuGUI.camerayPos, menuGUI.camerazPos,menuGUI.cameraxDir,menuGUI.camerayDir, menuGUI.camerazDir);
    camera.lookAt(testZero(menuGUI.cameraxDir), testZero(menuGUI.camerayDir), testZero(menuGUI.camerazDir))
  });
 /*guiCamera.add(menuGUI,"cameraxDir",-borneVue,borneVue).onChange(posCamera());
 guiCamera.add(menuGUI,"camerayDir",-borneVue,borneVue).onChange(posCamera());
 guiCamera.add(menuGUI,"camerazDir",-borneVue,borneVue).onChange(posCamera());*/
 }//fin fonction ajoutCameraGui
//*************************************************************
//* 
//        F I N     C A M E R A
//
//*************************************************************
// plans contenant deux axes du repere
const largPlan = 25;
const hautPlan = 25;
const nbSegmentLarg = 30;
const nbSegmentHaut = 30;
function planRepere(scene){
  const geometry = new THREE.PlaneGeometry(largPlan,hautPlan,nbSegmentLarg,nbSegmentHaut);
  const planeR = surfPhong(geometry,"#FF5555",1,true,"#AAFFFF");
  //new THREE.Mesh( geometry, materialR );
  const planeG = surfPhong(geometry,"#336633",1,true,"#FFAAFF");
  //new THREE.Mesh( geometry, materialG );
  const planeB = surfPhong(geometry,"#AAAAFF",1,true,"#FFAAAA");
  //new THREE.Mesh( geometry, materialB );
  planeR.rotateX(Math.PI/2);
  planeB.rotateX(Math.PI/2);
  planeB.rotateY(Math.PI/2);
  planeR.receiveShadow = true; 
  planeR.castShadow = true;
  planeG.receiveShadow = true; 
  planeG.castShadow = true;
  planeB.receiveShadow = true; 
  planeB.castShadow = true;
  scene.add(planeR);
  scene.add(planeG);
  scene.add(planeB);
}
 //fin plans
//*************************************************************
//* 
//        F I N    Plans
//
//*************************************************************
 function lumiere(scene){
    let lumPt = new THREE.PointLight(0xffffff);
   /* const d = 100;
    lumPt.castShadow = true;
    lumPt.shadow.camera.left = - d;
    lumPt.shadow.camera.right = d;
    lumPt.shadow.camera.top = d;
    lumPt.shadow.camera.bottom = - d;*/
    //light.position.y = 1.5;
    lumPt.position.set(-5,5,10);
    lumPt.intensity = 1.3;
    lumPt.castShadow=true;
    lumPt.shadow.camera.far=2000;
    lumPt.shadow.camera.near=0;
    const lum =new THREE.PointLightHelper(lumPt,1);//affichage du point de lumiere
    scene.add( lum );
    scene.add(lumPt);

    /*let lumPt2 = new THREE.PointLight(0xffffff);
    lumPt2.position.set(10,5,-5);
    lumPt2.intensity = 2;
    lumPt2.shadow.camera.far=2000;
    lumPt2.shadow.camera.near=0;
    const lum2 =new THREE.PointLightHelper(lumPt2,1);//affichage du point de lumiere
    scene.add( lum2 );
    scene.add(lumPt2);*/
    let ambiancelum = new THREE.AmbientLight(0x000000);
    scene.add(ambiancelum);
  
  
}