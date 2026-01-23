// assets/js/tour-features.js

// --- Tour Tabs Logic ---
function switchTourTab(tabId) {
    // Hide all tabs inside Tour
    ['gatekeeper-tab', 'app-tab', 'finance-tab', 'ops-tab'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.classList.add('hidden');
    });
    
    // Show selected
    const activeTab = document.getElementById(tabId);
    if(activeTab) activeTab.classList.remove('hidden');
    
    // Update buttons visual state
    document.querySelectorAll('.tour-nav-btn').forEach(btn => {
        btn.classList.remove('bg-slate-100', 'text-slate-700');
        btn.classList.add('bg-white', 'text-slate-600');
    });

    const activeBtnMap = {
        'gatekeeper-tab': 'btn-gatekeeper',
        'app-tab': 'btn-app',
        'finance-tab': 'btn-finance',
        'ops-tab': 'btn-ops'
    };
    
    const btn = document.getElementById(activeBtnMap[tabId]);
    if(btn) {
        btn.classList.remove('bg-white', 'text-slate-600');
        btn.classList.add('bg-slate-100', 'text-slate-700');
    }
}

// --- Gatekeeper Simulator (Grace Mode) ---
function toggleGatekeeper() {
    const toggle = document.getElementById('gatekeeper-toggle');
    const statusText = document.getElementById('sub-status-text');
    const overlay = document.getElementById('blocked-overlay');
    
    // Lógica Invertida: Toggle ON = Assinatura Ativa (Sem Overlay)
    if (toggle && toggle.checked) {
        statusText.innerText = "Ativa"; 
        statusText.classList.replace('text-orange-600', 'text-green-600');
        overlay.classList.add('hide-overlay'); 
        overlay.classList.remove('show-overlay');
    } else if (toggle) {
        // Modo Graça (Laranja)
        statusText.innerText = "Bloqueio Parcial"; 
        statusText.classList.replace('text-green-600', 'text-orange-600');
        overlay.classList.remove('hide-overlay'); 
        overlay.classList.add('show-overlay');
    }
}

// --- App Simulator Content ---
const screens = {
    home: `
        <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg mb-4">
            <p class="text-[10px] uppercase font-bold opacity-80 mb-1">Versículo do Dia</p>
            <p class="font-serif italic text-sm">"O Senhor é o meu pastor..."</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
            <div class="bg-green-50 p-3 rounded-xl flex flex-col items-center gap-1 border border-green-100">
                <i class="fa-solid fa-hand-holding-dollar text-green-600"></i>
                <span class="text-xs font-bold text-slate-700">Contribuir</span>
            </div>
            <div class="bg-orange-50 p-3 rounded-xl flex flex-col items-center gap-1 border border-orange-100">
                <i class="fa-solid fa-calendar text-orange-600"></i>
                <span class="text-xs font-bold text-slate-700">Agenda</span>
            </div>
        </div>
    `,
    card: `
        <div class="bg-slate-800 rounded-xl p-5 text-white shadow-xl h-40 flex flex-col justify-between">
            <div class="flex justify-between">
                <i class="fa-solid fa-church opacity-50"></i>
                <span class="text-[10px] bg-white/20 px-2 rounded">MEMBRO</span>
            </div>
            <div class="flex gap-3 items-center">
                <div class="w-10 h-10 bg-slate-400 rounded-full"></div>
                <div>
                    <p class="font-bold">Felix Oliveira</p>
                    <p class="text-[10px] opacity-70">ID: 8829</p>
                </div>
            </div>
        </div>
    `,
    notes: `
        <h3 class="font-bold text-slate-800 mb-2">Notas</h3>
        <div class="bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
            <p class="font-bold text-xs">Pregação Domingo</p>
            <p class="text-[10px] text-slate-500">Anotações sobre fé...</p>
        </div>
    `,
    prayer: `
        <h3 class="font-bold text-slate-800 mb-3 px-1">Mural de Oração</h3>
        <div class="space-y-3 pb-12">
            <!-- Item 1 -->
            <div class="bg-white border border-slate-100 p-3 rounded-lg shadow-sm relative overflow-hidden group">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">M</div>
                        <span class="text-xs font-bold text-slate-700">Maria S.</span>
                    </div>
                    <span class="text-[10px] text-slate-400">2h</span>
                </div>
                <p class="text-xs text-slate-600 mb-3">Pela saúde da minha mãe que fará cirurgia.</p>
                <button onclick="triggerPrayerEffect(this)" class="w-full py-1.5 rounded bg-purple-50 text-purple-600 text-xs font-bold hover:bg-purple-100 transition-colors flex items-center justify-center gap-2">
                    <i class="fa-regular fa-heart"></i> Orar por ela
                </button>
            </div>
            <!-- Item 2 -->
            <div class="bg-white border border-slate-100 p-3 rounded-lg shadow-sm relative">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">J</div>
                        <span class="text-xs font-bold text-slate-700">João P.</span>
                    </div>
                    <span class="text-[10px] text-slate-400">5h</span>
                </div>
                <p class="text-xs text-slate-600 mb-3">Direção para novo emprego.</p>
                <button onclick="triggerPrayerEffect(this)" class="w-full py-1.5 rounded bg-slate-50 text-slate-500 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                    <i class="fa-regular fa-heart"></i> Orar por ele
                </button>
            </div>
        </div>
        <!-- FAB Add -->
        <button class="absolute bottom-4 right-4 w-12 h-12 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
            <i class="fa-solid fa-plus"></i>
        </button>
    `
};

