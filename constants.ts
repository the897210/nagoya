import { TripData, TransportLink } from './types';

export const INITIAL_TRIP_DATA: TripData = {
  trip_id: "nagoya_7d6n_2025",
  title: "名古屋名所・世界遺產 7 日遊",
  theme_color: "bg-indigo-900",
  itinerary: [
    {
      day: 1,
      date: "第一天：名古屋市區",
      spots: [
        { 
          id: "s1", time: "14:00", name: "大須觀音 & 商店街", lat: 35.1593, lng: 136.8991, 
          type: "landmark",
          map_code: "4 229 655*82",
          phone: "052-231-6525",
          desc: "必買伴手禮與在地美食小點。",
          long_desc: "大須觀音有1300年歷史，商店街則聚集了超過1200家店鋪。這裡是名古屋最熱鬧的庶民商圈，適合邊走邊吃。",
          transports: [
            { type: "地鐵", detail: "鶴舞線『大須觀音站』2號出口", cost: "210 JPY", is_best: true },
            { type: "計程車", detail: "從名古屋站約 10 分鐘", cost: "約 1,200 JPY", is_best: false }
          ],
          selectedTransportIdx: 0,
          seat_info: "無需預約"
        },
        { 
          id: "s2", time: "18:30", name: "榮商圈 Oasis 21", lat: 35.1715, lng: 136.9090, 
          type: "landmark",
          map_code: "4 320 235*14",
          phone: "052-962-1011",
          desc: "夜拍電視塔與地標之船。",
          long_desc: "外型像宇宙船的建築，頂層是『水之宇宙船』。晚上點燈後非常浪漫，是名古屋必拍的夜景聖地。",
          transports: [
            { type: "地鐵", detail: "東山線『榮站』直達", cost: "210 JPY", is_best: true },
            { type: "步行", detail: "從久屋大通公園散步前往", cost: "0 JPY", is_best: false }
          ],
          selectedTransportIdx: 0,
          seat_info: "無需預約"
        }
      ]
    },
    {
      day: 2,
      date: "第二天：歷史與技術",
      spots: [
        { 
          id: "s3", time: "09:30", name: "名古屋城", lat: 35.1838, lng: 136.8997, 
          type: "landmark",
          map_code: "4 350 491*22",
          phone: "052-231-1700",
          desc: "參觀本丸御殿與金鯱。",
          long_desc: "江戶幕府德川家康修建。亮點是屋頂上的『金鯱』以及極盡奢華、以金箔壁畫聞名的『本丸御殿』。",
          transports: [
            { type: "觀光巴士", detail: "名車 Meguru 觀光巴士", cost: "500 JPY (一日券)", is_best: true },
            { type: "地鐵", detail: "名城線『名古屋城站』", cost: "210 JPY", is_best: false }
          ],
          selectedTransportIdx: 0,
          seat_info: "無需預約"
        }
      ]
    },
    {
      day: 4,
      date: "第四天：世界遺產",
      spots: [
        { 
          id: "s6", time: "08:00", name: "白川鄉合掌村", lat: 36.2577, lng: 136.9063, 
          type: "landmark",
          map_code: "549 049 190*33",
          phone: "05769-6-1013",
          desc: "世界級合掌式建築聚落。",
          long_desc: "聯合國教科文組織世界文化遺產。冬天有如童話般的薑餅屋雪景，夏天則是翠綠的梯田景緻。",
          transports: [
            { type: "高速巴士", detail: "濃飛巴士 (全預約制)", cost: "4,000 JPY", is_best: true },
            { type: "自駕", detail: "經由東海北陸自動車道", cost: "過路費約 4,500 JPY", is_best: false }
          ],
          selectedTransportIdx: 0,
          seat_info: "【重要：高速巴士必須提前預約指定席】"
        }
      ]
    }
  ]
};

export const TRANSPORT_LINKS: TransportLink[] = [
  { name: "JR 東海 (新幹線/特急)", url: "https://railway.jr-central.co.jp/", iconName: "Train", color: "text-orange-600" },
  { name: "濃飛/名鐵巴士 (合掌村預約)", url: "https://www.nouhibus.co.jp/highwaybus/nagoya/", iconName: "Bus", color: "text-blue-700" },
  { name: "吉卜力公園門票預約", url: "https://ghibli-park.jp/ticket/", iconName: "Ticket", color: "text-green-700" },
  { name: "日本即時路況查詢", url: "https://www.jartic.or.jp/", iconName: "Car", color: "text-slate-600" }
];