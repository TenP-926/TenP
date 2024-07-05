document.addEventListener("DOMContentLoaded",getipinfo)
document.addEventListener("DOMContentLoaded",getendpoint)
document.addEventListener("DOMContentLoaded",getpos)

//ipinfo.io よりipアドレスとそれから得られる情報
async function getipinfo(){
await fetch("https://ipinfo.io?callback")
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
    })
}

//ユーザー環境に関する情報を表示
async function getendpoint(){
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
    const displaysizehtml = document.getElementById("displaysize")
    displaysizehtml.textContent = "画面サイズ: " + displaysize;
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
}

//現在位置をgeolocationで取得し表示
async function getpos(){
    const getpos = document.getElementById("getposbtn")
    getpos.style.visibility = "visible"
    getpos.addEventListener("click", getposition)
}

async function getposition(){
    const getpos = document.getElementById("getposbtn")
    getpos.style.display = "none";
    where.style.display = "block";

    const options={
        timeout: 15000 //15s
    };

    if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(success,error,options)
    }
    else{
        where.remove();
        console.error("Geolocation APIが利用できないため位置情報を取得できません。")
        errormsg.textContent = "位置情報APIが利用できません。"
    }
}

//getpos:成功した時の処理
function success(position){
    errors.remove();
    //const gmap = document.getElementById("gmap")
    // メモ:国土地理院API使って緯度経度から標高がわかるを実装したい https://maps.gsi.go.jp/development/elevation_s.html https://qiita.com/PearlEarringMinion/items/f4e27f00b61262d22630#国土地理院apiの活用
    const ido = position.coords.latitude;
    const keido = position.coords.longitude;
    const koudo = position.coords.altitude;
    const seido = position.coords.accuracy;
    const koudoseido = position.coords.altitudeAccuracy;
    const hougaku = position.coords.heading;
    const speed = position.coords.speed;
    const timestamp = position.timestamp;
    const time = new Date(timestamp)
    const year = time.getFullYear();
    const month = time.getMonth()+1;
    const date = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    const convert = "取得:" + year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + second;
    idohtml.textContent = ido;
    keidohtml.textContent = keido;
    koudohtml.textContent = koudo;
    hougakuhtml.textContent = hougaku;
    speedhtml.textContent = speed;
    seidohtml.textContent = "緯度経度の誤差:" + seido + "m以内、";
    timehtml.textContent = convert;
    if (koudo != null){
        koudohtml.textContent = "高度: " + koudo + "m";
    }
    if (hougaku != null){
        hougakuhtml.textContent = "方角: " + hougaku;
    }
    if (speed != null){
        speedhtml.textContent = "速度: " + speed + "m/s";
    }
    if (koudoseido != null){
        koudoseidohtml.textContent = "高度の誤差:" + koudoseido + "m" + "、";
    }

    //Gmapのurlに緯度経度を力づくで入れる ヒントは https://www.motohasi.net/GPS/PosConv.php から得た
    const originmapurl = "https://www.google.com/maps?q=";
    const mapurl = originmapurl + ido + "," + keido;
    gmap.setAttribute("href", mapurl)
    gmap.textContent = "Googleマップで見る";

    const place = document.getElementById("place");
    const placetxt = place.innerText;
    const copytxt = placetxt.replace(/\r?\n/g," ")
    //navigator.clipboard.writeText(copytxt);
    btn.addEventListener("click",() =>{
        navigator.clipboard.writeText(copytxt);
        btn.textContent = "コピーしました！"
    })
    //JS側で変数足し合わせたりしてコピーするテキスト作りたい! => あれ...いい変数がないな... => せや!innertextでhtmlに出力されてる文字列をコピーする脳死実装すればいいやん!!
}

//getpos:error時の処理
function error(error){
    //where = document.getElementById("where")
    //GeolocationPositionError.message
    const getpos = document.getElementById("getposbtn")
    getpos.style.display = "block";
    where.style.display = "none"
    erroricon.textContent = "dangerous";
    relordicon.textContent = "update";
    //relord.textContent = ""; ###消す###
    relordmsg.textContent = "上のボタンを押して再試行します";
    const errorcode = error.code;
    console.error("位置情報を取得できませんでした。以下にエラー情報を示します", error)
    switch(error.code){
        case 1:
            errormsg.textContent = "位置情報の取得を拒否されました";
            break;
        case 2:
            errormsg.textContent = "位置情報が利用できません";
            break;
        case 3:
            errormsg.textContent = "処理がタイムアウトしました。ネットワーク接続などを確認してください"
            break;
        default:
            errormsg.textContent = "不明なエラーです。エラーコード:" + errorcode;
            break;
    }
}
