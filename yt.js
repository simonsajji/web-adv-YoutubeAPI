API_KEY='AIzaSyBK7Xmeyey6U4noPsadioqYPvpl6dcdEwk';

// VIDEO-LIST HOMEPAGE BEGINS

// Using videos list we need to show video list just to appear in default homepage of Youtube clone

let vid_id; // fetch it from data.items.id

let vid_disp;

let videos_container=document.getElementById('videos_container');
let video;
let res_items=document.getElementById("res_items");

let button=document.getElementById("searchbutton");
let sbar=document.getElementById("searchbar");
let container=document.getElementById("container");

let searchlist_container =document.getElementById("searchlist_container");

let cl=document.getElementById("c");




let f1= fetch(`https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${API_KEY}&part=snippet&maxResults=80`);
let list_of_ids=[];
let list_of_thumbs=[];
let video_titles=[];
let channel_titles=[];
f1.then((response)=>{
    return response.json();
}).then((data)=>{
    console.log(data.items);

    data.items.forEach((c)=>{
        
        if(c.snippet.thumbnails.hasOwnProperty('maxres')){   // We need to push the thumbnail object which has only image with 'maxres'
            list_of_ids.push(c.id);
            list_of_thumbs.push(c.snippet.thumbnails.maxres);
            video_titles.push(c.snippet.title);
            channel_titles.push(c.snippet.channelTitle);

        }
       
        else{

            // dont push anything

        }
        

        
    });

    display_videos_onHomepage(list_of_ids,list_of_thumbs,video_titles,channel_titles);
    
}).catch((err)=>{
    alert(err,"there is siomethiinf wrong");
});


function display_videos_onHomepage(li_ids,li_thumbs,vid_titles,ch_titles){


    // set id of each video div as the Youtube redirect link



    let i=0;



    li_thumbs.forEach((th)=>{

        // Here we need to take img url. and set it on the thumbnail of class video which should be done Dynamically.
        // i++;
       
        

        let thumb_url= `${th.url}`;
       

        video=document.createElement('div');
        video.classList.add("video");


        // Add id as the youtibe redirect link to each video div that is been created

        let vid_disp=`https://www.youtube.com/watch?v=${li_ids[i]}`;

        video.id=vid_disp;

        
        let vid_thumb=document.createElement('div');
        vid_thumb.classList.add("vid_thumb");

        // Need to wrap thumbimage in an iframe <iframe src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" allow='autoplay'></iframe> 
        // and give src as https://www.youtube.com/embed/${li_ids[i]}?autoplay=1

        // need to append to vid_thumb on hover and play the vid!!

        let iframe=document.createElement("iframe");
        iframe.src=`https://www.youtube.com/embed/${li_ids[i]}?autoplay=1&mute=1`;
        iframe.width="100%";
        iframe.height="100%";
        

        iframe.allow='autoplay';

        

        let thumb_img=document.createElement("img");
        thumb_img.src=thumb_url;

        
        vid_thumb.addEventListener("mouseenter",function(){
            thumb_img.style.display="none";
            iframe.style.display='initial';
            // iframe.allow='autoplay';
            vid_thumb.appendChild(iframe);


        });
        vid_thumb.addEventListener("mouseleave",function(){
            
            iframe.style.display='none';
            iframe.allow='false';
            thumb_img.style.display="initial";


        });

        vid_thumb.appendChild(thumb_img);

        video.appendChild(vid_thumb);


        

        // HEre we have to display title for each thumbnail

        let vid_title=document.createElement("div");
        vid_title.classList.add('vid_title');
        vid_title.textContent=vid_titles[i];
        video.appendChild(vid_title);


        // append channel titles

        let ch_title=document.createElement("div");
        ch_title.classList.add('channel_title');
        ch_title.textContent=ch_titles[i];
        video.appendChild(ch_title);


        // Here is the youtube link which should be embeded in a tag where it targets _blank into Youtbe site on another tab.

        // click on the div then redirect to Youtube

        video.addEventListener("click", function(event){
            console.log(this.id);

            var win = window.open(this.id, '_blank');
            win.focus();


        })
    
    videos_container.appendChild(video);


    i++;




    });

    

   
}


// VIDEO-LIST HOMEPAGE ENDS.
// -------------------------------------------------
// -------------------------------------------------------



// Here we do SEARCHING for videos based on the q value.



// ----------------------------------------------------------------------------------

// if KEYPRESSED in input searchbar then show recommnendations



// let searchbar=document.getElementById("searchbar");
// str="";
// let new_str="";

// sList=[];



