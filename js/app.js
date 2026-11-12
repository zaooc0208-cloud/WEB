/**
 * 數位科技概論（上）隨堂測驗平台 - 核心互動邏輯
 */

// 音效引擎 (Web Audio API 純代碼合成，無需任何外部音效檔)
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('sound_enabled') !== 'false';
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
    osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  playWrong() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(170, now + 0.25);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }
}

// 主應用狀態
const AppState = {
  currentTab: 'overview',
  quizFilter: 'all',
  quizMode: 'learning', // 'learning' (即時解讀) 或 'exam' (模擬交卷)
  activeQuestionIndex: 0,
  activeQuestions: [...QUESTIONS],
  userAnswers: {}, // { [questionId]: 'A'|'B'|'C'|'D' }
  revealedQuestions: {}, // { [questionId]: true }
  bookmarked: new Set(JSON.parse(localStorage.getItem('bookmarked_questions') || '[]')),
  flashcardIndex: 0,
  flashcardFlipped: false,
  flashcardMastered: new Set(JSON.parse(localStorage.getItem('mastered_flashcards') || '[]')),
  examPage: 1,
  sound: new AudioSynthesizer()
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSoundButton();
  initNavigation();
  initOverview();
  initQuiz();
  initNotes();
  initFlashcards();
  initExamViewer();
});

// 主題切換
function initTheme() {
  const savedTheme = localStorage.getItem('app_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('app_theme', next);
      updateThemeIcon(next);
      AppState.sound.playClick();
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// 音效開關按鈕
function initSoundButton() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  if (soundBtn && soundIcon) {
    soundIcon.textContent = AppState.sound.enabled ? '🔊' : '🔇';
    soundBtn.addEventListener('click', () => {
      AppState.sound.enabled = !AppState.sound.enabled;
      localStorage.setItem('sound_enabled', AppState.sound.enabled);
      soundIcon.textContent = AppState.sound.enabled ? '🔊' : '🔇';
      if (AppState.sound.enabled) {
        AppState.sound.playClick();
      }
    });
  }
}

// 分頁切換
function initNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  AppState.currentTab = tabId;
  AppState.sound.playClick();

  // 更新導覽列高亮
  document.querySelectorAll('.nav-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
  });

  // 更新分頁顯示
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.classList.remove('active');
  });
  const activePane = document.getElementById(`pane-${tabId}`);
  if (activePane) {
    activePane.classList.add('active');
  }

  // 若切換到測驗分頁，重新渲染當前題
  if (tabId === 'quiz') {
    renderCurrentQuestion();
    renderNumberGrid();
  }
  // 若切換到記憶卡，重繪記憶卡
  if (tabId === 'flashcards') {
    renderCurrentFlashcard();
  }
  // 滾動至頂部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 首頁與考情診斷初始化
function initOverview() {
  renderOverviewStats();
  renderWrongQuestionTable();
  setupQuickLaunchButtons();
}

function renderOverviewStats() {
  const statsContainer = document.getElementById('overview-stats-grid');
  if (!statsContainer) return;

  const totalWrong = QUESTIONS.filter(q => q.wasWrong).length;
  const bookmarkedCount = AppState.bookmarked.size;

  statsContainer.innerHTML = `
    <div class="stat-card">
      <div class="stat-icon" style="background: rgba(239, 68, 68, 0.15); color: #ef4444;">🚨</div>
      <div class="stat-info">
        <div class="stat-value" style="color: #ef4444;">${totalWrong} 題</div>
        <div class="stat-label">原考卷錯題（扣44分）</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">✅</div>
      <div class="stat-info">
        <div class="stat-value" style="color: #10b981;">14 題</div>
        <div class="stat-label">原考卷答對題數</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: rgba(59, 130, 246, 0.15); color: #3b82f6;">⭐</div>
      <div class="stat-info">
        <div class="stat-value" style="color: #3b82f6;">${bookmarkedCount} 題</div>
        <div class="stat-label">個人收藏重點題</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: rgba(139, 92, 246, 0.15); color: #8b5cf6;">🎴</div>
      <div class="stat-info">
        <div class="stat-value" style="color: #8b5cf6;">${AppState.flashcardMastered.size} / ${FLASHCARDS.length}</div>
        <div class="stat-label">已掌握核心記憶卡</div>
      </div>
    </div>
  `;
}

