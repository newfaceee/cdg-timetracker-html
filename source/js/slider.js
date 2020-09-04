"use strict";

let draggingLeft = false;
let draggingRight = false;

let thumbLeftOffset = 0;
let thumbRightOffset = 0;

const range = document.querySelector(".controls__range");

const track = document.querySelector(".controls__track");
const trackLeft = track.offsetLeft;
const trackRight = track.offsetRight;

const thumbWidth = document.querySelector(".controls__thumb").offsetWidth;
const thumbLeft = document.querySelector(".controls__thumb--left");
const thumbRight = document.querySelector(".controls__thumb--right");

const trackWidth = track.offsetWidth - thumbWidth;

let maxRight = parseInt(thumbRight.offsetLeft, 10) - 20;
let maxLeft = parseInt(thumbLeft.offsetLeft, 10) + 20;

thumbLeft.addEventListener("mousedown", (evt) => {
  thumbLeftOffset = evt.clientX - thumbLeft.offsetLeft;
  draggingLeft = true;
});

thumbRight.addEventListener("mousedown", (evt) => {
  thumbRightOffset = evt.clientX - thumbRight.offsetLeft;
  draggingRight = true;
});

document.addEventListener("mouseup", () => {
  draggingLeft = false;
  draggingRight = false;
  maxRight = parseInt(thumbRight.offsetLeft, 10) - 20;
  maxLeft = parseInt(thumbLeft.offsetLeft, 10) + 20;
});

document.addEventListener("mousemove", (evt) => {
  if (draggingLeft) {
    let offset = evt.clientX - trackLeft - thumbLeftOffset;
    if (offset < 0) {
      offset = 0;
    } else if (offset > maxRight) {
      offset = maxRight;
    }

    thumbLeft.style.left = offset + "px";
    // range.style.left = offset + "px";
  } else if (draggingRight) {
    let offset = evt.clientX - trackLeft - thumbRightOffset;
    if (offset < maxLeft) {
      offset = maxLeft;
    } else if (offset > trackWidth) {
      offset = trackWidth;
    }
    thumbRight.style.left = offset + "px";
  }
});
