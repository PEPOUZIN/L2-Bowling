function ConstruQuille(){
  //Milieu de la quille
  //Définition des points de contrôle de la courbe de Bézier
  var p0 = new THREE.Vector3(0.1/1.5,0.1/1.5,0);
  var p1 = new THREE.Vector3(0.12/1.5,0.25/1.5,0);
  var p2 = new THREE.Vector3(0.05/1.5,0.25/1.5,0);
  var p3 = new THREE.Vector3(0.05/1.5,0.35/1.5,0);

  //Définition de la courbe de Bézier et du tableau de points
  let Cbe3 = new THREE.CubicBezierCurve3(p0,p1,p2,p3);
  let points = Cbe3.getPoints(40);

  //Définition de la lathe du milieu de la quille
  let latheGeometry = new THREE.LatheGeometry(points,100,0,2*Math.PI);
  let lathe = new THREE.MeshPhongMaterial({color: 0xFF0000 , side:THREE.DoubleSide,transparent:true} );
  let lathe1= new THREE.Mesh(latheGeometry,lathe);

  //Rotation de la lathe pour mettre la quille debout
  lathe1.rotateX(Math.PI/2);
  lathe1.receiveShadow=true;
  lathe1.castShadow=true;

  //Sommet de la quille
  //Définition des points de contrôle de la courbe de Bézier
  var T0 = new THREE.Vector3(0.05/1.5,0.35/1.5,0);//point T0= P3
  var T1 = new THREE.Vector3(0,0,0);
  var T2 = new THREE.Vector3(0.1/1.5,0.5/1.5,0);
  var T3 = new THREE.Vector3(0,0.5/1.5,0);

  //Jointure entre la courbe du sommet et du milieu
  let vP2P3 = new THREE.Vector3(0,0,0);
  let vTan3 = new THREE.Vector3(0,0,0);
  vP2P3.subVectors(p3,p2);//p3-p2
  let coef2 =0;
  vTan3.addScaledVector(vP2P3,coef2);
  T1.addVectors(T0,vTan3);

  //Définition de la courbe de Bézier et du tableau de points
  let Cbe3v2 = new THREE.CubicBezierCurve3(T0,T1,T2,T3);
  let points2 = Cbe3v2.getPoints(40);

  //Définition de la lathe du sommet de la quille
  let latheGeometry2 = new THREE.LatheGeometry(points2,100,0,2*Math.PI);
  let lathe2 = new THREE.MeshPhongMaterial({color: 0x90ff90 , side:THREE.DoubleSide, emissive:0x000000,transparent:true} );
  let lathe3= new THREE.Mesh(latheGeometry2,lathe2);

  //Rotation de la lathe pour mettre la quille debout
  lathe3.rotateX(Math.PI/2);
  lathe3.receiveShadow=true;
  lathe3.castShadow=true;

  //Bas de la quille
  //Définition des points de contrôle de la courbe de Bézier
  var M0 = new THREE.Vector3(0.1/1.5,0.1/1.5,0);
  var M1 = new THREE.Vector3(0,0,0);
  var M2 = new THREE.Vector3(0.1/1.5,0.05/1.5,0);
  var M3 = new THREE.Vector3(0.06/1.5,0,0);
   
  //Jointure entre la courbe du bas et du milieu
  let vP1P0 = new THREE.Vector3(0,0,0);
  let vTan2 = new THREE.Vector3(0,0,0);
  vP1P0.subVectors(p0,p1);//P0-P1
  let coef = 0;
  vTan2.addScaledVector(vP1P0,coef);
  M1.addVectors(M0,vTan2);

  //Définition de la courbe de Bézier et du tableau de points
  let Cb = new THREE.CubicBezierCurve3(M0,M1,M2,M3);
  let points3 = Cb.getPoints(40);

  //Définition de la lathe du bas de la quille
  let latheGeometryBas = new THREE.LatheGeometry(points3,100,0,2*Math.PI);
  let latheBas = new THREE.MeshPhongMaterial({color: 0xFFFFFF , side:THREE.DoubleSide,transparent:true} );
  let latheBas2= new THREE.Mesh(latheGeometryBas,latheBas);

  //Rotation de la lathe pour mettre la quille debout
  latheBas2.rotateX(Math.PI/2);
  lathe2.receiveShadow=true;
  lathe2.castShadow=true;

  //Retourne le tableau de lathe
  tab=[lathe1,lathe3,latheBas2]; 
  return tab;
} //fin de la fonction ConstruQuille

