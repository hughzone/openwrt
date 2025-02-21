/**
 * 更新日期：2025-02-21
 * 用法：Sub-Store 脚本操作添加
 *
 * 本脚本用于重命名并格式化机场（代理）节点的名称。
 */

const inArg = $arguments;

const {
  nx = false,
  bl = false,
  key = false,
  blgd = false,
  blpx = false,
  blnx = false,
  one: numone = false,
  debug = false,
  clear = false,
  flag: addflag = false,
  fgf,
  sn,
  name: FNAMERaw,
  blkey,
  blockquic: blockquicRaw,
  in: inParam,
  out: outParam,
} = inArg;

const FGF = fgf === undefined ? "|" : decodeURI(fgf);
const XHFGF = sn === undefined ? "" : decodeURI(sn);
const FNAME = FNAMERaw === undefined ? "" : decodeURI(FNAMERaw);
const BLKEY = blkey === undefined ? "" : decodeURI(blkey);
const blockquic = blockquicRaw === undefined ? "" : decodeURI(blockquicRaw);

const nameMap = {
  cn: "cn", zh: "cn", us: "us", en: "us",
  quan: "quan", gq: "gq", flag: "gq",
};
const inname = nameMap[inParam] || "";
const outputName = nameMap[outParam] || "";

// prettier-ignore
const FG = ['🇭🇰','🇲🇴','🇹🇼','🇯🇵','🇰🇷','🇸🇬','🇺🇸','🇬🇧','🇫🇷','🇩🇪','🇦🇺','🇦🇪','🇦🇫','🇦🇱','🇩🇿','🇦🇴','🇦🇷','🇦🇲','🇦🇹','🇦🇿','🇧🇭','🇧🇩','🇧🇾','🇧🇪','🇧🇿','🇧🇯','🇧🇹','🇧🇴','🇧🇦','🇧🇼','🇧🇷','🇻🇬','🇧🇳','🇧🇬','🇧🇫','🇧🇮','🇰🇭','🇨🇲','🇨🇦','🇨🇻','🇰🇾','🇨🇫','🇹🇩','🇨🇱','🇨🇴','🇰🇲','🇨🇬','🇨🇩','🇨🇷','🇭🇷','🇨🇾','🇨🇿','🇩🇰','🇩🇯','🇩🇴','🇪🇨','🇪🇬','🇸🇻','🇬🇶','🇪🇷','🇪🇪','🇪🇹','🇫🇯','🇫🇮','🇬🇦','🇬🇲','🇬🇪','🇬🇭','🇬🇷','🇬🇱','🇬🇹','🇬🇳','🇬🇾','🇭🇹','🇭🇳','🇭🇺','🇮🇸','🇮🇳','🇮🇩','🇮🇷','🇮🇶','🇮🇪','🇮🇲','🇮🇱','🇮🇹','🇨🇮','🇯🇲','🇯🇴','🇰🇿','🇰🇪','🇰🇼','🇰🇬','🇱🇦','🇱🇻','🇱🇧','🇱🇸','🇱🇷','🇱🇾','🇱🇹','🇱🇺','🇲🇰','🇲🇬','🇲🇼','🇲🇾','🇲🇻','🇲🇱','🇲🇹','🇲🇷','🇲🇺','🇲🇽','🇲🇩','🇲🇨','🇲🇳','🇲🇪','🇲🇦','🇲🇿','🇲🇲','🇳🇦','🇳🇵','🇳🇱','🇳🇿','🇳🇮','🇳🇪','🇳🇬','🇰🇵','🇳🇴','🇴🇲','🇵🇰','🇵🇦','🇵🇾','🇵🇪','🇵🇭','🇵🇹','🇵🇷','🇶🇦','🇷🇴','🇷🇺','🇷🇼','🇸🇲','🇸🇦','🇸🇳','🇷🇸','🇸🇱','🇸🇰','🇸🇮','🇸🇴','🇿🇦','🇪🇸','🇱🇰','🇸🇩','🇸🇷','🇸🇿','🇸🇪','🇨🇭','🇸🇾','🇹🇯','🇹🇿','🇹🇭','🇹🇬','🇹🇴','🇹🇹','🇹🇳','🇹🇷','🇹🇲','🇻🇮','🇺🇬','🇺🇦','🇺🇾','🇺🇿','🇻🇪','🇻🇳','🇾🇪','🇿🇲','🇿🇼','🇦🇩','🇷🇪','🇵🇱','🇬🇺','🇻🇦','🇱🇮','🇨🇼','🇸🇨','🇦🇶','🇬🇮','🇨🇺','🇫🇴','🇦🇽','🇧🇲','🇹🇱'];

