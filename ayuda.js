const leagues = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER']
const leagueCode = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000]
const ranks = ['I', 'II', 'III', 'IV']
const rankCodes = [800, 600, 400, 200]

const summonerNames = [
  '9QVgovPjHeSbCVnuIMZ23H4r2GffWvc5q22Q9563T-NwAA',
  'dZDtUB7T83TpKFp1Aix2MSzEbcsZmm2rXw1A5RQisKq4R4x_o-W2iFF52w',
  '4eO5MuV5Sk76kLmauATdFFz3gS3BIN3L1eGgZ5yDamVnVQU',
  'idlEpPA496QdEK_aFIOpygYbuUdSERClovowBt49DZuCqaE',
  'S6df_bW-DhBlmCx_2SVGSZs68wZbN32pOI8ZLmbILBsi',
  'J5Dw9oB9QlyYzToVLgpYjlUurX6nR0fMu0lS4NAm8B9I7UI',
  '6TcnVWDBEatut_BI-O01BA0MEiWTNlyoSkGVoFk4WySA-OI',
  '66IACiWZCdD12pbanZU0xF1Egq5UdmVPB13WKdVSrljLg3A',
  'lNtkdntxISrEOEe-nMggMiAe5RkEPZhHqLUDA2zppVhgy9nPO7_NS7laEQ',

]

async function fetchM(summonerIds) {

  let namesList = []

  for(id in summonerIds){
    const response = await fetch(`https://la1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerIds[id]}?api_key=RGAPI-7644d43d-1e23-443d-aeb8-2143dcdd7013`);
    const dataFetched = await response.json()
    const data = dataFetched
    for (littleData in data){
      if(data[littleData].queueType == 'RANKED_SOLO_5x5'){
        namesList.push([

          data[littleData].summonerName,
          data[littleData].tier,
          leagueCode[leagues.indexOf(data[littleData].tier)] + 
          rankCodes[ranks.indexOf(data[littleData].rank)] + data[littleData].leaguePoints,
          data[littleData].rank,
          data[littleData].leaguePoints + ' LP',
          data[littleData].wins + ' wins',
          data[littleData].losses + ' losses',
          Math.round((data[littleData].wins/((data[littleData].losses) + data[littleData].wins)) * 100) + ' % WR'

        ])
      }
    }
  }
  return namesList
}

fetchM(summonerNames)
.then(data =>{
  data.sort((a,b)=>{
    return b[2]-a[2]
  })
  for(x in data){
    data[x].push(x*1+1)
    document.getElementById(`demo${x*1 +1}`).innerHTML = `<div>${data[x]}</div>`
    console.log(data[x])
  }
  // for(dat in data){
  //   document.getElementById('demo').innerHTML = `<>`
  // }
  // document.getElementById('demo').innerHTML =
})