function renderWrongQuestionTable() {
  const tbody = document.getElementById('wrong-questions-tbody');
  if (!tbody) return;

  const wrongQuestions = QUESTIONS.filter(q => q.wasWrong);
  tbody.innerHTML = wrongQuestions.map(q => `
    <tr>
      <td><strong>第 ${q.id} 題</strong></td>
      <td><span class="badge badge-primary">${q.categoryName}</span></td>
      <td style="max-width: 320px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${escapeHtml(q.question)}">
        ${escapeHtml(q.question)}
      </td>
      <td><span style="color: #ef4444; font-weight: 700;">${q.studentAnswer}</span></td>
      <td><span style="color: #10b981; font-weight: 700;">${q.answer}</span></td>
      <td>
        <button class="btn-small" onclick="jumpToSpecificQuestion(${q.id})">
          觀念重練 ➔
        </button>
      </td>
    </tr>
  `).join('');
}

function setupQuickLaunchButtons() {
  const btnPracticeWrong = document.getElementById('btn-launch-wrong');
  if (btnPracticeWrong) {
    btnPracticeWrong.addEventListener('click', () => {
      startQuizWithFilter('wrong');
    });
  }

  const btnPracticeAll = document.getElementById('btn-launch-all');
  if (btnPracticeAll) {
    btnPracticeAll.addEventListener('click', () => {
      startQuizWithFilter('all');
    });
  }

  const btnViewNotes = document.getElementById('btn-launch-notes');
  if (btnViewNotes) {
    btnViewNotes.addEventListener('click', () => {
      switchTab('notes');
    });
  }

  const btnFlashcards = document.getElementById('btn-launch-flashcards');
  if (btnFlashcards) {
    btnFlashcards.addEventListener('click', () => {
      switchTab('flashcards');
    });
  }
}

// 測驗模組
function initQuiz() {
  const filterSelect = document.getElementById('quiz-category-filter');
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      startQuizWithFilter(e.target.value);
    });
  }

  const modeBtns = document.querySelectorAll('.mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.quizMode = btn.getAttribute('data-mode');
      AppState.sound.playClick();
      renderCurrentQuestion();
      renderNumberGrid();
    });
  });

  const prevBtn = document.getElementById('btn-prev-q');
  const nextBtn = document.getElementById('btn-next-q');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (AppState.activeQuestionIndex > 0) {
        AppState.activeQuestionIndex--;
        AppState.sound.playClick();
        renderCurrentQuestion();
        renderNumberGrid();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (AppState.activeQuestionIndex < AppState.activeQuestions.length - 1) {
        AppState.activeQuestionIndex++;
        AppState.sound.playClick();
        renderCurrentQuestion();
        renderNumberGrid();
      }
    });
  }

  const submitExamBtn = document.getElementById('btn-submit-exam');
  if (submitExamBtn) {
    submitExamBtn.addEventListener('click', () => {
      submitQuizExam();
    });
  }

  const restartQuizBtn = document.getElementById('btn-restart-quiz');
  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
      if (confirm('確定要清除當前測驗作答記錄並重新開始嗎？')) {
        AppState.userAnswers = {};
        AppState.revealedQuestions = {};
        AppState.activeQuestionIndex = 0;
        AppState.sound.playClick();
        renderCurrentQuestion();
        renderNumberGrid();
      }
    });
  }
}

function startQuizWithFilter(filterKey) {
  AppState.quizFilter = filterKey;
  if (filterKey === 'all') {
    AppState.activeQuestions = [...QUESTIONS];
  } else if (filterKey === 'wrong') {
    AppState.activeQuestions = QUESTIONS.filter(q => q.wasWrong);
  } else if (filterKey === 'bookmarked') {
    AppState.activeQuestions = QUESTIONS.filter(q => AppState.bookmarked.has(q.id));
    if (AppState.activeQuestions.length === 0) {
      alert('您尚未收藏任何題目！請先點擊題目的星星圖示收藏重點題目。');
      AppState.quizFilter = 'all';
      AppState.activeQuestions = [...QUESTIONS];
    }
  } else {
    AppState.activeQuestions = QUESTIONS.filter(q => q.category === filterKey);
  }

  const filterSelect = document.getElementById('quiz-category-filter');
  if (filterSelect) {
    filterSelect.value = AppState.quizFilter;
  }

  AppState.activeQuestionIndex = 0;
  switchTab('quiz');
  renderCurrentQuestion();
  renderNumberGrid();
}

