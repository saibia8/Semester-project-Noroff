export default function displayAuctionDetails(data, container) {
   container.innerHTML = "";

   console.log(data);
   console.log(container);

   const divRow = document.createElement("div");
   divRow.className = "row";
   container.appendChild(divRow);

   const h1Title = document.createElement("h1");
   h1Title.classList.add("display-7", "my-4", "text-center");
   h1Title.innerText = data.title;
   divRow.appendChild(h1Title);

   const divColumn = document.createElement("div");
   divColumn.classList.add("d-flex", "flex-column", "flex-md-row", "gap-0", "gap-lg-4", "justify-content-center");
   divRow.appendChild(divColumn);

   const divImage = document.createElement("div");
   divImage.classList.add("d-flex", "flex-column");
   divColumn.appendChild(divImage);

   const imgMain = document.createElement("img");
   imgMain.classList.add("img-fluid", "mt-4", "mb-3", "mx-3");
   if (data.media.length === 0) {
      imgMain.src = "/assets/images/no-image.jpg"
    }else{
      imgMain.src = `${data.media[0]}`;
    }
    divImage.appendChild(imgMain);

   const divImageSmall = document.createElement("div");
   divImageSmall.classList.add("d-flex", "col-3", "col-md-2", "gap-3", "mx-3");
   divImage.appendChild(divImageSmall);

   for (let index = 1; index < data.media.length; index++) {
      let imgSmall = document.createElement("img");
      imgSmall.classList.add("img-fluid");
      imgSmall.src = `${data.media[index]}`;
      divImageSmall.appendChild(imgSmall);
   }

   const divDescription = document.createElement("div");
   divDescription.classList.add("col", "col-md-10", "mt-4", "mb-0", "mb-lg-4", "mx-3"); 
   divImage.appendChild(divDescription);

   const h3Description = document.createElement("h3");
   h3Description.innerText = "Description";
   divDescription.appendChild(h3Description);

   const pDescription = document.createElement("p");
   pDescription.innerText = `${data.description}`;
   divDescription.appendChild(pDescription);
    
}