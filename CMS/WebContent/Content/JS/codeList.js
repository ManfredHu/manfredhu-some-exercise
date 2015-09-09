var now = document.getElementById("pageNow");
var leftListBottom = document.getElementById("leftListBottom");
var aList = leftListBottom.getElementsByTagName("a");
for (var a = 0; a < aList.length; a++) {
	if (now.innerHTML == aList[a].innerHTML) {
		aList[a].style.border = "1px solid transparent";
		aList[a].style.color = "#515151";
	}
}