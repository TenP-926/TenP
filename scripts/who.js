//概要: IPアドレスやuser-agentからできる限りユーザーの動作環境を表示

//ipinfo.io よりipアドレスとそれから得られる情報
fetch("https://ipinfo.io?callback")
    .then(res => res.json())
    .then(json => {
        ipadress.textContent = "IPアドレス: " + json.ip;
        hostname.textContent = "ホスト名: " + json.hostname;
        loc.textContent = "緯度,経度: " + json.loc;
        org.textContent = "事業者: " + json.org; 
        const originmapurl = "https://www.google.com/maps?q=";
        const ipmapurl = originmapurl + json.loc;
        ipgmap.setAttribute("href", ipmapurl)
        ipgmap.textContent = "Googleマップで見る";

        const ipcontent = document.getElementById("ip-content")
        console.log(ipcontent)
        const iptxt = ipcontent.innerText;
        const ipcopytxt = iptxt.replace(/\r?\n/g," ")
        ipbtn.addEventListener("click",() =>{
            navigator.clipboard.writeText(ipcopytxt);
            ipbtn.textContent = "コピーしました！"
        })
        const width = screen.width;
        const height = screen.height;
        const displaysize = width + "x" + height;
        console.log(displaysize)
        browsername.textContent = "ブラウザ: " + platform.name;
        browserver.textContent = "ブラウザのバージョン: " + platform.version;
        os.textContent = "OS: " + platform.os;
        const uacontent = document.getElementById("ua-content")
        const uatxt = uacontent.innerText;
        const uacopytxt = uatxt.replace(/\r?\n/g," ")
        uabtn.addEventListener("click",() =>{
            navigator.clipboard.writeText(uacopytxt);
            uabtn.textContent = "コピーしました！"
        })
    })