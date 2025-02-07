const borneVue=6;         //amplitude de deplacement de la camera
const r = 0.1;            //rayon de la boule
const v = 5;              //vitesse de déplacement de la boule
var start = null;         //temps de départ de la boule
var courb = 0;            //numéro de la courbe choisie
var n_lancer = 0;         //nombre de lancer par équipe
var n_tour = 1;           //nombre de tours depuis le début de la partie
var lancer_fini = false;  //booléen vérifiant si la boule a fini de se déplacer
var boule1 = true;        //booléens vérifiant quelle équipe joue
var boule2 = false;

const PrecisionArrondi=50;
// test si un nombre est nul
const epsilon = 0.00000001;
function testZero(x){
  var val=parseFloat(Number(x).toPrecision(PrecisionArrondi));
  if (parseFloat(Math.abs(x).toPrecision(PrecisionArrondi))<epsilon) val=0;
  return val;
} //fin fonction testZero

function vecteur(MaScene, A, B, CoulHexa, longCone, RayonCone) {
  let vectAB = new THREE.Vector3(B.x-A.x, B.y-A.y, B.z-A.z);
  vectAB.normalize();
  MaScene.add(new THREE.ArrowHelper(vectAB, A, B.distanceTo(A), CoulHexa, longCone, RayonCone));
} //fin fonction vecteur

function repere(MaScene) {
  let O = new THREE.Vector3(0,0,0);
  vecteur(MaScene, O, new THREE.Vector3(1,0,0), 0xFF0000, 0.25, 0.125);
  vecteur(MaScene, O, new THREE.Vector3(0,1,0), 0x00FF00, 0.25, 0.125);
  vecteur(MaScene, O, new THREE.Vector3(0,0,1), 0x0000FF, 0.25, 0.125);
} //fin fonction repere

function tracePt(MaScene, P, CoulHexa,dimPt,bol){
  let sphereGeometry = new THREE.SphereGeometry(dimPt,12,24);
  let  sphereMaterial = new THREE.MeshBasicMaterial({color: CoulHexa });
  let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(P.x,P.y,P.z);
  if (bol) MaScene.add(sphere);
  return sphere;
 } // fin function tracePt

function creeBoule() {
  let sphere = new THREE.SphereGeometry(r, 100, 100);   //sphere de rayon 0.1, 100 segments horizontaux et verticaux pour que la sphere soit plus lisse
  let phong = new THREE.MeshPhongMaterial({             //materiau de la sphère
    color: "#000000",                                   //couleur noire
    emissive: 0x000000,                                 //couleur noire
    flatShading: true,                                  //
    shininess: 50,                                      //brillance à 50
    side: THREE.FrontSide,                              //on affiche que l'extérieur de la sphère puisqu'on ne voit pas ce qui se passe à l'intérieur
  });
  return new THREE.Mesh(sphere, phong);                 //retourne la boule à partir de sa géométrie et de son matériau
} //fin fonction creeBoule

function creeRectiligne(points) {
  let material_rectiligne = new THREE.LineBasicMaterial({color: 0x000000, transparent: true});
  let geometry_rectiligne = new THREE.BufferGeometry();                                         
  return new THREE.Line(geometry_rectiligne.setFromPoints(points), material_rectiligne);        //retourne la droite rectiligne à partir de sa géométrie et de son matériau
} //fin fonction creeRectiligne

