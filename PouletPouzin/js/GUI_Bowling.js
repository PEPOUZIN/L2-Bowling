//Définition des variables contenant les éléments du tableau de score
var eq2 = document.getElementsByClassName("equipe2");
var eq1 = document.getElementsByClassName("equipe1");

function BouleGUI(gui, menuGUI, boule) {
    //Ajoute des dossiers dans le gui pour chaque équipe
    let guiBoule1 = gui.addFolder("Equipe 1");
    let guiBoule2 = gui.addFolder("Equipe 2");

    //Dans le dossier de l'équipe 1, on ajoute une palette de couleur pour choisir la couleur de la boule
    guiBoule1.addColor(menuGUI, "Couleur_Boule1").onChange(function (coul) {
        if(boule1) {
            boule.material.color.setStyle(coul);
        }
        //Change la couleur de bordure des cellules du tableau de l'équipe 2 et la couleur du score dans le tableau de l'équipe 1
        for(let i=0; i<eq2.length;i++) {
            eq2[i].style.borderColor = coul;
            eq1[i].style.color = coul;
        }
    })

    //Dans le dossier de l'équipe 2, on ajoute une palette de couleur pour choisir la couleur de la boule
    guiBoule2.addColor(menuGUI, "Couleur_Boule2").onChange(function (coul) {
        if(boule2) {
            boule.material.color.setStyle(coul);
        }
        //Change la couleur de bordure des cellules du tableau de l'équipe 1 et la couleur du score dans le tableau de l'équipe 2
        for(let i=0; i<eq1.length;i++) {
            eq1[i].style.borderColor = coul;
            eq2[i].style.color = coul;
        }
    })
}

function trajectoire(gui, menuGUI, material_rectiligne, material_bezier12, material_bezier34,geometry_rectiligne, geometry_bezier1, geometry_bezier2, geometry_bezier3, geometry_bezier4, boule, points_rect, points_b1, points_b2, points_b3, points_b4, point_deb, point_fin, curve_rect, curve1, curve2, curve3, curve4) {
    
    //Menu déroulant permettant de choisir la trajectoire de lancer
    gui.add(menuGUI, "Type_Trajectoire", ["Rectiligne", "Courbe_1", "Courbe_2"]).onChange(function (e) {
        //On affiche la courbe voulue et on cache les autres
        if(e == "Rectiligne") {
            material_bezier12.opacity = 0.0;
            material_bezier34.opacity = 0.0;
            material_rectiligne.opacity = 1.0;
        }
        else if(e == "Courbe_1") {
            material_bezier12.opacity = 1.0;
            material_bezier34.opacity = 0.0;
            material_rectiligne.opacity = 0.0;
        }
        else if(e == "Courbe_2") {
            material_bezier12.opacity = 0.0;
            material_bezier34.opacity = 1.0;
            material_rectiligne.opacity = 0.0;
        }
    })

    //Ajoute un dossier dans le gui
    let jeu = gui.addFolder("Paramètres de lancer");

    //Ajoute une barre de sélection dans le dossier, modifie la position de la boule et l'allure de chaque courbe
    jeu.add(menuGUI, "Position_Depart", 0, 1).onChange(function () {
        boule.position.setY(menuGUI.Position_Depart);
        point_deb.y = menuGUI.Position_Depart;
        points_rect[0].y = menuGUI.Position_Depart;
        points_b1[0].y = menuGUI.Position_Depart;
        points_b3[0].y = menuGUI.Position_Depart;
        points_rect = curve_rect.getPoints(10);
        points_b1 = curve1.getPoints(10);
        points_b3 = curve3.getPoints(10);
        geometry_rectiligne.setFromPoints(points_rect);
        geometry_bezier1.setFromPoints(points_b1);
        geometry_bezier3.setFromPoints(points_b3);
    })

    //Ajoute une barre de sélection dans le dossier, modifie l'allure de chaque courbe
    jeu.add(menuGUI, "Position_Arrivee", 0, 1).onChange(function () {
        point_fin.y = menuGUI.Position_Arrivee;
        points_rect[points_rect.length-1].y = menuGUI.Position_Arrivee;
        points_b2[points_b2.length-1].y = menuGUI.Position_Arrivee;
        points_b4[points_b4.length-1].y = menuGUI.Position_Arrivee;
        points_rect = curve_rect.getPoints(10);
        points_b2 = curve2.getPoints(10);
        points_b4 = curve4.getPoints(10);
        geometry_rectiligne.setFromPoints(points_rect);
        geometry_bezier2.setFromPoints(points_b2);
        geometry_bezier4.setFromPoints(points_b4);
    })

    //Ajoute un bouton pour lancer la boule
    gui.add(menuGUI, "Lancer");
}