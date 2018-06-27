var images = [ '.mapA', '.mapB', '.mapC', '.mapD', '.mapE', '.mapF', '.mapG', '.mapH', '.mapI', '.mapJ', '.mapK', '.mapL', '.mapM', '.mapN', '.mapO', '.mapP']
var map_bg = [ "url('images/map_bg/mapA_bg.jpg'", "url('images/map_bg/mapB_bg.jpg'", "url('images/map_bg/mapC_bg.jpg'", "url('images/map_bg/mapD_bg.jpg'", "url('images/map_bg/mapE_bg.jpg'", "url('images/map_bg/mapF_bg.jpg'", "url('images/map_bg/mapG_bg.jpg'", "url('images/map_bg/mapH_bg.jpg'", "url('images/map_bg/mapI_bg.jpg'", "url('images/map_bg/mapJ_bg.jpg'", "url('images/map_bg/mapK_bg.jpg'", "url('images/map_bg/mapL_bg.jpg'", "url('images/map_bg/mapM_bg.jpg'", "url('images/map_bg/mapN_bg.jpg'", "url('images/map_bg/mapO_bg.jpg'", "url('images/map_bg/mapP_bg.jpg'"]
var bg = document.querySelector('.bg');

var map_inform = [ 'mapA_inf', 'mapB_inf', 'mapC_inf', 'mapD_inf', 'mapE_inf', 'mapF_inf', 'mapG_inf', 'mapH_inf', 'mapI_inf', 'mapJ_inf', 'mapK_inf', 'mapL_inf', 'mapM_inf', 'mapN_inf', 'mapO_inf', 'mapP_inf']

function dim(index) {
    bg.classList.add('bg--dim');
    images.forEach((selector, i) => {
        if (index >= 0 && index === i) {
            document.querySelector(selector).classList.remove('partial--vanish');
        } else {
            document.querySelector(selector).classList.add('partial--vanish');
        }
    });
}
function unDim() {
    bg.classList.remove('bg--dim');
    images.forEach((selector) => {
        document.querySelector(selector).classList.remove('partial--vanish');
    });
}

function chang_map_bg(index) {
    document.getElementById("content_bg").style.backgroundImage = map_bg[index];
    map_inform.forEach((selector,i) => {
        if(index == i) {
            document.getElementById(map_inform[i]).style.display = "block";
        } else {
            document.getElementById(map_inform[i]).style.display = "none";
        }
    });
}

images.forEach((selector, i) => {
    let elem = document.querySelector(selector);
    elem.addEventListener("mouseenter", (event) => { dim(i); });
    elem.addEventListener("mouseleave", (event) => { unDim(); });
});