/**
 * One-time script to generate clean PT-BR wordlist files from the
 * Portuguese diceware gist by patxipierce.
 *
 * Usage: node scripts/build-pt-br-wordlist.mjs
 */

const GIST_URL =
  "https://gist.githubusercontent.com/patxipierce/3a96b1927b844ce47c04a242651bafc2/raw/diceware.wordlist.pt.txt";

const LARGE_COUNT = 7776; // 6^5
const SHORT_COUNT = 1296; // 6^4

import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "wordlists", "pt-br");

function generateDiceIndices(diceCount) {
  const indices = [];
  function toIndex(n) {
    let result = "";
    for (let i = diceCount - 1; i >= 0; i--) {
      result = ((n % 6) + 1) + result;
      n = Math.floor(n / 6);
    }
    return result;
  }
  for (let i = 0; i < Math.pow(6, diceCount); i++) {
    indices.push(toIndex(i));
  }
  return indices;
}

function isValidWord(word) {
  if (/[\d\s.,;:!?'"()\[\]{}<>@#$%^&*+=|\\\/]/.test(word)) return false;
  return /^[\p{L}]+$/u.test(word);
}

function memorabilityScore(word) {
  let score = 100;
  if (word.length >= 4 && word.length <= 8) score += 30;
  else if (word.length >= 9 && word.length <= 10) score += 10;
  else if (word.length > 10) score -= 20;
  if (/^[a-z]+$/.test(word)) score += 20;
  if (/(?:ar|er|ir|or|ade|nte|ido|ada|oso|osa|ura|eiro|eira)$/.test(word)) score += 15;
  if (word.length === 3) score -= 10;
  return score;
}

/**
 * Generate a large set of common Portuguese words to supplement the source.
 * Includes verb conjugations, nouns, adjectives organized to minimize
 * overlap with the source gist.
 */
function generateSupplementWords() {
  // Common Portuguese verb stems -> generate infinitive + past participle
  const verbStems = [
    "abastecer","acariciar","acompanhar","acrescentar","administrar","adormecer",
    "aglomerar","agraciar","agradecer","alcançar","alimentar","aliviar","amarrar",
    "amassar","amolecer","amparar","ancorar","aninhar","aposentar","aprimorar",
    "armazenar","arrecadar","arremessar","arrepender","assegurar","assoviar",
    "aterrissar","atordoar","atropelar","autenticar","aventurar","avistar",
    "balançar","balbuciar","batizar","beneficiar","bloquear","bombardear",
    "borbotar","borbulhar","brilhar","calcular","camuflar","cancelar",
    "caprichar","caracterizar","carimbrar","catalogar","celebrar","centralizar",
    "certificar","chamejar","chocalhar","cicatrizar","circular","classificar",
    "climatizar","cobrir","colaborar","colonizar","combinar","comemorar",
    "compartilhar","complementar","complicar","comprometer","comunicar","conciliar",
    "condensar","confessar","confiscar","conformar","congregar","conjugar",
    "conquistar","conservar","consolidar","conspirar","constitur","consultar",
    "contaminar","contemplar","contradizer","contribuir","controlar","convencer",
    "converter","cooperar","coordenar","corresponder","corromper","cristalizar",
    "crucificar","customizar","decifrar","declarar","decorar","dedicar",
    "delinear","demonstrar","depositar","derramar","desabrochar","desaguar",
    "desanimar","desaparecer","desarmar","descansar","descascar","descomplicar",
    "descontar","descrever","descobrir","desembarcar","desempenhar","desenhar",
    "desequilibrar","desfazer","desfilar","deslizar","deslumbrar","desmontar",
    "despertar","despejar","destinar","desviar","deteriorar","diagnosticar",
    "digitalizar","diminuir","discordar","discriminar","disseminar","distribuir",
    "diversificar","documentar","domesticar","duplicar","economizar","elaborar",
    "eliminar","embarcar","embelezar","embrulhar","emocionar","empacotar",
    "emprestar","encaixar","encantar","encerrar","encorajar","endireitar",
    "enfeitar","engolir","engraçar","enriquecer","entardecer","entregar",
    "equilibrar","escalar","esclarecer","escolher","esconder","esforçar",
    "espremer","estabelecer","estacionar","estampar","estimular","estourar",
    "estrangular","estreitar","evaporar","evidenciar","examinar","executar",
    "exercitar","experimentar","explicar","explorar","exportar","expressar",
    "facilitar","falsificar","familiarizar","fantasiar","fascinar","favorecer",
    "fechar","fermentar","fertilizar","figurar","filtrar","finalizar",
    "financiar","fiscalizar","florescer","fluir","focalizar","fomentar",
    "formalizar","formular","fortalecer","fotografar","fragmentar","frequentar",
    "funcionar","fundamentar","garantir","generalizar","germinar","glorificar",
    "governar","graduar","gratificar","harmonizar","hesitar","hidratar",
    "higienizar","hipnotizar","hospedar","humanizar","identificar","ignorar",
    "iluminar","ilustrar","imaginar","implantar","importar","improvisar",
    "inaugurar","incentivar","incorporar","incrementar","indicar","industrializar",
    "influenciar","informar","inovar","insistir","inspecionar","instalar",
    "intensificar","intercalar","interpretar","interrogar","introduzir","inventar",
    "investigar","irrigar","justificar","lamentar","legalizar","legislar",
    "libertar","licenciar","liderar","limitar","localizar","lubrificar",
    "magnetizar","manifestar","manipular","marcar","materializar","maximizar",
    "meditar","memorizar","mencionar","minimizar","modificar","monitorar",
    "monopolizar","multiplicar","naturalizar","necessitar","negociar","neutralizar",
    "normalizar","notificar","numerar","obedecer","objetivar","obrigar",
    "observar","obstruir","ocupar","oferecer","oficializar","operar",
    "organizar","orientar","ornamentar","otimizar","oxidar","pacificar",
    "padronizar","participar","patrocinar","penalizar","percorrer","perfurar",
    "perpetuar","perseguir","personalizar","persuadir","pesquisar","planejar",
    "plantar","poetizar","polir","popularizar","possibilitar","potencializar",
    "praticar","precaver","preparar","preservar","pressionar","priorizar",
    "privilegiar","processar","proclamar","produzir","progredir","proibir",
    "prolongar","promover","pronunciar","propagar","proporcionar","protagonizar",
    "provocar","publicar","purificar","qualificar","quantificar","questionar",
    "rabiscar","racionalizar","rastrear","reagir","realizar","recarregar",
    "reciclar","reclamar","recomendar","reconhecer","recordar","recuperar",
    "reduzir","refletir","reformar","registrar","regulamentar","reinventar",
    "relatar","relembrar","remediar","remodelar","renovar","repaginar",
    "representar","reproduzir","requisitar","resfriar","resolver","respeitar",
    "restaurar","restringir","resultar","retornar","revezar","revigorar",
    "revolucionar","rotacionar","sacrificar","satisfazer","selecionar","sinalizar",
    "sincronizar","sistematizar","socializar","solicitar","solidificar","solucionar",
    "substituir","supervisionar","surpreender","sustentar","simbolizar",
    "tecnificar","temperar","terceirizar","testemunhar","totalizar","transformar",
    "transportar","triunfar","tropeçar","uniformizar","universalizar","utilizar",
    "valorizar","variar","verificar","viabilizar","visualizar","vitalizar",
    "vivenciar","voluntariar",
  ];

  // Common Portuguese nouns and adjectives
  const nouns = [
    "abelhinha","abridor","acampamento","acessório","acolchoado","acrobacia","adivinhador",
    "aeronave","agência","aguardente","ajudante","alambique","alaranjado","albatroz",
    "albergue","alcachofra","alcatrão","aldeão","alergia","alfândega","alfazema",
    "algemas","algorítmo","alheira","aliança","alicerce","alpinista","altiplano",
    "amanhecer","amarelado","amassado","ambulância","amoreira","amplificador","ancoragem",
    "andaime","angelical","anoitecer","antílope","aparador","aperitivo","apontamento",
    "aprendizado","aquecedor","aracnídeo","arbusto","armazém","arquiteto","arrecife",
    "artesanato","assembleia","assessoria","assoalho","asterisco","atendimento","atlântico",
    "atoleiro","atraente","audácia","autoestrada","avaliador","avariado","avistamento",
    "azulado","bacalhau","bagageiro","bailado","baleeiro","bambolim","bandoleiro",
    "banhista","barbante","barômetro","barqueiro","basalto","bastidor","batizado",
    "benzedeira","berinjela","berrador","betuminoso","bibelô","biscateiro","blindagem",
    "boiadeiro","bombeiro","borracharia","borralheiro","botânico","boutique","braçadeira",
    "bravura","brigadeiro","brilhante","brincadeira","brocado","brotinho","brunidor",
    "brutamontes","bueiro","caçarola","cachorro","cafezal","caibro","caiçara",
    "cajueiro","calabouço","calçadão","caldeirão","camareiro","cambista","camiseta",
    "camomila","campeonato","canavieiro","candeeiro","caneleiro","cantador","canteiro",
    "capelão","capitalismo","caranguejo","carbonato","carnívoro","carpinteiro","carreteiro",
    "cartolina","cascalhar","castelão","catálogo","catedral","cavalariça","cavaleiro",
    "caxemira","cebolinha","centígrado","cerâmica","cerejeira","cestinha","chafariz",
    "chaleira","chamariz","chapeleiro","charreteiro","chiqueiro","churrascaria",
    "ciclismo","cidadania","cimentar","cinturão","circulação","cirurgião","ciumeira",
    "claraboia","clarineta","cobrador","cocuruto","codinome","coelhinho","colesterol",
    "colorido","comadre","comandante","comissário","companheiro","comparação","compositor",
    "comunicador","concelheiro","condenação","condutor","confeiteiro","confissão","congelador",
    "congresso","conjuntura","construtor","consumidor","contendor","conversação","coquetal",
    "cordilheira","corredor","correnteza","cortiçol","cossaco","costeiro","cozinheiro",
    "criadeiro","cromossomo","cronômetro","culinário","curandeiro","curiosidade","currículo",
    "dançarino","debandada","decoração","defensor","degradação","delegação","delicadeza",
    "demolição","dentadura","derradeiro","desabrochar","desbravador","descobrimento",
    "desdentado","desenfreado","desfolhado","desinfetar","desleixado","desmontável",
    "despachante","destilaria","devorador","dicionário","diligente","diplomacia","dirigente",
    "disparate","distribuidora","dobradiça","dominador","dorminhoco","dourador","drenagem",
    "eletricista","elevador","embalagem","embarcação","emigrante","empadão","empalhador",
    "empreiteiro","encadernador","encanador","encontro","endereço","engenheiro","engraxate",
    "enroladinho","entalhador","entardecer","entretenimento","equilibrista","equipamento",
    "ervanário","escafandro","escapamento","escorpião","espantalho","espumante","esquadrilha",
    "estamparia","estilhaço","estilingue","estofamento","estrangeiro","eucalípto",
  ];

  // Additional words: places, professions, nature, daily life
  const extra = [
    "açougueiro","açúcareiro","adorável","aeródromo","afiador","afinador","agasalho",
    "aguaceiro","aguardente","ajudante","alagamento","alambrado","alaranjado","albatroz",
    "albernoz","alçapão","alcatifa","alcoólatra","alecrim","alfaiate","alfândega",
    "alfazema","alforreca","alicantina","aligátor","aliviado","almanaque","almeirão",
    "alpargata","alpinismo","altiplano","amanteigado","amassadura","ambulância",
    "amofinação","amordaçar","amortecedor","amplificador","anaconda","ancoradouro",
    "andorinhão","angelical","aniversário","antílope","apadrinhado","aparafusar",
    "aperitivo","aportuguesado","apoteose","aquecimento","aracnídeo","araguato",
    "arborismo","arcebispo","arduamente","armarinho","arquibancada","arranhadura",
    "arrematante","arremessador","arrendatário","arrepender","artilheiro","assessoria",
    "assoalhado","atendente","atoladeiro","atordoante","atravessador","atrevimento",
    "audacioso","autoestima","automatizar","avalancha","avantajado","aventureiro",
    "aviamento","azaléia","azulejista","bacharelado","baguete","balaústre","baldrame",
    "balneário","baloiço","bambolê","bandolim","barbatana","barbeiro","barômetro",
    "barricada","basculante","bengaleiro","betoneira","bisbilhoteiro","blindado",
    "bodegueiro","borbulhante","borracheiro","botequim","buganvília","cabeceira",
    "cachecol","cachoeiro","cadeirinha","cafezinho","calabresa","calafetagem","calçamento",
    "caldeirada","camaradagem","caminhante","caminhoneiro","camionete","canastrão",
    "candelabro","canelada","canivete","capelinha","capitalista","capivara","capoeirista",
    "cardinalício","caricatura","carinhoso","carneirinho","carroceiro","cartomante",
    "castiçal","castanheiro","cavernoso","cegonha","ceifadeira","celibatário","centenário",
    "centopeia","ceramista","cerebelino","cesariana","chafariz","chalupa","chaminé",
    "charada","charreteiro","choupana","churrasqueira","cintilante","cirandeiro",
    "claraboia","clareira","cobertinho","coifado","coliforme","colonizador","comerciante",
    "comissariado","companheirismo","compensação","compositor","comunicador","concelheiro",
    "condensação","condutor","confeitaria","confessionário","congestionamento","conjuntura",
    "conquistador","conspirador","constituinte","consultório","consumidor","contentamento",
    "contribuinte","controlador","conversação","coquetal","cordilheira","correnteza",
    "cortejador","costureiro","cozinheiro","criadouro","cromossomo","cronômetro",
    "culinária","curiosamente","dançarino","debandada","decorador","defensoria","degradação",
    "delineador","demolição","dentadura","derradeiro","desbravador","descobrimento",
    "desdentado","desenfreado","desfolhado","desinfeção","desleixado","desmontável",
    "despachante","destilador","devastador","devorador","dicionário","diligente",
    "diplomata","dirigente","disparatado","distribuidora","dominante","dorminhoco",
    "douramento","drenagem","eletricista","embaixador","embarcação","emigrante","empadinha",
    "empalhador","empreitada","encadernar","encontroaço","engenhoca","engraxadeira",
    "enroladeira","entardecer","entrelaçar","equilibrado","ervanária","escavadeira",
    "espalhafato","esquadrinhar","estampador","estonteante","estrupiado",
  ];

  // Final batch to reach 7776
  const finalBatch = [
    "fabricante","facetado","faiscante","falcoeiro","farandola","faroleiro","farroupilha",
    "fatiador","favoritismo","federação","felicitação","ferroviário","fertilizante",
    "festeiro","fiapo","figurino","filigrana","flanelinha","flutuante","fofoqueiro",
    "fogãozinho","folgazão","forjador","formatura","fosforescente","fragrância",
    "franzido","frondoso","fruticultura","gaivota","galopante","gambiarra","garimpeiro",
    "garrafinha","geminado","generosidade","geringonça","gladiador","glossário",
    "governanta","granadeiro","grinalda","grisalho","guloseima","heliporto",
    "herbívoro","hibernação","hipódromo","hospedaria","humildade","idealista",
    "igrejinha","iluminação","importador","impressora","inauguração","incentivador",
    "incontável","indicador","indomável","industrioso","infinitamente","informativo",
    "inovador","inspetor","inspiração","inteligente","interlocutor","interrogador",
    "intrigante","invariável","investigador","irradiação","jardinagem","jardineiro",
    "joalheiro","juramento","labiríntico","laborioso","lacticínio","laminador",
    "lampareiro","lançamento","laranjeira","lavadeira","lavrador","legislador",
    "lenhador","lentamente","levantamento","libelinha","libertador","limoeiro",
    "lindamente","litorâneo","locomotor","longevidade","louçaria","luminosidade",
    "maçaneta","maceração","madeireiro","madrugador","malandrice","malcheiroso",
    "malabarista","malmequer","mandamento","mangabeira","manobrista","maravilhoso",
    "marceneiro","marechal","marinheiro","marquesa","matadouro","mecanismo",
    "medicamento","meiguice","mensageiro","metalúrgico","meteorologia","milionário",
  ];

  return [...verbStems, ...nouns, ...extra, ...finalBatch];
}

async function main() {
  console.log("Fetching PT-BR wordlist from gist...");
  const response = await fetch(GIST_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();
  const lines = text.split("\n");

  console.log(`Raw lines: ${lines.length}`);

  const seen = new Set();
  const cleanWords = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Skip PGP signature lines
    if (trimmed.startsWith("-----") || trimmed.startsWith("Hash:") ||
        trimmed.startsWith("Version:") || trimmed.startsWith("Comment:") ||
        /^[A-Za-z0-9+/=]{20,}$/.test(trimmed)) {
      continue;
    }

    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) continue;

    const word = parts[1].toLowerCase();

    // Filter criteria
    if (word.length < 3) continue;
    if (/^(.)\1+$/.test(word)) continue; // Repeated chars (aaa, bbb)
    if (parts[1] === parts[1].toUpperCase() && /^[A-Z]+$/.test(parts[1])) continue;

    const normalized = word.replace(/-/g, "");
    if (!isValidWord(normalized)) continue;
    if (normalized.length < 3) continue;
    if (seen.has(normalized)) continue;

    seen.add(normalized);
    cleanWords.push(normalized);
  }

  console.log(`Clean words from source: ${cleanWords.length}`);

  // Supplement with generated words if needed
  if (cleanWords.length < LARGE_COUNT) {
    const deficit = LARGE_COUNT - cleanWords.length;
    console.log(`Deficit: ${deficit} words. Supplementing...`);

    const supplement = generateSupplementWords();
    let added = 0;
    for (const w of supplement) {
      const norm = w.toLowerCase().normalize("NFC");
      if (!seen.has(norm) && isValidWord(norm) && norm.length >= 3) {
        seen.add(norm);
        cleanWords.push(norm);
        added++;
      }
      if (cleanWords.length >= LARGE_COUNT) break;
    }
    console.log(`Added ${added} supplement words. Total: ${cleanWords.length}`);
  }

  if (cleanWords.length < LARGE_COUNT) {
    console.error(`Still only ${cleanWords.length} words. Need ${LARGE_COUNT}.`);
    process.exit(1);
  }

  // --- Large list (7,776 words) ---
  const largeWords = cleanWords.slice(0, LARGE_COUNT);
  const largeIndices = generateDiceIndices(5);

  let largeContent = "";
  for (let i = 0; i < LARGE_COUNT; i++) {
    largeContent += `${largeIndices[i]}\t${largeWords[i]}\n`;
  }

  mkdirSync(outDir, { recursive: true });
  const largePath = join(outDir, "diceware_pt_br_large.txt");
  writeFileSync(largePath, largeContent);
  console.log(`\nWrote large list: ${largePath} (${LARGE_COUNT} words)`);

  // --- Short list (1,296 memorable words) ---
  const scored = cleanWords.map((w) => ({ word: w, score: memorabilityScore(w) }));
  scored.sort((a, b) => b.score - a.score || a.word.localeCompare(b.word));

  const shortWords = scored.slice(0, SHORT_COUNT).map((s) => s.word);
  shortWords.sort();

  const shortIndices = generateDiceIndices(4);

  let shortContent = "";
  for (let i = 0; i < SHORT_COUNT; i++) {
    shortContent += `${shortIndices[i]}\t${shortWords[i]}\n`;
  }

  const shortPath = join(outDir, "diceware_pt_br_short.txt");
  writeFileSync(shortPath, shortContent);
  console.log(`Wrote short list: ${shortPath} (${SHORT_COUNT} words)`);

  // Quick stats
  const shortLengths = shortWords.map((w) => w.length);
  const avgLen = (shortLengths.reduce((a, b) => a + b, 0) / shortLengths.length).toFixed(1);
  const accentCount = shortWords.filter((w) => /[áàâãéèêíïóôõúüç]/.test(w)).length;
  console.log(`\nShort list stats:`);
  console.log(`  Average word length: ${avgLen}`);
  console.log(`  Words with accents: ${accentCount}/${SHORT_COUNT}`);
  console.log(`  Sample: ${shortWords.slice(0, 10).join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
