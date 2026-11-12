/**
 * 數位科技概論（上）隨堂測驗卷 第 3 回
 * 系統平台的組成架構－硬體 完整題庫與核心觀念資料
 */

const EXAM_META = {
  title: "數位科技概論（上）隨堂測驗卷",
  edition: "第 3 回",
  scope: "第 3 章 系統平台的組成架構－硬體",
  classInfo: "資電科 一年仁班",
  studentName: "吳同學",
  seatNumber: "12",
  originalScore: 56,
  totalScore: 100,
  deductedScore: 44,
  questionCount: 25,
  pointPerQuestion: 4,
  wrongCount: 11,
  correctCount: 14,
  bookCode: "教用版書號：C221A3-X1 / 回裝本書號：C221A3-Y1",
  publisher: "旗立發行"
};

const CATEGORIES = [
  { id: "all", name: "全部題目", count: 25, icon: "📚" },
  { id: "wrong", name: "🚨 原卷錯題專攻 (11題)", count: 11, icon: "🎯" },
  { id: "five_units", name: "電腦五大單元架構", count: 9, icon: "🖥️" },
  { id: "cpu_metrics", name: "CPU 規格與效能指標", count: 4, icon: "⚡" },
  { id: "memory_hierarchy", name: "記憶體階層與半導體 (SRAM/DRAM/ROM)", count: 5, icon: "🧠" },
  { id: "storage", name: "儲存裝置 (SSD vs HDD)", count: 2, icon: "💾" },
  { id: "peripherals", name: "介面連接埠與周邊技術", count: 5, icon: "🔌" }
];

