let userScores = {
    u: 0, uzlah: 0, 
    n: 0, h: 0, 
    a: 0, r: 0, 
    i: 0, t: 0
};

let currentQuestionIndex = 0;

function startQuiz() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const optionsGroup = document.getElementById('options-group');
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('quiz-progress');
    const total = questions.length;
    
    progressText.innerText = `场景 ${currentQuestionIndex + 1} / ${total}`;
    progressBar.value = ((currentQuestionIndex + 1) / total) * 100;
    questionText.innerText = q.text;
    optionsGroup.innerHTML = '';
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.text;
        btn.onclick = () => handleSelect(opt.weights);
        optionsGroup.appendChild(btn);
    });
    window.scrollTo(0, 0);
}

function handleSelect(weights) {
    for (let dimension in weights) {
        if (userScores.hasOwnProperty(dimension)) {
            userScores[dimension] += weights[dimension];
        }
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    let typeCode = "";
    typeCode += userScores.u >= userScores.uzlah ? "u" : "i"; 
    typeCode += userScores.n >= userScores.h ? "n" : "h";
    typeCode += userScores.a >= userScores.r ? "a" : "r";
    typeCode += userScores.i >= userScores.t ? "i" : "t";

    const result = archetypeMap[typeCode] || {
        name: "信士 (mu'min)",
        desc: "在主道上不断求索的旅行者。",
        history: "代表人物：无数先贤。",
        advice: "继续保持对知识的渴求。"
    };

    document.getElementById('result-code').innerText = typeCode.toUpperCase();
    document.getElementById('result-name').innerText = result.name;
    document.getElementById('result-desc').innerText = result.desc;
    document.getElementById('result-advice').innerText = result.advice;
    
    const historyEl = document.getElementById('result-history');
    if (historyEl) historyEl.innerText = result.history;

    const updateBar = (id, v1, v2, label) => {
        const total = v1 + v2;
        const per = total === 0 ? 50 : Math.round((v1 / total) * 100);
        const b = document.getElementById(`bar-${id}`);
        const t = document.getElementById(`score-${id}`);
        if(b) b.value = per;
        if(t) t.innerText = `${per}% ${label}`;
    };
    
    updateBar("ui", userScores.u, userScores.uzlah, "U");
    updateBar("nh", userScores.n, userScores.h, "N");
    updateBar("ar", userScores.a, userScores.r, "A");
    updateBar("it", userScores.i, userScores.t, "I");

    const typeImage = document.getElementById('type-image');
    if (typeImage) {
        typeImage.src = `${typeCode.toUpperCase()}.png`;
        typeImage.onerror = () => typeImage.style.display = 'none';
    }
}

const archetypeMap = {
    "unai": { 
        name: "阿米尔 (ameer/秩序建构者)", 
        desc: "你倾向于在复杂的社会协作中建立清晰的规则与秩序，是制度的坚实捍卫者。", 
        history: "代表人物：欧麦尔·本·赫塔卜。职务：最高领袖、法理学家。他建立了军饷制度、历法及行政区划。",
        advice: "利用你的组织天赋服务社会，但记得在决策中多听取‘仁慈’维度的声音。" 
    },
    "unat": { 
        name: "穆贾希德 (mujahid/正义的捍卫者)", 
        desc: "你勇敢、果断，无法忍受任何形式的不公，随时准备打破僵局捍卫真理。", 
        history: "代表人物：萨拉丁。职务：苏丹、统帅。以收复耶路撒冷及骑士风度著称于世。",
        advice: "你的勇气激励人心，行动前请多咨询长者，确保不偏离初衷。" 
    },
    "unri": { 
        name: "穆阿文 (mu'awin/社群粘合剂)", 
        desc: "你重视人际间的温情与互助，是多元文化社会中天然的调解员。", 
        history: "代表人物：安萨尔人（麦地那辅助者）。职务：社群建设者。他们以接纳迁士、建立兄弟互助契约而闻名文明史。",
        advice: "你的温暖团结了众人，但要注意不要在社交事务中忽略了个人思维的深度。" 
    },
    "unrt": { 
        name: "穆夫提 (mufti/战略分析家)", 
        desc: "你拥有极强的逻辑推导能力，能够为现代争端提供基于仁慈原则的可操作性法理方案。", 
        history: "代表人物：阿布·哈尼法。职务：法学家。四大法学派之首，以‘类推’逻辑和灵活变通见长。",
        advice: "你能为复杂问题提供清晰方向，请确保你的逻辑判决中带有深刻共情。" 
    },
    "uhai": { 
        name: "穆加迪勒 (mujadil/公共知识分子)", 
        desc: "你热衷于思辨与对话，擅长破除刻板印象与认知偏见。", 
        history: "代表人物：伊本·路什德。职务：哲学家、医学家。他通过注释亚里士多德连接了东西方思想。",
        advice: "擅长破除迷信，注意在辩论中保持温和，避免让讨论演变为胜负之争。" 
    },
    "uhat": { 
        name: "哈提卜 (khatib/思想传播者)", 
        desc: "你是言语的天才，能通过激荡人心的演讲与现代变通方式唤醒群体意识。", 
        history: "代表人物：马尔科姆·x。职务：民权运动领袖、演说家。他通过信仰的力量完成了人格重塑与种族启蒙。",
        advice: "你用语言播种希望，请确保言行一致，让生命成为真理的注脚。" 
    },
    "uhri": { 
        name: "达伊 (da'i/文明交流使者)", 
        desc: "你擅长跨文化对话，能够把古老的智慧翻译成现代语言，充满仁慈与包容。", 
        history: "代表人物：伊本·白图泰。职务：旅行家、地理学家。他历时24年游历了相当于今天44个国家的土地。",
        advice: "你让信仰变得生动，请确保你的热情背后有扎实的历史知识支撑。" 
    },
    "uhrt": { 
        name: "穆尔希德 (murshid/心灵导师)", 
        desc: "你具有极强的感召力，不靠强权而是靠灵性的光辉引导他人，善于变通化解内心郁结。", 
        history: "代表人物：鲁米。职务：诗人、灵性导师。其诗集《玛斯纳维》是文明的精神瑰宝。",
        advice: "你激发了他人的信仰热情，请注意时刻保持谦逊。" 
    },
    "inai": { 
        name: "穆哈菲兹 (muhafiz/文化守门人)", 
        desc: "你对传统、经文和历史细节有着近乎执着的坚守，出淤泥而不染。", 
        history: "代表人物：布哈里。职务：圣训学家、学者。他耗时16年编纂了最权威的圣训集。",
        advice: "在应用传统智慧时，尝试结合更多现代社会的智慧。" 
    },
    "inat": { 
        name: "穆智台希德 (mujtahid/开拓性的思考者)", 
        desc: "你不满足于现成的答案，善于在退隐静修与古老智慧中挖掘解决危机的底层逻辑。", 
        history: "代表人物：伊本·赫勒敦。职务：社会学家、历史学家。被誉为现代历史学和社会学之父。",
        advice: "你为文明寻找未来路径，记得将理论转化为普通人也能听懂的语言。" 
    },
    "inri": { 
        name: "穆安德姆 (mu'addib/礼仪引导者)", 
        desc: "你重视内在教养与外在礼仪的合一，认为改变世界应该从避开世俗喧嚣、改善自我开始。", 
        history: "代表人物：伊玛目·纳瓦威。职务：法理学家、道德教育家。代表作《四十圣训》。",
        advice: "通过言传身教影响他人，你的耐心与体面是现代社会的一剂良药。" 
    },
    "inrt": { 
        name: "萨利赫 (salih/沉默的实干家)", 
        desc: "你认为行动胜过万语。你是那个避开纷争，第一时间去建设和修复的变通者。", 
        history: "代表人物：历史上无数默默修筑水利、清真寺和道路的无名工匠领袖。",
        advice: "你的双手即是你的祭坛，请继续保持纯洁的意图。" 
    },
    "ihai": { 
        name: "哈基姆 (hakim/自然哲人)", 
        desc: "你认为科学是造物的一部分。你追求底层逻辑，在实验室与图书馆中孤独修行。", 
        history: "代表人物：海什木。职务：物理学家、数学家。被称为‘光学之父’，奠定了现代科学方法论。",
        advice: "你在孤独中发现规律，请适时分享你的洞见，照亮更多人的迷途。" 
    },
    "ihat": { 
        name: "阿林 (alim/知行合一的学者)", 
        desc: "你不仅博学，更追求知识背后的觉悟。你是那种深藏不露的智者，能灵活适应时代。", 
        history: "代表人物：加扎利。职务：哲学家、法学家。被称为‘文明的证明’，调和了理学与灵学。",
        advice: "你的存在本身就是一种宣教，继续在学术与修行之间保持平衡。" 
    },
    "ihri": { 
        name: "扎希德 (zahid/简约主义践行者)", 
        desc: "你追求极致的纯净与超然，以低欲望、高质量的精神生活对抗平庸。", 
        history: "代表人物：拉比娅。职务：修道者、诗人。她提出了纯粹敬畏造物主而非因恐惧火狱的思想。",
        advice: "你的清高是社会的镜子，在退隐的同时，也要保持对弱势者的关怀。" 
    },
    "ihrt": { 
        name: "阿迪卜 (adib/审美先行者)", 
        desc: "你通过美感、艺术和文学来表达信仰。你认为文明失去了美就失去了灵魂。", 
        history: "代表人物：萨迪。职务：诗人、散文家。代表作《玫瑰园》是世界古典文学精品。",
        advice: "你让生活变得优雅。请继续用你的艺术天赋去消解仇恨。" 
    }
};