function poseQuille() {
  //Dernière ligne
  //Crée une quille et la déplace aux bonnes coordonnées
  tabQ0=ConstruQuille();
  tabQ0[0].translateX(17.5);
  tabQ0[0].translateZ(-0.8);
  tabQ0[1].translateX(17.5);
  tabQ0[1].translateZ(-0.8);
  tabQ0[2].translateX(17.5);
  tabQ0[2].translateZ(-0.8);

  //Crée une quille et la déplace aux bonnes coordonnées
  tabQ1=ConstruQuille();
  tabQ1[0].translateX(17.5);
  tabQ1[0].translateZ(-0.6);
  tabQ1[1].translateX(17.5);
  tabQ1[1].translateZ(-0.6);
  tabQ1[2].translateX(17.5);
  tabQ1[2].translateZ(-0.6);
 
  //Crée une quille et la déplace aux bonnes coordonnées
  tabQ2=ConstruQuille();
  tabQ2[0].translateX(17.5);
  tabQ2[0].translateZ(-0.4);
  tabQ2[1].translateX(17.5);
  tabQ2[1].translateZ(-0.4);
  tabQ2[2].translateX(17.5);
  tabQ2[2].translateZ(-0.4);
  
  //Crée une quille et la déplace aux bonnes coordonnées
  tabQ3=ConstruQuille();
  tabQ3[0].translateX(17.5);
  tabQ3[0].translateZ(-0.2);
  tabQ3[1].translateX(17.5);
  tabQ3[1].translateZ(-0.2);
  tabQ3[2].translateX(17.5);
  tabQ3[2].translateZ(-0.2);
 
  //Troisième ligne
  //Crée une quille et la déplace aux bonnes coordonnées
  tabQ4=ConstruQuille();
  tabQ4[0].translateX(16.8);
  tabQ4[0].translateZ(-0.7);
  tabQ4[1].translateX(16.8);
  tabQ4[1].translateZ(-0.7);
  tabQ4[2].translateX(16.8);
  tabQ4[2].translateZ(-0.7);
  
  //Crée une quille et la déplace aux bonnes coordonnées
  tabQ5=ConstruQuille();
  tabQ5[0].translateX(16.8);
  tabQ5[0].translateZ(-0.5);
  tabQ5[1].translateX(16.8);
  tabQ5[1].translateZ(-0.5);
  tabQ5[2].translateX(16.8);
  tabQ5[2].translateZ(-0.5);
  
  //Crée une quille et la déplace aux bonnes coordonnées
  tabQ6=ConstruQuille();
  tabQ6[0].translateX(16.8);
  tabQ6[0].translateZ(-0.3);
  tabQ6[1].translateX(16.8);
  tabQ6[1].translateZ(-0.3);
  tabQ6[2].translateX(16.8);
  tabQ6[2].translateZ(-0.3);

  //Deuxième ligne
  //Crée une quille et la déplace aux bonnes coordonnées
  tabQ7=ConstruQuille();
  tabQ7[0].translateX(16.1);
  tabQ7[0].translateZ(-0.6);
  tabQ7[1].translateX(16.1);
  tabQ7[1].translateZ(-0.6);
  tabQ7[2].translateX(16.1);
  tabQ7[2].translateZ(-0.6);

  //Crée une quille et la déplace aux bonnes coordonnées
  tabQ8=ConstruQuille();
  tabQ8[0].translateX(16.1);
  tabQ8[0].translateZ(-0.4);
  tabQ8[01].translateX(16.1);
  tabQ8[1].translateZ(-0.4);
  tabQ8[2].translateX(16.1);
  tabQ8[2].translateZ(-0.4);

  //Première ligne
  //Crée une quille et la déplace aux bonnes coordonnées
  tabQ9=ConstruQuille();
  tabQ9[0].translateX(15.4);
  tabQ9[0].translateZ(-0.5);
  tabQ9[1].translateX(15.4);
  tabQ9[1].translateZ(-0.5);
  tabQ9[2].translateX(15.4);
  tabQ9[2].translateZ(-0.5);

  //Retourne un tableau contenant toutes les quilles
  return [tabQ0,tabQ1,tabQ2,tabQ3,tabQ4,tabQ5,tabQ6,tabQ7,tabQ8,tabQ9]
} //fin de la fonction poseQuille