function updatePhoneScreen(name) { 
    const phoneContent = document.getElementById('phone-content');
    if(phoneContent) {
        phoneContent.innerHTML = screens[name];
        // Scroll to top
        phoneContent.scrollTop = 0;
    }
}

// --- Simulação de Push Notification (RN04) ---
function triggerPrayerEffect(btn) {
    // 1. Mudança visual no botão (Feedback Imediato)
    btn.innerHTML = `<i class="fa-solid fa-heart text-purple-600"></i> Orado!`;
    btn.classList.add('bg-purple-100');
    
    // 2. Simular Push Notification no topo do "celular"
    const phoneFrame = document.querySelector('.phone-frame');
    const notification = document.createElement('div');
    
    notification.className = 'absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-[10px] font-bold shadow-xl z-50 flex items-center gap-2 animate-fade-in w-[90%] justify-center backdrop-blur-sm';
    notification.innerHTML = `<i class="fa-solid fa-check-circle text-green-400"></i> Push enviado para Maria!`;
    
    phoneFrame.appendChild(notification);
    
    // Remove após 3s
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 2500);
}

// Initialize default screen
document.addEventListener('DOMContentLoaded', () => {
    updatePhoneScreen('home');
});

// --- Chart Logic ---
let chartInstance = null;
function initChart() {
    if(chartInstance) return;
    const ctx = document.getElementById('costChart');
    if(!ctx) return;
    
    if (typeof Chart === 'undefined') return;

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Igreja Conectada', 'Apps Concorrentes', 'Maquininha'],
            datasets: [{ label: 'Taxas (R$)', data: [0, 399, 499], backgroundColor: ['#10B981', '#EF4444', '#F59E0B'], borderRadius: 6 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: {display:false} } }
    });
}

// --- Visitor Logic ---
function addVisitor() {
    const nameInput = document.getElementById('visitor-name');
    const inviterInput = document.getElementById('inviter-name');
    
    if(!nameInput || !nameInput.value) return;
    
    const now = new Date();
    const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2,'0');
    
    const html = `<div class="bg-slate-800 p-3 rounded-lg border-l-4 border-blue-500 flex justify-between animate-fade-in"><div><h4 class="font-bold">${nameInput.value}</h4><p class="text-xs text-slate-400">Conv: ${inviterInput.value}</p></div><span class="text-xs bg-slate-900 px-2 py-1 rounded h-fit">${time}</span></div>`;
    
    const list = document.getElementById('visitor-list');
    if(list) list.insertAdjacentHTML('afterbegin', html);
    
    nameInput.value = '';
}