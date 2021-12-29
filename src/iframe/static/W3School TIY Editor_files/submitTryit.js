// JavaScript Document

submitTryit()

function submitTryit() {
    if (window.editor) {window.editor.save();}
    var text = document.getElementById("textareaCode").value;
    var ifr = document.createElement("iframe");
    ifr.setAttribute("frameborder", "0");
    ifr.setAttribute("id", "iframeResult");
    ifr.setAttribute("name", "iframeResult");  
    document.getElementById("iframewrapper").innerHTML = "";
    document.getElementById("iframewrapper").appendChild(ifr);
    var t=text;
    t=t.replace(/=/gi,"w3equalsign");
    t=t.replace(/\+/gi,"w3plussign");
    //document.write(t);
    var pos=t.search(/script/i)
    while (pos>0) {
      t=t.substring(0,pos) + "w3" + t.substr(pos,3) + "w3" + t.substr(pos+3,3) + "tag" + t.substr(pos+6);
    pos=t.search(/script/i);
    }
    document.getElementById("code").value=t;
    document.getElementById("codeForm").action = "/tiy/v.asp";
    document.getElementById('codeForm').method = "post";
    document.getElementById('codeForm').acceptCharset = "utf-8";
    document.getElementById('codeForm').target = "iframeResult";
    document.getElementById("codeForm").submit();
}