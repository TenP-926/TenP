//概要:現在位置をgeolocationで取得し表示

//windowが読み込まれたら実行
window.onload = function(){
    const getpos = document.getElementById("getposbtn")
    getpos.style.visibility = "visible"
    getpos.addEventListener("click", getposition)
}

function getposition(){
    const getpos = document.getElementById("getposbtn")
    getpos.remove();
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
//成功した時の処理
function success(position){
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

//error時の処理
function error(error){
    //where = document.getElementById("where")
    //GeolocationPositionError.message
    where.remove();
    erroricon.textContent = "dangerous";
    relordicon.textContent = "update";
    relord.textContent = "再読み込み";
    relordmsg.textContent = "して再試行します";
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