// prettier-ignore
const EN = ['HK','MO','TW','JP','KR','SG','US','GB','FR','DE','AU','AE','AF','AL','DZ','AO','AR','AM','AT','AZ','BH','BD','BY','BE','BZ','BJ','BT','BO','BA','BW','BR','VG','BN','BG','BF','BI','KH','CM','CA','CV','KY','CF','TD','CL','CO','KM','CG','CD','CR','HR','CY','CZ','DK','DJ','DO','EC','EG','SV','GQ','ER','EE','ET','FJ','FI','GA','GM','GE','GH','GR','GL','GT','GN','GY','HT','HN','HU','IS','IN','ID','IR','IQ','IE','IM','IL','IT','CI','JM','JO','KZ','KE','KW','KG','LA','LV','LB','LS','LR','LY','LT','LU','MK','MG','MW','MY','MV','ML','MT','MR','MU','MX','MD','MC','MN','ME','MA','MZ','MM','NA','NP','NL','NZ','NI','NE','NG','KP','NO','OM','PK','PA','PY','PE','PH','PT','PR','QA','RO','RU','RW','SM','SA','SN','RS','SL','SK','SI','SO','ZA','ES','LK','SD','SR','SZ','SE','CH','SY','TJ','TZ','TH','TG','TO','TT','TN','TR','TM','VI','UG','UA','UY','UZ','VE','VN','YE','ZM','ZW','AD','RE','PL','GU','VA','LI','CW','SC','AQ','GI','CU','FO','AX','BM','TL'];

// prettier-ignore
const ZH = ['香港','澳门','台湾','日本','韩国','新加坡','美国','英国','法国','德国','澳大利亚','阿联酋','阿富汗','阿尔巴尼亚','阿尔及利亚','安哥拉','阿根廷','亚美尼亚','奥地利','阿塞拜疆','巴林','孟加拉国','白俄罗斯','比利时','伯利兹','贝宁','不丹','玻利维亚','波斯尼亚和黑塞哥维那','博茨瓦纳','巴西','英属维京群岛','文莱','保加利亚','布基纳法索','布隆迪','柬埔寨','喀麦隆','加拿大','佛得角','开曼群岛','中非共和国','乍得','智利','哥伦比亚','科摩罗','刚果(布)','刚果(金)','哥斯达黎加','克罗地亚','塞浦路斯','捷克','丹麦','吉布提','多米尼加共和国','厄瓜多尔','埃及','萨尔瓦多','赤道几内亚','厄立特里亚','爱沙尼亚','埃塞俄比亚','斐济','芬兰','加蓬','冈比亚','格鲁吉亚','加纳','希腊','格陵兰','危地马拉','几内亚','圭亚那','海地','洪都拉斯','匈牙利','冰岛','印度','印尼','伊朗','伊拉克','爱尔兰','马恩岛','以色列','意大利','科特迪瓦','牙买加','约旦','哈萨克斯坦','肯尼亚','科威特','吉尔吉斯斯坦','老挝','拉脱维亚','黎巴嫩','莱索托','利比里亚','利比亚','立陶宛','卢森堡','马其顿','马达加斯加','马拉维','马来','马尔代夫','马里','马耳他','毛利塔尼亚','毛里求斯','墨西哥','摩尔多瓦','摩纳哥','蒙古','黑山共和国','摩洛哥','莫桑比克','缅甸','纳米比亚','尼泊尔','荷兰','新西兰','尼加拉瓜','尼日尔','尼日利亚','朝鲜','挪威','阿曼','巴基斯坦','巴拿马','巴拉圭','秘鲁','菲律宾','葡萄牙','波多黎各','卡塔尔','罗马尼亚','俄罗斯','卢旺达','圣马力诺','沙特阿拉伯','塞内加尔','塞尔维亚','塞拉利昂','斯洛伐克','斯洛文尼亚','索马里','南非','西班牙','斯里兰卡','苏丹','苏里南','斯威士兰','瑞典','瑞士','叙利亚','塔吉克斯坦','坦桑尼亚','泰国','多哥','汤加','特立尼达和多巴哥','突尼斯','土耳其','土库曼斯坦','美属维尔京群岛','乌干达','乌克兰','乌拉圭','乌兹别克斯坦','委内瑞拉','越南','也门','赞比亚','津巴布韦','安道尔','留尼汪','波兰','关岛','梵蒂冈','列支敦士登','库拉索','塞舌尔','南极','直布罗陀','古巴','法罗群岛','奥兰群岛','百慕达','东帝汶'];