function MesQuilles() {
  var TabQuille=poseQuille();
  return TabQuille;
} //fin de la fonction MesQuilles

//Ajoute les quilles dans la scene
function AfficheQuille(scene) {
  var TabQuille=MesQuilles();
  for(i=0;i<10;i++) {
    for(j=0;j<3;j++) {
      scene.add(TabQuille[i][j]);
    }
  }
} //fin de la fonction AfficheQuille

//Création des parallélépipèdes rectangles
function BoxGeom() {
  const geometry = new THREE.BoxGeometry(0.15, 0.15,0.34);
  const material = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent:true});
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(17.5,0.8,0.16);
  cube.material.opacity=0.5;
  
  return cube;
} //fin de la fonction BoxGeom

//Déplace les parallélépipèdes rectangles autour de chaque quille
function PoseBoxGeom() {
  //Dernière ligne
  let box0=BoxGeom();

  let box1=BoxGeom();
  box1.position.set(17.5,0.6,0.16);

  let box2=BoxGeom();
  box2.position.set(17.5,0.4,0.16);

  let box3=BoxGeom();
  box3.position.set(17.5,0.2,0.16);

  //Troisième ligne
  let box4=BoxGeom();
  box4.position.set(16.8,0.7,0.16);

  let box5=BoxGeom();
  box5.position.set(16.8,0.5,0.16);

  let box6=BoxGeom();
  box6.position.set(16.8,0.3,0.16);

  //Deuxième ligne
  let box7=BoxGeom();
  box7.position.set(16.1,0.6,0.16);

  let box8=BoxGeom();
  box8.position.set(16.1,0.4,0.16);

  //Première ligne
  let box9=BoxGeom();
  box9.position.set(15.4,0.5,0.16);

  //Retourne un tableau de tous les parallélépipèdes rectangle
  return [box0,box1,box2,box3,box4,box5,box6,box7,box8,box9];
} //fin de la fonction PoseBoxGeom

