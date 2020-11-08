// dot counter intial
let dotCounter = 0

//fullpage JS Settings
new fullpage('#fullpage', {
	//options here
	autoScrolling:true,
    scrollHorizontally: true,
    navigation: true,
    //inform users section at -- tooltip
    navigationTooltips: ['Story','Statistics', 'The Base', 'Symptoms', 'Reach Out'],
    //turning slideshow default arrows off
    slidesNavigation: true,
    slidesNavPosition:'bottom',
    controlArrows: false,

    //==========only animate when user leaves section===========
    onLeave: function(origin, destination, direction){

        if (destination.index==1){
            statisticSection(destination)
        }
        else if (destination.index==2){
            basicSection(destination)
        }
        else if (destination.index==3){
            symptomSection(destination)
        }
        else if (destination.index==4){
            reachOutSection(destination)
        }
    },

    afterRender: function(){
        homepageSection()
    },

    onSlideLeave: function(section, origin, destination, direction){
        //only when in symptom slide section
        if(section.index == 3){
            animateSymptomSlide(destination.item, destination.index)
        }
    }
});

//====== setting background music in loop================//
const bgMusic = new Audio('bgmusic.mp3')
bgMusic.loop=true;

const soundBtn= document.querySelector ('#volume-switch')
soundBtn.addEventListener('sl-change', () =>{
    if(bgMusic.paused){
        bgMusic.play()
    }
    else{
        bgMusic.pause()
    }
})

//================activating cursor===================
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e =>{
    cursor.setAttribute("style", "top: "+(e.pageY-15)+"px; left: "+(e.pageX-15)+"px;")
})

//================hamburger menu activation===================
const hamburgerBtn = document.querySelector('.hamburger-menu')

hamburgerBtn.addEventListener('click', () => {
    const primaryNav=document.querySelector('.primary-nav')
    primaryNav.classList.toggle('open')
})

//======= trigger home page storyboard============
let startBtn=document.querySelector('.start')
startBtn.addEventListener('click', () => {
    storyboard2()
})


let skipBtn=document.querySelector('.skip')
skipBtn.addEventListener('click', () => {
    fullpage_api.moveTo(2);
})

//======= trigger storyboard continuation============
const circleDots = document.querySelectorAll('.circle-dot')

circleDots.forEach(dot => {
    dot.addEventListener('click', () => {
        dot.classList.add('hidden')
        dotCounter++
        // once 3 dots have been clicked
        if(dotCounter >= 3){
            const story3Tl= new TimelineMax
            story3Tl.to('#human-eye-close', {opacity:0, duration:4})
                .to('.breathe', {opacity:0, duration:1.5}, "-=6")
                .to('.home-bottom-text', {opacity:0, duration:1.5}, "-=6")
                .to('#human-eye-open', {opacity:0.7, duration:4}, "-=5")
                .to('.story3', {opacity:1, duration:1.1})
                .to('.story3', {opacity:0}, "+=1.5")
                .to('.story4', {opacity:1, duration:3})
                .to('.story4', {opacity:0})
                .to('#human-eye-open', {opacity:0})
                .to('#human-smoke-overlay', {opacity:0, display:"none"}, "-=1")
                .fromTo('#smoke-effect', {display:'block',opacity:0, x:-500}, {opacity:1, x:0, duration:3.5})
                .to('#smoke-centre', {display:'block', opacity:1, duration:1.5})
                .to('.explanation', {opacity:1, duration:2}, "-=2")
                .to('.explanation', {opacity:0, duration:1}, "+=10")
                .to('.information-1', {opacity:1, duration:2})
                .to('.information-1', {opacity:0, duration:1}, "+=5")
                .to('.information-2', {opacity:1, duration:2})
                .fromTo('.scroll-down', {y:-15}, {y:15, opacity:1, repeat:-1, yoyo:true, duration:1.5})
        }
    })    
})

//===============homepage section animations===============
function homepageSection(){
    const story1Tl= new TimelineMax({delay: 0.5})

    //animating individual elements
    story1Tl.from('.start', {opacity:0, duration: 2.5, ease:'ease-in', repeat: -1})
        .from('.skip', {opacity:0, duration: 2.5, ease:'ease-in', repeat: -1}, "-=2.4")
        .from('#human-smoke-overlay', {opacity:0, duration:5, ease: 'slow'}, "-=2.5")
        .fromTo('#human-smoke-overlay', {x:-20, opacity:0.9, ease: 'elastic'}, {x:15, opacity:1, duration:3, repeat:-1, yoyo: true}, "-=1")
        .from('#human-eye-close', {opacity: 0, ease:'ease-in', duration:5}, "-=7.5")
}