// prettier-ignore
const QC = ['Hong Kong','Macao','Taiwan','Japan','Korea','Singapore','United States','United Kingdom','France','Germany','Australia','Dubai','Afghanistan','Albania','Algeria','Angola','Argentina','Armenia','Austria','Azerbaijan','Bahrain','Bangladesh','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','British Virgin Islands','Brunei','Bulgaria','Burkina-faso','Burundi','Cambodia','Cameroon','Canada','CapeVerde','CaymanIslands','Central African Republic','Chad','Chile','Colombia','Comoros','Congo-Brazzaville','Congo-Kinshasa','CostaRica','Croatia','Cyprus','Czech Republic','Denmark','Djibouti','Dominican Republic','Ecuador','Egypt','EISalvador','Equatorial Guinea','Eritrea','Estonia','Ethiopia','Fiji','Finland','Gabon','Gambia','Georgia','Ghana','Greece','Greenland','Guatemala','Guinea','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Isle of Man','Israel','Italy','Ivory Coast','Jamaica','Jordan','Kazakstan','Kenya','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Lithuania','Luxembourg','Macedonia','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Mauritania','Mauritius','Mexico','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar(Burma)','Namibia','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','NorthKorea','Norway','Oman','Pakistan','Panama','Paraguay','Peru','Philippines','Portugal','PuertoRico','Qatar','Romania','Russia','Rwanda','SanMarino','SaudiArabia','Senegal','Serbia','SierraLeone','Slovakia','Slovenia','Somalia','SouthAfrica','Spain','SriLanka','Sudan','Suriname','Swaziland','Sweden','Switzerland','Syria','Tajikstan','Tanzania','Thailand','Togo','Tonga','TrinidadandTobago','Tunis','Turkey','Turkmenistan','U.S.Virgin Islands','Uganda','Ukraine','Uruguay','Uzbekistan','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe','Andorra','Reunion','Poland','Guam','Vatican','Liechtensteins','Curacao','Seychelles','Antarctica','Gibraltar','Cuba','Faroe Islands','Ahvenanmaa','Bermuda','Timor-Leste'];

// 正则数组，用于匹配名称中的特殊标识（倍率、关键词等）
const specialRegex = [
  /(\d\.)?\d+×/,
  /IPLC|IEPL|Kern|Edge|Pro|Std|Exp|Biz|Fam|Game|Buy|Zx|LB|Game/,
];

// 正则：用于清理无关字符
const nameclear = /(套餐|到期|有效|剩余|版本|已用|过期|失联|测试|官方|网址|备用|群|TEST|客服|网站|获取|订阅|流量|机场|下次|官址|联系|邮箱|工单|学术|USE|USED|TOTAL|EXPIRE|EMAIL)/i;

// 正则数组与对应转换值（倍率等）
const regexArray = [
  /ˣ²/, /ˣ³/, /ˣ⁴/, /ˣ⁵/, /ˣ⁶/, /ˣ⁷/, /ˣ⁸/, /ˣ⁹/, /ˣ¹⁰/,
  /ˣ²⁰/, /ˣ³⁰/, /ˣ⁴⁰/, /ˣ⁵⁰/,
  /IPLC/i, /IEPL/i,
  /核心/, /边缘/, /高级/, /标准/, /实验/, /商宽/, /家宽/,
  /游戏|game/i, /购物/, /专线/, /LB/, /cloudflare/i, /\budp\b/i, /\bgpt\b/i, /udpn\b/
];
const valueArray = [
  "2×", "3×", "4×", "5×", "6×", "7×", "8×", "9×", "10×",
  "20×", "30×", "40×", "50×",
  "IPLC", "IEPL",
  "Kern", "Edge", "Pro", "Std", "Exp", "Biz", "Fam",
  "Game", "Buy", "Zx", "LB", "CF", "UDP", "GPT", "UDPN"
];