const QUESTIONS = [
  {
    id: 1,
    page: 1,
    category: "memory_hierarchy",
    categoryName: "記憶體階層與半導體",
    question: "隨機存取記憶體（RAM）區分為動態隨機存取記憶體（DRAM）及靜態隨機存取記憶體（SRAM）兩種，請問下列哪一項是SRAM優於DRAM的特點？",
    options: [
      { key: "A", text: "單位資料的存取速度較快" },
      { key: "B", text: "單位面積所能儲存資料量較小" },
      { key: "C", text: "需要持續充電更新（refresh），才能確保資料完整" },
      { key: "D", text: "每單位資料的儲存成本較低" }
    ],
    answer: "A",
    studentAnswer: "A",
    wasWrong: false,
    teacherNote: "",
    explanation: "SRAM（靜態RAM）由雙極性電晶體或正反器組成，存取速度極快（約數奈秒），主要用於 CPU 快取記憶體（Cache）。DRAM（動態RAM）由電容與電晶體組成，需要持續「充電刷新（Refresh）」，速度較慢但積集度高、成本低，常用作主記憶體。",
    analysis: {
      A: "【正確】SRAM 電路速度遠快於 DRAM。",
      B: "SRAM 面積較大、積集度較小，此為缺點而非優於 DRAM 的特點。",
      C: "需要充電更新（Refresh）的是 DRAM，SRAM 只要有通電就不需更新。",
      D: "SRAM 製程較貴，每單位成本比 DRAM 高出許多。"
    },
    memoryTip: "SRAM = Speed（速度快、做Cache、貴、不需刷新）；DRAM = Dynamic（需刷新、容量大、便宜、做主記憶體）。"
  },
  {
    id: 2,
    page: 1,
    category: "five_units",
    categoryName: "電腦五大單元架構",
    question: "傑克將iPhone手機拍攝的照片轉存到電腦中，並列印出來與朋友分享。請問列印設備在電腦的五大單元中，是歸屬為下列哪一種單元？",
    options: [
      { key: "A", text: "控制單元" },
      { key: "B", text: "輸入單元" },
      { key: "C", text: "輸出單元" },
      { key: "D", text: "記憶單元" }
    ],
    answer: "C",
    studentAnswer: "B",
    wasWrong: true,
    teacherNote: "原卷選 B（輸入單元），扣 4 分",
    explanation: "列印設備（印表機）是將電腦內部處理完成的數位影像或文件轉印到紙張上供人類檢視，屬於「輸出單元（Output Unit, OU）」。常見輸出單元還有螢幕、喇叭、投影機等。",
    analysis: {
      A: "控制單元（CU）負責指揮協調電腦各單元運作，如指令解碼與定序。",
      B: "【學生原選錯項】輸入單元是將外部資料傳入電腦（如鍵盤、滑鼠、掃描器、麥克風、相機感光元件）。",
      C: "【正確】印表機將資料從電腦傳給外界紙張，為輸出單元。",
      D: "記憶單元（MU）負責儲存程式與資料（如 RAM、ROM）。"
    },
    memoryTip: "由人/外界進電腦 = 輸入（Input）；由電腦出來給人看/聽/印 = 輸出（Output）。"
  },
  {
    id: 3,
    page: 1,
    category: "five_units",
    categoryName: "電腦五大單元架構",
    question: "下列對於電腦硬體五大單元的敘述何者有誤？",
    options: [
      { key: "A", text: "輸入單元：待處理的資料須經由此單元進入電腦" },
      { key: "B", text: "輸出單元：處理完成之資料由此單元送出" },
      { key: "C", text: "算術邏輯單元：所有的算術運算均在此單元完成" },
      { key: "D", text: "記憶單元：僅儲存輸入待處理之資料" }
    ],
    answer: "D",
    studentAnswer: "C",
    wasWrong: true,
    teacherNote: "原卷選 C，正解為 D；手寫註解「存程式與資料的地方」",
    explanation: "記憶單元（Memory Unit）負責儲存「待處理的輸入資料」、「執行中的程式指令」以及「處理完成等待輸出的結果」，選項 D 使用了「僅儲存輸入待處理之資料」，範圍太過狹隘且漏掉了程式與輸出結果，故為錯誤敘述。",
    analysis: {
      A: "輸入單元（IU）負責資料輸入，敘述正確。",
      B: "輸出單元（OU）負責送出處理成果，敘述正確。",
      C: "【學生原選錯項】算術邏輯單元（ALU）負責加減乘除等算術運算與 AND/OR/NOT 邏輯比較，敘述正確。",
      D: "【正確選項（有誤者）】記憶單元儲存「程式」與「資料（包含輸入、中介與輸出結果）」，絕非『僅』存輸入資料。"
    },
    memoryTip: "看到選項有絕對字眼「僅、只有」，一定要特別提高警覺！范紐曼架構核心就是『內儲程式觀念』，記憶單元必須同時存程式與資料。"
  },
  {
    id: 4,
    page: 1,
    category: "five_units",
    categoryName: "電腦五大單元架構",
    question: "電腦基本架構中有數個主要的組成單元（或部門），其中負責存放電腦程式與資料的單元是：",
    options: [
      { key: "A", text: "算術與邏輯單元" },
      { key: "B", text: "輸入單元" },
      { key: "C", text: "記憶單元" },
      { key: "D", text: "控制單元" }
    ],
    answer: "C",
    studentAnswer: "C",
    wasWrong: false,
    teacherNote: "",
    explanation: "在范紐曼（von Neumann）電腦架構中，記憶單元（Memory Unit, MU）的唯一核心使命就是存放電腦目前正在執行的「程式指令」與運算所需的「資料」。",
    analysis: {
      A: "算術邏輯單元（ALU）：負責計算與邏輯判斷，不負責存放大量程式。",
      B: "輸入單元（IU）：負責接收外部輸入。",
      C: "【正確】記憶單元專門負責存放程式與資料。",
      D: "控制單元（CU）：負責解讀指令與控制訊號分配。"
    },
    memoryTip: "「存」放程式與資料 ➡️ 記「憶」單元（Memory Unit）。"
  },
  {
    id: 5,
    page: 1,
    category: "five_units",
    categoryName: "電腦五大單元架構",
    question: "在電腦的組成單元中，下列哪兩個單元合稱為中央處理單元？",
    options: [
      { key: "A", text: "輸入單元及控制單元" },
      { key: "B", text: "控制單元及算術／邏輯單元" },
      { key: "C", text: "輸入單元及輸出單元" },
      { key: "D", text: "算術／邏輯單元及記憶單元" }
    ],
    answer: "B",
    studentAnswer: "B",
    wasWrong: false,
    teacherNote: "",
    explanation: "中央處理單元（Central Processing Unit, CPU）由「控制單元（CU）」與「算術邏輯單元（ALU）」合稱（內部通常還包含微小的暫存器 Registers）。",
    analysis: {
      A: "輸入單元不屬於 CPU 核心。",
      B: "【正確】CPU = 控制單元 (CU) + 算術邏輯單元 (ALU)。",
      C: "輸入與輸出單元合稱為 I/O 單元。",
      D: "記憶單元是獨立的單元（主記憶體不在 CPU 定義之內，快取則是內部輔助）。"
    },
    memoryTip: "CPU 大腦兩大支柱：發號施令（CU）+ 運算思考（ALU）。"
  },
  {
    id: 6,
    page: 1,
    category: "five_units",
    categoryName: "電腦五大單元架構",
    question: "請問所謂的I/O指的是",
    options: [
      { key: "A", text: "1跟0" },
      { key: "B", text: "物聯網（IoT）" },
      { key: "C", text: "輸入與輸出" },
      { key: "D", text: "整合式辦公室系統（integrated office system）" }
    ],
    answer: "C",
    studentAnswer: "C",
    wasWrong: false,
    teacherNote: "",
    explanation: "I/O 代表 Input / Output，即「輸入（Input）」與「輸出（Output）」。在電腦系統中常指各類與周邊通訊的輸入與輸出介面及設備。",
    analysis: {
      A: "1跟0為二進位符號（Binary digits）。",
      B: "物聯網縮寫為 IoT (Internet of Things)。",
      C: "【正確】I = Input，O = Output。",
      D: "辦公室系統與 I/O 無直接對應。"
    },
    memoryTip: "I = Input（進）, O = Output（出）。"
  },
  {
    id: 7,
    page: 1,
    category: "peripherals",
    categoryName: "介面連接埠與周邊技術",
    question: "關於「熱插拔」的敘述，何者為真？",
    options: [
      { key: "A", text: "只能在開機的情況下插拔" },
      { key: "B", text: "只能在關機的情況下插拔" },
      { key: "C", text: "在關機及開機的情況下皆可插拔" },
      { key: "D", text: "只有當主機溫度高於一定溫度時才可插拔" }
    ],
    answer: "C",
    studentAnswer: "A",
    wasWrong: true,
    teacherNote: "原卷選 A，正解為 C；手寫註解「都可以在」",
    explanation: "「熱插拔（Hot Swapping / Hot Plugging）」是指可以在電腦「開機運作中」直接插拔硬體裝置而不會燒毀電路或導致當機（例如 USB 隨身碟）。既然開機運作中都能插拔，關機斷電時當然更可以插拔！因此「在開機及關機的情況下皆可插拔」才是正確敘述。",
    analysis: {
      A: "【學生原選錯項】誤以為『熱』只能在開機時。關機當然也可以正常插拔周邊！",
      B: "關機才能插拔的是非熱插拔設備（例如傳統 PS/2 滑鼠鍵盤、CPU）。",
      C: "【正確】熱插拔設備在主機關機或開機運作狀態下均可安全插拔。",
      D: "「熱」是指系統在運作通電狀態（Live/Hot），與物理溫度高低無關。"
    },
    memoryTip: "「熱插拔」的熱是指『通電運作中』。通電都能拔了，關機斷電當然也能拔，所以是『開機與關機皆可』！"
  },
  {
    id: 8,
    page: 1,
    category: "memory_hierarchy",
    categoryName: "記憶體階層與半導體",
    question: "阿布想要為自己的筆記型電腦擴充2G的RAM，請問他應該將RAM插在下列哪一種插槽？",
    options: [
      { key: "A", text: "記憶體插槽" },
      { key: "B", text: "PCI-E插槽" },
      { key: "C", text: "CPU插槽" },
      { key: "D", text: "M.2插槽" }
    ],
    answer: "A",
    studentAnswer: "A",
    wasWrong: false,
    teacherNote: "",
    explanation: "RAM（隨機存取記憶體）必須安裝在主機板上的「記憶體插槽（DIMM / SO-DIMM）」上才能與記憶體匯流排連接。",
    analysis: {
      A: "【正確】RAM 專用插槽即為記憶體插槽（筆電為 SO-DIMM）。",
      B: "PCI-E 插槽用於擴充獨立顯示卡、高速網卡等擴充卡。",
      C: "CPU 插槽（Socket）專門用來安裝處理器晶片。",
      D: "M.2 插槽主要用來安裝 M.2 NVMe/SATA 固態硬碟（SSD）或無線網卡。"
    },
    memoryTip: "RAM ➡️ 記憶體插槽；SSD ➡️ M.2 插槽；顯示卡 ➡️ PCIe 插槽。"
  },
  {
    id: 9,
    page: 1,
    category: "five_units",
    categoryName: "電腦五大單元架構",
    question: "微軟公司在台灣成立了亞洲第一座「雲端運算」中心，以整合電腦的運算資源，來提供給國內各項創新研究計畫使用。一般而言，研究計畫都需要大量的運算，包括計算、比對、配對等不同的處理，請問電腦中負責這些運算工作的是下列哪一個單元？",
    options: [
      { key: "A", text: "CU" },
      { key: "B", text: "MU" },
      { key: "C", text: "ALU" },
      { key: "D", text: "OU" }
    ],
    answer: "C",
    studentAnswer: "C",
    wasWrong: false,
    teacherNote: "",
    explanation: "「計算」為算術運算（Arithmetic），「比對、配對、條件判斷」為邏輯運算（Logic），負責執行這兩大核心運算工作的正是 CPU 內部的「算術邏輯單元（Arithmetic and Logic Unit, ALU）」。",
    analysis: {
      A: "CU（Control Unit）：控制單元，負責指揮與定序。",
      B: "MU（Memory Unit）：記憶單元，負責存放資料。",
      C: "【正確】ALU（Arithmetic & Logic Unit）：負責算術與邏輯運算。",
      D: "OU（Output Unit）：輸出單元，負責呈現結果。"
    },
    memoryTip: "A = Arithmetic（算術）, L = Logic（邏輯） ➡️ 算術與邏輯比對全歸 ALU！"
  },
  {
    id: 10,
    page: 1,
    category: "cpu_metrics",
    categoryName: "CPU 規格與效能指標",
    question: "MIPS為一種衡量電腦CPU之測量指標，其中I代表：",
    options: [
      { key: "A", text: "資訊（Information）" },
      { key: "B", text: "指令（Instruction）" },
      { key: "C", text: "輸入（Input）" },
      { key: "D", text: "內部（Internal）" }
    ],
    answer: "B",
    studentAnswer: "A",
    wasWrong: true,
    teacherNote: "原卷選 A，正解為 B，扣 4 分",
    explanation: "MIPS 全名為 **Million Instructions Per Second**，意思為「每秒可執行的百萬指令數」，用來評估 CPU 處理指令的速度能力。其中的字母 **I** 代表 **Instruction（指令）**。",
    analysis: {
      A: "【學生原選錯項】誤以為是資訊（Information）。電腦執行的是指令，不是資訊量。",
      B: "【正確】I = Instruction（指令）。MIPS = 百萬指令 / 每秒。",
      C: "Input 為輸入單元的 I，並非 MIPS 的 I。",
      D: "Internal 意為內部，與此評測單位無關。"
    },
    memoryTip: "CPU 執行的是「指令（Instruction）」！M = Million（百萬）, I = Instruction（指令）, P = Per（每）, S = Second（秒）。"
  },
  {
    id: 11,
    page: 1,
    category: "five_units",
    categoryName: "電腦五大單元架構",
    question: "在「星際迷航記」影集中，船長寇克領導眾船員一同探索宇宙，當遇上危機時，船長便會指派船員完成各自的工作，並引導船員們脫離險境。請問若以船長扮演的角色來看，可比喻成電腦的哪一個單元最恰當？",
    options: [
      { key: "A", text: "輸入單元" },
      { key: "B", text: "記憶單元" },
      { key: "C", text: "輸出單元" },
      { key: "D", text: "控制單元" }
    ],
    answer: "D",
    studentAnswer: "D",
    wasWrong: false,
    teacherNote: "",
    explanation: "船長扮演領導、協調調度、下達命令與指派任務的角色，正如同電腦中的「控制單元（Control Unit, CU）」負責指揮、解碼指令與調度各單元通力合作。",
    analysis: {
      A: "輸入單元如同感應器或雷達。",
      B: "記憶單元如同日誌與資料庫庫房。",
      C: "輸出單元如同雷射砲發射或通訊廣播器。",
      D: "【正確】指揮官、總司令、大腦決策調度者 = 控制單元 (CU)。"
    },
    memoryTip: "發號施令的總指揮官 = Control Unit (控制單元)！"
  },
  {
    id: 12,
    page: 1,
    category: "cpu_metrics",
    categoryName: "CPU 規格與效能指標",
    question: "志華購買了一台安插8GB記憶體的64位元電腦，下列有關該台電腦的敘述何者正確？",
    options: [
      { key: "A", text: "8GB指的是快取記憶體的容量" },
      { key: "B", text: "一般用途暫存器的位元數為8GB" },
      { key: "C", text: "CPU時脈頻率為64位元" },
      { key: "D", text: "64位元指的是一般用途暫存器的位元數" }
    ],
    answer: "D",
    studentAnswer: "B",
    wasWrong: true,
    teacherNote: "原卷選 B，正解為 D，扣 4 分",
    explanation: "我們常說的「32位元電腦」或「64位元電腦」，其位元數（Word Size）指的是 CPU 內部「**一般用途暫存器（General-Purpose Registers）**」與內部資料匯流排的寬度（位元長度），代表 CPU 一次能同時處理的資料量為 64 bits。而「8GB」指的是主記憶體（RAM）的儲存容量。",
    analysis: {
      A: "快取記憶體容量通常只有幾MB（如 8MB~32MB），8GB 是主記憶體 (RAM)。",
      B: "【學生原選錯項】8GB 是記憶體容量單位，暫存器的規格單位是位元（bit），不可能有「8GB位元數」的說法。",
      C: "CPU 時脈頻率的單位是赫茲（如 GHz），不是位元。",
      D: "【正確】幾位元處理器（32-bit / 64-bit）即代表內部一般用途暫存器的位元寬度。"
    },
    memoryTip: "XX 位元電腦 ➡️ 一般用途暫存器（Register）與內部資料匯流排寬度就是 XX 位元！"
  },
  {
    id: 13,
    page: 1,
    category: "cpu_metrics",
    categoryName: "CPU 規格與效能指標",
    question: "高雄六龜區為了成立社區數位機會中心（digital opportunity center），打算將原社區教室的電腦全數移轉至該中心。如果你是數位機會中心的電腦管理員，為了要提升這些電腦的執行效能，下列何者最不可能是你優先考慮更換的設備或元件？",
    options: [
      { key: "A", text: "CPU" },
      { key: "B", text: "主記憶體" },
      { key: "C", text: "顯示卡" },
      { key: "D", text: "鍵盤" }
    ],
    answer: "D",
    studentAnswer: "A",
    wasWrong: true,
    teacherNote: "原卷選 A，正解為 D，扣 4 分",
    explanation: "題目問的是「最不可能是優先考慮提升執行效能的設備」。更換 CPU（提高運算速度）、加大主記憶體（減少磁碟分頁與虛擬記憶體交換）、更換顯示卡（提高圖形處理與渲染運算能力）都能實質提升系統執行效能；而「鍵盤」純粹只是輸入周邊設備，更換鍵盤完全不會提升電腦系統的運算與執行效能！",
    analysis: {
      A: "【學生原選錯項】更換高階 CPU 是提升整體運算效能最直接核心的元件之一。",
      B: "擴充主記憶體能有效減少系統延遲與 Lag，是升級常見方案。",
      C: "更換更強的獨立顯示卡能大幅提升繪圖、遊戲與影片剪輯效能。",
      D: "【正確選項（最不可能）】鍵盤只是打字輸入工具，換再貴的機械鍵盤電腦跑程式都不會變快！"
    },
    memoryTip: "注意題目是問「最不可能（NOT）」！看清反向題目是防粗心關鍵。"
  },
  {
    id: 14,
    page: 2,
    category: "five_units",
    categoryName: "電腦五大單元架構",
    question: "電腦的基本架構可分為五大單元，其中輸出單元（output unit）的功用為？",
    options: [
      { key: "A", text: "接收使用者所輸入的資料" },
      { key: "B", text: "執行程式和處理資料" },
      { key: "C", text: "進行算術運算與邏輯運算" },
      { key: "D", text: "將資料輸出到顯示器或儲存媒體" }
    ],
    answer: "D",
    studentAnswer: "D",
    wasWrong: false,
    teacherNote: "",
    explanation: "輸出單元（Output Unit）的功能是將電腦內部以二進位表示的運算處理成果，轉換為人類能感知的形式（如顯示器畫面、印表機紙張）或傳遞給儲存媒體。",
    analysis: {
      A: "接收使用者輸入為「輸入單元（IU）」之職責。",
      B: "執行程式為「控制單元（CU）」與處理器整體的職責。",
      C: "進行算術與邏輯運算為「算術邏輯單元（ALU）」之職責。",
      D: "【正確】輸出單元負責將處理結果顯示或輸出至外部設備。"
    },
    memoryTip: "向外輸出給人看/聽 ➡️ 輸出單元 (Output Unit)。"
  },
  {
    id: 15,
    page: 2,
    category: "cpu_metrics",
    categoryName: "CPU 規格與效能指標",
    question: "聯想推出搭載Intel Core i7-1165G7 2.80GHz CPU的「變形筆電」，這種筆電的螢幕可以360度翻轉，變身為平板電腦。請根據以上敘述判斷下列何者正確？",
    options: [
      { key: "A", text: "Intel為CPU的產品型號" },
      { key: "B", text: "Core i7-1165G7為CPU的製造廠商" },
      { key: "C", text: "CPU的時脈頻率為2.80GHz" },
      { key: "D", text: "石英振盪器每秒振盪2.80億次" }
    ],
    answer: "C",
    studentAnswer: "C",
    wasWrong: false,
    teacherNote: "",
    explanation: "在「Intel Core i7-1165G7 2.80GHz」中：Intel 是廠商名；Core i7-1165G7 是系列與型號；2.80GHz 為其基礎時脈頻率（Clock Speed）。注意 1 GHz = 10^9 Hz = 10 億次/秒，所以 2.80GHz 代表每秒震盪 28 億次（非 2.8 億次），故 D 錯誤，C 正確。",
    analysis: {
      A: "Intel 是 CPU 製造廠商（品牌），型號為 Core i7-1165G7。",
      B: "Core i7-1165G7 是 CPU 型號，非製造廠商。",
      C: "【正確】2.80GHz 明確標示為 CPU 時脈頻率。",
      D: "1G = 10 億，2.80GHz = 28 億次/秒，而非 2.80 億次。"
    },
    memoryTip: "K=千(10³), M=百萬(10⁶), G=十億(10⁹)。2.80GHz = 28億次！"
  },
  {
    id: 16,
    page: 2,
    category: "storage",
    categoryName: "儲存裝置 (SSD vs HDD)",
    question: "有關固態硬碟（solid state disk, SSD）與傳統機械硬碟（hard disk, HDD）的敘述，下列何者正確？",
    options: [
      { key: "A", text: "HDD中的儲存元件是採用快閃記憶體" },
      { key: "B", text: "SSD採用低噪音馬達驅動讀寫頭並且具抗震特點" },
      { key: "C", text: "HDD沒有旋轉及搜尋資料時間，僅須考量資料傳輸時間" },
      { key: "D", text: "SSD在經過長時間及多次使用致使內部儲存資料零散，仍不須進行磁碟重組" }
    ],
    answer: "D",
    studentAnswer: "D",
    wasWrong: false,
    teacherNote: "",
    explanation: "SSD 是使用快閃記憶體晶片電子讀寫，隨機存取速度極快，即使資料零散也不影響尋道時間；更重要的是，對 SSD 執行磁碟重組會產生大量不必要的寫入擦除操作，反而劇烈損耗快閃記憶體晶片的壽命，因此 **SSD 絕對不需要也不應該進行磁碟重組**！",
    analysis: {
      A: "快閃記憶體是 SSD 的元件，HDD 採用的是磁盤與磁性塗層。",
      B: "SSD 內部完全無馬達、無旋轉機械結構（純電子電路晶片），具抗震靜音特性的是 SSD。",
      C: "HDD 尋找資料需要機械手臂「尋道時間」與磁盤「旋轉延遲時間」，速度慢。",
      D: "【正確】SSD 不受碎片尋道延遲影響，且重組會消耗寫入壽命，故不須重組。"
    },
    memoryTip: "SSD 沒有機械頭，隨機讀取秒速到；磁碟重組萬萬不可，抹寫次數會消耗！"
  },
  {
    id: 17,
    page: 2,
    category: "memory_hierarchy",
    categoryName: "記憶體階層與半導體",
    question: "為了減少對主記憶體的存取次數，以提升電腦整體執行速度，個人電腦的快取記憶體（cache memory）通常以下列何者為材質？",
    options: [
      { key: "A", text: "DRAM" },
      { key: "B", text: "EPROM" },
      { key: "C", text: "ROM" },
      { key: "D", text: "SRAM" }
    ],
    answer: "D",
    studentAnswer: "C",
    wasWrong: true,
    teacherNote: "原卷選 C，正解為 D，扣 4 分",
    explanation: "快取記憶體（Cache Memory）夾在超高速的 CPU 與較慢的主記憶體之間，扮演高速緩衝區。為了配合 CPU 速度，快取記憶體必須採用存取速度最快、反應時間最短的 **SRAM（靜態隨機存取記憶體）** 來製造。",
    analysis: {
      A: "DRAM（動態RAM）存取速度較慢且需刷新，是用來製作一般主記憶體。",
      B: "EPROM 是可透過紫外線抹除的唯讀記憶體，速度慢且非隨機讀寫材質。",
      C: "【學生原選錯項】ROM 為唯讀記憶體，速度慢且資料不可隨意快速寫入，無法作為快取。",
      D: "【正確】快取記憶體（Cache）一律採用超高速的 SRAM（靜態隨機存取記憶體）。"
    },
    memoryTip: "Cache 就是 SRAM！主記憶體就是 DRAM！這組搭檔必考 100 遍！"
  },
  {
    id: 18,
    page: 2,
    category: "five_units",
    categoryName: "電腦五大單元架構",
    question: "加、減、乘、除是程式中常需進行的算術運算，請問在電腦中負責這些運算處理的是哪一個單元？",
    options: [
      { key: "A", text: "算術邏輯單元" },
      { key: "B", text: "控制單元" },
      { key: "C", text: "輸出單元" },
      { key: "D", text: "輸入單元" }
    ],
    answer: "A",
    studentAnswer: "A",
    wasWrong: false,
    teacherNote: "",
    explanation: "算術運算（加減乘除）與邏輯運算（AND、OR、NOT、比較大小）全由 CPU 中的「算術邏輯單元（Arithmetic and Logic Unit, ALU）」負責處理運算。",
    analysis: {
      A: "【正確】加減乘除為典型算術運算，歸 ALU 管轄。",
      B: "控制單元（CU）負責指揮、排程與解碼，不親自做加減乘除運算。",
      C: "輸出單元負責將結果呈現給人看。",
      D: "輸入單元負責收錄資料。"
    },
    memoryTip: "加減乘除、比大比小 ➡️ 算術邏輯單元 (ALU)！"
  },
  {
    id: 19,
    page: 2,
    category: "memory_hierarchy",
    categoryName: "記憶體階層與半導體",
    question: "民眾只要持悠遊卡在台鐵剪票口刷卡，就可以進入月台搭車，且可隨時在全家超商等處利用儲值設備進行悠遊卡的加值。請問悠遊卡最可能是利用下列哪一種元件來儲存資料？",
    options: [
      { key: "A", text: "DRAM" },
      { key: "B", text: "EEPROM" },
      { key: "C", text: "PROM" },
      { key: "D", text: "HDD" }
    ],
    answer: "B",
    studentAnswer: "D",
    wasWrong: true,
    teacherNote: "原卷選 D（HDD），正解為 B（EEPROM），扣 4 分",
    explanation: "悠遊卡是薄薄的一張卡片（RFID 非接觸式 IC 晶片卡），斷電時餘額資料絕對不能消失（必須是非揮發性），而且加值與扣款時必須能夠「透過晶片電壓信號多次重複擦寫資料」。因此採用的是 **EEPROM（電子可抹除式唯讀記憶體，Electrically Erasable Programmable ROM）**！",
    analysis: {
      A: "DRAM 是揮發性記憶體，且需要持續供電與刷新，悠遊卡拿離讀卡機沒電時資料就會全部消失。",
      B: "【正確】EEPROM 斷電資料不消失，且可用電力隨時抹除並重新寫入餘額。",
      C: "PROM 為可程式化唯讀記憶體，只能寫入一次（燒錄後無法再改寫），無法加值更新。",
      D: "【學生原選錯項】HDD 是厚重有磁盤馬達的機械硬碟，絕對塞不進只有幾毫米的薄悠遊卡中！"
    },
    memoryTip: "悠遊卡/IC晶片卡：要斷電不丟資料 + 可以電氣加值改寫 ➡️ EEPROM（或Flash）！"
  },
  {
    id: 20,
    page: 2,
    category: "memory_hierarchy",
    categoryName: "記憶體階層與半導體",
    question: "大雄在光華數位新天地買了一部桌上型電腦，該機配備了如選項中的四種記憶或儲存裝置，請問它們中何者之存取速度最快？",
    options: [
      { key: "A", text: "快取記憶體（cache）" },
      { key: "B", text: "輔助記憶體－固態硬碟（SSD）" },
      { key: "C", text: "主記憶體（DRAM）" },
      { key: "D", text: "輔助記憶體－硬碟（HDD）" }
    ],
    answer: "A",
    studentAnswer: "B",
    wasWrong: true,
    teacherNote: "原卷選 B（SSD），正解為 A（cache），扣 4 分",
    explanation: "電腦記憶體階層速度由快到慢排序為：【暫存器 (Register)】>【快取記憶體 (Cache / SRAM)】>【主記憶體 (RAM / DRAM)】>【輔助記憶體 SSD (固態硬碟)】>【輔助記憶體 HDD (機械硬碟)】。因此本題四者中存取速度最快的是「快取記憶體（cache）」。",
    analysis: {
      A: "【正確】快取記憶體速度為奈秒級（ns），在四個選項中速度最快。",
      B: "【學生原選錯項】SSD 雖然比傳統硬碟快很多，但它依然屬於外接輔助儲存裝置，速度遠遠慢於主記憶體與 CPU 內的快取。",
      C: "主記憶體（DRAM）速度僅次於快取，快於 SSD 與 HDD。",
      D: "機械硬碟（HDD）是這四者中速度最慢的。"
    },
    memoryTip: "速度金字塔天梯：暫存器 > 快取 (Cache) > 主記憶體 (RAM) > SSD > HDD。"
  },
  {
    id: 21,
    page: 2,
    category: "storage",
    categoryName: "儲存裝置 (SSD vs HDD)",
    question: "MacBook Air採用固態硬碟大幅降低機身的厚度，機身最薄處僅0.3公分，請問該筆電採用的固態硬碟與傳統硬碟，差異為何？",
    options: [
      { key: "A", text: "固態硬碟的體積較大" },
      { key: "B", text: "傳統硬碟的耐震度較佳" },
      { key: "C", text: "固態硬碟是使用快閃記憶體來作為儲存元件" },
      { key: "D", text: "傳統硬碟的儲存容量通常較小" }
    ],
    answer: "C",
    studentAnswer: "C",
    wasWrong: false,
    teacherNote: "",
    explanation: "固態硬碟（SSD）之所以能夠做得極薄極小、安靜省電且高度耐震，關鍵在於它是利用「快閃記憶體（Flash Memory）」半導體晶片作為儲存媒介，內部沒有傳統硬碟龐大的旋轉碟片與機械手臂馬達。",
    analysis: {
      A: "固態硬碟體積更小更薄。",
      B: "傳統硬碟有馬達和針頭，撞擊極易壞軌，耐震度遠不如 SSD。",
      C: "【正確】SSD 採用快閃記憶體（Flash Memory）作為儲存晶片。",
      D: "傳統硬碟單位成本低，通常容量容易做很大（如 8TB~20TB）。"
    },
    memoryTip: "SSD 核心特質：快閃記憶體晶片、耐震、輕薄、安靜、零機械構造。"
  },
  {
    id: 22,
    page: 2,
    category: "peripherals",
    categoryName: "介面連接埠與周邊技術",
    question: "三星公司推出的某款Android智慧型手機，宣稱採用AMOLED技術，可使螢幕色彩更加鮮豔，請問此款手機的螢幕最可能是採用下列哪一種材質所製成的？",
    options: [
      { key: "A", text: "陰極射線管" },
      { key: "B", text: "液晶" },
      { key: "C", text: "有機發光二極體" },
      { key: "D", text: "電漿" }
    ],
    answer: "C",
    studentAnswer: "B",
    wasWrong: true,
    teacherNote: "原卷選 B（液晶），正解為 C（有機發光二極體），扣 4 分",
    explanation: "AMOLED 全名為 **Active-Matrix Organic Light-Emitting Diode**，中文為「主動矩陣式**有機發光二極體**」。其特點是每個像素由有機材料自發光，不需要背光模組，能展現純黑、超高對比度與鮮豔色彩，被廣泛應用於現代智慧型手機螢幕。",
    analysis: {
      A: "陰極射線管（CRT）是以前厚重的大頭映像管螢幕。",
      B: "【學生原選錯項】液晶螢幕為 LCD（Liquid Crystal Display），需要背光面板，與 OLED 材質原理不同。",
      C: "【正確】OLED / AMOLED 即為有機發光二極體（Organic LED）。",
      D: "電漿（PDP）是早期大型電視使用的技術，耗電且無法縮小放進手機。"
    },
    memoryTip: "OLED 的 O 就是 Organic（有機）！LED = 發光二極體 ➡️ 有機發光二極體！"
  },
  {
    id: 23,
    page: 2,
    category: "peripherals",
    categoryName: "介面連接埠與周邊技術",
    question: "玟芳想要自己挑選一台印表機，如果她對列印品質的要求特別高，請問當她在購買時，應特別考量下列哪一項印表機的規格？",
    options: [
      { key: "A", text: "解析度" },
      { key: "B", text: "外殼顏色" },
      { key: "C", text: "尺寸大小" },
      { key: "D", text: "重量" }
    ],
    answer: "A",
    studentAnswer: "A",
    wasWrong: false,
    teacherNote: "",
    explanation: "印表機的列印品質取決於「解析度（Resolution）」，通常以 **DPI（Dots Per Inch，每英吋點數）** 來表示。DPI 數值越高，代表單位面積內的列印點數越多，列印出的影像與文字就越細緻逼真。",
    analysis: {
      A: "【正確】解析度（DPI）是衡量列印精細度與品質的關鍵指標。",
      B: "外殼顏色純屬個人外觀喜好，與品質無關。",
      C: "尺寸大小影響空間擺放，不影響輸出畫質。",
      D: "重量影響搬運便利度，不影響列印品質。"
    },
    memoryTip: "畫質、精緻度、清晰度 ➡️ 看「解析度 (Resolution / DPI)」！"
  },
  {
    id: 24,
    page: 2,
    category: "peripherals",
    categoryName: "介面連接埠與周邊技術",
    question: "裕書的筆記型電腦內建有Type C、HDMI、line out等連接埠，下列為他使用些連接埠的操作，請問何者不正確？",
    options: [
      { key: "A", text: "利用line out連接埠來上網" },
      { key: "B", text: "利用Type C連接埠來為手機充電" },
      { key: "C", text: "利用Type C連接埠將手機中的資料傳送至電腦" },
      { key: "D", text: "利用HDMI連接埠將手機畫面傳送至電視播放" }
    ],
    answer: "A",
    studentAnswer: "B",
    wasWrong: true,
    teacherNote: "原卷選 B，正解為 A，扣 4 分",
    explanation: "**Line out（音訊輸出埠）** 是用來連接外接喇叭、耳機或擴大機等音訊設備的孔，傳遞的是類比音訊信號，**絕對不可能用來連接網路上網**！上網需要 RJ-45 網路埠或 Wi-Fi 無線網路。因此選項 A 明顯錯誤。",
    analysis: {
      A: "【正確選項（不正確者）】Line out 是綠色音源輸出孔，只能輸出聲音，不能上網！",
      B: "【學生原選錯項】現代 Type-C 支援 USB PD 供電協議，完全可以用來為手機充電。",
      C: "Type-C 具備高速資料傳輸能力，能傳送手機檔案到電腦。",
      D: "HDMI 為高畫質多媒體介面，專門用於傳輸影音畫面至電視或螢幕播放。"
    },
    memoryTip: "Line out = 音效輸出（聽音樂）！上網要找 RJ-45 (網路孔) 或 Wi-Fi，千萬別拿耳機孔來上網！"
  },
  {
    id: 25,
    page: 2,
    category: "peripherals",
    categoryName: "介面連接埠與周邊技術",
    question: "史記：「秦始皇三十四年，丞相李斯上言儒生是古非今，反對批評朝政、法令，因此建議除了秦記、醫藥、卜筮、種樹等書外，一律燒毀」。請問，如果在秦朝即擁有現代的資訊科技，則可利用下列哪一種設備，將書籍內容數位化，以便備份起來？",
    options: [
      { key: "A", text: "印表機" },
      { key: "B", text: "QLED液晶螢幕" },
      { key: "C", text: "滑鼠" },
      { key: "D", text: "掃描器" }
    ],
    answer: "D",
    studentAnswer: "D",
    wasWrong: false,
    teacherNote: "",
    explanation: "將實體紙張、書本或竹簡上的文字圖形光學感應轉換成電腦可讀取的數位圖像/檔案，此種「紙本數位化」的設備就是「**掃描器（Scanner）**」。",
    analysis: {
      A: "印表機是將電腦數位資料印到紙上（輸出），不是將紙張轉為數位檔案。",
      B: "液晶螢幕是顯示影像的輸出設備。",
      C: "滑鼠是用於控制游標位置的輸入裝置。",
      D: "【正確】掃描器（Scanner）能掃描實體紙本書籍並數位化儲存。"
    },
    memoryTip: "實體紙張 ➡️ 數位圖檔 = 掃描器 (Scanner)！"
  }
];