function jumpToSpecificQuestion(questionId) {
  // 切換為全部或該題所在篩選
  AppState.quizFilter = 'all';
  AppState.activeQuestions = [...QUESTIONS];
  const targetIdx = AppState.activeQuestions.findIndex(q => q.id === questionId);
  if (targetIdx !== -1) {
    AppState.activeQuestionIndex = targetIdx;
  }
  const filterSelect = document.getElementById('quiz-category-filter');
  if (filterSelect) filterSelect.value = 'all';

  switchTab('quiz');
  renderCurrentQuestion();
  renderNumberGrid();
}

function renderCurrentQuestion() {
  const currentQ = AppState.activeQuestions[AppState.activeQuestionIndex];
  if (!currentQ) return;

  const total = AppState.activeQuestions.length;
  const currentNum = AppState.activeQuestionIndex + 1;

  // 更新題號與分類
  const qNumBadge = document.getElementById('quiz-q-number');
  if (qNumBadge) {
    qNumBadge.innerHTML = `第 ${currentQ.id} 題（進度 ${currentNum} / ${total}）· ${currentQ.categoryName}`;
  }

  // 星星收藏狀態
  const bookmarkBtn = document.getElementById('quiz-bookmark-btn');
  if (bookmarkBtn) {
    const isBookmarked = AppState.bookmarked.has(currentQ.id);
    bookmarkBtn.classList.toggle('active', isBookmarked);
    bookmarkBtn.innerHTML = isBookmarked ? '★' : '☆';
    bookmarkBtn.title = isBookmarked ? '取消收藏' : '收藏此題';
    bookmarkBtn.onclick = () => toggleBookmark(currentQ.id);
  }

  // 原卷失分提示條
  const wrongAlert = document.getElementById('quiz-original-wrong-alert');
  if (wrongAlert) {
    if (currentQ.wasWrong) {
      wrongAlert.style.display = 'flex';
      wrongAlert.innerHTML = `
        <div style="font-size: 1.25rem;">🚨</div>
        <div>
          <strong>【原考卷失分項目】</strong> 吳同學在考卷上選擇了 
          <span style="text-decoration: line-through; color: #ef4444; font-weight: 700;">(${currentQ.studentAnswer})</span>，
          正確答案應為 <span style="color: #10b981; font-weight: 700;">(${currentQ.answer})</span>！
          ${currentQ.teacherNote ? `<br><small style="color: var(--text-muted);">考卷批改備註：${currentQ.teacherNote}</small>` : ''}
        </div>
      `;
    } else {
      wrongAlert.style.display = 'none';
    }
  }

  // 題目內文
  const textEl = document.getElementById('quiz-question-text');
  if (textEl) {
    textEl.textContent = currentQ.question;
  }

  // 選項列表
  const optionsContainer = document.getElementById('quiz-options-list');
  if (!optionsContainer) return;

  const userAnswer = AppState.userAnswers[currentQ.id];
  const isRevealed = AppState.quizMode === 'learning' 
    ? (userAnswer !== undefined || AppState.revealedQuestions[currentQ.id])
    : (AppState.revealedQuestions[currentQ.id]); // 模擬考模式交卷後才展開

  optionsContainer.innerHTML = currentQ.options.map(opt => {
    let classes = ['option-item'];
    const isThisSelected = userAnswer === opt.key;

    if (isThisSelected) {
      classes.push('selected');
    }

    if (isRevealed) {
      classes.push('disabled');
      if (opt.key === currentQ.answer) {
        classes.push('correct');
      } else if (isThisSelected && opt.key !== currentQ.answer) {
        classes.push('wrong');
      }
    }

    return `
      <div class="${classes.join(' ')}" onclick="handleOptionSelect(${currentQ.id}, '${opt.key}')">
        <div class="option-key">${opt.key}</div>
        <div class="option-text">${escapeHtml(opt.text)}</div>
      </div>
    `;
  }).join('');

  // 解析卡片
  const expCard = document.getElementById('quiz-explanation-card');
  if (expCard) {
    if (isRevealed) {
      expCard.style.display = 'block';
      const isCorrect = userAnswer === currentQ.answer;

      expCard.innerHTML = `
        <div class="explanation-header">
          <div class="explanation-title">
            <span>${isCorrect ? '🎉 答對了！' : '💡 觀念精闢解析'}</span>
            <span class="badge ${isCorrect ? 'badge-success' : 'badge-danger'}">
              正解：(${currentQ.answer})
            </span>
          </div>
        </div>
        <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-main);">
          ${currentQ.explanation}
        </p>

        <div class="analysis-breakdown">
          ${Object.entries(currentQ.analysis).map(([k, desc]) => `
            <div class="analysis-row" style="${k === currentQ.answer ? 'border-color: #10b981; background: rgba(16, 185, 129, 0.08); font-weight: 600;' : ''}">
              <strong>(${k})</strong> ${escapeHtml(desc)}
            </div>
          `).join('')}
        </div>

        <div class="memory-tip-box">
          <span style="font-size: 1.25rem;">💡</span>
          <div>
            <strong>【考點秒記秘訣】：</strong>
            ${currentQ.memoryTip}
          </div>
        </div>
      `;
    } else {
      expCard.style.display = 'none';
    }
  }

  // 上下題按鈕狀態
  const prevBtn = document.getElementById('btn-prev-q');
  const nextBtn = document.getElementById('btn-next-q');
  if (prevBtn) prevBtn.disabled = AppState.activeQuestionIndex === 0;
  if (nextBtn) nextBtn.disabled = AppState.activeQuestionIndex === total - 1;
}