// 正则：匹配高倍率（仅保留高倍率）
const nameblnx = /(高倍|(?!1)2+(x|倍)|ˣ²|ˣ³|ˣ⁴|ˣ⁵|ˣ¹⁰)/i;
// 正则：匹配倍率（保留1倍率与无倍率情况）
const namenx = /(高倍|(?!1)(0\.|\d)+(x|倍)|ˣ²|ˣ³|ˣ⁴|ˣ⁵|ˣ¹⁰)/i;

// 用于匹配节点名称中常见的地区关键词
const keya = /港|Hong|HK|新加坡|SG|Singapore|日本|Japan|JP|美国|United States|US|韩|土耳其|TR|Turkey|Korea|KR|🇸🇬|🇭🇰|🇯🇵|🇺🇸|🇰🇷|🇹🇷/i;
// 用于过滤部分节点（结合序号与国家名称判断）
const keyb = /(((1|2|3|4)\d)|(香港|Hong|HK) 0[5-9]|((新加坡|SG|Singapore|日本|Japan|JP|美国|United States|US|韩|土耳其|TR|Turkey|Korea|KR) 0[3-9]))/i;

// 定义对象，将部分名称替换为标准名称
const rurekey = {
  GB: /UK/g,
  "B-G-P": /BGP/g,
  "Russia Moscow": /Moscow/g,
  "Korea Chuncheon": /Chuncheon|Seoul/g,
  "Hong Kong": /Hongkong|HONG KONG/gi,
  "United Kingdom London": /London|Great Britain/g,
  "Dubai United Arab Emirates": /United Arab Emirates/g,
  "Taiwan TW 台湾 🇹🇼": /(台|Tai\s?wan|TW).*?🇨🇳|🇨🇳.*?(台|Tai\s?wan|TW)/g,
  "United States": /USA|Los Angeles|San Jose|Silicon Valley|Michigan/g,
  澳大利亚: /澳洲|墨尔本|悉尼|土澳|(深|沪|呼|京|广|杭)澳/g,
  德国: /(深|沪|呼|京|广|杭)德(?!.*(I|线))|法兰克福|滬德/g,
  香港: /(深|沪|呼|京|广|杭)港(?!.*(I|线))/g,
  日本: /(深|沪|呼|京|广|杭|中|辽)日(?!.*(I|线))|东京|大坂/g,
  新加坡: /狮城|(深|沪|呼|京|广|杭)新/g,
  美国: /(深|沪|呼|京|广|杭)美|波特兰|芝加哥|哥伦布|纽约|硅谷|俄勒冈|西雅图|芝加哥/g,
  波斯尼亚和黑塞哥维那: /波黑共和国/g,
  印尼: /印度尼西亚|雅加达/g,
  印度: /孟买/g,
  阿联酋: /迪拜|阿拉伯联合酋长国/g,
  孟加拉国: /孟加拉/g,
  捷克: /捷克共和国/g,
  台湾: /新台|新北|台(?!.*线)/g,
  Taiwan: /Taipei/g,
  韩国: /春川|韩|首尔/g,
  Japan: /Tokyo|Osaka/g,
  英国: /伦敦/g,
  India: /Mumbai/g,
  Germany: /Frankfurt/g,
  Switzerland: /Zurich/g,
  俄罗斯: /莫斯科/g,
  土耳其: /伊斯坦布尔/g,
  泰国: /泰國|曼谷/g,
  法国: /巴黎/g,
  G: /\d\s?GB/gi,
  Esnc: /esnc/gi,
};

// 用于存储 Allmap 的键值对（仅记录一次）
let GetK = false,
  AMK = [];

/**
 * 保存 Allmap 键值对（仅调用一次）
 * @param {Object} map
 */
const ObjKA = (map) => {
  GetK = true;
  AMK = Object.entries(map);
};

