const cl = console.log;

// let moviesArr = [
//     {
//         movieName: "The Paradise",
//         movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQUlltowNLeCOR4fg6ZWxnQ1j-urHejk1GzHtE6y7yQLFFq5TBLmgiPU0i0rWqkrIyBo6njCHU_p9k4jihDnhBKc_7HbmaXKiYYmtZi-FGzw&s=10",
//         movieRating: 5,
//         movieDescription: "Jadal leads a marginalized tribe in an enduring battle against systemic injustice and discrimination, fighting to secure their fundamental right to legal recognition and citizenship.",
//         movieId: "101"
//     },
//     {
//         movieName: "Salaar: Part 1 – Ceasefire",
//         movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGbx_QUNuOasz4WGAc1jJRdZBz9V6YA0vHbsM4pL4KAcy1Vxm5qFaOwEXTlwZ8DF1dfYZj5vqLDAEGJHQR4tM4l_DUz-wsGFWZsZMLlpN0pw&s=10",
//         movieRating: 5,
//         movieDescription: "Two former friends become enemies in a kingdom torn by power struggles. Betrayal, bloodshed and a shaky alliance decide the fate of the realm in this gripping tale of loyalty and treachery.",
//         movieId: "02"
//     },
//     {
//         movieName: "Dragon",
//         movieImg: "https://cdn.district.in/movies-assets/images/cinema/dragon-hori-0bd84800-544b-11f1-ab50-499f2c1e1251.jpg",
//         movieRating: 1,
//         movieDescription: "Dragon (20th) is an upcoming pan-Indian period action drama film written and directed by Prashanth Neel and starring N. T. Rama Rao Jr. (Jr. NTR) in the lead role, slated for theatrical release on June 11, 202",
//         movieId: "03"
//     },
//     {
//         movieName: "12Th Fail",
//         movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShxboucyZQZKUtwPUmjQmS_186_mJhIrdrk-I2rXymrA&s=10",
//         movieRating: 2,
//         movieDesciption: "A young lion learns to accept his responsibility as the future king.",
//         movieId: "04"
//     },
//     {
//         movieName: "Sita Ramam",
//         movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuFV6Y3MucgipWSX1SVudQxKmoQiSoHPK4g0pAClk0Og&s=10",
//         movieRating: 5,
//         movieDescription: "Three friends experience friendship, education, and the challenges of college life.",
//         movieId: "3"
//     }
// ];


localStorage.setItem('moviesArr', JSON.stringify(moviesArr))



const movieModal = document.getElementById('movieModal')
const backDrop = document.getElementById('backDrop')
const showMovieBtn = document.getElementById('showMovieBtn')
const closeMovieModal =[...document.querySelectorAll('.closeMovieModal')]

const movieForm = document.getElementById('movieForm')
const movieName = document.getElementById('movieName')
const movieImg = document.getElementById('movieImg')
const movieDescription = document.getElementById('movieDescription')
const movieRating = document.getElementById('movieRating')
const updateMovieBtn = document.getElementById('updateMovieBtn')
const addMovieBtn = document.getElementById('addMovieBtn')



function snackBar(msg , icon){
    swal.fire({
        title : msg,
        icon : icon,
        timer : 2500
    })
}




const movieContainer = document.getElementById('movieContainer')

let moviesData = localStorage.getItem('moviesArr')

let moviesArr = []

if(moviesData){
    moviesArr = JSON.parse(moviesData)
}

// cl(moviesArr)

function setRating(rating){
    if(rating >= 4){
        return "badge-success"
    }else if(rating >= 3 && rating < 4){
        return "badge-warning"
    }else{
        return "badge-danger"
    }
}

// cl(setRating(2))

function createMovieCard(arr){
    let result =``;
    arr.forEach(movie => {
        result +=`
                     <div class="col-md-3 mb-4">
                <div class="card movieCard" id="${movie.movieId}">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-10">
                                <h4 class="m-0">${movie.movieName}</h4>

                            </div>
                            <div class="col-2">
                                <h5 class="m-0">
                                    <span class="badge ${setRating(movie.movieRating)}">${movie.movieRating}</span>

                                </h5>
                            </div>
                        </div>
                    </div>
                    <div class="card-body py-0">
                        <figure class="m-0">
                        <img src="${movie.movieImg}" alt="${movie.movieName}" title="${movie.movieName}">

                            <figcaption>
                                <h5>${movie.movieName}</h5>
                                <p>${movie.movieDescription}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="onEdit(this)" class="btn btn-sm net-sec-btn">Edit</button>
                        <button  onclick="onRemove(this)" class="btn btn-sm net-pri-btn">Remove</button>

                    </div>
                </div>


            </div>

        
        
                    `
    });

    movieContainer.innerHTML = result
}

createMovieCard(moviesArr)


// function onModalShow(){
//     movieModal.classList.add('active')
//     backDrop.classList.add('active')

// }

// function onModalHide(){
//     movieModal.classList.remove('active')
//     backDrop.classList.remove('active')
// }

function onModalToggle(){
    movieModal.classList.toggle('active')
    backDrop.classList.toggle('active')
    movieForm.reset()

}

