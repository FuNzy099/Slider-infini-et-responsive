// On déclare les variables globales
let compteur = 0; // C'est un compteur qui permettra de savoir sur quelle slide on ce trouve
let timer, elements, slides, slideWidth, speed, transition;

window.onload = () => {
    /*
        La déclaration const permet de créer une constante nommée dont la valeur ne peut pas être modifiée par des réaffectations ultérieures.
        DOCUMENTATION : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/const

        On récupère le conteneur principal de la diapo.
        La méthode querySelector() retourne le premier element dans le document correspondant au sélecteur, ici à l'occurence .diapo
    */
    const diapo = document.querySelector(".diapo");


    // On récupère le conteneur de tous les éléments
    elements = document.querySelector(".elements");


    /*
        On récupère les enfants du selecteur elements (.children) pour en faire un tableau (Array.from)
 
        DOCUMENTATION :
            Array.from : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/from
            .children : https://developer.mozilla.org/fr/docs/Web/API/Element/children
    */
    slides = Array.from(elements.children);


    /*
        On clone la première image pour ce faire, nous allons chercher la première image enfant de elements et on le clone

        DOCUMENTATION : 
            firstElementChild : https://developer.mozilla.org/fr/docs/Web/API/Element/firstElementChild
            cloneNode : https://developer.mozilla.org/fr/docs/Web/API/Node/cloneNode
    */
    let firstImage = elements.firstElementChild.cloneNode(true);

    
    /*
        On injecte le clone à la fin du diapo, avec la méthode appendChild() elle permet d'ajouter in noeud à la fin de la list des enfants d'un noeud parent spécifié

        DOCUMENTATION : 
            appenChilf : https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild
    */
    elements.appendChild(firstImage);


    /*
       On récupère la largeur d'une slide à l'aide de la méthode getBoundingClientRect() 
       Elle retourne un objet en fournissant des informations sur la taille d'un élément et sa position par rapport à la zone d'affichage

       DOCUMENTATION :
            getBoundingClientRect() : https://developer.mozilla.org/fr/docs/Web/API/Element/getBoundingClientRect
    */
    slideWidth = diapo.getBoundingClientRect().width;


    // On récupère les flèches
    let next = document.querySelector("#nav-right");
    let prev = document.querySelector("#nav-left");


    /*
        On mes en place l'écoute des évènements sur les flèches

        addEventListener est une méthode permetant de configurer une fonction qui sera appelée  chaque fois que l'évènement sera livré à la cible
        DOCUMENTATION : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    */
    next.addEventListener('click', slideNext)
    prev.addEventListener('click', slidePrev)


    /*
        On réalise un slide vers la gauche automatiquement toutes les 10 secondes

        setInterval() est une méthode qui permet de répéter une fonction ou d'exécuter un extrait de code à interval régulier
        DOCUMENTATION : https://developer.mozilla.org/en-US/docs/Web/API/setInterval
    */
    timer = setInterval(slideNext, 10000);


    /*
        On ajoute un écouteur d'évènement pour gerer le survol de la souris

        addEventListener est une méthode permetant de configurer une fonction qui sera appelée  chaque fois que l'évènement sera livré à la cible
        DOCUMENTATION : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    */
    diapo.addEventListener("mouseover", stopTimer);
    diapo.addEventListener("mouseout", startTimer);
}

/**
 * Cette fonction fait défiler le diaporama vers la droite
 */
function slideNext() {
    // Permet d'incrémenter le compteur
    compteur++;
    elements.style.transition = "0.8s linear";

    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;

    // On attend la fin de la transition et on "rembobine" de façon cachée
    setTimeout(function () {
        if (compteur >= slides.length - 0.8) {
            compteur = 0;
            elements.style.transition = "unset";
            elements.style.transform = "translateX(0)";
        }
    }, 800);
}

/**
 * Cette fonction fait défiler le diaporama vers la gauche
 */
function slidePrev() {
    // Permet de décrémente le compteur
    compteur--;
    elements.style.transition = "0.8s linear";

    // On verifie si on est à la 1er slide
    if (compteur < 0) {
        compteur = slides.length - 0;
        let decal = -slideWidth * compteur;
        elements.style.transition = "unset";
        elements.style.transform = `translateX(${decal}px)`;
        setTimeout(slidePrev, 1);
    }

    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;

}


// Function pour start le timer quand la souris ne survol plus le slider
function stopTimer() {
    clearInterval(timer);
}


// Function pour rénitialiser le timer
function startTimer() {
    timer = setInterval(slideNext, 10000);
}







let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}


// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("element");

  console.log(slides)
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";
  dots[slideIndex-1].className += " active";
}