const FLASHCARDS = [
  {
    id: "fc-1",
    tag: "五大單元",
    question: "電腦五大架構是哪五個單元？CPU包含哪兩部分？",
    answer: "1. 控制單元 (CU)\n2. 算術邏輯單元 (ALU)\n3. 記憶單元 (MU)\n4. 輸入單元 (IU)\n5. 輸出單元 (OU)\n\n★ CPU = 控制單元 (CU) + 算術邏輯單元 (ALU) + 暫存器 (Register)。"
  },
  {
    id: "fc-2",
    tag: "記憶體",
    question: "SRAM 與 DRAM 最大的差別是什麼？各自用在哪裡？",
    answer: "【SRAM (靜態)】：速度極快、不需充電刷新、成本高、面積大 ➡️ 作為 CPU 快取 (Cache)。\n\n【DRAM (動態)】：電容存電荷、需要定期充電刷新 (Refresh)、容量大便宜 ➡️ 作為 主記憶體 (RAM)。"
  },
  {
    id: "fc-3",
    tag: "儲存裝置",
    question: "SSD 為何『絕對不需且不可』進行磁碟重組？",
    answer: "1. SSD 採用快閃記憶體電子電路，零機械手臂尋道延遲，碎片不影響讀取效能。\n2. 重組會產生巨量無謂的區塊擦寫，劇烈消耗快閃記憶體的抹寫壽命！"
  },
  {
    id: "fc-4",
    tag: "效能指標",
    question: "MIPS 與 64位元電腦 代表什麼涵義？",
    answer: "★ MIPS = Million Instructions Per Second（每秒百萬指令數，I 是 Instruction 指令！）。\n\n★ 64位元電腦 = CPU 內部『一般用途暫存器』與內部資料匯流排寬度為 64 bits。"
  },
  {
    id: "fc-5",
    tag: "記憶體階層",
    question: "請列出存取速度由快到慢的金字塔順序：",
    answer: "暫存器 (Register) \n> 快取記憶體 (Cache / SRAM) \n> 主記憶體 (RAM / DRAM) \n> 固態硬碟 (SSD) \n> 機械硬碟 (HDD) \n> 光碟 / 磁帶"
  },
  {
    id: "fc-6",
    tag: "周邊介面",
    question: "何謂「熱插拔」？開機關機能拔嗎？",
    answer: "在電腦『通電運作中』可安全插入或拔除硬體裝置（如 USB、Type-C）。\n\n記住：既然開機運作中都能插拔，關機狀態下當然更可以插拔！"
  },
  {
    id: "fc-7",
    tag: "晶片技術",
    question: "悠遊卡加值儲值利用哪種記憶體？",
    answer: "【EEPROM（電子可抹除式唯讀記憶體）】\n特點：斷電後資料不消失，且可用特定電氣訊號快速擦除與重寫金額。"
  },
  {
    id: "fc-8",
    tag: "顯示面板",
    question: "AMOLED 縮寫與材質特性是什麼？",
    answer: "Active-Matrix Organic Light-Emitting Diode（主動矩陣式有機發光二極體）。\n特性：有機材料自發光、免背光模組、高對比、黑色深邃純淨、反應快速。"
  },
  {
    id: "fc-9",
    tag: "CPU時脈",
    question: "2.80GHz CPU 每秒震盪幾次？",
    answer: "28 億次！\n1 GHz = 10^9 Hz = 10 億次/秒。\n2.80 GHz = 2.80 × 10 億 = 28 億次（不是 2.8 億次，注意進位！）。"
  },
  {
    id: "fc-10",
    tag: "周邊埠",
    question: "Line out 是做什麼用的？能上網嗎？",
    answer: "Line out 是綠色的『音訊輸出孔』，用來接耳機、喇叭輸出聲音。\n絕對不能用來上網！上網請用 RJ-45 網路線或 Wi-Fi。"
  }
];