function init(){
 var stats = initStats();
 // creation de rendu et de la taille
 let rendu = new THREE.WebGLRenderer({ antialias: true });
 rendu.shadowMap.enabled = true;
 let scene = new THREE.Scene();
 let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
 rendu.shadowMap.enabled = true;
 rendu.setClearColor(new THREE.Color(0xFFFFFF));
 rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
 cameraLumiere(scene,camera);
 lumiere(scene);
 //repere(scene);

 //Déplacement avec la souris
 controls = new THREE.OrbitControls(camera, rendu.domElement);
 
 /*
 const gridHelp = new THREE.GridHelper(100,100,0xEE82EE,0xE6E6FA);  //grille d'aide pour les mesures
 gridHelp.position.set(0,0,0);
 gridHelp.rotateX(Math.PI/2);
 scene.add(gridHelp);*/

 //********************************************************
 //
 //  P A R T I E     G E O M E T R I Q U E
 //
 //********************************************************

//Définition des points de départ et d'arrivée
let point_deb = new THREE.Vector3(0,19.5*0.025,r);
let point_fin = new THREE.Vector3(18,19.5*0.025,r);

//Définition de la droite rectiligne (Rectiligne)
let points = [];
points.push(point_deb);
points.push(point_fin);
let rectiligne = creeRectiligne(points);
let curve_rect = new THREE.LineCurve(point_deb, point_fin);
points = curve_rect.getPoints(10);
scene.add(rectiligne);

//Définition des points de contrôles des courbes de Bézier de gauche
//P0 = point_deb
let P1 = new THREE.Vector3(5,0.95,r);
let P2 = new THREE.Vector3(7.5,0.45+(point_fin.y+point_deb.y)/2,r);
let P3 = new THREE.Vector3((point_fin.x+point_deb.x)/2, 0.45+(point_fin.y+point_deb.y)/2, r);
//P3 = M0
let M0 = new THREE.Vector3(P3.x, P3.y, r);
let M1 = new THREE.Vector3(11.5,0.45+(point_fin.y+point_deb.y)/2,r);
let M2 = new THREE.Vector3(13,0.95,r);
//M3 = point_fin
let k = 1;

//Définition de la tangente au point P3
let P2P3 = new THREE.Vector3(0,0,0);
let Tan1 = new THREE.Vector3(0,0,0);
P2P3.subVectors(P3,P2);
Tan1.addScaledVector(P2P3, k);
M1.addVectors(M0, Tan1);

//Définition des courbes de Bézier de droite (Courbe_1)
let curve1 = new THREE.CubicBezierCurve3(point_deb, P1, P2, P3);
let curve2 = new THREE.CubicBezierCurve3(M0, M1, M2, point_fin);
let points_b1 = curve1.getPoints(10);
let points_b2 = curve2.getPoints(10);
let material_bezier12 = new THREE.LineBasicMaterial({color: "#FF0000", transparent: true});
let material_bezier34 = new THREE.LineBasicMaterial({color: "#FF0000", transparent: true});
let geometry_bezier1 = new THREE.BufferGeometry().setFromPoints(points_b1);
let geometry_bezier2 = new THREE.BufferGeometry().setFromPoints(points_b2);
let bezier1 = new THREE.Line(geometry_bezier1, material_bezier12);
let bezier2 = new THREE.Line(geometry_bezier2, material_bezier12);
//Affichage des courbes de gauche
scene.add(bezier1);
scene.add(bezier2);


//Définition des points de contrôles des courbes de Bézier de droite
//T0 = point_deb
let T1 = new THREE.Vector3(5,0.05,r);
let T2 = new THREE.Vector3(7.5,(point_fin.y+point_deb.y)/2-0.45,r);
let T3 = new THREE.Vector3((point_fin.x+point_deb.x)/2, (point_fin.y+point_deb.y)/2-0.45, r);
//T3 = S0
let S0 = new THREE.Vector3(T3.x, T3.y, r);
let S1 = new THREE.Vector3(11.5,(point_fin.y+point_deb.y)/2-0.45,r);
let S2 = new THREE.Vector3(13,0.05,r);
//S3 = point_fin

//Définition de la tangente au point T3
let T2T3 = new THREE.Vector3(0,0,0);
let Tan2 = new THREE.Vector3(0,0,0);
T2T3.subVectors(T3,T2);
Tan2.addScaledVector(T2T3, k);
S1.addVectors(S0, Tan2);

//Définition des courbes de Bézier de droite (Courbe_2)
let curve3 = new THREE.CubicBezierCurve3(point_deb, T1, T2, T3);
let curve4 = new THREE.CubicBezierCurve3(S0, S1, S2, point_fin);
let points_b3 = curve3.getPoints(10);
let points_b4 = curve4.getPoints(10);
let geometry_bezier3 = new THREE.BufferGeometry().setFromPoints(points_b3);
let geometry_bezier4 = new THREE.BufferGeometry().setFromPoints(points_b4);
let bezier3 = new THREE.Line(geometry_bezier3, material_bezier34);
let bezier4 = new THREE.Line(geometry_bezier4, material_bezier34);
//Affichage des courbes de droite
scene.add(bezier3);
scene.add(bezier4);

//Création et affichage de la boule
let boule = creeBoule();            //on crée la boule
boule.castShadow = true;            //recoit la lumière
boule.receiveShadow = true;         //renvoie la lumière
scene.add(boule);                   //affichage de la boule dans la scene
boule.position.set(0,19.5*0.025,r); //place la boule au milieu de la piste

 //********************************************************
 //
 // F I N      P A R T I E     G E O M E T R I Q U E
 //
 //********************************************************

 //********************************************************
 //
 //  D E B U T     M E N U     G U I
 //
 //********************************************************
 let gui = new dat.GUI();//interface graphique utilisateur
  // ajout du menu dans le GUI
 let menuGUI = new function () {
   this.cameraxPos = camera.position.x;
   this.camerayPos = camera.position.y;
   this.camerazPos = camera.position.z;
   this.cameraZoom = 1;
   this.cameraxDir = 0;
   this.camerayDir = 0;
   this.camerazDir = 0;

   //Couleur initiale de la boule
   this.Couleur_Boule1 = boule.material.color.getStyle();
   this.Couleur_Boule2 = boule.material.color.getStyle();

   //Trajectoire sélectionnée
   this.Type_Trajectoire = "";

   //Position du point de départ et d'arrivée
   this.Position_Depart = point_deb.y;
   this.Position_Arrivee = point_fin.y;

   //Lance la boule en fonction de la courbe sélectionnée, incrémente le compteur de lancer
   this.Lancer = function() {
    if(this.Type_Trajectoire == "Rectiligne") courb = 5;
    else if(this.Type_Trajectoire == "Courbe_1") courb = 1;
    else if(this.Type_Trajectoire == "Courbe_2") courb = 3;
    n_lancer = n_lancer+1;
    DeplaceCbz();
   }

   //pour actualiser dans la scene
   this.actualisation = function () {
    posCamera();
   }; // fin this.actualisation
 }; // fin de la fonction menuGUI
 // ajout de la camera dans le menu, fonction dans le fichier cameraLumiere.js
 ajoutCameraGui(gui, menuGUI, camera);

 //Ajout de la couleur des équipes dans le menu, fonction dans le fichier GUI_Bowling.js
 BouleGUI(gui, menuGUI, boule);
 //Ajout du choix de la trajectoire et de la position des points de départ et d'arrivée dans le menu, fonction dans le fichier GUI_Bowling.js
 trajectoire(gui, menuGUI, rectiligne.material, bezier1.material, bezier3.material, rectiligne.geometry, bezier1.geometry, bezier2.geometry, bezier3.geometry, bezier4.geometry, boule, points, points_b1, points_b2, points_b3, points_b4, point_deb, point_fin, curve_rect, curve1, curve2, curve3, curve4);
 //ajout du menu pour actualiser l'affichage
 gui.add(menuGUI, "actualisation");
 menuGUI.actualisation();
 //********************************************************
 //
 //  F I N     M E N U     G U I
 //
 //********************************************************
 
 //Initialisation par défaut des couleurs des bordures et du textes du tableau de score
 let eq1 = document.getElementsByClassName("equipe1");
 for(let i=0; i<eq1.length;i++) {
   eq1[i].style.borderColor = gui.Couleur_Boule2;
   eq1[i].style.color = gui.Couleur_Boule1;
 }
 let eq2 = document.getElementsByClassName("equipe2");
 for(let i=0; i<eq2.length;i++) {
   eq2[i].style.borderColor = gui.Couleur_Boule1;
   eq2[i].style.color = gui.Couleur_Boule2;
 }

 renduAnim();

 function posCamera(){
  camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom),menuGUI.camerayPos*testZero(menuGUI.cameraZoom),menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
  camera.lookAt(menuGUI.cameraxDir,menuGUI.camerayDir,menuGUI.camerazDir);
  actuaPosCameraHTML();
 }
  // ajoute le rendu dans l'element HTML
 document.getElementById("webgl").appendChild(rendu.domElement);

 function actuaPosCameraHTML(){
  document.forms["controle"].PosX.value=testZero(menuGUI.cameraxPos);
  document.forms["controle"].PosY.value=testZero(menuGUI.camerayPos);
  document.forms["controle"].PosZ.value=testZero(menuGUI.camerazPos); 
  document.forms["controle"].DirX.value=testZero(menuGUI.cameraxDir);
  document.forms["controle"].DirY.value=testZero(menuGUI.camerayDir);
  document.forms["controle"].DirZ.value=testZero(menuGUI.camerazDir);
 }

  function renduAnim() {
    stats.update();
    // render avec requestAnimationFrame
    requestAnimationFrame(renduAnim);
// ajoute le rendu dans l'element HTML
    rendu.render(scene, camera);
  }

  //Fonction permettant de déplacer la boule sur une courbe
  function DeplaceCbz(t){
    if(start == null) {
      start = t;          //On récupère le temps de départ
    }
    let delai = t-start;  //On récupère le temps écoulé

    //Type_Trajectoire = Courbe_1
    if(courb==1){
      curve1.getPoint((delai*v*0.0001)%1, boule.position);  //La boule se déplace sur curve1
      if(boule.position.x>P3.x-0.1){                        //Lorsque la boule arrive à la fin de curve1
        courb=2;                                            //La boule passe sur curve2
      }
    }
    if (courb==2){
      curve2.getPoint((delai*v*0.0001)%1, boule.position);  //La boule se déplace sur curve2 
      if(boule.position.x>=point_fin.x-0.1){                //Lorsque la boule arrive à la fin de curve2
        courb=0;                                            //Réinitialisation de courb
        lancer_fini = true;                                 //Le lancer est terminé
      }
    }

    //Type_Trajectoire = Courbe_2
    if(courb==3){
      curve3.getPoint((delai*v*0.0001)%1, boule.position);  //La boule se déplace sur curve3
      if(boule.position.x>=T3.x-0.1){                       //Lorsque la boule arrive à la fin de curve3
        courb=4;                                            //La boule passe sur curve4
      }
    }
    if (courb==4){
      curve4.getPoint((delai*v*0.0001)%1, boule.position);  //La boule se déplace sur curve4
      if(boule.position.x>=point_fin.x-0.1){                //Lorsque que la boule arrive à la fin de curve4
        courb=0;                                            //Réinitialisation de courb
        lancer_fini = true;                                 //Le lancer est rerminé
      }
    }

    //Type_Trajectoire = Rectiligne
    if(courb == 5) {
      curve_rect.getPoint((delai*v*0.0001)%1, boule.position);  //La boule se déplace sur curve_rect
      if(boule.position.x>=point_fin.x-0.3){                    //Lorsque la boule arrive à la fin de curve_rect
        courb=0;                                                //Réinitialisation de courb
        lancer_fini = true;                                     //Le lancer est terminé
      }
    }

    //Si le lancer est terminé
    if(lancer_fini) {
      lancer_fini = false;  //Réinitialisation du lancer
      if(n_tour == 1) eq1[0].innerHTML = Math.floor(Math.random()*6); //Atttribution d'un score aléatoire entre 0 et 6 exclu à l'équipe 1 au 1er tour de la manche 1
      if(n_tour == 2) eq1[1].innerHTML = Math.floor(Math.random()*6); //Atttribution d'un score aléatoire entre 0 et 6 exclu à l'équipe 1 au 2nd tour de la manche 1
      if(n_tour == 3) eq2[0].innerHTML = Math.floor(Math.random()*6); //Atttribution d'un score aléatoire entre 0 et 6 exclu à l'équipe 2 au 1er tour de la manche 1
      if(n_tour == 4) eq2[1].innerHTML = Math.floor(Math.random()*6); //Atttribution d'un score aléatoire entre 0 et 6 exclu à l'équipe 2 au 2nd tour de la manche 1
      if(n_tour == 5) eq1[2].innerHTML = Math.floor(Math.random()*6); //Atttribution d'un score aléatoire entre 0 et 6 exclu à l'équipe 1 au 1er tour de la manche 2
      if(n_tour == 6) eq1[3].innerHTML = Math.floor(Math.random()*6); //Atttribution d'un score aléatoire entre 0 et 6 exclu à l'équipe 1 au 2nd tour de la manche 2
      if(n_tour == 7) eq2[2].innerHTML = Math.floor(Math.random()*6); //Atttribution d'un score aléatoire entre 0 et 6 exclu à l'équipe 2 au 1er tour de la manche 2
      if(n_tour == 8) {
        eq2[3].innerHTML = Math.floor(Math.random()*6);               //Atttribution d'un score aléatoire entre 0 et 6 exclu à l'équipe 2 au 2nd tour de la manche 2
        let score1 = 0;     //Initialisation du compteur du score de l'équipe 1
        let score2 = 0;     //Initialisation du compteur du score de l'équipe 2
        for(let i=0;i<4;i++) {
          score1 = score1 + parseInt(eq1[i].innerText); //Total du score de l'équipe 1
          score2 = score2 + parseInt(eq2[i].innerText); //Total du score de l'équipe 2
        }
        //Affiche un alerte indiquant l'équipe victorieuse
        if(score1 > score2) alert("L'équipe 1 a gagné");
        else if(score1 < score2) alert("L'équipe 2 à gagné");
        else alert("Egalité");
      }
      n_tour = n_tour + 1;  //Incrémentation du nombre de tour
      if(n_lancer == 2) {   //Si une équipe a fait 2 lancers
        changeBoule();      //On change la couleur de la boule
        n_lancer = 0;       //Réinitialisation du compteur de lancer
      }
      boule.position.set(0,0.5,r);  //Replace la boule au point de départ
    }
    requestAnimationFrame(DeplaceCbz);  //render avec requestAnimationFrame
  }

  //Effectue le changement de couleur de la boule
  function changeBoule() {
    if(boule1 == true) {    //Si l'équipe 1 jouait
      boule1 = false;
      boule2 = true;
      boule.material.color.setStyle(gui.Couleur_Boule2);  //La boule prend la couleur de l'équipe 2
    }
    else {
      boule2 = false;
      boule1 = true;
      boule.material.color.setStyle(gui.Couleur_Boule1);  //Sinon, la boule prend la couleur de l'équipe 1
    }
  }

    //Construction de la piste, fonction dans le ficher Piste.js
    piste(scene);
    //Construction des goutières, fonction dans le ficher Piste.js
    ConstruGoutiere(scene);
    //Construction du sol, fonction dans le ficher Piste.js
    ConstruSol(scene);
    //Construction de la boite autour des quilles, fonction dans le ficher Piste.js
    Construboite(scene);
    //Construction des quilles, fonction dans le ficher Piste.js
    AfficheQuille(scene);
    //Construction des triangles sur la piste, fonction dans le ficher Piste.js
    poseTriangle(scene);
    //Construction des cercles sur la piste, fonction dans le ficher Piste.js
    construCercle(scene);
    //Affichage des parallélépipèdes rectangles autour des quilles, fonction dans le ficher Piste.js
    //AfficheBox(scene);
} // fin fonction init()