function handleOptionSelect(questionId, optionKey) {
  // 若該題在當前模式下已鎖定，不重複處理
  if (AppState.quizMode === 'learning' && AppState.userAnswers[questionId] !== undefined) {
    return;
  }
  if (AppState.quizMode === 'exam' && AppState.revealedQuestions[questionId]) {
    return;
  }

  const q = QUESTIONS.find(item => item.id === questionId);
  if (!q) return;

  AppState.userAnswers[questionId] = optionKey;

  if (AppState.quizMode === 'learning') {
    AppState.revealedQuestions[questionId] = true;
    if (optionKey === q.answer) {
      AppState.sound.playCorrect();
    } else {
      AppState.sound.playWrong();
    }
  } else {
    AppState.sound.playClick();
  }

  renderCurrentQuestion();
  renderNumberGrid();
}

function toggleBookmark(questionId) {
  if (AppState.bookmarked.has(questionId)) {
    AppState.bookmarked.delete(questionId);
  } else {
    AppState.bookmarked.add(questionId);
  }
  localStorage.setItem('bookmarked_questions', JSON.stringify([...AppState.bookmarked]));
  AppState.sound.playClick();
  renderCurrentQuestion();
  renderNumberGrid();
  renderOverviewStats();
}

function renderNumberGrid() {
  const container = document.getElementById('quiz-number-grid');
  if (!container) return;

  container.innerHTML = AppState.activeQuestions.map((q, idx) => {
    let classes = ['num-btn'];
    if (idx === AppState.activeQuestionIndex) {
      classes.push('current');
    }

    const ans = AppState.userAnswers[q.id];
    const isRevealed = AppState.quizMode === 'learning' ? (ans !== undefined) : AppState.revealedQuestions[q.id];

    if (isRevealed) {
      if (ans === q.answer) {
        classes.push('answered-correct');
      } else {
        classes.push('answered-wrong');
      }
    } else if (ans !== undefined) {
      classes.push('current'); // 已選但未開牌（模擬考中）
    }

    if (AppState.bookmarked.has(q.id)) {
      classes.push('has-star');
    }

    return `
      <button class="${classes.join(' ')}" onclick="jumpToQuestionIndex(${idx})">
        ${q.id}
      </button>
    `;
  }).join('');
}

function jumpToQuestionIndex(idx) {
  AppState.activeQuestionIndex = idx;
  AppState.sound.playClick();
  renderCurrentQuestion();
  renderNumberGrid();
}

