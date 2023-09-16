import { isLoggedIn } from "../../../helpers/storage.mjs";

export function displayAuctions(auctions, container) {
  container.innerHTML = "";
  const html = auctions.map((auction) => {
    console.log(auction);
    return createAuction(auction);
  });
  container.append(...html);
}

function createAuction({id, title, media, endsAt, _count, bids }) {
  const endDate = new Date(endsAt);
  let totalAmount = 0;

  bids.forEach((element) => {
    if (element.amount > totalAmount) {
      totalAmount = element.amount;
    }
  });

  const div = document.createElement("div");
  div.classList.add("col-10", "col-md-6", "col-lg-4", "col-xl-3");

  const linkToDetail = document.createElement("a");
  linkToDetail.classList.add("text-decoration-none");
  linkToDetail.href = `/listings/details/index.html?id=${id}`;
  const divCard = document.createElement("div");
  divCard.classList.add("card", "h-100");
  linkToDetail.appendChild(divCard);
  div.appendChild(linkToDetail);

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
  console.log();
  if (media.length === 0) {
    img.src = "/assets/images/no-image.jpg"
  }else{
    img.src = `${media[0]}`;
  }
  
  img.classList.add("card-img-top", "border-bottom", "card-img-height");
  img.alt = `${title}`;
  divCard.appendChild(img);

  const divTime = document.createElement("div");
  divTime.classList.add(
    "d-flex",
    "bg-white",
    "justify-content-center",
    "py-2",
    "px-1",
    "align-items-center",
    "text-center"
  );
  divCard.appendChild(divTime);

  const divTime2 = document.createElement("div");
  divTime2.classList.add(
    "d-flex",
    "flex-fill",
    "flex-wrap",
    "flex-lg-nowrap",
    "justify-content-center",
    "align-items-center"
  );
  divTime.appendChild(divTime2);

  const divDays = document.createElement("div");
  divDays.classList.add("d-flex", "flex-column", "border-end", "px-2");
  divTime2.appendChild(divDays);

  const pDaysNum = document.createElement("p");
  pDaysNum.className = "mb-0";
  pDaysNum.textContent = endDate.getDay();
  divDays.appendChild(pDaysNum);
  const pDays = document.createElement("p");
  pDays.className = "mb-0";
  pDays.innerText = "days";
  divDays.appendChild(pDays);

  const divHours = document.createElement("div");
  divHours.classList.add("d-flex", "flex-column", "border-end", "px-2");
  divTime2.appendChild(divHours);

  const pHoursNum = document.createElement("p");
  pHoursNum.className = "mb-0";
  pHoursNum.textContent = endDate.getHours();
  divHours.appendChild(pHoursNum);
  const pHours = document.createElement("p");
  pHours.className = "mb-0";
  pHours.innerText = "hours";
  divHours.appendChild(pHours);

  const divMinutes = document.createElement("div");
  divMinutes.classList.add("d-flex", "flex-column", "border-end", "px-2");
  divTime2.appendChild(divMinutes);

  const pMinutesNum = document.createElement("p");
  pMinutesNum.className = "mb-0";
  pMinutesNum.textContent = endDate.getMinutes();
  divMinutes.appendChild(pMinutesNum);
  const pMinutes = document.createElement("p");
  pMinutes.className = "mb-0";
  pMinutes.innerText = "minutes";
  divMinutes.appendChild(pMinutes);

  const divSeconds = document.createElement("div");
  divSeconds.classList.add("d-flex", "flex-column", "border-end", "px-2");
  divTime2.appendChild(divSeconds);

  const pSecondsNum = document.createElement("p");
  pSecondsNum.className = "mb-0";
  pSecondsNum.textContent = endDate.getSeconds();
  divSeconds.appendChild(pSecondsNum);
  const pSeconds = document.createElement("p");
  pSeconds.className = "mb-0";
  pSeconds.innerText = "seconds";
  divSeconds.appendChild(pSeconds);

  const divInfo = document.createElement("div");
  divInfo.classList.add("card-body", "py-4", "bg-light");
  divCard.appendChild(divInfo);

  const h3Title = document.createElement("h3");
  h3Title.classList.add("card-title", "fs-5", "fw-semibold", "mb-3");
  h3Title.innerText = title;
  divInfo.appendChild(h3Title);

  const pBid = document.createElement("p");
  pBid.classList.add("fs-6", "mb-1");
  pBid.innerText = "Current bid:";
  divInfo.appendChild(pBid);

  const pCreditsBids = document.createElement("p");
  pCreditsBids.classList.add("fs-6", "mb-4", "fw-medium");
  pCreditsBids.innerHTML = `${totalAmount} <span class="text-uppercase">credits</span> (${_count.bids} bids)`;
  divInfo.appendChild(pCreditsBids);

  const aBid = document.createElement("a");
  if (isLoggedIn()) {
    if (location.pathname === "/" || location.pathname === "/index.html" || location.pathname === "/listings/" || location.pathname === "/listings/index.html") {
      aBid.href = `/listings/details/index.html?id=${id}`;
      aBid.innerText = "Place a bid";
    }else{
      aBid.href = `/user/update/index.html?id=${id}`;
      aBid.innerText = "Edit listing";
    }
  } else {
    aBid.href = "/user/register/";
    aBid.innerText = "Register to bid";
  }
  aBid.classList.add(
    "btn",
    "btn-primary",
    "rounded-pill",
    "btn-style",
    "btn-green",
    "btn-bid"
  );
  divInfo.appendChild(aBid);

  return div;
}
