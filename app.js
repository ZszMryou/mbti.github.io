let userScores = {
    U: 0, Uzlah: 0, 
    N: 0, H: 0, 
    A: 0, R: 0, 
    I: 0, T: 0
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
    progressText.innerText = `问题 ${currentQuestionIndex + 1} / ${total}`;
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
    typeCode += userScores.U >= userScores.Uzlah ? "U" : "I"; 
    typeCode += userScores.N >= userScores.H ? "N" : "H";
    typeCode += userScores.A >= userScores.R ? "A" : "R";
    typeCode += userScores.I >= userScores.T ? "I" : "T";
    



    const result = archetypeMap[typeCode] || {
        name: "信士 (Mu'min)",
        desc: "在主道上不断求索的旅行者，具备平衡的特质。",
        advice: "继续保持对知识的渴求与对主命的守持。"
    };
    document.getElementById('result-code').innerText = typeCode;
    document.getElementById('result-name').innerText = result.name;
    document.getElementById('result-desc').innerText = result.desc;
    document.getElementById('result-advice').innerText = result.advice;
    const typeImage = document.getElementById('type-image');
    if (typeImage) {
        typeImage.src = `${typeCode}.png`;
        typeImage.alt = `Result: ${typeCode}`;
    }
}

const archetypeMap = {
    // SJ: 坚定的守护者
    "UNAI": { name: "阿米尔 (Ameer)", desc: "社区的组织者与秩序的维护者。", advice: "利用你的组织天赋服务社区，但记得在决策中多听取仁慈（Rahma）的建议。" },
    "UNRI": { name: "穆阿文 (Mu'awin)", desc: "热衷于互助的纽带，擅长款待（Ihsan）。", advice: "你的温暖团结了乌玛，注意不要在繁杂的事务中忽略了个人灵性的深度。" },
    "INAI": { name: "穆哈菲兹 (Muhafiz)", desc: "传统与经文细节的坚定守护者。", advice: "你让经典得以精准流传，尝试在应用教法时结合更多当下的智慧（Hikmah）。" },
    "INRI": { name: "穆安德姆 (Mu'addib)", desc: "默默奉献的教育者，重视礼仪（Adab）。", advice: "通过言传身教影响他人，你的耐心是社区最宝贵的财富。" },

    // NT: 理性的灯塔
    "UNAT": { name: "穆夫提 (Mufti)", desc: "战略性的法理判定者，逻辑严密。", advice: "你能为复杂问题提供清晰方向，请确保法理判决中带有对弱势者的怜悯。" },
    "INAT": { name: "穆智台希德 (Mujtahid)", desc: "独立的思考者，追求深层规律与逻辑。", advice: "你为乌玛寻找未来路径，记得将高深的理论转化为普通人能理解的语言。" },
    "UNAH": { name: "穆加迪勒 (Mujadil)", desc: "睿智的辩论者，通过思辨明晰真理。", advice: "擅长破除迷信与偏见，注意在辩论中保持温和与对他人的尊重。" },
    "INAH": { name: "哈基姆 (Hakim)", desc: "追求万物本质逻辑的哲人。", advice: "你在孤独中发现真理，请适时分享你的洞见以照亮社区。" },

    // NF: 灵性的引导
    "URAT": { name: "穆尔希德 (Murshid)", desc: "极具感召力的导师，引导灵性提升。", advice: "你激发了他人的信仰热情，请注意保持谦逊以对抗内心的私欲（Nafs）。" },
    "IRAT": { name: "阿林 (Alim)", desc: "博学深沉，将知识与觉悟合一。", advice: "你的存在就是一种宣教，继续在隐遁与社会责任之间保持平衡。" },
    "URAH": { name: "达伊 (Da'i)", desc: "热情的传道员，传播喜讯的使者。", advice: "你让信仰变得生动有趣，请确保热情背后有扎实的知识基础（Ilm）支撑。" },
    "IRAH": { name: "扎希德 (Zahid)", desc: "追求纯净、超然世外的苦修者。", advice: "你的清高是社区的镜子，记得在退隐时也不要忘记对乌玛的关怀。" },

    // SP: 行动的先锋
    "UNAK": { name: "穆贾希德 (Mujahid)", desc: "勇敢果断，在困难面前冲锋在前。", advice: "你的勇气激励人心，行动前请多向有经验的长者咨询以确保方向正确。" },
    "URAK": { name: "哈提卜 (Khatib)", desc: "感染力极强的演讲者，活跃气氛的大师。", advice: "你用语言播种希望，请确保你的言行一致，做真理的践行者。" },
    "INAK": { name: "萨利赫 (Salih)", desc: "寡言敏行，擅长解决实际问题的实干家。", advice: "你通过双手事主，你的工作就是你的礼拜，请继续保持这份纯洁的意图。" },
    "IRAK": { name: "阿迪卜 (Adib)", desc: "展现美感与礼仪的文人。", advice: "你让生活变得泰伊卜（Tayyib），用你的艺术天赋去美化社区的环境与心灵。" }
};