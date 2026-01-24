/**
 * menu-component.js
 * Centraliza a renderização do menu lateral e mobile.
 */

const menuItems = [
    {
        section: "Principal",
        items: [
            { id: "institucional", label: "Institucional", icon: "fa-building-columns", link: "index.html" },
            { id: "tour", label: "Tour Interativo", icon: "fa-laptop-code", link: "tour.html" }
        ]
    },
    {
        section: "Técnico",
        items: [
            { id: "core", label: "Core & Gatekeeper", icon: "fa-microchip", link: "core-gatekeeper.html" },
            // NOVO: Membros (Base de tudo)
            { id: "membros", label: "Membros & Secretaria", icon: "fa-address-book", link: "membros.html" }, 
            { id: "financeiro", label: "Financeiro (v2.1)", icon: "fa-hand-holding-dollar", link: "financeiro.html" },
            { id: "diaconia", label: "Diaconia & Púlpito", icon: "fa-users", link: "diaconia.html" }, // Atualizei o label para refletir a mudança v3.2
            { id: "oracao", label: "Oração (v1.0)", icon: "fa-hands-praying", link: "oracao.html" },
            // NOVO: Missões
            { id: "missoes", label: "Missões & Propósitos", icon: "fa-bullseye", link: "missoes.html" }, 
	    { id: "celulas", label: "Células & Discipulado", icon: "fa-network-wired", link: "celulas.html" }
        ]
    },
    {
        section: "Visual",
        items: [
            { id: "design", label: "Design System", icon: "fa-palette", link: "design-system.html" }
        ]
    }
];

function initMenu(activePageId) {
    renderSidebar(activePageId);
    renderMobileMenu(activePageId);
}

function renderSidebar(activeId) {
    const placeholder = document.getElementById('sidebar-placeholder');
    if (!placeholder) return;

    let navHtml = '';

    menuItems.forEach(group => {
        navHtml += `<p class="px-6 text-xs font-bold text-slate-400 uppercase mt-4 mb-2">${group.section}</p>`;
        
        group.items.forEach(item => {
            const activeClass = item.id === activeId ? 'nav-active' : '';
            // Adiciona classe específica para destacar itens novos se necessário, ou mantém padrão
            navHtml += `
                <a href="${item.link}" class="block w-full text-left px-6 py-3 hover:bg-slate-100 text-slate-600 font-medium transition-colors ${activeClass}">
                    <i class="fa-solid ${item.icon} w-6 text-center text-sm"></i> ${item.label}
                </a>
            `;
        });
    });

    const sidebarHtml = `
        <aside class="w-72 bg-slate-50 border-r border-slate-200 hidden md:flex flex-col z-20 h-screen sticky top-0">
            <div class="p-6 border-b border-slate-200 bg-slate-50 z-10">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white text-lg shadow-lg shadow-blue-900/20">
                        <i class="fa-solid fa-church text-blue-400"></i>
                    </div>
                    <div>
                        <h1 class="font-bold text-slate-800 leading-tight">E-Clesiástico</h1>
                        <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">Master Doc v4.2</span>
                    </div>
                </div>
            </div>
            <nav class="flex-1 py-4 overflow-y-auto space-y-1 custom-scrollbar">
                ${navHtml}
            </nav>
        </aside>
    `;

    placeholder.outerHTML = sidebarHtml;
}

function renderMobileMenu(activeId) {
    const placeholder = document.getElementById('mobile-menu-placeholder');
    if (!placeholder) return;

    let linksHtml = '';
    
    menuItems.forEach(group => {
        // Adiciona separadores no mobile também para organização
        linksHtml += `<p class="text-xs font-bold text-slate-500 uppercase mt-4 mb-2 border-b border-slate-700 pb-1">${group.section}</p>`;
        
        group.items.forEach(item => {
            const activeClass = item.id === activeId ? 'text-blue-400 font-bold pl-2 border-l-2 border-blue-400' : 'text-slate-300 hover:text-white';
            linksHtml += `<a href="${item.link}" class="block py-2 ${activeClass}"><i class="fa-solid ${item.icon} w-6 text-center mr-2"></i>${item.label}</a>`;
        });
    });

    const mobileMenuHtml = `
        <div id="mobile-menu" class="fixed inset-0 bg-slate-900 z-50 hidden flex-col p-6 text-white overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <span class="font-bold text-lg">Menu</span>
                <button onclick="toggleMobileMenu()" class="p-2"><i class="fa-solid fa-xmark text-2xl"></i></button>
            </div>
            <div class="space-y-1 pb-10">
                ${linksHtml}
            </div>
        </div>
    `;

    placeholder.outerHTML = mobileMenuHtml;
}