// ===============================
// FEATURE FLAGS - Sistema de Controle de Funcionalidades
// ===============================
// Use estas flags para ativar/desativar funcionalidades sem remover código
// true = ativo | false = desativado
const featureFlags = {
    // Menu Colaborador
    menuPresenca: false,                    // Controle de presença do colaborador
    menuHistorico: false,                   // Histórico de presença individual
    menuJustificativas: false,              // Sistema de justificativas
    menuHistoricoJustificativa: false,      // Histórico de justificativas
    menuEspelhoFalta: false,                // Espelho de falta justificada
    menuFerias: false,                      // Solicitação de férias
    menuJustificarFalta: true,              // Justificar falta (Colaborador)
    
    // Menu Gestor
    menuGestorHistorico: true,              // Histórico da equipe (gestor)
    menuGestorRelatorios: true,             // Relatórios do gestor
    
    // Menu RH
    menuRhAderencia: true,                  // Painel de aderência RH
    menuRhRelatorios: true,                 // Relatórios RH
    
    // Funcionalidades Específicas
    dashboardPresencaSemanal: false,        // Cards de presença semanal (4 cards: presença, sede, home office, dias restantes)
    conformidadeFormatoSimplificado: true,  // Novo formato X/5 com farol verde (true = novo formato | false = formato antigo 3x2)
    tabelaOcorrenciasSimplificada: true,   // Tabela simplificada: Colaborador | Semana | Status | Justificativa (apenas não conformes)
    calendarioFerias: false,                // Calendário de seleção de férias
    graficosGestor: true,                   // Gráficos no dashboard do gestor
    justificacaoSemanal: false,             // Sistema de justificação semanal
    alertasPendencias: true,                // Alertas de pendências no calendário
    analiseConsolidada: true,               // Análise consolidada no RH
    
    // Relatórios e Dashboards
    relatorioAderenciaAreas: true,          // Relatório de aderência por diretoria
    relatorioJustificativas: true,          // Relatório de justificativas
    relatorioStatusJustificativas: true,    // Status de justificativas por gestor
    dashboardKPIs: true,                    // KPIs no dashboard RH
    
    // Funcionalidades Avançadas
    expansaoGestores: true,                 // Expansão de gestores nas tabelas
    filtroColaborador: true,                // Filtro de seleção de colaborador
    datepicker: true,                       // Seletor de datas avançado
};

// Função auxiliar para verificar se uma feature está ativa
function isFeatureEnabled(featureName) {
    return featureFlags[featureName] === true;
}

// Função para aplicar as flags de visibilidade no DOM
function applyFeatureFlags() {
    // Menu Colaborador
    const menuPresenca = document.querySelector('.role-employee .nav-item [data-page="presenca"]')?.closest('.nav-item');
    const menuHistorico = document.querySelector('.role-employee .nav-item [data-page="historico-presenca"]')?.closest('.nav-item');
    const menuJustificativas = document.querySelector('.role-employee .nav-item [data-page="justificativas"]')?.closest('.nav-item');
    const menuHistoricoJust = document.querySelector('.role-employee .nav-item [data-page="historico-justificativa"]')?.closest('.nav-item');
    const menuEspelhoFalta = document.querySelector('.role-employee .nav-item [data-page="falta-justificada"]')?.closest('.nav-item');
    const menuFerias = document.querySelector('.role-employee .nav-item [data-page="ferias"]')?.closest('.nav-item');
    const menuJustificarFalta = document.querySelector('.role-employee .nav-item [data-page="justificar-falta"]')?.closest('.nav-item');
    
    if (menuPresenca) menuPresenca.style.display = isFeatureEnabled('menuPresenca') ? 'block' : 'none';
    if (menuHistorico) menuHistorico.style.display = isFeatureEnabled('menuHistorico') ? 'block' : 'none';
    if (menuJustificativas) menuJustificativas.style.display = isFeatureEnabled('menuJustificativas') ? 'block' : 'none';
    if (menuHistoricoJust) menuHistoricoJust.style.display = isFeatureEnabled('menuHistoricoJustificativa') ? 'block' : 'none';
    if (menuEspelhoFalta) menuEspelhoFalta.style.display = isFeatureEnabled('menuEspelhoFalta') ? 'block' : 'none';
    if (menuFerias) menuFerias.style.display = isFeatureEnabled('menuFerias') ? 'block' : 'none';
    if (menuJustificarFalta) menuJustificarFalta.style.display = isFeatureEnabled('menuJustificarFalta') ? 'block' : 'none';
    
    // Dashboard - Cards de Presença Semanal (Colaborador, Gestor e RH)
    const dashboardPresencaCards = document.getElementById('dashboard-presenca-semanal-cards');
    const dashboardPresencaCardsGestor = document.getElementById('dashboard-presenca-semanal-cards-gestor');
    const dashboardPresencaCardsRh = document.getElementById('dashboard-presenca-semanal-cards-rh');
    
    if (dashboardPresencaCards) {
        dashboardPresencaCards.style.display = isFeatureEnabled('dashboardPresencaSemanal') ? 'grid' : 'none';
    }
    if (dashboardPresencaCardsGestor) {
        dashboardPresencaCardsGestor.style.display = isFeatureEnabled('dashboardPresencaSemanal') ? 'grid' : 'none';
    }
    if (dashboardPresencaCardsRh) {
        dashboardPresencaCardsRh.style.display = isFeatureEnabled('dashboardPresencaSemanal') ? 'grid' : 'none';
    }
    
    // Lógica do Farol de Conformidade X/5
    if (isFeatureEnabled('conformidadeFormatoSimplificado')) {
        atualizarFarolConformidade();
    }
    
    console.log('✅ Feature Flags aplicadas com sucesso!');
    console.log('📊 Status das funcionalidades:', featureFlags);
}

// ===============================
// ADMINISTRACAO - DADOS E INTERFACE
// ===============================
const adminState = {
    rhEmails: [
        'rh@alpargatas.com',
        'bp@alpargatas.com'
    ],
    feriados: [
        { date: '2026-01-01', name: 'Confraternizacao Universal' },
        { date: '2026-02-16', name: 'Carnaval' },
        { date: '2026-04-03', name: 'Paixao de Cristo' },
        { date: '2026-04-21', name: 'Tiradentes' }
    ],
    agentVersions: {
        labels: ['1.2.10', '1.2.6', '1.2.1', '1.1.0'],
        values: [55, 20, 15, 10]
    },
    osVersions: {
        labels: ['Windows 10 22H2', 'Windows 10 21H2', 'Windows 11 23H2', 'Windows 11 24H2'],
        values: [34, 18, 28, 20]
    }
};

const adminFlagGroups = [
    {
        title: 'Menu Colaborador',
        flags: [
            { key: 'menuPresenca', label: 'Menu Presenca', desc: 'Controle de presenca do colaborador.' },
            { key: 'menuHistorico', label: 'Menu Historico', desc: 'Historico individual do colaborador.' },
            { key: 'menuJustificativas', label: 'Menu Justificativas', desc: 'Sistema de justificativas.' },
            { key: 'menuHistoricoJustificativa', label: 'Menu Historico de Justificativas', desc: 'Historico de justificativas.' },
            { key: 'menuEspelhoFalta', label: 'Menu Espelho de Falta', desc: 'Espelho de falta justificada.' },
            { key: 'menuFerias', label: 'Menu Ferias', desc: 'Solicitacao de ferias.' },
            { key: 'menuJustificarFalta', label: 'Menu Justificar Falta', desc: 'Fluxo de justificativa de falta.' }
        ]
    },
    {
        title: 'Menu Gestor e RH',
        flags: [
            { key: 'menuGestorHistorico', label: 'Menu Historico do Gestor', desc: 'Historico da equipe.' },
            { key: 'menuGestorRelatorios', label: 'Menu Relatorios do Gestor', desc: 'Relatorios do gestor.' },
            { key: 'menuRhAderencia', label: 'Menu Aderencia RH', desc: 'Painel de aderencia do RH.' },
            { key: 'menuRhRelatorios', label: 'Menu Relatorios RH', desc: 'Relatorios gerais do RH.' }
        ]
    },
    {
        title: 'Funcionalidades',
        flags: [
            { key: 'dashboardPresencaSemanal', label: 'Dashboard Presenca Semanal', desc: 'Cards de presenca semanal.' },
            { key: 'conformidadeFormatoSimplificado', label: 'Conformidade Simplificada', desc: 'Formato X/5 com farol.' },
            { key: 'tabelaOcorrenciasSimplificada', label: 'Tabela de Ocorrencias Simplificada', desc: 'Tabela enxuta para nao conformes.' },
            { key: 'calendarioFerias', label: 'Calendario de Ferias', desc: 'Calendario para solicitacao.' },
            { key: 'graficosGestor', label: 'Graficos do Gestor', desc: 'Graficos no dashboard do gestor.' },
            { key: 'justificacaoSemanal', label: 'Justificacao Semanal', desc: 'Fluxo semanal de justificativas.' },
            { key: 'alertasPendencias', label: 'Alertas de Pendencias', desc: 'Alertas no calendario.' },
            { key: 'analiseConsolidada', label: 'Analise Consolidada', desc: 'Analise consolidada no RH.' },
            { key: 'relatorioAderenciaAreas', label: 'Relatorio de Aderencia por Areas', desc: 'Relatorio por diretoria.' },
            { key: 'relatorioJustificativas', label: 'Relatorio de Justificativas', desc: 'Relatorio por tipo.' },
            { key: 'relatorioStatusJustificativas', label: 'Status das Justificativas', desc: 'Status por gestor.' },
            { key: 'dashboardKPIs', label: 'KPIs do RH', desc: 'KPIs no dashboard do RH.' },
            { key: 'expansaoGestores', label: 'Expansao de Gestores', desc: 'Expansao de gestores nas tabelas.' },
            { key: 'filtroColaborador', label: 'Filtro de Colaborador', desc: 'Filtro de colaborador.' },
            { key: 'datepicker', label: 'Datepicker Avancado', desc: 'Seletor de datas avancado.' }
        ]
    }
];

function renderFeatureFlags() {
    const container = document.getElementById('flagsContainer');
    if (!container) return;

    container.innerHTML = '';

    adminFlagGroups.forEach(group => {
        const groupEl = document.createElement('div');
        groupEl.className = 'flags-group';

        const titleEl = document.createElement('div');
        titleEl.className = 'flags-group-title';
        titleEl.textContent = group.title;
        groupEl.appendChild(titleEl);

        group.flags.forEach(flag => {
            const row = document.createElement('div');
            row.className = 'flag-item';

            const info = document.createElement('div');
            info.className = 'flag-info';

            const label = document.createElement('div');
            label.className = 'flag-label';
            label.textContent = flag.label;

            const desc = document.createElement('div');
            desc.className = 'flag-desc';
            desc.textContent = flag.desc;

            info.appendChild(label);
            info.appendChild(desc);

            const toggle = document.createElement('label');
            toggle.className = 'flag-toggle';

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = isFeatureEnabled(flag.key);

            const slider = document.createElement('span');
            slider.className = 'flag-slider';

            const status = document.createElement('span');
            status.className = 'flag-status';
            status.textContent = input.checked ? 'Ativo' : 'Inativo';

            input.addEventListener('change', () => {
                featureFlags[flag.key] = input.checked;
                status.textContent = input.checked ? 'Ativo' : 'Inativo';
                applyFeatureFlags();
            });

            toggle.appendChild(input);
            toggle.appendChild(slider);

            row.appendChild(info);
            row.appendChild(toggle);
            row.appendChild(status);

            groupEl.appendChild(row);
        });

        container.appendChild(groupEl);
    });
}

function renderRhEmails() {
    const list = document.getElementById('rhEmailList');
    if (!list) return;

    list.innerHTML = '';

    adminState.rhEmails.forEach(email => {
        const item = document.createElement('div');
        item.className = 'admin-list-item';

        const text = document.createElement('span');
        text.textContent = email;

        const remove = document.createElement('button');
        remove.className = 'admin-btn ghost';
        remove.textContent = 'Remover';
        remove.addEventListener('click', () => {
            adminState.rhEmails = adminState.rhEmails.filter(itemEmail => itemEmail !== email);
            renderRhEmails();
        });

        item.appendChild(text);
        item.appendChild(remove);
        list.appendChild(item);
    });
}

function renderFeriados() {
    const list = document.getElementById('holidayList');
    if (!list) return;

    list.innerHTML = '';

    adminState.feriados.forEach(feriado => {
        const item = document.createElement('div');
        item.className = 'admin-list-item';

        const text = document.createElement('span');
        text.textContent = `${formatDateBr(feriado.date)} - ${feriado.name}`;

        const remove = document.createElement('button');
        remove.className = 'admin-btn ghost';
        remove.textContent = 'Remover';
        remove.addEventListener('click', () => {
            adminState.feriados = adminState.feriados.filter(itemFeriado => itemFeriado !== feriado);
            renderFeriados();
        });

        item.appendChild(text);
        item.appendChild(remove);
        list.appendChild(item);
    });
}

function formatDateBr(dateStr) {
    if (!dateStr) return '-';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

const piePalette = ['#0597F2', '#4BB2F2', '#0052a3', '#00a3a3', '#ffc107', '#ff6b6b', '#6f42c1'];

function renderPieCharts() {
    drawPieChart('agentVersionChart', 'agentVersionLegend', adminState.agentVersions);
    drawPieChart('osVersionChart', 'osVersionLegend', adminState.osVersions);
}

function drawPieChart(canvasId, legendId, data) {
    const canvas = document.getElementById(canvasId);
    const legend = document.getElementById(legendId);
    if (!canvas || !legend) return;

    const ctx = canvas.getContext('2d');
    const size = Math.min(canvas.parentElement.offsetWidth || 240, 240);
    canvas.width = size;
    canvas.height = size;

    const values = data.values || [];
    const labels = data.labels || [];
    const total = values.reduce((sum, value) => sum + value, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (total === 0) {
        ctx.fillStyle = '#6b6b6b';
        ctx.font = '14px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Sem dados', size / 2, size / 2);
        legend.innerHTML = '';
        return;
    }

    let startAngle = -Math.PI / 2;
    values.forEach((value, index) => {
        const sliceAngle = (value / total) * (Math.PI * 2);
        ctx.beginPath();
        ctx.moveTo(size / 2, size / 2);
        ctx.arc(size / 2, size / 2, size / 2 - 8, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = piePalette[index % piePalette.length];
        ctx.fill();
        startAngle += sliceAngle;
    });

    legend.innerHTML = '';
    labels.forEach((label, index) => {
        const value = values[index] || 0;
        const percent = Math.round((value / total) * 100);
        const item = document.createElement('div');
        item.className = 'pie-legend-item';

        const swatch = document.createElement('span');
        swatch.className = 'pie-swatch';
        swatch.style.backgroundColor = piePalette[index % piePalette.length];

        const text = document.createElement('span');
        text.textContent = `${label} - ${percent}%`;

        item.appendChild(swatch);
        item.appendChild(text);
        legend.appendChild(item);
    });
}

function initAdminPage() {
    const flagsContainer = document.getElementById('flagsContainer');
    if (!flagsContainer) return;

    renderFeatureFlags();
    renderRhEmails();
    renderFeriados();
    renderPieCharts();

    const addRhEmailBtn = document.getElementById('addRhEmailBtn');
    const rhEmailInput = document.getElementById('rhEmailInput');

    if (addRhEmailBtn && rhEmailInput) {
        addRhEmailBtn.addEventListener('click', () => {
            const email = rhEmailInput.value.trim().toLowerCase();
            if (!email || !email.includes('@')) {
                alert('Informe um email valido.');
                return;
            }
            if (!adminState.rhEmails.includes(email)) {
                adminState.rhEmails.push(email);
                renderRhEmails();
            }
            rhEmailInput.value = '';
        });
    }

    const addHolidayBtn = document.getElementById('addHolidayBtn');
    const holidayDateInput = document.getElementById('holidayDateInput');
    const holidayNameInput = document.getElementById('holidayNameInput');

    if (addHolidayBtn && holidayDateInput && holidayNameInput) {
        addHolidayBtn.addEventListener('click', () => {
            const date = holidayDateInput.value;
            const name = holidayNameInput.value.trim();
            if (!date || !name) {
                alert('Informe data e descricao do feriado.');
                return;
            }
            adminState.feriados.push({ date, name });
            renderFeriados();
            holidayDateInput.value = '';
            holidayNameInput.value = '';
        });
    }
}

// Função para atualizar o farol de conformidade (X >= 3 = verde)
function atualizarFarolConformidade() {
    const farolConfigs = [
        { 
            countId: 'presenciaisCount', 
            farolId: 'farolIconInline',
            progressId: 'progressFill'
        },
        { 
            countId: 'presenciaisCountGestor', 
            farolId: 'farolIconInlineGestor',
            progressId: 'progressFillGestor'
        },
        { 
            countId: 'presenciaisCountRh', 
            farolId: 'farolIconInlineRh',
            progressId: 'progressFillRh'
        }
    ];
    
    farolConfigs.forEach(config => {
        const countElement = document.getElementById(config.countId);
        const farolElement = document.getElementById(config.farolId);
        const progressElement = document.getElementById(config.progressId);
        
        if (countElement && farolElement) {
            // Extrai o número antes da barra (ex: "3/5" -> 3)
            const countText = countElement.textContent;
            const diasPresenciais = parseInt(countText.split('/')[0]) || 0;
            const diasMax = 5;
            const porcentagem = (diasPresenciais / diasMax) * 100;
            
            // Atualiza a barra de progresso
            if (progressElement) {
                progressElement.style.width = porcentagem + '%';
            }
            
            // Atualiza o farol
            if (diasPresenciais >= 3) {
                // ✅ VERDE - Conformidade
                farolElement.classList.remove('nao-conformidade');
                farolElement.textContent = '✅';
            } else {
                // ❌ VERMELHO - Não conformidade  
                farolElement.classList.add('nao-conformidade');
                farolElement.textContent = '❌';
            }
        }
    });
}

let colaboradorSelecionado = null;

const pageNames = {
    dashboard: 'Dashboard Principal',
    presenca: 'Controle de Presença',
    'historico-presenca': 'Justificativas colaboradores',
    justificativas: 'Minhas Justificativas',
    ferias: 'Solicitar Férias',
    'falta-justificada': 'Solicitar Falta Justificada',
    'equipe-gestor': 'Minha Equipe',
    'dashboard-gestor': 'Dashboard do Gestor',
    'dashboard-rh': 'Dashboard RH',
    conformidade: 'Conformidade',
    configuracoes: 'Configurações',
    administracao: 'Administracao'
};

document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle (collapse/expand)
    const navToggle = document.querySelector('.nav-toggle');
    const navigation = document.querySelector('.navigation');

    // Inicializar menu fechado APENAS em mobile
    if (window.innerWidth <= 768) {
        navigation.classList.add('collapsed');
    } else {
        // Desktop: remover collapsed se estiver lá
        navigation.classList.remove('collapsed');
    }

    if (navToggle && navigation) {
        navToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            // Se tem a classe, remove; senão, adiciona
            if (navigation.classList.contains('collapsed')) {
                navigation.classList.remove('collapsed');
            } else {
                navigation.classList.add('collapsed');
            }
        });
    }

    // Fechar menu ao clicar fora em mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            if (!navigation.contains(e.target) && !navToggle.contains(e.target)) {
                navigation.classList.add('collapsed');
            }
        }
    });

    // Navegação entre páginas
    const navLinks = document.querySelectorAll('.nav-link');
    const pageViews = document.querySelectorAll('.page-view');
    const currentPageElement = document.getElementById('currentPage');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetPage = link.getAttribute('data-page');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            pageViews.forEach(page => page.classList.remove('active'));
            const targetPageElement = document.getElementById(targetPage);
            if (targetPageElement) {
                targetPageElement.classList.add('active');
                if (currentPageElement) {
                    currentPageElement.textContent = pageNames[targetPage] || targetPage;
                }

                // Gerar calendário quando entra na página de férias
                if (targetPage === 'ferias') {
                    generateCalendar();
                }

                // Redesenhar gráficos quando entra na página de relatórios-gestor
                if (targetPage === 'relatorios-gestor') {
                    setTimeout(() => {
                        desenharGraficoEvolucao();
                        desenharGraficoComparativo();
                        atualizarEstatisticasEquipe();
                    }, 300);
                }

                // Redesenhar gráfico de áreas quando entra na página de relatórios
                if (targetPage === 'relatorios') {
                    setTimeout(() => {
                        inicializarGraficoAreas();
                    }, 300);
                }

                // Renderizar componentes da administracao
                if (targetPage === 'administracao') {
                    setTimeout(() => {
                        renderFeatureFlags();
                        renderRhEmails();
                        renderFeriados();
                        renderPieCharts();
                    }, 200);
                }

                // Fechar menu em mobile ao clicar em um link
                if (window.innerWidth <= 768) {
                    navigation.classList.add('collapsed');
                }
            }
        });
    });

    // Inicializar calendário se já estiver na página de férias
    if (document.getElementById('ferias').classList.contains('active')) {
        generateCalendar();
    }
});

