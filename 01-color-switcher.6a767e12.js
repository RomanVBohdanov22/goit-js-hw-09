const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),o=document.querySelector("button[data-stop]"),n=t.style.backgroundColor;function r(t){e.setAttribute("disabled",!0),e.removeEventListener("click",r),o.addEventListener("click",c),i(`#${Math.floor(16777215*Math.random()).toString(16)}`)}function c(t){e.removeAttribute("disabled"),console.log(e.attributes),e.addEventListener("click",r),o.removeEventListener("click",c),i(n)}function i(e){t.style.backgroundColor=e}e.addEventListener("click",r),console.log(e.attributes);
//# sourceMappingURL=01-color-switcher.6a767e12.js.map
