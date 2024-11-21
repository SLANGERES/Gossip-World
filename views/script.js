/*

gsap.to("#box",{
    //key value pair
    rotation:360,
    x:800,
    // y:200,
    duration:2,
    delay:1,
    backgroundColor:'red',
    borderRadius:"50%",
    //this repeat attribute work and repeat the iteam one more time if there is repeat:-1 it run infinite times
    // repeat:-1,
    //this yoyo property before yoyo the iteam goes to inital state to final state but after apying yoyo it goes inital to final and comes back to inital like yoyo toy

    // yoyo:true,
    
})
gsap.to("#box1",{
    //key value pair
    rotation:360,
    x:800,
    duration:2,
    delay:3,
    scale:0.5
})
gsap.to("#box2",{
    rotation:360,
    x:800,
    duration:2,
    delay:5,

})

/*
//text animations
/*
gsap.to("h1",{
    x:550,
    color:"red",
    duration:3,
    delay:3
}
)

*/
/*
gsap.from("span",{
    y:10,
    opacity:0,
    duration:2,
    delay:3,
    //stagger is used to run all the item comes under h1 one by one
    stagger:-1,
}
)

//in timeline module the item animate one by one 

var tl=gsap.timeline();

//first box will animate then box1 then box2 not like the normal pattern where either we have to give delay calculation or they run simulatenuly
tl.to("#box",{rotation:360,
    x:800,
    duration:2,
    delay:1,
    backgroundColor:'red',
    borderRadius:"50%",})

tl.to("#box1",{
        rotation:360,
        x:800,
        duration:2,
        scale:0.5
    })

tl.to("#box2",{
        rotation:360,
        x:800,
        duration:2,
    })

*/
var tl = gsap.timeline({defaults: {duration: 3, ease: "none"}});

tl.from("#nav h2",{
    duration:1,
    y:-20,
    opacity:0,
    
})
tl.from("#part2 a",{
    duration:1,
    delay:0.1,
    opacity:0,
    stagger:0.3,
})
tl.from("h1",{
    y:20,
    rotation:360,
    opacity:0,
    scale:0.2,
    duration:0.5,
})
