window.addEventListener("DOMContentLoaded", () => {
  let commentsDate4 = document.querySelectorAll("[data-comment-date-4]");
  let commentsDate3 = document.querySelectorAll("[data-comment-date-3]");
  let commentsDate2 = document.querySelectorAll("[data-comment-date-2]");
  let commentsDate1 = document.querySelectorAll("[data-comment-date-1]");
  let commentsDateCurr = document.querySelectorAll("[data-comment-current]");
  let weekDay = document.querySelector("[day-of-the-week]");

  let articleDate = document.querySelectorAll("[data-article-date]");
  let promoDate = document.querySelectorAll("[promo-date]");
  let currentDate = new Date();
  let currentDay = "";
  let dateBefore = new Date();
  dateBefore.setDate(dateBefore.getDate() - 4);

  switch (dateBefore.getDay()) {
    case 1:
      currentDay = "poniedziałek";
      break;
    case 2:
      currentDay = "wtorek";
      break;
    case 3:
      currentDay = "środa";
      break;
    case 4:
      currentDay = "czwartek";
      break;
    case 5:
      currentDay = "piątek";
      break;
    case 6:
      currentDay = "sobota";
      break;
    case 0:
      currentDay = "niedziela";
      break;
  }
  //set article date to 4 days before current
  articleDate.forEach((item) => {
    item.innerHTML = `${currentDay} ${dateBefore
      .getDate()
      .toString()
      .padStart(2, "0")}.${(dateBefore.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${dateBefore.getFullYear()}`;
  });

  //set promo date to current date
  promoDate.forEach((item) => {
    item.innerHTML = `${currentDate.getDate().toString().padStart(2, "0")}.${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${currentDate.getFullYear()}`;
  });

  const setDate = (commentsArray, daysBefore) => {
    let date = new Date();
    date.setDate(daysBefore ? date.getDate() - daysBefore : date.getDate());
    let currDay = "";
    switch (date.getDay()) {
      case 1:
        currDay = "poniedziałek";
        break;
      case 2:
        currDay = "wtorek";
        break;
      case 3:
        currDay = "środa";
        break;
      case 4:
        currDay = "czwartek";
        break;
      case 5:
        currDay = "piątek";
        break;
      case 6:
        currDay = "sobota";
        break;
      case 0:
        currDay = "niedziela";
        break;
    }

    commentsArray.forEach((item) => {
      item.innerHTML = `${currDay} ${date
        .getDate()
        .toString()
        .padStart(2, "0")}.${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${date.getFullYear()}`;
    });
  };

  // const setLinks = () => {
  //   document.querySelectorAll("a").forEach((item) => {
  //     console.log(item);
  //     if (!item.classList.contains("policy")) {
  //       item.setAttribute(
  //         "href",
  //         ""
  //       );
  //     }
  //   });
  // };

  setDate(commentsDate4, 4);
  setDate(commentsDate3, 3);
  setDate(commentsDate2, 2);
  setDate(commentsDate1, 1);
  setDate(commentsDateCurr);
});
