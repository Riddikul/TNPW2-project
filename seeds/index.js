const mongoose = require('mongoose');
const Recipe = require('../models/recipe');
const User = require('../models/user');

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
  .connect('mongodb://127.0.0.1:27017/recipes')
  .catch((error) => console.log(error));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Database connected');
});

 
const recipes = [
  {
    title: 'Vepřový plátek v pikantní omáčce s klobáskou',
    ingredients: '300 g vepřové pečeně (2 plátky), steakové koření, sůl, trochu hladké mouky, 1 lžíce sádla (oleje), 1 lžíce rajčatové pasty z tuby,5-1 lžíce paprikové pasty "Červené zlato", 2 nakládané okurky, 70 g pikantní klobásky (maďarské), 1 lžíče láku, trochu vývaru (vody), 100 ml smetany ke šlehání, sůl',
    recipe: 'Očištěné a osušené silnější plátky vepřové pečeně nařízneme po okrajích, okořeníme a zlehka naklepeme. Obalíme v hladké mouce a zprudka opečeme na rozpálené pánvi s tukem. Přidáme obě pasty z tuby a podlijeme horkým vývarem (i zeleninovým) nebo vodou.Okurky nakrájíme na kostičky, klobásku oloupeme a nakrájíme na tenká kolečka. Okurky i s trochou láku a klobásou přidáme k masu.Přivedeme k varu a snížíme stupně tepla na 2. Přiklopené dusíme cca 15-20 minut (do změknutí masa). Dle potřeby podléváme horkým vývarem nebo vodou. Není potřeba zahušťovat, omáčka je dostatečně zahuštěná moukou z obalení masa. Nakonec přilijeme smetanu, rozmíchanou v trošce omáčky, dochutíme solí a krátce povaříme. Podáváme s kynutým knedlíkem, hrníčkovým, malými kulatými knedlíčky, rýží nebo těstovinami podle chuti.',
    time: '30'
  },
  {
    title:'Krokety z pečeného masa',
    ingredients:'220 g pečeného vepřového masa, 50 g mrkve, 50 g petržele, 200 ml vývaru (masový nebo zeleninový), 1 cibule, 1 lžíce sádla, 1 rovná lžíce hladké mouky, 1 žloutek, sůl, čerstvě mletý pepř, 1 lžička sladké papriky, 50-70 g strouhanky, polohrubá mouka, 1 vejce, strouhanka, olej na smažení',
    recipe: 'Zeleninu očistíme a krátce povaříme. Maso nakrájíme nadrobno nebo ručním sekáčkem nasekáme do misky. Přidáme nasekanou zeleninu a cibuli. Ze sádla a mouky uděláme jíšku, mírně osolíme a zalijeme vývarem. Na sníženém stupni tepla provaříme cca 5 minut. Měla by mít konzistenci řidší, než kaše. Vmícháme masovou směs, dochutíme kořením a necháme mírně vychladnout. Do směsi přidáme vejce, strouhanku a promícháme. Navlhčenou rukou vytvarujeme válečky, cca 10-12 ks, které obalíme v mouce, rozšlehaném vejci a strouhance. V hrnci rozehřejeme větší vrstvu oleje a na sníženém stupni pomalu smažíme dozlatova. Dáváme na papírovou utěrku odsát přebytečný tuk. Podáváme s různě upraveným bramborem a salátem nebo s chlebem, nakládanou zeleninou nebo hořčicí a křenem.',
    time: '30'
  },
  {
    title:'Panenka se zeleninovým kuskusem',
    ingredients:'250 g cherry rajčat, 1 lilek, 1 červená paprika, 1 vepřová panenka (cca 700 g), sůl, pepř, 1 lžíce másla, 1 lžíce olivového oleje, 200 ml kuskusu, rukola, balzamikový ocet',
    recipe:'Rajčátka rozpůlíme, lilek a papriku nakrájíme na kostky. Plech vyložíme pečicím papírem, rozprostřeme na něj zeleninu, osolíme, opepříme a zakápneme olivovým olejem. Dáme do trouby na 180 °C. Panenku očistíme, osolíme a opepříme ze všech stran. Na pánvi rozehřejeme lžíci másla a panenku zatáhneme z každé strany 4 minuty. Poté vyjmeme plech z trouby, doprostřed vložíme panenku a dáme i se zeleninou zpět do trouby. Snížíme teplotu na 170 °C a necháme péct 15 minut. Mezitím připravíme kuskus. Panenku vyjmeme na prkénko a necháme odpočinout 5 minut. Mezitím nasypeme upečenou zeleninu do hotového kuskusu a promícháme. Nakrájíme maso a podáváme. Na talíři můžeme doplnit rukolou s balzamikovým octem.',
      time: '50'
  },
  {
    title: 'Babiččina třená bábovka',
    ingredients: '3 vejce, 200 ml mléka, 125 g másla nebo Hery, 140 g moučkového cukru, 2 vanilkové cukry, 300 g polohrubé mouky, 1/2 prášku do pečiva, šťáva a kůra z jednoho citronu, kakao (podle chuti), tuk, hrubá mouka',
    recipe: 'Změklý tuk utřeme s moučkovým cukrem a vanilkovým cukrem do pěny. Vmícháme žloutky a citronovou kůru se šťávou. Postupně přidáváme vlažné mléko střídavě s polohrubou moukou, smíchanou s práškem do pečiva. Vyšleháme bílkový sníh a opatrně ho zamícháme do těsta. Těsto vlijeme do vymazané a moukou vysypané formy. Část těsta můžeme obarvit kakaem. Pečeme necelou hodinu ve vyhřáté troubě při 175 °C.',
    time: '70'
  },
];

const users = [
  {
    username: 'testUser1',
    email: 'test1@test.com',
    password: 'test1'
  },
  {
    username: 'testUser2',
    email: 'test2@test.com',
    password: 'test2'
  },
  {
    username: 'testUser3',
    email: 'test3@test.com',
    password: 'test3'
  },
];

const seedDB = async () => {
  const userIds = [];

  for (let u of users) {
    const user = new User({ username: u.username, email: u.email });
    const registeredUser = await User.register(user, u.password);
    userIds.push(registeredUser._id);
  }

  for (let i = 0; i < recipes.length; i++) {
    const recipe = new Recipe(recipes[i]);
    recipe.author = userIds[i % userIds.length]; // přiřadí recepty k uživatelům
    await recipe.save();
  }
};

seedDB()
  .then(() => {
    mongoose.connection.close();
    console.log('Writing to DB successful, DB disconnected');
  })
  .catch((err) => {
    console.log('Error while writing to DB: ', err);
  });




