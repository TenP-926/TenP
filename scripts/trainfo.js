//とれいんふぉ

//html内の要素をidで取得
const ginzahtml = document.getElementById("ginzainfo");
const marunouchihtml = document.getElementById("marunouchiinfo")
const hibiyahtml = document.getElementById("hibiyainfo");
const tozaihtml = document.getElementById("tozaiinfo");
const chiyodahtml = document.getElementById("chiyodainfo")
const yurakuchohtml = document.getElementById("yurakuchoinfo")
const hanzomonhtml = document.getElementById("hanzomoninfo")
const nanbokuhtml = document.getElementById("nanbokuinfo")
const fukutoshinhtml = document.getElementById("fukuoshininfo")
const loadtimehtml = document.getElementById("loadtime")
const tozaistahtml = document.getElementById("tozaista")
const ginzastahtml = document.getElementById("ginzasta")
//const heijyo = "現在、平常どおり運転しています。"
//const filterdroute = [];

// 取得するJSONのURL
const odpt_trainfo = "https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:TokyoMetro&acl:consumerKey=98159df1a7d1b5c333e283b48f1349d0df838ba291407f9f1808b64919813cfc";
const g_url = fetch("https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:TokyoMetro&acl:consumerKey=98159df1a7d1b5c333e283b48f1349d0df838ba291407f9f1808b64919813cfc&odpt:railway=odpt.Railway:TokyoMetro.Ginza");
const m_url = fetch("https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:TokyoMetro&acl:consumerKey=98159df1a7d1b5c333e283b48f1349d0df838ba291407f9f1808b64919813cfc&odpt:railway=odpt.Railway:TokyoMetro.Marunouchi");
const h_url = fetch("https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:TokyoMetro&acl:consumerKey=98159df1a7d1b5c333e283b48f1349d0df838ba291407f9f1808b64919813cfc&odpt:railway=odpt.Railway:TokyoMetro.Hibiya");
const t_url = fetch("https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:TokyoMetro&acl:consumerKey=98159df1a7d1b5c333e283b48f1349d0df838ba291407f9f1808b64919813cfc&odpt:railway=odpt.Railway:TokyoMetro.Tozai");
const c_url = fetch("https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:TokyoMetro&acl:consumerKey=98159df1a7d1b5c333e283b48f1349d0df838ba291407f9f1808b64919813cfc&odpt:railway=odpt.Railway:TokyoMetro.Chiyoda");
const y_url = fetch("https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:TokyoMetro&acl:consumerKey=98159df1a7d1b5c333e283b48f1349d0df838ba291407f9f1808b64919813cfc&odpt:railway=odpt.Railway:TokyoMetro.Yurakucho");
const z_url = fetch("https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:TokyoMetro&acl:consumerKey=98159df1a7d1b5c333e283b48f1349d0df838ba291407f9f1808b64919813cfc&odpt:railway=odpt.Railway:TokyoMetro.Hanzomon");
const n_url = fetch("https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:TokyoMetro&acl:consumerKey=98159df1a7d1b5c333e283b48f1349d0df838ba291407f9f1808b64919813cfc&odpt:railway=odpt.Railway:TokyoMetro.Nanboku");
const f_url = fetch("https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:TokyoMetro&acl:consumerKey=98159df1a7d1b5c333e283b48f1349d0df838ba291407f9f1808b64919813cfc&odpt:railway=odpt.Railway:TokyoMetro.Fukutoshin");



function ginzanew(){
  const g_url = fetch("https://api.odpt.org/api/v4/odpt:TrainInformation?odpt:operator=odpt.Operator:TokyoMetro&acl:consumerKey=98159df1a7d1b5c333e283b48f1349d0df838ba291407f9f1808b64919813cfc&odpt:railway=odpt.Railway:TokyoMetro.Ginza");
g_url
.then(response => response.json())
}


// Fetch APIを使用してJSONデータを非同期で読み込む
fetch(odpt_trainfo)
  .then(response => {
    return response.json()}) //json形式で保存
  .then((response) => { //ここからresponceを使って非同期で処理
    //各路線のデータをjsonファイルから抽出
    const ginzajson = response.find(ginzafind => ginzafind["odpt:railway"] === "odpt.Railway:TokyoMetro.Ginza");
    const marunouchijson = response.find(marunouchifind => marunouchifind["odpt:railway"] === "odpt.Railway:TokyoMetro.Marunouchi");
    const hibiyajson = response.find(hibiyafind => hibiyafind["odpt:railway"] === "odpt.Railway:TokyoMetro.Hibiya");
    const tozaijson = response.find(tozaifind => tozaifind["odpt:railway"] === "odpt.Railway:TokyoMetro.Tozai");
    const chiyodajson = response.find(chiyodafind => chiyodafind["odpt:railway"] === "odpt.Railway:TokyoMetro.Chiyoda");
    const yjson = response.find(yfind => yfind["odpt:railway"] === "odpt.Railway:TokyoMetro.Yurakucho");
    const hjson = response.find(hfind => hfind["odpt:railway"] === "odpt.Railway:TokyoMetro.Hanzomon");
    const njson = response.find(nfind => nfind["odpt:railway"] === "odpt.Railway:TokyoMetro.Namboku");
    const fjson = response.find(ffind => ffind["odpt:railway"] === "odpt.Railway:TokyoMetro.Fukutoshin");

    //抽出した路線情報から運行情報を抽出
    const ginza = ginzajson["odpt:trainInformationText"].ja;
    const marunouchi = marunouchijson["odpt:trainInformationText"].ja;
    const hibiya = hibiyajson["odpt:trainInformationText"].ja;
    const tozai = tozaijson["odpt:trainInformationText"].ja;
    const chiyoda = chiyodajson["odpt:trainInformationText"].ja;
    const yurakucho = yjson["odpt:trainInformationText"].ja;
    const hanzomon = hjson["odpt:trainInformationText"].ja;
    const nanboku = njson["odpt:trainInformationText"].ja;
    const fukutoshin = fjson["odpt:trainInformationText"].ja;
    const loadtime = ginzajson["dc:date"]; //いつ時点かの情報を銀座線のデータから抽出

    //htmlに運行情報反映
    ginzahtml.textContent = ginza;
    marunouchihtml.textContent = marunouchi;
    hibiyahtml.textContent = hibiya;
    tozaihtml.textContent = tozai;
    chiyodahtml.textContent = chiyoda;
    yurakuchohtml.textContent = yurakucho;
    hanzomonhtml.textContent = hanzomon;
    nanbokuhtml.textContent = nanboku;
    fukutoshinhtml.textContent = fukutoshin;

    //取得時間表示処理
    //何文字目かを指定して情報を抽出
    const yyyymmdd = loadtime.substring(0,10)
    const t = loadtime.substring(10,11)
    const hhmmss = loadtime.substring(11,19)
    const timezone = loadtime.substring(19,25)

    const date = new Date(yyyymmdd + t + hhmmss + timezone); //Date形式に変換

    //dateから時間をパーツごとに抽出
    const year = date.getFullYear();
    let month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    month = month + 1; //取得する月が何故か1月前なので1足してやる
    const formatdate = `${year}/${month}/${day} ${hour}時${minute}分${second}秒` //パーツを組み合わせて日本語形式の時間表記にする
    loadtimehtml.textContent = formatdate; //htmlに反映
    }
  )

//reload処理
const reloadtimer = 60000; //60000ミリ秒=60秒
setTimeout(() => {
  window.location.reload();
}, reloadtimer)
