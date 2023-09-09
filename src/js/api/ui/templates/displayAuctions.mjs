export function displayAuctions(auctions, container) {
  container.innerHTML = "";
  const html = auctions.map((auction) => {
   console.log(auction);
   return createAuction(auction);
});
  container.append(...html);
}

function createAuction({ title, media }) {
  const div = document.createElement("div");
  div.classList.add("col-10", "col-md-6", "col-lg-4", "col-xl-3", "mb-4");

  const divCard = document.createElement("div");
  divCard.className = "card";
  div.appendChild(divCard);

  const btn = document.createElement("button");
  btn.className = "card-heart-btn";
  divCard.appendChild(btn);

  const span = document.createElement("span");
  span.className = "heart-icon";
  btn.appendChild(span);

  const i = document.createElement("i");
  i.classList.add("bi", "bi-heart");
  span.appendChild(i);

  const img = document.createElement("img");
  img.src = `${media[0]}`;
  img.classList.add("card-img-top", "border-bottom");
  img.alt = `${title}`;
  divCard.appendChild(img);
  
  return div;
}
