/**
 * menu-component.js
 * Centraliza a renderização do menu lateral e mobile.
 */

const menuItems = [
    {
        section: "Principal",
        items: [
            { id: "institucional", label: "Institucional", icon: "fa-building-columns", link: "EClesiastico.html" },
            { id: "tour", label: "Tour Interativo", icon: "fa-laptop-code", link: "tour.html" }
        ]
    },
    {
        section: "Técnico",
        items: [
            { id: "core", label: "Core & Gatekeeper", icon: "fa-microchip", link: "core-gatekeeper.html" },
            { id: "financeiro", label: "Financeiro (v2.1)", icon: "fa-hand-holding-dollar", link: "financeiro.html" },
            { id: "diaconia", label: "Visitantes (v3.0)", icon: "fa-users", link: "diaconia.html" },
            { id: "oracao", label: "Oração (v1.0)", icon: "fa-hands-praying", link: "oracao.html" }
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
            navHtml += `
                <a href="${item.link}" class="block w-full text-left px-6 py-3 hover:bg-slate-100 text-slate-600 font-medium transition-colors ${activeClass}">
                    <i class="fa-solid ${item.icon} w-6 text-center text-sm"></i> ${item.label}
                </a>
            `;
        });
    });

    const sidebarHtml = `
        <aside class="w-72 bg-slate-50 border-r border-slate-200 hidden md:flex flex-col z-20">
            <div class="p-6 border-b border-slate-200">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white text-lg shadow-lg shadow-blue-900/20">
                        <i class="fa-solid fa-church text-blue-400"></i>
                    </div>
                    <div>
                        <h1 class="font-bold text-slate-800 leading-tight">E-Clesiástico</h1>
                        <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">Master Doc v3.1</span>
                    </div>
                </div>
            </div>
            <nav class="flex-1 py-4 overflow-y-auto space-y-1">
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
    
    // Simplificando o menu mobile para mostrar apenas links diretos ou todos, conforme sua preferência.
    // Aqui estou juntando todos os grupos.
    menuItems.forEach(group => {
        group.items.forEach(item => {
            const activeClass = item.id === activeId ? 'text-blue-400 font-bold' : '';
            linksHtml += `<a href="${item.link}" class="block ${activeClass}">${item.label}</a>`;
        });
    });

    const mobileMenuHtml = `
        <div id="mobile-menu" class="fixed inset-0 bg-slate-900 z-40 hidden flex-col p-6 text-white">
            <div class="flex justify-end mb-6">
                <button onclick="toggleMobileMenu()"><i class="fa-solid fa-xmark text-2xl"></i></button>
            </div>
            <div class="space-y-4">
                ${linksHtml}
            </div>
        </div>
    `;

    placeholder.outerHTML = mobileMenuHtml;
}