function submitQuizExam() {
  const total = AppState.activeQuestions.length;
  const answeredCount = Object.keys(AppState.userAnswers).filter(id => 
    AppState.activeQuestions.some(q => q.id === parseInt(id))
  ).length;

  if (answeredCount < total) {
    const unans = total - answeredCount;
    if (!confirm(`您還有 ${unans} 題尚未作答，確定要交卷評分嗎？`)) {
      return;
    }
  }

  // 揭露所有答案
  AppState.activeQuestions.forEach(q => {
    AppState.revealedQuestions[q.id] = true;
  });

  // 計算分數
  let correctCount = 0;
  AppState.activeQuestions.forEach(q => {
    if (AppState.userAnswers[q.id] === q.answer) {
      correctCount++;
    }
  });

  const finalScore = Math.round((correctCount / total) * 100);

  // 播放結算音效
  if (finalScore >= 80) {
    AppState.sound.playCorrect();
  } else {
    AppState.sound.playWrong();
  }

  // 顯示結算彈窗
  showExamResultModal(finalScore, correctCount, total);

  renderCurrentQuestion();
  renderNumberGrid();
}

function showExamResultModal(score, correctCount, total) {
  const modal = document.getElementById('exam-result-modal');
  if (!modal) return;

  const scoreEl = document.getElementById('modal-score-val');
  const descEl = document.getElementById('modal-score-desc');
  const detailsEl = document.getElementById('modal-score-details');

  if (scoreEl) scoreEl.textContent = `${score}分`;
  if (descEl) {
    if (score === 100) {
      descEl.textContent = '🎉 完美滿分！第3章硬體概念已徹底通透！';
    } else if (score >= 80) {
      descEl.textContent = '👏 表現非常優異！原本失分的觀念大幅提升！';
    } else if (score >= 60) {
      descEl.textContent = '💪 已突破及格門檻！再加強錯題就能衝刺高分！';
    } else {
      descEl.textContent = '📖 別氣餒！建議切換到【核心觀念筆記】重溫重點！';
    }
  }

  if (detailsEl) {
    detailsEl.innerHTML = `
      <div><strong>作答題數：</strong>${total} 題</div>
      <div><strong>答對：</strong><span style="color:#10b981;font-weight:700;">${correctCount} 題</span></div>
      <div><strong>答錯：</strong><span style="color:#ef4444;font-weight:700;">${total - correctCount} 題</span></div>
    `;
  }

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('exam-result-modal');
  if (modal) modal.classList.remove('active');
}

// 核心筆記渲染
function initNotes() {
  const container = document.getElementById('notes-content-container');
  if (!container) return;

  container.innerHTML = KNOWLEDGE_NOTES.map(note => {
    let extraHtml = '';

    if (note.items) {
      extraHtml += `
        <div class="note-items-grid">
          ${note.items.map(it => `
            <div class="note-item">
              <div class="note-item-title">${it.term}</div>
              <div class="note-item-desc">${it.desc}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (note.table) {
      extraHtml += `
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>${note.table.headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${note.table.rows.map(r => `
                <tr>${r.map((c, i) => `<td style="${i === 0 ? 'font-weight:700;' : ''}">${c}</td>`).join('')}</tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (note.comparison) {
      extraHtml += `
        <div class="note-items-grid">
          ${note.comparison.map(comp => `
            <div class="note-item" style="border-left: 4px solid var(--primary);">
              <div class="note-item-title">${comp.feature}</div>
              <div class="note-item-desc">${comp.detail}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (note.tips) {
      extraHtml += `
        <div style="display: flex; flex-direction: column; gap: 0.6rem;">
          ${note.tips.map(tip => `
            <div class="analysis-row" style="background: var(--bg-card); line-height: 1.6;">
              ${escapeHtml(tip)}
            </div>
          `).join('')}
        </div>
      `;
    }

    return `
      <div class="note-card">
        <div class="note-card-title">${note.title}</div>
        <div class="note-card-summary">${note.summary}</div>
        ${extraHtml}
      </div>
    `;
  }).join('');
}

// 抽認翻牌記憶卡模組
function initFlashcards() {
  const wrapper = document.getElementById('flip-card-wrapper');
  if (wrapper) {
    wrapper.addEventListener('click', () => {
      AppState.flashcardFlipped = !AppState.flashcardFlipped;
      wrapper.classList.toggle('flipped', AppState.flashcardFlipped);
      AppState.sound.playClick();
    });
  }

  const prevBtn = document.getElementById('fc-prev-btn');
  const nextBtn = document.getElementById('fc-next-btn');
  const masterBtn = document.getElementById('fc-master-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (AppState.flashcardIndex > 0) {
        AppState.flashcardIndex--;
        AppState.flashcardFlipped = false;
        AppState.sound.playClick();
        renderCurrentFlashcard();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (AppState.flashcardIndex < FLASHCARDS.length - 1) {
        AppState.flashcardIndex++;
        AppState.flashcardFlipped = false;
        AppState.sound.playClick();
        renderCurrentFlashcard();
      }
    });
  }

  if (masterBtn) {
    masterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = FLASHCARDS[AppState.flashcardIndex];
      if (AppState.flashcardMastered.has(current.id)) {
        AppState.flashcardMastered.delete(current.id);
      } else {
        AppState.flashcardMastered.add(current.id);
        AppState.sound.playCorrect();
      }
      localStorage.setItem('mastered_flashcards', JSON.stringify([...AppState.flashcardMastered]));
      renderCurrentFlashcard();
      renderOverviewStats();
    });
  }
}

