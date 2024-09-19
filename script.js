const stringElems = document.querySelectorAll("svg");

let stringArry = ["yellowString", "orangeString", "greenString", "redString"];
const finalYellowPath = document
  .querySelector("#yellowString path")
  .getAttribute("d");
const finalOrangePath = document
  .querySelector("#orangeString path")
  .getAttribute("d");
const finalGreenPath = document
  .querySelector("#greenString path")
  .getAttribute("d");
const finalRedPath = document
  .querySelector("#redString path")
  .getAttribute("d");

stringElems.forEach((elm) => {
  const musicNotes = document.querySelectorAll(".musicNote");
  elm.addEventListener("mousemove", function (dets) {
    let hoverElem = "";

    for (const id of stringArry) {
      if (id == dets.target.id) {
        hoverElem = dets.target.id;
      }
    }

    if (hoverElem) {
      let selectedString = document.querySelector(`#${hoverElem} path`);
      let initialPath = selectedString.getAttribute("d");
      initialPath = initialPath.split(" ");

      let xChanged =
        Math.round(
          (dets.x - selectedString.getBoundingClientRect().x + Number.EPSILON) *
            1000
        ) / 1000;
      let yChanged =
        Math.round(
          (dets.y - selectedString.getBoundingClientRect().y + Number.EPSILON) *
            1000
        ) / 1000;

      initialPath[4] = xChanged;
      initialPath[5] = yChanged;

      let newString = initialPath.join(" ");

      gsap.to(selectedString, {
        attr: { d: newString },
        duration: 0.2,
        ease: "power3.out",
      });

      let random = Math.floor(Math.random() * musicNotes.length);
      console.log(random);

      gsap.to(musicNotes[random], {
        y: "-100%",
        duration: 0.5,
        ease: "power3.out",
        display: "flex",
      });
    }
  });
  elm.addEventListener("mouseleave", function (dets) {
    let hoverElem = "";
    for (const id of stringArry) {
      if (id == dets.target.id) {
        hoverElem = dets.target.id;
      }
    }

    let selectedString = document.querySelector(`#${hoverElem} path`);

    let finalPath = "";
    switch (hoverElem) {
      case "yellowString":
        finalPath = finalYellowPath;
        break;
      case "orangeString":
        finalPath = finalOrangePath;
        break;
      case "greenString":
        finalPath = finalGreenPath;
        break;
      case "redString":
        finalPath = finalRedPath;
        break;
    }

    gsap.to(selectedString, {
      attr: { d: finalPath },
      duration: 1.5,
      ease: "elastic.out(1,0.2)",
    });
    musicNotes.forEach((note) => {
      gsap.to(note, {
        y: "0%",
        duration: 0.5,
        display: "none",
        stagger: 0.5,
      });
    });
  });
});