// ===== CALENDÁRIO DE FÉRIAS =====
function generateCalendar() {
    const feriasMesInput = document.getElementById('feriasMes');
    const calendar = document.getElementById('calendar');

    if (!feriasMesInput || !calendar) return;

    // Se o input não tem valor, usar mês/ano atual
    if (!feriasMesInput.value) {
        const today = new Date();
        feriasMesInput.value = today.toISOString().slice(0, 7);
    }

    feriasMesInput.addEventListener('change', () => {
        renderCalendar();
    });

    renderCalendar();
}

function renderCalendar() {
    const feriasMesInput = document.getElementById('feriasMes');
    const calendar = document.getElementById('calendar');

    if (!feriasMesInput.value) return;

    const [ano, mes] = feriasMesInput.value.split('-');
    const data = new Date(ano, parseInt(mes) - 1, 1);

    // Limpar calendário
    calendar.innerHTML = '';

    // Cabeçalho com mês/ano
    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.innerHTML = `${data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;
    calendar.appendChild(header);

    // Nomes dos dias da semana
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    diasSemana.forEach(dia => {
        const dayName = document.createElement('div');
        dayName.className = 'calendar-day-name';
        dayName.textContent = dia;
        calendar.appendChild(dayName);
    });

    // Dias vazios antes do mês começar
    const primeiroDia = new Date(ano, parseInt(mes) - 1, 1).getDay();
    for (let i = 0; i < primeiroDia; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        calendar.appendChild(emptyDay);
    }

    // Dias do mês
    const ultimoDia = new Date(ano, parseInt(mes), 0).getDate();
    for (let dia = 1; dia <= ultimoDia; dia++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = dia;
        dayElement.dataset.day = dia;

        dayElement.addEventListener('click', () => {
            selectDateRange(dayElement, ano, mes);
        });

        calendar.appendChild(dayElement);
    }
}

function selectDateRange(dayElement, ano, mes) {
    const days = document.querySelectorAll('.calendar-day:not(.disabled)');
    const selectedDays = document.querySelectorAll('.calendar-day.selected');

    // Se já tem seleção, limpar e começar nova
    if (selectedDays.length >= 2) {
        days.forEach(d => d.classList.remove('selected'));
    }

    // Marcar dia clicado
    dayElement.classList.toggle('selected');

    // Atualizar datas
    const selecionados = Array.from(document.querySelectorAll('.calendar-day.selected'))
        .map(el => parseInt(el.dataset.day))
        .sort((a, b) => a - b);

    const dataInicial = document.getElementById('dataInicial');
    const dataFinal = document.getElementById('dataFinal');

    if (selecionados.length >= 1) {
        const dataIni = new Date(ano, parseInt(mes) - 1, selecionados[0]);
        dataInicial.textContent = dataIni.toLocaleDateString('pt-BR');
    }

    if (selecionados.length >= 2) {
        const dataFim = new Date(ano, parseInt(mes) - 1, selecionados[selecionados.length - 1]);
        dataFinal.textContent = dataFim.toLocaleDateString('pt-BR');
    } else {
        dataFinal.textContent = '-';
    }
}

// ===== HISTÓRICO MENSAL DE PRESENÇA =====

// Estrutura de dados para histórico (puxará da API futuramente)
const attendanceData = {
    // Formato: '01': { status: 'success|warning|alert', motivo: 'texto' }
    // Será preenchida dinamicamente pela API
};

function initHistoricoPresenca() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === 'historico-presenca') {
            link.addEventListener('click', () => {
                renderHistoricoCalendar();
            });
        }
    });
}

function renderHistoricoCalendar() {
    const calendar = document.getElementById('calendarHistorico');
    const mesAnoDisplay = document.getElementById('mesAnoDisplay');

    if (!calendar) return;

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const mesFormatado = hoje.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    mesAnoDisplay.textContent = mesFormatado.charAt(0).toUpperCase() + mesFormatado.slice(1);

    calendar.innerHTML = '';

    // Nomes dos dias da semana
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    diasSemana.forEach(dia => {
        const dayName = document.createElement('div');
        dayName.className = 'calendar-day-name';
        dayName.textContent = dia;
        calendar.appendChild(dayName);
    });

    const primeiroDia = new Date(ano, mes, 1).getDay();
    for (let i = 0; i < primeiroDia; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day-historico empty-day';
        calendar.appendChild(emptyDay);
    }

    // Dias do mês
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    for (let dia = 1; dia <= ultimoDia; dia++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day-historico';

        const diaFormatado = String(dia).padStart(2, '0');
        const statusData = attendanceData[diaFormatado] || {};

        // Verificar se é fim de semana
        const dataAtual = new Date(ano, mes, dia);
        const diaSemana = dataAtual.getDay();
        const ehFimDeSemana = diaSemana === 0 || diaSemana === 6;

        // Adicionar classe de status
        if (ehFimDeSemana) {
            dayElement.classList.add('fim-semana');
            dayElement.style.backgroundColor = '#6c757d';
        } else if (statusData.status === 'success') {
            dayElement.classList.add('success');
            dayElement.style.backgroundColor = '#28a745';
        } else if (statusData.status === 'warning') {
            dayElement.classList.add('warning');
            dayElement.style.backgroundColor = '#ffc107';
        } else if (statusData.status === 'alert') {
            dayElement.classList.add('alert');
            dayElement.style.backgroundColor = '#dc3545';
        } else {
            dayElement.style.backgroundColor = '#ffffff';
            dayElement.style.border = '1px solid var(--neutral-stroke-rest)';
        }

        // Texto do dia
        const diaText = document.createElement('span');
        diaText.textContent = dia;
        dayElement.appendChild(diaText);

        // Popover ao passar o mouse (se houver motivo)
        if (statusData.motivo && (statusData.status === 'warning' || statusData.status === 'alert')) {
            dayElement.style.cursor = 'pointer';
            dayElement.addEventListener('mouseenter', (e) => {
                showPopover(e, statusData.motivo);
            });
            dayElement.addEventListener('mouseleave', () => {
                hidePopover();
            });
        }

        calendar.appendChild(dayElement);
    }
}

function showPopover(event, motivo) {
    let popover = document.getElementById('historicoPopover');

    if (!popover) {
        popover = document.createElement('div');
        popover.id = 'historicoPopover';
        popover.className = 'historico-popover';
        document.body.appendChild(popover);
    }

    popover.textContent = motivo;
    popover.style.display = 'block';

    const rect = event.target.getBoundingClientRect();
    popover.style.top = (rect.top - 45) + 'px';
    popover.style.left = (rect.left + rect.width / 2 - popover.offsetWidth / 2) + 'px';
}

function hidePopover() {
    const popover = document.getElementById('historicoPopover');
    if (popover) {
        popover.style.display = 'none';
    }
}

const profileSelect = document.getElementById('profileSelect');
const topDashboardLink = document.getElementById('topDashboardLink');

function applyProfileMenu() {
    if (!profileSelect) return;

    const role = profileSelect.value;

    // Esconde todas as seções do menu
    document.querySelectorAll('.nav-section').forEach(section => {
        section.style.display = 'none';
    });

    // Mostra apenas as seções do perfil selecionado
    document.querySelectorAll('.role-' + role).forEach(section => {
        section.style.display = 'block';
    });

    // Ajusta o dashboard do topo (se existir)
    if (topDashboardLink) {
        if (role === 'employee') {
            topDashboardLink.dataset.page = 'dashboard';
        } else if (role === 'hr') {
            topDashboardLink.dataset.page = 'dashboard-rh';
        } else if (role === 'admin') {
            topDashboardLink.dataset.page = 'administracao';
        } else {
            topDashboardLink.dataset.page = 'dashboard-gestor';
        }
    }

    const defaultPages = {
        employee: 'dashboard',
        manager: 'dashboard-gestor',
        hr: 'dashboard-rh',
        admin: 'administracao'
    };

    const defaultPage = defaultPages[role] || 'dashboard';
    const defaultLink = document.querySelector(`.nav-link[data-page="${defaultPage}"]`);
    if (defaultLink && !defaultLink.classList.contains('active')) {
        defaultLink.click();
    }
}

// Quando o usuário trocar o perfil
profileSelect.addEventListener('change', applyProfileMenu);

// Quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar feature flags primeiro
    applyFeatureFlags();
    
    // mantém o que você já tinha
    if (typeof initHistoricoPresenca === 'function') {
        initHistoricoPresenca();
    }

    if (typeof renderHistoricoCalendar === 'function') {
        renderHistoricoCalendar();
    }

    // aplica o perfil corretamente ao abrir a página
    applyProfileMenu();

    // Inicializar administracao se existir
    initAdminPage();
    
    // Inicializa calendário se a feature estiver ativa
    if (isFeatureEnabled('calendarioFerias')) {
        generateCalendar();
    }

    // Inicializar Date Picker do Gestor
    initGestorDatePicker();
});


// ===============================
// DATE PICKER GESTOR - RELATÓRIOS
// ===============================
const MONTHS_GESTOR = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const MONTH_ABBREVIATIONS_GESTOR = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const pickersGestor = {
    startGestor: {
        input: null,
        calendar: null,
        selectedMonth: null,
        selectedYear: null,
        currentYear: new Date().getFullYear()
    },
    endGestor: {
        input: null,
        calendar: null,
        selectedMonth: null,
        selectedYear: null,
        currentYear: new Date().getFullYear()
    }
};

// Inicializar Date Picker do Gestor
function initGestorDatePicker() {
    // Verificar se os elementos existem
    const startInput = document.getElementById('startDateGestor');
    const endInput = document.getElementById('endDateGestor');
    
    if (!startInput || !endInput) {
        return; // Elementos não encontrados, sair silenciosamente
    }

    pickersGestor.startGestor.input = startInput;
    pickersGestor.startGestor.calendar = document.getElementById('calendarStartGestor');
    pickersGestor.endGestor.input = endInput;
    pickersGestor.endGestor.calendar = document.getElementById('calendarEndGestor');

    // Event listeners para abrir calendários
    pickersGestor.startGestor.input.addEventListener('click', () => toggleCalendarGestor('startGestor'));
    pickersGestor.endGestor.input.addEventListener('click', () => toggleCalendarGestor('endGestor'));

    // Event listeners para navegação de anos
    document.querySelectorAll('.prev-year-btn-gestor').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const picker = e.target.dataset.picker;
            changeYearGestor(picker, -1);
        });
    });

    document.querySelectorAll('.next-year-btn-gestor').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const picker = e.target.dataset.picker;
            changeYearGestor(picker, 1);
        });
    });

    // Botão Aplicar Filtro
    const filterBtn = document.getElementById('filterBtnGestor');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            const startValue = pickersGestor.startGestor.input.value;
            const endValue = pickersGestor.endGestor.input.value;
            
            if (!startValue || !endValue) {
                alert('Por favor, selecione o período inicial e final.');
                return;
            }

            // Aplicar filtro nos dados mockados
            aplicarFiltroRelatorios(startValue, endValue);
        });
    }

    // Fechar calendário ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.date-picker-wrapper-gestor')) {
            closeCalendarGestor('startGestor');
            closeCalendarGestor('endGestor');
        }
    });

    // Renderizar calendários
    renderCalendarGestor('startGestor');
    renderCalendarGestor('endGestor');
}

function toggleCalendarGestor(pickerName) {
    const calendar = pickersGestor[pickerName].calendar;
    
    // Fechar o outro calendário
    const otherPicker = pickerName === 'startGestor' ? 'endGestor' : 'startGestor';
    closeCalendarGestor(otherPicker);

    // Carregar seleção anterior se existir
    const input = pickersGestor[pickerName].input;
    if (input.value) {
        const parts = input.value.split('/');
        const monthIndex = MONTH_ABBREVIATIONS_GESTOR.indexOf(parts[0]);
        pickersGestor[pickerName].selectedMonth = monthIndex;
        pickersGestor[pickerName].selectedYear = parseInt(parts[1]);
        pickersGestor[pickerName].currentYear = pickersGestor[pickerName].selectedYear;
    }

    // Alternar classe ativa
    calendar.classList.toggle('active');
    renderCalendarGestor(pickerName);
}

function closeCalendarGestor(pickerName) {
    if (pickersGestor[pickerName] && pickersGestor[pickerName].calendar) {
        pickersGestor[pickerName].calendar.classList.remove('active');
    }
}

function renderCalendarGestor(pickerName) {
    const picker = pickersGestor[pickerName];
    if (!picker || !picker.calendar) return;

    const yearDisplay = picker.calendar.querySelector('.year-display-gestor');
    const monthsContainer = picker.calendar.querySelector('.dropdown-months-gestor');

    if (!yearDisplay || !monthsContainer) return;

    yearDisplay.textContent = picker.currentYear;
    monthsContainer.innerHTML = '';

    MONTHS_GESTOR.forEach((month, index) => {
        const btn = document.createElement('button');
        btn.className = 'dropdown-month-btn-gestor';
        btn.textContent = MONTH_ABBREVIATIONS_GESTOR[index];

        if (picker.selectedMonth === index && picker.selectedYear === picker.currentYear) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            picker.selectedMonth = index;
            picker.selectedYear = picker.currentYear;
            confirmSelectionGestor(pickerName);
        });

        monthsContainer.appendChild(btn);
    });
}

function changeYearGestor(pickerName, direction) {
    pickersGestor[pickerName].currentYear += direction;
    renderCalendarGestor(pickerName);
}

function confirmSelectionGestor(pickerName) {
    const picker = pickersGestor[pickerName];
    if (picker.selectedMonth !== null && picker.selectedYear !== null) {
        const formattedDate = `${MONTH_ABBREVIATIONS_GESTOR[picker.selectedMonth]}/${picker.selectedYear}`;
        picker.input.value = formattedDate;
        closeCalendarGestor(pickerName);
    }
}

// ===============================
// FILTRO DE DADOS - RELATÓRIOS GESTOR
// ===============================

// Função para converter string de data "Abr/2025" para objeto Date
function parseMonthYear(dateStr) {
    try {
        const [monthAbbr, year] = dateStr.split('/');
        const monthIndex = MONTH_ABBREVIATIONS_GESTOR.indexOf(monthAbbr);
        
        if (monthIndex === -1) {
            console.error('Mês não encontrado:', monthAbbr);
            return null;
        }
        
        return new Date(parseInt(year), monthIndex, 1);
    } catch (error) {
        console.error('Erro ao parsear data:', dateStr, error);
        return null;
    }
}

// Função para aplicar filtro nos dados e redesenhar gráficos
function aplicarFiltroRelatorios(dataInicio, dataFim) {
    console.log('🔍 Iniciando filtro:', { dataInicio, dataFim });
    
    try {
        const dataInicioObj = parseMonthYear(dataInicio);
        const dataFimObj = parseMonthYear(dataFim);

        if (!dataInicioObj || !dataFimObj) {
            alert('Erro ao processar as datas. Verifique o formato.');
            return;
        }

        if (dataInicioObj > dataFimObj) {
            alert('A data inicial deve ser anterior à data final!');
            return;
        }

        // Filtrar os dados mockados
        const mesesFiltrados = [];
        const mediaFiltrada = [];
        const colaboradoresDados = mockColaboradoresCompleto.map(col => ({
            nome: col.nome,
            dados: []
        }));

        console.log('📊 Processando dados mockados...');
        console.log('Total de meses disponíveis:', mockDadosEvolucaoCompleto.meses.length);

        mockDadosEvolucaoCompleto.meses.forEach((mes, index) => {
            const dataAtual = parseMonthYear(mes);
            
            if (dataAtual && dataAtual >= dataInicioObj && dataAtual <= dataFimObj) {
                mesesFiltrados.push(mes);
                mediaFiltrada.push(mockDadosEvolucaoCompleto.mediaEquipe[index]);
                
                // Adicionar dados dos colaboradores
                mockColaboradoresCompleto.forEach((col, colIndex) => {
                    colaboradoresDados[colIndex].dados.push(col.dados[index]);
                });
            }
        });

        console.log('✅ Meses filtrados:', mesesFiltrados);

        if (mesesFiltrados.length === 0) {
            alert('Nenhum dado encontrado para o período selecionado!');
            return;
        }

        // Atualizar dados filtrados
        dadosEvolucaoFiltrados = {
            meses: mesesFiltrados,
            mediaEquipe: mediaFiltrada
        };

        // Calcular média do período para cada colaborador
        colaboradoresFiltrados = colaboradoresDados.map(col => {
            const media = col.dados.reduce((a, b) => a + b, 0) / col.dados.length;
            return {
                nome: col.nome,
                aderencia: Math.round(media)
            };
        });

        console.log('📈 Dados filtrados preparados:', {
            meses: dadosEvolucaoFiltrados.meses,
            colaboradores: colaboradoresFiltrados
        });

        // Atualizar estatísticas
        console.log('📊 Atualizando estatísticas...');
        atualizarEstatisticasEquipe();

        // Redesenhar gráficos
        console.log('🎨 Redesenhando gráficos...');
        setTimeout(() => {
            try {
                desenharGraficoEvolucao();
                desenharGraficoComparativo();
                console.log('✅ Gráficos redesenhados com sucesso!');
            } catch (graphError) {
                console.error('❌ Erro ao desenhar gráficos:', graphError);
                alert('Erro ao desenhar os gráficos. Verifique o console para mais detalhes.');
            }
        }, 100);

        // Mostrar mensagem de sucesso
        const infoMsg = document.createElement('div');
        infoMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #107c10; color: white; padding: 15px 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000; animation: slideIn 0.3s ease;';
        infoMsg.innerHTML = `<strong>✓ Filtro aplicado!</strong><br>Período: ${dataInicio} até ${dataFim}<br>${mesesFiltrados.length} ${mesesFiltrados.length === 1 ? 'mês' : 'meses'} encontrado${mesesFiltrados.length === 1 ? '' : 's'}`;
        document.body.appendChild(infoMsg);
        
        setTimeout(() => {
            infoMsg.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => infoMsg.remove(), 300);
        }, 3000);

    } catch (error) {
        console.error('❌ Erro ao aplicar filtro:', error);
        console.error('Stack trace:', error.stack);
        alert('Erro ao processar o filtro: ' + error.message);
    }
}

// ===============================
// FIM DATE PICKER GESTOR
// ===============================


// ===============================
// MOCK DE DADOS
// ===============================
const mockAttendanceData = {
    luiz: {
        '2026-02-02': { hasPending: true }, // 1ª semana de fevereiro
        '2026-02-16': { hasPending: true }  // 3ª semana de fevereiro
    },
    ana: {
        '2026-02-09': { hasPending: true }  // exemplo diferente
    }
};

const mockRelatorioEmpresa = {
    periods: [
        "OUT 1", "OUT 2", "OUT 3", "OUT 4",
        "NOV 1", "NOV 2", "NOV 3", "NOV 4",
        "DEZ 1", "DEZ 2", "DEZ 3"
    ],
    areas: [
        {
            area: "ALPA SEDE",
            hc: 542,
            grupo: "",
            valores: [58, 52, 65, 48, 55, 42, 38, 45, 50, 60, 47]
        },
        {
            area: "LATAM",
            hc: 121,
            grupo: "BU's",
            valores: [72, 68, 78, 70, 75, 65, 62, 72, 75, 80, 72]
        },
        {
            area: "IDM",
            hc: 11,
            grupo: "BU's",
            valores: [45, 42, 52, 48, 50, 55, 38, 56, 54, 60, 48]
        },
        {
            area: "N&C",
            hc: 3,
            grupo: "BU's",
            valores: [35, 38, 48, 42, 45, 52, 40, 50, 46, 58, 44]
        },
        {
            area: "EUROPE",
            hc: 2,
            grupo: "BU's",
            valores: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
        },
        {
            area: "FINANÇAS",
            hc: 73,
            grupo: "CORP",
            valores: [88, 85, 90, 87, 92, 82, 80, 86, 88, 92, 89]
        },
        {
            area: "TECNOLOGIA",
            hc: 68,
            grupo: "CORP",
            valores: [62, 58, 68, 60, 65, 55, 52, 62, 65, 70, 62]
        },
        {
            area: "PEOPLE",
            hc: 59,
            grupo: "CORP",
            valores: [78, 75, 82, 78, 85, 72, 70, 78, 80, 86, 78]
        },
        {
            area: "MARKETING",
            hc: 52,
            grupo: "CORP",
            valores: [92, 88, 95, 90, 96, 85, 82, 90, 88, 94, 91]
        },
        {
            area: "JURÍDICO",
            hc: 31,
            grupo: "CORP",
            valores: [52, 48, 58, 50, 55, 45, 42, 52, 54, 60, 50]
        },
        {
            area: "SUPPLY CHAIN",
            hc: 123,
            grupo: "OP",
            valores: [68, 65, 72, 68, 70, 62, 60, 68, 70, 75, 68]
        },
        {
            area: "INDUSTRIAL",
            hc: 24,
            grupo: "OP",
            valores: [42, 45, 55, 48, 52, 58, 50, 46, 50, 60, 54]
        }
    ]
};

// Mock de dados de gestores por departamento (estrutura para API futura)
const mockGestoresPorDepartamento = {
    "ALPA SEDE": [
        { nome: "Carlos Silva", hc: 180, contribuicao: [62, 55, 68, 52, 58, 48, 45, 55, 58, 65, 53] },
        { nome: "Marina Costa", hc: 182, contribuicao: [48, 42, 55, 45, 50, 38, 35, 45, 48, 55, 42] },
        { nome: "Ricardo Santos", hc: 180, contribuicao: [58, 52, 65, 48, 55, 42, 38, 50, 52, 60, 48] }
    ],
    "LATAM": [
        { nome: "João Pereira", hc: 60, contribuicao: [72, 68, 78, 70, 75, 65, 62, 72, 75, 80, 72] },
        { nome: "Ana Oliveira", hc: 61, contribuicao: [68, 62, 72, 65, 70, 58, 55, 65, 68, 75, 65] }
    ],
    "IDM": [
        { nome: "Pedro Alves", hc: 11, contribuicao: [45, 42, 52, 48, 50, 55, 38, 56, 54, 60, 48] }
    ],
    "N&C": [
        { nome: "Lucia Ferreira", hc: 3, contribuicao: [35, 38, 48, 42, 45, 52, 40, 50, 46, 58, 44] }
    ],
    "EUROPE": [
        { nome: "Franz Mueller", hc: 2, contribuicao: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100] }
    ],
    "FINANÇAS": [
        { nome: "Roberto Costa", hc: 35, contribuicao: [88, 85, 90, 87, 92, 82, 80, 86, 88, 92, 89] },
        { nome: "Patricia Gomes", hc: 38, contribuicao: [85, 82, 88, 85, 90, 80, 78, 84, 86, 90, 87] }
    ],
    "TECNOLOGIA": [
        { nome: "Bruno Oliveira", hc: 34, contribuicao: [65, 60, 70, 62, 68, 55, 52, 65, 68, 75, 65] },
        { nome: "Daniela Lima", hc: 34, contribuicao: [58, 52, 65, 55, 62, 48, 45, 58, 62, 70, 58] }
    ],
    "PEOPLE": [
        { nome: "Vanessa Teixeira", hc: 30, contribuicao: [80, 77, 85, 80, 88, 72, 70, 80, 82, 88, 80] },
        { nome: "Felipe Martins", hc: 29, contribuicao: [75, 72, 80, 75, 82, 68, 65, 75, 78, 85, 75] }
    ],
    "MARKETING": [
        { nome: "Camila Santos", hc: 26, contribuicao: [92, 88, 95, 90, 96, 85, 82, 90, 88, 94, 91] },
        { nome: "Diego Rocha", hc: 26, contribuicao: [88, 85, 92, 87, 94, 82, 80, 88, 86, 92, 88] }
    ],
    "JURÍDICO": [
        { nome: "Flávio Barbosa", hc: 31, contribuicao: [52, 48, 58, 50, 55, 45, 42, 52, 54, 60, 50] }
    ],
    "SUPPLY CHAIN": [
        { nome: "Gustavo Ferreira", hc: 62, contribuicao: [70, 67, 75, 70, 72, 62, 60, 70, 72, 78, 70] },
        { nome: "Isabela Mendes", hc: 61, contribuicao: [65, 62, 70, 65, 68, 58, 55, 65, 68, 75, 65] }
    ],
    "INDUSTRIAL": [
        { nome: "Julio Correa", hc: 24, contribuicao: [42, 45, 55, 48, 52, 58, 50, 46, 50, 60, 54] }
    ]
};

// Mock de dados de relatório por diretoria
const mockRelatorioAderenciaAreas = [
    {
        diretoria: "TI",
        colaboradores: 80,
        aderenciaLiquida: 91,
        aderenciaPosJustificativas: 95,
        pendencias: 42
    },
    {
        diretoria: "Comercial",
        colaboradores: 120,
        aderenciaLiquida: 76,
        aderenciaPosJustificativas: 78,
        pendencias: 98
    },
    {
        diretoria: "RH",
        colaboradores: 40,
        aderenciaLiquida: 88,
        aderenciaPosJustificativas: 100,
        pendencias: 18
    },
    {
        diretoria: "Operações",
        colaboradores: 180,
        aderenciaLiquida: 84,
        aderenciaPosJustificativas: 86,
        pendencias: 160
    },
    {
        diretoria: "Financeiro",
        colaboradores: 60,
        aderenciaLiquida: 82,
        aderenciaPosJustificativas: 90,
        pendencias: 52
    },
    {
        diretoria: "Jurídico",
        colaboradores: 30,
        aderenciaLiquida: 87,
        aderenciaPosJustificativas: 92,
        pendencias: 25
    }
];

// Mock de dados de relatório de justificativas de ausência
const mockRelatorioJustificativas = [
    {
        tipoJustificativa: "Férias",
        qtdeOcorrencias: 45,
        percentualTotal: 28
    },
    {
        tipoJustificativa: "Atestado Médico",
        qtdeOcorrencias: 38,
        percentualTotal: 23
    },
    {
        tipoJustificativa: "Decisão Externa (viagem, visita técnica, evento)",
        qtdeOcorrencias: 22,
        percentualTotal: 14
    },
    {
        tipoJustificativa: "Falta de marcação / Esquecimento",
        qtdeOcorrencias: 30,
        percentualTotal: 19
    },
    {
        tipoJustificativa: "Falta sem justificativa",
        qtdeOcorrencias: 27,
        percentualTotal: 16
    }
];

// Mock de dados de status das justificativas por gestor
// Mock de dados de Ocorr\u00eancias e n\u00e3o Conformidades da Equipe
const mockOcorrenciasEquipe = [
    {
        data: "15/06/2025",
        colaborador: "Maria Santos",
        tipo: "AUS\u00caNCIA",
        descricao: "Aus\u00eancia n\u00e3o justificada",
        gravidade: "ALTA",
        status: "PENDENTE"
    },
    {
        data: "14/06/2025",
        colaborador: "Pedro Alves",
        tipo: "ATRASO",
        descricao: "Chegada \u00e0s 09:45 (3\u00aa ocorr\u00eancia)",
        gravidade: "M\u00c9DIA",
        status: "EM AN\u00c1LISE"
    },
    {
        data: "13/06/2025",
        colaborador: "Ana Costa",
        tipo: "JUSTIFICATIVA",
        descricao: "Consulta m\u00e9dica - Atestado anexado",
        gravidade: "BAIXA",
        status: "APROVADO"
    },
    {
        data: "12/06/2025",
        colaborador: "Carlos Silva",
        tipo: "HORA EXTRA",
        descricao: "Excedeu limite de banco de horas (2h15m)",
        gravidade: "M\u00c9DIA",
        status: "AGUARDANDO GESTOR"
    },
    {
        data: "11/06/2025",
        colaborador: "Julia Ferreira",
        tipo: "AUS\u00caNCIA",
        descricao: "Aus\u00eancia justificada por atestado",
        gravidade: "BAIXA",
        status: "APROVADO"
    },
    {
        data: "10/06/2025",
        colaborador: "Marcos Santos",
        tipo: "ATRASO",
        descricao: "Chegada \u00e0s 10:15",
        gravidade: "BAIXA",
        status: "EM AN\u00c1LISE"
    }
];

// 🚩 DADOS SIMPLIFICADOS: Semanas não conformes com justificativa pendente
const mockSemanasNaoConformesSimplificado = [
    {
        colaborador: "Maria Santos",
        semana: "06/01 - 12/01",
        status: "Não Conforme",
        justificativa: "Pendente"
    },
    {
        colaborador: "Maria Santos",
        semana: "13/01 - 19/01",
        status: "Não Conforme",
        justificativa: "Pendente"
    },
    {
        colaborador: "Pedro Alves",
        semana: "30/12 - 05/01",
        status: "Não Conforme",
        justificativa: "Pendente"
    },
    {
        colaborador: "Carlos Silva",
        semana: "27/01 - 02/02",
        status: "Não Conforme",
        justificativa: "Pendente"
    }
];

// Mock de dados de status das justificativas por gestor
const mockRelatorioStatusJustificativas = [
    {
        gestor: "Ana Souza",
        diretoria: "RH",
        totalAusencias: 8,
        justificadas: 8,
        percentualJustificadas: 100,
        pendenteAnalise: 0
    },
    {
        gestor: "João Mendes",
        diretoria: "Comercial",
        totalAusencias: 15,
        justificadas: 11,
        percentualJustificadas: 73,
        pendenteAnalise: 4
    },
    {
        gestor: "Carla Ribeiro",
        diretoria: "TI",
        totalAusencias: 10,
        justificadas: 10,
        percentualJustificadas: 100,
        pendenteAnalise: 0
    },
    {
        gestor: "Marcos Silva",
        diretoria: "Operações",
        totalAusencias: 20,
        justificadas: 16,
        percentualJustificadas: 80,
        pendenteAnalise: 4
    },
    {
        gestor: "Paulo Almeida",
        diretoria: "Financeiro",
        totalAusencias: 9,
        justificadas: 7,
        percentualJustificadas: 77,
        pendenteAnalise: 2
    }
];

// JSON mockado simulando retorno da API
const dadosApiMock = {
    colaborador: "Luiz Silva",
    semanas: [
        {
            num: 1,
            periodo: "19/01/2026 → 23/01/2026",
            justificada: false,
            justificacaoSemanal: null,
            dias: [
                { dia: "Seg", data: "19/01", status: "presencial", justificacao: null },
                { dia: "Ter", data: "20/01", status: "presencial", justificacao: null },
                { dia: "Qua", data: "21/01", status: "remoto", justificacao: null },
                { dia: "Qui", data: "22/01", status: "presencial", justificacao: null },
                { dia: "Sex", data: "23/01", status: "remoto", justificacao: null }
            ]
        },
        {
            num: 2,
            periodo: "12/01/2026 → 16/01/2026",
            justificada: true,
            justificacaoSemanal: "Problemas operacionais resolvidos",
            dias: [
                { dia: "Seg", data: "12/01", status: "ausente", justificacao: null, justificacaoColaborador: "Atestado medico enviado" },
                { dia: "Ter", data: "13/01", status: "presencial", justificacao: null },
                { dia: "Qua", data: "14/01", status: "ausente", justificado: true, justificacao: "Trabalho externo" },
                { dia: "Qui", data: "15/01", status: "remoto", justificacao: null },
                { dia: "Sex", data: "16/01", status: "presencial", justificacao: null }
            ]
        },
        {
            num: 3,
            periodo: "05/01/2026 → 09/01/2026",
            justificada: false,
            justificacaoSemanal: null,
            dias: [
                { dia: "Seg", data: "05/01", status: "ausente", justificacao: null, justificacaoColaborador: "Atestado medico enviado" },
                { dia: "Ter", data: "06/01", status: "remoto", justificacao: null, justificacaoColaborador: "Reuniao externa com fornecedor" },
                { dia: "Qua", data: "07/01", status: "ausente", justificacao: null, justificacaoColaborador: "Consulta medica reagendada" },
                { dia: "Qui", data: "08/01", status: "remoto", justificacao: null },
                { dia: "Sex", data: "09/01", status: "ausente", justificacao: null }
            ]
        },
        {
            num: 4,
            periodo: "29/12/2025 → 02/01/2026",
            justificada: false,
            justificacaoSemanal: null,
            dias: [
                { dia: "Seg", data: "29/12", status: "presencial", justificacao: null },
                { dia: "Ter", data: "30/12", status: "presencial", justificacao: null },
                { dia: "Qua", data: "31/12", status: "remoto", justificacao: null },
                { dia: "Qui", data: "01/01", status: "remoto", justificacao: null },
                { dia: "Sex", data: "02/01", status: "remoto", justificacao: null }
            ]
        }
    ]
};





const mockAlertDays = [4, 19]; // fevereiro


// Mock de verificação de inconformidade precisa ser deletado depois
function isMockInconformity(weekStartDate) {
    const month = weekStartDate.getMonth(); // 0 = Jan, 1 = Fev
    if (month !== 1) return false;

    const firstDayOfMonth = new Date(
        weekStartDate.getFullYear(),
        1,
        1
    );

    const weekNumber =
        Math.floor(
            (weekStartDate - getWeekStart(firstDayOfMonth)) /
            (7 * 24 * 60 * 60 * 1000)
        ) + 1;

    return weekNumber === 1 || weekNumber === 3;
}




// ===============================
// ELEMENTOS
// ===============================
const employeeSelect = document.getElementById('employeeFilter');
const dateInput = document.getElementById('dateFilter');
const calendar = document.querySelector('.week-calendar');
const calendarGrid = document.getElementById('calendarGrid');
const datepicker = document.getElementById('datepicker');
const calendarTitle = document.getElementById('calendarTitle');

// ===============================
// ESTADO
// ===============================
let selectedEmployee = null;
let selectedDate = null;
let currentMonth = new Date();

// ===============================
// UTILITÁRIOS
// ===============================
function formatISO(date) {
    return date.toISOString().split('T')[0];
}

function updateCalendarTitle(date) {
    calendarTitle.textContent = date.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric'
    });
}


function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay() || 7;
    d.setDate(d.getDate() - day + 1);
    return d;
}

function getWeekKey(date) {
    return formatISO(getWeekStart(date));
}


function getWeeksOfMonth(year, month) {
    const weeks = [];
    let date = new Date(year, month, 1);

    while (date.getMonth() === month) {
        const start = getWeekStart(date);
        const key = formatISO(start);

        if (!weeks.some(w => w.key === key)) {
            weeks.push({ start, key });
        }

        date.setDate(date.getDate() + 7);
    }

    return weeks;
}

// Modal removida - funcionalidade descontinuada

function getAderenciaClass(percent) {
    if (percent === 100) return 'excellent';
    if (percent >= 90) return 'good';
    return 'critical';
}

// ===== REQUISIÇÃO REST PARA GESTORES (Preparado para API) =====
async function fetchGestoresData(departamento) {
    /**
     * Função preparada para integração com API real
     * Atualmente usa dados mockados locais
     * 
     * Exemplo de integração futura com API:
     * const response = await fetch(`/api/relatorios/gestores?departamento=${departamento}`);
     * const data = await response.json();
     * return data;
     */
    
    // Simular delay de requisição (será substituído por fetch real)
    return new Promise((resolve) => {
        setTimeout(() => {
            const gestores = mockGestoresPorDepartamento[departamento] || [];
            resolve(gestores);
        }, 300); // 300ms de delay simulado
    });
}

// Rastrear quais departamentos estão expandidos
const expandedDepartamentos = new Set();

// Renderiza tabela de Aderência por Diretoria
function renderRelatorioAderenciaAreas(data) {
    const tbody = document.getElementById('relatorioAderenciaTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Calcular totais
    let totalColaboradores = 0;
    let totalPendencias = 0;
    let totalAderenciaLiquida = 0;
    let totalAderenciaPosJustificativas = 0;
    
    data.forEach(area => {
        totalColaboradores += area.colaboradores;
        totalPendencias += area.pendencias;
        totalAderenciaLiquida += area.aderenciaLiquida;
        totalAderenciaPosJustificativas += area.aderenciaPosJustificativas;
    });
    
    // Calcular médias para as colunas de percentual
    const mediaAderenciaLiquida = Math.round(totalAderenciaLiquida / data.length);
    const mediaAderenciaPosJustificativas = Math.round(totalAderenciaPosJustificativas / data.length);
    
    // Adicionar linha de TOTAL no início
    const trTotal = document.createElement('tr');
    trTotal.style.fontWeight = 'bold';
    trTotal.style.backgroundColor = '#f0f0f0';
    trTotal.style.borderTop = '2px solid #555555';
    // trTotal.style.borderBottom = '3px solid #555555';
    
    const cellTotalLabel = document.createElement('td');
    cellTotalLabel.className = 'department';
    cellTotalLabel.textContent = 'TOTAL';
    trTotal.appendChild(cellTotalLabel);
    
    const cellTotalColaboradores = document.createElement('td');
    cellTotalColaboradores.textContent = totalColaboradores;
    trTotal.appendChild(cellTotalColaboradores);
    
    const cellTotalAderenciaLiquida = document.createElement('td');
    const totalLiquidaClass = getAderenciaClass(mediaAderenciaLiquida);
    cellTotalAderenciaLiquida.className = `gestor-data ${totalLiquidaClass}`;
    cellTotalAderenciaLiquida.innerHTML = `<span class="percent">${mediaAderenciaLiquida}%</span>`;
    trTotal.appendChild(cellTotalAderenciaLiquida);
    
    const cellTotalAderenciaPosJustificativas = document.createElement('td');
    const totalPosClass = getAderenciaClass(mediaAderenciaPosJustificativas);
    cellTotalAderenciaPosJustificativas.className = `gestor-data ${totalPosClass}`;
    cellTotalAderenciaPosJustificativas.innerHTML = `<span class="percent">${mediaAderenciaPosJustificativas}%</span>`;
    trTotal.appendChild(cellTotalAderenciaPosJustificativas);
    
    const cellTotalPendencias = document.createElement('td');
    cellTotalPendencias.textContent = totalPendencias;
    trTotal.appendChild(cellTotalPendencias);
    
    // Preparada linha de TOTAL (será adicionada ao final)
    
    // Adicionar linhas de dados
    data.forEach(area => {
        const tr = document.createElement('tr');
        
        // Determinar classe de cor baseado na aderência
        const aderenciaLiquidaClass = getAderenciaClass(area.aderenciaLiquida);
        const aderenciaPosClass = getAderenciaClass(area.aderenciaPosJustificativas);
        
        // Célula Diretoria
        const cellDiretoria = document.createElement('td');
        cellDiretoria.className = 'department';
        cellDiretoria.textContent = area.diretoria;
        tr.appendChild(cellDiretoria);
        
        // Célula Colaboradores
        const cellColaboradores = document.createElement('td');
        cellColaboradores.textContent = area.colaboradores;
        tr.appendChild(cellColaboradores);
        
        // Célula Aderência Líquida
        const cellAderenciaLiquida = document.createElement('td');
        cellAderenciaLiquida.className = `gestor-data ${aderenciaLiquidaClass}`;
        cellAderenciaLiquida.innerHTML = `<span class="percent">${area.aderenciaLiquida}%</span>`;
        tr.appendChild(cellAderenciaLiquida);
        
        // Célula Aderência Após Justificativas
        const cellAderenciaPos = document.createElement('td');
        cellAderenciaPos.className = `gestor-data ${aderenciaPosClass}`;
        cellAderenciaPos.innerHTML = `<span class="percent">${area.aderenciaPosJustificativas}%</span>`;
        tr.appendChild(cellAderenciaPos);
        
        // Célula Pendências
        const cellPendencias = document.createElement('td');
        cellPendencias.textContent = area.pendencias;
        tr.appendChild(cellPendencias);
        
        tbody.appendChild(tr);
    });

    // Adicionar linha TOTAL no final
    tbody.appendChild(trTotal);
}

// Renderiza tabela de Justificativas de Ausência
function renderRelatorioJustificativas(data) {
    const tbody = document.getElementById('relatorioJustificativasTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Calcular total de ocorrências
    const totalOcorrencias = data.reduce((sum, item) => sum + item.qtdeOcorrencias, 0);
    
    data.forEach(justificativa => {
        const tr = document.createElement('tr');
        
        // Célula Tipo de Justificativa
        const cellTipo = document.createElement('td');
        cellTipo.className = 'department';
        cellTipo.textContent = justificativa.tipoJustificativa;
        tr.appendChild(cellTipo);
        
        // Célula Quantidade de Ocorrências
        const cellQtde = document.createElement('td');
        cellQtde.textContent = justificativa.qtdeOcorrencias;
        tr.appendChild(cellQtde);
        
        // Célula % sobre Total
        const cellPercentual = document.createElement('td');
        cellPercentual.innerHTML = `<span class="percent">${justificativa.percentualTotal}%</span>`;
        tr.appendChild(cellPercentual);
        
        tbody.appendChild(tr);
    });
}

// Renderiza tabela de Status das Justificativas por Gestor
function renderRelatorioStatusJustificativas(data) {
    const tbody = document.getElementById('relatorioStatusJustificativasTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Calcular totais
    let totalAusencias = 0;
    let totalJustificadas = 0;
    let totalPendentes = 0;
    
    data.forEach(gestor => {
        totalAusencias += gestor.totalAusencias;
        totalJustificadas += gestor.justificadas;
        totalPendentes += gestor.pendenteAnalise;
    });
    
    // Calcular percentual total de justificadas
    const percentualTotalJustificadas = totalAusencias > 0 ? 
        Math.round((totalJustificadas / totalAusencias) * 100) : 0;
    
    // Adicionar linha de TOTAL no início
    const trTotal = document.createElement('tr');
    trTotal.style.fontWeight = 'bold';
    trTotal.style.backgroundColor = '#f0f0f0';
    trTotal.style.borderTop = '2px solid #555555';
    // trTotal.style.borderBottom = '3px solid #555555';
    
    const cellTotalLabel = document.createElement('td');
    cellTotalLabel.className = 'department';
    cellTotalLabel.textContent = 'TOTAL';
    trTotal.appendChild(cellTotalLabel);
    
    const cellTotalDiretoria = document.createElement('td');
    cellTotalDiretoria.textContent = '-';
    trTotal.appendChild(cellTotalDiretoria);
    
    const cellTotalAusencias = document.createElement('td');
    cellTotalAusencias.textContent = totalAusencias;
    trTotal.appendChild(cellTotalAusencias);
    
    const cellTotalJustificadas = document.createElement('td');
    cellTotalJustificadas.textContent = totalJustificadas;
    trTotal.appendChild(cellTotalJustificadas);
    
    const cellTotalPercentual = document.createElement('td');
    const percentualClass = getAderenciaClass(percentualTotalJustificadas);
    cellTotalPercentual.className = `gestor-data ${percentualClass}`;
    cellTotalPercentual.innerHTML = `<span class="percent">${percentualTotalJustificadas}%</span>`;
    trTotal.appendChild(cellTotalPercentual);
    
    const cellTotalPendentes = document.createElement('td');
    cellTotalPendentes.textContent = totalPendentes;
    trTotal.appendChild(cellTotalPendentes);
    
    // Preparada linha de TOTAL (será adicionada ao final)
    
    // Adicionar linhas de dados
    data.forEach(gestor => {
        const tr = document.createElement('tr');
        
        // Determinar classe de cor baseado na % de justificadas
        const percentualClass = getAderenciaClass(gestor.percentualJustificadas);
        
        // Célula Gestor
        const cellGestor = document.createElement('td');
        cellGestor.className = 'department';
        cellGestor.textContent = gestor.gestor;
        tr.appendChild(cellGestor);
        
        // Célula Diretoria
        const cellDiretoria = document.createElement('td');
        cellDiretoria.textContent = gestor.diretoria;
        tr.appendChild(cellDiretoria);
        
        // Célula Total de Ausências
        const cellTotal = document.createElement('td');
        cellTotal.textContent = gestor.totalAusencias;
        tr.appendChild(cellTotal);
        
        // Célula Justificadas
        const cellJustificadas = document.createElement('td');
        cellJustificadas.textContent = gestor.justificadas;
        tr.appendChild(cellJustificadas);
        
        // Célula % Justificadas
        const cellPercentual = document.createElement('td');
        cellPercentual.className = `gestor-data ${percentualClass}`;
        cellPercentual.innerHTML = `<span class="percent">${gestor.percentualJustificadas}%</span>`;
        tr.appendChild(cellPercentual);
        
        // Célula Pendentes de Análise
        const cellPendentes = document.createElement('td');
        cellPendentes.textContent = gestor.pendenteAnalise;
        tr.appendChild(cellPendentes);
        
        tbody.appendChild(tr);
    });

    // Adicionar linha TOTAL no final
    tbody.appendChild(trTotal);
}

//Render Tabela Relatório com expansão de gestores
function renderRelatorioEmpresa(data) {
    const table = document.getElementById('aderenciaTable');
    const thead = table.querySelector('thead');
    thead.innerHTML = `
        <tr>
            <th style="width: 200px;">BU / Área</th>
            <th style="width: 60px;"># HC</th>
            ${data.periods.map(p => `<th>${p}</th>`).join('')}
        </tr>
    `;

    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    let grupoAtual = null;

    data.areas.forEach((area, index) => {
        // Pula separador se grupo estiver vazio
        if (area.grupo && area.grupo !== grupoAtual) {
            grupoAtual = area.grupo;
            const separador = document.createElement('tr');
            separador.innerHTML = `
                <td colspan="${2 + data.periods.length}" class="grupo-header">${grupoAtual}</td>
            `;
            tbody.appendChild(separador);
        }

        // ROW PRINCIPAL DO DEPARTAMENTO
        const tr = document.createElement('tr');
        tr.className = 'area-row';
        tr.dataset.area = area.area;
        tr.dataset.index = index;
        
        const departmentCell = document.createElement('td');
        departmentCell.className = 'department';
        departmentCell.innerHTML = `
            <span class="expand-btn" data-area="${area.area}">+</span>
            <span class="area-name">${area.area}</span>
        `;
        tr.appendChild(departmentCell);

        const hcCell = document.createElement('td');
        hcCell.textContent = area.hc;
        tr.appendChild(hcCell);

        area.valores.forEach(valor => {
            const cls = getAderenciaClass(valor);
            
            const td = document.createElement('td');
            td.className = cls;
            td.innerHTML = `
                <span class="percent">
                    ${valor}%
                </span>
            `;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);

        // Adicionar event listener ao botão de expansão
        const expandBtn = departmentCell.querySelector('.expand-btn');
        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleGestoresExpansion(area.area, data, index);
        });
    });
}

// Função para expandir/retrair gestores
async function toggleGestoresExpansion(departamento, data, rowIndex) {
    const tbody = document.querySelector('#aderenciaTable tbody');
    const expandBtn = document.querySelector(`.expand-btn[data-area="${departamento}"]`);
    
    // Verificar se já está expandido
    const isExpanded = expandedDepartamentos.has(departamento);
    
    if (isExpanded) {
        // RETRAIR
        expandBtn.textContent = '+';
        expandBtn.classList.remove('expanded');
        expandedDepartamentos.delete(departamento);
        
        // Animar remoção das linhas de gestores
        const gestorRows = document.querySelectorAll(`[data-parent-area="${departamento}"]`);
        gestorRows.forEach(row => {
            row.classList.add('removing');
            setTimeout(() => row.remove(), 300);
        });
    } else {
        // EXPANDIR
        expandBtn.textContent = '−';
        expandBtn.classList.add('expanded');
        expandedDepartamentos.add(departamento);
        
        // Mostrar loading
        expandBtn.textContent = '⋯';
        
        try {
            // Fazer requisição REST
            const gestores = await fetchGestoresData(departamento);
            expandBtn.textContent = '−';
            
            // Encontrar a row pai
            const areaRow = expandBtn.closest('tr');
            const periods = data.periods.length;
            
            // Adicionar linhas de gestores após a área
            gestores.forEach((gestor, gestorIndex) => {
                const gestorRow = document.createElement('tr');
                gestorRow.className = 'gestor-row';
                gestorRow.dataset.parentArea = departamento;
                gestorRow.dataset.gestor = gestor.nome;
                
                // Célula com nome do gestor
                const gestorNameCell = document.createElement('td');
                gestorNameCell.className = 'gestor-name';
                gestorNameCell.innerHTML = `
                    <span class="indent">↳ ${gestor.nome}</span>
                `;
                gestorRow.appendChild(gestorNameCell);
                
                // Célula com HC do gestor
                const gestorHcCell = document.createElement('td');
                gestorHcCell.textContent = gestor.hc;
                gestorHcCell.className = 'gestor-hc';
                gestorRow.appendChild(gestorHcCell);
                
                // Célula de contribuição por período
                gestor.contribuicao.forEach(valor => {
                    const cls = getAderenciaClass(valor);
                    
                    const td = document.createElement('td');
                    td.className = `${cls} gestor-data`;
                    td.innerHTML = `
                        <span class="percent">
                            ${valor}%
                        </span>
                    `;
                    gestorRow.appendChild(td);
                });
                
                // Inserir após a row da área (ou após o último gestor anterior)
                if (gestorIndex === 0) {
                    areaRow.after(gestorRow);
                } else {
                    const lastGestor = document.querySelector(`[data-parent-area="${departamento}"][data-gestor="${gestores[gestorIndex - 1].nome}"]`);
                    lastGestor.after(gestorRow);
                }
            });
        } catch (error) {
            console.error('Erro ao carregar gestores:', error);
            expandBtn.textContent = '+';
            expandBtn.classList.remove('expanded');
            expandedDepartamentos.delete(departamento);
            alert('Erro ao carregar dados dos gestores');
        }
    }
}



// Função para renderizar tabela simplificada de Semanas Não Conformes
function renderTabelaSemanasNaoConformes(data) {
    const tbody = document.getElementById('teamTableBody');
    const tbodyRh = document.getElementById('teamTableBodyRh');
    
    if (!tbody && !tbodyRh) return;
    
    let html = '';
    
    data.forEach(item => {
        html += `
            <tr>
                <td class="department">${item.colaborador}</td>
                <td class="department">${item.semana}</td>
                <td><span class="badge badge-nao-conforme">Não Conforme</span></td>
                <td><span class="badge badge-pendente">${item.justificativa}</span></td>
            </tr>
        `;
    });
    
    if (tbody) tbody.innerHTML = html;
    if (tbodyRh) tbodyRh.innerHTML = html;
}

// Função para renderizar tabela de Ocorrências (formato antigo)
function renderOcorrenciasEquipe(data) {
    // Renderiza na tabela do Gestor
    const tbody = document.getElementById('teamTableBody');
    if (tbody) {
        tbody.innerHTML = '';
        renderTableRows(tbody, data);
    }
    
    // Renderiza na tabela do RH
    const tbodyRh = document.getElementById('teamTableBodyRh');
    if (tbodyRh) {
        tbodyRh.innerHTML = '';
        renderTableRows(tbodyRh, data);
    }
}

// Função auxiliar para renderizar as linhas
function renderTableRows(tbody, data) {
    data.forEach(ocorrencia => {
        const row = document.createElement('tr');
        
        // Função para obter classe CSS baseada no tipo
        const getTipoBadgeClass = (tipo) => {
            const tipoMap = {
                'AUSÊNCIA': 'badge-ausencia',
                'ATRASO': 'badge-atraso',
                'JUSTIFICATIVA': 'badge-justificativa',
                'HORA EXTRA': 'badge-hora-extra'
            };
            return tipoMap[tipo] || 'badge';
        };
        
        // Função para obter classe CSS baseada na gravidade
        const getGravidadeBadgeClass = (gravidade) => {
            const gravidadeMap = {
                'ALTA': 'badge-gravidade-alta',
                'MÉDIA': 'badge-gravidade-media',
                'BAIXA': 'badge-gravidade-baixa'
            };
            return gravidadeMap[gravidade] || 'badge';
        };
        
        // Função para obter classe CSS baseada no status
        const getStatusBadgeClass = (status) => {
            const statusMap = {
                'PENDENTE': 'badge-pendente',
                'EM ANÁLISE': 'badge-analise',
                'APROVADO': 'badge-aprovado',
                'AGUARDANDO GESTOR': 'badge-aguardando'
            };
            return statusMap[status] || 'badge';
        };
        
        row.innerHTML = `
            <td class="department">${ocorrencia.data}</td>
            <td class="department">${ocorrencia.colaborador}</td>
            <td><span class="badge ${getTipoBadgeClass(ocorrencia.tipo)}">${ocorrencia.tipo}</span></td>
            <td class="department">${ocorrencia.descricao}</td>
            <td><span class="badge ${getGravidadeBadgeClass(ocorrencia.gravidade)}">${ocorrencia.gravidade}</span></td>
            <td><span class="badge ${getStatusBadgeClass(ocorrencia.status)}">${ocorrencia.status}</span></td>
        `;
        
        tbody.appendChild(row);
    });
}

// chamada inicial
renderRelatorioEmpresa(mockRelatorioEmpresa);
renderRelatorioAderenciaAreas(mockRelatorioAderenciaAreas);
renderRelatorioJustificativas(mockRelatorioJustificativas);
renderRelatorioStatusJustificativas(mockRelatorioStatusJustificativas);

// 🚩 Renderiza tabela simplificada ou completa baseado na Feature Flag
if (isFeatureEnabled('tabelaOcorrenciasSimplificada')) {
    renderTabelaSemanasNaoConformes(mockSemanasNaoConformesSimplificado);
} else {
    renderOcorrenciasEquipe(mockOcorrenciasEquipe);
}

// Renderiza KPIs e análise consolidada na aba Relatórios
function renderRelatorioKPIs(data, gestoresPorDept) {
    if (!data || !data.areas) return;

    // Último período index
    const lastIdx = data.periods.length - 1;

    // Cálculo ponderado por HC da aderência no último período
    let totalHc = 0;
    let somaPonderada = 0;

    data.areas.forEach(a => {
        const val = a.valores && a.valores.length > 0 ? a.valores[a.valores.length - 1] : 0;
        totalHc += a.hc || 0;
        somaPonderada += (a.hc || 0) * val;
    });

    const aderenciaGeral = totalHc ? Math.round(somaPonderada / totalHc) : 0;

    // Departamentos abaixo da meta (85%)
    const meta = 85;
    const departamentosAbaixo = data.areas.filter(a => {
        const val = a.valores && a.valores.length > 0 ? a.valores[a.valores.length - 1] : 0;
        return val < meta;
    }).map(a => ({ area: a.area, valor: a.valores[a.valores.length - 1] }));

    // Gestores regulares (média do gestor >= 85)
    let totalGestores = 0;
    let gestoresRegulares = 0;

    Object.keys(gestoresPorDept).forEach(dept => {
        gestoresPorDept[dept].forEach(g => {
            totalGestores++;
            const avg = g.contribuicao && g.contribuicao.length > 0 ?
                g.contribuicao.reduce((s, v) => s + v, 0) / g.contribuicao.length : 0;
            if (avg >= meta) gestoresRegulares++;
        });
    });

    const pctGestoresRegulares = totalGestores ? Math.round((gestoresRegulares / totalGestores) * 100) : 0;

    // Taxa de justificativa — usando valor mock/negócio informado
    const taxaJustificativa = 89; // valor informado na conversa

    // Construir lista de gestores com média e ordenar (desc)
    const gestoresList = [];
    Object.keys(gestoresPorDept).forEach(d => {
        gestoresPorDept[d].forEach(g => {
            const avg = g.contribuicao && g.contribuicao.length > 0 ?
                g.contribuicao.reduce((s, v) => s + v, 0) / g.contribuicao.length : 0;
            gestoresList.push({ nome: g.nome, dept: d, avg: Math.round(avg) });
        });
    });

    gestoresList.sort((a, b) => b.avg - a.avg);

    const topGestores = gestoresList.slice(0, 5);
    const belowSorted = departamentosAbaixo.slice().sort((a, b) => a.valor - b.valor);
    const causasTexto = 'Férias, Atestados Médicos';

    // Preencher DOM - elementos novos do grid
    const elAder = document.getElementById('kpiAderencia');
    const elJust = document.getElementById('kpiJustificativa');
    const elGest = document.getElementById('kpiGestoresRegulares');
    const elGestRegularesLista = document.getElementById('kpiGestoresRegularesLista');
    const elGestTop = document.getElementById('kpiGestoresTop');
    const elCausas = document.getElementById('kpiCausas');
    const elPendentes = document.getElementById('kpiPendentesList');

    if (elAder) elAder.textContent = `${aderenciaGeral}%`;
    if (elJust) elJust.textContent = `${taxaJustificativa}%`;
    if (elGest) elGest.textContent = `${pctGestoresRegulares}%`;

    // Linha 1 - Top 5 gestores regulares
    if (elGestRegularesLista) {
        const topRegulares = gestoresList.filter(g => g.avg >= meta).slice(0, 5);
        elGestRegularesLista.innerHTML = `<ul>${topRegulares.map(g => `<li><strong>${g.nome}</strong> <span class="kpi-high">${g.avg}%</span></li>`).join('')}</ul>`;
    }

    // Linha 2 - Ranking completo de gestores (melhores → piores)
    if (elGestTop) {
        elGestTop.innerHTML = `<ul>${gestoresList.map(g => `<li><strong>${g.nome}</strong> <span class="${g.avg >= meta ? 'kpi-high' : 'kpi-low'}">${g.avg}%</span> <small>(${g.dept})</small></li>`).join('')}</ul>`;
    }

    // Linha 3 - Causas e Diretorias abaixo da meta
    if (elCausas) elCausas.textContent = causasTexto;
    
    if (elPendentes) {
        const mostrar = belowSorted.slice(0, 6);
        const more = Math.max(0, belowSorted.length - mostrar.length);
        elPendentes.innerHTML = `<ul>${mostrar.map(d => `<li><strong>${d.area}</strong> <span class="kpi-low">${d.valor}%</span></li>`).join('')}${more ? `<li><em>+ ${more} outros</em></li>` : ''}</ul>`;
    }

    // Também preencher os elementos da página `dashboard-rh` (IDs com sufixo Rh), se existirem
    const elAderRh = document.getElementById('kpiAderenciaRh');
    const elJustRh = document.getElementById('kpiJustificativaRh');
    const elGestRh = document.getElementById('kpiGestoresRegularesRh');
    const elElGestRegularesListaRh = document.getElementById('kpiGestoresRegularesListaRh');
    const elGestTopRh = document.getElementById('kpiGestoresTopRh');
    const elCausasRh = document.getElementById('kpiCausasRh');
    const elPendentesRh = document.getElementById('kpiPendentesListRh');

    if (elAderRh) elAderRh.textContent = `${aderenciaGeral}%`;
    if (elJustRh) elJustRh.textContent = `${taxaJustificativa}%`;
    if (elGestRh) elGestRh.textContent = `${pctGestoresRegulares}%`;

    if (elElGestRegularesListaRh) {
        const topRegulares = gestoresList.filter(g => g.avg >= meta).slice(0, 5);
        elElGestRegularesListaRh.innerHTML = `<ul>${topRegulares.map(g => `<li><strong>${g.nome}</strong> <span class="kpi-high">${g.avg}%</span></li>`).join('')}</ul>`;
    }

    if (elGestTopRh) {
        elGestTopRh.innerHTML = `<ul>${gestoresList.map(g => `<li><strong>${g.nome}</strong> <span class="${g.avg >= meta ? 'kpi-high' : 'kpi-low'}">${g.avg}%</span> <small>(${g.dept})</small></li>`).join('')}</ul>`;
    }

    if (elCausasRh) elCausasRh.textContent = causasTexto;

    if (elPendentesRh) {
        const mostrar = belowSorted.slice(0, 6);
        const more = Math.max(0, belowSorted.length - mostrar.length);
        elPendentesRh.innerHTML = `<ul>${mostrar.map(d => `<li><strong>${d.area}</strong> <span class="kpi-low">${d.valor}%</span></li>`).join('')}${more ? `<li><em>+ ${more} outros</em></li>` : ''}</ul>`;
    }

}

// Chamada dos KPIs usando os mocks
renderRelatorioKPIs(mockRelatorioEmpresa, mockGestoresPorDepartamento);

// Teste integração luiz

function calcularStatusSemana(semana) {
    const presenciais = semana.dias.filter(d => d.status === 'presencial').length;
    const remotos = semana.dias.filter(d => d.status === 'remoto').length;
    const ausencias = semana.dias.filter(d => d.status === 'ausente').length;

    // Se houve ausência, é inconformidade
    if (ausencias > 0) {
        return semana.justificada ? 'azul' : 'vermelho';
    }

    // Regra principal
    if (presenciais >= 3 && remotos <= 2) {
        return 'verde';
    }

    // Restante é inconformidade
    return semana.justificada ? 'azul' : 'vermelho';
}


function getStatusSemana(presCount, justificada = false) {

    if (justificada) {
        return {
            class: 'week-justificada',
            label: 'Inconformidade justificada',
            cor: 'var(--azul)'
        };
    }

    if (presCount >= 3) {
        return {
            class: 'week-ok',
            label: 'Em conformidade',
            cor: 'var(--verde)'
        };
    }

    return {
        class: 'week-urgente',
        label: 'Inconformidade',
        cor: 'var(--vermelho)'
    };
}

function isDiaJustificado(dia) {
    return dia.justificado === true || dia.decisaoGestor === 'deferido';
}


function showDetail(s, cardElement) {
    const content = document.getElementById('detail-content');
    
    // ✅ Presenciais naturais e equivalentes (justificados contam)
    const presenciaisNaturais = s.dias.filter(d => d.status === 'presencial').length;
    const diasJustificados = s.dias.filter(d => isDiaJustificado(d)).length;
    const presenciaisEquivalentes = presenciaisNaturais + diasJustificados;
    const remotosNaoJustificados = s.dias.filter(d => d.status === 'remoto' && !isDiaJustificado(d)).length;
    const ausentesNaoJustificados = s.dias.filter(d => d.status === 'ausente' && !isDiaJustificado(d)).length;
    const hasAusenciaNaoJustificada = ausentesNaoJustificados > 0;
    const isRequiredSemanal = presenciaisEquivalentes < 3 || remotosNaoJustificados > 2 || hasAusenciaNaoJustificada;
    
    // ✅ Verifica se a semana está OK (com 3+ presenciais NATURAIS, não justificadas)
    const weekOk = presenciaisNaturais >= 3;
    
    // ✅ Calcula status e cor para exibição
    let statusDisplay, corDisplay;
    if (hasAusenciaNaoJustificada) {
        statusDisplay = 'Não conformidade';
        corDisplay = 'var(--vermelho)';
    } else if (presenciaisEquivalentes >= 3 && remotosNaoJustificados <= 2 && ausentesNaoJustificados === 0) {
        if (diasJustificados > 0) {
            statusDisplay = 'Ausência Justificada';
            corDisplay = 'var(--amarelo)';
        } else {
            statusDisplay = 'Em conformidade';
            corDisplay = 'var(--verde)';
        }
    } else if (s.justificada) {
        statusDisplay = 'Ausência Justificada';
        corDisplay = 'var(--amarelo)';
    } else {
        statusDisplay = 'Não conformidade';
        corDisplay = 'var(--vermelho)';
    }

    const temAcaoDiaria = s.dias.some(d =>
        (d.status === 'ausente' || d.status === 'remoto')
        && !isDiaJustificado(d)
        && (presenciaisEquivalentes < 3 || remotosNaoJustificados > 2 || d.status === 'ausente')
    );

    content.innerHTML = `
        <h3 style="margin:0 0 20px; text-align:center; color:${corDisplay}">
            Semana ${s.num} – ${s.periodo} (${presenciaisEquivalentes} presenciais)
        </h3>

        <div class="days-grid">
            ${s.dias.map(d => {
                let cls = '', txt = '';

                if (isDiaJustificado(d)) {
                    cls = 'status-justificado';
                    txt = 'Justificado';
                } else if (d.status === 'presencial') {
                    cls = 'status-presencial';
                    txt = 'Presencial';
                } else if (d.status === 'remoto') {
                    cls = 'status-remoto';
                    txt = 'Remoto';
                } else {
                    cls = 'status-ausente';
                    txt = 'Ausente';
                }

                // ✅ Não mostrar ícone "J" se a semana já tiver 3+ dias presenciais OU se a semana já foi justificada
                const podeJustificar = (d.status === 'ausente' || d.status === 'remoto')
                    && !isDiaJustificado(d)
                    && (presenciaisEquivalentes < 3 || remotosNaoJustificados > 2 || d.status === 'ausente');

                return `
                    <div class="day-card">
                        <div class="day-header">${d.dia}</div>
                        <div class="day-date">${d.data}</div>
                        <div class="status ${cls}">${txt}</div>
                        ${podeJustificar ? `
                            <div class="just-icon"
                                data-dia="${d.dia}"
                                data-data="${d.data}"
                                data-tipo="${txt}"
                                data-just-colaborador="${(d.justificacaoColaborador || '').replace(/"/g, '&quot;')}"
                                data-just-anexo="${(d.justificacaoAnexo || '').replace(/"/g, '&quot;')}">
                                J
                            </div>
                        ` : ``}
                    </div>
                `;
            }).join('')}
        </div>

        ${isRequiredSemanal && temAcaoDiaria ? `
            <div class="justifications-panel">
                <strong>Justificativas</strong><br>
                <small>Clique no ícone "J" nos dias para aprovar, negar ou criar justificativa diária.</small>

                <div id="daily-fields" style="margin:16px 0;"></div>

                ${isFeatureEnabled('justificacaoSemanal') ? `
                    <div class="just-weekly">
                        <strong>Justificativa geral da semana (obrigatória)</strong>
                        <textarea id="weekly-textarea"
                            placeholder="Explique o motivo da não conformidade semanal"></textarea>
                    </div>

                    <button id="submit-btn" class="submit-btn">
                        Salvar justificativas desta semana
                    </button>
                ` : ''}
            </div>
        ` : ``}
    `;

    content.classList.add('open');
    content.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // ⚠️ IMPORTANTE: se não exige justificativa ou já foi justificada, PARA AQUI
    if (!isRequiredSemanal || (s.justificada && !hasAusenciaNaoJustificada)) return;

    const submitBtn = document.getElementById('submit-btn');
    const weeklyTextarea = document.getElementById('weekly-textarea');
    const dailyFieldsContainer = document.getElementById('daily-fields');

    if (!dailyFieldsContainer) {
        return;
    }

    document.querySelectorAll('.just-icon').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.stopPropagation();

            const dia = this.dataset.dia;
            const data = this.dataset.data;
            const tipo = this.dataset.tipo;
            const justColaborador = this.dataset.justColaborador || '';
            const justAnexo = this.dataset.justAnexo || '';
            const hasJustColaborador = justColaborador.trim().length > 0;
            const justColaboradorSafe = justColaborador
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            const justAnexoSafe = justAnexo
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            const hasAnexo = justAnexoSafe.trim().length > 0;

            const existing = dailyFieldsContainer.querySelector(
                `[data-dia="${dia}"]`
            );

            if (existing) {
                existing.remove();
                this.classList.remove('active');
                return;
            }

            if (hasJustColaborador) {
                dailyFieldsContainer.insertAdjacentHTML('beforeend', `
                    <div class="just-daily" data-dia="${dia}" data-has-colab="1">
                        <strong>${dia} (${data}) – ${tipo}</strong>
                        <p style="margin:8px 0; font-size:12px; color:#666;">Justificativa do colaborador:</p>
                        <div class="daily-text-display" style="background:#f5f7fa; border:1px solid #e6e8eb; border-radius:6px; padding:10px; font-size:13px; color:#333;">${justColaboradorSafe}</div>
                        ${hasAnexo ? `<p style=\"margin:8px 0 0; font-size:12px; color:#666;\">Documento: <span style=\"color:#323130; font-weight:600;\">${justAnexoSafe}</span></p>` : ''}
                        <div class="daily-override-section" style="display:none;">
                            <p style="margin:12px 0 6px; font-size:12px; color:#666;">Justificativa do gestor:</p>
                            <textarea class="daily-override-text" placeholder="Escreva nova justificativa"></textarea>
                        </div>
                        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
                            <button class="daily-approve submit-btn">Aprovar</button>
                            <button class="daily-override submit-btn" data-step="show" style="background:#fff3cd; color:#8a6d3b;">Escrever nova justificativa</button>
                        </div>
                    </div>
                `);
            } else {
                dailyFieldsContainer.insertAdjacentHTML('beforeend', `
                    <div class="just-daily" data-dia="${dia}" data-has-colab="0">
                        <strong>${dia} (${data}) – ${tipo}</strong>
                        <div class="form-group" style="margin:12px 0 0;">
                            <label>Tipo de Justificativa <span style="color: red;">*</span></label>
                            <select class="form-control manager-just-type" required>
                                <option value="" disabled selected>Selecione...</option>
                                <option value="nao-justificado">Não Justificado</option>
                                <option value="trabalho-externo">Trabalho Externo</option>
                                <option value="questoes-medicas">Questões Médicas</option>
                                <option value="outros-motivos">Outros Motivos</option>
                            </select>
                        </div>
                        <div class="form-group manager-just-explain" style="display:none;">
                            <label class="manager-just-label">Explique o motivo <span style="color: red;">*</span></label>
                            <textarea class="form-control textarea manager-just-text" rows="3"
                                placeholder="Descreva os detalhes da justificativa..."></textarea>
                            <p class="form-hint manager-just-hint"></p>
                        </div>
                        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
                            <button class="daily-save submit-btn">Salvar justificativa</button>
                            <button class="daily-cancel submit-btn" style="background:#f8d7da; color:#842029;">Cancelar</button>
                        </div>
                    </div>
                `);
            }

            this.classList.add('active');

            const block = dailyFieldsContainer.querySelector(
                `[data-dia="${dia}"]`
            );
            const overrideTextarea = block.querySelector('.daily-override-text');
            const iconRef = this; // ✅ Salva a referência do icon

            const finalizeDecision = (actionLabel) => {
                alert(actionLabel);
                block.remove();
                iconRef.classList.remove('active');

                setTimeout(() => {
                    renderOverview(dadosApiMock);
                    atualizarResumo();

                    setTimeout(() => {
                        const weekCard = document.querySelector(`.week-card[data-semana="${s.num}"]`);
                        if (weekCard) {
                            weekCard.click();
                        }
                    }, 100);
                }, 300);
            };

            const approveBtn = block.querySelector('.daily-approve');
            const overrideBtn = block.querySelector('.daily-override');
            const overrideSection = block.querySelector('.daily-override-section');
            const saveBtn = block.querySelector('.daily-save');
            const cancelBtn = block.querySelector('.daily-cancel');
            const managerTypeSelect = block.querySelector('.manager-just-type');
            const managerExplainGroup = block.querySelector('.manager-just-explain');
            const managerExplainLabel = block.querySelector('.manager-just-label');
            const managerExplainHint = block.querySelector('.manager-just-hint');
            const managerExplainText = block.querySelector('.manager-just-text');

            if (approveBtn) {
                approveBtn.addEventListener('click', ev => {
                    ev.stopPropagation();
                    const textoColaborador = (justColaborador || '').trim();
                    if (!textoColaborador) {
                        alert('Nao ha justificativa do colaborador para aprovar.');
                        return;
                    }
                    const diaObj = s.dias.find(d => d.dia === dia);
                    if (diaObj) {
                        diaObj.justificacao = diaObj.justificacaoColaborador || textoColaborador;
                        diaObj.justificado = true;
                        diaObj.decisaoGestor = 'deferido';
                        diaObj.justificacaoGestor = null;
                    }
                    finalizeDecision('Justificativa aprovada com sucesso!');
                });
            }

            if (overrideBtn) {
                overrideBtn.addEventListener('click', ev => {
                    ev.stopPropagation();
                    if (overrideBtn.dataset.step === 'show') {
                        if (overrideSection) {
                            overrideSection.style.display = 'block';
                        }
                        overrideBtn.dataset.step = 'save';
                        overrideBtn.textContent = 'Salvar nova justificativa';
                        return;
                    }

                    const texto = overrideTextarea ? overrideTextarea.value.trim() : '';
                    if (!texto) {
                        alert('Preencha o texto antes de enviar!');
                        return;
                    }
                    const diaObj = s.dias.find(d => d.dia === dia);
                    if (diaObj) {
                        diaObj.justificacao = texto;
                        diaObj.justificado = true;
                        diaObj.decisaoGestor = 'deferido';
                        diaObj.justificacaoGestor = texto;
                    }
                    finalizeDecision('Justificativa salva com sucesso!');
                });
            }

            if (managerTypeSelect && managerExplainGroup && managerExplainLabel && managerExplainHint && managerExplainText) {
                managerTypeSelect.addEventListener('change', () => {
                    const tipoSelecionado = managerTypeSelect.value;

                    if (!tipoSelecionado) {
                        managerExplainGroup.style.display = 'none';
                        managerExplainText.required = false;
                        return;
                    }

                    managerExplainGroup.style.display = 'block';
                    managerExplainText.required = true;

                    if (tipoSelecionado === 'nao-justificado') {
                        managerExplainLabel.innerHTML = 'Qual a medida adotada? <span style="color: red;">*</span>';
                        managerExplainHint.textContent = 'Descreva as acoes que voce tomou ou pretende tomar.';
                        managerExplainText.placeholder = 'Ex: Registro realizado manualmente, Ajuste de ponto solicitado, etc.';
                        return;
                    }

                    managerExplainLabel.innerHTML = 'Explique o motivo <span style="color: red;">*</span>';

                    if (tipoSelecionado === 'trabalho-externo') {
                        managerExplainHint.textContent = 'Ex: viagem, visita tecnica, ronda';
                        managerExplainText.placeholder = 'Ex: Visita tecnica ao cliente ABC, Reuniao externa com fornecedor, etc.';
                    } else if (tipoSelecionado === 'questoes-medicas') {
                        managerExplainHint.textContent = 'Descreva o motivo da ausencia medica';
                        managerExplainText.placeholder = 'Ex: Consulta medica de rotina, Exames laboratoriais, Atendimento emergencial, etc.';
                    } else if (tipoSelecionado === 'outros-motivos') {
                        managerExplainHint.textContent = 'Ex: check-in nao registrado; ferias ou folga reprogramada';
                        managerExplainText.placeholder = 'Ex: Check-in nao registrado devido a problema tecnico, Folga reprogramada por acordo com gestor, etc.';
                    }
                });
            }

            if (saveBtn) {
                saveBtn.addEventListener('click', ev => {
                    ev.stopPropagation();

                    const tipoSelecionado = managerTypeSelect ? managerTypeSelect.value : '';
                    const texto = managerExplainText ? managerExplainText.value.trim() : '';

                    if (!tipoSelecionado) {
                        alert('Por favor, selecione o tipo de justificativa.');
                        return;
                    }

                    if (!texto) {
                        alert('Por favor, preencha a explicacao.');
                        return;
                    }

                    const diaObj = s.dias.find(d => d.dia === dia);
                    if (diaObj) {
                        if (tipoSelecionado === 'nao-justificado') {
                            diaObj.justificacao = null;
                            diaObj.justificado = false;
                            diaObj.decisaoGestor = 'indeferido';
                            diaObj.justificacaoGestor = texto;
                            diaObj.justificacaoTipoGestor = tipoSelecionado;
                        } else {
                            diaObj.justificacao = texto;
                            diaObj.justificado = true;
                            diaObj.decisaoGestor = 'deferido';
                            diaObj.justificacaoGestor = texto;
                            diaObj.justificacaoTipoGestor = tipoSelecionado;
                        }
                    }

                    const sucessoMsg = tipoSelecionado === 'nao-justificado'
                        ? 'Ausencia marcada como nao justificada.'
                        : 'Justificativa salva com sucesso!';
                    finalizeDecision(sucessoMsg);
                });
            }

            if (cancelBtn) {
                cancelBtn.addEventListener('click', ev => {
                    ev.stopPropagation();
                    block.remove();
                    iconRef.classList.remove('active');
                });
            }
        });
    });

    if (!submitBtn || !weeklyTextarea) {
        return;
    }

    submitBtn.addEventListener('click', () => {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Salvando...';

        const justificativasDiarias = [];
        dailyFieldsContainer.querySelectorAll('.just-daily').forEach(el => {
            const textarea = el.querySelector('.daily-textarea');
            if (textarea && textarea.value.trim()) {
                justificativasDiarias.push({
                    dia: el.dataset.dia,
                    justificativa: textarea.value.trim()
                });
            }
        });

        const payload = {
            colaborador: dadosApiMock.colaborador,
            semana: s.num,
            periodo: s.periodo,
            justificativasDiarias,
            justificativaSemanal: weeklyTextarea.value.trim()
        };

        console.log('Enviando para o servidor:', payload);

        setTimeout(() => {
            // ✅ ATUALIZA OS DADOS MOCKADOS
            const semanaObj = dadosApiMock.semanas.find(sem => sem.num === s.num);
            if (semanaObj) {
                // Se houver justificativa semanal, marca a semana como justificada
                if (weeklyTextarea.value.trim()) {
                    semanaObj.justificacaoSemanal = weeklyTextarea.value.trim();
                    semanaObj.justificada = true;
                } else {
                    // Se houver justificativas diárias, marca como justificadas
                    justificativasDiarias.forEach(jd => {
                        const diaObj = semanaObj.dias.find(d => d.dia === jd.dia);
                        if (diaObj) {
                            diaObj.justificacao = jd.justificativa;
                            diaObj.justificado = true;
                        }
                    });
                    
                    // Verifica se há pelo menos 3 dias com justificativa + presenciais
                    const diasJustificados = justificativasDiarias.length;
                    const diasPresenciais = semanaObj.dias.filter(d => d.status === 'presencial').length;
                    if (diasJustificados + diasPresenciais >= 3) {
                        semanaObj.justificada = true;
                    }
                }
            }
            
            alert('Justificativas salvas com sucesso!');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Salvar justificativas desta semana';
            
            // Re-renderiza a visualização
            renderOverview(dadosApiMock);
            atualizarResumo(); // ✅ Atualiza o resumo
            
            // ✅ Clica no card da semana para atualizar instantaneamente
            setTimeout(() => {
                const weekCard = document.querySelector(`.week-card[data-semana="${s.num}"]`);
                if (weekCard) {
                    weekCard.click();
                }
            }, 100);
        }, 1500);
    });
}

function renderOverview(dados) {
    const overview = document.getElementById('overview');
    overview.innerHTML = '';

    dados.semanas.forEach(s => {

        // ✅ CONTADOR: presenciais naturais e equivalentes (justificados contam)
        const presenciaisNaturais = s.dias.filter(d => d.status === 'presencial').length;
        const diasJustificados = s.dias.filter(d => isDiaJustificado(d)).length;
        const presenciaisEquivalentes = presenciaisNaturais + diasJustificados;
        const remotosNaoJustificados = s.dias.filter(d => d.status === 'remoto' && !isDiaJustificado(d)).length;
        const ausentesNaoJustificados = s.dias.filter(d => d.status === 'ausente' && !isDiaJustificado(d)).length;

        // ✅ REGRA DE CONFORMIDADE
        let statusSemana;

        const hasAusenciaNaoJustificada = ausentesNaoJustificados > 0;

        if (hasAusenciaNaoJustificada) {
            statusSemana = {
                class: 'week-urgente',
                label: 'Inconformidade',
                cor: 'var(--vermelho)'
            };
        } else if (presenciaisEquivalentes >= 3 && remotosNaoJustificados <= 2 && ausentesNaoJustificados === 0) {
            // Se atingiu a regra com dias justificados, fica como ausencia justificada
            statusSemana = diasJustificados > 0 ? {
                class: 'week-justificada',
                label: 'Ausência Justificada',
                cor: 'var(--amarelo)'
            } : {
                class: 'week-ok',
                label: 'Em conformidade',
                cor: 'var(--verde)'
            };
        } else if (s.justificada && !hasAusenciaNaoJustificada) {
            // Se não tem 3 dias presenciais mas tem justificativa de semana inteira
            statusSemana = {
                class: 'week-justificada',
                label: 'Ausência Justificada',
                cor: 'var(--amarelo)'
            };
        } else if (remotosNaoJustificados > 2 || presenciaisEquivalentes < 3) {
            statusSemana = {
                class: 'week-urgente',
                label: 'Inconformidade',
                cor: 'var(--vermelho)'
            };
        } else {
            statusSemana = {
                class: 'week-ok',
                label: 'Em conformidade',
                cor: 'var(--verde)'
            };
        }

        const card = document.createElement('div');
        card.className = `week-card ${statusSemana.class}`;
        card.dataset.semana = s.num;

        card.innerHTML = `
            <div class="week-header">
                Semana ${s.num}<br>
                <small>${s.periodo}</small>
            </div>

            <div class="week-count" style="color:${statusSemana.cor}">
                ${presenciaisEquivalentes}
            </div>

            <div style="text-align:center; padding:8px; font-size:0.9rem;">
                ${statusSemana.label}
            </div>

            ${s.justificada && !hasAusenciaNaoJustificada ? `<div class="justificado-icon">✓</div>` : ``}
        `;

        card.addEventListener('click', () => {
            document
                .querySelectorAll('.week-card')
                .forEach(c => c.classList.remove('active'));

            card.classList.add('active');
            showDetail(s, card);
        });

        overview.appendChild(card);
    });
}


function updateJustificadoStatus(cardElement, s) {
    const dailyFields = document.getElementById('daily-fields');
    const weeklyField = document.querySelector('.just-weekly textarea');

    const pres = s.dias.filter(d => d.status === 'presencial').length;
    let justifiedDays = 0;

    // Conta apenas dias com texto preenchido
    if (dailyFields) {
        dailyFields.querySelectorAll('.just-daily textarea').forEach(textarea => {
            if (textarea.value.trim() !== '') justifiedDays++;
        });
    }

    const hasWeeklyContent = weeklyField && weeklyField.value.trim() !== '';

    // Regra: verde se
    // 1. Campo semanal tem texto (critério suficiente sozinho)
    // OU
    // 2. Dias presenciais + dias com justificativa preenchida ≥ 3
    const isJustificado = hasWeeklyContent || (pres + justifiedDays >= 3);

    if (isJustificado) {
        cardElement.classList.add('week-justificado');
    } else {
        cardElement.classList.remove('week-justificado');
    }
}

function atualizarResumo() {
    const dados = dadosApiMock;

    // ✅ Conta semanas que exigem justificativa: presenciais + justificados < 3 E não foi justificada
    const nc = dados.semanas.filter(s => {
        const presenciais = s.dias.filter(d => d.status === 'presencial').length;
        const diasJustificados = s.dias.filter(d => isDiaJustificado(d)).length;
        const presenciaisEquivalentes = presenciais + diasJustificados;
        const remotosNaoJustificados = s.dias.filter(d => d.status === 'remoto' && !isDiaJustificado(d)).length;
        const ausentesNaoJustificados = s.dias.filter(d => d.status === 'ausente' && !isDiaJustificado(d)).length;
        return (presenciaisEquivalentes < 3 || remotosNaoJustificados > 2 || ausentesNaoJustificados > 0) && !s.justificada;
    }).length;

    // ✅ Total de dias presenciais + justificados
    const total = dados.semanas.reduce((sum, s) => {
        const presenciais = s.dias.filter(d => d.status === 'presencial').length;
        const diasJustificados = s.dias.filter(d => isDiaJustificado(d)).length;
        return sum + presenciais + diasJustificados;
    }, 0);

    const nome = colaboradorSelecionado || 'Colaborador não identificado';

    document.getElementById('resumo').innerHTML = `
        <strong>Resumo (${nome}):</strong><br>
        Semanas que exigem justificativa semanal:
        <span class="${nc > 0 ? 'alert' : ''}">${nc}</span> de 4<br>
        Total de dias presenciais (últimas 4 semanas):
        <strong>${total}</strong>
    `;
}



// Fim do teste de integração luiz

// ===============================
// RENDER CALENDÁRIO
// ===============================
function renderCalendar() {
    calendarGrid.innerHTML = '';

    if (!selectedEmployee || !selectedDate) return;

    const baseDate = new Date(selectedDate);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();

    updateCalendarTitle(baseDate);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay(); // domingo = 0

    // Espaços vazios antes do dia 1
    for (let i = 0; i < startOffset; i++) {
        calendarGrid.appendChild(document.createElement('span'));
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
        const dayDate = new Date(year, month, d);
        const dayEl = document.createElement('span');
        dayEl.textContent = d;

        const dayOfWeek = dayDate.getDay();

        // 🚫 sábado e domingo
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            dayEl.classList.add('day-disabled');
        }

        // 🔴 dia em inconformidade (somente dias úteis)
        if (mockAlertDays.includes(d) && dayOfWeek !== 0 && dayOfWeek !== 6) {
            dayEl.classList.add('day-alert');

            dayEl.addEventListener('click', (e) => {
                e.stopPropagation();
                // Modal removida - funcionalidade descontinuada
            });
        }

        calendarGrid.appendChild(dayEl);
    }
}




// ===============================
// CONTROLE DE VISIBILIDADE
// ===============================
function tryOpenCalendar() {
    if (selectedEmployee && selectedDate) {
        calendar.style.display = 'block';
        renderCalendar();
    }
}

// ===============================
// DATEPICKER
// ===============================
function renderDatepicker() {
    if (!selectedEmployee) return;
    datepicker.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'datepicker-header';
    header.innerHTML = `
        <button id="prevMonth">‹</button>
        <span>${currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
        <button id="nextMonth">›</button>
    `;

    const grid = document.createElement('div');
    grid.className = 'datepicker-grid';

    const weekdays = ['d', 's', 't', 'q', 'q', 's', 's'];

    weekdays.forEach(day => {
        const dayLabel = document.createElement('div');
        dayLabel.className = 'datepicker-weekday';
        dayLabel.textContent = day;
        grid.appendChild(dayLabel);
    });


    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startOffset = firstDay.getDay();

    // Espaços vazios antes do dia 1 (alinhamento domingo → sábado)
    for (let i = 0; i < startOffset; i++) {
        const empty = document.createElement('div');
        grid.appendChild(empty);
    }



    for (let d = 1; d <= lastDay.getDate(); d++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'datepicker-day';
        dayEl.textContent = d;

        const dayDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            d
        );

        const weekStart = getWeekStart(dayDate);
        const weekKey = formatISO(weekStart);

        const dayNumber = d;
        const dayOfWeek = dayDate.getDay(); // 0 = domingo, 6 = sábado

        // 🔴 dia em inconformidade (mock)
        if (
            mockAlertDays.includes(dayNumber) &&
            dayOfWeek !== 0 &&
            dayOfWeek !== 6
        ) {
            dayEl.classList.add('day-alert');
        }

        // 🚫 sábado e domingo
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            dayEl.classList.add('day-disabled');
        }



        dayEl.addEventListener('click', () => {
            selectedDate = formatISO(dayDate);
            dateInput.value = dayDate.toLocaleDateString('pt-BR');

            datepicker.style.display = 'none';
            tryOpenCalendar();
        });

        grid.appendChild(dayEl);
    }



    datepicker.appendChild(header);
    datepicker.appendChild(grid);

    document.getElementById('prevMonth').onclick = () => {
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        renderDatepicker();
    };

    document.getElementById('nextMonth').onclick = () => {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        renderDatepicker();
    };
}

// ===============================
// EVENTOS
// ===============================

// Filtro colaborador
if (employeeSelect) {
    employeeSelect.addEventListener('change', e => {
        const value = e.target.value;

        const historicoContent = document.getElementById('historico-content');
        const resumo = document.getElementById('resumo');

        if (!value) {
            colaboradorSelecionado = null;
            historicoContent.style.display = 'none';
            resumo.textContent = 'Selecione um colaborador';
            return;
        }

        // nome visível (Luiz Silva / Ana Souza)
        colaboradorSelecionado =
            employeeSelect.options[employeeSelect.selectedIndex].text;

        historicoContent.style.display = 'block';

        renderOverview(dadosApiMock);
        atualizarResumo();
    });
}


// Input de data
if (dateInput && datepicker) {
    dateInput.addEventListener('click', e => {
        e.stopPropagation();
        datepicker.style.display = 'block';
        renderDatepicker();
    });
}

// Clique dentro do datepicker
if (datepicker) {
    datepicker.addEventListener('click', e => {
        e.stopPropagation();
    });
}

// Fechar calendários ao clicar fora
document.addEventListener('click', e => {

    if (
        datepicker &&
        dateInput &&
        !datepicker.contains(e.target) &&
        e.target !== dateInput
    ) {
        datepicker.style.display = 'none';
    }

    if (
        calendar &&
        !calendar.contains(e.target) &&
        (!datepicker || !datepicker.contains(e.target))
    ) {
        calendar.style.display = 'none';
    }
});


// ===============================
// INIT
// ===============================
if (typeof renderOverview === 'function') {
    renderOverview(dadosApiMock);
}

if (typeof atualizarResumo === 'function') {
    atualizarResumo();
}


// Inicializa com o JSON mockado
renderOverview(dadosApiMock);
atualizarResumo();

// ===============================
// GRÁFICOS RELATÓRIOS GESTOR
// ===============================

// Mock de dados COMPLETO de aderência mensal (12 meses) por colaborador
const mockDadosEvolucaoCompleto = {
    meses: ['Jan/2025', 'Fev/2025', 'Mar/2025', 'Abr/2025', 'Mai/2025', 'Jun/2025', 
            'Jul/2025', 'Ago/2025', 'Set/2025', 'Out/2025', 'Nov/2025', 'Dez/2025',
            'Jan/2026', 'Fev/2026'],
    mediaEquipe: [75, 77, 76, 78, 80, 79, 81, 78, 82, 78, 81, 79, 82, 85]
};

const mockColaboradoresCompleto = [
    { 
        nome: 'João Silva', 
        dados: [85, 87, 86, 88, 90, 89, 91, 88, 92, 88, 91, 89, 92, 95]
    },
    { 
        nome: 'Maria Santos', 
        dados: [90, 92, 91, 93, 95, 94, 96, 93, 97, 92, 95, 93, 96, 98]
    },
    { 
        nome: 'Pedro Alves', 
        dados: [70, 72, 71, 73, 75, 74, 76, 73, 77, 75, 78, 76, 79, 82]
    },
    { 
        nome: 'Ana Costa', 
        dados: [82, 84, 83, 85, 87, 86, 88, 85, 89, 85, 88, 86, 89, 92]
    },
    { 
        nome: 'Carlos Souza', 
        dados: [76, 78, 77, 79, 81, 80, 82, 79, 83, 79, 82, 80, 83, 86]
    }
];

// Dados filtrados (inicialmente mostram os últimos 4 meses)
let dadosEvolucaoFiltrados = {
    meses: mockDadosEvolucaoCompleto.meses.slice(-4),
    mediaEquipe: mockDadosEvolucaoCompleto.mediaEquipe.slice(-4)
};

let colaboradoresFiltrados = mockColaboradoresCompleto.map(col => ({
    nome: col.nome,
    aderencia: col.dados[col.dados.length - 1] // Último mês
}));

// Função para desenhar gráfico de evolução (linha)
function desenharGraficoEvolucao() {
    console.log('🎨 Iniciando desenho do gráfico de evolução...');
    
    const canvas = document.getElementById('evolucaoChart');
    if (!canvas) {
        console.warn('⚠️ Canvas evolucaoChart não encontrado!');
        return;
    }

    const ctx = canvas.getContext('2d');
    
    // Definir tamanho do canvas
    const containerWidth = canvas.parentElement.offsetWidth || 800;
    const containerHeight = 350;
    
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    const meses = dadosEvolucaoFiltrados.meses;
    const dados = dadosEvolucaoFiltrados.mediaEquipe;

    console.log('📊 Dados do gráfico:', { meses, dados });

    if (!meses || meses.length === 0) {
        console.warn('⚠️ Sem dados para desenhar o gráfico!');
        ctx.fillStyle = '#333';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Nenhum dado disponível', canvas.width / 2, canvas.height / 2);
        return;
    }

    const padding = 50;
    const width = canvas.width - (padding * 2);
    const height = canvas.height - (padding * 2);

    // Limpar canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar eixos
    ctx.strokeStyle = '#d1d1d1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();

    // Escala
    const maxValor = 100;
    const stepX = meses.length > 1 ? width / (meses.length - 1) : width / 2;
    const stepY = height / maxValor;

    // Desenhar grid e labels
    ctx.fillStyle = '#605e5c';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // Labels X (meses) - com responsividade para mobile
    const isMobile = canvas.width < 600;
    
    meses.forEach((mes, i) => {
        const x = padding + (i * stepX);
        
        if (isMobile) {
            // Mobile: rotacionar labels em 45 graus e exibir apenas alguns
            // Exibe 1 a cada 2 labels se houver muitos meses
            const mostrarTodos = meses.length <= 6;
            const deveExibir = mostrarTodos || (i % 2 === 0);
            
            if (deveExibir) {
                ctx.save();
                ctx.translate(x, canvas.height - padding + 5);
                ctx.rotate(-Math.PI / 4); // -45 graus
                ctx.textAlign = 'right';
                ctx.fillText(mes, 0, 0);
                ctx.restore();
            }
        } else {
            // Desktop: labels horizontais normais
            ctx.fillText(mes, x, canvas.height - padding + 20);
        }
    });

    // Labels Y (porcentagem)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 100; i += 20) {
        const y = canvas.height - padding - (i * stepY);
        ctx.fillText(i + '%', padding - 10, y + 5);
    }

    // Desenhar linha de dados
    ctx.strokeStyle = '#0597F2';
    ctx.lineWidth = 3;
    ctx.beginPath();

    dados.forEach((valor, i) => {
        const x = padding + (i * stepX);
        const y = canvas.height - padding - (valor * stepY);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Desenhar pontos
    ctx.fillStyle = '#0597F2';
    dados.forEach((valor, i) => {
        const x = padding + (i * stepX);
        const y = canvas.height - padding - (valor * stepY);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });

    // Exibir valores (%) acima dos pontos
    ctx.fillStyle = '#111827';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    dados.forEach((valor, i) => {
        const x = padding + (i * stepX);
        const y = canvas.height - padding - (valor * stepY);
        ctx.fillText(`${valor}%`, x, y - 8);
    });
}

// Função para desenhar gráfico comparativo (barras)
function desenharGraficoComparativo() {
    console.log('🎨 Iniciando desenho do gráfico comparativo...');
    
    const canvas = document.getElementById('comparativoChart');
    if (!canvas) {
        console.warn('⚠️ Canvas comparativoChart não encontrado!');
        return;
    }

    const ctx = canvas.getContext('2d');
    
    // Definir tamanho do canvas
    const containerWidth = canvas.parentElement.offsetWidth || 800;
    const containerHeight = 350;
    
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    const colaboradores = colaboradoresFiltrados;

    console.log('📊 Colaboradores:', colaboradores);

    if (!colaboradores || colaboradores.length === 0) {
        console.warn('⚠️ Sem colaboradores para desenhar o gráfico!');
        ctx.fillStyle = '#333';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Nenhum dado disponível', canvas.width / 2, canvas.height / 2);
        return;
    }

    const padding = 60;
    const width = canvas.width - (padding * 2);
    const height = canvas.height - (padding * 2);

    // Limpar canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar eixos
    ctx.strokeStyle = '#d1d1d1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();

    // Escala
    const maxValor = 100;
    const stepX = width / colaboradoresFiltrados.length;
    const stepY = height / maxValor;
    const barWidth = (stepX * 0.6);

    // Labels Y
    ctx.fillStyle = '#605e5c';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 100; i += 20) {
        const y = canvas.height - padding - (i * stepY);
        ctx.fillText(i + '%', padding - 10, y + 5);
    }

    // Desenhar barras
    ctx.textAlign = 'center';
    colaboradoresFiltrados.forEach((colab, i) => {
        const x = padding + (i * stepX) + (stepX / 2);
        const barHeight = colab.aderencia * stepY;
        const y = canvas.height - padding - barHeight;

        // Cor baseada em performance
        if (colab.aderencia >= 85) {
            ctx.fillStyle = '#3b82f6'; // Azul (excellent)
        } else if (colab.aderencia >= 70) {
            ctx.fillStyle = '#f59e0b'; // Amarelo/Laranja (good)
        } else {
            ctx.fillStyle = '#ef4444'; // Vermelho (critical)
        }

        ctx.fillRect(x - (barWidth / 2), y, barWidth, barHeight);

        // Label com nome e percentual
        ctx.fillStyle = '#323130';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(colab.aderencia + '%', x, y - 10);

        // Renderizar nome - rotacionar em mobile
        ctx.font = '11px Arial';
        ctx.fillStyle = '#323130';
        
        if (canvas.width < 600) {
            // Mobile: rotacionar nome em 45 graus para melhor legibilidade
            ctx.save();
            ctx.translate(x, canvas.height - padding + 5);
            ctx.rotate(-Math.PI / 4); // -45 graus
            ctx.textAlign = 'right';
            ctx.fillText(colab.nome, 0, 0);
            ctx.restore();
        } else {
            // Desktop: nome horizontal
            ctx.textAlign = 'center';
            ctx.fillText(colab.nome, x, canvas.height - padding + 20);
        }
    });
}

// Função para atualizar estatísticas
function atualizarEstatisticasEquipe() {
    console.log('📊 Atualizando estatísticas da equipe...');
    console.log('Colaboradores filtrados:', colaboradoresFiltrados);
    
    if (!colaboradoresFiltrados || colaboradoresFiltrados.length === 0) {
        console.warn('⚠️ Sem dados de colaboradores para calcular estatísticas!');
        return;
    }

    const media = Math.round(colaboradoresFiltrados.reduce((s, c) => s + c.aderencia, 0) / colaboradoresFiltrados.length);
    const melhor = colaboradoresFiltrados.reduce((prev, curr) => (prev.aderencia > curr.aderencia ? prev : curr));
    const pior = colaboradoresFiltrados.reduce((prev, curr) => (prev.aderencia < curr.aderencia ? prev : curr));

    const elMedia = document.getElementById('mediaAdereciaEquipe');
    const elMelhor = document.getElementById('melhorPerformer');
    const elPior = document.getElementById('necesitaAtencao');
    const elTotal = document.getElementById('totalColaboradores');

    if (elMedia) elMedia.textContent = media + '%';
    if (elMelhor) elMelhor.textContent = melhor.nome + ' (' + melhor.aderencia + '%)';
    if (elPior) elPior.textContent = pior.nome + ' (' + pior.aderencia + '%)';
    if (elTotal) elTotal.textContent = colaboradoresFiltrados.length;
    
    console.log('✅ Estatísticas atualizadas:', { media, melhor: melhor.nome, pior: pior.nome });
}

// Inicializar gráficos quando a página carregar ou mudar para relatórios-gestor
document.addEventListener('DOMContentLoaded', () => {
    // Os gráficos serão inicializados quando o usuário navegar para suas respectivas páginas
    // No entanto, é seguro chamar uma vez inicialmente se as páginas estiverem visíveis
    const relatoriosGestorPage = document.getElementById('relatorios-gestor');
    const relatoriosPage = document.getElementById('relatorios');
    
    renderLegendas();

    if (relatoriosGestorPage && relatoriosGestorPage.classList.contains('active')) {
        setTimeout(() => {
            desenharGraficoEvolucao();
            desenharGraficoComparativo();
            atualizarEstatisticasEquipe();
        }, 500);
    }
    
    if (relatoriosPage && relatoriosPage.classList.contains('active')) {
        setTimeout(() => {
            inicializarGraficoAreas();
        }, 500);
    }
});

// Re-desenhar ao redimensionar a janela
window.addEventListener('resize', () => {
    desenharGraficoEvolucao();
    desenharGraficoComparativo();
    desenharGraficoAreas();
});

// ===============================
// GRÁFICO INTERATIVO DE ÁREAS
// ===============================

// Legendas (mock para futura API)
const mockLegendaPadrao = [
    { className: 'excellent', label: '100%' },
    { className: 'good', label: '>= 90%' },
    { className: 'critical', label: '< 90%' }
];

const legendConfigs = [
    { id: 'legendAderenciaPainel', items: mockLegendaPadrao },
    { id: 'legendRelatorioAderencia', items: mockLegendaPadrao },
    { id: 'legendRelatorioStatus', items: mockLegendaPadrao },
    { id: 'comparativoLegenda', items: mockLegendaPadrao }
];

function renderLegend(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    items.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';

        const colorBox = document.createElement('div');
        colorBox.className = `color-box ${item.className}`;

        const textNode = document.createTextNode(` ${item.label}`);

        legendItem.appendChild(colorBox);
        legendItem.appendChild(textNode);
        container.appendChild(legendItem);
    });
}

function renderLegendas() {
    legendConfigs.forEach(config => {
        renderLegend(config.id, config.items);
    });
}

// 🔹 Nome da linha média (empresa)
const NOME_EMPRESA_CHART = 'ALPA SEDE';

// Mock de dados de 6 meses por área
const mockDadosAreas = {
    meses: ['Setembro', 'Outubro', 'Novembro', 'Dezembro', 'Janeiro', 'Fevereiro'],
    areas: [
        { 
            nome: 'ALPA SEDE', 
            cor: '#000000', 
            valores: [62, 58, 68, 60, 65, 70],
            destaque: true
        },
        { 
            nome: 'LATAM', 
            cor: '#0597F2', 
            valores: [72, 68, 78, 70, 75, 82] 
        },
        { 
            nome: 'IDM', 
            cor: '#A855F7', 
            valores: [45, 42, 52, 48, 50, 58] 
        },
        { 
            nome: 'N&C', 
            cor: '#107c10', 
            valores: [95, 92, 98, 94, 96, 99] 
        },
        { 
            nome: 'FINANÇAS', 
            cor: '#d13438', 
            valores: [88, 85, 90, 87, 92, 95] 
        },
        { 
            nome: 'TECNOLOGIA', 
            cor: '#ff8c00', 
            valores: [35, 38, 48, 42, 45, 52] 
        }
    ]
};

// Estado das áreas selecionadas
let areasVisiveisChart = {
    'ALPA SEDE': true,
    'LATAM': true,
    'IDM': true,
    'N&C': true,
    'FINANÇAS': true,
    'TECNOLOGIA': true,
    [NOME_EMPRESA_CHART]: true
};

// Função para inicializar o gráfico de áreas
function inicializarGraficoAreas() {
    const container = document.getElementById('checkboxesAreas');
    if (!container) return;

    container.innerHTML = '';

    // Checkboxes das áreas
    mockDadosAreas.areas.forEach(area => {
        const label = document.createElement('label');
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.gap = '8px';
        label.style.cursor = 'pointer';
        label.style.fontSize = '13px';
        label.style.fontWeight = area.nome === 'ALPA SEDE' ? '700' : 'normal';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.onchange = () => {
            areasVisiveisChart[area.nome] = checkbox.checked;
            desenharGraficoAreas();
        };

        const colorBox = document.createElement('div');
        colorBox.style.width = '12px';
        colorBox.style.height = '12px';
        colorBox.style.backgroundColor = area.cor;
        colorBox.style.borderRadius = '2px';

        label.appendChild(checkbox);
        label.appendChild(colorBox);
        label.appendChild(document.createTextNode(area.nome));
        container.appendChild(label);
    });

    desenharGraficoAreas();
}

// Função para desenhar o gráfico
function desenharGraficoAreas() {
    const canvas = document.getElementById('graficoAreasChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let containerWidth = canvas.parentElement.offsetWidth || 500;
    let containerHeight = window.innerWidth < 640 ? 250 : 350;

    canvas.width = containerWidth;
    canvas.height = containerHeight;

    const meses = mockDadosAreas.meses;
    const areas = mockDadosAreas.areas;

    const padding = 50;
    const width = canvas.width - (padding * 2);
    const height = canvas.height - (padding * 2);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Eixos
    ctx.strokeStyle = '#d1d1d1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();

    const maxValor = 100;
    const stepX = width / (meses.length - 1);
    const stepY = height / maxValor;

    // Labels X (meses) - com responsividade para mobile
    ctx.fillStyle = '#605e5c';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    const isMobile = canvas.width < 600;
    
    meses.forEach((mes, i) => {
        const x = padding + (i * stepX);
        
        if (isMobile) {
            // Mobile: rotacionar labels em 45 graus
            ctx.save();
            ctx.translate(x, canvas.height - padding + 5);
            ctx.rotate(-Math.PI / 4); // -45 graus
            ctx.textAlign = 'right';
            ctx.fillText(mes, 0, 0);
            ctx.restore();
        } else {
            // Desktop: labels horizontais normais
            ctx.fillText(mes, x, canvas.height - padding + 20);
        }
    });

    // Labels Y
    ctx.textAlign = 'right';
    for (let i = 0; i <= 100; i += 20) {
        ctx.fillText(i + '%', padding - 10, canvas.height - padding - (i * stepY) + 5);
    }

    // Linhas das áreas (exceto ALPA SEDE)
    areas.forEach(area => {
        if (area.nome !== 'ALPA SEDE' && areasVisiveisChart[area.nome]) {
            desenharLinha(ctx, area.valores, area.cor, padding, canvas.height, stepX, stepY, true);
        }
    });

    // Linha ALPA SEDE por último (para aparecer por cima)
    const alpaSede = areas.find(a => a.nome === 'ALPA SEDE');
    if (alpaSede && areasVisiveisChart[alpaSede.nome]) {
        desenharLinha(ctx, alpaSede.valores, alpaSede.cor, padding, canvas.height, stepX, stepY, false, true);
    }
}

// Função auxiliar para desenhar linhas
function desenharLinha(ctx, valores, cor, padding, canvasHeight, stepX, stepY, comPontos, isAlpaSede) {
    ctx.strokeStyle = cor;
    ctx.lineWidth = isAlpaSede ? 4 : (comPontos ? 2 : 3);
    ctx.beginPath();

    valores.forEach((valor, i) => {
        const x = padding + (i * stepX);
        const y = canvasHeight - padding - (valor * stepY);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });

    ctx.stroke();

    if (comPontos) {
        ctx.fillStyle = cor;
        valores.forEach((valor, i) => {
            const x = padding + (i * stepX);
            const y = canvasHeight - padding - (valor * stepY);
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}



// ===== JUSTIFICAR FALTA - COLABORADOR =====
// Dados mockados de justificativas enviadas
const justificativasEnviadas = [
    {
        data: '2026-01-15',
        tipo: 'Justificado por Questões Médicas',
        status: 'Aprovada',
        gestor: 'Maria Santos',
        observacoes: 'Consulta médica de rotina'
    },
    {
        data: '2026-01-22',
        tipo: 'Justificado por Trabalho Externo',
        status: 'Pendente',
        gestor: 'Maria Santos',
        observacoes: 'Visita técnica ao cliente'
    },
    {
        data: '2026-01-10',
        tipo: 'Outros Motivos',
        status: 'Rejeitada',
        gestor: 'Maria Santos',
        observacoes: 'Check-in não registrado - solicitar mais informações'
    }
];

// ===== DATE PICKER JUSTIFICAR FALTA =====
const pickerJustificarData = {
    input: null,
    calendar: null,
    selectedDay: null,
    selectedMonth: null,
    selectedYear: null,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    today: new Date()
};

function getPreviousWeekRange(baseDate) {
    const today = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
    const dayOfWeek = today.getDay() || 7;
    const mondayThisWeek = new Date(today);
    mondayThisWeek.setDate(today.getDate() - dayOfWeek + 1);

    const start = new Date(mondayThisWeek);
    start.setDate(mondayThisWeek.getDate() - 7);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
}

function formatDayMonthFromIso(dateIso) {
    if (!dateIso || !dateIso.includes('-')) return '';
    const [year, month, day] = dateIso.split('-');
    return `${day}/${month}`;
}

function storeColaboradorJustificativa(dateIso, justificativaTexto, anexoNome) {
    const dayMonth = formatDayMonthFromIso(dateIso);
    if (!dayMonth || !justificativaTexto) return;

    dadosApiMock.semanas.forEach(semana => {
        semana.dias.forEach(dia => {
            if (dia.data === dayMonth) {
                dia.justificacaoColaborador = justificativaTexto;
                if (anexoNome) {
                    dia.justificacaoAnexo = anexoNome;
                }
            }
        });
    });
}

function initJustificarDataPicker() {
    pickerJustificarData.input = document.getElementById('justificarData');
    pickerJustificarData.calendar = document.getElementById('calendarJustificarData');
    pickerJustificarData.today = new Date();
    pickerJustificarData.today.setHours(0, 0, 0, 0); // Normalizar para meia-noite

    if (!pickerJustificarData.input || !pickerJustificarData.calendar) return;

    // Abrir calendário ao clicar no input
    pickerJustificarData.input.addEventListener('click', () => {
        toggleCalendarJustificarData();
    });

    // Botões de navegação de mês
    const prevBtn = pickerJustificarData.calendar.querySelector('.prev-month-btn-gestor');
    const nextBtn = pickerJustificarData.calendar.querySelector('.next-month-btn-gestor');

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            changeMonthJustificarData(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            changeMonthJustificarData(1);
        });
    }

    // Fechar calendário ao clicar fora
    document.addEventListener('click', (e) => {
        if (!pickerJustificarData.calendar.contains(e.target) && 
            !pickerJustificarData.input.contains(e.target)) {
            closeCalendarJustificarData();
        }
    });

    renderCalendarJustificarData();
}

function toggleCalendarJustificarData() {
    if (pickerJustificarData.calendar.classList.contains('active')) {
        closeCalendarJustificarData();
    } else {
        pickerJustificarData.calendar.classList.add('active');
        renderCalendarJustificarData();
    }
}

function closeCalendarJustificarData() {
    pickerJustificarData.calendar.classList.remove('active');
}

function renderCalendarJustificarData() {
    const monthYearDisplay = pickerJustificarData.calendar.querySelector('.month-year-display-gestor');
    const daysGrid = pickerJustificarData.calendar.querySelector('.calendar-days-grid');

    if (!monthYearDisplay || !daysGrid) return;

    // Atualizar título do mês/ano
    const mesNome = MONTHS_GESTOR[pickerJustificarData.currentMonth];
    monthYearDisplay.textContent = `${mesNome} ${pickerJustificarData.currentYear}`;

    // Limpar grid de dias
    daysGrid.innerHTML = '';

    // Obter primeiro dia do mês e total de dias
    const firstDay = new Date(pickerJustificarData.currentYear, pickerJustificarData.currentMonth, 1);
    const lastDay = new Date(pickerJustificarData.currentYear, pickerJustificarData.currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    // Data de hoje para comparação
    const today = pickerJustificarData.today;
    const previousWeek = getPreviousWeekRange(today);
    const allowedMonth = previousWeek.start.getMonth();
    const allowedYear = previousWeek.start.getFullYear();

    // Adicionar dias vazios antes do início do mês
    for (let i = 0; i < startDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day-cell empty';
        daysGrid.appendChild(emptyDay);
    }

    // Adicionar dias do mês
    for (let day = 1; day <= totalDays; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day-cell';
        dayCell.textContent = day;

        const currentDate = new Date(pickerJustificarData.currentYear, pickerJustificarData.currentMonth, day);
        currentDate.setHours(0, 0, 0, 0);

        // Permitir somente datas da semana anterior
        const isAllowedDate = currentDate >= previousWeek.start && currentDate <= previousWeek.end;

        if (!isAllowedDate) {
            dayCell.classList.add('disabled');
        } else {
            // Verificar se é o dia selecionado
            if (pickerJustificarData.selectedDay === day && 
                pickerJustificarData.selectedMonth === pickerJustificarData.currentMonth &&
                pickerJustificarData.selectedYear === pickerJustificarData.currentYear) {
                dayCell.classList.add('selected');
            }

            dayCell.addEventListener('click', (e) => {
                e.stopPropagation();
                selectDateJustificarData(day);
            });
        }

        daysGrid.appendChild(dayCell);
    }

    // Atualizar estado dos botões de navegação
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = pickerJustificarData.calendar.querySelector('.prev-month-btn-gestor');
    const nextBtn = pickerJustificarData.calendar.querySelector('.next-month-btn-gestor');
    const today = pickerJustificarData.today;
    const previousWeek = getPreviousWeekRange(today);
    const allowedMonth = previousWeek.start.getMonth();
    const allowedYear = previousWeek.start.getFullYear();
    const isAllowedMonth = pickerJustificarData.currentMonth === allowedMonth &&
        pickerJustificarData.currentYear === allowedYear;
    
    if (nextBtn) {
        if (isAllowedMonth) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.3';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }

    if (prevBtn) {
        if (isAllowedMonth) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.3';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }
    }
}

function changeMonthJustificarData(direction) {
    const today = pickerJustificarData.today;
    const previousWeek = getPreviousWeekRange(today);
    const allowedMonth = previousWeek.start.getMonth();
    const allowedYear = previousWeek.start.getFullYear();
    
    pickerJustificarData.currentMonth += direction;
    
    if (pickerJustificarData.currentMonth > 11) {
        pickerJustificarData.currentMonth = 0;
        pickerJustificarData.currentYear++;
    } else if (pickerJustificarData.currentMonth < 0) {
        pickerJustificarData.currentMonth = 11;
        pickerJustificarData.currentYear--;
    }

    // Não permitir navegar fora do mês da semana anterior
    const isNotAllowedMonth = pickerJustificarData.currentYear !== allowedYear ||
        pickerJustificarData.currentMonth !== allowedMonth;
    
    if (isNotAllowedMonth) {
        pickerJustificarData.currentMonth = allowedMonth;
        pickerJustificarData.currentYear = allowedYear;
        return;
    }

    renderCalendarJustificarData();
}

function selectDateJustificarData(day) {
    pickerJustificarData.selectedDay = day;
    pickerJustificarData.selectedMonth = pickerJustificarData.currentMonth;
    pickerJustificarData.selectedYear = pickerJustificarData.currentYear;

    // Formatar para exibição: "05/Fevereiro/2026"
    const diaFormatado = String(day).padStart(2, '0');
    const mesNome = MONTHS_GESTOR[pickerJustificarData.currentMonth];
    pickerJustificarData.input.value = `${diaFormatado}/${mesNome}/${pickerJustificarData.currentYear}`;
    
    // Armazenar a data no formato ISO para uso no formulário (YYYY-MM-DD)
    const ano = pickerJustificarData.currentYear;
    const mes = String(pickerJustificarData.currentMonth + 1).padStart(2, '0');
    const dia = String(day).padStart(2, '0');
    pickerJustificarData.input.dataset.isoDate = `${ano}-${mes}-${dia}`;

    renderCalendarJustificarData();
    closeCalendarJustificarData();
}

// Controla a exibição do campo de explicação baseado no tipo selecionado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar calendário de data para Justificar Falta
    initJustificarDataPicker();

    const justificarTipo = document.getElementById('justificarTipo');
    const explicacaoGroup = document.getElementById('justificarExplicacaoGroup');
    const explicacaoLabel = document.getElementById('justificarExplicacaoLabel');
    const explicacaoHint = document.getElementById('justificarExplicacaoHint');
    const explicacaoTextarea = document.getElementById('justificarExplicacao');

    if (justificarTipo && explicacaoGroup) {
        justificarTipo.addEventListener('change', function() {
            const tipoSelecionado = this.value;

            if (tipoSelecionado === '') {
                explicacaoGroup.style.display = 'none';
                explicacaoTextarea.required = false;
            } else if (tipoSelecionado === 'trabalho-externo') {
                explicacaoGroup.style.display = 'block';
                explicacaoLabel.innerHTML = 'Explique o motivo <span style="color: red;">*</span>';
                explicacaoHint.textContent = 'Ex: viagem, visita técnica, ronda';
                explicacaoTextarea.placeholder = 'Ex: Visita técnica ao cliente ABC, Reunião externa com fornecedor, etc.';
                explicacaoTextarea.required = true;
            } else if (tipoSelecionado === 'questoes-medicas') {
                explicacaoGroup.style.display = 'block';
                explicacaoLabel.innerHTML = 'Explique o motivo <span style="color: red;">*</span>';
                explicacaoHint.textContent = 'Descreva o motivo da ausência médica';
                explicacaoTextarea.placeholder = 'Ex: Consulta médica de rotina, Exames laboratoriais, Atendimento emergencial, etc.';
                explicacaoTextarea.required = true;
            } else if (tipoSelecionado === 'outros-motivos') {
                explicacaoGroup.style.display = 'block';
                explicacaoLabel.innerHTML = 'Explique o motivo <span style="color: red;">*</span>';
                explicacaoHint.textContent = 'Ex: check-in não registrado; férias ou folga reprogramada';
                explicacaoTextarea.placeholder = 'Ex: Check-in não registrado devido a problema técnico, Folga reprogramada por acordo com gestor, etc.';
                explicacaoTextarea.required = true;
            }
        });
    }

    // Enviar justificativa
    const submitBtn = document.getElementById('submitJustificarFalta');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const dataInput = document.getElementById('justificarData');
            const data = dataInput.dataset.isoDate || dataInput.value; // Usar a data ISO armazenada
            const tipo = document.getElementById('justificarTipo').value;
            const explicacao = document.getElementById('justificarExplicacao').value;
            const anexo = document.getElementById('justificarAnexo').files[0];

            // Validações
            if (!data) {
                alert('Por favor, selecione a data da ausência.');
                return;
            }

            if (!tipo) {
                alert('Por favor, selecione o tipo de justificativa.');
                return;
            }

            if (explicacao.trim() === '' && tipo !== '') {
                alert('Por favor, preencha a explicação.');
                return;
            }

            // Adicionar justificativa enviada à lista
            const tipoTexto = {
                'trabalho-externo': 'Trabalho Externo',
                'questoes-medicas': 'Questões Médicas',
                'outros-motivos': 'Outros Motivos'
            };

            const novaJustificativa = {
                data: data,
                tipo: tipoTexto[tipo],
                status: 'Pendente',
                gestor: 'Maria Santos',
                observacoes: explicacao
            };

            justificativasEnviadas.unshift(novaJustificativa);
            popularTabelaJustificativasEnviadas();

            storeColaboradorJustificativa(data, explicacao.trim(), anexo ? anexo.name : '');

            // Limpar formulário
            dataInput.value = '';
            dataInput.dataset.isoDate = '';
            pickerJustificarData.selectedDay = null;
            pickerJustificarData.selectedMonth = null;
            pickerJustificarData.selectedYear = null;
            document.getElementById('justificarTipo').value = '';
            document.getElementById('justificarExplicacao').value = '';
            document.getElementById('justificarExplicacaoGroup').style.display = 'none';
            document.getElementById('justificarAnexo').value = '';

            alert('Justificativa enviada com sucesso! Seu gestor será notificado.');
        });
    }

    // Botão cancelar
    const cancelBtn = document.getElementById('cancelJustificarFalta');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            // Limpar formulário
            const dataInput = document.getElementById('justificarData');
            dataInput.value = '';
            dataInput.dataset.isoDate = '';
            pickerJustificarData.selectedDay = null;
            pickerJustificarData.selectedMonth = null;
            pickerJustificarData.selectedYear = null;
            document.getElementById('justificarTipo').value = '';
            document.getElementById('justificarExplicacao').value = '';
            document.getElementById('justificarExplicacaoGroup').style.display = 'none';
            document.getElementById('justificarAnexo').value = '';
        });
    }

    // Popular tabela de justificativas enviadas
    popularTabelaJustificativasEnviadas();
    
    // Popular tabela de justificativas no dashboard
    popularTabelaJustificativasDashboard();
});

// Função para popular a tabela de justificativas enviadas
function popularTabelaJustificativasEnviadas() {
    const tbody = document.getElementById('justificativasEnviadasTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (justificativasEnviadas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #666;">Nenhuma justificativa enviada ainda.</td></tr>';
        return;
    }

    justificativasEnviadas.forEach(just => {
        const tr = document.createElement('tr');

        // Formatar data - suporta tanto formato ISO (2026-01-15) quanto string normal
        let dataFormatada;
        try {
            // Tenta criar a data com 'T00:00:00' para evitar problemas de timezone
            const dataObj = just.data.includes('-') 
                ? new Date(just.data + 'T00:00:00') 
                : new Date(just.data);
            dataFormatada = dataObj.toLocaleDateString('pt-BR');
        } catch (e) {
            dataFormatada = just.data; // Fallback para o valor original
        }

        // Badge de status
        let statusBadge = '';
        if (just.status === 'Aprovada') {
            statusBadge = '<span class="status-badge" style="background: #107c10; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">✓ Aprovada</span>';
        } else if (just.status === 'Pendente') {
            statusBadge = '<span class="status-badge" style="background: #ffa500; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">⏳ Pendente</span>';
        } else if (just.status === 'Rejeitada') {
            statusBadge = '<span class="status-badge" style="background: #d13438; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">✗ Rejeitada</span>';
        }

        tr.innerHTML = `
            <td>${dataFormatada}</td>
            <td>${just.tipo}</td>
            <td>${statusBadge}</td>
            <td>${just.gestor}</td>
            <td>${just.observacoes}</td>
        `;

        tbody.appendChild(tr);
    });
}

// Função para popular a tabela de justificativas no dashboard (sem emojis e com cores uniformes)
function popularTabelaJustificativasDashboard() {
    const tbody = document.getElementById('justificativasTableBodyDashboard');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (justificativasEnviadas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #666;">Nenhuma justificativa enviada ainda.</td></tr>';
        return;
    }

    // Mostrar apenas as 5 mais recentes
    const justificativasRecentes = justificativasEnviadas.slice(0, 5);

    justificativasRecentes.forEach(just => {
        const tr = document.createElement('tr');

        // Formatar data
        let dataFormatada;
        try {
            const dataObj = just.data.includes('-') 
                ? new Date(just.data + 'T00:00:00') 
                : new Date(just.data);
            dataFormatada = dataObj.toLocaleDateString('pt-BR');
        } catch (e) {
            dataFormatada = just.data;
        }

        // Badge de status sem emoji, usando cores do padrão gestor
        const statusTexto = just.status;
        let statusClass = 'badge';
        if (just.status === 'Aprovada') {
            statusClass = 'badge badge-aprovado';
        } else if (just.status === 'Pendente') {
            statusClass = 'badge badge-pendente';
        } else if (just.status === 'Rejeitada') {
            statusClass = 'badge badge-reprovado';
        }
        const statusBadge = `<span class="${statusClass}">${statusTexto}</span>`;

        // Truncar observações se muito longo
        const obsTexto = just.observacoes.length > 80 
            ? `<span class="obs-text" title="${just.observacoes}">${just.observacoes}</span>`
            : just.observacoes;

        tr.innerHTML = `
            <td>${dataFormatada}</td>
            <td>${statusBadge}</td>
            <td>${obsTexto}</td>
        `;

        tbody.appendChild(tr);
    });
}