showMovieBtn.addEventListener('click' , onModalToggle)

closeMovieModal.forEach(ele =>{
    ele.addEventListener('click' , onModalToggle)
})



function onMovieAdd(eve){
    eve.preventDefault();
    let newMovie_Obj = {
        movieName : movieName.value,
        movieImg : movieImg.value,
        movieDescription : movieDescription.value,
        movieRating : movieRating.value,
        movieId : Date.now().toString()
    }
    // cl(newMovie_Obj)
    moviesArr.unshift(newMovie_Obj)

    localStorage.setItem('moviesArr' , JSON.stringify(moviesArr))

    let card = document.createElement('div');
    card.className ='col-md-3 mb-4';
    card.innerHTML = `

                     <div class="card movieCard" id="${newMovie_Obj.movieId}">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-10">
                                <h4 class="m-0">${newMovie_Obj.movieName}</h4>

                            </div>
                            <div class="col-2">
                                <h5 class="m-0">
                                    <span class="badge ${setRating(newMovie_Obj.movieRating)}">${newMovie_Obj.movieRating}</span>

                                </h5>
                            </div>
                        </div>
                    </div>
                    <div class="card-body py-0">
                        <figure class="m-0">
                        <img src="${newMovie_Obj.movieImg}" alt="${newMovie_Obj.movieName}" title="${newMovie_Obj.movieName}">

                            <figcaption>
                                <h5>${newMovie_Obj.movieName}</h5>
                                <p>${newMovie_Obj.movieDescription}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button  onclick="onEdit(this)" class="btn btn-sm net-sec-btn">Edit</button>
                        <button onclick="onRemove(this)" class="btn btn-sm net-pri-btn">Remove</button>

                    </div>
                </div>

    
    
    
    
    `
    movieContainer.prepend(card)
    onModalToggle()

    snackBar(`The movie with id: ${newMovie_Obj.movieId} is added successfully`, 'success')

}

function onEdit(ele){
    let Edit_Id = ele.closest('.movieCard').id
    localStorage.setItem('Edit_Id' , Edit_Id)
    // cl(Edit_Id)
    let Edit_Obj = moviesArr.find(movie => movie.movieId === Edit_Id)
    onModalToggle()


    movieName.value = Edit_Obj.movieName;
    movieImg.value = Edit_Obj.movieImg;
    movieDescription.value = Edit_Obj.movieDescription;
    movieRating.value = Edit_Obj.movieRating;

    addMovieBtn.classList.add('d-none');
    updateMovieBtn.classList.remove('d-none');


}

function onUpdateMovie(){
    let Update_Id = localStorage.getItem("Edit_Id")
    localStorage.removeItem('Edit_Id')

    let Updated_Obj = {
        movieName : movieName.value,
        movieImg  : movieImg.value,
        movieDescription : movieDescription.value,
        movieRating : movieRating.value,
        movieId     : Update_Id
    }
    // cl(Updated_Obj)

    let getIndex = moviesArr.findIndex(m => m.movieId === Update_Id)
    moviesArr[getIndex] = Updated_Obj

    localStorage.setItem('moviesArr' , JSON.stringify(moviesArr));


    let card = document.getElementById(Update_Id);
    card.innerHTML = `
                
                    <div class="card-header">
                        <div class="row">
                            <div class="col-10">
                                <h4 class="m-0">${Updated_Obj.movieName}</h4>

                            </div>
                            <div class="col-2">
                                <h5 class="m-0">
                                    <span class="badge ${setRating(Updated_Obj.movieRating)}">${Updated_Obj.movieRating}</span>

                                </h5>
                            </div>
                        </div>
                    </div>
                    <div class="card-body py-0">
                        <figure class="m-0">
                        <img src="${Updated_Obj.movieImg}" alt="${Updated_Obj.movieName}" title="${Updated_Obj.movieName}">

                            <figcaption>
                                <h5>${Updated_Obj.movieName}</h5>
                                <p>${Updated_Obj.movieDescription}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button  onclick="onEdit(this)" class="btn btn-sm net-sec-btn">Edit</button>
                        <button onclick="onRemove(this)" class="btn btn-sm net-pri-btn">Remove</button>

                    </div>

    
    
    
        `

     updateMovieBtn.classList.add('d-none');
     addMovieBtn.classList.remove('d-none');

    onModalToggle()

    snackBar(`The movie with id: ${Update_Id} is updated successfully`, 'success')



}


function onRemove(ele){
    let Remove_Id = ele.closest('.movieCard').id;
    // cl(Remove_Id)
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#212529",
  cancelButtonColor: "#e50914",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    let getIndex = moviesArr.findIndex(m => m.movieId === Remove_Id)
    moviesArr.splice(getIndex , 1)

    localStorage.setItem('moviesArr' , JSON.stringify(moviesArr))

    ele.closest('.movieCard').parentElement.remove()

    snackBar(`The movie with id: ${Remove_Id} is removed successfully`, 'success')

  }
});








    

    
}


updateMovieBtn.addEventListener('click' , onUpdateMovie)
movieForm.addEventListener('submit' , onMovieAdd)