//Affiche tous les parallélépipèdes rectangle dans la scène
function AfficheBox(scene){
  TabB=PoseBoxGeom()
  for(i=0;i<10;i++){    
    scene.add(TabB[i]);
  }
} //fin de la fonction AfficheBox

 /*function TraceBezierCubique(){

  //Milieu Quille
  var p0 = new THREE.Vector3(0.1/1.5,0.1/1.5,0);
  var p1 = new THREE.Vector3(0.12/1.5,0.25/1.5,0);
  var p2 = new THREE.Vector3(0.05/1.5,0.25/1.5,0);
  var p3 = new THREE.Vector3(0.05/1.5,0.35/1.5,0);
  let cbeBez = new THREE.CubicBezierCurve3(p0, p1, p2, p3);
  let Points = cbeBez.getPoints(150);
  let cbeGeometry = new THREE.BufferGeometry().setFromPoints(Points);
  let material = new THREE.LineBasicMaterial( 
    { color : 0xFF0000 , 
      linewidth: 1    
    } );
  let BezierCubique = new THREE.Line( cbeGeometry, material );
  BezierCubique.rotateX(Math.PI/2);

    //Bas Quille
  var T0 = new THREE.Vector3(0.05/1.5,0.35/1.5,0);//point T0= P3
  var T1 = new THREE.Vector3(0,0,0);
  var T2 = new THREE.Vector3(0.1/1.5,0.5/1.5,0);
  var T3 = new THREE.Vector3(0,0.5/1.5,0);
  let vP2P3 = new THREE.Vector3(0,0,0);
  let vTan3 = new THREE.Vector3(0,0,0);
  vP2P3.subVectors(p3,p2);//p3-p2
  let coef2 =0;
  vTan3.addScaledVector(vP2P3,coef2);
  T1.addVectors(T0,vTan3);

  let cbeBez2 = new THREE.CubicBezierCurve3(T0, T1, T2, T3);
  let Points2 = cbeBez2.getPoints(150);
  let cbeGeometry2 = new THREE.BufferGeometry().setFromPoints(Points2);
  let material2 = new THREE.LineBasicMaterial( 
    { color : 0xFF0000 , 
      linewidth: 1    
    } );
  let BezierCubique2 = new THREE.Line( cbeGeometry2, material2 );
  BezierCubique2.rotateX(Math.PI/2);
  
    //Haut Quille
  var M0 = new THREE.Vector3(0.1/1.5,0.1/1.5,0);
  var M1 = new THREE.Vector3(0,0,0);
  var M2 = new THREE.Vector3(0.1/1.5,0.05/1.5,0);
  var M3 = new THREE.Vector3(0.06/1.5,0,0);
  let vP1P0 = new THREE.Vector3(0,0,0);
  let vTan2 = new THREE.Vector3(0,0,0);
  vP1P0.subVectors(p0,p1);//P0-P1
  let coef =0;
  vTan2.addScaledVector(vP1P0,coef);
  M1.addVectors(M0,vTan2);
  let cbeBez3 = new THREE.CubicBezierCurve3(M0, M1, M2, M3);
  let PointsBas = cbeBez3.getPoints(150);
  let cbeGeometryBas = new THREE.BufferGeometry().setFromPoints(PointsBas);
  let materialBas = new THREE.LineBasicMaterial( 
    { color : 0x90EE90 , 
      linewidth: 1    
    } );
  let BezierCubiqueBas = new THREE.Line( cbeGeometryBas, materialBas );
  BezierCubiqueBas.rotateX(Math.PI/2);

  tab=[BezierCubique,BezierCubique2,BezierCubiqueBas];
  return tab;  
 }  // fin fonction THREE.CubicBezierCurve*/

 //Construit un triangle
function constructionTriangle() {
  var geom = new THREE.Geometry();
  var v1 = new THREE.Vector3(3, 0.075,0);
  var v2 = new THREE.Vector3(3,0.1, 0);
  var v3 = new THREE.Vector3(3.3, 0.0875, 0);
  var triangle = new THREE.Triangle(v1, v2, v3);
  var normal = triangle.getNormal();
  geom.vertices.push(triangle.a);
  geom.vertices.push(triangle.b);
  geom.vertices.push(triangle.c);
  geom.faces.push(new THREE.Face3(0, 1, 2, normal));
  var geom2 = new THREE.MeshBasicMaterial({color : 0x000000 ,side: THREE.DoubleSide })
  var mesh = new THREE.Mesh(geom,geom2);

  //Retourne le triangle
  return mesh;
} //fin de la fonction constructionTriangle

//Ajoute les triangles sur la piste
function poseTriangle(scene) {
  let x=0;
  let y=0;
  let compt=0;
  let meshT=constructionTriangle();
  let Triangle;
  scene.add(meshT);

  //Boucle qui incrémente la position x et y pour placer les triangles correctement 
  compt=1;
  for(i=0 ;i<39;i++){
    if(i%5==0){
      if(compt<=4){
        x+=0.5;
        y+=0.02*5;
        Triangle=meshT.clone();
        Triangle.translateX(x);
        Triangle.translateY(y);
        scene.add(Triangle);
        compt+=1;
      }
      else{
        x+=-0.5;
        y+=0.02*5;
        Triangle=meshT.clone();
        Triangle.translateX(x);
        Triangle.translateY(y);
        scene.add(Triangle);
      }   
    }
  }
} //fin de la fonction poseTriangle

