/**
 * returns html tempalte with embedded screenshot
 * @param screenshot - bas64 encoded image
 * @param isInteractive - show interactive session screen
 */
export function getTemplate(screenshot: string, isInteractive = false): String {
    return `<head>
<title>URL Snap</title>
<style>
body {
    background-color: #e4e4e4; 
}
.hide {
    opacity: 0!important;
}
.flex {
    display: flex;
}
#loader {
    overflow: visible;
    position: fixed;
    bottom: 50%;
    right: 50%;
    transition: 1s linear;
    opacity: 100%;
}
</style>
<!-- polyfill for tv browsers -->
<script src="https://unpkg.com/whatwg-fetch@1.0.0/fetch.js"> </script> 
</head>
<body>
<svg class="" id="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: none; shape-rendering: auto;" width="56px" height="56px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <rect x="3" y="3" width="28" height="28" fill="#236eb4">
      <animate attributeName="fill" values="#f69f0d;#236eb4;#236eb4" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0s" calcMode="discrete"></animate>
    </rect><rect x="36" y="3" width="28" height="28" fill="#236eb4">
      <animate attributeName="fill" values="#f69f0d;#236eb4;#236eb4" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.125s" calcMode="discrete"></animate>
    </rect><rect x="69" y="3" width="28" height="28" fill="#236eb4">
      <animate attributeName="fill" values="#f69f0d;#236eb4;#236eb4" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.25s" calcMode="discrete"></animate>
    </rect><rect x="3" y="36" width="28" height="28" fill="#236eb4">
      <animate attributeName="fill" values="#f69f0d;#236eb4;#236eb4" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.875s" calcMode="discrete"></animate>
    </rect><rect x="69" y="36" width="28" height="28" fill="#236eb4">
      <animate attributeName="fill" values="#f69f0d;#236eb4;#236eb4" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.375s" calcMode="discrete"></animate>
    </rect><rect x="3" y="69" width="28" height="28" fill="#236eb4">
      <animate attributeName="fill" values="#f69f0d;#236eb4;#236eb4" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.75s" calcMode="discrete"></animate>
    </rect><rect x="36" y="69" width="28" height="28" fill="#236eb4">
      <animate attributeName="fill" values="#f69f0d;#236eb4;#236eb4" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.625s" calcMode="discrete"></animate>
    </rect><rect x="69" y="69" width="28" height="28" fill="#236eb4">
      <animate attributeName="fill" values="#f69f0d;#236eb4;#236eb4" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.5s" calcMode="discrete"></animate>
    </rect>
</svg>
<div class="flex">
    <img id="g" class="hide" src="data:image/png;base64,${screenshot}" style="height: 100%;">
</div>
<script>
    if(!${isInteractive}){
        const loader = document.querySelector("#loader");
        const screen = document.querySelector("#g");
        // reload page after timeout
        setInterval(()=> {   
            loader.classList.remove("hide");
            fetch("/img")
            .then(res => res.text())
            .then(img => { 
                if(img){
                    loader.classList.add("hide")
                    screen.src = "data:image/png;base64,"+img;
                    screen.classList.remove("hide");
                }
            });
        }, 2e3);
    }
</script>
</body>`;
}
