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

function openJustificativaModal({ id, date }) {
    const modal = document.getElementById('justificativaModal');

    document.getElementById('modalInconformidadeId').value = id;
    document.getElementById('modalDate').textContent =
        `Data da inconformidade: ${date.toLocaleDateString('pt-BR')}`;

    document.getElementById('modalTipo').value = '';
    document.getElementById('modalDetalhes').value = '';

    modal.style.display = 'flex';
}

document.getElementById('closeModal').onclick = () => {
    document.getElementById('justificativaModal').style.display = 'none';
};

document.getElementById('justificativaModal').addEventListener('click', (e) => {
    if (e.target.id === 'justificativaModal') {
        e.target.style.display = 'none';
    }
});

function getAderenciaClass(percent) {
    if (percent > 75) return 'excellent';
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

            const diamond = valor > 75
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

                const isoDate = formatISO(dayDate);
                const inconformidadeId = `${selectedEmployee}-${isoDate}`;

                openJustificativaModal({
                    id: inconformidadeId,
                    date: dayDate
                });
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
employeeSelect.addEventListener('change', e => {
    selectedEmployee = e.target.value || null;
    tryOpenCalendar();
});

dateInput.addEventListener('click', () => {
    datepicker.style.display = 'block';
    renderDatepicker();
});

document.addEventListener('click', e => {
    if (!datepicker.contains(e.target) && e.target !== dateInput) {
        datepicker.style.display = 'none';
    }
});

// ===============================
// INIT
// ===============================
dateInput.addEventListener('click', (e) => {
    e.stopPropagation();
    datepicker.style.display = 'block';
    renderDatepicker();
});

datepicker.addEventListener('click', (e) => {
    e.stopPropagation();
});

document.addEventListener('click', e => {
    if (
        !datepicker.contains(e.target) &&
        e.target !== dateInput
    ) {
        datepicker.style.display = 'none';
    }

    if (
        !calendar.contains(e.target) &&
        !datepicker.contains(e.target)
    ) {
        calendar.style.display = 'none';
    }
});