function renderCurrentFlashcard() {
  const card = FLASHCARDS[AppState.flashcardIndex];
  if (!card) return;

  const total = FLASHCARDS.length;
  const currentNum = AppState.flashcardIndex + 1;

  // 翻轉狀態重設
  const wrapper = document.getElementById('flip-card-wrapper');
  if (wrapper) {
    wrapper.classList.toggle('flipped', AppState.flashcardFlipped);
  }

  // 卡片進度文字
  const progressText = document.getElementById('fc-progress-text');
  if (progressText) {
    progressText.textContent = `第 ${currentNum} / ${total} 張 · ${card.tag}`;
  }

  // 進度條
  const progressFill = document.getElementById('fc-progress-fill');
  if (progressFill) {
    const pct = Math.round((AppState.flashcardMastered.size / total) * 100);
    progressFill.style.width = `${pct}%`;
  }

  // 題目與解答
  const qEl = document.getElementById('fc-front-question');
  const aEl = document.getElementById('fc-back-answer');
  const tagEl = document.getElementById('fc-card-tag');

  if (qEl) qEl.textContent = card.question;
  if (aEl) aEl.textContent = card.answer;
  if (tagEl) tagEl.textContent = card.tag;

  // 掌握狀態按鈕
  const masterBtn = document.getElementById('fc-master-btn');
  if (masterBtn) {
    const isMastered = AppState.flashcardMastered.has(card.id);
    masterBtn.innerHTML = isMastered ? '✅ 已標記掌握' : '⭕ 標記為已掌握';
    masterBtn.classList.toggle('btn-primary', isMastered);
    masterBtn.classList.toggle('btn-secondary', !isMastered);
  }

  // 按鈕狀態
  const prevBtn = document.getElementById('fc-prev-btn');
  const nextBtn = document.getElementById('fc-next-btn');
  if (prevBtn) prevBtn.disabled = AppState.flashcardIndex === 0;
  if (nextBtn) nextBtn.disabled = AppState.flashcardIndex === total - 1;
}

// 原卷檢視器
function initExamViewer() {
  const page1Btn = document.getElementById('exam-page-1-btn');
  const page2Btn = document.getElementById('exam-page-2-btn');
  const examImg = document.getElementById('exam-viewer-img');

  if (page1Btn && page2Btn && examImg) {
    page1Btn.addEventListener('click', () => {
      AppState.examPage = 1;
      examImg.src = 'assets/exam_page1.jpg';
      page1Btn.classList.add('active', 'btn-primary');
      page1Btn.classList.remove('btn-secondary');
      page2Btn.classList.remove('active', 'btn-primary');
      page2Btn.classList.add('btn-secondary');
      AppState.sound.playClick();
    });

    page2Btn.addEventListener('click', () => {
      AppState.examPage = 2;
      examImg.src = 'assets/exam_page2.jpg';
      page2Btn.classList.add('active', 'btn-primary');
      page2Btn.classList.remove('btn-secondary');
      page1Btn.classList.remove('active', 'btn-primary');
      page1Btn.classList.add('btn-secondary');
      AppState.sound.playClick();
    });
  }
}

// 輔助工具：安全轉義 HTML
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