const KNOWLEDGE_NOTES = [
  {
    title: "一、電腦硬體五大單元架構（范紐曼架構）",
    summary: "由數學家范紐曼提出「內儲程式」概念，五大單元各司其職。",
    items: [
      {
        term: "控制單元 (Control Unit, CU)",
        desc: "大腦司令官，負責抓取指令 (Fetch)、解譯指令 (Decode)、發出控制訊號控制其他單元排程協調（如船長寇克指揮整艘船）。"
      },
      {
        term: "算術邏輯單元 (ALU)",
        desc: "大腦計算機，負責數值算術運算（加減乘除）以及條件比較邏輯運算（AND, OR, NOT, 大於小於）。"
      },
      {
        term: "記憶單元 (Memory Unit, MU)",
        desc: "儲存程式指令與運算資料（包括待處理輸入資料、中介運算數值、處理完成之輸出資料）。★注意：絕非『僅』存輸入資料！"
      },
      {
        term: "輸入單元 (Input Unit, IU)",
        desc: "將人類/外界資訊轉成二進位訊號輸入電腦。例如：鍵盤、滑鼠、掃描器、相機、麥克風。"
      },
      {
        term: "輸出單元 (Output Unit, OU)",
        desc: "將二進位處理結果轉成人類可讀取的格式或實體輸出。例如：螢幕、印表機、喇叭、投影機。"
      }
    ]
  },
  {
    title: "二、記憶體階層架構（速度、容量、價格全解析）",
    summary: "電腦依據存取速度、成本與容量所形成的階層金字塔。",
    table: {
      headers: ["階層", "代表元件", "速度", "容量", "單位成本", "揮發性"],
      rows: [
        ["第 1 層 (CPU內部)", "暫存器 (Register)", "最快 (以皮秒計)", "極小 (幾十位元組)", "最高", "揮發性 (斷電即失)"],
        ["第 2 層 (緩衝區)", "快取記憶體 (Cache / SRAM)", "次快 (幾奈秒)", "小 (幾MB ~ 幾十MB)", "極高", "揮發性"],
        ["第 3 層 (主記憶體)", "主記憶體 (RAM / DRAM)", "中等 (幾十奈秒)", "中等 (8GB ~ 64GB)", "中等", "揮發性"],
        ["第 4 層 (固態輔存)", "固態硬碟 (SSD / Flash)", "快於機械 (微秒級)", "大 (512GB ~ 4TB)", "低", "非揮發性 (斷電保存)"],
        ["第 5 層 (傳統輔存)", "機械硬碟 (HDD 磁盤)", "慢 (毫秒級 尋道延遲)", "極大 (2TB ~ 20TB)", "極低", "非揮發性"]
      ]
    }
  },
  {
    title: "三、半導體記憶體核心對照 (SRAM vs DRAM / ROM家族)",
    summary: "考試必考對比表，掌握差異輕鬆拿滿分！",
    comparison: [
      {
        feature: "SRAM (靜態隨機存取)",
        detail: "採用雙極電晶體/正反器，速度極快、價格高、單位面積容量小，不需充電刷新。用途：CPU 快取記憶體 (Cache)。"
      },
      {
        feature: "DRAM (動態隨機存取)",
        detail: "採用電晶體與電容儲存電荷，電荷會隨時間洩漏，必須每隔一段時間充電更新 (Refresh)。容量大、成本低。用途：主記憶體 (RAM)。"
      },
      {
        feature: "ROM (唯讀記憶體家族)",
        detail: "斷電後資料不消失（非揮發性）。演進：Mask ROM (原廠寫死) ➡️ PROM (一次性燒錄) ➡️ EPROM (紫外線照射抹除) ➡️ EEPROM (電氣脈衝多次抹除，如悠遊卡RFID晶片、主機板BIOS) ➡️ Flash Memory 快閃記憶體 (隨身碟、SSD)。"
      }
    ]
  },
  {
    title: "四、儲存技術與周邊連接埠重點速記",
    summary: "SSD、熱插拔與連接埠常考易混淆概念",
    tips: [
      "【SSD vs HDD】SSD 採用快閃記憶體晶片，耐震、安靜、無機械臂，不需磁碟重組（重組會折壽）！HDD 靠磁盤馬達旋轉，怕摔怕震，易有碎片延遲。",
      "【熱插拔 (Hot Swap)】允許在電腦開機通電運作時插拔硬體（如隨身碟）。重點：開機可以插拔，關機當然更可以！",
      "【MIPS 指標】Million Instructions Per Second，代表每秒百萬「指令」數（Instruction）。",
      "【位元數】64位元電腦代表 CPU 內部的「一般用途暫存器（Register）」為 64 位元長度。",
      "【Type-C vs HDMI vs Line-out】Type-C可充電/傳資料/視訊；HDMI傳輸高畫質影音；Line-out是耳機/喇叭音訊輸出孔（不能上網！）。",
      "【印表機品質】關鍵規格看「解析度 (DPI, Dots Per Inch)」。"
    ]
  }
];

