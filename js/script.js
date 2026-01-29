let colaboradorSelecionado = null;

const pageNames = {
    dashboard: 'Dashboard Principal',
    presenca: 'Controle de Presença',
    'historico-presenca': 'Histórico Mensal de Presença',
    justificativas: 'Minhas Justificativas',
    ferias: 'Solicitar Férias',
    'falta-justificada': 'Solicitar Falta Justificada',
    'equipe-gestor': 'Minha Equipe',
    'dashboard-gestor': 'Dashboard do Gestor',
    'dashboard-rh': 'Dashboard RH',
    conformidade: 'Conformidade',
    configuracoes: 'Configurações'
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
        } else {
            topDashboardLink.dataset.page = 'dashboard-gestor';
        }
    }
}

// Quando o usuário trocar o perfil
profileSelect.addEventListener('change', applyProfileMenu);

// Quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // mantém o que você já tinha
    if (typeof initHistoricoPresenca === 'function') {
        initHistoricoPresenca();
    }

    if (typeof renderHistoricoCalendar === 'function') {
        renderHistoricoCalendar();
    }

    // aplica o perfil corretamente ao abrir a página
    applyProfileMenu();
});


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
            valores: [62, 55, 64, 57, 61, 54, 53, 48, 52, 59, 46]
        },
        {
            area: "LATAM",
            hc: 121,
            grupo: "BU's",
            valores: [54, 52, 61, 55, 58, 46, 50, 34, 49, 57, 38]
        },
        {
            area: "IDM",
            hc: 11,
            grupo: "BU's",
            valores: [5, 8, 14, 12, 10, 65, 36, 25, 6, 62, 15]
        },
        {
            area: "N&C",
            hc: 3,
            grupo: "BU's",
            valores: [0, 0, 5, 0, 0, 48, 0, 0, 0, 0, 0]
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
            valores: [72, 78, 76, 66, 74, 77, 65, 62, 58, 61, 60]
        },
        {
            area: "TECNOLOGIA",
            hc: 68,
            grupo: "CORP",
            valores: [22, 20, 24, 21, 23, 25, 15, 42, 18, 14, 19]
        },
        {
            area: "PEOPLE",
            hc: 59,
            grupo: "CORP",
            valores: [78, 76, 79, 66, 72, 60, 55, 70, 66, 80, 56]
        },
        {
            area: "MARKETING",
            hc: 52,
            grupo: "CORP",
            valores: [92, 68, 83, 85, 86, 61, 55, 75, 52, 76, 45]
        },
        {
            area: "JURÍDICO",
            hc: 31,
            grupo: "CORP",
            valores: [84, 76, 78, 70, 73, 61, 55, 65, 88, 67, 28]
        },
        {
            area: "SUPPLY CHAIN",
            hc: 123,
            grupo: "OP",
            valores: [70, 61, 69, 58, 66, 56, 63, 50, 57, 61, 65]
        },
        {
            area: "INDUSTRIAL",
            hc: 24,
            grupo: "OP",
            valores: [28, 35, 45, 38, 46, 55, 50, 36, 44, 49, 22]
        }
    ]
};

