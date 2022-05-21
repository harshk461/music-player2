//Container Design
const main_container=document.createElement('div');
main_container.className='main-container';
main_container.id='main-container';

//nav or box1
let box1=document.createElement('div');
box1.classList.add('box1');
box1.classList.add('nav');

let box1_icon=document.createElement('div');
box1_icon.classList.add('icon1');
box1_icon.classList.add('action-btn');

let box1_icon_cont=document.createElement('i');
box1_icon_cont.classList.add('fas');
box1_icon_cont.classList.add('fa-chevron-right');

box1_icon.appendChild(box1_icon_cont);

let box2_icon=document.createElement('div');
box2_icon.classList.add('icon2');
box2_icon.classList.add('action-btn');

let box2_icon_cont=document.createElement('i');
box2_icon_cont.classList.add('fas');
box2_icon_cont.classList.add('fa-moon');

box2_icon.appendChild(box2_icon_cont);

box1.append(box1_icon,box2_icon);

//box2
let box2=document.createElement('div');
box2.className='box2';
box2.id='box2';

let box2_cover=document.createElement('div');
box2_cover.className='cover';

let cover_img=document.createElement('img');
cover_img.id='cover'
box2_cover.appendChild(cover_img);

let box2_detail=document.createElement('div');
box2_detail.className='detail';

let detail_name=document.createElement('div');
detail_name.id='name';
let artist_name=document.createElement('div');
artist_name.id='artist';

box2_detail.append(detail_name,artist_name);

box2.append(box2_cover,box2_detail);

//progress bar
let progress_div=document.createElement('div');
progress_div.className='progress-container';
progress_div.id='progress-container';

let prog_div_progress=document.createElement('div');
prog_div_progress.className='progress';
prog_div_progress.id='progress';

let prog_div_duration=document.createElement('div');
prog_div_duration.className='duration';
prog_div_duration.id='duration';

progress_div.append(prog_div_progress,prog_div_duration);

//Navigation Buttons

let navigation_div=document.createElement('div');
navigation_div.className='naviagtion';
navigation_div.id='navigation';

let prev_btn=document.createElement('button');
prev_btn.className='action-btn';
prev_btn.id='prev';

let prev_icon=document.createElement('i');
prev_icon.classList.add('fas');
prev_icon.classList.add('fa-backward');

prev_btn.appendChild(prev_icon);

let play_btn=document.createElement('button');
play_btn.className='action-btn';
play_btn.id='play';

let play_icon=document.createElement('i');
play_icon.classList.add('fas');
play_icon.classList.add('fa-play');

play_btn.appendChild(play_icon);

let next_btn=document.createElement('button');
next_btn.className='action-btn';
next_btn.id='next';

let next_icon=document.createElement('i');
next_icon.classList.add('fas');
next_icon.classList.add('fa-forward');

next_btn.appendChild(next_icon);

navigation_div.append(prev_btn,play_btn,next_btn);
main_container.append(box1,box2,progress_div,navigation_div);

document.body.append(main_container);

const musicContainer = document.getElementById('main-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const action_btn=document.querySelectorAll('.action-btn');

const audio=document.createElement('audio');
audio.id='audio';
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('name');
const artist=document.getElementById('artist')
const cover = document.getElementById('cover');
let duration=document.getElementById('duration');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const moon=document.querySelector('.icon2')

const song = [
    {
        Name:'Attention',
        path:'/songs/Attention.mp3',
        cover:'/images/Attention.jpg',
        artist:'Gham Lay & Justin Beiber'
    },
    {
        Name:'Bad Habits',
        path:'/songs/Bad Habits.mp3',
        cover:'/images/Bad Habits.jpg',
        artist:'Ed Sheeren'
    },
    {
        Name:'Shivers',
        path:'/songs/Shivers.mp3',
        cover:'/images/Shivers.jpg',
        artist:'Ed Sheeren'
    },
    {
        Name:'All I Ever Wanted',
        path:'/songs/All-I-Ever-Wanted.mp3',
        cover:'/images/All-I-Ever-Wanted.jpg',
        artist:'Ed Sheeren'
    }

];

let songindex=2;
cover.src=song[songindex].cover;
const loadsong=(index)=>{
    title.textContent=song[index].Name;
    audio.src=song[index].path;
    cover.src=song[index].cover;
    artist.textContent=song[index].artist;
}

loadsong(songindex);

playBtn.addEventListener('click',()=>{
    const isplaying=musicContainer.classList.contains('play');
    if(isplaying){
        pausesong();
    }
    else{
        playsong();
    }
})

const playsong=()=>{

    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    musicContainer.classList.add('play');
    audio.play();
}

function pausesong() {

    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');  
    audio.pause();
}


function prevsong(){
    songindex--;
    if(songindex<0){
        songindex=song.length-1;
    }
    loadsong(songindex);
    playsong();
}

function nextsong() {
    songindex++;
    if (songindex > song.length - 1) {
        songindex = 0;
    }
    loadsong(songindex);  
    playsong();
}
prevBtn.addEventListener('click',prevsong);
nextBtn.addEventListener('click',nextsong);

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
audio.addEventListener('timeupdate', updateProgress);


function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);


moon.addEventListener('click',()=>{
    if(moon.querySelector('i').classList.contains('fa-moon')){
        document.body.style.backgroundColor='#fafafa';
        musicContainer.style.backgroundColor='#fafafa';
        moon.querySelector('i').classList.add('fa-sun');
        moon.querySelector('i').classList.remove('fa-moon');
        title.style.color='#000';
        artist.style.color='#000';
        progressContainer.style.background='#000';
        for(let i=0;i<action_btn.length;++i){
            action_btn[i].style.backgroundColor='#fafafa';
            action_btn[i].style.color='#000';
            if(i==1 || i==3){
                action_btn[i].style.backgroundColor='#FF4C29';
            }
        }
    }
    else{
        document.body.style.backgroundColor='#112B3C';
        musicContainer.style.backgroundColor='#7F8487';
        moon.querySelector('i').classList.add('fa-moon');
        moon.querySelector('i').classList.remove('fa-sun');
        title.style.color='#000';
        artist.style.color='#000';
        progressContainer.style.background='#fff';
        for(let i=0;i<action_btn.length;++i){
            action_btn[i].style.backgroundColor='#7f8487';
            action_btn[i].style.color='#fff';
            if(i==3){
                action_btn[i].style.backgroundColor='#ff4c29';
            }
        }
    }
})