// searchbar.addEventListener("keypress",function(event){
//     console.log(event);
//     if(event.key !=undefined && event.code != "Backspace"){
//         str=str+event.key;
//         addTolist(event.key);
        
        

//     }

//     disp_string();



// });

// searchbar.addEventListener("keyup",function(event){

//     if(event.code === "Backspace" ){

//         removefromList();
//         // sList.pop();
        

//     }

//     disp_string();

// });
   
    
    
// function addTolist(letter){
//     new_str=""


//     sList.push(letter);
//     sList.forEach((l)=>{
//         new_str=new_str+l;
//     })

//     // console.log(new_str);


// }

// function removefromList(){
//     new_str=""
//     sList.pop();
//     sList.forEach((l)=>{
//         new_str=new_str+l;
//     });
    
//     new_str=new_str.substring(0,str.length - 1);
//     // console.log(new_str);
    
// }
// function disp_theresults(res_its){
//     if(res_its != null || res_its != undefined){
//         if(res_its[0] != null || res_its[0] != undefined || res_its[0] != NaN){
//             for(w=0;w<res_its[0].length;w++){

//                 console.log(res_its[0][w].snippet.title);
//                 let rw=res_its[0][w].snippet.title;
//                 res_items[w].innerText=rw;
    
    
    
//             }
    

//         }
        
       

//     }

    



// }


// function disp_string(){
//     // console.log(new_str);
//     q_value=new_str;
//     let li_results=[];
//     if(q_value.length >2){
//         let f=fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${q_value}&key=${API_KEY}`);

//     f.then((response)=>{
//         return response.json();
//     }).then((data)=>{
//         // console.log(data.items);


//         // console.log(data.items);

//         if(data.items != null || data.items != undefined){

//         disp_theresults([data.items]);


//         }

        

                
                           


        
                
               
        
                
        

        
//     })
//     .catch((err)=>{
//         alert(err,"there is siomethiinf wrong");
//     });


//     }

    
    

// }


// if KEYPRESSED in input searchbar then show recommnendations ENDS Here!!!!

// --------------------------------------------------------------------------------------



// Trigger fetch and qvalue must be same as the new_str


// on button click   sbar

button.addEventListener("click",function(){

    searchlist_container.innerHTML="";
    
    container.classList.add("hidden");
    searchlist_container.classList.remove("hidden");


    let st=sbar.value;
    console.log(st);

    fetchdata(st);

});





    
   
function fetchdata(str){
    
    

    let fetch_s=fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${str}&key=${API_KEY}`);

    fetch_s.then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data.items);
        if(data.items!=undefined || data.items != null){

            for(c=0;c<data.items.length;c++){

                   
                

                if(data.items[c].snippet.thumbnails.hasOwnProperty('default')){   // We need to push the thumbnail object which has only image with 'maxres'

                    console.log(data.items[c].snippet.title);
                    // Create divs to display content

                    d=document.createElement("div");

                    let image=document.createElement("div");
                    image.classList.add("image");
                    let img=document.createElement("img");
                    img.src=data.items[c].snippet.thumbnails.default.url;
                    image.appendChild(img);

                    let descr=document.createElement("div");
                    descr.classList.add("descr");
                    let des_title=document.createElement("div");
                    des_title.classList.add('des_title');
                    let des_small=document.createElement("div");
                    des_small.classList.add('des_small');
                    let description=document.createElement("div");
                    description.classList.add('description');
                    let ic=document.createElement("div");
                    ic.classList.add('ic');
                    let b1=document.createElement("button");
                    b1.textContent='New';
                    let b2=document.createElement("button");
                    b2.textContent='4K';
                    ic.appendChild(b1);
                    ic.appendChild(b2);


                    


                    des_title.textContent=data.items[c].snippet.title;
                    des_small.textContent=data.items[c].snippet.channelTitle;
                    description.textContent=data.items[c].snippet.description

                    descr.appendChild(des_title);
                    descr.appendChild(des_small);
                    descr.appendChild(description);
                    descr.appendChild(ic);


                    d.appendChild(image);
                    d.appendChild(descr);


                    searchlist_container.appendChild(d)


                  
        
                }
                
                else{
        
                    // dont push anything
        
                }



                



                

        
                
                
        
                
            }

        }
       

    }).catch((err)=>{
        alert(err,"there is siomethiinf wrong");
    });
    
}
    
// On click of the button the Home page should come

cl.addEventListener("click",function(){
    
    searchlist_container.classList.add("hidden");
    container.classList.remove("hidden");
    
    
});
   