/**
 * 主处理函数：对传入的代理节点数组进行名称重构和格式化
 * @param {Array} pro 节点数组，每个节点至少包含 name 属性
 * @returns {Array} 处理后的节点数组
 */
function operator(pro) {
    // 从第一个节点获取订阅名称
    const subscriptionName = pro[0]?._subDisplayName || pro[0]?._subName || "";


  const Allmap = {};
  const outList = getList(outputName);
  let retainKey = "";
  const inputList = inname ? [getList(inname)] : [ZH, FG, QC, EN];

  // 构造名称映射：将输入数组对应到输出数组
  inputList.forEach(arr =>
    arr.forEach((value, idx) => {
      Allmap[value] = outList[idx];
    })
  );

  // 根据 clear、nx、blnx、key 参数过滤掉无效节点
  pro = pro.filter(res => {
    const resname = res.name;
    return !(
      (clear && nameclear.test(resname)) ||
      (nx && namenx.test(resname)) ||
      (blnx && !nameblnx.test(resname)) ||
      (key && !(keya.test(resname) && /2|4|6|7/i.test(resname)))
    );
  });

  const BLKEYS = BLKEY ? BLKEY.split("+") : [];

  pro.forEach(e => {
    let bktf = false;
    const originalName = e.name;

    // 使用 rurekey 替换节点名称中的关键词
    Object.keys(rurekey).forEach(ikey => {
      if (rurekey[ikey].test(e.name)) {
        e.name = e.name.replace(rurekey[ikey], ikey);

        if (BLKEY) {
          bktf = true;
          let BLKEY_REPLACE = "",
            re = false;
          BLKEYS.forEach(item => {
            const [src, replacement] = item.split(">");
            if (item.includes(">") && originalName.includes(src)) {
              if (rurekey[ikey].test(src)) {
                e.name += " " + src;
              }
              if (replacement) {
                BLKEY_REPLACE = replacement;
                re = true;
              }
            } else if (originalName.includes(item)) {
              e.name += " " + item;
            }
            retainKey = re ? BLKEY_REPLACE : BLKEYS.filter(it => e.name.includes(it));
          });
        }
      }
    });

    // 设置 block-quic 属性
    if (blockquic === "on") {
      e["block-quic"] = "on";
    } else if (blockquic === "off") {
      e["block-quic"] = "off";
    } else {
      delete e["block-quic"];
    }

    // 单独处理未经过 BLKEY 处理的情况
    if (!bktf && BLKEY) {
      let BLKEY_REPLACE = "",
        re = false;
      BLKEYS.forEach(item => {
        const [src, replacement] = item.split(">");
        if (item.includes(">") && e.name.includes(src)) {
          if (replacement) {
            BLKEY_REPLACE = replacement;
            re = true;
          }
        }
      });
      retainKey = re ? BLKEY_REPLACE : BLKEYS.filter(item => e.name.includes(item));
    }

   // 处理倍率：blgd 与 bl 参数分别匹配不同规则, 并提取倍率信息
        let multiplier = "";
        if (blgd) {
            regexArray.forEach((regex, idx) => {
                if (regex.test(e.name)) {
                    multiplier = valueArray[idx];
                }
            });
        }
        if (bl) {
            const match = e.name.match(/((倍率|X|x|×)\D?((\d{1,3}\.)?\d+)\D?)|((\d{1,3}\.)?\d+)(倍|X|x|×)/);
            if (match) {
                const rev = match[0].match(/(\d[\d.]*)/)[0];
                if (rev !== "1") {
                    multiplier = rev + "×";
                }
            }
        }

    if (!GetK) ObjKA(Allmap);
    const findKey = AMK.find(([k]) => e.name.includes(k));

    // 构造最终节点名称
        if (findKey?.[1]) {
            const findKeyValue = findKey[1];
             //国旗
            let usflag = "";
            if (addflag) {
                const index = outList.indexOf(findKeyValue);
                if (index !== -1) {
                    usflag = FG[index];
                    usflag = usflag === "🇹🇼" ? "🇨🇳" : usflag;
                }
            }

            // 组装名称，包括：订阅名 + | + 节点名 + 序号 + 倍率  ,  这里先不加序号和倍率
            let finalName = [
                subscriptionName,   // 订阅组名
                FNAME,             //前缀名称
                usflag,              //国旗
                findKeyValue,       // 节点名（已替换为标准名称）
                retainKey,          // 保留关键词

            ].filter(Boolean).join(FGF); // 使用 FGF 连接

            e.name = finalName; // 先保存不带序号和倍率的名称
            e.multiplier = multiplier; //倍率

        } else {
            e.name = null; // 如果没有匹配的地区，则设置为 null, 后面会过滤掉
        }
    });

    // 移除名称为空的节点
    pro = pro.filter(e => e.name !== null);

    // 为相同名称的节点添加序号（如 01、02…）
    jxh(pro);  // jxh 函数现在会处理序号和倍率

    if (numone) oneP(pro);
    if (blpx) pro = fampx(pro);
    if (key) pro = pro.filter(e => !keyb.test(e.name));

    return pro;
}

