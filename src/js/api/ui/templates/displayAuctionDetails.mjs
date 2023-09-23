import { isLoggedIn } from "../../../helpers/storage.mjs";
import bid from "../../../handlers/bid.mjs";
import { displayMessage } from "../common/displayMessage.mjs";

export default function displayAuctionDetails(data, container, bided = false) {
  const endDate = new Date(data.endsAt);
  
  const timer = setInterval(() => {
    const nowTime = new Date().getTime();
    const distance = endDate.getTime() - nowTime;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    pDaysNum.textContent = days;

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    pHoursNum.textContent = hours;

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    pMinutesNum.textContent = minutes;

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    pSecondsNum.textContent = seconds;

    if (distance < 0) {
      clearInterval(timer);
      divTime2.innerHTML = "Listing ended";
      divTime2.classList.add("text-uppercase", "bg-danger", "py-2", "text-white", "fw-semibold");
    }
  }, 1000);
  const divLoading = document.getElementById("loading");
  divLoading.classList.add("d-none");
  container.innerHTML = "";

  let currentBid = 0;

  if (data.bids.length !== 0) {
    currentBid = data.bids[data.bids.length - 1].amount;
  }

  const divRow = document.createElement("div");
  divRow.className = "row";
  container.appendChild(divRow);

  const h1Title = document.createElement("h1");
  h1Title.classList.add("display-7", "my-4", "text-center");
  h1Title.innerText = data.title;
  divRow.appendChild(h1Title);

  const divColumn = document.createElement("div");
  divColumn.classList.add(
    "d-flex",
    "flex-column",
    "flex-md-row",
    "gap-0",
    "gap-lg-4",
    "justify-content-center"
  );
  divRow.appendChild(divColumn);

  const divImage = document.createElement("div");
  divImage.classList.add("d-flex", "flex-column");
  divColumn.appendChild(divImage);

  const divHeart = document.createElement("div");

  const btn = document.createElement("button");
  btn.className = "card-heart-btn";
  divImage.appendChild(btn);

  const span = document.createElement("span");
  span.className = "heart-icon";
  btn.appendChild(span);

  const i = document.createElement("i");
  i.classList.add("bi", "bi-heart");
  span.appendChild(i);

  const imgMain = document.createElement("img");
  imgMain.classList.add("img-fluid", "mt-4", "mb-3", "mx-3");
  if (data.media.length === 0) {
    imgMain.src = "/assets/images/no-image.jpg";
  } else {
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
  divDescription.classList.add(
    "col",
    "col-md-10",
    "mt-4",
    "mb-0",
    "mb-lg-4",
    "mx-3"
  );
  divImage.appendChild(divDescription);

  const h3Description = document.createElement("h3");
  h3Description.innerText = "Description";
  divDescription.appendChild(h3Description);

  const pDescription = document.createElement("p");
  pDescription.innerText = `${data.description}`;
  divDescription.appendChild(pDescription);

  const divColumn2 = document.createElement("div");
  divColumn2.classList.add(
    "mt-4",
    "d-flex",
    "flex-column",
    "col",
    "col-md-6",
    "mx-3"
  );
  divColumn.appendChild(divColumn2);

  const pSeller = document.createElement("p");
  pSeller.classList.add("fs-4", "mb-3");
  pSeller.innerText = `Seller: ${data.seller.name}`;
  divColumn2.appendChild(pSeller);

  const pCurrentBid = document.createElement("p");
  pCurrentBid.classList.add("fs-3", "fw-semibold", "mb-4");
  pCurrentBid.innerText = `Current bid: ${currentBid} credits`;
  divColumn2.appendChild(pCurrentBid);

  const divTime = document.createElement("div");
  divTime.classList.add(
    "d-flex",
    "bg-white",
    "justify-content-center",
    "py-2",
    "px-1",
    "align-items-center",
    "text-center",
    "mb-4",
    "time-container"
  );
  divColumn2.appendChild(divTime);

  const divTime2 = document.createElement("div");
  divTime2.classList.add(
    "d-flex",
    "flex-fill",
    "flex-lg-nowrap",
    "justify-content-center",
    "align-items-center",
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
  divSeconds.classList.add("d-flex", "flex-column", "px-2");
  divTime2.appendChild(divSeconds);

  const pSecondsNum = document.createElement("p");
  pSecondsNum.className = "mb-0";
  pSecondsNum.textContent = endDate.getSeconds();
  divSeconds.appendChild(pSecondsNum);
  const pSeconds = document.createElement("p");
  pSeconds.className = "mb-0";
  pSeconds.innerText = "seconds";
  divSeconds.appendChild(pSeconds);

  const divMessage = document.createElement("div");
  divColumn2.appendChild(divMessage);
  if (bided) {
    displayMessage("success", `Bid successfull!`, divMessage);
  }

  const divInputBid = document.createElement("div");
  divInputBid.classList.add("input-group", "mb-5");
  divColumn2.appendChild(divInputBid);

  const inputBid = document.createElement("input");
  inputBid.type = "text";
  inputBid.className = "form-control";
  inputBid.placeholder = "Enter your bid";
  inputBid.ariaLabel = "Place a bid";
  inputBid.ariaRoleDescription = "button-addon2";
  divInputBid.appendChild(inputBid);

  const buttonBid = document.createElement("button");
  buttonBid.classList.add("btn", "btn-secondary", "btn-action", "btn-lg");
  buttonBid.type = "button";
  buttonBid.id = "button-addon2";
  if (isLoggedIn()) {
    buttonBid.innerText = "Place a bid";
    buttonBid.addEventListener("click", () => {
      bid(data.id, parseInt(inputBid.value), divMessage, container);
    });
  } else {
    buttonBid.innerText = "Register to bid";
  }
  divInputBid.appendChild(buttonBid);

  const pBidHistory = document.createElement("p");
  pBidHistory.classList.add("fs-4", "mb-2");
  pBidHistory.innerText = "Bid history:";
  divColumn2.appendChild(pBidHistory);

  const olBidHistory = document.createElement("ol");
  olBidHistory.className = "mb-5";
  divColumn2.appendChild(olBidHistory);

  if (data.bids.length !== 0) {
    data.bids.forEach((element, index) => {
      const liNoBid = document.createElement("li");
      liNoBid.classList.add("ps-2", "mb-1");
      liNoBid.innerText = `${element.bidderName}: ${element.amount} credits`;
      if (data.bids.length - 1 === index) {
        liNoBid.classList.add("fw-bolder");
      }
      olBidHistory.appendChild(liNoBid);
    });
  } else {
    const liNoBid = document.createElement("li");
    liNoBid.classList.add("ps-2", "fw-bolder", "mb-1");
    liNoBid.style.listStyleType = "none";
    liNoBid.innerText = "No bids";
    olBidHistory.appendChild(liNoBid);
  }
}