// JSON mockado simulando retorno da API
const dadosApiMock = {
    colaborador: "Luiz Silva",
    semanas: [
        {
            num: 1,
            periodo: "19/01/2026 → 23/01/2026",
            justificada: false,
            dias: [
                { dia: "Seg", data: "19/01", status: "presencial" },
                { dia: "Ter", data: "20/01", status: "presencial" },
                { dia: "Qua", data: "21/01", status: "remoto" },
                { dia: "Qui", data: "22/01", status: "presencial" },
                { dia: "Sex", data: "23/01", status: "remoto" }
            ]
        },
        {
            num: 2,
            periodo: "12/01/2026 → 16/01/2026",
            justificada: true, // 👈 inconformidade já tratada
            dias: [
                { dia: "Seg", data: "12/01", status: "remoto" },
                { dia: "Ter", data: "13/01", status: "presencial" },
                { dia: "Qua", data: "14/01", status: "ausente", justificado: true },
                { dia: "Qui", data: "15/01", status: "remoto" },
                { dia: "Sex", data: "16/01", status: "presencial" }
            ]
        },
        {
            num: 3,
            periodo: "05/01/2026 → 09/01/2026",
            justificada: false,
            dias: [
                { dia: "Seg", data: "05/01", status: "ausente" },
                { dia: "Ter", data: "06/01", status: "remoto" },
                { dia: "Qua", data: "07/01", status: "ausente" },
                { dia: "Qui", data: "08/01", status: "remoto" },
                { dia: "Sex", data: "09/01", status: "ausente" }
            ]
        },
        {
            num: 4,
            periodo: "29/12/2025 → 02/01/2026",
            justificada: false,
            dias: [
                { dia: "Seg", data: "29/12", status: "presencial" },
                { dia: "Ter", data: "30/12", status: "presencial" },
                { dia: "Qua", data: "31/12", status: "remoto" },
                { dia: "Qui", data: "01/01", status: "remoto" },
                { dia: "Sex", data: "02/01", status: "remoto" }
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
    if (percent > 85) return 'excellent';
    if (percent >= 61) return 'good';
    if (percent >= 50) return 'attention';
    return 'critical';
}

//Render Tabela Relatório
function renderRelatorioEmpresa(data) {
    const table = document.getElementById('aderenciaTable');
    const thead = table.querySelector('thead');
    thead.innerHTML = `
        <tr>
            <th>BU / Área</th>
            <th># HC</th>
            ${data.periods.map(p => `<th>${p}</th>`).join('')}
        </tr>
    `;

    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    let grupoAtual = null;

    data.areas.forEach(area => {
        // Pula separador se grupo estiver vazio
        if (area.grupo && area.grupo !== grupoAtual) {
            grupoAtual = area.grupo;
            const separador = document.createElement('tr');
            separador.innerHTML = `
                <td colspan="${2 + data.periods.length}" class="grupo-header">${grupoAtual}</td>
            `;
            tbody.appendChild(separador);
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="department">${area.area}</td>
            <td>${area.hc}</td>
        `;
        area.valores.forEach(valor => {
            const cls = getAderenciaClass(valor);

            const diamond = valor > 85
                ? '<span class="diamond">💎</span>'
                : '';

            tr.innerHTML += `
        <td class="${cls}">
            <span class="percent">
                ${valor}%${diamond}
            </span>
        </td>
    `;
        });

        tbody.appendChild(tr);
    });
}



// chamada inicial
renderRelatorioEmpresa(mockRelatorioEmpresa);

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


function showDetail(s, cardElement) {
    const content = document.getElementById('detail-content');
    const pres = s.dias.filter(d => d.status === 'presencial').length;
    const isRequiredSemanal = pres < 3;
    const st = getStatusSemana(pres);

    content.innerHTML = `
        <h3 style="margin:0 0 20px; text-align:center; color:${st.cor}">
            Semana ${s.num} – ${s.periodo} (${pres} presenciais)
        </h3>

        <div class="days-grid">
            ${s.dias.map(d => {
                let cls = '', txt = '';

                if (d.justificado) {
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

                const podeJustificar =
                    (d.status === 'ausente' || d.status === 'remoto') && !d.justificado;

                return `
                    <div class="day-card">
                        <div class="day-header">${d.dia}</div>
                        <div class="day-date">${d.data}</div>
                        <div class="status ${cls}">${txt}</div>
                        ${podeJustificar ? `
                            <div class="just-icon"
                                data-dia="${d.dia}"
                                data-data="${d.data}"
                                data-tipo="${txt}">
                                J
                            </div>
                        ` : ``}
                    </div>
                `;
            }).join('')}
        </div>

        ${isRequiredSemanal ? `
            <div class="justifications-panel">
                <strong>Justificativas</strong><br>
                <small>Clique no ícone "J" nos dias para adicionar ou remover justificativa diária.</small>

                <div id="daily-fields" style="margin:16px 0;"></div>

                <div class="just-weekly">
                    <strong>Justificativa geral da semana (obrigatória)</strong>
                    <textarea id="weekly-textarea"
                        placeholder="Explique o motivo da não conformidade semanal"></textarea>
                </div>

                <button id="submit-btn" class="submit-btn">
                    Salvar justificativas desta semana
                </button>
            </div>
        ` : ``}
    `;

    content.classList.add('open');
    content.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // ⚠️ IMPORTANTE: se não exige justificativa, PARA AQUI
    if (!isRequiredSemanal) return;

    const submitBtn = document.getElementById('submit-btn');
    const weeklyTextarea = document.getElementById('weekly-textarea');
    const dailyFieldsContainer = document.getElementById('daily-fields');

    document.querySelectorAll('.just-icon').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.stopPropagation();

            const dia = this.dataset.dia;
            const data = this.dataset.data;
            const tipo = this.dataset.tipo;

            const existing = dailyFieldsContainer.querySelector(
                `[data-dia="${dia}"]`
            );

            if (existing) {
                existing.remove();
                this.classList.remove('active');
                return;
            }

            dailyFieldsContainer.insertAdjacentHTML('beforeend', `
                <div class="just-daily" data-dia="${dia}">
                    <strong>${dia} (${data}) – ${tipo}</strong>

                    <strong>Tipo</strong>
                    <select class="form-control daily-type">
                        <option value="" selected disabled>Selecione o tipo</option>
                        <option value="trabalho">Trabalho externo</option>
                        <option value="nao">Não Justificado</option>
                        <option value="outro">Outros</option>
                    </select>

                    <textarea class="daily-textarea" style="display:none"></textarea>

                    <button class="daily-submit submit-btn"
                        style="display:none; margin-top:8px;">
                        Enviar
                    </button>
                </div>
            `);

            this.classList.add('active');

            const block = dailyFieldsContainer.querySelector(
                `[data-dia="${dia}"]`
            );
            const select = block.querySelector('.daily-type');
            const textarea = block.querySelector('.daily-textarea');
            const sendBtn = block.querySelector('.daily-submit');

            select.addEventListener('change', () => {
                textarea.style.display = 'block';
                sendBtn.style.display = 'inline-block';

                if (select.value === 'trabalho') {
                    textarea.placeholder = 'Digite a Justificativa ...';
                } else if (select.value === 'nao') {
                    textarea.placeholder = 'Digite a Medida Aplicada ...';
                } else {
                    textarea.placeholder = 'Digite os Detalhes ...';
                }
            });

            sendBtn.addEventListener('click', ev => {
                ev.stopPropagation();
                alert('Justificativa enviada com sucesso!');
            });
        });
    });

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
            alert('Justificativas salvas com sucesso!');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Salvar justificativas desta semana';
        }, 1500);
    });
}

function renderOverview(dados) {
    const overview = document.getElementById('overview');
    overview.innerHTML = '';

    dados.semanas.forEach(s => {

        // ✅ CONTADOR REAL (nunca zera)
        const presenciais = s.dias.filter(d => d.status === 'presencial').length;
        const remotos = s.dias.filter(d => d.status === 'remoto').length;
        const ausentes = s.dias.filter(d => d.status === 'ausente').length;

        // ✅ REGRA DE CONFORMIDADE
        let statusSemana;

        if (s.justificada) {
            statusSemana = {
                class: 'week-justificada',
                label: 'Inconformidade justificada',
                cor: 'var(--azul)'
            };
        } else if (ausentes > 0 || remotos > 2 || presenciais < 3) {
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
                ${presenciais}
            </div>

            <div style="text-align:center; padding:8px; font-size:0.9rem;">
                ${statusSemana.label}
            </div>

            ${s.justificada ? `<div class="justificado-icon">✓</div>` : ``}
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

    const nc = dados.semanas.filter(
        s => s.dias.filter(d => d.status === 'presencial').length < 3
    ).length;

    const total = dados.semanas.reduce(
        (sum, s) => sum + s.dias.filter(d => d.status === 'presencial').length,
        0
    );

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