/**
 * 根据类型参数返回对应的名称数组
 * @param {String} arg 类型参数（如 'us', 'gq', 'quan'）
 * @returns {Array} 对应的名称数组
 */
function getList(arg) {
  switch (arg) {
    case "us":
      return EN;
    case "gq":
      return FG;
    case "quan":
      return QC;
    default:
      return ZH;
  }
}

/**
 * 对节点数组进行分组，为相同名称的节点添加序号和倍率
 * @param {Array} nodes 节点数组, 已经包含了 multiplier 属性
 * @returns {Array} 更新后的节点数组
 */
function jxh(nodes) {
  const groups = nodes.reduce((acc, cur) => {
    const baseName = cur.name; // 使用 operator 中生成的 e.name
    let group = acc.find(item => item.baseName === baseName);

    if (group) {
      group.count++;
      group.items.push({
        ...cur,
        // 在这里添加序号和倍率
        name: `${baseName}${XHFGF}${String(group.count).padStart(2, "0")}${cur.multiplier ? FGF + cur.multiplier : ""}`,
      });
    } else {
      acc.push({
        baseName,
        count: 1,
        items: [{
          ...cur,
           // 初始节点也添加序号和倍率
          name: `${baseName}${XHFGF}01${cur.multiplier ? FGF + cur.multiplier : ""}`,
        }],
      });
    }
    return acc;
  }, []);

  const flattened = [].concat(...groups.map(g => g.items));
  nodes.length = 0; // 清空 nodes
  nodes.push(...flattened); // 将新节点放回
  return nodes;
}


/**
 * 处理只有单个节点的地区，去除名称尾部的 "01"
 * @param {Array} nodes 节点数组
 * @returns {Array} 更新后的节点数组
 */
function oneP(nodes) {
  const groups = nodes.reduce((acc, cur) => {
    // 关键更改：去除序号和可能的倍率，然后进行分组
    const baseName = cur.name.replace(/(\d{2})(×[\d.]+)?$/, '');
    acc[baseName] = acc[baseName] || [];
    acc[baseName].push(cur);
    return acc;
  }, {});

  Object.values(groups).forEach(group => {
    if (group.length === 1) {
      // 移除序号和可能的倍率
      group[0].name = group[0].name.replace(/(\d{2})(×[\d.]+)?$/, '');
    }
  });
  return nodes;
}


/**
 * 对含特殊倍率标识的节点进行分组排序，并与其他节点合并返回
 * @param {Array} nodes 节点数组
 * @returns {Array} 排序后的节点数组
 */
function fampx(nodes) {
  const withSpecial = [];
  const withoutSpecial = [];
  nodes.forEach(proxy => {
    if (specialRegex.some(regex => regex.test(proxy.name))) {
      withSpecial.push(proxy);
    } else {
      withoutSpecial.push(proxy);
    }
  });

  const sps = withSpecial.map(proxy =>
    specialRegex.findIndex(regex => regex.test(proxy.name))
  );
  withSpecial.sort((a, b) =>
    sps[withSpecial.indexOf(a)] - sps[withSpecial.indexOf(b)] ||
    a.name.localeCompare(b.name)
  );
  withoutSpecial.sort((a, b) => nodes.indexOf(a) - nodes.indexOf(b));
  return withoutSpecial.concat(withSpecial);
}