function storyboard2(){
    const story2Tl= new TimelineMax
    story2Tl.to ('.start', {display:'none', ease:'ease-out', duration: 1.5})
        .to ('.skip', {display:'none', ease:'ease-out', duration: 1.5}, "-=1.5")
        .fromTo('.breathe', {opacity:0}, {display:'block', opacity:1, duration:2})
        .fromTo('.home-bottom-text', {opacity:0}, {display:'block', opacity:1, duration:2}, "-=2")
        .to('.circles', {display: 'block'}, '-=6')
        .from('.solid-circle', {opacity: 0, duration:2, ease: 'power1', repeat:-1}, "-=1.5")
        .from('.stroke-circle-2', {opacity:0, duration:2.5, ease:'power1', repeat:-1}, "-=2.5")
        .from('.stroke-circle-1', {opacity:0, duration:2.3, ease:'power1', repeat:-1}, "-=2.5")
}

//======= trigger prompt user to next section after storyboard============
let jumpToS2Btn=document.querySelector('.scroll-down')
jumpToS2Btn.addEventListener('click', () => {
    fullpage_api.moveTo(2);
})

//======= STATISTICS SECTION============
function statisticSection(destination){
    let section = destination.item
    let content=section.querySelector('.statistics-content')
    
    const statisticTl = new TimelineMax({delay: 0.5})
        statisticTl.from(".stat", {y:-150, opacity:0.5, duration:2})
            .from("#progress-ring", {percentage:"0", duration:4}, "-=2")
            .from(content, {opacity:0, duration:2}, "-=2")
            .fromTo(".scroll-down-s2", {y:-15, opacity:0}, {y:15, opacity:1, repeat:-1, yoyo:true, duration:1.5})
}

//======= trigger prompt user to next section after stats============
let jumpToS3Btn=document.querySelector('.scroll-down-s2')
jumpToS3Btn.addEventListener('click', () => {
    fullpage_api.moveTo(3);
})

//============BASICS SECTION===============
function basicSection(destination){
    let section = destination.item
    let basicsOne=section.querySelector('.traumatic-event')

    const basicTl = new TimelineMax ({delay:0.5})
        basicTl.from(basicsOne, {x:1000, opacity:0, duration:3, ease: 'power3'})
            .from(".misconceptions", {x:-1000, opacity:0, duration:3, ease: 'power3'}, "-=2")
            .from(".impact", {x:1000, opacity:0, duration:3, ease: 'power3'}, "-=3")
            .from(".veterans", {x:-1000, opacity:0, duration:3, ease: 'power3'}, "-=4")
            .fromTo(".scroll-down-s3", {y:-15, opacity:0}, {y:15, opacity:1, repeat:-1, yoyo:true, duration:1.5}, "-=1")
}

//======= trigger prompt user to next section after basics section============
let jumpToS4Btn=document.querySelector('.scroll-down-s3')
jumpToS4Btn.addEventListener('click', () => {
    fullpage_api.moveTo(4);
})

//===================================SYMPTOM SECTION=========================================
function symptomSection(destination){
    animateSymptomSlide(destination.item, 0)
}

//==========LISTEN FOR CLICK ON SLIDESHOW BUTTONS===============
let nextSlideBtn = document.querySelectorAll('.next-slide-btn')
nextSlideBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        fullpage_api.moveSlideRight();
    })
})

let prevSlideBtn = document.querySelectorAll('.prev-slide-btn')
prevSlideBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        fullpage_api.moveSlideLeft();
    })
})

//===========SLIDESHOW ANIMATIONS==================
function animateSymptomSlide(slide){
    let slideImage = slide.querySelector('.slide .slide-img')
    let slideContent = slide.querySelector('.slide .symptom-criteria')
    let slideInfo=slide.querySelector('.slide .slide-symptom')

    const slideTl = new TimelineMax
    slideTl.from(slideInfo, {x:-300, opacity:0, duration:2})
        .from(slideContent, {x:-100, opacity:0, duration:2},"-=2")
        .from(slideImage, {opacity:0, duration:2}, "-=2")
        .fromTo(".scroll-down-s4", {y:-15, opacity:0}, {y:15, opacity:1, repeat:-1, yoyo:true, duration:1.5}, "-=1")

}

//======= trigger prompt user to next section after slideshow============
let jumpToS5Btn=document.querySelector('.scroll-down-s4')
jumpToS5Btn.addEventListener('click', () => {
    fullpage_api.moveTo(5);
})

//============REACH OUT ANIMATION=================
function reachOutSection(destination){
    let section = destination.item
    let reachOut1=section.querySelector(".reachout-intro")
    let reachOut2=section.querySelector(".reachout-intro-2")
    let reachOut3=section.querySelector(".reachout-intro-3")

    const reachOutTl = new TimelineMax ({delay:0.5})
        reachOutTl.from (reachOut1, {x:-500, opacity:0, duration:3, ease: 'power3'})
            .from(reachOut2, {x:500, opacity:0, duration:3, ease: 'power3'}, "-=2")
            .from(reachOut3, {x:-500, opacity:0, duration:3, ease: 'power3'}, "-=2")

}