//Construction des cercles sur la piste
function construCercle(scene){
  const geometry = new THREE.CircleGeometry( 0.025, 128,0,Math.PI*2 );
  const material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
  const circle = new THREE.Mesh( geometry, material );
  circle.position.set(0.05,0.07,0);

  //Boucles qui incrémentent a position y pour placer les cercles correctement
  let circleC;
  let y=0;
  for(i=0; i<7;i++){
    circleC=circle.clone();
    circleC.translateY(y)
    y+=0.14;
    scene.add(circleC);
  }

  y=0;
  for(i=0; i<7;i++){
    circleC=circle.clone();
    circleC.translateY(y)
    circleC.translateX(0.9);
    y+=0.14;
    scene.add(circleC);
  }
} //fin de la fonction construCercle

//Construction de la piste
function piste(scene) {  
  var posi=0;
  for(i=0 ;i<39;i++) {
    if(i%2==0) {  //Creation des lattes 1 couleur sur deux
      var mesh =  new THREE.Mesh(new THREE.BoxGeometry(18, 0.025, 0.01), new THREE.MeshPhongMaterial({color: 0xff7723}));
      mesh.position.set(9,posi+0.0125,-0.01);
      posi+=0.025;
      mesh.receiveShadow=true;
      mesh.castShadow=true;
      scene.add(mesh);
    }
    else {
      var mesh = new THREE.Mesh(new THREE.BoxGeometry(18, 0.025, 0.01), new THREE.MeshPhongMaterial({color: 0xff9923}));
      mesh.position.set(9,posi+0.0125,-0.01);
      posi+=0.025;
      mesh.receiveShadow=true;
      mesh.castShadow=true;
      scene.add(mesh);
    }
  }
} //fin de la fonction piste

//Construction des goutières sur les côtés de la piste
function ConstruGoutiere(scene) {
    geometry = new THREE.CylinderGeometry( 0.15, 0.15, 18, 64,64,true,Math.PI/2,Math.PI);
    let material = new THREE.MeshPhongMaterial( {color: 0xffffff,side:  THREE.DoubleSide,emissive:"#000000"} );
    let cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.set(9,1.125,0);
    cylinder.rotateZ(-Math.PI/2);  
    cylinder.receiveShadow=true;
    cylinder.castShadow = true; 
    scene.add(cylinder);

    let material2 =material.clone();
    let cylinder2 = new THREE.Mesh( geometry, material2 );
    cylinder2.position.set(9,-0.15,0);
    cylinder2.rotateZ(-Math.PI/2);
    scene.add(cylinder2);
} //fin de la fonction ConstruGoutiere

//Construction du sol autour de la piste
function ConstruSol(scene) {
  var mesh = new THREE.Mesh(new THREE.BoxGeometry( 18,1,0.1 ), new THREE.MeshLambertMaterial( {color: 0xad9a96 , side: THREE.DoubleSide}));
  mesh.position.set(9,1.775,-0.05);  
  scene.add(mesh);

  var mesh2 = mesh.clone();
  mesh2.position.set(9,-0.8,-0.05);
  scene.add(mesh2);

  var sol = new THREE.Mesh(new THREE.BoxGeometry(4,3.57,0.1), new THREE.MeshLambertMaterial({color: 0xad9a96}));
  sol.position.set(-2,0.485,-0.05);  
  scene.add(sol);
} //fin de la fonction ConstruSol

//Construction de la boîte où sont placées les quilles
function Construboite(scene) {
  //Construction du mur de gauche
  var boite = new THREE.Mesh(new THREE.BoxGeometry(3,0.1,0.5), new THREE.MeshLambertMaterial({color: 0xad9a96}));
  boite.position.set(16.5,1.335,0.25);  
  scene.add(boite);

  //Construction du mur de droite
  var boite2 = boite.clone();
  boite2.position.set(16.5,-0.35,0.25);
  scene.add(boite2);

  //Construction du toit
  var toit = new THREE.Mesh(new THREE.BoxGeometry(3,1.785,0.1), new THREE.MeshLambertMaterial({color: 0xad9a96}));
  toit.position.set(16.5,0.4925,0.55);
  scene.add(toit);
  
  //Construcion du mur de fond
  var fond = new THREE.Mesh(new THREE.BoxGeometry(0.1,3.6,0.6), new THREE.MeshLambertMaterial({color: 0xad9a96}));
  fond.position.set(18,(19.5)*0.025,0.3);
  scene.add(fond);
} //fin de a fonction Construboite