
      //ARRAYS / TABEAUX
// var myFamily = ["Ones", "Vincent", "Joseph", "Eugene", "Alphonsine", "Delphine", "Lambert", "Emmanuel", "Olivier"];
//
// for(i = 0; i < myFamily.length; i++){
//   console.log(myFamily[i]);
// }
//
// console.log (myFamily.length);


      // OBJECTS
// var moi = {
//   nom: "NSHIMIYUMUKIZA",
//   prenom: "Olivier",
//   age: "30",
// }
//
// console.log("Je m'appelle " + moi.nom + " " + moi.prenom + " et j'ai " + moi.age + " ans");
//
      // UNE BOUCLE POUR AFFICHER TOUT LES DONNEES D'UNE OBJET
// for(var identite in moi){
//   console.log(moi[identite]);
// }

    //FONCTION CONSTRUCTEUR ( Quand on a plusieures objets, pour simplifier le code on doit cree une fonction constructeur )

// function FamilleCyiza(nom, prenom, age){
//   this.nom = nom;
//   this.prenom = prenom;
//   this.age = age;
// }

// var bucura = new FamilleCyiza("NSHIMIYUMUKIZA", "Olivier", 30);
// var imfura = new FamilleCyiza("NIYITEGEKA", "Onesphore", 48);
//
// console.log(bucura);
// console.log(imfura);


        // JEU DU SERPENT

window.onload = function(){ // une fonction qui executera apres le chargement de la page

    var canvas; // on déclare une variable qui representera une espace pour y dessiner un serpent, autrement espace de jeu du serpent.
    var canvasWidth = 900; //on cree ne variable, canvasWidth, en precisant la largeur du plan du travail en pixel (900px)
    var canvasHeight = 600; //on cree une variable, canvasHeight, en precisant la hauteur du plan du travail en pixel (600px)
    var blockSize = 30; //la taille de chaque bloque est de 30px
    var ctx; // on déclare une variable, contextuele, qui contiendra le dessin d'un serpent.
    var delay = 100; // On declare le delais, le temps, que le serpent utilisera pour se deplace.
    // var xCoord = 0; // On déclare les coordonées x, d'ou commence le debut, en largeur, du serpent et on l'reinitialise à 0
    // var yCoord = 0;// On déclare les coordonées y, d'ou commence le debut, en hauteur, du serpent et on l'reinitialise à 0
    var snakee;
    var applee;

  init();

  function init(){ // une fonction pour reinitialise des choses
    canvas = document.createElement('canvas') //dans une varibale, canvas, on cree un element  permettant de dessiner sur une page HTML
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "1px solid"; // on cree une bordure pour bien voir les limite de notre plan de travail
    document.body.appendChild(canvas); // afficher le contenu de la variable, canvas, sur la page html
    ctx = canvas.getContext('2d'); // on cree une variable qui contien le contenu, le dessin, en 2dimension, 2D.
    snakee = new Snake([[6,4], [5,4], [4,4]], "right"); //on cree un tableau qui contient les block du serpent
    applee =  new Apple([10, 10]);
    refreshCanvas(); // on appeller une fonction refresh canvas
  }

  function refreshCanvas(){ //une fonction pour refreshir l'image crée dans canvas, pour animer le serpent
    // xCoord += 2; // on place le serpent au debut avec une largeur de 2px à gauche
    // yCoord += 2; // on place le serpent au debut avec une largeur de 2px de haut
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); //a chaque foix que le delais/ delay précis passe, le serpent se met dans une nouvelle position
    // ctx.fillStyle = "red"; // une fonction fillstyle, qui designe le style de couleur pour remplir ce dessin
    // ctx.fillRect(xCoord, yCoord, 50, 10); // une fonction qui dessine un rectangle
    snakee.draw(); //une fonction pour dessiner un serpent
    applee.draw();
    snakee.advance();
    setTimeout(refreshCanvas, delay); //une fonction setTimeout, qui permet d'execute une tel fonction à chaque foix qu'un delais est depassé.
  }

  function drawBlock(ctx, position){
    var x = position[0] * blockSize;
    var y = position[1] * blockSize;
    ctx.fillRect(x,y, blockSize, blockSize);
  }

  function Snake(body, direction){ // on cree une fonction CONSTRUCTEUR qui sera le prototype du serpent et qui va prendre le corp de notre serpent, body et sa direction
    this.body = body;
    this.direction = direction;
    this.draw = function(){ //on attribue a notre constructeur, une methode qui permettra de dessiner un corps dans notre canvas
      ctx.save() //permet de sauvegarde le contenu contextuel,  dessin, comme il était avant
      ctx.fillStyle = "red"; // une fonction fillstyle, qui designe le style de couleur pour remplir ce dessin
      for(var i = 0; i < this.body.length; i++){ //on fait une boucle qui est sense dessiner le serpent
        drawBlock(ctx, this.body[i]);
      }
      ctx.restore();
    };
    this.advance = function(){ //on cree une methode pour faire avance le serpent
      var nextPosition = this.body[0].slice(); // avec la fonction slice il va copier l'element qui l'index est specifier dans[]
      switch(this.direction){ // on utilise les condition switch pour pouvoir dirige le serpent au clavier
        case "left":
        nextPosition[0] -= 1;
          break;
        case "right":
        nextPosition[0] += 1;
          break;
        case "up":
        nextPosition[1] -= 1;
          break;
        case "down":
        nextPosition[1] += 1;
          break;
        default:
          throw("Invalid direction");
        }
      // nextPosition[0] += 1; // on incrimante l'element qui a l'index 0 de 1
      this.body.unshift(nextPosition); // une fonction unshift qui permet d'ajouter à la premiere place l'element entre parethese, cad, nextPosition
      this.body.pop(); // une fonction pop qui va nous permettre de souprimer le dernier element, cad la derniere block du serpent

    };

    this.setDirection = function(newDirection){ // on cree une methode qui va faire en sotre que le serpent se deplace de maniere logique
        var allowedDirections; // on cree une variable qui enregistre les directions permises

        switch(this.direction){
          case "left":
          case "right":
          allowedDirections = ["up", "down"];
            break;
          case "up":
          case "down":
        allowedDirections = ["left", "right"];
            break;
          default:
            throw("Invalid direction");
        }
        if(allowedDirections.indexOf(newDirection) > -1){
          this.direction = newDirection;
        }
    };

    this.checkCollision = function(){ // une fonction qui va nous permettre d'afficher une erreur lorsque le serpent fait une collision, cad, sortir du canvas ou touche son corps avec sa contextuel
      
    }
  }

  function Apple(position){ // une fonction pour cree la pomme
    this.position = position;
    this.draw = function(){ //methode, function, ^pour dessiner le serpent
      ctx.save();
      ctx.fillStyle = "green";
      ctx.beginPath();
      var radius = blockSize / 2;
      var x = position[0]*blockSize + radius;
      var y = position[1]*blockSize + radius;
      ctx.arc(x,y, radius, 0, Math.PI*2, true);
      ctx.fill();
      ctx.restore();


    }
  }



document.onkeydown = function handleKeyDown(e){ // on fait des fonction a partir des evenement clavier
  var key = e.keyCode; // on enregistre dans une variable key, la clé lier à une touche du clavier
  var newDirection; //on cree une variablle qui cree une nouvelle direction à fonction d'une touche appuyé

    switch(key){
      case 37:
      newDirection = "left";
        break;
      case 38:
      newDirection = "up";
        break;
      case 39:
      newDirection = "right";
        break;
      case 40:
      newDirection = "down";
        break;
      default:
        return;
    }
    snakee.setDirection(newDirection);

}

}
